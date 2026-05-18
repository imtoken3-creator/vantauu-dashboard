import type { Metadata } from "next";

import { LandingPage } from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: "Vantauu | AI On-chain Intelligence",
  description:
    "Vantauu is an AI-powered on-chain intelligence platform for tracking smart money, capital flow, narratives, and market signals in real time.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Vantauu | AI On-chain Intelligence",
    description:
      "Detect capital intent before markets move with AI-powered Web3 intelligence.",
    url: "/",
    type: "website",
  },
  twitter: {
    title: "Vantauu | AI On-chain Intelligence",
    description:
      "Detect capital intent before markets move with AI-powered Web3 intelligence.",
  },
};

export default function Home() {
  return <LandingPage />;
}
