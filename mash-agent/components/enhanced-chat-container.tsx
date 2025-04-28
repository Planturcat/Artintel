"use client"

import React, { useState, useRef, useEffect } from 'react';
import { StepIndicator } from './step-indicator';
import { MessageList } from './message-list';
import { ChatInput } from './chat-input';
import { SettingsPanel } from './settings-panel';
import { UIGenerator } from './ui-generator';
import { Loader2 } from 'lucide-react';
import TemplateWizard from './template-wizard';

// Import API services
import { aiService } from "@/lib/services/ai-service";
import { setOllamaBaseUrl } from "@/lib/ollama-service";

// Import reasoning services
import { reasoningEngine } from "@/lib/services/reasoning-engine";
import { taskManager } from "@/lib/services/task-manager";
import { ThinkingStage } from "@/lib/services/reasoning-engine";

// Import knowledge base services
import { KnowledgeBaseService, KnowledgeCategory } from '../services/knowledge-base-service';

// Define types
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Step {
  name: string;
  status: 'pending' | 'complete' | 'error';
  message?: string;
}

interface BaseModel {
  id: string;
  name: string;
  description: string;
}

interface EnhancedChatContainerProps {
  mode: 'chat' | 'ui' | 'code' | 'unified';
}

// Available base models
const BASE_MODELS: BaseModel[] = [
  { id: "llama2:7b", name: "Llama 2 (7B)", description: "Meta's Llama 2 7B parameter model" },
  { id: "llama2:13b", name: "Llama 2 (13B)", description: "Meta's Llama 2 13B parameter model" },
  { id: "llama2:70b", name: "Llama 2 (70B)", description: "Meta's Llama 2 70B parameter model" },
  { id: "mistral:7b", name: "Mistral (7B)", description: "Mistral AI's 7B parameter model" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "OpenAI's GPT-3.5 Turbo model" },
  { id: "gpt-4o", name: "GPT-4o", description: "OpenAI's GPT-4o model" },
];

// Initialize the service
const knowledgeBaseService = new KnowledgeBaseService();

