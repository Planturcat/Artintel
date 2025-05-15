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
    unoptimized: process.env.NODE_ENV === 'development', // Only unoptimized in development
    domains: ['api.artintel.ai'], // Add domains for external images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Responsive image sizes
  },

  // Use server-side rendering with standalone output
  output: 'standalone',

  // Performance optimizations
  swcMinify: true, // Use SWC minifier for better performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console in production
  },

  // Skip static generation for specific pages
  experimental: {
    // Disable static generation for not-found page
    appDocumentPreloading: false,
    // Enable optimizeCss for production
    optimizeCss: process.env.NODE_ENV === 'production',
  },

  // Redirect from root to login page
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },

  // Add headers for security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;