import { aiService } from "./ai-service";

/**
 * UI Generator thinking process stages
 */
export enum UIGenerationStage {
  RequirementAnalysis = 'requirement_analysis',
  ComponentIdentification = 'component_identification',
  StructurePlanning = 'structure_planning',
  StyleDetermination = 'style_determination',
  CodeGeneration = 'code_generation',
  ErrorRecovery = 'error_recovery'
}

/**
 * Types of UI components that can be generated
 */
export enum UIComponentType {
  Form = 'form',
  Table = 'table',
  Card = 'card',
  Navigation = 'navigation',
  Dashboard = 'dashboard',
  Chart = 'chart',
  List = 'list',
  Modal = 'modal',
  Layout = 'layout',
  // AI-specific component types
  AIChat = 'ai_chat',
  AIPrompt = 'ai_prompt',
  AIModelSelector = 'ai_model_selector',
  AIStreamingOutput = 'ai_streaming_output',
  AISettings = 'ai_settings',
  Custom = 'custom'
}

/**
 * Result of a UI generation thinking step
 */
export interface UIGenerationStepResult {
  stage: UIGenerationStage;
  prompt: string;
  reasoning: string;
  confidence: number; // 0-1 confidence score
}

/**
 * A complete UI generation thinking process
 */
export interface UIGenerationProcess {
  userRequirement: string;
  steps: UIGenerationStepResult[];
  componentType: UIComponentType;
  structurePlan?: string;
  generatedCode?: string;
  aiIntegration?: boolean; // Whether this component integrates with AI service
  startTime: Date;
  endTime?: Date;
  duration?: number; // Duration in ms
}

/**
 * Configuration for the UI Generator Reasoning Engine
 */
export interface UIGeneratorReasoningConfig {
  llmModel?: string;
  onThinkingUpdate?: (stage: UIGenerationStage, content: string) => void;
  systemPrompt?: string;
}

/**
 * UI Generator Reasoning Engine - Handles the step-by-step thinking process for UI generation
 */
export class UIGeneratorReasoningEngine {
  // Using aiService for model management
  private generationProcesses: UIGenerationProcess[] = [];
  private onThinkingUpdate?: (stage: UIGenerationStage, content: string) => void;
  private systemPrompt = `You are an expert UI/UX designer and frontend developer specializing in React, TailwindCSS, and modern frontend frameworks.
Your task is to analyze user requirements for UI components and generate well-designed, accessible, and functional code.

You have specific expertise in building frontend components that integrate with backend API services for AI model management, dataset handling, fine-tuning, and model deployment.
You understand how to:
1. Connect to backend API endpoints for dataset management, fine-tuning, and model deployment
2. Create intuitive UIs for managing AI workflows (dataset upload, model training, deployment)
3. Implement proper error handling and loading states for API interactions
4. Design responsive components that provide immediate feedback during API operations
5. Build components that connect to deployed AI models for inference

When generating UI components, prioritize:
1. Clean, readable code following best practices
2. Accessibility standards (WCAG)
3. Responsive design principles
4. Modern styling with TailwindCSS
5. Type safety with TypeScript
6. Proper API integration with backend services`;

  constructor(config?: UIGeneratorReasoningConfig) {
    if (config) {
      if (config.llmModel) {
        aiService.setCurrentModel(config.llmModel);
      }
      if (config.onThinkingUpdate) {
        this.onThinkingUpdate = config.onThinkingUpdate;
      }
      if (config.systemPrompt) {
        this.systemPrompt = config.systemPrompt;
      }
    }
  }

  /**
   * Set the system prompt to guide the reasoning process
   */
  public setSystemPrompt(prompt: string): void {
    this.systemPrompt = prompt;
  }

  /**
   * Set the AI model to use for reasoning
   */
  public setModel(modelName: string): void {
    aiService.setCurrentModel(modelName);
  }

  /**
   * Set callback for thinking updates
   */
  public setThinkingUpdateCallback(callback: (stage: UIGenerationStage, content: string) => void): void {
    this.onThinkingUpdate = callback;
  }

