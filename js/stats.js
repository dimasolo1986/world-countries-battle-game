import { localization } from "./localization/ua.js";
import * as model from "./model.js";
import { COUNTRIES } from "./data/countries.js";
import { showModalWindow, hideModalWindow } from "./helpers.js";

const STATS_KEY = "gameStats";
const MAX_MISSED = 200;
const TOP_MISSED = 5;

let returnModalId = null;

const translate = (key) => localization[model.worldCountries.language][key];
const getElementById = (id) => document.getElementById(id);

const emptyStats = () => ({
  v: 1,
  games: 0,
  wins: 0,
  totalScore: 0,
  bestScore: 0,
  trapsHit: 0,
  hintsUsed: 0,
  byMode: {
    computer: { games: 0, wins: 0 },
    friend: { games: 0, wins: 0 },
  },
  missed: {},
});

const loadStats = function () {
  try {
    const stored = JSON.parse(localStorage.getItem(STATS_KEY));
    if (stored && stored.v === 1) return { ...emptyStats(), ...stored };
  } catch {
    // unreadable value: start over
  }
  return emptyStats();
};

const saveStats = function (stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    // storage full or blocked: stats are a nicety, never break the game
  }
};

export const recordGame = function ({
  score,
  mode,
  won,
  missedCodes = [],
  trapsHit = 0,
  hintsUsed = 0,
}) {
  const stats = loadStats();
  const safeScore = Number.isFinite(score) ? Math.max(0, Math.round(score)) : 0;
  const modeKey = mode === "friend" ? "friend" : "computer";
  stats.games += 1;
  stats.totalScore += safeScore;
  stats.bestScore = Math.max(stats.bestScore, safeScore);
  stats.trapsHit += trapsHit || 0;
  stats.hintsUsed += hintsUsed || 0;
  stats.byMode[modeKey].games += 1;
  if (won) {
    stats.wins += 1;
    stats.byMode[modeKey].wins += 1;
  }
  missedCodes.forEach((code) => {
    stats.missed[code] = (stats.missed[code] || 0) + 1;
  });
  const entries = Object.entries(stats.missed);
  if (entries.length > MAX_MISSED) {
    stats.missed = Object.fromEntries(
      entries.sort((a, b) => b[1] - a[1]).slice(0, MAX_MISSED),
    );
  }
  saveStats(stats);
};

const percent = (part, total) =>
  total ? `${Math.round((part / total) * 100)}%` : "–";

const addRow = function (table, label, value) {
  const row = table.insertRow();
  row.insertCell().textContent = label;
  const valueCell = row.insertCell();
  valueCell.textContent = value;
  valueCell.className = "stats-value";
};

const renderMissed = function (stats, body) {
  const top = Object.entries(stats.missed)
    .sort((a, b) => b[1] - a[1])
    .slice(0, TOP_MISSED);
  if (top.length === 0) return;
  const heading = document.createElement("div");
  heading.className = "stats-heading";
  heading.textContent = translate("Most missed countries");
  body.appendChild(heading);
  const list = document.createElement("div");
  list.className = "stats-missed";
  top.forEach(([code, count]) => {
    const country = COUNTRIES.find((item) => item.cca2 === code);
    if (!country) return;
    const item = document.createElement("div");
    item.className = "stats-missed-item";
    const flag = document.createElement("img");
    flag.className = "lb-flag";
    flag.src = country.flags.webp;
    flag.alt = "";
    item.appendChild(flag);
    const name = document.createElement("span");
    name.textContent =
      translate("countries")[country.name.common] || country.name.common;
    item.appendChild(name);
    const times = document.createElement("span");
    times.className = "stats-value";
    times.textContent = `×${count}`;
    item.appendChild(times);
    list.appendChild(item);
  });
  body.appendChild(list);
};

const renderStats = function () {
  const stats = loadStats();
  const body = getElementById("statsBody");
  body.textContent = "";
  getElementById("statsTitle").textContent = `📊 ${translate("Stats")}`;
  getElementById("statsCloseButton").textContent = translate("Close");
  const resetButton = getElementById("statsResetButton");
  resetButton.textContent = translate("Reset stats");
  resetButton.hidden = stats.games === 0;
  if (stats.games === 0) {
    body.textContent = translate("Play a game to see your stats");
    return;
  }
  const table = document.createElement("table");
  table.className = "stats-table";
  addRow(table, translate("Games played"), stats.games);
  addRow(table, translate("Win rate"), percent(stats.wins, stats.games));
  addRow(
    table,
    `${translate("Win rate")}: ${translate("vs computer")}`,
    percent(stats.byMode.computer.wins, stats.byMode.computer.games),
  );
  addRow(
    table,
    `${translate("Win rate")}: ${translate("vs friend")}`,
    percent(stats.byMode.friend.wins, stats.byMode.friend.games),
  );
  addRow(
    table,
    translate("Average score"),
    Math.round(stats.totalScore / stats.games),
  );
  addRow(table, translate("Best score"), stats.bestScore);
  body.appendChild(table);
  renderMissed(stats, body);
};

export const openStats = function () {
  renderStats();
  showModalWindow("statsModal");
};

export const openStatsOver = function (modalId) {
  const element = getElementById(modalId);
  if (!element.classList.contains("show")) {
    openStats();
    return;
  }
  returnModalId = modalId;
  element.addEventListener("hidden.bs.modal", openStats, { once: true });
  hideModalWindow(modalId);
};

export const initStats = function () {
  getElementById("statsResetButton").addEventListener("click", () => {
    if (!window.confirm(translate("Reset stats") + "?")) return;
    try {
      localStorage.removeItem(STATS_KEY);
    } catch {
      // nothing to clear
    }
    renderStats();
  });
  getElementById("statsModal").addEventListener("hidden.bs.modal", () => {
    if (!returnModalId) return;
    const modalId = returnModalId;
    returnModalId = null;
    showModalWindow(modalId);
  });
};
