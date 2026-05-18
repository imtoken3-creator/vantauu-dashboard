import { CapitalFlowDashboard } from "@/components/capital-flow/capital-flow-dashboard";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function CapitalFlowPage() {
  return (
    <DashboardShell>
      <CapitalFlowDashboard />
    </DashboardShell>
  );
}
