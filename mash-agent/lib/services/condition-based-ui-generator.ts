import { ThinkingProcess } from "./reasoning-engine";
import { UserConditionAnalyzer } from "./user-condition-analyzer";
import { ConditionToUIMapper } from "./condition-to-ui-mapper";
import { UITemplateSystem, TemplateType, GeneratedTemplate } from "./ui-template-system";
import { UIConditionSet } from "./ui-condition-types";
import { v4 as uuidv4 } from 'uuid';
import { generateWithOllama } from "../ollama-service";

/**
 * Generated UI result including conditions, modifications, and generated code
 */
export interface GeneratedUI {
  id: string;
  userMessage: string;
  conditionSet: UIConditionSet;
  templates: GeneratedTemplate[];
  createdAt: Date;
}

/**
 * Main service for condition-based UI generation
 */
export class ConditionBasedUIGenerator {
  private conditionAnalyzer: UserConditionAnalyzer;
  private uiMapper: ConditionToUIMapper;
  private templateSystem: UITemplateSystem;
  private generatedUIs: GeneratedUI[] = [];
  private ollamaConnected: boolean = false;
  
  constructor(llmModel: string = 'llama2:7b') {
    this.conditionAnalyzer = new UserConditionAnalyzer(llmModel);
    this.uiMapper = new ConditionToUIMapper();
    this.templateSystem = new UITemplateSystem();
    // Check Ollama connection when initialized
    this.checkOllamaConnection();
  }
  
  /**
   * Check if Ollama is connected and available
   */
  private async checkOllamaConnection(): Promise<boolean> {
    try {
      // Try a simple Ollama generate call with minimal content
      await generateWithOllama(
        'llama2:7b', 
        'Test connection', 
        { 
          temperature: 0.1,
          max_tokens: 5
        }
      );
      this.ollamaConnected = true;
      return true;
    } catch (error) {
      console.error("Error connecting to Ollama in UI Generator:", error);
      this.ollamaConnected = false;
      return false;
    }
  }
  
  /**
   * Set the LLM model to use for condition analysis
   */
  public setModel(modelName: string): void {
    this.conditionAnalyzer.setModel(modelName);
  }
  
  /**
   * Generate a UI based on user conditions from a thinking process
   */
  public async generateUIFromThinking(
    thinkingProcess: ThinkingProcess,
    templateName: string = 'Card',
    templateType: TemplateType = TemplateType.React
  ): Promise<GeneratedUI> {
    try {
      // Ensure Ollama is connected
      if (!this.ollamaConnected) {
        const isConnected = await this.checkOllamaConnection();
        if (!isConnected) {
          throw new Error("Could not connect to Ollama. Please ensure Ollama is running.");
        }
      }
      
      // 1. Extract user conditions from the thinking process
      const conditionSet = await this.conditionAnalyzer.analyzeThinkingProcess(thinkingProcess);
      
      // 2. Map conditions to UI modifications
      const modificationSet = this.uiMapper.mapConditionsToModifications(conditionSet);
      
      // 3. Generate UI code based on the modifications
      const template = this.templateSystem.generateTemplate(templateName, templateType, modificationSet);
      
      // 4. Create the final result
      const generatedUI: GeneratedUI = {
        id: uuidv4(),
        userMessage: thinkingProcess.userMessage,
        conditionSet,
        templates: [template],
        createdAt: new Date()
      };
      
      // Store for reference
      this.generatedUIs.push(generatedUI);
      
      return generatedUI;
    } catch (error) {
      console.error("Error generating UI from thinking process:", error);
      throw error;
    }
  }
  
  /**
   * Generate multiple UI components based on user conditions from a thinking process
   */
  public async generateUIComponentsFromThinking(
    thinkingProcess: ThinkingProcess,
    componentRequests: Array<{ name: string; type: TemplateType }>
  ): Promise<GeneratedUI> {
    try {
      // Ensure Ollama is connected
      if (!this.ollamaConnected) {
        const isConnected = await this.checkOllamaConnection();
        if (!isConnected) {
          throw new Error("Could not connect to Ollama. Please ensure Ollama is running.");
        }
      }
      
      // 1. Extract user conditions from the thinking process
      const conditionSet = await this.conditionAnalyzer.analyzeThinkingProcess(thinkingProcess);
      
      // 2. Map conditions to UI modifications
      const modificationSet = this.uiMapper.mapConditionsToModifications(conditionSet);
      
      // 3. Generate UI code for each requested component
      const templates: GeneratedTemplate[] = [];
      
      for (const request of componentRequests) {
        try {
          const template = this.templateSystem.generateTemplate(
            request.name, 
            request.type, 
            modificationSet
          );
          templates.push(template);
        } catch (error) {
          console.error(`Error generating template ${request.name} (${request.type}):`, error);
          // Continue with other templates
        }
      }
      
      // 4. Create the final result
      const generatedUI: GeneratedUI = {
        id: uuidv4(),
        userMessage: thinkingProcess.userMessage,
        conditionSet,
        templates,
        createdAt: new Date()
      };
      
      // Store for reference
      this.generatedUIs.push(generatedUI);
      
      return generatedUI;
    } catch (error) {
      console.error("Error generating UI components from thinking process:", error);
      throw error;
    }
  }
  
  /**
   * Generate UI code directly from a user message
   * This is a convenience method when a ThinkingProcess isn't available
   */
  public async generateUIFromUserMessage(
    userMessage: string,
    templateName: string = 'Card',
    templateType: TemplateType = TemplateType.React,
    reasoningEngine: any
  ): Promise<GeneratedUI> {
    try {
      // Ensure Ollama is connected
      if (!this.ollamaConnected) {
        const isConnected = await this.checkOllamaConnection();
        if (!isConnected) {
          throw new Error("Could not connect to Ollama. Please ensure Ollama is running.");
        }
      }
      
      // 1. Run the thinking process with the provided reasoning engine
      const thinkingProcess = await reasoningEngine.think(userMessage);
      
      // 2. Generate UI using the thinking process
      return this.generateUIFromThinking(thinkingProcess, templateName, templateType);
    } catch (error) {
      console.error("Error generating UI from user message:", error);
      throw error;
    }
  }
  
  /**
   * Get the most recently generated UI
   */
  public getLatestGeneratedUI(): GeneratedUI | undefined {
    if (this.generatedUIs.length === 0) return undefined;
    return this.generatedUIs[this.generatedUIs.length - 1];
  }
  
  /**
   * Get all generated UIs
   */
  public getAllGeneratedUIs(): GeneratedUI[] {
    return [...this.generatedUIs];
  }
  
  /**
   * Get a specific generated UI by ID
   */
  public getGeneratedUIById(id: string): GeneratedUI | undefined {
    return this.generatedUIs.find(ui => ui.id === id);
  }
  
  /**
   * Get available templates that can be used for UI generation
   */
  public getAvailableTemplates() {
    return this.templateSystem.getAvailableTemplates();
  }
  
  /**
   * Check if the generator is connected to Ollama
   */
  public isConnectedToOllama(): boolean {
    return this.ollamaConnected;
  }
} 