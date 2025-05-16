import type { Metadata } from "next";
import RootLayout from './layout';

export const metadata: Metadata = {
  title: {
    template: '%s | Artintel',
    default: 'Artintel - Advanced AI for Creative Minds',
  },
  description: "Harness the power of state-of-the-art language models to enhance your creativity, productivity, and problem-solving capabilities.",
  viewport: "width=device-width, initial-scale=0.0",
  themeColor: "#00091b",
};

export default function RootWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout>{children}</RootLayout>;
} 