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
  try {
    ctx = new AC({ latencyHint: "interactive" });
  } catch (e) {
    ctx = new AC();
  }
  master = ctx.createGain();
  master.gain.value = 0.35;
  master.connect(ctx.destination);
  const keepAlive = ctx.createOscillator();
  const keepAliveGain = ctx.createGain();
  keepAliveGain.gain.value = 0.00001;
  keepAlive.connect(keepAliveGain).connect(ctx.destination);
  keepAlive.start();
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
  { type = "sine", gain = 0.5, endFreq, attack = 0.012 } = {},
) => {
  const t0 = ctx.currentTime + start;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + attack);
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

const noiseBand = (
  start,
  dur,
  { type = "lowpass", freq = 1000, endFreq, gain = 0.4, attack = 0.005 } = {},
) => {
  const t0 = ctx.currentTime + start;
  const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const g = ctx.createGain();
  src.buffer = buf;
  filter.type = type;
  filter.frequency.setValueAtTime(freq, t0);
  if (endFreq) filter.frequency.exponentialRampToValueAtTime(endFreq, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(filter).connect(g).connect(master);
  src.start(t0);
};

const SOUNDS = {
  // Failed guess = fog puffs (swell ~0.2s, fade by ~0.7s): a soft airy
  // whoosh that darkens as it fades, over a muted falling note.
  fail: () => {
    noiseBand(0, 0.75, {
      type: "lowpass",
      freq: 1400,
      endFreq: 180,
      gain: 0.5,
      attack: 0.06,
    });
    tone(196, 0, 0.6, {
      type: "triangle",
      gain: 0.22,
      endFreq: 140,
      attack: 0.04,
    });
  },
  // Trap = explosion (flash at 0, rings at 0 and 140ms, sparks to ~0.8s):
  // a boom with a blast of noise, a second pulse for the second ring,
  // then crackling sparks.
  trap: () => {
    tone(130, 0, 0.8, { type: "sine", gain: 0.75, endFreq: 32, attack: 0.006 });
    noiseBand(0, 0.55, {
      type: "lowpass",
      freq: 3500,
      endFreq: 180,
      gain: 0.7,
      attack: 0.004,
    });
    tone(220, 0, 0.45, { type: "sawtooth", gain: 0.12, endFreq: 55 });
    tone(95, 0.14, 0.6, { type: "sine", gain: 0.4, endFreq: 35 });
    noiseBand(0.14, 0.5, {
      type: "lowpass",
      freq: 1200,
      endFreq: 150,
      gain: 0.35,
    });
    for (let i = 0; i < 7; i++) {
      noiseBand(0.12 + Math.random() * 0.6, 0.04, {
        type: "highpass",
        freq: 4000,
        gain: 0.1 + Math.random() * 0.12,
        attack: 0.002,
      });
    }
  },
  // Bonus = gold glow (peaks ~0.5s) and stars popping over ~0.35s:
  // rising sparkle run, a soft swelling shimmer, and random twinkles.
  bonus: () => {
    [880, 1175, 1568, 2093, 2637].forEach((f, i) =>
      tone(f, i * 0.08, 0.22, { type: "sine", gain: 0.28 }),
    );
    tone(1047, 0.05, 1.3, { type: "sine", gain: 0.14, attack: 0.5 });
    tone(1568, 0.05, 1.3, { type: "sine", gain: 0.1, attack: 0.5 });
    for (let i = 0; i < 9; i++) {
      tone(3000 + Math.random() * 1800, 0.05 + Math.random() * 0.75, 0.14, {
        type: "sine",
        gain: 0.07 + Math.random() * 0.06,
        attack: 0.004,
      });
    }
  },
  // One country of an alliance guessed = lightning strike (flash ~80ms,
  // flicker re-strike ~340ms, sparks): sharp crack, rolling thunder rumble,
  // a crackle on the flicker, and a faint "ding" so it still reads as correct.
  hit: () => {
    noiseBand(0, 0.2, {
      type: "highpass",
      freq: 2200,
      gain: 0.65,
      attack: 0.002,
    });
    noiseBand(0.07, 1.0, {
      type: "lowpass",
      freq: 320,
      endFreq: 70,
      gain: 0.8,
      attack: 0.04,
    });
    tone(75, 0.07, 0.7, { type: "sine", gain: 0.5, endFreq: 38, attack: 0.03 });
    noiseBand(0.34, 0.12, {
      type: "highpass",
      freq: 2800,
      gain: 0.35,
      attack: 0.003,
    });
    tone(990, 0.12, 0.25, { type: "sine", gain: 0.14 });
  },
  // Chat message from the friend: gentle two-note "pop-pop", rising, instant
  // onset, quiet enough not to startle mid-game.
  message: () => {
    tone(784, 0, 0.14, { type: "sine", gain: 0.32, attack: 0.004 });
    tone(1175, 0.09, 0.24, { type: "sine", gain: 0.32, attack: 0.004 });
    tone(2350, 0.09, 0.1, { type: "sine", gain: 0.06, attack: 0.003 });
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
