import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress responses
  compress: true,

  // Strip the framework fingerprint header
  poweredByHeader: false,

  // Catch subtle bugs in dev (no runtime cost in production)
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Allowed `quality` values (Next 16 requires whitelisting). 45 is used by
    // the decorative hero tiles; 75 is the default for content imagery.
    qualities: [45, 75],
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      // Supabase Storage
      {
        protocol: "https",
        hostname: "aqobnoweyxannqqhixob.supabase.co",
      },
      // Google Drive direct links
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      // Imgur
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      // Country flags (language switcher)
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      // Placeholder avatars/images from the Google Sheets CMS seed data
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },

  // Security & performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Performance.
          //
          // `max-age=0` keeps the *browser* revalidating on every visit while
          // `s-maxage` lets Vercel's CDN keep serving from the edge — the split
          // that the previous `max-age=3600, stale-while-revalidate=86400` was
          // missing. With that value a returning visitor (or a crawler) could be
          // handed HTML up to a day stale with no chance to check for a newer
          // copy; production was observed serving a 21-hour-old page this way.
          // Revalidation against an unchanged deploy is a 304, so the cost of
          // dropping the browser cache is a header exchange, not a re-download.
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      // Long-term cache for static assets. Content-addressed and safe to pin.
      {
        source: "/(.*)\\.(png|jpg|jpeg|webp|avif|svg|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // API responses are per-request and must never be cached. The catch-all
      // rule above would otherwise hand them the HTML caching policy; a later
      // matching rule wins for the same header key, so this overrides it.
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
        ],
      },
    ];
  },

  // NOTE: no host canonicalization here on purpose. Vercel already 308s the
  // apex to the `www` production domain at the edge, before a request ever
  // reaches this app. Adding an app-level `www -> apex` redirect on top of that
  // makes the two layers bounce requests at each other forever
  // (ERR_TOO_MANY_REDIRECTS). Change the canonical host in the Vercel dashboard,
  // not here — and keep `SITE_URL` in `lib/site.ts` pointed at whatever it says.

  // Experimental: faster builds
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
