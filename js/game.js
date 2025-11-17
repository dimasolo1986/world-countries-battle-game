import { localization } from "./localization/ua.js";
import { loadMain } from "./controller.js";
import { showGameResultWindow, showGameRulesWindow } from "./helpers.js";
import * as model from "./model.js";
export class Game {
  finished = false;
  isOpponentPlayerReady = true;
  isPlayerReady = true;
  gameModalResultLabel = document.getElementById("gameModalResultLabel");
  gameModalRulesLabel = document.getElementById("gameModalRulesLabel");
  gameModalRulesContent = document.getElementById("gameRulesContent");
  gameModalRulesCloseButton = document.getElementById("gameRulesCloseButton");
  guessCountriesMessageField;
  gameModalHeading = document.getElementById("gameResultHeading");
  gameResultScore = document.getElementById("gameResultScore");
  gameModalHeadingGuessed = document.getElementById(
    "gameResultHeadingGuesedCountries"
  );
  gameModalResultGuessedCountries =
    document.getElementById("gameResultGuessing");
  gameModalResultCloseButton = document.getElementById("gameResultCloseButton");
  gameModalResultShareButton = document.getElementById("shareGameResults");
  constructor(playerOne, playerTwo, playMap, firebase, gameConfiguration) {
    this.guessCountriesMessageField = document.querySelector(
      "#countries-battle-game-message"
    );
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.playMap = playMap;
    this.firebase = firebase;
    this.gameConfiguration = gameConfiguration;
  }

