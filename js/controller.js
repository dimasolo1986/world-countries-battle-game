import * as model from "./model.js";
import languageSelectView from "./views/languageSelectView.js";
import aboutView from "./views/aboutView.js";
import mainView from "./views/mainView.js";
import { localization } from "./localization/ua.js";
import gameView from "./views/gameView.js";
import donateAuthorView from "./views/donateAuthorView.js";
import gameRulesView from "./views/gameRulesView.js";
const init = function () {
  languageSelectView.init();
  translateAllElements();
  languageSelectView.addHandlerSelect(languageSelectHandler);
  aboutView.addReturnToMainHandlerClick(
    mainView,
    donateAuthorView,
    gameRulesView
  );
  donateAuthorView.addReturnBackHandlerClick(
    mainView,
    aboutView,
    gameRulesView
  );
  donateAuthorView.addShareWebSiteHandlerClick();
  gameRulesView.addReturnToMainHandlerClick(
    mainView,
    donateAuthorView,
    aboutView
  );
  mainView.addAboutHandlerClick(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView
  );
  mainView.addStartGameHandlerClick(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView
  );
  mainView.addSupportProjectHandlerClick(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView
  );
  mainView.addGameRulesHandlerClick(
    aboutView,
    gameView,
    donateAuthorView,
    gameRulesView
  );
  saveCurrentLanguageHandler();
  loadWindow();
  // document.addEventListener("DOMContentLoaded", function () {
  //   document.addEventListener("hide.bs.modal", function () {
  //     if (document.activeElement) {
  //       document.activeElement.blur();
  //     }
  //   });
  //   const quizResultsShareButton = document.getElementById("shareQuizResults");
  //   if (quizResultsShareButton) {
  //     quizResultsShareButton.addEventListener("click", () => {
  //       shareQuizResults();
  //     });
  //   }
  //   const shareWebSiteContent = {
  //     title: `${
  //       localization[model.worldCountries.language][
  //         "World Countries And Quizzes"
  //       ]
  //     }`,
  //     text: `${
  //       localization[model.worldCountries.language][
  //         "World Countries And Quizzes"
  //       ]
  //     } - ${
  //       document.querySelector(".about-project-description").textContent +
  //       " " +
  //       document.querySelector(".about-info").textContent
  //     }`,
  //     url: "https://www.worldcountriesquiz.com",
  //   };
  //   const shareWebSiteButton = document.getElementById("shareWebSite");
  //   if (shareWebSiteButton) {
  //     shareWebSiteButton.addEventListener("click", function () {
  //       if (navigator.share) {
  //         navigator
  //           .share(shareWebSiteContent)
  //           .then(function () {})
  //           .catch(function () {});
  //       }
  //     });
  //   }
  //   const shareWebSiteCountryInfo = document.getElementById(
  //     "shareCountryInfoModal"
  //   );
  //   if (shareWebSiteCountryInfo) {
  //     shareWebSiteCountryInfo.addEventListener("click", function () {
  //       if (navigator.share) {
  //         navigator
  //           .share(shareWebSiteContent)
  //           .then(function () {})
  //           .catch(function () {});
  //       }
  //     });
  //   }
  //   const shareWebSiteGame = document.getElementById("shareGameResults");
  //   if (shareWebSiteGame) {
  //     shareWebSiteGame.addEventListener("click", function () {
  //       if (navigator.share) {
  //         navigator
  //           .share(shareWebSiteContent)
  //           .then(function () {})
  //           .catch(function () {});
  //       }
  //     });
  //   }
  // });
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
      default:
        loadMain(savedWindow);
        break;
    }
  } else {
    loadMain();
  }
};

const loadMain = function () {
  aboutView.hideAboutProject();
  mainView.showMain();
  gameView.hideGame();
  sessionStorage.setItem("currentWindow", "main");
  donateAuthorView.hideDonateProject();
};

const loadAboutProject = function () {
  mainView.hideMain();
  gameView.hideGame();
  aboutView.showAboutProjectInfo();
  sessionStorage.setItem("currentWindow", "about-project");
  donateAuthorView.hideDonateProject();
};

const translateAllElements = function () {
  aboutView.translateElements();
  mainView.translateElements();
  donateAuthorView.translateElements();
  gameRulesView.translateElements();
};

const loadGameRules = function () {
  mainView.hideMain();
  aboutView.hideAboutProject();
  gameView.hideGame();
  donateAuthorView.hideDonateProject();
  gameRulesView.showGameRulesProject();
  sessionStorage.setItem("currentWindow", "game-rules");
};

const loadDonateAuthor = function () {
  mainView.hideMain();
  gameView.hideGame();
  gameRulesView.hideGameRulesProject();
  aboutView.hideAboutProject();
  donateAuthorView.showDonateProject();
  sessionStorage.setItem("currentWindow", "donate-author");
};

const languageSelectHandler = function (language) {
  saveLanguage(language);
  location.reload();
  model.worldCountries.language = language;
  model.loadAllCountries();
  renderAll();
};

const renderAll = function () {};

const saveLanguage = function (language) {
  localStorage.setItem("language", language);
};

const saveCurrentLanguageHandler = function () {
  window.addEventListener("beforeunload", function () {
    const currentLanguage = document.querySelector("#language-selector").value;
    saveLanguage(currentLanguage);
  });
};

init();
