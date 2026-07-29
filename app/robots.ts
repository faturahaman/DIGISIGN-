import type { MetadataRoute } from "next";

const PRIMARY_DOMAIN = "https://arviotiv.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${PRIMARY_DOMAIN}/sitemap.xml`,
    host: PRIMARY_DOMAIN,
  };
}
