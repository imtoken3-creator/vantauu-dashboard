import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  Globe2,
  Network,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

import { SignalMark } from "@/components/brand/signal-mark";
import { MarketingMobileMenu } from "@/components/layout/marketing-mobile-menu";
import { footerContactChannels, mailto } from "@/lib/contact-channels";

const contactHref = mailto.recruiting(
  "Recruiting Inquiry - Founding Leadership"
);

const roles = [
  {
    title: "Executive Vice President",
    mission:
      "Convert company ambition into executive rhythm across strategy, execution, and market positioning.",
    ownership:
      "Leadership operating cadence, cross-functional priorities, executive hiring, and board-ready communication.",
    whyNow:
      "The category is forming now, and the company needs an enterprise-grade leadership system before scale arrives.",
  },
  {
    title: "Chief Marketing Officer",
    mission:
      "Define the category language for AI-native on-chain intelligence and make Vantauu memorable to serious market participants.",
    ownership:
      "Narrative, launches, research-led content, positioning, demand creation, and founder-led market education.",
    whyNow:
      "Crypto knows analytics. It does not yet have a clear language for AI market cognition.",
  },
  {
    title: "Chief Operating Officer",
    mission:
      "Build the operating system that lets a small intelligence company move with speed, clarity, and discipline.",
    ownership:
      "People systems, finance discipline, legal operations, company cadence, and execution accountability.",
    whyNow:
      "AI intelligence infrastructure requires trust and reliability from the first institutional conversations.",
  },
  {
    title: "Chief Experience Officer",
    mission:
      "Shape Vantauu into a product experience that feels precise, calm, and indispensable to expert users.",
    ownership:
      "Product experience, research workflows, onboarding, interface quality, and customer insight loops.",
    whyNow:
      "The winning product will not just surface data. It will make complex markets feel intelligible.",
  },
  {
    title: "Chief Growth Officer",
    mission:
      "Create the early growth engine that turns curiosity into conviction and product pull.",
    ownership:
      "Growth loops, waitlist conversion, community systems, ecosystem channels, experiments, and analytics.",
    whyNow:
      "The first serious users will shape the wedge, language, coverage, and trust surface of the company.",
  },
  {
    title: "Chief Brand Officer",
    mission:
      "Build a distinctive company identity for the future of digital asset intelligence.",
    ownership:
      "Brand system, voice, visual standards, executive presence, research packaging, and cultural signal.",
    whyNow:
      "The market is crowded with dashboards. A category-defining intelligence company needs taste and restraint.",
  },
  {
    title: "Chief Communications Officer",
    mission:
      "Make Vantauu credible with institutions, researchers, builders, and the broader digital asset market.",
    ownership:
      "Strategic communications, media relations, executive messaging, research announcements, and reputation systems.",
    whyNow:
      "AI and crypto both require unusually high trust. Communication has to be precise from day one.",
  },
  {
    title: "Chief Customer Officer",
    mission:
      "Turn early customers into deep product signal and long-term institutional relationships.",
    ownership:
      "Customer discovery, onboarding, success systems, workflow mapping, research desk relationships, and feedback loops.",
    whyNow:
      "The product needs to be built beside sophisticated users who can pressure-test real intelligence workflows.",
  },
  {
    title: "Chief Revenue Officer",
    mission:
      "Design the trusted enterprise revenue motion for AI-powered crypto intelligence.",
    ownership:
      "Pipeline, pricing, discovery, strategic accounts, sales process, buyer education, and revenue forecasting.",
    whyNow:
      "Funds, protocols, and data teams are actively looking for AI leverage but need a credible partner.",
  },
  {
    title: "Chief Business Officer",
    mission:
      "Build the partnership map across data providers, protocols, funds, ecosystems, and AI infrastructure.",
    ownership:
      "Business development, strategic alliances, ecosystem partnerships, pilots, and executive relationships.",
    whyNow:
      "The most valuable intelligence platforms become networks, not isolated products.",
  },
];

const whyJoin = [
  {
    title: "Define a New Category",
    body: "Help establish AI-native on-chain intelligence as a new operating layer for digital asset markets.",
    icon: Target,
  },
  {
    title: "Shape Company Strategy",
    body: "Work close to the center of product, market, hiring, commercial strategy, and institutional positioning.",
    icon: Building2,
  },
  {
    title: "Global Remote Culture",
    body: "Build with a distributed team designed around speed, research quality, and market understanding.",
    icon: Globe2,
  },
  {
    title: "Build From Day One",
    body: "Create systems, rituals, teams, and market motions before they harden into legacy process.",
    icon: Network,
  },
  {
    title: "Meaningful Equity",
    body: "Participate in the upside of building critical intelligence infrastructure at the earliest stage.",
    icon: CircleDollarSign,
  },
  {
    title: "Emerging Markets Access",
    body: "Operate near the frontier of AI, crypto, institutional research, and digital asset market structure.",
    icon: Zap,
  },
];

