"use client";

import { pixel, getMetaBrowserIds } from "@/lib/pixel";

interface ContactInfo {
  name?: string;
  whatsapp?: string;
  /** Pass the Supabase request row id when we have one (e.g. on /thank-you). */
  externalId?: string;
}

/**
 * Call this from the onClick of any "Message us on WhatsApp" link. Fires the
 * client pixel Contact event immediately, plus a fire-and-forget server-side
 * copy (same eventId, so Meta dedupes rather than double-counting) — the
 * WhatsApp link opens in a new tab, so the current page never unloads and
 * both calls have time to complete.
 *
 * Where we don't yet know who's clicking (e.g. the sticky WhatsApp button
 * before anyone's filled the form), info is left empty and the event is
 * just anonymous — still real signal, just without identity attached.
 */
export function trackContact(info: ContactInfo = {}) {
  const eventId = crypto.randomUUID();

  if (info.name || info.whatsapp || info.externalId) {
    pixel.setCustomerInfo(info);
  }
  pixel.contact(eventId);

  const { fbp, fbc } = getMetaBrowserIds();
  fetch("/api/flathunter/track-contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventId, ...info, fbp, fbc }),
    keepalive: true,
  }).catch(() => {
    // Analytics failure shouldn't be visible to the user — they're already
    // on their way to WhatsApp regardless.
  });
}
