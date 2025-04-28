import { TaskType } from "./task-manager";
import { aiService } from "./ai-service";

/**
 * Thinking process stages
 */
export enum ThinkingStage {
  IntentUnderstanding = 'intent_understanding',
  TaskClassification = 'task_classification',
  ExecutionPlanning = 'execution_planning',
  ResponseFormulation = 'response_formulation',
  ErrorRecovery = 'error_recovery'
}

/**
 * Result of a thinking step
 */
export interface ThinkingStepResult {
  stage: ThinkingStage;
  prompt: string;
  reasoning: string;
  confidence: number; // 0-1 confidence score
}

/**
 * A complete thinking process
 */
export interface ThinkingProcess {
  userMessage: string;
  steps: ThinkingStepResult[];
  taskType: TaskType;
  taskPlan?: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // Duration in ms
}

/**
 * Reasoning Engine - Handles the step-by-step thinking process for the agent
 */
export class ReasoningEngine {
  // Using aiService for model management
  private thinkingProcesses: ThinkingProcess[] = [];
  private systemPrompt = `You are Mash, an AI assistant specialized in machine learning tasks.
You analyze user requests carefully, understand intent, and take immediate action.
When a user asks about data, models, or system status, prioritize direct retrieval of information.
Avoid asking clarifying questions when you can reasonably infer what the user wants.
Aim to provide concrete, helpful responses that directly address the user's needs.`;

