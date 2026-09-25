import { NextRequest, NextResponse } from "next/server";
import { sendMetaCapiEvent, getClientIp } from "@/lib/metaCapi";

interface TrackContactBody {
  eventId?: string;
  name?: string;
  whatsapp?: string;
  externalId?: string;
  fbp?: string;
  fbc?: string;
}

/**
 * Server-side backup for the "Message us on WhatsApp" click. There's no
 * webhook telling us the message was actually sent — this only knows the
 * button was clicked — so treat it as a lighter-weight signal than
 * Lead/Purchase, which we do control end-to-end.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as TrackContactBody | null;

  if (!body?.eventId) {
    return NextResponse.json({ error: "Missing eventId." }, { status: 400 });
  }

  void sendMetaCapiEvent({
    eventName: "Contact",
    eventId: body.eventId,
    eventSourceUrl: req.headers.get("referer") || "https://bluesquaregroup.in/flathunter",
    name: body.name,
    whatsapp: body.whatsapp,
    externalId: body.externalId,
    fbp: body.fbp,
    fbc: body.fbc,
    clientIp: getClientIp(req),
    userAgent: req.headers.get("user-agent"),
  });

  return NextResponse.json({ ok: true });
}
