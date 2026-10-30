import { localization } from "./localization/ua.js";
import * as model from "./model.js";
import { COUNTRIES } from "./data/countries.js";
import {
  showModalWindow,
  hideModalWindow,
  showGameResultWindow,
} from "./helpers.js";

const NICKNAME_KEY = "nickname";
const PLAYER_ID_KEY = "leaderboardPlayerId";
const COUNTRY_KEY = "leaderboardCountry";
const MAX_NICKNAME_LENGTH = 20;
const BOARD_SIZE = 100;
const MAX_SCORE = 660;
const MEDALS = ["🥇", "🥈", "🥉"];

const MODES = {
  computer: { emoji: "🤖", label: "Computer" },
  friend: { emoji: "👨🏻", label: "Friend" },
};

let getFirebase = () => null;
let pendingResult = null;
let boardPeriod = "week";
let boardRequest = 0;

let cameFromResult = false;
let returnModalId = null;
let nextAfterPost = null;

const translate = (key) => localization[model.worldCountries.language][key];
const getElementById = (id) => document.getElementById(id);

const setStatus = function (id, text, isError = false) {
  const status = getElementById(id);
  status.textContent = text;
  status.style.color = isError ? "#dc2626" : "#16a34a";
};

const whenHidden = function (modalId, callback) {
  const element = getElementById(modalId);
  if (!element.classList.contains("show")) {
    callback();
    return;
  }
  element.addEventListener("hidden.bs.modal", callback, { once: true });
  hideModalWindow(modalId);
};

const cleanNickname = function (value) {
  return value
    .replace(/[\p{Cc}\p{Cf}\p{Zl}\p{Zp}]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_NICKNAME_LENGTH);
};

const defaultNickname = function () {
  let id = localStorage.getItem(PLAYER_ID_KEY);
  if (!id) {
    id = Math.random().toString(36).slice(2, 6);
    localStorage.setItem(PLAYER_ID_KEY, id);
  }
  return `Player-${id}`;
};

const COUNTRY_NAMES = new Map(
  COUNTRIES.map((country) => [country.cca2.toLowerCase(), country.name.common]),
);

const countryName = function (code) {
  const common = COUNTRY_NAMES.get(code);
  return (
    localization[model.worldCountries.language].countries?.[common] || common
  );
};

const COUNTRY_FLAGS = new Map(
  COUNTRIES.map((country) => [country.cca2.toLowerCase(), country.flags.webp]),
);
const flagSrc = (code) => COUNTRY_FLAGS.get(code);

const guessCountry = function () {
  for (const language of navigator.languages || [navigator.language]) {
    try {
      const region = new Intl.Locale(language).region?.toLowerCase();
      if (COUNTRY_NAMES.has(region)) return region;
    } catch {
      // Malformed language tag: try the next one.
    }
  }
  return "";
};

const createFlagImage = function (code) {
  const flag = document.createElement("img");
  flag.className = "leaderboard-country-flag";
  flag.alt = "";
  flag.loading = "lazy";
  flag.src = flagSrc(code);
  return flag;
};

const createCountryRow = function (code, name) {
  const label = document.createElement("span");
  label.textContent = name;
  return code ? [createFlagImage(code), label] : [label];
};

const countryItems = () => [
  ...getElementById("leaderboardCountryList").querySelectorAll(
    ".leaderboard-country-item",
  ),
];

const setActiveCountryItem = function (item) {
  countryItems().forEach((other) =>
    other.classList.toggle("active", other === item),
  );
  item?.scrollIntoView({ block: "nearest" });
};

const COUNTRY_LIST_MAX_HEIGHT = 200;
const COUNTRY_LIST_MIN_HEIGHT = 80;
const COUNTRY_LIST_EDGE_GAP = 8;

const placeCountryList = function (list, button) {
  const rect = button.getBoundingClientRect();
  const below = window.innerHeight - rect.bottom - COUNTRY_LIST_EDGE_GAP;
  const above = rect.top - COUNTRY_LIST_EDGE_GAP;
  const openUp = below < COUNTRY_LIST_MAX_HEIGHT && above > below;
  list.style.left = `${rect.left}px`;
  list.style.width = `${rect.width}px`;
  list.style.top = openUp ? "auto" : `${rect.bottom + 2}px`;
  list.style.bottom = openUp
    ? `${window.innerHeight - rect.top + 2}px`
    : "auto";
  list.style.maxHeight = `${Math.max(
    COUNTRY_LIST_MIN_HEIGHT,
    Math.min(COUNTRY_LIST_MAX_HEIGHT, openUp ? above : below),
  )}px`;
};

