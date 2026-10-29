// Trims leaderboard/ to the best MAX_ROWS entries. Run by .github/workflows/leaderboard-prune.yml
// with the service account JSON in FIREBASE_SERVICE_ACCOUNT. The admin SDK bypasses the rules,
// which forbid deletes from the game.
import admin from "firebase-admin";

const MAX_ROWS = 1000;
const DATABASE_URL =
  "https://country-alliance-guesser-default-rtdb.europe-west1.firebasedatabase.app";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "null");
if (!serviceAccount) {
  console.error("FIREBASE_SERVICE_ACCOUNT is not set");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: DATABASE_URL,
});

const snapshot = await admin.database().ref("leaderboard").once("value");
const rows = [];
snapshot.forEach((child) => {
  rows.push({ uid: child.key, ...child.val() });
});

// Best first; on equal scores the earlier result keeps its place.
rows.sort(
  (a, b) =>
    (b.score ?? 0) - (a.score ?? 0) || (a.updatedAt ?? 0) - (b.updatedAt ?? 0),
);

const toDelete = rows.slice(MAX_ROWS);
if (toDelete.length === 0) {
  console.log(`${rows.length} rows, nothing to delete`);
} else {
  const updates = {};
  for (const row of toDelete) updates[row.uid] = null;
  await admin.database().ref("leaderboard").update(updates);
  console.log(`${rows.length} rows, deleted ${toDelete.length}`);
}

// Keep the current and the previous KEEP_WEEKS weeks of leaderboard-weekly/, drop the rest.
// Same ISO week key as isoWeekKey in js/firebase.js.
const KEEP_WEEKS = 3;
const isoWeekKey = (date) => {
  const day = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  day.setUTCDate(day.getUTCDate() + 4 - (day.getUTCDay() || 7));
  const yearStart = Date.UTC(day.getUTCFullYear(), 0, 1);
  const week = Math.ceil(((day - yearStart) / 86400000 + 1) / 7);
  return `${day.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
};
const oldestKept = isoWeekKey(new Date(Date.now() - KEEP_WEEKS * 7 * 86400000));
const weekly = admin.database().ref("leaderboard-weekly");
const weeks = await weekly.orderByKey().endBefore(oldestKept).once("value");
const oldWeeks = {};
weeks.forEach((child) => {
  oldWeeks[child.key] = null;
});
if (Object.keys(oldWeeks).length === 0) {
  console.log("no old weekly boards");
} else {
  await weekly.update(oldWeeks);
  console.log(`deleted weekly boards: ${Object.keys(oldWeeks).join(", ")}`);
}

process.exit(0);
