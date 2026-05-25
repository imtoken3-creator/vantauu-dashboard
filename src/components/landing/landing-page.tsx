"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleDollarSign,
  DatabaseZap,
  Layers3,
  LineChart,
  Network,
  RadioTower,
  ShieldCheck,
  Sparkles,
  WalletCards,
  Zap,
} from "lucide-react";

import { useLiveIntelligence } from "@/hooks/use-live-intelligence";
import { foundingLeadershipRoles } from "@/data/founding-roles";
import { SignalMark } from "@/components/brand/signal-mark";
import { MarketingMobileMenu } from "@/components/layout/marketing-mobile-menu";
import { LazyRender } from "@/components/ui/lazy-render";
import {
  formatNumber,
  formatPercent,
  formatUsd,
  shortAddress,
  type LiveIntelligenceData,
} from "@/lib/live-intelligence";
import { footerContactChannels, mailto } from "@/lib/contact-channels";
import { WaitlistModal } from "@/components/waitlist/waitlist-modal";

const fadeUp = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {},
};

const ecosystem = [
  "Ethereum",
  "Base",
  "Solana",
  "Arbitrum",
  "Optimism",
  "Farcaster",
  "EigenLayer",
  "Uniswap",
];

type FeatureVisual =
  | "smart-money"
  | "capital-flow"
  | "narratives"
  | "clustering"
  | "signals";

const features = [
  {
    icon: WalletCards,
    title: "Smart Money Tracking",
    description:
      "Identify wallets accumulating early, rotating liquidity, and influencing market structure before consensus appears.",
    visual: "smart-money" as FeatureVisual,
    span: "xl:col-span-2",
  },
  {
    icon: CircleDollarSign,
    title: "Capital Flow Intelligence",
    description:
      "Map liquidity movement across chains, stablecoins, bridges, protocols, and token ecosystems in real time.",
    visual: "capital-flow" as FeatureVisual,
    span: "xl:col-span-2",
  },
  {
    icon: RadioTower,
    title: "Narrative Detection",
    description:
      "Detect emerging market themes with AI-scored momentum across wallet behavior, liquidity, and social signals.",
    visual: "narratives" as FeatureVisual,
    span: "xl:col-span-2",
  },
  {
    icon: Network,
    title: "Wallet Clustering",
    description:
      "Resolve related wallets into behavior clusters for funds, whales, treasuries, builders, and high-conviction cohorts.",
    visual: "clustering" as FeatureVisual,
    span: "xl:col-span-3",
  },
  {
    icon: DatabaseZap,
    title: "AI Signal Engine",
    description:
      "Turn noisy on-chain events into ranked alerts with severity, confidence, context, and recommended next actions.",
    visual: "signals" as FeatureVisual,
    span: "md:col-span-2 xl:col-span-3",
  },
];

const whyItems = [
  {
    title: "From raw transactions to intent",
    description:
      "Traditional tools show what happened. Vantauu scores what the behavior implies for capital rotation.",
  },
  {
    title: "One intelligence layer",
    description:
      "Wallets, flows, narratives, and alerts are fused into one operating surface for analysts and AI workflows.",
  },
  {
    title: "Built for real-time decisions",
    description:
      "Signals are ranked by impact, confidence, and market context so teams can move faster with less noise.",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$99",
    unit: "/mo",
    description: "For individual analysts and early-stage research desks.",
    usage: "1 seat included",
    cta: "Start analyzing",
    features: [
      "Smart money watchlists",
      "Capital flow dashboards",
      "Narrative trend feed",
      "Daily alert digest",
    ],
  },
  {
    name: "Pro",
    price: "$499",
    unit: "/mo",
    description: "For funds, trading teams, and advanced intelligence workflows.",
    usage: "5 seats included",
    cta: "Launch Pro",
    features: [
      "AI signal engine",
      "Wallet clustering",
      "Priority real-time alerts",
      "API docs access",
      "Advanced narrative intelligence",
    ],
    featured: true,
  },
  {
    name: "Institutional",
    price: "$2,499",
    unit: "/mo",
    description: "For enterprise crypto teams needing deeper coverage and support.",
    usage: "Unlimited seats",
    cta: "Book demo",
    features: [
      "Custom data coverage",
      "Dedicated workflows",
      "Private signal models",
      "Team onboarding",
      "Priority support",
    ],
  },
];

const pricingComparison = [
  {
    feature: "Smart money tracking",
    starter: "Watchlists",
    pro: "Cohorts + alerts",
    institutional: "Custom entities",
  },
  {
    feature: "Capital flow intelligence",
    starter: "Dashboard",
    pro: "Multi-chain models",
    institutional: "Custom coverage",
  },
  {
    feature: "Narrative detection",
    starter: "Trend feed",
    pro: "AI momentum scoring",
    institutional: "Private models",
  },
  {
    feature: "Alerting",
    starter: "Daily digest",
    pro: "Real-time alerts",
    institutional: "Custom routing",
  },
  {
    feature: "API access",
    starter: "Not included",
    pro: "Included",
    institutional: "Enterprise limits",
  },
];

const footerLinks = [
  { label: "Product", href: "/dashboard" },
  { label: "Docs", href: "/docs" },
  { label: "About", href: "/about" },
  { label: "Leadership", href: "/founding-leadership" },
  { label: "Contact", href: mailto.general("General Inquiry") },
  { label: "Partnerships", href: mailto.partnerships("Partnership Inquiry") },
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
];

const faqs = [
  {
    question: "Is Vantauu a trading platform?",
    answer:
      "No. Vantauu is an intelligence layer for research, monitoring, and decision support across on-chain markets.",
  },
  {
    question: "Does the dashboard use live production data?",
    answer:
      "The market and DeFi layers connect through server-side API routes, with safe fallback data when providers are unavailable.",
  },
  {
    question: "Who is Vantauu built for?",
    answer:
      "Crypto funds, analysts, AI agents, market makers, protocol teams, and research desks that monitor capital behavior.",
  },
  {
    question: "Can teams build on top of the API?",
    answer:
      "Yes. The current docs page models API contracts for smart money, capital flow, narratives, alerts, wallets, and streams.",
  },
];

