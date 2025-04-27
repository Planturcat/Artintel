const { uiGeneratorReasoningEngine, UIComponentType } = require('./lib/services/ui-generator-reasoning');

/**
 * Test the UI Generator Reasoning Engine by generating an Ollama Chat component
 */
async function testOllamaChatGeneration() {
  console.log('🧪 Testing UI Generator Reasoning Engine with Ollama Chat request...');
  console.log('⏳ This may take a minute or two to complete...\n');
  
  const startTime = Date.now();
  
  // Define a chat interface requirement
  const userRequirement = `
    Create a chat interface component that connects to the Ollama API. 
    The component should have a message input at the bottom, a scrollable message history area, 
    and should display both user messages and AI responses with different styling.
    It should support streaming responses from the AI model and show a typing indicator.
    Include a model selector dropdown and a button to clear the chat history.
  `;
  
  try {
    // Generate the UI component
    const generationProcess = await uiGeneratorReasoningEngine.generateUI(userRequirement);
    
    // Calculate duration
    const duration = (Date.now() - startTime) / 1000;
    console.log(`✅ Component generated in ${duration.toFixed(2)} seconds\n`);
    
    // Validate component type
    console.log(`Component Type: ${generationProcess.componentType}`);
    console.log(`Ollama Integration: ${generationProcess.ollamaIntegration ? 'Yes' : 'No'}\n`);
    
    if (generationProcess.componentType !== UIComponentType.OllamaChat && !generationProcess.ollamaIntegration) {
      console.log('❌ ERROR: Expected component type to be OllamaChat or have Ollama integration');
      process.exit(1);
    }
    
    // Check if code was generated
    if (!generationProcess.generatedCode) {
      console.log('❌ ERROR: No code was generated');
      process.exit(1);
    }
    
    // Check that the code contains expected Ollama API integration features
    const codeChecks = [
      { pattern: /fetch\s*\(\s*('|"|`)[^'"]*ollama/i, description: 'Ollama API endpoint' },
      { pattern: /stream\s*:/i, description: 'Stream parameter' },
      { pattern: /\sconst\s+\[\s*messages\s*,\s*setMessages\s*\]\s*=/i, description: 'Message state management' },
      { pattern: /TextDecoder|decoder/i, description: 'Streaming text handling' }
    ];
    
    console.log('Checking for expected code features:');
    
    let passedChecks = 0;
    for (const check of codeChecks) {
      const passed = check.pattern.test(generationProcess.generatedCode);
      console.log(`${passed ? '✅' : '❌'} ${check.description}`);
      if (passed) passedChecks++;
    }
    
    // Show code snippets
    console.log('\nCode Snippets (first 500 chars):');
    console.log('```');
    console.log(generationProcess.generatedCode.slice(0, 500) + '...');
    console.log('```\n');
    
    // Output test result
    const successRate = (passedChecks / codeChecks.length) * 100;
    console.log(`Test Result: ${successRate.toFixed(0)}% of checks passed`);
    
    if (successRate >= 75) {
      console.log('✅ TEST PASSED: The UI Generator successfully created an Ollama-integrated component');
    } else {
      console.log('❌ TEST FAILED: The UI Generator did not create a proper Ollama-integrated component');
      process.exit(1);
    }
    
    // Show thinking process summary
    console.log('\nThinking Process Summary:');
    generationProcess.steps.forEach(step => {
      console.log(`- ${step.stage}: Confidence ${(step.confidence * 100).toFixed(0)}%`);
    });
    
  } catch (error) {
    console.error('❌ TEST ERROR:', error);
    process.exit(1);
  }
}

// Run the test
testOllamaChatGeneration(); 