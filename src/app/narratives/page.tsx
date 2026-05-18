import dynamic from "next/dynamic";
import type { Metadata } from "next";

import { DashboardRouteLoading } from "@/components/dashboard/route-loading";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export const metadata: Metadata = {
  title: "Narrative Intelligence",
  description:
    "Detect emerging crypto narratives, mindshare shifts, social sentiment, and AI-ranked momentum.",
  alternates: { canonical: "/narratives" },
  openGraph: {
    title: "Vantauu Narrative Intelligence",
    description:
      "AI-powered crypto narrative intelligence for detecting market stories before consensus forms.",
    url: "/narratives",
  },
};

const NarrativeDashboard = dynamic(
  () =>
    import("@/components/narratives/narrative-dashboard").then(
      (mod) => mod.NarrativeDashboard
    ),
  {
    loading: () => <DashboardRouteLoading label="Loading narratives" />,
  }
);

export default function NarrativesPage() {
  return (
    <DashboardShell>
      <NarrativeDashboard />
    </DashboardShell>
  );
}
