import {
  LIVE_INTELLIGENCE_FALLBACK,
  type DefiChain,
  type DefiData,
  type LiveIntelligenceData,
  type MarketAsset,
  type MarketData,
  type StablecoinAsset,
  type StablecoinChain,
  type TokenTransfer,
  type WalletData,
  type WalletTransaction,
} from "@/lib/live-intelligence";

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";
const DEFILLAMA_BASE = "https://api.llama.fi";
const STABLECOINS_BASE = "https://stablecoins.llama.fi";
const ETHERSCAN_BASE = "https://api.etherscan.io/v2/api";
const FEAR_GREED_BASE = "https://api.alternative.me/fng/";

type JsonObject = Record<string, unknown>;

async function fetchJson<T>(
  url: string,
  init: RequestInit = {},
  timeoutMs = 9_000
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function stableValue(value: unknown): number {
  if (typeof value === "number") {
    return value;
  }

  if (value && typeof value === "object") {
    const record = value as JsonObject;
    return (
      asNumber(record.peggedUSD) ??
      asNumber(record.totalCirculatingUSD) ??
      asNumber(record.circulating) ??
      0
    );
  }

  return asNumber(value) ?? 0;
}

function coinGeckoHeaders() {
  const key = process.env.COINGECKO_DEMO_API_KEY;
  return key ? { "x-cg-demo-api-key": key } : undefined;
}

async function fetchFearGreedData() {
  try {
    const payload = await fetchJson<JsonObject>(
      `${FEAR_GREED_BASE}?limit=1`,
      {},
      7_000
    );
    const latest = Array.isArray(payload.data)
      ? (payload.data[0] as JsonObject | undefined)
      : undefined;

    return {
      value: asNumber(latest?.value),
      classification: latest?.value_classification
        ? String(latest.value_classification)
        : null,
      updatedAt: asNumber(latest?.timestamp),
    };
  } catch {
    return LIVE_INTELLIGENCE_FALLBACK.market.fearGreed;
  }
}

export async function fetchCoinGeckoData(): Promise<MarketData> {
  const headers = coinGeckoHeaders();
  const [markets, global, trending, fearGreed] = await Promise.all([
    fetchJson<JsonObject[]>(
      `${COINGECKO_BASE}/coins/markets?vs_currency=usd&ids=bitcoin,ethereum&order=market_cap_desc&per_page=2&page=1&sparkline=false&price_change_percentage=24h`,
      { headers }
    ),
    fetchJson<JsonObject>(`${COINGECKO_BASE}/global`, { headers }),
    fetchJson<JsonObject>(`${COINGECKO_BASE}/search/trending`, { headers }),
    fetchFearGreedData(),
  ]);

  const assets: MarketAsset[] = markets.map((asset) => ({
    id: String(asset.id ?? ""),
    symbol: String(asset.symbol ?? "").toUpperCase(),
    name: String(asset.name ?? ""),
    priceUsd: asNumber(asset.current_price),
    marketCapUsd: asNumber(asset.market_cap),
    change24h: asNumber(asset.price_change_percentage_24h),
  }));

  const globalData = (global.data ?? {}) as JsonObject;
  const totalMarketCap = (globalData.total_market_cap ?? {}) as JsonObject;
  const marketCapPercentage = (globalData.market_cap_percentage ?? {}) as JsonObject;
  const trendingCoins = Array.isArray(trending.coins) ? trending.coins : [];

  return {
    assets,
    totalMarketCapUsd: asNumber(totalMarketCap.usd),
    dominance: {
      btc: asNumber(marketCapPercentage.btc),
      eth: asNumber(marketCapPercentage.eth),
    },
    fearGreed,
    trending: trendingCoins.slice(0, 5).map((entry) => {
      const item = ((entry as JsonObject).item ?? {}) as JsonObject;
      return {
        id: String(item.id ?? ""),
        symbol: String(item.symbol ?? "").toUpperCase(),
        name: String(item.name ?? ""),
        marketCapRank: asNumber(item.market_cap_rank),
      };
    }),
  };
}

async function fetchStablecoinChains(): Promise<JsonObject[]> {
  try {
    return await fetchJson<JsonObject[]>(`${DEFILLAMA_BASE}/stablecoinchains`);
  } catch {
    return fetchJson<JsonObject[]>(`${STABLECOINS_BASE}/stablecoinchains`);
  }
}

async function fetchStablecoinChart(): Promise<JsonObject[]> {
  try {
    return await fetchJson<JsonObject[]>(`${DEFILLAMA_BASE}/stablecoincharts/all`);
  } catch {
    return fetchJson<JsonObject[]>(`${STABLECOINS_BASE}/stablecoincharts/all`);
  }
}

async function fetchStablecoinAssets(): Promise<JsonObject[]> {
  let payload: JsonObject;

  try {
    payload = await fetchJson<JsonObject>(
      `${STABLECOINS_BASE}/stablecoins?includePrices=true`
    );
  } catch {
    return [];
  }

  return Array.isArray(payload.peggedAssets)
    ? (payload.peggedAssets as JsonObject[])
    : [];
}

export async function fetchDefiLlamaData(): Promise<DefiData> {
  const [
    chainsRaw,
    stablecoinChainsRaw,
    stablecoinChartRaw,
    stablecoinAssetsRaw,
  ] = await Promise.all([
    fetchJson<JsonObject[]>(`${DEFILLAMA_BASE}/v2/chains`),
    fetchStablecoinChains(),
    fetchStablecoinChart(),
    fetchStablecoinAssets(),
  ]);

  const priorityChains = new Set([
    "Ethereum",
    "Base",
    "Solana",
    "Arbitrum",
    "Optimism",
    "BSC",
    "Polygon",
  ]);

  const chains: DefiChain[] = chainsRaw
    .map((chain) => ({
      name: String(chain.name ?? chain.chain ?? ""),
      tvlUsd: asNumber(chain.tvl) ?? 0,
      change1d: asNumber(chain.change_1d),
      change7d: asNumber(chain.change_7d),
    }))
    .filter((chain) => priorityChains.has(chain.name))
    .sort((a, b) => b.tvlUsd - a.tvlUsd)
    .slice(0, 6);

  const stablecoinChains: StablecoinChain[] = stablecoinChainsRaw
    .map((chain) => {
      const name = String(chain.name ?? chain.chain ?? "");
      const marketCapUsd =
        stableValue(chain.totalCirculatingUSD) ||
        stableValue(chain.circulating) ||
        stableValue(chain.mcap);

      return { name, marketCapUsd };
    })
    .filter((chain) => chain.name && chain.marketCapUsd > 0)
    .sort((a, b) => b.marketCapUsd - a.marketCapUsd)
    .slice(0, 6);

  const current = stablecoinChartRaw.at(-1);
  const weekAgo = stablecoinChartRaw.at(-8);
  const currentTotal = current ? stableValue(current.totalCirculatingUSD) : null;
  const previousTotal = weekAgo ? stableValue(weekAgo.totalCirculatingUSD) : null;
  const targetStablecoins = ["USDC", "USDT", "DAI"];
  const stablecoins: StablecoinAsset[] = targetStablecoins.map((symbol) => {
    const asset = stablecoinAssetsRaw.find(
      (item) => String(item.symbol ?? "").toUpperCase() === symbol
    );

    return {
      symbol,
      name: String(asset?.name ?? symbol),
      marketCapUsd: stableValue(asset?.circulating) || stableValue(asset?.mcap),
    };
  });
  const trackedStablecoinTotal = stablecoins.reduce(
    (total, item) => total + item.marketCapUsd,
    0
  );

  stablecoins.push({
    symbol: "Others",
    name: "Other stablecoins",
    marketCapUsd: Math.max((currentTotal ?? trackedStablecoinTotal) - trackedStablecoinTotal, 0),
  });

  return {
    chains,
    stablecoinChains,
    stablecoins,
    stablecoinTotalUsd: currentTotal,
    stablecoinChange7d:
      currentTotal && previousTotal
        ? ((currentTotal - previousTotal) / previousTotal) * 100
        : null,
  };
}

function normalizeEtherscanResult(payload: JsonObject): JsonObject[] {
  return Array.isArray(payload.result) ? (payload.result as JsonObject[]) : [];
}

export async function fetchEtherscanData(addressOverride?: string | null): Promise<WalletData> {
  const apiKey = process.env.ETHERSCAN_API_KEY;
  const address =
    addressOverride ??
    process.env.ETHERSCAN_WALLET_ADDRESS ??
    "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe";

  if (!apiKey) {
    return {
      ...LIVE_INTELLIGENCE_FALLBACK.wallet,
      address,
      error: "ETHERSCAN_API_KEY is not configured",
    };
  }

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return {
      ...LIVE_INTELLIGENCE_FALLBACK.wallet,
      address,
      error: "Invalid wallet address",
    };
  }

  const base = new URL(ETHERSCAN_BASE);
  const commonParams = {
    chainid: "1",
    module: "account",
    address,
    startblock: "0",
    endblock: "99999999",
    page: "1",
    offset: "10",
    sort: "desc",
    apikey: apiKey,
  };

  const txUrl = new URL(base);
  Object.entries({ ...commonParams, action: "txlist" }).forEach(([key, value]) =>
    txUrl.searchParams.set(key, value)
  );

  const transferUrl = new URL(base);
  Object.entries({ ...commonParams, action: "tokentx" }).forEach(([key, value]) =>
    transferUrl.searchParams.set(key, value)
  );

  const [txPayload, transferPayload] = await Promise.all([
    fetchJson<JsonObject>(txUrl.toString()),
    fetchJson<JsonObject>(transferUrl.toString()),
  ]);

  const transactions: WalletTransaction[] = normalizeEtherscanResult(txPayload).map((tx) => ({
    hash: String(tx.hash ?? ""),
    from: String(tx.from ?? ""),
    to: String(tx.to ?? ""),
    valueEth: (asNumber(tx.value) ?? 0) / 1e18,
    timestamp: asNumber(tx.timeStamp) ?? 0,
  }));

  const tokenTransfers: TokenTransfer[] = normalizeEtherscanResult(transferPayload).map((tx) => {
    const decimals = asNumber(tx.tokenDecimal) ?? 18;
    return {
      hash: String(tx.hash ?? ""),
      from: String(tx.from ?? ""),
      to: String(tx.to ?? ""),
      tokenSymbol: String(tx.tokenSymbol ?? "TOKEN"),
      tokenName: String(tx.tokenName ?? "Token"),
      value: (asNumber(tx.value) ?? 0) / 10 ** decimals,
      timestamp: asNumber(tx.timeStamp) ?? 0,
    };
  });

  return {
    address,
    enabled: true,
    transactions,
    tokenTransfers,
  };
}

export async function fetchLiveIntelligenceData(
  addressOverride?: string | null
): Promise<LiveIntelligenceData> {
  const errors: string[] = [];
  const [market, defi, wallet] = await Promise.allSettled([
    fetchCoinGeckoData(),
    fetchDefiLlamaData(),
    fetchEtherscanData(addressOverride),
  ]);

  if (market.status === "rejected") {
    errors.push("CoinGecko data unavailable");
  }

  if (defi.status === "rejected") {
    errors.push("DefiLlama data unavailable");
  }

  if (wallet.status === "rejected") {
    errors.push("Etherscan data unavailable");
  }

  return {
    market:
      market.status === "fulfilled"
        ? market.value
        : LIVE_INTELLIGENCE_FALLBACK.market,
    defi:
      defi.status === "fulfilled"
        ? defi.value
        : LIVE_INTELLIGENCE_FALLBACK.defi,
    wallet:
      wallet.status === "fulfilled"
        ? wallet.value
        : {
            ...LIVE_INTELLIGENCE_FALLBACK.wallet,
            error: "Etherscan data unavailable",
          },
    updatedAt: new Date().toISOString(),
    errors,
  };
}
