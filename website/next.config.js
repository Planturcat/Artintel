/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  reactStrictMode: true,
  serverExternalPackages: [],
  // Disable static generation for specific pages
  experimental: {
    // Disable static generation for not-found page
    disableStaticGeneration: true
  }
};

module.exports = nextConfig;