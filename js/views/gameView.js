import { GEOGRAPHICAL_CENTER } from "../config.js";
import { GameConfig } from "../gameConfig.js";
import { Game } from "../game.js";
import { Player } from "../player.js";
import { PlayMap } from "../playMap.js";
import { showModalWindow, hideModalWindow } from "../helpers.js";
import * as model from "../model.js";
import { localization } from "../localization/ua.js";
class gameView {
  _parentElement = document.querySelector("#countriesBattleGamePlay");
  _gameMessageField = document.querySelector(".countries-battle-game-message");
  _gameModalCountriesSelectionHeader = document.getElementById(
    "gameCountryAllianceInitialSelectionLabel",
  );
  _gameModalCountriesSelectionContent = document.getElementById(
    "gameCountryAllianceInitialSelectionCountries",
  );
  _gameModalCountriesSelectionRandomButton = document.getElementById(
    "gameCountryAllianceInitialSelectionRandomButton",
  );
  _gameModalCountriesSelectionRandomButtonText = document.getElementById(
    "gameCountryAllianceInitialSelectionRandomButtonText",
  );
  _gameModalCountriesSelectionUserButton = document.getElementById(
    "gameCountryAllianceInitialSelectionUserButton",
  );
  _gameCountryAllianceInitialSelectionTutorialButton = document.getElementById(
    "gameCountryAllianceInitialSelectionTutorialButton",
  );
  _videoTutorialButtonListenerAdded = false;
  _gameConfiguration;
  _playMap;
  _playerOne;
  _playerTwo;
  _game;

  initGameView(firebase) {
    this._gameConfiguration = new GameConfig("default");
    this._playMap = new PlayMap(
      "playMap",
      this._gameConfiguration,
      "player-one-selected-countries-container",
      "player-one-countries-number",
      "player-two-selected-countries-container",
      "player-two-countries-number",
      "Your Map",
      GEOGRAPHICAL_CENTER,
    );
    this._playerOne = new Player(
      this._playMap,
      "player-one-selected-countries-container",
      "player-one-countries-number",
      this._gameConfiguration,
      "userPlayer",
    );
    this._playerTwo = new Player(
      this._playMap,
      "player-two-selected-countries-container",
      "player-two-countries-number",
      this._gameConfiguration,
      this._gameConfiguration.gameMode === "computer"
        ? "computerPlayer"
        : "friendPlayer",
    );
    this._playerOne.setOpponentPlayer(this._playerTwo);
    this._playerTwo.setOpponentPlayer(this._playerOne);
    this._game = new Game(
      this._playerOne,
      this._playerTwo,
      this._playMap,
      this._gameConfiguration.gameMode === "computer" ? undefined : firebase,
      this._gameConfiguration,
    );
    firebase.setGame(this._game);
    this._playMap.setGame(this._game);
    this._playMap.setPlayerOne(this._playerOne);
    this._playMap.setPlayerTwo(this._playerTwo);
    this._playerOne.setGame(this._game);
    this._playerTwo.setGame(this._game);
    this._playerOne.initData();
    this._playerTwo.initData();
    this._playerOne.requestSelectedCountriesFromOpponent();
  }

  showGame() {
    this._parentElement.classList.remove("not-displayed");
    this.showInitialCountriesSelectionWindow();
    this._playMap.map.invalidateSize();
  }

  showInitialCountriesSelectionWindow() {
    this._gameModalCountriesSelectionHeader.textContent =
      localization[model.worldCountries.language]["Countries Selection"];
    this._gameModalCountriesSelectionContent.textContent =
      localization[model.worldCountries.language][
        "To play the game, choose ten different alliances of countries on the map and four trap-countries for your opponent. Follow the instructions at the top of the screen. To read the rules of the game, click the Rules button. We wish you a great game and a victory!"
      ] + " 🏆";
    this._gameModalCountriesSelectionUserButton.textContent =
      "🗺️ " +
      localization[model.worldCountries.language]["Choose Countries On Map"];
    this._gameModalCountriesSelectionRandomButtonText.textContent =
      localization[model.worldCountries.language]["Random Countries Selection"];
    this._gameCountryAllianceInitialSelectionTutorialButton.textContent =
      localization[model.worldCountries.language][
        "Country Alliances Selection — Video Tutorial"
      ];
    const videoTutorial = document.getElementById(
      "countryAllianceSelectionVideoTutorial",
    );
    videoTutorial.classList.add("not-displayed");
    const modal = document.getElementById(
      "gameCountryAllianceInitialSelectionModal",
    );
    modal.addEventListener(
      "hidden.bs.modal",
      () => {
        const video = document.getElementById("countryAllianceSelectionVideo");
        video.pause();
        video.currentTime = 0;
      },
      { once: true },
    );
    if (!this._videoTutorialButtonListenerAdded) {
      this._gameCountryAllianceInitialSelectionTutorialButton.addEventListener(
        "click",
        function () {
          videoTutorial.classList.toggle("not-displayed");
        }.bind(this),
      );
      this._videoTutorialButtonListenerAdded = true;
    }

    this._gameModalCountriesSelectionRandomButton.addEventListener(
      "click",
      async function () {
        const spinner = document.getElementById(
          "randomCountrySelectionLoaderSpinner",
        );
        document
          .getElementById("gameCountryAllianceInitialSelectionRandomEmoji")
          .classList.add("not-displayed");
        spinner.style.display = "inline-block";
        this._playMap.reandomCountriesSelection();
        await new Promise((resolve) => setTimeout(resolve, 300));
        spinner.style.display = "none";
        hideModalWindow("gameCountryAllianceInitialSelectionModal");
        document
          .getElementById("gameCountryAllianceInitialSelectionRandomEmoji")
          .classList.remove("not-displayed");
      }.bind(this),
      { once: true },
    );
    showModalWindow("gameCountryAllianceInitialSelectionModal");
  }

  hideGame() {
    this._parentElement.classList.add("not-displayed");
  }
}

export default new gameView();
