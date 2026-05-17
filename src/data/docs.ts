export type DocsSectionId =
  | "introduction"
  | "authentication"
  | "smart-money"
  | "capital-flow"
  | "narratives"
  | "alerts"
  | "wallet"
  | "websocket"
  | "rate-limits"
  | "error-codes";

export type ApiMethod = "GET" | "POST" | "STREAM" | "GUIDE" | "REF";

export type ApiParameter = {
  name: string;
  type: string;
  required: boolean;
  description: string;
};

export type StatusCode = {
  code: string;
  label: string;
  description: string;
};

export type ApiDocsSection = {
  id: DocsSectionId;
  label: string;
  category: string;
  title: string;
  method: ApiMethod;
  path: string;
  description: string;
  latency: string;
  availability: string;
  highlights: string[];
  parameters: ApiParameter[];
  requestExample: string;
  responseExample: string;
  statusCodes: StatusCode[];
};

export const docsNavigation: Array<{
  id: DocsSectionId;
  label: string;
  eyebrow: string;
}> = [
  { id: "introduction", label: "Introduction", eyebrow: "Start" },
  { id: "authentication", label: "Authentication", eyebrow: "Security" },
  { id: "smart-money", label: "Smart Money API", eyebrow: "Wallets" },
  { id: "capital-flow", label: "Capital Flow API", eyebrow: "Liquidity" },
  { id: "narratives", label: "Narratives API", eyebrow: "AI Signals" },
  { id: "alerts", label: "Alerts API", eyebrow: "Monitoring" },
  { id: "wallet", label: "Wallet API", eyebrow: "Entities" },
  { id: "websocket", label: "WebSocket", eyebrow: "Streaming" },
  { id: "rate-limits", label: "Rate Limits", eyebrow: "Usage" },
  { id: "error-codes", label: "Error Codes", eyebrow: "Reference" },
];

