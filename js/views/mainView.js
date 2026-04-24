import { localization } from "../localization/ua.js";
import * as model from "../model.js";
class mainView {
  _parentElement = document.querySelector(".main-container");
  _aboutButton = document.querySelector("#about-button");
  _startButton = document.querySelector("#start-button");
  _playAgainButton = document.querySelector("#gameResultPlayButton");
  _startButtonText = document.querySelector("#startButtonText");
  _shareWebSite = document.querySelector("#shareWebSite");
  _supportProjectButton = document.querySelector("#support-project-button");
  _createGameRoomContainer = document.querySelector(
    "#create-game-room-container"
  );
  _onlyIndependentCountriesSelect = document.querySelector(
    "#only-independent-countries-select"
  );
  _hintsTypeSelect = document.querySelector("#hint-types-select");
  _hitTimeSelect = document.querySelector("#time-select");
  _bonusCountriesSelect = document.querySelector("#bonus-countries-select");
  _createGameRoomButton = document.querySelector("#create-game-room-button");
  _opponentLabel = document.querySelector("#opponent-label");
  _opponentLabelComputer = document.querySelector("#opponent-label-computer");
  _opponentLabelFriend = document.querySelector("#opponent-label-friend");
  _gameRoomIdLabel = document.querySelector("#game-room-heading-text");
  _opponentConnectionLabel = document.querySelector(
    "#opponent-connection-main-page-text"
  );
  _gameModeSlider = document.querySelector("#gameMode");
  _gameRulesButton = document.querySelector("#game-rules-button");
  _gameConfigurationHeader = document.querySelector(
    "#game-configuration-header"
  );
  _header = document.querySelector("header");
  _footer = document.querySelector("footer");

  _aboutButtonListenerAdded = false;
  _startButtonListenerAdded = false;
  _supportProjectListenerAdded = false;
  _gameRulesListenerAdded = false;
  _gameModeChangeListenerAdded = false;
  _gameRoomListenerAdded = false;
  _onlyIndependentCountriesListenerAdded = false;
  _hintsTypeListenerAdded = false;
  _hitTimeListenerAdded = false;
  _bonusCountriesSelectListenerAdded = false;

  async startGame(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView,
    gameRoomView
  ) {
    const rawParams = window.location.search;
    const cleanedParams = rawParams.replace(/[\u200B-\u200D\uFEFF]/g, "");
    const urlParams = new URLSearchParams(cleanedParams);
    const gameRoomId = urlParams.get("gameRoom");
    const firebase = gameRoomView.getFirebase();
    if (
      !gameRoomId &&
      !firebase.gameRoomId &&
      this._gameModeSlider.value !== "0"
    ) {
      alert(
        localization[model.worldCountries.language][
        "You have selected the game mode with a friend. First, create a game room. Click the 'Create Game Room' button."
        ]
      );
      return;
    }
    document.querySelector("#startButtonText").classList.add("not-displayed");
    document.querySelector("#startLoaderSpinner").classList.remove("not-displayed");
    this._startButton.disabled = true;
    aboutView.hideAboutProject();
    donateAuthorView.hideDonateProject();
    gameRulesView.hideGameRulesProject();
    gameRoomView.hideGameRoomProject();
    gameView.initGameView(firebase);
    await new Promise(resolve => setTimeout(resolve, 500));
    this.hideMain();
    this._header.classList.add("not-displayed");
    this._footer.classList.add("not-displayed");
    document.querySelector("#startLoaderSpinner").classList.add("not-displayed");
    document.querySelector("#startButtonText").classList.remove("not-displayed");
    gameView.showGame();
  }

  aboutProject(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView,
    gameRoomView
  ) {
    this.hideMain();
    aboutView.showAboutProject();
    donateAuthorView.hideDonateProject();
    gameRulesView.hideGameRulesProject();
    gameView.hideGame();
    gameRoomView.hideGameRoomProject();
    sessionStorage.setItem("currentWindow", "about-project");
    if (window.gtag) gtag("event", "about_project_view");
  }

