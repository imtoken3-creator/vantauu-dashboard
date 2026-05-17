import { Bell, Command, Search, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

export function TopNavbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-background/72 px-4 py-3 shadow-lg shadow-black/10 backdrop-blur-2xl sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1680px] items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[0.68rem] uppercase tracking-[0.26em] text-primary">
            Intelligence Console
          </p>
          <h1 className="mt-1 truncate text-lg font-semibold tracking-tight text-white sm:text-2xl">
            On-chain AI Command Center
          </h1>
        </div>

        <div className="hidden min-w-80 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-muted-foreground shadow-inner shadow-white/[0.04] backdrop-blur-xl transition duration-300 hover:border-primary/25 hover:bg-white/[0.065] md:flex">
          <Search className="size-4" />
          <span>Search wallet, token, entity</span>
          <span className="ml-auto flex items-center gap-1 rounded-md border border-white/10 px-1.5 py-0.5 text-[11px]">
            <Command className="size-3" /> K
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Alerts"
            className="border-white/10 bg-white/[0.045] shadow-lg shadow-black/10 hover:border-primary/25 hover:bg-primary/10"
          >
            <Bell className="size-4" />
          </Button>
          <Button className="hidden border border-primary/30 bg-primary/90 shadow-lg shadow-primary/20 hover:-translate-y-0.5 hover:bg-primary hover:shadow-primary/30 sm:inline-flex">
            <Zap className="size-4" />
            Run Scan
          </Button>
        </div>
      </div>
    </header>
  );
}
