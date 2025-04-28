import { checkBackendConnection, listDatasets, listFineTuningJobs, listModelDeployments } from "../api-service";
import { reasoningEngine, ThinkingProcess } from "./reasoning-engine";
import { aiService, AIServiceStatus } from "./ai-service";

/**
 * Task types that the agent can execute
 */
export enum TaskType {
  Conversation = 'conversation',
  DatasetManagement = 'dataset',
  ModelTraining = 'training',
  ModelDeployment = 'deployment',
  ModelInference = 'inference',
  SystemCheck = 'system_check',
  Unknown = 'unknown'
}

/**
 * Status of system connections
 */
export interface SystemStatus {
  aiServiceConnected: boolean;
  backendConnected: boolean;
}

/**
 * A step in the reasoning process
 */
export interface ReasoningStep {
  step: string;
  output: string;
}

/**
 * Task execution state
 */
export interface TaskState {
  id: string;
  type: TaskType;
  status: 'pending' | 'in_progress' | 'complete' | 'error';
  message?: string;
  reasoning: ReasoningStep[];
  apiCalls: { name: string, result: any }[];
  startedAt: Date;
  completedAt?: Date;
  thinkingProcess?: ThinkingProcess; // New field for detailed thinking
}

/**
 * Message model for communication
 */
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Manages task execution and thinking process for the AI agent
 */
export class TaskManager {
  private tasks: TaskState[] = [];
  private systemStatus: SystemStatus = {
    aiServiceConnected: false,
    backendConnected: false,
  };
  private conversationHistory: Message[] = [];
  private llmModel: string = 'llama2:7b'; // Default LLM model

  /**
   * Initialize the task manager
   */
  constructor() {}

  /**
   * Get the current system status
   */
  public async checkSystemStatus(): Promise<SystemStatus> {
    try {
      // Check AI service connection
      const aiStatus = await aiService.checkConnection(true);
      this.systemStatus.aiServiceConnected = aiStatus.connected;

      // Check backend connection
      this.systemStatus.backendConnected = await checkBackendConnection();

      return this.systemStatus;
    } catch (error) {
      console.error('Error checking system status:', error);
      return this.systemStatus;
    }
  }

  /**
   * Add conversation history for context
   */
  public addToConversationHistory(message: Message): void {
    this.conversationHistory.push(message);

    // Keep last 10 messages for context
    if (this.conversationHistory.length > 10) {
      this.conversationHistory = this.conversationHistory.slice(-10);
    }
  }

  /**
   * Get conversation history for context
   */
  public getConversationContext(): string {
    return this.conversationHistory
      .map(msg => `${msg.role === 'user' ? 'Human' : msg.role === 'system' ? 'System' : 'Assistant'}: ${msg.content}`)
      .join('\n');
  }

