import { NextResponse } from "next/server";

import { LIVE_INTELLIGENCE_FALLBACK } from "@/lib/live-intelligence";
import { fetchDefiLlamaData } from "@/lib/server/live-data";

export const runtime = "nodejs";
export const revalidate = 30;

export async function GET() {
  try {
    const data = await fetchDefiLlamaData();
    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json({
      ok: false,
      data: LIVE_INTELLIGENCE_FALLBACK.defi,
      error: "DefiLlama data unavailable",
    });
  }
}
