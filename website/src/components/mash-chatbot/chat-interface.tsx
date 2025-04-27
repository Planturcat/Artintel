"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Send,
  Mic,
  Paperclip,
  ImageIcon,
  StopCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/cn";
import {
  checkOllamaStatus,
  transcribeAudio,
  streamCompletion,
} from "@/lib/ollama-client";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  isAudio?: boolean;
  isLoading?: boolean;
  isError?: boolean;
};

interface ChatInterfaceProps {
  isFloating?: boolean;
  modelName?: string;
  messages?: Array<{ role: "user" | "assistant"; content: string }>;
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
  systemPrompt?: string;
}

interface OllamaMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const getSiteContext = (customPrompt?: string) => {
  return customPrompt || "You are a helpful AI assistant named MASH-BOT. You are assisting users on the MASH-AI website.";
};

export default function ChatInterface({
  isFloating = false,
  modelName = "llama2:7b",
  messages: externalMessages,
  onSendMessage,
  isLoading: externalLoading,
  systemPrompt,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(
    externalMessages
      ? externalMessages.map((msg, index) => ({
          id: index.toString(),
          content: msg.content,
          sender: msg.role === "user" ? "user" : "bot",
          timestamp: new Date(),
        }))
      : [
          {
            id: "1",
            content: "Welcome to MASH Chatbot. How can I assist you today?",
            sender: "bot",
            timestamp: new Date(),
          },
        ]
  );
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [streamedResponse, setStreamedResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  // References
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Update local messages when external messages change
  useEffect(() => {
    if (externalMessages && Array.isArray(externalMessages)) {
      setMessages(
        externalMessages.map((msg, index) => ({
          id: `ext-${index}`,
          content: msg.content,
          sender: msg.role === "user" ? "user" : "bot",
          timestamp: new Date(),
        }))
      );
    }
  }, [externalMessages]);

  // Check Ollama connection status on mount
  useEffect(() => {
    const checkConnection = async () => {
      const status = await checkOllamaStatus();
      setIsConnected(status);
    };

    checkConnection();
    // Set up periodic connection checks
    const intervalId = setInterval(checkConnection, 30000);

    return () => clearInterval(intervalId);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Clean up timers and recording on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      stopRecording();

      // Cancel any in-progress generation
      if (abortController) {
        abortController.abort();
      }
    };
  }, [abortController]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || isProcessing) return;

    // If using external message handling
    if (onSendMessage) {
      onSendMessage(inputValue);
      setInputValue("");
      return;
    }

    // Original internal message handling logic
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);
    setIsGenerating(true);

    // Add placeholder for bot response
    const botPlaceholderId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: botPlaceholderId,
        content: "",
        sender: "bot",
        timestamp: new Date(),
        isLoading: true,
      },
    ]);

    try {
      // Check connection status first
      const isOllamaRunning = await checkOllamaStatus();

      if (!isOllamaRunning) {
        // If Ollama is not running, use fallback responses
        setIsConnected(false);
        await generateFallbackResponse(botPlaceholderId, inputValue);
        return;
      }

      setIsConnected(true);

      // Prepare messages for Ollama
      const ollamaMessages: OllamaMessage[] = [
        { role: "system", content: getSiteContext(systemPrompt) },
      ];

      // Add conversation history (limited to last 10 messages)
      const historyMessages = messages.slice(-10).map(
        (msg) =>
          ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.content,
          }) as OllamaMessage,
      );

      ollamaMessages.push(...historyMessages);

      // Add current user message
      ollamaMessages.push({ role: "user", content: inputValue });

      // Initialize response accumulator
      let accumulatedResponse = "";

      // Create an abort controller for this request
      const controller = new AbortController();
      setAbortController(controller);

      // Stream the completion
      await streamCompletion(
        {
          model: modelName,
          messages: ollamaMessages,
          stream: true,
        },
        (chunk) => {
          if (chunk.message?.content) {
            accumulatedResponse += chunk.message.content;

            // Update the message with the accumulated response
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === botPlaceholderId
                  ? { ...msg, content: accumulatedResponse, isLoading: false }
                  : msg,
              ),
            );

            // Auto-scroll as text comes in
            scrollToBottom();
          }
        },
        () => {
          // On complete
          setIsProcessing(false);
          setIsGenerating(false);
          setAbortController(null);
          scrollToBottom();
        },
        (error) => {
          // On error
          console.error("Error during streaming completion:", error);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botPlaceholderId
                ? {
                    ...msg,
                    content:
                      "Sorry, I encountered an error processing your request. Please try again.",
                    isLoading: false,
                    isError: true,
                  }
                : msg,
            ),
          );
          setIsProcessing(false);
          setIsGenerating(false);
          setAbortController(null);
        },
      );
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      // Update the placeholder with an error message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botPlaceholderId
            ? {
                ...msg,
                content:
                  "Sorry, I encountered an error processing your request. Please try again.",
                isLoading: false,
                isError: true,
              }
            : msg,
        ),
      );
      setIsProcessing(false);
      setIsGenerating(false);
    }
  };

  const stopGeneration = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    setIsGenerating(false);
    setIsProcessing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Reset recording state
      audioChunksRef.current = [];
      setRecordingTime(0);

      // Create media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      // Set up event handlers
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // Create blob from recorded chunks
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlob(audioBlob);

        // Create a message with the audio
        const audioUrl = URL.createObjectURL(audioBlob);

        // Add user message for the audio
        const userMessage: Message = {
          id: Date.now().toString(),
          content: audioUrl,
          sender: "user",
          timestamp: new Date(),
          isAudio: true,
        };

        setMessages((prev) => [...prev, userMessage]);

        // Add placeholder for transcription
        const transcriptionPlaceholderId = (Date.now() + 1).toString();
        setMessages((prev) => [
          ...prev,
          {
            id: transcriptionPlaceholderId,
            content: "Transcribing audio...",
            sender: "bot",
            timestamp: new Date(),
            isLoading: true,
          },
        ]);

        try {
          // Attempt to transcribe the audio
          setIsProcessing(true);
          const transcription = await transcribeAudio(audioBlob);

          // Update placeholder with transcription result
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === transcriptionPlaceholderId
                ? {
                    ...msg,
                    content: `Transcription: "${transcription}"`,
                    isLoading: false,
                  }
                : msg,
            ),
          );

          // Now process the transcribed text with the model
          // Add placeholder for bot response
          const botPlaceholderId = (Date.now() + 2).toString();
          setMessages((prev) => [
            ...prev,
            {
              id: botPlaceholderId,
              content: "",
              sender: "bot",
              timestamp: new Date(),
              isLoading: true,
            },
          ]);

          // Check connection status
          const isOllamaRunning = await checkOllamaStatus();

          if (!isOllamaRunning) {
            // If Ollama is not running, use fallback responses
            setIsConnected(false);
            await generateFallbackResponse(botPlaceholderId, transcription);
          } else {
            setIsConnected(true);

            // Prepare messages for Ollama
            const ollamaMessages: OllamaMessage[] = [
              { role: "system", content: getSiteContext() },
            ];

            // Add conversation history (limited to last 10 messages)
            const historyMessages = messages
              .filter(
                (msg) =>
                  !msg.isAudio && !msg.content.startsWith("Transcription:"),
              )
              .slice(-10)
              .map(
                (msg) =>
                  ({
                    role: msg.sender === "user" ? "user" : "assistant",
                    content: msg.content,
                  }) as OllamaMessage,
              );

            ollamaMessages.push(...historyMessages);

            // Add transcribed message
            ollamaMessages.push({ role: "user", content: transcription });

            // Initialize response accumulator
            let accumulatedResponse = "";

            // Stream the completion
            await streamCompletion(
              {
                model: modelName,
                messages: ollamaMessages,
                stream: true,
              },
              (chunk) => {
                if (chunk.message?.content) {
                  accumulatedResponse += chunk.message.content;

                  // Update the message with the accumulated response
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === botPlaceholderId
                        ? {
                            ...msg,
                            content: accumulatedResponse,
                            isLoading: false,
                          }
                        : msg,
                    ),
                  );
                }
              },
              () => {
                // On complete
                setIsProcessing(false);
              },
              async (error) => {
                // On error, fall back to demo responses
                console.error("Error streaming completion:", error);
                await generateFallbackResponse(botPlaceholderId, transcription);
              },
            );
          }
        } catch (error) {
          console.error("Error processing audio:", error);
          setIsProcessing(false);

          // Update placeholder with error message
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === transcriptionPlaceholderId
                ? {
                    ...msg,
                    content:
                      "Sorry, I couldn't transcribe your audio. Please try again or type your message.",
                    isLoading: false,
                    isError: true,
                  }
                : msg,
            ),
          );
        }

        // Clean up
        stream.getTracks().forEach((track) => track.stop());
      };

      // Start recording
      mediaRecorder.start(100);
      setIsRecording(true);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content:
            "Could not access your microphone. Please check permissions and try again.",
          sender: "bot",
          timestamp: new Date(),
          isError: true,
        },
      ]);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Add this helper function for fallback responses
  const generateFallbackResponse = async (
    botPlaceholderId: string,
    userInput: string,
  ) => {
    // Generate a response based on the input
    let response = "";

    if (
      userInput.toLowerCase().includes("pricing") ||
      userInput.toLowerCase().includes("cost")
    ) {
      response =
        "Our pricing is tiered based on usage. We offer a free tier for hobbyists, a Pro tier at $29/month for professionals, and Enterprise plans with custom pricing for large-scale deployments.";
    } else if (
      userInput.toLowerCase().includes("model") ||
      userInput.toLowerCase().includes("llm") ||
      userInput.toLowerCase().includes("slm")
    ) {
      response =
        "MASH offers both Large Language Models (LLMs) for cloud deployment and Small Language Models (SLMs) optimized for edge devices. Our models range from 1B to 70B parameters, with specialized versions for code, vision, and multilingual support.";
    } else if (
      userInput.toLowerCase().includes("contact") ||
      userInput.toLowerCase().includes("support")
    ) {
      response =
        "You can reach our support team at support@mash-ai.io or through the contact form on our website. For enterprise inquiries, please email enterprise@mash-ai.io.";
    } else if (
      userInput.toLowerCase().includes("hello") ||
      userInput.toLowerCase().includes("hi") ||
      userInput.toLowerCase().includes("hey")
    ) {
      response =
        "Hey there, netrunner! Welcome to MASH. How can I assist with your AI needs today?";
    } else {
      response =
        "Thanks for your message. MASH specializes in cutting-edge AI models for both cloud and edge deployment. Our cyberpunk-inspired platform offers state-of-the-art language models with industry-leading performance. How else can I help you explore our AI solutions?";
    }

    // Update message with the response, character by character to simulate streaming
    let displayedResponse = "";
    const chars = response.split("");

    for (let i = 0; i < chars.length; i++) {
      displayedResponse += chars[i];

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botPlaceholderId
            ? { ...msg, content: displayedResponse, isLoading: false }
            : msg,
        ),
      );

      // Add a small delay between characters to simulate typing
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    setIsProcessing(false);
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-black/60",
        isFloating ? "rounded-none" : "rounded-lg border border-gray-800"
      )}
      ref={chatContainerRef}
      data-oid="dv0f0f8"
    >
      {/* Connection status indicator */}
      <div
        className={cn(
          "absolute top-2 right-2 z-20 flex items-center rounded-full px-2 py-1 text-xs",
          isConnected === true
            ? "bg-green-900/40 text-green-400 border border-green-500/30"
            : isConnected === false
              ? "bg-red-900/40 text-red-400 border border-red-500/30"
              : "bg-yellow-900/40 text-yellow-400 border border-yellow-500/30",
        )}
        data-oid="eclrf-j"
      >
        <div
          className={cn(
            "w-2 h-2 rounded-full mr-1",
            isConnected === true
              ? "bg-green-500 animate-pulse"
              : isConnected === false
                ? "bg-red-500"
                : "bg-yellow-500 animate-pulse",
          )}
          data-oid="pr:1nb-"
        ></div>
        {isConnected === true
          ? "Connected"
          : isConnected === false
            ? "Disconnected"
            : "Connecting..."}
      </div>

      {!isFloating && (
        <div
          className="p-4 border-b border-cyan-500/30 bg-black/60 flex items-center justify-between"
          data-oid="od8oeys"
        >
          <div className="flex items-center space-x-3" data-oid="wf7k6kd">
            <div
              className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"
              data-oid="a:wolr5"
            ></div>
            <h3 className="text-cyan-400 font-mono" data-oid=":hvgfz4">
              MASH-BOT v1.0
            </h3>
          </div>
          <div
            className="text-xs text-cyan-300/70 font-mono"
            data-oid="04q-lq3"
          >
            MODEL: {modelName.toUpperCase()}
          </div>
        </div>
      )}

      {/* Chat messages container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-black/20 scrollbar-thumb-gray-600"
        data-oid="u9qr_fc"
      >
        {externalLoading && messages.length === 0 ? (
          <div className="flex justify-center items-center h-full" data-oid="k4ys1er">
            <Loader2 className="h-6 w-6 animate-spin text-cyan-500" data-oid="2.0.w:v" />
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex flex-col",
                message.sender === "user" ? "items-end" : "items-start"
              )}
              data-oid="mxp_ij1"
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2",
                  message.sender === "user"
                    ? "bg-cyan-500/80 text-white"
                    : "bg-gray-800/80 text-gray-100",
                  message.isError && "border border-red-500/50"
                )}
                data-oid="5_h9g_a"
              >
                {message.isLoading ? (
                  <div className="flex items-center space-x-2" data-oid="d-d9y94">
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse" data-oid="ux8.a8b"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-150" data-oid="9-q6cw4"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-300" data-oid="dxrq9ub"></div>
                  </div>
                ) : message.isAudio ? (
                  <div className="flex items-center" data-oid="n3:41c-">
                    <Mic size={14} className="mr-2" data-oid="0vdvdf6" />
                    <span data-oid="bz_j.oi">{message.content}</span>
                  </div>
                ) : (
                  <div
                    className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:p-2 break-words"
                    data-oid="5kd5_1e"
                  >
                    {message.content.split("\n").map((line, i) => (
                      <div key={i} data-oid="98wgxvh">
                        {line}
                        {i !== message.content.split("\n").length - 1 && <br />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div
                className={cn(
                  "mt-1 text-xs text-gray-500",
                  message.sender === "user" ? "text-right" : "text-left"
                )}
                data-oid="l2m:s7s"
              >
                {formatTime(message.timestamp)}
              </div>
            </div>
          ))
        )}
        {isGenerating && onSendMessage && (
          <div className="flex items-start" data-oid="ey.s8y5">
            <div className="bg-gray-800/80 text-gray-100 max-w-[85%] rounded-2xl px-4 py-2" data-oid="3r3tpwh">
              <div className="flex items-center space-x-2" data-oid="mw6.7fc">
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse" data-oid="p:1b13u"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-150" data-oid="--jh05y"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-300" data-oid="3u56xbf"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} data-oid="3:6vxsi" />
      </div>

      {/* Input area */}
      <div className="border-t border-cyan-500/30 p-3 bg-black/60" data-oid="x8s-.qf">
        {isConnected === false && (
          <div className="mb-2 rounded-lg bg-orange-500/20 p-2 text-xs text-orange-300" data-oid="b-9iyzs">
            <AlertCircle className="mr-1 inline-block h-3 w-3" data-oid="tq.hkbw" />
            Ollama connection failed. Using fallback responses.
          </div>
        )}
        
        {isRecording && (
          <div className="mb-2 rounded-lg bg-red-500/20 p-2 text-xs text-red-300 animate-pulse" data-oid="9ihf-v3">
            Recording... {formatRecordingTime(recordingTime)}
          </div>
        )}
        
        <div className="flex items-center space-x-2 relative" data-oid="hy1aff5">
          <textarea
            className="flex h-10 w-full resize-none rounded-lg bg-gray-800/60 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
            placeholder="Type a message..."
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing || isRecording}
            data-oid="p9szcqc"
          />
          
          <div className="flex space-x-1" data-oid="uoknyzr">
            {isGenerating ? (
              <button
                onClick={stopGeneration}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                title="Stop generation"
                data-oid="hvc2d5g"
              >
                <StopCircle size={20} data-oid="ojg0epe" />
              </button>
            ) : (
              <>
                <button
                  onClick={toggleRecording}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors",
                    isRecording
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  )}
                  title={isRecording ? "Stop recording" : "Start recording"}
                  data-oid="4pxqc3c"
                >
                  <Mic size={20} data-oid="0wgk-rc" />
                </button>
                
                <button
                  onClick={handleSendMessage}
                  disabled={inputValue.trim() === "" || isProcessing}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-white transition-colors hover:bg-cyan-600 disabled:opacity-50"
                  title="Send message"
                  data-oid="-xqsczv"
                >
                  <Send size={20} data-oid="2v0thnj" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
