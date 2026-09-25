import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { sendMetaCapiEvent, getClientIp } from "@/lib/metaCapi";

interface VerifyBody {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  requestId?: string;
  plan?: string;
  addonVerification?: boolean;
  amount?: number;
  name?: string;
  whatsapp?: string;
  fbp?: string;
  fbc?: string;
}

export async function POST(req: NextRequest) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ error: "Payments are not configured." }, { status: 500 });
  }

  const body = (await req.json().catch(() => null)) as VerifyBody | null;
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    requestId,
    plan,
    addonVerification,
    amount,
    name,
    whatsapp,
    fbp,
    fbc,
  } = body ?? {};

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !requestId) {
    return NextResponse.json({ error: "Missing payment details." }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: "Payment could not be verified." }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();
  if (supabase) {
    const { error } = await supabase
      .from("requests")
      .update({
        status: "paid",
        plan,
        addon_verification: Boolean(addonVerification),
        amount,
        razorpay_order_id,
        razorpay_payment_id,
      })
      .eq("id", requestId);

    if (error) {
      console.error("supabase update error", error);
      // Payment is genuinely verified at this point — don't fail the user's
      // flow over a bookkeeping write. Log it for manual follow-up instead.
    }
  }

  // Same eventId scheme as the client-side Purchase pixel event, so Meta
  // dedupes the two instead of counting this sale twice.
  void sendMetaCapiEvent({
    eventName: "Purchase",
    eventId: `${requestId}-purchase`,
    eventSourceUrl: req.headers.get("referer") || "https://bluesquaregroup.in/flathunter/thank-you",
    name,
    whatsapp,
    externalId: requestId,
    fbp,
    fbc,
    value: amount,
    currency: "INR",
    contentName: plan,
    contentCategory: addonVerification ? "search_plan_with_verification" : "search_plan",
    clientIp: getClientIp(req),
    userAgent: req.headers.get("user-agent"),
  });

  return NextResponse.json({ ok: true });
}
