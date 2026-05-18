import {
  formatNumber,
  formatPercent,
  formatUsd,
  type LiveIntelligenceData,
} from "@/lib/live-intelligence";

export type MarketSentimentRegime = "Fear" | "Neutral" | "Risk-on" | "Risk-off";

export type AISignal = {
  type:
    | "Bullish signal"
    | "Risk alert"
    | "Narrative breakout"
    | "Whale accumulation";
  title: string;
  level: string;
  source: string;
  score: number;
  rationale: string;
  whatThisMeans: string;
};

export type IntelligenceCard = {
  title: string;
  status: string;
  metric: string;
  description: string;
  confidence: number;
  tone: "cyan" | "emerald" | "violet" | "amber" | "rose";
  whatThisMeans: string;
};

export type AIDailyBriefing = {
  title: string;
  body: string;
  sections: Array<{
    label: string;
    value: string;
    summary: string;
  }>;
  bullets: string[];
};

export type AIIntelligenceLayer = {
  sentiment: {
    regime: MarketSentimentRegime;
    score: number;
    confidence: number;
    label: string;
    description: string;
    drivers: Array<{
      label: string;
      value: string;
      impact: "positive" | "negative" | "neutral";
    }>;
  };
  dailyBriefing: AIDailyBriefing;
  signals: AISignal[];
  cards: IntelligenceCard[];
  explanations: {
    marketOverview: string;
    marketPulse: string;
    signalEngine: string;
    capitalFlow: string;
    narratives: string;
    wallet: string;
  };
};

type GenerationOptions = {
  isLoading?: boolean;
  error?: string | null;
};

function findAsset(data: LiveIntelligenceData, id: "bitcoin" | "ethereum") {
  return data.market.assets.find((asset) => asset.id === id);
}

function numeric(value: number | null | undefined, fallback = 0) {
  return value == null || !Number.isFinite(value) ? fallback : value;
}

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function dominance(value: number | null | undefined) {
  return value == null || !Number.isFinite(value) ? "Loading" : `${value.toFixed(1)}%`;
}

function sentimentRegime(score: number): MarketSentimentRegime {
  if (score >= 64) {
    return "Risk-on";
  }

  if (score >= 45) {
    return "Neutral";
  }

  if (score >= 32) {
    return "Fear";
  }

  return "Risk-off";
}

function sentimentLabel(regime: MarketSentimentRegime) {
  if (regime === "Risk-on") {
    return "Capital is leaning into beta and liquidity expansion.";
  }

  if (regime === "Risk-off") {
    return "Capital is defensive, with sentiment and volatility signaling caution.";
  }

  if (regime === "Fear") {
    return "Market tone is fearful, but selective accumulation can still emerge.";
  }

  return "Market tone is balanced, with confirmation needed from flow and wallets.";
}

function dataConfidence(data: LiveIntelligenceData) {
  let score = 64;

  if (data.market.assets.some((asset) => asset.priceUsd)) {
    score += 10;
  }

  if (data.defi.chains.some((chain) => chain.tvlUsd > 0)) {
    score += 10;
  }

  if (data.wallet.enabled) {
    score += 10;
  }

  if (data.market.fearGreed.value != null) {
    score += 6;
  }

  return clamp(score, 42, 96);
}

