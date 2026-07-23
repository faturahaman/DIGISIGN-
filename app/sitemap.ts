import type { MetadataRoute } from "next";

const DOMAINS = [
  "https://arvion.riffatur.com",
  "https://arvion-creative.vercel.app"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return DOMAINS.map(domain => ({
    url: domain,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }));
}
