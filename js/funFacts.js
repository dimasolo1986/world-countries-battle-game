import { localization } from "./localization/ua.js";
import * as model from "./model.js";
import { COUNTRIES } from "./data/countries.js";
import { getRandomInt } from "./helpers.js";

const TEMPLATES = {
  ua: {
    title: "Чи знаєте ви?",
    capital: "Столиця країни {country} — {value}.",
    population: "У країні {country} проживає близько {value} осіб.",
    area: "Площа країни {country} — приблизно {value} км².",
    landlocked: "Країна {country} не має виходу до моря.",
    borders: "Кількість сухопутних сусідів країни {country}: {value}.",
    noBorders: "Країна {country} не має сухопутних кордонів.",
    timezones: "Країна {country} охоплює часових поясів: {value}.",
    region: "Частина світу країни {country}: {value}.",
    subregion: "Регіон країни {country}: {value}.",
  },
  en: {
    title: "Did you know?",
    capital: "The capital of {country} is {value}.",
    population: "{country} has about {value} people.",
    area: "{country} covers about {value} km².",
    landlocked: "{country} has no sea coast: it is landlocked.",
    borders: "{country} shares land borders with {value} countries.",
    noBorders: "{country} has no land borders.",
    timezones: "{country} spans {value} time zones.",
    region: "{country} is located in {value}.",
    subregion: "{country} belongs to the {value} subregion.",
  },
  de: {
    title: "Wusstest du schon?",
    capital: "Die Hauptstadt von {country} ist {value}.",
    population: "In {country} leben etwa {value} Menschen.",
    area: "{country} hat eine Fläche von etwa {value} km².",
    landlocked: "{country} hat keinen Zugang zum Meer.",
    borders: "{country} grenzt an {value} Länder.",
    noBorders: "{country} hat keine Landgrenzen.",
    timezones: "{country} erstreckt sich über {value} Zeitzonen.",
    region: "Weltteil von {country}: {value}.",
    subregion: "Region von {country}: {value}.",
  },
  fr: {
    title: "Le saviez-vous ?",
    capital: "La capitale de {country} est {value}.",
    population: "{country} compte environ {value} habitants.",
    area: "{country} couvre environ {value} km².",
    landlocked: "{country} n’a pas d’accès à la mer.",
    borders: "{country} a des frontières terrestres avec {value} pays.",
    noBorders: "{country} n’a pas de frontières terrestres.",
    timezones: "{country} s’étend sur {value} fuseaux horaires.",
    region: "Partie du monde de {country} : {value}.",
    subregion: "Sous-région de {country} : {value}.",
  },
  es: {
    title: "¿Sabías que?",
    capital: "La capital de {country} es {value}.",
    population: "{country} tiene unos {value} habitantes.",
    area: "{country} abarca unos {value} km².",
    landlocked: "{country} no tiene salida al mar.",
    borders: "{country} comparte fronteras terrestres con {value} países.",
    noBorders: "{country} no tiene fronteras terrestres.",
    timezones: "{country} abarca {value} zonas horarias.",
    region: "Parte del mundo de {country}: {value}.",
    subregion: "Subregión de {country}: {value}.",
  },
  it: {
    title: "Lo sapevi?",
    capital: "La capitale di {country} è {value}.",
    population: "{country} ha circa {value} abitanti.",
    area: "{country} copre circa {value} km².",
    landlocked: "{country} non ha sbocco sul mare.",
    borders: "{country} confina via terra con {value} paesi.",
    noBorders: "{country} non ha confini terrestri.",
    timezones: "{country} si estende su {value} fusi orari.",
    region: "Parte del mondo di {country}: {value}.",
    subregion: "Sottoregione di {country}: {value}.",
  },
};

const candidateFacts = function (country, language) {
  const capital = country.capital?.[0];
  const localizedCapital =
    localization[language].capitals?.[capital] || capital;
  const number = new Intl.NumberFormat(language === "ua" ? "uk" : language);
  const facts = [];
  if (capital) facts.push(["capital", localizedCapital]);
  if (country.population)
    facts.push(["population", number.format(country.population)]);
  if (country.area)
    facts.push(["area", number.format(Math.round(country.area))]);
  if (country.landlocked) facts.push(["landlocked", ""]);
  if (country.borders?.length)
    facts.push(["borders", String(country.borders.length)]);
  else if (!country.landlocked) facts.push(["noBorders", ""]);
  if (country.timezones?.length > 1)
    facts.push(["timezones", String(country.timezones.length)]);
  const names = localization[language];
  if (country.region)
    facts.push(["region", names[country.region] || country.region]);
  if (country.subregion)
    facts.push(["subregion", names[country.subregion] || country.subregion]);
  return facts;
};

export const pickFact = function (codes) {
  if (!codes.length) return "";
  const language = model.worldCountries.language;
  const templates = TEMPLATES[language] || TEMPLATES.en;
  const code = codes[getRandomInt(0, codes.length - 1)];
  const country = COUNTRIES.find((item) => item.cca2 === code);
  if (!country) return "";
  const facts = candidateFacts(country, language);
  if (facts.length === 0) return "";
  const [kind, value] = facts[getRandomInt(0, facts.length - 1)];
  const name =
    localization[language].countries[country.name.common] ||
    country.name.common;
  return `💡 ${templates.title} ${templates[kind]
    .replace("{country}", name)
    .replace("{value}", value)}`;
};
