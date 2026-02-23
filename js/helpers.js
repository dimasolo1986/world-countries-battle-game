import { localization } from "./localization/ua.js";
import { COUNTRIES_GEO } from "./data/countries.geo.js";
import * as model from "./model.js";

export const sortData = function (data, direction = "asc") {
  data.sort((a, b) => {
    const result = localization[model.worldCountries.language]["countries"][
      a.name.common
    ].localeCompare(
      localization[model.worldCountries.language]["countries"][b.name.common],
      model.worldCountries.language,
    );
    return direction === "asc" ? result : -result;
  });
};

export const getRandomInt = function (
  min = 0,
  max = model.worldCountries.countries.length - 1,
) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const showGameCountryAllianceGuessedWindow = function () {
  const gameCountryAllianceGuessedWindow = new bootstrap.Modal(
    document.getElementById("gameCountryAllianceGuessedModal"),
    {},
  );
  gameCountryAllianceGuessedWindow.show();
};

export const hideModalWindow = function (modalId) {
  const modalWindow = document.getElementById(modalId);
  const modal = bootstrap.Modal.getInstance(modalWindow);
  if (modal) {
    modal.hide();
  }
};

export const hideGameCountryAllianceGuessedWindow = function () {
  const gameCountryAllianceGuessedWindow = document.getElementById(
    "gameCountryAllianceGuessedModal",
  );
  const modal = bootstrap.Modal.getInstance(gameCountryAllianceGuessedWindow);
  if (modal) {
    modal.hide();
  }
};

export const showGameResultWindow = function () {
  const gameResult = new bootstrap.Modal(
    document.getElementById("gameResultModal"),
    {},
  );
  gameResult.show();
};

export const resetGameRoomContainer = function () {
  document.querySelector(".create-game-room").disabled = false;
  document.querySelector(".delete-game-room").disabled = true;
  document.querySelector("#roomIdInput").value = "";
  document.querySelector(".copy-to-clipboard-link").disabled = true;
  document.querySelector(".share-game-room").disabled = true;
  const createGameRoomButton = document.querySelector(
    "#create-game-room-button",
  );
  createGameRoomButton.textContent =
    localization[model.worldCountries.language]["Create Game Room"];
  const gameRoomHeadingContainer = document.querySelector(
    "#game-room-heading-container",
  );
  gameRoomHeadingContainer.classList.add("not-displayed");
  document.querySelector("#game-room-heading-id").textContent = "";
};

export const showGameRulesWindow = function () {
  const gameRules = new bootstrap.Modal(
    document.getElementById("gameRulesModal"),
    {},
  );
  gameRules.show();
};

export const showCountryCoatOfArmsFlagWindow = function (modalId) {
  const countryCoatOfArmsFlag = new bootstrap.Modal(
    document.getElementById(modalId),
    {},
  );
  countryCoatOfArmsFlag.show();
};

export const getCountryGeo = function (countryCode) {
  const countryGeo = {};
  countryGeo.type = COUNTRIES_GEO.type;
  countryGeo.features = COUNTRIES_GEO.features.filter(
    (feature) => feature.properties.country_a2 === countryCode,
  );
  return countryGeo;
};

export const shareQuizResults = function () {
  const quizResultsLabelText = document.getElementById(
    "quizModalResultLabel",
  ).textContent;
  const quizName = document.getElementById("quizModalName").textContent;
  const quizScoreNameResult =
    document.querySelector(".score-name-result").textContent;
  const quizScoreResult = document.querySelector(".score-result").textContent;
  const quizScoreResultPoints = document.querySelector(
    ".score-result-points",
  ).textContent;
  const quizRightAnswersText = document.querySelector(
    ".right-answers-text",
  ).textContent;
  const quizRightAnswersNumberText = document.querySelector(
    ".right-answers-number",
  ).textContent;
  const quizRightAnswersOutOfText = document.querySelector(
    ".right-answers-out-of",
  ).textContent;
  const answeredNumber = document.querySelector(".answered-number").textContent;
  const ratingText = document.querySelector(".rating-text").textContent;
  const ratingStar = document.querySelector(".rating-star").textContent;
  const quizShareResultText = `https://www.worldcountriesquiz.com | ${quizName} | ${currentDateTime()} | ${quizScoreNameResult} ${quizScoreResult} ${quizScoreResultPoints} | ${quizRightAnswersText} ${quizRightAnswersNumberText} ${quizRightAnswersOutOfText} ${answeredNumber} | ${ratingText} ${ratingStar}`;
  if (navigator.share) {
    navigator
      .share({
        title: `${
          localization[model.worldCountries.language][
            "World Countries And Quizzes"
          ]
        } | ${quizResultsLabelText} : ${quizName}`,
        text: `${quizShareResultText}`,
        url: "https://www.worldcountriesquiz.com",
      })
      .then(function () {})
      .catch(function () {});
  }
};

export const currentDateTime = function () {
  const d = new Date();
  const date = d.toISOString().split("T")[0];
  const time = d.toTimeString().split(" ")[0];
  return `${date} ${time}`;
};

export const getLanguageCode = function () {
  if (model.worldCountries.language === "ua") {
    return "uk";
  }
  if (model.worldCountries.language === "en") {
    return "en";
  }
  if (model.worldCountries.language === "de") {
    return "de";
  }
  if (model.worldCountries.language === "fr") {
    return "fr";
  }
  if (model.worldCountries.language === "es") {
    return "es";
  }
  if (model.worldCountries.language === "it") {
    return "it";
  }
  return "en";
};

export const generateRoomId = function (length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length];
  }
  return result;
};

export const getCountryPhoto = async function (country) {
  try {
    let imageUrl = null;
    let imgUrlArray = [];
    const countryLandscapeUrl = `https://commons.wikimedia.org/w/api.php?origin=*&action=query&format=json&generator=categorymembers&gcmtitle=Category:Landscapes_of_${country.countryName}&gcmtype=file&prop=imageinfo&iiprop=url`;
    const resLandscapes = await fetch(countryLandscapeUrl);
    const dataLandscapes = await resLandscapes.json();
    const urlsLaandscapes = extractImageUrls(dataLandscapes);
    imgUrlArray.push(...urlsLaandscapes);
    if (imgUrlArray.length === 0) return null;
    imgUrlArray = imgUrlArray.filter(
      (url) => /\.(jpe?g)(\?.*)?$/i.test(url) && !url.includes("View_of_Earth"),
    );
    let randomUrlIndex = getRandomInt(0, imgUrlArray.length - 1);
    imageUrl = imgUrlArray[randomUrlIndex];
    return imageUrl;
  } catch (e) {
    return null;
  }
};

function extractImageUrls(wikiData) {
  try {
    if (!wikiData?.query?.pages) return [];
    const pages = wikiData.query.pages;
    const urls = [];
    for (const pageId in pages) {
      const page = pages[pageId];
      if (page.imageinfo && page.imageinfo.length > 0) {
        const imgUrl = page.imageinfo[0].url;
        if (imgUrl) urls.push(imgUrl);
      }
    }
    return urls;
  } catch (e) {
    return [];
  }
}
