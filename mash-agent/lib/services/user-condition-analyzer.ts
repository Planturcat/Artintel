import { ThinkingProcess, ThinkingStage, ThinkingStepResult } from "./reasoning-engine";
import { 
  UICondition, 
  UIConditionCategory, 
  UIConditionSet,
  AccessibilityCondition,
  DeviceTypeCondition,
  UserPreferenceCondition,
  BrandingStyleCondition,
  PerformanceCondition,
  LegacySupportCondition,
  ContentDensityCondition
} from "./ui-condition-types";
import { v4 as uuidv4 } from 'uuid';
import { generateWithOllama } from "../ollama-service";

/**
 * User Condition Analyzer - Analyzes reasoning engine output to extract UI conditions
 */
export class UserConditionAnalyzer {
  private llmModel: string = 'llama2:7b';
  private conditionSets: UIConditionSet[] = [];
  
  constructor(modelName?: string) {
    if (modelName) {
      this.llmModel = modelName;
    }
  }
  
  /**
   * Set the LLM model to use for condition analysis
   */
  public setModel(modelName: string): void {
    this.llmModel = modelName;
  }
  
  /**
   * Analyze a completed thinking process to extract UI conditions
   */
  public async analyzeThinkingProcess(thinkingProcess: ThinkingProcess): Promise<UIConditionSet> {
    // Create a new condition set
    const conditionSet: UIConditionSet = {
      id: uuidv4(),
      conditions: [],
      createdAt: new Date(),
      extractedFrom: thinkingProcess.userMessage
    };
    
    try {
      // Get the most relevant thinking steps for UI condition extraction
      const intentStep = thinkingProcess.steps.find(s => s.stage === ThinkingStage.IntentUnderstanding);
      const planningStep = thinkingProcess.steps.find(s => s.stage === ThinkingStage.ExecutionPlanning);
      
      if (!intentStep) {
        throw new Error("No intent understanding step found in thinking process");
      }
      
      // Extract conditions from intent understanding
      const extractedConditions = await this.extractConditionsFromReasoning(
        intentStep,
        thinkingProcess.userMessage
      );
      
      // If planning step exists, enhance with additional conditions
      if (planningStep) {
        const additionalConditions = await this.extractConditionsFromReasoning(
          planningStep,
          thinkingProcess.userMessage
        );
        
        // Merge and deduplicate conditions
        this.mergeConditions(extractedConditions, additionalConditions);
      }
      
      // Filter out low confidence conditions and sort by priority
      const filteredConditions = extractedConditions
        .filter(c => c.confidence > 0.4) // Only keep conditions with reasonable confidence
        .sort((a, b) => b.priority - a.priority); // Sort by priority descending
      
      conditionSet.conditions = filteredConditions;
      this.conditionSets.push(conditionSet);
      
      return conditionSet;
    } catch (error) {
      console.error("Error analyzing thinking process for UI conditions:", error);
      
      // Return empty condition set on error
      this.conditionSets.push(conditionSet);
      return conditionSet;
    }
  }
  
