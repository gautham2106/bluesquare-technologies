import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Payments are not configured yet. Please WhatsApp us instead." },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => null);
  const amount = Number(body?.amount);
  const requestId = typeof body?.requestId === "string" ? body.requestId : "";

  if (!Number.isFinite(amount) || amount <= 0 || !requestId) {
    return NextResponse.json({ error: "Invalid order details." }, { status: 400 });
  }

  try {
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency: "INR",
      receipt: `fh_${requestId}`.slice(0, 40),
      notes: { requestId },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (err) {
    console.error("create-order error", err);
    return NextResponse.json({ error: "Could not start payment. Please try again." }, { status: 500 });
  }
}
