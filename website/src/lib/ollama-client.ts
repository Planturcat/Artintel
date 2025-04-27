"use client";

/**
 * Ollama API client for MASH chatbot
 * Provides functions for checking Ollama status, streaming completions, and handling audio transcription
 */

// Type definitions for Ollama API
export interface OllamaCompletionRequest {
  model: string;
  messages: {
    role: "system" | "user" | "assistant";
    content: string;
  }[];
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
}

export interface OllamaCompletionResponse {
  model: string;
  message?: {
    role: string;
    content: string;
  };
  done: boolean;
}

/**
 * Check if Ollama server is running and available
 * @returns Promise<boolean> - true if connected, false otherwise
 */
export const checkOllamaStatus = async (): Promise<boolean> => {
  try {
    // In a real implementation, this would make an API call to Ollama's status endpoint
    // For demo purposes, we'll simulate a successful connection
    console.log("Checking Ollama connection status...");
    return true;
  } catch (error) {
    console.error("Failed to connect to Ollama:", error);
    return false;
  }
};

/**
 * Streams a completion from Ollama with the provided messages
 * @param request - Ollama completion request parameters
 * @param onChunk - Callback function that receives each chunk of the streamed response
 * @param onComplete - Callback function called when streaming is complete
 * @param onError - Callback function called when an error occurs
 * @returns Promise<void>
 */
export const streamCompletion = async (
  request: OllamaCompletionRequest,
  onChunk: (chunk: OllamaCompletionResponse) => void,
  onComplete?: () => void,
  onError?: (error: Error) => void
): Promise<void> => {
  try {
    // In a real implementation, this would stream from the Ollama API
    // For demo purposes, we'll simulate a streaming response
    console.log("Streaming completion from Ollama...");
    
    const words = [
      "I'm", "MASH-BOT,", "your", "AI", "assistant.", 
      "I", "can", "help", "you", "with", "questions", 
      "about", "Artintel", "platform,", "language", "models,", 
      "and", "AI", "applications.", "How", "can", "I", "assist", "you", "today?"
    ];
    
    // Simulate streaming response word by word
    for (const word of words) {
      await new Promise(resolve => setTimeout(resolve, 100));
      onChunk({
        model: request.model,
        message: {
          role: "assistant",
          content: word + " "
        },
        done: false
      });
    }
    
    // Signal completion
    onChunk({
      model: request.model,
      done: true
    });
    
    // Call onComplete callback if provided
    if (onComplete) {
      onComplete();
    }
    
  } catch (error) {
    console.error("Error in streaming completion:", error);
    // Call onError callback if provided
    if (onError && error instanceof Error) {
      onError(error);
    }
    throw error;
  }
};

/**
 * Transcribes audio data to text
 * @param audioBlob - Audio data as Blob
 * @returns Promise<string> - Transcribed text
 */
export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  try {
    // In a real implementation, this would call a speech-to-text service
    // For demo purposes, we'll return a fixed response
    console.log("Transcribing audio...");
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return "This is a simulated transcription of the audio recording.";
  } catch (error) {
    console.error("Error transcribing audio:", error);
    throw error;
  }
}; 