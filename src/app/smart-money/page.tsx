import dynamic from "next/dynamic";
import type { Metadata } from "next";

import { DashboardRouteLoading } from "@/components/dashboard/route-loading";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export const metadata: Metadata = {
  title: "Smart Money",
  description:
    "Track smart wallets, whale behavior, wallet clusters, and AI-ranked on-chain activity.",
  alternates: { canonical: "/smart-money" },
  openGraph: {
    title: "Vantauu Smart Money Intelligence",
    description:
      "Follow the wallets that move before the market with AI-ranked smart money signals.",
    url: "/smart-money",
  },
};

const SmartMoneyDashboard = dynamic(
  () =>
    import("@/components/smart-money/smart-money-dashboard").then(
      (mod) => mod.SmartMoneyDashboard
    ),
  {
    loading: () => <DashboardRouteLoading label="Loading smart money" />,
  }
);

export default function SmartMoneyPage() {
  return (
    <DashboardShell>
      <SmartMoneyDashboard />
    </DashboardShell>
  );
}
