import { localization } from "../localization/ua.js";
import * as model from "../model.js";
class mainView {
  _parentElement = document.querySelector(".main-container");
  _aboutButton = document.querySelector("#about-button");
  _startButton = document.querySelector("#start-button");
  _shareWebSite = document.querySelector("#shareWebSite");
  _supportProjectButton = document.querySelector("#support-project-button");
  _createGameRoomContainer = document.querySelector(
    "#create-game-room-container"
  );
  _onlyIndependentCountriesCheckbox = document.querySelector(
    "#only-independent-countries-checkbox"
  );
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
  _gameCardHeader = document.querySelector("#game-header");
  _gameConfigurationHeader = document.querySelector(
    "#game-configuration-header"
  );
  _onlyIndependentCountriesCheckboxLabel = document.querySelector(
    "#only-independent-countries-checkbox-label"
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

  startGame(
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
    this._startButton.disabled = true;
    this.hideMain();
    this._header.classList.add("not-displayed");
    this._footer.classList.add("not-displayed");
    aboutView.hideAboutProject();
    donateAuthorView.hideDonateProject();
    gameRulesView.hideGameRulesProject();
    gameRoomView.hideGameRoomProject();
    gameView.showGame();
    gameView.initGameView(firebase);
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
  }

  gameRoom(aboutView, gameView, donateAuthorView, gameRulesView, gameRoomView) {
    aboutView.hideAboutProject();
    donateAuthorView.hideDonateProject();
    gameView.hideGame();
    gameRulesView.hideGameRulesProject();
    this.hideMain();
    gameRoomView.showGameRoomProject();
    sessionStorage.setItem("currentWindow", "game-room");
  }

  addOnlyIndependentCountriesListener() {
    if (!this._onlyIndependentCountriesListenerAdded) {
      this._onlyIndependentCountriesCheckbox.addEventListener("change", () => {
        document.getElementById(
          "only-independent-countries-checkbox-game-room"
        ).checked = this._onlyIndependentCountriesCheckbox.checked;
      });
      this._onlyIndependentCountriesListenerAdded = true;
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
    this._gameCardHeader.textContent = `${
      localization[model.worldCountries.language][
        "Country Alliance Guesser Game"
      ]
    }`;
    this._gameConfigurationHeader.textContent = `🛠️ ${
      localization[model.worldCountries.language]["Game Configuration"]
    }`;
    this._onlyIndependentCountriesCheckboxLabel.textContent = `${
      localization[model.worldCountries.language]["Only Independent Countries"]
    }`;
    this._gameRulesButton.textContent = `📄 ${
      localization[model.worldCountries.language]["Game Rules"]
    }`;
    this._supportProjectButton.textContent = `🔗 ${
      localization[model.worldCountries.language]["Support Project"]
    }`;
    this._startButton.textContent = `${
      localization[model.worldCountries.language]["START"]
    }`;
    this._aboutButton.textContent = `${
      localization[model.worldCountries.language]["About Project"]
    }`;
    this._opponentLabel.textContent = `${
      localization[model.worldCountries.language]["Opponent:"]
    }`;
    this._opponentLabelComputer.textContent = `${
      localization[model.worldCountries.language]["Computer"]
    }`;
    this._opponentLabelFriend.textContent = `${
      localization[model.worldCountries.language]["Friend"]
    }`;
    this._gameRoomIdLabel.textContent = `${
      localization[model.worldCountries.language]["Game Room ID:"]
    }`;
    this._opponentConnectionLabel.textContent = `${
      localization[model.worldCountries.language][
        this._opponentConnectionLabel.dataset.connection
      ]
    }`;
    this._createGameRoomButton.textContent = `🎮 ${
      localization[model.worldCountries.language][
        this._createGameRoomButton.dataset.text
      ]
    }`;
    this._shareWebSite.firstElementChild.textContent = `${
      localization[model.worldCountries.language]["Share"]
    }`;
  }
}

export default new mainView();
