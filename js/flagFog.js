import { COUNTRIES } from "./data/countries.js";

const MAX_FLAGS = 5;
const SPAWN_MIN_MS = 1800;
const SPAWN_MAX_MS = 3800;
const LIFE_MS = 5000;
const PLACE_ATTEMPTS = 25;
const PAD = 12;

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const rand = (min, max) => min + Math.random() * (max - min);

let layer = null;
let timer = null;
let lastCode = null;

const mainVisible = () => {
  const main = document.querySelector(".main-container");
  return !!main && !main.classList.contains("not-displayed");
};

const blockedRects = () =>
  ["header", "footer", "main .card"]
    .map((sel) => document.querySelector(sel))
    .filter(Boolean)
    .map((el) => el.getBoundingClientRect())
    .filter((r) => r.width > 0 && r.height > 0);

const overlaps = (a, b) =>
  a.left < b.right + PAD &&
  a.right > b.left - PAD &&
  a.top < b.bottom + PAD &&
  a.bottom > b.top - PAD;

function findSpot(w, h) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (vw < w + 2 * PAD || vh < h + 2 * PAD) return null;
  const blocked = blockedRects();
  const taken = [...layer.children].map((el) => el.getBoundingClientRect());
  for (let i = 0; i < PLACE_ATTEMPTS; i++) {
    const left = rand(PAD, vw - w - PAD);
    const top = rand(PAD, vh - h - PAD);
    const rect = { left, top, right: left + w, bottom: top + h };
    if ([...blocked, ...taken].every((b) => !overlaps(rect, b))) {
      return { left, top };
    }
  }
  return null;
}

function spawnFlag() {
  const pool = COUNTRIES.filter(
    (c) => c.flags?.webp && c.name.common !== "Russia" && c.cca2 !== lastCode,
  );
  if (!pool.length) return;
  const country = pool[Math.floor(Math.random() * pool.length)];
  const w = Math.round(rand(90, 170));
  const h = Math.round(w * 0.75);
  const spot = findSpot(w, h);
  if (!spot) return;
  lastCode = country.cca2;

  const img = document.createElement("img");
  img.className = "flag-fog";
  img.alt = "";
  img.setAttribute("aria-hidden", "true");
  img.decoding = "async";
  img.style.width = `${w}px`;
  img.style.left = `${spot.left}px`;
  img.style.top = `${spot.top}px`;
  img.style.setProperty("--fog-life", `${LIFE_MS}ms`);
  img.style.setProperty("--fog-tilt", `${rand(-6, 6).toFixed(1)}deg`);
  img.onload = () => layer && layer.appendChild(img);
  img.onanimationend = () => img.remove();
  img.onerror = () => img.remove();
  img.src = country.flags.webp;
}

function tick() {
  timer = setTimeout(tick, rand(SPAWN_MIN_MS, SPAWN_MAX_MS));
  if (document.hidden || !mainVisible()) return;
  if (layer.children.length >= MAX_FLAGS) return;
  spawnFlag();
}

function start() {
  if (timer || reducedMotion.matches) return;
  layer = document.createElement("div");
  layer.className = "flag-fog-layer";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);
  timer = setTimeout(tick, 600);
}

function stop() {
  clearTimeout(timer);
  timer = null;
  layer?.remove();
  layer = null;
}

export function initFlagFog() {
  start();
  reducedMotion.addEventListener("change", () =>
    reducedMotion.matches ? stop() : start(),
  );
}
