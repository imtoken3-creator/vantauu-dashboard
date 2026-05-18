"use client";

import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  BrainCircuit,
  CircleDollarSign,
  Copy,
  Gem,
  Radar,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  WalletCards,
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
  allocationDonut,
  netInflowSeries,
  smartMoneyKpis,
  smartWalletClusters,
  walletLeaderboard,
} from "@/data/smart-money";
import { useLiveIntelligence } from "@/hooks/use-live-intelligence";
import { isEmpty } from "@/lib/collection";
import {
  chartAnimationProps,
  chartGridStroke,
  chartPieAnimationProps,
  chartTickStyle,
  chartTooltipStyle,
} from "@/lib/chart-style";
import {
  formatNumber,
  shortAddress,
  type LiveIntelligenceData,
} from "@/lib/live-intelligence";
import { cn } from "@/lib/utils";

const kpiIcons = [CircleDollarSign, TrendingUp, WalletCards, BrainCircuit];

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

function buildSmartMoneyKpis(data: LiveIntelligenceData, isLoading: boolean) {
  if (isLoading) {
    return smartMoneyKpis.map((kpi) => ({
      ...kpi,
      value: "Loading",
      change: "Sync",
      detail: "Fetching Etherscan wallet activity",
    }));
  }

  const latestTransfer = data.wallet.tokenTransfers[0];
  const latestTransaction = data.wallet.transactions[0];

  return [
    {
      label: "Wallet Monitor",
      value: data.wallet.enabled ? shortAddress(data.wallet.address) : "Add key",
      change: data.wallet.enabled ? "Live" : "Optional",
      detail: data.wallet.enabled
        ? "Configured Etherscan wallet address"
        : "Set ETHERSCAN_API_KEY to enable wallet intelligence",
    },
    {
      label: "Recent Transactions",
      value: data.wallet.enabled ? formatNumber(data.wallet.transactions.length) : "0",
      change: "Etherscan",
      detail: latestTransaction
        ? `${latestTransaction.valueEth.toFixed(3)} ETH latest transfer`
        : "Normal transaction history",
    },
    {
      label: "Token Transfers",
      value: data.wallet.enabled ? formatNumber(data.wallet.tokenTransfers.length) : "0",
      change: "ERC-20",
      detail: latestTransfer
        ? `${latestTransfer.tokenSymbol} transfer stream`
        : "Token transfer feed",
    },
    {
      label: "Conviction Score",
      value: data.wallet.enabled ? "Live" : "Fallback",
      change: data.wallet.enabled ? "+Real" : "Mock-safe",
      detail: "UI remains resilient if provider data is unavailable",
    },
  ];
}

function buildSmartMoneyFeed(data: LiveIntelligenceData, isLoading: boolean) {
  if (isLoading) {
    return [
      {
        title: "Loading Etherscan wallet feed",
        meta: "Fetching normal transactions and token transfers",
        time: "Syncing",
        level: "Signal",
      },
    ];
  }

  const transferEvents = data.wallet.tokenTransfers.slice(0, 4).map((transfer) => ({
    title: `${transfer.tokenSymbol} token transfer`,
    meta: `${shortAddress(transfer.from)} -> ${shortAddress(transfer.to)} / ${formatNumber(transfer.value)} ${transfer.tokenSymbol}`,
    time: "Recent",
    level: "Signal",
  }));

  const transactionEvents = data.wallet.transactions.slice(0, 4).map((tx) => ({
    title: "ETH transaction observed",
    meta: `${shortAddress(tx.from)} -> ${shortAddress(tx.to)} / ${tx.valueEth.toFixed(3)} ETH`,
    time: "Recent",
    level: "Watch",
  }));

  const events = transferEvents.length > 0 ? transferEvents : transactionEvents;

  return events.length > 0
    ? events
    : [
        {
          title: "Etherscan wallet feed not configured",
          meta: "Add ETHERSCAN_API_KEY in .env.local to replace this fallback state",
          time: "Setup",
          level: "Watch",
        },
      ];
}

