import type { Metadata, Viewport } from "next";
import "./globals.css";

import { ProductionAnalytics } from "@/components/analytics/production-analytics";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vantauu.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Vantauu",
  title: {
    default: "Vantauu | AI On-chain Intelligence",
    template: "%s | Vantauu",
  },
  description:
    "AI-powered on-chain intelligence for tracking smart money, capital flow, narratives, and market signals in real time.",
  keywords: [
    "Vantauu",
    "AI on-chain intelligence",
    "Web3 intelligence",
    "on-chain analytics",
    "smart money",
    "capital flow",
    "wallet intelligence",
    "crypto narratives",
    "crypto AI",
  ],
  authors: [{ name: "Vantauu" }],
  creator: "Vantauu",
  publisher: "Vantauu",
  category: "Finance Technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vantauu | AI On-chain Intelligence",
    description:
      "Detect capital intent before markets move with AI-powered crypto intelligence.",
    url: siteUrl,
    siteName: "Vantauu",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Vantauu AI on-chain intelligence terminal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vantauu | AI On-chain Intelligence",
    description:
      "Detect capital intent before markets move with AI-powered crypto intelligence.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    title: "Vantauu",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080b18" },
    { media: "(prefers-color-scheme: light)", color: "#080b18" },
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
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-16 rounded-lg border border-primary/30 bg-background px-4 py-2 text-sm font-medium text-white shadow-xl shadow-primary/15 transition focus:translate-y-0 focus:outline-none focus:ring-4 focus:ring-primary/20"
        >
          Skip to content
        </a>
        {children}
        <ProductionAnalytics />
      </body>
    </html>
  );
}