  /**
   * New method: Generate UI component code directly, with callbacks
   * This is a simpler interface that directly returns the generated code
   */
  public async generateUIComponent(userRequirement: string, designContext?: string): Promise<string> {
    try {
      const process = await this.generateUI(userRequirement, designContext);

      if (process.generatedCode) {
        return process.generatedCode;
      } else {
        // Try to recover by looking at the code generation step's reasoning
        const codeGenStep = process.steps.find(step => step.stage === UIGenerationStage.CodeGeneration);

        if (codeGenStep) {
          // Make a second attempt to extract code from the reasoning
          const extractedCode = this.extractGeneratedCode(codeGenStep.reasoning, true);
          if (extractedCode && extractedCode.trim().length > 0) {
            // If we found code, save it to the process and return it
            process.generatedCode = extractedCode;
            return extractedCode;
          }
        }

        // If all recovery attempts fail, use a fallback approach
        // Check localStorage for previously generated code
        if (typeof window !== 'undefined') {
          const savedCode = localStorage.getItem('ui_generator_last_code');
          if (savedCode && savedCode.trim().length > 0) {
            console.log("Recovered code from localStorage fallback");
            return savedCode;
          }
        }

        throw new Error("Failed to generate component code");
      }
    } catch (error) {
      console.error("Error generating UI component:", error);

      // Try to recover from localStorage as a last resort
      if (typeof window !== 'undefined') {
        const savedCode = localStorage.getItem('ui_generator_last_code');
        if (savedCode && savedCode.trim().length > 0) {
          console.log("Recovered code from localStorage after error");
          return savedCode;
        }
      }

      throw error;
    }
  }

  /**
   * Execute a complete UI generation thinking process for a user requirement
   */
  public async generateUI(userRequirement: string, designContext?: string): Promise<UIGenerationProcess> {
    const generationProcess: UIGenerationProcess = {
      userRequirement,
      steps: [],
      componentType: UIComponentType.Custom,
      aiIntegration: false,
      startTime: new Date()
    };

    this.generationProcesses.push(generationProcess);

    try {
      // Step 1: Analyze user requirements
      const analysisStep = await this.executeThinkingStep(
        UIGenerationStage.RequirementAnalysis,
        userRequirement,
        designContext,
        `Analyze the user's UI requirement: "${userRequirement}"
Identify the key requirements, features, data elements, and interactions needed.
What is the primary purpose of this UI component? What problem is it solving?
What data will it need to display or collect? What user interactions should it support?
Does this component need to integrate with AI models? If so, how?`
      );
      generationProcess.steps.push(analysisStep);

      // Step 2: Identify the most appropriate component type
      const componentStep = await this.executeThinkingStep(
        UIGenerationStage.ComponentIdentification,
        userRequirement,
        designContext,
        `Based on your analysis: "${analysisStep.reasoning.slice(0, 200)}...", identify the most appropriate UI component type.
Consider these component types:
- Form: For data collection with inputs, validations, and submission
- Table: For displaying structured data in rows and columns
- Card: For displaying content in a contained box/card format
- Navigation: For site navigation like menus, breadcrumbs, etc.
- Dashboard: For overview UI with multiple metrics and visualizations
- Chart: For data visualization like graphs, charts, and diagrams
- List: For displaying collections of items in a list format
- Modal: For pop-up/overlay content that appears above the page
- Layout: For page structure and organization

Also consider these AI-specific component types:
- AIChat: For chat interfaces that connect to AI models
- AIPrompt: For prompt engineering interfaces with parameter controls
- AIModelSelector: For browsing and selecting AI models
- AIStreamingOutput: For displaying streaming text from AI models
- AISettings: For configuring AI service connection settings

Which component type best matches the requirements?`
      );
      generationProcess.steps.push(componentStep);

      // Determine component type and AI integration
      generationProcess.componentType = this.determineComponentType(componentStep.reasoning);
      generationProcess.aiIntegration = this.requiresAIIntegration(generationProcess.componentType, componentStep.reasoning);

      // Step 3: Plan the component structure
      const structurePrompt = generationProcess.aiIntegration ?
        this.getAIStructurePrompt(generationProcess.componentType, userRequirement) :
        this.getStandardStructurePrompt(generationProcess.componentType, userRequirement);

      const structureStep = await this.executeThinkingStep(
        UIGenerationStage.StructurePlanning,
        userRequirement,
        designContext,
        structurePrompt
      );
      generationProcess.steps.push(structureStep);
      generationProcess.structurePlan = structureStep.reasoning;

      // Step 4: Determine styling approach
      const styleStep = await this.executeThinkingStep(
        UIGenerationStage.StyleDetermination,
        userRequirement,
        designContext,
        `Based on the component structure we've planned, let's determine the styling approach.
How should this ${generationProcess.componentType} component look visually?

Consider:
1. Color scheme, spacing, and layout principles
2. Responsive design considerations (mobile, tablet, desktop)
3. Visual hierarchy and typography
4. Accessibility requirements (contrast, focus states, etc.)
5. Animation and transition needs
${generationProcess.aiIntegration ? '6. Visual feedback for AI processing states (loading, streaming, etc.)' : ''}

Provide detailed TailwindCSS class suggestions for key elements.`
      );
      generationProcess.steps.push(styleStep);

      // Step 5: Generate the code
      const codePrompt = generationProcess.aiIntegration ?
        this.getAICodePrompt(generationProcess.componentType, userRequirement, structureStep.reasoning, styleStep.reasoning) :
        this.getStandardCodePrompt(generationProcess.componentType, userRequirement, structureStep.reasoning, styleStep.reasoning);

      const codeStep = await this.executeThinkingStep(
        UIGenerationStage.CodeGeneration,
        userRequirement,
        designContext,
        codePrompt
      );
      generationProcess.steps.push(codeStep);
      generationProcess.generatedCode = this.extractGeneratedCode(codeStep.reasoning);

      // Complete the generation process
      generationProcess.endTime = new Date();
      generationProcess.duration = generationProcess.endTime.getTime() - generationProcess.startTime.getTime();

      return generationProcess;
    } catch (error) {
      // Add error recovery if generation process fails
      const errorStep = await this.handleErrorRecovery(userRequirement, error, designContext);
      generationProcess.steps.push(errorStep);

      // Complete the generation process with error state
      generationProcess.endTime = new Date();
      generationProcess.duration = generationProcess.endTime.getTime() - generationProcess.startTime.getTime();

      return generationProcess;
    }
  }

