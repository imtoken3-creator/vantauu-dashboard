"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  DatabaseZap,
  LoaderCircle,
  RadioTower,
  Search,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { WAITLIST_ROLES, type WaitlistSubmission } from "@/lib/waitlist";

type WaitlistResponse = {
  ok: boolean;
  count?: number;
  roleCounts?: Record<string, number>;
  submissions?: WaitlistSubmission[];
  error?: string;
};

export function WaitlistAdmin() {
  const initialToken =
    typeof window === "undefined"
      ? ""
      : window.sessionStorage.getItem("vantauu_waitlist_token") ?? "";
  const [token, setToken] = useState(initialToken);
  const [activeToken, setActiveToken] = useState(initialToken);
  const [query, setQuery] = useState("");
  const [data, setData] = useState<WaitlistResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadInitialSubmissions() {
      setIsLoading(true);
      setError(null);

      try {
        const params = activeToken ? `?token=${encodeURIComponent(activeToken)}` : "";
        const response = await fetch(`/api/waitlist${params}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const payload = (await response.json()) as WaitlistResponse;

        if (!response.ok || !payload.ok) {
          throw new Error(payload.error ?? "Unable to load waitlist.");
        }

        setData(payload);
      } catch (loadError) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load waitlist."
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadInitialSubmissions();

    return () => controller.abort();
  }, [activeToken]);

  const filteredSubmissions = useMemo(() => {
    const submissions = data?.submissions ?? [];
    const needle = query.trim().toLowerCase();

    if (!needle) {
      return submissions;
    }

    return submissions.filter((item) =>
      [item.email, item.role, item.source, item.note ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [data?.submissions, query]);

  function handleTokenSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.sessionStorage.setItem("vantauu_waitlist_token", token);
    setActiveToken(token);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="absolute inset-0 cyber-grid opacity-15" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-primary">
              <ShieldCheck className="size-3.5" />
              Admin
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Waitlist submissions
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              Review early users, researchers, AI engineers, crypto traders,
              investors, and potential hires requesting access to Vantauu.
            </p>
          </div>

          <form
            onSubmit={handleTokenSubmit}
            className="flex w-full gap-2 lg:max-w-md"
          >
            <input
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Admin token"
              className="h-11 min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.045] px-3 text-sm text-white outline-none transition placeholder:text-muted-foreground focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-primary/35 bg-primary/15 px-4 text-sm font-medium text-white transition hover:bg-primary/20 disabled:opacity-70"
            >
              {isLoading ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <ArrowRight className="size-4" />
              )}
              Load
            </button>
          </form>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
            {error}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <MetricCard label="Total" value={String(data?.count ?? 0)} icon={UsersRound} />
          {WAITLIST_ROLES.map((role) => (
            <MetricCard
              key={role}
              label={role}
              value={String(data?.roleCounts?.[role] ?? 0)}
              icon={RadioTower}
            />
          ))}
        </div>

        <section className="section-surface mt-6 overflow-hidden p-0">
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center">
            <div>
              <p className="section-eyebrow">Submissions</p>
              <h2 className="text-xl font-semibold text-white">
                Access requests
              </h2>
            </div>
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search email, role, source..."
                className="h-10 w-full rounded-lg border border-white/10 bg-black/15 pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-muted-foreground focus:border-primary/40"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[880px] w-full border-collapse text-left">
              <thead className="bg-white/[0.035]">
                <tr className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <th className="px-5 py-4 font-medium">Email</th>
                  <th className="px-5 py-4 font-medium">Role</th>
                  <th className="px-5 py-4 font-medium">Source</th>
                  <th className="px-5 py-4 font-medium">Context</th>
                  <th className="px-5 py-4 font-medium">Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map((submission) => (
                  <tr
                    key={submission.id}
                    className="border-t border-white/10 transition hover:bg-white/[0.035]"
                  >
                    <td className="px-5 py-4 font-mono text-sm text-white">
                      {submission.email}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-md border border-primary/25 bg-primary/10 px-2 py-1 text-xs text-primary">
                        {submission.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-300">
                      {submission.source}
                    </td>
                    <td className="max-w-md px-5 py-4 text-sm leading-6 text-muted-foreground">
                      {submission.note || "No context"}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-300">
                      {new Date(submission.updatedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSubmissions.length === 0 && (
            <div className="grid place-items-center px-5 py-16 text-center">
              <DatabaseZap className="mb-4 size-8 text-primary" />
              <p className="font-medium text-white">No submissions yet</p>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                New waitlist requests will appear here as soon as users submit
                the access form.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof UsersRound;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="metric-card min-h-[132px]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {label}
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
            {value}
          </p>
        </div>
        <div className="icon-tile">
          <Icon className="size-5" />
        </div>
      </div>
    </motion.article>
  );
}
