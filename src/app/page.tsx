import type { Metadata } from "next";

import { LandingPage } from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: "VANTAUU — AI On-chain Intelligence",
  description:
    "Vantauu is an AI-powered on-chain intelligence platform for tracking smart money, capital flow, narratives, and market signals in real time.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "VANTAUU — AI On-chain Intelligence",
    description:
      "Detect capital intent before markets move with AI-powered Web3 intelligence.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "VANTAUU AI on-chain intelligence terminal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VANTAUU — AI On-chain Intelligence",
    description:
      "Detect capital intent before markets move with AI-powered Web3 intelligence.",
    images: [
      {
        url: "/twitter-image",
        alt: "VANTAUU AI on-chain intelligence terminal",
      },
    ],
  },
};

export default function Home() {
  return <LandingPage />;
}