  /**
   * Get structure planning prompt specifically for AI components
   */
  private getAIStructurePrompt(componentType: UIComponentType, _userRequirement: string): string {
    const basePrompt = `Now that we've identified this as a ${componentType} component, let's plan its structure.
What subcomponents will we need? How should they be organized? What state management is required?

Create a detailed outline of:
1. Component hierarchy and organization
2. Key props and state variables needed
3. Event handlers and interaction logic
4. Data flow and management`;

    switch (componentType) {
      case UIComponentType.AIChat:
        return `${basePrompt}

For this AI Chat component, specifically include:
- Message management (history, context window)
- Integration with deployed model endpoints for text generation
- Streaming response handling
- Error states and retry mechanisms
- Message input and submission controls
- Optional typing indicators and loading states
- Model selection from available deployed models`;

      case UIComponentType.AIPrompt:
        return `${basePrompt}

For this AI Prompt component, specifically include:
- Prompt template editing interface
- Parameter controls (temperature, top_p, etc.)
- System prompt and context management
- Result display area
- API request state management (loading, error, success)
- History tracking for previous prompts
- Integration with deployed model endpoints
- Model selection from available deployed models`;

      case UIComponentType.AIModelSelector:
        return `${basePrompt}

For this AI Model Selector component, specifically include:
- Model listing and fetching from backend API
- Display of fine-tuned and deployed models
- Selection mechanism and onChange handler
- Model status indicators (deployed, training, etc.)
- Optional loading indicators
- Search or filtering capabilities
- Integration with the model deployment API`;

      case UIComponentType.AIStreamingOutput:
        return `${basePrompt}

For this AI Streaming Output component, specifically include:
- Streaming text display with proper formatting
- Buffer management for incoming token chunks
- Auto-scrolling behavior
- Highlighting or formatting for specific content
- Copy functionality
- Loading states and completion indication`;

      case UIComponentType.AISettings:
        return `${basePrompt}

For this AI Settings component, specifically include:
- Backend API endpoint configuration
- Model preferences and defaults
- Parameter presets (temperature, tokens, etc.)
- Form validation and submission
- Connection testing functionality
- Settings persistence strategy
- Integration with backend API for configuration`;

      default:
        return `${basePrompt}

Since this component integrates with backend AI services, also consider:
- Backend API connection management
- Loading and error states
- Response handling
- User feedback mechanisms
- Integration with dataset, fine-tuning, or deployment APIs as needed`;
    }
  }

