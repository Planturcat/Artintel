import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Artintel",
  description:
    "Learn about how Artintel uses cookies and similar technologies on our website.",
};

export default function CookieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
