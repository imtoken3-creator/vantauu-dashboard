export const dashboardStats = [
  {
    label: "AI Confidence",
    value: "94.8%",
    delta: "+8.2%",
    caption: "Predictive accuracy across whale clusters",
    accent: "violet",
  },
  {
    label: "Tracked Capital",
    value: "$18.4B",
    delta: "+12.6%",
    caption: "Net assets under real-time surveillance",
    accent: "blue",
  },
  {
    label: "Hot Wallets",
    value: "42,908",
    delta: "+1,204",
    caption: "Addresses with abnormal velocity",
    accent: "cyan",
  },
  {
    label: "Risk Alerts",
    value: "127",
    delta: "-18%",
    caption: "High-priority signals in the last 24h",
    accent: "emerald",
  },
] as const;

export const intelligenceSeries = [
  { day: "Mon", smartMoney: 62, liquidity: 44, sentiment: 52 },
  { day: "Tue", smartMoney: 68, liquidity: 49, sentiment: 57 },
  { day: "Wed", smartMoney: 73, liquidity: 58, sentiment: 63 },
  { day: "Thu", smartMoney: 70, liquidity: 65, sentiment: 61 },
  { day: "Fri", smartMoney: 82, liquidity: 71, sentiment: 70 },
  { day: "Sat", smartMoney: 89, liquidity: 76, sentiment: 74 },
  { day: "Sun", smartMoney: 96, liquidity: 84, sentiment: 81 },
];

export const signalFeed = [
  {
    title: "ETH accumulation cluster detected",
    meta: "15 wallets | $42.8M inflow | 12m ago",
    level: "Critical",
    strength: 92,
    tone: "rose",
  },
  {
    title: "AI narrative momentum rising",
    meta: "FET, TAO, RNDR social velocity spike",
    level: "Bullish",
    strength: 86,
    tone: "violet",
  },
  {
    title: "Stablecoin rotation into L2 majors",
    meta: "Arbitrum + Base bridge activity elevated",
    level: "Watch",
    strength: 74,
    tone: "cyan",
  },
  {
    title: "Exchange outflow anomaly",
    meta: "Binance cold-wallet drain below baseline",
    level: "Signal",
    strength: 68,
    tone: "blue",
  },
];

export const heroMetrics = [
  { label: "Entities resolved", value: "2.8M", detail: "+18.4K today" },
  { label: "Model latency", value: "84ms", detail: "p95 inference" },
  { label: "Active chains", value: "19", detail: "EVM + Solana" },
];

export const heroEvents = [
  { label: "Whale cohort", value: "Accumulating ETH", score: "97" },
  { label: "Narrative model", value: "AI agents heating", score: "89" },
  { label: "Liquidity route", value: "CEX to Base bridge", score: "82" },
];

export const narrativeMatrix = [
  { name: "AI Agents", heat: "96", flow: "+$284M", velocity: "+42%" },
  { name: "Restaking", heat: "81", flow: "+$119M", velocity: "+18%" },
  { name: "L2 Infra", heat: "74", flow: "+$92M", velocity: "+14%" },
  { name: "DePIN", heat: "68", flow: "+$48M", velocity: "+9%" },
];

export const walletClusters = [
  { name: "Fund wallets", count: "1,284", delta: "+7.8%" },
  { name: "Early buyers", count: "8,420", delta: "+21.4%" },
  { name: "Bridge-heavy", count: "3,118", delta: "+12.1%" },
];
