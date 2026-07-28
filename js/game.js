import { localization } from "./localization/ua.js";
import { loadMain, resetFinishedGame } from "./controller.js";
import {
  showGameResultWindow,
  showGameRulesWindow,
  hideModalWindow,
} from "./helpers.js";
import * as model from "./model.js";
export class Game {
  finished = false;
  started = false;
  isOpponentPlayerReady = true;
  isPlayerReady = true;
  bonusCountries;
  gameModalResultLabel = document.getElementById("gameModalResultLabel");
  gameModalRulesLabel = document.getElementById("gameModalRulesLabel");
  gameModalRulesContent = document.getElementById("gameRulesContent");
  gameModalRulesCloseButton = document.getElementById("gameRulesCloseButton");
  gameModalPlayAgainButton = document.getElementById("gameResultPlayButton");
  guessCountriesMessageField;
  gameModalHeading = document.getElementById("gameResultHeading");
  gameResultScore = document.getElementById("gameResultScore");
  gameModalHeadingGuessed = document.getElementById(
    "gameResultHeadingGuesedCountries",
  );
  gameModalResultGuessedCountries =
    document.getElementById("gameResultGuessing");
  gameModalResultCloseButton = document.getElementById("gameResultCloseButton");
  gameModalResultShareButton = document.getElementById("shareGameResults");
  constructor(playerOne, playerTwo, playMap, firebase, gameConfiguration) {
    this.guessCountriesMessageField = document.querySelector(
      "#countries-battle-game-message",
    );
    this.bonusCountries = [];
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.playMap = playMap;
    this.firebase = firebase;
    this.gameConfiguration = gameConfiguration;
  }

  getRandomBonusCountries(
    allCountries,
    excludedSet,
    count = this.gameConfiguration.bonusCountries,
  ) {
    if (count === 0) return [];
    const bonusCountries = [];
    for (const code of allCountries) {
      if (!excludedSet.has(code) && code !== "RU") {
        bonusCountries.push(code);
      }
    }
    bonusCountries.sort(() => Math.random() - 0.5);
    this.bonusCountries = bonusCountries.slice(0, count);
  }

  showGameRules() {
    this.gameModalRulesLabel.textContent =
      localization[model.worldCountries.language]["Game Rules"];
    this.gameModalRulesCloseButton.textContent =
      localization[model.worldCountries.language]["Close"];
    this.gameModalRulesContent.innerHTML = document.getElementById(
      "game-rules-project-container",
    ).innerHTML;
    const rawParams = window.location.search;
    const cleanedParams = rawParams.replace(/[\u200B-\u200D\uFEFF]/g, "");
    const urlParams = new URLSearchParams(cleanedParams);
    const gameRoomId = urlParams.get("gameRoom");
    if (this.gameConfiguration.gameMode === "user" && !gameRoomId) {
      document.getElementById("game-rules-friend-link-label").textContent =
        localization[model.worldCountries.language]["Game Link For Friend"] +
        ":";
      document.getElementById("game-rules-friend-link-input").value =
        document.getElementById("roomIdInput").value;
      document
        .getElementById("game-rules-friend-link")
        .classList.remove("not-displayed");
    } else {
      document
        .getElementById("game-rules-friend-link")
        .classList.add("not-displayed");
    }
    showGameRulesWindow();
  }