export function LandingPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistSource, setWaitlistSource] = useState("landing");
  const {
    data: liveData,
    isLoading: isLiveLoading,
    error: liveError,
  } = useLiveIntelligence(undefined, { refreshMs: false });
  const openWaitlist = (source: string) => {
    setWaitlistSource(source);
    setWaitlistOpen(true);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <LandingNav onRequestAccess={() => openWaitlist("nav")} />
      <main id="main-content">
        <HeroSection
          liveData={liveData}
          isLiveLoading={isLiveLoading}
          liveError={liveError}
          onRequestAccess={() => openWaitlist("hero")}
        />
        <EcosystemSection />
        <LazyRender id="features" minHeight={840}>
          <FeaturesSection />
        </LazyRender>
        <LazyRender id="preview" minHeight={960}>
          <DashboardPreviewSection
            liveData={liveData}
            isLiveLoading={isLiveLoading}
            liveError={liveError}
          />
        </LazyRender>
        <LazyRender minHeight={420}>
          <WhySection />
        </LazyRender>
        <LazyRender id="pricing" minHeight={900}>
          <PricingSection onRequestAccess={() => openWaitlist("pricing")} />
        </LazyRender>
        <LazyRender id="faq" minHeight={560}>
          <FaqSection />
        </LazyRender>
        <LazyRender id="careers" minHeight={780}>
          <CareersSection />
        </LazyRender>
      </main>
      <Footer />
      <WaitlistModal
        open={waitlistOpen}
        onOpenChange={setWaitlistOpen}
        source={waitlistSource}
      />
    </div>
  );
}

function findAsset(data: LiveIntelligenceData, id: "bitcoin" | "ethereum") {
  return data.market.assets.find((asset) => asset.id === id);
}

function liveStatusLabel(isLoading: boolean, error: string | null) {
  if (isLoading) {
    return "Syncing";
  }

  return error ? "Partial live" : "Live data";
}

function liveHeroStats(data: LiveIntelligenceData, isLoading: boolean) {
  const btc = findAsset(data, "bitcoin");
  const eth = findAsset(data, "ethereum");

  if (isLoading) {
    return [
      ["BTC", "Loading"],
      ["ETH", "Loading"],
      ["Market cap", "Loading"],
    ];
  }

  return [
    ["BTC", formatUsd(btc?.priceUsd)],
    ["ETH", formatUsd(eth?.priceUsd)],
    ["Market cap", formatUsd(data.market.totalMarketCapUsd)],
  ];
}

function livePreviewMetrics(data: LiveIntelligenceData, isLoading: boolean) {
  const btc = findAsset(data, "bitcoin");
  const eth = findAsset(data, "ethereum");
  const topChain = data.defi.chains[0];
  const topTrend = data.market.trending[0];

  if (isLoading) {
    return [
      ["BTC Price", "Loading", "Sync"],
      ["ETH Market Cap", "Loading", "Sync"],
      ["Top Chain TVL", "Loading", "Sync"],
      ["Trending", "Loading", "Sync"],
    ];
  }

  return [
    ["BTC Price", formatUsd(btc?.priceUsd), formatPercent(btc?.change24h)],
    ["ETH Market Cap", formatUsd(eth?.marketCapUsd), formatPercent(eth?.change24h)],
    ["Top Chain TVL", formatUsd(topChain?.tvlUsd), formatPercent(topChain?.change7d)],
    [
      "Trending",
      topTrend?.symbol || "AI",
      topTrend?.marketCapRank ? `#${topTrend.marketCapRank}` : "Live",
    ],
  ];
}

function liveSignalRows(data: LiveIntelligenceData, isLoading: boolean) {
  const btc = findAsset(data, "bitcoin");
  const topChain = data.defi.chains[0];
  const trending = data.market.trending[0];
  const walletCount =
    data.wallet.tokenTransfers.length || data.wallet.transactions.length;

  if (isLoading) {
    return [
      ["Loading market feed", "Sync", "CoinGecko", "78"],
      ["Loading DeFi feed", "Sync", "DefiLlama", "76"],
      ["Loading wallet feed", "Sync", "Etherscan", "72"],
      ["Preparing fallback layer", "Safe", "Vantauu", "68"],
    ];
  }

  const btcChange = btc?.change24h ?? 0;
  const tvlChange = topChain?.change7d ?? 0;

  return [
    [
      "BTC market momentum",
      Math.abs(btcChange) > 3 ? "High" : "Signal",
      `${formatUsd(btc?.priceUsd)} / ${formatPercent(btc?.change24h)}`,
      String(Math.min(96, Math.max(62, Math.round(72 + Math.abs(btcChange) * 6)))),
    ],
    [
      `${topChain?.name ?? "DeFi"} TVL rotation`,
      tvlChange > 0 ? "Bullish" : "Watch",
      `${formatUsd(topChain?.tvlUsd)} TVL`,
      String(Math.min(94, Math.max(58, Math.round(70 + Math.abs(tvlChange) * 4)))),
    ],
    [
      `${trending?.symbol || "AI"} search momentum`,
      "Trend",
      trending?.name || "CoinGecko trending",
      trending?.marketCapRank
        ? String(Math.min(92, Math.max(64, 100 - trending.marketCapRank / 8)))
        : "82",
    ],
    [
      "Wallet activity monitor",
      data.wallet.enabled ? "Live" : "Fallback",
      data.wallet.enabled ? `${walletCount} recent events` : "Etherscan key required",
      data.wallet.enabled ? "78" : "66",
    ],
  ];
}

