"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  CircleDollarSign,
  Coins,
  DatabaseZap,
  GitBranch,
  Landmark,
  Sparkles,
  TrendingDown,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { EmptyState } from "@/components/dashboard/empty-state";
import {
  capitalFlowKpis,
  chainFlowSeries,
  ecosystemRanking,
  sankeyFlowRoutes,
  sankeyNodes,
  stablecoinAllocation,
  topProtocolsByInflow,
} from "@/data/capital-flow";
import { isEmpty } from "@/lib/collection";
import { chartGridStroke, chartTickStyle, chartTooltipStyle } from "@/lib/chart-style";

const kpiIcons = [CircleDollarSign, TrendingUp, TrendingDown, UsersRound];

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

export function CapitalFlowDashboard() {
  const isChartReady = useChartReady();

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
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
        <div className="absolute -right-24 top-16 h-px w-[36rem] -rotate-12 bg-gradient-to-r from-transparent via-primary/70 to-transparent blur-md" />

        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-primary">
              <Sparkles className="size-3.5" />
              Liquidity intelligence
            </div>
            <h1 className="text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl xl:text-6xl">
              Map capital rotation across chains, stables, and protocols.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              A professional liquidity cockpit for tracking cross-chain flow,
              protocol deposits, stablecoin allocation, and ecosystem momentum.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
            {[
              ["Bridge volume", "$742M"],
              ["Flow freshness", "90s"],
              ["Tracked chains", "19"],
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
        {capitalFlowKpis.map((kpi, index) => {
          const Icon = kpiIcons[index] ?? Activity;
          return (
            <article
              key={kpi.label}
              className="metric-card group"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
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
        className="grid gap-6 xl:grid-cols-[1.45fr_0.75fr]"
      >
        <CapitalFlowChart isReady={isChartReady} />
        <StablecoinDonut isReady={isChartReady} />
      </motion.section>

      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="grid gap-6 xl:grid-cols-[1.25fr_0.95fr]"
      >
        <EcosystemRankingTable />
        <TopProtocolsPanel />
      </motion.section>

      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <SankeyFlowVisualization />
      </motion.section>
    </motion.div>
  );
}

function CapitalFlowChart({ isReady }: { isReady: boolean }) {
  return (
    <section className="section-surface-grid">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="relative mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="section-eyebrow">
            Capital Flow Chart
          </p>
          <h2 className="text-lg font-semibold text-white">
            Multi-chain Liquidity Momentum
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Relative net flow across Base, Ethereum, Solana, Arbitrum, and Optimism
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-md border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200 sm:flex">
          <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.95)]" />
          Live mock
        </div>
      </div>

      <div className="chart-frame">
        {isReady ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <LineChart
              data={chainFlowSeries}
              margin={{ top: 12, right: 14, left: -12, bottom: 0 }}
            >
              <defs>
                <filter id="flowGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid stroke={chartGridStroke} vertical={false} />
              <XAxis
                dataKey="time"
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
              <Line type="monotone" dataKey="base" stroke="#7c8cff" strokeWidth={3} strokeLinecap="round" dot={false} filter="url(#flowGlow)" />
              <Line type="monotone" dataKey="ethereum" stroke="#38bdf8" strokeWidth={2.5} strokeLinecap="round" dot={false} />
              <Line type="monotone" dataKey="solana" stroke="#34d399" strokeWidth={2.5} strokeLinecap="round" dot={false} />
              <Line type="monotone" dataKey="arbitrum" stroke="#a855f7" strokeWidth={2.5} strokeLinecap="round" dot={false} />
              <Line type="monotone" dataKey="optimism" stroke="#f59e0b" strokeWidth={2.5} strokeLinecap="round" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ChartSkeleton />
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          ["Base", "bg-[#7c8cff]"],
          ["Ethereum", "bg-sky-300"],
          ["Solana", "bg-emerald-300"],
          ["Arbitrum", "bg-violet-400"],
          ["Optimism", "bg-amber-400"],
        ].map(([label, color]) => (
          <span
            key={label}
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300"
          >
            <span className={`size-2 rounded-full ${color}`} />
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}

function StablecoinDonut({ isReady }: { isReady: boolean }) {
  return (
    <section className="section-surface">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="section-eyebrow">
            Stablecoin Allocation Donut
          </p>
          <h2 className="text-lg font-semibold text-white">
            Stablecoin Liquidity Mix
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Allocation across primary stable assets
          </p>
        </div>
        <Coins className="size-5 text-primary" />
      </div>

      <div className="h-64">
        {isReady ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <PieChart>
              <Pie
                data={stablecoinAllocation}
                dataKey="value"
                innerRadius={72}
                outerRadius={104}
                paddingAngle={4}
                cornerRadius={6}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={1}
              >
                {stablecoinAllocation.map((item) => (
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
        {stablecoinAllocation.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-slate-300">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-white">{item.value}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function EcosystemRankingTable() {
  return (
    <section className="section-surface">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">
            Ecosystem Flow Ranking Table
          </p>
          <h2 className="text-lg font-semibold text-white">
            Ecosystems by Net Flow
          </h2>
        </div>
        <Landmark className="size-5 text-primary" />
      </div>

      <div className="space-y-3">
        {isEmpty(ecosystemRanking) ? (
          <EmptyState
            title="No ecosystem flow data"
            description="Ranking rows will appear when mock liquidity data is available."
          />
        ) : ecosystemRanking.map((item, index) => (
          <article
            key={item.chain}
            className="interactive-row group grid gap-4 lg:grid-cols-[42px_1fr_0.75fr_0.75fr_0.75fr_96px]"
          >
            <div className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.055] text-sm font-semibold text-primary">
              {index + 1}
            </div>
            <div>
              <p className="font-medium text-white">{item.chain}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.status}</p>
            </div>
            <Metric label="Net flow" value={item.netFlow} />
            <Metric label="Inflow" value={item.inflow} />
            <Metric label="Outflow" value={item.outflow} muted />
            <div>
              <p className="text-xs text-muted-foreground">Dominance</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-primary to-violet-400"
                  style={{ width: `${item.dominance * 2.6}%` }}
                />
              </div>
              <p className="mt-2 text-sm font-medium text-white">{item.dominance}%</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function TopProtocolsPanel() {
  return (
    <section className="section-surface">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">
            Top Protocols by Inflow
          </p>
          <h2 className="text-lg font-semibold text-white">
            Protocol Liquidity Winners
          </h2>
        </div>
        <DatabaseZap className="size-5 text-primary" />
      </div>

      <div className="space-y-3">
        {isEmpty(topProtocolsByInflow) ? (
          <EmptyState
            title="No protocol inflows"
            description="Protocol winners will appear when mock inflow data is available."
          />
        ) : topProtocolsByInflow.map((protocol) => (
          <article
            key={protocol.name}
            className="interactive-row-cyan group"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-white">{protocol.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {protocol.category} on {protocol.chain}
                </p>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:text-primary" />
            </div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Inflow</p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {protocol.inflow}
                </p>
              </div>
              <span className="rounded-md border border-emerald-300/20 bg-emerald-300/10 px-2 py-1 text-xs text-emerald-200">
                {protocol.velocity}
              </span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-primary to-violet-400"
                style={{ width: `${protocol.share}%` }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SankeyFlowVisualization() {
  return (
    <section className="section-surface-grid">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="relative mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">
            Sankey-style Flow Visualization
          </p>
          <h2 className="text-lg font-semibold text-white">
            Cross-chain Liquidity Routes
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Simulated capital routing between CEXs, bridges, and destination ecosystems
          </p>
        </div>
        <GitBranch className="size-5 text-primary" />
      </div>

      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/15 p-4">
        <div className="grid gap-3 text-xs text-muted-foreground sm:grid-cols-3">
          <span>Sources</span>
          <span className="hidden text-center sm:block">Routing layer</span>
          <span className="hidden text-right sm:block">Destinations</span>
        </div>

        <div className="relative mt-4 hidden h-80 sm:block">
          <svg viewBox="0 0 900 320" className="absolute inset-0 h-full w-full">
            <defs>
              <filter id="sankeyGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {sankeyFlowRoutes.map((route) => (
              <path
                key={`${route.from}-${route.to}-${route.label}`}
                d={`M 130 ${route.y1} C 310 ${route.y1}, 320 142, 450 142 S 640 ${route.y2}, 770 ${route.y2}`}
                fill="none"
                stroke={route.stroke}
                strokeLinecap="round"
                strokeOpacity="0.48"
                strokeWidth={route.width}
                filter="url(#sankeyGlow)"
              />
            ))}
          </svg>

          {sankeyNodes.map((node) => {
            const x =
              node.side === "source"
                ? "left-[2%]"
                : node.side === "middle"
                  ? "left-1/2 -translate-x-1/2"
                  : "right-[2%]";
            return (
              <div
                key={`${node.side}-${node.label}-${node.y}`}
                className={`absolute ${x} rounded-lg border border-white/10 bg-background/80 px-3 py-2 text-sm font-medium text-white shadow-xl shadow-black/25 backdrop-blur-xl`}
                style={{ top: node.y - 18 }}
              >
                {node.label}
              </div>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {isEmpty(sankeyFlowRoutes) ? (
            <div className="md:col-span-2">
              <EmptyState
                title="No flow routes"
                description="Cross-chain routes will appear when mock routing data is available."
              />
            </div>
          ) : sankeyFlowRoutes.map((route) => (
            <article
              key={route.label}
              className="interactive-row group bg-white/[0.035]"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-white">
                    {route.from}
                    {" -> "}
                    {route.to}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {route.label}
                  </p>
                </div>
                <span className="text-sm font-semibold text-primary">
                  {route.amount}
                </span>
              </div>
            </article>
          ))}
        </div>
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
      <p className={`mt-1 font-medium ${muted ? "text-slate-300" : "text-emerald-300"}`}>
        {value}
      </p>
    </div>
  );
}
