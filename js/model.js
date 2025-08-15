import { COUNTRIES } from "./data/countries.js";

export const worldCountries = {
  language: "en",
  countries: [],
};

const init = function () {
  loadLanguage();
  loadAllCountries();
};

const loadLanguage = function () {
  const language = localStorage.getItem("language");
  if (language) {
    worldCountries.language = language;
  } else {
    worldCountries.language = "en";
  }
  document.querySelector("#language-selector").value = language;
};

export const loadAllCountries = function () {
  worldCountries.countries = COUNTRIES;
};

init();
