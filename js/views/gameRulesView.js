import { localization } from "../localization/ua.js";
import * as model from "../model.js";
class gameRulesView {
  _parentElement = document.querySelector("#game-rules");
  _gameRulesReturnBack = document.querySelector(".return-game-rules");

  _returnToMainListenerAdded = false;

  returnToMain(mainView, donateAuthorView, aboutView) {
    this.hideGameRulesProject();
    donateAuthorView.hideDonateProject();
    aboutView.hideAboutProject();
    mainView.showMain();
    sessionStorage.setItem("currentWindow", "main");
  }

  addReturnToMainHandlerClick(mainView, donateAuthorView, aboutView) {
    if (!this._returnToMainListenerAdded) {
      this._gameRulesReturnBack.addEventListener(
        "click",
        this.returnToMain.bind(this, mainView, donateAuthorView, aboutView)
      );
      this._returnToMainListenerAdded = true;
    }
  }

  showGameRulesProjectInfo() {
    this.showGameRulesProject();
  }

  showGameRulesProject() {
    this._parentElement.classList.remove("not-displayed");
  }

  hideGameRulesProject() {
    this._parentElement.classList.add("not-displayed");
  }

  translateElements() {
    this._gameRulesReturnBack.textContent = `${
      localization[model.worldCountries.language]["BACK"]
    }`;
  }
}

export default new gameRulesView();
