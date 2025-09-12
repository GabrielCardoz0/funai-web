import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
nextConfig.images = {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
};