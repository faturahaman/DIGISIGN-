import type { MetadataRoute } from "next";

const PRIMARY_DOMAIN = "https://arviotiv.com";

// Single-page site: expose the primary URL plus in-page section anchors so
// search engines can surface deep links to key sections.
const SECTIONS: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "#services", priority: 0.9, changeFrequency: "weekly" },
  { path: "#portfolio", priority: 0.9, changeFrequency: "weekly" },
  { path: "#process", priority: 0.7, changeFrequency: "monthly" },
  { path: "#testimonials", priority: 0.7, changeFrequency: "monthly" },
  { path: "#faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "#contact", priority: 0.8, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return SECTIONS.map(({ path, priority, changeFrequency }) => ({
    url: `${PRIMARY_DOMAIN}/${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
