import { localization } from "../localization/ua.js";
import * as model from "../model.js";
class gameRulesView {
  _parentElement = document.querySelector("#game-rules");
  _gameRulesReturnBack = document.querySelector(".return-game-rules");
  _gameRulesHeading = document.querySelector(".game-rules-project-name");
  _gameRulesProjectDescription = document.querySelector(
    ".game-rules-project-description",
  );
  _gameRulesNameHeading = document.querySelector(".game-rules-name-heading");
  _gameRulesFourCountriesAllianceDescription = document.querySelector(
    ".game-rules-four-countries-alliance-description",
  );
  _gameRulesThreeCountriesAllianceDescription = document.querySelector(
    ".game-rules-three-countries-alliance-description",
  );
  _gameRulesTwoCountriesAllianceDescription = document.querySelector(
    ".game-rules-two-countries-alliance-description",
  );
  _gameRulesOneCountriesAllianceDescription = document.querySelector(
    ".game-rules-one-countries-alliance-description",
  );
  _gameRulesThreeTrapCountriesDescription = document.querySelector(
    ".game-rules-three-trap-countries-description",
  );
  _gameRulesTrapCountriesRules = document.querySelector(
    ".game-rules-trap-countries-rules",
  );
  _gameRulesImportant = document.querySelector(".game-rules-important");
  _gameRulesImportantDescription = document.querySelector(
    ".game-rules-important-description",
  );
  _gameRulesRandomCountriesSelectionDescription = document.querySelector(
    ".game-rules-random-country-selection-description",
  );
  _gameRulesClearCountriesSelectionDescription = document.querySelector(
    ".game-rules-clear-country-selection-description",
  );
  _gameRulesBonusCountriesDescription = document.querySelector(
    ".game-rules-bonus-countries-rules",
  );
  _gameVideos = document.querySelector(".game-rules-videos");
  _gameRulesCountryAllianceSelectionVideoTitle = document.querySelector(
    ".game-rules-country-alliance-selection-video-tutorial",
  );
  _gameRulesCountryAllianceGameplayVideoTitle = document.querySelector(
    ".game-rules-country-alliance-gameplay-video-tutorial",
  );
  _gameRulesWithFriendHeader = document.querySelector(
    ".game-rules-with-friend-heading",
  );
  _gameRulesWithFriendDescription = document.querySelector(
    ".game-rules-with-friend-description",
  );
  _gameRulesScoreHeading = document.querySelector(".game-rules-score-heading");
  _gameRulesScoreDescription = document.querySelector(
    ".game-rules-score-description",
  );

  _returnToMainListenerAdded = false;

  returnToMain(mainView, donateAuthorView, aboutView, gameRoomView) {
    this.hideGameRulesProject();
    donateAuthorView.hideDonateProject();
    aboutView.hideAboutProject();
    gameRoomView.hideGameRoomProject();
    mainView.showMain();
    sessionStorage.setItem("currentWindow", "main");
  }

