"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  BrainCircuit,
  CircleDollarSign,
  Flame,
  Layers3,
  LineChart,
  Network,
  RadioTower,
  ScanLine,
  Sparkles,
  WalletCards,
  Waves,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useLiveIntelligence } from "@/hooks/use-live-intelligence";
import {
  generateIntelligenceLayer,
  type AIDailyBriefing,
  type AIIntelligenceLayer,
  type AISignal,
  type IntelligenceCard,
} from "@/lib/ai-intelligence-layer";
import { chartGridStroke, chartTickStyle, chartTooltipStyle } from "@/lib/chart-style";
import {
  formatNumber,
  formatPercent,
  formatUsd,
  shortAddress,
  type LiveIntelligenceData,
} from "@/lib/live-intelligence";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const metricIcons = [
  CircleDollarSign,
  CircleDollarSign,
  Layers3,
  BrainCircuit,
  RadioTower,
];

const heatColors = [
  "rgba(124,140,255,",
  "rgba(56,189,248,",
  "rgba(52,211,153,",
  "rgba(168,85,247,",
  "rgba(245,158,11,",
];

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

function findAsset(data: LiveIntelligenceData, id: "bitcoin" | "ethereum") {
  return data.market.assets.find((asset) => asset.id === id);
}

function numeric(value: number | null | undefined, fallback = 0) {
  return value == null || !Number.isFinite(value) ? fallback : value;
}

function formatDominance(value: number | null | undefined) {
  return value == null || !Number.isFinite(value) ? "Loading" : `${value.toFixed(1)}%`;
}

function formatTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime()) || date.getFullYear() <= 1970) {
    return "Syncing";
  }

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function signalTone(level: string) {
  if (["Critical", "Risk", "Risk-off"].includes(level)) {
    return "border-rose-300/25 bg-rose-300/10 text-rose-200";
  }

  if (["Bullish", "Constructive", "Risk-on"].includes(level)) {
    return "border-emerald-300/25 bg-emerald-300/10 text-emerald-200";
  }

  if (["Narrative", "AI", "Breakout"].includes(level)) {
    return "border-violet-300/25 bg-violet-300/10 text-violet-200";
  }

  if (["Whale", "Live"].includes(level)) {
    return "border-cyan-300/25 bg-cyan-300/10 text-cyan-200";
  }

  return "border-cyan-300/25 bg-cyan-300/10 text-cyan-200";
}

function cardTone(tone: IntelligenceCard["tone"]) {
  const tones = {
    cyan: "border-cyan-300/25 bg-cyan-300/10 text-cyan-100 shadow-cyan-300/10",
    emerald:
      "border-emerald-300/25 bg-emerald-300/10 text-emerald-100 shadow-emerald-300/10",
    violet:
      "border-violet-300/25 bg-violet-300/10 text-violet-100 shadow-violet-300/10",
    amber: "border-amber-300/25 bg-amber-300/10 text-amber-100 shadow-amber-300/10",
    rose: "border-rose-300/25 bg-rose-300/10 text-rose-100 shadow-rose-300/10",
  };

  return tones[tone] ?? tones.cyan;
}

function buildMarketOverview(data: LiveIntelligenceData, isLoading: boolean) {
  const btc = findAsset(data, "bitcoin");
  const eth = findAsset(data, "ethereum");

  if (isLoading) {
    return [
      ["BTC", "Loading", "Sync", "CoinGecko price feed"],
      ["ETH", "Loading", "Sync", "CoinGecko price feed"],
      ["Market Cap", "Loading", "Sync", "Global crypto market cap"],
      ["Fear & Greed", "Loading", "Sync", "Source: Alternative.me"],
      ["Dominance", "Loading", "Sync", "BTC / ETH market share"],
    ];
  }

  return [
    ["BTC", formatUsd(btc?.priceUsd), formatPercent(btc?.change24h), "Bitcoin spot and 24h momentum"],
    ["ETH", formatUsd(eth?.priceUsd), formatPercent(eth?.change24h), "Ethereum spot and 24h momentum"],
    ["Market Cap", formatUsd(data.market.totalMarketCapUsd), "Global", "Total market cap from CoinGecko"],
    [
      "Fear & Greed",
      data.market.fearGreed.value == null ? "Loading" : String(data.market.fearGreed.value),
      data.market.fearGreed.classification ?? "Live",
      "Source: Alternative.me",
    ],
    [
      "Dominance",
      formatDominance(data.market.dominance.btc),
      `ETH ${formatDominance(data.market.dominance.eth)}`,
      "BTC dominance with ETH context",
    ],
  ];
}

