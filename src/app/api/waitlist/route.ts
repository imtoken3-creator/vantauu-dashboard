import { NextResponse } from "next/server";

import {
  isValidEmail,
  isWaitlistRole,
  normalizeEmail,
} from "@/lib/waitlist";
import {
  isWaitlistAdminAuthorized,
  readWaitlistSubmissions,
  upsertWaitlistSubmission,
} from "@/lib/server/waitlist-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      email?: unknown;
      role?: unknown;
      source?: unknown;
      note?: unknown;
    };
    const email = normalizeEmail(payload.email);

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Enter a valid email address." },
        { status: 400 }
      );
    }

    if (!isWaitlistRole(payload.role)) {
      return NextResponse.json(
        { ok: false, error: "Select a valid role." },
        { status: 400 }
      );
    }

    const source =
      typeof payload.source === "string" && payload.source.trim()
        ? payload.source.trim().slice(0, 80)
        : "landing";
    const note =
      typeof payload.note === "string" && payload.note.trim()
        ? payload.note.trim().slice(0, 320)
        : undefined;

    const result = await upsertWaitlistSubmission({
      email,
      role: payload.role,
      source,
      note,
    });

    return NextResponse.json({
      ok: true,
      status: result.status,
      count: result.submissions.length,
      submission: {
        id: result.submission.id,
        email: result.submission.email,
        role: result.submission.role,
        source: result.submission.source,
        createdAt: result.submission.createdAt,
        updatedAt: result.submission.updatedAt,
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Waitlist submission failed." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  if (!isWaitlistAdminAuthorized(request)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          process.env.WAITLIST_ADMIN_TOKEN
            ? "Invalid waitlist admin token."
            : "Set WAITLIST_ADMIN_TOKEN to enable admin access in production.",
      },
      { status: 401 }
    );
  }

  const submissions = await readWaitlistSubmissions();
  const roleCounts = submissions.reduce<Record<string, number>>((acc, item) => {
    acc[item.role] = (acc[item.role] ?? 0) + 1;
    return acc;
  }, {});

  return NextResponse.json({
    ok: true,
    count: submissions.length,
    roleCounts,
    submissions,
  });
}
