import * as model from "./model.js";
import languageSelectView from "./views/languageSelectView.js";
import aboutView from "./views/aboutView.js";
import mainView from "./views/mainView.js";
import { localization } from "./localization/ua.js";
import gameView from "./views/gameView.js";
import donateAuthorView from "./views/donateAuthorView.js";
import gameRulesView from "./views/gameRulesView.js";
import gameRoomView from "./views/gameRoomView.js";
const init = function () {
  languageSelectView.init();
  translateAllElements();
  languageSelectView.addHandlerSelect(languageSelectHandler);
  aboutView.addReturnToMainHandlerClick(
    mainView,
    donateAuthorView,
    gameRulesView,
    gameRoomView
  );
  aboutView.addGameRulesHandlerClick();
  donateAuthorView.addReturnBackHandlerClick(
    mainView,
    aboutView,
    gameRulesView,
    gameRoomView
  );
  gameRoomView.addReturnBackHandlerClick(
    mainView,
    aboutView,
    gameRulesView,
    donateAuthorView
  );
  gameRoomView.addGameRoomCreateListenerHandlerClick();
  gameRoomView.addGameRoomDeleteListenerHandlerClick();
  gameRoomView.addGameRoomCopyLinkHandlerClick();
  gameRoomView.addShareLinkHandlerClick();
  gameRoomView.addOnlyIndependentCountriesListener();
  donateAuthorView.addShareWebSiteHandlerClick();
  gameRulesView.addReturnToMainHandlerClick(
    mainView,
    donateAuthorView,
    aboutView,
    gameRoomView
  );
  mainView.addAboutHandlerClick(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView,
    gameRoomView
  );
  mainView.addStartGameHandlerClick(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView,
    gameRoomView
  );
  mainView.addGameModeChangeHandler(gameRoomView);
  mainView.addOnlyIndependentCountriesListener();
  mainView.addGameRoomListenerHandler(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView,
    gameRoomView
  );
  mainView.addSupportProjectHandlerClick(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView,
    gameRoomView
  );
  mainView.addGameRulesHandlerClick(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView,
    gameRoomView
  );
  saveCurrentLanguageHandler();
  loadWindow();

  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    e.returnValue = "";
  });
  window.addEventListener("unload", function (e) {
    const rawParams = window.location.search;
    const cleanedParams = rawParams.replace(/[\u200B-\u200D\uFEFF]/g, "");
    const urlParams = new URLSearchParams(cleanedParams);
    const roomId = urlParams.get("gameRoom");
    if (!roomId) {
      cleanFirebase(true);
    }
    const firebase = gameRoomView.getFirebase();
    if (firebase && firebase.app && gameView._game) {
      firebase.sendMessage(
        JSON.stringify({
          type: "finish",
        })
      );
    }
  });
  document.addEventListener("DOMContentLoaded", function () {
    const rawParams = window.location.search;
    const cleanedParams = rawParams.replace(/[\u200B-\u200D\uFEFF]/g, "");
    const urlParams = new URLSearchParams(cleanedParams);
    const roomId = urlParams.get("gameRoom");
    const gameMode = sessionStorage.getItem("game-mode");
    const gameModeCheckSlider = document.getElementById("gameMode");
    const gameRoomContainer = document.getElementById(
      "create-game-room-container"
    );
    if (gameMode && gameMode === "1" && !roomId) {
      gameModeCheckSlider.value = gameMode;
      gameRoomContainer.classList.remove("not-displayed");
    } else if (roomId) {
      gameModeCheckSlider.value = "1";
    } else {
      gameModeCheckSlider.value = "0";
      gameRoomContainer.classList.add("not-displayed");
    }
    const gameLogo = document.getElementById("game-logo");
    gameLogo.addEventListener("click", function () {
      sessionStorage.setItem("currentWindow", "main");
      loadWindow();
    });
    document.addEventListener("hide.bs.modal", function () {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    });
    const shareWebSiteContent = {
      title: `${
        localization[model.worldCountries.language][
          "Country Alliance Guesser Game"
        ]
      }`,
      text: `${
        localization[model.worldCountries.language][
          "World Country Alliances Guesser Game"
        ]
      } - ${document.querySelector(".about-project-description").textContent}`,
      url: "https://www.countriesguesser.com",
    };
    const shareWebSiteButton = document.getElementById("shareWebSite");
    if (shareWebSiteButton) {
      shareWebSiteButton.addEventListener("click", function () {
        if (navigator.share) {
          navigator
            .share(shareWebSiteContent)
            .then(function () {})
            .catch(function () {});
        }
      });
    }
    const shareWebSiteDonate = document.querySelector(".share-donate");
    if (shareWebSiteDonate) {
      shareWebSiteDonate.addEventListener("click", function () {
        if (navigator.share) {
          navigator
            .share(shareWebSiteContent)
            .then(function () {})
            .catch(function () {});
        }
      });
    }
    const shareGameResults = document.querySelector("#shareGameResults");
    if (shareGameResults) {
      shareGameResults.addEventListener("click", function () {
        if (navigator.share) {
          navigator
            .share(shareWebSiteContent)
            .then(function () {})
            .catch(function () {});
        }
      });
    }
  });
};

