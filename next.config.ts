import type { NextConfig } from "next";

/**
 * Two build targets from one codebase:
 *  - Default (Vercel, Netlify, any Node host): full Next.js with image optimisation.
 *  - NEXT_OUTPUT=export (GitHub Pages or any static host): plain HTML/CSS/JS in /out.
 *
 * NEXT_PUBLIC_BASE_PATH is only needed when the site lives in a sub-folder,
 * e.g. https://username.github.io/portfolio  ->  NEXT_PUBLIC_BASE_PATH=/portfolio
 */
const isStaticExport = process.env.NEXT_OUTPUT === "export";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isStaticExport ? { output: "export" as const, trailingSlash: true } : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  images: {
    // Static hosts can't run the image optimiser; images are pre-sized in src/assets instead.
    unoptimized: isStaticExport,
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
