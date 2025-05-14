"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib";

// SVG file categories
const SVG_CATEGORIES = [
  {
    name: "Icons",
    path: "/icons",
    files: [
      "artintel-logo.svg",
      "clock.svg",
      "icon.svg",
      "magicpen.svg",
      "metric-one.svg",
      "metric-three.svg",
      "metric-two.svg",
      "perk-four.svg",
      "perk-one.svg",
      "perk-three.svg",
      "perk-two.svg",
      "shield.svg",
    ],
  },
  {
    name: "Images",
    path: "/images",
    files: [
      "about-gradient.svg",
      "dashboard.svg",
      "f1.svg",
      "f2.svg",
      "f3.svg",
      "f4.svg",
      "feature-one.svg",
      "feature-two.svg",
      "feature-three.svg",
      "feature-four.svg",
      "feature-five.svg",
      "grid-lines.svg",
      "hero-gradient.svg",
      "hiw-one.svg",
      "hiw-three.svg",
      "hiw-two.svg",
      "quote.svg",
    ],
  },
  {
    name: "Artintel",
    path: "/images/artintel",
    files: [
      "deploy-scale.svg",
      "fine-tune.svg",
      "model-selection.svg",
    ],
  },
  {
    name: "Logo",
    path: "/logo",
    files: [
      "wordmark.svg",
    ],
  },
];

export default function SVGShowcasePage() {
  const [activeCategory, setActiveCategory] = useState(SVG_CATEGORIES[0].name);
  const [hoveredSvg, setHoveredSvg] = useState<string | null>(null);

  // Get the current category
  const currentCategory = SVG_CATEGORIES.find(cat => cat.name === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00CBDD] to-white">
            SVG Showcase
          </h1>
          <Link href="/demo">
            <Button variant="outline" size="sm">← Back to Demo Home</Button>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {SVG_CATEGORIES.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={cn(
                "px-4 py-2 rounded-md transition-all",
                activeCategory === category.name 
                  ? "bg-[#00cbdd]/20 text-[#00cbdd]" 
                  : "bg-neutral-900 hover:bg-neutral-800"
              )}
            >
              {category.name} ({category.files.length})
            </button>
          ))}
        </div>

        {/* SVG grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentCategory?.files.map((file) => {
            const fullPath = `${currentCategory.path}/${file}`;
            const isHovered = hoveredSvg === fullPath;
            
            return (
              <div 
                key={file}
                className={cn(
                  "bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 transition-all",
                  isHovered ? "scale-105 shadow-lg shadow-[#00cbdd]/20 border-[#00cbdd]/50" : ""
                )}
                onMouseEnter={() => setHoveredSvg(fullPath)}
                onMouseLeave={() => setHoveredSvg(null)}
              >
                <div className="p-4 h-48 flex items-center justify-center bg-[#191919]">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={fullPath}
                      alt={file}
                      width={150}
                      height={150}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
                <div className="p-4 border-t border-neutral-800">
                  <h3 className="font-medium mb-1 truncate">{file}</h3>
                  <p className="text-xs text-neutral-400 truncate">{fullPath}</p>
                  
                  <div className="mt-3 flex gap-2">
                    <a 
                      href={fullPath} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs bg-neutral-800 hover:bg-neutral-700 px-2 py-1 rounded transition-colors"
                    >
                      View
                    </a>
                    <button 
                      onClick={() => navigator.clipboard.writeText(fullPath)}
                      className="text-xs bg-neutral-800 hover:bg-neutral-700 px-2 py-1 rounded transition-colors"
                    >
                      Copy Path
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SVG information */}
        <div className="mt-12 bg-neutral-900 rounded-lg p-6 border border-neutral-800">
          <h2 className="text-xl font-bold mb-4">About SVG Files</h2>
          <p className="text-neutral-400 mb-4">
            This page showcases all SVG files used in the Artintel project. SVGs are organized by category and can be viewed individually.
          </p>
          
          <h3 className="text-lg font-medium mt-6 mb-2">Usage in Components</h3>
          <p className="text-neutral-400 mb-2">
            SVGs are used throughout the application in various components:
          </p>
          <ul className="list-disc list-inside text-neutral-400 space-y-1">
            <li><code className="bg-neutral-800 px-1 py-0.5 rounded text-xs">/icons/*.svg</code> - Used for UI elements and feature icons</li>
            <li><code className="bg-neutral-800 px-1 py-0.5 rounded text-xs">/images/*.svg</code> - Used for larger illustrations and backgrounds</li>
            <li><code className="bg-neutral-800 px-1 py-0.5 rounded text-xs">/images/artintel/*.svg</code> - Custom illustrations for Artintel features</li>
            <li><code className="bg-neutral-800 px-1 py-0.5 rounded text-xs">/logo/*.svg</code> - Brand assets</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-6 mb-2">Implementation</h3>
          <p className="text-neutral-400">
            SVGs can be imported in components using Next.js Image component or directly as React components for more complex interactions.
          </p>
          
          <div className="mt-4 p-4 bg-neutral-950 rounded-md">
            <pre className="text-xs text-neutral-300 overflow-x-auto">
{`// Using Next.js Image component
import Image from "next/image";

<Image 
  src="/icons/perk-one.svg"
  alt="Feature Icon" 
  width={24} 
  height={24} 
/>

// For SVGs with animations or interactions, import as React component
import { ReactComponent as FeatureIcon } from "@/components/icons/feature-icon.svg";

<FeatureIcon className="w-6 h-6 text-cyan-500" />`}
            </pre>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800 p-6 mt-12">
        <div className="max-w-7xl mx-auto text-center text-neutral-400 text-sm">
          <p>SVG files are located in the public directory and can be accessed directly via their paths.</p>
          <p className="mt-2">For a complete list of all site pages and components, see the <Link href="/site.md" className="text-[#00cbdd] hover:underline">site.md</Link> document.</p>
        </div>
      </footer>
    </div>
  );
}
