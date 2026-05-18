import dynamic from "next/dynamic";
import type { Metadata } from "next";

import { DashboardRouteLoading } from "@/components/dashboard/route-loading";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export const metadata: Metadata = {
  title: "API Docs",
  description:
    "Explore Vantauu mock API contracts for smart money, capital flow, narratives, alerts, wallets, and WebSocket streams.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Vantauu API Docs",
    description:
      "Developer portal for AI-powered on-chain intelligence APIs and mock data contracts.",
    url: "/docs",
  },
};

const ApiDocsDashboard = dynamic(
  () =>
    import("@/components/docs/api-docs-dashboard").then(
      (mod) => mod.ApiDocsDashboard
    ),
  {
    loading: () => <DashboardRouteLoading label="Loading API docs" />,
  }
);

export default function DocsPage() {
  return (
    <DashboardShell>
      <ApiDocsDashboard />
    </DashboardShell>
  );
}
