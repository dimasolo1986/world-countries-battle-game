import { initializeApp } from "./firebase-app.js";
import { getAuth, signInAnonymously } from "./firebase-auth.js";
import { STUN_SERVER_LIST, FIREBASE_DATA, METERED_DATA } from "./config.js";
import { localization } from "./localization/ua.js";
import { resetGameRoomContainer } from "./helpers.js";
import * as model from "./model.js";
import {
  getDatabase,
  ref,
  set,
  get,
  onChildAdded,
  onValue,
  remove,
  push,
  serverTimestamp,
} from "./firebase-database.js";

export class Firebase {
  firebaseConfig;
  app;
  db;
  isHost;
  gameRoomId;
  game;
  peerConnection;
  dataChannel;
  answered;
  opponentConnectionState;
  turnServers = [];
  serverTimeOffset = 0;
  unsubscribeFns = [];
  constructor() {
    this.firebaseConfig = {
      apiKey: String.fromCharCode(...FIREBASE_DATA),
      authDomain: "country-alliance-guesser.firebaseapp.com",
      databaseURL:
        "https://country-alliance-guesser-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "country-alliance-guesser",
      storageBucket: "country-alliance-guesser.firebasestorage.app",
      messagingSenderId: "834183240701",
      appId: "1:834183240701:web:78bef8f2f4c9f9b81a5794",
      measurementId: "G-523TP6VSTM",
    };
    this.answered = false;
  }
  async initializeApplication() {
    if (!this.app) {
      this.app = initializeApp(this.firebaseConfig);
      const auth = getAuth(this.app);
      try {
        await signInAnonymously(auth);
      } catch {
        alert(
          "⛔ " +
            localization[model.worldCountries.language][
              "Failed to create a communication channel with your opponent"
            ],
        );
      }
      const turnData = await this.getTurnServers();
      this.turnServers = turnData;
    }
  }

  async getTurnServers() {
    try {
      const response = await fetch(
        `https://country-alliance-guesser.metered.live/api/v1/turn/credentials?apiKey=${String.fromCharCode(...METERED_DATA)}`,
      );
      if (!response.ok) {
        return [];
      } else {
        return await response.json();
      }
    } catch (err) {
      return [];
    }
  }

  getApplicationDatabase() {
    if (!this.db) {
      this.db = getDatabase(this.app);
    }
  }

  async createConnection() {
    if (!this.peerConnection) {
      if (!this.turnServers || this.turnServers.length === 0) {
        const turnData = await this.getTurnServers();
        this.turnServers = turnData;
      }
      const iceServers = [...STUN_SERVER_LIST, ...this.turnServers];
      this.peerConnection = new RTCPeerConnection({
        iceServers: iceServers,
      });
    }
  }