function buildPulseSeries(data: LiveIntelligenceData) {
  const btc = findAsset(data, "bitcoin");
  const eth = findAsset(data, "ethereum");
  const btcMove = numeric(btc?.change24h);
  const ethMove = numeric(eth?.change24h);
  const stableMove = numeric(data.defi.stablecoinChange7d);
  const points = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "Now"];

  return points.map((time, index) => ({
    time,
    btc: Math.round(54 + index * 4 + btcMove * 2 + Math.sin(index) * 6),
    eth: Math.round(48 + index * 4.5 + ethMove * 2.2 + Math.cos(index) * 5),
    liquidity: Math.round(42 + index * 5 + stableMove * 8 + Math.sin(index / 2) * 7),
  }));
}

function buildHeatmap(data: LiveIntelligenceData) {
  const maxTvl = Math.max(...data.defi.chains.map((chain) => chain.tvlUsd), 1);
  const maxStable = Math.max(...data.defi.stablecoins.map((coin) => coin.marketCapUsd), 1);
  const chains = data.defi.chains.slice(0, 6).map((chain) => ({
    name: chain.name,
    value: Math.round((chain.tvlUsd / maxTvl) * 100),
    meta: formatUsd(chain.tvlUsd),
  }));
  const stablecoins = data.defi.stablecoins.slice(0, 4).map((coin) => ({
    name: coin.symbol,
    value: Math.round((coin.marketCapUsd / maxStable) * 100),
    meta: formatUsd(coin.marketCapUsd),
  }));
  const sectors = [
    {
      name: "AI",
      value: 88,
      meta: data.market.trending.find((item) => /ai|agent|serv|venice/i.test(item.name))?.symbol ?? "Signals",
    },
    {
      name: "Meme",
      value: data.market.trending.some((item) => /meme|pudgy|pengu|dolphin/i.test(item.name)) ? 76 : 52,
      meta: "Attention",
    },
    {
      name: "DeFi",
      value: Math.max(42, Math.min(94, Math.round(68 + numeric(data.defi.stablecoinChange7d) * 12))),
      meta: "Liquidity",
    },
    {
      name: "L2",
      value: data.defi.chains.some((chain) => ["Base", "Arbitrum", "Optimism"].includes(chain.name)) ? 72 : 48,
      meta: "Rotation",
    },
  ];

  return [
    { label: "Chains", rows: chains },
    { label: "Stablecoins", rows: stablecoins },
    { label: "Sectors", rows: sectors },
  ];
}

function buildNarratives(data: LiveIntelligenceData, isLoading: boolean) {
  if (isLoading) {
    return [
      ["Trending narratives", "Loading", "CoinGecko", 74],
      ["AI coins", "Loading", "Search momentum", 70],
      ["Meme rotation", "Loading", "Retail attention", 66],
      ["DeFi momentum", "Loading", "Liquidity pulse", 68],
    ];
  }

  const topTrend = data.market.trending[0];
  const aiTrend =
    data.market.trending.find((item) => /ai|agent|serv|venice|open/i.test(item.name)) ??
    topTrend;
  const memeTrend =
    data.market.trending.find((item) => /meme|pudgy|pengu|dolphin/i.test(item.name)) ??
    data.market.trending[1];
  const topChain = data.defi.chains[0];

  return [
    [
      "Trending narratives",
      topTrend?.symbol || "AI",
      topTrend?.name || "CoinGecko trending",
      92,
    ],
    [
      "AI coins",
      aiTrend?.symbol || "AI",
      aiTrend?.name || "AI search cluster",
      86,
    ],
    [
      "Meme rotation",
      memeTrend?.symbol || "MEME",
      memeTrend?.name || "Retail attention cluster",
      memeTrend ? 76 : 58,
    ],
    [
      "DeFi momentum",
      topChain?.name || "DeFi",
      `${formatUsd(topChain?.tvlUsd)} TVL`,
      Math.max(58, Math.min(88, Math.round(66 + numeric(data.defi.stablecoinChange7d) * 20))),
    ],
  ];
}

