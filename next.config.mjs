/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the correct key for this version of Next.js 14
  serverComponentsExternalPackages: [
    '@prisma/client',
    '@prisma/extension-accelerate',
    '@uploadthing/shared',
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