export const apiDocsSections: ApiDocsSection[] = [
  {
    id: "introduction",
    label: "Introduction",
    category: "Platform",
    title: "Crypto intelligence primitives",
    method: "GET",
    path: "/v1/intelligence/overview",
    description:
      "Vantauu exposes normalized wallet, liquidity, narrative, and alert intelligence through mock API contracts designed for product prototyping.",
    latency: "42ms p50",
    availability: "Mock sandbox",
    highlights: [
      "Unified entities across wallet, protocol, chain, and narrative surfaces",
      "Consistent pagination and time-window filters across endpoints",
      "Developer-friendly response envelopes for dashboards and agent workflows",
    ],
    parameters: [
      {
        name: "chain",
        type: "string",
        required: false,
        description: "Filter the overview by a supported chain slug such as ethereum, base, or solana.",
      },
      {
        name: "window",
        type: "string",
        required: false,
        description: "Time range for computed metrics. Supported mock values: 1h, 24h, 7d, 30d.",
      },
      {
        name: "include",
        type: "string[]",
        required: false,
        description: "Optional sections to include, such as smart_money, flows, narratives, and alerts.",
      },
    ],
    requestExample: `curl --request GET "https://api.vantauu.dev/v1/intelligence/overview?window=24h&include=flows,narratives" \\
  --header "Authorization: Bearer vt_mock_live_alpha" \\
  --header "X-Vantauu-Workspace: ws_mock_terminal"`,
    responseExample: `{
  "data": {
    "marketRegime": "risk-on rotation",
    "smartMoneyNetFlow": 18420000,
    "dominantNarrative": "AI Agents",
    "criticalAlerts": 7,
    "coveredChains": ["ethereum", "base", "solana", "arbitrum"]
  },
  "meta": {
    "window": "24h",
    "generatedAt": "2026-05-16T18:40:00Z",
    "sandbox": true
  }
}`,
    statusCodes: [
      { code: "200", label: "OK", description: "Overview payload returned successfully." },
      { code: "400", label: "Bad Request", description: "Unsupported window, include key, or chain filter." },
      { code: "429", label: "Rate Limited", description: "Workspace exceeded the mock request budget." },
    ],
  },
  {
    id: "authentication",
    label: "Authentication",
    category: "Security",
    title: "Authenticate API requests",
    method: "GUIDE",
    path: "Authorization: Bearer <token>",
    description:
      "All mock API examples use bearer tokens and workspace headers to model a production-grade SaaS developer experience without connecting to real services.",
    latency: "Instant",
    availability: "Mock sandbox",
    highlights: [
      "Send a bearer token with every request",
      "Use workspace headers to scope dashboard and automation contexts",
      "Rotate mock keys in local UI state during prototyping",
    ],
    parameters: [
      {
        name: "Authorization",
        type: "header",
        required: true,
        description: "Bearer token using the vt_mock_live_* format in this prototype.",
      },
      {
        name: "X-Vantauu-Workspace",
        type: "header",
        required: true,
        description: "Workspace identifier used to scope mock data responses.",
      },
      {
        name: "X-Request-Id",
        type: "header",
        required: false,
        description: "Optional idempotency and tracing identifier for client observability.",
      },
    ],
    requestExample: `curl --request GET "https://api.vantauu.dev/v1/smart-money/wallets" \\
  --header "Authorization: Bearer vt_mock_live_alpha" \\
  --header "X-Vantauu-Workspace: ws_mock_terminal"`,
    responseExample: `{
  "data": {
    "authenticated": true,
    "workspace": "ws_mock_terminal",
    "scopes": ["wallets:read", "flows:read", "alerts:read"]
  },
  "meta": {
    "mode": "mock",
    "tokenExpiresIn": 86400
  }
}`,
    statusCodes: [
      { code: "200", label: "OK", description: "Credentials accepted for mock access." },
      { code: "401", label: "Unauthorized", description: "Missing or malformed bearer token." },
      { code: "403", label: "Forbidden", description: "Token does not include the required scope." },
    ],
  },
  {
    id: "smart-money",
    label: "Smart Money API",
    category: "Wallet Intelligence",
    title: "List ranked smart money wallets",
    method: "GET",
    path: "/v1/smart-money/wallets",
    description:
      "Retrieve a ranked wallet leaderboard with entity labels, chain activity, realized PnL, and recent accumulation behavior.",
    latency: "68ms p50",
    availability: "99.95% target",
    highlights: [
      "Entity labels mirror fund, whale, market maker, and protocol treasury clusters",
      "Supports chain, strategy, and minimum PnL filters",
      "Designed for leaderboard tables, wallet feeds, and agent scoring",
    ],
    parameters: [
      {
        name: "chain",
        type: "string",
        required: false,
        description: "Chain slug to filter wallet activity. Example: ethereum, base, arbitrum.",
      },
      {
        name: "strategy",
        type: "string",
        required: false,
        description: "Smart wallet segment such as accumulation, rotation, degen, or treasury.",
      },
      {
        name: "min_pnl",
        type: "number",
        required: false,
        description: "Minimum realized PnL in USD for ranked wallet inclusion.",
      },
      {
        name: "limit",
        type: "number",
        required: false,
        description: "Number of wallet rows to return. Defaults to 25.",
      },
    ],
    requestExample: `curl --request GET "https://api.vantauu.dev/v1/smart-money/wallets?chain=ethereum&strategy=accumulation&limit=25" \\
  --header "Authorization: Bearer vt_mock_live_alpha"`,
    responseExample: `{
  "data": [
    {
      "rank": 1,
      "address": "0x71f3...8ad2",
      "label": "Alpha Fund Cluster",
      "chain": "Ethereum",
      "realizedPnl": 4820000,
      "netInflow24h": 1840000,
      "confidence": 94
    },
    {
      "rank": 2,
      "address": "0x9c44...21ea",
      "label": "Base Accumulator",
      "chain": "Base",
      "realizedPnl": 3190000,
      "netInflow24h": 940000,
      "confidence": 91
    }
  ],
  "meta": {
    "limit": 25,
    "cursor": "mock_cursor_next"
  }
}`,
    statusCodes: [
      { code: "200", label: "OK", description: "Wallet leaderboard returned successfully." },
      { code: "422", label: "Invalid Filter", description: "Strategy or min_pnl filter cannot be parsed." },
      { code: "429", label: "Rate Limited", description: "Too many leaderboard requests in the current minute." },
    ],
  },
  {
    id: "capital-flow",
    label: "Capital Flow API",
    category: "Liquidity Intelligence",
    title: "Query cross-chain liquidity flows",
    method: "GET",
    path: "/v1/capital-flow/chains",
    description:
      "Return chain-level inflow, outflow, stablecoin allocation, and net liquidity velocity for professional market monitoring.",
    latency: "73ms p50",
    availability: "99.9% target",
    highlights: [
      "Aggregates bridge, protocol, and stablecoin movement into one normalized shape",
      "Works with line charts, ecosystem ranking tables, and sankey-style visuals",
      "Includes mock confidence scores for AI-driven interpretation",
    ],
    parameters: [
      {
        name: "chains",
        type: "string[]",
        required: false,
        description: "Comma-separated chain slugs. Example: ethereum,base,solana.",
      },
      {
        name: "window",
        type: "string",
        required: false,
        description: "Time range to calculate flows. Supported mock values: 1h, 24h, 7d, 30d.",
      },
      {
        name: "asset_class",
        type: "string",
        required: false,
        description: "Filter by stablecoin, native, defi, rwa, or meme liquidity buckets.",
      },
    ],
    requestExample: `curl --request GET "https://api.vantauu.dev/v1/capital-flow/chains?chains=ethereum,base,solana&window=24h" \\
  --header "Authorization: Bearer vt_mock_live_alpha"`,
    responseExample: `{
  "data": [
    {
      "chain": "Base",
      "netInflow": 12600000,
      "inflow": 28400000,
      "outflow": 15800000,
      "activeAddresses": 412000,
      "dominantAsset": "USDC"
    },
    {
      "chain": "Ethereum",
      "netInflow": 8400000,
      "inflow": 34200000,
      "outflow": 25800000,
      "activeAddresses": 693000,
      "dominantAsset": "USDT"
    }
  ],
  "meta": {
    "window": "24h",
    "currency": "USD"
  }
}`,
    statusCodes: [
      { code: "200", label: "OK", description: "Capital flow series returned successfully." },
      { code: "400", label: "Bad Request", description: "Unsupported chain or asset class." },
      { code: "503", label: "Unavailable", description: "Mock liquidity aggregator is temporarily unavailable." },
    ],
  },
  {
    id: "narratives",
    label: "Narratives API",
    category: "AI Intelligence",
    title: "Rank emerging crypto narratives",
    method: "GET",
    path: "/v1/narratives/trending",
    description:
      "Access AI-scored narrative momentum, mindshare, capital flow alignment, and social sentiment for market theme discovery.",
    latency: "81ms p50",
    availability: "Mock sandbox",
    highlights: [
      "Built for heatmaps, mindshare donuts, and momentum panels",
      "Combines social signals, liquidity movement, and wallet concentration",
      "Returns concise AI summaries for analyst workflows",
    ],
    parameters: [
      {
        name: "window",
        type: "string",
        required: false,
        description: "Time range for narrative momentum. Supported mock values: 24h, 7d, 30d.",
      },
      {
        name: "sort",
        type: "string",
        required: false,
        description: "Sort by mindshare, momentum, capital_flow, or shift.",
      },
      {
        name: "limit",
        type: "number",
        required: false,
        description: "Maximum number of narratives to return.",
      },
    ],
    requestExample: `curl --request GET "https://api.vantauu.dev/v1/narratives/trending?window=7d&sort=momentum" \\
  --header "Authorization: Bearer vt_mock_live_alpha"`,
    responseExample: `{
  "data": [
    {
      "narrative": "AI Agents",
      "mindshare": 34.6,
      "momentum": 88,
      "capitalFlow": 21600000,
      "trend7d": "+18.4%",
      "summary": "Agent infrastructure is absorbing liquidity from RWA and DeFi 2.0 rotations."
    },
    {
      "narrative": "Real World Assets",
      "mindshare": 18.2,
      "momentum": 63,
      "capitalFlow": 9400000,
      "trend7d": "+6.1%",
      "summary": "Treasury tokenization mentions remain resilient despite slower wallet accumulation."
    }
  ],
  "meta": {
    "window": "7d",
    "model": "vantauu-narrative-mock"
  }
}`,
    statusCodes: [
      { code: "200", label: "OK", description: "Narrative rankings returned successfully." },
      { code: "400", label: "Bad Request", description: "Unsupported sort or window value." },
      { code: "429", label: "Rate Limited", description: "Narrative analysis quota exceeded." },
    ],
  },
  {
    id: "alerts",
    label: "Alerts API",
    category: "Monitoring",
    title: "Fetch intelligence alerts",
    method: "GET",
    path: "/v1/alerts",
    description:
      "Return whale, smart money, liquidity, security, and narrative alerts with severity, chain metadata, and action labels.",
    latency: "39ms p50",
    availability: "99.99% target",
    highlights: [
      "Severity taxonomy aligns with the Alerts Center dashboard",
      "Supports cursor pagination for live operations panels",
      "Mock payloads are shaped for email, Slack, and webhook delivery flows",
    ],
    parameters: [
      {
        name: "severity",
        type: "string",
        required: false,
        description: "Filter by Critical, High, Medium, or Low.",
      },
      {
        name: "type",
        type: "string",
        required: false,
        description: "Alert category such as Whale Alert, Smart Money, Capital Flow, or Security Alert.",
      },
      {
        name: "cursor",
        type: "string",
        required: false,
        description: "Pagination cursor returned from the previous response.",
      },
    ],
    requestExample: `curl --request GET "https://api.vantauu.dev/v1/alerts?severity=Critical&type=Whale%20Alert" \\
  --header "Authorization: Bearer vt_mock_live_alpha"`,
    responseExample: `{
  "data": [
    {
      "id": "alt_mock_001",
      "time": "18:37:42",
      "type": "Whale Alert",
      "alert": "42.8M USDC moved from exchange reserve to Base ecosystem wallet",
      "chain": "Base",
      "severity": "Critical"
    },
    {
      "id": "alt_mock_002",
      "time": "18:31:09",
      "type": "Security Alert",
      "alert": "New admin role assigned on lending market proxy",
      "chain": "Ethereum",
      "severity": "High"
    }
  ],
  "meta": {
    "cursor": "mock_alert_cursor_next",
    "hasMore": true
  }
}`,
    statusCodes: [
      { code: "200", label: "OK", description: "Alerts returned successfully." },
      { code: "404", label: "Not Found", description: "Requested alert cursor is no longer available." },
      { code: "429", label: "Rate Limited", description: "Alert feed request budget exceeded." },
    ],
  },
  {
    id: "wallet",
    label: "Wallet API",
    category: "Entity Intelligence",
    title: "Retrieve wallet profile",
    method: "GET",
    path: "/v1/wallets/{address}",
    description:
      "Resolve a wallet into labels, holdings, risk score, cluster membership, recent flows, and AI analyst notes.",
    latency: "64ms p50",
    availability: "Mock sandbox",
    highlights: [
      "Cluster-aware wallet profiles for attribution-heavy dashboards",
      "Includes risk, activity, holdings, and realized performance slices",
      "Useful for drill-down panels launched from feeds or leaderboards",
    ],
    parameters: [
      {
        name: "address",
        type: "path",
        required: true,
        description: "Wallet address to resolve.",
      },
      {
        name: "chain",
        type: "string",
        required: false,
        description: "Optional chain context for wallet activity.",
      },
      {
        name: "include",
        type: "string[]",
        required: false,
        description: "Optional sections: holdings, flows, clusters, risk, notes.",
      },
    ],
    requestExample: `curl --request GET "https://api.vantauu.dev/v1/wallets/0x71f3...8ad2?include=holdings,flows,risk" \\
  --header "Authorization: Bearer vt_mock_live_alpha"`,
    responseExample: `{
  "data": {
    "address": "0x71f3...8ad2",
    "label": "Alpha Fund Cluster",
    "entityType": "Fund",
    "riskScore": 22,
    "confidence": 94,
    "holdings": [
      { "asset": "ETH", "value": 18400000, "allocation": 42.1 },
      { "asset": "USDC", "value": 9200000, "allocation": 21.0 }
    ],
    "notes": "Wallet is accumulating AI infrastructure assets while reducing exchange balances."
  }
}`,
    statusCodes: [
      { code: "200", label: "OK", description: "Wallet profile returned successfully." },
      { code: "404", label: "Not Found", description: "Wallet is outside the mock entity graph." },
      { code: "422", label: "Invalid Address", description: "Path parameter is not a valid wallet address." },
    ],
  },
  {
    id: "websocket",
    label: "WebSocket",
    category: "Streaming",
    title: "Subscribe to live intelligence streams",
    method: "STREAM",
    path: "wss://api.vantauu.dev/v1/stream",
    description:
      "Connect to mock streaming channels for alerts, wallet movement, capital flow, and narrative shifts.",
    latency: "Sub-second",
    availability: "Mock sandbox",
    highlights: [
      "Channel naming mirrors production streaming APIs",
      "Supports multiple subscriptions per connection",
      "Designed for live feed panels and alert automation prototypes",
    ],
    parameters: [
      {
        name: "token",
        type: "string",
        required: true,
        description: "Bearer token sent in the first subscription message.",
      },
      {
        name: "channels",
        type: "string[]",
        required: true,
        description: "Streaming channels such as alerts.critical, smart-money.moves, or narratives.shift.",
      },
      {
        name: "heartbeat",
        type: "number",
        required: false,
        description: "Client heartbeat interval in seconds. Defaults to 30.",
      },
    ],
    requestExample: `const socket = new WebSocket("wss://api.vantauu.dev/v1/stream");

socket.addEventListener("open", () => {
  socket.send(JSON.stringify({
    type: "subscribe",
    token: "vt_mock_live_alpha",
    channels: ["alerts.critical", "capital-flow.ethereum"]
  }));
});`,
    responseExample: `{
  "type": "event",
  "channel": "alerts.critical",
  "data": {
    "id": "evt_mock_9821",
    "severity": "Critical",
    "title": "Exchange reserve outflow spike",
    "chain": "Ethereum",
    "observedAt": "2026-05-16T18:41:12Z"
  }
}`,
    statusCodes: [
      { code: "101", label: "Switching Protocols", description: "WebSocket connection accepted." },
      { code: "4401", label: "Unauthorized", description: "Subscription token is invalid or missing." },
      { code: "4429", label: "Rate Limited", description: "Too many stream channels requested." },
    ],
  },
  {
    id: "rate-limits",
    label: "Rate Limits",
    category: "Usage",
    title: "Understand request budgets",
    method: "REF",
    path: "X-RateLimit-*",
    description:
      "Mock limits help product teams design quota states, retry flows, and enterprise usage dashboards before integrating real infrastructure.",
    latency: "N/A",
    availability: "Mock sandbox",
    highlights: [
      "Every response includes request budget metadata",
      "Streaming channels have independent subscription limits",
      "Retry guidance is encoded with Retry-After where relevant",
    ],
    parameters: [
      {
        name: "X-RateLimit-Limit",
        type: "header",
        required: false,
        description: "Total requests available in the current mock window.",
      },
      {
        name: "X-RateLimit-Remaining",
        type: "header",
        required: false,
        description: "Requests remaining before throttling begins.",
      },
      {
        name: "Retry-After",
        type: "header",
        required: false,
        description: "Seconds to wait before retrying after a 429 response.",
      },
    ],
    requestExample: `curl --request GET "https://api.vantauu.dev/v1/alerts" \\
  --header "Authorization: Bearer vt_mock_live_alpha"`,
    responseExample: `HTTP/1.1 200 OK
X-RateLimit-Limit: 1200
X-RateLimit-Remaining: 1184
X-RateLimit-Reset: 2026-05-16T19:00:00Z

{
  "data": [],
  "meta": {
    "rateLimit": {
      "limit": 1200,
      "remaining": 1184,
      "resetAt": "2026-05-16T19:00:00Z"
    }
  }
}`,
    statusCodes: [
      { code: "200", label: "OK", description: "Request completed within quota." },
      { code: "429", label: "Rate Limited", description: "Workspace request quota has been exceeded." },
      { code: "503", label: "Unavailable", description: "Mock quota service is temporarily unavailable." },
    ],
  },
  {
    id: "error-codes",
    label: "Error Codes",
    category: "Reference",
    title: "Handle API errors",
    method: "REF",
    path: "error.code",
    description:
      "Vantauu mock errors use a predictable envelope so UI states can render actionable messages, retry guidance, and escalation paths.",
    latency: "N/A",
    availability: "Mock sandbox",
    highlights: [
      "Every error includes code, message, requestId, and documentation key",
      "Validation errors include field-level context",
      "Operational errors include retryable hints",
    ],
    parameters: [
      {
        name: "code",
        type: "string",
        required: true,
        description: "Machine-readable error code such as invalid_filter or rate_limited.",
      },
      {
        name: "message",
        type: "string",
        required: true,
        description: "Short developer-facing explanation.",
      },
      {
        name: "requestId",
        type: "string",
        required: true,
        description: "Trace id for observability and support workflows.",
      },
    ],
    requestExample: `curl --request GET "https://api.vantauu.dev/v1/capital-flow/chains?window=forever" \\
  --header "Authorization: Bearer vt_mock_live_alpha"`,
    responseExample: `{
  "error": {
    "code": "invalid_window",
    "message": "The requested window is not supported in the mock API.",
    "field": "window",
    "requestId": "req_mock_8f42a",
    "docs": "https://docs.vantauu.dev/errors/invalid_window"
  }
}`,
    statusCodes: [
      { code: "400", label: "Bad Request", description: "Request syntax or query parameters are invalid." },
      { code: "401", label: "Unauthorized", description: "Authentication header is missing or invalid." },
      { code: "422", label: "Unprocessable Entity", description: "The request is valid JSON but fails business validation." },
      { code: "500", label: "Internal Error", description: "Unexpected mock service failure." },
    ],
  },
];
