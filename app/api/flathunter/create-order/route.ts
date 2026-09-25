import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";

type RazorpayApiError = {
  statusCode?: number;
  error?: {
    code?: string;
    description?: string;
    reason?: string;
  };
};

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
  const requestId =
    typeof body?.requestId === "string" ? body.requestId : "";

  if (!Number.isFinite(amount) || amount <= 0 || !requestId) {
    return NextResponse.json(
      { error: "Invalid order details." },
      { status: 400 }
    );
  }

  try {
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Every Razorpay order must have a unique receipt.
    // Keep requestId separately in notes.
    const receipt = `fh_${crypto.randomUUID().replace(/-/g, "")}`;

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt,
      notes: {
        requestId,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (err) {
    const razorpayError = err as RazorpayApiError;

    const details =
      razorpayError?.error?.description ||
      razorpayError?.error?.reason ||
      (err instanceof Error ? err.message : "Unknown Razorpay error");

    console.error("create-order error", {
      statusCode: razorpayError?.statusCode,
      code: razorpayError?.error?.code,
      description: razorpayError?.error?.description,
      reason: razorpayError?.error?.reason,
    });

    return NextResponse.json(
      {
        error: "Could not start payment. Please try again.",
        code:
          razorpayError?.error?.code ||
          "RAZORPAY_ORDER_CREATE_FAILED",
        details,
      },
      { status: 502 }
    );
  }
}
