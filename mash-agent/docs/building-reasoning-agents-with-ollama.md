# Building Reasoning Agents with Ollama: A Beginner's Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Architecture Overview](#architecture-overview)
3. [Setting Up Ollama](#setting-up-ollama)
4. [The Reasoning Engine](#the-reasoning-engine)
5. [Task Management](#task-management)
6. [UI Components](#ui-components)
7. [Error Handling and Fallbacks](#error-handling-and-fallbacks)
8. [Building Your Own Agent](#building-your-own-agent)
9. [Advanced Topics](#advanced-topics)
10. [Troubleshooting](#troubleshooting)

## Introduction

This guide will walk you through building AI reasoning agents that leverage Ollama, an open-source, locally-run model server. We'll explore how to create a robust agent architecture with multi-step reasoning, task management, and error handling, all while keeping the models running locally on your machine for privacy and control.

Building reasoning agents that run locally offers several advantages:

- **Privacy**: All processing occurs on your hardware, ensuring your data never leaves your control
- **Cost-effectiveness**: No per-token or per-request charges from cloud AI providers
- **Customizability**: Full control over the model settings and implementation details
- **Offline capability**: Works without internet connection once models are downloaded
- **Learning opportunity**: Deeper understanding of how LLM-powered systems are constructed

### What is a Reasoning Agent?

A reasoning agent is an AI system that can break down complex tasks into multiple reasoning steps, making its "thinking process" explicit and traceable. Unlike simple prompt-response systems, reasoning agents can:

1. Understand the intent behind a user's request
2. Classify the type of task needed
3. Plan the necessary steps to complete the task
4. Execute those steps, including making API calls
5. Formulate a coherent response based on the gathered information

This guide is based on a practical implementation of a reasoning agent that connects to both local Ollama models and an optional backend service.

The reasoning approach offers significant advantages over simple prompting:

- **Transparency**: Users can see how the agent arrived at its conclusions
- **Reliability**: Breaking down complex tasks reduces hallucinations and reasoning errors
- **Adaptability**: The modular structure can be extended for different use cases
- **Error recovery**: If one stage fails, the system can gracefully fallback
- **Debuggability**: Each reasoning step can be evaluated independently

## Architecture Overview

The architecture consists of several key components that work together to create a powerful reasoning agent:

1. **Ollama Service**: Handles communication with the local Ollama API for model inference
   - Manages HTTP requests to the Ollama server
   - Handles model listing, selection, and generation
   - Provides error handling for connection issues
   - Supports streaming responses for real-time feedback

2. **Reasoning Engine**: Manages the step-by-step thinking process
   - Breaks down reasoning into distinct stages (understanding, classification, planning, etc.)
   - Maintains state across reasoning steps
   - Structures prompts for each stage to guide the model
   - Evaluates confidence in each reasoning step
   - Implements fallback mechanisms for when reasoning fails

3. **Task Manager**: Coordinates task execution and API calls
   - Maintains a task registry with status tracking
   - Dispatches API calls based on task classification
   - Tracks execution progress
   - Manages conversation history
   - Coordinates between reasoning and UI components

4. **UI Components**: Provides an interactive interface for users
   - Chat container for message display and input
   - Settings panel for configuration
   - Status indicators for connection state
   - Visualization of the reasoning process
   - Interactive elements for model selection and control

5. **Error Handling System**: Ensures graceful fallbacks when things go wrong
   - Connection error detection and recovery
   - Informative error messages
   - Fallback responses when optimal processing fails
   - Automatic retries for transient errors
   - User guidance for troubleshooting

The system follows this general flow:

```
User Input → Reasoning Engine → Task Classification → API Calls → Response Formulation → UI Rendering
```

Data flows between components through well-defined interfaces:

```
┌────────────────┐      ┌─────────────────┐      ┌────────────────┐
│   UI Layer     │◄────►│  Task Manager   │◄────►│ Reasoning      │
│ (React/Next.js)│      │ (Coordination)  │      │ Engine         │
└────────────────┘      └─────────────────┘      └────────────────┘
        ▲                       ▲                        ▲
        │                       │                        │
        ▼                       ▼                        ▼
┌────────────────┐      ┌─────────────────┐      ┌────────────────┐
│ Ollama Service │      │ Backend API     │      │ Local State    │
│ (Local Models) │      │ (Optional)      │      │ Management     │
└────────────────┘      └─────────────────┘      └────────────────┘
```

This architecture provides several advantages:

- **Modularity**: Components can be developed and tested independently
- **Extensibility**: New capabilities can be added by extending existing components
- **Reliability**: Isolation between components prevents cascading failures
- **Maintainability**: Clear separation of concerns makes the code easier to understand and update

## Setting Up Ollama

Before building your reasoning agent, you need to set up Ollama on your system:

### Installation

1. **Install Ollama**: Visit [ollama.ai/download](https://ollama.ai/download) and follow installation instructions for your platform
   - **Windows**: Download and run the installer
   - **macOS**: Download the app or use `brew install ollama`
   - **Linux**: Use the curl installation script: 
     ```bash
     curl -fsSL https://ollama.ai/install.sh | sh
     ```

2. **Run Ollama**: 
   - On Windows: Launch the Ollama application from the Start menu
   - On macOS: Open the Ollama application
   - On Linux: Start the service with `ollama serve`

   The Ollama server runs on port 11434 by default. You can verify it's running by opening `http://localhost:11434` in your browser.

3. **Pull Models**: Download the models you want to use
   ```bash
   # Pull the standard Llama 2 model (7B parameters)
   ollama pull llama2
   
   # Pull a smaller, quantized version for faster responses
   ollama pull llama2:7b-q4_0
   
   # Pull other models as needed
   ollama pull mistral
   ollama pull codellama
   ```

### Configuration

You can customize Ollama's behavior through environment variables or by creating model configuration files:

1. **Environment variables**:
   - `OLLAMA_HOST`: Set the host address (default: 127.0.0.1)
   - `OLLAMA_PORT`: Set the port (default: 11434)

2. **Model configuration**: Create a Modelfile to customize model behavior
   ```
   # Example Modelfile
   FROM llama2
   PARAMETER temperature 0.7
   PARAMETER top_p 0.9
   SYSTEM You are a helpful reasoning assistant that thinks step by step.
   ```

   Build your custom model with:
   ```bash
   ollama create my-reasoning-model -f Modelfile
   ```

### Testing Ollama

Before integrating with your application, verify that Ollama is working correctly:

1. **Check available models**:
   ```bash
   ollama list
   ```

2. **Test generation**:
   ```bash
   ollama run llama2 "Explain the concept of reasoning agents"
   ```

3. **Test the API directly**:
   ```bash
   curl -X POST http://localhost:11434/api/generate -d '{
     "model": "llama2",
     "prompt": "Explain the concept of reasoning agents"
   }'
   ```

Once you've confirmed Ollama is working properly, you can proceed to implementing the reasoning agent.

## The Reasoning Engine

The reasoning engine is the core component that breaks down user queries into a multi-step thinking process. Each step builds on the previous one, creating a chain of reasoning that leads to better responses.

### Thinking Stages

The reasoning process is divided into distinct stages:

1. **Intent Understanding**: Identify what the user is really asking for
   - Extracts the core request from conversational language
   - Identifies implied needs that weren't explicitly stated
   - Determines the user's goal beyond the literal question

2. **Task Classification**: Determine what type of task this falls under
   - Categorizes requests into specific task types (conversation, data retrieval, system operations, etc.)
   - Helps route the request to the appropriate handlers
   - Sets expectations for what API calls may be needed

3. **Execution Planning**: Create a plan for obtaining necessary information
   - Identifies what data needs to be gathered
   - Determines the sequence of operations needed
   - Plans for potential failures or edge cases

4. **Response Formulation**: Craft a response based on the gathered data
   - Synthesizes information from multiple sources
   - Formats the response appropriate to the request type
   - Ensures all user questions are addressed

5. **Error Recovery** (if needed): Provide a graceful fallback if anything fails
   - Detects when normal processing fails
   - Creates alternative response paths
   - Provides helpful guidance even when optimal processing isn't possible

### Implementation

Here's how you can implement a basic reasoning engine:

```typescript
export enum ThinkingStage {
  IntentUnderstanding = 'intent_understanding',
  TaskClassification = 'task_classification',
  ExecutionPlanning = 'execution_planning',
  ResponseFormulation = 'response_formulation',
  ErrorRecovery = 'error_recovery'
}

export class ReasoningEngine {
  private llmModel: string = 'llama2'; // Default model
  private systemPrompt = `You are an AI assistant specialized in solving problems step-by-step`;

  // Main thinking method that orchestrates all steps
  public async think(userMessage: string, conversationContext?: string): Promise<ThinkingProcess> {
    const thinkingProcess: ThinkingProcess = {
      userMessage,
      steps: [],
      taskType: TaskType.Unknown,
      startTime: new Date()
    };
    
    try {
      // Step 1: Understand user intent
      const intentStep = await this.executeThinkingStep(
        ThinkingStage.IntentUnderstanding,
        userMessage,
        conversationContext
      );
      thinkingProcess.steps.push(intentStep);
      
      // Step 2: Classify the task type
      const classificationStep = await this.executeThinkingStep(
        ThinkingStage.TaskClassification,
        userMessage,
        conversationContext
      );
      thinkingProcess.steps.push(classificationStep);
      thinkingProcess.taskType = this.determineTaskType(classificationStep.reasoning);
      
      // Step 3: Plan execution
      const planningStep = await this.executeThinkingStep(
        ThinkingStage.ExecutionPlanning,
        userMessage,
        conversationContext
      );
      thinkingProcess.steps.push(planningStep);
      thinkingProcess.taskPlan = planningStep.reasoning;
      
      return thinkingProcess;
    } catch (error) {
      // Error recovery if any step fails
      const errorStep = await this.handleErrorRecovery(userMessage, error, conversationContext);
      thinkingProcess.steps.push(errorStep);
      return thinkingProcess;
    }
  }
  
  // Execute a single thinking step
  private async executeThinkingStep(
    stage: ThinkingStage,
    userMessage: string,
    conversationContext?: string,
    promptTemplate?: string
  ): Promise<ThinkingStepResult> {
    // Build the complete prompt
    const systemPrefix = `${this.systemPrompt}\n\n`;
    const contextPrefix = conversationContext ? `${conversationContext}\n\n` : '';
    const stagePrompt = promptTemplate || this.getStagePrompt(stage);
    
    const fullPrompt = `${systemPrefix}${contextPrefix}User Message: "${userMessage}"\n\n${stagePrompt}\n\nThinking:`;
    
    // Generate reasoning with LLM
    const response = await generateWithOllama(this.llmModel, fullPrompt);
    const reasoning = response.response || "Unable to generate reasoning.";
    
    return {
      stage,
      prompt: stagePrompt,
      reasoning,
      confidence: this.calculateConfidence(reasoning, stage)
    };
  }
  
  // Get the stage-specific prompt
  private getStagePrompt(stage: ThinkingStage): string {
    switch (stage) {
      case ThinkingStage.IntentUnderstanding:
        return 'What is the user asking for? What is their primary intent? Identify explicit and implicit needs.';
        
      case ThinkingStage.TaskClassification:
        return 'What type of task is this? Classify the request into one of the following categories: conversation, data_retrieval, system_operation, or other.';
        
      case ThinkingStage.ExecutionPlanning:
        return 'How should I fulfill this request? What data do I need to gather? What API calls should I make? Outline the steps.';
        
      case ThinkingStage.ResponseFormulation:
        return 'Based on all the information gathered, what is the best response to the user? Ensure it directly addresses their query.';
        
      case ThinkingStage.ErrorRecovery:
        return 'An error occurred. How can I recover and still provide a helpful response to the user?';
        
      default:
        return 'Analyze this message and provide your thoughts.';
    }
  }
  
  // Additional helper methods...
}
```

### Crafting Effective Prompts

The quality of your reasoning engine depends heavily on the prompts you use for each thinking stage. Here are some tips:

1. **Be specific**: Clearly define what you want the model to think about in each stage
2. **Use constraints**: Guide the model by specifying formats or categories
3. **Encourage step-by-step thinking**: Ask for explicit reasoning
4. **Provide examples**: Include examples of good reasoning for complex stages
5. **Tailor to model capabilities**: Simpler prompts for smaller models, more detailed for larger ones

### Handling Confidence and Uncertainty

Not all reasoning steps are equally reliable. Implement a confidence scoring system:

```typescript
private calculateConfidence(reasoning: string, stage: ThinkingStage): number {
  // Simple heuristic based on response length and coherence
  const length = reasoning.length;
  
  // Very short responses are typically low confidence
  if (length < 50) return 0.3;
  
  // Medium length responses get a baseline confidence
  if (length < 200) return 0.6;
  
  // Check for uncertainty markers
  const uncertaintyPhrases = ['not sure', 'might be', 'possibly', 'unclear', 'ambiguous'];
  if (uncertaintyPhrases.some(phrase => reasoning.toLowerCase().includes(phrase))) {
    return 0.5; // Reduce confidence if uncertainty detected
  }
  
  // Longer, more detailed responses get higher confidence
  return 0.9;
}
```

By implementing a robust reasoning engine with multiple thinking stages, you create a system that can tackle complex problems more reliably than simple prompt-response approaches.

## Task Management

The Task Manager coordinates the execution of tasks identified by the Reasoning Engine. It serves as the bridge between high-level reasoning and concrete actions, maintaining state and orchestrating the overall flow.

### Key Responsibilities

1. **Task State Management**
   - Creates and tracks task objects
   - Maintains status (pending, in_progress, complete, error)
   - Records timestamps for performance monitoring
   - Stores reasoning steps and API call results

2. **API Execution**
   - Translates reasoning plans into concrete API calls
   - Handles API-specific error conditions
   - Collects and formats API results

3. **Context Management**
   - Maintains conversation history
   - Provides context for reasoning steps
   - Tracks system state (connection status, available models, etc.)

4. **Response Coordination**
   - Ties reasoning results and API data together
   - Ensures consistent, helpful responses even when problems occur

### Implementation

Here's how to implement a basic Task Manager:

```typescript
// Define the task types
export enum TaskType {
  Conversation = 'conversation',
  DatasetManagement = 'dataset',
  ModelInference = 'inference',
  SystemCheck = 'system_check',
  Unknown = 'unknown'
}

// Define the task state structure
export interface TaskState {
  id: string;
  type: TaskType;
  status: 'pending' | 'in_progress' | 'complete' | 'error';
  message?: string;
  reasoning: ReasoningStep[];
  apiCalls: { name: string, result: any }[];
  startedAt: Date;
  completedAt?: Date;
  thinkingProcess?: ThinkingProcess;
}

// Define message structure for conversation history
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Task Manager implementation
export class TaskManager {
  private tasks: TaskState[] = [];
  private systemStatus = {
    ollamaConnected: false,
    backendConnected: false,
  };
  private conversationHistory: Message[] = [];
  private llmModel: string = 'llama2';
  
  // Process a user message through multiple thinking steps
  public async processUserMessage(userMessage: string): Promise<TaskState> {
    // Create a new task with unique ID
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
    task.status = 'in_progress';
    
    try {
      // Get conversation context for reasoning
      const conversationContext = this.getConversationContext();
      
      // Check for fast-path patterns that can bypass full reasoning
      if (this.isFastPathRequest(userMessage)) {
        return await this.processFastPathRequest(task, userMessage);
      }
      
      // Use the reasoning engine for detailed thinking
      const thinkingProcess = await reasoningEngine.think(userMessage, conversationContext);
      task.thinkingProcess = thinkingProcess;
      task.type = thinkingProcess.taskType;
      
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
      
      // Add to conversation history
      this.addToConversationHistory({ 
        role: 'user', 
        content: userMessage 
      });
      
      this.addToConversationHistory({ 
        role: 'assistant', 
        content: responseResult.reasoning 
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
  
  // Execute API calls based on task type
  private async executeApiCalls(task: TaskState, userMessage: string): Promise<void> {
    console.log(`Executing API calls for task type: ${task.type}`);
    
    // Always check system status first
    const systemStatus = await this.checkSystemStatus();
    task.apiCalls.push({
      name: 'checkSystemStatus',
      result: systemStatus
    });
    
    // Execute task-specific API calls
    switch (task.type) {
      case TaskType.Conversation:
        // For conversation, no additional API calls needed
        break;
        
      case TaskType.DatasetManagement:
        if (this.systemStatus.backendConnected) {
          try {
            const datasets = await listDatasets();
            task.apiCalls.push({
              name: 'listDatasets',
              result: datasets
            });
          } catch (error) {
            console.error('Error listing datasets:', error);
          }
        }
        break;
        
      case TaskType.ModelInference:
        if (this.systemStatus.ollamaConnected) {
          try {
            const models = await listOllamaModels();
            task.apiCalls.push({
              name: 'listOllamaModels',
              result: models
            });
          } catch (error) {
            console.error('Error listing Ollama models:', error);
          }
        }
        break;
        
      case TaskType.SystemCheck:
        // Additional system check information already collected
        break;
        
      default:
        // For unknown task types, try to gather general information
        if (this.systemStatus.ollamaConnected) {
          try {
            const models = await listOllamaModels();
            task.apiCalls.push({
              name: 'listOllamaModels',
              result: models
            });
          } catch (error) {
            console.error('Error listing models:', error);
          }
        }
    }
  }
  
  // Check system connection status
  private async checkSystemStatus(): Promise<SystemStatus> {
    try {
      // Check Ollama connection
      const ollamaConnected = await checkOllamaHealth();
      
      // Check backend connection if applicable
      let backendConnected = false;
      try {
        backendConnected = await checkBackendConnection();
      } catch (error) {
        console.error('Error checking backend connection:', error);
      }
      
      this.systemStatus = {
        ollamaConnected,
        backendConnected
      };
      
      return this.systemStatus;
    } catch (error) {
      console.error('Error checking system status:', error);
      return {
        ollamaConnected: false,
        backendConnected: false
      };
    }
  }
  
  // Format conversation history for context
  public getConversationContext(): string {
    return this.conversationHistory
      .map(msg => `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`)
      .join('\n');
  }
  
  // Add a message to the conversation history
  public addToConversationHistory(message: Message): void {
    this.conversationHistory.push(message);
    
    // Keep conversation history to a reasonable size
    if (this.conversationHistory.length > 10) {
      this.conversationHistory.shift();
    }
  }
  
  // Get all tasks
  public getTasks(): TaskState[] {
    return this.tasks;
  }
  
  // Get a specific task by ID
  public getTask(taskId: string): TaskState | undefined {
    return this.tasks.find(task => task.id === taskId);
  }
  
  // Get the most recent task
  public getLatestTask(): TaskState | undefined {
    if (this.tasks.length === 0) return undefined;
    return this.tasks[this.tasks.length - 1];
  }
}
```

### Task Types

A key responsibility of the Task Manager is handling different types of tasks appropriately. Common task types include:

1. **Conversation**: General dialog without specific API needs
2. **Data Management**: Tasks related to datasets and storage
3. **Model Inference**: Tasks involving model selection and generation
4. **System Operations**: Tasks related to system configuration and status

For each task type, you'll need specific API call patterns and response formulation strategies.

### Performance Optimization

The Task Manager can implement several optimizations:

1. **Fast path detection**: Recognize common patterns that can bypass full reasoning
2. **Caching**: Store results of expensive operations
3. **Parallel execution**: Run independent API calls concurrently
4. **Timeout management**: Set appropriate timeouts for different operations
5. **Retry logic**: Automatically retry transient failures

### Memory Management

For long-running agents, implement strategies to manage memory:

1. **Conversation pruning**: Keep only the most recent N messages
2. **Task cleanup**: Periodically archive or delete old tasks
3. **Result summarization**: Store compact summaries rather than full results

A well-implemented Task Manager ensures your reasoning agent can reliably execute plans created by the reasoning engine while handling the complexities of real-world API interactions and state management.

## UI Components

The UI layer provides a user-friendly interface for interacting with the reasoning agent. Key components include:

1. **Chat Container**: The main component that orchestrates the entire interaction
2. **Settings Panel**: Manages model selection and connection settings
3. **Status Indicator**: Shows the connection status
4. **Message List**: Displays the conversation history
5. **Step Indicator**: Visualizes the thinking process

## Error Handling and Fallbacks

Robust error handling is crucial for a good user experience, especially when working with local AI models and network connections. A well-designed error handling system ensures your reasoning agent remains useful even when things go wrong.

### Key Error Categories

1. **Connection Errors**: Issues connecting to Ollama or backend services
   - Network failures
   - Service not running
   - Port conflicts
   - Timeouts

2. **Model Errors**: Issues with AI models
   - Model not found
   - Model loading failures
   - Generation errors
   - Token limit exceeded

3. **Reasoning Failures**: Issues with the reasoning process
   - Incomplete reasoning
   - Low confidence reasoning
   - Contradictory steps
   - Hallucinations

4. **API Errors**: Issues with external API calls
   - Authentication failures
   - Rate limiting
   - Malformed responses
   - Service-specific errors

### Implementation

#### 1. Structured Error Types

Create specific error types for better handling:

```typescript
// Types for better error handling
type OllamaErrorType = 'CONNECTION' | 'TIMEOUT' | 'API_ERROR' | 'NOT_FOUND' | 'SERVER_ERROR' | 'UNKNOWN';

class OllamaError extends Error {
  type: OllamaErrorType;
  statusCode?: number;
  
  constructor(message: string, type: OllamaErrorType, statusCode?: number) {
    super(message);
    this.name = 'OllamaError';
    this.type = type;
    this.statusCode = statusCode;
  }
}
```

#### 2. Graceful API Request Handling

Implement robust request functions with proper error handling:

```typescript
// Helper function for safe fetch with error handling
async function safeFetch(url: string, options?: RequestInit) {
  try {
    // Add proper headers and credentials
    const fetchOptions: RequestInit = {
      ...options,
      credentials: 'same-origin',
      headers: {
        ...options?.headers,
      },
    };

    // Use fetch with proper error handling
    const response = await fetch(url, fetchOptions);
    
    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    
    // Provide more detailed error information
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new OllamaError(
        `Connection failed: Could not reach ${url}. Please check if the server is running and accessible.`,
        'CONNECTION'
      );
    }
    
    throw new OllamaError(
      `Network request failed: ${error instanceof Error ? error.message : String(error)}`,
      'UNKNOWN'
    );
  }
}

// Helper function for retrying requests
async function retryOperation<T>(
  operation: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000,
  backoff: number = 2
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }
    
    console.log(`Retrying operation, ${retries} attempts left. Waiting ${delay}ms...`);
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return retryOperation(operation, retries - 1, delay * backoff, backoff);
  }
}

// Main Ollama request function with comprehensive error handling
async function ollamaRequest(endpoint: string, options: RequestInit = {}, longTimeout = false) {
  const url = `${OLLAMA_BASE_URL}${endpoint}`
  console.log(`Making Ollama request to: ${url}`)

  const defaultHeaders = {
    "Content-Type": "application/json",
  }

  // Use a longer timeout for reasoning engine operations
  const timeoutMs = longTimeout ? 60000 : 30000;
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    // Add a reasonable timeout to prevent hanging requests
    signal: options.signal || (typeof AbortSignal !== 'undefined' ? 
      AbortSignal.timeout(timeoutMs) : undefined),
  }

  try {
    // First try a simple connectivity check
    if (endpoint === "/tags") {
      try {
        const checkResult = await Promise.race([
          safeFetch(`${OLLAMA_BASE_URL}/tags`, { 
            method: 'GET',
            signal: typeof AbortSignal !== 'undefined' ? 
              AbortSignal.timeout(3000) : undefined 
          }),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new OllamaError("Ollama connection timeout", "TIMEOUT")), 3000)
          )
        ]);
        
        // Log successful connection
        console.log(`Connection check succeeded with status: ${checkResult.status}`);
      } catch (err) {
        console.error("Ollama connectivity check failed:", err);
        throw new OllamaError(
          "Could not connect to Ollama server. Please ensure Ollama is running on your system.",
          err instanceof OllamaError ? err.type : 'CONNECTION'
        );
      }
    }
    
    // Wrap the actual request in the retry logic for resilience
    return await retryOperation(async () => {
      const response = await safeFetch(url, config);
      
      // Check if the request was successful
      if (!response.ok) {
        let errorType: OllamaErrorType = 'API_ERROR';
        
        // Categorize common error status codes
        if (response.status === 404) {
          errorType = 'NOT_FOUND';
        } else if (response.status >= 500) {
          errorType = 'SERVER_ERROR';
        }
        
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.error || `Ollama request failed with status ${response.status}`
        console.error(`API error (${response.status}): ${errorMessage}`)
        
        throw new OllamaError(errorMessage, errorType, response.status);
      }

      // Parse and return the JSON response
      return await response.json();
    }, endpoint === "/generate" ? 2 : 1); // More retries for generate endpoint
  } catch (error: any) {
    // Proper error classification and handling
    if (error instanceof OllamaError) {
      // Pass through our custom errors
      throw error;
    }
    
    // Classify other errors
    if (error.name === 'AbortError' || error.message.includes('timeout')) {
      console.error(`Request to Ollama timed out:`, error)
      throw new OllamaError(
        "Request to Ollama timed out. Please check if Ollama is running properly.",
        'TIMEOUT'
      );
    }
    
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      console.error(`Failed to connect to Ollama:`, error)
      throw new OllamaError(
        "Could not connect to Ollama server. Please ensure Ollama is running on your system.",
        'CONNECTION'
      );
    }
    
    console.error(`Error in Ollama request to ${endpoint}:`, error)
    throw new OllamaError(error.message || "Unknown error with Ollama request", 'UNKNOWN');
  }
}
```

#### 3. Fallback Responses

Implement fallback mechanisms in your reasoning engine:

```typescript
// Fallback response generation
private createFallbackResponse(thinkingProcess: ThinkingProcess, apiResults: any[]): string {
  // Check system status first to handle connection issues
  const statusCall = apiResults.find(call => call.name === 'checkSystemStatus');
  let ollamaConnected = true;
  let backendConnected = true;
  
  if (statusCall) {
    ollamaConnected = statusCall.result?.ollamaConnected || false;
    backendConnected = statusCall.result?.backendConnected || false;
  }
  
  // If backend is disconnected but Ollama is available, acknowledge this specifically
  if (ollamaConnected && !backendConnected) {
    let response = "🔌 Connection Status: Local AI is available, but cloud services are offline.\n\n";
    response += "I'm currently unable to connect to the cloud backend. However, I can still help with local AI tasks using Ollama.\n\n";
    
    // Add context based on what they were trying to do
    switch (thinkingProcess.taskType) {
      case TaskType.DatasetManagement:
        response += "Unfortunately, I can't access your datasets at the moment due to the backend connection issue. You can still use local AI models for conversation and text generation.";
        break;
      
      case TaskType.ModelTraining:
        response += "I can't access training features at the moment due to the backend connection issue. However, you can still use the local models that are already available on your system.";
        break;
        
      case TaskType.ModelDeployment:
        response += "I can't access deployment features at the moment due to the backend connection issue. However, you can still use the local models available through Ollama.";
        break;
        
      case TaskType.ModelInference:
        // For inference, we can still show available Ollama models
        const modelCall = apiResults.find(call => call.name === 'listOllamaModels');
        if (modelCall && modelCall.result?.models?.length > 0) {
          const models = modelCall.result.models;
          response += "I can still help you with text generation using your local Ollama models. Here are the available models:\n\n";
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
  
  // If Ollama is not connected, this is a bigger issue
  if (!ollamaConnected) {
    return "❌ Connection Error: Could not connect to the Ollama AI model server.\n\nPlease ensure that:\n• Ollama is installed and running on your system\n• The default port 11434 is not blocked by a firewall\n• No other application is using the same port\n\nTry restarting Ollama or your computer if the issue persists.";
  }
  
  // Default fallback when we don't know what went wrong
  return "I was unable to process your request completely. This might be due to a temporary issue with the AI model or missing context. Please try rephrasing your question or check that Ollama is running properly on your system.";
}
```

#### 4. UI Error Feedback

Provide clear error messages in the UI:

```tsx
// In the Chat Container component
if (error.message) {
  if (error.message.includes("Failed to fetch") || error.message.includes("Could not connect")) {
    errorMessage = "❌ Connection Error: Could not connect to the Ollama AI model server.\n\nPlease ensure that:\n• Ollama is installed and running on your system\n• The default port 11434 is not blocked by a firewall\n• No other application is using the same port\n\nTry restarting Ollama or your computer if the issue persists.";
  } else if (error.message.includes("Model not found")) {
    errorMessage = "⚠️ Model Error: The requested model could not be found.\n\nPlease check:\n• The model name is spelled correctly\n• The model has been downloaded to your Ollama server\n• You can download models using the Settings panel";
  } else if (error.message.includes("timeout")) {
    errorMessage = "⏱️ Timeout Error: The operation took too long to complete.\n\nThis could be due to:\n• System resource constraints\n• Complex processing requirements\n• Network issues\n\nTry simplifying your request or check your system resources.";
  }
}
```

#### 5. Empty State Handling

Provide informative displays when lists or results are empty:

```tsx
// In the Settings Panel component
{ollamaConnected && (
  <div className="mt-4">
    <h3 className="text-sm font-medium mb-2 flex items-center justify-between">
      <span>Available Ollama Models</span>
      <button 
        className="text-xs px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded"
        onClick={showDownloadModelOption}
      >
        Download New Model
      </button>
    </h3>
    
    {Array.isArray(ollamaModels) && ollamaModels.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {ollamaModels.map((model, index) => (
          <div
            key={index}
            className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md px-3 py-1 text-xs"
          >
            {model.name}
          </div>
        ))}
      </div>
    ) : (
      <div className="p-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md">
        <p className="text-sm">No Ollama models found on your system.</p>
        <p className="text-xs text-neutral-500 mt-1">To use local AI models, you need to download at least one model. Click the "Download New Model" button above to get started.</p>
      </div>
    )}
  </div>
)}
```

### Testing Error Scenarios

To ensure your error handling is robust, systematically test these scenarios:

1. **Ollama not running**: Test behavior when the Ollama service is not started
2. **No models installed**: Test with Ollama running but no models pulled
3. **Network disconnection**: Test behavior when network becomes unavailable
4. **Backend service down**: Test with Ollama running but backend unreachable
5. **Long operations**: Test timeout behavior with complex requests
6. **Invalid model names**: Test with non-existent model names
7. **Resource exhaustion**: Test behavior when system resources are constrained

### Error Logging and Monitoring

Implement comprehensive logging to help diagnose issues:

```typescript
// Error logging utility
function logError(context: string, error: any, additionalInfo?: any) {
  console.error(`Error in ${context}:`, error);
  
  // Additional structured logging
  const errorDetails = {
    timestamp: new Date().toISOString(),
    context,
    message: error instanceof Error ? error.message : String(error),
    name: error instanceof Error ? error.name : 'Unknown',
    stack: error instanceof Error ? error.stack : undefined,
    type: error instanceof OllamaError ? error.type : 'UNCLASSIFIED',
    statusCode: error instanceof OllamaError ? error.statusCode : undefined,
    additionalInfo
  };
  
  // You could send this to a logging service
  console.error('Structured error details:', errorDetails);
  
  // In development, you might want to display these in the UI
  if (process.env.NODE_ENV === 'development') {
    // Store in a debug log that can be viewed in the UI
  }
}
```

Robust error handling is not just about preventing crashes—it's about providing a graceful degradation of service and clear guidance to users when things go wrong. By implementing comprehensive error handling and fallbacks, you ensure your reasoning agent remains helpful even in suboptimal conditions.

## Building Your Own Agent

This section provides a step-by-step guide to implementing your own reasoning agent with Ollama. We'll walk through the complete process from project setup to testing.

### Step 1: Set Up Your Project

First, create a new Next.js project:

```bash
# Create a new Next.js project
npx create-next-app@latest my-reasoning-agent
cd my-reasoning-agent

# Install necessary dependencies
npm install lucide-react react-markdown
```

Set up your project structure:

```
my-reasoning-agent/
├── components/
│   ├── chat-container.tsx
│   ├── chat-input.tsx
│   ├── header.tsx
│   ├── message-chat.tsx
│   ├── message-list.tsx
│   ├── model-selector.tsx
│   ├── settings-panel.tsx
│   ├── status-indicator.tsx
│   └── step-indicator.tsx
├── lib/
│   ├── ollama-service.ts
│   ├── services/
│   │   ├── reasoning-engine.ts
│   │   └── task-manager.ts
│   └── utils.ts
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── next.config.js
└── package.json
```

### Step 2: Implement the Ollama Service

Create the file `lib/ollama-service.ts` to interact with the Ollama API:

```typescript
// lib/ollama-service.ts

// Base URL for the Ollama API
let OLLAMA_BASE_URL = "http://127.0.0.1:11434/api";

// Types for better error handling
type OllamaErrorType = 'CONNECTION' | 'TIMEOUT' | 'API_ERROR' | 'NOT_FOUND' | 'SERVER_ERROR' | 'UNKNOWN';

class OllamaError extends Error {
  type: OllamaErrorType;
  statusCode?: number;
  
  constructor(message: string, type: OllamaErrorType, statusCode?: number) {
    super(message);
    this.name = 'OllamaError';
    this.type = type;
    this.statusCode = statusCode;
  }
}

// Helper function for Ollama API requests
async function ollamaRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${OLLAMA_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new OllamaError(
        `Ollama request failed with status ${response.status}`,
        response.status === 404 ? 'NOT_FOUND' : 'API_ERROR',
        response.status
      );
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error in Ollama request:`, error);
    
    if (error instanceof OllamaError) {
      throw error;
    }
    
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new OllamaError(
        "Could not connect to Ollama server. Please ensure Ollama is running on your system.",
        'CONNECTION'
      );
    }
    
    throw new OllamaError(
      error instanceof Error ? error.message : "Unknown error with Ollama request",
      'UNKNOWN'
    );
  }
}

// Function to list available Ollama models
export async function listOllamaModels() {
  try {
    const response = await ollamaRequest("/tags");
    return response;
  } catch (error) {
    console.error("Error listing Ollama models:", error);
    return { models: [] };
  }
}

// Function to generate text with Ollama
export async function generateWithOllama(modelName: string, prompt: string, options = {}) {
  return await ollamaRequest("/generate", {
    method: "POST",
    body: JSON.stringify({
      model: modelName,
      prompt,
      options,
      stream: false,
    }),
  });
}

// Function to check if Ollama is running
export async function checkOllamaHealth() {
  try {
    await ollamaRequest("/tags");
    return true;
  } catch (error) {
    console.error("Ollama health check failed:", error);
    return false;
  }
}

// Function to pull a new model
export async function pullOllamaModel(modelName: string) {
  return await ollamaRequest("/pull", {
    method: "POST",
    body: JSON.stringify({
      name: modelName,
    }),
  });
}

// Function to stream model pulling progress
export async function streamPullOllamaModel(modelName: string) {
  const response = await fetch(`${OLLAMA_BASE_URL}/pull`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: modelName,
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama pull failed: ${response.status}`);
  }

  return response;
}
```

### Step 3: Create the Reasoning Engine

Create the file `lib/services/reasoning-engine.ts`:

```typescript
// lib/services/reasoning-engine.ts
import { generateWithOllama } from "../ollama-service";

// Define thinking stages
export enum ThinkingStage {
  IntentUnderstanding = 'intent_understanding',
  TaskClassification = 'task_classification',
  ExecutionPlanning = 'execution_planning',
  ResponseFormulation = 'response_formulation',
  ErrorRecovery = 'error_recovery'
}

// Task types
export enum TaskType {
  Conversation = 'conversation',
  DatasetManagement = 'dataset',
  ModelInference = 'inference',
  SystemCheck = 'system_check',
  Unknown = 'unknown'
}

// Interface for thinking step results
export interface ThinkingStepResult {
  stage: ThinkingStage;
  prompt: string;
  reasoning: string;
  confidence: number;
}

// Interface for the complete thinking process
export interface ThinkingProcess {
  userMessage: string;
  steps: ThinkingStepResult[];
  taskType: TaskType;
  taskPlan?: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
}

// Main reasoning engine class
export class ReasoningEngine {
  private llmModel: string = 'llama2'; // Default model
  private systemPrompt = `You are an AI assistant specialized in solving problems step-by-step.
You analyze user requests carefully and provide thoughtful, accurate responses.`;

  // Set the model to use
  public setModel(modelName: string): void {
    this.llmModel = modelName;
  }

  // Main thinking method that orchestrates all steps
  public async think(userMessage: string, conversationContext?: string): Promise<ThinkingProcess> {
    const thinkingProcess: ThinkingProcess = {
      userMessage,
      steps: [],
      taskType: TaskType.Unknown,
      startTime: new Date()
    };
    
    try {
      // Step 1: Understand user intent
      const intentStep = await this.executeThinkingStep(
        ThinkingStage.IntentUnderstanding,
        userMessage,
        conversationContext
      );
      thinkingProcess.steps.push(intentStep);
      
      // Step 2: Classify the task type
      const classificationStep = await this.executeThinkingStep(
        ThinkingStage.TaskClassification,
        userMessage,
        conversationContext
      );
      thinkingProcess.steps.push(classificationStep);
      thinkingProcess.taskType = this.determineTaskType(classificationStep.reasoning);
      
      // Step 3: Plan execution
      const planningStep = await this.executeThinkingStep(
        ThinkingStage.ExecutionPlanning,
        userMessage,
        conversationContext
      );
      thinkingProcess.steps.push(planningStep);
      thinkingProcess.taskPlan = planningStep.reasoning;
      
      // Complete the thinking process
      thinkingProcess.endTime = new Date();
      thinkingProcess.duration = thinkingProcess.endTime.getTime() - thinkingProcess.startTime.getTime();
      
      return thinkingProcess;
    } catch (error) {
      // Error recovery if any step fails
      const errorStep = await this.handleErrorRecovery(userMessage, error, conversationContext);
      thinkingProcess.steps.push(errorStep);
      
      // Complete the thinking process with error state
      thinkingProcess.endTime = new Date();
      thinkingProcess.duration = thinkingProcess.endTime.getTime() - thinkingProcess.startTime.getTime();
      
      return thinkingProcess;
    }
  }
  
  // Execute a single thinking step
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
      
      // Generate reasoning with LLM
      const response = await generateWithOllama(this.llmModel, fullPrompt);
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
  
  // Handle error recovery
  private async handleErrorRecovery(
    userMessage: string,
    error: any,
    conversationContext?: string
  ): Promise<ThinkingStepResult> {
    try {
      const errorPrompt = `An error occurred while processing the user's request: "${userMessage}".
The error was: ${error instanceof Error ? error.message : String(error)}
How should I respond to the user given this error?`;
      
      const recoveryStep = await this.executeThinkingStep(
        ThinkingStage.ErrorRecovery,
        userMessage,
        conversationContext,
        errorPrompt
      );
      
      return recoveryStep;
    } catch (recoveryError) {
      // If even error recovery fails, return a basic response
      console.error('Error recovery failed:', recoveryError);
      return {
        stage: ThinkingStage.ErrorRecovery,
        prompt: 'Error recovery',
        reasoning: "I apologize, but I'm experiencing technical difficulties. Please try again later.",
        confidence: 0.3
      };
    }
  }
  
  // Formulate a response based on thinking and API results
  public async formulateResponse(
    thinkingProcess: ThinkingProcess, 
    apiResults: any[], 
    conversationContext?: string
  ): Promise<ThinkingStepResult> {
    try {
      // Create a summary of API results for response formulation
      const apiResultsSummary = this.formatApiResultsForResponse(apiResults);
      
      // Build the response formulation prompt
      const promptTemplate = `Based on the user's request: "${thinkingProcess.userMessage}" and the information we've gathered:
      
API Results:
${apiResultsSummary}

Formulate a direct, informative response that addresses the user's needs.`;
      
      // Generate the response
      const responseStep = await this.executeThinkingStep(
        ThinkingStage.ResponseFormulation,
        thinkingProcess.userMessage,
        conversationContext,
        promptTemplate
      );
      
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
        // Ultimate fallback
        return {
          stage: ThinkingStage.ResponseFormulation,
          prompt: 'Response formulation failed',
          reasoning: 'I apologize, but I encountered an issue while processing your request. Could you please try again?',
          confidence: 0.3
        };
      }
    }
  }
  
  // Helper method to determine task type from classification reasoning
  private determineTaskType(reasoning: string): TaskType {
    const lowerCaseReasoning = reasoning.toLowerCase();
    
    if (lowerCaseReasoning.includes('dataset') || lowerCaseReasoning.includes('data management')) {
      return TaskType.DatasetManagement;
    }
    
    if (lowerCaseReasoning.includes('inference') || lowerCaseReasoning.includes('generate text') || 
        lowerCaseReasoning.includes('model') && lowerCaseReasoning.includes('output')) {
      return TaskType.ModelInference;
    }
    
    if (lowerCaseReasoning.includes('system') || lowerCaseReasoning.includes('status') || 
        lowerCaseReasoning.includes('connection') || lowerCaseReasoning.includes('health')) {
      return TaskType.SystemCheck;
    }
    
    // Default to conversation for general dialogue
    if (lowerCaseReasoning.includes('conversation') || lowerCaseReasoning.includes('chat') || 
        lowerCaseReasoning.includes('question') || lowerCaseReasoning.includes('talk')) {
      return TaskType.Conversation;
    }
    
    return TaskType.Unknown;
  }
  
  // Format API results for response formulation
  private formatApiResultsForResponse(apiResults: any[]): string {
    if (!apiResults || apiResults.length === 0) {
      return "No API results available.";
    }
    
    let formattedResults = "";
    
    apiResults.forEach(result => {
      formattedResults += `API Call: ${result.name}\n`;
      
      // Format based on the type of API call
      switch (result.name) {
        case 'listOllamaModels':
          const models = result.result?.models || [];
          formattedResults += `Found ${models.length} models\n`;
          if (models.length > 0) {
            models.slice(0, 5).forEach((model: any) => {
              formattedResults += `- ${model.name}\n`;
            });
            if (models.length > 5) {
              formattedResults += `- And ${models.length - 5} more...\n`;
            }
          } else {
            formattedResults += "No models found\n";
          }
          break;
          
        case 'checkSystemStatus':
          formattedResults += `Ollama connected: ${result.result?.ollamaConnected ? 'Yes' : 'No'}\n`;
          formattedResults += `Backend connected: ${result.result?.backendConnected ? 'Yes' : 'No'}\n`;
          break;
          
        default:
          formattedResults += `Result: ${JSON.stringify(result.result).slice(0, 100)}...\n`;
      }
      
      formattedResults += '\n';
    });
    
    return formattedResults;
  }
  
  // Create a fallback response
  private createFallbackResponse(thinkingProcess: ThinkingProcess, apiResults: any[]): string {
    // Check system status first
    const statusCall = apiResults.find(call => call.name === 'checkSystemStatus');
    const ollamaConnected = statusCall?.result?.ollamaConnected || false;
    const backendConnected = statusCall?.result?.backendConnected || false;
    
    if (!ollamaConnected) {
      return "I'm currently unable to connect to Ollama. Please make sure the service is running on your system.";
    }
    
    // Default fallback
    return "I processed your request but couldn't formulate a proper response. Please try again with a different question.";
  }
  
  // Calculate confidence based on reasoning quality
  private calculateConfidence(reasoning: string, stage: ThinkingStage): number {
    // Simple heuristic based on response length
    const length = reasoning.length;
    
    if (length < 50) return 0.3;
    if (length < 200) return 0.6;
    return 0.9;
  }
  
  // Get the stage-specific prompt
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
}

// Create a singleton instance
export const reasoningEngine = new ReasoningEngine();
```

### Step 4: Develop the Task Manager

Create the file `lib/services/task-manager.ts`:

```typescript
// lib/services/task-manager.ts
import { checkOllamaHealth, listOllamaModels } from "../ollama-service";
import { reasoningEngine, ThinkingProcess, TaskType } from "./reasoning-engine";

// Status of system connections
export interface SystemStatus {
  ollamaConnected: boolean;
  backendConnected: boolean;
}

// Message structure for conversation
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Reasoning step structure
export interface ReasoningStep {
  step: string;
  output: string;
}

// Task execution state
export interface TaskState {
  id: string;
  type: TaskType;
  status: 'pending' | 'in_progress' | 'complete' | 'error';
  message?: string;
  reasoning: ReasoningStep[];
  apiCalls: { name: string, result: any }[];
  startedAt: Date;
  completedAt?: Date;
  thinkingProcess?: ThinkingProcess;
}

// Task Manager implementation
export class TaskManager {
  private tasks: TaskState[] = [];
  private systemStatus: SystemStatus = {
    ollamaConnected: false,
    backendConnected: false,
  };
  private conversationHistory: Message[] = [];
  
  // Process a user message through the reasoning engine
  public async processUserMessage(userMessage: string): Promise<TaskState> {
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
    task.status = 'in_progress';
    
    try {
      // Get conversation context for reasoning
      const conversationContext = this.getConversationContext();
      
      // Use the reasoning engine for detailed thinking
      const thinkingProcess = await reasoningEngine.think(userMessage, conversationContext);
      task.thinkingProcess = thinkingProcess;
      task.type = thinkingProcess.taskType;
      
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
      
      // Add to conversation history
      this.addToConversationHistory({ role: 'user', content: userMessage });
      this.addToConversationHistory({ role: 'assistant', content: responseResult.reasoning });
      
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
  
  // Execute API calls based on task type
  private async executeApiCalls(task: TaskState, userMessage: string): Promise<void> {
    // Check system status
    const systemStatus = await this.checkSystemStatus();
    task.apiCalls.push({
      name: 'checkSystemStatus',
      result: systemStatus
    });
    
    // Execute task-specific API calls
    switch (task.type) {
      case TaskType.ModelInference:
        if (this.systemStatus.ollamaConnected) {
          try {
            const models = await listOllamaModels();
            task.apiCalls.push({
              name: 'listOllamaModels',
              result: models
            });
          } catch (error) {
            console.error('Error listing Ollama models:', error);
          }
        }
        break;
        
      case TaskType.SystemCheck:
        // Status already checked above
        break;
        
      default:
        // Default behavior for other task types
        if (this.systemStatus.ollamaConnected) {
          try {
            const models = await listOllamaModels();
            task.apiCalls.push({
              name: 'listOllamaModels',
              result: models
            });
          } catch (error) {
            console.error('Error listing models:', error);
          }
        }
    }
  }
  
  // Check system connection status
  private async checkSystemStatus(): Promise<SystemStatus> {
    try {
      // Check Ollama connection
      const ollamaConnected = await checkOllamaHealth();
      
      // Set backend to false for this simple implementation
      // In a real app, you'd check your actual backend
      const backendConnected = false;
      
      this.systemStatus = {
        ollamaConnected,
        backendConnected
      };
      
      return this.systemStatus;
    } catch (error) {
      console.error('Error checking system status:', error);
      return {
        ollamaConnected: false,
        backendConnected: false
      };
    }
  }
  
  // Get conversation history for context
  public getConversationContext(): string {
    return this.conversationHistory
      .map(msg => `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`)
      .join('\n');
  }
  
  // Add a message to the conversation history
  public addToConversationHistory(message: Message): void {
    this.conversationHistory.push(message);
    
    // Keep conversation history to a reasonable size
    if (this.conversationHistory.length > 10) {
      this.conversationHistory.shift();
    }
  }
  
  // Get all tasks
  public getTasks(): TaskState[] {
    return this.tasks;
  }
  
  // Get a specific task by ID
  public getTask(taskId: string): TaskState | undefined {
    return this.tasks.find(task => task.id === taskId);
  }
  
  // Get the most recent task
  public getLatestTask(): TaskState | undefined {
    if (this.tasks.length === 0) return undefined;
    return this.tasks[this.tasks.length - 1];
  }
}

// Create a singleton instance
export const taskManager = new TaskManager();
```

### Step 5: Build the UI Components

Create the core UI components:

1. First, create `components/chat-container.tsx` as shown in the UI Components section
2. Create `components/settings-panel.tsx` as shown in the UI Components section
3. Create `components/message-chat.tsx` for displaying individual messages
4. Create `components/step-indicator.tsx` for showing the thinking steps

### Step 6: Integrate Everything in your Main Page

Update `app/page.tsx`:

```tsx
// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ChatContainer } from '../components/chat-container';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <ChatContainer />
    </main>
  );
}
```

### Step 7: Test and Refine

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Start Ollama separately**:
   Make sure Ollama is running on your system.

3. **Test with various queries**:
   - Try simple questions to test conversation
   - Ask about available models to test system operations
   - Try complex multi-part requests to test reasoning

4. **Refine your prompts**:
   The quality of your agent largely depends on the prompts used for each thinking stage. Iterate on these based on your testing results.

5. **Monitor the thinking process**:
   Use the step indicator and thinking process display to understand how the agent is reasoning about requests.

### Step 8: Add Advanced Features

Once you have the basic reasoning agent working, consider adding these advanced features:

1. **Streaming responses** for more responsive UI
2. **Model configuration options** in the settings panel
3. **Conversation history persistence** with local storage
4. **Custom model support** with a Modelfile
5. **Function calling** for specific operations

### Step 9: Deploy Your Agent

For a production deployment:

1. **Package the application**:
   ```bash
   npm run build
   ```

2. **Deploy to a hosting service**:
   You can use Vercel, Netlify, or any other hosting service that supports Next.js.

3. **Set up Ollama on the server**:
   Users will need to run Ollama locally, as the agent connects to the locally running Ollama service.

4. **Create documentation**: 
   Help users understand how to set up and use your agent, including installing Ollama and pulling the necessary models.

Building a reasoning agent with Ollama provides a powerful, privacy-respecting AI assistant that runs entirely on your local machine. By following these steps, you can create a sophisticated agent that breaks down complex problems, provides transparent reasoning, and delivers high-quality responses.

## Advanced Topics

Once you have the basic implementation working, consider these advanced enhancements to make your reasoning agent more powerful and flexible.

### Streaming Responses

Implementing streaming for more responsive UI creates a much better user experience by showing partial responses as they're generated:

```typescript
// In ollama-service.ts
export async function streamFromOllama(modelName: string, prompt: string, options = {}) {
  const response = await fetch(`${OLLAMA_BASE_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: modelName,
      prompt,
      options,
      stream: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama streaming failed: ${response.status}`);
  }

  return response;
}

// In your UI component
const streamResponse = async () => {
  setIsLoading(true);
  setMessages(prev => [...prev, { role: 'user', content: input }]);
  setPartialResponse('');
  setIsStreaming(true);
  
  try {
    // Process the message through reasoning engine first
    const task = await taskManager.processUserMessage(input);
    
    // Get the prompt for generation
    const responseStep = task.reasoning.find(step => step.step === 'response_formulation');
    const prompt = responseStep ? responseStep.output : getResponseFromTask(task);
    
    // Stream the formatted response
    const response = await streamFromOllama(currentModel, prompt);
    const reader = response.body?.getReader();
    
    if (!reader) {
      setIsStreaming(false);
      setIsLoading(false);
      return;
    }
    
    // Process the stream
    let fullResponse = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      // Decode the chunk
      const decodedChunk = new TextDecoder().decode(value);
      
      try {
        // Parse each line (may contain multiple JSON objects)
        const lines = decodedChunk.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
          const data = JSON.parse(line);
          if (data.response) {
            fullResponse += data.response;
            setPartialResponse(fullResponse);
          }
        }
      } catch (e) {
        console.error('Error parsing streaming response:', e);
      }
    }
    
    // Finalize the message once streaming is complete
    setMessages(prev => [...prev, { role: 'assistant', content: fullResponse }]);
  } catch (error) {
    console.error('Error streaming response:', error);
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: 'Sorry, I encountered an error while generating a response.' 
    }]);
  } finally {
    setIsStreaming(false);
    setIsLoading(false);
    setInput('');
  }
};
```

### Function Calling

Implementing a simple function calling mechanism allows your agent to trigger specific actions:

```typescript
// Define available functions
const availableFunctions = {
  searchWeb: async (query: string) => {
    // Implementation for web search
    console.log(`Searching web for: ${query}`);
    return { results: [`Result 1 for ${query}`, `Result 2 for ${query}`] };
  },
  
  getWeather: async (location: string) => {
    // Implementation for weather lookup
    console.log(`Getting weather for: ${location}`);
    return { temperature: '72°F', conditions: 'Sunny', location };
  },
  
  calculateMath: (expression: string) => {
    // Simple calculator function
    try {
      // Be very careful with eval - this is just for demonstration
      // In production, use a safe math expression evaluator
      return { result: eval(expression) };
    } catch (error) {
      return { error: 'Invalid expression' };
    }
  }
};

