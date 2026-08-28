import { localization } from "./localization/ua.js";
import { WORLD_MAP_BOUNDS } from "./config.js";
import { COUNTRY_BOUNDS } from "./data/countriesBounds.js";
import {
  getCountryGeo,
  getRandomInt,
  resetGameRoomContainer,
  showGameCountryAllianceGuessedWindow,
  hideGameCountryAllianceGuessedWindow,
  showCountryCoatOfArmsFlagWindow,
  hideModalWindow,
  showModalWindow,
  getCountryPhotoUnsplash,
  addTimerToModal,
  findLastIndex,
} from "./helpers.js";
import * as model from "./model.js";
export class Player {
  hitTimeoutIds = [];
  hitIntervalIds = [];
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
  countryBoundariesAndMarkersFeatureGroup;
  lastGuessedCountryNames = [];
  usedHintsCount = 0;
  trapCountryHitted = 0;
  trapCountryHittedCode;
  highlightCountryCodes = [];
  score = 0;
  opponentPlayerConfigAcknowledged = false;
  opponentPlayerStartAcknowledged = false;
  playerAttemptToGuess = false;
  playerAlreadyHitting = false;
  playerWonGame = false;
  playerConfigured = false;
  openAutoHint = false;
  selectedCountryCodes = new Set();
  selectedCountryTrapCodes = new Set();
  selectedCountryNeighboursCodes = new Set();
  countries = {};
  countriesCodeMapping = {};
  countryBoundariesStyles = {};
  countryMarkersStyles = {};
  hints = {};
  countryUnions = [];
  countryCodes = [];
  countriesToGuessNext = [];
  countriesToGuess = [];
  alreadyGuessedCountryCodes = [];
  hintTypes = new Set();
  openUserHintSelectionWindow = false;
  constructor(
    playerMap,
    playerSelectedCountriesContainerId,
    playerCountriesNumberContainerId,
    gameConfiguration,
    playerType = "userPlayer",
  ) {
    this.playerMap = playerMap.map;
    this.playMap = playerMap;
    this.gameConfiguration = gameConfiguration;
    this.playerType = playerType;
    if (playerType === "userPlayer") this.playerAttemptToGuess = true;
    this.gameMessageField = document.querySelector(
      "#countries-battle-game-message",
    );
    this.playerSelectedCountriesContainerId =
      playerSelectedCountriesContainerId;
    this.playerCountriesNumberField = document.getElementById(
      playerCountriesNumberContainerId,
    );
    this.playerSelectedCountriesContainer = document.getElementById(
      playerSelectedCountriesContainerId,
    );
    this.countriesNumberField = document.getElementById(
      "countries-number-field",
    );
    this.bonusCountriesNumberField = document.getElementById(
      "bonus-countries-number-field",
    );
    this.playButton = document.querySelector(".guess-country-game-play");
  }

  clearAllTimeouts(player) {
    player.hitTimeoutIds.forEach((id) => {
      clearTimeout(id);
    });
    player.hitTimeoutIds.length = 0;
  }

  clearAllIntervals(player) {
    player.hitIntervalIds.forEach((id) => {
      clearInterval(id);
    });
    player.hitIntervalIds.length = 0;
  }

  cleanPlayerResources(deleteGameRoom) {
    if (deleteGameRoom) {
      resetGameRoomContainer();
      sessionStorage.removeItem("game-room");
      if (this.game.firebase) this.game.firebase.cleanupResources(false);
    }
    if (this.hitTimeoutIds && this.hitTimeoutIds.length != 0)
      this.clearAllTimeouts(this);
    if (this.hitIntervalIds && this.hitIntervalIds.length != 0)
      this.clearAllIntervals(this);
    this.hitTimeoutIds = [];
    this.hitIntervalIds = [];
    this.playMap.countryBoundariesAndMarkersLayer.boundaries = null;
    this.playMap.countryBoundariesAndMarkersLayer.markers = null;
    this.playMap = null;
    this.playerMap = null;
    this.opponentPlayer = null;
    this.gameConfiguration = null;
    this.playerType = null;
    this.game = null;
    this.gameMessageField = null;
    this.countriesNumberField = null;
    this.bonusCountriesNumberField = null;
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
    this.countryBoundariesStyles = null;
    this.countryMarkersStyles = null;
    this.hints = null;
    this.usedHintsCount = null;
    this.score = null;
    this.trapCountryHitted = null;
    this.trapCountryHittedCode = null;
    this.highlightCountryCodes = [];
    this.playerAttemptToGuess = null;
    this.openUserHintSelectionWindow = null;
    this.openAutoHint = null;
    this.opponentPlayerConfigAcknowledged = null;
    this.opponentPlayerStartAcknowledged = null;
    this.countryBoundariesAndMarkersFeatureGroup = null;
    this.playerConfigured = null;
    this.playerWonGame = null;
    this.playerAlreadyHitting = null;
    this.countryUnions = null;
    this.countryCodes = null;
    this.countriesToGuessNext = null;
    this.countriesToGuess = null;
    this.alreadyGuessedCountryCodes = null;
    this.hintTypes = null;
    this.outlineMapHandler = null;
    document.getElementById("countryOutlineMap").innerHTML = "";
  }

  preloadImage = (src) => {
    if (!src) return src;
    const img = new Image();
    img.src = src;
    return src;
  };

  initData() {
    this.hitTimeoutIds = [];
    this.hitIntervalIds = [];
    this.playMap.initSelectionCountriesMapView();
    this.selectedCountryCodes = new Set();
    this.selectedCountryTrapCodes = new Set();
    this.selectedCountryNeighboursCodes = new Set();
    this.countries = {};
    this.countriesCodeMapping = {};
    this.countryBoundariesStyles = {};
    this.countryMarkersStyles = {};
    this.hints = {};
    this.score = 0;
    this.usedHintsCount = 0;
    this.trapCountryHitted = 0;
    this.trapCountryHittedCode = null;
    this.highlightCountryCodes = [];
    if (this.playerType === "userPlayer") {
      this.playerAttemptToGuess = true;
    } else {
      this.playerAttemptToGuess = false;
    }
    this.openUserHintSelectionWindow = false;
    this.opponentPlayerConfigAcknowledged = false;
    this.opponentPlayerStartAcknowledged = false;
    this.playerConfigured = false;
    this.playerWonGame = false;
    this.playerAlreadyHitting = false;
    this.openAutoHint = false;
    this.lastGuessedCountryNames = [];
    this.countryBoundariesAndMarkersFeatureGroup = L.featureGroup();
    if (
      this.gameConfiguration.hintsType === "All Hints" ||
      this.gameConfiguration.hintsType === "Choose Hints"
    ) {
      this.hintTypes = new Set([
        "country",
        "capital",
        "region",
        "subregion",
        "flag",
        "emblem",
        "boundary",
        "photo",
      ]);
    } else if (this.gameConfiguration.hintsType === "Text Hints") {
      this.hintTypes = new Set(["country", "capital", "region", "subregion"]);
    } else {
      this.hintTypes = new Set(["flag", "emblem", "boundary", "photo"]);
    }
    this.countryUnions = [
      new Array(4),
      new Array(4),
      new Array(3),
      new Array(3),
      new Array(2),
      new Array(2),
      new Array(1),
      new Array(1),
    ];
    this.countryCodes = [];
    this.countriesToGuessNext = [];
    this.countriesToGuess = [];
    this.alreadyGuessedCountryCodes = [];
    let worldCountries = [];
    if (this.gameConfiguration.onlyIndependentCountries) {
      worldCountries = model.worldCountries.countries.filter(
        (country) => country.independent,
      );
    } else {
      worldCountries = model.worldCountries.countries;
    }
    worldCountries.forEach((country) => {
      if (this.playerType === "userPlayer") {
        const countryGeo = getCountryGeo(country.cca2);
        const countryTooltip = this.createCountryTooltip(country);
        const countryBoundary = this.createCountryBoundary(
          countryGeo,
          country.cca2,
          countryTooltip,
        );
        const countryPopup = this.createCountryPopup(country);
        const countryMarker = this.createCountryMarker(
          country,
          countryBoundary,
          countryTooltip,
          countryPopup,
          15,
          15,
        );
        this.addMouseOverStyleEventToCountryBoundary(
          countryBoundary,
          countryMarker,
          {
            weight: 1,
            fillOpacity: 0.5,
            opacity: 1,
            className: country.cca2,
          },
        );
        this.addMouseOutStyleEventToCountryBoundary(
          countryBoundary,
          countryMarker,
          {
            weight: 0,
            fillOpacity: 0.1,
            opacity: 0,
            className: country.cca2,
          },
        );
        this.playMap.countryBoundariesAndMarkersLayer.boundaries[country.cca2] =
          countryBoundary;
        this.playMap.countryBoundariesAndMarkersLayer.markers[country.cca2] =
          countryMarker;
      }
      this.countriesCodeMapping[country.cca3] = country.cca2;
      this.countryCodes.push(country.cca2);
      this.countries[country.cca2] = {
        countryName: country.name.common,
        countryWikiLandscapeCategoryName: country?.wikiLandscapeCategoryName,
        countryCapital: country.capital?.[0],
        countryRegion: country.region,
        countrySubregion: country?.subregion,
        countryFlag: this.preloadImage(country.flags.webp),
        countryCoatOfArms: this.preloadImage(country.coatOfArms?.webp),
        countryIndependent: country.independent,
        cca2: country.cca2,
        cca3: country.cca3,
        latlng: country.latlng,
        capitalLatLng: country.capitalInfo.latlng,
        countryBorders: country.borders ? country.borders : [],
      };
    });
    if (
      this.gameConfiguration.gameMode === "user" &&
      this.game &&
      this.game.firebase &&
      this.game.firebase.opponentConnectionState
    ) {
      this.game.opponentConnectionHandler(
        this.game.firebase.opponentConnectionState,
      );
    }
    this.addCountryBoundariesAndMarkers(
      this.gameConfiguration.maxCountriesNumberInUnion,
    );
    this.selectedCountryTrapCodes.forEach((countryCode) => {
      this.selectedCountryCodes.delete(countryCode);
    });
    if (this.playerType === "computerPlayer") {
      this.selectRandomCountries();
    }
    this.setMessageInnerHtmlField(
      `<span style="font-size: 0.8rem;">ℹ️ ${
        localization[model.worldCountries.language][
          "Choose the first alliance from four countries on map or click"
        ] + " 🎲"
      }</span>`,
    );
  }

  addCountryBoundaryBlinking(countryCode) {
    const countryBoundary = document.querySelector(`.${countryCode}`);
    if (countryBoundary) {
      countryBoundary.classList.add("blinking");
    }
  }

  removeCountryBoundaryBlinking(countryCode) {
    const countryBoundary = document.querySelector(`.${countryCode}`);
    if (countryBoundary) {
      countryBoundary.classList.remove("blinking");
    }
  }

  getRandomHintType() {
    let randomHintIndex = getRandomInt(0, this.hintTypes.size - 1);
    let hintType = Array.from(this.hintTypes)[randomHintIndex];
    this.hintTypes.delete(hintType);
    return hintType;
  }

