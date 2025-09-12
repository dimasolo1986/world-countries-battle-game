import { localization } from "../localization/ua.js";
import * as model from "../model.js";
import gameRulesView from "./gameRulesView.js";
class mainView {
  _parentElement = document.querySelector(".main-container");
  _aboutButton = document.querySelector("#about-button");
  _startButton = document.querySelector("#start-button");
  _supportProjectButton = document.querySelector("#support-project-button");
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

  startGame(aboutView, gameView, donateAuthorView, gameRulesView) {
    this._startButton.disabled = true;
    this.hideMain();
    this._header.classList.add("not-displayed");
    this._footer.classList.add("not-displayed");
    aboutView.hideAboutProject();
    donateAuthorView.hideDonateProject();
    gameRulesView.hideGameRulesProject();
    gameView.showGame();
    gameView.initGameView();
  }

  aboutProject(aboutView, gameView, donateAuthorView) {
    this.hideMain();
    aboutView.showAboutProject();
    donateAuthorView.hideDonateProject();
    gameRulesView.hideGameRulesProject();
    gameView.hideGame();
    sessionStorage.setItem("currentWindow", "about-project");
  }

  supportProject(aboutView, gameView, donateAuthorView, gameRulesView) {
    this.hideMain();
    aboutView.hideAboutProject();
    donateAuthorView.showDonateProject();
    gameRulesView.hideGameRulesProject();
    gameView.hideGame();
    sessionStorage.setItem("currentWindow", "donate-author");
  }

  gameRules(aboutView, gameView, donateAuthorView, gameRulesView) {
    this.hideMain();
    aboutView.hideAboutProject();
    donateAuthorView.hideDonateProject();
    gameView.hideGame();
    gameRulesView.showGameRulesProject();
    sessionStorage.setItem("currentWindow", "game-rules");
  }

  addStartGameHandlerClick(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView
  ) {
    if (!this._startButtonListenerAdded) {
      this._startButton.addEventListener(
        "click",
        this.startGame.bind(
          this,
          aboutView,
          gameView,
          donateAuthorView,
          gameRulesView
        )
      );
      this._startButtonListenerAdded = true;
    }
  }

  addSupportProjectHandlerClick(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView
  ) {
    if (!this._supportProjectListenerAdded) {
      this._supportProjectButton.addEventListener(
        "click",
        this.supportProject.bind(
          this,
          aboutView,
          gameView,
          donateAuthorView,
          gameRulesView
        )
      );
      this._supportProjectListenerAdded = true;
    }
  }

  addGameRulesHandlerClick(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView
  ) {
    if (!this._gameRulesListenerAdded) {
      this._gameRulesButton.addEventListener(
        "click",
        this.gameRules.bind(
          this,
          aboutView,
          gameView,
          donateAuthorView,
          gameRulesView
        )
      );
      this._gameRulesListenerAdded = true;
    }
  }

  addAboutHandlerClick(aboutView, gameView, donateAuthorView, gameRulesView) {
    if (!this._aboutButtonListenerAdded) {
      this._aboutButton.addEventListener(
        "click",
        this.aboutProject.bind(
          this,
          aboutView,
          gameView,
          donateAuthorView,
          gameRulesView
        )
      );
      this._aboutButtonListenerAdded = true;
    }
  }

  showMain() {
    this._parentElement.classList.remove("not-displayed");
    this._parentElement.classList.add("d-flex");
    this._header.classList.remove("not-displayed");
    this._footer.classList.remove("not-displayed");
    this._startButton.disabled = false;
  }

  hideMain() {
    this._parentElement.classList.add("not-displayed");
    this._parentElement.classList.remove("d-flex");
  }

  translateElements() {
    this._gameCardHeader.textContent = `${
      localization[model.worldCountries.language]["Countries Battle Game"]
    }`;
    this._gameConfigurationHeader.textContent = `${
      localization[model.worldCountries.language]["Game Configuration"]
    }`;
    this._onlyIndependentCountriesCheckboxLabel.textContent = `${
      localization[model.worldCountries.language]["Only Independent Countries"]
    }`;
    this._gameRulesButton.textContent = `${
      localization[model.worldCountries.language]["Game Rules"]
    }`;
    this._supportProjectButton.textContent = `${
      localization[model.worldCountries.language]["Support Project"]
    }`;
    this._startButton.textContent = `${
      localization[model.worldCountries.language]["START"]
    }`;
    this._aboutButton.textContent = `${
      localization[model.worldCountries.language]["About Project"]
    }`;
  }
}

export default new mainView();
