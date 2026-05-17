import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { IntelligenceChart } from "@/components/dashboard/intelligence-chart";
import { IntelligencePanels } from "@/components/dashboard/intelligence-panels";
import { RevealBlock } from "@/components/dashboard/reveal-block";
import { SignalFeed } from "@/components/dashboard/signal-feed";
import { StatCard } from "@/components/dashboard/stat-card";
import { dashboardStats } from "@/data/mock";

export default function Home() {
  return (
    <div className="page-stack">
      <RevealBlock>
        <DashboardHero />
      </RevealBlock>

      <RevealBlock className="space-y-5" delay={0.04}>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
              Dashboard Preview
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Institutional-grade crypto intelligence, distilled.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            A focused operating surface for wallet behavior, capital flow, and
            narrative momentum.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat, index) => (
            <StatCard key={stat.label} iconIndex={index} {...stat} />
          ))}
        </div>
      </RevealBlock>

      <RevealBlock
        className="grid gap-6 xl:grid-cols-[1.45fr_0.9fr]"
        delay={0.08}
      >
        <IntelligenceChart />
        <SignalFeed />
      </RevealBlock>

      <RevealBlock delay={0.12}>
        <IntelligencePanels />
      </RevealBlock>
    </div>
  );
}
