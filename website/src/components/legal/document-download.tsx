"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Share,
  Printer,
  ChevronDown,
  FileText,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentDownloadProps {
  title: string;
  lastUpdated: string;
  pdfUrl?: string;
}

const DocumentDownload: React.FC<DocumentDownloadProps> = ({
  title,
  lastUpdated,
  pdfUrl = "#",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlePrint = () => {
    window.print();
    setIsDropdownOpen(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `${title} - Last updated: ${lastUpdated}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback - copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-8 print:hidden"
      data-oid="l0xmxzw"
    >
      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        data-oid="f.itiiu"
      >
        <div className="flex items-center gap-3" data-oid="cmigz6p">
          <div
            className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2 text-blue-600 dark:text-blue-400"
            data-oid="sz3pr3y"
          >
            <FileText className="h-5 w-5" data-oid="id:kjm4" />
          </div>
          <div data-oid="nzyiowv">
            <h3
              className="text-lg font-medium text-gray-900 dark:text-white"
              data-oid="06neo28"
            >
              {title}
            </h3>
            <div
              className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400"
              data-oid="w4-_eq5"
            >
              <Calendar className="h-3.5 w-3.5" data-oid="liva9_i" />
              <span data-oid="-4srwwv">Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>

        <div
          className="flex items-center gap-2 w-full md:w-auto"
          data-oid="siiw3x8"
        >
          <a
            href={pdfUrl}
            download={`${title.replace(/\s+/g, "-").toLowerCase()}.pdf`}
            className="inline-flex items-center gap-1.5 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/50 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 md:flex-auto justify-center"
            data-oid="d-62fo-"
          >
            <Download className="h-4 w-4" data-oid=".75tbkj" />
            <span data-oid="wybbax9">Download PDF</span>
          </a>

          <div className="relative" data-oid="3hmg41e">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              data-oid="vwi6veb"
            >
              <span className="sr-only md:not-sr-only" data-oid="ak_ue:h">
                More
              </span>
              <ChevronDown className="h-4 w-4" data-oid="_l.r_ab" />
            </button>

            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-100 dark:border-gray-800 z-10"
                data-oid="-u60nyn"
              >
                <div className="py-1" data-oid="_ru:pb_">
                  <button
                    onClick={handlePrint}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    data-oid="05l42cn"
                  >
                    <Printer className="h-4 w-4" data-oid="eve-txa" />
                    <span data-oid="rvp4hv0">Print</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    data-oid="c6vh0mb"
                  >
                    <Share className="h-4 w-4" data-oid="j420efi" />
                    <span data-oid="iz63ufm">Share</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDownload;