const loadWindow = function () {
  const savedWindow = sessionStorage.getItem("currentWindow");
  if (savedWindow) {
    switch (savedWindow) {
      case "main":
        loadMain();
        break;
      case "about-project":
        loadAboutProject();
        break;
      case "donate-author":
        loadDonateAuthor();
        break;
      case "game-rules":
        loadGameRules();
        break;
      case "game-room":
        loadGameRoom();
        break;
      default:
        loadMain(savedWindow);
        break;
    }
  } else {
    loadMain();
  }
};

export const loadMain = function () {
  aboutView.hideAboutProject();
  mainView.showMain();
  gameView.hideGame();
  sessionStorage.setItem("currentWindow", "main");
  donateAuthorView.hideDonateProject();
  gameRulesView.hideGameRulesProject();
  gameRoomView.hideGameRoomProject();
};

const loadAboutProject = function () {
  mainView.hideMain();
  gameView.hideGame();
  aboutView.showAboutProjectInfo();
  sessionStorage.setItem("currentWindow", "about-project");
  donateAuthorView.hideDonateProject();
  gameRulesView.hideGameRulesProject();
  gameRoomView.hideGameRoomProject();
};

const translateAllElements = function () {
  aboutView.translateElements();
  mainView.translateElements();
  donateAuthorView.translateElements();
  gameRulesView.translateElements();
  gameRoomView.translateElements();
};

const loadGameRoom = function () {
  mainView.hideMain();
  aboutView.hideAboutProject();
  gameView.hideGame();
  donateAuthorView.hideDonateProject();
  gameRulesView.hideGameRulesProject();
  gameRoomView.showGameRoomProject();
  sessionStorage.setItem("currentWindow", "game-room");
};

const loadGameRules = function () {
  mainView.hideMain();
  aboutView.hideAboutProject();
  gameView.hideGame();
  donateAuthorView.hideDonateProject();
  gameRulesView.showGameRulesProject();
  gameRoomView.hideGameRoomProject();
  sessionStorage.setItem("currentWindow", "game-rules");
};

const loadDonateAuthor = function () {
  mainView.hideMain();
  gameView.hideGame();
  gameRulesView.hideGameRulesProject();
  aboutView.hideAboutProject();
  gameRoomView.hideGameRoomProject();
  donateAuthorView.showDonateProject();
  sessionStorage.setItem("currentWindow", "donate-author");
};

const languageSelectHandler = function (language) {
  saveLanguage(language);
  model.worldCountries.language = language;
  model.loadAllCountries();
  translateAllElements();
};

const saveLanguage = function (language) {
  localStorage.setItem("language", language);
};

const cleanFirebase = function (closeChannel = false) {
  gameRoomView.cleanFirebase(closeChannel);
};

const saveCurrentLanguageHandler = function () {
  window.addEventListener("beforeunload", function () {
    const currentLanguage = document.querySelector("#language-selector").value;
    saveLanguage(currentLanguage);
  });
};

init();
