"use client";
import LegalPageLayout from "./layout";
import { ShieldCheck } from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      icon={ShieldCheck}
      data-oid="67a0.fd"
    >
      <h2 data-oid="rie:sq9">1. Information We Collect</h2>
      <p data-oid="g20kdb:">
        We collect information you provide directly to us, such as when you
        create an account, and information collected automatically, such as
        usage data...
      </p>

      <h2 data-oid="ow:83n.">2. How We Use Information</h2>
      <p data-oid="1du6xzk">
        We use the information we collect to provide, maintain, and improve our
        Service...
      </p>

      <h2 data-oid="_75igkq">3. Information Sharing</h2>
      <p data-oid="nd-f637">
        We do not share your personal information except in limited
        circumstances described here...
      </p>

      {/* Add more sections as required */}
      <p data-oid="nth.gpr">
        <strong data-oid="iqnh6fd">Last Updated:</strong> [Date]
      </p>
      <p data-oid="rz0orpl">
        <em data-oid="zyctvbi">[Placeholder - Replace with full legal text]</em>
      </p>
    </LegalPageLayout>
  );
};

export default PrivacyPolicyPage;
