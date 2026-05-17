import type { Metadata } from "next";
import "./globals.css";

import { DashboardShell } from "@/components/layout/dashboard-shell";

export const metadata: Metadata = {
  title: "Vantauu Intelligence",
  description: "Web3 AI SaaS dashboard for crypto intelligence signals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full bg-background text-foreground antialiased">
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
