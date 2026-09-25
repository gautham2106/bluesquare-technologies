import crypto from "crypto";

// Server-only: sends a conversion event straight to Meta's Graph API, as a
// backup to the browser pixel. Ad blockers, Safari's tracking prevention,
// and privacy extensions silently drop the client-side pixel call for a
// meaningful slice of visitors — this reaches Meta regardless, since it
// never touches the visitor's browser at all.

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CONVERSIONS_API_TOKEN;
// Set temporarily while verifying in Events Manager's "Test events" tool,
// then unset (or leave blank) — a test code left in place hides real events
// from your normal reporting.
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;
const GRAPH_VERSION = "v21.0";

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function normalizePhone(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, "");
  return digits.startsWith("91") ? digits : `91${digits}`;
}

interface CapiEventInput {
  eventName: "Lead" | "Purchase" | "Contact";
  /** Match this to the client-side fbq eventID for the same logical event, so Meta dedupes instead of double-counting. */
  eventId: string;
  eventSourceUrl: string;
  name?: string;
  whatsapp?: string;
  /** Our own Supabase request row id — a stable identifier tying this person's events together. */
  externalId?: string;
  /** Meta's own browser-set cookies (read client-side, forwarded here) — the strongest signal for matching this server event to the exact browser session that also fired the client-side pixel event. */
  fbp?: string;
  fbc?: string;
  value?: number;
  currency?: string;
  contentName?: string;
  contentCategory?: string;
  clientIp?: string | null;
  userAgent?: string | null;
}

/**
 * Fire-and-forget: never throws, never blocks the caller. A broken or
 * unconfigured Meta integration should never take down save-request or
 * verify-payment — those are the actual product, this is just analytics.
 */
export async function sendMetaCapiEvent(input: CapiEventInput): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) return;

  try {
    const userData: Record<string, unknown> = {};

    if (input.name) {
      const [fn, ...rest] = input.name.trim().split(/\s+/).filter(Boolean);
      if (fn) userData.fn = [sha256(fn)];
      const ln = rest.join(" ");
      if (ln) userData.ln = [sha256(ln)];
    }
    if (input.whatsapp) {
      userData.ph = [sha256(normalizePhone(input.whatsapp))];
    }
    if (input.externalId) userData.external_id = [sha256(input.externalId)];
    // Always true for this business — a real, always-accurate signal costs nothing to include.
    userData.country = [sha256("in")];
    // fbp/fbc are sent as Meta issued them, not hashed — that's per Meta's spec.
    if (input.fbp) userData.fbp = input.fbp;
    if (input.fbc) userData.fbc = input.fbc;
    if (input.clientIp) userData.client_ip_address = input.clientIp;
    if (input.userAgent) userData.client_user_agent = input.userAgent;

    const customData: Record<string, unknown> = {};
    if (typeof input.value === "number") customData.value = input.value;
    if (input.currency) customData.currency = input.currency;
    if (input.contentName) customData.content_name = input.contentName;
    if (input.contentCategory) customData.content_category = input.contentCategory;

    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              event_name: input.eventName,
              event_time: Math.floor(Date.now() / 1000),
              event_id: input.eventId,
              event_source_url: input.eventSourceUrl,
              action_source: "website",
              user_data: userData,
              custom_data: customData,
            },
          ],
          ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
        }),
      }
    );

    if (!res.ok) {
      // Meta rejected the payload (bad token, malformed field, etc.) — log
      // the response body since this is otherwise a silent failure.
      const errBody = await res.text().catch(() => "");
      console.error("meta capi rejected", res.status, errBody);
    } else if (TEST_EVENT_CODE) {
      console.log(`meta capi: sent ${input.eventName} with test_event_code ${TEST_EVENT_CODE}`);
    }
  } catch (err) {
    console.error("meta capi error", err);
  }
}

/** Best-effort client IP from standard proxy headers (works behind Vercel/most hosts). */
export function getClientIp(req: Request): string | null {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip");
}
