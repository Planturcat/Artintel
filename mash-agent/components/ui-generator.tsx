import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { aiService } from '@/lib/services/ai-service';
import { UIGeneratorReasoningEngine, UIGenerationStage } from '@/lib/services/ui-generator-reasoning';

export interface UIGeneratorProps {
  llmModel?: string;
  onGeneratedCode?: (code: string) => void;
}

export function UIGenerator({
  llmModel = 'llama2:13b',
  onGeneratedCode
}: UIGeneratorProps) {
  // User input
  const [userInput, setUserInput] = useState<string>('');

  // Generation state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [generationStage, setGenerationStage] = useState<UIGenerationStage | null>(null);
  const [generationProgress, setGenerationProgress] = useState<number>(0);

  // Connection state
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isCheckingConnection, setIsCheckingConnection] = useState<boolean>(false);
  const [connectionMessage, setConnectionMessage] = useState<string>('');

  // Thinking process
  const [thinkingProcess, setThinkingProcess] = useState<{
    stage: UIGenerationStage;
    content: string;
  }[]>([]);
  const [activeTab, setActiveTab] = useState<string>('input');

  // Example prompts
  const examplePrompts = [
    "Create a form for collecting user feedback with rating, category selection, and comments",
    "Build a dashboard card that shows daily active users with a chart",
    "Make a file upload component with drag and drop support and progress indicator",
    "Create a chat interface that can connect to an AI model"
  ];

  // Check connection on mount
  useEffect(() => {
    checkConnection();
  }, []);

  // Function to check AI service connection
  const checkConnection = async () => {
    setIsCheckingConnection(true);
    setConnectionMessage('Checking connection to AI service...');

    try {
      const startTime = performance.now();
      const connectionStatus = await aiService.checkConnection();
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);

      if (connectionStatus.connected) {
        setIsConnected(true);
        const modelCount = connectionStatus.availableModels?.length || 0;
        setConnectionMessage(`Connected to AI service (${responseTime}ms) - ${modelCount} models available`);
      } else {
        setIsConnected(false);
        setConnectionMessage(`Failed to connect to AI service: ${connectionStatus.error || 'Unknown error'}`);
      }
    } catch (error) {
      setIsConnected(false);
      setConnectionMessage(`Error connecting to AI service: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsCheckingConnection(false);
    }
  };

  // Callback for handling thinking process updates
  const handleThinkingUpdates = useCallback((stage: UIGenerationStage, content: string) => {
    setThinkingProcess(prev => [...prev, { stage, content }]);
    setGenerationStage(stage);

    // Update progress based on stage
    const stageValues = Object.values(UIGenerationStage);
    const currentIndex = stageValues.indexOf(stage);
    const progressPercentage = Math.floor((currentIndex / (stageValues.length - 1)) * 100);
    setGenerationProgress(progressPercentage);

  }, []);

  // Validate generated code to ensure it's valid React component code
  const validateComponentCode = (code: string): boolean => {
    // Check for key React component patterns
    const hasReactImport = code.includes('import React') || code.includes('from "react"') || code.includes("from 'react'");
    const hasComponentDefinition = code.includes('function ') || code.includes('const ') && (code.includes(' = (') || code.includes(' = () =>'));
    const hasJSX = code.includes('<') && code.includes('>') && code.includes('</');
    const hasReturn = code.includes('return (') || code.includes('return <');

    // Must have at least a component definition and JSX
    return (hasComponentDefinition && hasJSX && hasReturn);
  };

  // Generate UI based on user input
  const generateUI = async () => {
    if (!userInput.trim()) {
      setGenerationError('Please enter UI requirements');
      return;
    }

    if (!isConnected) {
      setGenerationError('Not connected to AI service. Please check your connection and try again.');
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);
    setThinkingProcess([]);
    setGenerationProgress(0);
    setActiveTab('thinking');
    setGeneratedCode('');

    try {
      // First try to load any previous code as a safety measure
      let fallbackCode = '';
      if (typeof window !== 'undefined') {
        fallbackCode = localStorage.getItem('ui_generator_last_code') || '';
      }

      const reasoningEngine = new UIGeneratorReasoningEngine({
        llmModel,
        onThinkingUpdate: handleThinkingUpdates
      });

      // Use a longer timeout to prevent quick errors
      const result = await Promise.race([
        reasoningEngine.generateUIComponent(userInput),
        // Add a timeout to ensure we don't wait forever
        new Promise<string>((_, reject) =>
          setTimeout(() => reject(new Error("Generation timed out. Using fallback if available.")), 120000)
        )
      ]);

      // Validate the generated code
      if (!validateComponentCode(result)) {
        throw new Error("Generated code doesn't appear to be a valid React component");
      }

      setGeneratedCode(result);

      // Save to localStorage as backup
      if (typeof window !== 'undefined') {
        localStorage.setItem('ui_generator_last_code', result);
      }

      // Call the callback if provided
      if (onGeneratedCode) {
        onGeneratedCode(result);
      }

      // Set progress to 100% when complete
      setGenerationProgress(100);
    } catch (error) {
      console.error("Error in UI generation:", error);

      // Try to recover from localStorage
      if (typeof window !== 'undefined') {
        const savedCode = localStorage.getItem('ui_generator_last_code');
        if (savedCode && savedCode.trim().length > 0 && validateComponentCode(savedCode)) {
          console.log("UI Generator recovered code from localStorage");
          setGeneratedCode(savedCode);

          // Call the callback if provided, with recovered code
          if (onGeneratedCode) {
            onGeneratedCode(savedCode);
          }

          // Show a more user-friendly error
          const errorMessage = error instanceof Error ? error.message : String(error);
          if (errorMessage.includes("Failed to generate component") || errorMessage.includes("timed out")) {
            setGenerationError(`The model had trouble generating the code, but we've recovered your previous generation. Try simplifying your requirements or using a larger model.`);
          } else {
            setGenerationError(`Error, but recovered previous code: ${errorMessage}`);
          }
        } else {
          // Handle the case where there's no saved code
          setGenerationError(`Error generating UI: ${error instanceof Error ? error.message : String(error)}`);

          // Instead of leaving the user with nothing, create a simple component template
          const fallbackTemplate = `import React, { useState } from 'react';

export interface SimpleComponentProps {
  title?: string;
}

export function SimpleComponent({ title = "Component Preview" }: SimpleComponentProps) {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 border rounded-md bg-slate-800 text-white shadow-md">
      <h2 className="text-xl font-bold mb-4 text-cyan-400">{title}</h2>
      <p className="mb-4 text-slate-300">
        This is a fallback component shown because there was an error generating your requested component.
        Try simplifying your requirements or using a different model.
      </p>

      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setCount(prev => Math.max(0, prev - 1))}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md"
          aria-label="Decrease"
        >
          -
        </button>
        <span className="text-lg font-medium w-8 text-center">{count}</span>
        <button
          onClick={() => setCount(prev => prev + 1)}
          className="px-4 py-2 bg-cyan-700 hover:bg-cyan-600 text-white rounded-md"
          aria-label="Increase"
        >
          +
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-700 rounded-md">
          <h3 className="font-medium mb-2 text-cyan-300">Features</h3>
          <ul className="list-disc list-inside text-sm">
            <li>Counter demonstrations</li>
            <li>Responsive design</li>
            <li>Accessible controls</li>
          </ul>
        </div>
        <div className="p-4 bg-slate-700 rounded-md">
          <h3 className="font-medium mb-2 text-cyan-300">Status</h3>
          <div className="flex items-center text-sm">
            <div className="h-2 w-2 rounded-full bg-yellow-400 mr-2"></div>
            <span>Using fallback component</span>
          </div>
        </div>
      </div>
    </div>
  );
}`;

          setGeneratedCode(fallbackTemplate);

          // Call the callback with the fallback if needed
          if (onGeneratedCode) {
            onGeneratedCode(fallbackTemplate);
          }
        }
      } else {
        setGenerationError(`Error generating UI: ${error instanceof Error ? error.message : String(error)}`);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // Use an example prompt
  const useExamplePrompt = (prompt: string) => {
    setUserInput(prompt);
  };

  // Get the current stage name in user-friendly format
  const getStageName = (stage: UIGenerationStage | null): string => {
    if (!stage) return 'Preparing...';

    return stage.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="flex items-center justify-between bg-[#00031b] p-3 rounded-md border border-[#00cbdd]/20">
        <div className="flex items-center">
          {isCheckingConnection ? (
            <Loader2 className="h-5 w-5 text-[#00cbdd] mr-2 animate-spin" />
          ) : isConnected === true ? (
            <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
          ) : isConnected === false ? (
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
          ) : null}
          <span className="text-sm text-white">{connectionMessage || 'Checking AI service connection...'}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={checkConnection}
          disabled={isCheckingConnection}
          className="border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10"
        >
          {isCheckingConnection ? 'Checking...' : 'Test Connection'}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 bg-[#00031b]/50 border border-[#00cbdd]/20">
          <TabsTrigger
            value="input"
            className="data-[state=active]:bg-[#00cbdd]/10 data-[state=active]:text-[#00cbdd] text-white"
          >
            Input
          </TabsTrigger>
          <TabsTrigger
            value="thinking"
            className="data-[state=active]:bg-[#00cbdd]/10 data-[state=active]:text-[#00cbdd] text-white"
          >
            Thinking Process
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="mt-0 space-y-4">
          {/* Input Box */}
          <div className="space-y-2">
            <Textarea
              placeholder="Describe the UI component you want to generate..."
              className="min-h-32 resize-none bg-[#00031b] border-[#00cbdd]/20 text-white placeholder:text-[#00cbdd]/50"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isGenerating}
            />

            {/* Example Prompts */}
            <div className="space-y-2">
              <p className="text-xs text-[#00cbdd]/70">Try an example:</p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((prompt, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className="text-xs border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10"
                    onClick={() => useExamplePrompt(prompt)}
                    disabled={isGenerating}
                  >
                    {prompt.length > 35 ? prompt.substring(0, 35) + '...' : prompt}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Generation Error */}
          {generationError && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-800/30 text-red-400">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {generationError}
              </AlertDescription>
            </Alert>
          )}

          {/* Generate Button */}
          <Button
            onClick={generateUI}
            disabled={isGenerating || !userInput.trim() || isConnected === false}
            className="w-full bg-[#00cbdd]/20 hover:bg-[#00cbdd]/30 text-white"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {generationStage ? getStageName(generationStage) : 'Generating...'}
              </>
            ) : (
              'Generate UI Component'
            )}
          </Button>

          {/* Progress Bar (only shown when generating) */}
          {isGenerating && (
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <p className="text-xs text-[#00cbdd]">
                  {generationStage ? getStageName(generationStage) : 'Preparing...'}
                </p>
                <span className="text-xs text-[#00cbdd]">{generationProgress}%</span>
              </div>
              <Progress value={generationProgress} className="h-1 bg-[#00031b]" indicatorClassName="bg-[#00cbdd]" />
            </div>
          )}
        </TabsContent>

        <TabsContent value="thinking" className="mt-0">
          {!isGenerating && thinkingProcess.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 border border-[#00cbdd]/20 rounded-md bg-[#00031b] text-center">
              <p className="text-[#00cbdd]/70">Enter your requirements and generate a component to see the thinking process</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab('input')}
                className="mt-4 border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10"
              >
                Go to Input
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Progress indicator */}
              {isGenerating && (
                <div className="flex items-center space-x-4 p-4 bg-[#00031b] border border-[#00cbdd]/20 rounded-md">
                  <Loader2 className="h-5 w-5 text-[#00cbdd] animate-spin" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {generationStage ? getStageName(generationStage) : 'Thinking...'}
                    </p>
                    <Progress
                      value={generationProgress}
                      className="h-1 mt-1 bg-[#00031b]"
                      indicatorClassName="bg-[#00cbdd]"
                    />
                  </div>
                  <span className="text-xs text-[#00cbdd]">{generationProgress}%</span>
                </div>
              )}

              {/* Thinking steps */}
              <div className="space-y-4">
                {thinkingProcess.map((step, index) => (
                  <div
                    key={index}
                    className="p-4 border border-[#00cbdd]/20 rounded-md bg-[#00031b]"
                  >
                    <h3 className="text-sm font-medium mb-2 text-[#00cbdd]">
                      {getStageName(step.stage)}
                    </h3>
                    <div className="text-sm text-white whitespace-pre-wrap">{step.content}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}