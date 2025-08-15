import { localization } from "../localization/ua.js";
class mainView {
  _parentElement = document.querySelector(".main-container");
  _aboutButton = document.querySelector("#about-button");
  _startButton = document.querySelector("#start-button");
  _header = document.querySelector("header");
  _footer = document.querySelector("footer");

  _aboutButtonListenerAdded = false;
  _startButtonListenerAdded = false;

  startGame(aboutView, gameView) {
    this.hideMain();
    this._header.classList.add("not-displayed");
    this._footer.classList.add("not-displayed");
    aboutView.hideAboutProject();
    gameView.showGame();
    gameView.initGameView();
  }

  aboutProject(aboutView, gameView) {
    this.hideMain();
    aboutView.showAboutProject();
    gameView.hideGame();
    sessionStorage.setItem("currentWindow", "about-project");
  }

  addStartGameHandlerClick(aboutView, gameView) {
    if (!this._startButtonListenerAdded) {
      this._startButton.addEventListener(
        "click",
        this.startGame.bind(this, aboutView, gameView)
      );
      this._startButtonListenerAdded = true;
    }
  }

  addAboutHandlerClick(aboutView, gameView) {
    if (!this._aboutButtonListenerAdded) {
      this._aboutButton.addEventListener(
        "click",
        this.aboutProject.bind(this, aboutView, gameView)
      );
      this._aboutButtonListenerAdded = true;
    }
  }

  showMain() {
    this._parentElement.classList.remove("not-displayed");
    this._parentElement.classList.add("d-flex");
    this._header.classList.remove("not-displayed");
    this._footer.classList.remove("not-displayed");
  }

  hideMain() {
    this._parentElement.classList.add("not-displayed");
    this._parentElement.classList.remove("d-flex");
  }

  translateElements() {}
}

export default new mainView();
