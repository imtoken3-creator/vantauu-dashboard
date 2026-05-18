import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vantauu | AI On-chain Intelligence",
    template: "%s | Vantauu",
  },
  description:
    "AI-powered on-chain intelligence for smart money, capital flow, narratives, and real-time market signals.",
  keywords: [
    "Vantauu",
    "Web3 intelligence",
    "on-chain analytics",
    "smart money",
    "capital flow",
    "crypto AI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
