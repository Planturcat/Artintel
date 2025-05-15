/**
 * Metadata configuration for SEO
 * This file contains default metadata for the application
 */

import { Metadata } from "next";

// Default metadata for the application
export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_APP_NAME || 'Artintel',
    template: '%s | Artintel',
  },
  description: "Harness the power of state-of-the-art language models to enhance your creativity, productivity, and problem-solving capabilities.",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
  themeColor: "#00031b",
  keywords: [
    'AI',
    'artificial intelligence',
    'machine learning',
    'model management',
    'model deployment',
    'LLM',
    'large language models',
  ],
  authors: [
    {
      name: 'Artintel Team',
      url: 'https://artintel.ai',
    },
  ],
  creator: 'Artintel',
  publisher: 'Artintel',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    title: "Artintel - Advanced AI for Creative Minds",
    description: "Harness the power of state-of-the-art language models to enhance your creativity, productivity, and problem-solving capabilities.",
    type: "website",
    locale: "en_US",
    siteName: "Artintel",
    images: [
      {
        url: 'https://artintel.ai/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Artintel - AI Model Management Platform',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artintel - Advanced AI for Creative Minds",
    description: "Harness the power of state-of-the-art language models to enhance your creativity, productivity, and problem-solving capabilities.",
    creator: '@artintelai',
    images: ['https://artintel.ai/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  applicationName: 'Artintel',
  category: 'technology',
};

// Generate metadata for specific pages
export function generateMetadata(
  title: string,
  description?: string,
  path?: string
): Metadata {
  return {
    ...metadata,
    title,
    description: description || metadata.description,
    openGraph: {
      ...metadata.openGraph,
      title: `${title} | Artintel`,
      description: description || (metadata.openGraph?.description as string),
    },
    twitter: {
      ...metadata.twitter,
      title: `${title} | Artintel`,
      description: description || (metadata.twitter?.description as string),
    },
  };
}