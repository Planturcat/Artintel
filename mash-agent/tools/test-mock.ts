// Mock test script for the UI Generator Reasoning Engine

import { UIGeneratorReasoningEngine, UIGenerationStage, UIComponentType } from '../lib/services/ui-generator-reasoning';

// Mock the executeThinkingStep method to bypass Ollama
class MockUIGeneratorEngine extends UIGeneratorReasoningEngine {
  // Override executeThinkingStep to provide mock responses
  protected async executeThinkingStep(
    stage: UIGenerationStage,
    userRequirement: string,
    designContext?: string,
    promptTemplate?: string
  ) {
    // Call the thinking update callback if provided
    if (this['onThinkingUpdate']) {
      this['onThinkingUpdate'](stage, this.getMockReasoningForStage(stage, userRequirement));
    }
    
    // Return a mock step result
    return {
      stage,
      prompt: promptTemplate || 'Mock prompt',
      reasoning: this.getMockReasoningForStage(stage, userRequirement),
      confidence: 0.9
    };
  }
  
  // Helper method to get mock reasoning content for a stage
  private getMockReasoningForStage(stage: UIGenerationStage, userRequirement: string): string {
    switch (stage) {
      case UIGenerationStage.RequirementAnalysis:
        return `This component needs to check if Ollama is available by making API calls to the Ollama service. 
Key requirements:
1. Make HTTP requests to check Ollama availability
2. Show loading state during checks
3. Display success/error messages based on connection status
4. Provide a way to retry the connection check
5. Show response time metrics for successful connections`;
        
      case UIGenerationStage.ComponentIdentification:
        return `Based on the requirement to check if Ollama is available, the most appropriate component type would be an OllamaSettings component. This component type is specifically designed to handle Ollama API connection testing and configuration.

The OllamaSettings component is perfect for this task because:
1. It's designed to interact with the Ollama API endpoints
2. It handles connection testing and validation
3. It provides appropriate UI feedback for connection states
4. It can display technical details about the connection

Therefore, I recommend using the OllamaSettings component type for this requirement.`;
        
      case UIGenerationStage.StructurePlanning:
        return `For this OllamaSettings component focused on connection testing, we'll need the following structure:

Component Hierarchy:
1. Main OllamaConnectionTest container
   - ConnectionStatus display section
   - Connection test controls
   - Results display area

State Variables:
1. isChecking: boolean - Whether a connection check is in progress
2. connectionResult: { success: boolean; message: string; responseTime?: number } | null - The result of the connection test
3. ollamaEndpoint: string - The Ollama API endpoint URL (with default)

Event Handlers:
1. handleCheckConnection() - Initiates the connection test
2. handleEndpointChange() - Updates the endpoint URL

API Integration:
1. checkOllamaConnection() - Function to test the Ollama API connection
   - Makes a GET request to the Ollama health endpoint
   - Measures response time
   - Handles errors and timeouts
   - Returns structured result

This structure will allow for a clean, focused component that performs exactly the required functionality.`;
        
      case UIGenerationStage.StyleDetermination:
        return `For this OllamaSettings component that tests connections, we need a clean, informative design that clearly communicates connection status.

Color Scheme:
- Use semantic colors: green for success, red for errors, blue for in-progress states
- Maintain high contrast for accessibility
- Use subtle backgrounds with stronger text colors

Layout:
- Create a card-like container with clear sections
- Group related elements (status indicator with status text)
- Use appropriate spacing between sections

Visual Feedback:
- Spinner/loading indicator during connection checks
- Clear icons to indicate success/failure states
- Response time display for successful connections

Specific Tailwind Classes:
- Container: 'border rounded-lg p-6 bg-white shadow-sm max-w-md mx-auto'
- Status section: 'flex items-center gap-3 p-4 rounded-md bg-gray-50'
- Success state: 'text-green-600 bg-green-50 border-green-100'
- Error state: 'text-red-600 bg-red-50 border-red-100'
- Loading state: 'text-blue-600 bg-blue-50 border-blue-100'
- Test button: 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md'
- Response time: 'text-sm font-mono bg-gray-100 px-2 py-1 rounded'`;
        
      case UIGenerationStage.CodeGeneration:
        return `\`\`\`tsx
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Loader2, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface ConnectionTestResult {
  success: boolean;
  message: string;
  responseTime?: number;
}

export interface OllamaConnectionTestProps {
  defaultEndpoint?: string;
  onConnectionChange?: (status: boolean) => void;
}

export function OllamaConnectionTest({
  defaultEndpoint = 'http://localhost:11434',
  onConnectionChange
}: OllamaConnectionTestProps) {
  // State for connection testing
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [connectionResult, setConnectionResult] = useState<ConnectionTestResult | null>(null);
  const [ollamaEndpoint, setOllamaEndpoint] = useState<string>(defaultEndpoint);

  // Check connection on mount
  useEffect(() => {
    checkConnection();
  }, []);

  // Update parent component when connection status changes
  useEffect(() => {
    if (connectionResult && onConnectionChange) {
      onConnectionChange(connectionResult.success);
    }
  }, [connectionResult, onConnectionChange]);

  // Function to test connection to Ollama
  const checkConnection = async () => {
    setIsChecking(true);
    setConnectionResult(null);
    
    try {
      const startTime = performance.now();
      
      // Make request to Ollama health endpoint
      const response = await fetch(\`\${ollamaEndpoint}/api/version\`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);
      
      if (response.ok) {
        const data = await response.json();
        setConnectionResult({
          success: true,
          message: \`Connected to Ollama \${data.version || 'server'}\`,
          responseTime
        });
      } else {
        setConnectionResult({
          success: false,
          message: \`Error: \${response.status} \${response.statusText}\`
        });
      }
    } catch (error) {
      setConnectionResult({
        success: false,
        message: \`Connection failed: \${error instanceof Error ? error.message : String(error)}\`
      });
    } finally {
      setIsChecking(false);
    }
  };

  // Handle endpoint change
  const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOllamaEndpoint(e.target.value);
  };

  return (
    <Card className="border rounded-lg shadow-sm max-w-md mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Ollama Connection Test</CardTitle>
        <CardDescription>
          Check if your Ollama service is available
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Endpoint Input */}
        <div className="space-y-2">
          <label htmlFor="endpoint" className="text-sm font-medium">
            Ollama Endpoint
          </label>
          <div className="flex space-x-2">
            <Input
              id="endpoint"
              value={ollamaEndpoint}
              onChange={handleEndpointChange}
              placeholder="http://localhost:11434"
              className="flex-1"
              disabled={isChecking}
            />
            <Button 
              onClick={checkConnection} 
              disabled={isChecking}
              aria-label="Test connection"
            >
              {isChecking ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Test
            </Button>
          </div>
        </div>
        
        {/* Connection Status */}
        {(isChecking || connectionResult) && (
          <div className={\`flex items-center gap-3 p-4 rounded-md mt-4 \${
            isChecking 
              ? 'bg-blue-50 text-blue-600 border border-blue-100' 
              : connectionResult?.success 
                ? 'bg-green-50 text-green-600 border border-green-100' 
                : 'bg-red-50 text-red-600 border border-red-100'
          }\`}>
            {isChecking ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : connectionResult?.success ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            
            <div className="flex-1">
              <p className="font-medium">
                {isChecking 
                  ? 'Checking connection...' 
                  : connectionResult?.success 
                    ? 'Connected' 
                    : 'Connection Failed'
                }
              </p>
              {!isChecking && connectionResult && (
                <p className="text-sm">
                  {connectionResult.message}
                </p>
              )}
            </div>
            
            {!isChecking && connectionResult?.success && connectionResult.responseTime && (
              <div className="text-sm font-mono bg-green-100 px-2 py-1 rounded text-green-800">
                {connectionResult.responseTime}ms
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default OllamaConnectionTest;
\`\`\``;
        
      case UIGenerationStage.ErrorRecovery:
        return "After encountering an error, I recommend creating a simplified version of the connection test component that focuses just on the core functionality of testing the Ollama connection and displaying the result.";
        
      default:
        return `Mock reasoning for stage: ${stage}`;
    }
  }
  
