/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  reactStrictMode: true,
  // Disable static generation for specific pages
  experimental: {
    // Disable static generation for not-found page
    appDocumentPreloading: false,
    // Disable middleware
    skipMiddlewareUrlNormalize: true,
    // Disable trailing slash
    skipTrailingSlashRedirect: true
  },
  // Configure images
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;