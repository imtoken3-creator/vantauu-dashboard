import dynamic from "next/dynamic";
import type { Metadata } from "next";

import { DashboardRouteLoading } from "@/components/dashboard/route-loading";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export const metadata: Metadata = {
  title: "Capital Flow",
  description:
    "Map liquidity movement across chains, stablecoins, sectors, and protocols with AI-powered capital flow intelligence.",
  alternates: { canonical: "/capital-flow" },
  openGraph: {
    title: "Vantauu Capital Flow Intelligence",
    description:
      "Professional crypto liquidity intelligence across chains, stablecoins, and protocols.",
    url: "/capital-flow",
  },
};

const CapitalFlowDashboard = dynamic(
  () =>
    import("@/components/capital-flow/capital-flow-dashboard").then(
      (mod) => mod.CapitalFlowDashboard
    ),
  {
    loading: () => <DashboardRouteLoading label="Loading capital flow" />,
  }
);

export default function CapitalFlowPage() {
  return (
    <DashboardShell>
      <CapitalFlowDashboard />
    </DashboardShell>
  );
}