export const EnhancedChatContainer: React.FC<EnhancedChatContainerProps> = ({ mode }) => {
  // State for agent mode (chat or agent)
  const [agentMode, setAgentMode] = useState<'chat' | 'agent'>('chat');

  // Load chat history from localStorage or use default welcome message
  const loadChatHistory = (): Message[] => {
    if (typeof window !== 'undefined') {
      // Check if we have a current chat ID
      const currentChatId = localStorage.getItem('currentChatId');

      if (currentChatId) {
        // Try to load the specific chat
        const chatData = localStorage.getItem(`chat-${currentChatId}`);
        if (chatData) {
          try {
            return JSON.parse(chatData);
          } catch (e) {
            console.error(`Error parsing chat ${currentChatId}:`, e);
          }
        }
      }

      // Fall back to the legacy chatHistory if no current chat ID or it failed to load
      const savedMessages = localStorage.getItem('chatHistory');
      if (savedMessages) {
        try {
          const messages = JSON.parse(savedMessages);

          // If we loaded from legacy storage, create a new chat entry
          if (messages.length > 0 && !currentChatId) {
            const newChatId = `chat-${Date.now()}`;
            localStorage.setItem('currentChatId', newChatId);
            localStorage.setItem(`chat-${newChatId}`, savedMessages);

            // Update chat index
            const chatIndex = JSON.parse(localStorage.getItem('chat-index') || '[]');
            const firstUserMsg = messages.find((msg: Message) => msg.role === 'user')?.content || '';
            chatIndex.unshift({
              id: newChatId,
              title: firstUserMsg ? `Chat: ${firstUserMsg.substring(0, 20)}...` : 'Imported Chat',
              preview: firstUserMsg.substring(0, 60) + (firstUserMsg.length > 60 ? '...' : ''),
              timestamp: Date.now()
            });
            localStorage.setItem('chat-index', JSON.stringify(chatIndex));
          }

          return messages;
        } catch (e) {
          console.error('Error parsing saved chat history:', e);
        }
      }
    }

    // Default welcome message if no history exists
    const welcomeMessage = {
      role: "assistant" as const,
      content: mode === 'unified'
        ? agentMode === 'chat'
          ? "Hi! I'm Mash, your Artintel assistant. I'm ready to help you discover, fine-tune, and deploy LLMs and SLMs. What can I help you with today?"
          : "Hi! I'm Mash, your intelligent Artintel agent. I can help you with model selection, data integration, fine-tuning workflows, deployment, and monitoring of language models. What would you like help with?"
        : mode === 'chat'
          ? "Hi! I'm Mash, your Artintel assistant. I'm ready to help with language model tasks or general conversation. What can I help you with today?"
          : mode === 'ui'
            ? "Welcome to the UI Builder! I can help you create beautiful UI components for your AI applications. Describe what you'd like to build, and I'll generate the code for you."
            : "Welcome to the Code Assistant! I can help you write, debug, and optimize code for your AI applications. What would you like to work on today?"
    };

    // Create a new chat ID for this session
    if (typeof window !== 'undefined') {
      const newChatId = `chat-${Date.now()}`;
      localStorage.setItem('currentChatId', newChatId);
      localStorage.setItem(`chat-${newChatId}`, JSON.stringify([welcomeMessage]));

      // Initialize chat index if needed
      const chatIndex = JSON.parse(localStorage.getItem('chat-index') || '[]');
      chatIndex.unshift({
        id: newChatId,
        title: 'New Chat',
        preview: welcomeMessage.content.substring(0, 60) + '...',
        timestamp: Date.now()
      });
      localStorage.setItem('chat-index', JSON.stringify(chatIndex));
    }

    return [welcomeMessage];
  };

  // State for chat
  const [messages, setMessages] = useState<Message[]>(loadChatHistory());
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // State for UI operation steps
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [showThinking, setShowThinking] = useState(false);
  const [thinkingSteps, setThinkingSteps] = useState<{stage: string, reasoning: string}[]>([]);
  const [expandedSteps, setExpandedSteps] = useState<{[key: number]: boolean}>({});
  
  // New state variables for enhanced chat mode
  const [useReasoningInChat, setUseReasoningInChat] = useState<boolean>(true);
  const [showThinkingInChat, setShowThinkingInChat] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Ref for click outside detection
  const thinkingStepsRef = useRef<HTMLDivElement>(null);

  // State for AI models and connection
  const [availableModels, setAvailableModels] = useState<Array<{ name: string; [key: string]: any }>>([]);
  const [currentModel, setCurrentModel] = useState(BASE_MODELS[0].id);
  const [aiServiceConnected, setAIServiceConnected] = useState(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [connectionError, setConnectionError] = useState<string | undefined>();
  const [modelPulling, setModelPulling] = useState<{ model: string; status: string } | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // State for generated code (for UI and code modes)
  const [generatedCode, setGeneratedCode] = useState<string>('');

  // State for intelligent alerts
  const [alerts, setAlerts] = useState<{message: string, type: 'info' | 'warning' | 'error'}[]>([]);

  // State for template wizard
  const [isTemplateWizardOpen, setIsTemplateWizardOpen] = useState(false);

  // AI service connection check
  const checkAIServiceConnection = async (retries = 3, silent = false): Promise<boolean> => {
    if (!silent) {
      setIsCheckingConnection(true);
      setConnectionError(undefined);
    }

    try {
      // Use the AI service to check connection
      const connectionStatus = await aiService.checkConnection();

      if (connectionStatus.connected) {
        setAIServiceConnected(true);

        // If connected, fetch the available models
        try {
          const models = await aiService.getModels();
          if (models && models.length > 0) {
            setAvailableModels(models);
          }
        } catch (modelError) {
          console.error("Model fetch failed:", modelError);
        }

        return true;
      }

      if (retries > 0 && !silent) {
        // Retry with exponential backoff
        await new Promise((resolve) => setTimeout(resolve, (4 - retries) * 1000));
        return checkAIServiceConnection(retries - 1, silent);
      }

      if (!silent) {
        // Set Ollama to mock mode if we can't connect to the real service
        console.log("Failed to connect after retries, setting to mock mode");
        setOllamaBaseUrl('mock');
        
        // Try again with mock mode
        try {
          const mockStatus = await aiService.checkConnection();
          if (mockStatus.connected) {
            setAIServiceConnected(true);
            const models = await aiService.getModels();
            if (models && models.length > 0) {
              setAvailableModels(models);
            }
            setConnectionError("Using demo mode (no Ollama connection)");
            return true;
          }
        } catch (mockError) {
          console.error("Mock mode setup failed:", mockError);
        }
        
        setAIServiceConnected(false);
        setConnectionError("Could not connect to AI service. Using fallback mode.");
      }
      return false;
    } catch (error) {
      console.error("Error connecting to AI service:", error);

      if (retries > 0 && !silent) {
        // Retry with exponential backoff
        await new Promise((resolve) => setTimeout(resolve, (4 - retries) * 1000));
        return checkAIServiceConnection(retries - 1, silent);
      }

      if (!silent) {
        // Set Ollama to mock mode if we can't connect to the real service
        console.log("Connection error, setting to mock mode");
        setOllamaBaseUrl('mock');
        
        // Try again with mock mode
        try {
          const mockStatus = await aiService.checkConnection();
          if (mockStatus.connected) {
            setAIServiceConnected(true);
            const models = await aiService.getModels();
            if (models && models.length > 0) {
              setAvailableModels(models);
            }
            setConnectionError("Using demo mode (no Ollama connection)");
            return true;
          }
        } catch (mockError) {
          console.error("Mock mode setup failed:", mockError);
        }
        
        setAIServiceConnected(false);
        const errorMessage = error instanceof Error ? error.message : String(error);
        setConnectionError(`Error connecting to AI service: ${errorMessage}. Using fallback mode.`);
      }
      return false;
    } finally {
      if (!silent) {
        setIsCheckingConnection(false);
      }
    }
  };

  // Process a message in chat mode versus agent mode
  const processMessage = async (userMessage: string): Promise<string> => {
    setIsProcessing(true);
    
    try {
      // For chat mode, use the reasoning engine with conversational presentation
    if (mode === 'unified' && agentMode === 'chat') {
        console.log("Processing in chat mode with reasoning:", useReasoningInChat);
        
        // If not using reasoning in chat mode, fall back to direct API or predefined responses
        if (!useReasoningInChat) {
          // Try to use the AI service if available, but don't wait too long
          try {
            // Set a timeout for AI service connection
            const timeoutPromise = new Promise<boolean>((_, reject) => 
              setTimeout(() => reject(new Error("AI service connection timeout")), 3000)
            );
            
            // Try to connect to AI service with timeout
            if (!aiServiceConnected) {
              try {
                const connectionPromise = checkAIServiceConnection(1, true);
                await Promise.race([connectionPromise, timeoutPromise]);
              } catch (error) {
                console.warn("AI service connection failed or timed out, using fallback response");
                return generateSimpleChatResponse(userMessage);
              }
            }

            // If we reach here, connection was successful or already established
            // Use the AI service with a timeout as well
            const modelName = currentModel || "llama2:7b";
            aiService.setCurrentModel(modelName);

            // Create a prompt with context about Artintel
            const prompt = `You are Mash, an AI assistant for Artintel, a platform for discovering, fine-tuning, and deploying language models.
Your goal is to provide helpful, accurate information about AI technologies, particularly language models.
You should be conversational but concise, and focus on providing practical guidance.

User message: ${userMessage}

Your response:`;

            // Set a timeout for AI generation
            const generationPromise = aiService.generateText(prompt);
            const responseWithTimeout = await Promise.race([
              generationPromise,
              new Promise<null>((_, reject) => 
                setTimeout(() => reject(new Error("AI generation timeout")), 6000)
              )
            ]);
            
            // Check if we got a valid response
            if (responseWithTimeout && responseWithTimeout.response) {
              console.log("Got valid response from AI service");
              return responseWithTimeout.response;
            }
          } catch (error) {
            console.warn("Error in AI service interaction:", error);
            // Fall through to fallback response
          }
          
          // Always fall back to a simple response if anything goes wrong
          console.log("Using fallback response");
          return generateSimpleChatResponse(userMessage);
        }
        
        // Enhanced chat mode using reasoning engine with conversational presentation
        console.log("Using reasoning engine in chat mode");
        
        // Detect task type
        const taskType = detectTaskType(userMessage);
        console.log("Detected task type:", taskType);
        
        // Update steps for visualization if showing thinking in chat mode
        if (showThinkingInChat) {
          setSteps([
            { name: "Understanding request", status: "pending" },
            { name: "Determining task type", status: "pending" },
            { name: "Processing task", status: "pending" },
            { name: "Formulating response", status: "pending" }
          ]);
          setCurrentStep("Understanding request");
          setThinkingSteps([]);
          setExpandedSteps({});
        } else {
          // Don't show steps in regular chat mode
          setSteps([]);
          setThinkingSteps([]);
        }
        
      // Connect to AI service if needed
      if (!aiServiceConnected) {
        const connected = await checkAIServiceConnection(1, true);
        if (!connected) {
            if (showThinkingInChat) {
              setSteps((prev) =>
                prev.map((step) =>
                  step.name === "Understanding request" ? { ...step, status: "error", message: "Couldn't connect to AI service" } : step
                )
              );
            }
            return "I couldn't connect to the AI model. Please check your connection and try again.";
          }
        }
        
        try {
          // Set the model for reasoning engine based on user selection
      const modelName = currentModel || "llama2:7b";
          reasoningEngine.setModel(modelName);
          
          // Create a special conversational system prompt for chat mode
          reasoningEngine.setSystemPrompt(`You are Mash, an AI assistant for Artintel, a platform that helps discover, fine-tune, and deploy language models.
Be conversational, helpful, and focused on providing practical advice related to Artintel's offerings.
When answering, be clear and concise while still being friendly. Focus on addressing the user's needs.
Always maintain a helpful, positive tone even when dealing with technical subjects.`);

          // Add the user message to task manager conversation history
          taskManager.addToConversationHistory({ role: 'user', content: userMessage });

          // Update steps if showing thinking
          if (showThinkingInChat) {
            updateStepStatus("Understanding request", "complete");
            setCurrentStep("Determining task type");
          }

          // Process the user message through task manager with chat-optimized settings
          const chatProcessingOptions = {
            mode: 'chat',
            showThinking: showThinkingInChat,
            taskType: taskType
          };
          
          const task = await taskManager.processUserMessage(userMessage, chatProcessingOptions);
          
          if (showThinkingInChat) {
            updateStepStatus("Determining task type", "complete");
            
            // Capture thinking steps for display
            if (task.thinkingProcess?.steps) {
              setThinkingSteps(
                task.thinkingProcess.steps.map(step => ({
                  stage: step.stage,
                  reasoning: step.reasoning
                }))
              );
            }
            
            // Update UI steps
            setCurrentStep("Processing task");
            updateStepStatus("Processing task", "complete");
            setCurrentStep("Formulating response");
            updateStepStatus("Formulating response", "complete");
          }

          // Format the response appropriately for chat mode
          const responseText = formatReasoningResponseForChat(task, taskType);
          
          // Add system message to conversation history
          taskManager.addToConversationHistory({ role: 'assistant' as const, content: responseText });

          // Complete all steps if showing thinking
          if (showThinkingInChat) {
            setSteps(prev => prev.map(step => ({ ...step, status: "complete" })));
          }

          // Return the formulated response
          return responseText;
        } catch (error: any) {
          console.error("Error processing with reasoning engine in chat mode:", error);

          // Update steps to show error if showing thinking
          if (showThinkingInChat) {
            setSteps(prev => prev.map(step =>
              step.name === currentStep ? { ...step, status: "error", message: "Processing Error" } : step
            ));
          }

          // Fall back to simple response on error
          console.log("Falling back to simple response due to error");
      return generateSimpleChatResponse(userMessage);
        }
    }

      // For agent mode, use the existing full reasoning engine implementation
      if (mode === 'unified' && agentMode === 'agent') {
        console.log("Processing in agent mode");

    // Determine if this is a UI generation request
    const isUIRequest = userMessage.toLowerCase().includes('create ui') ||
                       userMessage.toLowerCase().includes('build ui') ||
                       userMessage.toLowerCase().includes('design ui') ||
                       userMessage.toLowerCase().includes('generate ui') ||
                       userMessage.toLowerCase().includes('create a form') ||
                       userMessage.toLowerCase().includes('create a component') ||
                       userMessage.toLowerCase().includes('build a dashboard') ||
                       userMessage.toLowerCase().includes('design a card');

    // Determine if this is a code generation request
    const isCodeRequest = userMessage.toLowerCase().includes('generate code') ||
                         userMessage.toLowerCase().includes('write code') ||
                         userMessage.toLowerCase().includes('debug code') ||
                         userMessage.toLowerCase().includes('optimize code') ||
                         userMessage.toLowerCase().includes('refactor code') ||
                         userMessage.toLowerCase().includes('convert code');

    // Update steps for visualization
    setSteps([
      { name: "Understanding request", status: "pending" },
      { name: "Determining task type", status: "pending" },
      { name: isUIRequest ? "Generating UI" : isCodeRequest ? "Generating code" : "Processing task", status: "pending" },
      { name: "Formulating response", status: "pending" }
    ]);
    setCurrentStep("Understanding request");
    setThinkingSteps([]);
    setExpandedSteps({});

    // Connect to AI service if needed
    if (!aiServiceConnected) {
      const connected = await checkAIServiceConnection(1, true);
      if (!connected) {
        setSteps((prev) =>
          prev.map((step) =>
            step.name === "Understanding request" ? { ...step, status: "error", message: "Couldn't connect to AI service" } : step
          )
        );
        return "I couldn't connect to the AI model. Please check your connection and try again.";
      }
    }

    try {
      // Set the model for reasoning engine based on user selection
      const modelName = currentModel || "llama2:7b";
      reasoningEngine.setModel(modelName);

      // Add the user message to task manager conversation history
      taskManager.addToConversationHistory({ role: 'user', content: userMessage });

      // Process the message through the task manager
      setCurrentStep("Understanding request");
      updateStepStatus("Understanding request", "complete");
      setCurrentStep("Determining task type");

      // Process the user message through task manager - this will call the reasoning engine and APIs
          const task = await taskManager.processUserMessage(userMessage, 'agent');
      updateStepStatus("Determining task type", "complete");

      // Capture thinking steps for display
      if (task.thinkingProcess?.steps) {
        setThinkingSteps(
          task.thinkingProcess.steps.map(step => ({
            stage: step.stage,
            reasoning: step.reasoning
          }))
        );
      }

      // Update the processing task step
      setCurrentStep("Processing task");
      updateStepStatus("Processing task", "complete");

      // Update the formulating response step
      setCurrentStep("Formulating response");
      updateStepStatus("Formulating response", "complete");

      // Add system message to conversation history
      const responseText = getResponseFromTask(task);
          taskManager.addToConversationHistory({ role: 'assistant' as const, content: responseText });

      // Complete all steps
      setSteps(prev => prev.map(step => ({ ...step, status: "complete" })));

      // Return the formulated response
      return responseText;
    } catch (error: any) {
      console.error("Error processing with reasoning engine:", error);

      // Update steps to show error
      setSteps(prev => prev.map(step =>
        step.name === currentStep ? { ...step, status: "error", message: "Processing Error" } : step
      ));

      // Extract error message
      let errorMessage = "I encountered an error while processing your request.";
      if (error.message) {
        if (error.message.includes("Failed to fetch") || error.message.includes("Could not connect")) {
          errorMessage = "❌ Connection Error: Could not connect to the AI service.\n\nPlease ensure that:\n• Your internet connection is working\n• The AI service is available\n• No firewall is blocking the connection\n\nTry refreshing the page or restarting your computer if the issue persists.";
        }
      }

      return errorMessage;
        }
      }

      // Default processing for other modes (fallback)
      return "I'm processing your message, but I'm not sure which mode to use. Please try switching to chat or agent mode.";
    } catch (error: any) {
      console.error("Error processing message:", error);
      return "Sorry, I encountered an error. Please check your connection and try again later.";
    } finally {
      setIsProcessing(false);
    }
  };

  // Helper function to detect the type of task in the user message
  const detectTaskType = (userMessage: string): string => {
    const normalizedMessage = userMessage.toLowerCase().trim();
    
    if (/fine-tun|train|adapt|customize|domain adaptation/i.test(normalizedMessage)) {
      return 'fine-tuning';
    }
    
    if (/deploy|serve|host|production|inference/i.test(normalizedMessage)) {
      return 'deployment';
    }
    
    if (/data|dataset|preprocess|clean|format/i.test(normalizedMessage)) {
      return 'data-processing';
    }
    
    if (/model|llm|slm|language model|which model|model selection/i.test(normalizedMessage)) {
      return 'model-selection';
    }
    
    if (/monitor|metric|performance|track|analytic/i.test(normalizedMessage)) {
      return 'monitoring';
    }
    
    if (/ui|interface|component|design|visual/i.test(normalizedMessage)) {
      return 'ui-generation';
    }
    
    if (/code|program|function|script|debug/i.test(normalizedMessage)) {
      return 'code-generation';
    }
    
    return 'general';
  };

  // Helper function to format reasoning engine responses for chat mode
  const formatReasoningResponseForChat = (task: any, taskType: string): string => {
    // First try to get response from response_formulation step
    const responseStep = task.reasoning?.find((step: any) => step.step === 'response_formulation');
    if (responseStep?.output) {
      // Post-process the response to ensure it's conversational
      let response = responseStep.output;
      
      // Remove excessive technical details if present
      response = response.replace(/Technical details:[\s\S]*?((?=\n\n)|$)/g, '');
      
      // Add task-specific follow-ups based on detected task type
      if (taskType === 'fine-tuning') {
        response += '\n\nAnything specific about fine-tuning you\'d like to explore further?';
      } else if (taskType === 'deployment') {
        response += '\n\nWould you like more details about any specific deployment aspect?';
      } else if (taskType === 'model-selection') {
        response += '\n\nWould you like recommendations for your specific use case?';
      }
      
      return response;
    }
    
    // If no response step found, check for specific task types
    if (task.type && task.type !== 'general') {
      switch (task.type) {
        case 'fine-tuning':
          return "I can help with fine-tuning models on Artintel. Would you like to know about preparing your data, choosing parameters, or evaluating results?";
        case 'deployment':
          return "Artintel offers several deployment options for your models. What kind of deployment are you interested in - cloud, on-premises, or edge?";
        case 'model-selection':
          return "Artintel supports various language models with different capabilities. What kind of task are you working on, so I can recommend the right model?";
        default:
          return "I understand you're asking about " + task.type + ". Could you tell me more about what you're trying to accomplish?";
      }
    }
    
    // Check if we had any API calls that should be included in the response
    const apiCalls = task.apiCalls || [];
    const datasetCalls = apiCalls.filter((call: {name: string}) => call.name === 'listDatasets');
    
    if (datasetCalls.length > 0) {
      const datasets = datasetCalls[0].result?.datasets || [];
      if (datasets.length > 0) {
        const datasetList = datasets.map((ds: any) => `- ${ds.name || 'Unnamed dataset'}`).join('\n');
        return `Here are your datasets:\n${datasetList}\n\nWould you like to know more about any of these?`;
      } else {
        return "I checked, but you don't have any datasets available yet. Would you like to upload one?";
      }
    }
    
    // Default response if we couldn't extract anything specific
    return "I've processed your request using our reasoning engine. Could you please provide more details about what you're looking for?";
  };

  // Helper function to update step status
  const updateStepStatus = (stepName: string, status: 'pending' | 'complete' | 'error', message?: string) => {
    setSteps(prev =>
      prev.map(step =>
        step.name === stepName ? { ...step, status, message } : step
      )
    );
  };

  // Helper function to extract response from task
  const getResponseFromTask = (task: any): string => {
    // First check for system connectivity issues
    const systemStatusCall = task.apiCalls.find((call: any) => call.name === 'checkSystemStatus');
    const isBackendDisconnected = systemStatusCall?.result?.backendConnected === false && systemStatusCall?.result?.aiServiceConnected === true;

    // The API calls made during processing
    const apiCalls = task.apiCalls || [];

    // Check if this is a UI generation task
    const isUITask = task.type === 'ui_generation' ||
                    (task.reasoning && task.reasoning.some((step: any) =>
                      step.reasoning && step.reasoning.toLowerCase().includes('ui component') ||
                      step.reasoning && step.reasoning.toLowerCase().includes('user interface')));

    // Check if this is a code generation task
    const isCodeTask = task.type === 'code_generation' ||
                      (task.reasoning && task.reasoning.some((step: any) =>
                        step.reasoning && step.reasoning.toLowerCase().includes('code generation') ||
                        step.reasoning && step.reasoning.toLowerCase().includes('writing code')));

    // First try to get response from response_formulation step
    const responseStep = task.reasoning.find((step: any) => step.step === 'response_formulation');
    if (responseStep?.output) {
      // If this is a UI generation task, update the generatedCode state
      if (isUITask && responseStep.output.includes('```')) {
        const codeMatch = responseStep.output.match(/```(?:jsx|tsx|html)([\s\S]*?)```/);
        if (codeMatch && codeMatch[1]) {
          setGeneratedCode(codeMatch[1].trim());
        }
      }

      // If this is a code generation task, update the generatedCode state
      if (isCodeTask && responseStep.output.includes('```')) {
        const codeMatch = responseStep.output.match(/```(?:jsx|tsx|js|ts|html|css|python|java|c#|ruby|go|php)([\s\S]*?)```/);
        if (codeMatch && codeMatch[1]) {
          setGeneratedCode(codeMatch[1].trim());
        }
      }

      // If backend is disconnected but not mentioned in the response, prepend a notice
      if (isBackendDisconnected && !responseStep.output.toLowerCase().includes("backend") && !responseStep.output.toLowerCase().includes("connection")) {
        return `🔌 Connection Status: Local AI is available, but cloud services are offline.\n\nI'm currently unable to connect to the cloud backend. However, I can still help with local AI tasks.\n\n${responseStep.output}`;
      }
      return responseStep.output;
    }

    // If no response step found, check for specific task types
    if (task.type) {
      // Get a list of available AI models for the error message
      const aiModelsList = availableModels.length > 0
        ? `Available models:\n${availableModels.map((model: any) => `• ${model.name}`).join('\n')}`
        : '';

      // Provide appropriate response based on task type
      switch (task.type) {
        case 'dataset':
          return `🔌 Connection Status: Local AI is available, but cloud services are offline.

I'm currently unable to connect to the cloud backend, which means I can't access your datasets. However, I can still help you with local AI tasks.${aiModelsList ? `\n\n${aiModelsList}` : ''}

You can:
• Continue using local AI models for conversations and generation
• Try restarting the application if you need dataset features
• Check your internet connection and try again later`;

        case 'training':
          return `🔌 Connection Status: Local AI is available, but cloud services are offline.

I'm currently unable to connect to the cloud backend, which means I can't access training features. However, you can still use local models that are already available on your system.${aiModelsList ? `\n\n${aiModelsList}` : ''}

You can:
• Continue using local AI models for conversations and generation
• Try restarting the application if you need training features
• Check your internet connection and try again later`;

        case 'deployment':
          return `🔌 Connection Status: Local AI is available, but cloud services are offline.

I'm currently unable to connect to the cloud backend, which means I can't access deployment features. However, you can still use the local AI models available.${aiModelsList ? `\n\n${aiModelsList}` : ''}

You can:
• Continue using local AI models for conversations and generation
• Try restarting the application if you need deployment features
• Check your internet connection and try again later`;

        default:
          return `🔌 Connection Status: Local AI is available, but cloud services are offline.

I'm currently unable to connect to the cloud backend. However, I can still help you with local AI tasks.${aiModelsList ? `\n\n${aiModelsList}` : ''}

You can:
• Continue using local AI models for conversations and generation
• Try restarting the application if you need cloud features
• Check your internet connection and try again later`;
      }
    }

    // Check if we had any dataset API calls that should be included in the response
    const hasDatasetsInfo = datasetCalls.length > 0;

    // If no response step found but we have API results, construct a response
    if (hasDatasetsInfo) {
      const datasets = datasetCalls[0].result?.datasets || [];
      if (datasets && datasets.length > 0) {
        const datasetList = datasets.map((ds: any) => `- ${ds.name || 'Unnamed dataset'}`).join('\n');
        return `Here are your datasets:\n${datasetList}`;
      } else {
        return "I checked, but you don't have any datasets available yet. Would you like to upload one?";
      }
    }

    // Default response if we couldn't extract anything specific
    return "I've processed your request, but I'm not sure how to respond. Could you please try rephrasing your question?";
  };

  // Handle message submission
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!input.trim()) return;

    // Record activity time
    localStorage.setItem('lastActivityTime', Date.now().toString());

    // Clear any inactivity alerts
    setAlerts(prev => prev.filter(a => a.message !== 'Session inactive'));

    // Add user message
    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Reset steps
    setSteps([]);
    setCurrentStep(null);
    setThinkingSteps([]);
    setExpandedSteps({});

    try {
      // Process the message and get a response
      const response = await processMessage(input);

      // Add assistant response
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);

      // If in chat mode, don't show thinking steps
      if (mode === 'unified' && agentMode === 'chat') {
        setSteps([]);
        setThinkingSteps([]);
      }
    } catch (error: any) {
      console.error("Error:", error);

      // Provide more specific error message based on the error type
      let errorMessage = "Sorry, I encountered an error. Please check your connection and try again.";

      if (error.message) {
        if (error.message.includes("404")) {
          errorMessage = "Error 404: The requested resource was not found. Please try again later.";
        } else if (error.message.includes("500")) {
          errorMessage = "Error 500: The server encountered an internal error. Please try again later.";
        } else if (error.message.includes("JSON")) {
          errorMessage = "I received an invalid response format. Please try again.";
        }
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: errorMessage },
      ]);
    } finally {
      setIsLoading(false);
      setCurrentStep(null);
    }
  };

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    console.log("File selected:", file.name);
    // Add implementation for file handling here
  };

  // Toggle visibility of thinking process
  const toggleThinkingProcess = () => {
    setShowThinking(!showThinking);
  };

  // Generate a simple chat response without using the reasoning engine
  const generateSimpleChatResponse = (userMessage: string): string => {
    // Normalize message for case-insensitive matching
    const normalizedMessage = userMessage.toLowerCase().trim();
    
    // Simple greeting detection
    if (/^(hi|hello|hey|greetings|howdy|hola)(\s|$)/i.test(normalizedMessage)) {
      const greetings = [
        "Hello! Welcome to Artintel. I can help you discover, fine-tune, and deploy language models. What can I help you with today?",
        "Hi there! I'm Mash, your Artintel assistant. I'm here to help with anything related to language models. What would you like to know?",
        "Hey! Welcome to Mash Agent. How can I assist you with language models today?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Check if asking about capabilities
    if (/what can you do|your capabilities|help me with|what are you/i.test(normalizedMessage)) {
      return "I'm your Artintel assistant. I can help you with:\n\n• Discovering language models suited for your tasks\n• Data preparation for fine-tuning\n• Setting up fine-tuning workflows\n• Model deployment strategies\n• Monitoring AI applications\n\nWhat would you like to know more about?";
    }

    // Check if asking about switching modes
    if (/switch|change|agent mode|chat mode/i.test(normalizedMessage)) {
      return "You can switch between chat and agent mode using the toggle at the top of the chat. Chat mode is simpler and faster for basic questions, while agent mode gives you access to my full capabilities including detailed model selection guidance, fine-tuning workflows, deployment strategies, and monitoring setup.";
    }

    // Check if asking about models
    if (/models|model types|which model|available models|best model/i.test(normalizedMessage)) {
      return "Artintel supports various language models, including:\n\n• Llama 2 (7B, 13B, 70B parameter variants)\n• Mistral (7B)\n• GPT models\n\nThe best choice depends on your specific use case, performance requirements, and deployment constraints. Would you like more specific recommendations?";
    }

    // Check if asking about fine-tuning
    if (/fine-tune|finetune|training|train a model/i.test(normalizedMessage)) {
      return "Fine-tuning allows you to adapt pre-trained language models to your specific domain or task. Artintel provides guided workflows for fine-tuning that handle data preprocessing, training configuration, and model evaluation. This significantly improves performance on domain-specific tasks compared to using general-purpose models.";
    }

    // Check if asking about deployment
    if (/deploy|deployment|hosting|serve|production/i.test(normalizedMessage)) {
      return "Artintel offers seamless deployment options for your fine-tuned models, including:\n\n• One-click cloud deployment with auto-scaling\n• API endpoint generation\n• Monitoring and logging infrastructure\n• Cost optimization\n\nThis makes it easy to put your models into production quickly and reliably.";
    }
    
    // Check if asking about data or datasets
    if (/data|dataset|datasets|my data/i.test(normalizedMessage)) {
      return "Artintel helps you manage your data for AI training and evaluation. You can:\n\n• Upload and organize datasets\n• Apply preprocessing and cleaning operations\n• Split data into training/validation sets\n• Analyze data quality and coverage\n\nProperly prepared data is essential for successful model fine-tuning.";
    }
    
    // Check if asking about specific language models
    if (/llama|mistral|gpt|neural|falcon/i.test(normalizedMessage)) {
      return "The Artintel platform supports a variety of model families including:\n\n• Llama 2 - Meta's open-source LLM, good balance of performance and efficiency\n• Mistral - Powerful open-source model with excellent reasoning capabilities\n• Neural Chat - Optimized for conversational use cases with strong instruction-following\n\nEach model has different parameter sizes and quantization options to fit your computational resources.";
    }
    
    // Check if asking about pricing or costs
    if (/price|pricing|cost|subscription|pay/i.test(normalizedMessage)) {
      return "Artintel offers flexible pricing tiers to meet different needs:\n\n• Community Edition: Free for personal projects and exploration\n• Professional: For businesses with moderate usage requirements\n• Enterprise: For organizations with high-volume needs and custom requirements\n\nAll tiers include access to open-source models, while higher tiers add advanced features like team collaboration, priority support, and SLAs.";
    }
    
    // Check if asking for help or examples
    if (/help|example|tutorial|guide|how to/i.test(normalizedMessage)) {
      return "I'd be happy to help! Here are some things you can ask me about:\n\n• \"Which model should I use for customer service automation?\"\n• \"How do I prepare my text data for fine-tuning?\"\n• \"What's the process for deploying a model to production?\"\n• \"How can I monitor my model's performance?\"\n\nJust let me know what you'd like to learn more about.";
    }

    // Default response - more varied options
    const defaultResponses = [
      "I understand you're interested in AI and language models. Artintel's platform can help you discover, fine-tune, and deploy these models for your specific use cases. Could you provide more details about what you're looking to accomplish?",
      "Thanks for your message. Artintel specializes in making language models accessible and effective for organizations. To give you the most helpful information, could you tell me a bit more about your specific needs or questions?",
      "That's an interesting question about language models. To help you better, could you share what specific use case or industry you're working in? This will help me provide more tailored information.",
      "I'd be happy to discuss how Artintel can help with language models for your needs. Could you elaborate on your question or share what particular aspect of AI implementation you're curious about?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  // Handle generated code from UI Generator
  const handleGeneratedCode = (code: string) => {
    setGeneratedCode(code);

    // Add a message about the generated code
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `I've generated the UI code for you. You can view and copy it from the code panel.

\`\`\`jsx
${code.substring(0, 300)}${code.length > 300 ? '...' : ''}
\`\`\`

The complete code is available in the editor.`
      },
    ]);
  };

  // Handle template selection from the wizard
  const handleTemplateSelection = (templateData: any) => {
    const { category, template } = templateData;

    // Add a message about the selected template
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `I've added the **${template.name}** template from the ${category} category to our conversation. Let me know what customizations you'd like to make to this template.

**Template Description**: ${template.description}

I can help you customize this template with your specific content, styling, and functionality requirements.`
      },
    ]);
  };

  // Check AI service connection on component mount
  useEffect(() => {
    // Initialize Ollama connection with auto mode first
    setOllamaBaseUrl('auto');
    
    // Then check the connection (will switch to mock if needed)
    checkAIServiceConnection();

    // Set up periodic checks for system health and intelligent alerts
    const intervalId = setInterval(() => {
      // Check for potential issues and add alerts
      if (!aiServiceConnected) {
        setAlerts(prev => [
          ...prev.filter(a => a.message !== 'AI service connection lost'),
          { message: 'AI service connection lost. Reconnecting...', type: 'warning' }
        ]);
      } else {
        // Remove the connection alert if it exists and we're connected
        setAlerts(prev => prev.filter(a => a.message !== 'AI service connection lost'));
      }

      // Check if we've been idle for a while
      const lastActivity = localStorage.getItem('lastActivityTime');
      if (lastActivity && Date.now() - parseInt(lastActivity) > 30 * 60 * 1000) { // 30 minutes
        setAlerts(prev => [
          ...prev.filter(a => a.message !== 'Session inactive'),
          { message: 'Your session has been inactive for a while. Need any assistance?', type: 'info' }
        ]);
      }
    }, 60000); // Check every minute

    // Record activity time
    localStorage.setItem('lastActivityTime', Date.now().toString());

    return () => clearInterval(intervalId);
  }, []);

  // Save messages to localStorage and scroll to bottom when messages change
  useEffect(() => {
    // Save to localStorage
    if (typeof window !== 'undefined' && messages.length > 0) {
      // Legacy storage for backward compatibility
      localStorage.setItem('chatHistory', JSON.stringify(messages));

      // Save to current chat
      const currentChatId = localStorage.getItem('currentChatId');
      if (currentChatId) {
        localStorage.setItem(`chat-${currentChatId}`, JSON.stringify(messages));

        // Update chat index with latest preview
        const chatIndex = JSON.parse(localStorage.getItem('chat-index') || '[]');
        const chatIndexEntry = chatIndex.find((chat: any) => chat.id === currentChatId);

        if (chatIndexEntry) {
          // Find the first user message to use as title/preview
          const firstUserMsg = messages.find((msg: Message) => msg.role === 'user')?.content || '';

          // Update the chat entry
          chatIndexEntry.title = firstUserMsg
            ? `Chat: ${firstUserMsg.substring(0, 20)}${firstUserMsg.length > 20 ? '...' : ''}`
            : 'New Chat';
          chatIndexEntry.preview = firstUserMsg.substring(0, 60) + (firstUserMsg.length > 60 ? '...' : '');
          chatIndexEntry.timestamp = Date.now();

          // Save updated index
          localStorage.setItem('chat-index', JSON.stringify(chatIndex));
        }
      }
    }

    // Scroll to bottom
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle click outside to close expanded thinking steps
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (thinkingStepsRef.current && !thinkingStepsRef.current.contains(event.target as Node)) {
        setExpandedSteps({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * Format a response for knowledge-based queries using the knowledge base
   */
  const formatResponseForKnowledgeQuery = (queryType: string, userMessage: string): string => {
    // Map query type to knowledge category
    let category;
    switch (queryType) {
      case 'platform_overview':
        category = KnowledgeCategory.PlatformOverview;
        break;
      case 'features':
        category = KnowledgeCategory.Features;
        break;
      case 'pricing_tiers':
        category = KnowledgeCategory.PricingTiers;
        break;
      case 'model_types':
        category = KnowledgeCategory.ModelTypes;
        break;
      case 'industries':
        category = KnowledgeCategory.Industries;
        break;
      case 'best_practices':
        category = KnowledgeCategory.BestPractices;
        break;
      default:
        // Search across all categories
        category = null;
    }
    
    // Retrieve relevant knowledge entries
    let entries: Array<{title: string, content: string}>;
    if (category) {
      entries = knowledgeBaseService.getByCategory(category);
    } else {
      entries = knowledgeBaseService.search(userMessage);
    }
    
    if (!entries || entries.length === 0) {
      return "I don't have specific information about that aspect of Artintel yet. Would you like me to help you with something else?";
    }
    
    // Create a conversational response based on the retrieved knowledge
    const normalizedMessage = userMessage.toLowerCase();
    let response = '';
    
    // For platform overview queries
    if (queryType === 'platform_overview') {
      const overview = entries.find((e: {title: string, content: string}) => e.title === 'What is Artintel')?.content || '';
      const philosophy = entries.find((e: {title: string, content: string}) => e.title === 'Artintel Philosophy')?.content || '';
      
      response = `${overview}\n\n${philosophy}\n\nArtintel makes it easy for teams of all sizes to leverage powerful language models without deep machine learning expertise. Is there a specific aspect of the platform you'd like to know more about?`;
    }
    
    // For feature queries
    else if (queryType === 'features') {
      // Check if asking about a specific feature
      const featureKeywords = [
        { term: 'model selection', title: 'Model Selection & Discovery' },
        { term: 'data integration', title: 'Data Integration & Preprocessing' },
        { term: 'fine-tuning', title: 'Fine-Tuning Workflows' },
        { term: 'deployment', title: 'Deployment & Serving' },
        { term: 'monitoring', title: 'Monitoring & Alerts' },
        { term: 'mash', title: 'Mash AI Agent' },
      ];
      
      // Try to find a specific feature the user is asking about
      const matchedFeature = featureKeywords.find(f => 
        normalizedMessage.includes(f.term)
      );
      
      if (matchedFeature) {
        const featureEntry = entries.find((e: {title: string, content: string}) => e.title === matchedFeature.title);
        if (featureEntry) {
          response = `${featureEntry.content}\n\nWould you like to know more about other Artintel features or more details about ${matchedFeature.title}?`;
        }
      } else {
        // General features overview
        response = "Artintel offers a comprehensive set of features for working with language models:\n\n";
        entries.forEach((entry: {title: string, content: string}) => {
          response += `• ${entry.title}: ${entry.content.split('.')[0]}.\n\n`;
        });
        response += "Which of these features would you like to learn more about?";
      }
    }
    
    // For pricing tier queries
    else if (queryType === 'pricing_tiers') {
      // Check if asking about a specific tier
      if (normalizedMessage.includes('free tier') || normalizedMessage.includes('free plan')) {
        const freeTier = entries.find((e: {title: string, content: string}) => e.title === 'Free Tier');
        response = freeTier ? freeTier.content : '';
      } else if (normalizedMessage.includes('pro tier') || normalizedMessage.includes('professional')) {
        const proTier = entries.find((e: {title: string, content: string}) => e.title === 'Pro Tier');
        response = proTier ? proTier.content : '';
      } else if (normalizedMessage.includes('enterprise') || normalizedMessage.includes('premium')) {
        const enterpriseTier = entries.find((e: {title: string, content: string}) => e.title === 'Enterprise Premium Tier');
        response = enterpriseTier ? enterpriseTier.content : '';
      } else {
        // Compare all tiers
        response = "Artintel offers three pricing tiers to match different needs:\n\n";
        entries.forEach((entry: {title: string, content: string}) => {
          response += `**${entry.title}**: ${entry.content.split('.')[0]}.\n\n`;
        });
        response += "Would you like more details about a specific tier?";
      }
    }
    
    // For model type queries
    else if (queryType === 'model_types') {
      if (normalizedMessage.includes('slm') || normalizedMessage.includes('small language model')) {
        const slmEntry = entries.find((e: {title: string, content: string}) => e.title === 'Small Language Models (SLMs)');
        response = slmEntry ? slmEntry.content : '';
      } else if (normalizedMessage.includes('llm') || normalizedMessage.includes('large language model')) {
        const llmEntry = entries.find((e: {title: string, content: string}) => e.title === 'Large Language Models (LLMs)');
        response = llmEntry ? llmEntry.content : '';
      } else if (normalizedMessage.includes('comparison') || normalizedMessage.includes('versus') || normalizedMessage.includes('vs')) {
        const comparisonEntry = entries.find((e: {title: string, content: string}) => e.title === 'SLM vs LLM Use Cases');
        response = comparisonEntry ? comparisonEntry.content : '';
      } else {
        // Overview of both model types
        const slmEntry = entries.find(e => e.title === 'Small Language Models (SLMs)');
        const llmEntry = entries.find(e => e.title === 'Large Language Models (LLMs)');
        
        response = "Artintel supports both Small Language Models (SLMs) and Large Language Models (LLMs):\n\n";
        
        if (slmEntry) {
          response += `**Small Language Models (SLMs)**: ${slmEntry.content.split('.')[0]}.\n\n`;
        }
        
        if (llmEntry) {
          response += `**Large Language Models (LLMs)**: ${llmEntry.content.split('.')[0]}.\n\n`;
        }
        
        response += "Would you like more details about a specific model type or use case?";
      }
    }
    
    // For industry-specific queries
    else if (queryType === 'industries') {
      // Check if asking about a specific industry
      const industries = [
        { term: 'healthcare', title: 'Healthcare Applications' },
        { term: 'finance', title: 'Finance Applications' },
        { term: 'legal', title: 'Legal Applications' },
        { term: 'retail', title: 'Retail & E-Commerce' },
      ];
      
      const matchedIndustry = industries.find(i => 
        normalizedMessage.includes(i.term)
      );
      
      if (matchedIndustry) {
        const industryEntry = entries.find(e => e.title === matchedIndustry.title);
        if (industryEntry) {
          response = `${industryEntry.content}\n\nWould you like to know how Artintel is used in other industries as well?`;
        }
      } else {
        // Overview of all industries
        response = "Artintel supports various industries with specialized solutions:\n\n";
        entries.forEach(entry => {
          response += `**${entry.title}**: ${entry.content.split('.')[0]}.\n\n`;
        });
        response += "Which industry are you most interested in learning more about?";
      }
    }
    
    // For best practices queries
    else if (queryType === 'best_practices') {
      // Check if asking about specific best practices
      const practices = [
        { term: 'model selection', title: 'Model Selection Best Practices' },
        { term: 'fine-tuning', title: 'Fine-Tuning Best Practices' },
        { term: 'deployment', title: 'Deployment Best Practices' },
      ];
      
      const matchedPractice = practices.find(p => 
        normalizedMessage.includes(p.term)
      );
      
      if (matchedPractice) {
        const practiceEntry = entries.find(e => e.title === matchedPractice.title);
        if (practiceEntry) {
          response = `${practiceEntry.content}\n\nIs there a specific aspect of these best practices you'd like me to elaborate on?`;
        }
      } else {
        // Overview of all best practices
        response = "Here are some key best practices for using Artintel effectively:\n\n";
        entries.forEach(entry => {
          response += `**${entry.title}**:\n${entry.content}\n\n`;
        });
        response += "Would you like more specific guidance on any of these areas?";
      }
    }
    
    // Fallback to using the first entry if we haven't built a response yet
    if (!response && entries.length > 0) {
      const mainEntry = entries[0];
      response = `${mainEntry.content}\n\nIs there anything specific about this you'd like to know more about?`;
    }
    
    // Add a conversational touch to the response
    return response;
  };

  // Render different content based on mode
  const renderContent = () => {
    // For unified mode or any other mode, use a common layout
    return (
      <div className="flex flex-col w-full h-full">
        {/* Settings Panel */}
        {showSettings && (
          <SettingsPanel
            currentModel={currentModel}
            setCurrentModel={setCurrentModel}
            baseModels={BASE_MODELS}
            availableModels={availableModels}
            aiServiceConnected={aiServiceConnected}
            isCheckingConnection={isCheckingConnection}
            connectionError={connectionError}
            checkAIServiceConnection={checkAIServiceConnection}
            showDownloadModelOption={() => {}}
            modelPulling={modelPulling}
          />
        )}

        {/* Mode Selector */}
        {mode === 'unified' && (
          <div className="mb-4 flex justify-center">
            <div className="inline-flex items-center rounded-full bg-[#00031b] p-1 border border-[#00cbdd]/30">
              <button
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${agentMode === 'chat' ? 'bg-[#00cbdd]/20 text-[#00cbdd]' : 'text-white/70 hover:text-white'}`}
                onClick={() => {
                  if (agentMode !== 'chat') {
                    setAgentMode('chat');
                    // Add a message about switching modes instead of clearing history
                    setMessages(prev => [...prev, {
                      role: "assistant",
                      content: "Switched to chat mode. I'll respond to your messages in a simple, conversational way focused on helping you with Artintel's language model platform. How can I help you today?"
                    }]);
                  }
                }}
              >
                Chat
              </button>
              <button
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${agentMode === 'agent' ? 'bg-[#00cbdd]/20 text-[#00cbdd]' : 'text-white/70 hover:text-white'}`}
                onClick={() => {
                  if (agentMode !== 'agent') {
                    setAgentMode('agent');
                    // Add a message about switching modes instead of clearing history
                    setMessages(prev => [...prev, {
                      role: "assistant",
                      content: "Switched to agent mode. I'll now use my full capabilities to help you with Artintel's platform features including model selection, data integration, fine-tuning workflows, deployment, and monitoring of language models. What would you like help with?"
                    }]);
                  }
                }}
              >
                Agent
              </button>
            </div>
          </div>
        )}

        {/* Intelligent Alerts */}
        {alerts.length > 0 && (
          <div className="mb-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`mb-2 p-3 rounded-lg flex items-start justify-between ${
                  alert.type === 'info' ? 'bg-blue-500/20 border border-blue-500/30' :
                  alert.type === 'warning' ? 'bg-yellow-500/20 border border-yellow-500/30' :
                  'bg-red-500/20 border border-red-500/30'
                }`}
              >
                <div className="flex items-center">
                  <span className={`mr-2 ${
                    alert.type === 'info' ? 'text-blue-400' :
                    alert.type === 'warning' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {alert.type === 'info' ? 'ℹ️' : alert.type === 'warning' ? '⚠️' : '❌'}
                  </span>
                  <span className="text-sm text-white">{alert.message}</span>
                </div>
                <button
                  className="text-white/60 hover:text-white"
                  onClick={() => setAlerts(prev => prev.filter((_, i) => i !== index))}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar" style={{ maxHeight: 'calc(100vh - 24rem)' }}>
          <MessageList messages={messages} />
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="w-full max-w-3xl mx-auto relative">
          <div className="flex items-center gap-2 mb-2 justify-between">
            {/* Start New Chat Button */}
            <button
              className="flex items-center gap-1 text-xs text-[#00cbdd] hover:text-[#00cbdd]/80 transition-colors"
              onClick={() => {
                // Clear chat history and start new chat
                const welcomeMessage = {
                  role: "assistant",
                  content: mode === 'unified'
                    ? agentMode === 'chat'
                      ? "Hi! I'm Mash, your Artintel assistant. I'm ready to help you discover, fine-tune, and deploy LLMs and SLMs. What can I help you with today?"
                      : "Hi! I'm Mash, your intelligent Artintel agent. I can help you with model selection, data integration, fine-tuning workflows, deployment, and monitoring of language models. What would you like help with?"
                    : mode === 'chat'
                      ? "Hi! I'm Mash, your Artintel assistant. I'm ready to help with language model tasks or general conversation. What can I help you with today?"
                      : mode === 'ui'
                        ? "Welcome to the UI Builder! I can help you create beautiful UI components for your AI applications. Describe what you'd like to build, and I'll generate the code for you."
                        : "Welcome to the Code Assistant! I can help you write, debug, and optimize code for your AI applications. What would you like to work on today?"
                };
                setMessages([welcomeMessage]);
                // Generate a new chat ID and save to localStorage
                const newChatId = `chat-${Date.now()}`;
                localStorage.setItem('currentChatId', newChatId);
                localStorage.setItem(`chat-${newChatId}`, JSON.stringify([welcomeMessage]));
                // Update chat index
                const chatIndex = JSON.parse(localStorage.getItem('chat-index') || '[]');
                chatIndex.unshift({
                  id: newChatId,
                  title: 'New Chat',
                  preview: welcomeMessage.content.substring(0, 60) + '...',
                  timestamp: Date.now()
                });
                localStorage.setItem('chat-index', JSON.stringify(chatIndex));
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14"></path>
              </svg>
              Start New Chat
            </button>

            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-1 text-xs text-[#00cbdd] hover:text-[#00cbdd]/80 transition-colors"
                onClick={() => alert('Voice input feature coming soon!')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" x2="12" y1="19" y2="22"></line>
                </svg>
                Voice Input
              </button>
              <button
                className="flex items-center gap-1 text-xs text-[#00cbdd] hover:text-[#00cbdd]/80 transition-colors"
                onClick={() => alert('Visual input feature coming soon!')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  <circle cx="9" cy="9" r="2"></circle>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                </svg>
                Visual Input
              </button>
            </div>
          </div>

          {/* Chat History Selector */}
          <div className="mb-4">
            <button
              className="flex items-center gap-1 text-xs text-[#00cbdd] hover:text-[#00cbdd]/80 transition-colors"
              onClick={() => {
                // Show chat history selector
                const chatIndex = JSON.parse(localStorage.getItem('chat-index') || '[]');
                if (chatIndex.length > 0) {
                  // Display chat history in a dropdown or modal
                  const chatHistoryHtml = chatIndex.map((chat: any) =>
                    `<div class="p-2 hover:bg-[#00cbdd]/10 cursor-pointer" data-chat-id="${chat.id}">
                      <div class="font-medium">${chat.title}</div>
                      <div class="text-xs opacity-70">${chat.preview}</div>
                    </div>`
                  ).join('');

                  // Create a simple modal to display chat history
                  const modal = document.createElement('div');
                  modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
                  modal.innerHTML = `
                    <div class="bg-[#00031b] border border-[#00cbdd]/30 rounded-lg p-4 max-w-md w-full max-h-[80vh] overflow-y-auto">
                      <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-medium text-[#00cbdd]">Chat History</h3>
                        <button class="text-white/70 hover:text-white" id="close-history-modal">×</button>
                      </div>
                      <div class="divide-y divide-[#00cbdd]/10">
                        ${chatHistoryHtml}
                      </div>
                    </div>
                  `;

                  document.body.appendChild(modal);

                  // Add event listeners
                  document.getElementById('close-history-modal')?.addEventListener('click', () => {
                    document.body.removeChild(modal);
                  });

                  // Add click event to each chat history item
                  modal.querySelectorAll('[data-chat-id]').forEach(el => {
                    el.addEventListener('click', (e) => {
                      const chatId = (e.currentTarget as HTMLElement).getAttribute('data-chat-id');
                      if (chatId) {
                        // Load chat history
                        const chatData = localStorage.getItem(`chat-${chatId}`);
                        if (chatData) {
                          setMessages(JSON.parse(chatData));
                          localStorage.setItem('currentChatId', chatId);
                        }
                      }
                      document.body.removeChild(modal);
                    });
                  });
                } else {
                  alert('No chat history found');
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Chat History
            </button>
          </div>

          <ChatInput
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            onFileUpload={handleFileUpload}
          />

          {/* Thinking Process Display with Improved Loader */}
          {isLoading && (
            <div className="mt-4 p-4 rounded-xl bg-[#00031b]/80 backdrop-blur-sm border border-[#00cbdd]/20">
              {/* Animated Thinking Indicator */}
              <div className="flex items-center gap-2 mb-2">
                <div className="animate-pulse flex items-center">
                  <div className="h-2 w-2 bg-[#00cbdd] rounded-full mr-1 animate-bounce"></div>
                  <div className="h-2 w-2 bg-[#00cbdd] rounded-full mr-1 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 bg-[#00cbdd] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-[#00cbdd] text-sm">Thinking...</span>
              </div>

              {steps.length > 0 && <StepIndicator steps={steps} currentStep={currentStep} />}

              {thinkingSteps.length > 0 && (
                <div className="mt-2" ref={thinkingStepsRef}>
                  <div className="flex items-center gap-1 text-xs text-[#00cbdd]/70">
                    <span>Thinking:</span>
                    <div className="flex flex-wrap gap-1">
                      {thinkingSteps.map((step, idx) => (
                        <div key={idx} className="inline-block">
                          <button
                            onClick={() => {
                              // Toggle this specific step
                              const newExpandedSteps = {...expandedSteps};
                              newExpandedSteps[idx] = !expandedSteps[idx];
                              setExpandedSteps(newExpandedSteps);
                            }}
                            className={`px-2 py-0.5 rounded text-xs ${expandedSteps[idx] ? 'bg-[#00cbdd]/20 text-[#00cbdd]' : 'text-[#00cbdd]/80 hover:text-[#00cbdd] hover:underline'}`}
                          >
                            {step.stage.split(' ')[0]}
                          </button>

                          {expandedSteps[idx] && (
                            <div className="absolute mt-1 z-10 w-80 text-xs bg-[#00031b] border border-[#00cbdd]/20 p-3 rounded-md shadow-lg">
                              <div className="font-semibold text-[#00cbdd] mb-1">{step.stage}</div>
                              <div className="whitespace-pre-wrap text-white/70 text-xs max-h-60 overflow-y-auto custom-scrollbar">
                                {step.reasoning.length > 300 ? (
                                  <>
                                    {step.reasoning.slice(0, 300)}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const target = e.target as HTMLElement;
                                        const parent = target.parentElement;
                                        if (parent) {
                                          parent.innerHTML = step.reasoning;
                                        }
                                      }}
                                      className="text-[#00cbdd] hover:underline ml-1"
                                    >
                                      Show more
                                    </button>
                                  </>
                                ) : step.reasoning}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions - Always Visible */}
        <div className="w-full max-w-3xl mx-auto mt-8">
          <div className="flex flex-wrap justify-center gap-3">
            {mode === 'unified' && [
              // Combined quick actions for unified mode
              { name: "Create a UI component", icon: "🎨" },
              { name: "Help with ML model", icon: "🧠" },
              { name: "Generate code", icon: "💻" },
              { name: "Browse UI templates", icon: "🗜️" },
              { name: "Show Settings", icon: "⚙️" },
              { name: "Check Connection", icon: "🔌" },
              { name: "List Models", icon: "📋" },
            ].map((action) => (
              <button
                key={action.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00031b] hover:bg-[#00031b]/80 border border-[#00cbdd]/30 hover:border-[#00cbdd]/60 transition-colors"
                onClick={() => {
                  if (action.name === "Show Settings") {
                    setShowSettings(!showSettings);
                  } else if (action.name === "Browse UI templates") {
                    // Open the template wizard
                    setIsTemplateWizardOpen(true);
                  } else {
                    setInput(`${action.name}`);
                  }
                }}
              >
                <span>{action.icon}</span>
                <span>{action.name}</span>
              </button>
            ))}

            {mode === 'ui' && [
              { name: "Create a login form", icon: "🔐" },
              { name: "Build a dashboard", icon: "📊" },
              { name: "Design a product card", icon: "🛍️" },
              { name: "Make a navigation menu", icon: "🧭" },
            ].map((action) => (
              <button
                key={action.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00031b] hover:bg-[#00031b]/80 border border-[#00cbdd]/30 hover:border-[#00cbdd]/60 transition-colors"
                onClick={() => {
                  setInput(`${action.name}`);
                }}
              >
                <span>{action.icon}</span>
                <span>{action.name}</span>
              </button>
            ))}

            {mode === 'code' && [
              { name: "Help me debug this code", icon: "🐛" },
              { name: "Optimize this function", icon: "⚡" },
              { name: "Explain this algorithm", icon: "📝" },
              { name: "Convert code to TypeScript", icon: "🔄" },
            ].map((action) => (
              <button
                key={action.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00031b] hover:bg-[#00031b]/80 border border-[#00cbdd]/30 hover:border-[#00cbdd]/60 transition-colors"
                onClick={() => {
                  setInput(`${action.name}`);
                }}
              >
                <span>{action.icon}</span>
                <span>{action.name}</span>
              </button>
            ))}

            {mode === 'chat' && [
              { name: "Check Connection", icon: "🔌" },
              { name: "Show Settings", icon: "⚙️" },
              { name: "List Models", icon: "📋" },
              { name: "Download Model", icon: "📥" },
            ].map((action) => (
              <button
                key={action.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00031b] hover:bg-[#00031b]/80 border border-[#00cbdd]/30 hover:border-[#00cbdd]/60 transition-colors"
                onClick={() => {
                  if (action.name === "Show Settings") {
                    setShowSettings(!showSettings);
                  } else {
                    setInput(`${action.name}`);
                  }
                }}
              >
                <span>{action.icon}</span>
                <span>{action.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#00031b]/80 backdrop-blur-md border border-[#00cbdd]/20 rounded-xl p-6 h-[calc(100vh-16rem)] flex flex-col">
      {renderContent()}

      {/* Template Wizard */}
      <TemplateWizard
        isOpen={isTemplateWizardOpen}
        onClose={() => setIsTemplateWizardOpen(false)}
        onSelectTemplate={handleTemplateSelection}
      />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #00031b;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00cbdd;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00a0ad;
        }
      `}</style>
    </div>
  );
};