const executiveSignals = [
  "Confidential executive brief",
  "Founding leadership mandate",
  "AI x digital asset intelligence",
];

function applyHref(role: string) {
  return mailto.recruiting(`Application - ${role}`);
}

export const metadata: Metadata = {
  title: "Founding Leadership",
  description:
    "A confidential executive recruiting brief for senior operators considering Vantauu's founding leadership team.",
  alternates: {
    canonical: "/founding-leadership",
  },
  openGraph: {
    title: "Founding Leadership | VANTAUU",
    description:
      "Build the intelligence layer of digital assets with Vantauu's founding leadership team.",
    url: "/founding-leadership",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "VANTAUU AI on-chain intelligence terminal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Founding Leadership | VANTAUU",
    description:
      "A confidential executive recruiting brief for senior operators building AI-native digital asset intelligence.",
    images: ["/twitter-image"],
  },
};

export default function FoundingLeadershipPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/74 backdrop-blur-sm">
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
                Founding Leadership
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link className="transition hover:text-white" href="/about">
              About
            </Link>
            <Link className="transition hover:text-white" href="/dashboard">
              Product
            </Link>
            <Link className="transition hover:text-white" href="/docs">
              Docs
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={contactHref}
              className="hidden h-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.055] px-4 text-sm font-medium text-white transition duration-200 hover:border-primary/35 hover:bg-primary/10 md:inline-flex"
            >
              Contact Recruiting
            </a>
            <MarketingMobileMenu
              links={[
                { label: "About", href: "/about" },
                { label: "Product", href: "/dashboard" },
                { label: "Docs", href: "/docs" },
                { label: "Roles", href: "#roles" },
                { label: "Home", href: "/" },
              ]}
              cta={{ label: "Contact Recruiting", href: contactHref }}
            />
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="relative overflow-hidden px-4 pt-32 pb-16 sm:px-6 sm:pt-40 lg:px-8">
          <div className="absolute inset-0 cyber-grid opacity-20" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
          <div className="cinematic-gradient absolute inset-0 opacity-20" />

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="section-eyebrow">Executive Recruiting Brief</p>
              <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Build the Intelligence Layer of Digital Assets
              </h1>
              <div className="mt-7 max-w-2xl space-y-5 text-base leading-8 text-slate-300 sm:text-lg">
                <p>
                  Vantauu is building an AI-native intelligence platform that
                  helps market participants understand capital flow, narratives,
                  smart money behavior, and ecosystem signals across digital
                  assets.
                </p>
                <p>
                  We are assembling a founding leadership team to help shape the
                  future of on-chain intelligence infrastructure.
                </p>
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#roles"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/90 px-5 text-sm font-medium text-white shadow-xl shadow-primary/20 transition duration-200 hover:-translate-y-0.5 hover:bg-primary"
                >
                  Explore Leadership Roles
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href={contactHref}
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.055] px-5 text-sm font-medium text-white transition duration-200 hover:border-primary/35 hover:bg-primary/10"
                >
                  Contact Recruiting
                </a>
              </div>
            </div>

            <aside className="hero-surface min-h-[420px]">
              <div className="absolute inset-0 cyber-grid opacity-20" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
              <div className="relative flex h-full flex-col justify-between gap-8">
                <div>
                  <div className="mb-8 flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                      <SignalMark className="size-7" />
                    </span>
                    <span className="rounded-md border border-white/10 bg-white/[0.045] px-3 py-1 font-mono text-xs text-muted-foreground">
                      PRIVATE / 2026
                    </span>
                  </div>
                  <p className="max-w-md text-2xl font-semibold leading-tight text-white">
                    A company-building mandate for operators who want to define
                    the market, not manage a function.
                  </p>
                </div>
                <div className="grid gap-3">
                  {executiveSignals.map((signal) => (
                    <div key={signal} className="surface-card flex items-center gap-3 p-3">
                      <Sparkles className="size-4 text-primary" />
                      <span className="text-sm text-slate-300">{signal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="section-surface">
              <p className="section-eyebrow">Leadership Philosophy</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Not Department Heads. Company Builders.
              </h2>
              <div className="mt-6 max-w-3xl space-y-4 text-sm leading-7 text-slate-300 sm:text-base">
                <p>
                  These roles are designed for leaders who want to build systems,
                  teams, and market positions from first principles.
                </p>
                <p>
                  This is not a mature corporate environment with predefined
                  playbooks.
                </p>
                <p>
                  We are looking for executives who want ownership, influence,
                  and the opportunity to help define the future direction of the
                  company.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="roles" className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-3xl">
              <p className="section-eyebrow">Open Founding Leadership Positions</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Senior mandates for an early intelligence company.
              </h2>
            </div>

            <div className="grid gap-x-6 gap-y-8 lg:grid-cols-2 lg:gap-y-10">
              {roles.map((role, index) => (
                <article
                  key={role.title}
                  className="section-surface-grid group flex min-h-[420px] flex-col lg:h-[440px]"
                >
                  <div className="absolute inset-0 cyber-grid opacity-10" />
                  <div className="relative flex h-full flex-col">
                    <div className="mb-8 flex items-start justify-between gap-4">
                      <span className="flex size-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary shadow-lg shadow-primary/10">
                        <BriefcaseBusiness className="size-4" />
                      </span>
                      <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-xs text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold tracking-tight text-white">
                      {role.title}
                    </h3>

                    <div className="mt-7 grid gap-5 text-sm leading-6 text-slate-300">
                      {[
                        ["Mission", role.mission],
                        ["Ownership", role.ownership],
                        ["Why Now", role.whyNow],
                      ].map(([label, value]) => (
                        <div key={label} className="border-t border-white/10 pt-4">
                          <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                            {label}
                          </p>
                          <p>{value}</p>
                        </div>
                      ))}
                    </div>

                    <a
                      href={applyHref(role.title)}
                      className="mt-auto flex items-center justify-between border-t border-white/10 pt-5 text-sm font-medium text-white"
                    >
                      <span>Apply for this role</span>
                      <ArrowRight className="size-4 text-muted-foreground transition duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.025] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="hero-surface">
              <div className="absolute inset-0 cyber-grid opacity-20" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
              <div className="relative max-w-2xl">
                <p className="section-eyebrow">Operating Model</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  Remote-First Team
                </h2>
                <div className="mt-6 space-y-4 text-sm leading-7 text-slate-300 sm:text-base">
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
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="section-eyebrow">Why Join Vantauu</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                A rare moment to build before the category hardens.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {whyJoin.map((item) => {
                const Icon = item.icon;

                return (
                  <article key={item.title} className="section-surface-grid min-h-[240px]">
                    <div className="relative">
                      <span className="mb-7 flex size-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                        <Icon className="size-4" />
                      </span>
                      <h3 className="text-lg font-semibold tracking-tight text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        {item.body}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="hero-surface">
              <div className="absolute inset-0 cyber-grid opacity-20" />
              <div className="cinematic-gradient absolute inset-0 opacity-20" />
              <div className="relative max-w-3xl">
                <p className="section-eyebrow">Final Conversation</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  Interested in Building Something Foundational?
                </h2>
                <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  If you believe intelligence infrastructure will become a
                  critical layer of the digital asset ecosystem, we would like to
                  hear from you.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={applyHref("Founding Leadership")}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/90 px-5 text-sm font-medium text-white shadow-xl shadow-primary/20 transition duration-200 hover:-translate-y-0.5 hover:bg-primary"
                  >
                    Apply Now
                    <ArrowRight className="size-4" />
                  </a>
                  <a
                    href={contactHref}
                    className="inline-flex h-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.055] px-5 text-sm font-medium text-white transition duration-200 hover:border-primary/35 hover:bg-primary/10"
                  >
                    Contact Recruiting
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-[1fr_auto] md:items-start">
          <Link href="/" className="inline-flex items-center gap-3">
            <SignalMark className="size-5 text-primary" />
            <span className="font-semibold uppercase tracking-[0.24em] text-white">
              Vantauu
            </span>
          </Link>
          <div className="grid gap-5 md:justify-items-end">
            <div className="flex flex-wrap gap-5 md:justify-end">
              <Link className="transition hover:text-white" href="/about">
                About
              </Link>
              <Link className="transition hover:text-white" href="/docs">
                Docs
              </Link>
              <a
                className="transition hover:text-white"
                href={mailto.general("General Inquiry")}
              >
                Contact
              </a>
              <a
                className="transition hover:text-white"
                href={mailto.partnerships("Partnership Inquiry")}
              >
                Partnerships
              </a>
            </div>

            <div className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 sm:grid-cols-3">
              {footerContactChannels.map((channel) => (
                <a
                  key={channel.email}
                  href={channel.href}
                  className="group min-w-0 rounded-md border border-white/10 bg-black/15 px-3 py-2 transition duration-200 hover:border-primary/30 hover:bg-primary/10"
                >
                  <span className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-400 group-hover:text-primary">
                    {channel.label}
                  </span>
                  <span className="mt-1 block truncate font-mono text-xs text-slate-200">
                    {channel.email}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
