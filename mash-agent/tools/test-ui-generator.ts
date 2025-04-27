#!/usr/bin/env tsx

import { UIGeneratorReasoningEngine, UIGenerationStage } from '../lib/services/ui-generator-reasoning';
import * as fs from 'fs/promises';
import * as path from 'path';
import chalk from 'chalk';

/**
 * CLI tool to test the UI Generator Reasoning Engine
 */
async function main() {
  try {
    // Get user requirement from command line arguments
    const args = process.argv.slice(2);
    const userRequirement = args[0] || 'Create a simple form component with name, email and message fields';
    const outputPath = args[1] || path.join(process.cwd(), 'generated-ui-components');
    const modelName = args[2] || 'llama2:7b';

    console.log(chalk.cyan('🚀 UI Generator Reasoning Engine Test'));
    console.log(chalk.yellow('Requirement:'), userRequirement);
    console.log(chalk.yellow('Model:'), modelName);
    console.log(chalk.yellow('Output Path:'), outputPath);
    console.log();

    // Create output directory if it doesn't exist
    await fs.mkdir(outputPath, { recursive: true });

    // Initialize the reasoning engine with callbacks
    const engine = new UIGeneratorReasoningEngine({
      llmModel: modelName,
      onThinkingUpdate: (stage, content) => {
        const stageDisplay = stage.split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
          
        console.log(
          chalk.green(`\n💭 [${stageDisplay}]`),
          chalk.gray('───────────────────────────────')
        );
        
        // Only show a preview of long content
        const contentPreview = content.length > 200 
          ? content.substring(0, 200) + '...' 
          : content;
        console.log(chalk.white(contentPreview));
      }
    });

    // Start timing
    const startTime = Date.now();
    console.log(chalk.green('\n🧠 Starting generation process...\n'));

    // Generate the UI component
    const generatedCode = await engine.generateUIComponent(userRequirement);
    
    // Get the full generation process for metadata
    const process = engine.getLatestGenerationProcess();
    
    // End timing
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000; // Convert to seconds
    
    console.log(chalk.green('\n✅ Generation complete!'));
    console.log(chalk.yellow('Component Type:'), process?.componentType || 'Unknown');
    console.log(chalk.yellow('Ollama Integration:'), process?.ollamaIntegration ? 'Yes' : 'No');
    console.log(chalk.yellow('Duration:'), `${duration.toFixed(2)}s`);
    
    // Save the generated code to a file
    const safeFileName = userRequirement
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 40);
      
    const fileName = `${safeFileName}-${Date.now()}.tsx`;
    const filePath = path.join(outputPath, fileName);
    
    await fs.writeFile(filePath, generatedCode);
    console.log(chalk.green('\n💾 Component saved to:'), filePath);
    
    // Display code preview
    console.log(chalk.green('\n📄 Code Preview:'));
    console.log(chalk.gray('────────────────────────────────────────────'));
    const codePreview = generatedCode.split('\n').slice(0, 15).join('\n');
    console.log(chalk.white(codePreview));
    console.log(chalk.gray('... (rest of the code)'));
    
    // Save the complete generation process for debugging
    const processLogPath = path.join(outputPath, `${safeFileName}-process-${Date.now()}.json`);
    await fs.writeFile(processLogPath, JSON.stringify(process, null, 2));
    console.log(chalk.green('\n📊 Process log saved to:'), processLogPath);
    
  } catch (error) {
    console.error(chalk.red('\n❌ Error:'), error);
    process.exit(1);
  }
}

// Run the main function
main(); 