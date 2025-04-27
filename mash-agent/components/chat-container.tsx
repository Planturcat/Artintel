"use client"

import React, { useState, useRef, useEffect } from 'react';
import { StepIndicator } from './step-indicator';
import { MessageList } from './message-list';
import { ChatInput } from './chat-input';
import { ArrowUp } from 'lucide-react';
import { SettingsPanel } from './settings-panel';

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

// Available base models for fine-tuning
const BASE_MODELS: BaseModel[] = [
  { id: "llama2:7b", name: "Llama 2 (7B)", description: "Meta's Llama 2 7B parameter model" },
  { id: "llama2:7b:13b", name: "Llama 2 (13B)", description: "Meta's Llama 2 13B parameter model" },
  { id: "llama2:7b:70b", name: "Llama 2 (70B)", description: "Meta's Llama 2 70B parameter model" },
  { id: "mistral:7b", name: "Mistral (7B)", description: "Mistral AI's 7B parameter model" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "OpenAI's GPT-3.5 Turbo model" },
  { id: "gpt-4o", name: "GPT-4o", description: "OpenAI's GPT-4o model" },
];

export const ChatContainer: React.FC = () => {
  // State for chat
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Mash, your ML assistant. I'm ready to help with machine learning tasks or general conversation. What can I help you with today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // State for UI operation steps
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [showThinking, setShowThinking] = useState(false);
  const [thinkingSteps, setThinkingSteps] = useState<{stage: string, reasoning: string}[]>([]);

  // State for AI models and connection
  const [availableModels, setAvailableModels] = useState<Array<{ name: string; [key: string]: any }>>([]);
  const [currentModel, setCurrentModel] = useState(BASE_MODELS[0].id);
  const [aiServiceConnected, setAIServiceConnected] = useState(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [connectionError, setConnectionError] = useState<string | undefined>();
  const [modelPulling, setModelPulling] = useState<{ model: string; status: string } | null>(null);
  const [showSettings, setShowSettings] = useState(false);

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
        return checkOllamaConnection(retries - 1, silent);
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

  // Handle model selection
  const handleSelectModel = async (modelName: string) => {
    try {
      setModelPulling({ model: modelName, status: "Starting download..." });

      // Ensure AI service is connected before attempting to select model
      if (!aiServiceConnected) {
        const connected = await checkAIServiceConnection(1, false);
        if (!connected) {
          setModelPulling(null);
          setMessages(prev => [
            ...prev,
            {
              role: 'assistant',
              content: "I couldn't connect to the AI service. Please check your connection and try again."
            }
          ]);
          return;
        }
      }

      // Set the model
      aiService.setCurrentModel(modelName);

      // Refresh model list
      const models = await aiService.getModels();
      if (models && models.length > 0) {
        setAvailableModels(models);
      }

      setModelPulling(null);

      // Notify user
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `I've successfully downloaded the ${modelName} model. It's now ready to use.`
        }
      ]);
    } catch (error) {
      console.error("Error selecting AI model:", error);
      setModelPulling(null);

      // Notify user
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `I ran into a problem selecting the ${modelName} model. Please try again or select a different model.`
        }
      ]);
    }
  };

  // Process user messages and generate responses using the reasoning engine
  const processUserMessage = async (userMessage: string): Promise<string> => {
    try {
      // Initialize thinking steps UI with clear, descriptive labels
      setSteps([
        { name: "Understanding request", status: "pending" },
        { name: "Determining task type", status: "pending" },
        { name: "Gathering necessary data", status: "pending" },
        { name: "Formulating response", status: "pending" }
      ]);
      setCurrentStep("Understanding request");
      setThinkingSteps([]);

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

        // Log the task type and API calls for debugging
        console.log(`Task type: ${task.type}`);
        console.log(`API calls made:`, task.apiCalls);

        // After task type determination, update the "Gathering data" step
        setCurrentStep("Gathering necessary data");
        updateStepStatus("Gathering necessary data", task.apiCalls.length > 0 ? "complete" : "pending");

        // Update thinking steps for UI visualization
        if (task.thinkingProcess?.steps) {
          const thinkingData = task.thinkingProcess.steps.map(step => ({
            stage: step.stage,
            reasoning: step.reasoning
          }));
          setThinkingSteps(thinkingData);
        }

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
    } catch (error) {
      console.error("Message processing error:", error);
      return "I encountered an unexpected error while trying to respond. Please try again.";
    }
  };

  // Helper function to update step status
  const updateStepStatus = (stepName: string, status: 'pending' | 'complete' | 'error', message?: string) => {
    setSteps(prev => prev.map(step =>
      step.name === stepName ? { ...step, status, ...(message ? { message } : {}) } : step
    ));
  };

  // Helper function to get UI step name from thinking stage
  const getUIStepNameFromThinkingStage = (stage: string): string | null => {
    switch (stage) {
      case ThinkingStage.IntentUnderstanding:
        return "Understanding request";
      case ThinkingStage.TaskClassification:
        return "Determining task type";
      case ThinkingStage.ExecutionPlanning:
        return "Gathering necessary data";
      case ThinkingStage.ResponseFormulation:
        return "Formulating response";
      default:
        return null;
    }
  };

  // Helper function to extract response from task
  const getResponseFromTask = (task: any): string => {
    // First check for system connectivity issues
    const systemStatusCall = task.apiCalls.find((call: any) => call.name === 'checkSystemStatus');
    const isBackendDisconnected = systemStatusCall?.result?.backendConnected === false && systemStatusCall?.result?.aiServiceConnected === true;

    // The API calls made during processing
    const apiCalls = task.apiCalls || [];

    // First try to get response from response_formulation step
    const responseStep = task.reasoning.find((step: any) => step.step === 'response_formulation');
    if (responseStep?.output) {
      // If backend is disconnected but not mentioned in the response, prepend a notice
      if (isBackendDisconnected && !responseStep.output.toLowerCase().includes("backend") && !responseStep.output.toLowerCase().includes("connection")) {
        return `🔌 Connection Status: Local AI is available, but cloud services are offline.\n\nI'm currently unable to connect to the cloud backend. However, I can still help with local AI tasks.\n\n${responseStep.output}`;
      }
      return responseStep.output;
    }

    // For backend disconnection with no formulated response, create a clear message
    if (isBackendDisconnected) {
      // Helper function to create tailored backend error messages
      const getBackendErrorMessage = () => {
        // Get available AI models to display in the error message
        const aiModelsList = getAvailableAIModelsText(apiCalls);

        // Check what type of task they were trying to do
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
      };

      return getBackendErrorMessage();
    }

    // Helper function to get AI models text if available
    const getAvailableAIModelsText = (calls: any[]): string => {
      const modelCalls = calls.filter(call => call.name === 'listAIModels');
      if (modelCalls.length > 0) {
        const models = modelCalls[0].result?.models || [];
        if (models.length > 0) {
          const modelList = models.slice(0, 5).map((model: any) => `- ${model.name || 'Unnamed model'}`).join('\n');
          const extraCount = models.length > 5 ? `\n- And ${models.length - 5} more...` : '';
          return `Available AI models:\n${modelList}${extraCount}`;
        }
      }
      return "";
    };

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

    // Check for AI models
    const aiModelsText = getAvailableAIModelsText(apiCalls);
    if (aiModelsText) {
      return aiModelsText;
    }

    // Fallback to last reasoning step if available
    if (task.reasoning.length > 0) {
      return task.reasoning[task.reasoning.length - 1].output;
    }

    // Default fallback
    return "I was unable to process your request completely. This might be due to a temporary issue with the AI model or missing context. Please try rephrasing your question or check your connection.";
  };

  // Handle message submission
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Reset steps
    setSteps([]);
    setCurrentStep(null);
    setThinkingSteps([]);

    try {
      // Process the message and get a response
      const response = await processUserMessage(input);

      // Add assistant response
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
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

  // Handle file upload (placeholder for now)
  const handleFileUpload = async (file: File) => {
    console.log("File selected:", file.name);
    // Add implementation for file handling here
  };

  // Toggle visibility of thinking process
  const toggleThinkingProcess = () => {
    setShowThinking(!showThinking);
  };

  // Check AI service connection on component mount
  useEffect(() => {
    checkAIServiceConnection();
  }, []);

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

      {/* Chat Messages */}
      <div className="flex-1">
        <MessageList messages={messages} />
      </div>

      {/* Input Area */}
      <div className="w-full max-w-3xl mx-auto relative">
        <ChatInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          onFileUpload={handleFileUpload}
        />

        {/* Thinking Process Display */}
        {isLoading && steps.length > 0 && (
          <div className="mt-4 p-4 rounded-xl bg-[#00031b]/80 backdrop-blur-sm border border-[#00cbdd]/20">
            <StepIndicator steps={steps} currentStep={currentStep} />

            {thinkingSteps.length > 0 && (
              <div className="mt-2">
                <button
                  onClick={toggleThinkingProcess}
                  className="text-xs text-[#00cbdd] hover:underline"
                >
                  {showThinking ? "Hide thinking process" : "Show thinking process"}
                </button>

                {showThinking && (
                  <div className="mt-2 text-xs max-h-[200px] overflow-y-auto bg-[#00031b] border border-[#00cbdd]/10 p-2 rounded-md">
                    {thinkingSteps.map((step, idx) => (
                      <div key={idx} className="mb-2">
                        <div className="font-semibold text-[#00cbdd]">{step.stage}:</div>
                        <div className="whitespace-pre-wrap text-white/70">{step.reasoning.slice(0, 300)}...</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="w-full max-w-3xl mx-auto mt-8">
          <div className="flex flex-wrap justify-center gap-3">
            {[
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
                <span className="text-sm">{action.name}</span>
                {action.name !== "Show Settings" && <ArrowUp className="h-3 w-3 ml-1" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;