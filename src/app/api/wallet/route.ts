import { NextResponse } from "next/server";

import { LIVE_INTELLIGENCE_FALLBACK } from "@/lib/live-intelligence";
import { fetchEtherscanData } from "@/lib/server/live-data";

export const runtime = "nodejs";
export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  try {
    const data = await fetchEtherscanData(address);

    return NextResponse.json({
      ok: data.enabled && !data.error,
      data,
      error: data.error,
    });
  } catch {
    return NextResponse.json({
      ok: false,
      data: LIVE_INTELLIGENCE_FALLBACK.wallet,
      error: "Etherscan data unavailable",
    });
  }
}
