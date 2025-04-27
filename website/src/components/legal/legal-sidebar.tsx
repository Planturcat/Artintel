"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  Lock,
  RefreshCw,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  Target,
  Cookie,
} from "lucide-react";

interface LegalLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  id: string;
}

interface LegalSidebarProps {
  activeItem?: string;
}

const LegalSidebar: React.FC<LegalSidebarProps> = ({
  activeItem = "terms",
}) => {
  const links: LegalLink[] = [
    {
      id: "terms",
      href: "/terms",
      label: "Terms of Service",
      icon: <FileText className="h-5 w-5" data-oid="lv0.a7_" />,
      description: "General platform usage terms",
    },
    {
      id: "privacy",
      href: "/privacy-policy",
      label: "Privacy Policy",
      icon: <ShieldCheck className="h-5 w-5" data-oid="ux2toyc" />,
      description: "How we handle your data",
    },
    {
      id: "gdpr",
      href: "/legal/gdpr",
      label: "GDPR Compliance",
      icon: <Target className="h-5 w-5" data-oid="v0q33t_" />,
      description: "European data protection standards",
    },
    {
      id: "cookies",
      href: "/legal/cookies",
      label: "Cookie Policy",
      icon: <Cookie className="h-5 w-5" data-oid="6cvbs0u" />,
      description: "How we use cookies",
    },
    {
      id: "security",
      href: "/legal/security",
      label: "Security",
      icon: <Lock className="h-5 w-5" data-oid="i20d_wr" />,
      description: "Our security practices",
    },
    {
      id: "contact",
      href: "/contact",
      label: "Contact Us",
      icon: <MessageSquare className="h-5 w-5" data-oid="nurbx02" />,
      description: "Get in touch about our terms",
    },
  ];

  return (
    <div
      className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 p-4"
      data-oid="rli5-m0"
    >
      <div className="mb-4" data-oid="qja3cgn">
        <h3
          className="text-lg font-medium text-gray-900 dark:text-white"
          data-oid="aew.cvi"
        >
          Legal Documents
        </h3>
        <p
          className="text-sm text-gray-500 dark:text-gray-400"
          data-oid="og5v0.w"
        >
          Our policies and terms
        </p>
      </div>

      <nav className="space-y-1" data-oid="ydzko-4">
        {links.map((link) => {
          const isActive = activeItem === link.id;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md group transition-colors",
                isActive
                  ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
              )}
              data-oid="nei_:5y"
            >
              <div
                className={cn(
                  "mr-3",
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-500 dark:text-gray-400",
                )}
                data-oid="gc60ocm"
              >
                {link.icon}
              </div>
              <div className="flex-1" data-oid="oij5_.q">
                <span className="block font-medium" data-oid="0eiprd0">
                  {link.label}
                </span>
                {link.description && (
                  <span
                    className={cn(
                      "block text-xs mt-0.5",
                      isActive
                        ? "text-indigo-500 dark:text-indigo-300"
                        : "text-gray-500 dark:text-gray-400",
                    )}
                    data-oid="7-5g.8l"
                  >
                    {link.description}
                  </span>
                )}
              </div>
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center"
                  data-oid="4_5h6rk"
                >
                  <ChevronRight
                    className="h-4 w-4 text-indigo-600 dark:text-indigo-400"
                    data-oid="20dy:vt"
                  />
                </motion.div>
              )}
            </Link>
          );
        })}
      </nav>

      <div
        className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800"
        data-oid="rpq24bw"
      >
        <div
          className="rounded-md bg-blue-50 dark:bg-blue-900/20 p-3"
          data-oid="ef50.6."
        >
          <div className="flex" data-oid="eyc9mf5">
            <div className="flex-shrink-0" data-oid="df0gvcq">
              <HelpCircle
                className="h-5 w-5 text-blue-600 dark:text-blue-400"
                data-oid="9_rzac."
              />
            </div>
            <div className="ml-3" data-oid="y6h6thp">
              <h4
                className="text-sm font-medium text-blue-800 dark:text-blue-300"
                data-oid="th:e7:t"
              >
                Need help?
              </h4>
              <p
                className="mt-1 text-xs text-blue-700 dark:text-blue-400"
                data-oid="vgj0h.-"
              >
                If you have questions about our terms, please contact our
                support team.
              </p>
              <div className="mt-2" data-oid="ynxz_qy">
                <Link
                  href="/contact"
                  className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                  data-oid="gxr0o2q"
                >
                  Contact Support →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalSidebar;
