import { localization } from "./localization/ua.js";
import { WORLD_MAP_BOUNDS } from "./config.js";
import { getCountryGeo, getRandomInt } from "./helpers.js";
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
  usedHintsCount = 0;
  trapCountryHitted = 0;
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
    this.initData();
  }

  cleanPlayerResources() {
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
    this.countriesCodeMapping = null;
    this.countryBoundaries = null;
    this.countryTooltips = null;
    this.countryPopups = null;
    this.countryMarkers = null;
    this.hints = null;
    this.usedHintsCount = null;
    this.trapCountryHitted = null;
    this.playerAttemptToGuess = null;
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
    this.usedHintsCount = 0;
    this.trapCountryHitted = 0;
    this.playerAttemptToGuess = false;
    this.playerConfigured = false;
    this.playerWonGame = false;
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
      const countryMarker = this.createCountryMarker(country, countryTooltip);
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
    this.gameMessageField.textContent = `${
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
    }
  }

  createCountryUnionMessageHtml(countryUnionIndex) {
    const countryUnion = this.countryUnions[countryUnionIndex];
    const countryUnionTable = document.createElement("table");
    const countryUnionRow = document.createElement("tr");
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

  showGuesseNotGuessedPanel() {
    const guessedNotGuessedPanel = document.getElementById(
      "guessed-not-guessed-panel"
    );
    guessedNotGuessedPanel.classList.remove("not-displayed");
  }

  hideGuesseNotGuessedPanel() {
    const guessedNotGuessedPanel = document.getElementById(
      "guessed-not-guessed-panel"
    );
    guessedNotGuessedPanel.classList.add("not-displayed");
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
        !this.alreadyGuessedCountryCodes.includes(country.cca2)
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
      this.gameMessageField.textContent =
        localization[model.worldCountries.language][
          "Computer is guessing your country..."
        ];
      this.showGuesseNotGuessedPanel();
      await this.sleep(1000);
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
      countryMarker.off();
      countryBoundary.off();
      countryMarker.options.opacity = 0;
      this.opponentPlayer.playerMap.removeLayer(countryMarker);
      this.opponentPlayer.openCountryPopup(countryCode);
      const countryCoordinates = country.latlng
        ? country.latlng
        : country.capitalLatLng;
      this.opponentPlayer.playerMap.setView(countryCoordinates, 4.5);
      if (this.opponentPlayer.selectedCountryTrapCodes.has(countryCode)) {
        this.setMessageInnerHtmlField(
          `<span>${
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
        this.opponentPlayer.setElementStyle(countryBoundary, {
          weight: 1,
          color: "grey",
          fillColor: "grey",
          fillOpacity: 0.3,
          opacity: 0.6,
          className: countryCode,
        });
        this.opponentPlayer.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
          animate: false,
        });
        this.opponentPlayer.enableMapInteraction();
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
                countryMarker.off();
                countryBoundary.off();
                countryMarker.options.opacity = 0;
                this.opponentPlayer.playerMap.removeLayer(countryMarker);
                this.opponentPlayer.setElementStyle(countryBoundary, {
                  weight: 1,
                  color: "grey",
                  fillColor: "grey",
                  fillOpacity: 0.3,
                  opacity: 0.6,
                  className: countryCode,
                });
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
            `<span style="margin-right:5px;">${
              localization[model.worldCountries.language]["Computer guessed"]
            }</span><div style="display: inline-block;">${
              countryUnionHtml.outerHTML
            }</div><span style="margin-left:5px;">${
              localization[model.worldCountries.language]["Country Alliance"]
            }</span>`
          );
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
            `<span>${
              localization[model.worldCountries.language]["Computer guessed"]
            }</span> <img src="${
              country.countryFlag
            }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 2px 5px #00000080, inset 0 2px 10px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;">${
              localization[model.worldCountries.language]["countries"][
                country.countryName
              ]
            }</span>`
          );
        }
        await this.sleep(1500);
        this.opponentPlayer.closeCountryPopup(countryCode);
        this.opponentPlayer.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
          animate: false,
        });
      } else {
        this.opponentPlayer.setElementStyle(countryBoundary, {
          weight: 1,
          color: "grey",
          fillColor: "grey",
          fillOpacity: 0.3,
          opacity: 0.6,
          className: countryCode,
        });
        this.gameMessageField.textContent =
          localization[model.worldCountries.language][
            "Computer failed to guess your country!"
          ];
        this.playerAttemptToGuess = false;
        this.opponentPlayer.playerAttemptToGuess = true;
        await this.sleep(1500);
        this.opponentPlayer.closeCountryPopup(countryCode);
        this.opponentPlayer.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
          animate: false,
        });
        this.opponentPlayer.enableMapInteraction();
      }

      if (+this.opponentPlayer.playerCountriesNumberField.textContent === 0) {
        this.playerWonGame = true;
        this.game.finished = true;
        this.game.showGameResult(false);
        return;
      }
    } else {
      if (this.opponentPlayer.countryCodes.length <= 5) {
        this.opponentPlayer.addAvailableCountriesPanel();
      }
      this.playMap.setMapFiledLabel("Computer Map");
      this.countriesNumberField.textContent =
        this.opponentPlayer.countryCodes.length;
      this.gameMessageField.textContent =
        localization[model.worldCountries.language][
          "Your attempt to guess opponent's country"
        ];
      return;
    }
    this.game.playHit();
  }

  addAvailableCountriesPanel() {
    const setViewCountry = function (country) {
      this.playerMap.setView(
        country.latlng ? country.latlng : country.capitalLatLng,
        4.5
      );
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
        const locationIcon = document.createElement("i");
        locationIcon.classList.add("fa-solid");
        locationIcon.classList.add("fa-location-crosshairs");
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
    this.disableMapInteraction();
    this.alreadyGuessedCountryCodes.push(countryCode);
    const country = this.countries[countryCode];
    const countryIndexToDelete = this.countryCodes.indexOf(countryCode);
    this.countryCodes.splice(countryIndexToDelete, 1);
    if (this.countryCodes.length <= 5) this.addAvailableCountriesPanel();
    countryMarker.off();
    countryBoundary.off();
    countryMarker.options.opacity = 0;
    this.playerMap.removeLayer(countryMarker);
    this.countriesNumberField.textContent = this.countryCodes.length;
    this.openCountryPopup(countryCode);
    if (this.selectedCountryTrapCodes.has(countryCode)) {
      this.setMessageInnerHtmlField(
        `<span>${
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
      this.trapCountryHitted = this.trapCountryHitted + 1;
      this.addHint(countryCode, true);
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
        color: "red",
        fillColor: "red",
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
        countryUnion.forEach((countryObject) => {
          const countryCode = Object.keys(countryObject)[0];
          this.addSelectedCountryToCountryPanel(
            this.playerSelectedCountriesContainerId,
            countryCode,
            Array.from(this.selectedCountryCodes).indexOf(countryCode) + 1
          );
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
              countryMarker.off();
              countryBoundary.off();
              countryMarker.options.opacity = 0;
              this.playerMap.removeLayer(countryMarker);
              this.setElementStyle(countryBoundary, {
                weight: 1,
                color: "grey",
                fillColor: "grey",
                fillOpacity: 0.3,
                opacity: 0.6,
                className: countryCode,
              });
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
          `<span style="margin-right:5px;">${
            localization[model.worldCountries.language]["You guessed"]
          }</span><div style="display: inline-block;">${
            countryUnionHtml.outerHTML
          }</div><span style="margin-left:5px;">${
            localization[model.worldCountries.language]["Country Alliance"]
          }</span>`
        );
        document.getElementById(
          "guessed-country-alliance-panel-content"
        ).innerHTML = `<span style="font-weight:bold;">${
          localization[model.worldCountries.language]["You guessed"]
        }</span><div style="display: inline-block; margin-left:5px;">${
          countryUnionHtml.outerHTML
        }</div>`;
        const guessedCountryAlliance = document.getElementById(
          "guessed-country-alliance-panel"
        );
        guessedCountryAlliance.classList.remove("not-displayed");
        await this.sleep(2000);
        guessedCountryAlliance.classList.add("not-displayed");
        this.closeCountryPopup(countryCode);
        this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
          animate: false,
        });
      } else {
        this.setMessageInnerHtmlField(
          `<span>${
            localization[model.worldCountries.language]["You guessed"]
          }</span> <img src="${
            country.countryFlag
          }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 2px 5px #00000080, inset 0 2px 10px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;">${
            localization[model.worldCountries.language]["countries"][
              country.countryName
            ]
          }</span>`
        );
        await this.sleep(1500);
        this.closeCountryPopup(countryCode);
      }
      this.opponentPlayer.enableMapInteraction();
    } else {
      this.setElementStyle(countryBoundary, {
        weight: 1,
        color: "grey",
        fillColor: "grey",
        fillOpacity: 0.3,
        opacity: 0.6,
        className: countryCode,
      });
      this.gameMessageField.textContent =
        localization[model.worldCountries.language][
          "Failed attempt to guess country!"
        ];
      this.playerAttemptToGuess = true;
      this.opponentPlayer.playerAttemptToGuess = false;
      await this.sleep(1500);
      this.closeCountryPopup(countryCode);
      this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
        animate: false,
      });
    }
    if (+this.playerCountriesNumberField.textContent === 0) {
      this.opponentPlayer.playerWonGame = true;
      this.game.finished = true;
      this.game.showGameResult(true);
      return;
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
        selectedCountryNeighboursCodes.has(country)
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
    while (result.includes("UA") && result.includes("RU"))
      this.selectRandomCountryUnion(countriesCodeList, numberOfCountries);
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
      const countryIndexToDelete = countriesCodeList.indexOf(country);
      if (countryIndexToDelete >= 0) {
        countriesCodeList.splice(countryIndexToDelete, 1);
      }
      if (!trapCountry) {
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
      } else {
        this.selectedCountryTrapCodes.add(country);
      }
    });
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
        this.playerMap.removeLayer(countryMarker);
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
    this.gameMessageField.textContent = `${
      localization[model.worldCountries.language][
        "Choose one alliance from four countries"
      ]
    }`;
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

  addUserPlayerInitialCountrySelectionHandler(countryCode, countryBoundary) {
    const countryMarker = this.countryMarkers[countryCode];
    countryMarker.off("click");
    countryBoundary.off("click");
    if (this.playerConfigured) {
      this.gameMessageField.textContent = `${
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
          this.gameMessageField.textContent = `${
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
          this.gameMessageField.textContent = `${
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
          this.gameMessageField.textContent = `${
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
          this.gameMessageField.textContent = `${
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
          this.gameMessageField.textContent = `${
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
          this.gameMessageField.textContent = `${
            localization[model.worldCountries.language][
              "Choose the first alliance from one country"
            ]
          }`;
        }
      }
      if (this.selectedCountryCodes.size === 17) {
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
          this.gameMessageField.textContent = `${
            localization[model.worldCountries.language][
              "Choose the second alliance from one country"
            ]
          }`;
        }
      }
      if (this.selectedCountryCodes.size === 18) {
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
          this.gameMessageField.textContent = `${
            localization[model.worldCountries.language][
              "Choose the third alliance from one country"
            ]
          }`;
        }
      }
      if (this.selectedCountryCodes.size === 19) {
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
          this.gameMessageField.textContent = `${
            localization[model.worldCountries.language][
              "Choose the fourth alliance from one country"
            ]
          }`;
        }
      }
      if (this.selectedCountryCodes.size === 20) {
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
          this.gameMessageField.textContent = `${
            localization[model.worldCountries.language][
              "Choose the first trap country"
            ]
          }`;
        }
      }
      if (this.selectedCountryCodes.size === 21) {
        this.selectedCountryTrapCodes.add(countryCode);
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "orange"
        );
        if (this.selectedCountryCodes.size === 21) {
          this.addCountryBoundariesAndMarkers(1);
          this.gameMessageField.textContent = `${
            localization[model.worldCountries.language][
              "Choose the second trap country"
            ]
          }`;
        }
      }
      if (this.selectedCountryCodes.size === 22) {
        this.selectedCountryTrapCodes.add(countryCode);
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "orange"
        );
        if (this.selectedCountryCodes.size === 22) {
          this.addCountryBoundariesAndMarkers(1);
          this.gameMessageField.textContent = `${
            localization[model.worldCountries.language][
              "Choose the third trap country"
            ]
          }`;
        }
      }
      if (this.selectedCountryCodes.size === 23) {
        this.selectedCountryTrapCodes.add(countryCode);
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "orange"
        );
        if (this.selectedCountryCodes.size === 23) {
          this.addCountryBoundariesAndMarkers(1);
          this.gameMessageField.textContent = `${
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
    countryBoundary.on(
      "mouseover",
      function (event) {
        L.DomEvent.stopPropagation(event);
        countryBoundary.setStyle(styleObject);
        countryBoundary.bringToFront();
      }.bind(this)
    );
  }

  addMouseOutStyleEventToCountryBoundary(countryBoundary, styleObject) {
    countryBoundary.on(
      "mouseout",
      function (event) {
        L.DomEvent.stopPropagation(event);
        countryBoundary.setStyle(styleObject);
        countryBoundary.bringToBack();
      }.bind(this)
    );
  }

  createCountryMarker(country, countryTooltip) {
    const marker = L.marker(
      country.latlng ? country.latlng : country.capitalInfo.latlng,
      {
        icon: L.icon({
          iconUrl: `${country.flags.png}`,
          iconSize: [12, 12],
        }),
        riseOnHover: true,
        opacity: 0.95,
        alt: localization[model.worldCountries.language]["countries"][
          country.name.common
        ],
        className: country.cca2,
      }
    ).bindTooltip(countryTooltip);
    marker.dataId = country.cca2;
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
                                inset 0 2px 10px #0000001f; border-radius: 2px; vertical-align: sub;"><span style="font-weight:bold; margin-left:5px;">${
                                  country.name.common !== "Russia"
                                    ? localization[
                                        model.worldCountries.language
                                      ]["countries"][country.name.common]
                                    : localization[
                                        model.worldCountries.language
                                      ]["countries"][country.name.common] +
                                      " - " +
                                      localization[
                                        model.worldCountries.language
                                      ]["War Aggressor"]
                                }</span>`
      );
    return countryPopup;
  }

  createCountryTooltip(country) {
    const countryTooltip = L.tooltip(
      country.latlng ? country.latlng : country.capitalInfo.latlng
    ).setContent(
      country.name.common !== "Russia"
        ? localization[model.worldCountries.language]["countries"][
            country.name.common
          ]
        : localization[model.worldCountries.language]["countries"][
            country.name.common
          ] +
            " - " +
            localization[model.worldCountries.language]["War Aggressor"]
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
    this.opponentPlayer.removeAllCountryMarkers();
    this.opponentPlayer.removeAllCountryBoundaries();
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
    this.selectedCountryNeighboursCodes.forEach((countryCode) => {
      const countryBoundary = this.countryBoundaries[countryCode];
      countryBoundary.off();
      this.setElementStyle(countryBoundary, {
        weight: 1,
        color: "grey",
        fillColor: "grey",
        fillOpacity: 0.3,
        opacity: 0.6,
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
}
