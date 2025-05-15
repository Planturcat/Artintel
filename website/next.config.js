/** @type {import('next').NextConfig} */
const skipStaticPages = require('./skip-static');

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
  },
  // Skip static generation for specific pages
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    // Filter out pages that should be skipped
    const filteredPathMap = {};
    for (const [path, page] of Object.entries(defaultPathMap)) {
      if (!skipStaticPages[path]) {
        filteredPathMap[path] = page;
      }
    }
    return filteredPathMap;
  }
};

module.exports = nextConfig;