function buildWalletLeaderboard(data: LiveIntelligenceData) {
  const transferRows = data.wallet.tokenTransfers.slice(0, 4).map((transfer, index) => ({
    rank: index + 1,
    entity: `${transfer.tokenSymbol} flow wallet`,
    wallet: shortAddress(transfer.from),
    flow: `${formatNumber(transfer.value)} ${transfer.tokenSymbol}`,
    score: Math.max(72, 94 - index * 6),
  }));
  const txRows = data.wallet.transactions.slice(0, 4).map((tx, index) => ({
    rank: index + 1,
    entity: "ETH whale wallet",
    wallet: shortAddress(tx.from),
    flow: `${tx.valueEth.toFixed(3)} ETH`,
    score: Math.max(68, 90 - index * 5),
  }));

  const rows = transferRows.length > 0 ? transferRows : txRows;

  return rows.length > 0
    ? rows
    : [
        { rank: 1, entity: "Smart wallet feed", wallet: "Add API key", flow: "Etherscan", score: 64 },
        { rank: 2, entity: "Stable deployer cluster", wallet: "Live DeFi", flow: formatUsd(data.defi.stablecoinTotalUsd), score: 78 },
        { rank: 3, entity: "Narrative scout", wallet: data.market.trending[0]?.symbol || "Trend", flow: "CoinGecko", score: 74 },
      ];
}

function buildClusters(data: LiveIntelligenceData) {
  const topChain = data.defi.chains[0];
  const topStable = data.defi.stablecoins[0];
  const topTrend = data.market.trending[0];

  return [
    ["Stablecoin deployers", topStable?.symbol || "USDC", formatUsd(topStable?.marketCapUsd), 86],
    ["L2 liquidity desks", topChain?.name || "Base", formatUsd(topChain?.tvlUsd), 82],
    ["Narrative chasers", topTrend?.symbol || "AI", topTrend?.name || "Trending", 78],
  ];
}

export function CommandCenter() {
  const { data, isLoading, error } = useLiveIntelligence();
  const isChartReady = useChartReady();
  const aiLayer = useMemo(
    () => generateIntelligenceLayer(data, { isLoading, error }),
    [data, error, isLoading]
  );
  const marketOverview = useMemo(
    () => buildMarketOverview(data, isLoading),
    [data, isLoading]
  );
  const pulseSeries = useMemo(() => buildPulseSeries(data), [data]);
  const heatmap = useMemo(() => buildHeatmap(data), [data]);
  const narratives = useMemo(() => buildNarratives(data, isLoading), [data, isLoading]);
  const leaderboard = useMemo(() => buildWalletLeaderboard(data), [data]);
  const clusters = useMemo(() => buildClusters(data), [data]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.08 }}
      className="page-stack"
    >
      <CommandHero
        data={data}
        isLoading={isLoading}
        error={error}
        sentiment={aiLayer.sentiment}
      />

      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-5"
      >
        {marketOverview.map(([label, value, delta, caption], index) => {
          const Icon = metricIcons[index] ?? Activity;
          return (
            <article key={label} className="metric-card group min-h-[172px]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
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
              <div className="mt-5 flex items-end justify-between gap-3">
                <p className="text-xs leading-5 text-muted-foreground">{caption}</p>
                <span className={`shrink-0 rounded-md border px-2 py-1 text-xs font-medium ${signalTone(delta)}`}>
                  {delta}
                </span>
              </div>
            </article>
          );
        })}
      </motion.section>

      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]"
      >
        <MarketSentimentSystem sentiment={aiLayer.sentiment} />
        <IntelligenceCards cards={aiLayer.cards} />
      </motion.section>

      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]"
      >
        <MarketPulseChart
          isReady={isChartReady}
          data={pulseSeries}
          explanation={aiLayer.explanations.marketPulse}
        />
        <AIDailyBriefingPanel briefing={aiLayer.dailyBriefing} updatedAt={data.updatedAt} />
      </motion.section>

      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]"
      >
        <AISignalEngine
          signals={aiLayer.signals}
          explanation={aiLayer.explanations.signalEngine}
        />
        <CapitalFlowHeatmap
          heatmap={heatmap}
          explanation={aiLayer.explanations.capitalFlow}
        />
      </motion.section>

      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]"
      >
        <NarrativeIntelligence
          narratives={narratives}
          explanation={aiLayer.explanations.narratives}
        />
        <WalletIntelligence
          leaderboard={leaderboard}
          clusters={clusters}
          isReady={isChartReady}
          explanation={aiLayer.explanations.wallet}
        />
      </motion.section>
    </motion.div>
  );
}

