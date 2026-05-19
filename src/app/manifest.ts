import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VANTAUU — AI On-chain Intelligence",
    short_name: "VANTAUU",
    description:
      "AI-powered on-chain intelligence for smart money, capital flow, narratives, and market signals.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#080b18",
    theme_color: "#080b18",
    icons: [
      {
        src: "/icon.svg?v=signal-v1",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/favicon-16x16.png?v=signal-v1",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/favicon-32x32.png?v=signal-v1",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/android-chrome-192x192.png?v=signal-v1",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png?v=signal-v1",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png?v=signal-v1",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png?v=signal-v1",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon.png?v=signal-v1",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["finance", "business", "productivity"],
  };
}
