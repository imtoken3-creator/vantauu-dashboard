import dynamic from "next/dynamic";
import type { Metadata } from "next";

import { DashboardRouteLoading } from "@/components/dashboard/route-loading";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export const metadata: Metadata = {
  title: "Alerts Center",
  description:
    "Monitor whale alerts, liquidity shocks, smart money rotations, security signals, and narrative shifts.",
  alternates: { canonical: "/alerts" },
  openGraph: {
    title: "Vantauu Alerts Center",
    description:
      "A professional crypto intelligence alert system for real-time market events.",
    url: "/alerts",
  },
};

const AlertsDashboard = dynamic(
  () =>
    import("@/components/alerts/alerts-dashboard").then(
      (mod) => mod.AlertsDashboard
    ),
  {
    loading: () => <DashboardRouteLoading label="Loading alerts center" />,
  }
);

export default function AlertsPage() {
  return (
    <DashboardShell>
      <AlertsDashboard />
    </DashboardShell>
  );
}
