import { generateWithOllama, listOllamaModels } from '../ollama-service';

/**
 * Ollama connection status result
 */
export interface OllamaConnectionStatus {
  connected: boolean;
  responseTime: number | null;
  error?: string;
  availableModels?: string[];
  selectedModel?: string;
}

/**
 * Ollama diagnostic options
 */
export interface OllamaDiagnosticOptions {
  timeout?: number;
  retryCount?: number;
  retryDelay?: number;
}

/**
 * Service for diagnosing Ollama connection issues and providing health checks
 */
export class OllamaDiagnosticService {
  private static instance: OllamaDiagnosticService;
  private lastStatus: OllamaConnectionStatus | null = null;
  private checkInProgress: boolean = false;
  private statusListeners: Array<(status: OllamaConnectionStatus) => void> = [];
  private defaultOptions: OllamaDiagnosticOptions = {
    timeout: 10000,
    retryCount: 3,
    retryDelay: 1000
  };

  private constructor() {}

  /**
   * Get the singleton instance
   */
  public static getInstance(): OllamaDiagnosticService {
    if (!OllamaDiagnosticService.instance) {
      OllamaDiagnosticService.instance = new OllamaDiagnosticService();
    }
    return OllamaDiagnosticService.instance;
  }

  /**
   * Check Ollama connection with retry logic
   */
  public async checkConnection(
    modelName: string = 'llama2:7b',
    options?: OllamaDiagnosticOptions
  ): Promise<OllamaConnectionStatus> {
    // If already checking, return the last status or a pending status
    if (this.checkInProgress) {
      return this.lastStatus || { 
        connected: false, 
        responseTime: null,
        error: 'Connection check in progress'
      };
    }

    this.checkInProgress = true;
    const opts = { ...this.defaultOptions, ...options };
    let retries = 0;
    let status: OllamaConnectionStatus = {
      connected: false,
      responseTime: null
    };

    try {
      while (retries <= (opts.retryCount || 0)) {
        try {
          // Measure connection time
          const startTime = Date.now();
          
          // Try a simple Ollama generate call with minimal content
          await generateWithOllama(
            modelName,
            'Test connection',
            {
              temperature: 0.1,
              max_tokens: 5
            },
            false,
            opts.timeout
          );
          
          const endTime = Date.now();
          const responseTime = endTime - startTime;

          // Also get available models
          const modelsResponse = await listOllamaModels();
          const availableModels = modelsResponse.models?.map(m => m.name) || [];

          status = {
            connected: true,
            responseTime,
            availableModels,
            selectedModel: modelName
          };
          
          // Success! Break out of retry loop
          break;
        } catch (error) {
          retries++;
          
          // If we've hit the retry limit, throw the error
          if (retries > (opts.retryCount || 0)) {
            throw error;
          }
          
          // Otherwise wait before retrying
          await new Promise(resolve => setTimeout(resolve, opts.retryDelay));
        }
      }
    } catch (error) {
      console.error('Error connecting to Ollama:', error);
      status = {
        connected: false,
        responseTime: null,
        error: error instanceof Error ? error.message : 'Unknown connection error'
      };
    } finally {
      this.checkInProgress = false;
      this.lastStatus = status;
      
      // Notify listeners
      this.notifyListeners(status);
    }

    return status;
  }

  /**
   * Get detailed diagnostic information about Ollama
   */
  public async getDetailedDiagnostics(modelName: string = 'llama2:7b'): Promise<any> {
    try {
      // Check basic connection first
      const connectionStatus = await this.checkConnection(modelName);
      
      if (!connectionStatus.connected) {
        return {
          status: 'disconnected',
          error: connectionStatus.error,
          details: null
        };
      }
      
      // Get models info
      const modelsInfo = await listOllamaModels();
      
      // Try a more complex generation to test capability
      const complexTestStart = Date.now();
      const complexGeneration = await generateWithOllama(
        modelName,
        'Explain in 3 sentences what an LLM is.',
        {
          temperature: 0.7,
          max_tokens: 100
        }
      );
      const complexTestDuration = Date.now() - complexTestStart;
      
      return {
        status: 'connected',
        connectionLatency: connectionStatus.responseTime,
        models: modelsInfo.models,
        currentModel: modelName,
        complexGenerationTest: {
          duration: complexTestDuration,
          response: complexGeneration.response,
          successful: !!complexGeneration.response
        }
      };
    } catch (error) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error during diagnostics',
        details: null
      };
    }
  }

  /**
   * Subscribe to status updates
   */
  public subscribeToStatus(listener: (status: OllamaConnectionStatus) => void): () => void {
    this.statusListeners.push(listener);
    
    // If we have a last status, immediately notify the new listener
    if (this.lastStatus) {
      listener(this.lastStatus);
    }
    
    // Return unsubscribe function
    return () => {
      this.statusListeners = this.statusListeners.filter(l => l !== listener);
    };
  }

  /**
   * Get the last known status
   */
  public getLastStatus(): OllamaConnectionStatus | null {
    return this.lastStatus;
  }

  /**
   * Notify all listeners of a status update
   */
  private notifyListeners(status: OllamaConnectionStatus): void {
    this.statusListeners.forEach(listener => {
      try {
        listener(status);
      } catch (error) {
        console.error('Error in Ollama status listener:', error);
      }
    });
  }
}

// Export a singleton instance for easy access
export const ollamaDiagnosticService = OllamaDiagnosticService.getInstance(); 