  /**
   * Process a user message through multiple thinking steps
   * Using the enhanced reasoning engine for improved results
   * @param userMessage The user's message to process
   * @param options Processing options (mode, showThinking, taskType)
   */
  public async processUserMessage(userMessage: string, options?: string | { mode?: string; showThinking?: boolean; taskType?: string }): Promise<TaskState> {
    // Parse options if provided as a string (for backward compatibility)
    let processingMode = 'agent';
    let showThinking = true;
    let detectedTaskType = null;
    
    if (options) {
      if (typeof options === 'string') {
        processingMode = options;
      } else {
        processingMode = options.mode || 'agent';
        showThinking = options.showThinking !== undefined ? options.showThinking : true;
        detectedTaskType = options.taskType || null;
      }
    }

    console.log(`Processing message in ${processingMode} mode. Show thinking: ${showThinking}`);
    
    // Create a new task
    const taskId = `task-${Date.now()}`;
    const task: TaskState = {
      id: taskId,
      type: TaskType.Unknown,
      status: 'pending',
      reasoning: [],
      apiCalls: [],
      startedAt: new Date(),
    };

    this.tasks.push(task);

    // Start processing
    task.status = 'in_progress';

    try {
      // Get conversation context for reasoning
      const conversationContext = this.getConversationContext();

      // Check for direct API request patterns first (for more responsive UX)
      const lowerCaseMessage = userMessage.toLowerCase();

      // Check for simple greetings first to avoid unnecessary system checks
      if (this.isSimpleGreeting(lowerCaseMessage)) {
        console.log("Simple greeting detected, treating as conversation");
        task.type = TaskType.Conversation;
        task.reasoning.push({
          step: 'direct_greeting',
          output: 'User sent a simple greeting. Responding conversationally without system checks.'
        });

        // Add a more detailed response for greetings
        task.reasoning.push({
          step: 'response_formulation',
          output: 'Hello! Welcome to Artintel. I can help you discover, fine-tune, and deploy language models. If you need more advanced assistance with model selection or fine-tuning workflows, consider switching to agent mode. How can I help you today?'
        });

        task.status = 'complete';
        task.completedAt = new Date();
        return task;
      }

      // Fast path for common direct requests (skip reasoning engine)
      if (this.isDatasetListRequest(lowerCaseMessage)) {
        console.log("Direct dataset list request detected, skipping reasoning");
        task.type = TaskType.DatasetManagement;
        await this.executeApiCalls(task, userMessage);

        // Add a simple reasoning step for tracking
        task.reasoning.push({
          step: 'direct_request',
          output: 'User directly requested to list datasets. Fetched dataset information from the API.'
        });

        // Complete with minimal reasoning
        const respStep = this.simpleResponseFormulation(task, userMessage, conversationContext);
        task.reasoning.push(respStep);
        task.status = 'complete';
        task.completedAt = new Date();
        return task;
      }

      // If we're in chat mode with a detected task type, use a more directed system prompt
      if (processingMode === 'chat' && detectedTaskType) {
        reasoningEngine.setSystemPrompt(this.getTaskSpecificPrompt(detectedTaskType));
      }

      // Use the enhanced reasoning engine for detailed thinking
      const thinkingProcess = await reasoningEngine.think(userMessage, conversationContext);
      task.thinkingProcess = thinkingProcess;

      // If we have a detected task type, override the reasoning engine's detection
      if (detectedTaskType) {
        switch (detectedTaskType) {
          case 'platform_overview':
          case 'features':
          case 'pricing_tiers':
          case 'model_types':
          case 'industries':
          case 'best_practices':
            // Knowledge-based queries
            task.type = TaskType.Conversation;
            break;
          case 'fine-tuning':
            task.type = TaskType.ModelTraining;
            break;
          case 'deployment':
            task.type = TaskType.ModelDeployment;
            break;
          case 'model-selection':
            task.type = TaskType.ModelInference;
            break;
          default:
            // Use the detected type from the reasoning engine
            task.type = thinkingProcess.taskType;
        }
      } else {
        // Update task type based on reasoning engine result
        task.type = thinkingProcess.taskType;
      }

      // Add reasoning steps to task for tracking
      thinkingProcess.steps.forEach((step) => {
        task.reasoning.push({
          step: step.stage,
          output: step.reasoning
        });
      });

      // Execute API calls based on the task type
      await this.executeApiCalls(task, userMessage);

      // Formulate a response using the reasoning engine
      const responseResult = await reasoningEngine.formulateResponse(
        thinkingProcess,
        task.apiCalls,
        conversationContext
      );

      // Add the response formulation to the reasoning steps
      task.reasoning.push({
        step: 'response_formulation',
        output: responseResult.reasoning
      });

      // Complete the task
      task.status = 'complete';
      task.completedAt = new Date();

      return task;
    } catch (error) {
      console.error('Error processing message:', error);
      task.status = 'error';
      task.message = error instanceof Error ? error.message : 'Unknown error occurred';
      return task;
    }
  }

  /**
   * Check if the user message is a simple greeting
   * This prevents unnecessary system checks for basic greetings
   */
  private isSimpleGreeting(message: string): boolean {
    const greetingPatterns = [
      /^hi$/i,
      /^hello$/i,
      /^hey$/i,
      /^hi there$/i,
      /^hello there$/i,
      /^greetings$/i,
      /^howdy$/i,
      /^good morning$/i,
      /^good afternoon$/i,
      /^good evening$/i
    ];

    return greetingPatterns.some(pattern => pattern.test(message.trim()));
  }

  /**
   * Check if the user message is directly asking for dataset listing
   * This is a simple pattern matching approach for direct access
   */
  private isDatasetListRequest(message: string): boolean {
    const datasetListPatterns = [
      'list datasets',
      'show datasets',
      'what datasets',
      'my datasets',
      'available datasets',
      'all datasets',
      'show my datasets',
      'list my datasets',
      'get datasets'
    ];

    return datasetListPatterns.some(pattern => message.includes(pattern));
  }

