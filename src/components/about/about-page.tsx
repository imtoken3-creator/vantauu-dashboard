"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  DatabaseZap,
  Eye,
  LineChart,
  Network,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Waves,
} from "lucide-react";

import { SignalMark } from "@/components/brand/signal-mark";
import { WaitlistModal } from "@/components/waitlist/waitlist-modal";
import { foundingLeadershipRoles } from "@/data/founding-roles";

const fadeUp = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {},
};

const beliefs = [
  {
    eyebrow: "Our Mission",
    title: "Build the intelligence layer for autonomous markets.",
    body: "Crypto markets are becoming faster, more transparent, and more machine-readable. Vantauu exists to help serious operators understand capital intent before it becomes consensus.",
    icon: RadioTower,
  },
  {
    eyebrow: "Why on-chain intelligence matters",
    title: "Blockchains are the first financial system with public behavior data.",
    body: "Every transfer, bridge, deployment, and liquidity move is a clue. The challenge is no longer access to data. The challenge is converting noisy behavior into timely judgment.",
    icon: Network,
  },
  {
    eyebrow: "Why AI-native investing is inevitable",
    title: "The next research stack will reason continuously.",
    body: "AI systems can monitor market structure, summarize flow, cluster wallets, detect narrative acceleration, and explain anomalies faster than human-only workflows can keep up.",
    icon: BrainCircuit,
  },
  {
    eyebrow: "Why traditional research is broken",
    title: "Static reports cannot compete with real-time capital movement.",
    body: "Spreadsheets, dashboards, and delayed writeups describe what already happened. Markets need living intelligence surfaces that update as behavior changes.",
    icon: LineChart,
  },
  {
    eyebrow: "What Vantauu is building",
    title: "An AI command center for on-chain market cognition.",
    body: "We are building a system that fuses wallet behavior, capital flow, narratives, market sentiment, and AI-generated explanations into one operating layer.",
    icon: DatabaseZap,
  },
];

const principles = [
  {
    title: "Signal over noise",
    description:
      "We reduce market chaos into clear, ranked intelligence. More data is not the goal. Better judgment is.",
  },
  {
    title: "Intelligence over speculation",
    description:
      "We prioritize observable behavior, capital movement, and explainable reasoning over vague predictions.",
  },
  {
    title: "AI-first research",
    description:
      "The product is designed around AI-native workflows from the beginning, not as a layer added after dashboards.",
  },
  {
    title: "Real-time market cognition",
    description:
      "Markets do not wait for reports. Vantauu is built to perceive, summarize, and adapt continuously.",
  },
];

const roadmap = [
  {
    phase: "Now",
    title: "Live intelligence foundation",
    body: "Market data, DeFi liquidity, wallet feeds, AI signal scoring, and waitlist cohorts.",
  },
  {
    phase: "Next",
    title: "Entity and wallet graph",
    body: "Behavioral clustering for funds, whales, protocols, treasuries, and coordinated wallet groups.",
  },
  {
    phase: "Soon",
    title: "Agentic research workflows",
    body: "AI-generated briefs, anomaly investigations, watchlists, and natural language market queries.",
  },
  {
    phase: "Future",
    title: "Autonomous intelligence network",
    body: "A system where human analysts and AI agents collaborate on real-time market cognition.",
  },
];

const principleIcons = [Eye, ShieldCheck, BrainCircuit, Waves];

export function AboutPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <AboutNav onRequestAccess={() => setWaitlistOpen(true)} />
      <main id="main-content">
        <HeroSection onRequestAccess={() => setWaitlistOpen(true)} />
        <BeliefSection />
        <FounderLetter />
        <PrinciplesSection />
        <RoadmapSection />
        <RecruitingCta onRequestAccess={() => setWaitlistOpen(true)} />
      </main>
      <AboutFooter />
      <WaitlistModal
        open={waitlistOpen}
        onOpenChange={setWaitlistOpen}
        source="about"
      />
    </div>
  );
}