const setCountryListOpen = function (open) {
  const list = getElementById("leaderboardCountryList");
  const button = getElementById("leaderboardCountryButton");
  if (open) placeCountryList(list, button);
  list.classList.toggle("open", open);
  button.setAttribute("aria-expanded", open);
  setActiveCountryItem(
    open ? (list.querySelector(".selected") ?? countryItems()[0]) : null,
  );
};

const chooseCountry = function (code) {
  const select = getElementById("leaderboardCountrySelect");
  select.value = code;
  select.dispatchEvent(new Event("change"));
};

const TYPE_AHEAD_RESET_MS = 1000;
let typedCountryPrefix = "";
let typedCountryTimer;

const handleCountryKeydown = function (event) {
  const list = getElementById("leaderboardCountryList");
  const open = list.classList.contains("open");
  const items = countryItems();
  const current = list.querySelector(open ? ".active" : ".selected");
  const index = items.indexOf(current);
  const isTyping =
    event.key.length === 1 &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey &&
    (event.key !== " " || typedCountryPrefix !== "");
  if (isTyping) {
    event.preventDefault();
    typedCountryPrefix += event.key.toLocaleLowerCase();
    clearTimeout(typedCountryTimer);
    typedCountryTimer = setTimeout(() => {
      typedCountryPrefix = "";
    }, TYPE_AHEAD_RESET_MS);
    const match = items.find(
      (item) =>
        item.dataset.code &&
        item.textContent.toLocaleLowerCase().startsWith(typedCountryPrefix),
    );
    if (!match) return;
    if (open) setActiveCountryItem(match);
    else chooseCountry(match.dataset.code);
    return;
  }
  switch (event.key) {
    case "ArrowDown":
    case "ArrowUp": {
      event.preventDefault();
      if (!open) return setCountryListOpen(true);
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveCountryItem(
        items[Math.min(items.length - 1, Math.max(0, index + step))],
      );
      break;
    }
    case "Home":
    case "End":
      if (!open) return;
      event.preventDefault();
      setActiveCountryItem(event.key === "Home" ? items[0] : items.at(-1));
      break;
    case "Enter":
    case " ":
      event.preventDefault();
      if (!open) return setCountryListOpen(true);
      if (current) chooseCountry(current.dataset.code);
      setCountryListOpen(false);
      break;
    case "Escape":
      if (!open) return;
      event.preventDefault();
      event.stopPropagation();
      setCountryListOpen(false);
      break;
    case "Tab":
      setCountryListOpen(false);
      break;
  }
};

const updateCountryFlag = function () {
  const select = getElementById("leaderboardCountrySelect");
  const code = select.value;
  getElementById("leaderboardCountryButton").replaceChildren(
    ...createCountryRow(code, select.selectedOptions[0]?.text ?? "—"),
  );
  getElementById("leaderboardCountryList")
    .querySelectorAll(".leaderboard-country-item")
    .forEach((item) =>
      item.classList.toggle("selected", item.dataset.code === code),
    );
};

const renderCountrySelect = function () {
  getElementById("leaderboardCountryLabel").textContent = translate("Country");
  const select = getElementById("leaderboardCountrySelect");
  const locale =
    model.worldCountries.language === "ua"
      ? "uk"
      : model.worldCountries.language;
  const options = [...COUNTRY_NAMES.keys()]
    .map((code) => ({ code, name: countryName(code) }))
    .sort((a, b) => a.name.localeCompare(b.name, locale));
  select.textContent = "";
  select.add(new Option("—", ""));
  options.forEach(({ code, name }) => select.add(new Option(name, code)));
  const list = getElementById("leaderboardCountryList");
  list.replaceChildren(
    ...[{ code: "", name: "—" }, ...options].map(({ code, name }) => {
      const item = document.createElement("div");
      item.className = "leaderboard-country-item";
      item.dataset.code = code;
      item.setAttribute("role", "option");
      item.append(...createCountryRow(code, name));
      return item;
    }),
  );
  setCountryListOpen(false);
  const saved = localStorage.getItem(COUNTRY_KEY);
  select.value = saved === null ? guessCountry() : saved;
  updateCountryFlag();
};

const createOpponentBadge = function (mode) {
  const badge = document.createElement("span");
  badge.className = `opponent-badge opponent-badge-${mode}`;
  const emoji = document.createElement("span");
  emoji.className = "opponent-emoji";
  emoji.textContent = MODES[mode].emoji;
  const label = document.createElement("label");
  label.textContent = translate(MODES[mode].label);
  badge.append(emoji, label);
  return badge;
};

