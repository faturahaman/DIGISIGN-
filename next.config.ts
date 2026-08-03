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
          // Performance
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
      // Long-term cache for static assets
      {
        source: "/(.*)\\.(png|jpg|jpeg|webp|avif|svg|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.arviotiv.com",
          },
        ],
        destination: "https://arviotiv.com/:path*",
        permanent: true,
      },
    ];
  },

  // Experimental: faster builds
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
