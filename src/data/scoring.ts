import type { Country } from './countries';

/**
 * Calculate the great-circle distance between two points on Earth using the Haversine formula.
 */
function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Ease of travel: visa compatibility, distance, and safety (uses Numbeo safety).
 */
export function easeOfTravel(origin: Country, destination: Country): number {
  // Visa score (40% weight)
  let visaScore = 0;
  if (origin.visaGroup === destination.visaGroup && origin.visaGroup !== 'Other') {
    visaScore = 100;
  } else if (
    origin.visaGroup === 'EU/Schengen' && destination.visaGroup === 'EU/Schengen'
  ) {
    visaScore = 100;
  } else {
    const passportFactor = origin.passportStrength / 100;
    const safetyFactor = destination.numbeoSafetyIndex / 100;
    visaScore = ((passportFactor + safetyFactor) / 2) * 100;
  }

  // Distance score (30% weight)
  const distance = haversineDistance(origin.lat, origin.lng, destination.lat, destination.lng);
  const distanceScore = Math.max(0, 100 * (1 - distance / 20000));

  // Safety score from Numbeo (30% weight)
  const safetyScore = destination.numbeoSafetyIndex;

  const totalScore = visaScore * 0.4 + distanceScore * 0.3 + safetyScore * 0.3;
  return clamp(totalScore, 0, 100);
}

/**
 * Price of travel: flight distance + Numbeo cost of living index.
 * Lower cost = higher score (100 = cheapest).
 */
export function priceOfTravel(origin: Country, destination: Country): number {
  // Flight cost from distance (40%)
  const distance = haversineDistance(origin.lat, origin.lng, destination.lat, destination.lng);
  const flightCostScore = Math.max(0, 100 * (1 - distance / 20000));

  // Numbeo cost of living - inverted and normalized (max index ~140) (60%)
  const colNormalized = clamp(destination.numbeoColIndex / 140, 0, 1);
  const costOfLivingScore = (1 - colNormalized) * 100;

  const totalScore = flightCostScore * 0.4 + costOfLivingScore * 0.6;
  return clamp(totalScore, 0, 100);
}

/**
 * Cultural similarity: language, religion, region, subregion.
 */
export function culturalSimilarity(origin: Country, destination: Country): number {
  let score = 0;

  if (origin.languageFamily === destination.languageFamily) score += 35;
  if (origin.majorReligion === destination.majorReligion) score += 25;
  if (origin.region === destination.region) score += 20;
  if (origin.subregion === destination.subregion) score += 20;

  return clamp(score, 0, 100);
}

/**
 * Economic similarity: GDP per capita ratio + Numbeo cost of living ratio.
 */
export function economicSimilarity(origin: Country, destination: Country): number {
  // GDP ratio (40%)
  const gdpRatio = Math.min(origin.gdpPerCapita, destination.gdpPerCapita) /
                   Math.max(origin.gdpPerCapita, destination.gdpPerCapita);
  const gdpScore = gdpRatio * 100;

  // Numbeo cost of living ratio (30%)
  const colMin = Math.max(origin.numbeoColIndex, 1);
  const colMax = Math.max(destination.numbeoColIndex, 1);
  const colRatio = Math.min(colMin, colMax) / Math.max(colMin, colMax);
  const colScore = colRatio * 100;

  // Numbeo quality of life ratio (30%)
  const qolMin = Math.max(origin.numbeoQolIndex, 1);
  const qolMax = Math.max(destination.numbeoQolIndex, 1);
  const qolRatio = Math.min(qolMin, qolMax) / Math.max(qolMin, qolMax);
  const qolScore = qolRatio * 100;

  const totalScore = gdpScore * 0.4 + colScore * 0.3 + qolScore * 0.3;
  return clamp(totalScore, 0, 100);
}

/**
 * Weather similarity: climate zone match + temperature difference.
 */
export function weatherSimilarity(origin: Country, destination: Country): number {
  let score = 0;

  if (origin.climateZone === destination.climateZone) score += 50;

  const tempDiff = Math.abs(origin.avgTemperature - destination.avgTemperature);
  score += Math.max(0, 50 * (1 - tempDiff / 30));

  return clamp(score, 0, 100);
}

/**
 * AI recommendation: composite score balancing all factors + Numbeo health/QoL + novelty bonus.
 */
export function aiRecommendation(origin: Country, destination: Country): number {
  const ease = easeOfTravel(origin, destination);
  const price = priceOfTravel(origin, destination);
  const cultural = culturalSimilarity(origin, destination);
  const weather = weatherSimilarity(origin, destination);
  const safety = destination.numbeoSafetyIndex;

  // Numbeo quality of life normalized to 0-100 (max ~215)
  const qolScore = clamp((destination.numbeoQolIndex / 215) * 100, 0, 100);
  // Numbeo health care normalized to 0-100
  const healthScore = clamp(destination.numbeoHealthIndex, 0, 100);

  // Contrast bonus: reward destinations that are different enough to be interesting
  let contrastBonus = 0;
  if (cultural >= 15 && cultural <= 60) {
    const distanceFrom35 = Math.abs(cultural - 35);
    contrastBonus = 100 * (1 - distanceFrom35 / 25);
  }

  const totalScore =
    ease * 0.15 +
    price * 0.10 +
    cultural * 0.05 +
    weather * 0.05 +
    safety * 0.15 +
    qolScore * 0.15 +
    healthScore * 0.10 +
    contrastBonus * 0.25;

  return clamp(totalScore, 0, 100);
}

export type MetricType =
  | 'easeOfTravel'
  | 'priceOfTravel'
  | 'culturalSimilarity'
  | 'economicSimilarity'
  | 'weatherSimilarity'
  | 'aiRecommendation';

export function getScore(metric: MetricType, origin: Country, destination: Country): number {
  switch (metric) {
    case 'easeOfTravel':
      return easeOfTravel(origin, destination);
    case 'priceOfTravel':
      return priceOfTravel(origin, destination);
    case 'culturalSimilarity':
      return culturalSimilarity(origin, destination);
    case 'economicSimilarity':
      return economicSimilarity(origin, destination);
    case 'weatherSimilarity':
      return weatherSimilarity(origin, destination);
    case 'aiRecommendation':
      return aiRecommendation(origin, destination);
    default:
      const _exhaustive: never = metric;
      throw new Error(`Unknown metric type: ${_exhaustive}`);
  }
}

export const metricLabels: Record<MetricType, string> = {
  easeOfTravel: 'Ease of Travel',
  priceOfTravel: 'Price of Travel',
  culturalSimilarity: 'Cultural Similarity',
  economicSimilarity: 'Economic Similarity',
  weatherSimilarity: 'Weather Similarity',
  aiRecommendation: 'AI Recommendation',
};

export const metricDescriptions: Record<MetricType, string> = {
  easeOfTravel: 'Visa requirements, distance, and destination safety (Numbeo Safety Index)',
  priceOfTravel: 'Flight distance and cost of living at destination (Numbeo Cost of Living Index)',
  culturalSimilarity: 'Language, religion, and geographic region alignment',
  economicSimilarity: 'GDP per capita, cost of living, and quality of life comparison (Numbeo data)',
  weatherSimilarity: 'Climate zone and average temperature compatibility',
  aiRecommendation: 'Smart composite using Numbeo Quality of Life, Health Care, Safety + novelty balance',
};