const renderPostDialog = function () {
  getElementById("leaderboardPostTitle").textContent =
    `🏆 ${translate("Post Results")}`;
  getElementById("leaderboardPostScore").textContent =
    `🏅 ${translate("Score")}: ${pendingResult.score} ${translate("Points")}`;
  const modeLine = getElementById("leaderboardPostMode");
  const modeTitle = document.createElement("strong");
  modeTitle.textContent = `${translate("Mode")}: `;
  modeLine.replaceChildren(modeTitle, createOpponentBadge(pendingResult.mode));
  getElementById("leaderboardNicknameLabel").textContent =
    translate("Nickname");
  const input = getElementById("leaderboardNicknameInput");
  input.maxLength = MAX_NICKNAME_LENGTH;
  input.placeholder = defaultNickname();
  input.value = localStorage.getItem(NICKNAME_KEY) || "";
  renderCountrySelect();
  getElementById("leaderboardPostSubmit").textContent = translate("Post");
  getElementById("leaderboardPostCancel").textContent = translate("Close");
  getElementById("leaderboardPostStatus").textContent = "";
};

const submitResult = async function () {
  const submitButton = getElementById("leaderboardPostSubmit");
  const nickname =
    cleanNickname(getElementById("leaderboardNicknameInput").value) ||
    defaultNickname();
  const country = getElementById("leaderboardCountrySelect").value;
  submitButton.disabled = true;
  setStatus("leaderboardPostStatus", translate("Loading..."));
  try {
    const result = await getFirebase().postLeaderboardScore({
      nickname,
      score: pendingResult.score,
      mode: pendingResult.mode,
      country,
    });
    localStorage.setItem(NICKNAME_KEY, nickname);
    localStorage.setItem(COUNTRY_KEY, country);
    if (result.posted) {
      setStatus(
        "leaderboardPostStatus",
        translate("Posted to the leaderboard!"),
      );
      nextAfterPost = openLeaderboard;
      hideModalWindow("leaderboardPostModal");
      if (window.gtag) gtag("event", "post_leaderboard_result");
    } else {
      setStatus(
        "leaderboardPostStatus",
        `${translate("Your best score is")} ${result.bestScore}`,
        true,
      );
    }
  } catch {
    setStatus(
      "leaderboardPostStatus",
      translate("Leaderboard is unavailable. Try again later."),
      true,
    );
  } finally {
    submitButton.disabled = false;
  }
};

const renderBoard = function (rows, own) {
  const body = getElementById("leaderboardBody");
  body.textContent = "";
  if (rows.length === 0) {
    body.textContent = translate("No results yet");
    return;
  }
  const table = document.createElement("table");
  table.className = "lb-table";
  const head = table.createTHead().insertRow();
  [
    translate("Rank"),
    translate("Country"),
    translate("Player"),
    translate("Score"),
    translate("Mode"),
  ].forEach((title) => {
    const cell = document.createElement("th");
    cell.textContent = title;
    head.appendChild(cell);
  });
  const tbody = table.createTBody();
  rows.forEach((row, index) => {
    const tr = tbody.insertRow();
    if (own && row.uid === own.uid) tr.classList.add("lb-own");
    tr.insertCell().textContent = MEDALS[index] || String(index + 1);
    const flagCell = tr.insertCell();
    if (COUNTRY_NAMES.has(row.country)) {
      const flag = document.createElement("img");
      flag.className = "lb-flag";
      flag.src = flagSrc(row.country);
      flag.alt = countryName(row.country);
      flag.title = countryName(row.country);
      flag.loading = "lazy";
      flagCell.appendChild(flag);
    }
    const nameCell = tr.insertCell();
    const name = document.createElement("span");
    name.className = "lb-name";
    name.textContent = row.nickname;
    nameCell.appendChild(name);
    tr.insertCell().textContent = row.score;
    tr.insertCell().appendChild(createOpponentBadge(row.mode));
  });
  body.appendChild(table);
};

const daysUntilWeekReset = function () {
  const now = new Date();
  const nextMonday = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + (8 - (now.getUTCDay() || 7)),
  );
  return Math.ceil((nextMonday - now.getTime()) / 86400000);
};

const dayWord = function (count) {
  const language = model.worldCountries.language;
  const category = new Intl.PluralRules(
    language === "ua" ? "uk" : language,
  ).select(count);
  const key =
    category === "one" || category === "few" ? `day ${category}` : "day other";
  return translate(key) || translate("day other");
};

const renderTabs = function () {
  const tabs = { week: "leaderboardTabWeek", all: "leaderboardTabAll" };
  getElementById(tabs.week).textContent = translate("This week");
  getElementById(tabs.all).textContent = translate("All time");
  Object.entries(tabs).forEach(([period, id]) =>
    getElementById(id).classList.toggle("active", period === boardPeriod),
  );
  getElementById("leaderboardReset").textContent =
    boardPeriod === "week"
      ? `${translate("Resets in")} ${daysUntilWeekReset()} ${dayWord(daysUntilWeekReset())}`
      : "";
};

