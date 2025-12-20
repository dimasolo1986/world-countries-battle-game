import { localization } from "./localization/ua.js";
import { WORLD_MAP_BOUNDS } from "./config.js";
import { COUNTRY_BOUNDS } from "./data/countriesBounds.js";
import {
  getCountryGeo,
  getRandomInt,
  resetGameRoomContainer,
  showGameCountryAllianceGuessedWindow,
  hideGameCountryAllianceGuessedWindow,
} from "./helpers.js";
import * as model from "./model.js";
export class Player {
  playerMap;
  playMap;
  opponentPlayer;
  gameConfiguration;
  playerType;
  game;
  gameMessageField;
  countriesNumberField;
  playButton;
  playerCountriesNumberField;
  playerSelectedCountriesContainer;
  playerSelectedCountriesContainerId;
  lastGuessedCountryNames = [];
  usedHintsCount = 0;
  trapCountryHitted = 0;
  score = 0;
  opponentPlayerConfigAcknowledged = false;
  opponentPlayerStartAcknowledged = false;
  playerAttemptToGuess = false;
  playerWonGame = false;
  playerConfigured = false;
  selectedCountryCodes = new Set();
  selectedCountryTrapCodes = new Set();
  selectedCountryNeighboursCodes = new Set();
  countries = {};
  countriesCodeMapping = {};
  countryBoundaries = {};
  countryTooltips = {};
  countryPopups = {};
  countryMarkers = {};
  hints = {};
  countryUnions = [];
  countryCodes = [];
  countriesToGuessNext = [];
  alreadyGuessedCountryCodes = [];
  constructor(
    playerMap,
    playerSelectedCountriesContainerId,
    playerCountriesNumberContainerId,
    gameConfiguration,
    playerType = "userPlayer"
  ) {
    this.playerMap = playerMap.map;
    this.playMap = playerMap;
    this.gameConfiguration = gameConfiguration;
    this.playerType = playerType;
    this.gameMessageField = document.querySelector(
      "#countries-battle-game-message"
    );
    this.playerSelectedCountriesContainerId =
      playerSelectedCountriesContainerId;
    this.playerCountriesNumberField = document.getElementById(
      playerCountriesNumberContainerId
    );
    this.playerSelectedCountriesContainer = document.getElementById(
      playerSelectedCountriesContainerId
    );
    this.countriesNumberField = document.getElementById(
      "countries-number-field"
    );
    this.playButton = document.querySelector(".guess-country-game-play");
  }

  cleanPlayerResources(deleteGameRoom) {
    if (deleteGameRoom) {
      resetGameRoomContainer();
      sessionStorage.removeItem("game-room");
      if (this.game.firebase) this.game.firebase.cleanupResources(false);
    }
    this.playMap = null;
    this.playerMap = null;
    this.opponentPlayer = null;
    this.gameConfiguration = null;
    this.playerType = null;
    this.game = null;
    this.gameMessageField = null;
    this.countriesNumberField = null;
    this.playButton = null;
    this.playerCountriesNumberField = null;
    this.playerSelectedCountriesContainer = null;
    this.playerSelectedCountriesContainerId = null;
    this.selectedCountryCodes = null;
    this.selectedCountryTrapCodes = null;
    this.selectedCountryNeighboursCodes = null;
    this.countries = null;
    this.lastGuessedCountryNames = [];
    this.countriesCodeMapping = null;
    this.countryBoundaries = null;
    this.countryTooltips = null;
    this.countryPopups = null;
    this.countryMarkers = null;
    this.hints = null;
    this.usedHintsCount = null;
    this.score = null;
    this.trapCountryHitted = null;
    this.playerAttemptToGuess = null;
    this.opponentPlayerConfigAcknowledged = null;
    this.opponentPlayerStartAcknowledged = null;
    this.playerConfigured = null;
    this.playerWonGame = null;
    this.countryUnions = null;
    this.countryCodes = null;
    this.countriesToGuessNext = null;
    this.alreadyGuessedCountryCodes = null;
  }

  initData() {
    this.playMap.initSelectionCountriesMapView();
    this.selectedCountryCodes = new Set();
    this.selectedCountryTrapCodes = new Set();
    this.selectedCountryNeighboursCodes = new Set();
    this.countries = {};
    this.countriesCodeMapping = {};
    this.countryBoundaries = {};
    this.countryTooltips = {};
    this.countryPopups = {};
    this.countryMarkers = {};
    this.hints = {};
    this.score = 0;
    this.usedHintsCount = 0;
    this.trapCountryHitted = 0;
    this.playerAttemptToGuess = false;
    this.opponentPlayerConfigAcknowledged = false;
    this.opponentPlayerStartAcknowledged = false;
    this.playerConfigured = false;
    this.playerWonGame = false;
    this.lastGuessedCountryNames = [];
    this.countryUnions = [
      new Array(4),
      new Array(3),
      new Array(3),
      new Array(2),
      new Array(2),
      new Array(2),
      new Array(1),
      new Array(1),
      new Array(1),
      new Array(1),
    ];
    this.countryCodes = [];
    this.countriesToGuessNext = [];
    this.alreadyGuessedCountryCodes = [];
    model.worldCountries.countries.forEach((country) => {
      const countryGeo = getCountryGeo(country.cca2);
      const countryTooltip = this.createCountryTooltip(country);
      const countryMarker = this.createCountryMarker(
        country,
        countryTooltip,
        14,
        14
      );
      const countryBoundary = this.createCountryBoundary(
        countryGeo,
        country.cca2,
        countryTooltip
      );
      this.addMouseOverStyleEventToCountryBoundary(countryBoundary, {
        weight: 1,
        fillOpacity: 0.5,
        opacity: 1,
        className: country.cca2,
      });
      this.addMouseOutStyleEventToCountryBoundary(countryBoundary, {
        weight: 0,
        fillOpacity: 0.1,
        opacity: 0,
        className: country.cca2,
      });
      const countryPopup = this.createCountryPopup(country);
      if (
        this.gameConfiguration.onlyIndependentCountries &&
        country.independent
      ) {
        this.countryMarkers[country.cca2] = countryMarker;
        this.countryBoundaries[country.cca2] = countryBoundary;
        this.countryPopups[country.cca2] = countryPopup;
        this.countryTooltips[country.cca2] = countryTooltip;
        this.countriesCodeMapping[country.cca3] = country.cca2;
        this.countryCodes.push(country.cca2);
        this.countries[country.cca2] = {
          countryName: country.name.common,
          countryCapital: country.capital?.[0],
          countryRegion: country.region,
          countrySubregion: country?.subregion,
          countryFlag: country.flags.png,
          countryIndependent: country.independent,
          cca2: country.cca2,
          cca3: country.cca3,
          latlng: country.latlng,
          capitalLatLng: country.capitalInfo.latlng,
          countryBorders: country.borders ? country.borders : [],
        };
      } else if (!this.gameConfiguration.onlyIndependentCountries) {
        this.countryMarkers[country.cca2] = countryMarker;
        this.countryBoundaries[country.cca2] = countryBoundary;
        this.countryPopups[country.cca2] = countryPopup;
        this.countryTooltips[country.cca2] = countryTooltip;
        this.countriesCodeMapping[country.cca3] = country.cca2;
        this.countryCodes.push(country.cca2);
        this.countries[country.cca2] = {
          countryName: country.name.common,
          countryCapital: country?.capital?.[0],
          countryRegion: country.region,
          countrySubregion: country?.subregion,
          countryFlag: country.flags.png,
          countryIndependent: country.independent,
          cca2: country.cca2,
          cca3: country.cca3,
          latlng: country.latlng,
          capitalLatLng: country.capitalInfo.latlng,
          countryBorders: country.borders ? country.borders : [],
        };
      }
    });
    if (
      this.gameConfiguration.gameMode === "user" &&
      this.game &&
      this.game.firebase &&
      this.game.firebase.opponentConnectionState
    ) {
      this.game.opponentConnectionHandler(
        this.game.firebase.opponentConnectionState
      );
    }
    this.addCountryBoundariesAndMarkers(
      this.gameConfiguration.maxCountriesNumberInUnion
    );
    this.selectedCountryTrapCodes.forEach((countryCode) => {
      this.selectedCountryCodes.delete(countryCode);
    });
    if (this.playerType === "computerPlayer") {
      this.selectRandomCountries();
      this.addUserClickCountriesPlayHandler();
    }
    this.gameMessageField.textContent = `ℹ️ ${
      localization[model.worldCountries.language][
        "Choose one alliance from four countries"
      ]
    }`;
  }

  addHint(trapCountryCode, addCountryImage) {
    const selectedCountryCodes = [];
    Array.from(this.opponentPlayer.selectedCountryCodes).forEach(
      (countryCode) => {
        if (
          !this.opponentPlayer.alreadyGuessedCountryCodes.includes(
            countryCode
          ) &&
          !(countryCode in this.hints)
        ) {
          selectedCountryCodes.push(countryCode);
        }
      }
    );
    if (selectedCountryCodes.length === 0) return;
    let randomCountryIndex = getRandomInt(0, selectedCountryCodes.length - 1);
    let countryCode = selectedCountryCodes[randomCountryIndex];
    const country = this.opponentPlayer.countries[countryCode];
    if (this.trapCountryHitted === 1) {
      const hasCapital = selectedCountryCodes.some((countryCode) => {
        return (
          this.opponentPlayer.countries[countryCode].countryCapital !==
          undefined
        );
      });
      const countryCapital = country.countryCapital;
      while (!countryCapital && hasCapital) {
        this.addHint(trapCountryCode, addCountryImage);
      }
      if (countryCapital) {
        this.hints[countryCode] = { Capital: countryCapital };
      } else {
        this.hints[countryCode] = { Region: country.countryRegion };
      }
    } else if (this.trapCountryHitted === 2) {
      this.hints[countryCode] = { Region: country.countryRegion };
    } else {
      const hasSubregion = selectedCountryCodes.some((countryCode) => {
        return (
          this.opponentPlayer.countries[countryCode].countrySubregion !==
          undefined
        );
      });
      const countrySubregion = country.countrySubregion;
      while (!countrySubregion && hasSubregion) {
        this.addHint(trapCountryCode, addCountryImage);
      }
      if (countrySubregion) {
        this.hints[countryCode] = { Subregion: countrySubregion };
      } else {
        this.hints[countryCode] = { Region: country.countryRegion };
      }
    }
    this.addSelectedCountryToCountryPanel(
      this.playerSelectedCountriesContainerId,
      trapCountryCode,
      Array.from(this.selectedCountryTrapCodes).indexOf(trapCountryCode) + 21,
      addCountryImage
    );
  }

  isHintUsed(countryCode) {
    const country = this.countries[countryCode];
    let isUsed = false;
    Object.entries(this.hints).forEach(([countryCodeObject, countryObject]) => {
      const countryValue = Object.values(countryObject)[0];
      if (
        countryCode in this.hints ||
        country.countryCapital === countryValue ||
        country.countryRegion === countryValue ||
        country.countrySubregion === countryValue
      ) {
        isUsed = true;
        delete this.hints[countryCodeObject];
      }
    });
    return isUsed;
  }

  removeHint(countryCode) {
    delete this.hints[countryCode];
  }

  isCountryUnionGuessed(countryUnionIndex) {
    const countryUnion = this.countryUnions[countryUnionIndex];
    return !countryUnion.some((country) => !Object.values(country)[0].guessed);
  }

  getCountryUnionIndex(countryCode) {
    let countryUnionIndexToReturn = undefined;
    this.countryUnions.forEach((countryUnion, countryUnionIndex) => {
      if (countryUnionIndexToReturn) return;
      countryUnion.forEach((country) => {
        if (countryCode in country) {
          country[countryCode].guessed = true;
          countryUnionIndexToReturn = countryUnionIndex;
          return;
        }
      });
    });
    return countryUnionIndexToReturn;
  }

  openCountryPopup(countryCode) {
    const countryPopup = this.countryPopups[countryCode];
    if (countryPopup) {
      countryPopup.openOn(this.playerMap);
    }
  }

  closeCountryPopup(countryCode) {
    const countryPopup = this.countryPopups[countryCode];
    if (countryPopup) {
      countryPopup.close();
      this.playerMap.removeLayer(countryPopup);
      this.playerMap.removeLayer(this.countryTooltips[countryCode]);
      delete this.countryPopups[countryCode];
      delete this.countryTooltips[countryCode];
    }
  }

  createCountryUnionMessageHtml(countryUnionIndex) {
    const countryUnion = this.countryUnions[countryUnionIndex];
    const countryUnionTable = document.createElement("table");
    const countryUnionRow = document.createElement("tr");
    countryUnionRow.style.marginBottom = "0px";
    countryUnionTable.appendChild(countryUnionRow);
    countryUnion.forEach((countryObject) => {
      const countryCode = Object.keys(countryObject)[0];
      const country = this.countries[countryCode];
      countryUnionRow.insertAdjacentHTML(
        "beforeend",
        `<td>
                  <img
                    src="${country.countryFlag}"
                    width="10px"
                    height="10px"
                    style="
                      border-radius: 50%;
                      border: 1px solid grey;
                      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.5),
                        0 2px 10px 0 rgba(0, 0, 0, 0.12) inset;
                    "
                    alt="Country Flag"
                  />
                </td>`
      );
    });
    return countryUnionTable;
  }

  setMessageInnerHtmlField(message) {
    this.gameMessageField.innerHTML = "";
    this.gameMessageField.innerHTML = message;
  }

  addHintsToHintPanel() {
    const hintsPanel = document.getElementById("hints-panel");
    if (Object.keys(this.hints).length !== 0) {
      const hintsPanelContent = document.getElementById("hints-panel-content");
      hintsPanelContent.innerHTML = "";
      Object.keys(this.hints).forEach((countryCode, index) => {
        const hintObject = this.hints[countryCode];
        const hintHeader = Object.keys(hintObject)[0];
        const hintValue = Object.values(hintObject)[0];
        const hintHtml = `<div style="font-size:0.7rem;">${(
          index + 1
        ).toString()}.&nbsp;${
          localization[model.worldCountries.language][hintHeader]
        }:&nbsp;${
          hintHeader === "Capital"
            ? localization[model.worldCountries.language]["capitals"][hintValue]
            : localization[model.worldCountries.language][hintValue]
        }</div>`;
        hintsPanelContent.insertAdjacentHTML("beforeend", hintHtml);
      });
      hintsPanel.classList.remove("not-displayed");
    } else {
      hintsPanel.classList.add("not-displayed");
    }
  }

