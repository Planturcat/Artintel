// Simple test script for the UI Generator Reasoning Engine

import { UIGeneratorReasoningEngine } from '../lib/services/ui-generator-reasoning';

async function main() {
  // Initialize the reasoning engine
  const engine = new UIGeneratorReasoningEngine({
    llmModel: 'llama2:7b',
    onThinkingUpdate: (stage, content) => {
      console.log(`\n[${stage}]`);
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
    console.log("\nGenerated Code:");
    console.log("==============");
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