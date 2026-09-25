"use client";

export interface UtmParams {
  utmSource: string | null;
  utmCampaign: string | null;
}

const STORAGE_KEY = "fh_utm";

/**
 * Reads utm_source / utm_campaign from the current URL and stashes them in
 * sessionStorage so they survive the multi-step form even if the user
 * navigates within the app without the query string.
 */
export function captureUtmParams(): UtmParams {
  if (typeof window === "undefined") return { utmSource: null, utmCampaign: null };

  const params = new URLSearchParams(window.location.search);
  const fromUrl = {
    utmSource: params.get("utm_source"),
    utmCampaign: params.get("utm_campaign"),
  };

  if (fromUrl.utmSource || fromUrl.utmCampaign) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
    } catch {
      // sessionStorage unavailable — nothing to fall back to, that's fine
    }
    return fromUrl;
  }

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as UtmParams;
  } catch {
    // ignore
  }

  return { utmSource: null, utmCampaign: null };
}
