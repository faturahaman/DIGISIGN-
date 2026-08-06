import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Single-page site, so the sitemap is a single URL.
 *
 * Section anchors (`/#services`, `/#portfolio`, …) used to be listed here as
 * separate entries. They were removed on purpose: a fragment is not part of the
 * URL a crawler requests, so every one of them normalized back to `/` — Google
 * saw the same page submitted seven times and reported the extras as duplicates
 * rather than as deep links. Section deep-links in search results come from the
 * page's own heading/anchor structure, which the sitemap has no say over.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