  showGameRules() {
    this.gameModalRulesLabel.textContent =
      localization[model.worldCountries.language]["Game Rules"];
    this.gameModalRulesCloseButton.textContent =
      localization[model.worldCountries.language]["Close"];
    this.gameModalRulesContent.innerHTML = document.getElementById(
      "game-rules-project-container"
    ).innerHTML;
    const rawParams = window.location.pathname;
    const params = rawParams.split("/");
    let gameRoomId = undefined;
    if (params && params.length >= 2) {
      gameRoomId = params[1];
    }
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
      localization[model.worldCountries.language]["Game Result"];
    this.gameModalResultCloseButton.textContent =
      localization[model.worldCountries.language]["Close"];
    this.gameModalResultShareButton.textContent =
      localization[model.worldCountries.language]["Share"];
    if (playerOneWon) {
      this.guessCountriesMessageField.textContent =
        localization[model.worldCountries.language][
          "Congratulations! You won the game!"
        ];
      this.gameResultScore.textContent =
        localization[model.worldCountries.language]["Score"] +
        ": " +
        this.playerOne.score +
        " " +
        localization[model.worldCountries.language]["Points"];
      this.gameModalHeading.textContent =
        localization[model.worldCountries.language][
          "Congratulations! You won the game!"
        ];
      this.gameModalHeading.style.color = "darkgreen";
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
        this.playerTwo.selectedCountryCodes
      );
      for (let i = 0; i < index; i++) {
        const countriesTemplate =
          this.playerTwo.selectedCountryCodes.size !== countryIndex + 1
            ? `<tr style="display: table-row;"><td style="border:none; display:table-cell;"><img src="${
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
              }" style="height:15px; width:20px; border-radius:2px; box-shadow: 0 2px 5px #00000080,
                              inset 0 2px 10px #0000001f; vertical-align:baseline;"/></td> <td style="border:none;display:table-cell;"><span style="margin-right: 10px;">${
                                localization[model.worldCountries.language][
                                  "countries"
                                ][
                                  this.playerTwo.countries[
                                    selectedCountryCodesArray[countryIndex]
                                  ].countryName
                                ]
                              }</span></td><td style="border:none;display:table-cell;"><img src="${
                this.playerTwo.countries[
                  selectedCountryCodesArray[countryIndex + 1]
                ].countryFlag
              }" alt="${
                localization[model.worldCountries.language]["countries"][
                  this.playerTwo.countries[
                    selectedCountryCodesArray[countryIndex + 1]
                  ].countryName
                ]
              }" title="${
                localization[model.worldCountries.language]["countries"][
                  this.playerTwo.countries[
                    selectedCountryCodesArray[countryIndex + 1]
                  ].countryName
                ]
              }" style="height:15px; width:20px; border-radius:2px; box-shadow: 0 2px 5px #00000080,
                              inset 0 2px 10px #0000001f; vertical-align:baseline;"/></td> <td style="border:none;display:table-cell;"><span>${
                                localization[model.worldCountries.language][
                                  "countries"
                                ][
                                  this.playerTwo.countries[
                                    selectedCountryCodesArray[countryIndex + 1]
                                  ].countryName
                                ]
                              }</span></td></tr>`
            : `<tr style="display: table-row;"><td style="border:none;display:table-cell;"><img src="${
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
              }" style="height:15px; width:20px; border-radius:2px; box-shadow: 0 2px 5px #00000080,
                              inset 0 2px 10px #0000001f; vertical-align:baseline;"/></td><td style="border:none;display:table-cell;"> <span>${
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
          countriesTemplate
        );
        countryIndex = countryIndex + 2;
      }
      this.gameModalResultGuessedCountries.appendChild(userCountriesContainer);
    } else {
      this.guessCountriesMessageField.textContent =
        localization[model.worldCountries.language][
          "Sorry! You lost the game!"
        ];
      this.gameResultScore.textContent =
        localization[model.worldCountries.language]["Score"] +
        ": " +
        this.playerOne.score +
        " " +
        localization[model.worldCountries.language]["Points"];
      this.gameModalHeading.textContent =
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
        this.playerOne.selectedCountryCodes
      );
      for (let i = 0; i < index; i++) {
        const countriesTemplate =
          this.playerOne.selectedCountryCodes.size !== countryIndex + 1
            ? `<tr style="display: table-row;"><td style="border:none;display:table-cell;"><img src="${
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
              }" style="height:15px; width:20px; border-radius:2px; box-shadow: 0 2px 5px #00000080,
                              inset 0 2px 10px #0000001f; vertical-align:baseline;"/> </td><td style="border:none;display:table-cell;"><span style="margin-right: 10px;">${
                                localization[model.worldCountries.language][
                                  "countries"
                                ][
                                  this.playerOne.countries[
                                    selectedCountryCodesArray[countryIndex]
                                  ].countryName
                                ]
                              }</span></td><td style="border:none;display:table-cell;"><img src="${
                this.playerOne.countries[
                  selectedCountryCodesArray[countryIndex + 1]
                ].countryFlag
              }" alt="${
                localization[model.worldCountries.language]["countries"][
                  this.playerOne.countries[
                    selectedCountryCodesArray[countryIndex + 1]
                  ].countryName
                ]
              }" title="${
                localization[model.worldCountries.language]["countries"][
                  this.playerOne.countries[
                    selectedCountryCodesArray[countryIndex + 1]
                  ].countryName
                ]
              }" style="height:15px; width:20px; border-radius:2px; box-shadow: 0 2px 5px #00000080,
                              inset 0 2px 10px #0000001f; vertical-align:baseline;"/></td> <td style="border:none;display:table-cell;"><span>${
                                localization[model.worldCountries.language][
                                  "countries"
                                ][
                                  this.playerOne.countries[
                                    selectedCountryCodesArray[countryIndex + 1]
                                  ].countryName
                                ]
                              }</span></td></tr>`
            : `<tr style="display: table-row;"><td style="border:none;display:table-cell;"><img src="${
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
              }" style="height:15px; width:20px; border-radius:2px; box-shadow: 0 2px 5px #00000080,
                              inset 0 2px 10px #0000001f; vertical-align:baseline;"/></td> <td style="border:none;display:table-cell;"> <span>${
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
          countriesTemplate
        );
        countryIndex = countryIndex + 2;
      }
      this.gameModalResultGuessedCountries.appendChild(userCountriesContainer);
    }
    showGameResultWindow();
    this.playMap.finishGameHandler(false, deleteGameRoom);
  }

  finishGame(deleteGameRoom) {
    if (this.gameConfiguration.gameMode === "user") {
      this.playerOne.sendFinishGameToOpponent();
    }
    this.playerOne.cleanPlayerResources(deleteGameRoom);
    this.playerTwo.cleanPlayerResources(deleteGameRoom);
    this.playerOne = null;
    this.playerTwo = null;
    this.playMap = null;
    this.finished = true;
    loadMain();
  }

  playHit() {
    if (
      this.gameConfiguration.gameMode === "user" &&
      (!this.isPlayerReady || !this.isOpponentPlayerReady)
    ) {
      return;
    }
    if (this.playerOne.playerAttemptToGuess) {
      this.playerOne.playerHit();
    } else {
      this.playerTwo.playerHit();
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
        ]
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