  isCountriesContainHint(hint) {
    return this.countryCodes.some((countryCode) => {
      const country = this.countries[countryCode];
      return (
        country.countryCapital === hint ||
        country.countryRegion === hint ||
        country.countrySubregion === hint
      );
    });
  }

  selectComputerRandomCountryByHint(hint) {
    const countries = Object.values(this.countries).filter((country) => {
      return (
        (country.countryCapital === hint ||
          country.countryRegion === hint ||
          country.countrySubregion === hint) &&
        !this.alreadyGuessedCountryCodes.includes(country.cca2) &&
        this.countryCodes.includes(country.cca2)
      );
    });
    if (countries.length === 1) {
      return countries[0].cca2;
    } else {
      const countryIndex = getRandomInt(0, countries.length - 1);
      return countries[countryIndex].cca2;
    }
  }

  enableMapInteraction() {
    this.countryCodes.forEach((countryCode) => {
      if (!this.alreadyGuessedCountryCodes.includes(countryCode)) {
        const countryBoundaryEl = document.querySelector(`.${countryCode}`);
        if (countryBoundaryEl) {
          countryBoundaryEl.style.cursor = "pointer";
          countryBoundaryEl.style.pointerEvents = "auto";
        }
      }
    });
    const markers = document.querySelectorAll("img.leaflet-marker-icon");
    markers.forEach((marker) => {
      marker.style.cursor = "pointer";
      marker.style.pointerEvents = "auto";
    });
    if (this.playerMap) {
      this.playerMap.dragging.enable();
      this.playerMap.doubleClickZoom.enable();
      this.playerMap.scrollWheelZoom.enable();
      this.playerMap.boxZoom.enable();
      this.playerMap.keyboard.enable();
      if (this.playerMap.tap) this.playerMap.tap.enable();
      document.getElementById("playMap").style.cursor = "grab";
    }
  }

  disableMapInteraction() {
    this.countryCodes.forEach((countryCode) => {
      const countryBoundaryEl = document.querySelector(`.${countryCode}`);
      if (countryBoundaryEl) {
        countryBoundaryEl.style.cursor = "none";
        countryBoundaryEl.style.pointerEvents = "none";
      }
    });
    const markers = document.querySelectorAll("img.leaflet-marker-icon");
    markers.forEach((marker) => {
      marker.style.cursor = "none";
      marker.style.pointerEvents = "none";
    });
    if (this.playerMap) {
      this.playerMap.dragging.disable();
      this.playerMap.doubleClickZoom.disable();
      this.playerMap.scrollWheelZoom.disable();
      this.playerMap.boxZoom.disable();
      this.playerMap.keyboard.disable();
      if (this.playerMap.tap) this.playerMap.tap.disable();
      document.getElementById("playMap").style.cursor = "default";
    }
  }

