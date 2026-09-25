import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { sendMetaCapiEvent, getClientIp } from "@/lib/metaCapi";
import type { RequestRow } from "@/types/request";

interface SaveRequestBody extends Partial<RequestRow> {
  fbp?: string;
  fbc?: string;
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as SaveRequestBody | null;

  if (!body || !body.lat || !body.lng || !body.name || !body.whatsapp) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    // No database configured — let the client carry on to payment anyway
    // rather than blocking the whole funnel; we just won't have a stored row.
    return NextResponse.json({ id: null, warning: "not_configured" });
  }

  const row: Partial<RequestRow> = {
    lat: body.lat,
    lng: body.lng,
    radius_km: body.radius_km,
    area_name: body.area_name,
    home_type: body.home_type,
    budget_min: body.budget_min,
    budget_max: body.budget_max,
    furnished: body.furnished ?? false,
    occupant_type: body.occupant_type,
    name: body.name,
    whatsapp: body.whatsapp,
    move_in_date: body.move_in_date,
    notes: body.notes ?? null,
    status: "pending_payment",
    utm_source: body.utm_source ?? null,
    utm_campaign: body.utm_campaign ?? null,
  };

  const { data, error } = await supabase.from("requests").insert(row).select("id").single();

  if (error) {
    console.error("save-request error", error);
    return NextResponse.json({ error: "Could not save your request." }, { status: 500 });
  }

  // Fire-and-forget: the id doubles as the event_id so the client-side Lead
  // pixel event and this server-side copy dedupe against each other in Meta.
  void sendMetaCapiEvent({
    eventName: "Lead",
    eventId: data.id,
    eventSourceUrl: req.headers.get("referer") || "https://bluesquaregroup.in/flathunter",
    name: body.name,
    whatsapp: body.whatsapp,
    externalId: data.id,
    fbp: body.fbp,
    fbc: body.fbc,
    contentName: body.home_type ?? undefined,
    clientIp: getClientIp(req),
    userAgent: req.headers.get("user-agent"),
  });

  return NextResponse.json({ id: data.id });
}