export function generateIntelligenceLayer(
  data: LiveIntelligenceData,
  options: GenerationOptions = {}
): AIIntelligenceLayer {
  const btc = findAsset(data, "bitcoin");
  const eth = findAsset(data, "ethereum");
  const topChain = data.defi.chains[0];
  const secondChain = data.defi.chains[1];
  const topTrend = data.market.trending[0];
  const secondTrend = data.market.trending[1];
  const latestTransfer = data.wallet.tokenTransfers[0];
  const latestTx = data.wallet.transactions[0];
  const fearGreed = data.market.fearGreed.value ?? 50;
  const btcMove = numeric(btc?.change24h);
  const ethMove = numeric(eth?.change24h);
  const stablecoinChange = numeric(data.defi.stablecoinChange7d);
  const stablecoinTotal = data.defi.stablecoinTotalUsd;
  const btcDominance = numeric(data.market.dominance.btc, 50);
  const ethDominance = numeric(data.market.dominance.eth, 10);
  const volatilityScore = clamp((Math.abs(btcMove) + Math.abs(ethMove)) * 12, 8, 96);
  const sentimentScore = clamp(
    fearGreed +
      btcMove * 2.2 +
      ethMove * 1.6 +
      stablecoinChange * 9 -
      Math.max(0, btcDominance - 58) * 0.7
  );
  const regime = sentimentRegime(sentimentScore);
  const confidence = dataConfidence(data);
  const walletEventCount = data.wallet.transactions.length + data.wallet.tokenTransfers.length;
  const walletActivity = latestTransfer
    ? `${formatNumber(latestTransfer.value)} ${latestTransfer.tokenSymbol}`
    : latestTx
      ? `${latestTx.valueEth.toFixed(3)} ETH`
      : data.wallet.enabled
        ? "No major wallet movement"
        : "Wallet monitor requires Etherscan key";

  if (options.isLoading) {
    return {
      sentiment: {
        regime: "Neutral",
        score: 50,
        confidence: 48,
        label: "Synchronizing AI market state",
        description:
          "The intelligence layer is waiting for market, liquidity, narrative, and wallet feeds before assigning regime.",
        drivers: [
          { label: "Market", value: "Syncing", impact: "neutral" },
          { label: "Liquidity", value: "Syncing", impact: "neutral" },
          { label: "Wallets", value: "Syncing", impact: "neutral" },
        ],
      },
      dailyBriefing: {
        title: "AI Daily Briefing",
        body:
          "Vantauu is synchronizing live providers and preparing a daily market intelligence briefing.",
        sections: [
          { label: "Capital flow", value: "Loading", summary: "Awaiting DefiLlama liquidity data." },
          { label: "Narratives", value: "Loading", summary: "Awaiting CoinGecko trend data." },
          { label: "Smart money", value: "Loading", summary: "Checking wallet intelligence configuration." },
          { label: "Volatility", value: "Loading", summary: "Awaiting BTC and ETH movement." },
          { label: "Stablecoins", value: "Loading", summary: "Awaiting stablecoin supply data." },
        ],
        bullets: [
          "Market state model is initializing.",
          "Signal engine will rank opportunities and risks once live data arrives.",
          "Module explanations are generated from provider state and fallback confidence.",
        ],
      },
      signals: [
        {
          type: "Bullish signal",
          title: "Liquidity model initializing",
          level: "Sync",
          source: "AI Signal Engine",
          score: 62,
          rationale: "Waiting for stablecoin and chain TVL data.",
          whatThisMeans: "The system has not assigned a directional liquidity bias yet.",
        },
      ],
      cards: [
        {
          title: "AI intelligence layer warming up",
          status: "Syncing",
          metric: "Provider state",
          description: "The terminal is preparing inference from live market data.",
          confidence: 52,
          tone: "cyan",
          whatThisMeans: "Insights will become more specific as data providers respond.",
        },
      ],
      explanations: {
        marketOverview: "The market overview is waiting for live prices, dominance, and sentiment inputs.",
        marketPulse: "The pulse chart will model short-term pressure from BTC, ETH, and liquidity data.",
        signalEngine: "The signal engine ranks market events after provider synchronization.",
        capitalFlow: "Capital flow inference is pending TVL and stablecoin supply data.",
        narratives: "Narrative inference is pending trending asset data.",
        wallet: "Wallet inference is pending Etherscan configuration and response state.",
      },
    };
  }

  const signals: AISignal[] = [
    {
      type: "Bullish signal",
      title:
        stablecoinChange > 0
          ? "Stablecoin liquidity expansion detected"
          : "Liquidity expansion not confirmed",
      level: stablecoinChange > 0.4 ? "Bullish" : stablecoinChange > 0 ? "Constructive" : "Neutral",
      source: `${formatUsd(stablecoinTotal)} stablecoin supply / 7D ${formatPercent(data.defi.stablecoinChange7d)}`,
      score: clamp(68 + stablecoinChange * 22),
      rationale:
        stablecoinChange > 0
          ? "Stablecoin supply is expanding, which can improve market liquidity and risk appetite."
          : "Stablecoin growth is muted, so liquidity confirmation is weaker.",
      whatThisMeans:
        "Watch whether this liquidity rotates into high-beta chains, DEX volume, and narrative assets.",
    },
    {
      type: "Risk alert",
      title:
        regime === "Risk-off" || regime === "Fear"
          ? "Defensive market regime active"
          : "Risk pressure contained",
      level: regime === "Risk-off" ? "Critical" : regime === "Fear" ? "Risk" : "Watch",
      source: `Fear & Greed ${data.market.fearGreed.value ?? "Live"} / ${data.market.fearGreed.classification ?? regime}`,
      score: clamp(100 - sentimentScore + volatilityScore * 0.28),
      rationale:
        "The sentiment model combines Fear & Greed, BTC/ETH movement, volatility, liquidity, and dominance pressure.",
      whatThisMeans:
        "If risk pressure rises while stablecoins contract, reduce confidence in breakout narratives.",
    },
    {
      type: "Narrative breakout",
      title: `${topTrend?.symbol || "AI"} narrative accelerating`,
      level: "Breakout",
      source: topTrend?.name || "CoinGecko trending scanner",
      score: topTrend?.marketCapRank
        ? clamp(98 - topTrend.marketCapRank / 12, 58, 94)
        : 82,
      rationale:
        "Trending rank is being treated as a proxy for attention velocity and narrative discovery.",
      whatThisMeans:
        "Narrative strength should be validated against capital flow before treating it as durable momentum.",
    },
    {
      type: "Whale accumulation",
      title: data.wallet.enabled ? "Wallet flow observed" : "Wallet monitor in fallback mode",
      level: data.wallet.enabled ? "Whale" : "Setup",
      source: walletActivity,
      score: data.wallet.enabled ? clamp(72 + walletEventCount * 3, 72, 94) : 58,
      rationale:
        data.wallet.enabled
          ? "Recent wallet events are being scored for transfer size, token focus, and recency."
          : "Etherscan is not configured, so the engine is preserving the card with setup-safe context.",
      whatThisMeans:
        data.wallet.enabled
          ? "Inspect whether the same wallet cluster repeats across transfers before acting on the signal."
          : "Add ETHERSCAN_API_KEY to activate live whale accumulation scoring.",
    },
  ];

  const cards: IntelligenceCard[] = [
    {
      title: "AI narrative accelerating",
      status: topTrend?.symbol || "Trend",
      metric: topTrend?.marketCapRank ? `Rank #${topTrend.marketCapRank}` : "Live trend",
      description: `${topTrend?.name || "Market trend"} is leading current attention velocity.`,
      confidence: signals[2]?.score ?? 78,
      tone: "violet",
      whatThisMeans:
        "This is an attention signal first; stronger confirmation comes from liquidity and wallet alignment.",
    },
    {
      title:
        stablecoinChange > 0
          ? "Stablecoin inflow spike detected"
          : "Stablecoin inflow muted",
      status: formatPercent(data.defi.stablecoinChange7d),
      metric: formatUsd(stablecoinTotal),
      description:
        stablecoinChange > 0
          ? "Stablecoin supply expansion suggests more deployable liquidity in the system."
          : "Stablecoin supply is not expanding enough to confirm broad risk appetite.",
      confidence: clamp(72 + Math.abs(stablecoinChange) * 12),
      tone: stablecoinChange > 0 ? "emerald" : "amber",
      whatThisMeans:
        "When stablecoins expand alongside narrative velocity, breakouts have better follow-through odds.",
    },
    {
      title:
        ethMove < btcMove - 0.8
          ? "ETH ecosystem weakening"
          : "ETH ecosystem holding relative strength",
      status: formatPercent(eth?.change24h),
      metric: `ETH dom ${dominance(ethDominance)}`,
      description:
        ethMove < btcMove - 0.8
          ? "ETH is lagging BTC on short-term momentum, which can pressure ETH beta baskets."
          : "ETH is not materially lagging BTC, keeping ETH ecosystem risk balanced.",
      confidence: clamp(66 + Math.abs(ethMove - btcMove) * 12),
      tone: ethMove < btcMove - 0.8 ? "rose" : "cyan",
      whatThisMeans:
        "Compare ETH strength with L2 TVL before rotating into high beta ETH ecosystem assets.",
    },
    {
      title: "Capital concentration map updated",
      status: topChain?.name || "DeFi",
      metric: formatUsd(topChain?.tvlUsd),
      description: `${topChain?.name || "The leading ecosystem"} is the current liquidity anchor, ahead of ${secondChain?.name || "other chains"}.`,
      confidence: 80,
      tone: "cyan",
      whatThisMeans:
        "High TVL concentration can anchor liquidity, but capital rotation often starts in smaller ecosystems.",
    },
  ];

  const dailyBriefing: AIDailyBriefing = {
    title: "AI Daily Briefing",
    body: `Market sentiment is ${regime} with BTC at ${formatUsd(btc?.priceUsd)} and ETH at ${formatUsd(eth?.priceUsd)}. The AI layer sees ${topChain?.name || "DeFi"} as the current liquidity anchor, ${topTrend?.symbol || "AI"} as the leading narrative, and stablecoin supply at ${formatUsd(stablecoinTotal)}.`,
    sections: [
      {
        label: "Capital flow",
        value: topChain?.name || "DeFi",
        summary: `${topChain?.name || "The leading chain"} holds ${formatUsd(topChain?.tvlUsd)} in TVL, framing current liquidity concentration.`,
      },
      {
        label: "Narratives",
        value: topTrend?.symbol || "AI",
        summary: `${topTrend?.name || "The top narrative"} is leading attention, with ${secondTrend?.symbol || "secondary themes"} also visible.`,
      },
      {
        label: "Smart money",
        value: data.wallet.enabled ? `${walletEventCount} events` : "Fallback",
        summary: data.wallet.enabled
          ? `Wallet monitor detected ${walletEventCount} recent Etherscan events.`
          : "Wallet-specific smart money scoring is waiting for ETHERSCAN_API_KEY.",
      },
      {
        label: "Volatility",
        value: `${Math.round(volatilityScore)}/100`,
        summary: `BTC and ETH combined 24H movement implies ${volatilityScore > 55 ? "elevated" : "contained"} near-term volatility.`,
      },
      {
        label: "Stablecoins",
        value: formatPercent(data.defi.stablecoinChange7d),
        summary: `Stablecoin supply is ${formatUsd(stablecoinTotal)}, giving the engine its core liquidity input.`,
      },
    ],
    bullets: [
      `Market cap: ${formatUsd(data.market.totalMarketCapUsd)} with BTC dominance at ${dominance(data.market.dominance.btc)}.`,
      `Sentiment model: ${regime} / ${Math.round(sentimentScore)} score / ${confidence}% confidence.`,
      data.wallet.enabled
        ? `Smart money feed: ${walletActivity} is the latest wallet signal.`
        : "Smart money feed: activate Etherscan to upgrade from fallback to wallet-level scoring.",
      options.error
        ? `Provider note: ${options.error}`
        : "Provider note: available market and liquidity feeds are responding.",
    ],
  };

  return {
    sentiment: {
      regime,
      score: Math.round(sentimentScore),
      confidence,
      label: sentimentLabel(regime),
      description:
        "The sentiment engine blends Fear & Greed, BTC/ETH momentum, dominance, stablecoin expansion, volatility, and wallet availability.",
      drivers: [
        {
          label: "Fear & Greed",
          value: `${data.market.fearGreed.value ?? "Live"} ${data.market.fearGreed.classification ?? ""}`.trim(),
          impact: fearGreed >= 55 ? "positive" : fearGreed <= 35 ? "negative" : "neutral",
        },
        {
          label: "BTC / ETH momentum",
          value: `${formatPercent(btc?.change24h)} / ${formatPercent(eth?.change24h)}`,
          impact: btcMove + ethMove > 1 ? "positive" : btcMove + ethMove < -1 ? "negative" : "neutral",
        },
        {
          label: "Stablecoin liquidity",
          value: formatPercent(data.defi.stablecoinChange7d),
          impact: stablecoinChange > 0 ? "positive" : stablecoinChange < 0 ? "negative" : "neutral",
        },
        {
          label: "Dominance pressure",
          value: `BTC ${dominance(data.market.dominance.btc)}`,
          impact: btcDominance > 60 ? "negative" : "neutral",
        },
      ],
    },
    dailyBriefing,
    signals,
    cards,
    explanations: {
      marketOverview:
        "Market overview compresses price, global market cap, Fear & Greed, and dominance into a single regime read.",
      marketPulse:
        "The pulse chart models directional pressure from BTC, ETH, and liquidity inputs rather than raw price history.",
      signalEngine:
        "Signals are AI-ranked by liquidity confirmation, sentiment pressure, narrative attention, and wallet availability.",
      capitalFlow:
        "Capital flow heatmap highlights where liquidity is concentrated and whether stablecoins support risk expansion.",
      narratives:
        "Narrative intelligence treats trending assets as attention velocity, then asks whether liquidity confirms it.",
      wallet:
        data.wallet.enabled
          ? "Wallet intelligence scores recent Etherscan activity as potential smart money or whale behavior."
          : "Wallet intelligence is in fallback mode until Etherscan credentials are configured.",
    },
  };
}