  /**
   * Get standard structure planning prompt for non-Ollama components
   */
  private getStandardStructurePrompt(componentType: UIComponentType, _userRequirement: string): string {
    return `Now that we've identified this as a ${componentType} component, let's plan its structure.
What subcomponents will we need? How should they be organized? What state management is required?

Create a detailed outline of:
1. Component hierarchy and organization
2. Key props and state variables needed
3. Event handlers and interaction logic
4. Data flow and management`;
  }

  /**
   * Get code generation prompt specifically for AI components
   */
  private getAICodePrompt(componentType: UIComponentType, userRequirement: string, structurePlan: string, stylingPlan: string): string {
    const basePrompt = `Now, generate the complete React/TypeScript code for this ${componentType} component.

Based on:
- Requirements: "${userRequirement}"
- Component structure: "${structurePlan.slice(0, 300)}..."
- Styling approach: "${stylingPlan.slice(0, 300)}..."

Generate production-ready code with:
1. TypeScript interfaces/types for props and state
2. Complete React functional component with hooks
3. TailwindCSS classes for styling
4. Proper accessibility attributes (aria-*, role, etc.)
5. Responsive design implemented
6. Backend API integration for dataset management, fine-tuning, or model deployment`;

    switch (componentType) {
      case UIComponentType.AIChat:
        return `${basePrompt}

For this AI Chat component, include:
- Message history state management
- Text input with submission handling
- Streaming response display with typing effect
- Integration with deployed model endpoints
- Error handling and retry mechanism
- Loading states and visual feedback
- Model selection from available deployed models

Here's an example pattern for the backend API integration:

\`\`\`typescript
// Function to send messages to deployed model endpoint
async function sendMessageToDeployedModel(messages, deploymentId) {
  try {
    const response = await fetch("/api/v1/inference/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deployment_id: deploymentId,
        messages: messages,
        stream: true
      })
    });

    if (!response.ok) throw new Error('Backend API error: ' + response.statusText);

    // Handle streaming response
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let resultText = "";

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        resultText += chunk;
        // Update state to show streaming text
        setCurrentResponse(resultText);
      }
    }

    return resultText;
  } catch (error) {
    console.error("Error calling deployed model endpoint:", error);
    throw error;
  }
}
\`\`\`

Adapt and integrate this pattern into your component.`;

      case UIComponentType.AIPrompt:
        return `${basePrompt}

For this AI Prompt component, include:
- Textarea for prompt template input
- Form controls for model parameters (temperature, etc)
- Submit button with loading state
- Response display area
- Error message handling
- Integration with deployed model endpoints
- Model selection from available deployed models

Here's an example pattern for the backend API integration:

\`\`\`typescript
// Function to generate completion from deployed model endpoint
async function generateWithDeployedModel(prompt, deploymentId, options = {}) {
  const defaultOptions = {
    temperature: 0.7,
    top_p: 0.9,
    top_k: 40,
    max_tokens: 500
  };

  const requestOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch("/api/ollama/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: modelName,
        prompt: prompt,
        options: requestOptions
      })
    });

    if (!response.ok) throw new Error('Ollama API error: ' + response.statusText);

    const result = await response.json();
    return result.response;
  } catch (error) {
    console.error("Error calling Ollama:", error);
    throw error;
  }
}
\`\`\`

Adapt and integrate this pattern into your component.`;

      case UIComponentType.AIModelSelector:
        return `${basePrompt}

For this AI Model Selector component, include:
- Function to fetch available models from the API
- Model card or list display components
- Selection mechanism (radio buttons or cards)
- Model info display (size, description, etc)
- Loading states during API fetches
- Error handling for API failures

Here's an example pattern for fetching Ollama models:

\`\`\`typescript
// Function to list available Ollama models
async function listOllamaModels() {
  try {
    const response = await fetch("/api/ollama/models", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) throw new Error('Ollama API error: ' + response.statusText);

    const result = await response.json();
    return result.models || [];
  } catch (error) {
    console.error("Error fetching Ollama models:", error);
    throw error;
  }
}
\`\`\`

Adapt and integrate this pattern into your component.`;

      default:
        return `${basePrompt}

Since this component integrates with Ollama, make sure to include:
- Proper API request functions
- Loading states and error handling
- Response processing
- User feedback mechanisms`;
    }
  }