  async joinGameRoom(gameRoomId) {
    if (this.peerConnection) {
      this.unsubscribeFns.push(
        onValue(ref(this.db, "/.info/serverTimeOffset"), (snap) => {
          this.serverTimeOffset = snap.val() || 0;
        }),
      );
      this.cleanupOldGameRooms().catch(() => {});
      const offerSnap = await get(ref(this.db, `room-${gameRoomId}/offer`));
      if (!offerSnap.exists()) {
        alert(
          "⚠️ " +
            gameRoomId +
            ` - ${
              localization[model.worldCountries.language][
                "Game room does not exist. Perhaps the opponent deleted it or left the game"
              ]
            }`,
        );
        return false;
      }
      await remove(ref(this.db, `room-${gameRoomId}/answerCandidates`));
      await remove(ref(this.db, `room-${gameRoomId}/answer`));
      const offer = offerSnap.val();
      await this.peerConnection.setRemoteDescription(offer);
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      await set(ref(this.db, `room-${gameRoomId}/answer`), answer);
      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          const candRef = push(
            ref(this.db, `room-${gameRoomId}/answerCandidates`),
          );
          set(candRef, event.candidate.toJSON());
        }
      };
      this.peerConnection.oniceconnectionstatechange = async () => {
        this.opponentConnectionState = this.peerConnection.iceConnectionState;
        if (this.game) {
          this.game.opponentConnectionHandler(
            this.peerConnection.iceConnectionState,
          );
        }
      };
      this.unsubscribeFns.push(
        onValue(ref(this.db, `room-${gameRoomId}/offer`), async (snap) => {
          const offer = snap.val();
          try {
            await this.peerConnection.setRemoteDescription(offer);
            const answer = await this.peerConnection.createAnswer();
            await this.peerConnection.setLocalDescription(answer);
            await set(ref(this.db, `room-${gameRoomId}/answer`), answer);
            this.answered = true;
          } catch (err) {
            if (this.game) {
              this.game.opponentConnectionHandler("failed");
            }
          }
        }),
      );
      this.unsubscribeFns.push(
        onChildAdded(
          ref(this.db, `room-${gameRoomId}/offerCandidates`),
          (snap) => {
            const data = snap.val();
            if (data && data.candidate) {
              this.peerConnection.addIceCandidate(data);
            } else if (
              data &&
              data.sdpMid !== undefined &&
              data.sdpMLineIndex !== undefined
            ) {
              this.peerConnection.addIceCandidate(new RTCIceCandidate(data));
            }
          },
        ),
      );
      this.peerConnection.onconnectionstatechange = function () {
        this.mainPageConnectionStateHandler(
          this.peerConnection.iceConnectionState,
        );
        this.opponentConnectionState = this.peerConnection.connectionState;
        if (this.game) {
          this.game.opponentConnectionHandler(
            this.peerConnection.connectionState,
          );
        }
      }.bind(this);
      this.peerConnection.ondatachannel = (event) => {
        this.dataChannel = event.channel;
        this.dataChannel.onopen = function () {
          if (this.game) {
            this.game.requestSelectedCountriesFromOpponent();
          }
        }.bind(this);
        this.dataChannel.onmessage = function (e) {
          if (this.game) {
            this.game.opponentMessagesHandler(e.data);
          } else if (!this.game && JSON.parse(e.data).type === "chat") {
            this.sendMessage(JSON.stringify({ type: "notReady" }));
          }
        }.bind(this);
      };
    }
  }

  async deleteGameRoom(gameRoomId) {
    if (this.db && this.isHost) {
      const roomRef = ref(this.db, `room-${gameRoomId}`);
      if (roomRef) {
        await remove(roomRef);
      }
    }
    this.gameRoomId = null;
  }

  async cleanupOldGameRooms(maxAgeMs = 24 * 60 * 60 * 1000) {
    const roomsRef = ref(this.db);
    const snapshot = await get(roomsRef);

    if (!snapshot.exists()) return;

    const now = Date.now() + this.serverTimeOffset;

    for (const roomKey of Object.keys(snapshot.val())) {
      const room = snapshot.val()[roomKey];

      if (room.createdAt && now - room.createdAt > maxAgeMs) {
        await remove(ref(this.db, roomKey));
      }
    }
  }

  endGame() {
    if (this.gameRoomId && this.db && this.peerConnection) {
      set(
        ref(this.db, `room-${this.gameRoomId}/gameEndedAt`),
        serverTimestamp(),
      );
    }
  }

  mainPageConnectionStateHandler(connectionState) {
    const opponentConnectionText = document.getElementById(
      "opponent-connection-main-page-text",
    );
    if (connectionState === "connected") {
      opponentConnectionText.textContent =
        localization[model.worldCountries.language]["Opponent is online"];
      opponentConnectionText.style.color = "green";
      opponentConnectionText.dataset.connection = "Opponent is online";
    } else if (connectionState === "connecting") {
      opponentConnectionText.textContent =
        localization[model.worldCountries.language]["Opponent is connecting"];
      opponentConnectionText.style.color = "green";
      opponentConnectionText.dataset.connection = "Opponent is connecting";
    } else if (connectionState === "disconnected") {
      opponentConnectionText.style.color = "red";
      opponentConnectionText.textContent =
        localization[model.worldCountries.language]["Opponent is not online"];
      opponentConnectionText.dataset.connection = "Opponent is not online";
    } else if (connectionState === "failed") {
      opponentConnectionText.style.color = "red";
      opponentConnectionText.textContent =
        localization[model.worldCountries.language]["Connection is failed"];
      opponentConnectionText.dataset.connection = "Connection is failed";
    } else if (connectionState === "closed") {
      opponentConnectionText.style.color = "red";
      opponentConnectionText.textContent =
        localization[model.worldCountries.language]["Connection is closed"];
      opponentConnectionText.dataset.connection = "Connection is closed";
    }
  }

  async createGameRoom(gameRoomId) {
    if (this.peerConnection) {
      this.unsubscribeFns.push(
        onValue(ref(this.db, "/.info/serverTimeOffset"), (snap) => {
          this.serverTimeOffset = snap.val() || 0;
        }),
      );
      this.cleanupOldGameRooms().catch(() => {});
      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          const candRef = push(
            ref(this.db, `room-${gameRoomId}/offerCandidates`),
          );
          set(candRef, event.candidate.toJSON());
        }
      };
      this.dataChannel = this.peerConnection.createDataChannel("game", {
        ordered: true,
        maxRetransmits: 5,
      });
      await remove(ref(this.db, `room-${gameRoomId}/offerCandidates`));
      await remove(ref(this.db, `room-${gameRoomId}/answer`));
      await remove(ref(this.db, `room-${gameRoomId}/answerCandidates`));
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      await set(ref(this.db, `room-${gameRoomId}/offer`), offer);
      await set(
        ref(this.db, `room-${gameRoomId}/createdAt`),
        serverTimestamp(),
      );
      this.unsubscribeFns.push(
        onChildAdded(
          ref(this.db, `room-${gameRoomId}/answerCandidates`),
          (snap) => {
            const data = snap.val();
            if (data && data.candidate) {
              this.peerConnection.addIceCandidate(data);
            } else if (
              data &&
              data.sdpMid !== undefined &&
              data.sdpMLineIndex !== undefined
            ) {
              this.peerConnection.addIceCandidate(new RTCIceCandidate(data));
            }
          },
        ),
      );
      this.unsubscribeFns.push(
        onValue(ref(this.db, `room-${gameRoomId}/answer`), (snap) => {
          const answer = snap.val();
          if (answer && this.peerConnection.signalingState !== "stable") {
            this.peerConnection
              .setRemoteDescription(answer)
              .then(() => {})
              .catch(() => {});
            this.answered = true;
          }
        }),
      );
      this.unsubscribeFns.push(
        onValue(ref(this.db, `room-${gameRoomId}`), (snap) => {
          if (!snap.exists()) {
            resetGameRoomContainer();
          }
        }),
      );
      this.peerConnection.addEventListener("negotiationneeded", () => {
        this.peerConnection.close();
        this.peerConnection = null;
        this.dataChannel.close();
        this.dataChannel = null;
        this.createConnection();
        this.createGameRoom(gameRoomId);
      });
      this.peerConnection.oniceconnectionstatechange = async () => {
        this.mainPageConnectionStateHandler(
          this.peerConnection.iceConnectionState,
        );
        this.opponentConnectionState = this.peerConnection.iceConnectionState;
        if (this.game) {
          this.game.opponentConnectionHandler(
            this.peerConnection.iceConnectionState,
          );
        }
        if (
          this.peerConnection.iceConnectionState === "failed" ||
          this.peerConnection.iceConnectionState === "disconnected"
        ) {
          if (this.isHost) {
            this.peerConnection.restartIce();
          }
        }
      };
      this.peerConnection.onconnectionstatechange = function () {
        this.opponentConnectionState = this.peerConnection.connectionState;
        if (this.game) {
          this.game.opponentConnectionHandler(
            this.peerConnection.connectionState,
          );
        }
      }.bind(this);
      this.dataChannel.onmessage = function (e) {
        if (this.game) {
          this.game.opponentMessagesHandler(e.data);
        } else if (!this.game && JSON.parse(e.data).type === "chat") {
          this.sendMessage(JSON.stringify({ type: "notReady" }));
        }
      }.bind(this);
    }
  }

  async cleanupResources(closeChannel = false) {
    this.unsubscribeFns.forEach((fn) => {
      try {
        fn();
      } catch {}
    });
    this.unsubscribeFns = [];
    if (this.dataChannel && closeChannel) {
      try {
        this.dataChannel.close();
        this.dataChannel.onopen = null;
        this.dataChannel.onmessage = null;
        this.dataChannel = null;
      } catch (err) {}
    }
    if (this.peerConnection && closeChannel) {
      try {
        this.peerConnection.onconnectionstatechange = null;
        this.peerConnection.oniceconnectionstatechange = null;
        this.peerConnection.onicecandidate = null;
        this.peerConnection.ondatachannel = null;
        this.peerConnection.close();
        this.peerConnection = null;
      } catch (err) {}
    }
    if (this.isHost && this.gameRoomId) {
      try {
        this.deleteGameRoom(this.gameRoomId);
      } catch (err) {}
    }
    if (this.db) {
      this.db = null;
    }
    if (this.app) {
      this.app = null;
    }
  }

  async sendChatMessage(message) {
    if (this.dataChannel && this.dataChannel.readyState === "open") {
      this.dataChannel.send(message);
    }
  }

  async sendMessage(message, retries = 2, delay = 500) {
    for (let i = 0; i < retries; i++) {
      try {
        if (this.dataChannel && this.dataChannel.readyState === "open") {
          this.dataChannel.send(message);
          return true;
        } else {
          throw new Error("Failed to send message! DataChannel not open.");
        }
      } catch (err) {
        await new Promise((res) => setTimeout(res, delay));
      }
    }
    return false;
  }

  setGame(game) {
    this.game = game;
  }

  cleanGame() {
    this.game = null;
  }

  setGameRoomId(gameRoomId) {
    this.gameRoomId = gameRoomId;
  }

  setIsHost(isHost) {
    this.isHost = isHost;
  }
}
