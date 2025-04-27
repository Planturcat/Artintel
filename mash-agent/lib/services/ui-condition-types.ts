/**
 * UI Condition Types - Defines the types of user conditions that can be used 
 * to generate personalized UI code
 */

/**
 * Main UI condition categories
 */
export enum UIConditionCategory {
  Accessibility = 'accessibility',
  DeviceType = 'device_type',
  UserPreference = 'user_preference',
  BrandingStyle = 'branding_style',
  PerformanceNeeds = 'performance_needs',
  LegacySupport = 'legacy_support',
  ContentDensity = 'content_density'
}

/**
 * Specific accessibility requirements
 */
export enum AccessibilityCondition {
  ScreenReader = 'screen_reader',
  ColorBlindness = 'color_blindness',
  MotorImpairment = 'motor_impairment',
  CognitiveImpairment = 'cognitive_impairment',
  LowVision = 'low_vision',
  Dyslexia = 'dyslexia',
  HighContrast = 'high_contrast',
  ReducedMotion = 'reduced_motion'
}

/**
 * Device type conditions
 */
export enum DeviceTypeCondition {
  Mobile = 'mobile',
  Tablet = 'tablet',
  Desktop = 'desktop',
  TV = 'tv',
  WearableDevice = 'wearable'
}

/**
 * User preference conditions
 */
export enum UserPreferenceCondition {
  DarkMode = 'dark_mode',
  LightMode = 'light_mode',
  ReducedAnimations = 'reduced_animations',
  LargeText = 'large_text',
  MinimalistDesign = 'minimalist_design',
  HighDensityContent = 'high_density_content'
}

/**
 * Branding style conditions
 */
export enum BrandingStyleCondition {
  Modern = 'modern',
  Corporate = 'corporate',
  Playful = 'playful',
  Luxury = 'luxury',
  Minimal = 'minimal',
  Technical = 'technical',
  Vintage = 'vintage'
}

/**
 * Performance need conditions
 */
export enum PerformanceCondition {
  LowBandwidth = 'low_bandwidth',
  LowSpecDevice = 'low_spec_device',
  OfflineSupport = 'offline_support',
  FastInteraction = 'fast_interaction',
  PoorConnection = 'poor_connection'
}

/**
 * Legacy support conditions
 */
export enum LegacySupportCondition {
  OlderBrowsers = 'older_browsers',
  IE11 = 'ie11',
  NoJavascript = 'no_javascript',
  BasicHTML = 'basic_html',
  PrintFriendly = 'print_friendly'
}

/**
 * Content density conditions
 */
export enum ContentDensityCondition {
  DataHeavy = 'data_heavy',
  TextHeavy = 'text_heavy',
  MediaRich = 'media_rich',
  SpacedOut = 'spaced_out',
  Compact = 'compact'
}

/**
 * A single UI condition with its value and priority
 */
export interface UICondition {
  category: UIConditionCategory;
  value: string;
  priority: number; // 1-10, higher numbers = higher priority
  confidence: number; // 0-1, confidence in this condition
  description?: string;
}

/**
 * A set of UI conditions
 */
export interface UIConditionSet {
  id: string;
  conditions: UICondition[];
  createdAt: Date;
  extractedFrom?: string; // reference to the user message or task
} 