function liveWalletRows(data: LiveIntelligenceData, isLoading: boolean) {
  if (isLoading) {
    return [
      ["Wallet feed", "Loading", "Sync"],
      ["Token transfers", "Loading", "Sync"],
      ["Transaction history", "Loading", "Sync"],
      ["Fallback layer", "Ready", "Safe"],
    ];
  }

  const tokenRows = data.wallet.tokenTransfers.slice(0, 4).map((transfer) => [
    shortAddress(transfer.from),
    `${formatNumber(transfer.value)} ${transfer.tokenSymbol}`,
    "Transfer",
  ]);

  const txRows = data.wallet.transactions.slice(0, 4).map((tx) => [
    shortAddress(tx.from),
    `${tx.valueEth.toFixed(3)} ETH`,
    "Tx",
  ]);

  const liveRows = tokenRows.length > 0 ? tokenRows : txRows;

  return liveRows.length > 0
    ? liveRows
    : [
        ["Etherscan wallet feed", "API key", "Required"],
        ["CoinGecko market layer", "Active", "Live"],
        ["DefiLlama TVL layer", "Active", "Live"],
        ["Fallback resilience", "Ready", "Safe"],
      ];
}

function liveHeatmapThemes(data: LiveIntelligenceData) {
  const themes = data.market.trending
    .slice(0, 4)
    .map((item) => item.symbol || item.name)
    .filter(Boolean);

  return themes.length >= 4
    ? themes
    : ["AI Agents", "RWA", "DeFi 2.0", "Layer 2"];
}

function LandingNav({ onRequestAccess }: { onRequestAccess: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg border border-primary/35 bg-primary/15 text-primary shadow-lg shadow-primary/20">
            <SignalMark className="size-5" />
          </span>
          <span>
            <span className="block text-sm font-semibold uppercase tracking-[0.24em] text-white">
              Vantauu
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              AI On-chain Intelligence
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link className="transition hover:text-white" href="/about">
            About
          </Link>
          <Link className="transition hover:text-white" href="/founding-leadership">
            Leadership
          </Link>
          <a className="transition hover:text-white" href="#features">
            Features
          </a>
          <a className="transition hover:text-white" href="#preview">
            Preview
          </a>
          <a className="transition hover:text-white" href="#pricing">
            Pricing
          </a>
          <a className="transition hover:text-white" href="#faq">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRequestAccess}
            className="group hidden h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.055] px-4 text-sm font-medium text-white shadow-xl shadow-black/20 backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary/10 md:inline-flex"
          >
            Request Access
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </button>
          <MarketingMobileMenu
            links={[
              { label: "About", href: "/about" },
              { label: "Leadership", href: "/founding-leadership" },
              { label: "Features", href: "#features" },
              { label: "Preview", href: "#preview" },
              { label: "Pricing", href: "#pricing" },
              { label: "FAQ", href: "#faq" },
              { label: "Dashboard", href: "/dashboard" },
            ]}
            cta={{ label: "Request Access", onClick: onRequestAccess }}
          />
        </div>
      </div>
    </header>
  );
}

function HeroSection({
  liveData,
  isLiveLoading,
  liveError,
  onRequestAccess,
}: {
  liveData: LiveIntelligenceData;
  isLiveLoading: boolean;
  liveError: string | null;
  onRequestAccess: () => void;
}) {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:min-h-[calc(100svh-2rem)] lg:px-8 lg:pb-28">
      <div className="absolute inset-0 animated-grid bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-45 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      <div className="cinematic-gradient absolute inset-0 opacity-55" />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(56,189,248,0.13),transparent_34%),linear-gradient(245deg,rgba(124,140,255,0.14),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_18rem)]" />
      <div className="absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="absolute -right-24 top-40 h-px w-[48rem] -rotate-12 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent blur-md" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-background" />

      <div className="relative mx-auto grid min-h-[calc(100svh-13rem)] max-w-[1440px] items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)] lg:gap-20 xl:gap-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-[720px] lg:py-20 xl:max-w-[800px]"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-primary shadow-lg shadow-primary/10 backdrop-blur-xl"
          >
            <Sparkles className="size-3.5" />
            AI-native crypto intelligence
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-[800px] text-5xl font-semibold leading-[1.03] tracking-tight text-white sm:text-7xl lg:text-[clamp(4.65rem,6.15vw,6.95rem)] xl:max-w-[860px]"
          >
            <span className="block text-balance">Detect capital intent</span>
            <span className="block text-balance">before markets move.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-[620px] text-base leading-7 text-slate-300 sm:text-lg"
          >
            Vantauu is an AI-powered on-chain intelligence platform for
            tracking smart money, capital flow, narratives, and market signals
            in real time.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/dashboard"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-primary/40 bg-[linear-gradient(135deg,rgba(124,140,255,0.95),rgba(56,189,248,0.84))] px-5 text-sm font-medium text-white shadow-xl shadow-primary/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-primary/30"
            >
              <Zap className="size-4" />
              Launch Dashboard
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={onRequestAccess}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/[0.055] px-5 text-sm font-medium text-white shadow-xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-white/[0.085]"
            >
              Request Access
              <ChevronRight className="size-4 text-cyan-200 transition group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </motion.div>

        <HeroIntelligenceScene
          liveData={liveData}
          isLiveLoading={isLiveLoading}
          liveError={liveError}
        />
      </div>
    </section>
  );
}

