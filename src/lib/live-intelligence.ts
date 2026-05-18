export type MarketAsset = {
  id: string;
  symbol: string;
  name: string;
  priceUsd: number | null;
  marketCapUsd: number | null;
  change24h: number | null;
};

export type TrendingAsset = {
  id: string;
  symbol: string;
  name: string;
  marketCapRank: number | null;
};

export type MarketData = {
  assets: MarketAsset[];
  totalMarketCapUsd: number | null;
  dominance: {
    btc: number | null;
    eth: number | null;
  };
  fearGreed: {
    value: number | null;
    classification: string | null;
    updatedAt: number | null;
  };
  trending: TrendingAsset[];
};

export type DefiChain = {
  name: string;
  tvlUsd: number;
  change1d: number | null;
  change7d: number | null;
};

export type StablecoinChain = {
  name: string;
  marketCapUsd: number;
};

export type StablecoinAsset = {
  symbol: string;
  name: string;
  marketCapUsd: number;
};

export type DefiData = {
  chains: DefiChain[];
  stablecoinChains: StablecoinChain[];
  stablecoins: StablecoinAsset[];
  stablecoinTotalUsd: number | null;
  stablecoinChange7d: number | null;
};

export type WalletTransaction = {
  hash: string;
  from: string;
  to: string;
  valueEth: number;
  timestamp: number;
};

export type TokenTransfer = {
  hash: string;
  from: string;
  to: string;
  tokenSymbol: string;
  tokenName: string;
  value: number;
  timestamp: number;
};

export type WalletData = {
  address: string | null;
  enabled: boolean;
  transactions: WalletTransaction[];
  tokenTransfers: TokenTransfer[];
  error?: string;
};

export type LiveIntelligenceData = {
  market: MarketData;
  defi: DefiData;
  wallet: WalletData;
  updatedAt: string;
  errors: string[];
};

export const LIVE_INTELLIGENCE_FALLBACK: LiveIntelligenceData = {
  market: {
    assets: [
      {
        id: "bitcoin",
        symbol: "BTC",
        name: "Bitcoin",
        priceUsd: null,
        marketCapUsd: null,
        change24h: null,
      },
      {
        id: "ethereum",
        symbol: "ETH",
        name: "Ethereum",
        priceUsd: null,
        marketCapUsd: null,
        change24h: null,
      },
    ],
    totalMarketCapUsd: null,
    dominance: {
      btc: null,
      eth: null,
    },
    fearGreed: {
      value: null,
      classification: null,
      updatedAt: null,
    },
    trending: [
      { id: "ai-agents", symbol: "AI", name: "AI Agents", marketCapRank: null },
    ],
  },
  defi: {
    chains: [
      { name: "Ethereum", tvlUsd: 0, change1d: null, change7d: null },
      { name: "Base", tvlUsd: 0, change1d: null, change7d: null },
      { name: "Solana", tvlUsd: 0, change1d: null, change7d: null },
      { name: "Arbitrum", tvlUsd: 0, change1d: null, change7d: null },
    ],
    stablecoinChains: [],
    stablecoins: [
      { symbol: "USDC", name: "USD Coin", marketCapUsd: 0 },
      { symbol: "USDT", name: "Tether", marketCapUsd: 0 },
      { symbol: "DAI", name: "Dai", marketCapUsd: 0 },
      { symbol: "Others", name: "Other stablecoins", marketCapUsd: 0 },
    ],
    stablecoinTotalUsd: null,
    stablecoinChange7d: null,
  },
  wallet: {
    address: null,
    enabled: false,
    transactions: [],
    tokenTransfers: [],
    error: "ETHERSCAN_API_KEY is not configured",
  },
  updatedAt: new Date(0).toISOString(),
  errors: [],
};

export function formatUsd(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) {
    return "Loading";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: value >= 1_000_000 ? 2 : 0,
  }).format(value);
}

export function formatNumber(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) {
    return "Loading";
  }

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercent(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) {
    return "Live";
  }

  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

export function shortAddress(address: string | null | undefined) {
  if (!address || address.length < 10) {
    return "No wallet";
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