  /**
   * Get standard code generation prompt for non-Ollama components
   */
  private getStandardCodePrompt(componentType: UIComponentType, userRequirement: string, structurePlan: string, stylingPlan: string): string {
    return `Now, generate the complete React/TypeScript code for this ${componentType} component.

Based on:
- Requirements: "${userRequirement}"
- Component structure: "${structurePlan.slice(0, 300)}..."
- Styling approach: "${stylingPlan.slice(0, 300)}..."

Generate production-ready code with:
1. TypeScript interfaces/types for props and state
2. Complete React functional component with hooks
3. TailwindCSS classes for styling
4. Proper accessibility attributes (aria-*, role, etc.)
5. Responsive design implemented

Provide the complete component code, ready to be used in a React application.`;
  }

  /**
   * Determine if component requires AI service integration
   */
  private requiresAIIntegration(componentType: UIComponentType, reasoning: string): boolean {
    // Check if it's an explicit AI component type
    if (
      componentType === UIComponentType.AIChat ||
      componentType === UIComponentType.AIPrompt ||
      componentType === UIComponentType.AIModelSelector ||
      componentType === UIComponentType.AIStreamingOutput ||
      componentType === UIComponentType.AISettings
    ) {
      return true;
    }

    // Check reasoning text for Ollama references
    const reasoningLower = reasoning.toLowerCase();
    return (
      reasoningLower.includes('ollama api') ||
      reasoningLower.includes('integrate with ollama') ||
      reasoningLower.includes('connect to ollama') ||
      reasoningLower.includes('ollama integration') ||
      reasoningLower.includes('ai model')
    );
  }

  /**
   * Extract clean code from the reasoning text
   */
  private extractGeneratedCode(reasoning: string, aggressive: boolean = false): string {
    // Look for code blocks marked with triple backticks
    const codeBlockRegex = /```(?:tsx|jsx|typescript|javascript)?\s*([\s\S]*?)```/g;
    const matches = [...reasoning.matchAll(codeBlockRegex)];

    if (matches.length > 0) {
      // Get the content from the first code block
      return matches[0][1].trim();
    }

    // If no code blocks found, look for indentation or other patterns
    // that might indicate code segments
    const lines = reasoning.split('\n');
    const codeLines = [];
    let inCodeBlock = false;
    let importBlockFound = false;
    let reactComponentFound = false;

    for (const line of lines) {
      // Heuristic: lines with import statements, export statements,
      // function declarations, JSX tags, etc.
      const hasImport = line.includes('import ');
      const hasExport = line.includes('export ');
      const hasFunction = line.includes('function ') || line.includes('const ') && line.includes(' = (') || line.includes(' = () =>');
      const hasJSX = line.includes('<') && line.includes('>');
      const hasReturn = line.includes('return (');

      if (hasImport) importBlockFound = true;
      if (hasExport || hasFunction) reactComponentFound = true;

      if (
        hasImport ||
        hasExport ||
        hasFunction ||
        hasReturn ||
        (hasJSX && !line.includes('console.log')) ||
        // If we're already in a code block, include lines with specific patterns
        (inCodeBlock && (line.trim().startsWith('const ') ||
                         line.trim().startsWith('let ') ||
                         line.trim().startsWith('import ') ||
                         line.trim().startsWith('export ') ||
                         line.trim().startsWith('function ') ||
                         line.trim().startsWith('return ') ||
                         line.trim().startsWith('//') ||
                         line.trim().startsWith('<') ||
                         line.trim().startsWith('{') ||
                         line.trim().startsWith('}') ||
                         line.includes('=>') ||
                         (aggressive && line.trim().length > 0))) // In aggressive mode, include all non-empty lines
      ) {
        inCodeBlock = true;
        codeLines.push(line);
      } else if (inCodeBlock && line.trim() === '') {
        // Keep empty lines if we're in a code block
        codeLines.push(line);
      }

      // Exit conditions for code blocks - only if we're not in aggressive mode
      if (!aggressive && inCodeBlock && line.trim() === '' &&
          ((codeLines.length > 5 && importBlockFound && reactComponentFound) || codeLines.length > 20)) {
        // If we have a blank line after collecting substantial code, exit
        // But only if we've found both import statements and a React component
        inCodeBlock = false;
      }
    }

    // Final verification - if we don't have both imports and a component definition, and we're not in aggressive mode, return empty
    if (!aggressive && (!importBlockFound || !reactComponentFound) && codeLines.length < 20) {
      return '';
    }

    return codeLines.join('\n').trim();
  }