const loadBoard = async function () {
  const request = ++boardRequest;
  renderTabs();
  getElementById("leaderboardBody").textContent = translate("Loading...");
  getElementById("leaderboardOwn").textContent = "";
  try {
    const firebase = getFirebase();
    const own = await firebase.getOwnLeaderboardEntry(boardPeriod);
    const rows = await firebase.fetchLeaderboard(BOARD_SIZE, boardPeriod);
    if (request !== boardRequest) return;
    renderBoard(rows, own);
    if (own && !rows.some((row) => row.uid === own.uid)) {
      getElementById("leaderboardOwn").textContent =
        `${translate("Your best score is")} ${own.score} (${own.nickname})`;
    }
  } catch {
    if (request !== boardRequest) return;
    getElementById("leaderboardBody").textContent = translate(
      "Leaderboard is unavailable. Try again later.",
    );
  }
};

export const openLeaderboard = function () {
  getElementById("leaderboardTitle").textContent =
    `🏆 ${translate("Leaderboard")}`;
  getElementById("leaderboardCloseButton").textContent = translate("Close");
  showModalWindow("leaderboardModal");
  if (window.gtag) gtag("event", "open_leaderboard");
  return loadBoard();
};

export const setPendingResult = function ({ score, mode }) {
  const safeScore = Number.isFinite(score)
    ? Math.min(MAX_SCORE, Math.max(0, Math.round(score)))
    : 0;
  pendingResult = { score: safeScore, mode };
};

export const openLeaderboardOver = function (modalId) {
  returnModalId = modalId;
  whenHidden(modalId, openLeaderboard);
};

export const openPostDialog = function () {
  if (!pendingResult) return;
  cameFromResult = true;
  renderPostDialog();
  whenHidden("gameResultModal", () => showModalWindow("leaderboardPostModal"));
};

export const initLeaderboard = function (firebaseGetter) {
  getFirebase = firebaseGetter;
  const sticky = getElementById("leaderboardSticky");
  new ResizeObserver(() => {
    getElementById("leaderboardModal").style.setProperty(
      "--lb-sticky-height",
      `${sticky.offsetHeight}px`,
    );
  }).observe(sticky);
  getElementById("leaderboardPostSubmit").addEventListener(
    "click",
    submitResult,
  );
  [
    ["leaderboardTabWeek", "week"],
    ["leaderboardTabAll", "all"],
  ].forEach(([id, period]) =>
    getElementById(id).addEventListener("click", () => {
      boardPeriod = period;
      document.querySelector("#leaderboardModal .modal-body").scrollTop = 0;
      loadBoard();
    }),
  );
  getElementById("leaderboardCountrySelect").addEventListener(
    "change",
    updateCountryFlag,
  );
  getElementById("leaderboardCountryButton").addEventListener("click", () =>
    setCountryListOpen(
      !getElementById("leaderboardCountryList").classList.contains("open"),
    ),
  );
  getElementById("leaderboardCountryList").addEventListener(
    "click",
    (event) => {
      const item = event.target.closest(".leaderboard-country-item");
      if (!item) return;
      chooseCountry(item.dataset.code);
      setCountryListOpen(false);
    },
  );
  getElementById("leaderboardCountryButton").addEventListener(
    "keydown",
    handleCountryKeydown,
  );
  getElementById("leaderboardCountryButton").addEventListener(
    "keyup",
    (event) => {
      if (event.key === " ") event.preventDefault();
    },
  );
  window.addEventListener("resize", () => setCountryListOpen(false));
  document.addEventListener(
    "scroll",
    (event) => {
      if (event.target !== getElementById("leaderboardCountryList")) {
        setCountryListOpen(false);
      }
    },
    true,
  );
  getElementById("leaderboardPostModal").addEventListener("click", (event) => {
    if (!event.target.closest("#leaderboardCountryPicker")) {
      setCountryListOpen(false);
    }
  });
  getElementById("leaderboardNicknameInput").addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Enter") submitResult();
    },
  );
  getElementById("leaderboardPostModal").addEventListener(
    "hidden.bs.modal",
    () => {
      if (nextAfterPost) {
        const next = nextAfterPost;
        nextAfterPost = null;
        next();
      } else if (cameFromResult) {
        cameFromResult = false;
        showGameResultWindow();
      }
    },
  );
  getElementById("leaderboardModal").addEventListener("hidden.bs.modal", () => {
    if (returnModalId) {
      const modalId = returnModalId;
      returnModalId = null;
      showModalWindow(modalId);
    } else if (cameFromResult) {
      cameFromResult = false;
      showGameResultWindow();
    }
  });
};
