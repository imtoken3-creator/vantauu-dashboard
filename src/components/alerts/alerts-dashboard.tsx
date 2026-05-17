"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Bell,
  BellRing,
  CircleAlert,
  RadioTower,
  Radar,
  ShieldAlert,
  Siren,
  Sparkles,
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
  alertKpis,
  alertsFeed,
  alertsOverTime,
  liveActivityFeed,
  severityDistribution,
  topAlertTypes,
} from "@/data/alerts";
import { isEmpty } from "@/lib/collection";
import { chartGridStroke, chartTickStyle, chartTooltipStyle } from "@/lib/chart-style";
import { cn } from "@/lib/utils";

const kpiIcons = [Bell, Siren, ShieldAlert, AlertTriangle, CircleAlert];

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
  return <div className="chart-skeleton" />;
}

export function AlertsDashboard() {
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
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
        <div className="absolute -right-24 top-16 h-px w-[36rem] -rotate-12 bg-gradient-to-r from-transparent via-rose-300/70 to-transparent blur-md" />

        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-primary">
              <Sparkles className="size-3.5" />
              Crypto alert command center
            </div>
            <h1 className="text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl xl:text-6xl">
              Detect critical market events before they cascade.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Monitor whale movement, smart money rotations, liquidity shocks,
              security changes, and narrative shifts in one real-time alerting surface.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
            {[
              ["Rules active", "128"],
              ["Signal latency", "38s"],
              ["Coverage", "19 chains"],
            ].map(([label, value]) => (
              <div key={label} className="surface-card">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-5"
      >
        {alertKpis.map((kpi, index) => {
          const Icon = kpiIcons[index] ?? Bell;
          return (
            <article key={kpi.label} className="metric-card group">
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
                <span
                  className={cn(
                    "shrink-0 rounded-md border px-2 py-1 text-xs font-medium",
                    kpi.label.includes("Critical")
                      ? "border-rose-300/20 bg-rose-300/10 text-rose-200"
                      : "border-emerald-300/20 bg-emerald-300/10 text-emerald-200"
                  )}
                >
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
        className="grid gap-6 xl:grid-cols-[1.35fr_0.8fr]"
      >
        <AlertsOverTimeChart isReady={isChartReady} />
        <SeverityDonut isReady={isChartReady} />
      </motion.section>

      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]"
      >
        <AlertsFeedTable />
        <TopAlertTypesPanel />
      </motion.section>

      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <LiveActivityFeed />
      </motion.section>
    </motion.div>
  );
}

function AlertsOverTimeChart({ isReady }: { isReady: boolean }) {
  return (
    <section className="section-surface-grid">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="relative mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="section-eyebrow">Alerts Over Time Chart</p>
          <h2 className="text-lg font-semibold text-white">
            24H Alert Activity
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Alert activity by severity across the last 24 hours
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-md border border-rose-300/20 bg-rose-300/10 px-3 py-1 text-xs text-rose-200 sm:flex">
          <span className="size-1.5 rounded-full bg-rose-300 shadow-[0_0_12px_rgba(251,113,133,0.95)]" />
          Live mock
        </div>
      </div>

      <div className="chart-frame">
        {isReady ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <AreaChart
              data={alertsOverTime}
              margin={{ top: 12, right: 12, left: -12, bottom: 0 }}
            >
              <defs>
                <linearGradient id="criticalAlerts" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#fb7185" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#fb7185" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="highAlerts" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#7c8cff" stopOpacity={0.32} />
                  <stop offset="95%" stopColor="#7c8cff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={chartGridStroke} vertical={false} />
              <XAxis
                dataKey="hour"
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
                dataKey="critical"
                stroke="#fb7185"
                strokeWidth={2.5}
                strokeLinecap="round"
                fill="url(#criticalAlerts)"
              />
              <Area
                type="monotone"
                dataKey="high"
                stroke="#7c8cff"
                strokeWidth={2.5}
                strokeLinecap="round"
                fill="url(#highAlerts)"
              />
              <Area
                type="monotone"
                dataKey="medium"
                stroke="#38bdf8"
                strokeWidth={2.2}
                strokeLinecap="round"
                fill="transparent"
              />
              <Area
                type="monotone"
                dataKey="low"
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

function SeverityDonut({ isReady }: { isReady: boolean }) {
  return (
    <section className="section-surface">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="section-eyebrow">Alerts by Severity Donut Chart</p>
          <h2 className="text-lg font-semibold text-white">
            Severity Distribution
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Current alert load by severity class
          </p>
        </div>
        <Radar className="size-5 text-primary" />
      </div>

      <div className="h-64">
        {isReady ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <PieChart>
              <Pie
                data={severityDistribution}
                dataKey="value"
                innerRadius={72}
                outerRadius={104}
                paddingAngle={4}
                cornerRadius={6}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={1}
              >
                {severityDistribution.map((item) => (
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
        {severityDistribution.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-slate-300">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AlertsFeedTable() {
  return (
    <section className="section-surface">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">Alerts Feed Table</p>
          <h2 className="text-lg font-semibold text-white">
            Intelligence Alerts
          </h2>
        </div>
        <BellRing className="size-5 text-primary" />
      </div>

      <div className="space-y-3">
        {isEmpty(alertsFeed) ? (
          <EmptyState
            title="No alerts"
            description="Alert rows will appear when mock monitoring data is available."
          />
        ) : alertsFeed.map((alert) => (
          <article
            key={`${alert.time}-${alert.alert}`}
            className="interactive-row group grid gap-4 lg:grid-cols-[80px_0.85fr_1.7fr_0.65fr_0.65fr]"
          >
            <Metric label="Time" value={alert.time} muted />
            <Metric label="Type" value={alert.type} />
            <div>
              <p className="text-xs text-muted-foreground">Alert</p>
              <p className="mt-1 text-sm font-medium text-white">
                {alert.alert}
              </p>
            </div>
            <Metric label="Chain" value={alert.chain} muted />
            <SeverityBadge severity={alert.severity} />
          </article>
        ))}
      </div>
    </section>
  );
}

function TopAlertTypesPanel() {
  return (
    <section className="section-surface">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">Top Alert Types Panel</p>
          <h2 className="text-lg font-semibold text-white">
            Alert Type Concentration
          </h2>
        </div>
        <RadioTower className="size-5 text-primary" />
      </div>

      <div className="space-y-3">
        {isEmpty(topAlertTypes) ? (
          <EmptyState
            title="No alert types"
            description="Alert type concentration will appear when mock alert data is available."
          />
        ) : topAlertTypes.map((item) => (
          <article key={item.type} className="interactive-row-cyan group">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-white">{item.type}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.impact}
                </p>
              </div>
              <span className="text-sm font-semibold text-primary">
                {item.count}
              </span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-primary to-violet-400"
                style={{ width: `${item.share}%` }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function LiveActivityFeed() {
  return (
    <section className="section-surface">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">Live Activity Feed</p>
          <h2 className="text-lg font-semibold text-white">
            Real-time Alert Stream
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Simulated real-time activity from wallet, chain, and social monitors
          </p>
        </div>
        <Activity className="size-5 text-primary" />
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {isEmpty(liveActivityFeed) ? (
          <div className="md:col-span-2 xl:col-span-4">
            <EmptyState
              title="No live activity"
              description="Real-time alert events will appear when mock stream data is available."
            />
          </div>
        ) : liveActivityFeed.map((event) => (
          <article key={event.title} className="interactive-row group">
            <div className="flex items-start justify-between gap-3">
              <div>
                <SeverityBadge severity={event.severity} compact />
                <p className="mt-3 font-medium text-white">{event.title}</p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {event.meta}
                </p>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:text-primary" />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 text-xs">
              <span className="text-primary">{event.chain}</span>
              <span className="text-muted-foreground">{event.time}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SeverityBadge({
  severity,
  compact,
}: {
  severity: string;
  compact?: boolean;
}) {
  return (
    <div>
      {!compact && <p className="text-xs text-muted-foreground">Severity</p>}
      <span
        className={cn(
          "mt-1 inline-flex rounded-md border px-2 py-1 text-xs font-medium",
          severity === "Critical" &&
            "border-rose-300/25 bg-rose-300/10 text-rose-200",
          severity === "High" &&
            "border-amber-300/25 bg-amber-300/10 text-amber-200",
          severity === "Medium" &&
            "border-primary/25 bg-primary/10 text-primary",
          severity === "Low" &&
            "border-cyan-300/25 bg-cyan-300/10 text-cyan-200"
        )}
      >
        {severity}
      </span>
    </div>
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
      <p className={`mt-1 text-sm font-medium ${muted ? "text-slate-300" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}
