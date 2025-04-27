"use client"

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Loader2, CheckCircle, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';

interface ConnectionTestResult {
  success: boolean;
  message: string;
  responseTime?: number;
  models?: string[];
}

export interface OllamaConnectionTestProps {
  defaultEndpoint?: string;
  onConnectionChange?: (status: boolean) => void;
  showModels?: boolean;
}

export function OllamaConnectionTest({
  defaultEndpoint = 'http://localhost:11434',
  onConnectionChange,
  showModels = true
}: OllamaConnectionTestProps) {
  // State for connection testing
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [connectionResult, setConnectionResult] = useState<ConnectionTestResult | null>(null);
  const [ollamaEndpoint, setOllamaEndpoint] = useState<string>(defaultEndpoint);

  // Check connection on mount
  useEffect(() => {
    checkConnection();
  }, []);

  // Update parent component when connection status changes
  useEffect(() => {
    if (connectionResult && onConnectionChange) {
      onConnectionChange(connectionResult.success);
    }
  }, [connectionResult, onConnectionChange]);

  // Function to test connection to Ollama
  const checkConnection = async () => {
    setIsChecking(true);
    setConnectionResult(null);
    
    try {
      const startTime = performance.now();
      
      // Make request to Ollama health endpoint
      const response = await fetch(`${ollamaEndpoint}/api/version`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);
      
      if (response.ok) {
        const data = await response.json();
        
        const result: ConnectionTestResult = {
          success: true,
          message: `Connected to Ollama ${data.version || 'server'}`,
          responseTime
        };
        
        // If showModels is true, fetch available models
        if (showModels) {
          try {
            const modelsResponse = await fetch(`${ollamaEndpoint}/api/tags`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
              signal: AbortSignal.timeout(5000)
            });
            
            if (modelsResponse.ok) {
              const modelsData = await modelsResponse.json();
              if (modelsData.models && Array.isArray(modelsData.models)) {
                result.models = modelsData.models.map((model: any) => model.name);
              }
            }
          } catch (error) {
            console.error("Failed to fetch models:", error);
          }
        }
        
        setConnectionResult(result);
      } else {
        setConnectionResult({
          success: false,
          message: `Error: ${response.status} ${response.statusText}`
        });
      }
    } catch (error) {
      setConnectionResult({
        success: false,
        message: `Connection failed: ${error instanceof Error ? error.message : String(error)}`
      });
    } finally {
      setIsChecking(false);
    }
  };

  // Handle endpoint change
  const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOllamaEndpoint(e.target.value);
  };

  // Handle keydown on input to allow pressing Enter to test connection
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isChecking) {
      checkConnection();
    }
  };

  return (
    <Card className="border border-[#00cbdd]/20 shadow-md max-w-md w-full bg-[#00031b]/80 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white flex items-center justify-between">
          Ollama Connection Test
          <a 
            href="https://ollama.com/download" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs flex items-center gap-1 text-[#00cbdd] hover:text-[#00cbdd]/80 transition-colors"
          >
            Get Ollama <ExternalLink className="h-3 w-3" />
          </a>
        </CardTitle>
        <CardDescription className="text-[#00cbdd]/70">
          Check if your Ollama service is available
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Endpoint Input */}
        <div className="space-y-2">
          <label htmlFor="endpoint" className="text-sm font-medium text-white">
            Ollama Endpoint
          </label>
          <div className="flex space-x-2">
            <Input
              id="endpoint"
              value={ollamaEndpoint}
              onChange={handleEndpointChange}
              onKeyDown={handleKeyDown}
              placeholder="http://localhost:11434"
              className="flex-1 bg-[#00031b] border-[#00cbdd]/20 text-white"
              disabled={isChecking}
              aria-label="Ollama API endpoint URL"
            />
            <Button 
              onClick={checkConnection} 
              disabled={isChecking}
              aria-label="Test connection"
              className="bg-[#00cbdd]/20 hover:bg-[#00cbdd]/30 text-white"
            >
              {isChecking ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Test
            </Button>
          </div>
        </div>
        
        {/* Connection Status */}
        {(isChecking || connectionResult) && (
          <div className={`flex flex-col gap-2 p-4 rounded-md mt-2 ${
            isChecking 
              ? 'bg-[#00cbdd]/10 text-[#00cbdd] border border-[#00cbdd]/20' 
              : connectionResult?.success 
                ? 'bg-green-900/20 text-green-400 border border-green-800/30' 
                : 'bg-red-900/20 text-red-400 border border-red-800/30'
          }`}>
            <div className="flex items-center gap-3">
              {isChecking ? (
                <Loader2 className="h-5 w-5 animate-spin shrink-0" />
              ) : connectionResult?.success ? (
                <CheckCircle className="h-5 w-5 shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0" />
              )}
              
              <div className="flex-1">
                <p className="font-medium">
                  {isChecking 
                    ? 'Checking connection...' 
                    : connectionResult?.success 
                      ? 'Connected' 
                      : 'Connection Failed'
                  }
                </p>
                {!isChecking && connectionResult && (
                  <p className="text-sm opacity-80">
                    {connectionResult.message}
                  </p>
                )}
              </div>
              
              {!isChecking && connectionResult?.success && connectionResult.responseTime && (
                <div className="text-sm font-mono bg-green-900/20 px-2 py-1 rounded text-green-400">
                  {connectionResult.responseTime}ms
                </div>
              )}
            </div>
            
            {/* Display available models if fetched */}
            {!isChecking && connectionResult?.success && connectionResult.models && connectionResult.models.length > 0 && (
              <div className="mt-2 pt-2 border-t border-green-800/30">
                <p className="text-sm font-medium mb-1">Available Models:</p>
                <div className="flex flex-wrap gap-1.5">
                  {connectionResult.models.slice(0, 5).map((model, index) => (
                    <span key={index} className="text-xs bg-green-900/30 px-2 py-1 rounded text-green-300">
                      {model}
                    </span>
                  ))}
                  {connectionResult.models.length > 5 && (
                    <span className="text-xs bg-green-900/20 px-2 py-1 rounded text-green-300">
                      +{connectionResult.models.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}
            
            {!isChecking && !connectionResult?.success && (
              <div className="text-sm mt-1 border-t border-red-800/30 pt-2">
                <p>Make sure Ollama is running and accessible at the specified endpoint.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default OllamaConnectionTest; 