import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arvion — Creative Digital Agency Indonesia",
    short_name: "Arvion",
    description:
      "Arvion adalah creative digital agency Indonesia untuk jasa desain grafis, branding, landing page, company profile, e-commerce, dan website custom berkualitas tinggi.",
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
