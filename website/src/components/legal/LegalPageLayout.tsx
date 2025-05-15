"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";
import { cn } from "@/utils";

interface LegalPageLayoutProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  [key: string]: any;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  icon: Icon,
  children,
  ...props
}) => {
  return (
    <MaxWidthWrapper className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          {Icon && (
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
          )}
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {children}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default LegalPageLayout;
