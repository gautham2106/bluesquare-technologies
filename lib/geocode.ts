export interface GeocodeResult {
  lat: number;
  lng: number;
  areaName: string;
  displayName: string;
}

export interface PlaceSuggestion {
  lat: number;
  lng: number;
  label: string;
}

/** Searches for a place by name, biased to Chennai. Debounce the caller. */
export async function searchPlace(query: string): Promise<PlaceSuggestion[]> {
  if (!query.trim()) return [];
  const res = await fetch(`/api/flathunter/geocode?q=${encodeURIComponent(query)}`);
  if (!res.ok) return [];
  const data = (await res.json()) as { results: PlaceSuggestion[] };
  return data.results ?? [];
}

/** Reverse-geocodes a lat/lng into a short, human-friendly area name. */
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const res = await fetch(`/api/flathunter/reverse-geocode?lat=${lat}&lng=${lng}`);
  if (!res.ok) return "your area";
  const data = (await res.json()) as { areaName: string };
  return data.areaName || "your area";
}
