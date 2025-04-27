"use client"

import React, { useState, useEffect } from 'react';
import { 
  ConditionBasedUIGenerator, 
  GeneratedUI 
} from '@/lib/services/condition-based-ui-generator';
import { reasoningEngine } from '@/lib/services/reasoning-engine';
import { taskManager } from '@/lib/services/task-manager';
import { UICondition, UIConditionCategory } from '@/lib/services/ui-condition-types';
import { UIModification } from '@/lib/services/condition-to-ui-mapper';
import { TemplateType } from '@/lib/services/ui-template-system';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowUp, CheckCircle, AlertCircle, Copy, Loader2 } from 'lucide-react';
import { StepIndicator } from './step-indicator';

// Import Ollama service functions directly
import {
  generateWithOllama,
  checkOllamaHealth,
  listOllamaModels,
  setOllamaBaseUrl,
} from "@/lib/ollama-service";

interface ConditionUIGeneratorProps {
  llmModel: string;
  onGenerateUI?: (generatedUI: GeneratedUI) => void;
}

export const ConditionUIGenerator: React.FC<ConditionUIGeneratorProps> = ({ 
  llmModel,
  onGenerateUI
}) => {
  // State
  const [uiGenerator, setUIGenerator] = useState<ConditionBasedUIGenerator | null>(null);
  const [userMessage, setUserMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUI, setGeneratedUI] = useState<GeneratedUI | null>(null);
  const [availableTemplates, setAvailableTemplates] = useState<Array<{
    id: string;
    name: string;
    description: string;
    type: TemplateType;
  }>>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('Card');
  const [selectedTemplateType, setSelectedTemplateType] = useState<TemplateType>(TemplateType.React);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [ollamaModels, setOllamaModels] = useState<Array<{ name: string; [key: string]: any }>>([]);
  const [steps, setSteps] = useState<Array<{name: string; status: 'pending' | 'complete' | 'error'; message?: string}>>([]);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [showThinking, setShowThinking] = useState(false);
  const [thinkingSteps, setThinkingSteps] = useState<{stage: string, reasoning: string}[]>([]);
  
  // Initialize the UI generator
  useEffect(() => {
    const initGenerator = async () => {
      try {
        // Initialize the reasoning engine
        reasoningEngine.setModel(llmModel);
        
        // Initialize UI generator
        const generator = new ConditionBasedUIGenerator(llmModel);
        setUIGenerator(generator);
        
        // Check connection to Ollama
        await checkOllamaConnection();
        
        // Get available templates
        const templates = generator.getAvailableTemplates();
        setAvailableTemplates(templates);
        
        // Set default template
        if (templates.length > 0) {
          const reactTemplates = templates.filter(t => t.type === TemplateType.React);
          if (reactTemplates.length > 0) {
            setSelectedTemplate(reactTemplates[0].name);
            setSelectedTemplateType(TemplateType.React);
          } else {
            setSelectedTemplate(templates[0].name);
            setSelectedTemplateType(templates[0].type);
          }
        }
      } catch (error) {
        console.error("Error initializing UI generator:", error);
        setError(`Failed to initialize: ${error instanceof Error ? error.message : String(error)}`);
        setIsConnected(false);
      }
    };
    
    initGenerator();
  }, [llmModel]);
  
  // Ollama connection check
  const checkOllamaConnection = async (retries = 3, silent = false): Promise<boolean> => {
    if (!silent) {
      setIsCheckingConnection(true);
      setError(null);
    }

    try {
      // Set appropriate base URL
      setOllamaBaseUrl('auto');
      
      // Check Ollama health
      const isHealthy = await checkOllamaHealth();
      
      if (isHealthy) {
        setIsConnected(true);
        
        // Fetch available models
        try {
          const models = await listOllamaModels();
          if (models && (Array.isArray(models.models) || Array.isArray(models.tags))) {
            setOllamaModels(models.models || models.tags || []);
          }
        } catch (modelError) {
          console.error("Model fetch failed:", modelError);
        }
        
        return true;
      }

      if (retries > 0 && !silent) {
        // Retry with backoff
        await new Promise((resolve) => setTimeout(resolve, (4 - retries) * 1000));
        return checkOllamaConnection(retries - 1, silent);
      }

      if (!silent) {
        setIsConnected(false);
        setError("Could not connect to Ollama. Please ensure Ollama is running.");
      }
      
      return false;
    } catch (error) {
      console.error("Error connecting to Ollama:", error);

      if (retries > 0 && !silent) {
        // Retry with backoff
        await new Promise((resolve) => setTimeout(resolve, (4 - retries) * 1000));
        return checkOllamaConnection(retries - 1, silent);
      }

      if (!silent) {
        setIsConnected(false);
        const errorMessage = error instanceof Error ? error.message : String(error);
        setError(`Error connecting to Ollama: ${errorMessage}`);
      }
      
      return false;
    } finally {
      if (!silent) {
        setIsCheckingConnection(false);
      }
    }
  };
  
  // Check connection on mount
  useEffect(() => {
    checkOllamaConnection();
  }, []);
  
  // Update model when it changes
  useEffect(() => {
    if (uiGenerator) {
      uiGenerator.setModel(llmModel);
      reasoningEngine.setModel(llmModel);
    }
  }, [llmModel, uiGenerator]);
  
  // Generate UI based on user message
  const handleGenerateUI = async () => {
    if (!userMessage.trim() || isGenerating || !uiGenerator) return;
    
    // Check connection before proceeding
    if (!isConnected) {
      const connected = await checkOllamaConnection(1, true);
      if (!connected) {
        setError("Cannot generate UI without Ollama connection.");
        return;
      }
    }
    
    setIsGenerating(true);
    setError(null);
    setGeneratedUI(null);
    
    // Initialize steps for visualization
    setSteps([
      { name: "Understanding request", status: "pending" },
      { name: "Analyzing UI conditions", status: "pending" },
      { name: "Mapping conditions to code", status: "pending" },
      { name: "Generating UI code", status: "pending" }
    ]);
    setCurrentStep("Understanding request");
    setThinkingSteps([]);
    
    try {
      // Step 1: Process through reasoning engine
      const thinkingProcess = await reasoningEngine.think(userMessage);
      updateStepStatus("Understanding request", "complete");
      
      // Save thinking steps
      const thinkingData = thinkingProcess.steps.map(step => ({
        stage: step.stage,
        reasoning: step.reasoning
      }));
      setThinkingSteps(thinkingData);
      
      // Step 2: Analyze UI conditions
      setCurrentStep("Analyzing UI conditions");
      const result = await uiGenerator.generateUIFromUserMessage(
        userMessage,
        selectedTemplate,
        selectedTemplateType,
        reasoningEngine
      );
      updateStepStatus("Analyzing UI conditions", "complete");
      
      // Step 3: Map conditions to UI code
      setCurrentStep("Mapping conditions to code");
      updateStepStatus("Mapping conditions to code", "complete");
      
      // Step 4: Generate UI code
      setCurrentStep("Generating UI code");
      updateStepStatus("Generating UI code", "complete");
      
      // Set the final result
      setGeneratedUI(result);
      
      // Add to conversation history
      taskManager.addToConversationHistory({ 
        role: 'user', 
        content: userMessage 
      });
      taskManager.addToConversationHistory({ 
        role: 'assistant', 
        content: `Generated ${result.templates[0].name} component with ${result.conditionSet.conditions.length} conditions.` 
      });
      
      // Notify parent if needed
      if (onGenerateUI) {
        onGenerateUI(result);
      }
      
      // Complete all steps
      setSteps(prev => prev.map(step => ({ ...step, status: "complete" })));
      
    } catch (error) {
      console.error("Error generating UI:", error);
      
      let errorMessage = `Failed to generate UI: ${error instanceof Error ? error.message : String(error)}`;
      if (error instanceof Error && (
        error.message.includes("Failed to fetch") || 
        error.message.includes("Could not connect")
      )) {
        errorMessage = "❌ Connection Error: Could not connect to Ollama.";
      }
      
      setError(errorMessage);
      setSteps(prev => prev.map(step => 
        step.name === currentStep ? { ...step, status: "error", message: "Error" } : step
      ));
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Update step status
  const updateStepStatus = (stepName: string, status: 'pending' | 'complete' | 'error', message?: string) => {
    setSteps(prev => prev.map(step => 
      step.name === stepName ? { ...step, status, ...(message ? { message } : {}) } : step
    ));
  };
  
  // Toggle thinking process visibility
  const toggleThinkingProcess = () => {
    setShowThinking(!showThinking);
  };
  
  // Get condition category label
  const getConditionCategoryLabel = (category: UIConditionCategory): string => {
    switch (category) {
      case UIConditionCategory.Accessibility:
        return 'Accessibility';
      case UIConditionCategory.DeviceType:
        return 'Device Type';
      case UIConditionCategory.UserPreference:
        return 'User Preference';
      case UIConditionCategory.BrandingStyle:
        return 'Branding Style';
      case UIConditionCategory.PerformanceNeeds:
        return 'Performance Needs';
      case UIConditionCategory.LegacySupport:
        return 'Legacy Support';
      case UIConditionCategory.ContentDensity:
        return 'Content Density';
      default:
        return 'Unknown';
    }
  };
  
  // Copy code to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  
  return (
    <div className="flex-1 flex flex-col items-center w-full max-w-3xl mx-auto">
      {/* Input Area */}
      <div className="w-full rounded-xl overflow-hidden mb-6">
        <div className="relative">
          {/* Connection Status Badge */}
          <div className="absolute top-4 right-4 z-10">
            <div className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 ${
              isConnected 
                ? "bg-[#00cbdd]/10 text-[#00cbdd] border border-[#00cbdd]/20" 
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}>
              {isConnected ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <span>Connected</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4" />
                  <span>Disconnected</span>
                </>
              )}
            </div>
          </div>
          
          {/* Input Container */}
          <div className="bg-[#00031b] border border-[#00cbdd]/20 rounded-xl p-6">
            <div className="flex flex-col space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Create UI Component</h2>
                <p className="text-white/70 text-sm">
                  Describe the UI component you want to generate. Be specific about design requirements, functionality, and any specific conditions.
                </p>
              </div>
              
              <Textarea
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Example: Create a chatbot interface that connects to Ollama API with dark mode support and a minimalist design."
                className="min-h-[120px] bg-[#00031b] border-[#00cbdd]/20 text-white resize-none focus:border-[#00cbdd]/50 focus:ring-[#00cbdd]/20"
                disabled={isGenerating}
              />
              
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="flex-1">
                  <label htmlFor="templateSelect" className="block font-medium text-sm mb-1 text-white">
                    Component Type:
                  </label>
                  <select
                    id="templateSelect"
                    className="w-full p-2 rounded-md bg-[#00031b] border border-[#00cbdd]/20 text-white focus:border-[#00cbdd]/50 focus:ring-[#00cbdd]/20"
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    disabled={isGenerating || !isConnected}
                  >
                    {availableTemplates
                      .filter(t => t.type === selectedTemplateType)
                      .map(template => (
                        <option key={template.id} value={template.name}>
                          {template.name}
                        </option>
                      ))}
                  </select>
                </div>
                
                <div className="flex-1">
                  <label htmlFor="templateTypeSelect" className="block font-medium text-sm mb-1 text-white">
                    Framework:
                  </label>
                  <select
                    id="templateTypeSelect"
                    className="w-full p-2 rounded-md bg-[#00031b] border border-[#00cbdd]/20 text-white focus:border-[#00cbdd]/50 focus:ring-[#00cbdd]/20"
                    value={selectedTemplateType}
                    onChange={(e) => setSelectedTemplateType(e.target.value as TemplateType)}
                    disabled={isGenerating || !isConnected}
                  >
                    {Object.values(TemplateType).map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {error && (
                <div className="text-red-400 text-sm p-3 bg-red-500/10 rounded-md border border-red-500/20">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                </div>
              )}
              
              <Button
                className={`w-full flex items-center justify-center gap-2 py-5 ${
                  isGenerating || !isConnected
                    ? 'bg-[#00031b] border border-[#00cbdd]/20 text-[#00cbdd]/50 cursor-not-allowed'
                    : 'bg-[#00cbdd] hover:bg-[#00cbdd]/90 text-[#00031b]'
                }`}
                onClick={handleGenerateUI}
                disabled={isGenerating || !isConnected || !userMessage.trim()}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : !isConnected ? (
                  <span>Connect to Ollama</span>
                ) : (
                  <>
                    <span>Generate Component</span>
                    <ArrowUp className="h-4 w-4" />
                  </>
                )}
              </Button>
              
              {!isConnected && !isCheckingConnection && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => checkOllamaConnection()}
                >
                  Check Connection
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Thinking Process Display */}
      {isGenerating && steps.length > 0 && (
        <div className="w-full p-4 rounded-xl bg-[#00031b] border border-[#00cbdd]/20 mb-6">
          <StepIndicator steps={steps} currentStep={currentStep} />
          
          {thinkingSteps.length > 0 && (
            <div className="mt-2">
              <button 
                onClick={toggleThinkingProcess}
                className="text-xs text-[#00cbdd] hover:underline flex items-center gap-1"
              >
                {showThinking ? "Hide thinking process" : "Show thinking process"}
              </button>
              
              {showThinking && (
                <div className="mt-2 text-xs max-h-[200px] overflow-y-auto bg-[#00031b]/50 border border-[#00cbdd]/10 p-2 rounded-md">
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
      
      {/* Generated UI Result */}
      {generatedUI && (
        <div className="w-full">
          {/* Detected Conditions */}
          <div className="bg-[#00031b] border border-[#00cbdd]/20 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold mb-4 text-white">Detected Conditions</h3>
            
            {generatedUI.conditionSet.conditions.length === 0 ? (
              <p className="text-white/70">
                No specific conditions were detected. Using default UI settings.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedUI.conditionSet.conditions.map((condition: UICondition) => (
                  <div 
                    key={`${condition.category}-${condition.value}`}
                    className="p-3 border border-[#00cbdd]/20 rounded-md bg-[#00031b]/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">
                        {getConditionCategoryLabel(condition.category)}
                      </span>
                      <span className="text-xs bg-[#00cbdd]/10 text-[#00cbdd] px-2 py-1 rounded-full">
                        Priority: {condition.priority}
                      </span>
                    </div>
                    <div className="mt-1 text-base font-semibold text-white">{condition.value}</div>
                    {condition.description && (
                      <div className="mt-1 text-sm text-white/60">
                        {condition.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Generated Components */}
          <div className="bg-[#00031b] border border-[#00cbdd]/20 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4 text-white">Generated Component</h3>
            
            {generatedUI.templates.length === 0 ? (
              <p className="text-white/70">
                No components were generated.
              </p>
            ) : (
              <div className="flex flex-col space-y-6">
                {generatedUI.templates.map(template => (
                  <div key={template.id} className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-md font-semibold text-white">{template.name} ({template.type})</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-[#00cbdd]/10 text-[#00cbdd] px-2 py-1 rounded-full">
                          Ollama-Connected
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">Component Code</span>
                        <Button 
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-[#00cbdd] hover:text-white hover:bg-[#00cbdd]/20"
                          onClick={() => copyToClipboard(template.code)}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy Code
                        </Button>
                      </div>
                      <pre className="p-4 bg-[#00031b]/50 border border-[#00cbdd]/10 text-white/90 rounded-md overflow-x-auto text-sm">
                        <code>{template.code}</code>
                      </pre>
                    </div>
                    
                    {template.cssCode && (
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white">CSS Code</span>
                          <Button 
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-[#00cbdd] hover:text-white hover:bg-[#00cbdd]/20"
                            onClick={() => copyToClipboard(template.cssCode || '')}
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy CSS
                          </Button>
                        </div>
                        <pre className="p-4 bg-[#00031b]/50 border border-[#00cbdd]/10 text-white/90 rounded-md overflow-x-auto text-sm">
                          <code>{template.cssCode}</code>
                        </pre>
                      </div>
                    )}
                    
                    {template.jsCode && (
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white">JavaScript Code</span>
                          <Button 
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-[#00cbdd] hover:text-white hover:bg-[#00cbdd]/20"
                            onClick={() => copyToClipboard(template.jsCode || '')}
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy JS
                          </Button>
                        </div>
                        <pre className="p-4 bg-[#00031b]/50 border border-[#00cbdd]/10 text-white/90 rounded-md overflow-x-auto text-sm">
                          <code>{template.jsCode}</code>
                        </pre>
                      </div>
                    )}
                    
                    <div className="flex flex-col space-y-2">
                      <span className="text-sm font-medium text-white">Applied Modifications</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {template.appliedModifications.map((mod: UIModification) => (
                          <div 
                            key={mod.id}
                            className="text-sm p-2 bg-[#00031b]/50 border border-[#00cbdd]/10 rounded-md"
                          >
                            <div className="font-medium text-white">{mod.type}: {mod.modification}</div>
                            <div className="text-white/60">{mod.reasoning}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 