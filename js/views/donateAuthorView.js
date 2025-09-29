import { localization } from "../localization/ua.js";
import * as model from "../model.js";
class donateAuthorView {
  _parentElement = document.querySelector("#donate-author-page");
  _donateAuthorQRCode = document.querySelector("#donate-qr-code");
  _donateHeading = document.querySelector(".donate-link");
  _donateText = document.querySelector(".donate-text");
  _donateShareWebSite = document.querySelector(".share-donate");
  _donateQrCodeText = document.querySelector("#donate-qr-code-text");
  _donateCardText = document.querySelector("#donate-card-number");

  _donateReturnBack = document.querySelector(".return-donate");

  _returnBackListenerAdded = false;
  _shareWebSiteListenerAdded = false;
  _makeDonateListenerAdded = false;

  returnBack(mainView, aboutView, gameRulesView) {
    this.hideDonateProject();
    mainView.showMain();
    aboutView.hideAboutProject();
    gameRulesView.hideGameRulesProject();
    sessionStorage.setItem("currentWindow", "main");
  }

  addShareWebSiteHandlerClick() {
    if (!this._shareWebSiteListenerAdded) {
      this._donateShareWebSite.addEventListener("click", function () {
        if (navigator.share) {
          navigator
            .share({
              title: `${
                localization[model.worldCountries.language][
                  "Country Alliance Guesser Game"
                ]
              }`,
              text: `${
                localization[model.worldCountries.language][
                  "World Country Alliances Guesser Game"
                ]
              } - ${
                document.querySelector(".about-project-description").textContent
              }`,
              url: "https://www.countryallianceguesser.com",
            })
            .then(function () {})
            .catch(function () {});
        }
      });
    }
  }

  addReturnBackHandlerClick(mainView, aboutView, gameRulesView) {
    if (!this._returnBackListenerAdded) {
      this._donateReturnBack.addEventListener(
        "click",
        this.returnBack.bind(this, mainView, aboutView, gameRulesView)
      );
      this._returnBackListenerAdded = true;
    }
  }

  showDonateInfo() {
    this.showDonateProject();
  }

  showDonateProject() {
    this._parentElement.classList.remove("not-displayed");
  }

  hideDonateProject() {
    this._parentElement.classList.add("not-displayed");
  }

  translateElements() {
    this._donateReturnBack.textContent = `${
      localization[model.worldCountries.language]["BACK"]
    }`;
    this._donateHeading.textContent = `${
      localization[model.worldCountries.language]["Make Donate"]
    }`;
    this._donateShareWebSite.textContent = `${
      localization[model.worldCountries.language]["Share"]
    }`;
    this._donateText.textContent = `${
      localization[model.worldCountries.language][
        "If you like this project, you can share it with your friends or support it financially (money is spent on the development of educational projects and support for Ukraine's right to exist on the world map). Thank you!"
      ]
    }`;
    this._donateQrCodeText.textContent = `${
      localization[model.worldCountries.language]["QR Code"]
    }`;
    this._donateCardText.textContent = `${
      localization[model.worldCountries.language]["Card number (UAH):"]
    }`;
  }
}

export default new donateAuthorView();
