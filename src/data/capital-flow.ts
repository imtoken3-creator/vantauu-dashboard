export const capitalFlowKpis = [
  {
    label: "Total Net Inflow",
    value: "$612.8M",
    change: "+31.2%",
    detail: "Net liquidity entering tracked ecosystems",
  },
  {
    label: "Total Inflow",
    value: "$1.84B",
    change: "+18.9%",
    detail: "Gross deposits, bridges, and protocol entries",
  },
  {
    label: "Total Outflow",
    value: "$1.23B",
    change: "-8.4%",
    detail: "Exchange exits and cross-chain rotations",
  },
  {
    label: "Active Addresses",
    value: "228.9K",
    change: "+14.7%",
    detail: "Wallets participating in liquidity movement",
  },
] as const;

export const chainFlowSeries = [
  { time: "00:00", ethereum: 82, base: 48, solana: 36, arbitrum: 42, optimism: 28 },
  { time: "03:00", ethereum: 94, base: 66, solana: 44, arbitrum: 51, optimism: 33 },
  { time: "06:00", ethereum: 88, base: 81, solana: 58, arbitrum: 63, optimism: 41 },
  { time: "09:00", ethereum: 112, base: 104, solana: 73, arbitrum: 72, optimism: 54 },
  { time: "12:00", ethereum: 128, base: 132, solana: 86, arbitrum: 79, optimism: 62 },
  { time: "15:00", ethereum: 121, base: 151, solana: 92, arbitrum: 91, optimism: 68 },
  { time: "18:00", ethereum: 139, base: 178, solana: 108, arbitrum: 103, optimism: 74 },
  { time: "21:00", ethereum: 154, base: 196, solana: 119, arbitrum: 112, optimism: 82 },
] as const;

export const ecosystemRanking = [
  {
    chain: "Base",
    netFlow: "+$286.4M",
    inflow: "$612.8M",
    outflow: "$326.4M",
    active: "72.4K",
    dominance: 31,
    status: "Accelerating",
  },
  {
    chain: "Ethereum",
    netFlow: "+$184.9M",
    inflow: "$541.1M",
    outflow: "$356.2M",
    active: "58.9K",
    dominance: 24,
    status: "Institutional",
  },
  {
    chain: "Solana",
    netFlow: "+$92.7M",
    inflow: "$268.4M",
    outflow: "$175.7M",
    active: "44.2K",
    dominance: 18,
    status: "Retail bid",
  },
  {
    chain: "Arbitrum",
    netFlow: "+$41.6M",
    inflow: "$203.2M",
    outflow: "$161.6M",
    active: "31.8K",
    dominance: 15,
    status: "Rotating",
  },
  {
    chain: "Optimism",
    netFlow: "+$18.2M",
    inflow: "$128.7M",
    outflow: "$110.5M",
    active: "21.6K",
    dominance: 12,
    status: "Stable",
  },
] as const;

export const stablecoinAllocation = [
  { name: "USDC", value: 52, color: "#7c8cff" },
  { name: "USDT", value: 31, color: "#34d399" },
  { name: "DAI", value: 11, color: "#a855f7" },
  { name: "Others", value: 6, color: "#38bdf8" },
] as const;

export const topProtocolsByInflow = [
  {
    name: "Uniswap",
    category: "DEX",
    chain: "Ethereum + Base",
    inflow: "$184.2M",
    velocity: "+28.4%",
    share: 86,
  },
  {
    name: "Aave",
    category: "Lending",
    chain: "Ethereum",
    inflow: "$142.7M",
    velocity: "+21.9%",
    share: 74,
  },
  {
    name: "Lido",
    category: "Staking",
    chain: "Ethereum",
    inflow: "$118.4M",
    velocity: "+17.2%",
    share: 66,
  },
  {
    name: "Morpho",
    category: "Lending",
    chain: "Base",
    inflow: "$92.1M",
    velocity: "+34.7%",
    share: 58,
  },
] as const;

export const sankeyFlowRoutes = [
  {
    from: "Ethereum",
    to: "Base",
    amount: "$286M",
    label: "USDC bridge",
    stroke: "#7c8cff",
    width: 18,
    y1: 62,
    y2: 78,
  },
  {
    from: "Ethereum",
    to: "Arbitrum",
    amount: "$118M",
    label: "LST rotation",
    stroke: "#a855f7",
    width: 12,
    y1: 118,
    y2: 164,
  },
  {
    from: "Solana",
    to: "Base",
    amount: "$76M",
    label: "Stablecoin migration",
    stroke: "#38bdf8",
    width: 10,
    y1: 204,
    y2: 108,
  },
  {
    from: "CEX",
    to: "Ethereum",
    amount: "$214M",
    label: "Exchange outflow",
    stroke: "#34d399",
    width: 16,
    y1: 260,
    y2: 212,
  },
] as const;

export const sankeyNodes = [
  { label: "CEX", side: "source", y: 260 },
  { label: "Ethereum", side: "source", y: 90 },
  { label: "Solana", side: "source", y: 204 },
  { label: "Bridge Routers", side: "middle", y: 142 },
  { label: "Base", side: "target", y: 92 },
  { label: "Arbitrum", side: "target", y: 176 },
  { label: "Ethereum", side: "target", y: 236 },
] as const;
