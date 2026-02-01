// Color scale: Red (0) -> Orange (25) -> Yellow (50) -> Light Green (75) -> Green (100)
const COLOR_STOPS = [
  { stop: 0, color: [220, 38, 38] },    // red-600
  { stop: 25, color: [234, 88, 12] },   // orange-600
  { stop: 50, color: [202, 138, 4] },   // yellow-600
  { stop: 75, color: [22, 163, 74] },   // green-600
  { stop: 100, color: [5, 150, 105] },  // emerald-600
];

export function scoreToColor(score: number): string {
  const s = Math.max(0, Math.min(100, score));

  let lower = COLOR_STOPS[0];
  let upper = COLOR_STOPS[COLOR_STOPS.length - 1];

  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    if (s >= COLOR_STOPS[i].stop && s <= COLOR_STOPS[i + 1].stop) {
      lower = COLOR_STOPS[i];
      upper = COLOR_STOPS[i + 1];
      break;
    }
  }

  const range = upper.stop - lower.stop;
  const t = range === 0 ? 0 : (s - lower.stop) / range;

  const r = Math.round(lower.color[0] + t * (upper.color[0] - lower.color[0]));
  const g = Math.round(lower.color[1] + t * (upper.color[1] - lower.color[1]));
  const b = Math.round(lower.color[2] + t * (upper.color[2] - lower.color[2]));

  return `rgb(${r}, ${g}, ${b})`;
}

export const ORIGIN_COLOR = "#38bdf8";  // sky-400
export const DEFAULT_COLOR = "#334155"; // slate-700
export const HOVER_STROKE = "#f8fafc";  // slate-50
export const DEFAULT_STROKE = "#1e293b"; // slate-800

export const LEGEND_LABELS = ["Poor", "Below Avg", "Average", "Good", "Excellent"];
export const LEGEND_SCORES = [10, 30, 50, 70, 90];
