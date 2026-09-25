"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

function fbq(...args: unknown[]) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq(...args);
}

/** Digits only, with the 91 country code — the format Meta expects for phone matching. */
function normalizePhone(whatsapp: string): string | undefined {
  const digits = whatsapp.replace(/\D/g, "");
  if (!digits) return undefined;
  return digits.startsWith("91") ? digits : `91${digits}`;
}

export interface CustomerInfo {
  name?: string;
  whatsapp?: string;
  /** A stable ID of ours (the Supabase request row id) — ties this person's
   *  events together even if their name/phone is entered inconsistently. */
  externalId?: string;
}

/**
 * Attaches Advanced Matching (name/phone/external id) to the pixel so the
 * events fired right after this carry a real identity signal instead of an
 * anonymous cookie — this is what lets Meta build accurate lookalike
 * audiences and hold up under iOS/Safari's tracking restrictions. The Meta
 * SDK hashes these client-side before anything leaves the browser; we never
 * see or store the hashed values ourselves.
 *
 * Call this once you actually have the customer's info (e.g. right before
 * firing Lead), and again on any later page (e.g. /thank-you) since a fresh
 * page load starts the pixel over with no matching data attached.
 */
function setCustomerInfo({ name, whatsapp, externalId }: CustomerInfo) {
  if (!PIXEL_ID) return;
  const [fn, ...rest] = (name ?? "").trim().split(/\s+/).filter(Boolean);
  const ln = rest.join(" ");
  const ph = whatsapp ? normalizePhone(whatsapp) : undefined;

  const matchData: Record<string, string> = {};
  if (fn) matchData.fn = fn;
  if (ln) matchData.ln = ln;
  if (ph) matchData.ph = ph;
  if (externalId) matchData.external_id = externalId;

  if (Object.keys(matchData).length > 0) {
    fbq("init", PIXEL_ID, matchData);
  }
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * The pixel itself sets these two cookies automatically to identify this
 * browser (_fbp) and, if the visitor arrived from a Facebook/Instagram ad
 * click, that click (_fbc). Reading them out lets us forward the exact same
 * identifiers to a server-side Conversions API call, so Meta can match it to
 * the same visitor instead of treating it as a completely separate signal.
 */
export function getMetaBrowserIds(): { fbp?: string; fbc?: string } {
  return { fbp: readCookie("_fbp"), fbc: readCookie("_fbc") };
}

export const pixel = {
  setCustomerInfo,

  /** eventId lets a matching server-side Conversions API call dedupe against this one. */
  lead: (contentName?: string, eventId?: string) =>
    fbq(
      "track",
      "Lead",
      contentName ? { content_name: contentName } : undefined,
      eventId ? { eventID: eventId } : undefined
    ),

  initiateCheckout: (value: number, contentName: string, contentCategory: string) =>
    fbq("track", "InitiateCheckout", {
      value,
      currency: "INR",
      content_name: contentName,
      content_category: contentCategory,
    }),

  purchase: (value: number, contentName: string, contentCategory: string, eventId?: string) =>
    fbq(
      "track",
      "Purchase",
      { value, currency: "INR", content_name: contentName, content_category: contentCategory },
      eventId ? { eventID: eventId } : undefined
    ),

  contact: (eventId?: string) =>
    fbq("track", "Contact", undefined, eventId ? { eventID: eventId } : undefined),
};
