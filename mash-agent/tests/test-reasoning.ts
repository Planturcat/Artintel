/**
 * Test script for reasoning engine
 * 
 * This can be used to test the reasoning engine's functionality without the UI
 * Run with: npx ts-node tests/test-reasoning.ts
 */

import { reasoningEngine } from "../lib/services/reasoning-engine";
import { taskManager } from "../lib/services/task-manager";

async function testReasoning() {
  console.log("Testing Reasoning Engine...");
  
  try {
    // Test direct reasoning
    console.log("\n--- Direct Reasoning Test ---");
    const userMessage = "Can you help me fine-tune a model for sentiment analysis?";
    console.log(`User Message: "${userMessage}"`);
    
    const thinkingProcess = await reasoningEngine.think(userMessage);
    
    console.log("\nThinking Steps:");
    thinkingProcess.steps.forEach((step, index) => {
      console.log(`\n[Step ${index + 1}] ${step.stage}`);
      console.log(`Confidence: ${step.confidence}`);
      console.log(`Reasoning: ${step.reasoning.slice(0, 200)}...`);
    });
    
    console.log(`\nTask Type: ${thinkingProcess.taskType}`);
    console.log(`Duration: ${thinkingProcess.duration}ms`);
    
    // Test task manager
    console.log("\n\n--- Task Manager Test ---");
    
    // Add conversation context
    taskManager.addToConversationHistory({ 
      role: 'system', 
      content: 'You are an AI assistant that specializes in machine learning tasks.' 
    });
    
    taskManager.addToConversationHistory({ 
      role: 'user', 
      content: 'Hello, I need help with a machine learning task.' 
    });
    
    taskManager.addToConversationHistory({ 
      role: 'assistant', 
      content: 'I\'d be happy to help! What kind of machine learning task are you working on?' 
    });
    
    // Process a new message
    const newMessage = "I want to analyze some text data for sentiment. What model should I use?";
    console.log(`User Message: "${newMessage}"`);
    
    const task = await taskManager.processUserMessage(newMessage);
    
    console.log("\nReasoning Steps:");
    task.reasoning.forEach((step, index) => {
      console.log(`\n[Step ${index + 1}] ${step.step}`);
      console.log(`Output: ${step.output.slice(0, 200)}...`);
    });
    
    console.log(`\nTask Type: ${task.type}`);
    console.log(`Status: ${task.status}`);
    console.log(`Duration: ${
      task.completedAt ? task.completedAt.getTime() - task.startedAt.getTime() : 'N/A'
    }ms`);
    
    // Get the response
    const response = taskManager.getTaskResponse(task);
    console.log(`\nFinal Response: "${response.slice(0, 200)}..."`);
    
    console.log("\nTests completed successfully!");
  } catch (error) {
    console.error("Error during testing:", error);
  }
}

// Run the tests
testReasoning().then(() => console.log("Done!")).catch(console.error); 