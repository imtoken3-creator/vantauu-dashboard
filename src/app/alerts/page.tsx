import { AlertsDashboard } from "@/components/alerts/alerts-dashboard";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function AlertsPage() {
  return (
    <DashboardShell>
      <AlertsDashboard />
    </DashboardShell>
  );
}
