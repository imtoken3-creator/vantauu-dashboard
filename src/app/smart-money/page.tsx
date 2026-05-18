import { SmartMoneyDashboard } from "@/components/smart-money/smart-money-dashboard";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function SmartMoneyPage() {
  return (
    <DashboardShell>
      <SmartMoneyDashboard />
    </DashboardShell>
  );
}
