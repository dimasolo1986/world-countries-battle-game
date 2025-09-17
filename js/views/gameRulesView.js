import { localization } from "../localization/ua.js";
import * as model from "../model.js";
class gameRulesView {
  _parentElement = document.querySelector("#game-rules");
  _gameRulesReturnBack = document.querySelector(".return-game-rules");
  _gameRulesHeading = document.querySelector(".game-rules-project-name");
  _gameRulesProjectDescription = document.querySelector(
    ".game-rules-project-description"
  );
  _gameRulesNameHeading = document.querySelector(".game-rules-name-heading");
  _gameRulesFourCountriesAllianceDescription = document.querySelector(
    ".game-rules-four-countries-alliance-description"
  );
  _gameRulesThreeCountriesAllianceDescription = document.querySelector(
    ".game-rules-three-countries-alliance-description"
  );
  _gameRulesTwoCountriesAllianceDescription = document.querySelector(
    ".game-rules-two-countries-alliance-description"
  );
  _gameRulesOneCountriesAllianceDescription = document.querySelector(
    ".game-rules-one-countries-alliance-description"
  );
  _gameRulesThreeTrapCountriesDescription = document.querySelector(
    ".game-rules-three-trap-countries-description"
  );
  _gameRulesTrapCountriesRules = document.querySelector(
    ".game-rules-trap-countries-rules"
  );
  _gameRulesImportant = document.querySelector(".game-rules-important");
  _gameRulesImportantDescription = document.querySelector(
    ".game-rules-important-description"
  );

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
    this._gameRulesHeading.textContent = `${
      localization[model.worldCountries.language]["World Countries Battle Game"]
    }`;
    this._gameRulesProjectDescription.textContent = `${
      localization[model.worldCountries.language][
        "project that helps to study the geography of the countries of the world, neighboring countries, flags and parts of the world in a game format. Choose ten different alliances of countries on the map, as    well as three trap-countries for your opponent. The computer will also choose the appropriate number of alliances of countries and trap-countries. The attempts to guess the countries take place in turn. The one who guesses the opponent's country gets an extra try. The one who guesses all the alliances of the opponent's countries first wins. Follow the messages at the top of the screen after the game starts."
      ]
    }`;
    this._gameRulesNameHeading.textContent = `${
      localization[model.worldCountries.language]["Game Rules"]
    }`;
    this._gameRulesFourCountriesAllianceDescription.textContent = `${
      localization[model.worldCountries.language][
        "Choose one alliance of countries that includes four countries on the world map."
      ]
    }`;
    this._gameRulesThreeCountriesAllianceDescription.textContent = `${
      localization[model.worldCountries.language][
        "Choose two alliances of countries that include three countries on the world map."
      ]
    }`;
    this._gameRulesTwoCountriesAllianceDescription.textContent = `${
      localization[model.worldCountries.language][
        "Choose three alliances of countries that include two countries on the world map."
      ]
    }`;
    this._gameRulesOneCountriesAllianceDescription.textContent = `${
      localization[model.worldCountries.language][
        "Choose four alliances of countries that include one country on the world map."
      ]
    }`;
    this._gameRulesThreeTrapCountriesDescription.textContent = `${
      localization[model.worldCountries.language][
        "Choose three trap countries for the opponent on the world map."
      ]
    }`;
    this._gameRulesTrapCountriesRules.textContent = `${
      localization[model.worldCountries.language][
        "When entering an opponent's trap country, he receives one of three clues about the location of one of your countries: 1. Capital of the country; 2. Region (Europe, America, Asia, Africa, Oceania) in which one of your countries is located; 3. Subregion (Central Europe, North America, etc.) in which one of your countries is located."
      ]
    }`;
    this._gameRulesImportant.textContent = `${
      localization[model.worldCountries.language]["Important!"]
    }`;
    this._gameRulesImportantDescription.textContent = `${
      localization[model.worldCountries.language][
        "Countries in the same alliance of countries must be united by borders. Alliances of countries must be separated from each other by at least one country's borders. A trap country can have borders with another trap country, but not with an alliance of countries."
      ]
    }`;
  }
}

export default new gameRulesView();
