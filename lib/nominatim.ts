// Server-only helpers for talking to OpenStreetMap's Nominatim geocoder.
// Kept out of client bundles and behind our own API routes so we can send a
// proper identifying User-Agent, as Nominatim's usage policy requires.

const NOMINATIM_BASE = "https://nominatim.openstreetmap.org";
const USER_AGENT = "FlatHunter/1.0 (gautham@bluesquaregroup.in)";

// Roughly bounds Chennai + outskirts, used to bias (not restrict) search.
const CHENNAI_VIEWBOX = "79.7,13.35,80.5,12.75"; // left,top,right,bottom

export interface NominatimAddress {
  suburb?: string;
  neighbourhood?: string;
  city_district?: string;
  town?: string;
  village?: string;
  city?: string;
  state_district?: string;
  state?: string;
  road?: string;
}

export interface NominatimPlace {
  lat: string;
  lon: string;
  display_name: string;
  address?: NominatimAddress;
}

function pickAreaName(address: NominatimAddress | undefined, fallback: string): string {
  if (!address) return fallback.split(",")[0]?.trim() || fallback;
  const areaName =
    address.suburb ||
    address.neighbourhood ||
    address.city_district ||
    address.town ||
    address.village ||
    address.road ||
    address.city;
  return areaName || fallback.split(",")[0]?.trim() || fallback;
}

export async function nominatimSearch(query: string) {
  const url = new URL(`${NOMINATIM_BASE}/search`);
  url.searchParams.set("q", query);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("countrycodes", "in");
  url.searchParams.set("viewbox", CHENNAI_VIEWBOX);
  url.searchParams.set("bounded", "0");
  url.searchParams.set("limit", "6");

  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) return [];
  const places = (await res.json()) as NominatimPlace[];

  return places.map((place) => ({
    lat: Number(place.lat),
    lng: Number(place.lon),
    label: `${pickAreaName(place.address, place.display_name)}, Chennai`,
  }));
}

export async function nominatimReverse(lat: number, lng: number): Promise<string> {
  const url = new URL(`${NOMINATIM_BASE}/reverse`);
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lng));
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("zoom", "16");

  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) return "your area";
  const place = (await res.json()) as NominatimPlace;
  return pickAreaName(place.address, place.display_name);
}
