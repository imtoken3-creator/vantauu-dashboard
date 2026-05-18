import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { WaitlistRole, WaitlistSubmission } from "@/lib/waitlist";

const STORAGE_DIR = path.join(process.cwd(), ".data");
const STORAGE_FILE = path.join(STORAGE_DIR, "waitlist-submissions.json");

async function ensureStorage() {
  await mkdir(STORAGE_DIR, { recursive: true });
}

export async function readWaitlistSubmissions(): Promise<WaitlistSubmission[]> {
  await ensureStorage();

  try {
    const file = await readFile(STORAGE_FILE, "utf8");
    const parsed = JSON.parse(file) as WaitlistSubmission[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error
      ? (error as { code?: string }).code
      : undefined;

    if (code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

export async function upsertWaitlistSubmission({
  email,
  role,
  source,
  note,
}: {
  email: string;
  role: WaitlistRole;
  source: string;
  note?: string;
}) {
  const submissions = await readWaitlistSubmissions();
  const now = new Date().toISOString();
  const existingIndex = submissions.findIndex((item) => item.email === email);

  if (existingIndex >= 0) {
    const existing = submissions[existingIndex];
    submissions[existingIndex] = {
      ...existing,
      role,
      source,
      note: note || existing.note,
      updatedAt: now,
    };
  } else {
    submissions.unshift({
      id: crypto.randomUUID(),
      email,
      role,
      source,
      note,
      createdAt: now,
      updatedAt: now,
    });
  }

  await ensureStorage();
  await writeFile(STORAGE_FILE, `${JSON.stringify(submissions, null, 2)}\n`);

  return {
    submission: submissions[existingIndex >= 0 ? existingIndex : 0],
    submissions,
    status: existingIndex >= 0 ? "updated" : "created",
  };
}

export function isWaitlistAdminAuthorized(request: Request) {
  const configuredToken = process.env.WAITLIST_ADMIN_TOKEN;

  if (!configuredToken && process.env.NODE_ENV !== "production") {
    return true;
  }

  if (!configuredToken) {
    return false;
  }

  const { searchParams } = new URL(request.url);
  const queryToken = searchParams.get("token");
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : null;

  return queryToken === configuredToken || bearerToken === configuredToken;
}
