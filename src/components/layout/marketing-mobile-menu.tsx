"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";

type MarketingLink = {
  label: string;
  href: string;
};

type MarketingMobileMenuProps = {
  links: MarketingLink[];
  cta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
};

export function MarketingMobileMenu({ links, cta }: MarketingMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  function handleCtaClick() {
    closeMenu();
    cta?.onClick?.();
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls={menuId}
        className="inline-flex size-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.055] text-white shadow-lg shadow-black/20 transition duration-200 hover:border-primary/30 hover:bg-primary/10"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu overlay"
            className="fixed inset-0 top-16 z-[58] bg-black/35"
            onClick={closeMenu}
          />
          <div
            id={menuId}
            className="fixed inset-x-3 top-[calc(4.5rem+env(safe-area-inset-top))] z-[60] max-h-[min(75vh,calc(100dvh-6rem))] overflow-y-auto rounded-lg border border-white/10 bg-background/96 p-2 shadow-xl shadow-black/35 backdrop-blur-sm"
          >
            <nav aria-label="Mobile navigation" className="grid gap-1">
              {links.map((link) => {
                const active = pathname === link.href;
                const internalAnchor = link.href.startsWith("#");
                const content = (
                  <span
                    className={cn(
                      "flex min-h-11 items-center justify-between rounded-md px-3 text-sm font-medium text-muted-foreground transition duration-200 hover:bg-white/[0.055] hover:text-white",
                      active && "bg-primary/15 text-white"
                    )}
                  >
                    {link.label}
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </span>
                );

                return internalAnchor ? (
                  <a key={link.href} href={link.href} onClick={closeMenu}>
                    {content}
                  </a>
                ) : (
                  <Link key={link.href} href={link.href} onClick={closeMenu}>
                    {content}
                  </Link>
                );
              })}
            </nav>

            {cta &&
              (cta.href ? (
                <a
                  href={cta.href}
                  className="mt-2 flex min-h-11 items-center justify-center rounded-lg border border-primary/40 bg-primary/90 px-4 text-sm font-medium text-white shadow-lg shadow-primary/20"
                  onClick={closeMenu}
                >
                  {cta.label}
                </a>
              ) : (
                <button
                  type="button"
                  className="mt-2 flex min-h-11 w-full items-center justify-center rounded-lg border border-primary/40 bg-primary/90 px-4 text-sm font-medium text-white shadow-lg shadow-primary/20"
                  onClick={handleCtaClick}
                >
                  {cta.label}
                </button>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
