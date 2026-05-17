"use client";

import dynamic from "next/dynamic";

const IntelligenceChartClient = dynamic(
  () =>
    import("@/components/dashboard/intelligence-chart-client").then(
      (mod) => mod.IntelligenceChartClient
    ),
  {
    ssr: false,
    loading: () => (
      <div className="chart-skeleton h-80" />
    ),
  }
);

export function IntelligenceChart() {
  return (
    <section className="section-surface-grid">
      <div className="absolute inset-0 cyber-grid opacity-25" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="relative">
          <p className="section-eyebrow">
            Model Output
          </p>
          <h2 className="text-lg font-semibold text-white">
            Signal Momentum
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Smart money, liquidity, and narrative strength
          </p>
        </div>
        <div className="relative hidden items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary sm:flex">
          <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.95)]" />
          Live model
        </div>
      </div>

      <div className="relative mb-5 grid gap-3 sm:grid-cols-3">
        {[
          ["Smart Money", "96", "text-primary"],
          ["Liquidity", "84", "text-cyan-200"],
          ["Sentiment", "81", "text-violet-200"],
        ].map(([label, value, color]) => (
          <div
            key={label}
            className="rounded-lg border border-white/10 bg-black/15 px-4 py-3 shadow-inner shadow-white/[0.03] transition duration-300 hover:border-primary/25 hover:bg-white/[0.055]"
          >
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className={`mt-1 text-xl font-semibold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="chart-frame">
        <IntelligenceChartClient />
      </div>
    </section>
  );
}
