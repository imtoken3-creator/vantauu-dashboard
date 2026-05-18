"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  BrainCircuit,
  ChartNoAxesCombined,
  Flame,
  MessageCircle,
  PieChart as PieChartIcon,
  RadioTower,
  ScanLine,
  Sparkles,
  TrendingUp,
  Waves,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { EmptyState } from "@/components/dashboard/empty-state";
import {
  heatmapDays,
  heatmapRows,
  narrativeKpis,
  narrativeMindshare,
  narrativeMomentumSeries,
  socialSentimentFeed,
  topNarratives,
} from "@/data/narratives";
import { useLiveIntelligence } from "@/hooks/use-live-intelligence";
import { isEmpty } from "@/lib/collection";
import { chartGridStroke, chartTickStyle, chartTooltipStyle } from "@/lib/chart-style";
import {
  formatPercent,
  formatUsd,
  type LiveIntelligenceData,
} from "@/lib/live-intelligence";
import { cn } from "@/lib/utils";

const kpiIcons = [RadioTower, ScanLine, BrainCircuit, Waves];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function useChartReady() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return isReady;
}

function ChartSkeleton() {
  return (
    <div className="chart-skeleton" />
  );
}

function buildNarrativeKpis(data: LiveIntelligenceData, isLoading: boolean) {
  if (isLoading) {
    return narrativeKpis.map((kpi) => ({
      ...kpi,
      value: "Loading",
      change: "Sync",
      detail: "Fetching CoinGecko trending narratives",
    }));
  }

  const btc = data.market.assets.find((asset) => asset.id === "bitcoin");
  const dominant = data.market.trending[0];

  return [
    {
      label: "Active Narratives",
      value: String(data.market.trending.length || 0),
      change: "CoinGecko",
      detail: "Trending search themes from live market data",
    },
    {
      label: "Emerging Narratives",
      value: String(data.market.trending.slice(0, 3).length || 0),
      change: "Top 3",
      detail: "Fastest visible market attention clusters",
    },
    {
      label: "Dominant Narrative",
      value: dominant?.symbol || "AI",
      change: dominant?.marketCapRank ? `#${dominant.marketCapRank}` : "Live",
      detail: dominant?.name || "Highest ranked trending asset",
    },
    {
      label: "Narrative Shift %",
      value: formatPercent(btc?.change24h),
      change: "BTC 24H",
      detail: `${formatUsd(data.market.totalMarketCapUsd)} total market cap context`,
    },
  ];
}

function buildTopNarratives(data: LiveIntelligenceData, isLoading: boolean) {
  if (isLoading || data.market.trending.length === 0) {
    return topNarratives;
  }

  return data.market.trending.slice(0, 7).map((item, index) => {
    const momentum = Math.max(48, 96 - index * 7);
    const mindshare = Math.max(5, 32 - index * 4.2);

    return {
      narrative: item.name,
      mindshare: `${mindshare.toFixed(1)}%`,
      momentum,
      capitalFlow: item.marketCapRank ? `Rank #${item.marketCapRank}` : "Trending",
      trend: `+${Math.max(3, 42 - index * 5)}%`,
    };
  });
}

