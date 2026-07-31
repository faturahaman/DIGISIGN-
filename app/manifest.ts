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
    icons: [
      {
        src: "/arvion.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/arvion.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/arvion.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
