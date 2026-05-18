import dynamic from "next/dynamic";
import type { Metadata } from "next";

import { DashboardRouteLoading } from "@/components/dashboard/route-loading";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export const metadata: Metadata = {
  title: "AI Command Center",
  description:
    "Institutional AI command center for market overview, capital flow, narratives, wallet intelligence, and real-time signals.",
  alternates: { canonical: "/dashboard" },
  openGraph: {
    title: "Vantauu AI Command Center",
    description:
      "A live on-chain intelligence terminal for market intent, liquidity, and wallet behavior.",
    url: "/dashboard",
  },
};

const DashboardHome = dynamic(
  () =>
    import("@/components/dashboard/dashboard-home").then(
      (mod) => mod.DashboardHome
    ),
  {
    loading: () => <DashboardRouteLoading label="Loading command center" />,
  }
);

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHome />
    </DashboardShell>
  );
}
