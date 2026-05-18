"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BrainCircuit,
  Crosshair,
  DatabaseZap,
  Network,
  Play,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { heroEvents, heroMetrics } from "@/data/mock";

const graphNodes = [
  "left-[12%] top-[18%]",
  "left-[42%] top-[12%]",
  "left-[74%] top-[24%]",
  "left-[24%] top-[54%]",
  "left-[58%] top-[48%]",
  "left-[82%] top-[68%]",
  "left-[38%] top-[78%]",
];

export function DashboardHero() {
  return (
    <section className="hero-surface xl:min-h-[540px]">
      <div className="absolute inset-0 cyber-grid animated-grid opacity-45" />
      <div className="cinematic-gradient absolute inset-0 opacity-35" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.5, 0.9, 0.5], x: [0, 16, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 top-12 h-px w-[34rem] -rotate-12 bg-gradient-to-r from-transparent via-primary/70 to-transparent blur-md"
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.45, 0.72, 0.45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/4 h-40 w-3/4 bg-gradient-to-r from-transparent via-cyan-400/10 to-violet-500/10 blur-2xl"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04),transparent_18%,transparent_82%,rgba(255,255,255,0.035))]" />

      <div className="relative grid gap-10 xl:grid-cols-[1.02fr_0.98fr] xl:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="flex flex-col justify-between"
        >
          <div>
            <div className="live-shimmer mb-6 inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-primary shadow-lg shadow-primary/10">
              <Sparkles className="size-3.5" />
              AI native crypto command layer
            </div>
            <h2 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl xl:text-7xl">
              Detect capital intent before markets move.
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Vantauu fuses entity resolution, smart wallet behavior, liquidity
              routing, and narrative velocity into one high-signal intelligence
              cockpit.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/smart-money"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-primary/40 bg-[linear-gradient(135deg,rgba(124,140,255,0.95),rgba(168,85,247,0.9))] px-5 text-sm font-medium text-white shadow-2xl shadow-primary/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-primary/40"
              >
                <Zap className="size-4" />
                Analyze Smart Money
                <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/alerts"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/[0.055] px-5 text-sm font-medium text-white shadow-xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-white/[0.085]"
              >
                <Play className="size-4 text-cyan-200" />
                View Live Signals
              </Link>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-3">
            {heroMetrics.map((metric) => (
              <div
                key={metric.label}
                className="surface-card group relative overflow-hidden p-3 sm:p-4"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition group-hover:opacity-100" />
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <p className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs text-primary">{metric.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.65, ease: "easeOut" }}
          className="hidden gap-4 lg:grid lg:grid-cols-[1fr_0.86fr] xl:grid-cols-1 2xl:grid-cols-[1fr_0.86fr]"
        >
          <div className="glow-border relative min-h-80 overflow-hidden rounded-lg border border-white/10 bg-black/25 p-4 shadow-2xl shadow-primary/10">
            <div className="scan-line" />
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-md border border-cyan-300/30 bg-cyan-300/10 p-2 text-cyan-200">
                  <Network className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Entity Graph</p>
                  <p className="text-xs text-muted-foreground">
                    Cross-chain identity map
                  </p>
                </div>
              </div>
              <span className="live-shimmer inline-flex items-center gap-2 rounded-md border border-emerald-300/20 bg-emerald-300/10 px-2 py-1 text-xs text-emerald-200">
                <span className="ai-signal-pulse" />
                Live
              </span>
            </div>

            <div className="relative h-56 overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.22),transparent_58%)]">
              <div className="absolute inset-0 animated-grid bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px]" />
              <div className="absolute inset-6 rounded-full border border-primary/20" />
              <div className="absolute inset-14 rounded-full border border-cyan-300/15" />
              <div className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-primary/40 bg-primary/20 p-4 text-primary shadow-2xl shadow-primary/30">
                <BrainCircuit className="size-8" />
              </div>
              <div className="absolute left-[18%] right-[18%] top-1/2 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              <div className="absolute bottom-[22%] left-[30%] right-[10%] h-px rotate-12 bg-gradient-to-r from-cyan-300/0 via-cyan-300/50 to-transparent" />
              <div className="absolute left-[22%] top-[22%] h-[58%] w-px rotate-[-24deg] bg-gradient-to-b from-transparent via-violet-300/45 to-transparent" />
              {graphNodes.map((position, index) => (
                <span
                  key={position}
                  className={`absolute ${position} size-3 rounded-full border border-white/40 bg-white shadow-[0_0_24px_rgba(124,140,255,0.75)]`}
                  style={{ opacity: 0.65 + index * 0.04 }}
                />
              ))}
            </div>
          </div>

          <div className="glow-border rounded-lg border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">AI Runbook</p>
                <p className="text-xs text-muted-foreground">
                  Ranked next actions
                </p>
              </div>
              <DatabaseZap className="size-5 text-primary" />
            </div>
            <div className="space-y-3">
              {heroEvents.map((event) => (
                <div
                  key={event.label}
                  className="group rounded-lg border border-white/10 bg-black/20 p-3 transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {event.label}
                      </p>
                      <p className="mt-1 text-sm font-medium text-white">
                        {event.value}
                      </p>
                    </div>
                    <span className="rounded-md border border-primary/25 bg-primary/10 px-2 py-1 text-xs text-primary">
                      {event.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative mt-6 hidden gap-3 border-t border-white/10 pt-5 sm:grid sm:grid-cols-3">
        {[
          { icon: ShieldCheck, label: "Risk-normalized signals" },
          { icon: Crosshair, label: "Wallet intent scoring" },
          { icon: RadioTower, label: "Narrative pulse tracking" },
        ].map((item) => (
          <div
            key={item.label}
            className="group flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-white/[0.07]"
          >
            <div className="flex items-center gap-3">
              <item.icon className="size-4 text-primary" />
              <span className="text-sm text-slate-200">{item.label}</span>
            </div>
            <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:text-primary" />
          </div>
        ))}
      </div>
    </section>
  );
}
