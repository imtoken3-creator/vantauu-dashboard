import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vantauu.ai";

const routes = [
  "",
  "/about",
  "/founding-leadership",
  "/dashboard",
  "/smart-money",
  "/capital-flow",
  "/narratives",
  "/alerts",
  "/docs",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/dashboard" ? 0.9 : 0.75,
  }));
}
