"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: string;
  title: string;
}

interface DocumentNavigationProps {
  sections: Section[];
}

const DocumentNavigation: React.FC<DocumentNavigationProps> = ({
  sections,
}) => {
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      // Find the section that is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call to set active section

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust for header height
        behavior: "smooth",
      });
      setActiveSection(id);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative mb-8" data-oid="3e9g9.w">
      {/* Mobile view - dropdown */}
      <div className="lg:hidden w-full" data-oid="_5so5.f">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
          data-oid="dvmdsjf"
        >
          <div className="flex items-center" data-oid=":stocd1">
            <List
              className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400"
              data-oid="6s5xw-_"
            />

            <span
              className="text-gray-800 dark:text-gray-200 font-medium"
              data-oid="305ln:l"
            >
              {activeSection
                ? sections.find((s) => s.id === activeSection)?.title
                : "Navigate Document"}
            </span>
          </div>
          <ChevronUp
            className={cn(
              "h-5 w-5 text-gray-600 dark:text-gray-400 transition-transform",
              isOpen ? "" : "transform rotate-180",
            )}
            data-oid="b654s5m"
          />
        </button>

        <AnimatePresence data-oid="5vl..o6">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
              data-oid="1no:dii"
            >
              <div className="py-1" data-oid="fkp8jh7">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm",
                      activeSection === section.id
                        ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
                    )}
                    data-oid="a:o0epw"
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop view - tabs */}
      <div className="hidden lg:block" data-oid="op0xrvs">
        <nav className="flex space-x-1 overflow-x-auto pb-2" data-oid="1sm04xp">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "min-w-max px-4 py-2 text-sm font-medium rounded-md transition-colors",
                activeSection === section.id
                  ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100",
              )}
              data-oid="00rpyys"
            >
              {section.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DocumentNavigation;
