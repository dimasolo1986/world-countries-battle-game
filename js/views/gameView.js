import { localization } from "../localization/ua.js";
import { WORLD_MAP_BOUNDS, GEOGRAPHICAL_CENTER } from "../config.js";
import * as model from "../model.js";
import { GameConfig } from "../gameConfig.js";
class gameView {
  _parentElement = document.querySelector("#countriesBattleGamePlay");
  _gameMessageField = document.querySelector(".countries-battle-game-message");
  _gameConfiguration;
  _playerOneMap;
  _playerTwoMap;

  initGameView() {
    this._gameConfiguration = new GameConfig("default");
    this.createMap("playerOneMap", this._playerOneMap, GEOGRAPHICAL_CENTER);
  }

  createMap(mapId, playerMap, latLon, defaultZoomLevel = 2.35) {
    if (playerMap && playerMap.remove) {
      playerMap.remove();
    }
    function centerMap(e) {
      playerMap.panTo(e.latlng);
    }
    function zoomIn() {
      playerMap.zoomIn();
    }

    function zoomOut() {
      playerMap.zoomOut();
    }
    function reset() {
      playerMap.fitBounds(WORLD_MAP_BOUNDS, { animate: false });
    }
    const streetLayer = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
    );
    const natGeoWorldMap = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
    );
    const baseMaps = {
      WorldStreetMap: streetLayer,
      NatGeoWorldMap: natGeoWorldMap,
    };
    playerMap = L.map(mapId, {
      contextmenu: true,
      layers: [streetLayer],
      contextmenuItems: [
        {
          text: localization[model.worldCountries.language]["Center Map Here"],
          callback: centerMap,
          context: this,
        },
        "-",
        {
          text: localization[model.worldCountries.language]["Zoom In"],
          callback: zoomIn,
          context: this,
        },
        {
          text: localization[model.worldCountries.language]["Zoom Out"],
          callback: zoomOut,
          context: this,
        },
        {
          text: localization[model.worldCountries.language]["Reset"],
          callback: reset,
          context: this,
        },
      ],
      minZoom: defaultZoomLevel,
      zoomSnap: 0.25,
      worldCopyJump: true,
      zoomAnimation: true,
      zoomAnimationThreshold: 2,
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: "topleft",
        title: "Full Screen",
        titleCancel: "Exit Fullscreen Mode",
        forceSeparateButton: false,
        forcePseudoFullscreen: true,
        addFullScreen: false,
        zoomResetFunction: reset.bind(this),
      },
      maxBounds: [
        [85.1217211716937, 270.48437500000003],
        [-86.37146534864254, -250.27343750000003],
      ],
    })
      .fitWorld()
      .setView(latLon, defaultZoomLevel);
    L.control.layers(baseMaps).setPosition("topleft").addTo(playerMap);
    L.Control.UserSelectedCountriesField = L.Control.extend({
      countriesNumber: this._gameConfiguration.countryUnions.length,
      gameConfiguration: this._gameConfiguration,
      onAdd: function (map) {
        const container = L.DomUtil.create("div");
        container.id = "user-selected-countries-container";
        container.classList.add("text-center");
        container.style.width = "50px";
        container.style.backgroundColor = "white";
        container.style.opacity = "0.7";
        container.style.borderRadius = "2px";
        container.style.border = "2px solid rgba(0,0,0,0.2)";
        const userIconContainer = L.DomUtil.create("span");
        userIconContainer.insertAdjacentHTML(
          "afterbegin",
          '<i class="fa-solid fa-user"></i>'
        );
        const userCountriesNumber = L.DomUtil.create("span");
        userCountriesNumber.style.marginLeft = "5px";
        userCountriesNumber.id = "user-countries-number";
        userCountriesNumber.style.fontWeight = "bolder";
        userCountriesNumber.textContent = "0";
        container.appendChild(userIconContainer);
        container.appendChild(userCountriesNumber);
        const clean = L.DomUtil.create("div");
        clean.style.cursor = "pointer";
        clean.style.borderTop = "1px dotted black";
        clean.insertAdjacentHTML(
          "afterbegin",
          '<i class="fa-solid fa-trash"></i>'
        );
        container.insertAdjacentHTML(
          "beforeend",
          this.gameConfiguration.countriesUnionsHtml
        );
        container.appendChild(clean);
        return container;
      },
      onRemove: function (map) {},
    });
    L.control.userSelectedCountriesField = function (opts) {
      return new L.Control.UserSelectedCountriesField(opts);
    };
    L.control
      .userSelectedCountriesField({ position: "topleft" })
      .addTo(playerMap);
    // L.Control.MapField = L.Control.extend({
    //   onAdd: function (map) {
    //     const mapFiled = L.DomUtil.create("div");
    //     mapFiled.id = "map-field";
    //     mapFiled.style.backgroundColor = "white";
    //     mapFiled.style.border = "rgba(0, 0, 0, 0.2) 2px solid";
    //     mapFiled.style.marginTop = "10px";
    //     mapFiled.style.paddingRight = "3px";
    //     mapFiled.style.paddingLeft = "3px";
    //     mapFiled.style.opacity = "0.7";
    //     mapFiled.style.borderRadius = "2px";
    //     mapFiled.style.fontWeight = "bolder";
    //     mapFiled.textContent =
    //       localization[model.worldCountries.language]["Your Map"];
    //     return mapFiled;
    //   },

    //   onRemove: function (map) {},
    // });
    // L.control.mapfield = function (opts) {
    //   return new L.Control.MapField(opts);
    // };
    // L.control.mapfield({ position: "topright" }).addTo(this._guessCountriesMap);
    // L.Control.PlayButton = L.Control.extend({
    //   playFunction: this.playGameHandler.bind(this),
    //   onAdd: function (map) {
    //     const playButton = L.DomUtil.create("button");
    //     playButton.classList.add("btn");
    //     playButton.classList.add("btn-sm");
    //     playButton.classList.add("btn-danger");
    //     playButton.classList.add("guess-country-game-play");
    //     playButton.style.marginTop = "10px";
    //     playButton.style.paddinTop = "0.35rem";
    //     playButton.style.paddinBottom = "0.35rem";
    //     playButton.disabled = true;
    //     playButton.textContent =
    //       localization[model.worldCountries.language]["Play"];
    //     playButton.addEventListener("click", this.playFunction);
    //     return playButton;
    //   },

    //   onRemove: function (map) {},
    // });
    // L.control.playbutton = function (opts) {
    //   return new L.Control.PlayButton(opts);
    // };
    // L.control
    //   .playbutton({ position: "topright" })
    //   .addTo(this._guessCountriesMap);
    // L.Control.FinishButton = L.Control.extend({
    //   finishFunction: this.finishGameHandler.bind(this, true),
    //   onAdd: function (map) {
    //     const finishButton = L.DomUtil.create("button");
    //     finishButton.classList.add("btn");
    //     finishButton.classList.add("btn-sm");
    //     finishButton.classList.add("btn-primary");
    //     finishButton.classList.add("guess-country-game-finish");
    //     finishButton.style.marginTop = "5px";
    //     finishButton.style.paddinTop = "0.35rem";
    //     finishButton.style.paddinBottom = "0.35rem";
    //     finishButton.textContent =
    //       localization[model.worldCountries.language]["Finish"];
    //     finishButton.addEventListener("click", this.finishFunction);
    //     return finishButton;
    //   },
    //   onRemove: function (map) {},
    // });
    // L.control.finishbutton = function (opts) {
    //   return new L.Control.FinishButton(opts);
    // };
    // L.control
    //   .finishbutton({ position: "topright" })
    //   .addTo(this._guessCountriesMap);
    // L.Control.GuessedNotGuessedPanel = L.Control.extend({
    //   onAdd: function (map) {
    //     const guessedNotGuessedPanel = L.DomUtil.create("div");
    //     guessedNotGuessedPanel.id = "guessed-not-guessed-panel";
    //     guessedNotGuessedPanel.style.backgroundColor = "white";
    //     guessedNotGuessedPanel.style.opacity = "0.7";
    //     guessedNotGuessedPanel.style.borderRadius = "2px";
    //     guessedNotGuessedPanel.style.border = "2px solid rgba(0,0,0,0.2)";
    //     guessedNotGuessedPanel.style.marginTop = "5px";
    //     guessedNotGuessedPanel.style.padding = "3px";
    //     const guessedHtml = `<div><span style="width:7px; height:7px; border-radius:50%; border:1px solid black; margin-right:5px;background-color:red; display:inline-block;"></span><span style="font-size:0.6rem;">${
    //       localization[model.worldCountries.language]["Guessed Country"]
    //     }</span></div>`;
    //     const notGuessedHtml = `<div><span style="width:7px; height:7px; border-radius:50%; border:1px solid black; margin-right:5px;background-color:grey; display:inline-block;"></span><span style="font-size:0.6rem;">${
    //       localization[model.worldCountries.language]["Not Guessed Country"]
    //     }</span></div>`;
    //     guessedNotGuessedPanel.insertAdjacentHTML("beforeend", guessedHtml);
    //     guessedNotGuessedPanel.insertAdjacentHTML("beforeend", notGuessedHtml);

    //     return guessedNotGuessedPanel;
    //   },
    //   onRemove: function (map) {},
    // });
    // L.control.guessednotguessedpanel = function (opts) {
    //   return new L.Control.GuessedNotGuessedPanel(opts);
    // };
    // L.control
    //   .guessednotguessedpanel({ position: "topright" })
    //   .addTo(this._guessCountriesMap);
    // L.Control.AvailableCountriesPanel = L.Control.extend({
    //   onAdd: function (map) {
    //     const availableCountriesPanel = L.DomUtil.create("div");
    //     availableCountriesPanel.id = "available-countries-panel";
    //     availableCountriesPanel.classList.add("not-displayed");
    //     availableCountriesPanel.style.backgroundColor = "white";
    //     availableCountriesPanel.style.opacity = "0.7";
    //     availableCountriesPanel.style.borderRadius = "2px";
    //     availableCountriesPanel.style.border = "2px solid rgba(0,0,0,0.2)";
    //     availableCountriesPanel.style.marginTop = "5px";
    //     availableCountriesPanel.style.padding = "3px";
    //     availableCountriesPanel.style.width = "105px";
    //     availableCountriesPanel.style.overflow = "hidden";
    //     const availableCountriesHeader = `<div><span style="font-size:0.6rem;">${
    //       localization[model.worldCountries.language]["Available Countries:"]
    //     }</span></div>`;
    //     availableCountriesPanel.insertAdjacentHTML(
    //       "beforeend",
    //       availableCountriesHeader
    //     );
    //     const availableCountriesPanelContent = L.DomUtil.create("div");
    //     availableCountriesPanelContent.id = "available-countries-panel-content";
    //     availableCountriesPanel.appendChild(availableCountriesPanelContent);

    //     return availableCountriesPanel;
    //   },
    //   onRemove: function (map) {},
    // });
    // L.control.availablecountriespanel = function (opts) {
    //   return new L.Control.AvailableCountriesPanel(opts);
    // };
    // L.control
    //   .availablecountriespanel({ position: "topright" })
    //   .addTo(this._guessCountriesMap);
    // L.Control.ComputerSelectedCountriesField = L.Control.extend({
    //   countriesNumber: +this._countriesNumber,
    //   onAdd: function (map) {
    //     const container = L.DomUtil.create("div");
    //     container.id = "computer-selected-countries-container";
    //     container.classList.add("text-center");
    //     container.style.width = "50px";
    //     container.style.marginTop = "12px";
    //     container.style.backgroundColor = "white";
    //     container.style.opacity = "0.7";
    //     container.style.borderRadius = "2px";
    //     container.style.border = "2px solid rgba(0,0,0,0.2)";
    //     const computerIconContainer = L.DomUtil.create("span");
    //     computerIconContainer.insertAdjacentHTML(
    //       "afterbegin",
    //       '<i class="fa-solid fa-desktop"></i>'
    //     );
    //     const computerCountriesNumber = L.DomUtil.create("span");
    //     computerCountriesNumber.style.marginLeft = "5px";
    //     computerCountriesNumber.id = "computer-countries-number";
    //     computerCountriesNumber.style.fontWeight = "bolder";
    //     computerCountriesNumber.textContent = this.countriesNumber;
    //     container.appendChild(computerIconContainer);
    //     container.appendChild(computerCountriesNumber);
    //     const index =
    //       Math.floor(this.countriesNumber / 2) + (this.countriesNumber % 2);
    //     let countryIndex = 1;
    //     for (let i = 1; i <= index; i++) {
    //       const computerCountriesContainer = L.DomUtil.create("div");
    //       computerCountriesContainer.classList.add(
    //         "computer-countries-container"
    //       );
    //       const countriesTemplate =
    //         this.countriesNumber !== countryIndex
    //           ? `<span class="computerCountryContainer" id="computerCountry${countryIndex.toString()}" style="margin-right:10px;"><span style="color:grey; border:solid 1px grey;  background-color: lightgrey; border-radius:50%; display:inline-block; height:13px; width:13px;"></span></span><span class="computerCountryContainer" id="computerCountry${(
    //               countryIndex + 1
    //             ).toString()}"><span style="color:grey; background-color: lightgrey; border:solid 1px grey; border-radius:50%; display:inline-block; height:13px; width:13px;"></span></span>`
    //           : `<span class="computerCountryContainer" id="computerCountry${countryIndex.toString()}"><span style="color:grey; background-color: lightgrey; border:solid 1px grey; border-radius:50%; display:inline-block; height:13px; width:13px;"></span></span>`;
    //       computerCountriesContainer.insertAdjacentHTML(
    //         "afterbegin",
    //         countriesTemplate
    //       );
    //       container.appendChild(computerCountriesContainer);
    //       countryIndex = countryIndex + 2;
    //     }
    //     return container;
    //   },
    //   onRemove: function (map) {},
    // });
    // L.control.computerSelectedCountriesField = function (opts) {
    //   return new L.Control.ComputerSelectedCountriesField(opts);
    // };
    // L.control
    //   .computerSelectedCountriesField({ position: "topright" })
    //   .addTo(this._guessCountriesMap);
    // this._guessCountriesMap.fitBounds(WORLD_MAP_BOUNDS, { animate: false });
    // this.addCountryBoundaries();
  }

  showGame() {
    this._parentElement.classList.remove("not-displayed");
  }

  hideGame() {
    this._parentElement.classList.add("not-displayed");
  }

  translateElements() {}
}

export default new gameView();
