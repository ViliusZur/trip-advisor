"use client";

import { scoreToColor, LEGEND_LABELS, LEGEND_SCORES } from "@/lib/colors";
import { MetricType, metricLabels, metricDescriptions } from "@/data/scoring";

interface LegendProps {
  metric: MetricType;
}

export default function Legend({ metric }: LegendProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h3 className="text-sm font-medium text-slate-300">
          {metricLabels[metric]}
        </h3>
        <p className="text-xs text-slate-500">{metricDescriptions[metric]}</p>
      </div>
      <div className="flex items-center gap-1">
        {LEGEND_SCORES.map((score, i) => (
          <div key={score} className="flex flex-col items-center gap-1">
            <div
              className="w-10 h-4 rounded-sm first:rounded-l-md last:rounded-r-md"
              style={{ backgroundColor: scoreToColor(score) }}
            />
            <span className="text-[10px] text-slate-500">
              {LEGEND_LABELS[i]}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-slate-600">
        <span>0</span>
        <span>Score</span>
        <span>100</span>
      </div>
    </div>
  );
}
