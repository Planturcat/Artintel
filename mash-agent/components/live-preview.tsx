import React, { useEffect, useRef, useState } from 'react';

interface LivePreviewProps {
  code: string;
  dependencies?: Record<string, string>;
  styles?: string;
  onError?: (error: Error) => void;
}

const LivePreview: React.FC<LivePreviewProps> = ({
  code,
  dependencies = {},
  styles = '',
  onError
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number>(300);
  
  // Create the full HTML content for the iframe
  const getHtmlContent = () => {
    // Create imports for React and ReactDOM (via CDN)
    const dependenciesStr = Object.entries(dependencies)
      .map(([name, version]) => {
        if (name === 'react') {
          return `<script crossorigin src="https://unpkg.com/react@${version.replace('^', '')}/umd/react.development.js"></script>`;
        }
        if (name === 'react-dom') {
          return `<script crossorigin src="https://unpkg.com/react-dom@${version.replace('^', '')}/umd/react-dom.development.js"></script>`;
        }
        return '';
      })
      .join('\n');
    
    // Add Tailwind CSS via CDN
    const tailwindCss = dependencies['tailwindcss'] 
      ? `<script src="https://cdn.tailwindcss.com"></script>` 
      : '';
    
    // Process the component code
    // Extract imports and component definition
    const componentCode = processComponentCode(code);
    
    // Create the full HTML document
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Component Preview</title>
          ${dependenciesStr}
          ${tailwindCss}
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <style>
            ${styles}
          </style>
        </head>
        <body>
          <div id="root"></div>
          
          <script type="text/babel">
            // Wrap in an IIFE to avoid global scope pollution
            (function() {
              ${componentCode}
              
              // Render the component
              try {
                const rootElement = document.getElementById('root');
                const root = ReactDOM.createRoot(rootElement);
                
                // Find the exported component
                const exported = window.exportedComponent;
                if (!exported) {
                  throw new Error("No component exported");
                }
                
                root.render(React.createElement(exported));
                
                // Notify parent frame about height
                function reportHeight() {
                  const height = document.body.scrollHeight;
                  window.parent.postMessage({ type: 'resize', height }, '*');
                }
                
                // Report height after initial render and after images load
                reportHeight();
                window.addEventListener('load', reportHeight);
                window.addEventListener('resize', reportHeight);
                
                // Report success
                window.parent.postMessage({ type: 'success' }, '*');
              } catch (error) {
                console.error('Rendering error:', error);
                window.parent.postMessage({ 
                  type: 'error', 
                  message: error.message || 'Unknown error'
                }, '*');
              }
            })();
          </script>
        </body>
      </html>
    `;
  };
  
  // Process the component code to make it work in the iframe
  const processComponentCode = (code: string): string => {
    // Find the component name (assume it's the default export or named export)
    const exportDefaultMatch = code.match(/export\s+default\s+(?:function\s+)?(\w+)/);
    const exportNamedMatch = code.match(/export\s+(?:const|function)\s+(\w+)/);
    const componentNameMatch = code.match(/(?:function|const)\s+(\w+)(?:\s*=\s*(?:\(|function)|\s*\()/);
    
    let componentName = '';
    
    if (exportDefaultMatch) {
      componentName = exportDefaultMatch[1];
    } else if (exportNamedMatch) {
      componentName = exportNamedMatch[1];
    } else if (componentNameMatch) {
      componentName = componentNameMatch[1];
    }
    
    // If componentName is still empty, try to extract it from "export default function X" or similar patterns
    if (!componentName) {
      const exportDefaultFuncMatch = code.match(/export\s+default\s+function\s+(\w+)/);
      if (exportDefaultFuncMatch) {
        componentName = exportDefaultFuncMatch[1];
      }
    }
    
    // Remove imports since we're using CDN
    let processedCode = code.replace(/^import.*?;?\n?/gm, '');
    
    // Remove export statements
    processedCode = processedCode.replace(/export\s+(default\s+)?/g, '');
    
    // Add window.exportedComponent assignment
    if (componentName) {
      processedCode += `\n\n// Export the component for rendering\nwindow.exportedComponent = ${componentName};`;
    } else {
      // If we couldn't identify the component name, look for the first function component
      processedCode += `\n\n// Export the component for rendering\nwindow.exportedComponent = (function() { 
        // Find any function that might be a React component
        for (const key in this) {
          const value = this[key];
          if (typeof value === 'function' && /^[A-Z]/.test(key)) {
            return value;
          }
        }
        // Fallback to finding any object with render method or function
        return Object.values(this).find(v => typeof v === 'function') || function() { return React.createElement('div', null, 'Component Not Found'); };
      })();`;
    }
    
    return processedCode;
  };
  
  // Set up message listener for iframe communication
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'resize' && typeof event.data.height === 'number') {
        setHeight(Math.max(300, event.data.height + 40)); // Add padding
      } else if (event.data.type === 'error' && onError) {
        onError(new Error(event.data.message || 'Unknown error'));
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onError]);
  
  // Update iframe when content changes
  useEffect(() => {
    try {
      // Get the full HTML content as a string
      const htmlContent = getHtmlContent();
      
      // Use the srcdoc attribute instead of trying to access contentDocument directly
      if (iframeRef.current) {
        iframeRef.current.srcdoc = htmlContent;
      }
    } catch (error) {
      console.error('Error setting iframe content:', error);
      if (onError && error instanceof Error) {
        onError(error);
      }
    }
  }, [code, dependencies, styles]);
  
  return (
    <iframe
      ref={iframeRef}
      title="Component Preview"
      className="w-full border-0"
      style={{ height: `${height}px` }}
      sandbox="allow-scripts allow-same-origin allow-forms"
    />
  );
};

export default LivePreview; 