  addReturnToMainHandlerClick(
    mainView,
    donateAuthorView,
    aboutView,
    gameRoomView,
  ) {
    if (!this._returnToMainListenerAdded) {
      this._gameRulesReturnBack.addEventListener(
        "click",
        this.returnToMain.bind(
          this,
          mainView,
          donateAuthorView,
          aboutView,
          gameRoomView,
        ),
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
    this._gameRulesReturnBack.textContent = `🚪 ${localization[model.worldCountries.language]["BACK"]
      }`;
    this._gameRulesHeading.textContent = `${localization[model.worldCountries.language][
      "World Country Alliances Guesser Game"
    ]
      }`;
    this._gameRulesProjectDescription.textContent = `${localization[model.worldCountries.language][
      "project that helps to study the geography of the countries of the world, neighboring countries, flags and parts of the world in a game format. Choose ten different alliances of countries on the map, as    well as four trap-countries for your opponent. The computer or your friend (depends on the selected game mode) will also choose the appropriate number of alliances of countries and trap-countries. The attempts to guess the countries take place in turn. The one who guesses the opponent's country gets an extra try. The one who guesses all the alliances of the opponent's countries first wins. Follow the messages at the top of the screen after the game starts."
    ]
      }`;
    this._gameRulesRandomCountriesSelectionDescription.textContent = `${localization[model.worldCountries.language][
      "To select alliances of countries randomly, click"
    ]
      }`;
    this._gameRulesClearCountriesSelectionDescription.textContent = `${localization[model.worldCountries.language][
      "To clear selected country alliances, click"
    ]
      }`;
    this._gameRulesNameHeading.textContent = `📄 ${localization[model.worldCountries.language]["Game Rules"]
      }`;
    this._gameRulesFourCountriesAllianceDescription.textContent = `${localization[model.worldCountries.language][
      "Choose one alliance of countries that includes four countries on the world map."
    ]
      }`;
    this._gameRulesThreeCountriesAllianceDescription.textContent = `${localization[model.worldCountries.language][
      "Choose two alliances of countries that include three countries on the world map."
    ]
      }`;
    this._gameRulesTwoCountriesAllianceDescription.textContent = `${localization[model.worldCountries.language][
      "Choose three alliances of countries that include two countries on the world map."
    ]
      }`;
    this._gameRulesOneCountriesAllianceDescription.textContent = `${localization[model.worldCountries.language][
      "Choose four alliances of countries that include one country on the world map."
    ]
      }`;
    this._gameRulesThreeTrapCountriesDescription.textContent = `${localization[model.worldCountries.language][
      "Choose four trap countries for the opponent on the world map."
    ]
      }`;
    this._gameRulesTrapCountriesRules.textContent = `${localization[model.worldCountries.language][
      "When entering an opponent's trap country, he receives one of eight clues about the location of one of your countries: 1. Name of the country; 2. Capital of the country; 3. Region (Europe, America, Asia, Africa, Oceania) in which one of your countries is located; 4. Subregion (Central Europe, North America, etc.) in which one of your countries is located; 5. Coat Of Arms Image; 6. Flag Image; 7. Country's Outline On Map; 8. Photo From Country. You can configure to receive only text clues (country name, country capital, region, subregion) or visual clues (country coat of arms, country flag, country's outline on map, photo from country)."
    ]
      }`;
    this._gameRulesImportant.textContent = `ℹ️ ${localization[model.worldCountries.language]["Important!"]
      }`;
    this._gameRulesImportantDescription.textContent = `${localization[model.worldCountries.language][
      "Countries in the same alliance of countries must be united by borders. Alliances of countries must be separated from each other by at least one country's borders. An island country can only be used as an alliance with one country or as a trap country. If the player does not make an attempt to guess the opponent's country within one minute (can be changed), the turn passes to the opponent."
    ]
      }`;
    this._gameRulesBonusCountriesDescription.textContent = `🎁 ${localization[model.worldCountries.language][
      "The computer will also randomly select five bonus countries (can be changed), when hit, players get an extra attempt to guess the opponent's country and 10 extra points."
    ]
      }`;
    this._gameRulesWithFriendHeader.textContent = `🧓 ${localization[model.worldCountries.language]["Play With A Friend Mode"]
      }`;
    this._gameRulesWithFriendDescription.textContent = `${localization[model.worldCountries.language][
      "To play with your friend, you need to select the game mode with a friend on the main page, create a game room and a link to the game for your friend and send it to him. Follow the connection status of your friend at the top of the screen after starting the game. There is also the possibility of communicating with your friend via chat at the bottom of the screen: you can greet him, wish him a good game or give yourself hints about your countries and alliances of countries (chat may be hidden by the bottom browser bar, so open it full screen or hide this bar)."
    ]
      }`;
    this._gameRulesScoreHeading.textContent = `🏅 ${localization[model.worldCountries.language]["Score"]
      }`;
    this._gameRulesScoreDescription.textContent = `${localization[model.worldCountries.language][
      "If a player guesses an alliance of countries that contains four countries, he gets 15 points, three countries - 25 points, two countries - 35 points, one country - 50 points. When falling into an opponent's trap country, the player loses 10 points the first time, 20 points the second time, 30 points the third time and 50 points the fourth time. At the end of the game, the player gets an additional 10 points for each alliance of countries that was not guessed by the opponent."
    ]
      }`;
    this._gameVideos.textContent = `📼 ${localization[model.worldCountries.language]["VIDEOS:"]
      }`;
    this._gameRulesCountryAllianceSelectionVideoTitle.textContent = `${localization[model.worldCountries.language][
      "Country Alliances Selection — Video Tutorial"
    ]
      }`;
    this._gameRulesCountryAllianceGameplayVideoTitle.textContent = `${localization[model.worldCountries.language][
      "Country Alliance Guesser Gameplay"
    ]
      }`;
  }
}

export default new gameRulesView();