function HeroIntelligenceScene({
  liveData,
  isLiveLoading,
  liveError,
}: {
  liveData: LiveIntelligenceData;
  isLiveLoading: boolean;
  liveError: string | null;
}) {
  const stats = liveHeroStats(liveData, isLiveLoading);
  const topChain = liveData.defi.chains[0];
  const trending = liveData.market.trending[0];
  const walletEvents =
    liveData.wallet.tokenTransfers.length || liveData.wallet.transactions.length;

  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-0 mx-auto mt-4 w-full max-w-[620px] sm:mt-8 lg:mx-0 lg:mt-0 lg:max-w-[700px] lg:translate-x-8 lg:translate-y-16 xl:translate-x-12 xl:translate-y-24"
    >
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/35 p-3 shadow-xl shadow-primary/15 backdrop-blur-xl sm:p-4">
        <div className="absolute inset-0 cyber-grid animated-grid opacity-25" />
        <div className="cinematic-gradient absolute inset-0 opacity-35" />
        <div className="scan-line" />
        <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-primary">
              Intelligence terminal
            </p>
            <p className="mt-1 text-sm font-medium text-white">
              Live market signal model
            </p>
          </div>
          <span className="live-shimmer inline-flex items-center gap-2 rounded-md border border-emerald-300/20 bg-emerald-300/10 px-2 py-1 text-xs text-emerald-200">
            <span className="ai-signal-pulse" />
            {liveStatusLabel(isLiveLoading, liveError)}
          </span>
        </div>

        <div className="relative mt-4 grid gap-3">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {stats.map(([label, value]) => (
              <div key={label} className="surface-card p-3">
                <p className="text-[0.68rem] text-muted-foreground sm:text-xs">
                  {label}
                </p>
                <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-lg border border-white/10 bg-black/25 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-white">Capital pulse</p>
                <LineChart className="size-4 text-primary" />
              </div>
              <div className="flex h-32 items-end gap-2 sm:h-36">
                {[42, 56, 48, 68, 62, 78, 74, 88, 82, 96, 91, 100].map(
                  (height, index) => (
                    <span
                      key={`${height}-${index}`}
                      className="live-data-bar flex-1 rounded-sm bg-gradient-to-t from-primary/20 to-cyan-200/80"
                      style={{ height: `${height}%` }}
                    />
                  )
                )}
              </div>
            </div>

            <div className="space-y-3">
              {[
                [
                  trending?.name || "Trending market",
                  trending?.marketCapRank ? `#${trending.marketCapRank}` : "Live",
                  "CoinGecko trend",
                ],
                [
                  topChain?.name || "Top chain",
                  formatUsd(topChain?.tvlUsd),
                  "DefiLlama TVL",
                ],
                [
                  shortAddress(liveData.wallet.address),
                  liveData.wallet.enabled ? String(walletEvents) : "API key",
                  "Etherscan feed",
                ],
              ].map(([name, value, label]) => (
                <div
                  key={name}
                  className="surface-card p-3"
                >
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-medium text-white">
                      {name}
                    </p>
                    <span className="text-sm font-semibold text-primary">
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EcosystemSection() {
  return (
    <MotionSection className="border-y border-white/10 bg-white/[0.025]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="section-eyebrow">Ecosystem Coverage</p>
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Built for the markets where crypto intelligence moves fastest.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:min-w-[560px]">
            {ecosystem.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-white/10 bg-white/[0.045] px-3 py-2 text-center text-sm font-medium text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:text-white"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function FeaturesSection() {
  return (
    <MotionSection>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="AI Intelligence Features"
          title="One command layer for on-chain market intelligence."
          description="Vantauu combines wallet behavior, liquidity movement, narrative velocity, and alerting into an AI-native research workflow."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
          {features.map((feature) => (
            <motion.article
              key={feature.title}
              variants={fadeUp}
              className={`metric-card group flex min-h-[360px] flex-col p-0 ${feature.span}`}
            >
              <FeatureMiniVisual type={feature.visual} />
              <div className="flex flex-1 flex-col p-5">
                <div className="icon-tile mb-5 w-fit">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function FeatureMiniVisual({ type }: { type: FeatureVisual }) {
  return (
    <div className="relative h-44 overflow-hidden border-b border-white/10 bg-black/20">
      <div className="absolute inset-0 cyber-grid opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,0.18),transparent_24rem),radial-gradient(circle_at_80%_30%,rgba(124,140,255,0.16),transparent_22rem)]" />
      <div className="relative h-full p-4">
        {type === "smart-money" && <SmartMoneyVisual />}
        {type === "capital-flow" && <CapitalFlowVisual />}
        {type === "narratives" && <NarrativeVisual />}
        {type === "clustering" && <ClusterVisual />}
        {type === "signals" && <SignalVisual />}
      </div>
    </div>
  );
}

function SmartMoneyVisual() {
  return (
    <div className="grid h-full gap-2">
      {[
        ["0x71f3...8ad2", "94", "w-[92%]"],
        ["0x9c44...21ea", "88", "w-[78%]"],
        ["0x5ab1...c903", "81", "w-[64%]"],
      ].map(([wallet, score, width]) => (
        <div
          key={wallet}
          className="rounded-lg border border-white/10 bg-white/[0.045] p-3 transition duration-300 group-hover:border-primary/25 group-hover:bg-white/[0.065]"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-xs text-slate-300">{wallet}</span>
            <span className="live-shimmer rounded-md border border-emerald-300/20 bg-emerald-300/10 px-2 py-0.5 text-xs text-emerald-200">
              {score}
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className={`live-data-bar h-full rounded-full bg-gradient-to-r from-cyan-300 via-primary to-violet-400 ${width}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function CapitalFlowVisual() {
  return (
    <div className="flex h-full items-end gap-2 rounded-lg border border-white/10 bg-black/15 p-3">
      {[44, 58, 51, 72, 66, 88, 76, 96, 84, 100].map((height, index) => (
        <div key={`${height}-${index}`} className="flex flex-1 flex-col justify-end gap-1">
          <span
            className="live-data-bar rounded-sm bg-gradient-to-t from-primary/25 to-cyan-200/80 shadow-[0_0_18px_rgba(125,211,252,0.18)] transition duration-300 group-hover:to-cyan-100"
            style={{ height: `${height}%` }}
          />
          <span className="h-1 rounded-full bg-white/10" />
        </div>
      ))}
    </div>
  );
}

function NarrativeVisual() {
  return (
    <div className="grid h-full grid-cols-7 gap-1.5">
      {[
        42, 51, 63, 72, 84, 76, 91,
        28, 34, 48, 56, 62, 71, 79,
        18, 24, 39, 44, 52, 58, 64,
        35, 31, 45, 61, 74, 69, 82,
      ].map((value, index) => (
        <div
          key={`${value}-${index}`}
          className="rounded-md border border-white/10 transition duration-300 group-hover:-translate-y-0.5 group-hover:border-white/20"
          style={{
            background: `linear-gradient(135deg, rgba(56,189,248,${0.08 + value / 260}), rgba(124,140,255,${0.12 + value / 210}), rgba(168,85,247,${0.08 + value / 320}))`,
            boxShadow: `0 0 ${Math.round(value / 4)}px rgba(124,140,255,${value / 420})`,
          }}
        />
      ))}
    </div>
  );
}

function ClusterVisual() {
  return (
    <div className="relative h-full overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_center,rgba(124,140,255,0.18),transparent_58%)]">
      <div className="absolute inset-0 animated-grid bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-primary/40 bg-primary/20 p-3 text-primary shadow-xl shadow-primary/20 transition duration-300 group-hover:scale-105">
        <BrainCircuit className="size-8" />
      </div>
      <div className="absolute left-[16%] right-[16%] top-1/2 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute bottom-[24%] left-[28%] right-[12%] h-px rotate-12 bg-gradient-to-r from-cyan-300/0 via-cyan-300/50 to-transparent" />
      <div className="absolute left-[22%] top-[18%] h-[60%] w-px rotate-[-24deg] bg-gradient-to-b from-transparent via-violet-300/45 to-transparent" />
      {[
        "left-[12%] top-[18%]",
        "left-[42%] top-[12%]",
        "left-[76%] top-[24%]",
        "left-[22%] top-[58%]",
        "left-[62%] top-[54%]",
        "left-[84%] top-[70%]",
        "left-[40%] top-[78%]",
      ].map((position, index) => (
        <span
          key={position}
          className={`absolute ${position} size-3 rounded-full border border-white/40 bg-white shadow-[0_0_22px_rgba(124,140,255,0.72)]`}
          style={{ opacity: 0.62 + index * 0.04 }}
        />
      ))}
    </div>
  );
}

function SignalVisual() {
  return (
    <div className="grid h-full gap-2 sm:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-lg border border-white/10 bg-black/15 p-3">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium text-white">Signal rank</span>
          <span className="ai-signal-pulse bg-cyan-300" />
        </div>
        {[92, 78, 64].map((score, index) => (
          <div key={score} className="mb-2 last:mb-0">
            <div className="flex items-center justify-between text-[0.68rem] text-muted-foreground">
              <span>{["Whale", "Flow", "Narrative"][index]}</span>
              <span>{score}</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="live-data-bar h-full rounded-full bg-gradient-to-r from-cyan-300 via-primary to-violet-400"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {["Critical", "High", "Watch"].map((label, index) => (
          <div
            key={label}
            className="rounded-lg border border-white/10 bg-white/[0.045] p-3 transition duration-300 group-hover:border-primary/25"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-white">{label}</span>
              <span
                className={`size-2 rounded-full ${
                  index === 0
                    ? "bg-rose-300 shadow-[0_0_12px_rgba(251,113,133,0.8)]"
                    : index === 1
                      ? "bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,0.75)]"
                      : "bg-cyan-300 shadow-[0_0_12px_rgba(125,211,252,0.75)]"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardPreviewSection({
  liveData,
  isLiveLoading,
  liveError,
}: {
  liveData: LiveIntelligenceData;
  isLiveLoading: boolean;
  liveError: string | null;
}) {
  return (
    <MotionSection className="relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="mx-auto max-w-[1500px] px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Live Dashboard Preview"
          title="A professional cockpit for crypto decision loops."
          description="The dashboard experience is optimized for repeated scanning, comparison, and fast investigation."
        />

        <motion.div
          variants={fadeUp}
          className="relative mt-12"
        >
          <DashboardMockup
            liveData={liveData}
            isLiveLoading={isLiveLoading}
            liveError={liveError}
          />
          <FloatingSignalPanel liveData={liveData} isLiveLoading={isLiveLoading} />
          <FloatingWalletPanel liveData={liveData} />
        </motion.div>
      </div>
    </MotionSection>
  );
}

function DashboardMockup({
  liveData,
  isLiveLoading,
  liveError,
}: {
  liveData: LiveIntelligenceData;
  isLiveLoading: boolean;
  liveError: string | null;
}) {
  const metrics = livePreviewMetrics(liveData, isLiveLoading);

  return (
    <div className="glow-border relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-3 shadow-xl shadow-black/30 backdrop-blur-xl sm:p-4">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(56,189,248,0.08),transparent_38%),linear-gradient(245deg,rgba(124,140,255,0.08),transparent_42%)]" />
      <div className="cinematic-gradient absolute inset-0 opacity-25" />
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-background/[0.92]">
        <div className="scan-line" />
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-rose-300/80" />
            <span className="size-2.5 rounded-full bg-amber-300/80" />
            <span className="size-2.5 rounded-full bg-emerald-300/80" />
          </div>
          <div className="hidden items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-muted-foreground sm:flex">
            <BrainCircuit className="size-3.5 text-primary" />
            Vantauu Intelligence Console
          </div>
        </div>

        <div className="grid min-h-[720px] lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden border-r border-white/10 bg-white/[0.035] p-4 lg:block">
            <div className="mb-8 flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                <SignalMark className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Vantauu</p>
                <p className="text-xs text-muted-foreground">Signal OS</p>
              </div>
            </div>
            <div className="space-y-2">
              {["Dashboard", "Smart Money", "Capital Flow", "Narratives", "Alerts"].map(
                (item, index) => (
                  <div
                    key={item}
                    className={`rounded-lg border px-3 py-2 text-sm ${
                      index === 0
                        ? "border-primary/25 bg-primary/10 text-white"
                        : "border-transparent text-muted-foreground"
                    }`}
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </aside>

          <div className="relative overflow-hidden p-4 sm:p-6">
            <div className="absolute inset-0 cyber-grid opacity-15" />
            <div className="relative">
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="section-eyebrow">Signal Overview</p>
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    Capital intent monitor
                  </h3>
                </div>
                <span className="live-shimmer inline-flex w-fit items-center gap-2 rounded-md border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">
                  <span className="ai-signal-pulse" />
                  {liveStatusLabel(isLiveLoading, liveError)}
                </span>
              </div>

              <div className="grid gap-3 md:grid-cols-4">
                {metrics.map(([label, value, delta]) => (
                  <div key={label} className="surface-card live-shimmer group">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="mt-3 text-2xl font-semibold text-white">
                      {value}
                    </p>
                    <p
                      className={`mt-2 text-xs ${
                        delta.startsWith("-") ? "text-rose-200" : "text-emerald-300"
                      }`}
                    >
                      {delta}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
                <CapitalFlowPreview liveData={liveData} />
                <AISignalFeedPreview
                  liveData={liveData}
                  isLiveLoading={isLiveLoading}
                />
              </div>

              <div className="mt-4 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                <SmartMoneyActivityPreview
                  liveData={liveData}
                  isLiveLoading={isLiveLoading}
                />
                <NarrativeHeatmapPreview liveData={liveData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CapitalFlowPreview({ liveData }: { liveData: LiveIntelligenceData }) {
  const chains = liveData.defi.chains.slice(0, 4).map((chain) => chain.name);
  const legend = chains.length > 0 ? chains : ["Base", "Ethereum", "Solana", "Arbitrum"];

  return (
    <div className="rounded-lg border border-white/10 bg-black/15 p-4 shadow-inner shadow-white/[0.03]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white">Capital flow chart</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Cross-chain liquidity momentum
          </p>
        </div>
        <Layers3 className="size-4 text-primary" />
      </div>
      <div className="relative h-72 overflow-hidden rounded-lg border border-white/[0.07] bg-black/15 p-4">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:42px_42px] opacity-45" />
        <svg viewBox="0 0 640 260" className="relative h-full w-full">
          <defs>
            <filter id="landingFlowGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="landingFlowFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#7c8cff" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#7c8cff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 0 198 C 62 174, 98 120, 154 136 S 242 218, 310 166 S 410 78, 488 104 S 570 138, 640 52 L 640 260 L 0 260 Z"
            fill="url(#landingFlowFill)"
          />
          <path
            d="M 0 198 C 62 174, 98 120, 154 136 S 242 218, 310 166 S 410 78, 488 104 S 570 138, 640 52"
            fill="none"
            filter="url(#landingFlowGlow)"
            stroke="#7c8cff"
            strokeLinecap="round"
            strokeWidth="5"
          />
          <path
            d="M 0 214 C 82 188, 118 196, 178 168 S 282 106, 346 126 S 462 202, 522 156 S 590 96, 640 116"
            fill="none"
            stroke="#38bdf8"
            strokeLinecap="round"
            strokeOpacity="0.78"
            strokeWidth="3"
          />
          <path
            d="M 0 232 C 78 216, 134 228, 194 198 S 302 172, 370 186 S 472 120, 536 138 S 596 166, 640 142"
            fill="none"
            stroke="#34d399"
            strokeLinecap="round"
            strokeOpacity="0.66"
            strokeWidth="3"
          />
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {legend.map((chain, index) => (
          <span
            key={chain}
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300"
          >
            <span
              className={`size-2 rounded-full ${
                index === 0
                  ? "bg-primary"
                  : index === 1
                    ? "bg-cyan-300"
                    : index === 2
                      ? "bg-emerald-300"
                      : "bg-violet-400"
              }`}
            />
            {chain}
          </span>
        ))}
      </div>
    </div>
  );
}

function AISignalFeedPreview({
  liveData,
  isLiveLoading,
}: {
  liveData: LiveIntelligenceData;
  isLiveLoading: boolean;
}) {
  const signals = liveSignalRows(liveData, isLiveLoading);

  return (
    <div className="rounded-lg border border-white/10 bg-black/15 p-4 shadow-inner shadow-white/[0.03]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white">AI signal feed</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Ranked by impact and confidence
          </p>
        </div>
        <Sparkles className="size-4 text-primary" />
      </div>
      <div className="space-y-3">
        {signals.map(([title, severity, source, score], index) => (
          <div
            key={title}
            className={`interactive-row ${index === 0 ? "live-shimmer" : ""}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-white">{title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{source}</p>
              </div>
              <span className="rounded-md border border-primary/25 bg-primary/10 px-2 py-1 text-xs text-primary">
                {severity}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="live-data-bar h-full rounded-full bg-gradient-to-r from-cyan-300 via-primary to-violet-400"
                  style={{ width: `${score}%` }}
                />
              </div>
              <span className="text-xs font-medium text-slate-300">{score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SmartMoneyActivityPreview({
  liveData,
  isLiveLoading,
}: {
  liveData: LiveIntelligenceData;
  isLiveLoading: boolean;
}) {
  const rows = liveWalletRows(liveData, isLiveLoading);

  return (
    <div className="rounded-lg border border-white/10 bg-black/15 p-4 shadow-inner shadow-white/[0.03]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white">Smart money activity</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Labeled wallet movements
          </p>
        </div>
        <WalletCards className="size-4 text-primary" />
      </div>
      <div className="space-y-2">
        {rows.map(([wallet, value, delta]) => (
          <div
            key={wallet}
            className="grid grid-cols-[1fr_86px_72px] items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5"
          >
            <span className="truncate text-sm font-medium text-white">
              {wallet}
            </span>
            <span className="text-right font-mono text-xs text-slate-300">
              {value}
            </span>
            <span
              className={`text-right text-xs ${
                delta.startsWith("-") ? "text-rose-200" : "text-emerald-300"
              }`}
            >
              {delta}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NarrativeHeatmapPreview({ liveData }: { liveData: LiveIntelligenceData }) {
  const heat = [
    84, 76, 91, 88, 67, 73, 95,
    48, 52, 64, 71, 79, 69, 82,
    32, 46, 51, 59, 62, 74, 78,
    26, 34, 44, 53, 58, 62, 70,
  ];
  const themes = liveHeatmapThemes(liveData);

  return (
    <div className="rounded-lg border border-white/10 bg-black/15 p-4 shadow-inner shadow-white/[0.03]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white">Narrative heatmap</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Mindshare, capital, and social velocity
          </p>
        </div>
        <RadioTower className="size-4 text-primary" />
      </div>
      <div className="grid grid-cols-[110px_repeat(7,1fr)] gap-2 text-xs text-muted-foreground">
        <span>Theme</span>
        {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
          <span key={`${day}-${index}`} className="text-center">
            {day}
          </span>
        ))}
        {themes.map((theme, row) => (
          <div key={theme} className="contents">
            <span className="flex items-center text-xs font-medium text-slate-300">
              {theme}
            </span>
            {heat.slice(row * 7, row * 7 + 7).map((value, index) => (
              <span
                key={`${theme}-${index}`}
                className="h-8 rounded-md border border-white/10 transition duration-300 hover:-translate-y-0.5 hover:border-white/25"
                style={{
                  background: `linear-gradient(135deg, rgba(56,189,248,${0.08 + value / 260}), rgba(124,140,255,${0.12 + value / 200}), rgba(168,85,247,${0.08 + value / 300}))`,
                  boxShadow: `0 0 ${Math.round(value / 4)}px rgba(124,140,255,${value / 430})`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingSignalPanel({
  liveData,
  isLiveLoading,
}: {
  liveData: LiveIntelligenceData;
  isLiveLoading: boolean;
}) {
  const topChain = liveData.defi.chains[0];
  const trending = liveData.market.trending[0];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -right-3 top-12 hidden w-72 rounded-lg border border-cyan-300/20 bg-background/82 p-4 shadow-lg shadow-cyan-300/5 backdrop-blur-sm xl:block"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.18em] text-cyan-100">
          AI verdict
        </span>
        <span className="ai-signal-pulse bg-cyan-300" />
      </div>
      <p className="text-sm font-medium leading-5 text-white">
        {isLiveLoading
          ? "Synchronizing market and liquidity intelligence feeds."
          : `${topChain?.name ?? "DeFi"} TVL and ${trending?.symbol || "market"} trend momentum are converging.`}
      </p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="live-data-bar h-full w-[86%] rounded-full bg-gradient-to-r from-cyan-300 via-primary to-violet-400" />
      </div>
    </div>
  );
}

function FloatingWalletPanel({ liveData }: { liveData: LiveIntelligenceData }) {
  const eventCount =
    liveData.wallet.tokenTransfers.length || liveData.wallet.transactions.length;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -left-4 bottom-20 hidden w-80 rounded-lg border border-primary/20 bg-background/82 p-4 shadow-lg shadow-primary/5 backdrop-blur-sm xl:block"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.18em] text-primary">
          Smart wallet cluster
        </span>
        <Network className="size-4 text-primary" />
      </div>
      <div className="grid grid-cols-[1fr_64px] gap-3">
        <div>
          <p className="text-sm font-medium text-white">
            {shortAddress(liveData.wallet.address)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {liveData.wallet.enabled
              ? "Recent Etherscan wallet activity"
              : "Configure ETHERSCAN_API_KEY for live wallet flow"}
          </p>
        </div>
        <div className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 px-2 py-1 text-center text-sm font-semibold text-emerald-200">
          {liveData.wallet.enabled ? eventCount : "API"}
        </div>
      </div>
    </div>
  );
}

function WhySection() {
  return (
    <MotionSection>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why Vantauu"
          title="More intelligent than traditional on-chain tools."
          description="Vantauu is designed around intent, context, and actionability, not just dashboards of disconnected transactions."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {whyItems.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              className="section-surface"
            >
              <ShieldCheck className="mb-5 size-5 text-primary" />
              <h3 className="text-xl font-semibold tracking-tight text-white">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function PricingSection({ onRequestAccess }: { onRequestAccess: () => void }) {
  return (
    <MotionSection className="border-y border-white/10 bg-white/[0.025]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Pricing"
          title="Plans for analysts, funds, and institutions."
          description="Start with the intelligence surface your team needs today, then scale into APIs, alerts, and custom workflows."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricing.map((plan) => (
            <motion.article
              key={plan.name}
              variants={fadeUp}
              className={`group relative overflow-hidden rounded-lg border p-6 shadow-xl shadow-black/25 backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? "border-primary/45 bg-[linear-gradient(145deg,rgba(124,140,255,0.17),rgba(255,255,255,0.045))] shadow-primary/15"
                  : "border-white/10 bg-white/[0.045] hover:border-primary/25 hover:shadow-primary/10"
              }`}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="absolute -right-16 top-0 h-32 w-48 rotate-12 bg-primary/8 blur-2xl transition duration-500 group-hover:bg-cyan-300/10" />
              {plan.featured && (
                <div className="absolute right-4 top-4 rounded-md border border-cyan-300/25 bg-cyan-300/10 px-2 py-1 text-xs font-medium text-cyan-100">
                  Recommended
                </div>
              )}

              <div className="relative">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-primary">
                      {plan.usage}
                    </p>
                  </div>
                </div>

                <p className="min-h-12 text-sm leading-6 text-muted-foreground">
                  {plan.description}
                </p>

                <div className="mt-7 flex items-end gap-2">
                  <span className="text-5xl font-semibold tracking-tight text-white">
                    {plan.price}
                  </span>
                  <span className="pb-1.5 text-sm text-muted-foreground">
                    {plan.unit}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onRequestAccess}
                  className={`mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition duration-300 hover:-translate-y-0.5 ${
                    plan.featured
                      ? "border-primary/40 bg-primary/90 text-white shadow-xl shadow-primary/25 hover:bg-primary"
                      : "border-white/10 bg-white/[0.055] text-white hover:border-primary/30 hover:bg-primary/10"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="size-4" />
                </button>
              </div>

              <div className="relative mt-7 space-y-3 border-t border-white/10 pt-6">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-md border border-emerald-300/20 bg-emerald-300/10 text-emerald-300">
                      <Check className="size-3.5" />
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          className="section-surface mt-8 overflow-hidden p-0"
        >
          <div className="flex flex-col justify-between gap-3 border-b border-white/10 p-5 sm:flex-row sm:items-end sm:p-6">
            <div>
              <p className="section-eyebrow">Feature Comparison</p>
              <h3 className="text-xl font-semibold tracking-tight text-white">
                Compare intelligence coverage by plan.
              </h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Upgrade when your workflow needs lower latency, broader entity
              coverage, or custom signal routing.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full border-collapse text-left">
              <thead className="bg-white/[0.035]">
                <tr className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <th className="px-5 py-4 font-medium">Capability</th>
                  <th className="px-5 py-4 font-medium">Starter</th>
                  <th className="px-5 py-4 font-medium text-primary">Pro</th>
                  <th className="px-5 py-4 font-medium">Institutional</th>
                </tr>
              </thead>
              <tbody>
                {pricingComparison.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-t border-white/10 transition hover:bg-white/[0.035]"
                  >
                    <td className="px-5 py-4 text-sm font-medium text-white">
                      {row.feature}
                    </td>
                    <ComparisonCell value={row.starter} />
                    <ComparisonCell value={row.pro} recommended />
                    <ComparisonCell value={row.institutional} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </MotionSection>
  );
}

function ComparisonCell({
  value,
  recommended,
}: {
  value: string;
  recommended?: boolean;
}) {
  return (
    <td className="px-5 py-4">
      <span
        className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-medium ${
          recommended
            ? "border-primary/25 bg-primary/10 text-primary"
            : value === "Not included"
              ? "border-white/10 bg-white/[0.035] text-muted-foreground"
              : "border-cyan-300/15 bg-cyan-300/5 text-slate-300"
        }`}
      >
        {value}
      </span>
    </td>
  );
}

function FaqSection() {
  return (
    <MotionSection>
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Designed for crypto teams that need signal, not noise."
          description="A concise overview of what this Vantauu prototype represents."
          centered
        />

        <div className="mt-12 grid gap-3">
          {faqs.map((faq) => (
            <motion.article key={faq.question} variants={fadeUp} className="interactive-row">
              <h3 className="font-medium text-white">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {faq.answer}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function CareersSection() {
  return (
    <MotionSection>
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="hero-surface">
          <div className="absolute inset-0 cyber-grid animated-grid opacity-30" />
          <div className="cinematic-gradient absolute inset-0 opacity-25" />
          <div className="scan-line" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
          <div
            aria-hidden
            className="absolute -right-24 top-20 h-px w-[38rem] -rotate-12 bg-gradient-to-r from-transparent via-primary/45 to-transparent blur-sm"
          />

          <div className="relative">
            <div>
              <p className="section-eyebrow">Remote-First Team</p>
              <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                We&apos;re assembling the founding leadership team for AI-native
                market intelligence.
              </h2>
              <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-slate-300 sm:text-base">
                <p>
                  Vantauu is built as a globally distributed intelligence
                  company.
                </p>
                <p>
                  We work across time zones, ecosystems, and markets — focusing
                  on speed, research quality, and market understanding rather
                  than traditional corporate structure.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Company-defining roles", "High ownership", "AI x crypto x finance"].map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs font-medium text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {foundingLeadershipRoles.map((role, index) => (
                <motion.div
                  key={role.title}
                  variants={fadeUp}
                  className={index === 0 ? "xl:col-span-2" : ""}
                >
                  <Link
                    href="/founding-leadership"
                    className="section-surface-grid group flex min-h-[430px] flex-col text-left"
                  >
                    <div className="absolute inset-0 cyber-grid opacity-10" />
                    <div className="relative flex h-full flex-col">
                      <div className="mb-6 flex items-start justify-between gap-4">
                        <span className="flex size-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary shadow-lg shadow-primary/10">
                          <BriefcaseBusiness className="size-4" />
                        </span>
                        <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-xs text-muted-foreground">
                          0{index + 1}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold tracking-tight text-white">
                          {role.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-slate-300">
                          {role.mandate}
                        </p>
                      </div>

                      <div className="mt-6 grid gap-4 text-xs leading-5 text-muted-foreground">
                        {[
                          ["Mission", role.mission],
                          ["Ownership", role.ownership],
                          ["Why now", role.whyNow],
                          ["Who we want", role.whoWeWant],
                        ].map(([label, value]) => (
                          <div key={label} className="border-t border-white/10 pt-3">
                            <p className="mb-1 font-medium uppercase tracking-[0.16em] text-primary">
                              {label}
                            </p>
                            <p>{value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5 text-sm font-medium text-white">
                        <span>Explore leadership brief</span>
                        <ArrowRight className="size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                      </div>
                      <span
                        className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition group-hover:opacity-100"
                        style={{ transitionDelay: `${index * 35}ms` }}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="absolute inset-0 cyber-grid opacity-10" />

      <div className="relative mx-auto grid max-w-7xl gap-10 text-sm text-muted-foreground lg:grid-cols-[1fr_1.35fr] lg:items-start">
        <div className="max-w-sm">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg border border-primary/35 bg-primary/15 text-primary shadow-lg shadow-primary/20">
              <SignalMark className="size-5" />
            </span>
            <span className="font-semibold uppercase tracking-[0.24em] text-white">
              Vantauu
            </span>
          </Link>
          <p className="mt-4 leading-6">
            AI-powered on-chain intelligence for tracking smart money, capital
            flow, narratives, and market signals in real time.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[0.8fr_0.9fr_1.25fr]">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-white">
              Company
            </p>
            <div className="grid gap-3">
              {footerLinks.slice(0, 3).map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-white">
              Resources
            </p>
            <div className="grid gap-3">
              {footerLinks.slice(3).map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Contact channels
            </p>
            <div className="mt-4 grid gap-3">
              {footerContactChannels.map((channel) => (
                <a
                  key={channel.email}
                  href={channel.href}
                  className="group flex items-center justify-between gap-4 rounded-md border border-white/10 bg-black/15 px-3 py-2 transition duration-200 hover:border-primary/30 hover:bg-primary/10"
                >
                  <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400 group-hover:text-primary">
                    {channel.label}
                  </span>
                  <span className="font-mono text-xs text-slate-200">
                    {channel.email}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row">
        <span>Copyright 2026 Vantauu Intelligence. All rights reserved.</span>
        <span>Built for AI-native crypto research teams.</span>
      </div>
    </footer>
  );
}

function FooterLink({ label, href }: { label: string; href: string }) {
  const className = "transition hover:text-white";

  if (href.startsWith("mailto:") || href.startsWith("#")) {
    return (
      <a className={className} href={href}>
        {label}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {label}
    </Link>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  centered,
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-sm leading-6 text-muted-foreground sm:text-base">
        {description}
      </p>
    </motion.div>
  );
}

function MotionSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={className}
    >
      {children}
    </section>
  );
}
