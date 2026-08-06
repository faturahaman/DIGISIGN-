import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // `/_next/` is deliberately NOT disallowed. It holds the CSS bundles, JS
        // chunks, and the `/_next/image` optimizer output — Googlebot renders the
        // page before indexing it, so blocking those makes it see an unstyled,
        // image-less shell and judge the page on that. Only the API surface,
        // which has nothing to index, is blocked.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