  /**
   * Extract conditions from a thinking step's reasoning
   */
  private async extractConditionsFromReasoning(
    step: ThinkingStepResult,
    userMessage: string
  ): Promise<UICondition[]> {
    const systemPrompt = `You are a UI requirement analyzer. Your task is to analyze user requests and identify specific UI conditions and requirements that should be considered when generating UI code.

Your analysis should identify conditions in these categories:
- Accessibility needs (screen reader support, color blindness, motor impairment, etc.)
- Device type preferences (mobile, tablet, desktop, TV, wearable)
- User preferences (dark mode, light mode, reduced animations, etc.)
- Branding styles (modern, corporate, playful, etc.)
- Performance needs (low bandwidth, offline support, etc.)
- Legacy support (older browsers, no JavaScript, etc.)
- Content density (data heavy, text heavy, media rich, etc.)

For each condition identified, provide:
1. The category
2. The specific value
3. A priority score (1-10, with 10 being highest priority)
4. A confidence score (0-1, indicating how certain you are of this condition)
5. A brief description of why this condition is relevant`;

    const prompt = `Based on the user message: "${userMessage}" 
    
And the thinking step reasoning: "${step.reasoning}"

Identify all UI conditions/requirements that should be considered when generating UI code for this user.

Return your analysis in JSON format as an array of condition objects:
[
  {
    "category": "category_name",
    "value": "specific_value",
    "priority": priority_score,
    "confidence": confidence_score,
    "description": "why this condition is relevant"
  }
]

Be specific and precise. Only include conditions that are explicitly stated or strongly implied.
If no conditions of a particular category are detected, don't include that category.`;

    try {
      // Query LLM to extract conditions
      const response = await generateWithOllama(this.llmModel, `${systemPrompt}\n\n${prompt}`, {}, true);
      const rawResponse = response.response || "[]";
      
      // Extract JSON from response
      const jsonMatch = rawResponse.match(/\[\s*\{.*\}\s*\]/s);
      const jsonString = jsonMatch ? jsonMatch[0] : "[]";
      
      // Parse conditions and validate
      let parsedConditions: any[] = [];
      
      try {
        parsedConditions = JSON.parse(jsonString);
      } catch (jsonError) {
        console.error("Error parsing condition JSON:", jsonError);
        return [];
      }
      
      // Convert to validated UICondition objects
      const validatedConditions: UICondition[] = [];
      
      for (const condition of parsedConditions) {
        if (this.isValidCondition(condition)) {
          validatedConditions.push({
            category: this.mapToConditionCategory(condition.category),
            value: condition.value,
            priority: Math.min(10, Math.max(1, condition.priority)), // Ensure priority is 1-10
            confidence: Math.min(1, Math.max(0, condition.confidence)), // Ensure confidence is 0-1
            description: condition.description
          });
        }
      }
      
      return validatedConditions;
    } catch (error) {
      console.error("Error extracting conditions from reasoning:", error);
      return [];
    }
  }
  
  /**
   * Validate if an object matches the UICondition structure
   */
  private isValidCondition(obj: any): boolean {
    return (
      obj &&
      typeof obj === 'object' &&
      typeof obj.category === 'string' &&
      typeof obj.value === 'string' &&
      typeof obj.priority === 'number' &&
      typeof obj.confidence === 'number'
    );
  }
  
  /**
   * Map a string category to a UIConditionCategory enum value
   */
  private mapToConditionCategory(category: string): UIConditionCategory {
    const lowerCategory = category.toLowerCase();
    
    if (lowerCategory.includes('access')) return UIConditionCategory.Accessibility;
    if (lowerCategory.includes('device')) return UIConditionCategory.DeviceType;
    if (lowerCategory.includes('preference')) return UIConditionCategory.UserPreference;
    if (lowerCategory.includes('brand')) return UIConditionCategory.BrandingStyle;
    if (lowerCategory.includes('performance')) return UIConditionCategory.PerformanceNeeds;
    if (lowerCategory.includes('legacy')) return UIConditionCategory.LegacySupport;
    if (lowerCategory.includes('content') || lowerCategory.includes('density')) return UIConditionCategory.ContentDensity;
    
    // Default to user preference if no match
    return UIConditionCategory.UserPreference;
  }
  
  /**
   * Merge and deduplicate two sets of conditions
   */
  private mergeConditions(target: UICondition[], source: UICondition[]): void {
    for (const condition of source) {
      // Check if this condition already exists
      const existingIndex = target.findIndex(c => 
        c.category === condition.category && c.value === condition.value
      );
      
      if (existingIndex >= 0) {
        // Update existing condition if new one has higher priority or confidence
        const existing = target[existingIndex];
        
        if (condition.priority > existing.priority || condition.confidence > existing.confidence) {
          // Use the higher values
          target[existingIndex] = {
            ...existing,
            priority: Math.max(existing.priority, condition.priority),
            confidence: Math.max(existing.confidence, condition.confidence),
            // Keep existing description if it's more detailed
            description: existing.description && existing.description.length > (condition.description?.length || 0) 
              ? existing.description 
              : condition.description
          };
        }
      } else {
        // Add new condition
        target.push(condition);
      }
    }
  }
  
  /**
   * Get the latest condition set
   */
  public getLatestConditionSet(): UIConditionSet | undefined {
    if (this.conditionSets.length === 0) return undefined;
    return this.conditionSets[this.conditionSets.length - 1];
  }
  
  /**
   * Get all condition sets
   */
  public getAllConditionSets(): UIConditionSet[] {
    return [...this.conditionSets];
  }
} 