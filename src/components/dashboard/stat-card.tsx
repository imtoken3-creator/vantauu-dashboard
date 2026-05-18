"use client";

import { Activity, Brain, CircleDollarSign, Radar } from "lucide-react";

const icons = [Brain, CircleDollarSign, Radar, Activity];
const accentStyles = {
  violet: {
    icon: "border-violet-300/30 bg-violet-300/10 text-violet-200 shadow-violet-500/20",
    line: "from-violet-300 via-primary to-transparent",
    badge: "border-violet-300/20 bg-violet-300/10 text-violet-200",
  },
  blue: {
    icon: "border-blue-300/30 bg-blue-300/10 text-blue-200 shadow-blue-500/20",
    line: "from-blue-300 via-cyan-300 to-transparent",
    badge: "border-blue-300/20 bg-blue-300/10 text-blue-200",
  },
  cyan: {
    icon: "border-cyan-300/30 bg-cyan-300/10 text-cyan-200 shadow-cyan-500/20",
    line: "from-cyan-300 via-primary to-transparent",
    badge: "border-cyan-300/20 bg-cyan-300/10 text-cyan-200",
  },
  emerald: {
    icon: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200 shadow-emerald-500/20",
    line: "from-emerald-300 via-cyan-300 to-transparent",
    badge: "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
  },
};

const sparkline = [36, 52, 44, 68, 61, 78, 92];

export function StatCard({
  label,
  value,
  delta,
  caption,
  iconIndex,
  accent = "violet",
}: {
  label: string;
  value: string;
  delta: string;
  caption: string;
  iconIndex: number;
  accent?: keyof typeof accentStyles;
}) {
  const Icon = icons[iconIndex] ?? Activity;
  const styles = accentStyles[accent] ?? accentStyles.violet;

  return (
    <article className="metric-card group">
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${styles.line}`} />
      <div className="absolute -right-12 top-0 h-24 w-40 rotate-12 bg-white/5 blur-xl transition duration-500 group-hover:bg-primary/12" />
      <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {label}
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
            {value}
          </p>
        </div>
        <div
          className={`rounded-lg border p-2 shadow-lg transition duration-300 group-hover:scale-105 ${styles.icon}`}
        >
          <Icon className="size-5" />
        </div>
      </div>

      <div className="mt-5 flex h-12 items-end gap-1 rounded-md border border-white/[0.06] bg-black/10 px-2 py-2">
        {sparkline.map((height, index) => (
          <span
            key={`${label}-${height}-${index}`}
            className="live-data-bar flex-1 rounded-sm bg-gradient-to-t from-primary/20 to-cyan-200/70 opacity-70 transition duration-300 group-hover:opacity-100"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      <div className="mt-5 flex items-end justify-between gap-3">
        <p className="text-xs leading-5 text-muted-foreground">{caption}</p>
        <span
          className={`shrink-0 rounded-md border px-2 py-1 text-xs font-medium ${styles.badge}`}
        >
          {delta}
        </span>
      </div>
    </article>
  );
}