  supportProject(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView,
    gameRoomView
  ) {
    this.hideMain();
    aboutView.hideAboutProject();
    donateAuthorView.showDonateProject();
    gameRulesView.hideGameRulesProject();
    gameRoomView.hideGameRoomProject();
    gameView.hideGame();
    sessionStorage.setItem("currentWindow", "donate-author");
    if (window.gtag) gtag("event", "donate_project_view");
  }

  gameRules(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView,
    gameRoomView
  ) {
    this.hideMain();
    aboutView.hideAboutProject();
    donateAuthorView.hideDonateProject();
    gameView.hideGame();
    gameRulesView.showGameRulesProject();
    gameRoomView.hideGameRoomProject();
    sessionStorage.setItem("currentWindow", "game-rules");
    if (window.gtag) gtag("event", "game_rules_view");
  }

  gameRoom(aboutView, gameView, donateAuthorView, gameRulesView, gameRoomView) {
    aboutView.hideAboutProject();
    donateAuthorView.hideDonateProject();
    gameView.hideGame();
    gameRulesView.hideGameRulesProject();
    this.hideMain();
    gameRoomView.showGameRoomProject();
    sessionStorage.setItem("currentWindow", "game-room");
    if (window.gtag) gtag("event", "game_room_view");
  }

  addOnlyIndependentCountriesListener() {
    if (!this._onlyIndependentCountriesListenerAdded) {
      this._onlyIndependentCountriesSelect.addEventListener("change", () => {
        document.getElementById(
          "only-independent-countries-game-room-select"
        ).value = this._onlyIndependentCountriesSelect.value;
      });
      this._onlyIndependentCountriesListenerAdded = true;
    }
  }

  addHintsTypeListener() {
    if (!this._hintsTypeListenerAdded) {
      this._hintsTypeSelect.addEventListener("change", () => {
        document.getElementById(
          "hint-types-game-room-select"
        ).value = this._hintsTypeSelect.value;
      });
      this._hintsTypeListenerAdded = true;
    }
  }

  addBonusCountriesListener() {
    if (!this._bonusCountriesSelectListenerAdded) {
      this._bonusCountriesSelect.addEventListener("change", () => {
        document.getElementById(
          "bonus-countries-game-room-select"
        ).value = this._bonusCountriesSelect.value;
      });
      this._bonusCountriesSelectListenerAdded = true;
    }
  }

  addHitTimeListener() {
    if (!this._hitTimeListenerAdded) {
      this._hitTimeSelect.addEventListener("change", () => {
        document.getElementById(
          "time-select-game-room"
        ).value = this._hitTimeSelect.value;
      });
      this._hitTimeListenerAdded = true;
    }
  }

  addGameRoomListenerHandler(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView,
    gameRoomView
  ) {
    if (!this._gameRoomListenerAdded) {
      this._createGameRoomButton.addEventListener(
        "click",
        this.gameRoom.bind(
          this,
          aboutView,
          gameView,
          donateAuthorView,
          gameRulesView,
          gameRoomView
        )
      );
      this._gameRoomListenerAdded = true;
    }
  }

  addGameModeChangeHandler(gameRoomView) {
    if (!this._gameModeChangeListenerAdded) {
      this._gameModeSlider.addEventListener("input", (event) => {
        sessionStorage.setItem("game-mode", event.target.value);
        if (event.target.value === "0") {
          this._createGameRoomContainer.classList.add("not-displayed");
          this._gameModeSlider.style.background = "#d0d0d0";
          gameRoomView.deleteGameRoom();
        } else {
          this._createGameRoomContainer.classList.remove("not-displayed");
          this._gameModeSlider.style.background = "#6495ed";
        }
      });
      this._gameModeChangeListenerAdded = true;
    }
  }