  /**
   * Execute a single thinking step
   */
  private async executeThinkingStep(
    stage: UIGenerationStage,
    userRequirement: string,
    designContext?: string,
    promptTemplate?: string
  ): Promise<UIGenerationStepResult> {
    try {
      // Build the complete prompt
      const contextPrefix = designContext ? `${designContext}\n\n` : '';
      const systemPrefix = `${this.systemPrompt}\n\n`;
      const stagePrompt = this.getStagePrompt(stage);
      const specificPrompt = promptTemplate || stagePrompt;

      const fullPrompt = `${systemPrefix}${contextPrefix}UI Requirement: "${userRequirement}"\n\n${specificPrompt}\n\nThinking:`;

      // Generate reasoning with AI service, using extended timeout for reasoning operations
      const response = await aiService.generateText(fullPrompt, {}, true);
      const reasoning = response.response || "Unable to generate reasoning.";

      // Call the thinking update callback if provided
      if (this.onThinkingUpdate) {
        this.onThinkingUpdate(stage, reasoning);
      }

      // Calculate confidence based on response length and coherence
      const confidence = this.calculateConfidence(reasoning, stage);

      return {
        stage,
        prompt: specificPrompt,
        reasoning,
        confidence
      };
    } catch (error) {
      console.error(`Error in UI generation stage ${stage}:`, error);
      throw error;
    }
  }

  /**
   * Calculate confidence score based on response quality
   */
  private calculateConfidence(reasoning: string, stage: UIGenerationStage): number {
    // Simple heuristic for confidence based on response length and coherence
    const length = reasoning.length;

    // Very short responses are typically low confidence
    if (length < 50) return 0.3;

    // Medium length responses get a baseline confidence
    if (length < 200) return 0.6;

    // For code generation specifically, check for code markers
    if (stage === UIGenerationStage.CodeGeneration) {
      if (reasoning.includes('```') && reasoning.length > 500) return 0.9;
      if (reasoning.includes('import ') && reasoning.includes('export ')) return 0.8;
      return 0.6; // Default for code gen without good indicators
    }

    // Longer, more detailed responses get higher confidence
    return 0.8;
  }

  /**
   * Get the default prompt for a thinking stage
   */
  private getStagePrompt(stage: UIGenerationStage): string {
    switch (stage) {
      case UIGenerationStage.RequirementAnalysis:
        return 'What are the key requirements and constraints for this UI component? Does it need to integrate with Ollama AI models?';

      case UIGenerationStage.ComponentIdentification:
        return 'What type of UI component would best fulfill these requirements? Consider both standard components and specialized Ollama-integrated components.';

      case UIGenerationStage.StructurePlanning:
        return 'How should this component be structured? What subcomponents and state are needed? Consider any Ollama API integrations required.';

      case UIGenerationStage.StyleDetermination:
        return 'How should this component be styled using TailwindCSS? Include styles for AI processing states if needed.';

      case UIGenerationStage.CodeGeneration:
        return 'Generate the complete React/TypeScript code for this component, including any Ollama API integrations needed.';

      case UIGenerationStage.ErrorRecovery:
        return 'An error occurred. How can I recover and still provide a useful UI component? Consider a simplified version or fallback design.';

      default:
        return 'Analyze this UI requirement and provide your thoughts. Consider if AI service integration is needed.';
    }
  }

