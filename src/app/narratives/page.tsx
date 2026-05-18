import { NarrativeDashboard } from "@/components/narratives/narrative-dashboard";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function NarrativesPage() {
  return (
    <DashboardShell>
      <NarrativeDashboard />
    </DashboardShell>
  );
}