  /**
   * Create a simple response for direct API requests
   */
  private simpleResponseFormulation(
    task: TaskState,
    userMessage: string,
    conversationContext?: string
  ): { step: string, output: string } {
    // Handle dataset listing
    if (task.type === TaskType.DatasetManagement) {
      const datasetCall = task.apiCalls.find(call => call.name === 'listDatasets');

      if (datasetCall) {
        const datasets = datasetCall.result.datasets || [];

        if (datasets.length > 0) {
          const datasetList = datasets.map((ds: any) => `- ${ds.name || 'Unnamed dataset'} (ID: ${ds.id})`).join('\n');
          return {
            step: 'response_formulation',
            output: `Here are your datasets:\n${datasetList}\n\nIs there anything specific you'd like to know about these datasets?`
          };
        } else {
          return {
            step: 'response_formulation',
            output: "I checked our system and you don't have any datasets available yet. Would you like to upload a new dataset?"
          };
        }
      }
    }

    // Default fallback - should not normally reach here
    return {
      step: 'response_formulation',
      output: "I've processed your request and gathered the information you asked for."
    };
  }

  /**
   * Execute API calls based on task type
   */
  private async executeApiCalls(task: TaskState, userMessage: string): Promise<void> {
    console.log(`Executing API calls for task type: ${task.type}`);

    // Check system status if not already checked
    if (!this.systemStatus.aiServiceConnected && !this.systemStatus.backendConnected) {
      await this.checkSystemStatus();
    }

    try {
      // Always attempt to update connection status
      const systemStatus = await this.checkSystemStatus();
      task.apiCalls.push({
        name: 'checkSystemStatus',
        result: systemStatus
      });

      switch (task.type) {
        case TaskType.Conversation:
          // For conversation, just make sure AI service is available
          if (!this.systemStatus.aiServiceConnected) {
            throw new Error("Cannot generate conversation response: AI service is not connected");
          }
          break;

        case TaskType.SystemCheck:
          // Additional system check info
          if (this.systemStatus.backendConnected) {
            try {
              // Get available models from backend
              const models = await listModels();
              task.apiCalls.push({
                name: 'listModels',
                result: models
              });
            } catch (error) {
              console.error('Error listing models:', error);
            }
          }
          break;

        case TaskType.DatasetManagement:
          // Always try to get datasets for dataset-related tasks
          try {
            const datasets = await listDatasets();
            task.apiCalls.push({
              name: 'listDatasets',
              result: datasets
            });

            console.log('Datasets retrieved:', datasets);
          } catch (error) {
            console.error('Error listing datasets:', error);
            task.apiCalls.push({
              name: 'listDatasets',
              result: {
                error: 'Failed to list datasets',
                details: error instanceof Error ? error.message : 'Unknown error',
                datasets: [] // Add empty array for consistent handling
              }
            });
          }
          break;

        case TaskType.ModelTraining:
          // Try to gather all relevant information for training tasks
          try {
            // Get datasets
            const datasets = await listDatasets();
            task.apiCalls.push({
              name: 'listDatasets',
              result: datasets
            });

            // Get fine-tuning jobs
            const jobs = await listFineTuningJobs();
            task.apiCalls.push({
              name: 'listFineTuningJobs',
              result: jobs
            });

            // Get available models
            if (this.systemStatus.aiServiceConnected) {
              const models = await aiService.getModels();
              task.apiCalls.push({
                name: 'listAIModels',
                result: { models }
              });
            }
          } catch (error) {
            console.error('Error getting training information:', error);
            task.apiCalls.push({
              name: 'getTrainingInfo',
              result: {
                error: 'Failed to get training information',
                details: error instanceof Error ? error.message : 'Unknown error'
              }
            });
          }
          break;

        case TaskType.ModelDeployment:
          // Gather all deployment-related information
          try {
            // Get fine-tuning jobs
            const jobs = await listFineTuningJobs();
            task.apiCalls.push({
              name: 'listFineTuningJobs',
              result: jobs
            });

            // Get current deployments
            const deployments = await listModelDeployments();
            task.apiCalls.push({
              name: 'listModelDeployments',
              result: deployments
            });

            // Get available models for deployment
            const models = await listModels();
            task.apiCalls.push({
              name: 'listModels',
              result: models
            });
          } catch (error) {
            console.error('Error getting deployment information:', error);
            task.apiCalls.push({
              name: 'getDeploymentInfo',
              result: {
                error: 'Failed to get deployment information',
                details: error instanceof Error ? error.message : 'Unknown error'
              }
            });
          }
          break;

        case TaskType.ModelInference:
          // Get all models available for inference
          let models = [];

          // Try AI service models first
          if (this.systemStatus.aiServiceConnected) {
            try {
              const aiModels = await aiService.getModels();
              models = aiModels || [];
              task.apiCalls.push({
                name: 'listAIModels',
                result: { models }
              });
            } catch (error) {
              console.error('Error listing AI models:', error);
              task.apiCalls.push({
                name: 'listAIModels',
                result: {
                  error: 'Failed to list AI models',
                  models: []
                }
              });
            }
          }

          // Then try backend deployments
          if (this.systemStatus.backendConnected) {
            try {
              const deployments = await listModelDeployments();
              task.apiCalls.push({
                name: 'listModelDeployments',
                result: deployments
              });

              // Also get available API deployments
              const apiDeployments = await getAvailableDeployments();
              task.apiCalls.push({
                name: 'getAvailableDeployments',
                result: apiDeployments
              });
            } catch (error) {
              console.error('Error listing model deployments:', error);
              task.apiCalls.push({
                name: 'listModelDeployments',
                result: {
                  error: 'Failed to list deployments',
                  deployments: []
                }
              });
            }
          }
          break;

        case TaskType.Unknown:
          // For unknown tasks, check if we can infer the type from the message
          const lowerCaseMessage = userMessage.toLowerCase();

          // Check for dataset-related keywords
          if (lowerCaseMessage.includes('dataset') ||
              lowerCaseMessage.includes('data') ||
              lowerCaseMessage.includes('upload') ||
              lowerCaseMessage.includes('list')) {
            try {
              const datasets = await listDatasets();
              task.apiCalls.push({
                name: 'listDatasets',
                result: datasets
              });
              // Update task type based on API call
              task.type = TaskType.DatasetManagement;
            } catch (error) {
              console.error('Error listing datasets for unknown task:', error);
            }
          }

          // Check for model-related keywords
          if (lowerCaseMessage.includes('model') ||
              lowerCaseMessage.includes('inference') ||
              lowerCaseMessage.includes('generate') ||
              lowerCaseMessage.includes('predict')) {
            try {
              if (this.systemStatus.aiServiceConnected) {
                const models = await aiService.getModels();
                task.apiCalls.push({
                  name: 'listAIModels',
                  result: { models }
                });
              }
              // Update task type if not already set
              if (task.type === TaskType.Unknown) {
                task.type = TaskType.ModelInference;
              }
            } catch (error) {
              console.error('Error listing models for unknown task:', error);
            }
          }
          break;

        default:
          // Default to basic conversation mode
          break;
      }

      console.log(`Completed API calls for task ${task.id}. Total API calls: ${task.apiCalls.length}`);
    } catch (error) {
      console.error('Error executing API calls:', error);
      task.apiCalls.push({
        name: 'apiCallError',
        result: {
          error: 'Error executing API calls',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    }
  }

  /**
   * Get response content from a completed task
   */
  public getTaskResponse(task: TaskState): string {
    // Check if task has a response formulation
    const responseStep = task.reasoning.find(step => step.step === 'response_formulation');

    if (responseStep) {
      return responseStep.output;
    }

    // Fallback if no specific response formulation
    const lastStep = task.reasoning[task.reasoning.length - 1];
    return lastStep ? lastStep.output : 'No response available';
  }

  /**
   * Get all tasks
   */
  public getTasks(): TaskState[] {
    return this.tasks;
  }

  /**
   * Get a specific task by ID
   */
  public getTask(taskId: string): TaskState | undefined {
    return this.tasks.find(task => task.id === taskId);
  }

  /**
   * Get the most recent task
   */
  public getLatestTask(): TaskState | undefined {
    if (this.tasks.length === 0) return undefined;
    return this.tasks[this.tasks.length - 1];
  }

  /**
   * Generate a task-specific system prompt based on detected task type
   */
  private getTaskSpecificPrompt(taskType: string): string {
    switch (taskType) {
      case 'platform_overview':
        return `You are Mash, the intelligent assistant for Artintel, a comprehensive platform for discovering, fine-tuning, and deploying language models.
The user is asking about general information about the Artintel platform. Provide a clear, concise overview of what Artintel is, its core philosophy, goals, and vision.
Focus on explaining how Artintel bridges the gap between AI research and practical applications for organizations.
Be conversational but informative, emphasizing Artintel's key differentiators and value proposition.`;

      case 'features':
        return `You are Mash, the intelligent assistant for Artintel, a comprehensive platform for discovering, fine-tuning, and deploying language models.
The user is asking about Artintel's features and capabilities. Explain the key components of the platform including:
- Model Selection & Discovery
- Data Integration & Preprocessing
- Fine-Tuning Workflows
- Deployment & Serving
- Monitoring & Alerts
- Cost Management
Focus on practical benefits and how these features solve real business problems.
Be conversational but specific, highlighting the most relevant features based on the user's specific query.`;

      case 'pricing_tiers':
        return `You are Mash, the intelligent assistant for Artintel, a comprehensive platform for discovering, fine-tuning, and deploying language models.
The user is asking about Artintel's pricing and tier options. Provide clear information about the available tiers:
- Free Tier: For startups, educators, solo developers with access to lightweight models
- Pro Tier: For SMEs and mid-sized teams with access to mid-sized LLMs and guided fine-tuning
- Enterprise Premium: For regulated industries and large enterprises with access to the largest models
Focus on helping the user understand which tier would best fit their needs based on their requirements.
Be conversational but factual, highlighting the value proposition of each tier.`;

      case 'model_types':
        return `You are Mash, the intelligent assistant for Artintel, a comprehensive platform for discovering, fine-tuning, and deploying language models.
The user is asking about different types of language models. Explain the differences between:
- Small Language Models (SLMs): Typically ranging from a few million to a few billion parameters
- Large Language Models (LLMs): Ranging from several billion to hundreds of billions of parameters
Focus on the strengths, limitations, and appropriate use cases for each model type.
Be conversational but educational, helping the user understand which model type would be most suitable for their specific needs.`;

      case 'industries':
        return `You are Mash, the intelligent assistant for Artintel, a comprehensive platform for discovering, fine-tuning, and deploying language models.
The user is asking about industry-specific applications of Artintel. Provide insights on how Artintel is used in different sectors such as:
- Healthcare: For analyzing EHRs, medical coding, and clinical decision support
- Finance: For fraud detection, loan underwriting, and market analysis
- Legal: For contract analysis, eDiscovery, and legal brief summarization
- Retail & E-Commerce: For chatbots, inventory forecasting, and product review analysis
Focus on real-world examples and specific benefits for each industry.
Be conversational but practical, highlighting industry-specific challenges that Artintel solves.`;

      case 'best_practices':
        return `You are Mash, the intelligent assistant for Artintel, a comprehensive platform for discovering, fine-tuning, and deploying language models.
The user is asking about best practices for using Artintel effectively. Provide expert guidance on:
- Model Selection: Balancing complexity with resource constraints
- Fine-Tuning: Ensuring high-quality data and appropriate hyperparameters
- Deployment: Implementing proper monitoring, scaling, and version control
Focus on actionable advice that helps users maximize their success with the platform.
Be conversational but authoritative, sharing insights that come from experience with the platform.`;

      case 'fine-tuning':
        return `You are Mash, the intelligent assistant for Artintel, a comprehensive platform for discovering, fine-tuning, and deploying language models.
The user is asking about fine-tuning language models. Provide detailed information about Artintel's fine-tuning capabilities including:
- The no-code fine-tuning studio with step-by-step wizards
- Support for different model types (SLMs and LLMs)
- Training infrastructure options (cloud or on-prem)
- Checkpoints and experiment tracking features
Focus on the process, requirements, and best practices for successful fine-tuning.
Be conversational but technical when necessary, offering practical guidance for users of different expertise levels.`;

      case 'deployment':
        return `You are Mash, the intelligent assistant for Artintel, a comprehensive platform for discovering, fine-tuning, and deploying language models.
The user is asking about deploying language models. Explain Artintel's deployment capabilities including:
- One-click deployment to different environments (cloud, on-prem, hybrid)
- Kubernetes integration and containerization
- REST & gRPC endpoint options with authentication and rate limiting
- Version management for safe iterations
Focus on the seamless deployment process and operational considerations.
Be conversational but practical, highlighting deployment options that might be relevant to the user's needs.`;

      case 'model-selection':
        return `You are Mash, the intelligent assistant for Artintel, a comprehensive platform for discovering, fine-tuning, and deploying language models.
The user is asking about selecting the right language model. Provide guidance on Artintel's model selection features including:
- The curated model catalog with performance benchmarks
- Metadata on model sizes, speeds, and memory requirements
- Domain tagging for specialized fields
- Intelligent recommendation system
Focus on helping the user understand how to match models to their specific use case and constraints.
Be conversational but objective, presenting the tradeoffs between different model options.`;

      default:
        // Default conversational prompt
        return `You are Mash, an AI assistant for Artintel, a platform that helps discover, fine-tune, and deploy language models.
Be conversational, helpful, and focused on providing practical advice related to Artintel's offerings.
When answering, be clear and concise while still being friendly. Focus on addressing the user's needs.
Always maintain a helpful, positive tone even when dealing with technical subjects.`;
    }
  }
}

// Create a singleton instance
export const taskManager = new TaskManager();