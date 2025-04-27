"use client";

import React from "react";
import ChatInterface from "@/components/mash-chatbot/chat-interface";
import { Cpu, Bot, Sparkles, Database, Shield } from "lucide-react";

const MashChatbotPage = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-cyan-800/30 bg-black/80 p-4 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-3 w-3 animate-pulse rounded-full bg-cyan-500 mr-2"></div>
            <h1 className="text-xl font-mono text-cyan-400">MASH-BOT</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <a
              href="/"
              className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Home
            </a>
            <a
              href="/features"
              className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Features
            </a>
            <a
              href="/about"
              className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              About
            </a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Main chat container */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Chat with MASH-BOT
              </h2>
              <p className="text-gray-400">
                Ask questions about Artintel's platform, language models, features, or get assistance with common tasks.
              </p>
            </div>
            
            {/* ChatInterface component */}
            <div className="h-[700px] rounded-xl border border-cyan-800/30 bg-black/40 overflow-hidden backdrop-blur-md shadow-lg shadow-cyan-900/10">
              <ChatInterface modelName="llama2:7b" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border border-cyan-800/30 bg-black/40 p-6 backdrop-blur-md">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                <Bot className="mr-2 h-5 w-5 text-cyan-500" />
                About MASH-BOT
              </h3>
              <p className="text-gray-400 mb-4">
                MASH-BOT is powered by Artintel's state-of-the-art language models, specifically tuned to help you navigate and understand our AI platform.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Sparkles className="mr-2 h-5 w-5 text-cyan-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-white">Smart Assistance</h4>
                    <p className="text-xs text-gray-400">
                      Gets smarter with every interaction to provide more accurate responses.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Database className="mr-2 h-5 w-5 text-cyan-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-white">Knowledge Base</h4>
                    <p className="text-xs text-gray-400">
                      Access to comprehensive information about our models and features.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="mr-2 h-5 w-5 text-cyan-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-white">Privacy-First</h4>
                    <p className="text-xs text-gray-400">
                      Your conversations are not stored or used for training.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-cyan-800/30 bg-black/40 p-6 backdrop-blur-md">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                <Cpu className="mr-2 h-5 w-5 text-cyan-500" />
                Available Models
              </h3>
              <div className="space-y-3">
                <div className="group rounded-lg border border-cyan-800/30 bg-black/60 p-3 hover:border-cyan-500/50 transition-colors">
                  <h4 className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">Llama 2 (7B)</h4>
                  <p className="text-xs text-gray-400">
                    General purpose model with great performance across various tasks.
                  </p>
                </div>
                <div className="group rounded-lg border border-cyan-800/30 bg-black/60 p-3 hover:border-cyan-500/50 transition-colors">
                  <h4 className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">Mistral (7B)</h4>
                  <p className="text-xs text-gray-400">
                    Specialized for conversational AI with improved context handling.
                  </p>
                </div>
                <div className="group rounded-lg border border-cyan-800/30 bg-black/60 p-3 hover:border-cyan-500/50 transition-colors">
                  <h4 className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">MASH Custom</h4>
                  <p className="text-xs text-gray-400">
                    Our fine-tuned model with specialized knowledge about Artintel.
                  </p>
                </div>
              </div>
              <button className="mt-4 w-full rounded-lg border border-cyan-500/30 bg-cyan-900/20 px-4 py-2 text-sm text-cyan-400 hover:bg-cyan-900/40 transition-colors">
                Switch Model
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MashChatbotPage; 