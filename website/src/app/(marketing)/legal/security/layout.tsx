import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security | Artintel",
  description:
    "Learn about Artintel's security practices and how we protect your data.",
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