  // Override handleErrorRecovery to provide mock responses
  protected async handleErrorRecovery(
    userRequirement: string, 
    error: any, 
    designContext?: string
  ) {
    return {
      stage: UIGenerationStage.ErrorRecovery,
      prompt: 'Mock error recovery prompt',
      reasoning: this.getMockReasoningForStage(UIGenerationStage.ErrorRecovery, userRequirement),
      confidence: 0.6
    };
  }
}

async function main() {
  // Initialize the mock reasoning engine
  const engine = new MockUIGeneratorEngine({
    onThinkingUpdate: (stage, content) => {
      // Format stage name for display
      const stageName = stage.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
        
      console.log(`\n[${stageName}]`);
      console.log(`${content.substring(0, 100)}...`);
    }
  });

  try {
    // Test requirement
    const requirement = "Create a connection test component that checks if Ollama is available";
    console.log(`\nGenerating UI for: "${requirement}"`);
    
    // Generate the component
    const code = await engine.generateUIComponent(requirement);
    
    // Print the generated code
    console.log("\nGenerated Code (First 500 chars):");
    console.log("================================");
    console.log(code.substring(0, 500) + "...");
    
    // Get the process details
    const process = engine.getLatestGenerationProcess();
    console.log("\nComponent Type:", process?.componentType);
    console.log("Ollama Integration:", process?.ollamaIntegration ? "Yes" : "No");
    
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the test
main(); 