  constructor(modelName?: string) {
    if (modelName) {
      aiService.setCurrentModel(modelName);
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
   * Execute a complete thinking process for a user message
   */
  public async think(userMessage: string, conversationContext?: string): Promise<ThinkingProcess> {
    const thinkingProcess: ThinkingProcess = {
      userMessage,
      steps: [],
      taskType: TaskType.Unknown,
      startTime: new Date()
    };

    this.thinkingProcesses.push(thinkingProcess);

    try {
      // Step 1: Understand user intent with bias toward action
      const intentStep = await this.executeThinkingStep(
        ThinkingStage.IntentUnderstanding,
        userMessage,
        conversationContext,
        `Analyze the user's message: "${userMessage}"
Identify their primary intent and what specific action they want taken.
Assume they want direct information rather than clarification when reasonable.
For example, if they ask about datasets, assume they want to see their datasets.
What does the user want me to do? What information do they need?`
      );
      thinkingProcess.steps.push(intentStep);

      // Step 2: Classify the task type with action-oriented instruction
      const classificationStep = await this.executeThinkingStep(
        ThinkingStage.TaskClassification,
        userMessage,
        conversationContext,
        `Based on your understanding of the user's intent: "${intentStep.reasoning.slice(0, 200)}...", classify this request into one of these categories:
1. General conversation - the user wants to chat or ask a general question
2. Dataset management - the user wants to work with datasets (list, create, upload, etc.)
3. Model training - the user wants to train or fine-tune a model
4. Model deployment - the user wants to deploy a model
5. Model inference - the user wants to use a model to generate text or get predictions
6. System check - the user is asking about system status or connections

Which category best fits this request? Choose the most specific category that matches their intent.
DON'T default to general conversation if a more specific category applies.
If they mention datasets, models, or system status, always choose the corresponding specific category.`
      );
      thinkingProcess.steps.push(classificationStep);

      // Determine task type
      thinkingProcess.taskType = this.determineTaskType(classificationStep.reasoning);

      // Step 3: Plan execution with action bias
      const planningStep = await this.executeThinkingStep(
        ThinkingStage.ExecutionPlanning,
        userMessage,
        conversationContext,
        `Now that we've classified this as a ${thinkingProcess.taskType} task, develop a detailed plan to fulfill the user's request.
What API calls or operations will we need? What data do we need to gather? What potential issues might arise?

Create a step-by-step plan with clear actions, prioritizing:
1. Direct API calls to get the information immediately
2. Clear presentation of results without unnecessary explanations
3. Immediate responses with data rather than asking clarifying questions

For example, if the user asked about datasets, your plan should include immediately listing their datasets.`
      );
      thinkingProcess.steps.push(planningStep);
      thinkingProcess.taskPlan = planningStep.reasoning;

      // Step 4: Response formulation will be done after executing the plan

      // Complete the thinking process
      thinkingProcess.endTime = new Date();
      thinkingProcess.duration = thinkingProcess.endTime.getTime() - thinkingProcess.startTime.getTime();

      return thinkingProcess;
    } catch (error) {
      // Add error recovery if thinking process fails
      const errorStep = await this.handleErrorRecovery(userMessage, error, conversationContext);
      thinkingProcess.steps.push(errorStep);

      // Complete the thinking process with error state
      thinkingProcess.endTime = new Date();
      thinkingProcess.duration = thinkingProcess.endTime.getTime() - thinkingProcess.startTime.getTime();

      return thinkingProcess;
    }
  }

  /**
   * Execute final response formulation after executing the task
   */
  public async formulateResponse(
    thinkingProcess: ThinkingProcess,
    apiResults: any[],
    conversationContext?: string
  ): Promise<ThinkingStepResult> {
    try {
      // Create a detailed summary of API results for better responses
      const apiResultsSummary = this.formatApiResultsForResponse(apiResults);

      // Build the complete prompt with heavy action bias
      const contextPrefix = conversationContext ? `${conversationContext}\n\n` : '';
      const systemPrefix = `${this.systemPrompt}\n\n`;
      const promptTemplate = `Based on the user's request: "${thinkingProcess.userMessage}" and the information we've gathered:

API Results:
${apiResultsSummary}

Formulate a direct, informative response that presents the requested information immediately.
Your response should:
1. Start with the most relevant data or results rather than explanations
2. Present lists, tables, or structured data when available
3. Be conversational but prioritize information over chat
4. AVOID asking clarifying questions when data is available
5. Only ask for clarification if absolutely no relevant data was found

For dataset requests: Show the list of datasets directly.
For model requests: Display available models with key details.
For status requests: Present system status immediately.

Do include phrases like "I checked and found" or "Here's what I found" - present the information directly and informative.`;

      const fullPrompt = `${systemPrefix}${contextPrefix}${promptTemplate}\n\nResponse:`;

      // Generate response with AI service, using extended timeout
      const response = await aiService.generateText(fullPrompt, {}, true);
      const reasoning = response.response || "I apologize, but I'm having trouble formulating a response right now. Could you please try again?";

      const responseStep: ThinkingStepResult = {
        stage: ThinkingStage.ResponseFormulation,
        prompt: promptTemplate,
        reasoning,
        confidence: this.calculateConfidence(reasoning, ThinkingStage.ResponseFormulation)
      };

      // Add to the thinking process
      thinkingProcess.steps.push(responseStep);

      // Update end time
      thinkingProcess.endTime = new Date();
      thinkingProcess.duration = thinkingProcess.endTime.getTime() - thinkingProcess.startTime.getTime();

      return responseStep;
    } catch (error) {
      console.error('Error in response formulation:', error);

      // Attempt to create a fallback response based on API results
      try {
        const fallbackResponse = this.createFallbackResponse(thinkingProcess, apiResults);
        return {
          stage: ThinkingStage.ResponseFormulation,
          prompt: 'Fallback response creation',
          reasoning: fallbackResponse,
          confidence: 0.5
        };
      } catch (fallbackError) {
        console.error('Error creating fallback response:', fallbackError);

        // Ultimate fallback response
        return {
          stage: ThinkingStage.ResponseFormulation,
          prompt: 'Response formulation failed',
          reasoning: 'I apologize, but I encountered an issue while processing your request. Could you please try again or rephrase your question?',
          confidence: 0.3
        };
      }
    }
  }

  /**
   * Format API results into a detailed, structured summary for the LLM
   */
  private formatApiResultsForResponse(apiResults: any[]): string {
    if (!apiResults || apiResults.length === 0) {
      return "No API calls were made or all calls failed.";
    }

    let formattedResults = '';
    let hasBackendConnectionError = false;

    // First check system status to determine connectivity issues
    const systemStatusResult = apiResults.find(result => result.name === 'checkSystemStatus');
    if (systemStatusResult) {
      const { aiServiceConnected, backendConnected } = systemStatusResult.result || {};
      if (aiServiceConnected && !backendConnected) {
        hasBackendConnectionError = true;
        formattedResults += `IMPORTANT: Backend service is disconnected, but AI service is available. This means local AI models are working, but cloud features (datasets, deployments, etc.) are unavailable.\n\n`;
      } else if (!aiServiceConnected) {
        formattedResults += `IMPORTANT: AI service is disconnected. Local AI models are unavailable.\n\n`;
      }
    }

    // Process each API result
    apiResults.forEach(result => {
      formattedResults += `API Call: ${result.name}\n`;

      // Format based on API type
      switch (result.name) {
        case 'listDatasets':
          const datasets = result.result?.datasets || [];
          formattedResults += `Found ${datasets.length} datasets.\n`;

          if (datasets.length > 0) {
            datasets.forEach((ds: any, index: number) => {
              formattedResults += `Dataset ${index+1}: ${ds.name || 'Unnamed'} (ID: ${ds.id || 'unknown'})\n`;
              if (ds.description) formattedResults += `Description: ${ds.description}\n`;
              if (ds.records) formattedResults += `Records: ${ds.records}\n`;
            });
          } else {
            if (hasBackendConnectionError) {
              formattedResults += `No datasets available because backend service is disconnected.\n`;
            } else {
              formattedResults += `No datasets available.\n`;
            }
          }
          break;

        case 'listAIModels':
          const models = result.result?.models || [];
          formattedResults += `Found ${models.length} AI models.\n`;

          if (models.length > 0) {
            models.forEach((model: any, index: number) => {
              formattedResults += `Model ${index+1}: ${model.name || 'Unnamed'}\n`;
            });
          } else {
            formattedResults += `No AI models available.\n`;
          }
          break;

        case 'listFineTuningJobs':
          const jobs = result.result?.jobs || [];
          formattedResults += `Found ${jobs.length} fine-tuning jobs.\n`;

          if (jobs.length > 0) {
            jobs.forEach((job: any, index: number) => {
              formattedResults += `Job ${index+1}: ${job.name || job.id || 'Unnamed'}\n`;
              if (job.status) formattedResults += `Status: ${job.status}\n`;
              if (job.model) formattedResults += `Model: ${job.model}\n`;
            });
          } else {
            if (hasBackendConnectionError) {
              formattedResults += `No fine-tuning jobs available because backend service is disconnected.\n`;
            } else {
              formattedResults += `No fine-tuning jobs available.\n`;
            }
          }
          break;

        case 'listModelDeployments':
          const deployments = result.result?.deployments || [];
          formattedResults += `Found ${deployments.length} model deployments.\n`;

          if (deployments.length > 0) {
            deployments.forEach((deployment: any, index: number) => {
              formattedResults += `Deployment ${index+1}: ${deployment.name || deployment.id || 'Unnamed'}\n`;
              if (deployment.status) formattedResults += `Status: ${deployment.status}\n`;
              if (deployment.model) formattedResults += `Model: ${deployment.model}\n`;
            });
          } else {
            if (hasBackendConnectionError) {
              formattedResults += `No model deployments available because backend service is disconnected.\n`;
            } else {
              formattedResults += `No model deployments available.\n`;
            }
          }
          break;

        case 'checkSystemStatus':
          formattedResults += `AI service connected: ${result.result?.aiServiceConnected ? 'Yes' : 'No'}\n`;
          formattedResults += `Backend connected: ${result.result?.backendConnected ? 'Yes' : 'No'}\n`;
          break;

        default:
          // Generic formatting for other API calls
          formattedResults += `Result: ${JSON.stringify(result.result).slice(0, 200)}...\n`;
      }

      formattedResults += '\n';
    });

    return formattedResults;
  }

  /**
   * Create a fallback response based on available API results when LLM response fails
   */
  private createFallbackResponse(thinkingProcess: ThinkingProcess, apiResults: any[]): string {
    // Check system status first to handle connection issues
    const statusCall = apiResults.find(call => call.name === 'checkSystemStatus');
    let aiServiceConnected = true;
    let backendConnected = true;

    if (statusCall) {
      aiServiceConnected = statusCall.result?.aiServiceConnected || false;
      backendConnected = statusCall.result?.backendConnected || false;
    }

    // If backend is disconnected but AI service is available, acknowledge this specifically
    if (aiServiceConnected && !backendConnected) {
      let response = "I'm currently experiencing connection issues with the cloud backend, but I can still help you with local AI tasks. ";

      // Add context based on what they were trying to do
      switch (thinkingProcess.taskType) {
        case TaskType.DatasetManagement:
          response += "Unfortunately, I can't access your datasets at the moment due to the backend connection issue. You can still use me  for conversation and text generation.";
          break;

        case TaskType.ModelTraining:
          response += "I can't access training features at the moment due to the backend connection issue. However, you can still use the local models that are already available on your system.";
          break;

        case TaskType.ModelDeployment:
          response += "I can't access deployment features at the moment due to the backend connection issue. However, you can still use the local models available through Ollama.";
          break;

        case TaskType.ModelInference:
          // For inference, we can still show available AI models
          const modelCall = apiResults.find(call => call.name === 'listAIModels');
          if (modelCall && modelCall.result?.models?.length > 0) {
            const models = modelCall.result.models;
            response += "I can still help you with text generation using your local AI models. Here are the available models:\n\n";
            models.forEach((model: any, index: number) => {
              response += `${index+1}. ${model.name || 'Unnamed model'}\n`;
            });
          } else {
            response += "You can still use local AI models for text generation, though I couldn't retrieve the list of available models.";
          }
          break;

        default:
          response += "While cloud features like datasets and deployments are unavailable, I can still help answer questions and generate text using local models.";
      }

      return response;
    }

    // If AI service is not connected, this is a bigger issue
    if (!aiServiceConnected) {
      return "I'm currently unable to connect to the AI service, which means I can't generate responses. Please check your connection and try again.";
    }

    // Default fallback
    let response = "Here's the information you requested:";

    // Try to build a response based on the task type and API results
    switch (thinkingProcess.taskType) {
      case TaskType.DatasetManagement:
        const datasetCall = apiResults.find(call => call.name === 'listDatasets');
        if (datasetCall) {
          const datasets = datasetCall.result?.datasets || [];
          if (datasets.length > 0) {
            response = "Here are your datasets:\n\n";
            datasets.forEach((ds: any, index: number) => {
              response += `${index+1}. ${ds.name || 'Unnamed dataset'}\n`;
            });
          } else {
            response = !backendConnected
              ? "I can't access your datasets right now due to a backend connection issue. Please check your internet connection and try again later."
              : "You don't have any datasets available yet. Would you like to upload one?";
          }
        }
        break;

      case TaskType.ModelInference:
        const modelCall = apiResults.find(call => call.name === 'listAIModels');
        if (modelCall) {
          const models = modelCall.result?.models || [];
          if (models.length > 0) {
            response = "Here are the available models:\n\n";
            models.forEach((model: any, index: number) => {
              response += `${index+1}. ${model.name || 'Unnamed model'}\n`;
            });
          } else {
            response = "There are no models available for inference. Please check your AI service connection.";
          }
        }
        break;

      case TaskType.SystemCheck:
        response = "System Status:\n\n";
        response += `AI service: ${aiServiceConnected ? '✅ Connected' : '❌ Disconnected'}\n`;
        response += `Backend service: ${backendConnected ? '✅ Connected' : '❌ Disconnected'}\n\n`;

        if (!backendConnected) {
          response += "The backend service is currently unavailable. This means features like datasets, fine-tuning, and deployments won't work. However, you can still use local AI models for text generation and conversations.";
        }
        break;

      default:
        if (apiResults.length > 0) {
          // Improved generic response that doesn't use "I found some information"
          response = backendConnected
            ? "Here's what I've gathered based on your request:\n\n"
            : "While I'm having trouble connecting to the backend, I can still help with some local information:\n\n";

          // Only include relevant results, not raw JSON
          const relevantResults = apiResults.filter(r =>
            r.name !== 'apiCallError' &&
            r.name !== 'checkSystemStatus'
          );

          if (relevantResults.length > 0) {
            relevantResults.forEach(result => {
              switch (result.name) {
                case 'listAIModels':
                  const models = result.result?.models || [];
                  if (models.length > 0) {
                    response += "Available AI models:\n";
                    models.slice(0, 5).forEach((model: any) =>
                      response += `- ${model.name}\n`
                    );
                    if (models.length > 5) response += `- And ${models.length - 5} more...\n`;
                  }
                  break;
                // Add other specific formatters as needed
                default:
                  // Don't include raw JSON in the response
                  break;
              }
            });
          } else {
            response = backendConnected
              ? "I processed your request but couldn't find any specific information to share."
              : "I'm currently experiencing backend connection issues. I can help with local AI tasks, but cloud features are unavailable at the moment.";
          }
        } else {
          response = backendConnected
            ? "I processed your request but couldn't find any relevant information."
            : "I'm currently experiencing backend connection issues. I can help with local AI tasks, but cloud features are unavailable at the moment.";
        }
    }

    return response;
  }

  /**
   * Execute a single thinking step
   */
  private async executeThinkingStep(
    stage: ThinkingStage,
    userMessage: string,
    conversationContext?: string,
    promptTemplate?: string
  ): Promise<ThinkingStepResult> {
    try {
      // Build the complete prompt
      const contextPrefix = conversationContext ? `${conversationContext}\n\n` : '';
      const systemPrefix = `${this.systemPrompt}\n\n`;
      const stagePrompt = this.getStagePrompt(stage);
      const specificPrompt = promptTemplate || stagePrompt;

      const fullPrompt = `${systemPrefix}${contextPrefix}User Message: "${userMessage}"\n\n${specificPrompt}\n\nThinking:`;

      // Generate reasoning with AI service, using extended timeout for reasoning operations
      const response = await aiService.generateText(fullPrompt, {}, true);
      const reasoning = response.response || "Unable to generate reasoning.";

      // Calculate confidence based on response length and coherence
      const confidence = this.calculateConfidence(reasoning, stage);

      return {
        stage,
        prompt: specificPrompt,
        reasoning,
        confidence
      };
    } catch (error) {
      console.error(`Error in thinking stage ${stage}:`, error);
      throw error;
    }
  }

  /**
   * Calculate confidence score based on response quality
   */
  private calculateConfidence(reasoning: string, stage: ThinkingStage): number {
    // Simple heuristic for confidence based on response length and coherence
    const length = reasoning.length;

    // Very short responses are typically low confidence
    if (length < 50) return 0.3;

    // Medium length responses get a baseline confidence
    if (length < 200) return 0.6;

    // Longer, more detailed responses get higher confidence
    return 0.9;
  }

  /**
   * Get the default prompt for a thinking stage
   */
  private getStagePrompt(stage: ThinkingStage): string {
    switch (stage) {
      case ThinkingStage.IntentUnderstanding:
        return 'What is the user asking for? What is their primary intent?';

      case ThinkingStage.TaskClassification:
        return 'What type of task is this? Classify the request into a specific category.';

      case ThinkingStage.ExecutionPlanning:
        return 'How should I fulfill this request? What steps need to be taken?';

      case ThinkingStage.ResponseFormulation:
        return 'Based on all the information gathered, what is the best response to the user?';

      case ThinkingStage.ErrorRecovery:
        return 'An error occurred. How can I recover and still provide a helpful response?';

      default:
        return 'Analyze this message and provide your thoughts.';
    }
  }

  /**
   * Determine task type from the classification reasoning
   */
  private determineTaskType(classificationReasoning: string): TaskType {
    const reasoning = classificationReasoning.toLowerCase();

    // Check for simple greetings first
    const greetingPatterns = [
      'just saying hi',
      'just greeting',
      'simple greeting',
      'saying hello',
      'greeting the assistant',
      'just a greeting'
    ];

    if (greetingPatterns.some(pattern => reasoning.includes(pattern))) {
      return TaskType.Conversation;
    }

    if (reasoning.includes('conversation') || reasoning.includes('general question') || reasoning.includes('chat')) {
      return TaskType.Conversation;
    }

    if (reasoning.includes('dataset') || reasoning.includes('data')) {
      return TaskType.DatasetManagement;
    }

    if (reasoning.includes('train') || reasoning.includes('fine-tune') || reasoning.includes('finetune')) {
      return TaskType.ModelTraining;
    }

    if (reasoning.includes('deploy') || reasoning.includes('serve') || reasoning.includes('publish')) {
      return TaskType.ModelDeployment;
    }

    if (reasoning.includes('inference') || reasoning.includes('generat') || reasoning.includes('predict')) {
      return TaskType.ModelInference;
    }

    if (reasoning.includes('status') || reasoning.includes('system') || reasoning.includes('check') || reasoning.includes('connection')) {
      return TaskType.SystemCheck;
    }

    return TaskType.Conversation; // Default fallback
  }

  /**
   * Handle error recovery when a thinking step fails
   */
  private async handleErrorRecovery(
    userMessage: string,
    error: any,
    conversationContext?: string
  ): Promise<ThinkingStepResult> {
    try {
      console.log("Attempting error recovery for:", error);

      // Build prompt for error recovery
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const promptTemplate = `An error occurred while processing: "${errorMessage}".
How can I recover from this error and still provide a helpful response to the user's request: "${userMessage}"?
What's the most graceful way to handle this situation?`;

      // Build the complete prompt
      const contextPrefix = conversationContext ? `${conversationContext}\n\n` : '';
      const systemPrefix = `${this.systemPrompt}\n\n`;
      const fullPrompt = `${systemPrefix}${contextPrefix}User Message: "${userMessage}"\n\n${promptTemplate}\n\nThinking:`;

      // Generate reasoning with AI service with extended timeout and retry
      try {
        const response = await aiService.generateText(fullPrompt, {}, true);
        const reasoning = response.response || "Unable to generate reasoning due to an error. The best approach is to acknowledge the issue and provide a general response.";

        return {
          stage: ThinkingStage.ErrorRecovery,
          prompt: promptTemplate,
          reasoning,
          confidence: 0.6 // Moderate confidence for recovery
        };
      } catch (retryError) {
        // If even the recovery fails, use a fallback response
        console.error("Error recovery generation failed:", retryError);
        return {
          stage: ThinkingStage.ErrorRecovery,
          prompt: promptTemplate,
          reasoning: "After encountering an error, I couldn't complete the reasoning process. The best approach is to apologize to the user for the technical issue and suggest trying again with a simpler request.",
          confidence: 0.4
        };
      }
    } catch (innerError) {
      // Fallback if even error recovery setup fails
      console.error('Fatal error in error recovery process:', innerError);
      return {
        stage: ThinkingStage.ErrorRecovery,
        prompt: 'Error recovery failed',
        reasoning: 'Unable to process due to system error. The best course of action is to provide a simple response acknowledging the issue and asking the user to try again.',
        confidence: 0.3
      };
    }
  }

  /**
   * Get the most recent thinking process
   */
  public getLatestThinkingProcess(): ThinkingProcess | undefined {
    if (this.thinkingProcesses.length === 0) return undefined;
    return this.thinkingProcesses[this.thinkingProcesses.length - 1];
  }

  /**
   * Get all thinking processes
   */
  public getAllThinkingProcesses(): ThinkingProcess[] {
    return this.thinkingProcesses;
  }
}

// Create a singleton instance
export const reasoningEngine = new ReasoningEngine();

/**
 * Determine if a user message is a knowledge query about Artintel
 */
export function detectKnowledgeQueryType(userMessage: string): string | null {
  const normalizedMessage = userMessage.toLowerCase();
  
  // Check for platform information queries
  if (
    normalizedMessage.includes('what is artintel') ||
    normalizedMessage.includes('about artintel') ||
    normalizedMessage.includes('tell me about artintel') ||
    normalizedMessage.includes('artintel platform') ||
    normalizedMessage.includes('platform overview')
  ) {
    return 'platform_overview';
  }
  
  // Check for feature queries
  if (
    normalizedMessage.includes('features') ||
    normalizedMessage.includes('what can artintel do') ||
    normalizedMessage.includes('capabilities') ||
    normalizedMessage.includes('what does artintel offer') ||
    normalizedMessage.includes('how does artintel work')
  ) {
    return 'features';
  }
  
  // Check for pricing tier queries
  if (
    normalizedMessage.includes('pricing') ||
    normalizedMessage.includes('tiers') ||
    normalizedMessage.includes('subscription') ||
    normalizedMessage.includes('how much does it cost') ||
    normalizedMessage.includes('free tier') ||
    normalizedMessage.includes('pro tier') ||
    normalizedMessage.includes('enterprise tier')
  ) {
    return 'pricing_tiers';
  }
  
  // Check for model type queries
  if (
    normalizedMessage.includes('models') ||
    normalizedMessage.includes('slm') ||
    normalizedMessage.includes('llm') ||
    normalizedMessage.includes('small language model') ||
    normalizedMessage.includes('large language model') ||
    normalizedMessage.includes('model difference') ||
    normalizedMessage.includes('which model')
  ) {
    return 'model_types';
  }
  
  // Check for industry-specific queries
  if (
    normalizedMessage.includes('industry') ||
    normalizedMessage.includes('healthcare') ||
    normalizedMessage.includes('finance') ||
    normalizedMessage.includes('legal') ||
    normalizedMessage.includes('retail') ||
    normalizedMessage.includes('e-commerce') ||
    normalizedMessage.includes('ecommerce')
  ) {
    return 'industries';
  }
  
  // Check for best practices queries
  if (
    normalizedMessage.includes('best practice') ||
    normalizedMessage.includes('best way to') ||
    normalizedMessage.includes('recommended way') ||
    normalizedMessage.includes('how should i') ||
    normalizedMessage.includes('tips for') ||
    normalizedMessage.includes('advice on')
  ) {
    return 'best_practices';
  }
  
  // Not a knowledge query
  return null;
}