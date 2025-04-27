"use client";

import React, { useState } from "react";
import { AdvancedLoader, EnhancedGridLayout } from "@/components/global/loaders";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";
import Container from "@/components/global/container";
import { useDelayedAnimation } from "@/lib/hooks";
import { cn } from "@/lib";

import "@/styles";

const AdvancedComponentsPage = () => {
  const [progress, setProgress] = useState<number>(0);
  const [selectedLoader, setSelectedLoader] = useState<string | null>(null);
  const { ref, isInView } = useDelayedAnimation(0, 0.1);
  
  // Demo of the EnhancedGridLayout component
  const gridItems = [
    {
      id: "1",
      content: "1",
      gridArea: "1 / 1 / 2 / 2",
      interactive: true,
      animationDelay: 0,
    },
    {
      id: "2",
      content: "2",
      gridArea: "1 / 2 / 2 / 3",
      interactive: true,
      animationDelay: 0.1,
    },
    {
      id: "3",
      content: "3",
      gridArea: "1 / 3 / 3 / 5",
      className: "text-3xl",
      interactive: true,
      animationDelay: 0.2,
    },
    {
      id: "4",
      content: "4",
      gridArea: "1 / 5 / 2 / 6",
      interactive: true,
      animationDelay: 0.3,
    },
    {
      id: "5",
      content: "5",
      gridArea: "2 / 1 / 3 / 2",
      interactive: true,
      animationDelay: 0.4,
    },
    {
      id: "6",
      content: "6",
      gridArea: "2 / 2 / 3 / 3",
      interactive: true,
      animationDelay: 0.5,
    },
    {
      id: "7",
      content: "7",
      gridArea: "2 / 5 / 3 / 6",
      interactive: true,
      animationDelay: 0.6,
    },
    {
      id: "8",
      content: "8",
      gridArea: "3 / 1 / 5 / 3",
      className: "text-3xl",
      interactive: true,
      animationDelay: 0.7,
    },
    {
      id: "9",
      content: "9",
      gridArea: "3 / 3 / 4 / 4",
      interactive: true,
      animationDelay: 0.8,
    },
    {
      id: "A",
      content: "A",
      gridArea: "3 / 4 / 4 / 5",
      interactive: true,
      animationDelay: 0.9,
    },
    {
      id: "B",
      content: "B",
      gridArea: "3 / 5 / 4 / 6",
      interactive: true,
      animationDelay: 1.0,
    },
    {
      id: "C",
      content: "C",
      gridArea: "4 / 3 / 5 / 4",
      interactive: true,
      animationDelay: 1.1,
    },
    {
      id: "D",
      content: "D",
      gridArea: "4 / 4 / 5 / 5",
      interactive: true,
      animationDelay: 1.2,
    },
    {
      id: "E",
      content: "E",
      gridArea: "4 / 5 / 5 / 6",
      interactive: true,
      animationDelay: 1.3,
    },
  ];
  
  // Simulate progress change for demo purposes
  const handleIncreaseProgress = () => {
    setProgress((prev) => Math.min(prev + 10, 100));
  };
  
  const handleResetProgress = () => {
    setProgress(0);
  };
  
  const handleLoaderComplete = () => {
    alert("Loader has completed!");
    handleResetProgress();
  };
  
  const handleGridItemClick = (id: string) => {
    console.log(`Grid item ${id} clicked`);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header 
        ref={ref as React.RefObject<HTMLDivElement>}
        className={cn(
          "max-w-6xl mx-auto mb-12 text-center transition-all duration-1000",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <h1 className="text-6xl font-bold mb-4">Advanced UI Components</h1>
        <p className="text-gray-600 text-xl mb-2">Showcase of enhanced UI components with advanced customization options</p>
        <p className="text-gray-600 text-lg mb-4">These components extend the basic library with additional features and interactive capabilities</p>
        <p className="mt-2">
          <a href="/demo/loaders" className="text-blue-600 hover:underline text-lg font-medium" tabIndex={0} aria-label="View basic components">
            View Basic Components
          </a>
        </p>
      </header>
      
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <Container className="p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Enhanced Grid Layout</h2>
            <p className="text-gray-600 mb-6">Interactive grid with customizable items, animations, and click events</p>
            
            <div className="flex justify-center mb-6">
              <EnhancedGridLayout 
                items={gridItems}
                responsive={true}
                onItemClick={handleGridItemClick}
                backgroundColor="linear-gradient(165deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
                highlightColor="rgba(229, 62, 62, 0.5)"
                animationDuration={0.3}
                columns={5}
                rows={4}
                gap={4}
              />
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">The EnhancedGridLayout component extends the basic GridLayout with the following features:</p>
              <ul className="list-disc list-inside mb-4">
                <li>Interactive grid items with click events and keyboard navigation</li>
                <li>Customizable grid dimensions, colors, and spacing</li>
                <li>Responsive layout that adapts to different screen sizes</li>
                <li>Staggered entrance animations for each grid item</li>
                <li>Active state styling for selected items</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
              {`// Import the component
import { EnhancedGridLayout } from "@/components/global/loaders";

// Define grid items
const gridItems = [
  {
    id: "1",
    content: "1",
    gridArea: "1 / 1 / 2 / 2",
    interactive: true,
    animationDelay: 0,
  },
  // More items...
];

// Use in your component
<EnhancedGridLayout 
  items={gridItems}
  responsive={true}
  onItemClick={(id) => console.log(\`Item \${id} clicked\`)}
  backgroundColor="linear-gradient(...)"
  highlightColor="rgba(229, 62, 62, 0.5)"
  animationDuration={0.3}
/>`}
              </pre>
            </div>
          </Container>
          
          <div className="grid grid-cols-1 gap-8">
            <Container className="p-8 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Advanced Loader</h2>
              <p className="text-gray-600 mb-6">Highly customizable loader component with multiple animation types</p>
              
              <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <button 
                  className={cn(
                    "px-3 py-1 rounded-md transition-all",
                    selectedLoader === 'pulse' ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  )}
                  onClick={() => setSelectedLoader('pulse')}
                >
                  Pulse
                </button>
                <button 
                  className={cn(
                    "px-3 py-1 rounded-md transition-all",
                    selectedLoader === 'spin' ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  )}
                  onClick={() => setSelectedLoader('spin')}
                >
                  Spin
                </button>
                <button 
                  className={cn(
                    "px-3 py-1 rounded-md transition-all",
                    selectedLoader === 'bounce' ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  )}
                  onClick={() => setSelectedLoader('bounce')}
                >
                  Bounce
                </button>
                <button 
                  className={cn(
                    "px-3 py-1 rounded-md transition-all",
                    selectedLoader === 'wave' ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  )}
                  onClick={() => setSelectedLoader('wave')}
                >
                  Wave
                </button>
                <button 
                  className={cn(
                    "px-3 py-1 rounded-md transition-all",
                    selectedLoader === 'server' ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  )}
                  onClick={() => setSelectedLoader('server')}
                >
                  Server
                </button>
              </div>
              
              <div className="flex justify-center py-6">
                <AdvancedLoader 
                  type={selectedLoader as any || 'pulse'}
                  size="lg"
                  color="#3b82f6"
                  secondaryColor="#e5e7eb"
                  speed="normal"
                  showProgress={true}
                  progress={progress}
                  text="Loading..."
                  interactive={true}
                  onComplete={handleLoaderComplete}
                />
              </div>
              
              <div className="flex justify-center gap-4 mt-6">
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  onClick={handleIncreaseProgress}
                >
                  Increase Progress (+10%)
                </button>
                <button 
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  onClick={handleResetProgress}
                >
                  Reset
                </button>
              </div>
              
              <div className="mt-6 text-sm text-gray-500">
                <p className="mb-2">The AdvancedLoader component provides multiple animation styles with extensive customization options:</p>
                <ul className="list-disc list-inside mb-4">
                  <li>Five animation types: pulse, spin, bounce, wave, and server</li>
                  <li>Customizable colors, sizes, and animation speeds</li>
                  <li>Progress indicator with optional percentage display</li>
                  <li>Interactive mode with hover effects and click handlers</li>
                  <li>Accessibility features including ARIA attributes and reduced motion support</li>
                </ul>
                <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import { AdvancedLoader } from "@/components/global/loaders";

// Basic usage
<AdvancedLoader 
  type="pulse"
  size="lg"
  color="#3b82f6"
  showProgress={true}
  progress={75}
  text="Loading..."
  onComplete={() => console.log("Loading complete!")}
/>`}
                </pre>
              </div>
            </Container>
            
            <Container className="p-8 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Custom Hooks</h2>
              <p className="text-gray-600 mb-6">Utility hooks for enhancing UI components and interactions</p>
              
              <div className="mt-4 text-sm text-gray-500">
                <p className="mb-2">This project includes several custom React hooks to streamline UI development:</p>
                <ul className="list-disc list-inside mb-4">
                  <li><code className="bg-gray-200 px-1 py-0.5 rounded">useInView</code>: Track when elements enter the viewport</li>
                  <li><code className="bg-gray-200 px-1 py-0.5 rounded">useDelayedAnimation</code>: Create staggered animations with configurable delays</li>
                  <li><code className="bg-gray-200 px-1 py-0.5 rounded">useMousePosition</code>: Track mouse position for interactive effects</li>
                  <li><code className="bg-gray-200 px-1 py-0.5 rounded">useMediaQuery</code>: Apply responsive behaviors based on screen size</li>
                  <li><code className="bg-gray-200 px-1 py-0.5 rounded">useLocalStorage</code>: Persist state in browser storage</li>
                </ul>
                <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import hooks
import { useInView, useDelayedAnimation, useMousePosition } from "@/lib";

// Example usage
const MyComponent = () => {
  // Track when element enters viewport
  const { ref, isInView } = useInView();
  
  // Track mouse position for interactive effects
  const { x, y } = useMousePosition();
  
  return (
    <div
      ref={ref}
      className={\`\${isInView ? "opacity-100" : "opacity-0"} transition-opacity duration-500\`}
      style={{ 
        transform: isInView ? 
          \`translate(\${x / 100}px, \${y / 100}px)\` : 
          "none"
      }}
    >
      Content appears when scrolled into view and follows mouse
    </div>
  );
};`}
                </pre>
              </div>
            </Container>
          </div>
        </div>
      </MaxWidthWrapper>
      
      <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>Advanced components build upon the base UI library and use the following utilities:</p>
        <p className="mt-2">
          <code className="bg-gray-100 px-2 py-1 rounded">src/lib/utils.ts</code> - Utility functions for UI components
        </p>
        <p className="mt-1">
          <code className="bg-gray-100 px-2 py-1 rounded">src/lib/hooks.ts</code> - Custom React hooks for animations and interactions
        </p>
        <p className="mt-4">All components are fully accessible and respect user preferences for reduced motion</p>
        <p className="mt-2">View the <a href="/demo/loaders" className="text-blue-600 hover:underline">basic components</a> for more UI options</p>
      </footer>
    </div>
  );
};

export default AdvancedComponentsPage; 