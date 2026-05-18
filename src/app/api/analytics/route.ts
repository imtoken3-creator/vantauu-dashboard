import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (process.env.NODE_ENV === "development") {
      console.info("[analytics]", payload);
    }
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  return new NextResponse(null, { status: 204 });
}
