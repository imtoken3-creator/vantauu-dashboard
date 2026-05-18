"use client";

import type { ComponentProps } from "react";

import { StatCard } from "@/components/dashboard/stat-card";
import { dashboardStats } from "@/data/mock";
import { useLiveIntelligence } from "@/hooks/use-live-intelligence";
import {
  formatNumber,
  formatPercent,
  formatUsd,
  type LiveIntelligenceData,
} from "@/lib/live-intelligence";

type StatInput = Omit<ComponentProps<typeof StatCard>, "iconIndex">;

function findAsset(data: LiveIntelligenceData, id: "bitcoin" | "ethereum") {
  return data.market.assets.find((asset) => asset.id === id);
}

function buildLiveStats(data: LiveIntelligenceData, isLoading: boolean): StatInput[] {
  const btc = findAsset(data, "bitcoin");
  const eth = findAsset(data, "ethereum");
  const topChain = data.defi.chains[0];
  const walletEvents =
    data.wallet.tokenTransfers.length || data.wallet.transactions.length;

  if (isLoading) {
    return dashboardStats.map((stat) => ({
      ...stat,
      value: "Loading",
      delta: "Sync",
      caption: "Fetching live provider data",
    }));
  }

  return [
    {
      label: "BTC Price",
      value: formatUsd(btc?.priceUsd),
      delta: formatPercent(btc?.change24h),
      caption: "CoinGecko market price and 24h momentum",
      accent: "violet",
    },
    {
      label: "ETH Market Cap",
      value: formatUsd(eth?.marketCapUsd),
      delta: formatPercent(eth?.change24h),
      caption: "Ethereum market capitalization from CoinGecko",
      accent: "blue",
    },
    {
      label: "Top Chain TVL",
      value: formatUsd(topChain?.tvlUsd),
      delta: formatPercent(topChain?.change7d),
      caption: `${topChain?.name ?? "DefiLlama"} ecosystem liquidity ranking`,
      accent: "cyan",
    },
    {
      label: "Wallet Events",
      value: data.wallet.enabled ? formatNumber(walletEvents) : "Add key",
      delta: data.wallet.enabled ? "Etherscan" : "Optional",
      caption: data.wallet.enabled
        ? "Recent transactions and token transfers"
        : "Set ETHERSCAN_API_KEY for live wallet flows",
      accent: "emerald",
    },
  ];
}

export function LiveDashboardStats() {
  const { data, isLoading, error } = useLiveIntelligence();
  const stats = buildLiveStats(data, isLoading);
  const topTrend = data.market.trending[0];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} iconIndex={index} {...stat} />
        ))}
      </div>

      <div className="live-shimmer flex flex-col justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-xs text-muted-foreground sm:flex-row sm:items-center">
        <span className="inline-flex items-center gap-2">
          <span className="ai-signal-pulse" />
          {isLoading
            ? "Synchronizing CoinGecko, DefiLlama, and Etherscan providers..."
            : `Trending now: ${topTrend?.name ?? "market signals"}${topTrend?.marketCapRank ? ` / rank #${topTrend.marketCapRank}` : ""}`}
        </span>
        {error && (
          <span className="text-amber-200">
            Partial live mode: {error}
          </span>
        )}
      </div>
    </div>
  );
}
