// AI Service - Abstraction layer for LLM interactions
import { generateWithOllama, checkOllamaHealth, listOllamaModels, streamFromOllama } from "../ollama-service";

/**
 * AI Service Types
 */
export type AIModelType = 'local' | 'cloud' | 'hybrid';
export type AIServiceStatus = 'connected' | 'disconnected' | 'error';

export interface AIModel {
  id: string;
  name: string;
  description?: string;
  type: AIModelType;
}

export interface AIServiceConnectionStatus {
  connected: boolean;
  responseTime?: number | null;
  availableModels?: string[];
  error?: string;
}

/**
 * AI Service - Provides a unified interface for interacting with AI models
 * Abstracts the underlying implementation (Ollama, API, etc.)
 */
export class AIService {
  private static instance: AIService;
  private status: AIServiceStatus = 'disconnected';
  private models: AIModel[] = [];
  private currentModel: string = '';

  private constructor() {
    // Private constructor for singleton pattern
  }

  /**
   * Get the singleton instance
   */
  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  /**
   * Check connection to AI service
   */
  public async checkConnection(silent: boolean = false): Promise<AIServiceConnectionStatus> {
    try {
      const isHealthy = await checkOllamaHealth();

      if (isHealthy) {
        this.status = 'connected';

        try {
          const modelsResponse = await listOllamaModels();
          const modelsList = modelsResponse.models || modelsResponse.tags || [];
          this.models = modelsList.map(model => ({
            id: model.name,
            name: model.name,
            description: model.details?.family || "Local AI model",
            type: 'local'
          }));

          return {
            connected: true,
            availableModels: this.models.map(m => m.id)
          };
        } catch (error) {
          console.error("Error fetching models:", error);
          return {
            connected: true,
            error: "Connected but couldn't fetch models"
          };
        }
      }

      this.status = 'disconnected';
      return {
        connected: false,
        error: "Could not connect to AI service"
      };
    } catch (error) {
      this.status = 'error';
      console.error("Connection check error:", error);
      return {
        connected: false,
        error: error instanceof Error ? error.message : "Unknown connection error"
      };
    }
  }

  /**
   * Generate text with AI model
   */
  public async generateText(prompt: string, options = {}, isReasoningOperation = false): Promise<any> {
    try {
      if (this.status !== 'connected') {
        await this.checkConnection(true);
      }

      // If still not connected after checking, return a fallback response
      if (this.status !== 'connected') {
        console.warn("AI service not connected, returning fallback response");
        return { response: "I'm currently unable to connect to the AI service. Please check your connection and try again." };
      }

      const result = await generateWithOllama(this.currentModel || 'llama2:7b', prompt, options, isReasoningOperation);
      return result;
    } catch (error) {
      console.error("Text generation error:", error);
      // Return a fallback response instead of throwing an error
      return { response: "I encountered an issue while generating a response. Please try again or check if the AI service is running properly." };
    }
  }

  /**
   * Stream text from AI model
   */
  public async streamText(prompt: string, options = {}): Promise<any> {
    try {
      if (this.status !== 'connected') {
        await this.checkConnection(true);
      }

      return await streamFromOllama(this.currentModel || 'llama2:7b', prompt, options);
    } catch (error) {
      console.error("Text streaming error:", error);
      throw new Error("Failed to stream text. Please check your connection and try again.");
    }
  }

  /**
   * Get available AI models
   */
  public async getModels(): Promise<AIModel[]> {
    if (this.models.length === 0) {
      await this.checkConnection(true);
    }
    return this.models;
  }

  /**
   * Set current AI model
   */
  public setCurrentModel(modelId: string): void {
    this.currentModel = modelId;
  }

  /**
   * Get current AI model
   */
  public getCurrentModel(): string {
    return this.currentModel;
  }

  /**
   * Get current connection status
   */
  public getStatus(): AIServiceStatus {
    return this.status;
  }
}

// Export singleton instance
export const aiService = AIService.getInstance();
