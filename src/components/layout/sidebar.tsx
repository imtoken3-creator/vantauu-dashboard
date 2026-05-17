"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BookOpen,
  BrainCircuit,
  ChartNoAxesCombined,
  CircleDollarSign,
  LayoutDashboard,
  RadioTower,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Smart Money", href: "/smart-money", icon: BrainCircuit },
  { name: "Capital Flow", href: "/capital-flow", icon: CircleDollarSign },
  { name: "Narratives", href: "/narratives", icon: ChartNoAxesCombined },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Docs", href: "/docs", icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-sidebar-border bg-sidebar/84 p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl lg:flex lg:flex-col">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),transparent_18rem),linear-gradient(115deg,rgba(124,140,255,0.1),transparent_24rem)]" />

      <Link href="/" className="relative mb-8 flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-white/[0.035]">
        <div className="flex size-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/15 text-primary shadow-lg shadow-primary/20">
          <RadioTower className="size-5" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
            Vantauu
          </p>
          <p className="text-xs text-muted-foreground">Crypto Intelligence</p>
        </div>
      </Link>

      <nav className="relative space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex h-10 items-center gap-3 rounded-lg border border-transparent px-3 text-sm text-sidebar-foreground/70 transition duration-300",
                "hover:border-white/10 hover:bg-sidebar-accent hover:text-white",
                isActive &&
                  "border-primary/25 bg-sidebar-accent text-white shadow-lg shadow-primary/10"
              )}
            >
              <item.icon
                className={cn(
                  "size-4 transition group-hover:text-cyan-200",
                  isActive && "text-primary"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="surface-card relative mt-auto bg-white/[0.045]">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
          <Sparkles className="size-4 text-primary" />
          AI Signal Engine
        </div>
        <p className="text-xs leading-5 text-muted-foreground">
          Monitoring 42K wallets, bridge flows, social narratives, and exchange
          pressure with mock intelligence data.
        </p>
      </div>
    </aside>
  );
}