export function SmartMoneyDashboard() {
  const isChartReady = useChartReady();
  const { data: liveData, isLoading: isLiveLoading } = useLiveIntelligence();
  const liveKpis = buildSmartMoneyKpis(liveData, isLiveLoading);
  const liveFeed = buildSmartMoneyFeed(liveData, isLiveLoading);

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
              Smart money intelligence
            </div>
            <h1 className="text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl xl:text-6xl">
              Follow the wallets that move before the market.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Monitor labeled funds, whales, early accumulators, and AI-ranked
              wallet clusters with real-time mock intelligence.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
            {[
              [
                "Wallet address",
                isLiveLoading ? "Loading" : shortAddress(liveData.wallet.address),
              ],
              ["Signal freshness", isLiveLoading ? "Syncing" : "30s"],
              [
                "Transfers",
                isLiveLoading
                  ? "Loading"
                  : formatNumber(liveData.wallet.tokenTransfers.length),
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
        className="grid gap-6 xl:grid-cols-[1.42fr_0.78fr]"
      >
        <MemoizedNetInflowChart isReady={isChartReady} />
        <MemoizedAllocationDonutChart isReady={isChartReady} />
      </motion.section>

      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="grid gap-6 xl:grid-cols-[1.25fr_0.95fr]"
      >
        <WalletLeaderboard />
        <SmartMoneyFeed events={liveFeed} />
      </motion.section>

      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <WalletClusterPanel />
      </motion.section>
    </motion.div>
  );
}

function NetInflowChart({ isReady }: { isReady: boolean }) {
  return (
    <section className="section-surface-grid">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="relative mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="section-eyebrow">
            Net Inflow Chart
          </p>
          <h2 className="text-lg font-semibold text-white">
            Smart Money Net Inflow
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Inflow, outflow, and net capital tracked over the last 16 hours
          </p>
        </div>
        <div className="hidden rounded-md border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200 sm:block">
          +$286.4M
        </div>
      </div>

      <div className="chart-frame">
        {isReady ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <AreaChart
              data={netInflowSeries}
              margin={{ top: 12, right: 12, left: -12, bottom: 0 }}
            >
              <defs>
                <linearGradient id="smartInflow" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#7c8cff" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#7c8cff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="smartNet" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={chartGridStroke} vertical={false} />
              <XAxis
                dataKey="date"
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
                {...chartAnimationProps}
                type="monotone"
                dataKey="inflow"
                stroke="#7c8cff"
                strokeWidth={2}
                strokeLinecap="round"
                fill="url(#smartInflow)"
              />
              <Area
                {...chartAnimationProps}
                type="monotone"
                dataKey="net"
                stroke="#34d399"
                strokeWidth={2}
                strokeLinecap="round"
                fill="url(#smartNet)"
              />
              <Area
                {...chartAnimationProps}
                type="monotone"
                dataKey="outflow"
                stroke="#f87171"
                strokeWidth={2}
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

function AllocationDonutChart({ isReady }: { isReady: boolean }) {
  return (
    <section className="section-surface">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="section-eyebrow">
            Allocation Donut
          </p>
          <h2 className="text-lg font-semibold text-white">
            Smart Wallet Allocation
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Current sector exposure among top ranked wallets
          </p>
        </div>
        <Gem className="size-5 text-primary" />
      </div>

      <div className="h-64">
        {isReady ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <PieChart>
              <Pie
                {...chartPieAnimationProps}
                data={allocationDonut}
                dataKey="value"
                innerRadius={72}
                outerRadius={104}
                paddingAngle={4}
                cornerRadius={6}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={1}
              >
                {allocationDonut.map((item) => (
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
        {allocationDonut.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-slate-300">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-white">{item.value}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const MemoizedNetInflowChart = memo(NetInflowChart);
const MemoizedAllocationDonutChart = memo(AllocationDonutChart);

function WalletLeaderboard() {
  return (
    <section className="section-surface">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">
            Wallet Leaderboard
          </p>
          <h2 className="text-lg font-semibold text-white">
            Top Ranked Smart Wallets
          </h2>
        </div>
        <Radar className="size-5 text-primary" />
      </div>

      <div className="space-y-3">
        {isEmpty(walletLeaderboard) ? (
          <EmptyState
            title="No ranked wallets"
            description="Wallet leaderboard rows will appear when mock smart money data is available."
          />
        ) : walletLeaderboard.map((wallet) => (
          <article
            key={wallet.wallet}
            className="interactive-row group grid gap-4 lg:grid-cols-[52px_1.4fr_0.8fr_0.7fr_86px]"
          >
            <div className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.055] text-sm font-semibold text-primary">
              {wallet.rank}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-white">{wallet.entity}</p>
                <button
                  type="button"
                  aria-label={`Copy ${wallet.wallet}`}
                  className="rounded-md border border-white/10 p-1 text-muted-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  <Copy className="size-3.5" />
                </button>
              </div>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {wallet.wallet}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {wallet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Metric label="Net flow" value={wallet.netFlow} />
            <Metric label="PnL" value={wallet.pnl} />
            <div>
              <p className="text-xs text-muted-foreground">Score</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-primary to-violet-400"
                  style={{ width: `${wallet.score}%` }}
                />
              </div>
              <p className="mt-2 text-sm font-medium text-white">{wallet.score}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SmartMoneyFeed({
  events,
}: {
  events: { title: string; meta: string; time: string; level: string }[];
}) {
  return (
    <section className="section-surface">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">
            Smart Money Feed
          </p>
          <h2 className="text-lg font-semibold text-white">Live Wallet Moves</h2>
        </div>
        <Activity className="size-5 text-primary" />
      </div>

      <div className="space-y-3">
        {isEmpty(events) ? (
          <EmptyState
            title="No wallet moves"
            description="Live wallet movements will appear when Etherscan data is available."
          />
        ) : events.map((event) => (
          <article
            key={`${event.title}-${event.time}-${event.meta}`}
            className="interactive-row-cyan group"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-white">{event.title}</p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {event.meta}
                </p>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:text-primary" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span
                className={cn(
                  "rounded-md border px-2 py-1 text-xs",
                  event.level === "High" &&
                    "border-rose-300/25 bg-rose-300/10 text-rose-200",
                  event.level === "Bullish" &&
                    "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
                  event.level === "Signal" &&
                    "border-cyan-300/25 bg-cyan-300/10 text-cyan-200",
                  event.level === "Watch" &&
                    "border-violet-300/25 bg-violet-300/10 text-violet-200"
                )}
              >
                {event.level}
              </span>
              <span className="text-xs text-muted-foreground">{event.time}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WalletClusterPanel() {
  return (
    <section className="section-surface">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">
            Wallet Cluster Panel
          </p>
          <h2 className="text-lg font-semibold text-white">
            AI Ranked Wallet Clusters
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Cohorts grouped by flow direction, asset focus, and behavior pattern
          </p>
        </div>
        <ShieldCheck className="size-5 text-primary" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {isEmpty(smartWalletClusters) ? (
          <div className="lg:col-span-3">
            <EmptyState
              title="No wallet clusters"
              description="AI-ranked clusters will appear when mock cohort data is available."
            />
          </div>
        ) : smartWalletClusters.map((cluster) => (
          <article
            key={cluster.name}
            className="interactive-row group p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-white">{cluster.name}</h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  {cluster.wallets}
                </p>
              </div>
              <span className="rounded-md border border-emerald-300/20 bg-emerald-300/10 px-2 py-1 text-xs text-emerald-200">
                {cluster.flow}
              </span>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">Asset focus</p>
            <p className="mt-1 text-sm font-medium text-primary">
              {cluster.focus}
            </p>
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Confidence</span>
                <span className="text-white">{cluster.confidence}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-primary to-violet-400"
                  style={{ width: `${cluster.confidence}%` }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium text-emerald-300">{value}</p>
    </div>
  );
}
