"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useDebouncedValue } from "@/lib/hooks";
import { searchPlace, reverseGeocode, type PlaceSuggestion } from "@/lib/geocode";
import { CHENNAI_CENTER, DEFAULT_ZOOM, MIN_RADIUS_KM, MAX_RADIUS_KM } from "@/config/flathunter";
import type { LocationState } from "@/types/request";

const LeafletMap = dynamic(() => import("@/components/flathunter/map/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-brand-50 text-sm text-ink/40">
      Loading map…
    </div>
  ),
});

interface StepLocationProps {
  value: LocationState;
  onChange: (patch: Partial<LocationState>) => void;
}

export default function StepLocation({ value, onChange }: StepLocationProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [flyTo, setFlyTo] = useState<[number, number] | null>(null);
  const [areaLoading, setAreaLoading] = useState(false);
  const [geoStatus, setGeoStatus] = useState<"idle" | "locating" | "denied" | "error">("idle");
  const initialised = useRef(false);

  const debouncedQuery = useDebouncedValue(query, 400);
  const pinKey = `${value.lat.toFixed(6)},${value.lng.toFixed(6)}`;
  const debouncedPinKey = useDebouncedValue(pinKey, 600);

  // Reverse-geocode whenever the pin settles on a new spot.
  useEffect(() => {
    const [latStr, lngStr] = debouncedPinKey.split(",");
    const lat = Number(latStr);
    const lng = Number(lngStr);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

    let cancelled = false;
    setAreaLoading(true);
    reverseGeocode(lat, lng)
      .then((areaName) => {
        if (!cancelled) onChange({ areaName });
      })
      .finally(() => {
        if (!cancelled) setAreaLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPinKey]);

  // Search-as-you-type, biased to Chennai.
  useEffect(() => {
    if (!initialised.current) {
      initialised.current = true;
      return;
    }
    if (debouncedQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    let cancelled = false;
    searchPlace(debouncedQuery).then((results) => {
      if (!cancelled) setSuggestions(results);
    });
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  function handlePinMove(lat: number, lng: number) {
    onChange({ lat, lng });
  }

  function handleSelectSuggestion(s: PlaceSuggestion) {
    onChange({ lat: s.lat, lng: s.lng, areaName: s.label.split(",")[0] });
    setFlyTo([s.lat, s.lng]);
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  }

  function handleUseMyLocation() {
    if (!("geolocation" in navigator)) {
      setGeoStatus("error");
      return;
    }
    setGeoStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        onChange({ lat: latitude, lng: longitude });
        setFlyTo([latitude, longitude]);
        setGeoStatus("idle");
      },
      (err) => {
        setGeoStatus(err.code === err.PERMISSION_DENIED ? "denied" : "error");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-ink">Pin your area</h3>
      <p className="mt-1 text-sm text-ink/60">
        Drop a pin where you want to live, then choose how far you&rsquo;re willing to go.
      </p>

      <div className="relative mt-4">
        <label htmlFor="area-search" className="sr-only">
          Search for an area in Chennai
        </label>
        <div className="relative">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            id="area-search"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search an area, e.g. Sholinganallur"
            className="fh-focus-ring w-full rounded-xl border border-ink/10 bg-white py-3 pl-10 pr-3 text-sm text-ink placeholder:text-ink/35"
            autoComplete="off"
          />
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-[1000] mt-1 w-full overflow-hidden rounded-xl border border-ink/10 bg-white shadow-fh-card">
            {suggestions.map((s) => (
              <li key={`${s.lat}-${s.lng}`}>
                <button
                  type="button"
                  onClick={() => handleSelectSuggestion(s)}
                  className="fh-focus-ring block w-full px-4 py-2.5 text-left text-sm text-ink hover:bg-brand-50"
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-sm text-ink/70" aria-live="polite">
          Searching within <span className="font-semibold text-ink">{value.radiusKm} km</span> of{" "}
          <span className="font-semibold text-ink">
            {areaLoading ? "…" : value.areaName || "your pin"}
          </span>
        </p>
        <button
          type="button"
          onClick={handleUseMyLocation}
          className="fh-focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-brand-500/25 bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-600 hover:bg-brand-100"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M12 2v3M12 19v3M22 12h-3M5 12H2"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          {geoStatus === "locating" ? "Locating…" : "Use my location"}
        </button>
      </div>

      {geoStatus === "denied" && (
        <p className="mt-2 text-xs text-ink/50">
          Location permission was denied — no problem, just drag the pin on the map or search
          for your area above.
        </p>
      )}
      {geoStatus === "error" && (
        <p className="mt-2 text-xs text-ink/50">
          Couldn&rsquo;t get your location — please drag the pin or search for your area instead.
        </p>
      )}

      <div
        role="application"
        aria-label="Map to choose your search area — drag the pin, or use the search box and radius slider above and below to set it accessibly"
        className="mt-4 h-64 overflow-hidden rounded-2xl border border-ink/10 sm:h-80"
      >
        <LeafletMap
          initialCenter={CHENNAI_CENTER}
          zoom={DEFAULT_ZOOM}
          pin={[value.lat, value.lng]}
          radiusKm={value.radiusKm}
          onPinMove={handlePinMove}
          flyTo={flyTo}
        />
      </div>

      <div className="mt-5">
        <div className="mb-1.5 flex items-baseline justify-between">
          <label htmlFor="radius-slider" className="text-sm font-semibold text-ink">
            How far are you willing to live?
          </label>
          <span className="text-sm font-bold text-brand-600">{value.radiusKm} km</span>
        </div>
        <input
          id="radius-slider"
          type="range"
          min={MIN_RADIUS_KM}
          max={MAX_RADIUS_KM}
          step={1}
          value={value.radiusKm}
          onChange={(e) => onChange({ radiusKm: Number(e.target.value) })}
          className="fh-focus-ring h-2 w-full cursor-pointer appearance-none rounded-full bg-ink/10"
          style={{ accentColor: "#1E4DD8" }}
        />
        <div className="mt-1 flex justify-between text-[11px] text-ink/40">
          <span>{MIN_RADIUS_KM} km</span>
          <span>{MAX_RADIUS_KM} km</span>
        </div>
      </div>
    </div>
  );
}
