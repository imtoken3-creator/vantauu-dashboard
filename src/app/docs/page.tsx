import { ApiDocsDashboard } from "@/components/docs/api-docs-dashboard";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function DocsPage() {
  return (
    <DashboardShell>
      <ApiDocsDashboard />
    </DashboardShell>
  );
}
