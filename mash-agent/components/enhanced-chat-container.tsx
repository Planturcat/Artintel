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

// Import reasoning services
import { reasoningEngine } from "@/lib/services/reasoning-engine";
import { taskManager } from "@/lib/services/task-manager";
import { ThinkingStage } from "@/lib/services/reasoning-engine";

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
        setAIServiceConnected(false);
        setConnectionError("Could not connect to AI service. Please check your connection.");
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
        setAIServiceConnected(false);
        const errorMessage = error instanceof Error ? error.message : String(error);
        setConnectionError(`Error connecting to AI service: ${errorMessage}`);
      }
      return false;
    } finally {
      if (!silent) {
        setIsCheckingConnection(false);
      }
    }
  };

  // Process user message
  const processUserMessage = async (userMessage: string): Promise<string> => {
    // In chat mode, use a simpler approach with the AI service but without the full reasoning engine
    if (mode === 'unified' && agentMode === 'chat') {
      // Connect to AI service if needed
      if (!aiServiceConnected) {
        const connected = await checkAIServiceConnection(1, true);
        if (!connected) {
          console.warn("AI service connection failed, using fallback response");
          return generateSimpleChatResponse(userMessage);
        }
      }

      // Use the AI service directly with a simplified prompt
      const modelName = currentModel || "llama2:7b";
      aiService.setCurrentModel(modelName);

      // Create a more detailed prompt with context about Artintel
      const prompt = `You are Mash, an AI assistant for Artintel, a platform that helps organizations discover, fine-tune, and deploy language models (LLMs and SLMs).

Artintel is a comprehensive, no-code platform that enables organizations to discover, fine-tune, and deploy open-source Large Language Models (LLMs) and Small Language Models (SLMs). It bridges the gap between cutting-edge AI research and practical industry applications, ensuring that even teams without deep machine learning expertise can leverage powerful language models for their unique use cases.

Artintel offers features like:
- Model Selection & Discovery: A curated catalog of models with performance benchmarks and domain tags
- Data Integration & Preprocessing: Tools to connect to data sources and prepare data for fine-tuning
- Fine-Tuning Workflows: Guided processes for adapting models to specific domains
- Deployment & Serving: One-click deployment to cloud providers with auto-scaling
- Monitoring & Alerts: Real-time metrics and custom alerts for model performance

Respond to the following message in a helpful, detailed way. Provide specific information about Artintel's capabilities related to the user's question.

IMPORTANT: Never mention that you are using any specific AI model, local AI, or implementation details about how you work. Don't refer to yourself as an AI model or mention anything about your underlying technology.

User message: ${userMessage}

Response:`;

      // Call the AI service directly - we've modified the AI service to return a fallback response instead of throwing
      const response = await aiService.generateText(prompt);

      // Check if we got a valid response
      if (response && response.response) {
        console.log("Got valid response from AI service");
        return response.response;
      }

      // If we get here, something went wrong but the AI service handled it with a fallback
      console.warn("Using fallback response from generateSimpleChatResponse");
      return generateSimpleChatResponse(userMessage);
    }

    // For agent mode or other specialized modes, use the full reasoning engine

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
      const task = await taskManager.processUserMessage(userMessage);
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
      taskManager.addToConversationHistory({ role: 'assistant', content: responseText });

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
    const datasetCalls = apiCalls.filter(call => call.name === 'listDatasets');
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
      const response = await processUserMessage(input);

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
    // Simple greeting detection
    if (/^(hi|hello|hey|greetings|howdy|hola)/i.test(userMessage.trim())) {
      return "Hello! Welcome to Artintel. I can help you discover, fine-tune, and deploy language models. If you need more advanced assistance with model selection or fine-tuning workflows, consider switching to agent mode.";
    }

    // Check if asking about capabilities
    if (/what can you do|your capabilities|help me with|what are you/i.test(userMessage)) {
      return "I'm your Artintel assistant in chat mode. I can help you with basic information about our platform that enables organizations to discover, fine-tune, and deploy open-source Large Language Models (LLMs) and Small Language Models (SLMs). For more advanced help with model selection, data integration, fine-tuning workflows, deployment, and monitoring, please switch to agent mode using the toggle above.";
    }

    // Check if asking about switching modes
    if (/switch|change|agent mode|chat mode/i.test(userMessage)) {
      return "You can switch between chat and agent mode using the toggle at the top of the chat. Chat mode is simpler and faster for basic questions, while agent mode gives you access to my full capabilities including detailed model selection guidance, fine-tuning workflows, deployment strategies, and monitoring setup.";
    }

    // Check if asking about models
    if (/models|llm|slm|language model|which model|model selection/i.test(userMessage)) {
      return "Artintel supports a wide range of language models from small, resource-friendly models like DistilBERT to large-scale models like Falcon 180B, Llama 70B, and more. Each model in our catalog includes performance benchmarks, approximate inference speed, memory requirements, and licensing details. For detailed model recommendations based on your specific needs, please switch to agent mode.";
    }

    // Check if asking about fine-tuning
    if (/fine-tun|train|adapt|customize|domain adaptation/i.test(userMessage)) {
      return "Artintel provides guided fine-tuning workflows with pre-built templates and best-practice hyperparameter suggestions for common tasks like customer service chatbots, sentiment analysis, and domain-specific summarization. Our platform supports parameter-efficient techniques like LoRA to reduce GPU memory usage and speed up training. For detailed fine-tuning guidance, please switch to agent mode.";
    }

    // Check if asking about deployment
    if (/deploy|serve|host|production|inference/i.test(userMessage)) {
      return "Artintel offers one-click deployment to major cloud providers (AWS, Azure, GCP) with automated containerization, auto-scaling policies, and usage dashboards. We also support hybrid and on-premises deployment for organizations with sensitive data requirements. For detailed deployment guidance, please switch to agent mode.";
    }

    // Default response for chat mode
    return "I'm in chat mode now. I can provide basic information about Artintel's platform for discovering, fine-tuning, and deploying language models. For more advanced assistance with specific workflows, detailed model selection, or technical implementation guidance, please switch to agent mode using the toggle above.";
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
  }, [aiServiceConnected]);

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
