import { localization } from "./localization/ua.js";
import { WORLD_MAP_BOUNDS, GEOGRAPHICAL_CENTER } from "./config.js";
import { getCountryGeo, getRandomInt } from "./helpers.js";
import * as model from "./model.js";
export class Player {
  playerMap;
  opponentPlayer;
  gameConfiguration;
  playerType;
  game;
  gameMessageField = document.querySelector(".countries-battle-game-message");
  playButton;
  playerCountriesNumberField;
  playerSelectedCountriesContainer;
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
  countryUnions = [];
  constructor(
    playerMap,
    playerSelectedCountriesContainerId,
    playerCountriesNumberContainerId,
    gameConfiguration,
    playerType = "userPlayer"
  ) {
    this.playerMap = playerMap;
    this.gameConfiguration = gameConfiguration;
    this.playerType = playerType;
    this.playerCountriesNumberField = document.getElementById(
      playerCountriesNumberContainerId
    );
    this.playerSelectedCountriesContainer = document.getElementById(
      playerSelectedCountriesContainerId
    );
    this.playButton = document.querySelector(".guess-country-game-play");
    this.initData();
  }

  initData() {
    this.selectedCountryCodes = new Set();
    this.selectedCountryTrapCodes = new Set();
    this.selectedCountryNeighboursCodes = new Set();
    this.countries = {};
    this.countriesCodeMapping = {};
    this.countryBoundaries = {};
    this.countryTooltips = {};
    this.countryPopups = {};
    this.countryMarkers = {};
    this.playerConfigured = false;
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
        this.countries[country.cca2] = {
          countryName: country.name.common,
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
        this.countries[country.cca2] = {
          countryName: country.name.common,
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
    if (this.playerType === "computerPlayer") {
      this.selectRandomCountries();
    }
    this.gameMessageField.textContent = `${
      localization[model.worldCountries.language][
        "Choose one alliance from four countries"
      ]
    }`;
  }

  selectRandomCountryUnion(countriesCodeList, numberOfCountries) {
    const visited = new Set();
    const countryUnionCountries = [];
    const countries = this.countries;
    const countriesCodeMapping = this.countriesCodeMapping;

    function dfs(country) {
      if (visited.has(country) || visited.size >= numberOfCountries) return;
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

    return countryUnionCountries.slice(0, numberOfCountries);
  }

  fillComputerPlayerSelectedCountries(
    countryUnion,
    countriesCodeList,
    trapCountry = false
  ) {
    countryUnion.forEach((country) => {
      if (!this.selectedCountryCodes.has(country)) {
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
      firstOneCountryUnion.forEach((countryCode, index) => {
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
      firstOneCountryUnion.forEach((countryCode, index) => {
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
      firstOneCountryUnion.forEach((countryCode, index) => {
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
      this.playerCountriesNumberField.textContent =
        this.selectedCountryCodes.size - this.selectedCountryTrapCodes.size;
    }
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
          fillOpacity: 0.5,
          opacity: 0.8,
          className: countryCode,
        });
        countryBoundary.off();
        countryMarker.off();
        this.playerMap.removeLayer(countryMarker);
      }
    });
  }

  addSelectedCountryToUserSelectedCountryPanel(countryCode, countryIndex) {
    const country = this.countries[countryCode];
    const userSelectedCountriesPanel = document.querySelector(
      "#player-one-selected-countries-container"
    );
    const countryElement = userSelectedCountriesPanel.querySelector(
      `.country${countryIndex.toString()}`
    );
    countryElement.innerHTML = `<img id="${country.cca2}" src="${
      country.countryFlag
    }" alt="${
      localization[model.worldCountries.language]["countries"][
        country.countryName
      ]
    }" title="${
      localization[model.worldCountries.language]["countries"][
        country.countryName
      ]
    }" style="width:10px; height:10px;border:solid 1px grey; border-radius:50%; display:inline-block;vertical-align:baseline; box-shadow: 0 2px 5px #00000080, inset 0 2px 10px #0000001f;">`;
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
    this.addSelectedCountryToUserSelectedCountryPanel(
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
        this.playerCountriesNumberField.textContent =
          +this.playerCountriesNumberField.textContent + 1;
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 4) {
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
        this.playerCountriesNumberField.textContent =
          +this.playerCountriesNumberField.textContent + 1;
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 7) {
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
        this.playerCountriesNumberField.textContent =
          +this.playerCountriesNumberField.textContent + 1;
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 10) {
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
        this.playerCountriesNumberField.textContent =
          +this.playerCountriesNumberField.textContent + 1;
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 12) {
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
        this.playerCountriesNumberField.textContent =
          +this.playerCountriesNumberField.textContent + 1;
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 14) {
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
        this.playerCountriesNumberField.textContent =
          +this.playerCountriesNumberField.textContent + 1;
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 16) {
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
          this.playButton.disabled = false;
          this.playerConfigured = true;
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
        }" style="width:15px; height:15px; border: 1px solid black; border-radius: 50%;"><span style="font-weight:bold; margin-left:5px;">${
          localization[model.worldCountries.language]["countries"][
            country.name.common
          ]
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
}