// In your reasoning engine
private async executeFunctionCalls(plan: string): Promise<any[]> {
  const functionResults = [];
  
  // Extract function calls from the plan
  // Using regex for simplicity, but you might want a more robust parser
  const functionCallRegex = /call\s*\(\s*"(\w+)"\s*,\s*"([^"]*)"\s*\)/g;
  const matches = [...plan.matchAll(functionCallRegex)];
  
  for (const match of matches) {
    const [_, functionName, args] = match;
    
    if (functionName in availableFunctions) {
      try {
        const result = await availableFunctions[functionName](args);
        functionResults.push({
          function: functionName,
          args,
          result
        });
      } catch (error) {
        functionResults.push({
          function: functionName,
          args,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  }
  
  return functionResults;
}

// Update your ExecutionPlanning prompt to include function calling
private getStagePrompt(stage: ThinkingStage): string {
  switch (stage) {
    // ...existing cases
    
    case ThinkingStage.ExecutionPlanning:
      return `How should I fulfill this request? What steps need to be taken?
      
If external information is needed, you can use these functions:
- call("searchWeb", "query") - Search the web for information
- call("getWeather", "location") - Get current weather for a location
- call("calculateMath", "expression") - Calculate a mathematical expression

Include explicit function calls in your plan if they would help answer the query.`;
      
    // ...other cases
  }
}
```

### Context Management

Implementing better context management for longer conversations:

```typescript
export class ContextManager {
  private maxContextTokens = 2000; // Approximate token limit
  private conversations: Map<string, Message[]> = new Map();
  
  private estimateTokens(text: string): number {
    // Simple token estimation (words + punctuation)
    return text.split(/\s+/).length + text.split(/[.,!?;:]/).length - 1;
  }
  
  public addToContext(conversationId: string, message: Message): void {
    if (!this.conversations.has(conversationId)) {
      this.conversations.set(conversationId, []);
    }
    
    const messages = this.conversations.get(conversationId)!;
    messages.push(message);
    
    // Prune if context is too long
    this.pruneContextIfNeeded(conversationId);
  }
  
  public getContext(conversationId: string): Message[] {
    if (!this.conversations.has(conversationId)) {
      return [];
    }
    
    return [...this.conversations.get(conversationId)!];
  }
  
  public getFormattedContext(conversationId: string): string {
    const messages = this.getContext(conversationId);
    
    return messages
      .map(msg => `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`)
      .join('\n\n');
  }
  
  private pruneContextIfNeeded(conversationId: string): void {
    const messages = this.conversations.get(conversationId)!;
    
    // Calculate total tokens (rough estimation)
    let totalTokens = messages.reduce((sum, msg) => 
      sum + this.estimateTokens(msg.content), 0);
    
    // Keep removing oldest messages (except the first system message if any)
    // until we're under the token limit
    const startIndex = messages[0]?.role === 'system' ? 1 : 0;
    let currentIndex = startIndex;
    
    while (totalTokens > this.maxContextTokens && currentIndex < messages.length - 1) {
      const tokensInMessage = this.estimateTokens(messages[currentIndex].content);
      totalTokens -= tokensInMessage;
      currentIndex++;
    }
    
    // If we needed to remove messages, do it
    if (currentIndex > startIndex) {
      messages.splice(startIndex, currentIndex - startIndex);
    }
  }
  
  public clearContext(conversationId: string): void {
    // Preserve system message if there is one
    const messages = this.conversations.get(conversationId);
    if (messages && messages.length > 0 && messages[0].role === 'system') {
      this.conversations.set(conversationId, [messages[0]]);
    } else {
      this.conversations.delete(conversationId);
    }
  }
}
```

### Custom Model Integration

Support for specialized Ollama models with custom Modelfiles:

```bash
# Example Modelfile for a reasoning-specialized model
FROM llama2:13b
PARAMETER temperature 0.7
PARAMETER top_p 0.9
PARAMETER top_k 50
PARAMETER repeat_penalty 1.1

# System instruction that emphasizes reasoning
SYSTEM You are a reasoning agent that breaks down problems step-by-step. You analyze questions carefully before answering. You consider multiple angles and avoid jumping to conclusions. When appropriate, you explain your reasoning process explicitly. You are helpful, accurate, and thoughtful.
```

You can then build and use this model:

```bash
# Build the model
ollama create reasoning-agent -f ./Modelfile

# In your code
reasoningEngine.setModel('reasoning-agent');
```

### Performance Optimizations

Improving response time and reliability:

1. **Parallel API Calls**:

```typescript
// Execute API calls in parallel
private async executeApiCalls(task: TaskState, userMessage: string): Promise<void> {
  // Start all API calls concurrently
  const apiCallPromises = [];
  
  // Always check system status
  apiCallPromises.push(
    this.checkSystemStatus().then(status => ({
      name: 'checkSystemStatus',
      result: status
    }))
  );
  
  // Add task-specific calls
  if (task.type === TaskType.ModelInference) {
    apiCallPromises.push(
      listOllamaModels().then(models => ({
        name: 'listOllamaModels',
        result: models
      })).catch(error => {
        console.error('Error listing models:', error);
        return {
          name: 'listOllamaModels',
          result: { models: [] },
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      })
    );
  }
  
  // Wait for all API calls to complete
  const results = await Promise.all(apiCallPromises);
  
  // Add results to task
  task.apiCalls.push(...results);
  
  // Update system status from results
  const statusResult = results.find(r => r.name === 'checkSystemStatus');
  if (statusResult) {
    this.systemStatus = statusResult.result;
  }
}
```

2. **Response Caching**:

```typescript
// Simple cache implementation
class ResponseCache {
  private cache: Map<string, { response: string, timestamp: number }> = new Map();
  private maxCacheSize = 100;
  private cacheTTL = 60 * 60 * 1000; // 1 hour in milliseconds
  
  // Generate cache key from input and model
  private generateKey(model: string, prompt: string): string {
    return `${model}:${prompt.slice(0, 100)}`;
  }
  
  // Store a response in cache
  public set(model: string, prompt: string, response: string): void {
    const key = this.generateKey(model, prompt);
    this.cache.set(key, {
      response,
      timestamp: Date.now()
    });
    
    // Prune cache if it's too large
    if (this.cache.size > this.maxCacheSize) {
      // Remove oldest entries
      const sortedEntries = [...this.cache.entries()]
        .sort((a, b) => a[1].timestamp - b[1].timestamp);
      
      for (let i = 0; i < sortedEntries.length / 2; i++) {
        this.cache.delete(sortedEntries[i][0]);
      }
    }
  }
  
  // Get a cached response if available and not expired
  public get(model: string, prompt: string): string | null {
    const key = this.generateKey(model, prompt);
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    // Check if cache entry has expired
    if (Date.now() - cached.timestamp > this.cacheTTL) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.response;
  }
  
  // Clear the entire cache
  public clear(): void {
    this.cache.clear();
  }
}

// Use in your Ollama service
const responseCache = new ResponseCache();

export async function generateWithOllama(modelName: string, prompt: string, options = {}, allowCaching = true) {
  // Check cache if caching is allowed
  if (allowCaching) {
    const cachedResponse = responseCache.get(modelName, prompt);
    if (cachedResponse) {
      console.log('Using cached response');
      return { response: cachedResponse };
    }
  }
  
  // Generate response from Ollama
  const result = await ollamaRequest("/generate", {
    method: "POST",
    body: JSON.stringify({
      model: modelName,
      prompt,
      options,
      stream: false,
    }),
  });
  
  // Cache the response if appropriate
  if (allowCaching && result.response) {
    responseCache.set(modelName, prompt, result.response);
  }
  
  return result;
}
```

3. **Worker Threads for Intensive Operations**:

For Node.js environments, you can use worker threads to prevent blocking the main thread during intensive operations:

```typescript
// worker.js
const { parentPort } = require('worker_threads');

// Listen for messages from the main thread
parentPort.on('message', async (data) => {
  const { prompt, model } = data;
  
  try {
    // Heavy processing logic here
    const result = /* complex operation */;
    
    // Send result back to main thread
    parentPort.postMessage({ success: true, result });
  } catch (error) {
    parentPort.postMessage({ 
      success: false, 
      error: error.message 
    });
  }
});

// In your main code
import { Worker } from 'worker_threads';

function runWorker(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js');
    
    worker.on('message', (result) => {
      if (result.success) {
        resolve(result.result);
      } else {
        reject(new Error(result.error));
      }
      worker.terminate();
    });
    
    worker.on('error', reject);
    worker.postMessage(data);
  });
}
```

### Model Quantization

For faster inference on consumer hardware, use quantized models:

```typescript
// Define models with their characteristics
const AVAILABLE_MODELS = [
  {
    id: 'llama2:7b',
    name: 'Llama 2 (7B)',
    description: 'Full precision model, best quality but slowest',
    memoryRequired: '16GB+',
    speed: 'Slow'
  },
  {
    id: 'llama2:7b-q4_0',
    name: 'Llama 2 (7B Q4_0)',
    description: 'Quantized model, good balance of speed and quality',
    memoryRequired: '8GB+',
    speed: 'Medium'
  },
  {
    id: 'llama2:7b-q4_K_M',
    name: 'Llama 2 (7B Q4_K_M)',
    description: 'Highly quantized model, fastest but lower quality',
    memoryRequired: '6GB+',
    speed: 'Fast'
  }
];

// In your settings panel, recommend appropriate models based on system capabilities
function getRecommendedModel() {
  // Simple detection of available memory (this is simplified)
  const memoryInGB = navigator.deviceMemory || 8;
  
  if (memoryInGB >= 16) {
    return 'llama2:7b';
  } else if (memoryInGB >= 8) {
    return 'llama2:7b-q4_0';
  } else {
    return 'llama2:7b-q4_K_M';
  }
}
```

## Troubleshooting

This section addresses common issues you might encounter when building and using reasoning agents with Ollama.

### Ollama Connection Issues

#### Problem: Unable to connect to Ollama

Symptoms:
- Error messages like "Could not connect to Ollama server"
- Status indicator shows "Disconnected"

Solutions:

1. **Check if Ollama is running**:
   ```bash
   # On Windows, check for the process
   tasklist | findstr ollama
   
   # On macOS/Linux
   ps aux | grep ollama
   ```

2. **Verify the port isn't blocked**:
   ```bash
   # Check if something is using port 11434
   # Windows
   netstat -ano | findstr 11434
   
   # macOS/Linux
   netstat -tuln | grep 11434
   ```

3. **Check your firewall settings**:
   - Ensure Windows Firewall isn't blocking Ollama
   - Check any antivirus software that might be interfering

4. **Restart Ollama**:
   ```bash
   # Stop Ollama (may vary by platform)
   ollama stop
   
   # Start Ollama again
   ollama serve
   ```

5. **Check Ollama logs**:
   Ollama logs can provide insights into connection issues
   ```bash
   # On Linux
   journalctl -u ollama
   
   # Check the application logs directory on other platforms
   ```

### Model Loading Errors

#### Problem: "Model not found" errors

Symptoms:
- Error messages indicating a model couldn't be found
- Generation fails with model-related errors

Solutions:

1. **List available models** to verify what's installed:
   ```bash
   ollama list
   ```

2. **Pull the required model** if it's not listed:
   ```bash
   ollama pull llama2
   # Or for a specific variant
   ollama pull llama2:7b-q4_0
   ```

3. **Check disk space** for large models:
   ```bash
   # Windows
   dir "%USERPROFILE%\.ollama\models"
   
   # macOS/Linux
   du -sh ~/.ollama/models
   ```

4. **Verify model name spelling** in your code:
   ```typescript
   // Make sure the model name matches exactly
   const modelName = "llama2"; // Not "Llama2" or "llama-2"
   ```

5. **Try a different model format** if one specific format isn't working:
   ```bash
   # Try a different quantization level
   ollama pull llama2:7b-q4_0
   ```

### Slow Response Times

#### Problem: Responses take a long time

Symptoms:
- Long waiting times for responses
- UI feels sluggish during generation

Solutions:

1. **Use smaller models** for faster responses:
   ```typescript
   // Instead of
   reasoningEngine.setModel('llama2:13b');
   
   // Use
   reasoningEngine.setModel('llama2:7b-q4_0');
   ```

2. **Implement streaming** for better user experience:
   ```typescript
   const streamResponse = async () => {
     // Streaming implementation as shown in Advanced Topics
   };
   ```

3. **Optimize prompts** to be more concise:
   ```typescript
   // Instead of verbose prompts
   const prompt = `Based on the extensive conversation we've been having...`;
   
   // Use concise prompts
   const prompt = `Given our conversation context:`;
   ```

4. **Consider hardware limitations**:
   - CPU vs GPU performance is significant for Ollama
   - Add guidance in your UI about hardware requirements

5. **Implement response caching** for common queries as shown in Advanced Topics

### Reasoning Quality Issues

#### Problem: Poor reasoning or irrelevant responses

Symptoms:
- Answers don't match user requests
- Reasoning steps are illogical or incorrect
- Hallucinations or made-up information

Solutions:

1. **Refine system prompts** for each thinking stage:
   ```typescript
   switch (stage) {
     case ThinkingStage.IntentUnderstanding:
       return 'Carefully analyze what the user is asking. What is their explicit request? What might they implicitly need? Identify the core question or request.';
     
     // Other cases...
   }
   ```

2. **Use more specific task classification**:
   ```typescript
   private determineTaskType(reasoning: string): TaskType {
     // Add more specific categories
     if (lowerCaseReasoning.includes('factual question') || 
         lowerCaseReasoning.includes('asking for information')) {
       return TaskType.FactualQuery;
     }
     
     if (lowerCaseReasoning.includes('opinion') || 
         lowerCaseReasoning.includes('subjective')) {
       return TaskType.OpinionRequest;
     }
     
     // Other categories...
   }
   ```

3. **Try larger models** for complex reasoning:
   For tasks requiring sophisticated reasoning, use larger models like:
   ```typescript
   reasoningEngine.setModel('llama2:13b');
   ```

4. **Add step verification**:
   ```typescript
   private async verifyReasoningStep(step: ThinkingStepResult): Promise<boolean> {
     const verificationPrompt = `The following is a reasoning step: "${step.reasoning}"
     
     Evaluate if this reasoning makes logical sense and is free from contradictions or nonsensical statements. Respond with "VALID" if the reasoning is sound, or "INVALID" followed by the specific issues if there are problems.`;
     
     const verificationResult = await generateWithOllama(this.llmModel, verificationPrompt);
     const response = verificationResult.response || '';
     
     return response.includes('VALID') && !response.includes('INVALID');
   }
   ```

5. **Add explicit examples** in your prompts:
   ```typescript
   const examplePrompt = `
   Example of good reasoning:
   User asked: "What are the health benefits of exercise?"
   
   Intent Analysis: The user is asking about positive health effects of physical activity.
   Task Classification: This is a factual information request about health and fitness.
   Execution Plan: I'll provide scientifically supported benefits of regular exercise.
   `;
   ```

### Memory Usage

#### Problem: High memory consumption

Symptoms:
- Application crashes with out-of-memory errors
- System becomes sluggish during model operations
- Browser tab crashes in web applications

Solutions:

1. **Use quantized models** for lower memory footprint:
   ```bash
   # Pull a quantized model instead of full precision
   ollama pull llama2:7b-q4_0
   ```

2. **Implement context pruning** for longer conversations:
   ```typescript
   // Use the ContextManager implementation from Advanced Topics
   const contextManager = new ContextManager();
   
   // Add messages to context
   contextManager.addToContext(conversationId, message);
   
   // Get pruned context
   const context = contextManager.getFormattedContext(conversationId);
   ```

3. **Monitor memory usage** in your application:
   ```typescript
   // Basic memory usage logging
   function logMemoryUsage() {
     if (typeof window !== 'undefined' && window.performance && window.performance.memory) {
       const memoryInfo = window.performance.memory;
       console.log(`Total JS heap size: ${memoryInfo.totalJSHeapSize / (1024 * 1024)} MB`);
       console.log(`Used JS heap size: ${memoryInfo.usedJSHeapSize / (1024 * 1024)} MB`);
     }
   }
   
   // Call before and after intensive operations
   ```

4. **Split complex operations** across multiple steps:
   Instead of one complex reasoning process, break it into smaller parts with separate model calls.

5. **Run Ollama on a separate machine** for resource-intensive workloads:
   ```typescript
   // Configure Ollama service to connect to remote instance
   let OLLAMA_BASE_URL = "http://192.168.1.100:11434/api"; // Remote machine
   ```

### Other Common Issues

#### Incorrect API Endpoint Configuration

If you're getting consistent connection errors, double-check your API endpoint:

```typescript
// Ensure the base URL is correctly formatted
let OLLAMA_BASE_URL = process.env.NEXT_PUBLIC_OLLAMA_BASE_URL || "http://127.0.0.1:11434";

// Add "/api" if not already present
if (!OLLAMA_BASE_URL.endsWith('/api') && !OLLAMA_BASE_URL.includes('/api/')) {
  OLLAMA_BASE_URL = `${OLLAMA_BASE_URL}/api`;
}
```

#### CORS Issues in Web Applications

If using Ollama in a web application, you might encounter CORS errors:

```typescript
// You may need to set up a proxy server in development
// In next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/ollama/:path*',
        destination: 'http://localhost:11434/api/:path*',
      },
    ];
  },
};

// Then update your API base URL
let OLLAMA_BASE_URL = "/api/ollama";
```

#### Handling Timeouts

For operations that might take a long time:

```typescript
// Set up timeout handling
async function ollamaRequestWithTimeout(endpoint: string, options = {}, timeoutMs = 30000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await ollamaRequest(endpoint, {
      ...options,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new OllamaError('Operation timed out', 'TIMEOUT');
    }
    
    throw error;
  }
}
```

By understanding these common issues and their solutions, you can build more robust reasoning agents that provide a reliable and efficient user experience. 