import { NextResponse } from "next/server";

import { generateIntelligenceLayer } from "@/lib/ai-intelligence-layer";
import { fetchLiveIntelligenceData } from "@/lib/server/live-data";

export const runtime = "nodejs";
export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const data = await fetchLiveIntelligenceData(address);
  const ai = generateIntelligenceLayer(data, {
    error: data.wallet.error ?? data.errors[0] ?? null,
  });

  return NextResponse.json({
    ok: data.errors.length === 0 && !data.wallet.error,
    data,
    ai,
  });
}
