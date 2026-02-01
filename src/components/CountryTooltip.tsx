"use client";

import type { Country } from "@/data/countries";
import { MetricType, metricLabels, getScore } from "@/data/scoring";
import { scoreToColor } from "@/lib/colors";

interface CountryTooltipProps {
  country: Country;
  origin: Country | null;
  metric: MetricType;
  x: number;
  y: number;
}

export default function CountryTooltip({
  country,
  origin,
  metric,
  x,
  y,
}: CountryTooltipProps) {
  const isOrigin = origin?.code === country.code;
  const score = origin && !isOrigin ? getScore(metric, origin, country) : null;

  // Position tooltip to avoid going off-screen
  const tooltipStyle: React.CSSProperties = {
    left: x + 12,
    top: y - 10,
  };

  return (
    <div className="map-tooltip" style={tooltipStyle}>
      <div className="font-semibold text-sm text-slate-200 mb-1">
        {country.name}
        {isOrigin && (
          <span className="ml-2 text-xs text-sky-400">(Origin)</span>
        )}
      </div>
      {score !== null && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-slate-400">
              {metricLabels[metric]}:
            </span>
            <span
              className="text-sm font-bold"
              style={{ color: scoreToColor(score) }}
            >
              {Math.round(score)}
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full"
              style={{
                width: `${score}%`,
                backgroundColor: scoreToColor(score),
              }}
            />
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Click for details
          </div>
        </>
      )}
      {!origin && (
        <div className="text-xs text-slate-500">
          Select an origin country first
        </div>
      )}
    </div>
  );
}
