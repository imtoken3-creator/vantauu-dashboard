export const smartMoneyKpis = [
  {
    label: "Smart Wallet AUM",
    value: "$4.82B",
    change: "+18.6%",
    detail: "Tracked across 12,482 labeled wallets",
  },
  {
    label: "24h Net Inflow",
    value: "$286.4M",
    change: "+42.1%",
    detail: "Capital entering high-conviction cohorts",
  },
  {
    label: "Active Wallets",
    value: "8,914",
    change: "+1,208",
    detail: "Funds, whales, and early accumulators",
  },
  {
    label: "Conviction Score",
    value: "91.7",
    change: "+6.4",
    detail: "AI weighted by flow, timing, and persistence",
  },
] as const;

export const walletLeaderboard = [
  {
    rank: 1,
    wallet: "0xA91...F28",
    entity: "Signal Fund Alpha",
    tags: ["Fund", "ETH Beta"],
    netFlow: "+$48.2M",
    pnl: "+32.4%",
    score: 98,
  },
  {
    rank: 2,
    wallet: "0x7C4...D03",
    entity: "Early AI Accumulator",
    tags: ["Whale", "AI"],
    netFlow: "+$31.8M",
    pnl: "+27.9%",
    score: 94,
  },
  {
    rank: 3,
    wallet: "0xD19...9B7",
    entity: "L2 Market Maker",
    tags: ["MM", "Base"],
    netFlow: "+$24.5M",
    pnl: "+18.2%",
    score: 89,
  },
  {
    rank: 4,
    wallet: "0x4E2...A61",
    entity: "Restaking Treasury",
    tags: ["DAO", "Restaking"],
    netFlow: "+$19.7M",
    pnl: "+15.6%",
    score: 86,
  },
  {
    rank: 5,
    wallet: "0x91B...71C",
    entity: "DePIN Rotation Desk",
    tags: ["Whale", "DePIN"],
    netFlow: "+$12.9M",
    pnl: "+11.3%",
    score: 82,
  },
] as const;

export const smartMoneyFeed = [
  {
    title: "ETH accumulation burst",
    meta: "22 labeled wallets added $71.2M in 38 minutes",
    time: "3m ago",
    level: "High",
  },
  {
    title: "AI agents rotation detected",
    meta: "TAO, FET, and RNDR received coordinated inflows",
    time: "11m ago",
    level: "Bullish",
  },
  {
    title: "Base ecosystem sweep",
    meta: "Three fund wallets bridged USDC into Base liquidity pools",
    time: "28m ago",
    level: "Signal",
  },
  {
    title: "CEX withdrawal cluster",
    meta: "7 wallets pulled $18.4M from Binance and Coinbase",
    time: "44m ago",
    level: "Watch",
  },
] as const;

export const netInflowSeries = [
  { date: "08:00", inflow: 42, outflow: 18, net: 24 },
  { date: "10:00", inflow: 58, outflow: 26, net: 32 },
  { date: "12:00", inflow: 63, outflow: 21, net: 42 },
  { date: "14:00", inflow: 88, outflow: 31, net: 57 },
  { date: "16:00", inflow: 114, outflow: 44, net: 70 },
  { date: "18:00", inflow: 128, outflow: 35, net: 93 },
  { date: "20:00", inflow: 151, outflow: 49, net: 102 },
  { date: "22:00", inflow: 166, outflow: 42, net: 124 },
] as const;

export const smartWalletClusters = [
  {
    name: "AI token accumulators",
    wallets: "1,248 wallets",
    flow: "+$124.8M",
    confidence: 96,
    focus: "TAO, RNDR, FET",
  },
  {
    name: "ETH beta funds",
    wallets: "742 wallets",
    flow: "+$88.1M",
    confidence: 91,
    focus: "ARB, OP, BASE",
  },
  {
    name: "Stablecoin deployers",
    wallets: "3,019 wallets",
    flow: "+$61.4M",
    confidence: 84,
    focus: "USDC routes",
  },
] as const;

export const allocationDonut = [
  { name: "ETH", value: 38, color: "#7c8cff" },
  { name: "AI", value: 24, color: "#a855f7" },
  { name: "L2", value: 18, color: "#38bdf8" },
  { name: "Stables", value: 12, color: "#34d399" },
  { name: "Other", value: 8, color: "#f59e0b" },
] as const;
