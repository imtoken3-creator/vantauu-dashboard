export function DashboardRouteLoading({
  label = "Loading intelligence surface",
}: {
  label?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="section-surface-grid min-h-[520px]"
    >
      <div className="absolute inset-0 cyber-grid opacity-15" />
      <div className="relative flex h-full min-h-[460px] items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span>{label}</span>
            <span className="ai-signal-pulse" />
          </div>
          <div className="chart-skeleton h-44" aria-hidden />
        </div>
      </div>
    </div>
  );
}
