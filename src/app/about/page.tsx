import type { Metadata } from "next";

import { AboutPage } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Vantauu's mission to build an AI-native on-chain intelligence platform for real-time market cognition.",
  openGraph: {
    title: "About Vantauu",
    description:
      "Vantauu is building market cognition for the AI era.",
    type: "website",
  },
};

export default function About() {
  return <AboutPage />;
}
