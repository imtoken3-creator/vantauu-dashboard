export const narrativeKpis = [
  {
    label: "Active Narratives",
    value: "42",
    change: "+9",
    detail: "Themes with measurable capital and social velocity",
  },
  {
    label: "Emerging Narratives",
    value: "11",
    change: "+4",
    detail: "New clusters gaining mindshare over baseline",
  },
  {
    label: "Dominant Narrative",
    value: "AI Agents",
    change: "31.8%",
    detail: "Highest weighted mindshare across tracked sources",
  },
  {
    label: "Narrative Shift %",
    value: "+18.6%",
    change: "7D",
    detail: "Rotation intensity between leading market themes",
  },
] as const;

export const topNarratives = [
  {
    narrative: "AI Agents",
    mindshare: "31.8%",
    momentum: 96,
    capitalFlow: "+$428M",
    trend: "+42%",
  },
  {
    narrative: "Real World Assets",
    mindshare: "18.4%",
    momentum: 82,
    capitalFlow: "+$184M",
    trend: "+21%",
  },
  {
    narrative: "DeFi 2.0",
    mindshare: "14.6%",
    momentum: 74,
    capitalFlow: "+$126M",
    trend: "+16%",
  },
  {
    narrative: "Meme Ecosystem",
    mindshare: "12.1%",
    momentum: 68,
    capitalFlow: "+$92M",
    trend: "+11%",
  },
  {
    narrative: "Layer 2",
    mindshare: "10.8%",
    momentum: 63,
    capitalFlow: "+$81M",
    trend: "+8%",
  },
  {
    narrative: "GameFi",
    mindshare: "7.4%",
    momentum: 51,
    capitalFlow: "+$34M",
    trend: "+3%",
  },
  {
    narrative: "SocialFi",
    mindshare: "4.9%",
    momentum: 47,
    capitalFlow: "+$22M",
    trend: "-2%",
  },
] as const;

export const narrativeMindshare = [
  { name: "AI Agents", value: 31.8, color: "#7c8cff" },
  { name: "RWA", value: 18.4, color: "#38bdf8" },
  { name: "DeFi 2.0", value: 14.6, color: "#a855f7" },
  { name: "Meme", value: 12.1, color: "#f59e0b" },
  { name: "Layer 2", value: 10.8, color: "#34d399" },
  { name: "GameFi", value: 7.4, color: "#fb7185" },
  { name: "SocialFi", value: 4.9, color: "#c084fc" },
] as const;

export const narrativeMomentumSeries = [
  { day: "Mon", ai: 62, rwa: 42, defi: 48, meme: 36, layer2: 50 },
  { day: "Tue", ai: 68, rwa: 46, defi: 54, meme: 44, layer2: 53 },
  { day: "Wed", ai: 74, rwa: 52, defi: 59, meme: 57, layer2: 55 },
  { day: "Thu", ai: 82, rwa: 57, defi: 63, meme: 62, layer2: 58 },
  { day: "Fri", ai: 91, rwa: 64, defi: 69, meme: 66, layer2: 61 },
  { day: "Sat", ai: 96, rwa: 71, defi: 73, meme: 68, layer2: 64 },
  { day: "Sun", ai: 104, rwa: 82, defi: 76, meme: 70, layer2: 67 },
] as const;

export const heatmapRows = [
  {
    narrative: "AI Agents",
    values: [72, 81, 88, 92, 96, 100, 94],
  },
  {
    narrative: "RWA",
    values: [38, 42, 49, 55, 61, 69, 76],
  },
  {
    narrative: "DeFi 2.0",
    values: [44, 48, 53, 59, 65, 71, 73],
  },
  {
    narrative: "Meme",
    values: [21, 29, 45, 63, 58, 54, 49],
  },
  {
    narrative: "Layer 2",
    values: [52, 56, 58, 61, 63, 66, 69],
  },
  {
    narrative: "GameFi",
    values: [25, 28, 31, 36, 42, 47, 43],
  },
  {
    narrative: "SocialFi",
    values: [34, 32, 29, 31, 37, 42, 46],
  },
] as const;

export const heatmapDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export const socialSentimentFeed = [
  {
    source: "Farcaster",
    title: "AI agent wallets dominating discussion velocity",
    meta: "Builders and funds converging around autonomous execution narratives",
    signal: "Momentum +42%",
    time: "4m ago",
  },
  {
    source: "Twitter",
    title: "RWA discourse shifting from pilots to tokenized yield",
    meta: "Institutional accounts increasing mentions of treasury products",
    signal: "Mindshare +18%",
    time: "13m ago",
  },
  {
    source: "Farcaster",
    title: "DeFi 2.0 posts clustering around revenue share",
    meta: "Protocol fee switch and buyback discussions rising",
    signal: "Signal +15%",
    time: "27m ago",
  },
  {
    source: "Twitter",
    title: "Meme ecosystem sentiment cooling after volume spike",
    meta: "Attention remains high but capital quality score declined",
    signal: "Risk +9%",
    time: "41m ago",
  },
] as const;
