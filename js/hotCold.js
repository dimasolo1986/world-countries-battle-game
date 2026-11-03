export const TEMPERATURES = ["burning", "hot", "warm", "cool", "cold"];

const ADJACENT_REGIONS = {
  Europe: ["Asia", "Africa"],
  Asia: ["Europe", "Africa", "Oceania"],
  Africa: ["Europe", "Asia"],
  Oceania: ["Asia"],
  Americas: [],
  Antarctic: [],
};

const ISLAND_BURNING_KM = 1000;

const ARROWS = ["⬆️", "↗️", "➡️", "↘️", "⬇️", "↙️", "⬅️", "↖️"];
const DIRECTIONS = [
  "North",
  "North-East",
  "East",
  "South-East",
  "South",
  "South-West",
  "West",
  "North-West",
];

const toRad = (deg) => (deg * Math.PI) / 180;

export const distanceKm = function (from, to) {
  const dLat = toRad(to[0] - from[0]);
  const dLng = toRad(to[1] - from[1]);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(from[0])) * Math.cos(toRad(to[0])) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const hasLatLng = (country) =>
  Array.isArray(country?.latlng) && country.latlng.length === 2;

export const getTemperature = function (guess, target) {
  const bordersEachOther =
    guess.countryBorders?.includes(target.cca3) ||
    target.countryBorders?.includes(guess.cca3);
  if (bordersEachOther) return "burning";
  const isIsland =
    !guess.countryBorders?.length || !target.countryBorders?.length;
  if (
    isIsland &&
    hasLatLng(guess) &&
    hasLatLng(target) &&
    distanceKm(guess.latlng, target.latlng) <= ISLAND_BURNING_KM
  )
    return "burning";
  if (
    guess.countrySubregion &&
    guess.countrySubregion === target.countrySubregion
  )
    return "hot";
  if (guess.countryRegion && guess.countryRegion === target.countryRegion)
    return "warm";
  if (ADJACENT_REGIONS[guess.countryRegion]?.includes(target.countryRegion))
    return "cool";
  return "cold";
};

export const getDirection = function (guess, target) {
  if (!hasLatLng(guess) || !hasLatLng(target)) return null;
  const lat1 = toRad(guess.latlng[0]);
  const lat2 = toRad(target.latlng[0]);
  const dLng = toRad(target.latlng[1] - guess.latlng[1]);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  const bearing = (Math.atan2(y, x) * (180 / Math.PI) + 360) % 360;
  const index = Math.round(bearing / 45) % 8;
  return { arrow: ARROWS[index], label: DIRECTIONS[index] };
};

export const candidatesMatching = function (
  candidateCodes,
  countries,
  guessCode,
  temperature,
  direction,
) {
  const guess = countries[guessCode];
  if (!guess) return candidateCodes;
  const matching = candidateCodes.filter((code) => {
    const candidate = countries[code];
    if (!candidate || code === guessCode) return false;
    if (getTemperature(guess, candidate) !== temperature) return false;
    if (!direction) return true;
    return getDirection(guess, candidate)?.arrow === direction.arrow;
  });
  return matching.length ? matching : candidateCodes;
};
