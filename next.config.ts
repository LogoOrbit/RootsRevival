import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * The pictures in /public/art are already sized and compressed, and the
     * Vercel plan this site runs on does not include the image optimizer,
     * which was returning 402 for every picture. Serving the files as they
     * are keeps every image working on any plan.
     */
    unoptimized: true,
  },
};

export default nextConfig;
