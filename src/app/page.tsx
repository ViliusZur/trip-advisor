"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { countries, type Country } from "@/data/countries";
import type { MetricType } from "@/data/scoring";
import CountrySelector from "@/components/CountrySelector";
import MetricToggle from "@/components/MetricToggle";
import Legend from "@/components/Legend";
import CountryTooltip from "@/components/CountryTooltip";
import CountryDetailPanel from "@/components/CountryDetailPanel";

const WorldMap = dynamic(() => import("@/components/WorldMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-slate-500 animate-pulse">Loading map...</div>
    </div>
  ),
});

export default function Home() {
  const [origin, setOrigin] = useState<Country | null>(null);
  const [metric, setMetric] = useState<MetricType>("aiRecommendation");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [tooltip, setTooltip] = useState<{
    country: Country;
    x: number;
    y: number;
  } | null>(null);

  const handleCountryClick = useCallback(
    (country: Country) => {
      if (!origin) {
        setOrigin(country);
        return;
      }
      if (country.code === origin.code) return;
      setSelectedCountry((prev) =>
        prev?.code === country.code ? null : country
      );
    },
    [origin]
  );

  const handleCountryHover = useCallback(
    (country: Country | null, event?: React.MouseEvent) => {
      if (country && event) {
        setTooltip({
          country,
          x: event.clientX,
          y: event.clientY,
        });
      } else {
        setTooltip(null);
      }
    },
    []
  );

  const sortedCountries = [...countries].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="shrink-0 bg-slate-900/80 backdrop-blur border-b border-slate-800 px-4 py-3">
        <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-lg font-semibold text-slate-200">TravelMap</h1>
          </div>
          <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <CountrySelector
              countries={sortedCountries}
              selected={origin}
              onSelect={setOrigin}
            />
            {origin && <MetricToggle active={metric} onChange={setMetric} />}
          </div>
        </div>
      </header>

      {/* Map */}
      <main className="flex-1 relative min-h-0">
        {!origin && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl px-6 py-4 text-center max-w-sm">
              <h2 className="text-lg font-semibold text-slate-200 mb-2">
                Welcome to TravelMap
              </h2>
              <p className="text-sm text-slate-400">
                Select your origin country from the dropdown above or click a
                country on the map to get started.
              </p>
            </div>
          </div>
        )}

        <WorldMap
          origin={origin}
          metric={metric}
          onCountryClick={handleCountryClick}
          onCountryHover={handleCountryHover}
        />

        {/* Legend */}
        {origin && (
          <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-lg p-3">
            <Legend metric={metric} />
          </div>
        )}

        {/* Tooltip */}
        {tooltip && (
          <CountryTooltip
            country={tooltip.country}
            origin={origin}
            metric={metric}
            x={tooltip.x}
            y={tooltip.y}
          />
        )}

        {/* Detail panel */}
        {selectedCountry && origin && (
          <CountryDetailPanel
            origin={origin}
            destination={selectedCountry}
            activeMetric={metric}
            onClose={() => setSelectedCountry(null)}
          />
        )}
      </main>
    </div>
  );
}
