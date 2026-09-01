import { localization } from "./localization/ua.js";
import { COUNTRIES_GEO } from "./data/countries.geo.js";
import { COUNTRY_BOUNDS } from "./data/countriesBounds.js";
import * as model from "./model.js";
import { UNSPLASH_DATA } from "./config.js";

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

export const showModalWindow = function (modalId) {
  const modalWindow = new bootstrap.Modal(document.getElementById(modalId), {});
  modalWindow.show();
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

export const showCountryCoatOfArmsFlagWindow = function (
  modalId,
  showTimer = false,
) {
  const countryCoatOfArmsFlag = new bootstrap.Modal(
    document.getElementById(modalId),
    {},
  );
  if (showTimer) {
    addTimerToModal(modalId);
  } else {
    const timerContainerElement = document.getElementById(
      "modalTimerContainer",
    );
    if (timerContainerElement) timerContainerElement.remove();
  }
  countryCoatOfArmsFlag.show();
};

export const addTimerToModal = function (modalId) {
  const modal = document.getElementById(modalId);
  const timerField = document.getElementById("timer-field");
  let timerValue = 0;
  if (timerField) {
    timerValue = +timerField.textContent;
  }
  const timerContainerElement = document.getElementById("modalTimerContainer");
  if (timerContainerElement) timerContainerElement.remove();
  const timerContainer = document.createElement("div");
  timerContainer.id = "modalTimerContainer";
  timerContainer.style.position = "absolute";
  timerContainer.style.top = "10px";
  timerContainer.style.right = "10px";
  const timerIcon = document.createElement("span");
  timerIcon.textContent = "⏱️";
  const timerValueElement = document.createElement("span");
  timerValueElement.style.verticalAlign = "middle";
  if (timerValue <= 10) {
    timerValueElement.style.color = "red";
  } else {
    timerValueElement.style.color = "green";
  }
  timerValueElement.textContent = `${timerValue}`;
  timerValueElement.id = "modalTimer";
  timerContainer.appendChild(timerIcon);
  timerContainer.appendChild(timerValueElement);
  modal.querySelector(".modal-header").appendChild(timerContainer);
};

export const getCountryGeo = function (countryCode) {
  const feature = COUNTRIES_GEO.features.find(
    (feature) => feature.properties.country_a2 === countryCode,
  );
  return {
    type: COUNTRIES_GEO.type,
    features: feature ? [feature] : [],
  };
};

export const getCountryBounds = function (countryName) {
  const countryBounds = COUNTRY_BOUNDS.find(
    (bound) => countryName === bound.name,
  );
  return countryBounds;
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

export const findLastIndex = function (array, predicate) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i], i, array)) {
      return i;
    }
  }
  return -1;
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

export const getCountryPhotoUnsplash = async function (
  country,
  page = undefined,
  modifier = undefined,
) {
  const countryPhotoAttrobutionElement = document.getElementById(
    "country-photo-attribution",
  );
  countryPhotoAttrobutionElement.innerHTML = "";
  const modifiers = [
    "landscape",
    "countryside",
    "scenery",
    "cities",
    "cityscape",
    "valley",
    "street",
    "view",
  ];
  const randomModifier =
    modifier || modifiers[Math.floor(Math.random() * modifiers.length)];
  const query = encodeURIComponent(`${country.countryName} ${randomModifier}`);
  const randomPage = page || Math.floor(Math.random() * 3) + 1;
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&page=${randomPage}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${String.fromCharCode(...UNSPLASH_DATA)}`,
        "Accept-Version": "v1",
      },
    });
    const rateRemaining = response.headers.get("X-Ratelimit-Remaining");
    if (+rateRemaining === 0 || response.status === 429) {
      return getCountryPhoto(country);
    }
    if (!response.ok) {
      return getCountryPhoto(country);
    }
    const data = await response.json();
    if (data.total === 0) {
      return getCountryPhoto(country);
    }
    if ((!data.results || data.results.length === 0) && data.total > 0) {
      return getCountryPhotoUnsplash(country, data.total_pages, randomModifier);
    }
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const selectedPhoto = data.results[randomIndex];
    countryPhotoAttrobutionElement.innerHTML = `Photo by <a href="${selectedPhoto.user.links.html}?utm_source=Countries_Guesser&utm_medium=referral" target="_blank">${selectedPhoto.user.name}</a> on <a href="https://unsplash.com/?utm_source=Countries_Guesser&utm_medium=referral" target="_blank">Unsplash</a>`;
    return selectedPhoto.urls.regular;
  } catch (error) {
    countryPhotoAttrobutionElement.innerHTML = "";
    return getCountryPhoto(country);
  }
};

export const getCountryPhoto = async function (country) {
  try {
    let imageUrl = null;
    let imgUrlArray = [];
    const countryWikiCategoryName =
      country.countryWikiLandscapeCategoryName ??
      `Landscapes_of_${country.countryName}`;
    const countryLandscapeUrl = `https://commons.wikimedia.org/w/api.php?origin=*&action=query&format=json&generator=categorymembers&gcmtitle=Category:${countryWikiCategoryName}&gcmtype=file&prop=imageinfo&iiprop=url`;
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