  /**
   * Determine component type from the identification reasoning
   */
  private determineComponentType(identificationReasoning: string): UIComponentType {
    const reasoning = identificationReasoning.toLowerCase();

    // First check for AI-specific component types
    if (reasoning.includes('aichat') || reasoning.includes('ai chat') ||
        (reasoning.includes('chat') && reasoning.includes('ai'))) {
      return UIComponentType.AIChat;
    }

    if (reasoning.includes('aiprompt') || reasoning.includes('ai prompt') ||
        (reasoning.includes('prompt') && reasoning.includes('ai'))) {
      return UIComponentType.AIPrompt;
    }

    if (reasoning.includes('aimodelselector') || reasoning.includes('ai model selector') ||
        (reasoning.includes('model') && reasoning.includes('selector') && reasoning.includes('ai'))) {
      return UIComponentType.AIModelSelector;
    }

    if (reasoning.includes('aistreamingoutput') || reasoning.includes('ai streaming') ||
        (reasoning.includes('streaming') && reasoning.includes('ai'))) {
      return UIComponentType.AIStreamingOutput;
    }

    if (reasoning.includes('aisettings') || reasoning.includes('ai settings') ||
        (reasoning.includes('settings') && reasoning.includes('ai'))) {
      return UIComponentType.AISettings;
    }

    // Then check for standard component types
    if (reasoning.includes('form') || reasoning.includes('input') || reasoning.includes('submit')) {
      return UIComponentType.Form;
    }

    if (reasoning.includes('table') || reasoning.includes('data grid') || reasoning.includes('rows and columns')) {
      return UIComponentType.Table;
    }

    if (reasoning.includes('card') || reasoning.includes('container') || reasoning.includes('box')) {
      return UIComponentType.Card;
    }

    if (reasoning.includes('navigation') || reasoning.includes('menu') || reasoning.includes('navbar')) {
      return UIComponentType.Navigation;
    }

    if (reasoning.includes('dashboard') || reasoning.includes('overview') || reasoning.includes('metrics')) {
      return UIComponentType.Dashboard;
    }

    if (reasoning.includes('chart') || reasoning.includes('graph') || reasoning.includes('visualization')) {
      return UIComponentType.Chart;
    }

    if (reasoning.includes('list') || reasoning.includes('items') || reasoning.includes('collection')) {
      return UIComponentType.List;
    }

    if (reasoning.includes('modal') || reasoning.includes('dialog') || reasoning.includes('popup')) {
      return UIComponentType.Modal;
    }

    if (reasoning.includes('layout') || reasoning.includes('grid') || reasoning.includes('structure')) {
      return UIComponentType.Layout;
    }

    return UIComponentType.Custom; // Default fallback
  }

  /**
   * Handle error recovery when a thinking step fails
   */
  private async handleErrorRecovery(
    userRequirement: string,
    error: any,
    designContext?: string
  ): Promise<UIGenerationStepResult> {
    try {
      console.log("Attempting error recovery for:", error);

      // Build prompt for error recovery
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const promptTemplate = `An error occurred while generating UI: "${errorMessage}".
How can I recover from this error and still provide a useful UI component for the requirement: "${userRequirement}"?
What's the most straightforward component I can generate that meets the core needs?`;

      // Build the complete prompt
      const contextPrefix = designContext ? `${designContext}\n\n` : '';
      const systemPrefix = `${this.systemPrompt}\n\n`;
      const fullPrompt = `${systemPrefix}${contextPrefix}UI Requirement: "${userRequirement}"\n\n${promptTemplate}\n\nThinking:`;

      // Generate reasoning with AI service with extended timeout and retry
      try {
        const response = await aiService.generateText(fullPrompt, {}, true);
        const reasoning = response.response || "Unable to generate reasoning due to an error. The best approach is to create a simple version of the requested component with minimal functionality.";

        // Call the thinking update callback if provided
        if (this.onThinkingUpdate) {
          this.onThinkingUpdate(UIGenerationStage.ErrorRecovery, reasoning);
        }

        return {
          stage: UIGenerationStage.ErrorRecovery,
          prompt: promptTemplate,
          reasoning,
          confidence: 0.6 // Moderate confidence for recovery
        };
      } catch (retryError) {
        // If even the recovery fails, use a fallback response
        console.error("Error recovery generation failed:", retryError);
        return {
          stage: UIGenerationStage.ErrorRecovery,
          prompt: promptTemplate,
          reasoning: "After encountering an error, I couldn't complete the UI generation process. The best approach is to provide a minimal placeholder component that can be expanded upon manually.",
          confidence: 0.4
        };
      }
    } catch (innerError) {
      // Fallback if even error recovery setup fails
      console.error('Fatal error in error recovery process:', innerError);
      return {
        stage: UIGenerationStage.ErrorRecovery,
        prompt: 'Error recovery failed',
        reasoning: 'Unable to generate UI component due to system error. Consider creating a simple placeholder component manually.',
        confidence: 0.3
      };
    }
  }

  /**
   * Get the most recent generation process
   */
  public getLatestGenerationProcess(): UIGenerationProcess | undefined {
    if (this.generationProcesses.length === 0) return undefined;
    return this.generationProcesses[this.generationProcesses.length - 1];
  }

  /**
   * Get all generation processes
   */
  public getAllGenerationProcesses(): UIGenerationProcess[] {
    return this.generationProcesses;
  }
}

// Create a singleton instance
export const uiGeneratorReasoningEngine = new UIGeneratorReasoningEngine();