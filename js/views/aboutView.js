import { localization } from "../localization/ua.js";
import { showGameRulesWindow } from "../helpers.js";
import * as model from "../model.js";
class aboutView {
  _parentElement = document.querySelector("#about");
  _aboutReturnToMain = document.querySelector(".return-about");
  _aboutUkraineHelpDescription = document.querySelector(
    ".about-ukraine-help-description",
  );
  _aboutUkraineHelpLink = document.querySelector(".about-ukraine-help-link");
  _aboutProjectName = document.querySelector(".about-project-name");
  _aboutProjectDescription = document.querySelector(
    ".about-project-description",
  );
  _aboutDeveloper = document.querySelector(".about-developer");
  _aboutDeveloperLink = document.querySelector(".about-developer-link");
  _aboutDeveloperEmailDescription = document.querySelector(
    ".about-developer-email-description",
  );
  _aboutDeveloperDonateDescription = document.querySelector(
    ".about-developer-donate-author-description",
  );
  _aboutMapLibrary = document.querySelector(".about-map-library");
  _aboutWorldCountriesQuiz = document.querySelector(
    ".about-world-countries-quiz",
  );
  _aboutWorldCountriesQuizLink = document.querySelector(
    ".about-world-countries-quiz-link",
  );
  _facebookPage = document.querySelector(
    ".about-countries-guesser-facebook-page",
  );
  _facebookPageShare = document.querySelector(
    ".about-countries-guesser-facebook-page-share",
  );
  _gameModalRulesLabel = document.getElementById("gameModalRulesLabel");
  _gameModalRulesContent = document.getElementById("gameRulesContent");
  _gameModalRulesCloseButton = document.getElementById("gameRulesCloseButton");
  _aboutGameRulesLink = document.querySelector(".about-game-rules");

  _returnToMainListenerAdded = false;
  _gameRulesListenerAdded = false;

  returnToMain(mainView, donateAuthorView, gameRulesView, gameRoomView) {
    this.hideAboutProject();
    donateAuthorView.hideDonateProject();
    gameRulesView.hideGameRulesProject();
    gameRoomView.hideGameRoomProject();
    mainView.showMain();
    sessionStorage.setItem("currentWindow", "main");
  }

  showGameRules() {
    this._gameModalRulesLabel.textContent =
      localization[model.worldCountries.language]["Game Rules"];
    this._gameModalRulesCloseButton.textContent =
      localization[model.worldCountries.language]["Close"];
    this._gameModalRulesContent.innerHTML = document.getElementById(
      "game-rules-project-container",
    ).innerHTML;
    document
      .getElementById("game-rules-friend-link")
      .classList.add("not-displayed");
    showGameRulesWindow();
  }

  addGameRulesHandlerClick() {
    if (!this._gameRulesListenerAdded) {
      this._aboutGameRulesLink.addEventListener(
        "click",
        this.showGameRules.bind(this),
      );
      this._gameRulesListenerAdded = true;
    }
  }

  addReturnToMainHandlerClick(
    mainView,
    donateAuthorView,
    gameRulesView,
    gameRoomView,
  ) {
    if (!this._returnToMainListenerAdded) {
      this._aboutReturnToMain.addEventListener(
        "click",
        this.returnToMain.bind(
          this,
          mainView,
          donateAuthorView,
          gameRulesView,
          gameRoomView,
        ),
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
    this._aboutReturnToMain.textContent = `🚪 ${
      localization[model.worldCountries.language]["BACK"]
    }`;
    this._aboutUkraineHelpDescription.textContent = `${
      localization[model.worldCountries.language][
        "You can support Ukraine in the fight against Russia's military aggression:"
      ]
    }`;
    this._aboutUkraineHelpLink.textContent = `${
      localization[model.worldCountries.language]["Come Back Alive"]
    }`;
    this._aboutProjectName.textContent = `${
      localization[model.worldCountries.language][
        "World Country Alliances Guesser Game"
      ]
    }`;
    this._aboutProjectDescription.textContent = `${
      localization[model.worldCountries.language][
        "project that helps to study the geography of the countries of the world, neighboring countries, flags and parts of the world in a game format. Choose ten different alliances of countries on the map, as    well as four trap-countries for your opponent. The computer or your friend (depends on the selected game mode) will also choose the appropriate number of alliances of countries and trap-countries. The attempts to guess the countries take place in turn. The one who guesses the opponent's country gets an extra try. The one who guesses all the alliances of the opponent's countries first wins. Follow the messages at the top of the screen after the game starts."
      ]
    }`;
    this._aboutDeveloper.textContent = `${
      localization[model.worldCountries.language][
        "Project was created by Software Developer from Ukraine -"
      ]
    }`;
    this._aboutDeveloperLink.textContent = `${
      localization[model.worldCountries.language]["Dmytro Solovei"]
    }`;
    this._aboutDeveloperEmailDescription.textContent = `${
      localization[model.worldCountries.language]["You can reach me by e-mail:"]
    }`;
    this._aboutDeveloperDonateDescription.textContent = `${
      localization[model.worldCountries.language]["Support Project"]
    }`;
    this._facebookPage.textContent = `${
      localization[model.worldCountries.language]["Facebook Page"]
    }`;
    this._facebookPageShare.textContent = `${
      localization[model.worldCountries.language][
        "On Facebook Page you can share your impressions about the game or the results of your games"
      ]
    }`;
    this._aboutMapLibrary.textContent = `${
      localization[model.worldCountries.language]["Used Map Library:"]
    }`;
    this._aboutWorldCountriesQuiz.textContent = `${
      localization[model.worldCountries.language][
        "Do you like Geography and Countries of the World? Visit"
      ]
    }`;
    this._aboutWorldCountriesQuizLink.textContent = `${
      localization[model.worldCountries.language]["World Countries And Quizzes"]
    }`;
    this._aboutGameRulesLink.textContent = `${
      localization[model.worldCountries.language]["Game Rules"]
    }`;
  }
}

export default new aboutView();
