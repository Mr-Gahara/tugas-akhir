import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  transpilePackages: [
    "@uploadthing/react",
    "@uploadthing/server",
    "uploadthing"
  ],
  serverComponentsExternalPackages: ["@uploadthing/shared"],
  turbo: {
    rules: {
    },
  },

  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

export default nextConfig;