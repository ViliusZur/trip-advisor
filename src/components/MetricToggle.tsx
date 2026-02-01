"use client";

import { MetricType, metricLabels, metricDescriptions } from "@/data/scoring";

interface MetricToggleProps {
  active: MetricType;
  onChange: (metric: MetricType) => void;
}

const metricIcons: Record<MetricType, string> = {
  easeOfTravel: "✈️",
  priceOfTravel: "💰",
  culturalSimilarity: "🎭",
  economicSimilarity: "📊",
  weatherSimilarity: "🌤️",
  aiRecommendation: "🤖",
};

const metrics: MetricType[] = [
  "easeOfTravel",
  "priceOfTravel",
  "culturalSimilarity",
  "economicSimilarity",
  "weatherSimilarity",
  "aiRecommendation",
];

export default function MetricToggle({ active, onChange }: MetricToggleProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-400">Metric</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {metrics.map((metric) => (
          <button
            key={metric}
            onClick={() => onChange(metric)}
            title={metricDescriptions[metric]}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              active === metric
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/50 shadow-lg shadow-sky-500/10"
                : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-slate-300"
            }`}
          >
            <span>{metricIcons[metric]}</span>
            <span className="truncate">{metricLabels[metric]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
