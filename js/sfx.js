const STORAGE_KEY = "soundEnabled";

let ctx = null;
let master = null;
let unlocked = false;
const lastPlayed = {};

export const isSoundEnabled = () => localStorage.getItem(STORAGE_KEY) !== "0";

export const setSoundEnabled = (enabled) => {
  localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
  document.dispatchEvent(new Event("soundchange"));
};

const ensureContext = () => {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0.35;
  master.connect(ctx.destination);
  return ctx;
};

export const initSfx = () => {
  const unlock = () => {
    const c = ensureContext();
    if (c && c.state === "suspended") c.resume().catch(() => {});
    if (c) {
      unlocked = true;
      ["pointerdown", "keydown", "touchend"].forEach((e) =>
        document.removeEventListener(e, unlock, true),
      );
    }
  };
  ["pointerdown", "keydown", "touchend"].forEach((e) =>
    document.addEventListener(e, unlock, true),
  );
};

const tone = (
  freq,
  start,
  dur,
  { type = "sine", gain = 0.5, endFreq } = {},
) => {
  const t0 = ctx.currentTime + start;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(master);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
};

const noise = (start, dur, gain = 0.3) => {
  const t0 = ctx.currentTime + start;
  const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  const g = ctx.createGain();
  src.buffer = buf;
  g.gain.setValueAtTime(gain, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(g).connect(master);
  src.start(t0);
};

const SOUNDS = {
  // Failed guess: two falling low notes.
  fail: () => {
    tone(260, 0, 0.18, { type: "triangle", gain: 0.5 });
    tone(180, 0.15, 0.3, { type: "triangle", gain: 0.5 });
  },
  // Trap: descending buzz plus a burst of noise.
  trap: () => {
    tone(220, 0, 0.45, { type: "sawtooth", gain: 0.35, endFreq: 55 });
    noise(0, 0.3, 0.35);
  },
  // Bonus: quick rising sparkle.
  bonus: () => {
    [880, 1175, 1568, 2093].forEach((f, i) =>
      tone(f, i * 0.07, 0.18, { type: "sine", gain: 0.3 }),
    );
  },
  // One country of an alliance guessed: short bright "ding".
  hit: () => {
    tone(660, 0, 0.12, { type: "square", gain: 0.18 });
    tone(990, 0.08, 0.22, { type: "sine", gain: 0.4 });
  },
  // Whole alliance guessed: major arpeggio fanfare.
  alliance: () => {
    [523, 659, 784, 1047].forEach((f, i) =>
      tone(f, i * 0.1, 0.28, { type: "triangle", gain: 0.4 }),
    );
    tone(1047, 0.45, 0.6, { type: "sine", gain: 0.35 });
    tone(784, 0.45, 0.6, { type: "sine", gain: 0.25 });
  },
  // Game won: longer rising fanfare with a held final chord.
  win: () => {
    [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) =>
      tone(f, i * 0.12, 0.25, { type: "triangle", gain: 0.4 }),
    );
    [1047, 1319, 1568].forEach((f) =>
      tone(f, 0.9, 0.9, { type: "sine", gain: 0.25 }),
    );
  },
  // Game lost: slow descending minor "wah-wah-wah".
  lose: () => {
    [392, 349, 330].forEach((f, i) =>
      tone(f, i * 0.3, 0.35, { type: "sawtooth", gain: 0.2 }),
    );
    tone(262, 0.9, 0.9, { type: "sawtooth", gain: 0.22, endFreq: 196 });
  },
};

export const playSfx = (name, delay = 0) => {
  const sound = SOUNDS[name];
  if (!sound || !unlocked || !isSoundEnabled()) return;
  const c = ensureContext();
  if (!c) return;
  const now = performance.now();
  if (now - (lastPlayed[name] || 0) < 120) return;
  lastPlayed[name] = now;
  const run = () => {
    try {
      if (c.state === "suspended") c.resume().catch(() => {});
      sound();
    } catch (e) {}
  };
  if (delay > 0) setTimeout(run, delay * 1000);
  else run();
};
