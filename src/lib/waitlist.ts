export const WAITLIST_ROLES = ["Trader", "Researcher", "Builder", "Investor"] as const;

export type WaitlistRole = (typeof WAITLIST_ROLES)[number];

export type WaitlistSubmission = {
  id: string;
  email: string;
  role: WaitlistRole;
  source: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
};

export type WaitlistPublicSubmission = Omit<WaitlistSubmission, "note"> & {
  note?: string;
};

export function isWaitlistRole(value: unknown): value is WaitlistRole {
  return typeof value === "string" && WAITLIST_ROLES.includes(value as WaitlistRole);
}

export function normalizeEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