  async playerHit() {
    this.playMap.cleanMap();
    this.opponentPlayer.addAllCountryBoundaries();
    this.opponentPlayer.addAllCountryMarkers();
    this.addHintsToHintPanel();
    if (this.playerType === "computerPlayer") {
      this.playMap.hideMapElement("available-countries-panel");
      this.opponentPlayer.disableMapInteraction();
      this.playMap.setMapFiledLabel("Your Map");
      this.countriesNumberField.textContent =
        this.opponentPlayer.countryCodes.length;
      this.gameMessageField.textContent = `ℹ️ ${
        localization[model.worldCountries.language][
          "Computer is guessing your country..."
        ]
      }`;
      await this.sleep(700);
      let countryIndex = undefined;
      let countryCode = undefined;
      if (this.countriesToGuessNext.length !== 0) {
        countryIndex = getRandomInt(0, this.countriesToGuessNext.length - 1);
        countryCode = this.countriesToGuessNext[countryIndex];
        this.countriesToGuessNext.splice(countryIndex, 1);
        const countryToDeleteIndex =
          this.opponentPlayer.countryCodes.indexOf(countryCode);
        if (countryToDeleteIndex >= 0)
          this.opponentPlayer.countryCodes.splice(countryToDeleteIndex, 1);
        this.opponentPlayer.alreadyGuessedCountryCodes.push(countryCode);
      } else if (Object.keys(this.hints).length !== 0) {
        const countryCodeKey = Object.keys(this.hints)[0];
        const hintObject = this.hints[countryCodeKey];
        const hint = Object.values(hintObject)[0];
        if (this.opponentPlayer.isCountriesContainHint(hint)) {
          countryCode =
            this.opponentPlayer.selectComputerRandomCountryByHint(hint);
          this.opponentPlayer.alreadyGuessedCountryCodes.push(countryCode);
          countryIndex = this.opponentPlayer.countryCodes.indexOf(countryCode);
          this.opponentPlayer.countryCodes.splice(countryIndex, 1);
        } else {
          this.removeHint(countryCode);
          this.usedHintsCount = this.usedHintsCount + 1;
          countryIndex = getRandomInt(
            0,
            this.opponentPlayer.countryCodes.length - 1
          );
          countryCode = this.opponentPlayer.countryCodes[countryIndex];
          this.opponentPlayer.alreadyGuessedCountryCodes.push(countryCode);
          this.opponentPlayer.countryCodes.splice(countryIndex, 1);
        }
      } else {
        countryIndex = getRandomInt(
          0,
          this.opponentPlayer.countryCodes.length - 1
        );
        countryCode = this.opponentPlayer.countryCodes[countryIndex];
        this.opponentPlayer.alreadyGuessedCountryCodes.push(countryCode);
        this.opponentPlayer.countryCodes.splice(countryIndex, 1);
      }
      this.countriesNumberField.textContent =
        this.opponentPlayer.countryCodes.length;
      const country = this.countries[countryCode];
      const countryBoundary =
        this.opponentPlayer.countryBoundaries[countryCode];
      const countryMarker = this.opponentPlayer.countryMarkers[countryCode];
      countryMarker.unbindTooltip();
      countryBoundary.unbindTooltip();
      countryMarker.off();
      countryBoundary.off();
      this.opponentPlayer.playerMap.removeLayer(countryMarker);
      delete this.opponentPlayer.countryMarkers[countryCode];
      const countryBound = COUNTRY_BOUNDS.find(
        (bound) => country.countryName === bound.name
      );
      this.opponentPlayer.openCountryPopup(countryCode);
      const countryCoordinates = country.latlng
        ? country.latlng
        : country.capitalLatLng;
      if (countryBound) {
        this.opponentPlayer.playerMap.fitBounds(countryBound.bounds, {
          animate: false,
        });
      } else {
        this.opponentPlayer.playerMap.setView(countryCoordinates, 4.5, {
          animate: false,
        });
      }
      if (this.opponentPlayer.selectedCountryTrapCodes.has(countryCode)) {
        this.setMessageInnerHtmlField(
          `<span>⚠️ ${
            localization[model.worldCountries.language][
              "Computer has fallen into a trap-country"
            ]
          }</span> <img src="${
            country.countryFlag
          }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 2px 5px #00000080, inset 0 2px 10px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;">${
            localization[model.worldCountries.language]["countries"][
              country.countryName
            ]
          }.</span> <span style="margin-left:5px;">${
            localization[model.worldCountries.language][
              "The opponent gets a hint"
            ]
          }</span>`
        );
        this.opponentPlayer.trapCountryHitted =
          this.opponentPlayer.trapCountryHitted + 1;
        if (this.opponentPlayer.trapCountryHitted === 1) {
          this.score = this.score - 10;
        } else if (this.opponentPlayer.trapCountryHitted === 2) {
          this.score = this.score - 20;
        } else {
          this.score = this.score - 30;
        }
        document.getElementById(
          "player-two-score-field"
        ).textContent = `🏅 ${this.score}`;
        this.opponentPlayer.addHint(countryCode, false);
        this.opponentPlayer.setElementStyle(countryBoundary, {
          weight: 1,
          color: "orange",
          fillColor: "orange",
          fillOpacity: 0.5,
          opacity: 0.8,
          className: countryCode,
        });
        this.playerAttemptToGuess = false;
        this.opponentPlayer.playerAttemptToGuess = true;
        await this.sleep(1500);
        this.opponentPlayer.closeCountryPopup(countryCode);
        this.opponentPlayer.playerMap.removeLayer(countryBoundary);
        delete this.opponentPlayer.countryBoundaries[countryCode];
        const countryBorderCodes = country.countryBorders
          .map((countryBorder) => {
            return this.opponentPlayer.countriesCodeMapping[countryBorder];
          })
          .filter(
            (countryCode) =>
              countryCode !== undefined &&
              this.opponentPlayer.countryCodes.includes(countryCode)
          );
        countryBorderCodes.forEach((countryBorderCode) => {
          if (
            !this.opponentPlayer.selectedCountryTrapCodes.has(countryBorderCode)
          ) {
            const countryBoundary =
              this.opponentPlayer.countryBoundaries[countryBorderCode];
            const countryMarker =
              this.opponentPlayer.countryMarkers[countryBorderCode];
            countryMarker.unbindTooltip();
            countryBoundary.unbindTooltip();
            countryMarker.off();
            countryBoundary.off();
            this.opponentPlayer.playerMap.removeLayer(countryMarker);
            this.opponentPlayer.playerMap.removeLayer(countryBoundary);
            delete this.opponentPlayer.countryMarkers[countryBorderCode];
            delete this.opponentPlayer.countryPopups[countryBorderCode];
            delete this.opponentPlayer.countryTooltips[countryBorderCode];
            delete this.opponentPlayer.countryBoundaries[countryBorderCode];
            const countryIndexToDelete =
              this.opponentPlayer.countryCodes.indexOf(countryBorderCode);
            if (countryIndexToDelete >= 0)
              this.opponentPlayer.countryCodes.splice(countryIndexToDelete, 1);
            this.countriesNumberField.textContent =
              this.opponentPlayer.countryCodes.length;
          }
        });
        this.opponentPlayer.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
          animate: false,
        });
        this.opponentPlayer.enableMapInteraction();
      } else if (this.game && this.game.bonusCountries.includes(countryCode)) {
        this.playerAttemptToGuess = true;
        this.opponentPlayer.playerAttemptToGuess = false;
        const countryBoundaryComputer = this.countryBoundaries[countryCode];
        const countryMarker = this.countryMarkers[countryCode];
        const countryToDeleteIndex = this.countryCodes.indexOf(countryCode);
        if (countryToDeleteIndex >= 0)
          this.countryCodes.splice(countryToDeleteIndex, 1);
        this.alreadyGuessedCountryCodes.push(countryCode);
        if (countryMarker) {
          countryMarker.unbindTooltip();
          countryMarker.off();
          this.playerMap.removeLayer(countryMarker);
          delete this.countryMarkers[countryCode];
        }
        if (countryBoundaryComputer) {
          countryBoundaryComputer.unbindTooltip();
          countryBoundaryComputer.off();
          this.setElementStyle(countryBoundaryComputer, {
            weight: 1,
            color: "purple",
            fillColor: "purple",
            fillOpacity: 0.5,
            opacity: 0.8,
            className: countryCode,
          });
        }
        this.opponentPlayer.setElementStyle(countryBoundary, {
          weight: 1,
          color: "purple",
          fillColor: "purple",
          fillOpacity: 0.5,
          opacity: 0.8,
          className: countryCode,
        });
        this.score = this.score + 10;
        document.getElementById(
          "player-two-score-field"
        ).textContent = `🏅 ${this.score}`;
        this.setMessageInnerHtmlField(
          `<span>ℹ️ ${
            localization[model.worldCountries.language][
              "Computer has fallen into a bonus-country"
            ]
          }</span> <img src="${
            country.countryFlag
          }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 2px 5px #00000080, inset 0 2px 10px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;">${
            localization[model.worldCountries.language]["countries"][
              country.countryName
            ]
          }.</span> <span style="margin-left:5px;">${
            localization[model.worldCountries.language][
              "Additional attempt to guess and"
            ]
          }</span><span style="
                    margin-left: 3px;
                    color: white;
                    border-radius: 2px;
                    background-color: green;
                    padding-left: 2px;
                    padding-right: 2px;
                    font-weight: bolder;
                  ">+10 ${
                    localization[model.worldCountries.language]["Points"]
                  }</span>`
        );
        await this.sleep(1500);
        this.opponentPlayer.closeCountryPopup(countryCode);
        this.opponentPlayer.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
          animate: false,
        });
      } else if (this.opponentPlayer.selectedCountryCodes.has(countryCode)) {
        this.playerAttemptToGuess = true;
        this.opponentPlayer.playerAttemptToGuess = false;
        if (this.isHintUsed(countryCode)) {
          this.usedHintsCount = this.usedHintsCount + 1;
        }
        this.opponentPlayer.setElementStyle(countryBoundary, {
          weight: 1,
          color: "red",
          fillColor: "red",
          fillOpacity: 0.5,
          opacity: 0.8,
          className: countryCode,
        });
        this.opponentPlayer.addSelectedCountryToCountryPanel(
          this.opponentPlayer.playerSelectedCountriesContainerId,
          countryCode,
          Array.from(this.opponentPlayer.selectedCountryCodes).indexOf(
            countryCode
          ) + 1,
          false
        );
        const countryUnionIndex =
          this.opponentPlayer.getCountryUnionIndex(countryCode);
        const isCountryUnionGuessed =
          this.opponentPlayer.isCountryUnionGuessed(countryUnionIndex);
        if (isCountryUnionGuessed) {
          this.opponentPlayer.playerCountriesNumberField.textContent =
            +this.opponentPlayer.playerCountriesNumberField.textContent - 1;
          this.countriesToGuessNext = [];
          const countryUnion =
            this.opponentPlayer.countryUnions[countryUnionIndex];
          if (countryUnion.length === 4) {
            this.score = this.score + 15;
          } else if (countryUnion.length === 3) {
            this.score = this.score + 25;
          } else if (countryUnion.length === 2) {
            this.score = this.score + 35;
          } else if (countryUnion.length === 1) {
            this.score = this.score + 50;
          }
          document.getElementById(
            "player-two-score-field"
          ).textContent = `🏅 ${this.score}`;
          countryUnion.forEach((countryObject) => {
            const countryCode = Object.keys(countryObject)[0];
            const country = this.opponentPlayer.countries[countryCode];
            const countryBorderCodes = country.countryBorders
              .map((countryBorder) => {
                return this.opponentPlayer.countriesCodeMapping[countryBorder];
              })
              .filter(
                (countryCode) =>
                  countryCode !== undefined &&
                  this.opponentPlayer.countryCodes.includes(countryCode)
              );
            countryBorderCodes.forEach((countryBorderCode) => {
              if (
                !this.opponentPlayer.selectedCountryCodes.has(countryBorderCode)
              ) {
                const countryBoundary =
                  this.opponentPlayer.countryBoundaries[countryBorderCode];
                const countryMarker =
                  this.opponentPlayer.countryMarkers[countryBorderCode];
                countryMarker.unbindTooltip();
                countryBoundary.unbindTooltip();
                countryMarker.off();
                countryBoundary.off();
                this.opponentPlayer.playerMap.removeLayer(countryMarker);
                this.opponentPlayer.playerMap.removeLayer(countryBoundary);
                delete this.opponentPlayer.countryMarkers[countryBorderCode];
                delete this.opponentPlayer.countryPopups[countryBorderCode];
                delete this.opponentPlayer.countryTooltips[countryBorderCode];
                delete this.opponentPlayer.countryBoundaries[countryBorderCode];
                const countryIndexToDelete =
                  this.opponentPlayer.countryCodes.indexOf(countryBorderCode);
                if (countryIndexToDelete >= 0)
                  this.opponentPlayer.countryCodes.splice(
                    countryIndexToDelete,
                    1
                  );
                this.countriesNumberField.textContent =
                  this.opponentPlayer.countryCodes.length;
              }
            });
          });
          const countryUnionHtml =
            this.opponentPlayer.createCountryUnionMessageHtml(
              countryUnionIndex
            );
          this.setMessageInnerHtmlField(
            `<span style="margin-right:5px;">⚠️ ${
              localization[model.worldCountries.language]["Computer guessed"]
            }</span><div style="display: inline-block;">${
              countryUnionHtml.outerHTML
            }</div><span style="margin-left:5px;">${
              localization[model.worldCountries.language]["Country Alliance"]
            }</span>`
          );
          await this.sleep(1500);
          this.opponentPlayer.closeCountryPopup(countryCode);
          this.opponentPlayer.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
            animate: false,
          });
        } else {
          const countriesToGuessNext = country.countryBorders
            .map((countryBorder) => {
              return this.countriesCodeMapping[countryBorder];
            })
            .filter((countryCode) => countryCode !== undefined);
          countriesToGuessNext.forEach((country) => {
            if (
              !this.countriesToGuessNext.includes(country) &&
              !this.opponentPlayer.alreadyGuessedCountryCodes.includes(
                country
              ) &&
              this.opponentPlayer.countryCodes.includes(country)
            ) {
              this.countriesToGuessNext.push(country);
            }
          });
          this.setMessageInnerHtmlField(
            `<span>ℹ️ ${
              localization[model.worldCountries.language]["Computer guessed"]
            }</span> <img src="${
              country.countryFlag
            }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 2px 5px #00000080, inset 0 2px 10px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;">${
              localization[model.worldCountries.language]["countries"][
                country.countryName
              ]
            }</span>`
          );
          await this.sleep(1000);
          this.opponentPlayer.closeCountryPopup(countryCode);
        }
      } else {
        this.opponentPlayer.setElementStyle(countryBoundary, {
          weight: 1,
          color: "grey",
          fillColor: "grey",
          fillOpacity: 0.5,
          opacity: 0.8,
          className: countryCode,
        });
        this.gameMessageField.textContent = `⛔ ${
          localization[model.worldCountries.language][
            "Computer failed to guess your country!"
          ]
        }`;
        this.playerAttemptToGuess = false;
        this.opponentPlayer.playerAttemptToGuess = true;
        await this.sleep(1000);
        this.opponentPlayer.closeCountryPopup(countryCode);
        this.opponentPlayer.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
          animate: false,
        });
        this.opponentPlayer.playerMap.removeLayer(countryBoundary);
        delete this.opponentPlayer.countryBoundaries[countryCode];
        this.opponentPlayer.enableMapInteraction();
      }

      if (+this.opponentPlayer.playerCountriesNumberField.textContent === 0) {
        this.score += +this.playerCountriesNumberField.textContent * 10;
        this.playerWonGame = true;
        this.game.finished = true;
        this.game.showGameResult(false, false);
        return;
      }
    } else if (this.playerType === "userPlayer") {
      this.opponentPlayer.enableMapInteraction();
      if (this.opponentPlayer.countryCodes.length <= 5) {
        this.opponentPlayer.addAvailableCountriesPanel();
      }
      this.playMap.setMapFiledLabel(
        this.gameConfiguration.gameMode === "user"
          ? "Opponent Map"
          : "Computer Map"
      );
      this.countriesNumberField.textContent =
        this.opponentPlayer.countryCodes.length;
      this.gameMessageField.textContent = `⚠️ ${
        localization[model.worldCountries.language][
          "Your attempt to guess opponent's country"
        ]
      }`;
      if (this.opponentPlayer.lastGuessedCountryNames.length !== 0) {
        const countryBounds = [];
        this.opponentPlayer.lastGuessedCountryNames.forEach((countryName) => {
          const countryBound = COUNTRY_BOUNDS.find(
            (bound) => countryName === bound.name
          );
          if (countryBound) countryBounds.push(...countryBound.bounds);
        });
        if (countryBounds.length !== 0)
          this.opponentPlayer.playerMap.fitBounds(countryBounds, {
            animate: false,
          });
      }
      this.game.isOpponentPlayerReady = false;
      this.game.isPlayerReady = false;
      return;
    } else {
      this.opponentPlayer.disableMapInteraction();
      this.playMap.setMapFiledLabel("Your Map");
      this.countriesNumberField.textContent =
        this.opponentPlayer.countryCodes.length;
      this.gameMessageField.textContent = `ℹ️ ${
        localization[model.worldCountries.language][
          "Opponent is guessing your country..."
        ]
      }`;
      this.game.isOpponentPlayerReady = false;
      this.game.isPlayerReady = false;
      return;
    }
    this.game.playHit();
  }

  addAvailableCountriesPanel() {
    const setViewCountry = function (country) {
      const countryBound = COUNTRY_BOUNDS.find(
        (bound) => country.countryName === bound.name
      );
      if (countryBound) {
        this.playerMap.fitBounds(countryBound.bounds, {
          animate: false,
        });
      } else {
        this.playerMap.setView(
          country.latlng ? country.latlng : country.capitalLatLng,
          4.5,
          { animate: false }
        );
      }
    };
    const availableCountriesPanel = document.getElementById(
      "available-countries-panel"
    );
    const availableCountriesPanelContent = document.getElementById(
      "available-countries-panel-content"
    );
    if (availableCountriesPanelContent) {
      availableCountriesPanelContent.innerHTML = "";
      this.countryCodes.forEach((countryCode) => {
        const country = this.countries[countryCode];
        const container = document.createElement("div");
        container.style.cursor = "pointer";
        const locationIcon = document.createElement("span");
        locationIcon.textContent = "📍";
        locationIcon.style.width = "10px";
        locationIcon.style.height = "10px";
        locationIcon.style.marginRight = "5px";
        const countryImg = document.createElement("img");
        countryImg.src = country.countryFlag;
        countryImg.style =
          "width:9px; height:9px; border-radius:50%; border:1px solid black; box-shadow: 0 2px 5px #00000080, inset 0 2px 10px #0000001f; margin-right:5px;display:inline-block;";
        const countryName = document.createElement("span");
        countryName.textContent =
          localization[model.worldCountries.language]["countries"][
            country.countryName
          ];
        countryName.style = "font-size:0.7rem;";
        container.addEventListener("click", setViewCountry.bind(this, country));
        container.appendChild(locationIcon);
        container.appendChild(countryImg);
        container.appendChild(countryName);
        availableCountriesPanelContent.appendChild(container);
      });
    }
    if (availableCountriesPanel) {
      availableCountriesPanel.classList.remove("not-displayed");
    }
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async addUserClickCountriesPlay(countryCode, countryBoundary, countryMarker) {
    if (
      this.gameConfiguration.gameMode === "user" &&
      (this.game.firebase.opponentConnectionState === "disconnected" ||
        this.game.firebase.opponentConnectionState === "failed" ||
        this.game.firebase.opponentConnectionState === "connecting")
    ) {
      alert(
        "⚠️ " +
          localization[model.worldCountries.language][
            "Connection with your opponent has failed. Try your attempt later."
          ]
      );
      return;
    }
    if (
      this.gameConfiguration.gameMode === "user" &&
      !this.opponentPlayer.opponentPlayerStartAcknowledged
    ) {
      this.gameMessageField.textContent =
        "⚠️ " +
        localization[model.worldCountries.language][
          "Opponent has not yet started game. Wait for the message to start."
        ];
      return;
    }
    if (this.gameConfiguration.gameMode === "user") {
      this.sendMoveToOpponent(countryCode);
    }
    this.disableMapInteraction();
    this.alreadyGuessedCountryCodes.push(countryCode);
    const country = this.countries[countryCode];
    const countryIndexToDelete = this.countryCodes.indexOf(countryCode);
    this.countryCodes.splice(countryIndexToDelete, 1);
    if (this.countryCodes.length <= 5) this.addAvailableCountriesPanel();
    countryMarker.unbindTooltip();
    countryBoundary.unbindTooltip();
    countryMarker.off();
    countryBoundary.off();
    this.playerMap.removeLayer(countryMarker);
    delete this.countryMarkers[countryCode];
    this.countriesNumberField.textContent = this.countryCodes.length;
    this.openCountryPopup(countryCode);
    if (this.selectedCountryTrapCodes.has(countryCode)) {
      this.setMessageInnerHtmlField(
        `<span>⛔ ${
          localization[model.worldCountries.language][
            "You have fallen into a trap-country"
          ]
        }</span> <img src="${
          country.countryFlag
        }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 2px 5px #00000080, inset 0 2px 10px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;">${
          localization[model.worldCountries.language]["countries"][
            country.countryName
          ]
        }.</span> <span style="margin-left:5px;">${
          localization[model.worldCountries.language][
            "The opponent gets a hint"
          ]
        }</span>`
      );
      if (this.gameConfiguration.gameMode === "user") {
        this.trapCountryHitted = this.trapCountryHitted + 1;
        this.addSelectedCountryToCountryPanel(
          this.playerSelectedCountriesContainerId,
          countryCode,
          Array.from(this.selectedCountryTrapCodes).indexOf(countryCode) + 21,
          true
        );
      } else {
        this.trapCountryHitted = this.trapCountryHitted + 1;
        this.addHint(countryCode, true);
      }
      let points = 0;
      if (this.trapCountryHitted === 1) {
        this.opponentPlayer.score = this.opponentPlayer.score - 10;
        points = 10;
      } else if (this.trapCountryHitted === 2) {
        this.opponentPlayer.score = this.opponentPlayer.score - 20;
        points = 20;
      } else {
        this.opponentPlayer.score = this.opponentPlayer.score - 30;
        points = 30;
      }
      document.getElementById(
        "player-one-score-field"
      ).textContent = `🏅 ${this.opponentPlayer.score}`;
      this.setElementStyle(countryBoundary, {
        weight: 1,
        color: "orange",
        fillColor: "orange",
        fillOpacity: 0.5,
        opacity: 0.8,
        className: countryCode,
      });
      document.getElementById(
        "guessed-country-alliance-panel-content"
      ).innerHTML = `<div style="background-color: red; border-radius: 2px;">&nbsp;⚠️&nbsp;<span style="
                    color: white;
                    font-size: 0.75rem;
                    border-radius: 2px;
                    background-color: red;
                    padding-left: 3px;
                    padding-right: 3px;
                    font-weight: bolder;
                  ">-${points} ${
        localization[model.worldCountries.language]["Points"]
      }</span></div>`;
      const guessedCountryAlliance = document.getElementById(
        "guessed-country-alliance-panel"
      );
      const guessedCountryAllianceHeader = document.getElementById(
        "guessed-country-alliance-header"
      );
      guessedCountryAllianceHeader.classList.add("not-displayed");
      guessedCountryAlliance.classList.remove("not-displayed");
      const countryBorderCodes = country.countryBorders
        .map((countryBorder) => {
          return this.countriesCodeMapping[countryBorder];
        })
        .filter(
          (countryCode) =>
            countryCode !== undefined && this.countryCodes.includes(countryCode)
        );
      countryBorderCodes.forEach((countryBorderCode) => {
        if (!this.selectedCountryTrapCodes.has(countryBorderCode)) {
          const countryBoundary = this.countryBoundaries[countryBorderCode];
          const countryMarker = this.countryMarkers[countryBorderCode];
          countryMarker.unbindTooltip();
          countryBoundary.unbindTooltip();
          countryMarker.off();
          countryBoundary.off();
          this.playerMap.removeLayer(countryBoundary);
          this.playerMap.removeLayer(countryMarker);
          delete this.countryMarkers[countryBorderCode];
          delete this.countryBoundaries[countryBorderCode];
          const countryIndexToDelete =
            this.countryCodes.indexOf(countryBorderCode);
          if (countryIndexToDelete >= 0) {
            this.countryCodes.splice(countryIndexToDelete, 1);
          }
          this.countriesNumberField.textContent = this.countryCodes.length;
        }
      });
      this.playerAttemptToGuess = true;
      this.opponentPlayer.playerAttemptToGuess = false;
      await this.sleep(1500);
      guessedCountryAlliance.classList.add("not-displayed");
      guessedCountryAllianceHeader.classList.remove("not-displayed");
      this.closeCountryPopup(countryCode);
      this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
        animate: false,
      });
    } else if (this.game && this.game.bonusCountries.includes(countryCode)) {
      this.playerAttemptToGuess = false;
      this.opponentPlayer.playerAttemptToGuess = true;
      const countryBoundaryUser =
        this.opponentPlayer.countryBoundaries[countryCode];
      const countryMarker = this.opponentPlayer.countryMarkers[countryCode];
      const countryToDeleteIndex =
        this.opponentPlayer.countryCodes.indexOf(countryCode);
      if (countryToDeleteIndex >= 0)
        this.opponentPlayer.countryCodes.splice(countryToDeleteIndex, 1);
      this.opponentPlayer.alreadyGuessedCountryCodes.push(countryCode);
      if (countryMarker) {
        countryMarker.unbindTooltip();
        countryMarker.off();
        this.opponentPlayer.playerMap.removeLayer(countryMarker);
        delete this.opponentPlayer.countryMarkers[countryCode];
      }
      if (countryBoundaryUser) {
        countryBoundaryUser.unbindTooltip();
        countryBoundaryUser.off();
        this.opponentPlayer.setElementStyle(countryBoundaryUser, {
          weight: 1,
          color: "purple",
          fillColor: "purple",
          fillOpacity: 0.5,
          opacity: 0.8,
          className: countryCode,
        });
      }
      this.setElementStyle(countryBoundary, {
        weight: 1,
        color: "purple",
        fillColor: "purple",
        fillOpacity: 0.5,
        opacity: 0.8,
        className: countryCode,
      });
      this.opponentPlayer.score = this.opponentPlayer.score + 10;
      document.getElementById(
        "player-one-score-field"
      ).textContent = `🏅 ${this.opponentPlayer.score}`;
      this.setMessageInnerHtmlField(
        `<span>🎁 ${
          localization[model.worldCountries.language][
            "You have fallen into a bonus-country"
          ]
        }</span> <img src="${
          country.countryFlag
        }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 2px 5px #00000080, inset 0 2px 10px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;">${
          localization[model.worldCountries.language]["countries"][
            country.countryName
          ]
        }.</span> <span style="margin-left:5px;">${
          localization[model.worldCountries.language][
            "Additional attempt to guess and"
          ]
        }</span><span style="
                    margin-left: 3px;
                    color: white;
                    border-radius: 2px;
                    background-color: green;
                    padding-left: 2px;
                    padding-right: 2px;
                    font-weight: bolder;
                  ">+10 ${
                    localization[model.worldCountries.language]["Points"]
                  }</span>`
      );
      await this.sleep(1500);
      this.closeCountryPopup(countryCode);
      this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
        animate: false,
      });
    } else if (this.selectedCountryCodes.has(countryCode)) {
      this.playerAttemptToGuess = false;
      this.opponentPlayer.playerAttemptToGuess = true;
      if (this.opponentPlayer.isHintUsed(countryCode)) {
        this.opponentPlayer.usedHintsCount = this.usedHintsCount + 1;
      }
      this.setElementStyle(countryBoundary, {
        weight: 1,
        color: "green",
        fillColor: "green",
        fillOpacity: 0.5,
        opacity: 0.8,
        className: countryCode,
      });
      const countryUnionIndex = this.getCountryUnionIndex(countryCode);
      const isCountryUnionGuessed =
        this.isCountryUnionGuessed(countryUnionIndex);
      if (isCountryUnionGuessed) {
        this.playerCountriesNumberField.textContent =
          +this.playerCountriesNumberField.textContent - 1;
        const countryUnion = this.countryUnions[countryUnionIndex];
        let points = 0;
        if (countryUnion.length === 4) {
          this.opponentPlayer.score = this.opponentPlayer.score + 15;
          points = 15;
        } else if (countryUnion.length === 3) {
          this.opponentPlayer.score = this.opponentPlayer.score + 25;
          points = 25;
        } else if (countryUnion.length === 2) {
          this.opponentPlayer.score = this.opponentPlayer.score + 35;
          points = 35;
        } else if (countryUnion.length === 1) {
          this.opponentPlayer.score = this.opponentPlayer.score + 50;
          points = 50;
        }
        document.getElementById(
          "player-one-score-field"
        ).textContent = `🏅 ${this.opponentPlayer.score}`;
        const countryUnionString = countryUnion
          .map(
            (countryObject) =>
              localization[model.worldCountries.language]["countries"][
                this.countries[Object.keys(countryObject)[0]].countryName
              ]
          )
          .join(" 🔗 ");
        countryUnion.forEach((countryObject) => {
          const countryCode = Object.keys(countryObject)[0];
          this.setElementStyle(this.countryBoundaries[countryCode], {
            weight: 1,
            color: "red",
            fillColor: "red",
            fillOpacity: 0.5,
            opacity: 0.8,
            className: countryCode,
          });
          this.addSelectedCountryToCountryPanel(
            this.playerSelectedCountriesContainerId,
            countryCode,
            Array.from(this.selectedCountryCodes).indexOf(countryCode) + 1
          );
          const country = this.countries[countryCode];
          const countryGuessedIndex = this.lastGuessedCountryNames.indexOf(
            country.countryName
          );
          if (countryGuessedIndex >= 0)
            this.lastGuessedCountryNames.splice(countryGuessedIndex, 1);
          const countryBorderCodes = country.countryBorders
            .map((countryBorder) => {
              return this.countriesCodeMapping[countryBorder];
            })
            .filter(
              (countryCode) =>
                countryCode !== undefined &&
                this.countryCodes.includes(countryCode)
            );
          countryBorderCodes.forEach((countryBorderCode) => {
            if (!this.selectedCountryCodes.has(countryBorderCode)) {
              const countryBoundary = this.countryBoundaries[countryBorderCode];
              const countryMarker = this.countryMarkers[countryBorderCode];
              countryMarker.unbindTooltip();
              countryBoundary.unbindTooltip();
              countryMarker.off();
              countryBoundary.off();
              this.playerMap.removeLayer(countryBoundary);
              this.playerMap.removeLayer(countryMarker);
              delete this.countryMarkers[countryBorderCode];
              delete this.countryBoundaries[countryBorderCode];
              const countryIndexToDelete =
                this.countryCodes.indexOf(countryBorderCode);
              if (countryIndexToDelete >= 0) {
                this.countryCodes.splice(countryIndexToDelete, 1);
              }
              this.countriesNumberField.textContent = this.countryCodes.length;
            }
          });
        });
        const countryUnionHtml =
          this.createCountryUnionMessageHtml(countryUnionIndex);
        this.setMessageInnerHtmlField(
          `<span style="margin-right:5px;">⚠️ ${
            localization[model.worldCountries.language]["You guessed"]
          }</span><div style="display: inline-block;">${
            countryUnionHtml.outerHTML
          }</div><span style="margin-left:5px;">${
            localization[model.worldCountries.language]["Country Alliance"]
          }</span>`
        );
        if (this.playerMap && !this.playerMap._isFullscreen) {
          document.getElementById(
            "gameCountryAllianceGuessedLabel"
          ).textContent =
            localization[model.worldCountries.language]["Congratulations!"];
          document.getElementById(
            "gameCountryAllianceGuessedCountries"
          ).innerHTML = `👏 <span style="font-weight:bold; color:darkblue;">${
            localization[model.worldCountries.language]["You guessed"]
          }</span><div style="display: inline-block; margin-left:5px;">${
            countryUnionHtml.outerHTML
          }</div><span style="margin-left:5px; color: darkblue; font-weight:bold;">${
            localization[model.worldCountries.language]["Country Alliance"]
          }</span><div style="color: darkblue; font-weight:bold;font-size: 0.8rem;">${countryUnionString}</div><div style="margin-top:5px;"><span style="
                    color: white;
                    font-size: 1rem;
                    border-radius: 2px;
                    background-color: green;
                    padding-left: 3px;
                    padding-right: 3px;
                    font-weight: bolder;
                  ">+${points} ${
            localization[model.worldCountries.language]["Points"]
          }</span></div>`;
          document.getElementById(
            "gameCountryAllianceGuessedCloseButton"
          ).textContent = localization[model.worldCountries.language]["Close"];
          showGameCountryAllianceGuessedWindow();
          setTimeout(hideGameCountryAllianceGuessedWindow, 10000);
        } else if (this.playerMap && this.playerMap._isFullscreen) {
          document.getElementById(
            "guessed-country-alliance-panel-content"
          ).innerHTML = `<span style="font-weight:bold; color:darkblue;">${
            localization[model.worldCountries.language]["You guessed"]
          }</span><div style="display: inline-block; margin-left:5px;">${
            countryUnionHtml.outerHTML
          }</div><div style="margin-top:5px;"><span style="
                    color: white;
                    font-size: 0.75rem;
                    border-radius: 2px;
                    background-color: green;
                    padding-left: 3px;
                    padding-right: 3px;
                    font-weight: bolder;
                  ">+${points} ${
            localization[model.worldCountries.language]["Points"]
          }</span></div>`;
          document
            .getElementById("guessed-country-alliance-panel")
            .classList.remove("not-displayed");
        }
        await this.sleep(1500);
        document
          .getElementById("guessed-country-alliance-panel")
          .classList.add("not-displayed");
        this.closeCountryPopup(countryCode);
        this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
          animate: false,
        });
      } else {
        this.setMessageInnerHtmlField(
          `<span>ℹ️ ${
            localization[model.worldCountries.language]["You guessed"]
          }</span> <img src="${
            country.countryFlag
          }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 2px 5px #00000080, inset 0 2px 10px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;">${
            localization[model.worldCountries.language]["countries"][
              country.countryName
            ]
          }</span>`
        );
        this.lastGuessedCountryNames.push(country.countryName);
        await this.sleep(1000);
        this.closeCountryPopup(countryCode);
      }
      this.opponentPlayer.enableMapInteraction();
    } else {
      this.setElementStyle(countryBoundary, {
        weight: 1,
        color: "grey",
        fillColor: "grey",
        fillOpacity: 0.5,
        opacity: 0.8,
        className: countryCode,
      });
      this.gameMessageField.textContent = `⛔ ${
        localization[model.worldCountries.language][
          "Failed attempt to guess country!"
        ]
      }`;
      this.playerAttemptToGuess = true;
      this.opponentPlayer.playerAttemptToGuess = false;
      await this.sleep(1000);
      this.closeCountryPopup(countryCode);
      this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
        animate: false,
      });
      this.playerMap.removeLayer(countryBoundary);
      delete this.countryBoundaries[countryCode];
    }
    if (+this.playerCountriesNumberField.textContent === 0) {
      if (this.gameConfiguration.gameMode === "user") {
        this.sendEndGameToOpponent();
      }
      hideGameCountryAllianceGuessedWindow();
      this.opponentPlayer.score +=
        +this.opponentPlayer.playerCountriesNumberField.textContent * 10;
      this.opponentPlayer.playerWonGame = true;
      this.game.finished = true;
      this.game.showGameResult(true, false);
      return;
    }
    if (this.gameConfiguration.gameMode === "user") {
      this.sendMoveAckToOpponent();
      this.game.isPlayerReady = true;
    }
    this.game.playHit();
  }

  addUserClickCountriesPlayHandler() {
    if (this.playerConfigured) {
      Object.entries(this.countryBoundaries).forEach(
        ([countryCode, countryBoundary]) => {
          const countryMarker = this.countryMarkers[countryCode];
          countryMarker.off("click");
          countryBoundary.off("click");
          this.addMouseOverStyleEventToCountryBoundary(countryBoundary, {
            weight: 1,
            fillOpacity: 0.5,
            opacity: 1,
            className: countryCode,
          });
          this.addMouseOutStyleEventToCountryBoundary(countryBoundary, {
            weight: 0,
            fillOpacity: 0.1,
            opacity: 0,
            className: countryCode,
          });
          countryMarker.on(
            "click",
            function (ev) {
              L.DomEvent.stopPropagation(ev);
              this.addUserClickCountriesPlay(
                countryCode,
                countryBoundary,
                countryMarker
              );
            }.bind(this)
          );
          countryBoundary.on(
            "click",
            function (ev) {
              L.DomEvent.stopPropagation(ev);
              this.addUserClickCountriesPlay(
                countryCode,
                countryBoundary,
                countryMarker
              );
            }.bind(this)
          );
        }
      );
    }
  }

  selectRandomCountryUnion(countriesCodeList, numberOfCountries) {
    const visited = new Set();
    const countryUnionCountries = [];
    const countries = this.countries;
    const countriesCodeMapping = this.countriesCodeMapping;
    const selectedCountryCodes = this.selectedCountryCodes;
    const selectedCountryNeighboursCodes = this.selectedCountryNeighboursCodes;

    function dfs(country) {
      if (
        visited.has(country) ||
        visited.size >= numberOfCountries ||
        selectedCountryCodes.has(country) ||
        selectedCountryNeighboursCodes.has(country) ||
        (country === "UA" && visited.has("RU")) ||
        (country === "RU" && visited.has("UA"))
      )
        return;
      visited.add(country);
      countryUnionCountries.push(country);
      let neighbors = countries[country].countryBorders
        .map((countryBorderCode) => {
          const countryCodeCc2 = countriesCodeMapping[countryBorderCode];
          if (countryCodeCc2) {
            return countryCodeCc2;
          }
        })
        .filter((code) => code !== undefined);
      neighbors.sort(() => Math.random() - 0.5);
      neighbors.forEach(dfs);
    }
    let randomCountryIndex = getRandomInt(0, countriesCodeList.length - 1);
    let countryCode = countriesCodeList[randomCountryIndex];
    while (!this.isEnoughCountryNeighbours(countryCode, numberOfCountries)) {
      randomCountryIndex = getRandomInt(0, countriesCodeList.length - 1);
      countryCode = countriesCodeList[randomCountryIndex];
    }
    dfs(countryCode);
    const result = countryUnionCountries.slice(0, numberOfCountries);
    return result;
  }

  fillComputerPlayerSelectedCountries(
    countryUnion,
    countriesCodeList,
    trapCountry = false
  ) {
    countryUnion.forEach((country) => {
      if (!this.selectedCountryCodes.has(country) && !trapCountry) {
        this.selectedCountryCodes.add(country);
      }
      if (trapCountry) {
        this.selectedCountryTrapCodes.add(country);
      }
      const countryIndexToDelete = countriesCodeList.indexOf(country);
      if (countryIndexToDelete >= 0) {
        countriesCodeList.splice(countryIndexToDelete, 1);
      }
      const countryBordersCodes = this.countries[country].countryBorders
        .map((countryBorder) => {
          return this.countriesCodeMapping[countryBorder];
        })
        .filter((countryBorder) => countryBorder !== undefined);
      countryBordersCodes.forEach((countryBorder) => {
        if (
          !this.selectedCountryNeighboursCodes.has(countryBorder) &&
          !this.selectedCountryCodes.has(countryBorder)
        ) {
          this.selectedCountryNeighboursCodes.add(countryBorder);
        }
        const countryBorderIndex = countriesCodeList.indexOf(countryBorder);
        if (countryBorderIndex >= 0) {
          countriesCodeList.splice(countryBorderIndex, 1);
        }
      });
    });
  }

  randomCountrySelection() {
    this.cleanSelection();
    this.selectRandomCountries();
    Array.from(this.selectedCountryCodes).forEach((countryCode, index) => {
      this.addSelectedCountryToCountryPanel(
        this.playerSelectedCountriesContainerId,
        countryCode,
        index + 1
      );
    });
    Array.from(this.selectedCountryTrapCodes).forEach((countryCode, index) => {
      this.addSelectedCountryToCountryPanel(
        this.playerSelectedCountriesContainerId,
        countryCode,
        index + 21
      );
    });
    this.showSelectedCountries();
    this.gameMessageField.textContent = `ℹ️ ${
      localization[model.worldCountries.language]["Press 'Play' to start game!"]
    }`;
    this.playerConfigured = true;
    if (this.gameConfiguration.gameMode === "user") {
      this.sendCountriesConfigurationToOpponent();
    } else {
      if (this.game) {
        this.game.getRandomBonusCountries(
          this.countryCodes,
          new Set([
            ...this.selectedCountryCodes,
            ...this.selectedCountryNeighboursCodes,
            ...this.selectedCountryTrapCodes,
            ...this.opponentPlayer.selectedCountryCodes,
            ...this.opponentPlayer.selectedCountryNeighboursCodes,
            ...this.opponentPlayer.selectedCountryTrapCodes,
          ])
        );
      }
    }
    this.playButton.disabled = false;
  }

  selectRandomCountries() {
    const countriesCodeList = Object.values(this.countriesCodeMapping);
    if (this.gameConfiguration.type === "default") {
      const fourCountryUnion = this.selectRandomCountryUnion(
        countriesCodeList,
        4
      );
      this.fillComputerPlayerSelectedCountries(
        fourCountryUnion,
        countriesCodeList
      );
      let countryUnion = this.countryUnions[0];
      fourCountryUnion.forEach((countryCode, index) => {
        this.addCountryToCountryUnion(countryUnion, index, countryCode);
      });
      const firstThreeCountryUnion = this.selectRandomCountryUnion(
        countriesCodeList,
        3
      );
      this.fillComputerPlayerSelectedCountries(
        firstThreeCountryUnion,
        countriesCodeList
      );
      countryUnion = this.countryUnions[1];
      firstThreeCountryUnion.forEach((countryCode, index) => {
        this.addCountryToCountryUnion(countryUnion, index, countryCode);
      });
      const secondThreeCountryUnion = this.selectRandomCountryUnion(
        countriesCodeList,
        3
      );
      this.fillComputerPlayerSelectedCountries(
        secondThreeCountryUnion,
        countriesCodeList
      );
      countryUnion = this.countryUnions[2];
      secondThreeCountryUnion.forEach((countryCode, index) => {
        this.addCountryToCountryUnion(countryUnion, index, countryCode);
      });
      const firstTwoCountryUnion = this.selectRandomCountryUnion(
        countriesCodeList,
        2
      );
      this.fillComputerPlayerSelectedCountries(
        firstTwoCountryUnion,
        countriesCodeList
      );
      countryUnion = this.countryUnions[3];
      firstTwoCountryUnion.forEach((countryCode, index) => {
        this.addCountryToCountryUnion(countryUnion, index, countryCode);
      });
      const secondTwoCountryUnion = this.selectRandomCountryUnion(
        countriesCodeList,
        2
      );
      this.fillComputerPlayerSelectedCountries(
        secondTwoCountryUnion,
        countriesCodeList
      );
      countryUnion = this.countryUnions[4];
      secondTwoCountryUnion.forEach((countryCode, index) => {
        this.addCountryToCountryUnion(countryUnion, index, countryCode);
      });
      const thirdTwoCountryUnion = this.selectRandomCountryUnion(
        countriesCodeList,
        2
      );
      this.fillComputerPlayerSelectedCountries(
        thirdTwoCountryUnion,
        countriesCodeList
      );
      countryUnion = this.countryUnions[5];
      thirdTwoCountryUnion.forEach((countryCode, index) => {
        this.addCountryToCountryUnion(countryUnion, index, countryCode);
      });
      const firstOneCountryUnion = this.selectRandomCountryUnion(
        countriesCodeList,
        1
      );
      this.fillComputerPlayerSelectedCountries(
        firstOneCountryUnion,
        countriesCodeList
      );
      countryUnion = this.countryUnions[6];
      firstOneCountryUnion.forEach((countryCode, index) => {
        this.addCountryToCountryUnion(countryUnion, index, countryCode);
      });
      const secondOneCountryUnion = this.selectRandomCountryUnion(
        countriesCodeList,
        1
      );
      this.fillComputerPlayerSelectedCountries(
        secondOneCountryUnion,
        countriesCodeList
      );
      countryUnion = this.countryUnions[7];
      secondOneCountryUnion.forEach((countryCode, index) => {
        this.addCountryToCountryUnion(countryUnion, index, countryCode);
      });
      const thirdOneCountryUnion = this.selectRandomCountryUnion(
        countriesCodeList,
        1
      );
      this.fillComputerPlayerSelectedCountries(
        thirdOneCountryUnion,
        countriesCodeList
      );
      countryUnion = this.countryUnions[8];
      thirdOneCountryUnion.forEach((countryCode, index) => {
        this.addCountryToCountryUnion(countryUnion, index, countryCode);
      });
      const fourthOneCountryUnion = this.selectRandomCountryUnion(
        countriesCodeList,
        1
      );
      this.fillComputerPlayerSelectedCountries(
        fourthOneCountryUnion,
        countriesCodeList
      );
      countryUnion = this.countryUnions[9];
      fourthOneCountryUnion.forEach((countryCode, index) => {
        this.addCountryToCountryUnion(countryUnion, index, countryCode);
      });
      const firstTrapCountry = this.selectRandomCountryUnion(
        countriesCodeList,
        1
      );
      this.fillComputerPlayerSelectedCountries(
        firstTrapCountry,
        countriesCodeList,
        true
      );
      const secondTrapCountry = this.selectRandomCountryUnion(
        countriesCodeList,
        1
      );
      this.fillComputerPlayerSelectedCountries(
        secondTrapCountry,
        countriesCodeList,
        true
      );
      const thirdTrapCountry = this.selectRandomCountryUnion(
        countriesCodeList,
        1
      );
      this.fillComputerPlayerSelectedCountries(
        thirdTrapCountry,
        countriesCodeList,
        true
      );
      this.selectedCountryCodes.forEach((countryCode) => {
        if (this.selectedCountryNeighboursCodes.has(countryCode)) {
          this.selectedCountryNeighboursCodes.delete(countryCode);
        }
      });
      this.playerCountriesNumberField.textContent = this.countryUnions.length;
    }
    this.playerConfigured = true;
  }

  cleanSelection() {
    Object.entries(this.countryBoundaries).forEach(
      ([countryCode, countryBoundary]) => {
        const countryMarker = this.countryMarkers[countryCode];
        this.playerMap.removeLayer(countryBoundary);
        delete this.countryBoundaries[countryCode];
        this.playerMap.removeLayer(countryMarker);
        delete this.countryMarkers[countryCode];
      }
    );
    this.initData();
    this.playerCountriesNumberField.textContent = "0";
    const countriesUnionsContainer =
      this.playerSelectedCountriesContainer.querySelector(".countries-unions");
    countriesUnionsContainer.remove();
    this.playerCountriesNumberField.insertAdjacentHTML(
      "afterend",
      this.gameConfiguration.countriesUnionsHtml
    );
    this.gameMessageField.textContent = `ℹ️ ${
      localization[model.worldCountries.language][
        "Choose one alliance from four countries"
      ]
    }`;
    this.playMap.setSelectedCountryFiledHtml("");
    if (this.gameConfiguration.gameMode === "user")
      this.sendCleanCountriesSelectionToOpponent();
    if (this.game) this.game.bonusCountries = [];
  }

  isEnoughCountryNeighbours(countryCode, minNeighboursNumber) {
    if (minNeighboursNumber === 1) return true;
    const selectedCountryCodes = this.selectedCountryCodes;
    const selectedCountryNeighboursCodes = this.selectedCountryNeighboursCodes;
    const countries = this.countries;
    const countriesCodeMapping = this.countriesCodeMapping;
    const visited = new Set();
    function dfs(countryCode) {
      if (
        visited.has(countryCode) ||
        selectedCountryCodes.has(countryCode) ||
        selectedCountryNeighboursCodes.has(countryCode) ||
        visited.size >= minNeighboursNumber
      ) {
        return;
      }
      visited.add(countryCode);
      let neighbors = countries[countryCode].countryBorders
        .map((countryBorderCode) => {
          const countryCodeCc2 = countriesCodeMapping[countryBorderCode];
          if (countryCodeCc2) {
            return countryCodeCc2;
          }
        })
        .filter((code) => code !== undefined);
      neighbors.forEach(dfs);
    }
    dfs(countryCode);
    return visited.size >= minNeighboursNumber;
  }

  addCountryBoundaryAndMarker(
    countryCode,
    countryBoundary,
    minNeighboursNumber
  ) {
    const countryMarker = this.countryMarkers[countryCode];
    if (this.playerType === "userPlayer") {
      countryBoundary.off("click");
      countryBoundary.on("click", (ev) => {
        L.DomEvent.stopPropagation(ev);
        this.addUserPlayerInitialCountrySelectionHandler(
          countryCode,
          countryBoundary,
          countryMarker
        );
      });
      countryMarker.off("click");
      countryMarker.on("click", (ev) => {
        L.DomEvent.stopPropagation(ev);
        this.addUserPlayerInitialCountrySelectionHandler(
          countryCode,
          countryBoundary,
          countryMarker
        );
      });

      if (this.isEnoughCountryNeighbours(countryCode, minNeighboursNumber)) {
        this.playerMap.addLayer(countryBoundary);
        this.playerMap.addLayer(countryMarker);
      }
    }
  }

  setElementStyle(element, styleObject) {
    element.setStyle(styleObject);
  }

  removeCountryBoundariesAndMarkersExceptAlreadySelected() {
    Object.entries(this.countryBoundaries).forEach(
      ([countryCode, countryBoundary]) => {
        if (
          !this.selectedCountryCodes.has(countryCode) &&
          !this.selectedCountryNeighboursCodes.has(countryCode)
        ) {
          this.playerMap.removeLayer(countryBoundary);
          this.playerMap.removeLayer(this.countryMarkers[countryCode]);
        }
      }
    );
  }

  addNeighbourCountriesByCountryCode(countryCode) {
    const countryBorderCodes = this.countries[countryCode].countryBorders;
    countryBorderCodes.forEach((countryBorderCode) => {
      const countryCodeCc2 = this.countriesCodeMapping[countryBorderCode];
      if (countryCodeCc2) {
        if (!this.selectedCountryNeighboursCodes.has(countryCodeCc2)) {
          this.playerMap.addLayer(this.countryMarkers[countryCodeCc2]);
        }
        this.selectedCountryNeighboursCodes.add(countryCodeCc2);
        this.playerMap.addLayer(this.countryBoundaries[countryCodeCc2]);
      }
    });
  }

  finishCountriesUnionSelection() {
    this.selectedCountryNeighboursCodes.forEach((countryCode) => {
      if (!this.selectedCountryCodes.has(countryCode)) {
        const countryBoundary = this.countryBoundaries[countryCode];
        const countryMarker = this.countryMarkers[countryCode];
        this.setElementStyle(countryBoundary, {
          weight: 1,
          color: "grey",
          fillColor: "grey",
          fillOpacity: 0.3,
          opacity: 0.6,
          className: countryCode,
        });
        countryBoundary.off();
        countryMarker.off();
        this.playerMap.removeLayer(countryMarker);
      }
    });
  }

  addSelectedCountryToCountryPanel(
    countryPanelId,
    countryCode,
    countryIndex,
    addCountryImage = true
  ) {
    const country = this.countries[countryCode];
    const userSelectedCountriesPanel = document.querySelector(
      `#${countryPanelId}`
    );
    const countryElement = userSelectedCountriesPanel.querySelector(
      `.country${countryIndex.toString()}`
    );
    countryElement.innerHTML = addCountryImage
      ? `<img id="${country.cca2}" src="${country.countryFlag}" alt="${
          localization[model.worldCountries.language]["countries"][
            country.countryName
          ]
        }" title="${
          localization[model.worldCountries.language]["countries"][
            country.countryName
          ]
        }" style="width:10px; height:10px;border:solid 1px grey; border-radius:50%; display:inline-block;vertical-align:baseline; box-shadow: 0 2px 5px #00000080, inset 0 2px 10px #0000001f;">`
      : `<span style="width:10px; height:10px;background-color:red; border: 2px grey solid;border-radius:50%; display:inline-block;vertical-align:baseline;"></span>`;
  }

  addUserPlayerInitialCountrySelection(
    countryCode,
    countryBoundary,
    countryBoundaryFillColor
  ) {
    this.setElementStyle(countryBoundary, {
      weight: 1,
      color: countryBoundaryFillColor,
      fillColor: countryBoundaryFillColor,
      fillOpacity: 0.5,
      opacity: 0.8,
      className: countryCode,
    });
    countryBoundary.off();
    countryBoundary.closeTooltip();
    countryBoundary.bringToFront();
    this.addSelectedCountryToCountryPanel(
      this.playerSelectedCountriesContainerId,
      countryCode,
      this.selectedCountryCodes.size
    );
    this.removeCountryBoundariesAndMarkersExceptAlreadySelected();
  }

  addCountryToCountryUnion(countryUnionArray, countryIndex, countryCode) {
    const countryObject = {};
    countryObject[countryCode] = { guessed: false };
    countryUnionArray[countryIndex] = countryObject;
  }

  setSelectedCountryFiledHtml(country) {
    this.playMap.setSelectedCountryFiledHtml(
      `<img src="${
        country.countryFlag
      }" style="margin-left:2px; width:18px; height:13px; border-radius:2px; box-shadow: 0 2px 5px #00000080, inset 0 2px 10px #0000001f; vertical-align: sub;"> <span style="margin-left:2px;color:${
        country.countryName !== "Russia" ? "darkblue" : "red"
      }">${
        country.countryName !== "Russia"
          ? localization[model.worldCountries.language]["countries"][
              country.countryName
            ]
          : localization[model.worldCountries.language]["countries"][
              country.countryName
            ] +
            " - " +
            localization[model.worldCountries.language]["War Aggressor"]
      }</span>`
    );
  }

  addUserPlayerInitialCountrySelectionHandler(countryCode, countryBoundary) {
    const countryMarker = this.countryMarkers[countryCode];
    const country = this.countries[countryCode];
    countryMarker.off("click");
    countryBoundary.off("click");
    if (this.playerConfigured) {
      this.gameMessageField.textContent = `ℹ️ ${
        localization[model.worldCountries.language][
          "Press 'Play' to start game!"
        ]
      }`;
      return;
    }
    this.selectedCountryCodes.add(countryCode);
    if (this.gameConfiguration.type === "default") {
      if (
        this.selectedCountryCodes.size >= 1 &&
        this.selectedCountryCodes.size <= 4
      ) {
        this.setSelectedCountryFiledHtml(country);
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "green"
        );
        const countryUnion = this.countryUnions[0];
        this.addCountryToCountryUnion(
          countryUnion,
          this.selectedCountryCodes.size - 1,
          countryCode
        );
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 4) {
          this.playerCountriesNumberField.textContent =
            +this.playerCountriesNumberField.textContent + 1;
          this.finishCountriesUnionSelection();
          this.addCountryBoundariesAndMarkers(3);
          this.gameMessageField.textContent = `ℹ️ ${
            localization[model.worldCountries.language][
              "Choose the first alliance from three countries"
            ]
          }`;
        }
      }
      if (
        this.selectedCountryCodes.size >= 5 &&
        this.selectedCountryCodes.size <= 7
      ) {
        this.setSelectedCountryFiledHtml(country);
        const countryUnion = this.countryUnions[1];
        this.addCountryToCountryUnion(
          countryUnion,
          this.selectedCountryCodes.size - 5,
          countryCode
        );
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "green"
        );
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 7) {
          this.playerCountriesNumberField.textContent =
            +this.playerCountriesNumberField.textContent + 1;
          this.finishCountriesUnionSelection();
          this.addCountryBoundariesAndMarkers(3);
          this.gameMessageField.textContent = `ℹ️ ${
            localization[model.worldCountries.language][
              "Choose the second alliance from three countries"
            ]
          }`;
        }
      }
      if (
        this.selectedCountryCodes.size >= 8 &&
        this.selectedCountryCodes.size <= 10
      ) {
        this.setSelectedCountryFiledHtml(country);
        const countryUnion = this.countryUnions[2];
        this.addCountryToCountryUnion(
          countryUnion,
          this.selectedCountryCodes.size - 8,
          countryCode
        );
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "green"
        );
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 10) {
          this.playerCountriesNumberField.textContent =
            +this.playerCountriesNumberField.textContent + 1;
          this.finishCountriesUnionSelection();
          this.addCountryBoundariesAndMarkers(2);
          this.gameMessageField.textContent = `ℹ️ ${
            localization[model.worldCountries.language][
              "Choose the first alliance from two countries"
            ]
          }`;
        }
      }
      if (
        this.selectedCountryCodes.size >= 11 &&
        this.selectedCountryCodes.size <= 12
      ) {
        this.setSelectedCountryFiledHtml(country);
        const countryUnion = this.countryUnions[3];
        this.addCountryToCountryUnion(
          countryUnion,
          this.selectedCountryCodes.size - 11,
          countryCode
        );
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "green"
        );
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 12) {
          this.playerCountriesNumberField.textContent =
            +this.playerCountriesNumberField.textContent + 1;
          this.finishCountriesUnionSelection();
          this.addCountryBoundariesAndMarkers(2);
          this.gameMessageField.textContent = `ℹ️ ${
            localization[model.worldCountries.language][
              "Choose the second alliance from two countries"
            ]
          }`;
        }
      }
      if (
        this.selectedCountryCodes.size >= 13 &&
        this.selectedCountryCodes.size <= 14
      ) {
        this.setSelectedCountryFiledHtml(country);
        const countryUnion = this.countryUnions[4];
        this.addCountryToCountryUnion(
          countryUnion,
          this.selectedCountryCodes.size - 13,
          countryCode
        );
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "green"
        );
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 14) {
          this.playerCountriesNumberField.textContent =
            +this.playerCountriesNumberField.textContent + 1;
          this.finishCountriesUnionSelection();
          this.addCountryBoundariesAndMarkers(2);
          this.gameMessageField.textContent = `ℹ️ ${
            localization[model.worldCountries.language][
              "Choose the third alliance from two countries"
            ]
          }`;
        }
      }
      if (
        this.selectedCountryCodes.size >= 15 &&
        this.selectedCountryCodes.size <= 16
      ) {
        this.setSelectedCountryFiledHtml(country);
        const countryUnion = this.countryUnions[5];
        this.addCountryToCountryUnion(
          countryUnion,
          this.selectedCountryCodes.size - 15,
          countryCode
        );
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "green"
        );
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 16) {
          this.playerCountriesNumberField.textContent =
            +this.playerCountriesNumberField.textContent + 1;
          this.finishCountriesUnionSelection();
          this.addCountryBoundariesAndMarkers(1);
          this.gameMessageField.textContent = `ℹ️ ${
            localization[model.worldCountries.language][
              "Choose the first alliance from one country"
            ]
          }`;
        }
      }
      if (this.selectedCountryCodes.size === 17) {
        this.setSelectedCountryFiledHtml(country);
        const countryUnion = this.countryUnions[6];
        this.addCountryToCountryUnion(
          countryUnion,
          this.selectedCountryCodes.size - 17,
          countryCode
        );
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "green"
        );
        this.playerCountriesNumberField.textContent =
          +this.playerCountriesNumberField.textContent + 1;
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 17) {
          this.finishCountriesUnionSelection();
          this.addCountryBoundariesAndMarkers(1);
          this.gameMessageField.textContent = `ℹ️ ${
            localization[model.worldCountries.language][
              "Choose the second alliance from one country"
            ]
          }`;
        }
      }
      if (this.selectedCountryCodes.size === 18) {
        this.setSelectedCountryFiledHtml(country);
        const countryUnion = this.countryUnions[7];
        this.addCountryToCountryUnion(
          countryUnion,
          this.selectedCountryCodes.size - 18,
          countryCode
        );
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "green"
        );
        this.playerCountriesNumberField.textContent =
          +this.playerCountriesNumberField.textContent + 1;
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 18) {
          this.finishCountriesUnionSelection();
          this.addCountryBoundariesAndMarkers(1);
          this.gameMessageField.textContent = `ℹ️ ${
            localization[model.worldCountries.language][
              "Choose the third alliance from one country"
            ]
          }`;
        }
      }
      if (this.selectedCountryCodes.size === 19) {
        this.setSelectedCountryFiledHtml(country);
        const countryUnion = this.countryUnions[8];
        this.addCountryToCountryUnion(
          countryUnion,
          this.selectedCountryCodes.size - 19,
          countryCode
        );
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "green"
        );
        this.playerCountriesNumberField.textContent =
          +this.playerCountriesNumberField.textContent + 1;
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 19) {
          this.finishCountriesUnionSelection();
          this.addCountryBoundariesAndMarkers(1);
          this.gameMessageField.textContent = `ℹ️ ${
            localization[model.worldCountries.language][
              "Choose the fourth alliance from one country"
            ]
          }`;
        }
      }
      if (this.selectedCountryCodes.size === 20) {
        this.setSelectedCountryFiledHtml(country);
        const countryUnion = this.countryUnions[9];
        this.addCountryToCountryUnion(
          countryUnion,
          this.selectedCountryCodes.size - 20,
          countryCode
        );
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "green"
        );
        this.playerCountriesNumberField.textContent =
          +this.playerCountriesNumberField.textContent + 1;
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 20) {
          this.finishCountriesUnionSelection();
          this.addCountryBoundariesAndMarkers(1);
          this.gameMessageField.textContent = `ℹ️ ${
            localization[model.worldCountries.language][
              "Choose the first trap country"
            ]
          }`;
        }
      }
      if (this.selectedCountryCodes.size === 21) {
        this.setSelectedCountryFiledHtml(country);
        this.selectedCountryTrapCodes.add(countryCode);
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "orange"
        );
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 21) {
          this.finishCountriesUnionSelection();
          this.addCountryBoundariesAndMarkers(1);
          this.gameMessageField.textContent = `ℹ️ ${
            localization[model.worldCountries.language][
              "Choose the second trap country"
            ]
          }`;
        }
      }
      if (this.selectedCountryCodes.size === 22) {
        this.setSelectedCountryFiledHtml(country);
        this.selectedCountryTrapCodes.add(countryCode);
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "orange"
        );
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 22) {
          this.finishCountriesUnionSelection();
          this.addCountryBoundariesAndMarkers(1);
          this.gameMessageField.textContent = `ℹ️ ${
            localization[model.worldCountries.language][
              "Choose the third trap country"
            ]
          }`;
        }
      }
      if (this.selectedCountryCodes.size === 23) {
        this.setSelectedCountryFiledHtml(country);
        this.selectedCountryTrapCodes.add(countryCode);
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "orange"
        );
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 23) {
          this.finishCountriesUnionSelection();
          this.addCountryBoundariesAndMarkers(1);
          this.gameMessageField.textContent = `ℹ️ ${
            localization[model.worldCountries.language][
              "Press 'Play' to start game!"
            ]
          }`;
          this.selectedCountryTrapCodes.forEach((trapCountryCode) => {
            if (this.selectedCountryCodes.has(trapCountryCode)) {
              this.selectedCountryCodes.delete(trapCountryCode);
            }
          });
          this.selectedCountryCodes.forEach((countryCode) => {
            if (this.selectedCountryNeighboursCodes.has(countryCode)) {
              this.selectedCountryNeighboursCodes.delete(countryCode);
            }
          });
          this.selectedCountryNeighboursCodes.forEach((countryCode) => {
            const countryBoundary = this.countryBoundaries[countryCode];
            this.setElementStyle(countryBoundary, {
              weight: 0,
              fillOpacity: 0.1,
              color: "#3388ff",
              fillColor: "#3388ff",
              className: countryCode,
              opacity: 0.5,
            });
          });
          if (this.gameConfiguration.gameMode === "user") {
            this.sendCountriesConfigurationToOpponent();
          } else {
            if (this.game) {
              this.game.getRandomBonusCountries(
                this.countryCodes,
                new Set([
                  ...this.selectedCountryCodes,
                  ...this.selectedCountryNeighboursCodes,
                  ...this.selectedCountryTrapCodes,
                  ...this.opponentPlayer.selectedCountryCodes,
                  ...this.opponentPlayer.selectedCountryNeighboursCodes,
                  ...this.opponentPlayer.selectedCountryTrapCodes,
                ])
              );
            }
          }
          this.playButton.disabled = false;
          this.playerConfigured = true;
          this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
            animate: false,
          });
          if (this.opponentPlayer.playerType === "computerPlayer") {
            Object.entries(this.countryBoundaries).forEach(
              ([countryCode, countryBoundary]) => {
                const countryMarker = this.countryMarkers[countryCode];
                if (countryMarker) countryMarker.off();
                countryBoundary.off();
              }
            );
          }
        }
      }
    }
  }

  addCountryBoundariesAndMarkers(minNeighboursNumber) {
    if (this.playerType === "userPlayer") {
      Object.entries(this.countryBoundaries).forEach(
        ([countryCode, countryBoundary]) => {
          if (
            !this.selectedCountryCodes.has(countryCode) &&
            !this.selectedCountryNeighboursCodes.has(countryCode)
          ) {
            this.addCountryBoundaryAndMarker(
              countryCode,
              countryBoundary,
              minNeighboursNumber
            );
          }
        }
      );
    }
  }

  addMouseOverStyleEventToCountryBoundary(countryBoundary, styleObject) {
    countryBoundary.on("mouseover", function (event) {
      if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        countryBoundary.fire("click");
      } else {
        L.DomEvent.stopPropagation(event);
        countryBoundary.setStyle(styleObject);
        countryBoundary.bringToFront();
      }
    });
  }

  addMouseOutStyleEventToCountryBoundary(countryBoundary, styleObject) {
    if (!("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
      countryBoundary.on("mouseout", function (event) {
        L.DomEvent.stopPropagation(event);
        countryBoundary.setStyle(styleObject);
        countryBoundary.bringToBack();
      });
    }
  }

  createCountryMarkerIcon(country, width, height) {
    return L.icon({
      iconUrl: `${country.flags.png}`,
      iconSize: [width, height],
    });
  }

  createCountryMarker(country, countryTooltip, width, height) {
    const marker = L.marker(
      country.latlng ? country.latlng : country.capitalInfo.latlng,
      {
        icon: this.createCountryMarkerIcon(country, width, height),
        riseOnHover: true,
        alt: localization[model.worldCountries.language]["countries"][
          country.name.common
        ],
        className: country.cca2,
      }
    ).bindTooltip(countryTooltip);
    marker.dataId = country.cca2;
    marker.on("mouseover", function (event) {
      L.DomEvent.stopPropagation(event);
      if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        marker.fire("click");
      }
    });
    return marker;
  }

  createCountryBoundary(countryGeo, countryCode, countryTooltip) {
    const countryBoundary = L.geoJson(countryGeo, {
      bubblingMouseEvents: false,
      style: {
        weight: 0,
        fillOpacity: 0.1,
        color: "#3388ff",
        fillColor: "#3388ff",
        className: countryCode,
        opacity: 0.5,
      },
    }).bindTooltip(countryTooltip);
    return countryBoundary;
  }

  createCountryPopup(country) {
    const countryPopup = L.popup({ closeOnClick: false })
      .setLatLng(country.latlng ? country.latlng : country.capitalInfo.latlng)
      .setContent(
        `<img src="${
          country.flags.png
        }" style="width:20px; height:15px; box-shadow: 0 2px 5px #00000080,
                                inset 0 2px 10px #0000001f; border-radius: 2px; vertical-align: sub;"><span style="font-weight:bold; margin-left:5px;color:${
                                  country.name.common !== "Russia"
                                    ? "darkblue"
                                    : "red"
                                }">${
          country.name.common !== "Russia"
            ? localization[model.worldCountries.language]["countries"][
                country.name.common
              ]
            : localization[model.worldCountries.language]["countries"][
                country.name.common
              ] +
              " - " +
              localization[model.worldCountries.language]["War Aggressor"]
        }</span>`
      );
    return countryPopup;
  }

  createCountryTooltip(country) {
    const countryTooltip = L.tooltip(
      country.latlng ? country.latlng : country.capitalInfo.latlng
    ).setContent(
      `<img src="${
        country.flags.png
      }" style="width:20px; height:15px; box-shadow: 0 2px 5px #00000080,
                                inset 0 2px 10px #0000001f; border-radius: 2px; vertical-align: sub;"><span style="font-weight:bold; margin-left:5px;color:${
                                  country.name.common !== "Russia"
                                    ? "darkblue"
                                    : "red"
                                }">${
        country.name.common !== "Russia"
          ? localization[model.worldCountries.language]["countries"][
              country.name.common
            ]
          : localization[model.worldCountries.language]["countries"][
              country.name.common
            ] +
            " - " +
            localization[model.worldCountries.language]["War Aggressor"]
      }</span>`
    );
    countryTooltip.options.sticky = true;
    return countryTooltip;
  }

  setGame(gameInstance) {
    this.game = gameInstance;
  }

  setOpponentPlayer(opponentPlayer) {
    this.opponentPlayer = opponentPlayer;
  }

  removeAllCountryBoundaries() {
    Object.entries(this.countryBoundaries).forEach(
      ([countryCode, countryBoundary]) => {
        this.playerMap.removeLayer(countryBoundary);
      }
    );
  }

  removeAllCountryMarkers() {
    Object.entries(this.countryMarkers).forEach(
      ([countryCode, countryMarker]) => {
        this.playerMap.removeLayer(countryMarker);
      }
    );
  }

  addAllCountryBoundaries() {
    Object.entries(this.countryBoundaries).forEach(
      ([countryCode, countryBoundary]) => {
        this.playerMap.addLayer(countryBoundary);
      }
    );
  }

  addAllCountryMarkers() {
    Object.entries(this.countryMarkers).forEach(
      ([countryCode, countryMarker]) => {
        this.playerMap.addLayer(countryMarker);
      }
    );
  }

  showSelectedCountries() {
    this.removeAllCountryMarkers();
    this.removeAllCountryBoundaries();
    Object.entries(this.countryMarkers).forEach(
      ([countryCode, countryMarker]) => {
        countryMarker.off();
        if (
          this.selectedCountryCodes.has(countryCode) ||
          this.selectedCountryTrapCodes.has(countryCode)
        ) {
          this.playerMap.addLayer(countryMarker);
        }
      }
    );
    this.selectedCountryCodes.forEach((countryCode) => {
      const countryBoundary = this.countryBoundaries[countryCode];
      countryBoundary.off();
      this.setElementStyle(countryBoundary, {
        weight: 1,
        color: "green",
        fillColor: "green",
        fillOpacity: 0.5,
        opacity: 0.8,
        className: countryCode,
      });
      this.playerMap.addLayer(countryBoundary);
    });
    this.selectedCountryTrapCodes.forEach((countryCode) => {
      const countryBoundary = this.countryBoundaries[countryCode];
      countryBoundary.off();
      this.setElementStyle(countryBoundary, {
        weight: 1,
        color: "orange",
        fillColor: "orange",
        fillOpacity: 0.5,
        opacity: 0.8,
        className: countryCode,
      });
      this.playerMap.addLayer(countryBoundary);
    });
  }

  sendCleanCountriesSelectionToOpponent() {
    if (
      this.game.firebase &&
      this.game.firebase.opponentConnectionState === "connected"
    ) {
      const cleanCountriesJson = JSON.stringify({
        type: "clean",
      });
      this.game.firebase.sendMessage(cleanCountriesJson);
    }
  }

  requestSelectedCountriesFromOpponent() {
    if (
      this.game.firebase &&
      this.game.firebase.opponentConnectionState === "connected"
    ) {
      const requestCountriesJson = JSON.stringify({
        type: "reqCountries",
      });
      this.game.firebase.sendMessage(requestCountriesJson);
    }
  }

  sendStartGameToOpponent() {
    if (
      this.game.firebase &&
      this.game.firebase.opponentConnectionState === "connected"
    ) {
      let bonusCountries = [];
      if (this.game.firebase.isHost) {
        this.game.getRandomBonusCountries(
          this.countryCodes,
          new Set([
            ...this.selectedCountryCodes,
            ...this.selectedCountryNeighboursCodes,
            ...this.selectedCountryTrapCodes,
            ...this.opponentPlayer.selectedCountryCodes,
            ...this.opponentPlayer.selectedCountryNeighboursCodes,
            ...this.opponentPlayer.selectedCountryTrapCodes,
          ])
        );
        bonusCountries = this.game.bonusCountries;
      }
      const startJson = JSON.stringify({
        type: "start",
        bonusCountries: bonusCountries,
      });
      this.game.firebase.sendMessage(startJson);
    }
  }

  sendFinishGameToOpponent() {
    if (
      this.game.firebase &&
      this.game.firebase.opponentConnectionState === "connected"
    ) {
      const finishJson = JSON.stringify({
        type: "finish",
      });
      this.game.firebase.sendMessage(finishJson);
    }
  }

  sendEndGameToOpponent() {
    if (
      this.game.firebase &&
      this.game.firebase.opponentConnectionState === "connected"
    ) {
      const endJson = JSON.stringify({
        type: "end",
      });
      this.game.firebase.endGame();
      this.game.firebase.sendMessage(endJson);
    }
  }

  sendCountriesConfigurationToOpponent() {
    if (
      this.game.firebase &&
      this.game.firebase.opponentConnectionState === "connected"
    ) {
      const countriesConfigJson = JSON.stringify({
        type: "conf",
        countries: [...this.selectedCountryCodes],
        trapCountries: [...this.selectedCountryTrapCodes],
        neighbors: [...this.selectedCountryNeighboursCodes],
        countryUnions: this.countryUnions,
      });
      this.game.firebase.sendMessage(countriesConfigJson);
    }
  }

  sendMoveToOpponent(countryCode) {
    if (
      this.game.firebase &&
      this.game.firebase.opponentConnectionState === "connected"
    ) {
      const moveJson = JSON.stringify({
        type: "move",
        value: countryCode,
      });
      this.game.firebase.sendMessage(moveJson);
    }
  }

  sendMoveAckToOpponent() {
    if (
      this.game.firebase &&
      this.game.firebase.opponentConnectionState === "connected"
    ) {
      const moveAckJson = JSON.stringify({
        type: "moveAck",
      });
      this.game.firebase.sendMessage(moveAckJson);
    }
  }

  opponentMessagesHandler(message) {
    const messageObject = JSON.parse(message);
    if (messageObject.type === "clean") {
      this.opponentPlayer.selectedCountryCodes = new Set();
      this.opponentPlayer.selectedCountryTrapCodes = new Set();
      this.opponentPlayer.countryUnions = [
        new Array(4),
        new Array(3),
        new Array(3),
        new Array(2),
        new Array(2),
        new Array(2),
        new Array(1),
        new Array(1),
        new Array(1),
        new Array(1),
      ];
      this.opponentPlayer.playerConfigured = false;
      document.getElementById("player-two-countries-number").textContent = "0";
      if (this.game) this.game.bonusCountries = [];
    } else if (messageObject.type === "reqCountries") {
      this.sendCountriesConfigurationToOpponent();
      const input = document.getElementById("chat-message-from-opponent");
      if (input) {
        input.value =
          "🧓: " +
          localization[model.worldCountries.language][
            "Opponent entered the game room to read your messages"
          ];
      }
    } else if (messageObject.type === "conf") {
      if (
        messageObject.countries.length ===
          this.gameConfiguration.countriesNumber &&
        messageObject.trapCountries.length ===
          this.gameConfiguration.countriesTrapNumber
      ) {
        this.opponentPlayer.selectedCountryCodes = new Set(
          messageObject.countries
        );
        this.opponentPlayer.selectedCountryTrapCodes = new Set(
          messageObject.trapCountries
        );
        this.opponentPlayer.selectedCountryNeighboursCodes = new Set(
          messageObject.neighbors
        );
        this.opponentPlayer.countryUnions = messageObject.countryUnions;
        this.opponentPlayer.playerConfigured = true;
        this.opponentPlayer.addUserClickCountriesPlayHandler();
        document.getElementById("player-two-countries-number").textContent =
          this.gameConfiguration.countryUnionsNumber;
        this.game.firebase.sendMessage(
          JSON.stringify({ type: "ack", value: "conf" })
        );
        if (
          this.gameConfiguration.gameMode === "user" &&
          this.playerConfigured &&
          this.opponentPlayer.playerConfigured
        ) {
          this.gameMessageField.textContent = `ℹ️ ${
            localization[model.worldCountries.language][
              "Opponent selected countries. Press 'Play' to start game!"
            ]
          }`;
        }
      }
    } else if (messageObject.type === "move") {
      const countryCode = messageObject.value;
      this.handleOpponentHit(countryCode);
    } else if (messageObject.type === "ack") {
      const value = messageObject.value;
      if (value === "conf") {
        this.opponentPlayerConfigAcknowledged = true;
      }
    } else if (messageObject.type === "start") {
      this.opponentPlayerStartAcknowledged = true;
      if (messageObject.bonusCountries.length !== 0) {
        this.game.bonusCountries = messageObject.bonusCountries;
      }
      if (this.playerConfigured && this.opponentPlayer.playerConfigured) {
        const cleanSection = document.getElementById(
          "clean-user-countries-selection"
        );
        cleanSection.style.display = "none";
        const randomSection = document.getElementById(
          "random-user-countries-selection"
        );
        randomSection.style.display = "none";
      }
      if (
        this.gameMessageField.textContent.endsWith(
          localization[model.worldCountries.language][
            "Opponent has not yet started game. Wait for the message to start."
          ]
        )
      ) {
        this.gameMessageField.textContent = `⚠️ ${
          localization[model.worldCountries.language][
            "Your attempt to guess opponent's country"
          ]
        }`;
      }
    } else if (messageObject.type === "finish") {
      alert(
        "⚠️ " +
          localization[model.worldCountries.language][
            "Sorry... Opponent left the game."
          ]
      );
      if (this.game) this.game.finishGame(false);
    } else if (messageObject.type === "end") {
      this.score += +this.playerCountriesNumberField.textContent * 10;
      this.playerWonGame = false;
      this.game.finished = true;
      this.game.showGameResult(false, false);
    } else if (messageObject.type === "deleteGameRoom") {
      alert(
        "⚠️ " +
          this.game.firebase.gameRoomId +
          ` - ${
            localization[model.worldCountries.language][
              "Game room does not exist. Perhaps the opponent deleted it or left the game"
            ]
          }`
      );
      if (this.game) this.game.finishGame(false);
    } else if (messageObject.type === "moveAck") {
      this.game.isOpponentPlayerReady = true;
      this.game.playHit();
    } else if (messageObject.type === "chat") {
      const message = messageObject.value;
      const input = document.getElementById("chat-message-from-opponent");
      if (input) {
        input.value = "🧓: " + message;
      }
      const chat = document.getElementById("chat-container");
      if (chat.classList.contains("not-displayed")) {
        chat.classList.remove("not-displayed");
        const chatButtonLeftArrow = document.getElementById(
          "chat-button-left-arrow"
        );
        chatButtonLeftArrow.textContent = "⬇";
        const chatButtonRightArrow = document.getElementById(
          "chat-button-right-arrow"
        );
        chatButtonRightArrow.textContent = "⬇";
      }
    } else if (messageObject.type === "notReady") {
      const input = document.getElementById("chat-message-from-opponent");
      if (input) {
        input.value =
          "🧓: " +
          localization[model.worldCountries.language][
            "Opponent has not yet entered the game room to read your messages. Try sending a message later"
          ];
      }
    }
  }

  async handleOpponentHit(countryCode) {
    const country = this.countries[countryCode];
    const countryBoundary = this.countryBoundaries[countryCode];
    const countryMarker = this.countryMarkers[countryCode];
    countryMarker.unbindTooltip();
    countryBoundary.unbindTooltip();
    countryMarker.off();
    countryBoundary.off();
    this.playerMap.removeLayer(countryMarker);
    delete this.countryMarkers[countryCode];
    const countryToDeleteIndex = this.countryCodes.indexOf(countryCode);
    if (countryToDeleteIndex >= 0)
      this.countryCodes.splice(countryToDeleteIndex, 1);
    this.countriesNumberField.textContent = this.countryCodes.length;
    const countryBound = COUNTRY_BOUNDS.find(
      (bound) => country.countryName === bound.name
    );
    this.openCountryPopup(countryCode);
    const countryCoordinates = country.latlng
      ? country.latlng
      : country.capitalLatLng;
    if (countryBound) {
      this.playerMap.fitBounds(countryBound.bounds, {
        animate: false,
      });
    } else {
      this.playerMap.setView(countryCoordinates, 4.5, {
        animate: false,
      });
    }
    if (this.selectedCountryTrapCodes.has(countryCode)) {
      this.setMessageInnerHtmlField(
        `<span>⚠️ ${
          localization[model.worldCountries.language][
            "Opponent has fallen into a trap-country"
          ]
        }</span> <img src="${
          country.countryFlag
        }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 2px 5px #00000080, inset 0 2px 10px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;">${
          localization[model.worldCountries.language]["countries"][
            country.countryName
          ]
        }.</span> <span style="margin-left:5px;">${
          localization[model.worldCountries.language][
            "The opponent gets a hint"
          ]
        }</span>`
      );
      this.trapCountryHitted = this.trapCountryHitted + 1;
      if (this.trapCountryHitted === 1) {
        this.opponentPlayer.score = this.opponentPlayer.score - 10;
      } else if (this.trapCountryHitted === 2) {
        this.opponentPlayer.score = this.opponentPlayer.score - 20;
      } else {
        this.opponentPlayer.score = this.opponentPlayer.score - 30;
      }
      document.getElementById(
        "player-two-score-field"
      ).textContent = `🏅 ${this.opponentPlayer.score}`;
      this.addHint(countryCode, false);
      this.setElementStyle(countryBoundary, {
        weight: 1,
        color: "orange",
        fillColor: "orange",
        fillOpacity: 0.5,
        opacity: 0.8,
        className: countryCode,
      });
      this.playerAttemptToGuess = true;
      this.opponentPlayer.playerAttemptToGuess = false;
      await this.sleep(1500);
      this.closeCountryPopup(countryCode);
      this.playerMap.removeLayer(countryBoundary);
      delete this.countryBoundaries[countryCode];
      const countryBorderCodes = country.countryBorders
        .map((countryBorder) => {
          return this.countriesCodeMapping[countryBorder];
        })
        .filter(
          (countryCode) =>
            countryCode !== undefined && this.countryCodes.includes(countryCode)
        );
      countryBorderCodes.forEach((countryBorderCode) => {
        if (!this.selectedCountryTrapCodes.has(countryBorderCode)) {
          const countryBoundary = this.countryBoundaries[countryBorderCode];
          const countryMarker = this.countryMarkers[countryBorderCode];
          countryMarker.unbindTooltip();
          countryBoundary.unbindTooltip();
          countryMarker.off();
          countryBoundary.off();
          this.playerMap.removeLayer(countryMarker);
          this.playerMap.removeLayer(countryBoundary);
          delete this.countryMarkers[countryBorderCode];
          delete this.countryPopups[countryBorderCode];
          delete this.countryTooltips[countryBorderCode];
          delete this.countryBoundaries[countryBorderCode];
          const countryIndexToDelete =
            this.countryCodes.indexOf(countryBorderCode);
          if (countryIndexToDelete >= 0)
            this.countryCodes.splice(countryIndexToDelete, 1);
          this.countriesNumberField.textContent = this.countryCodes.length;
        }
      });
      this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
        animate: false,
      });
      this.enableMapInteraction();
    } else if (this.game && this.game.bonusCountries.includes(countryCode)) {
      this.playerAttemptToGuess = false;
      this.opponentPlayer.playerAttemptToGuess = true;
      const countryBoundaryOpponent =
        this.opponentPlayer.countryBoundaries[countryCode];
      const countryMarker = this.opponentPlayer.countryMarkers[countryCode];
      const countryToDeleteIndex =
        this.opponentPlayer.countryCodes.indexOf(countryCode);
      if (countryToDeleteIndex >= 0)
        this.opponentPlayer.countryCodes.splice(countryToDeleteIndex, 1);
      if (countryMarker) {
        countryMarker.unbindTooltip();
        countryMarker.off();
        this.opponentPlayer.playerMap.removeLayer(countryMarker);
        delete this.opponentPlayer.countryMarkers[countryCode];
      }
      if (countryBoundaryOpponent) {
        countryBoundaryOpponent.unbindTooltip();
        countryBoundaryOpponent.off();
        this.opponentPlayer.setElementStyle(countryBoundaryOpponent, {
          weight: 1,
          color: "purple",
          fillColor: "purple",
          fillOpacity: 0.5,
          opacity: 0.8,
          className: countryCode,
        });
      }
      this.setElementStyle(countryBoundary, {
        weight: 1,
        color: "purple",
        fillColor: "purple",
        fillOpacity: 0.5,
        opacity: 0.8,
        className: countryCode,
      });
      this.opponentPlayer.score = this.opponentPlayer.score + 10;
      document.getElementById(
        "player-two-score-field"
      ).textContent = `🏅 ${this.opponentPlayer.score}`;
      this.setMessageInnerHtmlField(
        `<span>ℹ️ ${
          localization[model.worldCountries.language][
            "Opponent has fallen into a bonus-country"
          ]
        }</span> <img src="${
          country.countryFlag
        }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 2px 5px #00000080, inset 0 2px 10px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;">${
          localization[model.worldCountries.language]["countries"][
            country.countryName
          ]
        }.</span> <span style="margin-left:5px;">${
          localization[model.worldCountries.language][
            "He gets additional attempt to guess and"
          ]
        }</span><span style="
                    margin-left: 3px;
                    color: white;
                    border-radius: 2px;
                    background-color: green;
                    padding-left: 2px;
                    padding-right: 2px;
                    font-weight: bolder;
                  ">+10 ${
                    localization[model.worldCountries.language]["Points"]
                  }</span>`
      );
      await this.sleep(1500);
      this.closeCountryPopup(countryCode);
      this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
        animate: false,
      });
    } else if (this.selectedCountryCodes.has(countryCode)) {
      this.playerAttemptToGuess = false;
      this.opponentPlayer.playerAttemptToGuess = true;
      if (this.isHintUsed(countryCode)) {
        this.usedHintsCount = this.usedHintsCount + 1;
      }
      this.setElementStyle(countryBoundary, {
        weight: 1,
        color: "red",
        fillColor: "red",
        fillOpacity: 0.5,
        opacity: 0.8,
        className: countryCode,
      });
      this.addSelectedCountryToCountryPanel(
        this.playerSelectedCountriesContainerId,
        countryCode,
        Array.from(this.selectedCountryCodes).indexOf(countryCode) + 1,
        false
      );
      const countryUnionIndex = this.getCountryUnionIndex(countryCode);
      const isCountryUnionGuessed =
        this.isCountryUnionGuessed(countryUnionIndex);
      if (isCountryUnionGuessed) {
        this.playerCountriesNumberField.textContent =
          +this.playerCountriesNumberField.textContent - 1;
        const countryUnion = this.countryUnions[countryUnionIndex];
        if (countryUnion.length === 4) {
          this.opponentPlayer.score = this.opponentPlayer.score + 15;
        } else if (countryUnion.length === 3) {
          this.opponentPlayer.score = this.opponentPlayer.score + 25;
        } else if (countryUnion.length === 2) {
          this.opponentPlayer.score = this.opponentPlayer.score + 35;
        } else if (countryUnion.length === 1) {
          this.opponentPlayer.score = this.opponentPlayer.score + 50;
        }
        document.getElementById(
          "player-two-score-field"
        ).textContent = `🏅 ${this.opponentPlayer.score}`;
        countryUnion.forEach((countryObject) => {
          const countryCode = Object.keys(countryObject)[0];
          const country = this.countries[countryCode];
          const countryBorderCodes = country.countryBorders
            .map((countryBorder) => {
              return this.countriesCodeMapping[countryBorder];
            })
            .filter(
              (countryCode) =>
                countryCode !== undefined &&
                this.countryCodes.includes(countryCode)
            );
          countryBorderCodes.forEach((countryBorderCode) => {
            if (!this.selectedCountryCodes.has(countryBorderCode)) {
              const countryBoundary = this.countryBoundaries[countryBorderCode];
              const countryMarker = this.countryMarkers[countryBorderCode];
              countryMarker.unbindTooltip();
              countryBoundary.unbindTooltip();
              countryMarker.off();
              countryBoundary.off();
              this.playerMap.removeLayer(countryMarker);
              this.playerMap.removeLayer(countryBoundary);
              delete this.countryMarkers[countryBorderCode];
              delete this.countryPopups[countryBorderCode];
              delete this.countryTooltips[countryBorderCode];
              delete this.countryBoundaries[countryBorderCode];
              const countryIndexToDelete =
                this.countryCodes.indexOf(countryBorderCode);
              if (countryIndexToDelete >= 0)
                this.countryCodes.splice(countryIndexToDelete, 1);
              this.countriesNumberField.textContent = this.countryCodes.length;
            }
          });
        });
        const countryUnionHtml =
          this.createCountryUnionMessageHtml(countryUnionIndex);
        this.setMessageInnerHtmlField(
          `<span style="margin-right:5px;">⚠️ ${
            localization[model.worldCountries.language]["Opponent guessed"]
          }</span><div style="display: inline-block;">${
            countryUnionHtml.outerHTML
          }</div><span style="margin-left:5px;">${
            localization[model.worldCountries.language]["Country Alliance"]
          }</span>`
        );
        await this.sleep(1500);
        this.closeCountryPopup(countryCode);
        this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
          animate: false,
        });
      } else {
        this.setMessageInnerHtmlField(
          `<span>ℹ️ ${
            localization[model.worldCountries.language]["Opponent guessed"]
          }</span> <img src="${
            country.countryFlag
          }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 2px 5px #00000080, inset 0 2px 10px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;">${
            localization[model.worldCountries.language]["countries"][
              country.countryName
            ]
          }</span>`
        );
        await this.sleep(1000);
        this.closeCountryPopup(countryCode);
      }
    } else {
      this.setElementStyle(countryBoundary, {
        weight: 1,
        color: "grey",
        fillColor: "grey",
        fillOpacity: 0.5,
        opacity: 0.8,
        className: countryCode,
      });
      this.gameMessageField.textContent = `⛔ ${
        localization[model.worldCountries.language][
          "Opponent failed to guess your country!"
        ]
      }`;
      this.playerAttemptToGuess = true;
      this.opponentPlayer.playerAttemptToGuess = false;
      await this.sleep(1000);
      this.closeCountryPopup(countryCode);
      this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
        animate: false,
      });
      this.playerMap.removeLayer(countryBoundary);
      delete this.countryBoundaries[countryCode];
      this.enableMapInteraction();
    }
    if (+this.playerCountriesNumberField.textContent === 0) {
      this.opponentPlayer.score +=
        +this.opponentPlayer.playerCountriesNumberField.textContent * 10;
      this.playerWonGame = false;
      this.game.finished = true;
      this.game.showGameResult(false, false);
      return;
    }
    this.sendMoveAckToOpponent();
    this.game.isPlayerReady = true;
    this.game.playHit();
  }

  opponentConnectionHandler(connectionState) {
    const opponentConnectionText = document.getElementById(
      "opponent-connection-text"
    );
    const opponentConnectionIndicator = document.getElementById(
      "opponent-connection-indicator"
    );
    if (connectionState === "connected") {
      opponentConnectionIndicator.style.backgroundColor = "green";
      opponentConnectionText.textContent =
        localization[model.worldCountries.language]["Opponent is online"];
      opponentConnectionText.style.color = "green";
    } else if (connectionState === "connecting") {
      opponentConnectionIndicator.style.backgroundColor = "yellow";
      opponentConnectionText.textContent =
        localization[model.worldCountries.language]["Opponent is connecting"];
      opponentConnectionText.style.color = "green";
    } else if (connectionState === "disconnected") {
      opponentConnectionIndicator.style.backgroundColor = "red";
      opponentConnectionText.style.color = "red";
      opponentConnectionText.textContent =
        localization[model.worldCountries.language]["Opponent is not online"];
      setTimeout(() => {
        if (
          this.game &&
          this.game.firebase &&
          this.game.firebase.opponentConnectionState !== "connected"
        ) {
          alert(
            "⚠️ " +
              localization[model.worldCountries.language][
                "Sorry... Connection with your opponent has failed. Game is ended."
              ]
          );
          if (this.game) this.game.finishGame(false);
        }
      }, 60000);
    } else if (connectionState === "failed") {
      opponentConnectionIndicator.style.backgroundColor = "red";
      opponentConnectionText.style.color = "red";
      opponentConnectionText.textContent =
        localization[model.worldCountries.language]["Connection is failed"];
      setTimeout(() => {
        if (
          this.game &&
          this.game.firebase &&
          this.game.firebase.opponentConnectionState !== "connected"
        ) {
          alert(
            "⚠️ " +
              localization[model.worldCountries.language][
                "Sorry... Connection with your opponent has failed. Game is ended."
              ]
          );
          if (this.game) this.game.finishGame(false);
        }
      }, 60000);
    } else if (connectionState === "closed") {
      opponentConnectionIndicator.style.backgroundColor = "red";
      opponentConnectionText.style.color = "red";
      opponentConnectionText.textContent =
        localization[model.worldCountries.language]["Connection is closed"];
      alert(
        "⚠️ " +
          localization[model.worldCountries.language][
            "Sorry... Opponent left the game."
          ]
      );
      if (this.game) this.game.finishGame(false);
    }
  }
}
