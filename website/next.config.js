/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    // Enable React 19 support
    serverComponentsExternalPackages: []
  }
};

module.exports = nextConfig;