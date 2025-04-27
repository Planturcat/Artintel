"use client";

import { useState, useEffect } from "react";
import { MessageSquare, X, Minimize2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/cn";
import ChatInterface from "./chat-interface";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Content sections from info.md organized by page paths
const CONTENT_CONTEXT = {
  "/artintel": "Artintel is a comprehensive, no-code platform that enables organizations to discover, fine-tune, and deploy open-source Large Language Models (LLMs) and Small Language Models (SLMs). It bridges the gap between cutting-edge AI research and practical industry applications.",
  "/features": "Artintel offers a wide range of features including Model Selection & Discovery, Data Integration & Preprocessing, Fine-Tuning Workflows, Deployment & Serving, Monitoring & Alerts, Cost Management, Security & Compliance, and Data Correction & Quality Enhancement. The platform includes a Mash AI Agent for intelligent assistance.",
  "/pricing": "Artintel offers three distinct tiers—Free, Pro, and Enterprise Premium—to cater to organizations at different stages of AI adoption. Each tier provides specific models, computing capabilities, and compliance features while sharing the same intuitive interface.",
  "/models": "SLMs (Small Language Models) typically range from a few million to a few billion parameters, offering lower resource footprint, faster inference, and cost-effectiveness. LLMs (Large Language Models) range from several billion to hundreds of billions of parameters, providing rich understanding, longer context windows, and creative text generation.",
  // Default context for any other page
  "default": "Artintel helps organizations discover, fine-tune, and deploy AI models without deep machine learning expertise. The platform streamlines the entire AI implementation process with a no-code approach."
};

// Generate a system prompt based on the current path
const generateSystemPrompt = (currentPath: string) => {
  const pathKey = Object.keys(CONTENT_CONTEXT).find(key => currentPath.includes(key)) || "default";
  const context = CONTENT_CONTEXT[pathKey as keyof typeof CONTENT_CONTEXT];
  
  return `You are Mash-Bot, an AI assistant for Artintel, a platform for discovering, fine-tuning, and deploying AI models.
  
Current page context: The user is viewing ${currentPath}.
${context}

Answer questions accurately based on this information. For technical questions about AI models, focus on being educational and clear.
If asked about pricing, explain our tier structure (Free, Pro, Enterprise Premium).
If you don't know something, acknowledge it and offer to connect the user with a human representative.
Keep responses concise and focused on Artintel's capabilities.`;
};

// Interface for chat messages
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function FloatingChatIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const [systemPrompt, setSystemPrompt] = useState("");

  // Update system prompt when pathname changes
  useEffect(() => {
    setSystemPrompt(generateSystemPrompt(pathname));
  }, [pathname]);

  // Don't show on the chatbot page
  if (pathname === "/mash-chatbot") {
    return null;
  }

  // Function to send message to Ollama
  const sendMessageToOllama = async (userMessage: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/ollama", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
            { role: "user", content: userMessage }
          ],
          model: "llama2", // Default model, can be changed based on needs
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from Ollama");
      }

      const data = await response.json();
      const assistantMessage = data.response || "Sorry, I couldn't generate a response at this time.";
      
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: assistantMessage }
      ]);
    } catch (error) {
      console.error("Error calling Ollama:", error);
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error connecting to our AI service. Please try again later." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user message submission
  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    
    // Add user message to the chat
    setMessages(prev => [...prev, { role: "user", content: message }]);
    
    // Send to Ollama for processing
    sendMessageToOllama(message);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50" data-oid="5m6fu8r">
      {isOpen ? (
        <div
          className={cn(
            "bg-black/80 backdrop-blur-md rounded-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/20 transition-all duration-300 overflow-hidden",
            isMinimized ? "w-64 h-12" : "w-80 h-[500px] md:w-96 md:h-[600px]",
          )}
          data-oid="mbh17ih"
        >
          {/* Chat header */}
          <div
            className="flex items-center justify-between p-3 border-b border-cyan-500/30 bg-black/60"
            data-oid="niu7-bh"
          >
            <div className="flex items-center" data-oid="389pc07">
              <div
                className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse mr-2"
                data-oid="2dr7kkf"
              ></div>
              <span
                className="text-cyan-400 font-mono text-sm"
                data-oid="5t.et:y"
              >
                MASH-BOT
              </span>
            </div>
            <div className="flex items-center space-x-2" data-oid="jf7cs51">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                data-oid="nhi3g6p"
              >
                {isMinimized ? (
                  <Maximize2 size={16} data-oid="oogu09y" />
                ) : (
                  <Minimize2 size={16} data-oid="uf82qb9" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                data-oid="kr1zxqy"
              >
                <X size={16} data-oid="_9q:dva" />
              </button>
            </div>
          </div>

          {/* Chat content */}
          {isMinimized ? (
            <div
              className="p-2 text-xs text-cyan-300 font-mono"
              data-oid="1-z-cyz"
            >
              Chat minimized. Click to expand.
            </div>
          ) : (
            <div className="h-[calc(100%-40px)]" data-oid="nlrf52:">
              <ChatInterface 
                isFloating={true} 
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                systemPrompt={systemPrompt}
                data-oid="i6a9s8:" 
              />
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => {
            setIsOpen(true);
            // Initialize with a welcome message when opening
            if (messages.length === 0) {
              setMessages([{
                role: "assistant",
                content: "Hi there! I'm Mash-Bot, your Artintel assistant. How can I help you today?"
              }]);
            }
          }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-white shadow-lg transition-all duration-300 hover:bg-cyan-600"
          data-oid="5xszl8f"
        >
          <MessageSquare className="h-6 w-6" data-oid="x8v6p05" />
          <span
            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold"
            data-oid="3xmujnb"
          >
            1
          </span>
          <div
            className="absolute inset-0 rounded-full border border-cyan-400 opacity-50 transition-all duration-300 group-hover:scale-110"
            data-oid="qpsr32a"
          ></div>
          <div
            className="absolute inset-0 rounded-full border-2 border-cyan-300/50 opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100"
            data-oid="8_7r:2b"
          ></div>
        </button>
      )}

      {/* Full page link */}
      {isOpen && !isMinimized && (
        <div
          className="absolute bottom-2 left-0 right-0 flex justify-center"
          data-oid="dczods8"
        >
          <Link
            href="/mash-chatbot"
            className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-mono"
            data-oid="xlt5ho:"
          >
            Open full chatbot →
          </Link>
        </div>
      )}
    </div>
  );
}
