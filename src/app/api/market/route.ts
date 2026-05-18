import { NextResponse } from "next/server";

import { LIVE_INTELLIGENCE_FALLBACK } from "@/lib/live-intelligence";
import { fetchCoinGeckoData } from "@/lib/server/live-data";

export const runtime = "nodejs";
export const revalidate = 30;

export async function GET() {
  try {
    const data = await fetchCoinGeckoData();
    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json({
      ok: false,
      data: LIVE_INTELLIGENCE_FALLBACK.market,
      error: "CoinGecko data unavailable",
    });
  }
}
