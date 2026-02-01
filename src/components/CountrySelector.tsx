"use client";

import { useState, useRef, useEffect } from "react";
import type { Country } from "@/data/countries";

interface CountrySelectorProps {
  countries: Country[];
  selected: Country | null;
  onSelect: (country: Country) => void;
}

export default function CountrySelector({
  countries,
  selected,
  onSelect,
}: CountrySelectorProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = query
    ? countries.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      )
    : countries;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-xs">
      <label className="block text-sm font-medium text-slate-400 mb-1">
        Traveling from
      </label>
      <div
        className="flex items-center gap-2 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 cursor-pointer hover:border-sky-400 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-4 h-4 text-slate-400 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
        <input
          type="text"
          placeholder={selected ? selected.name : "Select a country..."}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="bg-transparent outline-none text-sm w-full text-slate-200 placeholder-slate-400"
        />
        <svg
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-40 mt-1 w-full max-h-60 overflow-y-auto bg-slate-800 border border-slate-600 rounded-lg shadow-xl">
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-sm text-slate-500">
              No countries found
            </div>
          ) : (
            filtered.map((country) => (
              <div
                key={country.code}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-slate-700 transition-colors ${
                  selected?.code === country.code
                    ? "bg-sky-900/40 text-sky-300"
                    : "text-slate-300"
                }`}
                onClick={() => {
                  onSelect(country);
                  setQuery("");
                  setIsOpen(false);
                }}
              >
                {country.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
