import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Creative Digital Agency Indonesia`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    id: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#FAFAFA",
    theme_color: "#F59E0B",
    lang: "id",
    dir: "ltr",
    categories: ["business", "design", "productivity"],
    // All three entries point at one file: `public/arvion.png`, which is 500x500.
    // They used to claim 192x192 and 512x512 — sizes no image on disk has — and a
    // browser picking an icon trusts the declaration over the file. Exporting real
    // 192/512 assets (plus a padded maskable variant, since the logo has no safe-zone
    // margin of its own) is the proper fix; these describe what actually ships.
    icons: [
      {
        src: "/arvion.png",
        sizes: "500x500",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
