"use client";

import type { Country } from "@/data/countries";
import {
  MetricType,
  metricLabels,
  getScore,
} from "@/data/scoring";
import { scoreToColor } from "@/lib/colors";

interface CountryDetailPanelProps {
  origin: Country;
  destination: Country;
  activeMetric: MetricType;
  onClose: () => void;
}

const allMetrics: MetricType[] = [
  "easeOfTravel",
  "priceOfTravel",
  "culturalSimilarity",
  "economicSimilarity",
  "weatherSimilarity",
  "aiRecommendation",
];

export default function CountryDetailPanel({
  origin,
  destination,
  activeMetric,
  onClose,
}: CountryDetailPanelProps) {
  const scores = allMetrics.map((m) => ({
    metric: m,
    label: metricLabels[m],
    score: getScore(m, origin, destination),
  }));

  const avgScore = Math.round(
    scores.reduce((sum, s) => sum + s.score, 0) / scores.length
  );

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-slate-900 border-l border-slate-700 shadow-2xl z-50 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-200">
            {destination.name}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="text-sm text-slate-400 mb-4">
          From <span className="text-sky-400">{origin.name}</span> to{" "}
          <span className="text-emerald-400">{destination.name}</span>
        </div>

        {/* Overall score */}
        <div className="bg-slate-800 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-400">Overall Score</span>
            <span
              className="text-lg font-bold"
              style={{ color: scoreToColor(avgScore) }}
            >
              {avgScore}
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${avgScore}%`,
                backgroundColor: scoreToColor(avgScore),
              }}
            />
          </div>
        </div>

        {/* Per-metric scores */}
        <div className="space-y-3">
          {scores.map(({ metric, label, score }) => (
            <div
              key={metric}
              className={`bg-slate-800 rounded-lg p-3 transition-all ${
                metric === activeMetric
                  ? "ring-1 ring-sky-500/50"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400">{label}</span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: scoreToColor(score) }}
                >
                  {Math.round(score)}
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: `${score}%`,
                    backgroundColor: scoreToColor(score),
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Numbeo Data */}
        <div className="mt-4 space-y-2 text-xs text-slate-500">
          <div className="bg-slate-800/50 rounded-lg p-3 space-y-1.5">
            <h4 className="text-slate-400 font-medium mb-2">
              Numbeo Indices
            </h4>
            <div className="flex justify-between">
              <span>Safety Index</span>
              <span className="text-slate-300">
                {destination.numbeoSafetyIndex.toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Cost of Living</span>
              <span className="text-slate-300">
                {destination.numbeoColIndex.toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Quality of Life</span>
              <span className="text-slate-300">
                {destination.numbeoQolIndex.toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Health Care</span>
              <span className="text-slate-300">
                {destination.numbeoHealthIndex.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Country info */}
        <div className="mt-2 space-y-2 text-xs text-slate-500">
          <div className="bg-slate-800/50 rounded-lg p-3 space-y-1.5">
            <h4 className="text-slate-400 font-medium mb-2">Country Info</h4>
            <div className="flex justify-between">
              <span>Region</span>
              <span className="text-slate-300">{destination.region}</span>
            </div>
            <div className="flex justify-between">
              <span>Language</span>
              <span className="text-slate-300">{destination.languageFamily}</span>
            </div>
            <div className="flex justify-between">
              <span>Religion</span>
              <span className="text-slate-300">{destination.majorReligion}</span>
            </div>
            <div className="flex justify-between">
              <span>GDP/capita</span>
              <span className="text-slate-300">
                ${destination.gdpPerCapita.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Climate</span>
              <span className="text-slate-300">{destination.climateZone}</span>
            </div>
            <div className="flex justify-between">
              <span>Avg Temp</span>
              <span className="text-slate-300">{destination.avgTemperature}°C</span>
            </div>
          </div>
        </div>

        <div className="mt-3 px-1 text-[10px] text-slate-600">
          Data sourced from Numbeo.com
        </div>
      </div>
    </div>
  );
}
