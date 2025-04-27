import React, { useState, useEffect } from 'react';
import { UIGenerator } from './ui-generator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { RefreshCcwIcon, PlayIcon, EyeIcon, CodeIcon, AlertCircle, CheckCircle } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import dynamic from 'next/dynamic';
import { safeFetch, checkOllamaHealth } from '@/lib/ollama-service';

// Import styles needed for the sandbox iframe
const sandboxStyles = `
/* Base styles for the sandbox */
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.5;
  padding: 1rem;
  color: #e2e8f0;
  background-color: #00031b;
}

/* Tailwind-like reset */
*, ::before, ::after {
  box-sizing: border-box;
  margin: 0;
}

/* Responsive container */
.container {
  max-width: 100%;
  margin: 0 auto;
}
`;

// Creating a wrapper for dynamic imports without server-side rendering
const LivePreview = dynamic(
  () => import('./live-preview'),
  { ssr: false }
);

interface UIPlaygroundProps {
  llmModel?: string;
}

export function UIPlayground({ llmModel = 'llama2:13b' }: UIPlaygroundProps) {
  // Store the generated code
  const [generatedCode, setGeneratedCode] = useState<string>('');
  
  // UI state
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('generator');
  const [error, setError] = useState<string | null>(null);
  
  // Sandbox state
  const [sandboxReady, setSandboxReady] = useState<boolean>(false);
  const [sandboxKey, setSandboxKey] = useState<number>(0);
  
  // Connection test state
  const [isTestingConnection, setIsTestingConnection] = useState<boolean>(false);
  const [connectionTestResult, setConnectionTestResult] = useState<{ success: boolean; message: string } | null>(null);
  
  // Check localStorage on mount for previously generated code
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCode = localStorage.getItem('ui_generator_last_code');
      if (savedCode && !generatedCode) {
        setGeneratedCode(savedCode);
      }
    }
  }, [generatedCode]);
  
  // Handle generated code from the UI Generator
  const handleGeneratedCode = (code: string) => {
    if (!code || code.trim().length === 0) {
      setError("Received empty code. Something went wrong during generation.");
      return;
    }
    
    setGeneratedCode(code);
    
    // Save to localStorage as a backup
    if (typeof window !== 'undefined' && code) {
      try {
        localStorage.setItem('ui_generator_last_code', code);
        console.log("Code saved to localStorage successfully");
      } catch (e) {
        console.error("Failed to save code to localStorage:", e);
      }
    }
    
    // Switch to the preview tab when code is generated
    setActiveTab('preview');
    setIsRendering(true);
    setError(null);
    
    // Reset sandbox and prepare it for rendering
    setSandboxKey(prev => prev + 1);
    setSandboxReady(true);
    
    // Simulate loading time
    setTimeout(() => {
      setIsRendering(false);
    }, 1000);
  };
  
  // Test direct connection to Ollama
  const testDirectConnection = async () => {
    setIsTestingConnection(true);
    setConnectionTestResult(null);
    
    try {
      // Direct API call test
      const startTime = performance.now();
      const isHealthy = await checkOllamaHealth();
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);
      
      if (isHealthy) {
        setConnectionTestResult({
          success: true,
          message: `Connection successful (${responseTime}ms)`
        });
      } else {
        setConnectionTestResult({
          success: false,
          message: 'Failed to connect to Ollama API'
        });
      }
    } catch (error) {
      setConnectionTestResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : String(error)}`
      });
    } finally {
      setIsTestingConnection(false);
    }
  };
  
  // Refresh the preview
  const handleRefreshPreview = () => {
    setIsRendering(true);
    setSandboxKey(prev => prev + 1);
    
    // Simulate loading time
    setTimeout(() => {
      setIsRendering(false);
    }, 1000);
  };
  
  // Render the component preview using dynamic React rendering in iframe
  const renderPreview = () => {
    if (!generatedCode) {
      return (
        <div className="flex flex-col items-center justify-center p-12 border border-[#00cbdd]/20 rounded-md bg-[#00031b] text-center min-h-[400px]">
          <EyeIcon className="h-12 w-12 text-[#00cbdd]/30 mb-4" />
          <p className="text-[#00cbdd]/70">Generate a component first to see a preview</p>
          <div className="mt-6 space-y-2">
            <Button 
              variant="outline" 
              className="mt-4 border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10"
              onClick={() => setActiveTab('generator')}
            >
              Go to Generator
            </Button>
            
            <div className="flex flex-col items-center mt-4 pt-4 border-t border-[#00cbdd]/10">
              <p className="text-sm text-[#00cbdd]/70 mb-2">Or test direct connection to Ollama:</p>
              <Button 
                variant="outline"
                size="sm"
                className="border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10"
                onClick={testDirectConnection}
                disabled={isTestingConnection}
              >
                {isTestingConnection ? 'Testing...' : 'Test Connection'}
              </Button>
              
              {connectionTestResult && (
                <div className={`mt-2 flex items-center text-sm ${connectionTestResult.success ? 'text-green-400' : 'text-red-400'}`}>
                  {connectionTestResult.success ? 
                    <CheckCircle className="h-4 w-4 mr-1" /> : 
                    <AlertCircle className="h-4 w-4 mr-1" />
                  }
                  {connectionTestResult.message}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
    
    if (isRendering) {
      return (
        <div className="flex flex-col items-center justify-center p-12 border border-[#00cbdd]/20 rounded-md bg-[#00031b] text-center min-h-[400px]">
          <div className="animate-spin">
            <RefreshCcwIcon className="h-12 w-12 text-[#00cbdd]/50" />
          </div>
          <p className="text-[#00cbdd]/70 mt-4">Rendering component...</p>
        </div>
      );
    }
    
    return (
      <div className="border border-[#00cbdd]/20 rounded-md overflow-hidden bg-[#00031b] min-h-[400px]">
        <div className="bg-[#00031b] border-b border-[#00cbdd]/20 p-2 flex justify-between items-center">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <Button size="sm" variant="ghost" className="text-[#00cbdd] hover:bg-[#00cbdd]/10" onClick={handleRefreshPreview}>
            <RefreshCcwIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
        
        <div className="p-4 relative">
          {sandboxReady && (
            <div className="relative">
              <LivePreview 
                key={sandboxKey}
                code={generatedCode}
                dependencies={{
                  react: "18.2.0",
                  "react-dom": "18.2.0"
                }}
                styles={sandboxStyles}
                onError={(err) => {
                  console.error("Preview error:", err);
                  // Handle specific errors with user-friendly messages
                  if (err.message?.includes('cross-origin') || err.message?.includes('Blocked a frame')) {
                    setError("Cross-origin frame access issue. Try refreshing the page or checking browser security settings.");
                  } else if (err.message?.includes('document') || err.message?.includes('window')) {
                    setError("Security restriction error with iframe. If using extensions that block scripts, try disabling them.");
                  } else {
                    setError(`Error rendering component: ${err.message}`);
                  }
                }}
              />
              
              {/* Overlay that catches click events to prevent cross-origin issues */}
              <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true"></div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-900/20 text-red-400 p-4 mt-4 border border-red-800/30 rounded-md">
              <h3 className="font-medium flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Render Error
              </h3>
              <p className="text-sm mt-1">{error}</p>
              <div className="mt-3 flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-red-800/30 text-red-400 hover:bg-red-900/20"
                  onClick={() => {
                    setError(null);
                    handleRefreshPreview();
                  }}
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Copy the code to clipboard
  const handleCopyCode = () => {
    if (generatedCode && typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(generatedCode);
    }
  };
  
  // Render the playground
  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 bg-[#00031b]/50 border border-[#00cbdd]/20">
          <TabsTrigger 
            value="generator" 
            className="data-[state=active]:bg-[#00cbdd]/10 data-[state=active]:text-[#00cbdd] text-white"
          >
            <CodeIcon className="h-4 w-4 mr-2" />
            Generator
          </TabsTrigger>
          <TabsTrigger 
            value="preview" 
            className="data-[state=active]:bg-[#00cbdd]/10 data-[state=active]:text-[#00cbdd] text-white"
          >
            <EyeIcon className="h-4 w-4 mr-2" />
            Preview
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator">
          <UIGenerator llmModel={llmModel} onGeneratedCode={handleGeneratedCode} />
        </TabsContent>
        
        <TabsContent value="preview" className="mt-0">
          {renderPreview()}
          
          {generatedCode && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-white">Generated Code</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10"
                  onClick={handleCopyCode}
                >
                  Copy Code
                </Button>
              </div>
              
              <div className="relative rounded-md overflow-hidden border border-[#00cbdd]/20">
                <SyntaxHighlighter
                  language="tsx"
                  style={nightOwl}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    maxHeight: '300px',
                    overflow: 'auto'
                  }}
                >
                  {generatedCode}
                </SyntaxHighlighter>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default UIPlayground; 