import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This is the correct, non-deprecated key
  serverExternalPackages: [
    '@prisma/client',
    '@prisma/extension-accelerate',
    '@uploadthing/shared', // Merged from the deprecated key
  ],
  images: {
    domains: ["utfs.io"],
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

export default nextConfig;