function AboutNav({ onRequestAccess }: { onRequestAccess: () => void }) {
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
          <Link className="transition hover:text-white" href="/dashboard">
            Product
          </Link>
          <Link className="transition hover:text-white" href="/docs">
            Docs
          </Link>
          <a className="transition hover:text-white" href="#principles">
            Principles
          </a>
          <a className="transition hover:text-white" href="#roadmap">
            Roadmap
          </a>
        </nav>

        <button
          type="button"
          onClick={onRequestAccess}
          className="group inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.055] px-3 text-sm font-medium text-white shadow-xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary/10"
        >
          Join us
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </button>
      </div>
    </header>
  );
}

function HeroSection({ onRequestAccess }: { onRequestAccess: () => void }) {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
      <div className="absolute inset-0 cyber-grid animated-grid opacity-35" />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(56,189,248,0.13),transparent_34%),linear-gradient(245deg,rgba(124,140,255,0.14),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_18rem)]" />
      <div className="absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="absolute -right-24 top-40 h-px w-[48rem] -rotate-12 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent blur-md" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-background" />

      <div className="relative mx-auto grid min-h-[calc(100svh-10rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-primary shadow-lg shadow-primary/10 backdrop-blur-xl"
          >
            <Sparkles className="size-3.5" />
            About Vantauu
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-5xl font-semibold leading-[1.03] tracking-tight text-white sm:text-7xl lg:text-[clamp(4.5rem,6.2vw,7rem)]"
          >
            Building market cognition for the AI era.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg"
          >
            Vantauu is an AI-native on-chain intelligence company. We believe
            the next financial research platform will not be a dashboard. It
            will be a reasoning system that watches capital move in real time.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <button
              type="button"
              onClick={onRequestAccess}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-primary/40 bg-[linear-gradient(135deg,rgba(124,140,255,0.95),rgba(56,189,248,0.84))] px-5 text-sm font-medium text-white shadow-xl shadow-primary/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-primary/30"
            >
              <BriefcaseBusiness className="size-4" />
              Join the mission
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </button>
            <Link
              href="/dashboard"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/[0.055] px-5 text-sm font-medium text-white shadow-xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-white/[0.085]"
            >
              View product
              <ArrowRight className="size-4 text-cyan-200 transition group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="hero-surface min-h-[460px]">
          <div className="absolute inset-0 cyber-grid animated-grid opacity-25" />
          <div className="scan-line" />
          <div className="relative">
            <p className="section-eyebrow">Company thesis</p>
            <h2 className="max-w-xl text-2xl font-semibold leading-tight text-white sm:text-3xl">
              Markets are becoming transparent, autonomous, and too fast for
              legacy research.
            </h2>
            <div className="mt-8 grid gap-3">
              {[
                ["Public capital behavior", "On-chain data turns market activity into observable behavior."],
                ["AI interpretation", "Models can compress millions of signals into decision-ready intelligence."],
                ["Real-time cognition", "The winning research stack will update as fast as markets move."],
              ].map(([title, body]) => (
                <div key={title} className="surface-card">
                  <p className="text-sm font-medium text-white">{title}</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeliefSection() {
  return (
    <MotionSection>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Vision"
          title="The world needs a new intelligence layer for capital markets."
          description="Vantauu is built around a simple belief: as markets become more machine-readable, research must become more AI-native."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {beliefs.map((item, index) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              className={`section-surface group ${index === 0 ? "lg:col-span-2" : ""}`}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="section-eyebrow">{item.eyebrow}</p>
                  <h3 className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-5 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
                    {item.body}
                  </p>
                </div>
                <div className="icon-tile shrink-0">
                  <item.icon className="size-5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function FounderLetter() {
  return (
    <MotionSection className="border-y border-white/10 bg-white/[0.025]">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.article variants={fadeUp} className="hero-surface">
          <div className="absolute inset-0 cyber-grid animated-grid opacity-25" />
          <div className="cinematic-gradient absolute inset-0 opacity-25" />
          <div className="scan-line" />
          <div className="relative grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="section-eyebrow">Founder Letter</p>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                A note on why we are building Vantauu.
              </h2>
            </div>
            <div className="space-y-5 text-sm leading-7 text-slate-300 sm:text-base">
              <p>
                For decades, financial research was built around scarcity:
                scarce data, scarce distribution, scarce access. Crypto changed
                that. The most important market behavior is now public, but the
                volume of signal is far beyond what human teams can interpret
                manually.
              </p>
              <p>
                We think the next great research company will look less like a
                terminal full of static panels and more like a living
                intelligence system. It will understand wallets, liquidity,
                narratives, risk, and market structure as one connected field.
              </p>
              <p>
                Vantauu is our attempt to build that system: an AI-native
                command layer for people who need to know not only what happened
                on-chain, but what it means.
              </p>
              <div className="border-t border-white/10 pt-5">
                <p className="font-medium text-white">Vantauu Team</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-primary">
                  Building in public, with signal as the standard.
                </p>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </MotionSection>
  );
}

function PrinciplesSection() {
  return (
    <MotionSection id="principles">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Company Principles"
          title="We are designing for disciplined intelligence."
          description="The product, the company, and the research culture all share the same operating principles."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {principles.map((principle, index) => (
            <motion.article
              key={principle.title}
              variants={fadeUp}
              className="metric-card group min-h-[260px]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
              <div className="mb-6 flex size-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary shadow-lg shadow-primary/20">
                {(() => {
                  const Icon = principleIcons[index] ?? Eye;
                  return <Icon className="size-5" />;
                })()}
              </div>
              <h3 className="text-lg font-semibold text-white">
                {principle.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {principle.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function RoadmapSection() {
  return (
    <MotionSection id="roadmap" className="border-y border-white/10 bg-white/[0.025]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Timeline"
          title="A roadmap toward autonomous market intelligence."
          description="We are moving from live dashboards to AI research agents, wallet graphs, and real-time capital cognition."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {roadmap.map((item, index) => (
            <motion.article
              key={item.phase}
              variants={fadeUp}
              className="section-surface-grid min-h-[260px]"
            >
              <div className="absolute inset-0 cyber-grid opacity-15" />
              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-md border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    {item.phase}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function RecruitingCta({ onRequestAccess }: { onRequestAccess: () => void }) {
  return (
    <MotionSection>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="hero-surface">
          <div className="absolute inset-0 cyber-grid animated-grid opacity-25" />
          <div className="cinematic-gradient absolute inset-0 opacity-25" />
          <div className="scan-line" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
          <div
            aria-hidden
            className="absolute -right-24 top-20 h-px w-[38rem] -rotate-12 bg-gradient-to-r from-transparent via-primary/45 to-transparent blur-sm"
          />

          <div className="relative">
            <div>
              <p className="section-eyebrow">Founding Leadership Roles</p>
              <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                We are recruiting leaders who want to build the company, not
                join a function.
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                Vantauu needs founding operators who can create the category,
                shape the company system, and turn AI-native on-chain
                intelligence into an institution-grade platform.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Founding mandate", "Company-building ownership", "AI x Web3 x finance"].map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs font-medium text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={onRequestAccess}
                className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/90 px-5 text-sm font-medium text-white shadow-xl shadow-primary/25 transition duration-300 hover:-translate-y-0.5 hover:bg-primary"
              >
                Start a conversation
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </button>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {foundingLeadershipRoles.map((role, index) => (
                <motion.button
                  key={role.title}
                  type="button"
                  onClick={onRequestAccess}
                  variants={fadeUp}
                  className={`section-surface-grid group flex min-h-[390px] flex-col text-left ${
                    index === 0 ? "xl:col-span-2" : ""
                  }`}
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

                    <h3 className="text-xl font-semibold tracking-tight text-white">
                      {role.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {role.mandate}
                    </p>

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
                      <span>Founding mandate</span>
                      <ArrowRight className="size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function AboutFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-muted-foreground md:flex-row md:items-center">
        <Link href="/" className="inline-flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg border border-primary/35 bg-primary/15 text-primary shadow-lg shadow-primary/20">
            <SignalMark className="size-5" />
          </span>
          <span className="font-semibold uppercase tracking-[0.24em] text-white">
            Vantauu
          </span>
        </Link>
        <div className="flex flex-wrap gap-5">
          <Link className="transition hover:text-white" href="/dashboard">
            Product
          </Link>
          <Link className="transition hover:text-white" href="/docs">
            Docs
          </Link>
          <Link className="transition hover:text-white" href="/">
            Home
          </Link>
          <a className="transition hover:text-white" href="mailto:hello@vantauu.ai">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div variants={fadeUp} className="max-w-3xl">
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