function CommandHero({
  data,
  isLoading,
  error,
  sentiment,
}: {
  data: LiveIntelligenceData;
  isLoading: boolean;
  error: string | null;
  sentiment: AIIntelligenceLayer["sentiment"];
}) {
  const topChain = data.defi.chains[0];
  const topTrend = data.market.trending[0];
  const status = isLoading ? "Synchronizing" : error ? "Partial live" : "Live command center";
  const heroMeta = [
    { label: "Mode", value: status, pulse: true },
    { label: "Updated", value: formatTime(data.updatedAt), timestamp: true },
    { label: "Providers", value: "CoinGecko / DefiLlama / Etherscan" },
  ];

  return (
    <motion.section
      variants={fadeUp}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="hero-surface min-h-[390px]"
    >
      <div className="absolute inset-0 cyber-grid animated-grid opacity-35" />
      <div className="cinematic-gradient absolute inset-0 opacity-35" />
      <div className="scan-line" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="absolute -right-24 top-20 h-px w-[46rem] -rotate-12 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent blur-md" />

      <div className="relative grid gap-10 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
        <div className="max-w-4xl">
          <div className="live-shimmer mb-6 inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-primary">
            <Sparkles className="size-3.5" />
            AI On-chain Command Center
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.03] tracking-tight text-white sm:text-5xl xl:text-6xl">
            Institutional intelligence for market intent, liquidity, and wallet behavior.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            A Bloomberg-style operating surface that fuses CoinGecko market data,
            DefiLlama liquidity, Etherscan wallet flows, and AI-ranked signals
            into one live decision layer.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {heroMeta.map((item) => (
              <span
                key={item.label}
                className={`rounded-md border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs text-slate-300 backdrop-blur-xl ${
                  item.pulse ? "live-shimmer inline-flex items-center gap-2" : ""
                } ${item.timestamp ? "timestamp-motion" : ""}`}
              >
                {item.pulse && <span className="ai-signal-pulse" />}
                <span className="text-primary">{item.label}</span>
                {" / "}
                {item.value}
              </span>
            ))}
          </div>
        </div>

        <div className="relative grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          {[
            ["Liquidity Anchor", topChain?.name ?? "Syncing", formatUsd(topChain?.tvlUsd), Layers3],
            ["Narrative Leader", topTrend?.symbol || "Trend", topTrend?.name || "CoinGecko scanner", Flame],
            [
              "Sentiment Regime",
              sentiment.regime,
              `${sentiment.score}/100 / ${sentiment.confidence}% confidence`,
              ScanLine,
            ],
          ].map(([label, title, meta, Icon]) => {
            const PanelIcon = Icon as typeof Layers3;
            return (
              <motion.article
                key={String(label)}
                whileHover={{ x: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="surface-card group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {String(label)}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {String(title)}
                    </p>
                    <p className="mt-1 text-xs text-primary">{String(meta)}</p>
                  </div>
                  <div className="icon-tile">
                    <PanelIcon className="size-4" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

function MarketSentimentSystem({
  sentiment,
}: {
  sentiment: AIIntelligenceLayer["sentiment"];
}) {
  return (
    <section className="section-surface-grid">
      <div className="absolute inset-0 cyber-grid opacity-15" />
      <div className="relative mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">Market Sentiment System</p>
          <h2 className="text-lg font-semibold text-white">
            {sentiment.regime} regime detected
          </h2>
        </div>
        <ScanLine className="size-5 text-primary" />
      </div>

      <div className="relative grid gap-5 sm:grid-cols-[150px_1fr] sm:items-center">
        <div
          className="grid aspect-square place-items-center rounded-full border border-white/10 shadow-2xl shadow-primary/10"
          style={{
            background: `conic-gradient(from 180deg, rgba(124,140,255,0.95) ${sentiment.score * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
          }}
        >
          <div className="grid size-[74%] place-items-center rounded-full border border-white/10 bg-background/90 text-center backdrop-blur-xl">
            <span className="text-3xl font-semibold text-white">
              {sentiment.score}
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-primary">
              AI score
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm leading-6 text-slate-300">{sentiment.label}</p>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            {sentiment.description}
          </p>
          <div className="mt-4 grid gap-2">
            {sentiment.drivers.map((driver) => (
              <div
                key={driver.label}
                className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/15 px-3 py-2"
              >
                <span className="text-xs text-muted-foreground">{driver.label}</span>
                <span
                  className={`rounded-md border px-2 py-1 text-xs ${
                    driver.impact === "positive"
                      ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-200"
                      : driver.impact === "negative"
                        ? "border-rose-300/20 bg-rose-300/10 text-rose-200"
                        : "border-cyan-300/20 bg-cyan-300/10 text-cyan-200"
                  }`}
                >
                  {driver.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function IntelligenceCards({ cards }: { cards: IntelligenceCard[] }) {
  return (
    <section className="section-surface-grid">
      <div className="absolute inset-0 cyber-grid opacity-15" />
      <div className="relative mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">Intelligence Cards</p>
          <h2 className="text-lg font-semibold text-white">
            AI-generated institutional reads
          </h2>
        </div>
        <Sparkles className="size-5 text-primary" />
      </div>

      <div className="relative grid gap-3 lg:grid-cols-2">
        {cards.map((card, index) => (
          <motion.article
            key={card.title}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`group relative rounded-lg border p-4 shadow-xl backdrop-blur-xl ${cardTone(card.tone)}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] opacity-75">
                  {card.status}
                </p>
                <h3 className="mt-2 font-semibold text-white">{card.title}</h3>
              </div>
              <span className="rounded-md border border-white/10 bg-black/20 px-2 py-1 font-mono text-xs text-white">
                {card.confidence}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              {card.description}
            </p>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3 text-xs">
              <span className="text-muted-foreground">Signal metric</span>
              <span className="font-medium text-white">{card.metric}</span>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-300/85">
              {card.whatThisMeans}
            </p>
            <span
              className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition group-hover:opacity-100"
              style={{ transitionDelay: `${index * 35}ms` }}
            />
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function MarketPulseChart({
  isReady,
  data,
  explanation,
}: {
  isReady: boolean;
  data: { time: string; btc: number; eth: number; liquidity: number }[];
  explanation: string;
}) {
  return (
    <section className="section-surface-grid">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="relative mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="section-eyebrow">Global Market Pulse</p>
          <h2 className="text-lg font-semibold text-white">
            BTC, ETH, and liquidity pressure
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Animated command chart derived from current live market snapshots.
          </p>
        </div>
        <LineChart className="size-5 text-primary" />
      </div>

      <div className="chart-frame">
        {isReady ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <AreaChart data={data} margin={{ top: 12, right: 14, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="btcCommand" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#7c8cff" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#7c8cff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="liqCommand" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={chartGridStroke} vertical={false} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={chartTickStyle} />
              <YAxis axisLine={false} tickLine={false} tick={chartTickStyle} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Area type="monotone" dataKey="btc" stroke="#7c8cff" strokeWidth={3} fill="url(#btcCommand)" />
              <Area type="monotone" dataKey="eth" stroke="#38bdf8" strokeWidth={2.4} fill="transparent" />
              <Area type="monotone" dataKey="liquidity" stroke="#34d399" strokeWidth={2.4} fill="url(#liqCommand)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ChartSkeleton />
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          ["BTC", "bg-[#7c8cff]"],
          ["ETH", "bg-sky-300"],
          ["Liquidity", "bg-emerald-300"],
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
      <WhatThisMeans>{explanation}</WhatThisMeans>
    </section>
  );
}

function AIDailyBriefingPanel({
  briefing,
  updatedAt,
}: {
  briefing: AIDailyBriefing;
  updatedAt: string;
}) {
  return (
    <section className="section-surface-grid">
      <div className="absolute inset-0 cyber-grid opacity-15" />
      <div className="relative mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">AI Daily Briefing</p>
          <h2 className="text-lg font-semibold text-white">{briefing.title}</h2>
        </div>
        <BrainCircuit className="size-5 text-primary" />
      </div>

      <div className="relative rounded-lg border border-primary/20 bg-primary/10 p-4 shadow-xl shadow-primary/10">
        <p className="text-sm leading-6 text-slate-200">{briefing.body}</p>
      </div>

      <div className="relative mt-4 grid gap-2">
        {briefing.sections.map((section) => (
          <div
            key={section.label}
            className="rounded-lg border border-white/10 bg-black/15 p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {section.label}
              </span>
              <span className="text-xs font-medium text-primary">{section.value}</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-300">
              {section.summary}
            </p>
          </div>
        ))}
      </div>

      <div className="relative mt-4 space-y-3">
        {briefing.bullets.map((item, index) => (
          <div
            key={item}
            className="flex gap-3 rounded-lg border border-white/10 bg-black/15 p-3"
          >
            <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-md border border-cyan-300/20 bg-cyan-300/10 text-[10px] font-semibold text-cyan-100">
              {index + 1}
            </span>
            <p className="text-xs leading-5 text-muted-foreground">{item}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-muted-foreground">
        <span>Generated from live intelligence routes</span>
        <span>{formatTime(updatedAt)}</span>
      </div>
    </section>
  );
}

function AISignalEngine({
  signals,
  explanation,
}: {
  signals: AISignal[];
  explanation: string;
}) {
  return (
    <section className="section-surface">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">AI Signal Engine</p>
          <h2 className="text-lg font-semibold text-white">
            Bullish, risk, narrative, and whale signals
          </h2>
        </div>
        <Zap className="size-5 text-primary" />
      </div>

      <div className="space-y-3">
        {signals.map((signal, index) => (
          <motion.article
            key={signal.type}
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{
              delay: index * 0.2,
              duration: 3.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="interactive-row-cyan group"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-primary">
                  {signal.type}
                </p>
                <p className="mt-2 font-medium text-white">{signal.title}</p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {signal.source}
                </p>
              </div>
              <span className={`rounded-md border px-2 py-1 text-xs font-medium ${signalTone(signal.level)}`}>
                {signal.level}
              </span>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-300">
              {signal.rationale}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="live-data-bar h-full rounded-full bg-gradient-to-r from-cyan-300 via-primary to-violet-400"
                  style={{ width: `${signal.score}%` }}
                />
              </div>
              <span className="text-xs font-medium text-slate-300">
                {signal.score}
              </span>
            </div>
            <div className="mt-3 rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-xs leading-5 text-muted-foreground">
              {signal.whatThisMeans}
            </div>
          </motion.article>
        ))}
      </div>
      <WhatThisMeans>{explanation}</WhatThisMeans>
    </section>
  );
}

function CapitalFlowHeatmap({
  heatmap,
  explanation,
}: {
  heatmap: { label: string; rows: { name: string; value: number; meta: string }[] }[];
  explanation: string;
}) {
  return (
    <section className="section-surface-grid">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="relative mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">Capital Flow Heatmap</p>
          <h2 className="text-lg font-semibold text-white">
            Chains, stablecoins, and sectors
          </h2>
        </div>
        <Waves className="size-5 text-primary" />
      </div>

      <div className="relative grid gap-4 lg:grid-cols-3">
        {heatmap.map((group, groupIndex) => (
          <div key={group.label} className="rounded-lg border border-white/10 bg-black/15 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-white">{group.label}</p>
              <span className="text-xs text-muted-foreground">Intensity</span>
            </div>
            <div className="grid gap-2">
              {group.rows.map((row, rowIndex) => {
                const value = Math.max(8, Math.min(100, row.value));
                const color = heatColors[(groupIndex + rowIndex) % heatColors.length];
                return (
                  <div
                    key={`${group.label}-${row.name}`}
                    className="group rounded-lg border border-white/10 p-3 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25"
                    style={{
                      background: `linear-gradient(135deg, ${color}${0.08 + value / 260}), rgba(255,255,255,0.025))`,
                      boxShadow: `0 0 ${Math.round(value / 3)}px rgba(124,140,255,${value / 480})`,
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="truncate text-sm font-medium text-white">
                        {row.name}
                      </span>
                      <span className="font-mono text-xs text-slate-300">{row.meta}</span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="live-data-bar h-full rounded-full bg-gradient-to-r from-cyan-300 via-primary to-violet-400"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <WhatThisMeans>{explanation}</WhatThisMeans>
    </section>
  );
}

function NarrativeIntelligence({
  narratives,
  explanation,
}: {
  narratives: (string | number)[][];
  explanation: string;
}) {
  return (
    <section className="section-surface-grid">
      <div className="absolute inset-0 cyber-grid opacity-15" />
      <div className="relative mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">Narrative Intelligence</p>
          <h2 className="text-lg font-semibold text-white">
            Themes moving market attention
          </h2>
        </div>
        <Flame className="size-5 text-primary" />
      </div>

      <div className="relative grid gap-3">
        {narratives.map(([label, value, meta, score]) => (
          <article key={String(label)} className="interactive-row group">
            <div className="grid gap-4 sm:grid-cols-[1fr_90px] sm:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {String(label)}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {String(value)}
                </p>
                <p className="mt-1 text-xs text-primary">{String(meta)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Momentum</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="live-data-bar h-full rounded-full bg-gradient-to-r from-cyan-300 via-primary to-violet-400"
                    style={{ width: `${score}%` }}
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-white">{String(score)}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <WhatThisMeans>{explanation}</WhatThisMeans>
    </section>
  );
}

function WalletIntelligence({
  leaderboard,
  clusters,
  isReady,
  explanation,
}: {
  leaderboard: { rank: number; entity: string; wallet: string; flow: string; score: number }[];
  clusters: (string | number)[][];
  isReady: boolean;
  explanation: string;
}) {
  const clusterBars = clusters.map(([name, label, meta, score]) => ({
    name: String(name),
    label: String(label),
    meta: String(meta),
    score: Number(score),
  }));

  return (
    <section className="section-surface-grid">
      <div className="absolute inset-0 cyber-grid opacity-15" />
      <div className="relative mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">Wallet Intelligence</p>
          <h2 className="text-lg font-semibold text-white">
            Smart wallets, clusters, and whale actions
          </h2>
        </div>
        <WalletCards className="size-5 text-primary" />
      </div>

      <div className="relative grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3">
          {leaderboard.map((wallet) => (
            <article
              key={`${wallet.rank}-${wallet.entity}`}
              className="interactive-row-cyan grid gap-4 sm:grid-cols-[42px_1fr_90px]"
            >
              <div className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.055] text-sm font-semibold text-primary">
                {wallet.rank}
              </div>
              <div>
                <p className="font-medium text-white">{wallet.entity}</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {wallet.wallet}
                </p>
                <p className="mt-2 text-xs text-emerald-300">{wallet.flow}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Score</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="live-data-bar h-full rounded-full bg-gradient-to-r from-cyan-300 via-primary to-violet-400"
                    style={{ width: `${wallet.score}%` }}
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-white">{wallet.score}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-lg border border-white/10 bg-black/15 p-4">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-white">Wallet clusters</p>
              <p className="mt-1 text-xs text-muted-foreground">
                AI grouped by flow, asset focus, and behavior
              </p>
            </div>
            <Network className="size-4 text-primary" />
          </div>
          <div className="h-60">
            {isReady ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <BarChart data={clusterBars} layout="vertical" margin={{ top: 4, right: 8, left: 6, bottom: 4 }}>
                  <CartesianGrid stroke={chartGridStroke} horizontal={false} />
                  <XAxis type="number" hide domain={[0, 100]} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={chartTickStyle}
                    width={128}
                  />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                    {clusterBars.map((item, index) => (
                      <Cell key={item.name} fill={["#7c8cff", "#38bdf8", "#34d399"][index] ?? "#7c8cff"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ChartSkeleton />
            )}
          </div>
          <div className="mt-3 space-y-2">
            {clusterBars.map((cluster) => (
              <div key={cluster.name} className="flex items-center justify-between gap-3 text-xs">
                <span className="text-slate-300">{cluster.label}</span>
                <span className="text-primary">{cluster.meta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <WhatThisMeans>{explanation}</WhatThisMeans>
    </section>
  );
}

function WhatThisMeans({ children }: { children: string }) {
  return (
    <div className="relative mt-5 rounded-lg border border-primary/20 bg-primary/10 p-3 shadow-lg shadow-primary/10">
      <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
        <BrainCircuit className="size-3.5" />
        What this means
      </div>
      <p className="text-xs leading-5 text-slate-300">{children}</p>
    </div>
  );
}