  addUserSelectedHint() {
    const selectedCountryCodes = [];
    let notGuessedCountries = this.opponentPlayer.countryUnions
      .filter((countryUnion) =>
        countryUnion.every((item) => !Object.values(item)[0].guessed),
      )
      .flatMap((countryUnion) =>
        countryUnion.map((item) => Object.keys(item)[0]),
      )
      .filter((countryCode) => !(countryCode in this.hints));
    if (notGuessedCountries.length !== 0) {
      selectedCountryCodes.push(...notGuessedCountries);
    } else {
      notGuessedCountries = this.opponentPlayer.countryUnions
        .filter((countryUnion) =>
          countryUnion.some((item) => !Object.values(item)[0].guessed),
        )
        .flatMap((countryUnion) =>
          countryUnion
            .filter((item) => !Object.values(item)[0].guessed)
            .map((item) => Object.keys(item)[0]),
        )
        .filter((countryCode) => !(countryCode in this.hints));
      selectedCountryCodes.push(...notGuessedCountries);
    }
    if (selectedCountryCodes.length === 0) return;
    const userHintTypeSelect = document.getElementById(
      "user-hint-types-select",
    );
    const userHintPlayButton = document.getElementById(
      "gameUserHintSelectionPlayButton",
    );
    const userHintPlayButtonLabel = document.getElementById(
      "gameUserHintSelectionPlayButtonLabel",
    );
    const userHintHeader = document.getElementById(
      "gameUserHintSelectionLabel",
    );
    const userHintPlayButtonEmoji = document.getElementById(
      "gameUserHintSelectionPlayButtonEmoji",
    );
    userHintPlayButtonLabel.textContent =
      localization[model.worldCountries.language]["Play"];
    userHintHeader.textContent =
      "💡 " +
      localization[model.worldCountries.language]["Hint Selection"] +
      " 💡";
    const userHintTextContainer = document.getElementById(
      "gameUserHintSelectionText",
    );
    const trapCountryHitted = this.countries[this.trapCountryHittedCode];
    userHintTextContainer.innerHTML = `${
      this.opponentPlayer.playerType === "computerPlayer"
        ? `<div>${localization[model.worldCountries.language]["Computer has fallen into a trap-country"]}${`<img src="${
            trapCountryHitted.countryFlag
          }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> ${
            trapCountryHitted.countryCoatOfArms
              ? `<img src="${
                  trapCountryHitted.countryCoatOfArms
                }" style="margin-left:5px; width:15px; height:15px; vertical-align: sub;">`
              : ""
          } <span style="margin-left:5px;color: darkblue;font-weight:bold;">${
            localization[model.worldCountries.language]["countries"][
              trapCountryHitted.countryName
            ]
          }</span>`}</div>`
        : `<div>${localization[model.worldCountries.language]["Opponent has fallen into a trap-country"]}${`<img src="${
            trapCountryHitted.countryFlag
          }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> ${
            trapCountryHitted.countryCoatOfArms
              ? `<img src="${
                  trapCountryHitted.countryCoatOfArms
                }" style="margin-left:5px; width:15px; height:15px; vertical-align: sub;">`
              : ""
          } <span style="margin-left:5px;color: darkblue;font-weight:bold;">${
            localization[model.worldCountries.language]["countries"][
              trapCountryHitted.countryName
            ]
          }</span>`}</div>`
    }
    <div>${localization[model.worldCountries.language]["Choose a hint from the list below"]}:</div>`;
    userHintTypeSelect.innerHTML = "";
    if (this.hintTypes.has("country")) {
      const countryNameOption = new Option(
        localization[model.worldCountries.language]["Country Name"],
        "country",
      );
      userHintTypeSelect.add(countryNameOption);
    }
    if (this.hintTypes.has("flag")) {
      const countryFlagOption = new Option(
        localization[model.worldCountries.language]["Flag"],
        "flag",
      );
      userHintTypeSelect.add(countryFlagOption);
    }
    if (this.hintTypes.has("region")) {
      const countryRegionOption = new Option(
        localization[model.worldCountries.language]["Region"],
        "region",
      );
      userHintTypeSelect.add(countryRegionOption);
    }
    if (this.hintTypes.has("boundary")) {
      const countryBoundaryOption = new Option(
        localization[model.worldCountries.language]["Outline"],
        "boundary",
      );
      userHintTypeSelect.add(countryBoundaryOption);
    }
    const hasCapital = selectedCountryCodes.filter((countryCode) => {
      return (
        this.opponentPlayer.countries[countryCode].countryCapital !== undefined
      );
    });
    if (hasCapital.length > 0 && this.hintTypes.has("capital")) {
      const countryCapitalOption = new Option(
        localization[model.worldCountries.language]["Capital"],
        "capital",
      );
      userHintTypeSelect.add(countryCapitalOption);
    }
    const hasSubregion = selectedCountryCodes.filter((countryCode) => {
      return (
        this.opponentPlayer.countries[countryCode].countrySubregion !==
        undefined
      );
    });
    if (hasSubregion.length > 0 && this.hintTypes.has("subregion")) {
      const countrySubregionOption = new Option(
        localization[model.worldCountries.language]["Subregion"],
        "subregion",
      );
      userHintTypeSelect.add(countrySubregionOption);
    }
    const hasCoatOfArms = selectedCountryCodes.filter((countryCode) => {
      return (
        this.opponentPlayer.countries[countryCode].countryCoatOfArms !==
        undefined
      );
    });
    if (hasCoatOfArms.length > 0 && this.hintTypes.has("emblem")) {
      const countryCoatOfArmsOption = new Option(
        localization[model.worldCountries.language]["CoatOfArms"],
        "emblem",
      );
      userHintTypeSelect.add(countryCoatOfArmsOption);
    }
    const hasCountryPhoto = selectedCountryCodes.filter((countryCode) => {
      return (
        this.opponentPlayer.countries[countryCode]
          .countryWikiLandscapeCategoryName !== undefined
      );
    });
    if (hasCountryPhoto.length > 0 && this.hintTypes.has("photo")) {
      const countryPhotoOption = new Option(
        localization[model.worldCountries.language]["CountryPhoto"],
        "photo",
      );
      userHintTypeSelect.add(countryPhotoOption);
    }
    userHintPlayButton.addEventListener(
      "click",
      async function () {
        const spinner = document.getElementById("playLoaderSpinner");
        spinner.style.display = "inline-block";
        userHintPlayButtonEmoji.classList.add("not-displayed");
        const selectedHintType = userHintTypeSelect.value;
        let randomCountryIndex = getRandomInt(
          0,
          selectedCountryCodes.length - 1,
        );
        let countryCode = selectedCountryCodes[randomCountryIndex];
        const country = this.opponentPlayer.countries[countryCode];
        if (selectedHintType === "country") {
          this.hints[countryCode] = { Country: country.countryName };
        } else if (selectedHintType === "flag") {
          this.hints[countryCode] = { Flag: country.countryFlag };
        } else if (selectedHintType === "region") {
          this.hints[countryCode] = { Region: country.countryRegion };
        } else if (selectedHintType === "boundary") {
          this.hints[countryCode] = { Outline: country.countryName };
        } else if (selectedHintType === "capital") {
          const randomCountryCapitalIndex = getRandomInt(
            0,
            hasCapital.length - 1,
          );
          const countryCapitalCode = hasCapital[randomCountryCapitalIndex];
          const countryCapital =
            this.opponentPlayer.countries[countryCapitalCode];
          this.hints[countryCapitalCode] = {
            Capital: countryCapital.countryCapital,
          };
        } else if (selectedHintType === "subregion") {
          const randomCountrySubregionIndex = getRandomInt(
            0,
            hasSubregion.length - 1,
          );
          const countrySubregionCode =
            hasSubregion[randomCountrySubregionIndex];
          const countrySubregion =
            this.opponentPlayer.countries[countrySubregionCode];
          this.hints[countrySubregionCode] = {
            Subregion: countrySubregion.countrySubregion,
          };
        } else if (selectedHintType === "emblem") {
          const randomCountryCoatOfArmsIndex = getRandomInt(
            0,
            hasCoatOfArms.length - 1,
          );
          const countryCoatOfArmsCode =
            hasCoatOfArms[randomCountryCoatOfArmsIndex];
          const countryCoatOfArms =
            this.opponentPlayer.countries[countryCoatOfArmsCode];
          this.hints[countryCoatOfArmsCode] = {
            CoatOfArms: countryCoatOfArms.countryCoatOfArms,
          };
        } else if (selectedHintType === "photo") {
          const randomCountryPhotoIndex = getRandomInt(
            0,
            hasCountryPhoto.length - 1,
          );
          const countryPhotoCode = hasCountryPhoto[randomCountryPhotoIndex];
          const countryPhoto = this.opponentPlayer.countries[countryPhotoCode];
          const countryPhotoUrl = await getCountryPhotoUnsplash(countryPhoto);
          if (window.gtag)
            gtag(
              "event",
              `game_request_photo_hint_${countryPhoto.countryName}`,
            );
          if (countryPhotoUrl === null) {
            this.hints[countryPhotoCode] = { Flag: countryPhoto.countryFlag };
          } else {
            this.hints[countryPhotoCode] = { CountryPhoto: countryPhotoUrl };
            this.preloadImage(countryPhotoUrl);
          }
        }
        this.hintTypes.delete(selectedHintType);
        this.addHintsToHintPanel();
        hideModalWindow("gameUserHintSelectionModal");
        spinner.style.display = "none";
        userHintPlayButtonEmoji.classList.remove("not-displayed");
        this.setHitTimeout();
        const hintButton = document.getElementById("hints-link");
        if (
          hintButton &&
          Object.keys(this.hints).length > 0 &&
          this.openAutoHint
        ) {
          hintButton.click();
          this.openAutoHint = false;
        }
      }.bind(this),
      { once: true },
    );
    showModalWindow("gameUserHintSelectionModal");
  }

  async addHint(trapCountryCode, addCountryImage, hintType) {
    const selectedCountryCodes = [];
    let notGuessedCountries = this.opponentPlayer.countryUnions
      .filter((countryUnion) =>
        countryUnion.every((item) => !Object.values(item)[0].guessed),
      )
      .flatMap((countryUnion) =>
        countryUnion.map((item) => Object.keys(item)[0]),
      )
      .filter((countryCode) => !(countryCode in this.hints));
    if (notGuessedCountries.length !== 0) {
      selectedCountryCodes.push(...notGuessedCountries);
    } else {
      notGuessedCountries = this.opponentPlayer.countryUnions
        .filter((countryUnion) =>
          countryUnion.some((item) => !Object.values(item)[0].guessed),
        )
        .flatMap((countryUnion) =>
          countryUnion
            .filter((item) => !Object.values(item)[0].guessed)
            .map((item) => Object.keys(item)[0]),
        )
        .filter((countryCode) => !(countryCode in this.hints));
      selectedCountryCodes.push(...notGuessedCountries);
    }
    if (selectedCountryCodes.length === 0) return;
    let randomCountryIndex = getRandomInt(0, selectedCountryCodes.length - 1);
    let countryCode = selectedCountryCodes[randomCountryIndex];
    const country = this.opponentPlayer.countries[countryCode];
    if (hintType === "capital") {
      const hasCapital = selectedCountryCodes.some((countryCode) => {
        return (
          this.opponentPlayer.countries[countryCode].countryCapital !==
          undefined
        );
      });
      const countryCapital = country.countryCapital;
      while (!countryCapital && hasCapital) {
        this.addHint(trapCountryCode, addCountryImage, hintType);
      }
      if (countryCapital) {
        this.hints[countryCode] = { Capital: countryCapital };
      } else {
        this.hints[countryCode] = { Country: country.countryName };
      }
    } else if (hintType === "country") {
      this.hints[countryCode] = { Country: country.countryName };
    } else if (hintType === "boundary") {
      this.hints[countryCode] = { Outline: country.countryName };
    } else if (hintType === "flag") {
      this.hints[countryCode] = { Flag: country.countryFlag };
    } else if (hintType === "region") {
      this.hints[countryCode] = { Region: country.countryRegion };
    } else if (hintType === "photo") {
      if (this.playerType !== "computerPlayer") {
        const countryPhotoUrl = await getCountryPhotoUnsplash(country);
        if (window.gtag)
          gtag("event", `game_request_photo_hint_${country.countryName}`);
        if (countryPhotoUrl) {
          this.hints[countryCode] = { CountryPhoto: countryPhotoUrl };
          this.preloadImage(countryPhotoUrl);
        } else {
          this.hints[countryCode] = { Flag: country.countryFlag };
        }
      } else {
        this.hints[countryCode] = { Flag: country.countryFlag };
      }
    } else if (hintType === "subregion") {
      const hasSubregion = selectedCountryCodes.some((countryCode) => {
        return (
          this.opponentPlayer.countries[countryCode].countrySubregion !==
          undefined
        );
      });
      const countrySubregion = country.countrySubregion;
      while (!countrySubregion && hasSubregion) {
        this.addHint(trapCountryCode, addCountryImage, hintType);
      }
      if (countrySubregion) {
        this.hints[countryCode] = { Subregion: countrySubregion };
      } else {
        this.hints[countryCode] = { Region: country.countryRegion };
      }
    } else {
      const hasCoatOfArms = selectedCountryCodes.some((countryCode) => {
        return (
          this.opponentPlayer.countries[countryCode].countryCoatOfArms !==
          undefined
        );
      });
      const countryCoatOfArms = country.countryCoatOfArms;
      while (!countryCoatOfArms && hasCoatOfArms) {
        this.addHint(trapCountryCode, addCountryImage, hintType);
      }
      if (countryCoatOfArms) {
        this.hints[countryCode] = { CoatOfArms: countryCoatOfArms };
      } else {
        this.hints[countryCode] = { Flag: country.countryFlag };
      }
    }
    this.addSelectedCountryToCountryPanel(
      this.playerSelectedCountriesContainerId,
      trapCountryCode,
      Array.from(this.selectedCountryTrapCodes).indexOf(trapCountryCode) + 21,
      addCountryImage,
    );
  }

  isHintUsed(countryCode) {
    if (countryCode in this.hints) {
      delete this.hints[countryCode];
      return true;
    }
    const country = this.countries[countryCode];
    for (const [hintCountryCode, hintObject] of Object.entries(this.hints)) {
      const hintValue = Object.values(hintObject)[0];
      if (
        country.countryRegion === hintValue ||
        country.countrySubregion === hintValue
      ) {
        delete this.hints[hintCountryCode];
        return true;
      }
    }
    return false;
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

  openCountryPopup(countryPopup) {
    if (countryPopup) {
      countryPopup.openOn(this.playerMap);
    }
  }

  closeCountryPopup(countryPopup) {
    if (countryPopup) {
      countryPopup.close();
      this.playerMap.removeLayer(countryPopup);
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
        `<td style="border: none;">
                  <img
                    src="${country.countryFlag}"
                    width="15px"
                    height="10px"
                    style="
                    border-radius: 2px;
                      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.5),
                        0 2px 2px 0 rgba(0, 0, 0, 0.12) inset;
                    "
                    alt="Country Flag"
                  />
                </td>`,
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
    const hintBtn = document.getElementById("hints-link");
    const hintsLength = Object.keys(this.hints).length;
    if (hintsLength === 0) {
      if (hintBtn) hintBtn.remove();
      if (hintsPanel) hintsPanel.classList.add("not-displayed");
      return;
    }
    const hintsNumber = hintBtn ? +hintBtn.dataset.hints : 0;
    if (hintsNumber && hintsNumber === hintsLength) {
      hintBtn.classList.remove("not-displayed");
      return;
    }
    if (hintBtn) hintBtn.remove();
    if (hintsPanel) hintsPanel.classList.add("not-displayed");
    let hintType;
    const hintsPanelContent = document.getElementById("hints-panel-content");
    hintsPanelContent.innerHTML = "";
    Object.keys(this.hints).forEach((countryCode) => {
      const hintObject = this.hints[countryCode];
      const hintHeader = Object.keys(hintObject)[0];
      hintType = hintHeader;
      const hintValue = Object.values(hintObject)[0];
      if (hintHeader === "CoatOfArms") {
        const coatOfArmsImage = document.getElementById("country-coat-of-arms");
        const coatOfArmsWindowHeader = document.getElementById(
          "coatOfArmsModalLabel",
        );
        coatOfArmsWindowHeader.textContent =
          localization[model.worldCountries.language]["Coat Of Arms"];
        const coatOfArmsCloseButton = document.getElementById(
          "coatOfArmsModalCloseButton",
        );
        coatOfArmsCloseButton.textContent =
          localization[model.worldCountries.language]["Close"];
        if (coatOfArmsImage) coatOfArmsImage.src = hintValue;
        const linkContainer = document.createElement("div");
        const coatOfArmsLink = document.createElement("button");
        coatOfArmsLink.id = "coat-of-arms-link";
        coatOfArmsLink.classList.add("btn", "btn-info", "btn-sm");
        coatOfArmsLink.style.fontSize = "0.65rem";
        coatOfArmsLink.style.width = "100%";
        coatOfArmsLink.style.marginBottom = "3px";
        coatOfArmsLink.style.border = "1px dotted grey";
        coatOfArmsLink.textContent =
          localization[model.worldCountries.language][hintHeader];
        coatOfArmsLink.addEventListener(
          "click",
          function () {
            showCountryCoatOfArmsFlagWindow(
              "coatOfArmsModal",
              this.gameConfiguration.hitTime !== 0 ? true : false,
            );
          }.bind(this),
        );
        linkContainer.appendChild(coatOfArmsLink);
        hintsPanelContent.insertAdjacentElement("afterbegin", linkContainer);
      } else if (hintHeader === "Flag") {
        const flagImage = document.getElementById("country-flag");
        const flagWindowHeader = document.getElementById("flagModalLabel");
        flagWindowHeader.textContent =
          localization[model.worldCountries.language]["Country Flag"];
        const flagCloseButton = document.getElementById("flagModalCloseButton");
        flagCloseButton.textContent =
          localization[model.worldCountries.language]["Close"];
        if (flagImage) {
          flagImage.src = hintValue;
          flagImage.style.boxShadow =
            "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
          flagImage.style.borderRadius = "5px";
        }
        const linkContainer = document.createElement("div");
        const flagLink = document.createElement("button");
        flagLink.id = "flag-link";
        flagLink.classList.add("btn", "btn-warning", "btn-sm");
        flagLink.style.fontSize = "0.65rem";
        flagLink.style.width = "100%";
        flagLink.style.marginBottom = "3px";
        flagLink.style.border = "1px dotted grey";
        flagLink.textContent =
          localization[model.worldCountries.language][hintHeader];
        flagLink.addEventListener(
          "click",
          function () {
            showCountryCoatOfArmsFlagWindow(
              "flagModal",
              this.gameConfiguration.hitTime !== 0 ? true : false,
            );
          }.bind(this),
        );
        linkContainer.appendChild(flagLink);
        hintsPanelContent.insertAdjacentElement("afterbegin", linkContainer);
      } else if (hintHeader === "Outline") {
        const countryOutlineWindowHeader = document.getElementById(
          "countryOutlineLabel",
        );
        countryOutlineWindowHeader.textContent =
          localization[model.worldCountries.language][
            "Country's Outline On Map"
          ];
        const countryOutlineCloseButton = document.getElementById(
          "countryOutlineCloseButton",
        );
        countryOutlineCloseButton.textContent =
          localization[model.worldCountries.language]["Close"];

        const linkContainer = document.createElement("div");
        const countryOutlineLink = document.createElement("button");
        countryOutlineLink.id = "country-outline-link";
        countryOutlineLink.classList.add("btn", "btn-success", "btn-sm");
        countryOutlineLink.style.fontSize = "0.65rem";
        countryOutlineLink.style.width = "100%";
        countryOutlineLink.style.marginBottom = "3px";
        countryOutlineLink.style.border = "1px dotted grey";
        countryOutlineLink.textContent =
          localization[model.worldCountries.language][hintHeader];
        const outlineModal = document.getElementById("countryOutlineModal");
        if (this.outlineMapHandler) {
          outlineModal.removeEventListener(
            "shown.bs.modal",
            this.outlineMapHandler,
          );
        }
        this.outlineMapHandler = this.createOutlineMap.bind(
          this,
          hintValue,
          countryCode,
        );
        outlineModal.addEventListener(
          "shown.bs.modal",
          this.outlineMapHandler,
          { once: true },
        );
        countryOutlineLink.addEventListener(
          "click",
          function () {
            showCountryCoatOfArmsFlagWindow(
              "countryOutlineModal",
              this.gameConfiguration.hitTime !== 0 ? true : false,
            );
          }.bind(this),
        );
        linkContainer.appendChild(countryOutlineLink);
        hintsPanelContent.insertAdjacentElement("afterbegin", linkContainer);
      } else if (hintHeader === "CountryPhoto") {
        const countryPhoto = document.getElementById("country-photo");
        const fullScreenButton = document.getElementById(
          "countryPhotoFullScreenButton",
        );
        const countryPhotoWindowHeader =
          document.getElementById("countryPhotoLabel");
        countryPhotoWindowHeader.textContent =
          localization[model.worldCountries.language]["Photo From Country"];
        const countryPhotoCloseButton = document.getElementById(
          "countryPhotoCloseButton",
        );
        countryPhotoCloseButton.textContent =
          localization[model.worldCountries.language]["Close"];
        fullScreenButton.textContent =
          localization[model.worldCountries.language]["Full Screen"];
        if (countryPhoto) {
          countryPhoto.title =
            localization[model.worldCountries.language][
              "Click to toggle full screen"
            ];
          countryPhoto.src = hintValue;
          countryPhoto.style.width = "100%";
          countryPhoto.style.boxShadow =
            "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
          countryPhoto.style.borderRadius = "5px";
        }
        const linkContainer = document.createElement("div");
        const countryPhotoLink = document.createElement("button");
        countryPhotoLink.id = "country-photo-link";
        countryPhotoLink.classList.add("btn", "btn-secondary", "btn-sm");
        countryPhotoLink.style.fontSize = "0.65rem";
        countryPhotoLink.style.width = "100%";
        countryPhotoLink.style.marginBottom = "3px";
        countryPhotoLink.style.border = "1px dotted grey";
        countryPhotoLink.textContent =
          localization[model.worldCountries.language][hintHeader];
        countryPhoto.addEventListener(
          "click",
          function () {
            this.playMap.exitFullScreen().then(() => {
              this.toggleCountryPhotoFullScreen("country-photo-container");
            });
          }.bind(this),
        );
        fullScreenButton.addEventListener(
          "click",
          function () {
            this.playMap.exitFullScreen().then(() => {
              this.toggleCountryPhotoFullScreen("country-photo-container");
            });
          }.bind(this),
        );
        countryPhotoLink.addEventListener(
          "click",
          function () {
            showCountryCoatOfArmsFlagWindow(
              "countryPhotoModal",
              this.gameConfiguration.hitTime !== 0 ? true : false,
            );
          }.bind(this),
        );
        linkContainer.appendChild(countryPhotoLink);
        hintsPanelContent.insertAdjacentElement("afterbegin", linkContainer);
      } else {
        let hint = "";
        if (hintHeader === "Capital") {
          hint =
            localization[model.worldCountries.language]["capitals"][hintValue];
        } else if (hintHeader === "Country") {
          hint =
            localization[model.worldCountries.language]["countries"][hintValue];
        } else {
          hint = localization[model.worldCountries.language][hintValue];
        }
        const hintHtml = `<div style="font-size:0.7rem;"><span style="font-weight:bold;">${
          localization[model.worldCountries.language][hintHeader]
        }:</span>&nbsp;${hint}</div>`;
        hintsPanelContent.insertAdjacentHTML("beforeend", hintHtml);
      }
    });
    const hideHintsPanelContainer = document.createElement("div");
    const hideHintsPanelButton = document.createElement("button");
    hideHintsPanelButton.classList.add("btn", "btn-sm", "btn-primary");
    hideHintsPanelContainer.style.borderTop = "1px dashed black";
    hideHintsPanelButton.id = "hints-hide-button";
    hideHintsPanelButton.style.textAlign = "center";
    hideHintsPanelButton.style.fontSize = "0.65rem";
    hideHintsPanelButton.style.width = "100%";
    hideHintsPanelButton.style.marginTop = "2px";
    hideHintsPanelButton.style.border = "1px dotted grey";
    hideHintsPanelButton.style.cursor = "pointer";
    hideHintsPanelButton.style.fontWeight = "bold";
    hideHintsPanelButton.textContent =
      localization[model.worldCountries.language]["Hide"];
    hideHintsPanelContainer.appendChild(hideHintsPanelButton);
    hideHintsPanelButton.addEventListener(
      "click",
      function () {
        hideHintsPanelButton.remove();
        hideHintsPanelContainer.remove();
        this.addHintsToHintPanel();
      }.bind(this),
      { once: true },
    );
    hintsPanelContent.insertAdjacentElement(
      "beforeend",
      hideHintsPanelContainer,
    );
    L.Control.HintsButton = L.Control.extend({
      context: this,
      onAdd: function (map) {
        const hintsButton = L.DomUtil.create("button");
        hintsButton.classList.add("btn", "btn-sm");
        hintsButton.id = "hints-link";
        hintsButton.style.opacity = "0.8";
        hintsButton.style.fontSize = "0.65rem";
        hintsButton.style.marginTop = "10px";
        hintsButton.style.padding = "0.25rem";
        hintsButton.style.maxWidth = "220px";
        hintsButton.style.boxShadow =
          "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
        hintsButton.dataset.hints = `${hintsLength}`;
        if (hintsLength === 1) {
          if (hintType && hintType === "CoatOfArms") {
            hintsButton.classList.add("btn-info");
          } else if (hintType && hintType === "Flag") {
            hintsButton.classList.add("btn-warning");
          } else if (hintType && hintType === "Outline") {
            hintsButton.classList.add("btn-success");
          } else if (hintType && hintType === "CountryPhoto") {
            hintsButton.classList.add("btn-secondary");
          } else {
            hintsButton.classList.add("btn-primary");
          }
          hintsButton.textContent =
            localization[model.worldCountries.language]["View Hint"];
        } else {
          hintsButton.classList.add("btn-primary");
          hintsButton.textContent =
            localization[model.worldCountries.language]["View Hints"];
        }
        hintsButton.addEventListener(
          "click",
          function viewHint() {
            if (hintType && hintsLength === 1) {
              if (hintType === "CoatOfArms") {
                showCountryCoatOfArmsFlagWindow(
                  "coatOfArmsModal",
                  this.gameConfiguration.hitTime !== 0 ? true : false,
                );
              } else if (hintType === "Flag") {
                showCountryCoatOfArmsFlagWindow(
                  "flagModal",
                  this.gameConfiguration.hitTime !== 0 ? true : false,
                );
              } else if (hintType === "Outline") {
                showCountryCoatOfArmsFlagWindow(
                  "countryOutlineModal",
                  this.gameConfiguration.hitTime !== 0 ? true : false,
                );
              } else if (hintType === "CountryPhoto") {
                showCountryCoatOfArmsFlagWindow(
                  "countryPhotoModal",
                  this.gameConfiguration.hitTime !== 0 ? true : false,
                );
              } else {
                if (button) button.remove();
                hintsPanel.classList.remove("not-displayed");
                return;
              }
              hintsButton.addEventListener("click", viewHint.bind(this), {
                once: true,
              });
            } else {
              if (button) button.remove();
              hintsPanel.classList.remove("not-displayed");
            }
          }.bind(this.context),
          { once: true },
        );
        return hintsButton;
      },
      onRemove: function () {},
    });
    L.control.hintsbutton = function (opts) {
      return new L.Control.HintsButton(opts);
    };
    const button = L.control
      .hintsbutton({ position: "topcenter" })
      .addTo(this.playerMap);
  }

  toggleCountryPhotoFullScreen(elementId) {
    const countryPhotoContainer = document.getElementById(elementId);
    const fullscreenElement =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement;
    if (fullscreenElement !== countryPhotoContainer) {
      if (countryPhotoContainer.requestFullscreen) {
        countryPhotoContainer.requestFullscreen();
      } else if (countryPhotoContainer.mozRequestFullScreen) {
        countryPhotoContainer.mozRequestFullScreen();
      } else if (countryPhotoContainer.webkitRequestFullscreen) {
        countryPhotoContainer.webkitRequestFullscreen();
      } else if (countryPhotoContainer.msRequestFullscreen) {
        countryPhotoContainer.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  createOutlineMap(hintValue, countryCode) {
    const countryBound = COUNTRY_BOUNDS.find(
      (bound) => hintValue === bound.name,
    );
    const country = this.countries[countryCode];
    document.getElementById("countryOutlineMap").innerHTML = `<div
        id="outlineMap"
        style="
         background-color: #99d9f2;
          width: 300px;
          height: 225px;
          position: relative;
          border-radius: 5px;
          box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 5px, rgba(0, 0, 0, 0.12) 0px 2px 10px inset;
          border: 1px solid black;
        "
      ></div>`;
    const map = L.map("outlineMap", {
      attributionControl: false,
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      touchZoom: false,
      keyboard: false,
      dragging: false,
    });
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}",
    ).addTo(map);
    const countryGeo = getCountryGeo(countryCode);
    L.geoJson(countryGeo, {
      style: {
        weight: 2,
        fillOpacity: 0.4,
        color: "#3388ff",
        fillColor: "#3388ff",
        opacity: 1,
      },
    }).addTo(map);
    if (countryBound) {
      map.fitBounds(countryBound.bounds, {
        animate: false,
      });
    } else {
      map.setView(
        country.latlng ? country.latlng : country.capitalLatLng,
        4.5,
        { animate: false },
      );
    }
    map.invalidateSize();
    const outlineModal = document.getElementById("countryOutlineModal");
    outlineModal.addEventListener(
      "hidden.bs.modal",
      () => {
        map.remove();
      },
      { once: true },
    );
    this.outlineMapHandler = this.createOutlineMap.bind(
      this,
      hintValue,
      countryCode,
    );
    outlineModal.addEventListener("shown.bs.modal", this.outlineMapHandler, {
      once: true,
    });
  }

  isCountriesContainHint(hint) {
    return this.countryCodes.some((countryCode) => {
      const country = this.countries[countryCode];
      return (
        country.countryCapital === hint ||
        country.countryRegion === hint ||
        country.countrySubregion === hint ||
        country.countryCoatOfArms === hint ||
        country.countryFlag === hint ||
        country.countryName === hint
      );
    });
  }

  selectComputerRandomCountryByHint(hint) {
    const countries = Object.values(this.countries).filter((country) => {
      return (
        (country.countryCapital === hint ||
          country.countryRegion === hint ||
          country.countrySubregion === hint ||
          country.countryCoatOfArms === hint ||
          country.countryFlag === hint ||
          country.countryName === hint) &&
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
    document.getElementById("playMap").style.cursor = "grab";
    const countryBoundaries = document.querySelector(".leaflet-overlay-pane");
    countryBoundaries.style.pointerEvents = "auto";
    countryBoundaries.removeAttribute("inert");
    const markers = document.querySelector(".leaflet-marker-pane");
    markers.style.pointerEvents = "auto";
    markers.removeAttribute("inert");
    if (this.playerMap) {
      this.playerMap.dragging.enable();
      this.playerMap.doubleClickZoom.enable();
      this.playerMap.scrollWheelZoom.enable();
      this.playerMap.boxZoom.enable();
      this.playerMap.keyboard.enable();
      if (this.playerMap.tap) this.playerMap.tap.enable();
    }
  }

  disableMapInteraction() {
    document.getElementById("playMap").style.cursor = "default";
    const countryBoundaries = document.querySelector(".leaflet-overlay-pane");
    countryBoundaries.style.pointerEvents = "none";
    countryBoundaries.setAttribute("inert", "");
    const markers = document.querySelector(".leaflet-marker-pane");
    markers.style.pointerEvents = "none";
    markers.setAttribute("inert", "");
    if (this.playerMap) {
      this.playerMap.dragging.disable();
      this.playerMap.doubleClickZoom.disable();
      this.playerMap.scrollWheelZoom.disable();
      this.playerMap.boxZoom.disable();
      this.playerMap.keyboard.disable();
      if (this.playerMap.tap) this.playerMap.tap.disable();
    }
  }

  deleteCountryNeighbourBorders(
    player,
    country,
    selectedCodes,
    countriesNumberField = undefined,
  ) {
    const countryBorderCodes = country.countryBorders
      .map((countryBorder) => {
        return player.countriesCodeMapping[countryBorder];
      })
      .filter(
        (countryCode) =>
          countryCode !== undefined &&
          player.countryCodes.includes(countryCode),
      );
    countryBorderCodes.forEach((countryBorderCode) => {
      if (!selectedCodes.has(countryBorderCode)) {
        const countryBoundary =
          player.playMap.countryBoundariesAndMarkersLayer.boundaries[
            countryBorderCode
          ];
        const countryMarker =
          player.playMap.countryBoundariesAndMarkersLayer.markers[
            countryBorderCode
          ];
        player.countryBoundariesStyles[countryBorderCode] = {
          weight: 0,
          fillOpacity: 0,
          className: countryBorderCode,
          opacity: 0,
        };
        countryBoundary.setStyle(
          player.countryBoundariesStyles[countryBorderCode],
        );
        if (player.playerType !== "userPlayer") {
          countryBoundary.off();
          countryBoundary.unbindTooltip();
          countryMarker.off();
          countryMarker.unbindTooltip();
          const countryBoundaryElements = document.getElementsByClassName(
            `${countryBorderCode}`,
          );
          if (countryBoundaryElements) {
            const countryBoundaryElement = countryBoundaryElements[0];
            countryBoundaryElement.style.pointerEvents = "none";
          }
        }
        player.countryMarkersStyles[countryBorderCode] = {
          opacity: 0,
        };
        countryMarker.setOpacity(0);
        const countryIndexToDelete =
          player.countryCodes.indexOf(countryBorderCode);
        if (countryIndexToDelete >= 0)
          player.countryCodes.splice(countryIndexToDelete, 1);
        if (countriesNumberField)
          countriesNumberField.textContent = player.countryCodes.length;
      }
    });
  }

  async playerHit(addCountryBoundariesAndMarkers = true) {
    this.disableMapInteraction();
    if (addCountryBoundariesAndMarkers)
      this.opponentPlayer.addAllCountryBoundariesAndMarkers();
    if (
      this.playerType === "userPlayer" &&
      this.gameConfiguration.hintsType !== "No Hints"
    )
      this.addHintsToHintPanel();
    if (this.playerType === "computerPlayer") {
      let countryIndex = undefined;
      let countryCode = undefined;
      try {
        hideModalWindow("flagModal");
        hideModalWindow("coatOfArmsModal");
        hideModalWindow("countryOutlineModal");
        hideModalWindow("countryPhotoModal");
        document.getElementById("timer-field-container").style.display = "none";
        this.playMap.hideMapElement("hints-link");
        this.playMap.hideMapElement("hints-panel");
        this.playMap.hideMapElement("available-countries-panel");
        this.playMap.setMapFiledLabel("Your Map");
        this.opponentPlayer.openUserHintSelectionWindow = false;
        this.countriesNumberField.textContent =
          this.opponentPlayer.countryCodes.length;
        this.gameMessageField.textContent = `ℹ️ ${
          localization[model.worldCountries.language][
            "Computer is guessing your country..."
          ]
        }`;
        await this.sleep(700);
        if (this.countriesToGuess.length !== 0) {
          countryIndex = getRandomInt(0, this.countriesToGuess.length - 1);
          countryCode = this.countriesToGuess[countryIndex];
          this.countriesToGuess.splice(countryIndex, 1);
          const countryToDeleteIndex =
            this.opponentPlayer.countryCodes.indexOf(countryCode);
          if (countryToDeleteIndex >= 0)
            this.opponentPlayer.countryCodes.splice(countryToDeleteIndex, 1);
          this.opponentPlayer.alreadyGuessedCountryCodes.push(countryCode);
        } else if (this.countriesToGuessNext.length !== 0) {
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
            countryIndex =
              this.opponentPlayer.countryCodes.indexOf(countryCode);
            this.opponentPlayer.countryCodes.splice(countryIndex, 1);
          } else {
            this.removeHint(countryCode);
            this.usedHintsCount = this.usedHintsCount + 1;
            countryIndex = getRandomInt(
              0,
              this.opponentPlayer.countryCodes.length - 1,
            );
            countryCode = this.opponentPlayer.countryCodes[countryIndex];
            this.opponentPlayer.alreadyGuessedCountryCodes.push(countryCode);
            this.opponentPlayer.countryCodes.splice(countryIndex, 1);
          }
        } else {
          countryIndex = getRandomInt(
            0,
            this.opponentPlayer.countryCodes.length - 1,
          );
          countryCode = this.opponentPlayer.countryCodes[countryIndex];
          this.opponentPlayer.alreadyGuessedCountryCodes.push(countryCode);
          this.opponentPlayer.countryCodes.splice(countryIndex, 1);
        }
        this.countriesNumberField.textContent =
          this.opponentPlayer.countryCodes.length;
        const country = this.countries[countryCode];
        const countryBoundary =
          this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryCode];
        const countryMarker =
          this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
        const countryPopup = countryMarker.getPopup();
        this.opponentPlayer.countryMarkersStyles[countryCode] = {
          opacity: 0,
        };
        countryMarker.setOpacity(0);
        const countryBound = COUNTRY_BOUNDS.find(
          (bound) => country.countryName === bound.name,
        );
        this.opponentPlayer.openCountryPopup(countryPopup);
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
          try {
            this.setCountryPopupContent(countryPopup, country, "💣");
            addCountryBoundariesAndMarkers = true;
            this.setMessageInnerHtmlField(
              `<span>⚠️ ${
                localization[model.worldCountries.language][
                  "Computer has fallen into a trap-country"
                ]
              }</span> <img src="${
                country.countryFlag
              }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;">${
                localization[model.worldCountries.language]["countries"][
                  country.countryName
                ]
              }.</span> ${this.gameConfiguration.hintsType !== "No Hints" ? `<span style="margin-left:5px;">${localization[model.worldCountries.language]["The opponent gets a hint"]}</span>` : ""}`,
            );
            if (this.gameConfiguration.hintsType === "Choose Hints") {
              this.opponentPlayer.openUserHintSelectionWindow = true;
              this.opponentPlayer.trapCountryHittedCode = countryCode;
            }
            this.opponentPlayer.trapCountryHitted =
              this.opponentPlayer.trapCountryHitted + 1;
            if (this.opponentPlayer.trapCountryHitted === 1) {
              this.score = this.score - 10;
            } else if (this.opponentPlayer.trapCountryHitted === 2) {
              this.score = this.score - 20;
            } else if (this.opponentPlayer.trapCountryHitted === 3) {
              this.score = this.score - 30;
            } else {
              this.score = this.score - 50;
            }
            const scoreElement = document.getElementById(
              "player-two-score-field",
            );
            scoreElement.textContent = `🏅 ${this.score}`;
            if (this.score < 0) {
              scoreElement.style.color = "red";
            } else {
              scoreElement.style.color = "green";
            }
            this.opponentPlayer.openAutoHint = true;
            if (
              this.gameConfiguration.hintsType !== "No Hints" &&
              this.gameConfiguration.hintsType !== "Choose Hints"
            ) {
              const hintType = this.opponentPlayer.getRandomHintType();
              this.opponentPlayer.addHint(countryCode, false, hintType);
            } else {
              this.opponentPlayer.addSelectedCountryToCountryPanel(
                this.opponentPlayer.playerSelectedCountriesContainerId,
                countryCode,
                Array.from(
                  this.opponentPlayer.selectedCountryTrapCodes,
                ).indexOf(countryCode) + 21,
                false,
              );
            }
            this.opponentPlayer.addCountryBoundaryBlinking(countryCode);
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
            await this.sleep(2500);
            this.opponentPlayer.removeCountryBoundaryBlinking(countryCode);
            this.opponentPlayer.closeCountryPopup(countryPopup);
            this.opponentPlayer.countryBoundariesStyles[countryCode] = {
              weight: 0,
              color: "orange",
              fillColor: "orange",
              fillOpacity: 0,
              opacity: 0,
              className: countryCode,
            };
            this.deleteCountryNeighbourBorders(
              this.opponentPlayer,
              country,
              this.opponentPlayer.selectedCountryTrapCodes,
              this.countriesNumberField,
            );
            this.opponentPlayer.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
              animate: false,
            });
          } catch (err) {
            if (countryCode) {
              this.opponentPlayer.removeCountryBoundaryBlinking(countryCode);
              this.opponentPlayer.closeCountryPopup(countryPopup);
              this.opponentPlayer.countryBoundariesStyles[countryCode] = {
                weight: 0,
                color: "orange",
                fillColor: "orange",
                fillOpacity: 0,
                opacity: 0,
                className: countryCode,
              };
              this.deleteCountryNeighbourBorders(
                this.opponentPlayer,
                country,
                this.opponentPlayer.selectedCountryTrapCodes,
                this.countriesNumberField,
              );
            }
            this.playerAttemptToGuess = false;
            this.opponentPlayer.playerAttemptToGuess = true;
            this.opponentPlayer.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
              animate: false,
            });
          }
        } else if (
          this.game &&
          this.game.bonusCountries.includes(countryCode)
        ) {
          try {
            this.setCountryPopupContent(countryPopup, country, "🎁");
            const indexToRemove = this.game.bonusCountries.indexOf(countryCode);
            if (indexToRemove > -1) {
              this.game.bonusCountries.splice(indexToRemove, 1);
            }
            this.bonusCountriesNumberField.textContent =
              this.game.bonusCountries.length;
            addCountryBoundariesAndMarkers = false;
            this.playerAttemptToGuess = true;
            this.opponentPlayer.playerAttemptToGuess = false;
            const countryBoundaryComputer =
              this.playMap.countryBoundariesAndMarkersLayer.boundaries[
                countryCode
              ];
            const countryMarker =
              this.playMap.countryBoundariesAndMarkersLayer.markers[
                countryCode
              ];
            const countryToDeleteIndex = this.countryCodes.indexOf(countryCode);
            if (countryToDeleteIndex >= 0)
              this.countryCodes.splice(countryToDeleteIndex, 1);
            this.alreadyGuessedCountryCodes.push(countryCode);
            if (countryMarker) {
              this.countryMarkersStyles[countryCode] = {
                opacity: 0,
              };
              countryMarker.setOpacity(0);
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
              this.countryBoundariesStyles[countryCode] = {
                weight: 1,
                color: "purple",
                fillColor: "purple",
                fillOpacity: 0.5,
                opacity: 0.8,
                className: countryCode,
              };
            }
            this.deleteCountryNeighbourBorders(
              this.opponentPlayer,
              country,
              new Set([
                ...this.opponentPlayer.selectedCountryCodes,
                ...this.opponentPlayer.selectedCountryTrapCodes,
              ]),
              this.countriesNumberField,
            );
            this.deleteCountryNeighbourBorders(
              this,
              country,
              new Set([
                ...this.selectedCountryCodes,
                ...this.selectedCountryTrapCodes,
              ]),
            );
            this.opponentPlayer.addCountryBoundaryBlinking(countryCode);
            this.opponentPlayer.setElementStyle(countryBoundary, {
              weight: 1,
              color: "purple",
              fillColor: "purple",
              fillOpacity: 0.5,
              opacity: 0.8,
              className: countryCode,
            });
            this.opponentPlayer.countryBoundariesStyles[countryCode] = {
              weight: 1,
              color: "purple",
              fillColor: "purple",
              fillOpacity: 0.5,
              opacity: 0.8,
              className: countryCode,
            };
            this.score = this.score + 10;
            const scoreElement = document.getElementById(
              "player-two-score-field",
            );
            scoreElement.textContent = `🏅 ${this.score}`;
            if (this.score < 0) {
              scoreElement.style.color = "red";
            } else {
              scoreElement.style.color = "green";
            }
            const superBonus =
              (this.game.superBonusCountry ||
                this.game.secondSuperBonusCountry) &&
              (this.game.superBonusCountry === countryCode ||
                this.game.secondSuperBonusCountry === countryCode);
            this.setMessageInnerHtmlField(
              `<span style="font-size: 0.75rem;">ℹ️ ${
                localization[model.worldCountries.language][
                  "Computer has fallen into a bonus-country"
                ]
              }</span> <img src="${
                country.countryFlag
              }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;font-size: 0.75rem;">${
                localization[model.worldCountries.language]["countries"][
                  country.countryName
                ]
              }.</span> <span style="margin-left:5px;font-size: 0.75rem;">${
                localization[model.worldCountries.language][
                  "Additional attempt to guess and"
                ]
              }</span><span style="
          font-size: 0.75rem;
                    margin-left: 3px;
                    color: white;
                    border-radius: 2px;
                    background-color: green;
                    padding-left: 2px;
                    padding-right: 2px;
                    font-weight: bolder;
                  ">+10&nbsp;${
                    localization[model.worldCountries.language]["Points"]
                  }</span>`,
            );
            if (superBonus) {
              const countryUnion = this.opponentPlayer.countryUnions.find(
                (countryUnion) =>
                  countryUnion.find(
                    (item) =>
                      !Object.values(item)[0].guessed &&
                      !this.countriesToGuess.includes(Object.keys(item)[0]),
                  ) != undefined,
              );
              if (countryUnion) {
                if (
                  this.game.superBonusCountry &&
                  this.game.superBonusCountry === countryCode
                ) {
                  countryUnion.forEach((item) => {
                    const guessed = Object.values(item)[0].guessed;
                    const countryCode = Object.keys(item)[0];
                    if (
                      !guessed &&
                      !this.countriesToGuess.includes(countryCode)
                    )
                      this.countriesToGuess.push(countryCode);
                  });
                }
                if (
                  this.game.secondSuperBonusCountry &&
                  this.game.secondSuperBonusCountry === countryCode
                ) {
                  const selectedCountryCode = Object.keys(
                    countryUnion.find(
                      (item) => !Object.values(item)[0].guessed,
                    ),
                  )[0];
                  if (!this.countriesToGuess.includes(selectedCountryCode))
                    this.countriesToGuess.push(selectedCountryCode);
                }
              }
            }
            await this.sleep(1500);
            this.opponentPlayer.removeCountryBoundaryBlinking(countryCode);
            this.opponentPlayer.closeCountryPopup(countryPopup);
            this.opponentPlayer.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
              animate: false,
            });
          } catch (err) {
            if (countryCode) {
              this.opponentPlayer.removeCountryBoundaryBlinking(countryCode);
              this.opponentPlayer.closeCountryPopup(countryPopup);
            }
            this.playerAttemptToGuess = true;
            this.opponentPlayer.playerAttemptToGuess = false;
            this.opponentPlayer.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
              animate: false,
            });
          }
        } else if (this.opponentPlayer.selectedCountryCodes.has(countryCode)) {
          try {
            this.setCountryPopupContent(countryPopup, country, "🎯");
            addCountryBoundariesAndMarkers = false;
            this.playerAttemptToGuess = true;
            this.opponentPlayer.playerAttemptToGuess = false;
            if (this.isHintUsed(countryCode)) {
              this.usedHintsCount = this.usedHintsCount + 1;
            }
            this.opponentPlayer.addCountryBoundaryBlinking(countryCode);
            this.opponentPlayer.setElementStyle(countryBoundary, {
              weight: 1,
              color: "red",
              fillColor: "red",
              fillOpacity: 0.5,
              opacity: 0.8,
              className: countryCode,
            });
            this.opponentPlayer.countryBoundariesStyles[countryCode] = {
              weight: 1,
              color: "red",
              fillColor: "red",
              fillOpacity: 0.5,
              opacity: 0.8,
              className: countryCode,
            };
            this.opponentPlayer.addSelectedCountryToCountryPanel(
              this.opponentPlayer.playerSelectedCountriesContainerId,
              countryCode,
              Array.from(this.opponentPlayer.selectedCountryCodes).indexOf(
                countryCode,
              ) + 1,
              false,
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
              const scoreElement = document.getElementById(
                "player-two-score-field",
              );
              scoreElement.textContent = `🏅 ${this.score}`;
              if (this.score < 0) {
                scoreElement.style.color = "red";
              } else {
                scoreElement.style.color = "green";
              }
              countryUnion.forEach((countryObject) => {
                const countryCode = Object.keys(countryObject)[0];
                const country = this.opponentPlayer.countries[countryCode];
                this.deleteCountryNeighbourBorders(
                  this.opponentPlayer,
                  country,
                  this.opponentPlayer.selectedCountryCodes,
                  this.countriesNumberField,
                );
              });
              const countryUnionHtml =
                this.opponentPlayer.createCountryUnionMessageHtml(
                  countryUnionIndex,
                );
              this.setMessageInnerHtmlField(
                `<span style="margin-right:5px;">⚠️ ${
                  localization[model.worldCountries.language][
                    "Computer guessed"
                  ]
                }</span><div style="display: inline-block;">${
                  countryUnionHtml.outerHTML
                }</div><span style="margin-left:5px;">${
                  countryUnion.length === 1
                    ? localization[model.worldCountries.language]["countries"][
                        country.countryName
                      ]
                    : localization[model.worldCountries.language][
                        "Country Alliance"
                      ]
                }</span>`,
              );
              await this.sleep(1500);
              this.opponentPlayer.removeCountryBoundaryBlinking(countryCode);
              this.opponentPlayer.closeCountryPopup(countryPopup);
              this.opponentPlayer.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
                animate: true,
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
                    country,
                  ) &&
                  this.opponentPlayer.countryCodes.includes(country)
                ) {
                  this.countriesToGuessNext.push(country);
                }
              });
              this.setMessageInnerHtmlField(
                `<span>ℹ️ ${
                  localization[model.worldCountries.language][
                    "Computer guessed"
                  ]
                }</span> <img src="${
                  country.countryFlag
                }" style="margin-left:3px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> ${
                  country.countryCoatOfArms
                    ? `<img src="${
                        country.countryCoatOfArms
                      }" style="margin-left:3px; width:15px; height:15px; vertical-align: sub;"></img>`
                    : ""
                }<span style="margin-left:3px;">${
                  localization[model.worldCountries.language]["countries"][
                    country.countryName
                  ]
                }</span>`,
              );
              await this.sleep(1000);
              this.opponentPlayer.removeCountryBoundaryBlinking(countryCode);
              this.opponentPlayer.closeCountryPopup(countryPopup);
            }
          } catch (err) {
            if (countryCode) {
              this.opponentPlayer.removeCountryBoundaryBlinking(countryCode);
              this.opponentPlayer.closeCountryPopup(countryPopup);
            }
            this.playerAttemptToGuess = true;
            this.opponentPlayer.playerAttemptToGuess = false;
          }
        } else {
          try {
            addCountryBoundariesAndMarkers = true;
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
            this.opponentPlayer.closeCountryPopup(countryPopup);
            this.opponentPlayer.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
              animate: false,
            });
            this.opponentPlayer.countryBoundariesStyles[countryCode] = {
              weight: 0,
              color: "grey",
              fillColor: "grey",
              fillOpacity: 0,
              opacity: 0,
              className: countryCode,
            };
            if (this.countryBoundariesStyles[countryCode].opacity === 0) {
              this.opponentPlayer.playerMap.removeLayer(countryBoundary);
              delete this.countryBoundariesAndMarkersLayer.boundaries[
                countryCode
              ];
              delete this.countryBoundariesAndMarkersLayer.markers[countryCode];
            }
          } catch (err) {
            if (countryCode) {
              this.opponentPlayer.closeCountryPopup(countryPopup);
              this.opponentPlayer.countryBoundariesStyles[countryCode] = {
                weight: 0,
                color: "grey",
                fillColor: "grey",
                fillOpacity: 0,
                opacity: 0,
                className: countryCode,
              };
            }
            this.opponentPlayer.setElementStyle(countryBoundary, {
              weight: 0,
              color: "grey",
              fillColor: "grey",
              fillOpacity: 0,
              opacity: 0,
              className: countryCode,
            });
            this.playerAttemptToGuess = false;
            this.opponentPlayer.playerAttemptToGuess = true;
            this.opponentPlayer.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
              animate: false,
            });
          }
        }

        if (+this.opponentPlayer.playerCountriesNumberField.textContent === 0) {
          this.score += +this.playerCountriesNumberField.textContent * 10;
          this.playerWonGame = true;
          this.game.finished = true;
          this.game.showGameResult(false, false);
          return;
        }
      } catch (err) {
        this.playerAttemptToGuess = false;
        this.opponentPlayer.playerAttemptToGuess = true;
        if (countryCode)
          this.opponentPlayer.removeCountryBoundaryBlinking(countryCode);
      }
    } else if (this.playerType === "userPlayer") {
      try {
        if (this.opponentPlayer.countryCodes.length <= 5) {
          this.opponentPlayer.addAvailableCountriesPanel();
        }
        this.playMap.setMapFiledLabel(
          this.gameConfiguration.gameMode === "user"
            ? "Opponent Map"
            : "Computer Map",
        );
        this.countriesNumberField.textContent =
          this.opponentPlayer.countryCodes.length;
        if (this.opponentPlayer.lastGuessedCountryNames.length !== 0) {
          const countryBounds = [];
          this.opponentPlayer.lastGuessedCountryNames.forEach((countryName) => {
            const countryBound = COUNTRY_BOUNDS.find(
              (bound) => countryName === bound.name,
            );
            if (countryBound) countryBounds.push(...countryBound.bounds);
          });
          if (countryBounds.length !== 0)
            this.opponentPlayer.playerMap.fitBounds(countryBounds, {
              animate: true,
            });
        } else if (
          this.opponentPlayer.lastGuessedCountryNames.length === 0 &&
          this.opponentPlayer.highlightCountryCodes.length !== 0
        ) {
          const countryBounds = [];
          this.opponentPlayer.highlightCountryCodes.forEach(
            (highlightCountryCode) => {
              const country =
                this.opponentPlayer.countries[highlightCountryCode];
              const countryBound = COUNTRY_BOUNDS.find(
                (bound) => country.countryName === bound.name,
              );
              if (countryBound) countryBounds.push(...countryBound.bounds);
            },
          );
          if (countryBounds.length !== 0) {
            this.playerMap.fitBounds(countryBounds, {
              animate: true,
            });
          } else {
            this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
              animate: true,
            });
          }
        }
        this.gameMessageField.textContent = `⚠️ ${
          localization[model.worldCountries.language][
            "Your attempt to guess opponent's country"
          ]
        }`;
        this.opponentPlayer.enableMapInteraction();
        if (!this.openUserHintSelectionWindow) this.setHitTimeout();
        if (
          this.gameConfiguration.hintsType === "Choose Hints" &&
          this.openUserHintSelectionWindow
        ) {
          this.addUserSelectedHint();
          this.openUserHintSelectionWindow = false;
        }
        const hintButton = document.getElementById("hints-link");
        if (
          hintButton &&
          Object.keys(this.hints).length > 0 &&
          this.openAutoHint &&
          this.gameConfiguration.hintsType !== "Choose Hints"
        ) {
          hintButton.click();
          this.openAutoHint = false;
        }
      } catch (err) {
        this.opponentPlayer.enableMapInteraction();
        this.openUserHintSelectionWindow = false;
      }
      this.game.isOpponentPlayerReady = false;
      this.game.isPlayerReady = false;
      return;
    } else {
      this.playMap.hideMapElement("hints-link");
      this.playMap.hideMapElement("hints-panel");
      document.getElementById("timer-field-container").style.display = "none";
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
    this.game.playHit(addCountryBoundariesAndMarkers);
  }

  hitTimeout(time = this.gameConfiguration.hitTime) {
    const timerField = document.getElementById("timer-field");
    timerField.textContent = `${time}`;
    timerField.style.color = "green";
    document.getElementById("timer-field-container").style.display =
      "inline-block";
    if (this.hitIntervalIds && this.hitIntervalIds.length != 0)
      this.clearAllIntervals(this);
    if (this.hitTimeoutIds && this.hitTimeoutIds.length != 0)
      this.clearAllTimeouts(this);
    const hitIntervalId = setInterval(() => {
      const modalTimerField = document.getElementById("modalTimer");
      let timer = +timerField.textContent;
      timer = timer - 1;
      if (timer >= 0) {
        if (timer <= 10) {
          timerField.style.color = "red";
          if (modalTimerField) {
            modalTimerField.style.color = "red";
          }
        } else {
          timerField.style.color = "green";
          if (modalTimerField) {
            modalTimerField.style.color = "green";
          }
        }
        timerField.textContent = timer;
        if (modalTimerField) {
          modalTimerField.textContent = timer;
        }
      }
    }, 1000);
    this.hitIntervalIds.push(hitIntervalId);
    const hitTimeoutId = setTimeout(async () => {
      this.opponentPlayer.disableMapInteraction();
      if (
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      ) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      hideModalWindow("flagModal");
      hideModalWindow("coatOfArmsModal");
      hideModalWindow("countryOutlineModal");
      hideModalWindow("countryPhotoModal");
      this.gameMessageField.textContent = `⚠️ ${localization[model.worldCountries.language]["Time is up! The attempt to guess the country passes to your opponent"]}`;
      this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
        animate: false,
      });
      this.playerAttemptToGuess = false;
      this.opponentPlayer.playerAttemptToGuess = true;
      await this.sleep(1500);
      if (this.gameConfiguration.gameMode === "user") {
        this.sendMoveToOpponent("timeout");
        this.game.isPlayerReady = true;
        this.sendMoveAckToOpponent();
      }
      this.game.playHit();
    }, time * 1000);
    this.hitTimeoutIds.push(hitTimeoutId);
  }

  setHitTimeout(time = this.gameConfiguration.hitTime) {
    if (this.gameConfiguration.hitTime === 0) return;
    if (
      this.gameConfiguration &&
      this.gameConfiguration.gameMode === "user" &&
      this.opponentPlayerStartAcknowledged &&
      this.playerAttemptToGuess
    ) {
      this.hitTimeout(time);
    } else if (
      this.gameConfiguration &&
      this.gameConfiguration.gameMode === "computer" &&
      this.playerAttemptToGuess
    ) {
      this.hitTimeout(time);
    }
  }

  addAvailableCountriesPanel() {
    const setViewCountry = function (country) {
      const countryBound = COUNTRY_BOUNDS.find(
        (bound) => country.countryName === bound.name,
      );
      if (countryBound) {
        this.playerMap.fitBounds(countryBound.bounds, {
          animate: true,
        });
      } else {
        this.playerMap.setView(
          country.latlng ? country.latlng : country.capitalLatLng,
          4.5,
          { animate: true },
        );
      }
    };
    const availableCountriesPanel = document.getElementById(
      "available-countries-panel",
    );
    const availableCountriesPanelContent = document.getElementById(
      "available-countries-panel-content",
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

  sleep(ms, timeout = ms + 5000) {
    return new Promise((resolve, reject) => {
      const sleepId = setTimeout(() => {
        clearTimeout(timeoutId);
        resolve();
      }, ms);
      const timeoutId = setTimeout(() => {
        clearTimeout(sleepId);
        reject(new Error("Sleep timeout exceeded"));
      }, timeout);
    });
  }

  setCountryPopupContent(countryPopup, country, emoji = "") {
    countryPopup.setContent(`<img src="${
      country.countryFlag
    }" fetchpriority="high" loading="eager" style="width:21px; height:16px; box-shadow: 0 1px 1px #00000080,
                                inset 0 1px 1px #0000001f; border-radius: 2px; vertical-align: sub;">
                                  ${country.countryCoatOfArms ? `<img src="${country.countryCoatOfArms}" fetchpriority="high" loading="eager" style="width:16px; height:16px; margin-left:2px; vertical-align: sub;">` : ""}
                                <span style="font-weight:bold; font-size:0.8rem; margin-left:2px;color:${
                                  country.countryName !== "Russia"
                                    ? "darkblue"
                                    : "red"
                                }">${
                                  country.countryName !== "Russia"
                                    ? localization[
                                        model.worldCountries.language
                                      ]["countries"][country.countryName]
                                    : localization[
                                        model.worldCountries.language
                                      ]["countries"][country.countryName] +
                                      " - " +
                                      localization[
                                        model.worldCountries.language
                                      ]["War Aggressor"]
                                }</span><span>&nbsp;${emoji}</span>`);
  }

  async addUserClickCountriesPlay(
    countryCode,
    countryBoundary,
    countryMarker,
    addCountryBoundariesAndMarkers = true,
  ) {
    try {
      if (this.playerAlreadyHitting) return;
      this.playerAlreadyHitting = true;
      this.openUserHintSelectionWindow = false;
      this.clearOpponentPlayerTimeout();
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
            ],
        );
        this.playerAlreadyHitting = false;
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
        this.playerAlreadyHitting = false;
        return;
      }
      this.disableMapInteraction();
      if (this.gameConfiguration.gameMode === "user") {
        this.sendMoveToOpponent(countryCode);
      }
      this.alreadyGuessedCountryCodes.push(countryCode);
      const country = this.countries[countryCode];
      const countryIndexToDelete = this.countryCodes.indexOf(countryCode);
      this.countryCodes.splice(countryIndexToDelete, 1);
      if (this.countryCodes.length <= 5) this.addAvailableCountriesPanel();
      const countryPopup = countryMarker.getPopup();
      countryBoundary.unbindTooltip();
      countryMarker.unbindTooltip();
      countryMarker.off();
      countryBoundary.off();
      const countryBoundaryElements = document.getElementsByClassName(
        `${countryCode}`,
      );
      if (countryBoundaryElements) {
        const countryBoundaryElement = countryBoundaryElements[0];
        countryBoundaryElement.style.pointerEvents = "none";
      }
      this.countryMarkersStyles[countryCode] = {
        opacity: 0,
      };
      countryMarker.setOpacity(0);
      this.countriesNumberField.textContent = this.countryCodes.length;
      this.openCountryPopup(countryPopup);
      if (this.selectedCountryTrapCodes.has(countryCode)) {
        try {
          this.setCountryPopupContent(countryPopup, country, "💣");
          addCountryBoundariesAndMarkers = true;
          this.setMessageInnerHtmlField(
            `<span>⛔ ${
              localization[model.worldCountries.language][
                "You have fallen into a trap-country"
              ]
            }</span> <img src="${
              country.countryFlag
            }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;">${
              localization[model.worldCountries.language]["countries"][
                country.countryName
              ]
            }.</span> ${this.gameConfiguration.hintsType !== "No Hints" ? `<span style="margin-left:5px;">${localization[model.worldCountries.language]["The opponent gets a hint"]}</span>` : ""}`,
          );
          this.openAutoHint = true;
          if (this.gameConfiguration.gameMode === "user") {
            if (this.gameConfiguration.hintsType === "Choose Hints") {
              this.openUserHintSelectionWindow = true;
              this.trapCountryHittedCode = countryCode;
            }
            this.trapCountryHitted = this.trapCountryHitted + 1;
            this.addSelectedCountryToCountryPanel(
              this.playerSelectedCountriesContainerId,
              countryCode,
              Array.from(this.selectedCountryTrapCodes).indexOf(countryCode) +
                21,
              true,
            );
          } else {
            this.trapCountryHitted = this.trapCountryHitted + 1;
            if (this.gameConfiguration.hintsType !== "No Hints") {
              const hintType = this.getRandomHintType();
              this.addHint(countryCode, true, hintType);
            } else {
              this.addSelectedCountryToCountryPanel(
                this.playerSelectedCountriesContainerId,
                countryCode,
                Array.from(this.selectedCountryTrapCodes).indexOf(countryCode) +
                  21,
                true,
              );
            }
          }
          let points = 0;
          if (this.trapCountryHitted === 1) {
            this.opponentPlayer.score = this.opponentPlayer.score - 10;
            points = 10;
          } else if (this.trapCountryHitted === 2) {
            this.opponentPlayer.score = this.opponentPlayer.score - 20;
            points = 20;
          } else if (this.trapCountryHitted === 3) {
            this.opponentPlayer.score = this.opponentPlayer.score - 30;
            points = 30;
          } else {
            this.opponentPlayer.score = this.opponentPlayer.score - 50;
            points = 50;
          }
          const scoreElement = document.getElementById(
            "player-one-score-field",
          );
          scoreElement.textContent = `🏅 ${this.opponentPlayer.score}`;
          if (this.opponentPlayer.score < 0) {
            scoreElement.style.color = "red";
          } else {
            scoreElement.style.color = "green";
          }
          this.addCountryBoundaryBlinking(countryCode);
          this.setElementStyle(countryBoundary, {
            weight: 1,
            color: "orange",
            fillColor: "orange",
            fillOpacity: 0.5,
            opacity: 0.8,
            className: countryCode,
          });
          this.countryBoundariesStyles[countryCode] = {
            weight: 1,
            color: "orange",
            fillColor: "orange",
            fillOpacity: 0.5,
            opacity: 0.8,
            className: countryCode,
          };
          document.getElementById(
            "guessed-country-alliance-panel-content",
          ).innerHTML = `<div>⚠️<span style="
                    color: white;
                    font-size: 0.75rem;
                    padding-left: 3px;
                    padding-right: 3px;
                    font-weight: bolder;
                  ">- ${points} ${
                    localization[model.worldCountries.language]["Points"]
                  }</span></div>`;
          const guessedCountryAlliance = document.getElementById(
            "guessed-country-alliance-panel",
          );
          const guessedCountryAllianceHeader = document.getElementById(
            "guessed-country-alliance-header",
          );
          guessedCountryAllianceHeader.classList.add("not-displayed");
          guessedCountryAlliance.style.backgroundColor = "red";
          guessedCountryAlliance.classList.remove("not-displayed");
          this.deleteCountryNeighbourBorders(
            this,
            country,
            this.selectedCountryTrapCodes,
            this.countriesNumberField,
          );
          this.playerAttemptToGuess = true;
          this.opponentPlayer.playerAttemptToGuess = false;
          await this.sleep(2500);
          this.removeCountryBoundaryBlinking(countryCode);
          guessedCountryAlliance.classList.add("not-displayed");
          guessedCountryAlliance.style.backgroundColor = "white";
          guessedCountryAllianceHeader.classList.remove("not-displayed");
          this.closeCountryPopup(countryPopup);
          this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
            animate: false,
          });
        } catch (err) {
          if (countryCode) {
            this.removeCountryBoundaryBlinking(countryCode);
            this.closeCountryPopup(countryPopup);
          }
          if (guessedCountryAlliance) {
            guessedCountryAlliance.classList.add("not-displayed");
            guessedCountryAlliance.style.backgroundColor = "white";
          }
          if (guessedCountryAllianceHeader)
            guessedCountryAllianceHeader.classList.remove("not-displayed");
          this.playerAttemptToGuess = true;
          this.opponentPlayer.playerAttemptToGuess = false;
          this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
            animate: false,
          });
        }
      } else if (this.game && this.game.bonusCountries.includes(countryCode)) {
        try {
          this.setCountryPopupContent(countryPopup, country, "🎁");
          const indexToRemove = this.game.bonusCountries.indexOf(countryCode);
          if (indexToRemove > -1) {
            this.game.bonusCountries.splice(indexToRemove, 1);
          }
          this.bonusCountriesNumberField.textContent =
            this.game.bonusCountries.length;
          addCountryBoundariesAndMarkers = false;
          this.playerAttemptToGuess = false;
          this.opponentPlayer.playerAttemptToGuess = true;
          const countryBoundaryUser =
            this.playMap.countryBoundariesAndMarkersLayer.boundaries[
              countryCode
            ];
          const countryMarker =
            this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
          const countryToDeleteIndex =
            this.opponentPlayer.countryCodes.indexOf(countryCode);
          if (countryToDeleteIndex >= 0)
            this.opponentPlayer.countryCodes.splice(countryToDeleteIndex, 1);
          this.opponentPlayer.alreadyGuessedCountryCodes.push(countryCode);
          if (countryMarker) {
            this.opponentPlayer.countryMarkersStyles[countryCode] = {
              opacity: 0,
            };
            countryMarker.setOpacity(0);
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
            this.opponentPlayer.countryBoundariesStyles[countryCode] = {
              weight: 1,
              color: "purple",
              fillColor: "purple",
              fillOpacity: 0.5,
              opacity: 0.8,
              className: countryCode,
            };
          }
          this.addCountryBoundaryBlinking(countryCode);
          this.deleteCountryNeighbourBorders(
            this,
            country,
            new Set([
              ...this.selectedCountryTrapCodes,
              ...this.selectedCountryCodes,
            ]),
            this.countriesNumberField,
          );
          this.deleteCountryNeighbourBorders(
            this.opponentPlayer,
            country,
            new Set([
              ...this.opponentPlayer.selectedCountryTrapCodes,
              ...this.opponentPlayer.selectedCountryCodes,
            ]),
          );
          this.setElementStyle(countryBoundary, {
            weight: 1,
            color: "purple",
            fillColor: "purple",
            fillOpacity: 0.5,
            opacity: 0.8,
            className: countryCode,
          });
          this.countryBoundariesStyles[countryCode] = {
            weight: 1,
            color: "purple",
            fillColor: "purple",
            fillOpacity: 0.5,
            opacity: 0.8,
            className: countryCode,
          };
          this.opponentPlayer.score = this.opponentPlayer.score + 10;
          const scoreElement = document.getElementById(
            "player-one-score-field",
          );
          scoreElement.textContent = `🏅 ${this.opponentPlayer.score}`;
          if (this.opponentPlayer.score < 0) {
            scoreElement.style.color = "red";
          } else {
            scoreElement.style.color = "green";
          }
          const superBonus =
            (this.game.superBonusCountry ||
              this.game.secondSuperBonusCountry) &&
            (this.game.superBonusCountry === countryCode ||
              this.game.secondSuperBonusCountry === countryCode);
          const superBonusFirst =
            this.game.superBonusCountry &&
            this.game.superBonusCountry === countryCode;
          const superBonusSecond =
            this.game.secondSuperBonusCountry &&
            this.game.secondSuperBonusCountry === countryCode;
          this.setMessageInnerHtmlField(
            `<span>${superBonus ? "💎" : "🎁"} ${
              superBonus
                ? localization[model.worldCountries.language][
                    "You have fallen into a super bonus-country"
                  ]
                : localization[model.worldCountries.language][
                    "You have fallen into a bonus-country"
                  ]
            }</span> <img src="${
              country.countryFlag
            }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;">${
              localization[model.worldCountries.language]["countries"][
                country.countryName
              ]
            }.</span> <span style="margin-left:5px;">${
              superBonus && superBonusFirst
                ? localization[model.worldCountries.language][
                    "Opponent's countries highlighted on map"
                  ]
                : superBonus && superBonusSecond
                  ? localization[model.worldCountries.language][
                      "Opponent's country highlighted on map"
                    ]
                  : localization[model.worldCountries.language][
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
                  ">+10&nbsp;${
                    localization[model.worldCountries.language]["Points"]
                  }</span>`,
          );
          document.getElementById(
            "guessed-country-alliance-panel-content",
          ).innerHTML = `<div>${superBonus ? "💎" : "🎁"}<span style="
                    color: white;
                    font-size: 0.75rem;
                    padding-left: 3px;
                    padding-right: 3px;
                    font-weight: bolder;
                  ">+ 10 ${
                    localization[model.worldCountries.language]["Points"]
                  }</span></div>`;
          const guessedCountryAlliance = document.getElementById(
            "guessed-country-alliance-panel",
          );
          const guessedCountryAllianceHeader = document.getElementById(
            "guessed-country-alliance-header",
          );
          guessedCountryAllianceHeader.classList.add("not-displayed");
          guessedCountryAlliance.style.backgroundColor = "green";
          guessedCountryAlliance.classList.remove("not-displayed");
          if (this.playerMap) {
            document.getElementById(
              "gameCountryAllianceGuessedLabel",
            ).textContent =
              "👏 " +
              localization[model.worldCountries.language]["Congratulations!"];
            document.getElementById(
              "gameCountryAllianceGuessedCountries",
            ).innerHTML =
              `<span style="color: darkblue; font-weight:bold;">${superBonus ? "💎" : "🎁"} ${
                superBonus
                  ? localization[model.worldCountries.language][
                      "You have fallen into a super bonus-country"
                    ]
                  : localization[model.worldCountries.language][
                      "You have fallen into a bonus-country"
                    ]
              }</span> <img src="${
                country.countryFlag
              }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> ${
                country.countryCoatOfArms
                  ? `<img src="${
                      country.countryCoatOfArms
                    }" style="margin-left:5px; width:15px; height:15px; vertical-align: sub;">`
                  : ""
              } <span style="margin-left:5px;color: darkblue;font-weight:bold;">${
                localization[model.worldCountries.language]["countries"][
                  country.countryName
                ]
              }</span> <div style="color: darkblue;font-weight:bold;">${
                superBonus && superBonusFirst
                  ? localization[model.worldCountries.language][
                      "Opponent's country alliance highlighted on map"
                    ]
                  : superBonus && superBonusSecond
                    ? localization[model.worldCountries.language][
                        "Opponent's country highlighted on map"
                      ]
                    : localization[model.worldCountries.language][
                        "Additional attempt to guess country"
                      ]
              }</div><div style="margin-top:5px;"><span style="
                    color: white;
                    font-size: 1rem;
                    border-radius: 2px;
                    background-color: green;
                    padding-left: 2px;
                    padding-right: 2px;
                    font-weight: bolder;
                  ">+10&nbsp;${
                    localization[model.worldCountries.language]["Points"]
                  }</span></div>`;
            const closeButton = document.getElementById(
              "gameCountryAllianceGuessedCloseButton",
            );
            closeButton.textContent =
              localization[model.worldCountries.language]["Close"];
            closeButton.addEventListener(
              "click",
              hideGameCountryAllianceGuessedWindow,
              { once: true },
            );
            showGameCountryAllianceGuessedWindow();
            const modal = document.getElementById(
              "gameCountryAllianceGuessedModal",
            );
            modal.removeEventListener(
              "shown.bs.modal",
              this.clearOpponentPlayerTimeout,
            );
            modal.removeEventListener(
              "hidden.bs.modal",
              this.setOpponentHitTimeout,
            );
            modal.addEventListener(
              "shown.bs.modal",
              this.clearOpponentPlayerTimeout.bind(this),
            );
            modal.addEventListener(
              "hidden.bs.modal",
              this.setOpponentHitTimeout.bind(this),
            );
            setTimeout(hideGameCountryAllianceGuessedWindow, 10000);
          }
          if (superBonus) {
            const countryUnion = this.countryUnions.find(
              (countryUnion) =>
                countryUnion.find(
                  (item) =>
                    !Object.values(item)[0].guessed &&
                    !this.highlightCountryCodes.includes(Object.keys(item)[0]),
                ) != undefined,
            );
            if (countryUnion) {
              if (
                this.game.superBonusCountry &&
                this.game.superBonusCountry === countryCode
              ) {
                countryUnion.forEach((item) => {
                  const guessed = Object.values(item)[0].guessed;
                  const countryCode = Object.keys(item)[0];
                  if (
                    !guessed &&
                    !this.highlightCountryCodes.includes(countryCode)
                  )
                    this.highlightCountryCodes.push(countryCode);
                });
              }
              if (
                this.game.secondSuperBonusCountry &&
                this.game.secondSuperBonusCountry === countryCode
              ) {
                const selectedCountryCode = Object.keys(
                  countryUnion.find((item) => !Object.values(item)[0].guessed),
                )[0];
                if (!this.highlightCountryCodes.includes(selectedCountryCode))
                  this.highlightCountryCodes.push(selectedCountryCode);
              }
              this.highlightCountryCodes.forEach((highlightCountryCode) => {
                const countryBoundary =
                  this.playMap.countryBoundariesAndMarkersLayer.boundaries[
                    highlightCountryCode
                  ];
                const countryMarker =
                  this.playMap.countryBoundariesAndMarkersLayer.markers[
                    highlightCountryCode
                  ];
                if (countryBoundary) {
                  const tooltip = countryBoundary.getTooltip();
                  countryBoundary.off("mouseout");
                  countryBoundary.off("mouseover");
                  countryMarker.off("mouseout");
                  countryMarker.off("mouseover");
                  this.setElementStyle(countryBoundary, {
                    weight: 1,
                    fillOpacity: 0.5,
                    color: "#3388ff",
                    fillColor: "#3388ff",
                    className: highlightCountryCode,
                    opacity: 1,
                  });
                  countryMarker.on("mouseover", function (event) {
                    countryBoundary.setStyle({
                      weight: 1,
                      fillOpacity: 0.75,
                      opacity: 1,
                      className: highlightCountryCode,
                    });
                    L.DomEvent.stopPropagation(event);
                    if (
                      "ontouchstart" in window ||
                      navigator.maxTouchPoints > 0
                    ) {
                      marker.fire("click");
                    }
                  });
                  countryMarker.on("mouseout", function (event) {
                    countryBoundary.setStyle({
                      weight: 1,
                      fillOpacity: 0.5,
                      opacity: 1,
                      className: highlightCountryCode,
                    });
                    L.DomEvent.stopPropagation(event);
                  });
                  this.addMouseOverStyleEventToCountryBoundary(
                    countryBoundary,
                    countryMarker,
                    {
                      weight: 1,
                      fillOpacity: 0.75,
                      opacity: 1,
                      className: highlightCountryCode,
                    },
                  );
                  this.addMouseOutStyleEventToCountryBoundary(
                    countryBoundary,
                    countryMarker,
                    {
                      weight: 1,
                      fillOpacity: 0.5,
                      opacity: 1,
                      className: highlightCountryCode,
                    },
                    0.75,
                  );
                  countryBoundary.unbindTooltip();
                  countryMarker.unbindTooltip();
                  countryBoundary.bindTooltip(tooltip);
                  countryMarker.bindTooltip(tooltip);
                }
              });
            }
          }
          await this.sleep(1500);
          this.removeCountryBoundaryBlinking(countryCode);
          guessedCountryAlliance.classList.add("not-displayed");
          guessedCountryAlliance.style.backgroundColor = "white";
          guessedCountryAllianceHeader.classList.remove("not-displayed");
          this.closeCountryPopup(countryPopup);
          if (this.highlightCountryCodes.length > 0) {
            const countryBounds = [];
            this.highlightCountryCodes.forEach((highlightCountryCode) => {
              const country = this.countries[highlightCountryCode];
              const countryBound = COUNTRY_BOUNDS.find(
                (bound) => country.countryName === bound.name,
              );
              if (countryBound) countryBounds.push(...countryBound.bounds);
            });
            if (countryBounds.length !== 0) {
              this.playerMap.fitBounds(countryBounds, {
                animate: true,
              });
            } else {
              this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
                animate: false,
              });
            }
          } else {
            this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
              animate: false,
            });
          }
        } catch (err) {
          if (countryCode) {
            this.removeCountryBoundaryBlinking(countryCode);
            this.closeCountryPopup(countryPopup);
          }
          this.playerAttemptToGuess = false;
          this.opponentPlayer.playerAttemptToGuess = true;
          this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
            animate: false,
          });
        }
      } else if (this.selectedCountryCodes.has(countryCode)) {
        try {
          if (
            this.highlightCountryCodes &&
            this.highlightCountryCodes.includes(countryCode)
          ) {
            const index = this.highlightCountryCodes.indexOf(countryCode);
            this.highlightCountryCodes.splice(index, 1);
          }
          this.setCountryPopupContent(countryPopup, country, "🎯");
          addCountryBoundariesAndMarkers = false;
          this.playerAttemptToGuess = false;
          this.opponentPlayer.playerAttemptToGuess = true;
          if (this.opponentPlayer.isHintUsed(countryCode)) {
            this.opponentPlayer.usedHintsCount =
              this.opponentPlayer.usedHintsCount + 1;
          }
          this.addCountryBoundaryBlinking(countryCode);
          this.setElementStyle(countryBoundary, {
            weight: 1,
            color: "green",
            fillColor: "green",
            fillOpacity: 0.5,
            opacity: 0.8,
            className: countryCode,
          });
          this.countryBoundariesStyles[countryCode] = {
            weight: 1,
            color: "green",
            fillColor: "green",
            fillOpacity: 0.5,
            opacity: 0.8,
            className: countryCode,
          };
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
            const scoreElement = document.getElementById(
              "player-one-score-field",
            );
            scoreElement.textContent = `🏅 ${this.opponentPlayer.score}`;
            if (this.opponentPlayer.score < 0) {
              scoreElement.style.color = "red";
            } else {
              scoreElement.style.color = "green";
            }
            const countryUnionString = countryUnion
              .map(
                (countryObject) =>
                  `<span>${
                    localization[model.worldCountries.language]["countries"][
                      this.countries[Object.keys(countryObject)[0]].countryName
                    ]
                  }</span>` +
                  `${this.countries[Object.keys(countryObject)[0]].countryCoatOfArms ? `<img src="${this.countries[Object.keys(countryObject)[0]].countryCoatOfArms}" style="width:16px; height:16px; margin-left:3px; margin-right:3px; vertical-align: sub;"></img>` : ""}`,
              )
              .join('<span style="margin-right: 3px;">&times;</span>');
            countryUnion.forEach((countryObject) => {
              const countryCode = Object.keys(countryObject)[0];
              this.setElementStyle(
                this.playMap.countryBoundariesAndMarkersLayer.boundaries[
                  countryCode
                ],
                {
                  weight: 1,
                  color: "red",
                  fillColor: "red",
                  fillOpacity: 0.5,
                  opacity: 0.8,
                  className: countryCode,
                },
              );
              this.countryBoundariesStyles[countryCode] = {
                weight: 1,
                color: "red",
                fillColor: "red",
                fillOpacity: 0.5,
                opacity: 0.8,
                className: countryCode,
              };
              this.addSelectedCountryToCountryPanel(
                this.playerSelectedCountriesContainerId,
                countryCode,
                Array.from(this.selectedCountryCodes).indexOf(countryCode) + 1,
              );
              const country = this.countries[countryCode];
              const countryGuessedIndex = this.lastGuessedCountryNames.indexOf(
                country.countryName,
              );
              if (countryGuessedIndex >= 0)
                this.lastGuessedCountryNames.splice(countryGuessedIndex, 1);
              this.deleteCountryNeighbourBorders(
                this,
                country,
                this.selectedCountryCodes,
                this.countriesNumberField,
              );
            });
            const countryUnionHtml =
              this.createCountryUnionMessageHtml(countryUnionIndex);
            this.setMessageInnerHtmlField(
              `<span style="margin-right:5px;">⚠️ ${
                localization[model.worldCountries.language]["You guessed"]
              }</span><div style="display: inline-block;">${
                countryUnionHtml.outerHTML
              }</div><span style="margin-left:5px;">${
                countryUnion.length === 1
                  ? localization[model.worldCountries.language]["countries"][
                      country.countryName
                    ]
                  : localization[model.worldCountries.language][
                      "Country Alliance"
                    ]
              }</span>`,
            );
            document.getElementById(
              "guessed-country-alliance-panel-content",
            ).innerHTML = `<div>🏅<span style="
                    color: white;
                    font-size: 0.75rem;
                    padding-left: 3px;
                    padding-right: 3px;
                    font-weight: bolder;
                  ">+ ${points} ${
                    localization[model.worldCountries.language]["Points"]
                  }</span></div>`;
            const guessedCountryAlliance = document.getElementById(
              "guessed-country-alliance-panel",
            );
            const guessedCountryAllianceHeader = document.getElementById(
              "guessed-country-alliance-header",
            );
            guessedCountryAllianceHeader.classList.add("not-displayed");
            guessedCountryAlliance.style.backgroundColor = "green";
            guessedCountryAlliance.classList.remove("not-displayed");
            if (this.playerMap) {
              document.getElementById(
                "gameCountryAllianceGuessedLabel",
              ).textContent =
                "👏 " +
                localization[model.worldCountries.language]["Congratulations!"];
              document.getElementById(
                "gameCountryAllianceGuessedCountries",
              ).innerHTML = `<span style="font-weight:bold; color:darkblue;">${
                localization[model.worldCountries.language]["You guessed"]
              }</span><div style="display: inline-block; margin-left:5px;">${
                countryUnionHtml.outerHTML
              }</div><span style="margin-left:5px; color: darkblue; font-weight:bold;">${
                countryUnion.length === 1
                  ? localization[model.worldCountries.language]["Country"]
                  : localization[model.worldCountries.language][
                      "Country Alliance"
                    ]
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
              const closeButton = document.getElementById(
                "gameCountryAllianceGuessedCloseButton",
              );
              closeButton.textContent =
                localization[model.worldCountries.language]["Close"];
              closeButton.addEventListener(
                "click",
                hideGameCountryAllianceGuessedWindow,
                { once: true },
              );
              showGameCountryAllianceGuessedWindow();
              const modal = document.getElementById(
                "gameCountryAllianceGuessedModal",
              );
              modal.removeEventListener(
                "shown.bs.modal",
                this.clearOpponentPlayerTimeout,
              );
              modal.removeEventListener(
                "hidden.bs.modal",
                this.setOpponentHitTimeout,
              );
              modal.addEventListener(
                "shown.bs.modal",
                this.clearOpponentPlayerTimeout.bind(this),
              );
              modal.addEventListener(
                "hidden.bs.modal",
                this.setOpponentHitTimeout.bind(this),
              );
              setTimeout(hideGameCountryAllianceGuessedWindow, 10000);
            }
            await this.sleep(1500);
            this.removeCountryBoundaryBlinking(countryCode);
            guessedCountryAlliance.classList.add("not-displayed");
            guessedCountryAlliance.style.backgroundColor = "white";
            guessedCountryAllianceHeader.classList.remove("not-displayed");
            this.closeCountryPopup(countryPopup);
            this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
              animate: false,
            });
          } else {
            this.setMessageInnerHtmlField(
              `<span>ℹ️ ${
                localization[model.worldCountries.language]["You guessed"]
              }</span> <img src="${
                country.countryFlag
              }" style="margin-left:3px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> ${
                country.countryCoatOfArms
                  ? `<img src="${
                      country.countryCoatOfArms
                    }" style="margin-left:3px; width:15px; height:15px; vertical-align: sub;"></img>`
                  : ""
              } <span style="margin-left:3px;">${
                localization[model.worldCountries.language]["countries"][
                  country.countryName
                ]
              }</span>`,
            );
            this.lastGuessedCountryNames.push(country.countryName);
            await this.sleep(1000);
            this.removeCountryBoundaryBlinking(countryCode);
            this.closeCountryPopup(countryPopup);
          }
        } catch (err) {
          this.playerAttemptToGuess = false;
          this.opponentPlayer.playerAttemptToGuess = true;
          if (countryCode) {
            this.removeCountryBoundaryBlinking(countryCode);
            this.closeCountryPopup(countryPopup);
          }
        }
      } else {
        try {
          addCountryBoundariesAndMarkers = true;
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
          this.closeCountryPopup(countryPopup);
          this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
            animate: false,
          });
          this.countryBoundariesStyles[countryCode] = {
            weight: 0,
            color: "grey",
            fillColor: "grey",
            fillOpacity: 0,
            opacity: 0,
            className: countryCode,
          };
          if (
            this.opponentPlayer.countryBoundariesStyles[countryCode].opacity ===
            0
          ) {
            this.playerMap.removeLayer(countryBoundary);
            delete this.countryBoundariesAndMarkersLayer.boundaries[
              countryCode
            ];
            delete this.countryBoundariesAndMarkersLayer.markers[countryCode];
          }
        } catch (err) {
          if (countryCode) {
            this.closeCountryPopup(countryPopup);
            this.countryBoundariesStyles[countryCode] = {
              weight: 0,
              color: "grey",
              fillColor: "grey",
              fillOpacity: 0,
              opacity: 0,
              className: countryCode,
            };
          }
          this.playerAttemptToGuess = true;
          this.opponentPlayer.playerAttemptToGuess = false;
          this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
            animate: false,
          });
        }
      }
    } catch (err) {
      this.playerAlreadyHitting = false;
      this.playerAttemptToGuess = true;
      this.opponentPlayer.playerAttemptToGuess = false;
      if (countryCode) this.removeCountryBoundaryBlinking(countryCode);
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
    this.playerAlreadyHitting = false;
    this.game.playHit(addCountryBoundariesAndMarkers);
  }

  clearOpponentPlayerTimeout() {
    if (
      this.opponentPlayer &&
      this.opponentPlayer.hitTimeoutIds &&
      this.opponentPlayer.hitTimeoutIds.length != 0
    )
      this.clearAllTimeouts(this.opponentPlayer);
    if (
      this.opponentPlayer &&
      this.opponentPlayer.hitIntervalIds &&
      this.opponentPlayer.hitIntervalIds.length != 0
    )
      this.clearAllIntervals(this.opponentPlayer);
  }

  setOpponentHitTimeout() {
    if (this.opponentPlayer) this.opponentPlayer.setHitTimeout();
  }

  addUserClickCountriesPlayHandler() {
    if (this.playerConfigured) {
      Object.entries(
        this.playMap.countryBoundariesAndMarkersLayer.boundaries,
      ).forEach(([countryCode, countryBoundary]) => {
        const countryMarker =
          this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
        countryMarker.off("click");
        countryMarker.on(
          "click",
          function (ev) {
            L.DomEvent.stopPropagation(ev);
            this.addUserClickCountriesPlay(
              countryCode,
              countryBoundary,
              countryMarker,
            );
          }.bind(this),
        );
        countryBoundary.off("click");
        countryBoundary.on(
          "click",
          function (ev) {
            L.DomEvent.stopPropagation(ev);
            this.addUserClickCountriesPlay(
              countryCode,
              countryBoundary,
              countryMarker,
            );
          }.bind(this),
        );
      });
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
    if (result.includes("RU"))
      return this.selectRandomCountryUnion(
        countriesCodeList,
        numberOfCountries,
      );
    return result;
  }

  fillComputerPlayerSelectedCountries(
    countryUnion,
    countriesCodeList,
    trapCountry = false,
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
        index + 1,
      );
    });
    Array.from(this.selectedCountryTrapCodes).forEach((countryCode, index) => {
      this.addSelectedCountryToCountryPanel(
        this.playerSelectedCountriesContainerId,
        countryCode,
        index + 21,
      );
    });
    this.showSelectedCountries();
    this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
      animate: true,
    });
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
          ]),
        );
      }
    }
    this.playButton.disabled = false;
  }

  selectRandomCountries() {
    const countriesCodeList = Object.values(this.countriesCodeMapping);
    if (this.gameConfiguration.type === "default") {
      const firstFourCountryUnion = this.selectRandomCountryUnion(
        countriesCodeList,
        4,
      );
      this.fillComputerPlayerSelectedCountries(
        firstFourCountryUnion,
        countriesCodeList,
      );
      let countryUnion = this.countryUnions[0];
      firstFourCountryUnion.forEach((countryCode, index) => {
        this.addCountryToCountryUnion(countryUnion, index, countryCode);
      });
      const secondFourCountryUnion = this.selectRandomCountryUnion(
        countriesCodeList,
        4,
      );
      this.fillComputerPlayerSelectedCountries(
        secondFourCountryUnion,
        countriesCodeList,
      );
      countryUnion = this.countryUnions[1];
      secondFourCountryUnion.forEach((countryCode, index) => {
        this.addCountryToCountryUnion(countryUnion, index, countryCode);
      });
      const firstThreeCountryUnion = this.selectRandomCountryUnion(
        countriesCodeList,
        3,
      );
      this.fillComputerPlayerSelectedCountries(
        firstThreeCountryUnion,
        countriesCodeList,
      );
      countryUnion = this.countryUnions[2];
      firstThreeCountryUnion.forEach((countryCode, index) => {
        this.addCountryToCountryUnion(countryUnion, index, countryCode);
      });
      const secondThreeCountryUnion = this.selectRandomCountryUnion(
        countriesCodeList,
        3,
      );
      this.fillComputerPlayerSelectedCountries(
        secondThreeCountryUnion,
        countriesCodeList,
      );
      countryUnion = this.countryUnions[3];
      secondThreeCountryUnion.forEach((countryCode, index) => {
        this.addCountryToCountryUnion(countryUnion, index, countryCode);
      });
      const firstTwoCountryUnion = this.selectRandomCountryUnion(
        countriesCodeList,
        2,
      );
      this.fillComputerPlayerSelectedCountries(
        firstTwoCountryUnion,
        countriesCodeList,
      );
      countryUnion = this.countryUnions[4];
      firstTwoCountryUnion.forEach((countryCode, index) => {
        this.addCountryToCountryUnion(countryUnion, index, countryCode);
      });
      const secondTwoCountryUnion = this.selectRandomCountryUnion(
        countriesCodeList,
        2,
      );
      this.fillComputerPlayerSelectedCountries(
        secondTwoCountryUnion,
        countriesCodeList,
      );
      countryUnion = this.countryUnions[5];
      secondTwoCountryUnion.forEach((countryCode, index) => {
        this.addCountryToCountryUnion(countryUnion, index, countryCode);
      });
      const firstOneCountryUnion = this.selectRandomCountryUnion(
        countriesCodeList,
        1,
      );
      this.fillComputerPlayerSelectedCountries(
        firstOneCountryUnion,
        countriesCodeList,
      );
      countryUnion = this.countryUnions[6];
      firstOneCountryUnion.forEach((countryCode, index) => {
        this.addCountryToCountryUnion(countryUnion, index, countryCode);
      });
      const secondOneCountryUnion = this.selectRandomCountryUnion(
        countriesCodeList,
        1,
      );
      this.fillComputerPlayerSelectedCountries(
        secondOneCountryUnion,
        countriesCodeList,
      );
      countryUnion = this.countryUnions[7];
      secondOneCountryUnion.forEach((countryCode, index) => {
        this.addCountryToCountryUnion(countryUnion, index, countryCode);
      });
      const firstTrapCountry = this.selectRandomCountryUnion(
        countriesCodeList,
        1,
      );
      this.fillComputerPlayerSelectedCountries(
        firstTrapCountry,
        countriesCodeList,
        true,
      );
      const secondTrapCountry = this.selectRandomCountryUnion(
        countriesCodeList,
        1,
      );
      this.fillComputerPlayerSelectedCountries(
        secondTrapCountry,
        countriesCodeList,
        true,
      );
      const thirdTrapCountry = this.selectRandomCountryUnion(
        countriesCodeList,
        1,
      );
      this.fillComputerPlayerSelectedCountries(
        thirdTrapCountry,
        countriesCodeList,
        true,
      );
      const fourthTrapCountry = this.selectRandomCountryUnion(
        countriesCodeList,
        1,
      );
      this.fillComputerPlayerSelectedCountries(
        fourthTrapCountry,
        countriesCodeList,
        true,
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

  initCountryBoundaryAndMarker(countryCode, countryBoundary, countryMarker) {
    const tooltip = countryBoundary.getTooltip();
    countryBoundary.off();
    countryMarker.off();
    countryBoundary.unbindTooltip();
    countryMarker.unbindTooltip();
    countryBoundary.bindTooltip(tooltip);
    countryMarker.bindTooltip(tooltip);
    countryBoundary.setStyle({
      weight: 0,
      fillOpacity: 0.1,
      color: "#3388ff",
      fillColor: "#3388ff",
      className: countryCode,
      opacity: 0.5,
    });
    countryMarker.on("mouseover", function (event) {
      countryBoundary.setStyle({
        weight: 1,
        fillOpacity: 0.5,
        opacity: 1,
        className: countryCode,
      });
      L.DomEvent.stopPropagation(event);
      if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        countryMarker.fire("click");
      }
    });
    countryMarker.on("mouseout", function (event) {
      countryBoundary.setStyle({
        weight: 0,
        fillOpacity: 0.1,
        opacity: 0,
        className: countryCode,
      });
      L.DomEvent.stopPropagation(event);
    });
    this.addMouseOverStyleEventToCountryBoundary(
      countryBoundary,
      countryMarker,
      {
        weight: 1,
        fillOpacity: 0.5,
        opacity: 1,
        className: countryCode,
      },
    );
    this.addMouseOutStyleEventToCountryBoundary(
      countryBoundary,
      countryMarker,
      {
        weight: 0,
        fillOpacity: 0.1,
        opacity: 0,
        className: countryCode,
      },
    );
    countryBoundary.once("click", (ev) => {
      L.DomEvent.stopPropagation(ev);
      this.addUserPlayerInitialCountrySelectionHandler(
        countryCode,
        countryBoundary,
        countryMarker,
      );
    });
    countryMarker.once("click", (ev) => {
      L.DomEvent.stopPropagation(ev);
      this.addUserPlayerInitialCountrySelectionHandler(
        countryCode,
        countryBoundary,
        countryMarker,
      );
    });
    if (!this.playerMap.hasLayer(countryMarker)) {
      this.playerMap.addLayer(countryMarker);
    }
    countryMarker._icon.classList.remove("box-shadow-marker-icon-hover");
  }

  undoCountryUnionSelection() {
    if (this.selectedCountryTrapCodes.size > 0) {
      const countryCodes = [...this.selectedCountryCodes].slice(0, -1);
      let borderCodes = [];
      countryCodes.forEach((code) => {
        const country = this.countries[code];
        borderCodes.push(
          ...country.countryBorders
            .map((countryBorderCode) => {
              const countryCodeCc2 =
                this.countriesCodeMapping[countryBorderCode];
              if (countryCodeCc2) {
                return countryCodeCc2;
              }
            })
            .filter((code) => code !== undefined),
        );
      });
      const countryTrapCode = Array.from(this.selectedCountryTrapCodes).at(-1);
      const userSelectedCountriesPanel = document.getElementById(
        this.playerSelectedCountriesContainerId,
      );
      if (this.selectedCountryTrapCodes.size === 1) {
        this.gameMessageField.textContent = `ℹ️ ${
          localization[model.worldCountries.language][
            "Choose the first trap country"
          ]
        }`;
        const countryElement = userSelectedCountriesPanel.querySelector(
          `.country${this.selectedCountryTrapCodes.size + 20}`,
        );
        countryElement.innerHTML = `<span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>`;
      } else if (this.selectedCountryTrapCodes.size === 2) {
        this.gameMessageField.textContent = `ℹ️ ${
          localization[model.worldCountries.language][
            "Choose the second trap country"
          ]
        }`;
        const countryElement = userSelectedCountriesPanel.querySelector(
          `.country${this.selectedCountryTrapCodes.size + 20}`,
        );
        countryElement.innerHTML = `<span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>`;
      } else if (this.selectedCountryTrapCodes.size === 3) {
        this.gameMessageField.textContent = `ℹ️ ${
          localization[model.worldCountries.language][
            "Choose the third trap country"
          ]
        }`;
        const countryElement = userSelectedCountriesPanel.querySelector(
          `.country${this.selectedCountryTrapCodes.size + 20}`,
        );
        countryElement.innerHTML = `<span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>`;
      }
      this.selectedCountryCodes.delete(countryTrapCode);
      this.selectedCountryTrapCodes.delete(countryTrapCode);
      const countryBoundary =
        this.playMap.countryBoundariesAndMarkersLayer.boundaries[
          countryTrapCode
        ];
      const countryMarker =
        this.playMap.countryBoundariesAndMarkersLayer.markers[countryTrapCode];
      const country = this.countries[countryTrapCode];
      this.initCountryBoundaryAndMarker(
        countryTrapCode,
        countryBoundary,
        countryMarker,
      );
      const countryBorderCodes = country.countryBorders
        .map((countryBorderCode) => {
          const countryCodeCc2 = this.countriesCodeMapping[countryBorderCode];
          if (countryCodeCc2) {
            return countryCodeCc2;
          }
        })
        .filter((code) => code !== undefined);
      countryBorderCodes.forEach((countryBorderCode) => {
        if (!borderCodes.includes(countryBorderCode)) {
          this.selectedCountryNeighboursCodes.delete(countryBorderCode);
          const countryBoundary =
            this.playMap.countryBoundariesAndMarkersLayer.boundaries[
              countryBorderCode
            ];
          const countryMarker =
            this.playMap.countryBoundariesAndMarkersLayer.markers[
              countryBorderCode
            ];
          this.initCountryBoundaryAndMarker(
            countryBorderCode,
            countryBoundary,
            countryMarker,
          );
        }
      });
      this.playMap.setSelectedCountryFiledHtml("");
      return;
    }
    const lastSelectedCountryUnionIndex = findLastIndex(
      this.countryUnions,
      (array) => array.some((item) => item !== undefined),
    );
    if (
      lastSelectedCountryUnionIndex === -1 ||
      lastSelectedCountryUnionIndex === 0
    ) {
      this.setMessageInnerHtmlField(
        `<span style="font-size: 0.8rem;">ℹ️ ${
          localization[model.worldCountries.language][
            "Choose the first alliance from four countries on map or click"
          ] + " 🎲"
        }</span>`,
      );
      this.playMap.initSelectionCountriesMapView();
      this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
        animate: true,
      });
    } else if (lastSelectedCountryUnionIndex === 1) {
      this.gameMessageField.textContent = `ℹ️ ${
        localization[model.worldCountries.language][
          "Choose the second alliance from four countries"
        ]
      }`;
    } else if (lastSelectedCountryUnionIndex === 2) {
      this.gameMessageField.textContent = `ℹ️ ${
        localization[model.worldCountries.language][
          "Choose the first alliance from three countries"
        ]
      }`;
    } else if (lastSelectedCountryUnionIndex === 3) {
      this.gameMessageField.textContent = `ℹ️ ${
        localization[model.worldCountries.language][
          "Choose the second alliance from three countries"
        ]
      }`;
    } else if (lastSelectedCountryUnionIndex === 4) {
      this.gameMessageField.textContent = `ℹ️ ${
        localization[model.worldCountries.language][
          "Choose the first alliance from two countries"
        ]
      }`;
    } else if (lastSelectedCountryUnionIndex === 5) {
      this.gameMessageField.textContent = `ℹ️ ${
        localization[model.worldCountries.language][
          "Choose the second alliance from two countries"
        ]
      }`;
    } else if (lastSelectedCountryUnionIndex === 6) {
      this.gameMessageField.textContent = `ℹ️ ${
        localization[model.worldCountries.language][
          "Choose the first alliance from one country"
        ]
      }`;
    } else if (lastSelectedCountryUnionIndex === 7) {
      this.gameMessageField.textContent = `ℹ️ ${
        localization[model.worldCountries.language][
          "Choose the second alliance from one country"
        ]
      }`;
    }
    const userSelectedCountriesPanel = document.getElementById(
      this.playerSelectedCountriesContainerId,
    );
    const lastSelectedCountryUnion =
      lastSelectedCountryUnionIndex !== -1
        ? this.countryUnions[lastSelectedCountryUnionIndex]
        : undefined;
    if (lastSelectedCountryUnion) {
      const length = lastSelectedCountryUnion.length;
      const countryCodes = lastSelectedCountryUnion.map((countryObject) => {
        return Object.keys(countryObject)[0];
      });
      const codes = Array.from(this.selectedCountryCodes).filter(
        (code) => !countryCodes.includes(code),
      );
      let borderCodes = [];
      codes.forEach((code) => {
        const country = this.countries[code];
        borderCodes.push(
          ...country.countryBorders
            .map((countryBorderCode) => {
              const countryCodeCc2 =
                this.countriesCodeMapping[countryBorderCode];
              if (countryCodeCc2) {
                return countryCodeCc2;
              }
            })
            .filter((code) => code !== undefined),
        );
      });
      countryCodes.forEach((countryCode) => {
        const countryCodeIndex = Array.from(this.selectedCountryCodes).indexOf(
          countryCode,
        );
        const countryElement = userSelectedCountriesPanel.querySelector(
          `.country${countryCodeIndex + 1}`,
        );
        countryElement.innerHTML = `<span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>`;
        const countryBoundary =
          this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryCode];
        const countryMarker =
          this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
        const country = this.countries[countryCode];
        this.initCountryBoundaryAndMarker(
          countryCode,
          countryBoundary,
          countryMarker,
        );
        const countryBorderCodes = country.countryBorders
          .map((countryBorderCode) => {
            const countryCodeCc2 = this.countriesCodeMapping[countryBorderCode];
            if (countryCodeCc2) {
              return countryCodeCc2;
            }
          })
          .filter((code) => code !== undefined);
        countryBorderCodes.forEach((countryBorderCode) => {
          if (!borderCodes.includes(countryBorderCode)) {
            this.selectedCountryNeighboursCodes.delete(countryBorderCode);
            const countryBoundary =
              this.playMap.countryBoundariesAndMarkersLayer.boundaries[
                countryBorderCode
              ];
            const countryMarker =
              this.playMap.countryBoundariesAndMarkersLayer.markers[
                countryBorderCode
              ];
            this.initCountryBoundaryAndMarker(
              countryBorderCode,
              countryBoundary,
              countryMarker,
            );
          }
        });
      });
      countryCodes.forEach((countryCode) => {
        this.selectedCountryCodes.delete(countryCode);
      });
      if (
        Array.from(lastSelectedCountryUnion).some(
          (item) => item === undefined || item === null,
        )
      ) {
        Object.entries(
          this.playMap.countryBoundariesAndMarkersLayer.boundaries,
        ).forEach(([countryCode, countryBoundary]) => {
          const isEnoughNeighbours =
            this.isEnoughCountryNeighboursByCountryUnionIndex(
              lastSelectedCountryUnionIndex,
              countryCode,
            );
          const countryMarker =
            this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
          if (
            !this.playerMap.hasLayer(countryMarker) &&
            !this.selectedCountryNeighboursCodes.has(countryCode) &&
            isEnoughNeighbours
          ) {
            this.playerMap.addLayer(countryMarker);
          }
          if (!this.playerMap.hasLayer(countryBoundary) && isEnoughNeighbours) {
            this.playerMap.addLayer(countryBoundary);
          }
        });
      } else {
        Object.entries(
          this.playMap.countryBoundariesAndMarkersLayer.boundaries,
        ).forEach(([countryCode, countryBoundary]) => {
          const isEnoughNeighbours =
            this.isEnoughCountryNeighboursByCountryUnionIndex(
              lastSelectedCountryUnionIndex,
              countryCode,
            );
          const countryMarker =
            this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
          if (
            this.playerMap.hasLayer(countryBoundary) &&
            !isEnoughNeighbours &&
            !this.selectedCountryCodes.has(countryCode) &&
            !this.selectedCountryNeighboursCodes.has(countryCode)
          ) {
            this.playerMap.removeLayer(countryBoundary);
          }
          if (
            this.playerMap.hasLayer(countryMarker) &&
            !isEnoughNeighbours &&
            !this.selectedCountryCodes.has(countryCode) &&
            !this.selectedCountryNeighboursCodes.has(countryCode)
          ) {
            this.playerMap.removeLayer(countryMarker);
          }
        });
        this.playerCountriesNumberField.textContent =
          +this.playerCountriesNumberField.textContent - 1;
      }
      this.playMap.setSelectedCountryFiledHtml("");
      this.countryUnions[lastSelectedCountryUnionIndex] = new Array(length);
    }
  }

  isEnoughCountryNeighboursByCountryUnionIndex(countryUnionIndex, countryCode) {
    let isEnoughNeighbours = false;
    if (countryUnionIndex === 0) {
      isEnoughNeighbours = this.isEnoughCountryNeighbours(countryCode, 4);
    } else if (countryUnionIndex === 1) {
      isEnoughNeighbours = this.isEnoughCountryNeighbours(countryCode, 4);
    } else if (countryUnionIndex === 2) {
      isEnoughNeighbours = this.isEnoughCountryNeighbours(countryCode, 3);
    } else if (countryUnionIndex === 3) {
      isEnoughNeighbours = this.isEnoughCountryNeighbours(countryCode, 3);
    } else if (countryUnionIndex === 4) {
      isEnoughNeighbours = this.isEnoughCountryNeighbours(countryCode, 2);
    } else if (countryUnionIndex === 5) {
      isEnoughNeighbours = this.isEnoughCountryNeighbours(countryCode, 2);
    } else if (countryUnionIndex === 6) {
      isEnoughNeighbours = this.isEnoughCountryNeighbours(countryCode, 1);
    } else {
      isEnoughNeighbours = this.isEnoughCountryNeighbours(countryCode, 1);
    }
    return isEnoughNeighbours;
  }

  cleanSelection() {
    Object.entries(
      this.playMap.countryBoundariesAndMarkersLayer.boundaries,
    ).forEach(([countryCode, countryBoundary]) => {
      const countryMarker =
        this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
      if (countryMarker) {
        countryMarker.off();
      }
      countryBoundary.off();
      this.playerMap.removeLayer(countryBoundary);
      delete this.playMap.countryBoundariesAndMarkersLayer.boundaries[
        countryCode
      ];
      this.playerMap.removeLayer(countryMarker);
      delete this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
    });
    this.initData();
    this.playerCountriesNumberField.textContent = "0";
    const countriesUnionsContainer =
      this.playerSelectedCountriesContainer.querySelector(".countries-unions");
    countriesUnionsContainer.remove();
    this.playerCountriesNumberField.insertAdjacentHTML(
      "afterend",
      this.gameConfiguration.countriesUnionsHtml,
    );
    this.setMessageInnerHtmlField(
      `<span style="font-size: 0.8rem;">ℹ️ ${
        localization[model.worldCountries.language][
          "Choose the first alliance from four countries on map or click"
        ] + " 🎲"
      }</span>`,
    );
    this.playMap.setSelectedCountryFiledHtml("");
    if (this.gameConfiguration.gameMode === "user")
      this.sendCleanCountriesSelectionToOpponent();
    if (this.game) {
      this.game.bonusCountries = [];
      this.game.superBonusCountry = null;
      this.game.secondSuperBonusCountry = null;
    }
    this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
      animate: true,
    });
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
    minNeighboursNumber,
  ) {
    const countryMarker =
      this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
    if (this.playerType === "userPlayer") {
      countryBoundary.off("click");
      countryBoundary.once("click", (ev) => {
        L.DomEvent.stopPropagation(ev);
        this.addUserPlayerInitialCountrySelectionHandler(
          countryCode,
          countryBoundary,
          countryMarker,
        );
      });
      countryMarker.off("click");
      countryMarker.once("click", (ev) => {
        L.DomEvent.stopPropagation(ev);
        this.addUserPlayerInitialCountrySelectionHandler(
          countryCode,
          countryBoundary,
          countryMarker,
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
    Object.entries(
      this.playMap.countryBoundariesAndMarkersLayer.boundaries,
    ).forEach(([countryCode, countryBoundary]) => {
      if (
        !this.selectedCountryCodes.has(countryCode) &&
        !this.selectedCountryNeighboursCodes.has(countryCode)
      ) {
        this.playerMap.removeLayer(countryBoundary);
        this.playerMap.removeLayer(
          this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode],
        );
      }
    });
  }

  addNeighbourCountriesByCountryCode(countryCode) {
    const countryBorderCodes = this.countries[countryCode].countryBorders;
    countryBorderCodes.forEach((countryBorderCode) => {
      const countryCodeCc2 = this.countriesCodeMapping[countryBorderCode];
      if (countryCodeCc2) {
        if (!this.selectedCountryNeighboursCodes.has(countryCodeCc2)) {
          this.playerMap.addLayer(
            this.playMap.countryBoundariesAndMarkersLayer.markers[
              countryCodeCc2
            ],
          );
        }
        this.selectedCountryNeighboursCodes.add(countryCodeCc2);
        this.playerMap.addLayer(
          this.playMap.countryBoundariesAndMarkersLayer.boundaries[
            countryCodeCc2
          ],
        );
      }
    });
  }

  finishCountriesUnionSelection() {
    this.selectedCountryNeighboursCodes.forEach((countryCode) => {
      if (!this.selectedCountryCodes.has(countryCode)) {
        const countryBoundary =
          this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryCode];
        const countryMarker =
          this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
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
    addCountryImage = true,
  ) {
    const country = this.countries[countryCode];
    const userSelectedCountriesPanel = document.querySelector(
      `#${countryPanelId}`,
    );
    const countryElement = userSelectedCountriesPanel.querySelector(
      `.country${countryIndex.toString()}`,
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
        }" style="width:11px; height:11px;border:solid 1px grey; border-radius:50%; display:inline-block;vertical-align:baseline; box-shadow: 0 2px 5px #00000080, inset 0 2px 10px #0000001f;">`
      : `<span style="width:11px; height:11px;background-color:red; border: 2px grey solid;border-radius:50%; display:inline-block;vertical-align:baseline;"></span>`;
  }

  addUserPlayerInitialCountrySelection(
    countryCode,
    countryBoundary,
    countryBoundaryFillColor,
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
    this.addSelectedCountryToCountryPanel(
      this.playerSelectedCountriesContainerId,
      countryCode,
      this.selectedCountryCodes.size,
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
      }</span>`,
    );
  }

  addUserPlayerInitialCountrySelectionHandler(countryCode, countryBoundary) {
    document.getElementById("random-user-countries-selection").style.display =
      "none";
    const countryMarker =
      this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
    const country = this.countries[countryCode];
    countryMarker.off();
    countryBoundary.off();
    if (this.playerConfigured) {
      this.gameMessageField.textContent = `ℹ️ ${
        localization[model.worldCountries.language][
          "Press 'Play' to start game!"
        ]
      }`;
      return;
    }
    const cleanSection = document.getElementById(
      "clean-user-countries-selection",
    );
    cleanSection.style.display = "none";
    const undoButton = document.getElementById("undo-user-countries-selection");
    undoButton.style.display = "flex";
    countryMarker._icon.classList.add("box-shadow-marker-icon-hover");
    this.selectedCountryCodes.add(countryCode);
    if (this.gameConfiguration.type === "default") {
      if (
        this.selectedCountryCodes.size >= 1 &&
        this.selectedCountryCodes.size <= 4
      ) {
        this.gameMessageField.textContent = `ℹ️ ${
          localization[model.worldCountries.language][
            "Choose the first alliance from four countries"
          ]
        }`;
        this.setSelectedCountryFiledHtml(country);
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "green",
        );
        const countryUnion = this.countryUnions[0];
        this.addCountryToCountryUnion(
          countryUnion,
          this.selectedCountryCodes.size - 1,
          countryCode,
        );
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 4) {
          this.playerCountriesNumberField.textContent =
            +this.playerCountriesNumberField.textContent + 1;
          this.finishCountriesUnionSelection();
          this.addCountryBoundariesAndMarkers(4);
          this.gameMessageField.textContent = `ℹ️ ${
            localization[model.worldCountries.language][
              "Choose the second alliance from four countries"
            ]
          }`;
        }
      }
      if (
        this.selectedCountryCodes.size >= 5 &&
        this.selectedCountryCodes.size <= 8
      ) {
        this.setSelectedCountryFiledHtml(country);
        const countryUnion = this.countryUnions[1];
        this.addCountryToCountryUnion(
          countryUnion,
          this.selectedCountryCodes.size - 5,
          countryCode,
        );
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "green",
        );
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 8) {
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
        this.selectedCountryCodes.size >= 9 &&
        this.selectedCountryCodes.size <= 11
      ) {
        this.setSelectedCountryFiledHtml(country);
        const countryUnion = this.countryUnions[2];
        this.addCountryToCountryUnion(
          countryUnion,
          this.selectedCountryCodes.size - 9,
          countryCode,
        );
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "green",
        );
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 11) {
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
        this.selectedCountryCodes.size >= 12 &&
        this.selectedCountryCodes.size <= 14
      ) {
        this.setSelectedCountryFiledHtml(country);
        const countryUnion = this.countryUnions[3];
        this.addCountryToCountryUnion(
          countryUnion,
          this.selectedCountryCodes.size - 12,
          countryCode,
        );
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "green",
        );
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 14) {
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
        this.selectedCountryCodes.size >= 15 &&
        this.selectedCountryCodes.size <= 16
      ) {
        this.setSelectedCountryFiledHtml(country);
        const countryUnion = this.countryUnions[4];
        this.addCountryToCountryUnion(
          countryUnion,
          this.selectedCountryCodes.size - 15,
          countryCode,
        );
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "green",
        );
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 16) {
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
        this.selectedCountryCodes.size >= 17 &&
        this.selectedCountryCodes.size <= 18
      ) {
        this.setSelectedCountryFiledHtml(country);
        const countryUnion = this.countryUnions[5];
        this.addCountryToCountryUnion(
          countryUnion,
          this.selectedCountryCodes.size - 17,
          countryCode,
        );
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "green",
        );
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 18) {
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
      if (this.selectedCountryCodes.size === 19) {
        this.setSelectedCountryFiledHtml(country);
        const countryUnion = this.countryUnions[6];
        this.addCountryToCountryUnion(
          countryUnion,
          this.selectedCountryCodes.size - 19,
          countryCode,
        );
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "green",
        );
        this.playerCountriesNumberField.textContent =
          +this.playerCountriesNumberField.textContent + 1;
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 19) {
          this.finishCountriesUnionSelection();
          this.addCountryBoundariesAndMarkers(1);
          this.gameMessageField.textContent = `ℹ️ ${
            localization[model.worldCountries.language][
              "Choose the second alliance from one country"
            ]
          }`;
        }
      }
      if (this.selectedCountryCodes.size === 20) {
        this.setSelectedCountryFiledHtml(country);
        const countryUnion = this.countryUnions[7];
        this.addCountryToCountryUnion(
          countryUnion,
          this.selectedCountryCodes.size - 20,
          countryCode,
        );
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "green",
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
          "orange",
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
          "orange",
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
          "orange",
        );
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 23) {
          this.finishCountriesUnionSelection();
          this.addCountryBoundariesAndMarkers(1);
          this.gameMessageField.textContent = `ℹ️ ${
            localization[model.worldCountries.language][
              "Choose the fourth trap country"
            ]
          }`;
        }
      }
      if (this.selectedCountryCodes.size === 24) {
        this.setSelectedCountryFiledHtml(country);
        this.selectedCountryTrapCodes.add(countryCode);
        this.addUserPlayerInitialCountrySelection(
          countryCode,
          countryBoundary,
          "orange",
        );
        this.addNeighbourCountriesByCountryCode(countryCode);
        if (this.selectedCountryCodes.size === 24) {
          this.finishCountriesUnionSelection();
          this.addCountryBoundariesAndMarkers(1);
          this.gameMessageField.textContent = `ℹ️ ${
            localization[model.worldCountries.language][
              "Press 'Play' to start game!"
            ]
          }`;
          undoButton.style.display = "none";
          cleanSection.style.display = "flex";
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
          this.showSelectedCountries();
          this.selectedCountryNeighboursCodes.forEach((countryCode) => {
            const countryBoundary =
              this.playMap.countryBoundariesAndMarkersLayer.boundaries[
                countryCode
              ];
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
                ]),
              );
            }
          }
          this.playButton.disabled = false;
          this.playerConfigured = true;
          this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
            animate: true,
          });
        }
      }
    }
  }

  addCountryBoundariesAndMarkers(minNeighboursNumber) {
    if (this.playerType === "userPlayer") {
      Object.entries(
        this.playMap.countryBoundariesAndMarkersLayer.boundaries,
      ).forEach(([countryCode, countryBoundary]) => {
        if (
          !this.selectedCountryCodes.has(countryCode) &&
          !this.selectedCountryNeighboursCodes.has(countryCode)
        ) {
          this.addCountryBoundaryAndMarker(
            countryCode,
            countryBoundary,
            minNeighboursNumber,
          );
        }
      });
    }
  }

  addMouseOverStyleEventToCountryBoundary(
    countryBoundary,
    countryMarker,
    styleObject,
  ) {
    countryBoundary.once("mouseover", function (event) {
      if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        countryBoundary.fire("click");
      } else {
        L.DomEvent.stopPropagation(event);
        countryBoundary.setStyle(styleObject);
        countryMarker._icon.classList.add("box-shadow-marker-icon-hover");
      }
    });
  }

  addMouseOutStyleEventToCountryBoundary(
    countryBoundary,
    countryMarker,
    styleObject,
    fillOpacity = 0.5,
  ) {
    if (!("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
      countryBoundary.on("mouseout", function (event) {
        L.DomEvent.stopPropagation(event);
        countryBoundary.setStyle(styleObject);
        countryMarker._icon.classList.remove("box-shadow-marker-icon-hover");
        countryBoundary.once("mouseover", function (event) {
          if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
            countryBoundary.fire("click");
          } else {
            L.DomEvent.stopPropagation(event);
            countryBoundary.setStyle({
              weight: 1,
              fillOpacity: fillOpacity,
              opacity: 1,
              className: styleObject.className,
            });
            countryMarker._icon.classList.add("box-shadow-marker-icon-hover");
          }
        });
      });
    }
  }

  createCountryMarkerIcon(country, width, height) {
    return L.icon({
      iconUrl: `${country.flags.webp}`,
      iconSize: [width, height],
    });
  }

  createCountryMarker(
    country,
    countryBoundary,
    countryTooltip,
    countryPopup,
    width,
    height,
  ) {
    const marker = L.marker(
      country.latlng ? country.latlng : country.capitalInfo.latlng,
      {
        icon: this.createCountryMarkerIcon(country, width, height),
        zIndexOffset: 10000,
        riseOnHover: true,
        alt: localization[model.worldCountries.language]["countries"][
          country.name.common
        ],
        className: country.cca2,
      },
    )
      .bindPopup(countryPopup)
      .bindTooltip(countryTooltip);
    marker.dataId = country.cca2;
    marker.on("mouseover", function (event) {
      countryBoundary.setStyle({
        weight: 1,
        fillOpacity: 0.5,
        opacity: 1,
        className: country.cca2,
      });
      L.DomEvent.stopPropagation(event);
      if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        marker.fire("click");
      }
    });
    marker.on("mouseout", function (event) {
      countryBoundary.setStyle({
        weight: 0,
        fillOpacity: 0.1,
        opacity: 0,
        className: country.cca2,
      });
      L.DomEvent.stopPropagation(event);
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
    const countryCoatOfArms =
      country.coatOfArms && country.coatOfArms.webp
        ? country.coatOfArms.webp
        : null;
    const countryPopup = L.popup({
      closeOnClick: false,
      closeButton: false,
      autoPanPadding: [50, 50],
    })
      .setLatLng(country.latlng ? country.latlng : country.capitalInfo.latlng)
      .setContent(
        `<img src="${
          country.flags.webp
        }" fetchpriority="high" loading="eager" style="width:21px; height:16px; box-shadow: 0 1px 1px #00000080,
                                inset 0 1px 1px #0000001f; border-radius: 2px; vertical-align: sub;">
                                  ${countryCoatOfArms ? `<img src="${countryCoatOfArms}" fetchpriority="high" loading="eager" style="width:16px; height:16px; margin-left:2px; vertical-align: sub;">` : ""}
                                <span style="font-weight:bold; font-size:0.8rem; margin-left:2px;color:${
                                  country.name.common !== "Russia"
                                    ? "darkblue"
                                    : "red"
                                }">${
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
                                }</span>`,
      );
    return countryPopup;
  }

  createCountryTooltip(country) {
    const countryCoatOfArms =
      country.coatOfArms && country.coatOfArms.webp
        ? country.coatOfArms.webp
        : null;
    const countryTooltip = L.tooltip(
      country.latlng ? country.latlng : country.capitalInfo.latlng,
    ).setContent(
      `<img src="${
        country.flags.webp
      }" fetchpriority="high" loading="eager" style="width:21px; height:16px; box-shadow: 0 1px 1px #00000080,
                                inset 0 1px 1px #0000001f; border-radius: 2px; vertical-align: sub;">
                                ${countryCoatOfArms ? `<img src="${countryCoatOfArms}" fetchpriority="high" loading="eager" style="width:16px; height:16px; margin-left:2px; vertical-align: sub;">` : ""}
                                <span style="font-weight:bold; font-size:0.8rem; margin-left:2px;color:${
                                  country.name.common !== "Russia"
                                    ? "darkblue"
                                    : "red"
                                }">${
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
                                }</span>`,
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
    Object.entries(
      this.playMap.countryBoundariesAndMarkersLayer.boundaries,
    ).forEach(([countryCode, countryBoundary]) => {
      this.playerMap.removeLayer(countryBoundary);
    });
  }

  removeAllCountryMarkers() {
    Object.entries(
      this.playMap.countryBoundariesAndMarkersLayer.markers,
    ).forEach(([countryCode, countryMarker]) => {
      this.playerMap.removeLayer(countryMarker);
    });
  }

  addAllCountryBoundariesAndMarkersInitial() {
    this.playerMap.removeLayer(this.countryBoundariesAndMarkersFeatureGroup);
    this.countryBoundariesAndMarkersFeatureGroup.clearLayers();
    this.playerMap.removeLayer(
      this.opponentPlayer.countryBoundariesAndMarkersFeatureGroup,
    );
    this.opponentPlayer.countryBoundariesAndMarkersFeatureGroup.clearLayers();
    Object.entries(
      this.playMap.countryBoundariesAndMarkersLayer.boundaries,
    ).forEach(([countryCode, layer]) => {
      const tooltip = layer.getTooltip();
      const countryMarker =
        this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
      countryMarker.off();
      layer.off();
      this.addMouseOverStyleEventToCountryBoundary(layer, countryMarker, {
        weight: 1,
        fillOpacity: 0.5,
        opacity: 1,
        className: countryCode,
      });
      this.addMouseOutStyleEventToCountryBoundary(layer, countryMarker, {
        weight: 0,
        fillOpacity: 0.1,
        opacity: 0,
        className: countryCode,
      });
      layer.setStyle({
        weight: 0,
        fillOpacity: 0.1,
        color: "#3388ff",
        fillColor: "#3388ff",
        className: countryCode,
        opacity: 0.5,
      });
      countryMarker.on("mouseover", function (event) {
        layer.setStyle({
          weight: 1,
          fillOpacity: 0.5,
          opacity: 1,
          className: countryCode,
        });
        L.DomEvent.stopPropagation(event);
        if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
          marker.fire("click");
        }
      });
      countryMarker.on("mouseout", function (event) {
        layer.setStyle({
          weight: 0,
          fillOpacity: 0.1,
          opacity: 0,
          className: countryCode,
        });
        L.DomEvent.stopPropagation(event);
      });
      layer.unbindTooltip();
      countryMarker.unbindTooltip();
      layer.bindTooltip(tooltip);
      countryMarker.bindTooltip(tooltip);
      this.countryBoundariesAndMarkersFeatureGroup.addLayer(layer);
    });
    Object.values(
      this.playMap.countryBoundariesAndMarkersLayer.markers,
    ).forEach((layer) =>
      this.countryBoundariesAndMarkersFeatureGroup.addLayer(layer),
    );
    this.playerMap.addLayer(this.countryBoundariesAndMarkersFeatureGroup);
  }

  addAllCountryBoundariesAndMarkers() {
    Object.entries(
      this.playMap.countryBoundariesAndMarkersLayer.boundaries,
    ).forEach(([countryCode, countryBoundary]) => {
      const style = this.countryBoundariesStyles[countryCode];
      if (style) {
        countryBoundary.setStyle(style);
      } else {
        this.setElementStyle(countryBoundary, {
          weight: 0,
          fillOpacity: 0.1,
          color: "#3388ff",
          fillColor: "#3388ff",
          className: countryCode,
          opacity: 0.5,
        });
      }
      if (this.highlightCountryCodes.includes(countryCode)) {
        this.setElementStyle(countryBoundary, {
          weight: 1,
          fillOpacity: 0.5,
          color: "#3388ff",
          fillColor: "#3388ff",
          className: countryCode,
          opacity: 1,
        });
      }
      const countryMarker =
        this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
      if (countryMarker) {
        const markerStyle = this.countryMarkersStyles[countryCode];
        countryMarker._icon.classList.remove("box-shadow-marker-icon-hover");
        if (markerStyle && markerStyle.opacity === 0) {
          countryMarker.setOpacity(markerStyle.opacity);
          if (countryMarker.getElement())
            countryMarker.getElement().style.pointerEvents = "none";
        } else {
          countryMarker.setOpacity(1);
          if (countryMarker.getElement())
            countryMarker.getElement().style.pointerEvents = "auto";
        }
      }
    });
  }

  showSelectedCountries() {
    this.playMap.cleanMap();
    Object.entries(
      this.playMap.countryBoundariesAndMarkersLayer.markers,
    ).forEach(([countryCode, countryMarker]) => {
      countryMarker.off();
      if (
        this.selectedCountryCodes.has(countryCode) ||
        this.selectedCountryTrapCodes.has(countryCode)
      ) {
        this.countryBoundariesAndMarkersFeatureGroup.addLayer(countryMarker);
      }
    });
    this.selectedCountryCodes.forEach((countryCode) => {
      const countryBoundary =
        this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryCode];
      countryBoundary.off();
      this.setElementStyle(countryBoundary, {
        weight: 1,
        color: "green",
        fillColor: "green",
        fillOpacity: 0.5,
        opacity: 0.8,
        className: countryCode,
      });
      this.countryBoundariesStyles[countryCode] = {
        weight: 1,
        color: "green",
        fillColor: "green",
        fillOpacity: 0.5,
        opacity: 0.8,
        className: countryCode,
      };
      this.countryBoundariesAndMarkersFeatureGroup.addLayer(countryBoundary);
    });
    this.selectedCountryTrapCodes.forEach((countryCode) => {
      const countryBoundary =
        this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryCode];
      countryBoundary.off();
      this.setElementStyle(countryBoundary, {
        weight: 1,
        color: "orange",
        fillColor: "orange",
        fillOpacity: 0.5,
        opacity: 0.8,
        className: countryCode,
      });
      this.countryBoundariesStyles[countryCode] = {
        weight: 1,
        color: "orange",
        fillColor: "orange",
        fillOpacity: 0.5,
        opacity: 0.8,
        className: countryCode,
      };
      this.countryBoundariesAndMarkersFeatureGroup.addLayer(countryBoundary);
    });
    this.playerMap.addLayer(this.countryBoundariesAndMarkersFeatureGroup);
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
          ]),
        );
        bonusCountries = this.game.bonusCountries;
      }
      const startJson = JSON.stringify({
        type: "start",
        bonusCountries: bonusCountries,
        superBonusCountry: this.game.superBonusCountry,
        secondSuperBonusCountry: this.game.secondSuperBonusCountry,
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
        new Array(4),
        new Array(3),
        new Array(3),
        new Array(2),
        new Array(2),
        new Array(1),
        new Array(1),
      ];
      this.opponentPlayer.playerConfigured = false;
      document.getElementById("player-two-countries-number").textContent = "0";
      if (this.game) {
        this.game.superBonusCountry = null;
        this.game.secondSuperBonusCountry = null;
        this.game.bonusCountries = [];
      }
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
          messageObject.countries,
        );
        this.opponentPlayer.selectedCountryTrapCodes = new Set(
          messageObject.trapCountries,
        );
        this.opponentPlayer.selectedCountryNeighboursCodes = new Set(
          messageObject.neighbors,
        );
        this.opponentPlayer.countryUnions = messageObject.countryUnions;
        this.opponentPlayer.playerConfigured = true;
        document.getElementById("player-two-countries-number").textContent =
          this.gameConfiguration.countryUnionsNumber;
        this.game.firebase.sendMessage(
          JSON.stringify({ type: "ack", value: "conf" }),
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
        this.game.superBonusCountry = messageObject.superBonusCountry;
        this.game.secondSuperBonusCountry =
          messageObject.secondSuperBonusCountry;
      }
      if (this.playerConfigured && this.opponentPlayer.playerConfigured) {
        const cleanSection = document.getElementById(
          "clean-user-countries-selection",
        );
        cleanSection.style.display = "none";
        const randomSection = document.getElementById(
          "random-user-countries-selection",
        );
        randomSection.style.display = "none";
      }
      if (
        this.gameMessageField.textContent.endsWith(
          localization[model.worldCountries.language][
            "Opponent has not yet started game. Wait for the message to start."
          ],
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
          ],
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
          }`,
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
          "chat-button-left-arrow",
        );
        chatButtonLeftArrow.textContent = "⬇";
        const chatButtonRightArrow = document.getElementById(
          "chat-button-right-arrow",
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

  async handleOpponentHit(countryCode, addCountryBoundariesAndMarkers = true) {
    if (countryCode === "timeout") {
      this.playerAttemptToGuess = true;
      this.opponentPlayer.playerAttemptToGuess = false;
      this.sendMoveAckToOpponent();
      this.game.isPlayerReady = true;
      this.game.playHit();
    } else {
      try {
        this.openUserHintSelectionWindow = false;
        this.alreadyGuessedCountryCodes.push(countryCode);
        const country = this.countries[countryCode];
        const countryBoundary =
          this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryCode];
        const countryMarker =
          this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
        const countryPopup = countryMarker.getPopup();
        countryMarker.setOpacity(0);
        this.countryMarkersStyles[countryCode] = {
          opacity: 0,
        };
        const countryToDeleteIndex = this.countryCodes.indexOf(countryCode);
        if (countryToDeleteIndex >= 0)
          this.countryCodes.splice(countryToDeleteIndex, 1);
        this.countriesNumberField.textContent = this.countryCodes.length;
        const countryBound = COUNTRY_BOUNDS.find(
          (bound) => country.countryName === bound.name,
        );
        this.openCountryPopup(countryPopup);
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
          try {
            this.setCountryPopupContent(countryPopup, country, "💣");
            addCountryBoundariesAndMarkers = true;
            this.setMessageInnerHtmlField(
              `<span>⚠️ ${
                localization[model.worldCountries.language][
                  "Opponent has fallen into a trap-country"
                ]
              }</span> <img src="${
                country.countryFlag
              }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;">${
                localization[model.worldCountries.language]["countries"][
                  country.countryName
                ]
              }.</span> ${this.gameConfiguration.hintsType !== "No Hints" ? `<span style="margin-left:5px;">${localization[model.worldCountries.language]["The opponent gets a hint"]}</span>` : ""}`,
            );
            this.trapCountryHitted = this.trapCountryHitted + 1;
            if (this.trapCountryHitted === 1) {
              this.opponentPlayer.score = this.opponentPlayer.score - 10;
            } else if (this.trapCountryHitted === 2) {
              this.opponentPlayer.score = this.opponentPlayer.score - 20;
            } else if (this.trapCountryHitted === 3) {
              this.opponentPlayer.score = this.opponentPlayer.score - 30;
            } else {
              this.opponentPlayer.score = this.opponentPlayer.score - 50;
            }
            const scoreElement = document.getElementById(
              "player-two-score-field",
            );
            scoreElement.textContent = `🏅 ${this.opponentPlayer.score}`;
            if (this.opponentPlayer.score < 0) {
              scoreElement.style.color = "red";
            } else {
              scoreElement.style.color = "green";
            }
            this.openAutoHint = true;
            if (this.gameConfiguration.hintsType === "Choose Hints") {
              this.openUserHintSelectionWindow = true;
              this.trapCountryHittedCode = countryCode;
            }
            if (
              this.gameConfiguration.hintsType !== "No Hints" &&
              this.gameConfiguration.hintsType !== "Choose Hints"
            ) {
              const hintType = this.getRandomHintType();
              this.addHint(countryCode, false, hintType);
            } else {
              this.addSelectedCountryToCountryPanel(
                this.playerSelectedCountriesContainerId,
                countryCode,
                Array.from(this.selectedCountryTrapCodes).indexOf(countryCode) +
                  21,
                false,
              );
            }
            this.addCountryBoundaryBlinking(countryCode);
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
            await this.sleep(2500);
            this.removeCountryBoundaryBlinking(countryCode);
            this.closeCountryPopup(countryPopup);
            this.countryBoundariesStyles[countryCode] = {
              weight: 0,
              color: "orange",
              fillColor: "orange",
              fillOpacity: 0,
              opacity: 0,
              className: countryCode,
            };
            this.deleteCountryNeighbourBorders(
              this,
              country,
              this.selectedCountryTrapCodes,
              this.countriesNumberField,
            );
            this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
              animate: false,
            });
          } catch (err) {
            this.playerAttemptToGuess = true;
            this.opponentPlayer.playerAttemptToGuess = false;
            if (countryCode) {
              this.removeCountryBoundaryBlinking(countryCode);
              this.closeCountryPopup(countryPopup);
              this.countryBoundariesStyles[countryCode] = {
                weight: 0,
                color: "orange",
                fillColor: "orange",
                fillOpacity: 0,
                opacity: 0,
                className: countryCode,
              };
              this.deleteCountryNeighbourBorders(
                this,
                country,
                this.selectedCountryTrapCodes,
                this.countriesNumberField,
              );
            }
            this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
              animate: false,
            });
          }
        } else if (
          this.game &&
          this.game.bonusCountries.includes(countryCode)
        ) {
          try {
            this.setCountryPopupContent(countryPopup, country, "🎁");
            const indexToRemove = this.game.bonusCountries.indexOf(countryCode);
            if (indexToRemove > -1) {
              this.game.bonusCountries.splice(indexToRemove, 1);
            }
            this.bonusCountriesNumberField.textContent =
              this.game.bonusCountries.length;
            addCountryBoundariesAndMarkers = false;
            this.playerAttemptToGuess = false;
            this.opponentPlayer.playerAttemptToGuess = true;
            const countryBoundaryOpponent =
              this.playMap.countryBoundariesAndMarkersLayer.boundaries[
                countryCode
              ];
            const countryMarker =
              this.playMap.countryBoundariesAndMarkersLayer.markers[
                countryCode
              ];
            const countryToDeleteIndex =
              this.opponentPlayer.countryCodes.indexOf(countryCode);
            if (countryToDeleteIndex >= 0)
              this.opponentPlayer.countryCodes.splice(countryToDeleteIndex, 1);
            if (countryMarker) {
              countryMarker.setOpacity(0);
              this.opponentPlayer.countryMarkersStyles[countryCode] = {
                opacity: 0,
              };
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
              this.opponentPlayer.countryBoundariesStyles[countryCode] = {
                weight: 1,
                color: "purple",
                fillColor: "purple",
                fillOpacity: 0.5,
                opacity: 0.8,
                className: countryCode,
              };
            }
            this.addCountryBoundaryBlinking(countryCode);
            this.deleteCountryNeighbourBorders(
              this,
              country,
              new Set([
                ...this.selectedCountryCodes,
                ...this.selectedCountryTrapCodes,
              ]),
              this.countriesNumberField,
            );
            this.deleteCountryNeighbourBorders(
              this.opponentPlayer,
              country,
              new Set([
                ...this.opponentPlayer.selectedCountryCodes,
                ...this.opponentPlayer.selectedCountryTrapCodes,
              ]),
            );
            this.setElementStyle(countryBoundary, {
              weight: 1,
              color: "purple",
              fillColor: "purple",
              fillOpacity: 0.5,
              opacity: 0.8,
              className: countryCode,
            });
            this.countryBoundariesStyles[countryCode] = {
              weight: 1,
              color: "purple",
              fillColor: "purple",
              fillOpacity: 0.5,
              opacity: 0.8,
              className: countryCode,
            };
            this.opponentPlayer.score = this.opponentPlayer.score + 10;
            const scoreElement = document.getElementById(
              "player-two-score-field",
            );
            scoreElement.textContent = `🏅 ${this.opponentPlayer.score}`;
            if (this.opponentPlayer.score < 0) {
              scoreElement.style.color = "red";
            } else {
              scoreElement.style.color = "green";
            }
            this.setMessageInnerHtmlField(
              `<span style="font-size: 0.7rem;">ℹ️ ${
                localization[model.worldCountries.language][
                  "Opponent has fallen into a bonus-country"
                ]
              }</span> <img src="${
                country.countryFlag
              }" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;font-size: 0.7rem;">${
                localization[model.worldCountries.language]["countries"][
                  country.countryName
                ]
              }.</span> <span style="margin-left:5px; font-size: 0.7rem;">${
                localization[model.worldCountries.language][
                  "He gets additional attempt to guess and"
                ]
              }</span><span style="
        font-size: 0.7rem;
                    margin-left: 3px;
                    color: white;
                    border-radius: 2px;
                    background-color: green;
                    padding-left: 2px;
                    padding-right: 2px;
                    font-weight: bolder;
                  ">+10&nbsp;${
                    localization[model.worldCountries.language]["Points"]
                  }</span>`,
            );
            await this.sleep(1500);
            this.removeCountryBoundaryBlinking(countryCode);
            this.closeCountryPopup(countryPopup);
            this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
              animate: false,
            });
          } catch (err) {
            this.playerAttemptToGuess = false;
            this.opponentPlayer.playerAttemptToGuess = true;
            if (countryCode) {
              this.removeCountryBoundaryBlinking(countryCode);
              this.closeCountryPopup(countryPopup);
            }
            this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
              animate: false,
            });
          }
        } else if (this.selectedCountryCodes.has(countryCode)) {
          try {
            this.setCountryPopupContent(countryPopup, country, "🎯");
            addCountryBoundariesAndMarkers = false;
            this.playerAttemptToGuess = false;
            this.opponentPlayer.playerAttemptToGuess = true;
            if (this.opponentPlayer.isHintUsed(countryCode)) {
              this.opponentPlayer.usedHintsCount =
                this.opponentPlayer.usedHintsCount + 1;
            }
            this.addCountryBoundaryBlinking(countryCode);
            this.setElementStyle(countryBoundary, {
              weight: 1,
              color: "red",
              fillColor: "red",
              fillOpacity: 0.5,
              opacity: 0.8,
              className: countryCode,
            });
            this.countryBoundariesStyles[countryCode] = {
              weight: 1,
              color: "red",
              fillColor: "red",
              fillOpacity: 0.5,
              opacity: 0.8,
              className: countryCode,
            };
            this.addSelectedCountryToCountryPanel(
              this.playerSelectedCountriesContainerId,
              countryCode,
              Array.from(this.selectedCountryCodes).indexOf(countryCode) + 1,
              false,
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
              const scoreElement = document.getElementById(
                "player-two-score-field",
              );
              scoreElement.textContent = `🏅 ${this.opponentPlayer.score}`;
              if (this.opponentPlayer.score < 0) {
                scoreElement.style.color = "red";
              } else {
                scoreElement.style.color = "green";
              }
              countryUnion.forEach((countryObject) => {
                const countryCode = Object.keys(countryObject)[0];
                const country = this.countries[countryCode];
                this.deleteCountryNeighbourBorders(
                  this,
                  country,
                  this.selectedCountryCodes,
                  this.countriesNumberField,
                );
              });
              const countryUnionHtml =
                this.createCountryUnionMessageHtml(countryUnionIndex);
              this.setMessageInnerHtmlField(
                `<span style="margin-right:5px;">⚠️ ${
                  localization[model.worldCountries.language][
                    "Opponent guessed"
                  ]
                }</span><div style="display: inline-block;">${
                  countryUnionHtml.outerHTML
                }</div><span style="margin-left:5px;">${
                  countryUnion.length === 1
                    ? localization[model.worldCountries.language]["countries"][
                        country.countryName
                      ]
                    : localization[model.worldCountries.language][
                        "Country Alliance"
                      ]
                }</span>`,
              );
              await this.sleep(1500);
              this.removeCountryBoundaryBlinking(countryCode);
              this.closeCountryPopup(countryPopup);
              this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
                animate: false,
              });
            } else {
              this.setMessageInnerHtmlField(
                `<span>ℹ️ ${
                  localization[model.worldCountries.language][
                    "Opponent guessed"
                  ]
                }</span> <img src="${
                  country.countryFlag
                }" style="margin-left:3px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> ${
                  country.countryCoatOfArms
                    ? `<img src="${
                        country.countryCoatOfArms
                      }" style="margin-left:3px; width:15px; height:15px; vertical-align: sub;"></img>`
                    : ""
                } <span style="margin-left:3px;">${
                  localization[model.worldCountries.language]["countries"][
                    country.countryName
                  ]
                }</span>`,
              );
              await this.sleep(1000);
              this.removeCountryBoundaryBlinking(countryCode);
              this.closeCountryPopup(countryPopup);
            }
          } catch (err) {
            this.playerAttemptToGuess = false;
            this.opponentPlayer.playerAttemptToGuess = true;
            if (countryCode) {
              this.removeCountryBoundaryBlinking(countryCode);
              this.closeCountryPopup(countryPopup);
            }
          }
        } else {
          try {
            addCountryBoundariesAndMarkers = true;
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
            this.closeCountryPopup(countryPopup);
            this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
              animate: false,
            });
            this.countryBoundariesStyles[countryCode] = {
              weight: 0,
              color: "grey",
              fillColor: "grey",
              fillOpacity: 0,
              opacity: 0,
              className: countryCode,
            };
            if (
              this.opponentPlayer.countryBoundariesStyles[countryCode]
                .opacity === 0
            ) {
              this.playerMap.removeLayer(countryBoundary);
              delete this.countryBoundariesAndMarkersLayer.boundaries[
                countryCode
              ];
              delete this.countryBoundariesAndMarkersLayer.markers[countryCode];
            }
          } catch (err) {
            if (countryCode) {
              this.closeCountryPopup(countryPopup);
              this.countryBoundariesStyles[countryCode] = {
                weight: 0,
                color: "grey",
                fillColor: "grey",
                fillOpacity: 0,
                opacity: 0,
                className: countryCode,
              };
            }
            this.playerAttemptToGuess = true;
            this.opponentPlayer.playerAttemptToGuess = false;
            this.playerMap.fitBounds(WORLD_MAP_BOUNDS, {
              animate: false,
            });
          }
        }
        if (+this.playerCountriesNumberField.textContent === 0) {
          this.opponentPlayer.score +=
            +this.opponentPlayer.playerCountriesNumberField.textContent * 10;
          this.playerWonGame = false;
          this.game.finished = true;
          this.game.showGameResult(false, false);
          return;
        }
      } catch (err) {
        this.playerAttemptToGuess = true;
        this.opponentPlayer.playerAttemptToGuess = false;
        if (countryCode) this.removeCountryBoundaryBlinking(countryCode);
      }
      this.sendMoveAckToOpponent();
      this.game.isPlayerReady = true;
      this.game.playHit(addCountryBoundariesAndMarkers);
    }
  }

  opponentConnectionHandler(connectionState) {
    const opponentConnectionText = document.getElementById(
      "opponent-connection-text",
    );
    const opponentConnectionIndicator = document.getElementById(
      "opponent-connection-indicator",
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
              ],
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
              ],
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
          ],
      );
      if (this.game) this.game.finishGame(false);
    }
  }
}
