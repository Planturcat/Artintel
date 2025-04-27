// Service for interacting with locally hosted Ollama models

// Base URL for the Ollama API
let OLLAMA_BASE_URL = process.env.NEXT_PUBLIC_OLLAMA_BASE_URL || "http://127.0.0.1:11434"

// Ensure base URL has the correct format
if (!OLLAMA_BASE_URL.endsWith('/api') && !OLLAMA_BASE_URL.includes('/api/')) {
  OLLAMA_BASE_URL = `${OLLAMA_BASE_URL}/api`
}

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

// Helper function for safe fetch with error handling
async function safeFetch(url: string, options?: RequestInit) {
  try {
    // Add proper headers and credentials for cross-origin requests if needed
    const fetchOptions: RequestInit = {
      ...options,
      credentials: 'same-origin',
      headers: {
        ...options?.headers,
      },
    };

    // Use the global fetch with proper error handling
    // Wrap in try-catch to handle any potential fetch errors
    try {
      const response = await fetch(url, fetchOptions);

      // Add logging for debugging
      console.log(`Fetch to ${url} completed with status: ${response.status}`);

      return response;
    } catch (fetchError) {
      console.error("Fetch execution error:", fetchError);
      throw fetchError; // Re-throw to be caught by the outer try-catch
    }
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

// Helper function to determine the appropriate base URL
export function setOllamaBaseUrl(mode: 'local' | 'auto' | 'custom' = 'auto', customUrl?: string) {
  if (mode === 'local') {
    OLLAMA_BASE_URL = 'http://127.0.0.1:11434/api'
  } else if (mode === 'auto') {
    // Auto-detect using window.location in browser
    if (typeof window !== 'undefined') {
      // Always default to localhost for Ollama - it's always a local service
      OLLAMA_BASE_URL = `http://127.0.0.1:11434/api`
    } else {
      // Default to localhost if not in browser
      OLLAMA_BASE_URL = 'http://127.0.0.1:11434/api'
    }
  } else if (mode === 'custom' && customUrl) {
    OLLAMA_BASE_URL = customUrl.endsWith('/api') ? customUrl : `${customUrl}/api`
  }

  console.log(`Ollama API URL set to: ${OLLAMA_BASE_URL}`)
  return OLLAMA_BASE_URL
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

// Helper function for Ollama API requests
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
    // First try a simple connectivity check by using fetch with a timeout
    // This helps provide a clearer error message if the server is unreachable
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

    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.message.includes('Connection failed')) {
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

// Function to list available Ollama models
export async function listOllamaModels() {
  try {
    console.log("Fetching available Ollama models")

    // Use the retry operation for better reliability
    const response = await retryOperation(() => ollamaRequest("/tags"), 2);

    // Normalize response format between different Ollama API versions
    if (response.models) {
      console.log(`Found ${response.models.length} models`)
      return { models: response.models }
    } else if (response.tags) {
      console.log(`Found ${response.tags.length} tags (models)`)
      return { models: response.tags }
    }

    console.log("Response:", response)
    return response
  } catch (error) {
    console.error("Error listing Ollama models:", error)
    // Return empty array instead of throwing to make the app more resilient
    return { models: [] }
  }
}

// Function to generate text with Ollama
export async function generateWithOllama(modelName: string, prompt: string, options = {}, isReasoningOperation = false) {
  try {
    console.log(`Generating with model: ${modelName} (${isReasoningOperation ? 'reasoning operation' : 'standard request'})`)

    return await ollamaRequest("/generate", {
      method: "POST",
      body: JSON.stringify({
        model: modelName,
        prompt,
        options,
        stream: false,
      }),
    }, isReasoningOperation) // Pass the longTimeout flag for reasoning operations
  } catch (error) {
    console.error(`Error generating with Ollama model ${modelName}:`, error)

    // Provide user-friendly error messages based on error type
    if (error instanceof OllamaError) {
      switch (error.type) {
        case 'NOT_FOUND':
          throw new Error(`Model '${modelName}' not found. Please ensure it's available in your Ollama installation.`);
        case 'CONNECTION':
          throw new Error("Cannot connect to Ollama. Please check if Ollama is running properly.");
        case 'TIMEOUT':
          throw new Error("Ollama took too long to respond. This might happen with large models or complex prompts.");
        case 'SERVER_ERROR':
          throw new Error("Ollama server encountered an error. Please check the logs and restart if necessary.");
        default:
          throw error;
      }
    }

    throw error;
  }
}

// Function to get Ollama model info
export async function getOllamaModelInfo(modelName: string) {
  try {
    console.log(`Getting info for model: ${modelName}`)
    return await ollamaRequest("/show", {
      method: "POST",
      body: JSON.stringify({
        name: modelName,
      }),
    })
  } catch (error) {
    console.error(`Error getting info for model ${modelName}:`, error)

    // Provide user-friendly error based on error type
    if (error instanceof OllamaError && error.type === 'NOT_FOUND') {
      throw new Error(`Model '${modelName}' not found in your Ollama installation.`);
    }

    throw error;
  }
}

// Function to stream generation from Ollama model
export async function streamFromOllama(modelName: string, prompt: string, options = {}) {
  try {
    console.log(`Streaming from model: ${modelName}`)
    // Add timeout to fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    const response = await safeFetch(`${OLLAMA_BASE_URL}/generate`, {
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
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      let errorType: OllamaErrorType = 'API_ERROR';

      // Categorize common error status codes
      if (response.status === 404) {
        errorType = 'NOT_FOUND';
      } else if (response.status >= 500) {
        errorType = 'SERVER_ERROR';
      }

      const errorData = await response.json().catch(() => ({}))
      const errorMessage = errorData.error || `Ollama streaming request failed with status ${response.status}`

      throw new OllamaError(errorMessage, errorType, response.status);
    }

    return response.body
  } catch (error: any) {
    if (error instanceof OllamaError) {
      // Format a user-friendly message based on error type
      if (error.type === 'NOT_FOUND') {
        throw new Error(`Model '${modelName}' not found. Please check if it's installed.`);
      }
      throw error;
    }

    if (error.name === 'AbortError') {
      throw new OllamaError(
        "Request to Ollama timed out. Please check if Ollama is running properly.",
        'TIMEOUT'
      );
    }
    throw error
  }
}

// Function to pull a model from Ollama registry
export async function pullOllamaModel(modelName: string) {
  console.log(`Pulling model: ${modelName}`)

  try {
    return await ollamaRequest("/pull", {
      method: "POST",
      body: JSON.stringify({
        name: modelName,
      }),
    })
  } catch (error) {
    console.error(`Error pulling model ${modelName}:`, error)

    // Provide more helpful error messages
    if (error instanceof OllamaError) {
      switch (error.type) {
        case 'CONNECTION':
          throw new Error("Cannot connect to Ollama server. Please make sure Ollama is running.");
        case 'TIMEOUT':
          throw new Error(`Pulling model '${modelName}' timed out. This is normal for large models - please try again or check Ollama logs.`);
        case 'NOT_FOUND':
          throw new Error(`Model '${modelName}' not found in the Ollama registry. Please check the name and try again.`);
        default:
          throw error;
      }
    }

    throw error;
  }
}

// Simple health check function to verify Ollama is running
export async function checkOllamaHealth() {
  try {
    console.log("Checking Ollama health...")
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    // Use the /tags endpoint since it's more reliable
    const response = await safeFetch(`${OLLAMA_BASE_URL}/tags`, {
      method: "GET",
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (response.ok) {
      console.log("Ollama health check succeeded")
      return true
    }

    // Try alternative endpoints if the first fails
    const alternativeEndpoints = ["/", "/tags", "/api/tags"]
    for (const endpoint of alternativeEndpoints) {
      try {
        const altResponse = await safeFetch(`${OLLAMA_BASE_URL.replace('/api', '')}${endpoint}`, {
          method: "GET",
          signal: AbortSignal.timeout(2000)
        })

        if (altResponse.ok) {
          console.log(`Ollama health check succeeded with alternative endpoint: ${endpoint}`)
          return true
        }
      } catch (altError) {
        console.log(`Alternative endpoint ${endpoint} check failed:`, altError)
      }
    }

    console.log(`Ollama health check failed with status: ${response.status}`)
    return false
  } catch (error) {
    console.error("Ollama health check failed:", error)
    return false
  }
}

// Get a list of currently available Ollama models from the tags endpoint
export async function getAvailableModels(): Promise<string[]> {
  try {
    const response = await ollamaRequest("/tags");

    if (response && Array.isArray(response.models)) {
      return response.models.map((model: { name: string }) => model.name);
    } else if (response && Array.isArray(response.tags)) {
      return response.tags.map((tag: { name: string }) => tag.name);
    }

    return [];
  } catch (error) {
    console.error("Error getting available models:", error);
    return [];
  }
}

