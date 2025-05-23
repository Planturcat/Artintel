/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  reactStrictMode: true,
  // Configure images
  images: {
    unoptimized: true
  },
  // Use server-side rendering
  output: 'standalone',
  // Skip static generation for specific pages
  experimental: {
    // Disable static generation for not-found page
    appDocumentPreloading: false
  }
};

module.exports = nextConfig;