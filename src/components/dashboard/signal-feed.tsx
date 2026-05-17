import { ArrowUpRight, ShieldAlert } from "lucide-react";

import { EmptyState } from "@/components/dashboard/empty-state";
import { signalFeed } from "@/data/mock";
import { isEmpty } from "@/lib/collection";

const toneStyles = {
  rose: "border-rose-300/25 bg-rose-300/10 text-rose-200",
  violet: "border-violet-300/25 bg-violet-300/10 text-violet-200",
  cyan: "border-cyan-300/25 bg-cyan-300/10 text-cyan-200",
  blue: "border-blue-300/25 bg-blue-300/10 text-blue-200",
};

export function SignalFeed() {
  return (
    <section className="section-surface-grid">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="section-eyebrow">
            Intelligence Feed
          </p>
          <h2 className="text-lg font-semibold text-white">Priority Signals</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Ranked by anomaly strength
          </p>
        </div>
        <ShieldAlert className="size-5 text-primary" />
      </div>

      <div className="space-y-3">
        {isEmpty(signalFeed) ? (
          <EmptyState
            title="No priority signals"
            description="Signal cards will appear here when mock anomaly data is available."
          />
        ) : signalFeed.map((signal) => (
          <article
            key={signal.title}
            className="interactive-row group relative overflow-hidden hover:bg-primary/5"
          >
            <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-white">{signal.title}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {signal.meta}
                </p>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:text-primary" />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span
                className={`inline-flex rounded-md border px-2 py-1 text-xs ${
                  toneStyles[signal.tone as keyof typeof toneStyles] ??
                  toneStyles.blue
                }`}
              >
                {signal.level}
              </span>
              <div className="min-w-24 flex-1">
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-primary to-violet-400"
                    style={{ width: `${signal.strength}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {signal.strength}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
