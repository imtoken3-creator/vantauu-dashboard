import type { Metadata, Viewport } from "next";
import "./globals.css";

import { ProductionAnalytics } from "@/components/analytics/production-analytics";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vantauu.ai";
const siteTitle = "VANTAUU — AI On-chain Intelligence";
const siteDescription =
  "AI-powered on-chain intelligence for tracking smart money, capital flow, narratives, and market signals in real time.";
const previewImageAlt = "VANTAUU AI on-chain intelligence terminal";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "VANTAUU",
  title: {
    default: siteTitle,
    template: "%s | VANTAUU",
  },
  description: siteDescription,
  keywords: [
    "VANTAUU",
    "AI on-chain intelligence",
    "Web3 intelligence",
    "on-chain analytics",
    "smart money",
    "capital flow",
    "wallet intelligence",
    "crypto narratives",
    "crypto AI",
  ],
  authors: [{ name: "VANTAUU" }],
  creator: "VANTAUU",
  publisher: "VANTAUU",
  category: "Finance Technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: "Detect capital intent before markets move with AI-powered crypto intelligence.",
    url: siteUrl,
    siteName: "VANTAUU",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: previewImageAlt,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: "Detect capital intent before markets move with AI-powered crypto intelligence.",
    images: [
      {
        url: "/twitter-image",
        alt: previewImageAlt,
      },
    ],
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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [
      {
        url: "/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        rel: "icon",
        url: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "VANTAUU",
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
