import { localization } from "./localization/ua.js";
import { WORLD_MAP_BOUNDS } from "./config.js";
import * as model from "./model.js";
export class PlayMap {
  map;
  gameConfiguration;
  game;
  playerOne;
  playerTwo;
  countriesNumber;
  constructor(
    mapId,
    gameConfiguration,
    playerOneSelectedCountriesContainerId,
    playerOneSelectedCountriesNumber,
    playerTwoSelectedCountriesContainerId,
    playerTwoSelectedCountriesNumber,
    playerMapLabel,
    latLon,
    defaultZoomLevel = 2.4
  ) {
    this.mapId = mapId;
    this.gameConfiguration = gameConfiguration;
    if (this.gameConfiguration.onlyIndependentCountries) {
      this.countriesNumber = model.worldCountries.countries.filter(
        (country) => country.independent
      ).length;
    } else {
      this.countriesNumber = model.worldCountries.countries.length;
    }
    this.createMap(
      mapId,
      playerOneSelectedCountriesContainerId,
      playerOneSelectedCountriesNumber,
      playerTwoSelectedCountriesContainerId,
      playerTwoSelectedCountriesNumber,
      playerMapLabel,
      latLon,
      defaultZoomLevel
    );
  }

  createMap(
    mapId,
    playerOneSelectedCountriesContainerId,
    playerOneSelectedCountriesNumber,
    playerTwoSelectedCountriesContainerId,
    playerTwoSelectedCountriesNumber,
    playerMapLabel,
    latLon,
    defaultZoomLevel = 2.4
  ) {
    document.getElementById(this.mapId).innerHTML = `<div
        id="map"
        style="
          background-color: #99d9f2;
          width: 100vw;
          height: 100vh;
          position: fixed;
        "
      ></div>`;
    function centerMap(e) {
      this.map.panTo(e.latlng);
    }
    function zoomIn() {
      this.map.zoomIn();
    }

    function zoomOut() {
      this.map.zoomOut();
    }
    function reset() {
      this.map.fitBounds(WORLD_MAP_BOUNDS, { animate: false });
    }
    function gameRules() {
      this.gameRulesFunction();
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
    this.map = L.map("map", {
      attributionControl: false,
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
        "-",
        {
          text: localization[model.worldCountries.language]["Game Rules"],
          callback: gameRules,
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
        forcePseudoFullscreen: false,
        addFullScreen: true,
        zoomResetFunction: reset.bind(this),
      },
      maxBounds: [
        [85.1217211716937, 270.48437500000003],
        [-86.37146534864254, -250.27343750000003],
      ],
    })
      .fitWorld()
      .setView(latLon, defaultZoomLevel);
    L.control.layers(baseMaps).setPosition("topleft").addTo(this.map);
    L.Control.playerOneScoreField = L.Control.extend({
      onAdd: function (map) {
        const playerOneScoreField = L.DomUtil.create("div");
        playerOneScoreField.id = "player-one-score-field";
        playerOneScoreField.style.backgroundColor = "white";
        playerOneScoreField.style.boxShadow =
          "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
        playerOneScoreField.style.paddingRight = "3px";
        playerOneScoreField.style.width = "50px";
        playerOneScoreField.classList.add("text-center");
        playerOneScoreField.style.paddingLeft = "3px";
        playerOneScoreField.style.paddingTop = "2px";
        playerOneScoreField.style.paddingBottom = "2px";
        playerOneScoreField.style.fontSize = "0.7rem";
        playerOneScoreField.style.opacity = "0.7";
        playerOneScoreField.style.borderRadius = "2px";
        playerOneScoreField.style.fontWeight = "bolder";
        playerOneScoreField.style.marginTop = "5px";
        playerOneScoreField.style.color = "green";
        playerOneScoreField.textContent = "🏅 0";
        playerOneScoreField.title =
          localization[model.worldCountries.language]["Score"];
        return playerOneScoreField;
      },
      onRemove: function (map) {},
    });
    L.control.playeronescorefield = function (opts) {
      return new L.Control.playerOneScoreField(opts);
    };
    L.control.playeronescorefield({ position: "topleft" }).addTo(this.map);
    L.Control.PlayerOneCountriesField = L.Control.extend({
      gameConfiguration: this.gameConfiguration,
      cleanFunction: this.cleanSelection.bind(this),
      randomFunction: this.reandomCountriesSelection.bind(this),
      onAdd: function (map) {
        const container = L.DomUtil.create("div");
        container.id = playerOneSelectedCountriesContainerId;
        container.classList.add("text-center");
        container.style.width = "50px";
        container.style.backgroundColor = "white";
        container.style.opacity = "0.7";
        container.style.borderRadius = "2px";
        container.style.boxShadow =
          "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
        const userIconContainer = L.DomUtil.create("span");
        userIconContainer.textContent = "🧑";
        const userCountriesNumber = L.DomUtil.create("span");
        userCountriesNumber.style.marginLeft = "5px";
        userCountriesNumber.id = playerOneSelectedCountriesNumber;
        userCountriesNumber.style.fontWeight = "bolder";
        userCountriesNumber.style.color = "darkblue";
        userCountriesNumber.textContent = "0";
        container.appendChild(userIconContainer);
        container.appendChild(userCountriesNumber);
        const random = L.DomUtil.create("div");
        random.style.height = "23px";
        random.style.display = "flex";
        random.style.justifyContent = "center";
        random.style.alignItems = "center";
        random.style.cursor = "pointer";
        random.title =
          localization[model.worldCountries.language][
            "Random Countries Selection"
          ];
        random.id = "random-user-countries-selection";
        random.style.borderTop = "1px dotted black";
        random.textContent = "🎲";
        random.addEventListener("click", this.randomFunction);
        random.addEventListener("mouseover", () => {
          random.style.backgroundColor = "lightgreen";
        });
        random.addEventListener("mouseout", () => {
          random.style.backgroundColor = "white";
        });
        const clean = L.DomUtil.create("div");
        clean.style.height = "23px";
        clean.style.display = "flex";
        clean.style.justifyContent = "center";
        clean.style.alignItems = "center";
        clean.style.cursor = "pointer";
        clean.title = localization[model.worldCountries.language]["Clean"];
        clean.id = "clean-user-countries-selection";
        clean.style.borderTop = "1px dotted black";
        clean.textContent = "🗑️";
        clean.addEventListener("click", this.cleanFunction);
        clean.addEventListener("mouseover", () => {
          clean.style.backgroundColor = "red";
        });
        clean.addEventListener("mouseout", () => {
          clean.style.backgroundColor = "white";
        });
        container.insertAdjacentHTML(
          "beforeend",
          this.gameConfiguration.countriesUnionsHtml
        );
        container.appendChild(random);
        container.appendChild(clean);
        return container;
      },
      onRemove: function (map) {},
    });
    L.control.playerOneCountriesField = function (opts) {
      return new L.Control.PlayerOneCountriesField(opts);
    };
    L.control.playerOneCountriesField({ position: "topleft" }).addTo(this.map);
    L.Control.MessageField = L.Control.extend({
      onAdd: function (map) {
        const messageField = L.DomUtil.create("div");
        messageField.id = "countries-battle-game-message";
        messageField.classList.add("text-center");
        messageField.style.backgroundColor = "white";
        messageField.style.border = "rgba(0, 0, 0, 0.2) 0px solid";
        messageField.style.opacity = "0.9";
        messageField.style.fontWeight = "bolder";
        messageField.style.fontSize = "0.85rem";
        messageField.style.padding = "3px";
        messageField.style.width = "100%";
        messageField.style.marginTop = "0px";
        messageField.style.overflow = "auto";
        messageField.style.fontFamily =
          "Cambria, Cochin, Georgia, Times,Times New Roman, serif";
        messageField.style.boxShadow =
          "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
        messageField.textContent =
          localization[model.worldCountries.language][
            "Choose one alliance from four countries"
          ];
        return messageField;
      },

      onRemove: function (map) {},
    });
    L.control.messagefield = function (opts) {
      return new L.Control.MessageField(opts);
    };
    L.control.messagefield({ position: "topcenter" }).addTo(this.map);
    if (this.gameConfiguration.gameMode === "user") {
      L.Control.OpponentConnectionField = L.Control.extend({
        onAdd: function (map) {
          const opponentConnectionField = L.DomUtil.create("div");
          opponentConnectionField.id = "opponent-connection-field";
          opponentConnectionField.style.backgroundColor = "white";
          opponentConnectionField.style.boxShadow =
            "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
          opponentConnectionField.style.paddingRight = "3px";
          opponentConnectionField.style.paddingLeft = "3px";
          opponentConnectionField.style.fontSize = "0.5rem";
          opponentConnectionField.style.opacity = "0.7";
          opponentConnectionField.style.borderRadius = "2px";
          opponentConnectionField.style.fontWeight = "bolder";
          opponentConnectionField.style.marginTop = "10px";
          const opponentConnectionIndicator = L.DomUtil.create("span");
          opponentConnectionIndicator.id = "opponent-connection-indicator";
          opponentConnectionIndicator.style.borderRadius = "50%";
          opponentConnectionIndicator.style.border = "1px solid grey";
          opponentConnectionIndicator.style.marginRight = "3px";
          opponentConnectionIndicator.style.boxShadow =
            "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
          opponentConnectionIndicator.style.width = "7px";
          opponentConnectionIndicator.style.height = "7px";
          opponentConnectionIndicator.style.verticalAlign = "middle";
          opponentConnectionIndicator.style.display = "inline-block";
          opponentConnectionIndicator.style.backgroundColor = "red";
          const opponentConnectionText = L.DomUtil.create("span");
          opponentConnectionText.id = "opponent-connection-text";
          opponentConnectionText.style.color = "red";
          opponentConnectionText.textContent =
            localization[model.worldCountries.language][
              "Opponent is not online"
            ];
          opponentConnectionField.appendChild(opponentConnectionIndicator);
          opponentConnectionField.appendChild(opponentConnectionText);
          return opponentConnectionField;
        },
        onRemove: function (map) {},
      });
      L.control.opponentconnectionfield = function (opts) {
        return new L.Control.OpponentConnectionField(opts);
      };
      L.control
        .opponentconnectionfield({ position: "topcenter" })
        .addTo(this.map);
      L.Control.Chat = L.Control.extend({
        chatButtonFunction: this.chatButtonHandler.bind(this),
        chatMessage: this.sendChatMessage.bind(this),
        onAdd: function (map) {
          const chat = L.DomUtil.create("div");
          chat.id = "chat";
          chat.style.width = "100%";
          chat.style.marginBottom = "0px";
          chat.classList.add("text-center");
          const chatButton = L.DomUtil.create("div");
          chatButton.id = "chat-button";
          chatButton.style.backgroundColor = "white";
          chatButton.style.color = "darkblue";
          chatButton.style.cursor = "pointer";
          chatButton.style.boxShadow =
            "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
          chatButton.style.fontSize = "0.75rem";
          chatButton.style.opacity = "0.7";
          chatButton.style.width = "20%";
          chatButton.style.fontWeight = "bolder";
          chatButton.style.marginBottom = "0px";
          chatButton.style.display = "inline-block";
          chatButton.style.borderTopLeftRadius = "5px";
          chatButton.style.borderTopRightRadius = "5px";
          chatButton.classList.add("text-center");
          const chatButtonLeftArrow = L.DomUtil.create("span");
          chatButtonLeftArrow.id = "chat-button-left-arrow";
          chatButtonLeftArrow.textContent = "⬆";
          chatButtonLeftArrow.style.marginRight = "5px";
          const chatButtonText = L.DomUtil.create("span");
          chatButtonText.id = "chat-button-text";
          chatButtonText.textContent =
            localization[model.worldCountries.language]["CHAT"];
          const chatButtonRightArrow = L.DomUtil.create("span");
          chatButtonRightArrow.id = "chat-button-right-arrow";
          chatButtonRightArrow.textContent = "⬆";
          chatButtonRightArrow.style.marginLeft = "5px";
          const chatContainer = L.DomUtil.create("div");
          chatContainer.id = "chat-container";
          chatContainer.classList.add("not-displayed");
          chatContainer.style.backgroundColor = "white";
          chatContainer.style.color = "darkblue";
          chatContainer.style.boxShadow =
            "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
          chatContainer.style.fontSize = "0.7rem";
          chatContainer.style.opacity = "0.7";
          chatContainer.style.width = "100%";
          chatContainer.style.fontWeight = "bolder";
          chatContainer.style.marginBottom = "0px";
          const chatMessageFromOpponent = L.DomUtil.create("input");
          chatMessageFromOpponent.id = "chat-message-from-opponent";
          chatMessageFromOpponent.readOnly = true;
          chatMessageFromOpponent.placeholder =
            "🧓 " +
            localization[model.worldCountries.language][
              "Message From Opponent"
            ];
          chatMessageFromOpponent.ariaReadonly = true;
          chatMessageFromOpponent.style.width = "100%";
          chatMessageFromOpponent.style.border = "0px";
          chatMessageFromOpponent.style.borderTop = "1px dotted black";
          chatMessageFromOpponent.style.overflowX = "hidden";
          const chatMessageToOpponentContainer = L.DomUtil.create("div");
          chatMessageToOpponentContainer.style.display = "flex";
          const chatMessageToOpponent = L.DomUtil.create("input");
          chatMessageToOpponent.id = "chat-message-to-opponent";
          chatMessageToOpponent.type = "text";
          chatMessageToOpponent.placeholder =
            "✉️ " +
            localization[model.worldCountries.language][
              "Type Your Message Here... (max. length 300 characters)"
            ];
          chatMessageToOpponent.style.width = "90%";
          chatMessageToOpponent.style.border = "0px";
          chatMessageToOpponent.style.borderTop = "1px solid black";
          chatMessageToOpponent.style.borderRight = "1px solid black";
          chatMessageToOpponent.maxLength = 300;
          chatMessageToOpponent.style.overflowX = "hidden";
          const chatMessageToOpponentButton = L.DomUtil.create("input");

          chatMessageToOpponentButton.type = "button";
          chatMessageToOpponentButton.id = "chat-message-to-opponent-button";
          chatMessageToOpponentButton.value = `📩`;
          chatMessageToOpponentButton.style.width = "10%";
          chatMessageToOpponentButton.style.backgroundColor = "white";
          chatMessageToOpponentButton.style.border = "0px";
          chatMessageToOpponentButton.style.borderTop = "1px solid black";
          chatMessageToOpponentButton.style.boxShadow =
            "rgba(0, 0, 0, 0.5) 0px 1px 5px, rgba(0, 0, 0, 0.12) 0px 1px 5px inset";
          chatMessageToOpponentButton.title =
            localization[model.worldCountries.language]["Send Message"];
          chatMessageToOpponentButton.addEventListener(
            "click",
            this.chatMessage
          );
          chatMessageToOpponentButton.addEventListener("mouseover", () => {
            chatMessageToOpponentButton.style.backgroundColor = "#25cff2";
          });
          chatMessageToOpponentButton.addEventListener("mouseout", () => {
            chatMessageToOpponentButton.style.backgroundColor = "white";
          });
          chatMessageToOpponent.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              this.chatMessage();
            }
          });
          chatMessageToOpponentContainer.appendChild(chatMessageToOpponent);
          chatMessageToOpponentContainer.appendChild(
            chatMessageToOpponentButton
          );
          chat.appendChild(chatButton);
          chat.appendChild(chatContainer);
          chatContainer.appendChild(chatMessageFromOpponent);
          chatContainer.appendChild(chatMessageToOpponentContainer);
          chatButton.appendChild(chatButtonLeftArrow);
          chatButton.appendChild(chatButtonText);
          chatButton.appendChild(chatButtonRightArrow);
          chatButton.addEventListener("click", this.chatButtonFunction);
          return chat;
        },
        onRemove: function (map) {},
      });
      L.control.chat = function (opts) {
        return new L.Control.Chat(opts);
      };
      L.control.chat({ position: "bottomcenter" }).addTo(this.map);
    }
    L.Control.MapField = L.Control.extend({
      onAdd: function (map) {
        const mapFiled = L.DomUtil.create("div");
        mapFiled.id = "map-field";
        mapFiled.style.backgroundColor = "white";
        mapFiled.style.boxShadow =
          "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
        mapFiled.style.paddingRight = "3px";
        mapFiled.style.paddingLeft = "3px";
        mapFiled.style.fontSize = "0.7rem";
        mapFiled.style.opacity = "0.7";
        mapFiled.style.borderRadius = "2px";
        mapFiled.style.fontWeight = "bolder";
        mapFiled.style.marginTop = "15px";
        mapFiled.style.color = "darkblue";
        mapFiled.textContent =
          "🗺️ " + localization[model.worldCountries.language][playerMapLabel];
        return mapFiled;
      },
      onRemove: function (map) {},
    });
    L.control.mapfield = function (opts) {
      return new L.Control.MapField(opts);
    };
    L.control.mapfield({ position: "topcenter" }).addTo(this.map);
    L.Control.SelectedCountryField = L.Control.extend({
      onAdd: function (map) {
        const selectedCountryField = L.DomUtil.create("div");
        selectedCountryField.id = "selected-country-field";
        selectedCountryField.style.backgroundColor = "white";
        selectedCountryField.style.boxShadow =
          "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
        selectedCountryField.style.paddingRight = "3px";
        selectedCountryField.style.paddingLeft = "3px";
        selectedCountryField.style.paddingTop = "2px";
        selectedCountryField.style.paddingBottom = "2px";
        selectedCountryField.style.fontSize = "0.5rem";
        selectedCountryField.style.opacity = "0.7";
        selectedCountryField.style.borderRadius = "2px";
        selectedCountryField.style.fontWeight = "bolder";
        selectedCountryField.style.marginTop = "10px";
        selectedCountryField.style.color = "darkblue";
        selectedCountryField.innerHTML = "";
        return selectedCountryField;
      },
      onRemove: function (map) {},
    });
    L.control.selectedcountryfield = function (opts) {
      return new L.Control.SelectedCountryField(opts);
    };
    L.control.selectedcountryfield({ position: "topcenter" }).addTo(this.map);
    L.Control.CountriesField = L.Control.extend({
      onAdd: function (map) {
        const countriesField = L.DomUtil.create("div");
        countriesField.id = "countries-field";
        countriesField.style.backgroundColor = "white";
        countriesField.style.color = "darkblue";
        countriesField.style.boxShadow =
          "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
        countriesField.style.paddingRight = "3px";
        countriesField.style.paddingLeft = "3px";
        countriesField.style.opacity = "0.7";
        countriesField.style.borderRadius = "2px";
        countriesField.style.fontWeight = "bolder";
        countriesField.style.fontSize = "0.5rem";
        countriesField.style.marginTop = "50px";
        countriesField.textContent =
          "🌍 " +
          localization[model.worldCountries.language]["Available Countries:"] +
          " ";
        const countriesNumberField = L.DomUtil.create("span");
        countriesNumberField.id = "countries-number-field";
        countriesField.appendChild(countriesNumberField);
        return countriesField;
      },
      onRemove: function (map) {},
    });
    L.control.countriesfield = function (opts) {
      return new L.Control.CountriesField(opts);
    };
    L.control.countriesfield({ position: "topright" }).addTo(this.map);
    L.Control.PlayButton = L.Control.extend({
      playFunction: this.playGameHandler.bind(this),
      onAdd: function (map) {
        const playButton = L.DomUtil.create("button");
        playButton.classList.add("btn");
        playButton.classList.add("btn-sm");
        playButton.classList.add("btn-danger");
        playButton.classList.add("guess-country-game-play");
        playButton.classList.add("rounded-pill");
        playButton.style.marginTop = "12px";
        playButton.style.marginBottom = "6px";
        playButton.style.paddinTop = "0.35rem";
        playButton.style.paddinBottom = "0.35rem";
        playButton.style.fontSize = "0.8rem";
        playButton.style.boxShadow =
          "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
        playButton.disabled = true;
        playButton.textContent =
          localization[model.worldCountries.language]["Play"];
        playButton.addEventListener("click", this.playFunction);
        return playButton;
      },

      onRemove: function (map) {},
    });
    L.control.playbutton = function (opts) {
      return new L.Control.PlayButton(opts);
    };
    L.control.playbutton({ position: "topright" }).addTo(this.map);
    L.Control.FinishButton = L.Control.extend({
      finishFunction: this.finishGameHandler.bind(this, true, false),
      onAdd: function (map) {
        const finishButton = L.DomUtil.create("button");
        finishButton.classList.add("btn");
        finishButton.classList.add("btn-sm");
        finishButton.classList.add("btn-primary");
        finishButton.classList.add("guess-country-game-finish");
        finishButton.classList.add("rounded-pill");
        finishButton.style.marginTop = "8px";
        finishButton.style.fontSize = "0.8rem";
        finishButton.style.marginBottom = "7px";
        finishButton.style.boxShadow =
          "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
        finishButton.style.paddinTop = "0.35rem";
        finishButton.style.paddinBottom = "0.35rem";
        finishButton.textContent =
          localization[model.worldCountries.language]["Finish"];
        finishButton.addEventListener("click", this.finishFunction);
        return finishButton;
      },
      onRemove: function (map) {},
    });
    L.control.finishbutton = function (opts) {
      return new L.Control.FinishButton(opts);
    };
    L.control.finishbutton({ position: "topright" }).addTo(this.map);
    L.Control.GameRulesButton = L.Control.extend({
      gameRulesFunction: this.gameRulesFunction.bind(this),
      onAdd: function (map) {
        const gameRulesButton = L.DomUtil.create("button");
        gameRulesButton.classList.add("btn");
        gameRulesButton.classList.add("btn-sm");
        gameRulesButton.classList.add("btn-secondary");
        gameRulesButton.classList.add("guess-country-game-rules");
        gameRulesButton.classList.add("rounded-pill");
        gameRulesButton.style.marginTop = "9px";
        gameRulesButton.style.fontSize = "0.8rem";
        gameRulesButton.style.marginBottom = "7px";
        gameRulesButton.style.boxShadow =
          "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
        gameRulesButton.style.paddinTop = "0.35rem";
        gameRulesButton.style.paddinBottom = "0.35rem";
        gameRulesButton.textContent =
          localization[model.worldCountries.language]["Rules"];
        gameRulesButton.addEventListener("click", this.gameRulesFunction);
        return gameRulesButton;
      },
      onRemove: function (map) {},
    });
    L.control.gamerulesbutton = function (opts) {
      return new L.Control.GameRulesButton(opts);
    };
    L.control.gamerulesbutton({ position: "topright" }).addTo(this.map);
    L.Control.AvailableCountriesPanel = L.Control.extend({
      onAdd: function (map) {
        const availableCountriesPanel = L.DomUtil.create("div");
        availableCountriesPanel.id = "available-countries-panel";
        availableCountriesPanel.classList.add("not-displayed");
        availableCountriesPanel.style.backgroundColor = "white";
        availableCountriesPanel.style.opacity = "0.7";
        availableCountriesPanel.style.borderRadius = "2px";
        availableCountriesPanel.style.boxShadow =
          "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
        availableCountriesPanel.style.marginTop = "5px";
        availableCountriesPanel.style.padding = "3px";
        availableCountriesPanel.style.width = "fit-content";
        availableCountriesPanel.style.overflow = "hidden";
        const availableCountriesHeader = `<div class="text-center"><span style="font-size:0.7rem; font-weight:bold;">🌍 ${
          localization[model.worldCountries.language]["Available Countries:"]
        }</span></div>`;
        availableCountriesPanel.insertAdjacentHTML(
          "beforeend",
          availableCountriesHeader
        );
        const availableCountriesPanelContent = L.DomUtil.create("div");
        availableCountriesPanelContent.id = "available-countries-panel-content";
        availableCountriesPanel.appendChild(availableCountriesPanelContent);

        return availableCountriesPanel;
      },
      onRemove: function (map) {},
    });
    L.control.availablecountriespanel = function (opts) {
      return new L.Control.AvailableCountriesPanel(opts);
    };
    L.control
      .availablecountriespanel({ position: "bottomcenter" })
      .addTo(this.map);
    L.Control.HintsPanel = L.Control.extend({
      onAdd: function (map) {
        const hintsPanel = L.DomUtil.create("div");
        hintsPanel.id = "hints-panel";
        hintsPanel.classList.add("not-displayed");
        hintsPanel.style.backgroundColor = "white";
        hintsPanel.style.opacity = "0.7";
        hintsPanel.style.width = "fit-content";
        hintsPanel.style.borderRadius = "2px";
        hintsPanel.style.boxShadow =
          "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
        hintsPanel.style.marginTop = "10px";
        hintsPanel.style.padding = "3px";
        hintsPanel.style.overflow = "hidden";
        hintsPanel.style.fontSize = "0.7rem;";
        const hintsPanelsHeader = `<div class="text-center"><span style="font-size:0.7rem;font-weight:bold;">💡 ${
          localization[model.worldCountries.language]["Hints:"]
        }</span></div>`;
        hintsPanel.insertAdjacentHTML("beforeend", hintsPanelsHeader);
        const hintsPanelContent = L.DomUtil.create("div");
        hintsPanelContent.id = "hints-panel-content";
        hintsPanel.appendChild(hintsPanelContent);

        return hintsPanel;
      },
      onRemove: function (map) {},
    });
    L.control.hintspanel = function (opts) {
      return new L.Control.HintsPanel(opts);
    };
    L.control.hintspanel({ position: "topcenter" }).addTo(this.map);
    L.Control.GuessedCountryAlliancePanel = L.Control.extend({
      onAdd: function (map) {
        const guessedCountryAlliancePanel = L.DomUtil.create("div");
        guessedCountryAlliancePanel.id = "guessed-country-alliance-panel";
        guessedCountryAlliancePanel.classList.add("not-displayed");
        guessedCountryAlliancePanel.style.backgroundColor = "white";
        guessedCountryAlliancePanel.style.opacity = "0.9";
        guessedCountryAlliancePanel.style.width = "fit-content";
        guessedCountryAlliancePanel.style.borderRadius = "2px";
        guessedCountryAlliancePanel.style.boxShadow =
          "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
        guessedCountryAlliancePanel.style.marginTop = "10px";
        guessedCountryAlliancePanel.style.padding = "5px";
        guessedCountryAlliancePanel.style.overflow = "hidden";
        guessedCountryAlliancePanel.style.fontSize = "0.7rem;";
        const guessedCountryAlliancePanelHeader = `<div id="guessed-country-alliance-header" class="text-center"><span style="font-size:0.75rem;font-weight:bold;color:green;">👏 ${
          localization[model.worldCountries.language]["Congratulations!"]
        }</span></div>`;
        guessedCountryAlliancePanel.insertAdjacentHTML(
          "beforeend",
          guessedCountryAlliancePanelHeader
        );
        const guessedCountryAlliancePanelContent = L.DomUtil.create("div");
        guessedCountryAlliancePanelContent.classList.add("text-center");
        guessedCountryAlliancePanelContent.id =
          "guessed-country-alliance-panel-content";
        guessedCountryAlliancePanel.appendChild(
          guessedCountryAlliancePanelContent
        );

        return guessedCountryAlliancePanel;
      },
      onRemove: function (map) {},
    });
    L.control.guessedcountryalliancepanel = function (opts) {
      return new L.Control.GuessedCountryAlliancePanel(opts);
    };
    L.control
      .guessedcountryalliancepanel({ position: "topcenter" })
      .addTo(this.map);
    L.Control.playerTwoScoreField = L.Control.extend({
      onAdd: function (map) {
        const playerTwoScoreField = L.DomUtil.create("div");
        playerTwoScoreField.id = "player-two-score-field";
        playerTwoScoreField.style.backgroundColor = "white";
        playerTwoScoreField.style.boxShadow =
          "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
        playerTwoScoreField.style.paddingRight = "3px";
        playerTwoScoreField.style.width = "50px";
        playerTwoScoreField.classList.add("text-center");
        playerTwoScoreField.style.paddingLeft = "3px";
        playerTwoScoreField.style.paddingTop = "2px";
        playerTwoScoreField.style.paddingBottom = "2px";
        playerTwoScoreField.style.fontSize = "0.7rem";
        playerTwoScoreField.style.opacity = "0.7";
        playerTwoScoreField.style.borderRadius = "2px";
        playerTwoScoreField.style.fontWeight = "bolder";
        playerTwoScoreField.style.marginTop = "8px";
        playerTwoScoreField.style.color = "green";
        playerTwoScoreField.textContent = "🏅 0";
        playerTwoScoreField.title =
          localization[model.worldCountries.language]["Score"];
        return playerTwoScoreField;
      },
      onRemove: function (map) {},
    });
    L.control.playertwoscorefield = function (opts) {
      return new L.Control.playerTwoScoreField(opts);
    };
    L.control.playertwoscorefield({ position: "topright" }).addTo(this.map);
    L.Control.PlayerTwoCountriesField = L.Control.extend({
      gameConfiguration: this.gameConfiguration,
      onAdd: function (map) {
        const container = L.DomUtil.create("div");
        container.id = playerTwoSelectedCountriesContainerId;
        container.classList.add("text-center");
        container.style.width = "50px";
        container.style.marginTop = "5px";
        container.style.backgroundColor = "white";
        container.style.opacity = "0.7";
        container.style.borderRadius = "2px";
        container.style.boxShadow =
          "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
        const userIconContainer = L.DomUtil.create("span");
        if (this.gameConfiguration.gameMode === "computer") {
          userIconContainer.textContent = "🖥️";
        } else {
          userIconContainer.textContent = "🧓";
        }
        const userCountriesNumber = L.DomUtil.create("span");
        userCountriesNumber.style.marginLeft = "5px";
        userCountriesNumber.id = playerTwoSelectedCountriesNumber;
        userCountriesNumber.style.fontWeight = "bolder";
        userCountriesNumber.style.color = "darkblue";
        userCountriesNumber.textContent = "0";
        container.appendChild(userIconContainer);
        container.appendChild(userCountriesNumber);

        container.insertAdjacentHTML(
          "beforeend",
          this.gameConfiguration.countriesUnionsHtml
        );
        return container;
      },
      onRemove: function (map) {},
    });
    L.control.playerTwoCountriesField = function (opts) {
      return new L.Control.PlayerTwoCountriesField(opts);
    };
    L.control.playerTwoCountriesField({ position: "topright" }).addTo(this.map);
    this.map.fitBounds(WORLD_MAP_BOUNDS, { animate: false });
  }

  setGame(gameInstanse) {
    this.game = gameInstanse;
  }

  setPlayerOne(playerOneInstance) {
    this.playerOne = playerOneInstance;
  }

  setPlayerTwo(playerTwoInstance) {
    this.playerTwo = playerTwoInstance;
  }

  cleanMap() {
    this.map.eachLayer(
      function (layer) {
        if (
          layer instanceof L.Marker ||
          layer instanceof L.Polyline ||
          layer instanceof L.Polygon ||
          layer instanceof L.GeoJSON
        ) {
          this.map.removeLayer(layer);
        }
      }.bind(this)
    );
  }

  cleanSelection() {
    this.playerOne.cleanSelection();
    const randomSection = document.getElementById(
      "random-user-countries-selection"
    );
    randomSection.style.display = "flex";
  }

  reandomCountriesSelection() {
    this.playerOne.randomCountrySelection();
    const randomSection = document.getElementById(
      "random-user-countries-selection"
    );
    randomSection.style.display = "none";
  }

  exitFullScreen() {
    if (this.map && this.map._isFullscreen) {
      this.map.fullscreenControl._screenfull
        .exit()
        .then(() => this.map.invalidateSize());
    }
  }

  gameRulesFunction() {
    this.exitFullScreen();
    this.game.showGameRules();
  }

  sendChatMessage() {
    const messageInput = document.getElementById("chat-message-to-opponent");
    let sent = false;
    if (messageInput && messageInput.value !== "") {
      sent = this.game.sendChatMessage(messageInput.value);
    }
    if (!sent && messageInput.value !== "") {
      document.getElementById("chat-message-from-opponent").value =
        "🧓: " +
        localization[model.worldCountries.language][
          "Opponent has not yet entered the game room to read your messages. Try sending a message later"
        ];
    }
    messageInput.value = "";
    messageInput.focus();
  }

  chatButtonHandler() {
    const chat = document.getElementById("chat-container");
    const inputField = document.getElementById("chat-message-to-opponent");
    const chatButtonLeftArrow = document.getElementById(
      "chat-button-left-arrow"
    );
    if (chatButtonLeftArrow.textContent === "⬆") {
      chatButtonLeftArrow.textContent = "⬇";
    } else {
      chatButtonLeftArrow.textContent = "⬆";
    }
    const chatButtonRightArrow = document.getElementById(
      "chat-button-right-arrow"
    );
    if (chatButtonRightArrow.textContent === "⬆") {
      chatButtonRightArrow.textContent = "⬇";
    } else {
      chatButtonRightArrow.textContent = "⬆";
    }
    chat.classList.toggle("not-displayed");
    inputField.focus();
  }

  finishGameHandler(useConfirm, deleteGameRoom) {
    if (useConfirm) {
      const confirmExit = confirm(
        "❓ " +
          localization[model.worldCountries.language][
            "Are you sure you want to leave this game?"
          ]
      );
      if (confirmExit) {
        document.getElementById(
          "only-independent-countries-checkbox"
        ).checked = true;
        document.getElementById(
          "only-independent-countries-checkbox-game-room"
        ).checked = true;
        this.game.finishGame(deleteGameRoom);
      }
    } else {
      document.getElementById(
        "only-independent-countries-checkbox"
      ).checked = true;
      document.getElementById(
        "only-independent-countries-checkbox-game-room"
      ).checked = true;
      this.game.finishGame(deleteGameRoom);
    }
  }

  setSelectedCountryFiledHtml(content) {
    const selectedCountryField = document.getElementById(
      "selected-country-field"
    );
    selectedCountryField.innerHTML = "";
    selectedCountryField.innerHTML = content;
  }

  setMapFiledLabel(label) {
    document.getElementById("map-field").textContent =
      "🗺️ " + localization[model.worldCountries.language][label];
  }

  showMapElement(elementId) {
    document.getElementById(elementId).classList.remove("not-displayed");
  }

  hideMapElement(elementId) {
    document.getElementById(elementId).classList.add("not-displayed");
  }

  initSelectionCountriesMapView() {
    document.querySelector(".guess-country-game-play").disabled = true;
    const cleanSection = document.getElementById(
      "clean-user-countries-selection"
    );
    cleanSection.style.display = "flex";
    const randomSection = document.getElementById(
      "random-user-countries-selection"
    );
    randomSection.style.display = "flex";
    document.getElementById("countries-number-field").textContent =
      this.countriesNumber;
    document.getElementById("hints-panel").classList.add("not-displayed");
    document
      .getElementById("selected-country-field")
      .classList.remove("not-displayed");
    document
      .getElementById("available-countries-panel")
      .classList.add("not-displayed");
  }

  initStartPlayMapView() {
    document.querySelector(".guess-country-game-play").disabled = true;
    const cleanSection = document.getElementById(
      "clean-user-countries-selection"
    );
    cleanSection.style.display = "none";
    const randomSection = document.getElementById(
      "random-user-countries-selection"
    );
    randomSection.style.display = "none";
    document.getElementById("countries-number-field").textContent =
      this.countriesNumber;
    document.getElementById("hints-panel").classList.add("not-displayed");
    document
      .getElementById("available-countries-panel")
      .classList.add("not-displayed");
    document
      .getElementById("selected-country-field")
      .classList.add("not-displayed");
  }

  playGameHandler() {
    this.game.startGame();
  }
}
