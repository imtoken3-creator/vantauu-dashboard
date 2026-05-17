export const alertKpis = [
  {
    label: "Total Alerts",
    value: "1,284",
    change: "+18.2%",
    detail: "Signals generated across all monitored systems",
  },
  {
    label: "Critical Alerts",
    value: "34",
    change: "+7",
    detail: "Requires immediate review by intelligence ops",
  },
  {
    label: "High Severity",
    value: "186",
    change: "+12.4%",
    detail: "High-confidence anomalies with market impact",
  },
  {
    label: "Medium Severity",
    value: "492",
    change: "-4.1%",
    detail: "Watchlist events and elevated activity windows",
  },
  {
    label: "Low Severity",
    value: "572",
    change: "+3.8%",
    detail: "Informational signals and low-risk detections",
  },
] as const;

export const alertsFeed = [
  {
    time: "14:32:08",
    type: "Whale Alert",
    alert: "Wallet 0xA91...F28 moved $42.8M ETH to cold storage",
    chain: "Ethereum",
    severity: "Critical",
  },
  {
    time: "14:27:44",
    type: "Smart Money",
    alert: "Labeled fund cluster accumulated RNDR and TAO",
    chain: "Base",
    severity: "High",
  },
  {
    time: "14:18:12",
    type: "Capital Flow",
    alert: "USDC bridge volume into Base crossed 3σ threshold",
    chain: "Base",
    severity: "High",
  },
  {
    time: "14:03:57",
    type: "Narrative Shift",
    alert: "AI Agents mindshare overtook RWA on social velocity",
    chain: "Multi-chain",
    severity: "Medium",
  },
  {
    time: "13:49:26",
    type: "New Deployment",
    alert: "New contract deployment detected from known protocol wallet",
    chain: "Arbitrum",
    severity: "Medium",
  },
  {
    time: "13:41:09",
    type: "Security Alert",
    alert: "Privileged role changed on watched lending market",
    chain: "Optimism",
    severity: "Critical",
  },
  {
    time: "13:30:51",
    type: "Liquidity Alert",
    alert: "Uniswap V3 pool liquidity dropped by $18.6M",
    chain: "Ethereum",
    severity: "Low",
  },
] as const;

export const severityDistribution = [
  { name: "Critical", value: 34, color: "#fb7185" },
  { name: "High", value: 186, color: "#f59e0b" },
  { name: "Medium", value: 492, color: "#7c8cff" },
  { name: "Low", value: 572, color: "#38bdf8" },
] as const;

export const alertsOverTime = [
  { hour: "00", critical: 2, high: 8, medium: 18, low: 22 },
  { hour: "03", critical: 1, high: 11, medium: 21, low: 26 },
  { hour: "06", critical: 3, high: 16, medium: 30, low: 34 },
  { hour: "09", critical: 4, high: 22, medium: 38, low: 43 },
  { hour: "12", critical: 7, high: 31, medium: 54, low: 62 },
  { hour: "15", critical: 9, high: 44, medium: 69, low: 77 },
  { hour: "18", critical: 5, high: 34, medium: 58, low: 70 },
  { hour: "21", critical: 3, high: 20, medium: 41, low: 54 },
] as const;

export const topAlertTypes = [
  {
    type: "Whale Alert",
    count: 286,
    impact: "Critical wallet movements",
    share: 92,
  },
  {
    type: "Smart Money",
    count: 248,
    impact: "Fund and whale accumulation",
    share: 84,
  },
  {
    type: "Capital Flow",
    count: 214,
    impact: "Bridge, CEX, and protocol flows",
    share: 78,
  },
  {
    type: "Narrative Shift",
    count: 162,
    impact: "Social and attention rotation",
    share: 64,
  },
  {
    type: "Security Alert",
    count: 97,
    impact: "Permission and contract risk",
    share: 48,
  },
] as const;

export const liveActivityFeed = [
  {
    title: "Critical whale movement confirmed",
    meta: "$42.8M ETH moved by Signal Fund Alpha",
    chain: "Ethereum",
    time: "Now",
    severity: "Critical",
  },
  {
    title: "Base bridge inflow spike",
    meta: "USDC deposits running 214% above baseline",
    chain: "Base",
    time: "1m ago",
    severity: "High",
  },
  {
    title: "Narrative momentum shift",
    meta: "AI Agents reclaimed top social velocity rank",
    chain: "Multi-chain",
    time: "4m ago",
    severity: "Medium",
  },
  {
    title: "Liquidity depth watch",
    meta: "Aave utilization near local stress band",
    chain: "Ethereum",
    time: "8m ago",
    severity: "Low",
  },
] as const;
