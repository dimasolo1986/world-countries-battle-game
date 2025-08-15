import { localization } from "../localization/ua.js";
import * as model from "../model.js";
class aboutView {
  _parentElement = document.querySelector("#about");
  _aboutReturnToMain = document.querySelector(".return-about");

  _returnToMainListenerAdded = false;

  returnToMain(mainView) {
    this.hideAboutProject();
    mainView.showMain();
    sessionStorage.setItem("currentWindow", "main");
  }

  addReturnToMainHandlerClick(mainView) {
    if (!this._returnToMainListenerAdded) {
      this._aboutReturnToMain.addEventListener(
        "click",
        this.returnToMain.bind(this, mainView)
      );
      this._returnToMainListenerAdded = true;
    }
  }

  showAboutProjectInfo() {
    this.showAboutProject();
  }

  showAboutProject() {
    this._parentElement.classList.remove("not-displayed");
  }

  hideAboutProject() {
    this._parentElement.classList.add("not-displayed");
  }

  translateElements() {
    this._aboutReturnToMain.textContent = `${
      localization[model.worldCountries.language]["RETURN TO WORLD MAP"]
    }`;
  }
}

export default new aboutView();
