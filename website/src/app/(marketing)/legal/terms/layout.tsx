import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Artintel",
  description:
    "Read our Terms of Service to understand the rules and guidelines for using Artintel's platform and services.",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
