"use client"

import React, { useState, useEffect } from 'react';
import { UIPlayground } from '@/components/ui-playground';
import { ModelSelector } from '@/components/model-selector';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, SparklesIcon } from 'lucide-react';
import { AIServiceConnectionTest } from '@/components/ai-service-connection-test';

// Patch for UIGeneratorReasoningEngine to save generated code to localStorage
const patchUIGeneratorStorage = () => {
  if (typeof window !== 'undefined') {
    // Add event listener to intercept errors from ui-generator-reasoning.ts
    window.addEventListener('error', (event) => {
      if (event.message.includes('Failed to generate component code') ||
          (event.error && event.error.stack && event.error.stack.includes('ui-generator-reasoning.ts'))) {
        // Check if there's fallback code in localStorage
        const savedCode = localStorage.getItem('ui_generator_last_code');
        if (savedCode) {
          console.log('Recovered code from localStorage');
          // We don't prevent default as we want the error to be logged,
          // but we can use the saved code in the UI
        }
      }
    });

    // Patch the localStorage save functionality
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
      const response = await originalFetch.apply(this, args);

      // Clone the response to read it
      const clone = response.clone();

      try {
        // Check if this is an AI service API request for code generation
        if (args[0] && typeof args[0] === 'string' && args[0].includes('/api/generate')) {
          const body = await clone.json();

          if (body && body.response) {
            // Extract code blocks from the response
            const codeBlockRegex = /```(?:tsx|jsx|typescript|javascript)?\s*([\s\S]*?)```/g;
            const matches = [...body.response.matchAll(codeBlockRegex)];

            if (matches.length > 0) {
              // Save the first code block to localStorage
              localStorage.setItem('ui_generator_last_code', matches[0][1].trim());
            }
          }
        }
      } catch (e) {
        // Silently fail if we can't parse the response
        console.debug('Failed to parse response for localStorage cache', e);
      }

      return response;
    };
  }
};

export default function UIGeneratorPage() {
  const [selectedModel, setSelectedModel] = useState<string>('llama2:7b');

  // Apply the localStorage patch on mount
  useEffect(() => {
    patchUIGeneratorStorage();
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-transparent text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 bg-[#00031b]">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, #00cbdd 1px, transparent 1px), linear-gradient(to bottom, #00cbdd 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
        {/* Glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#00cbdd]/5 blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#00cbdd]/5 blur-[100px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-start px-6 py-12 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="w-full mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center text-white">
              <SparklesIcon className="mr-2 h-8 w-8 text-[#00cbdd]" />
              UI Generator
            </h1>
            <p className="text-[#00cbdd]/70 mt-1">
              Generate React components with AI
            </p>
          </div>

          <div className="w-full md:w-auto">
            <ModelSelector
              models={[
                { id: "llama2:7b", name: "Llama 2 (7B)" },
                { id: "llama2:13b", name: "Llama 2 (13B)" },
                { id: "llama2:70b", name: "Llama 2 (70B)" },
                { id: "mistral:7b", name: "Mistral (7B)" },
                { id: "codellama:7b", name: "CodeLlama (7B)" },
                { id: "codellama:13b", name: "CodeLlama (13B)" },
                { id: "codellama:34b", name: "CodeLlama (34B)" }
              ]}
              selectedModelId={selectedModel}
              onChange={setSelectedModel}
            />
          </div>
        </div>

        {/* Connection Test */}
        <div className="w-full mb-6">
          <AIServiceConnectionTest />
        </div>

        {/* Information */}
        <Alert className="mb-6 border border-[#00cbdd]/20 bg-[#00031b]/90 backdrop-blur-sm text-white w-full">
          <InfoIcon className="h-4 w-4 text-[#00cbdd]" />
          <AlertTitle className="text-white">Powered by Reasoning Engine</AlertTitle>
          <AlertDescription className="text-[#00cbdd]/80">
            <p className="mt-1">
              The UI Generator processes your requirements through:
            </p>
            <ol className="list-decimal pl-5 space-y-1 mt-2">
              <li>Requirement analysis</li>
              <li>Component identification</li>
              <li>Structure planning</li>
              <li>Style determination</li>
              <li>Code generation</li>
            </ol>
          </AlertDescription>
        </Alert>

        {/* Generator */}
        <div className="w-full bg-[#00031b]/90 backdrop-blur-sm border border-[#00cbdd]/20 rounded-lg shadow-lg overflow-hidden">
          <UIPlayground llmModel={selectedModel} />
        </div>

        {/* Example Prompts */}
        <div className="w-full mt-8 border border-[#00cbdd]/20 rounded-lg p-6 bg-[#00031b]/90 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-3 text-white">Example Prompts</h2>
          <p className="text-[#00cbdd]/70 mb-4">
            Try these example prompts to see the UI generator in action
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="cursor-pointer hover:bg-[#00cbdd]/5 transition-colors border border-[#00cbdd]/20 rounded-lg p-4">
              <h3 className="font-medium text-white">Form Component</h3>
              <p className="text-sm text-[#00cbdd]/70 mt-1">
                Create a responsive contact form with name, email, message fields and validation.
                Include a submit button and success/error states.
              </p>
            </div>

            <div className="cursor-pointer hover:bg-[#00cbdd]/5 transition-colors border border-[#00cbdd]/20 rounded-lg p-4">
              <h3 className="font-medium text-white">AI Chat Interface</h3>
              <p className="text-sm text-[#00cbdd]/70 mt-1">
                Create a chat interface that connects to AI models for conversations.
                Support message history, streaming responses, and error handling.
              </p>
            </div>

            <div className="cursor-pointer hover:bg-[#00cbdd]/5 transition-colors border border-[#00cbdd]/20 rounded-lg p-4">
              <h3 className="font-medium text-white">Model Selector Component</h3>
              <p className="text-sm text-[#00cbdd]/70 mt-1">
                Build a model selector component that fetches available AI models
                and allows selecting one with info about each model.
              </p>
            </div>

            <div className="cursor-pointer hover:bg-[#00cbdd]/5 transition-colors border border-[#00cbdd]/20 rounded-lg p-4">
              <h3 className="font-medium text-white">Prompt Builder</h3>
              <p className="text-sm text-[#00cbdd]/70 mt-1">
                Create a prompt engineering interface with system prompt editor,
                parameter controls, and response display with AI service integration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}