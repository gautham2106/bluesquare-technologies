import { NextRequest, NextResponse } from "next/server";
import { nominatimReverse } from "@/lib/nominatim";

export async function GET(req: NextRequest) {
  const lat = Number(req.nextUrl.searchParams.get("lat"));
  const lng = Number(req.nextUrl.searchParams.get("lng"));

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json({ areaName: "your area" }, { status: 200 });
  }

  try {
    const areaName = await nominatimReverse(lat, lng);
    return NextResponse.json({ areaName });
  } catch (err) {
    console.error("reverse-geocode error", err);
    return NextResponse.json({ areaName: "your area" }, { status: 200 });
  }
}
