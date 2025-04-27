#!/usr/bin/env node

import { ollamaDiagnostic } from "../lib/services/ollama-diagnostic";

/**
 * Simple CLI to run Ollama diagnostics
 */
async function main() {
  console.log("\n🔍 Running Ollama Diagnostic Tool 🔍\n");
  console.log("This tool will check your Ollama installation and available models");
  console.log("--------------------------------------------------------------\n");
  
  try {
    console.log("Starting diagnostic...");
    const result = await ollamaDiagnostic.runFullDiagnostic();
    
    console.log("\n📊 Diagnostic Results 📊\n");
    
    // Connection status
    console.log("🔌 Connection Status:");
    console.log(`  Connected: ${result.isConnected ? '✅ Yes' : '❌ No'}`);
    if (result.connectionTime) {
      console.log(`  Connection Time: ${result.connectionTime}ms`);
    }
    console.log();
    
    // Available models
    console.log("📚 Available Models:");
    if (result.availableModels.length === 0) {
      console.log("  ❌ No models found");
    } else {
      result.availableModels.forEach(model => {
        console.log(`  - ${model}`);
      });
    }
    console.log();
    
    // Errors
    if (result.errors.length > 0) {
      console.log("⚠️ Errors:");
      result.errors.forEach(error => {
        console.log(`  - ${error}`);
      });
      console.log();
    }
    
    // Recommendations
    if (result.recommendations.length > 0) {
      console.log("💡 Recommendations:");
      result.recommendations.forEach(rec => {
        console.log(`  - ${rec}`);
      });
      console.log();
    }
    
    // Model details (if available and requested)
    const showDetails = process.argv.includes("--details");
    if (showDetails && Object.keys(result.modelDetails).length > 0) {
      console.log("🔬 Model Details:");
      for (const [model, details] of Object.entries(result.modelDetails)) {
        console.log(`  ${model}:`);
        console.log(`    ${JSON.stringify(details, null, 2).replace(/\n/g, '\n    ')}`);
      }
      console.log();
    }
    
    console.log("--------------------------------------------------------------");
    console.log(`Diagnostic completed ${result.errors.length === 0 ? 'successfully ✅' : 'with errors ⚠️'}`);
    
    // Extra model check (requested model)
    if (process.argv.length > 2 && !process.argv[2].startsWith("--")) {
      const modelToCheck = process.argv[2];
      console.log(`\n🔍 Checking requested model: ${modelToCheck}`);
      
      const isAvailable = await ollamaDiagnostic.isModelAvailable(modelToCheck);
      console.log(`Model ${modelToCheck}: ${isAvailable ? '✅ Available' : '❌ Not available'}`);
      
      if (!isAvailable) {
        const alternative = await ollamaDiagnostic.findAlternativeModel(modelToCheck);
        if (alternative) {
          console.log(`💡 Alternative model found: ${alternative}`);
        } else {
          console.log("❌ No alternative models available");
        }
      }
      console.log();
    }
    
  } catch (error) {
    console.error("\n❌ Diagnostic failed with error:", error);
    console.log("\n💡 Recommendation: Make sure Ollama is installed and running on your system");
  }
}

main().catch(console.error); 