  showGameResult(playerOneWon, deleteGameRoom = false) {
    this.gameModalResultGuessedCountries.innerHTML = "";
    this.playerOne.enableMapInteraction();
    this.gameModalResultLabel.textContent =
      "📝 " + localization[model.worldCountries.language]["Game Result"];
    this.gameModalResultCloseButton.textContent =
      localization[model.worldCountries.language]["Close"];
    this.gameModalPlayAgainButton.textContent =
      localization[model.worldCountries.language]["Play Again"];
    this.gameModalResultShareButton.textContent =
      localization[model.worldCountries.language]["Share"];
    if (playerOneWon) {
      this.guessCountriesMessageField.textContent =
        "👏 " +
        localization[model.worldCountries.language][
          "Congratulations! You won the game!"
        ];
      this.gameResultScore.textContent =
        "🏅 " +
        localization[model.worldCountries.language]["Score"] +
        ": " +
        this.playerOne.score +
        " " +
        localization[model.worldCountries.language]["Points"];
      this.gameModalHeading.textContent =
        "👏 " +
        localization[model.worldCountries.language][
          "Congratulations! You won the game!"
        ];
      this.gameModalHeading.style.color = "#10b981";
      this.gameModalHeadingGuessed.textContent =
        localization[model.worldCountries.language][
          "You guessed all the opponent's countries:"
        ];
      const index =
        Math.floor(this.playerTwo.selectedCountryCodes.size / 2) +
        (this.playerTwo.selectedCountryCodes.size % 2);
      let countryIndex = 0;
      const userCountriesContainer = document.createElement("table");
      userCountriesContainer.style.border = "none";
      userCountriesContainer.style.tableLayout = "fixed";
      userCountriesContainer.style.width = "100%";
      const selectedCountryCodesArray = Array.from(
        this.playerTwo.selectedCountryCodes,
      );
      for (let i = 0; i < index; i++) {
        const countriesTemplate =
          this.playerTwo.selectedCountryCodes.size !== countryIndex + 1
            ? `<tr style="display: table-row;"><td style="border:none; display:table-cell;"><div style="display:flex;"><img src="${
                this.playerTwo.countries[
                  selectedCountryCodesArray[countryIndex]
                ].countryFlag
              }" alt="${
                localization[model.worldCountries.language]["countries"][
                  this.playerTwo.countries[
                    selectedCountryCodesArray[countryIndex]
                  ].countryName
                ]
              }" title="${
                localization[model.worldCountries.language]["countries"][
                  this.playerTwo.countries[
                    selectedCountryCodesArray[countryIndex]
                  ].countryName
                ]
              }" style="height:15px; width:20px; border-radius:2px; box-shadow: 0 1px 1px #00000080,
                              inset 0 1px 1px #0000001f; vertical-align:baseline;"/>
                              ${
                                this.playerTwo.countries[
                                  selectedCountryCodesArray[countryIndex]
                                ].countryCoatOfArms
                                  ? `<img src="${
                                      this.playerTwo.countries[
                                        selectedCountryCodesArray[countryIndex]
                                      ].countryCoatOfArms
                                    }" style="margin-left: 5px; width:15px; height:15px; vertical-align: baseline;">`
                                  : `<span style="vertical-align: text-bottom;">🛡️</span>`
                              }
                              </div></td> <td style="border:none;display:table-cell;"><span style="margin-right: 10px; vertical-align: sub;">${
                                localization[model.worldCountries.language][
                                  "countries"
                                ][
                                  this.playerTwo.countries[
                                    selectedCountryCodesArray[countryIndex]
                                  ].countryName
                                ]
                              }</span></td><td style="border:none;display:table-cell;"><div style="display:flex;"><img src="${
                                this.playerTwo.countries[
                                  selectedCountryCodesArray[countryIndex + 1]
                                ].countryFlag
                              }" alt="${
                                localization[model.worldCountries.language][
                                  "countries"
                                ][
                                  this.playerTwo.countries[
                                    selectedCountryCodesArray[countryIndex + 1]
                                  ].countryName
                                ]
                              }" title="${
                                localization[model.worldCountries.language][
                                  "countries"
                                ][
                                  this.playerTwo.countries[
                                    selectedCountryCodesArray[countryIndex + 1]
                                  ].countryName
                                ]
                              }" style="height:15px; width:20px; border-radius:2px; box-shadow: 0 1px 1px #00000080,
                              inset 0 1px 1px #0000001f; vertical-align:baseline;"/>
                               ${
                                 this.playerTwo.countries[
                                   selectedCountryCodesArray[countryIndex + 1]
                                 ].countryCoatOfArms
                                   ? `<img src="${
                                       this.playerTwo.countries[
                                         selectedCountryCodesArray[
                                           countryIndex + 1
                                         ]
                                       ].countryCoatOfArms
                                     }" style="margin-left: 5px; width:15px; height:15px; vertical-align: baseline;">`
                                   : `<span style="vertical-align: text-bottom;">🛡️</span>`
                               }
                              </div></td> <td style="border:none;display:table-cell;"><span style="vertical-align: sub;">${
                                localization[model.worldCountries.language][
                                  "countries"
                                ][
                                  this.playerTwo.countries[
                                    selectedCountryCodesArray[countryIndex + 1]
                                  ].countryName
                                ]
                              }</span></td></tr>`
            : `<tr style="display: table-row;"><td style="border:none;display:table-cell;"><div style="display:flex;"><img src="${
                this.playerTwo.countries[
                  selectedCountryCodesArray[countryIndex]
                ].countryFlag
              }" alt="${
                localization[model.worldCountries.language]["countries"][
                  this.playerTwo.countries[
                    selectedCountryCodesArray[countryIndex]
                  ].countryName
                ]
              }" title="${
                localization[model.worldCountries.language]["countries"][
                  this.playerTwo.countries[
                    selectedCountryCodesArray[countryIndex]
                  ].countryName
                ]
              }" style="height:15px; width:20px; border-radius:2px; box-shadow: 0 1px 1px #00000080,
                              inset 0 1px 1px #0000001f; vertical-align:baseline;"/>
                               ${
                                 this.playerTwo.countries[
                                   selectedCountryCodesArray[countryIndex]
                                 ].countryCoatOfArms
                                   ? `<img src="${
                                       this.playerTwo.countries[
                                         selectedCountryCodesArray[countryIndex]
                                       ].countryCoatOfArms
                                     }" style="margin-left: 5px; width:15px; height:15px; vertical-align: baseline;">`
                                   : `<span style="vertical-align: text-bottom;">🛡️</span>`
                               }
                              </div></td><td style="border:none;display:table-cell;"> <span style="vertical-align: sub;">${
                                localization[model.worldCountries.language][
                                  "countries"
                                ][
                                  this.playerTwo.countries[
                                    selectedCountryCodesArray[countryIndex]
                                  ].countryName
                                ]
                              }</span></td></tr>`;
        userCountriesContainer.insertAdjacentHTML(
          "beforeend",
          countriesTemplate,
        );
        countryIndex = countryIndex + 2;
      }
      this.gameModalResultGuessedCountries.appendChild(userCountriesContainer);
    } else {
      this.guessCountriesMessageField.textContent =
        "💔 " +
        localization[model.worldCountries.language][
          "Sorry! You lost the game!"
        ];
      this.gameResultScore.textContent =
        "🏅 " +
        localization[model.worldCountries.language]["Score"] +
        ": " +
        this.playerOne.score +
        " " +
        localization[model.worldCountries.language]["Points"];
      if (this.playerOne.score < 0) {
        this.gameResultScore.style.color = "red";
      } else {
        this.gameResultScore.style.color = "#10b981";
      }
      this.gameModalHeading.textContent =
        "💔 " +
        localization[model.worldCountries.language][
          "Sorry! You lost the game!"
        ];
      this.gameModalHeading.style.color = "red";
      if (this.playerTwo.playerType === "friendPlayer") {
        this.gameModalHeadingGuessed.textContent =
          localization[model.worldCountries.language][
            "Opponent guessed all your countries:"
          ];
      } else {
        this.gameModalHeadingGuessed.textContent =
          localization[model.worldCountries.language][
            "Computer guessed all your countries:"
          ];
      }
      const index =
        Math.floor(this.playerOne.selectedCountryCodes.size / 2) +
        (this.playerOne.selectedCountryCodes.size % 2);
      let countryIndex = 0;
      const userCountriesContainer = document.createElement("table");
      userCountriesContainer.style.border = "none";
      const selectedCountryCodesArray = Array.from(
        this.playerOne.selectedCountryCodes,
      );
      for (let i = 0; i < index; i++) {
        const countriesTemplate =
          this.playerOne.selectedCountryCodes.size !== countryIndex + 1
            ? `<tr style="display: table-row;"><td style="border:none;display:table-cell;"><div style="display:flex;"><img src="${
                this.playerOne.countries[
                  selectedCountryCodesArray[countryIndex]
                ].countryFlag
              }" alt="${
                localization[model.worldCountries.language]["countries"][
                  this.playerOne.countries[
                    selectedCountryCodesArray[countryIndex]
                  ].countryName
                ]
              }" title="${
                localization[model.worldCountries.language]["countries"][
                  this.playerOne.countries[
                    selectedCountryCodesArray[countryIndex]
                  ].countryName
                ]
              }" style="height:15px; width:20px; border-radius:2px; box-shadow: 0 1px 1px #00000080,
                              inset 0 1px 1px #0000001f; vertical-align:baseline;"/> 
                               ${
                                 this.playerOne.countries[
                                   selectedCountryCodesArray[countryIndex]
                                 ].countryCoatOfArms
                                   ? `<img src="${
                                       this.playerOne.countries[
                                         selectedCountryCodesArray[countryIndex]
                                       ].countryCoatOfArms
                                     }" style="margin-left: 5px; width:15px; height:15px; vertical-align: baseline;">`
                                   : `<span style="vertical-align: text-bottom;">🛡️</span>`
                               }
                              </div></td><td style="border:none;display:table-cell;"><span style="margin-right: 10px; vertical-align: sub;">${
                                localization[model.worldCountries.language][
                                  "countries"
                                ][
                                  this.playerOne.countries[
                                    selectedCountryCodesArray[countryIndex]
                                  ].countryName
                                ]
                              }</span></td><td style="border:none;display:table-cell;"><div style="display:flex;"><img src="${
                                this.playerOne.countries[
                                  selectedCountryCodesArray[countryIndex + 1]
                                ].countryFlag
                              }" alt="${
                                localization[model.worldCountries.language][
                                  "countries"
                                ][
                                  this.playerOne.countries[
                                    selectedCountryCodesArray[countryIndex + 1]
                                  ].countryName
                                ]
                              }" title="${
                                localization[model.worldCountries.language][
                                  "countries"
                                ][
                                  this.playerOne.countries[
                                    selectedCountryCodesArray[countryIndex + 1]
                                  ].countryName
                                ]
                              }" style="height:15px; width:20px; border-radius:2px; box-shadow: 0 1px 1px #00000080,
                              inset 0 1px 1px #0000001f; vertical-align:baseline;"/>
                               ${
                                 this.playerOne.countries[
                                   selectedCountryCodesArray[countryIndex + 1]
                                 ].countryCoatOfArms
                                   ? `<img src="${
                                       this.playerOne.countries[
                                         selectedCountryCodesArray[
                                           countryIndex + 1
                                         ]
                                       ].countryCoatOfArms
                                     }" style="margin-left: 5px; width:15px; height:15px; vertical-align: baseline;">`
                                   : `<span style="vertical-align: text-bottom;">🛡️</span>`
                               }
                              </div></td> <td style="border:none;display:table-cell;"><span style="vertical-align: sub;">${
                                localization[model.worldCountries.language][
                                  "countries"
                                ][
                                  this.playerOne.countries[
                                    selectedCountryCodesArray[countryIndex + 1]
                                  ].countryName
                                ]
                              }</span></td></tr>`
            : `<tr style="display: table-row;"><td style="border:none;display:table-cell;"><div style="display:flex;"><img src="${
                this.playerOne.countries[
                  selectedCountryCodesArray[countryIndex]
                ].countryFlag
              }" alt="${
                localization[model.worldCountries.language]["countries"][
                  this.playerOne.countries[
                    selectedCountryCodesArray[countryIndex]
                  ].countryName
                ]
              }" title="${
                localization[model.worldCountries.language]["countries"][
                  this.playerOne.countries[
                    selectedCountryCodesArray[countryIndex]
                  ].countryName
                ]
              }" style="height:15px; width:20px; border-radius:2px; box-shadow: 0 1px 1px #00000080,
                              inset 0 1px 1px #0000001f; vertical-align:baseline;"/>
                               ${
                                 this.playerOne.countries[
                                   selectedCountryCodesArray[countryIndex]
                                 ].countryCoatOfArms
                                   ? `<img src="${
                                       this.playerOne.countries[
                                         selectedCountryCodesArray[countryIndex]
                                       ].countryCoatOfArms
                                     }" style="margin-left: 5px; width:15px; height:15px; vertical-align: baseline;">`
                                   : `<span style="vertical-align: text-bottom;">🛡️</span>`
                               }
                              </div></td> <td style="border:none;display:table-cell;"> <span style="vertical-align: sub;">${
                                localization[model.worldCountries.language][
                                  "countries"
                                ][
                                  this.playerOne.countries[
                                    selectedCountryCodesArray[countryIndex]
                                  ].countryName
                                ]
                              }</span></td></tr>`;
        userCountriesContainer.insertAdjacentHTML(
          "beforeend",
          countriesTemplate,
        );
        countryIndex = countryIndex + 2;
      }
      this.gameModalResultGuessedCountries.appendChild(userCountriesContainer);
    }
    this.playMap.exitFullScreen();
    showGameResultWindow();
    this.playMap.finishGameHandler(false, deleteGameRoom);
  }

  finishGame(deleteGameRoom) {
    if (this.playMap) this.playMap.exitFullScreen();
    if (this.gameConfiguration.gameMode === "user") {
      this.playerOne.sendFinishGameToOpponent();
      if (window.gtag) gtag("event", "game_friend_end");
    } else {
      if (window.gtag) gtag("event", "game_computer_end");
    }
    if (this.playMap) this.playMap.destroyMap();
    this.playerOne.cleanPlayerResources(deleteGameRoom);
    this.playerTwo.cleanPlayerResources(deleteGameRoom);
    this.playerOne = null;
    this.playerTwo = null;
    this.playMap = null;
    this.finished = true;
    this.started = false;
    hideModalWindow("gameCountryAllianceInitialSelectionModal");
    loadMain();
    resetFinishedGame();
  }

  playHit(addCountryBoundariesAndMarkers = true) {
    if (
      this.gameConfiguration.gameMode === "user" &&
      (!this.isPlayerReady || !this.isOpponentPlayerReady)
    ) {
      return;
    }
    if (this.playerOne.playerAttemptToGuess) {
      this.playerOne.playerHit(addCountryBoundariesAndMarkers);
    } else {
      this.playerTwo.playerHit(addCountryBoundariesAndMarkers);
    }
  }

  startGame() {
    if (
      this.gameConfiguration.gameMode === "user" &&
      (this.firebase.opponentConnectionState === "disconnected" ||
        this.firebase.opponentConnectionState === "failed" ||
        this.firebase.opponentConnectionState === "connecting")
    ) {
      alert(
        localization[model.worldCountries.language][
          "Connection with your opponent has failed. Try your attempt later."
        ],
      );
      return;
    }
    if (
      this.gameConfiguration.gameMode === "user" &&
      this.playerOne.playerConfigured &&
      !this.playerTwo.playerConfigured
    ) {
      this.playerOne.gameMessageField.textContent =
        localization[model.worldCountries.language][
          "Opponent has not yet selected countries. Wait for the message to start the game."
        ];
      return;
    }
    this.playMap.initStartPlayMapView();
    this.playMap.cleanMap();
    this.playerOne.addAllCountryBoundariesAndMarkersInitial();
    this.playerTwo.addUserClickCountriesPlayHandler();
    this.started = true;
    if (window.gtag) {
      if (this.gameConfiguration.gameMode === "user") {
        gtag("event", "game_friend_start");
      } else {
        gtag("event", "game_computer_start");
      }
    }
    this.playerOne.sendStartGameToOpponent();
    if (
      this.gameConfiguration.gameMode === "user" &&
      this.firebase &&
      !this.firebase.isHost
    ) {
      this.playerTwo.playerHit();
      return;
    }
    this.playerOne.playerHit();
  }

  opponentConnectionHandler(connectionState) {
    if (this.playerOne)
      this.playerOne.opponentConnectionHandler(connectionState);
  }

  requestSelectedCountriesFromOpponent() {
    if (
      this.firebase &&
      this.firebase.opponentConnectionState === "connected"
    ) {
      const requestCountriesJson = JSON.stringify({
        type: "reqCountries",
      });
      this.firebase.sendMessage(requestCountriesJson);
    }
  }

  sendChatMessage(message) {
    if (
      this.firebase &&
      this.firebase.opponentConnectionState === "connected"
    ) {
      const chatMessageJson = JSON.stringify({
        type: "chat",
        value: message,
      });
      this.firebase.sendChatMessage(chatMessageJson);
      return true;
    } else {
      return false;
    }
  }

  opponentMessagesHandler(message) {
    if (this.playerOne) this.playerOne.opponentMessagesHandler(message);
  }
}
