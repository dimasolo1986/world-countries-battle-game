import { localization } from "./localization/ua.js";
import { loadMain } from "./controller.js";
import { showGameResultWindow } from "./helpers.js";
import * as model from "./model.js";
export class Game {
  id;
  finished = false;
  gameModalResultLabel = document.getElementById("gameModalResultLabel");
  guessCountriesMessageField;
  gameModalHeading = document.getElementById("gameResultHeading");
  gameModalHeadingGuessed = document.getElementById(
    "gameResultHeadingGuesedCountries"
  );
  gameModalResultGuessedCountries =
    document.getElementById("gameResultGuessing");
  constructor(playerOne, playerTwo, playMap) {
    this.guessCountriesMessageField = document.querySelector(
      "#countries-battle-game-message"
    );
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.playMap = playMap;
  }
  initGame() {
    this.id = crypto.randomUUID();
  }

  showGameResult(playerOneWon) {
    this.playerOne.enableMapInteraction();
    this.gameModalResultLabel.textContent =
      localization[model.worldCountries.language]["Game Result"];
    if (playerOneWon) {
      this.guessCountriesMessageField.textContent =
        localization[model.worldCountries.language][
          "Congratulations! You won the game!"
        ];
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
      this.gameModalHeading.textContent =
        localization[model.worldCountries.language][
          "Sorry! You lost the game!"
        ];
      this.gameModalHeading.style.color = "red";
      this.gameModalHeadingGuessed.textContent =
        localization[model.worldCountries.language][
          "Computer guessed all your countries:"
        ];
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
    this.playMap.finishGameHandler(false);
  }

  finishGame() {
    this.playerOne.cleanPlayerResources();
    this.playerTwo.cleanPlayerResources();
    this.playerOne = null;
    this.playerTwo = null;
    this.playMap = null;
    this.id = null;
    this.finished = true;
    loadMain();
  }

  playHit() {
    if (this.playerOne.playerAttemptToGuess) {
      this.playerOne.playerHit();
    } else {
      this.playerTwo.playerHit();
    }
  }

  startGame() {
    this.playMap.initStartPlayMapView();
    this.playerOne.playerHit();
    // this.playerTwo.showSelectedCountries();
  }
}
