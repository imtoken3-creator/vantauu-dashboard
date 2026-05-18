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
} from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { name: "Home", href: "/dashboard", icon: LayoutDashboard },
  { name: "Smart", href: "/smart-money", icon: BrainCircuit },
  { name: "Flow", href: "/capital-flow", icon: CircleDollarSign },
  { name: "Themes", href: "/narratives", icon: ChartNoAxesCombined },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Docs", href: "/docs", icon: BookOpen },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile dashboard navigation"
      className="glow-border fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 grid grid-cols-6 rounded-lg border border-white/10 bg-background/88 p-1 shadow-xl shadow-black/30 backdrop-blur-xl lg:hidden"
    >
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex h-12 flex-col items-center justify-center gap-1 rounded-md text-[10px] text-muted-foreground transition duration-300 hover:bg-white/[0.045] hover:text-white",
              isActive && "bg-primary/15 text-white shadow-inner shadow-primary/10"
            )}
            aria-label={item.name}
            aria-current={isActive ? "page" : undefined}
          >
            <item.icon
              className={cn(
                "size-4 transition",
                isActive && "text-primary drop-shadow-[0_0_10px_rgba(124,140,255,0.6)]"
              )}
            />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