  async addStartGameHandlerClick(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView,
    gameRoomView
  ) {
    const rawParams = window.location.search;
    const cleanedParams = rawParams.replace(/[\u200B-\u200D\uFEFF]/g, "");
    const urlParams = new URLSearchParams(cleanedParams);
    const gameRoomId = urlParams.get("gameRoom");
    const firebase = gameRoomView.getFirebase();
    if (gameRoomId) {
      await firebase.initializeApplication();
      firebase.getApplicationDatabase();
      await firebase.createConnection();
      firebase.setIsHost(false);
      await firebase.joinGameRoom(gameRoomId);
      firebase.setGameRoomId(gameRoomId);
    }
    if (!this._startButtonListenerAdded) {
      this._startButton.addEventListener(
        "click",
        this.startGame.bind(
          this,
          aboutView,
          gameView,
          donateAuthorView,
          gameRulesView,
          gameRoomView
        )
      );
      this._playAgainButton.addEventListener(
        "click",
        this.startGame.bind(
          this,
          aboutView,
          gameView,
          donateAuthorView,
          gameRulesView,
          gameRoomView
        )
      );
      this._startButtonListenerAdded = true;
    }
  }

  addSupportProjectHandlerClick(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView,
    gameRoomView
  ) {
    if (!this._supportProjectListenerAdded) {
      this._supportProjectButton.addEventListener(
        "click",
        this.supportProject.bind(
          this,
          aboutView,
          gameView,
          donateAuthorView,
          gameRulesView,
          gameRoomView
        )
      );
      this._supportProjectListenerAdded = true;
    }
  }

  addGameRulesHandlerClick(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView,
    gameRoomView
  ) {
    if (!this._gameRulesListenerAdded) {
      this._gameRulesButton.addEventListener(
        "click",
        this.gameRules.bind(
          this,
          aboutView,
          gameView,
          donateAuthorView,
          gameRulesView,
          gameRoomView
        )
      );
      this._gameRulesListenerAdded = true;
    }
  }

  addAboutHandlerClick(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView,
    gameRoomView
  ) {
    if (!this._aboutButtonListenerAdded) {
      this._aboutButton.addEventListener(
        "click",
        this.aboutProject.bind(
          this,
          aboutView,
          gameView,
          donateAuthorView,
          gameRulesView,
          gameRoomView
        )
      );
      this._aboutButtonListenerAdded = true;
    }
  }

  showMain() {
    this._parentElement.classList.remove("not-displayed");
    this._parentElement.classList.add("d-grid");
    this._header.classList.remove("not-displayed");
    this._footer.classList.remove("not-displayed");
    this._startButton.disabled = false;
  }

  hideMain() {
    this._parentElement.classList.add("not-displayed");
    this._parentElement.classList.remove("d-grid");
  }

  translateElements() {
    this._gameConfigurationHeader.textContent = `🛠️ ${localization[model.worldCountries.language]["Game Configuration"]
      }`;
    const onlyIndependentOptions = Array.from(this._onlyIndependentCountriesSelect.options);
    onlyIndependentOptions.forEach((option) => {
      option.textContent =
        localization[model.worldCountries.language][option.value];
    });
    const hintTypeOptions = Array.from(this._hintsTypeSelect.options);
    hintTypeOptions.forEach((option) => {
      option.textContent =
        localization[model.worldCountries.language][option.value];
    });
    this._gameRulesButton.textContent = `📄 ${localization[model.worldCountries.language]["Game Rules"]
      }`;
    this._supportProjectButton.textContent = `🔗 ${localization[model.worldCountries.language]["Support Project"]
      }`;
    this._startButtonText.textContent = `${localization[model.worldCountries.language]["START"]
      }`;
    this._aboutButton.textContent = `${localization[model.worldCountries.language]["About Project"]
      }`;
    this._opponentLabel.textContent = `${localization[model.worldCountries.language]["Opponent"]
      }`;
    this._opponentLabelComputer.textContent = `${localization[model.worldCountries.language]["Computer"]
      }`;
    this._opponentLabelFriend.textContent = `${localization[model.worldCountries.language]["Friend"]
      }`;
    this._gameRoomIdLabel.textContent = `${localization[model.worldCountries.language]["Game Room ID:"]
      }`;
    this._opponentConnectionLabel.textContent = `${localization[model.worldCountries.language][
      this._opponentConnectionLabel.dataset.connection
    ]
      }`;
    this._createGameRoomButton.textContent = `🎮 ${localization[model.worldCountries.language][
      this._createGameRoomButton.dataset.text
    ]
      }`;
    this._shareWebSite.firstElementChild.textContent = `${localization[model.worldCountries.language]["Share"]
      }`;
  }
}

export default new mainView();
