import { localization } from "./localization/ua.js";
import { COUNTRIES_GEO } from "./data/countries.geo.js";
import * as model from "./model.js";

export const sortData = function (data, direction = "asc") {
  data.sort((a, b) => {
    const result = localization[model.worldCountries.language]["countries"][
      a.name.common
    ].localeCompare(
      localization[model.worldCountries.language]["countries"][b.name.common],
      model.worldCountries.language
    );
    return direction === "asc" ? result : -result;
  });
};

export const getRandomInt = function (
  min = 0,
  max = model.worldCountries.countries.length - 1
) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const showGameResultWindow = function () {
  const gameResult = new bootstrap.Modal(
    document.getElementById("gameResultModal"),
    {}
  );
  gameResult.show();
};

export const showGameRulesWindow = function () {
  const gameRules = new bootstrap.Modal(
    document.getElementById("gameRulesModal"),
    {}
  );
  gameRules.show();
};

export const getCountryGeo = function (countryCode) {
  const countryGeo = {};
  countryGeo.type = COUNTRIES_GEO.type;
  countryGeo.features = COUNTRIES_GEO.features.filter(
    (feature) => feature.properties.country_a2 === countryCode
  );
  return countryGeo;
};

export const shareQuizResults = function () {
  const quizResultsLabelText = document.getElementById(
    "quizModalResultLabel"
  ).textContent;
  const quizName = document.getElementById("quizModalName").textContent;
  const quizScoreNameResult =
    document.querySelector(".score-name-result").textContent;
  const quizScoreResult = document.querySelector(".score-result").textContent;
  const quizScoreResultPoints = document.querySelector(
    ".score-result-points"
  ).textContent;
  const quizRightAnswersText = document.querySelector(
    ".right-answers-text"
  ).textContent;
  const quizRightAnswersNumberText = document.querySelector(
    ".right-answers-number"
  ).textContent;
  const quizRightAnswersOutOfText = document.querySelector(
    ".right-answers-out-of"
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
