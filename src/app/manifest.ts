import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vantauu | AI On-chain Intelligence",
    short_name: "Vantauu",
    description:
      "AI-powered on-chain intelligence for smart money, capital flow, narratives, and market signals.",
    start_url: "/",
    display: "standalone",
    background_color: "#080b18",
    theme_color: "#080b18",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
