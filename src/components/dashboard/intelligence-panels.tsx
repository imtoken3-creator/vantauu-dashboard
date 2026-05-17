import { ArrowUpRight, Layers3, WalletCards } from "lucide-react";

import { EmptyState } from "@/components/dashboard/empty-state";
import { narrativeMatrix, walletClusters } from "@/data/mock";
import { isEmpty } from "@/lib/collection";

export function IntelligencePanels() {
  return (
    <section className="grid gap-6 xl:grid-cols-[1fr_0.72fr]">
      <div className="section-surface">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="section-eyebrow">
              Market Structure
            </p>
            <h2 className="text-lg font-semibold text-white">
              Narrative Heat Matrix
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Attention, liquidity, and smart wallet velocity
            </p>
          </div>
          <Layers3 className="size-5 text-primary" />
        </div>

        <div className="space-y-3">
          {isEmpty(narrativeMatrix) ? (
            <EmptyState
              title="No narrative heat"
              description="Heat matrix rows will appear when mock narrative data is available."
            />
          ) : narrativeMatrix.map((item) => (
            <article
              key={item.name}
              className="interactive-row group grid gap-4 sm:grid-cols-[1fr_120px_100px]"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-primary shadow-[0_0_18px_rgba(124,140,255,0.85)]" />
                  <h3 className="font-medium text-white">{item.name}</h3>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-primary to-violet-400"
                    style={{ width: `${item.heat}%` }}
                  />
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Net flow</p>
                <p className="mt-1 font-medium text-emerald-300">{item.flow}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Velocity</p>
                <p className="mt-1 font-medium text-primary">
                  {item.velocity}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="section-surface">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="section-eyebrow">
              Entity Layer
            </p>
            <h2 className="text-lg font-semibold text-white">
              Wallet Clusters
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Entity groups with rising activity
            </p>
          </div>
          <WalletCards className="size-5 text-primary" />
        </div>

        <div className="space-y-3">
          {isEmpty(walletClusters) ? (
            <EmptyState
              title="No wallet clusters"
              description="Cluster cards will appear when mock entity data is available."
            />
          ) : walletClusters.map((cluster) => (
            <div
              key={cluster.name}
              className="interactive-row-cyan group"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white">
                    {cluster.name}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
                    {cluster.count}
                  </p>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:text-primary" />
              </div>
              <p className="mt-3 text-xs text-emerald-300">{cluster.delta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
