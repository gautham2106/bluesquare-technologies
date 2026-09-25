import { NextRequest, NextResponse } from "next/server";
import { nominatimSearch } from "@/lib/nominatim";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q || q.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await nominatimSearch(q.trim());
    return NextResponse.json({ results });
  } catch (err) {
    console.error("geocode error", err);
    return NextResponse.json({ results: [] }, { status: 200 });
  }
}
