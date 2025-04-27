"use client"

import React, { useState, useEffect } from 'react';
import { Background } from "@/components/background";
import { EnhancedChatContainer } from "@/components/enhanced-chat-container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  RefreshCw,
  Sparkles,
  Home
} from 'lucide-react';
import { aiService } from "@/lib/services/ai-service";

export default function FinalAgent() {
  // State for connection status
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);

  // Check connection status on component mount
  useEffect(() => {
    checkConnection();
  }, []);

  // Function to check connection status
  const checkConnection = async () => {
    setIsCheckingConnection(true);
    try {
      const status = await aiService.checkConnection();
      setIsConnected(status.connected);
    } catch (error) {
      console.error("Connection check failed:", error);
      setIsConnected(false);
    } finally {
      setIsCheckingConnection(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-transparent text-white overflow-hidden">
      {/* Background */}
      <Background />

      {/* Header */}
      <header className="relative z-10 border-b border-[#00cbdd]/20 bg-[#00031b]/90 backdrop-blur-md py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <Sparkles className="h-6 w-6 text-[#00cbdd] mr-2" />
            <h1 className="text-2xl font-bold text-white">Mash Agent</h1>
            <span className="ml-2 px-2 py-0.5 text-xs bg-[#00cbdd]/20 text-[#00cbdd] rounded-full">
              Final Version
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <span className={`h-2 w-2 rounded-full mr-2 ${
                isConnected === null
                  ? 'bg-yellow-400'
                  : isConnected
                    ? 'bg-green-400'
                    : 'bg-red-400'
              }`}></span>
              <span className="text-sm text-white/70">
                {isConnected === null
                  ? 'Checking connection...'
                  : isConnected
                    ? 'Connected'
                    : 'Disconnected'}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={checkConnection}
              disabled={isCheckingConnection}
              className="border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10"
            >
              {isCheckingConnection ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              <span className="sr-only">Check Connection</span>
            </Button>

            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10"
              >
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12 mt-4">
        <EnhancedChatContainer mode="unified" />
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#00cbdd]/20 bg-[#00031b]/90 backdrop-blur-md py-3">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-xs text-white/50">
              Mash Agent © 2024 | Final Version
            </div>
            <div className="text-xs text-white/50">
              Powered by AI
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