export function NarrativeDashboard() {
  const isChartReady = useChartReady();
  const { data: liveData, isLoading: isLiveLoading } = useLiveIntelligence();
  const liveKpis = buildNarrativeKpis(liveData, isLiveLoading);
  const liveTopNarratives = buildTopNarratives(liveData, isLiveLoading);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.08 }}
      className="page-stack"
    >
      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="hero-surface"
      >
        <div className="absolute inset-0 cyber-grid animated-grid opacity-35" />
        <div className="cinematic-gradient absolute inset-0 opacity-25" />
        <div className="scan-line" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
        <div className="absolute -right-24 top-16 h-px w-[36rem] -rotate-12 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent blur-md" />

        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-primary">
              <Sparkles className="size-3.5" />
              AI narrative intelligence
            </div>
            <h1 className="text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl xl:text-6xl">
              Quantify the stories moving crypto capital.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Track narrative mindshare, capital rotation, social sentiment,
              and AI-ranked momentum before market consensus hardens.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
            {[
              [
                "Market cap",
                isLiveLoading ? "Loading" : formatUsd(liveData.market.totalMarketCapUsd),
              ],
              ["Signal latency", isLiveLoading ? "Syncing" : "60s"],
              [
                "Trending assets",
                isLiveLoading ? "Loading" : String(liveData.market.trending.length),
              ],
            ].map(([label, value]) => (
              <div
                key={label}
                className="surface-card"
              >
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        {liveKpis.map((kpi, index) => {
          const Icon = kpiIcons[index] ?? Activity;
          return (
            <article
              key={kpi.label}
              className="metric-card group"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {kpi.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    {kpi.value}
                  </p>
                </div>
                <div className="icon-tile">
                  <Icon className="size-5" />
                </div>
              </div>
              <div className="mt-5 flex items-end justify-between gap-3">
                <p className="text-xs leading-5 text-muted-foreground">
                  {kpi.detail}
                </p>
                <span className="shrink-0 rounded-md border border-emerald-300/20 bg-emerald-300/10 px-2 py-1 text-xs font-medium text-emerald-200">
                  {kpi.change}
                </span>
              </div>
            </article>
          );
        })}
      </motion.section>

      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="grid gap-6 xl:grid-cols-[1.25fr_0.85fr]"
      >
        <TopNarrativesTable narratives={liveTopNarratives} />
        <NarrativeMindshareDonut isReady={isChartReady} />
      </motion.section>

      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="grid gap-6 xl:grid-cols-[1fr_1fr]"
      >
        <NarrativeHeatmap />
        <TrendMomentumPanel isReady={isChartReady} />
      </motion.section>

      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <SocialSentimentFeed />
      </motion.section>
    </motion.div>
  );
}

function TopNarrativesTable({
  narratives,
}: {
  narratives: ReadonlyArray<{
    narrative: string;
    mindshare: string;
    momentum: number;
    capitalFlow: string;
    trend: string;
  }>;
}) {
  return (
    <section className="section-surface">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">
            Top Narratives Table
          </p>
          <h2 className="text-lg font-semibold text-white">
            Narrative Ranking
          </h2>
        </div>
        <ChartNoAxesCombined className="size-5 text-primary" />
      </div>

      <div className="space-y-3">
        {isEmpty(narratives) ? (
          <EmptyState
            title="No narratives ranked"
            description="Narrative rows will appear when trending market data is available."
          />
        ) : narratives.map((item, index) => (
          <article
            key={item.narrative}
            className="interactive-row group grid gap-4 lg:grid-cols-[42px_1.2fr_0.7fr_0.9fr_0.9fr_0.7fr]"
          >
            <div className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.055] text-sm font-semibold text-primary">
              {index + 1}
            </div>
            <div>
              <p className="font-medium text-white">{item.narrative}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                AI-weighted theme cluster
              </p>
            </div>
            <Metric label="Mindshare" value={item.mindshare} />
            <div>
              <p className="text-xs text-muted-foreground">Momentum</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-primary to-violet-400"
                  style={{ width: `${item.momentum}%` }}
                />
              </div>
              <p className="mt-2 text-sm font-medium text-white">
                {item.momentum}
              </p>
            </div>
            <Metric label="Capital Flow" value={item.capitalFlow} />
            <Metric
              label="Trend (7D)"
              value={item.trend}
              muted={item.trend.startsWith("-")}
            />
          </article>
        ))}
      </div>
    </section>
  );
}

function NarrativeMindshareDonut({ isReady }: { isReady: boolean }) {
  return (
    <section className="section-surface">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="section-eyebrow">
            Narrative Mindshare Donut Chart
          </p>
          <h2 className="text-lg font-semibold text-white">
            Mindshare Distribution
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Weighted share across social, liquidity, and wallet signals
          </p>
        </div>
        <PieChartIcon className="size-5 text-primary" />
      </div>

      <div className="h-64">
        {isReady ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <PieChart>
              <Pie
                data={narrativeMindshare}
                dataKey="value"
                innerRadius={72}
                outerRadius={104}
                paddingAngle={4}
                cornerRadius={6}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={1}
              >
                {narrativeMindshare.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={chartTooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <ChartSkeleton />
        )}
      </div>

      <div className="mt-3 space-y-2">
        {narrativeMindshare.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-slate-300">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-white">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function NarrativeHeatmap() {
  return (
    <section className="section-surface-grid">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="relative mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">
            Narrative Heatmap
          </p>
          <h2 className="text-lg font-semibold text-white">
            7D Theme Intensity Timeline
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Heat by narrative across the weekly signal window
          </p>
        </div>
        <Flame className="size-5 text-primary" />
      </div>

      <div className="relative overflow-x-auto">
        <div className="min-w-[620px] space-y-3">
          <div className="grid grid-cols-[150px_repeat(7,1fr)] gap-2 text-xs text-muted-foreground">
            <span>Narrative</span>
            {heatmapDays.map((day) => (
              <span key={day} className="text-center">
                {day}
              </span>
            ))}
          </div>
          {heatmapRows.map((row) => (
            <div
              key={row.narrative}
              className="grid grid-cols-[150px_repeat(7,1fr)] items-center gap-2"
            >
              <span className="text-sm font-medium text-white">
                {row.narrative}
              </span>
              {row.values.map((value, index) => (
                <div
                  key={`${row.narrative}-${index}`}
                  className="group relative h-10 rounded-md border border-white/10 transition duration-300 hover:-translate-y-0.5 hover:border-white/25"
                  style={{
                    background: `linear-gradient(135deg, rgba(56,189,248,${0.08 + value / 220}), rgba(124,140,255,${0.12 + value / 160}), rgba(168,85,247,${0.08 + value / 240}))`,
                    boxShadow: `0 0 ${Math.round(value / 3)}px rgba(124,140,255,${value / 360})`,
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white/80 opacity-0 transition group-hover:opacity-100">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrendMomentumPanel({ isReady }: { isReady: boolean }) {
  return (
    <section className="section-surface-grid">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="relative mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="section-eyebrow">
            Trend Momentum Panel
          </p>
          <h2 className="text-lg font-semibold text-white">
            Narrative Momentum Curves
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Seven day momentum curves across leading narratives
          </p>
        </div>
        <TrendingUp className="size-5 text-primary" />
      </div>

      <div className="chart-frame">
        {isReady ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <AreaChart
              data={narrativeMomentumSeries}
              margin={{ top: 12, right: 12, left: -12, bottom: 0 }}
            >
              <defs>
                <linearGradient id="aiMomentum" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#7c8cff" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#7c8cff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="rwaMomentum" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={chartGridStroke} vertical={false} />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={chartTickStyle}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={chartTickStyle}
              />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Area
                type="monotone"
                dataKey="ai"
                stroke="#7c8cff"
                strokeWidth={3}
                strokeLinecap="round"
                fill="url(#aiMomentum)"
              />
              <Area
                type="monotone"
                dataKey="rwa"
                stroke="#38bdf8"
                strokeWidth={2.4}
                strokeLinecap="round"
                fill="url(#rwaMomentum)"
              />
              <Area
                type="monotone"
                dataKey="defi"
                stroke="#a855f7"
                strokeWidth={2.2}
                strokeLinecap="round"
                fill="transparent"
              />
              <Area
                type="monotone"
                dataKey="meme"
                stroke="#f59e0b"
                strokeWidth={2.2}
                strokeLinecap="round"
                fill="transparent"
              />
              <Area
                type="monotone"
                dataKey="layer2"
                stroke="#34d399"
                strokeWidth={2.2}
                strokeLinecap="round"
                fill="transparent"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ChartSkeleton />
        )}
      </div>
    </section>
  );
}

function SocialSentimentFeed() {
  return (
    <section className="section-surface">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">
            Social Sentiment Feed
          </p>
          <h2 className="text-lg font-semibold text-white">
            Twitter / Farcaster Narrative Signals
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Simulated social signal stream ranked by narrative impact
          </p>
        </div>
        <MessageCircle className="size-5 text-primary" />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {isEmpty(socialSentimentFeed) ? (
          <div className="md:col-span-2">
            <EmptyState
              title="No social signals"
              description="Social sentiment events will appear when mock feed data is available."
            />
          </div>
        ) : socialSentimentFeed.map((signal) => (
          <article
            key={signal.title}
            className="interactive-row-cyan group"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="mb-3 inline-flex rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-primary">
                  {signal.source}
                </div>
                <p className="font-medium text-white">{signal.title}</p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {signal.meta}
                </p>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:text-primary" />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span
                className={cn(
                  "rounded-md border px-2 py-1 text-xs",
                  signal.signal.includes("Risk")
                    ? "border-rose-300/25 bg-rose-300/10 text-rose-200"
                    : "border-emerald-300/25 bg-emerald-300/10 text-emerald-200"
                )}
              >
                {signal.signal}
              </span>
              <span className="text-xs text-muted-foreground">{signal.time}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`mt-1 font-medium ${muted ? "text-rose-200" : "text-emerald-300"}`}>
        {value}
      </p>
    </div>
  );
}
