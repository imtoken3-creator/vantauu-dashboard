import { NextResponse } from "next/server";

import { fetchLiveIntelligenceData } from "@/lib/server/live-data";

export const runtime = "nodejs";
export const revalidate = 30;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const data = await fetchLiveIntelligenceData(address);

  return NextResponse.json({
    ok: data.errors.length === 0 && !data.wallet.error,
    data,
  });
}
