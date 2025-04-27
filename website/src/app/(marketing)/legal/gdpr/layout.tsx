import React from "react";
import LegalSidebar from "@/components/legal/legal-sidebar";

export const metadata = {
  title: "GDPR Compliance | Artintel",
  description:
    "Read our GDPR Compliance policy to understand how Artintel handles your data in accordance with European data protection laws.",
};

export default function GDPRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8" data-oid="9xmkvrw">
      <div className="flex flex-col lg:flex-row gap-8" data-oid="xq1cjz2">
        <div className="w-full lg:w-1/4 order-2 lg:order-1" data-oid="u1-p80l">
          <div className="sticky top-24" data-oid="h16u94v">
            <LegalSidebar activeItem="gdpr" data-oid="wgg.3mf" />
          </div>
        </div>
        <div className="w-full lg:w-3/4 order-1 lg:order-2" data-oid="dl1zrem">
          {children}
        </div>
      </div>
    </div>
  );
}
