"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";

const PrivacyPolicyPage = () => {
  return (
    <MaxWidthWrapper className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you
            create an account, and information collected automatically, such as
            usage data...
          </p>

          <h2>2. How We Use Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our
            Service...
          </p>

          <h2>3. Information Sharing</h2>
          <p>
            We do not share your personal information except in limited
            circumstances described here...
          </p>

          <p>
            <strong>Last Updated:</strong> [Date]
          </p>
          <p>
            <em>[Placeholder - Replace with full legal text]</em>
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default PrivacyPolicyPage;
