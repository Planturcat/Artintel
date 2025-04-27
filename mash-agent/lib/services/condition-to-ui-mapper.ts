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

/**
 * UI modification to apply based on conditions
 */
export interface UIModification {
  id: string;
  type: string;
  target: string; // CSS selector, component type, or special target
  modification: string;
  value: string;
  priority: number;
  reasoning: string;
}

/**
 * Mapping result with all modifications to apply
 */
export interface UIModificationSet {
  id: string;
  modifications: UIModification[];
  appliedConditions: UICondition[];
  createdAt: Date;
}

/**
 * Maps user conditions to specific UI modifications
 */
export class ConditionToUIMapper {
  // Counter for generating unique IDs
  private modCounter: number = 0;
  
  /**
   * Map a set of UI conditions to specific UI modifications
   */
  public mapConditionsToModifications(conditionSet: UIConditionSet): UIModificationSet {
    const modificationSet: UIModificationSet = {
      id: `ui-mod-${Date.now()}`,
      modifications: [],
      appliedConditions: [],
      createdAt: new Date()
    };
    
    // Process each condition by category
    for (const condition of conditionSet.conditions) {
      // Apply mapping based on category
      const modifications = this.mapConditionToModifications(condition);
      
      if (modifications.length > 0) {
        // Add modifications to the set
        modificationSet.modifications.push(...modifications);
        modificationSet.appliedConditions.push(condition);
      }
    }
    
    // Sort modifications by priority
    modificationSet.modifications.sort((a, b) => b.priority - a.priority);
    
    return modificationSet;
  }
  
  /**
   * Map a single UI condition to specific UI modifications
   */
  private mapConditionToModifications(condition: UICondition): UIModification[] {
    switch (condition.category) {
      case UIConditionCategory.Accessibility:
        return this.mapAccessibilityCondition(condition);
        
      case UIConditionCategory.DeviceType:
        return this.mapDeviceTypeCondition(condition);
        
      case UIConditionCategory.UserPreference:
        return this.mapUserPreferenceCondition(condition);
        
      case UIConditionCategory.BrandingStyle:
        return this.mapBrandingStyleCondition(condition);
        
      case UIConditionCategory.PerformanceNeeds:
        return this.mapPerformanceCondition(condition);
        
      case UIConditionCategory.LegacySupport:
        return this.mapLegacySupportCondition(condition);
        
      case UIConditionCategory.ContentDensity:
        return this.mapContentDensityCondition(condition);
        
      default:
        return [];
    }
  }
  
  /**
   * Create a UI modification object
   */
  private createModification(
    type: string,
    target: string,
    modification: string,
    value: string,
    priority: number,
    reasoning: string
  ): UIModification {
    return {
      id: `mod-${++this.modCounter}`,
      type,
      target,
      modification,
      value,
      priority,
      reasoning
    };
  }
  
  /**
   * Map accessibility conditions to UI modifications
   */
  private mapAccessibilityCondition(condition: UICondition): UIModification[] {
    const modifications: UIModification[] = [];
    const value = condition.value.toLowerCase();
    
    // Screen reader support
    if (value.includes('screen_reader') || value.includes('screen reader')) {
      modifications.push(
        this.createModification(
          'a11y',
          'all',
          'aria',
          'true',
          condition.priority,
          'Added ARIA attributes for screen reader support'
        ),
        this.createModification(
          'a11y',
          'images',
          'alt-text',
          'required',
          condition.priority,
          'Ensure all images have alt text'
        ),
        this.createModification(
          'a11y',
          'interactive',
          'keyboard-nav',
          'enhanced',
          condition.priority,
          'Enhanced keyboard navigation for interactive elements'
        )
      );
    }
    
    // Color blindness
    if (value.includes('color_blind') || value.includes('color blind')) {
      modifications.push(
        this.createModification(
          'a11y',
          'colors',
          'contrast',
          'high',
          condition.priority,
          'Use high contrast color combinations'
        ),
        this.createModification(
          'a11y',
          'status',
          'dual-indicators',
          'true',
          condition.priority,
          'Use both color and shape/text for status indicators'
        )
      );
    }
    
    // Motor impairment
    if (value.includes('motor') || value.includes('mobility')) {
      modifications.push(
        this.createModification(
          'a11y',
          'interactive',
          'target-size',
          'large',
          condition.priority,
          'Increase size of interactive elements'
        ),
        this.createModification(
          'a11y',
          'spacing',
          'element-spacing',
          'increased',
          condition.priority,
          'Increase spacing between interactive elements'
        )
      );
    }
    
    // Low vision
    if (value.includes('low_vision') || value.includes('vision')) {
      modifications.push(
        this.createModification(
          'a11y',
          'text',
          'font-size',
          'larger',
          condition.priority,
          'Increase base font size'
        ),
        this.createModification(
          'a11y',
          'text',
          'zoom-support',
          'true',
          condition.priority,
          'Ensure layout works with page zoom'
        )
      );
    }
    
    // High contrast
    if (value.includes('high_contrast') || value.includes('contrast')) {
      modifications.push(
        this.createModification(
          'a11y',
          'theme',
          'contrast',
          'high',
          condition.priority,
          'Use high contrast color theme'
        )
      );
    }
    
    // Reduced motion
    if (value.includes('reduced_motion') || value.includes('motion')) {
      modifications.push(
        this.createModification(
          'a11y',
          'animation',
          'reduced-motion',
          'true',
          condition.priority,
          'Minimize or eliminate animations'
        )
      );
    }
    
    return modifications;
  }
  
  /**
   * Map device type conditions to UI modifications
   */
  private mapDeviceTypeCondition(condition: UICondition): UIModification[] {
    const modifications: UIModification[] = [];
    const value = condition.value.toLowerCase();
    
    // Mobile
    if (value.includes('mobile')) {
      modifications.push(
        this.createModification(
          'layout',
          'structure',
          'layout-type',
          'mobile-first',
          condition.priority,
          'Use mobile-first layout design'
        ),
        this.createModification(
          'layout',
          'navigation',
          'nav-style',
          'mobile-optimized',
          condition.priority,
          'Use mobile-optimized navigation (hamburger menu)'
        ),
        this.createModification(
          'interaction',
          'touch',
          'touch-targets',
          'large',
          condition.priority,
          'Use larger touch targets for mobile'
        )
      );
    }
    
    // Tablet
    if (value.includes('tablet')) {
      modifications.push(
        this.createModification(
          'layout',
          'structure',
          'layout-type',
          'tablet-optimized',
          condition.priority,
          'Use tablet-optimized layout'
        ),
        this.createModification(
          'layout',
          'orientation',
          'support-orientation',
          'both',
          condition.priority,
          'Support both portrait and landscape orientations'
        )
      );
    }
    
    // Desktop
    if (value.includes('desktop')) {
      modifications.push(
        this.createModification(
          'layout',
          'structure',
          'layout-type',
          'desktop-optimized',
          condition.priority,
          'Use desktop-optimized layout with wider content area'
        ),
        this.createModification(
          'layout',
          'navigation',
          'nav-style',
          'horizontal',
          condition.priority,
          'Use horizontal navigation bar'
        )
      );
    }
    
    // TV
    if (value.includes('tv')) {
      modifications.push(
        this.createModification(
          'layout',
          'structure',
          'layout-type',
          'tv-optimized',
          condition.priority,
          'Use TV-optimized layout with large text and simplified navigation'
        ),
        this.createModification(
          'interaction',
          'navigation',
          'remote-friendly',
          'true',
          condition.priority,
          'Optimize for remote control navigation'
        )
      );
    }
    
    // Wearable
    if (value.includes('wearable')) {
      modifications.push(
        this.createModification(
          'layout',
          'structure',
          'layout-type',
          'minimal',
          condition.priority,
          'Use minimal layout optimized for tiny screens'
        ),
        this.createModification(
          'content',
          'text',
          'brevity',
          'extreme',
          condition.priority,
          'Use extremely concise text content'
        )
      );
    }
    
    return modifications;
  }
  
  /**
   * Map user preference conditions to UI modifications
   */
  private mapUserPreferenceCondition(condition: UICondition): UIModification[] {
    const modifications: UIModification[] = [];
    const value = condition.value.toLowerCase();
    
    // Dark mode
    if (value.includes('dark_mode') || value.includes('dark')) {
      modifications.push(
        this.createModification(
          'theme',
          'colorScheme',
          'theme-mode',
          'dark',
          condition.priority,
          'Use dark color scheme'
        )
      );
    }
    
    // Light mode
    if (value.includes('light_mode') || value.includes('light')) {
      modifications.push(
        this.createModification(
          'theme',
          'colorScheme',
          'theme-mode',
          'light',
          condition.priority,
          'Use light color scheme'
        )
      );
    }
    
    // Reduced animations
    if (value.includes('reduced_animations') || value.includes('animation')) {
      modifications.push(
        this.createModification(
          'animation',
          'all',
          'animation-level',
          'minimal',
          condition.priority,
          'Minimize or eliminate animations'
        )
      );
    }
    
    // Large text
    if (value.includes('large_text') || value.includes('large text')) {
      modifications.push(
        this.createModification(
          'typography',
          'text',
          'font-size',
          'larger',
          condition.priority,
          'Use larger text sizes'
        )
      );
    }
    
    // Minimalist design
    if (value.includes('minimalist') || value.includes('minimal')) {
      modifications.push(
        this.createModification(
          'design',
          'style',
          'visual-style',
          'minimalist',
          condition.priority,
          'Use minimalist visual style'
        ),
        this.createModification(
          'layout',
          'whitespace',
          'spacing',
          'generous',
          condition.priority,
          'Use generous whitespace'
        )
      );
    }
    
    // High density content
    if (value.includes('high_density') || value.includes('dense')) {
      modifications.push(
        this.createModification(
          'layout',
          'density',
          'content-density',
          'high',
          condition.priority,
          'Use high-density content layout'
        ),
        this.createModification(
          'layout',
          'whitespace',
          'spacing',
          'compact',
          condition.priority,
          'Use compact spacing'
        )
      );
    }
    
    return modifications;
  }
  
  /**
   * Map branding style conditions to UI modifications
   */
  private mapBrandingStyleCondition(condition: UICondition): UIModification[] {
    const modifications: UIModification[] = [];
    const value = condition.value.toLowerCase();
    
    // Different branding styles
    if (value.includes('modern')) {
      modifications.push(
        this.createModification(
          'branding',
          'style',
          'visual-style',
          'modern',
          condition.priority,
          'Use modern visual style with clean lines and minimal ornamentation'
        )
      );
    } else if (value.includes('corporate')) {
      modifications.push(
        this.createModification(
          'branding',
          'style',
          'visual-style',
          'corporate',
          condition.priority,
          'Use professional corporate style with conservative color scheme'
        )
      );
    } else if (value.includes('playful')) {
      modifications.push(
        this.createModification(
          'branding',
          'style',
          'visual-style',
          'playful',
          condition.priority,
          'Use playful style with vibrant colors and rounded shapes'
        )
      );
    } else if (value.includes('luxury')) {
      modifications.push(
        this.createModification(
          'branding',
          'style',
          'visual-style',
          'luxury',
          condition.priority,
          'Use luxury style with elegant typography and refined color palette'
        )
      );
    } else if (value.includes('minimal')) {
      modifications.push(
        this.createModification(
          'branding',
          'style',
          'visual-style',
          'minimal',
          condition.priority,
          'Use minimal style with abundant whitespace and limited color palette'
        )
      );
    } else if (value.includes('technical')) {
      modifications.push(
        this.createModification(
          'branding',
          'style',
          'visual-style',
          'technical',
          condition.priority,
          'Use technical style with data-focused presentation and structured layout'
        )
      );
    } else if (value.includes('vintage')) {
      modifications.push(
        this.createModification(
          'branding',
          'style',
          'visual-style',
          'vintage',
          condition.priority,
          'Use vintage style with retro typography and color schemes'
        )
      );
    }
    
    return modifications;
  }
  
  /**
   * Map performance conditions to UI modifications
   */
  private mapPerformanceCondition(condition: UICondition): UIModification[] {
    const modifications: UIModification[] = [];
    const value = condition.value.toLowerCase();
    
    // Low bandwidth
    if (value.includes('low_bandwidth') || value.includes('bandwidth')) {
      modifications.push(
        this.createModification(
          'performance',
          'images',
          'image-optimization',
          'aggressive',
          condition.priority,
          'Use aggressive image optimization and minimal images'
        ),
        this.createModification(
          'performance',
          'loading',
          'lazy-loading',
          'true',
          condition.priority,
          'Implement lazy loading for all non-critical content'
        )
      );
    }
    
    // Low spec device
    if (value.includes('low_spec') || value.includes('low-spec')) {
      modifications.push(
        this.createModification(
          'performance',
          'animation',
          'animation-level',
          'none',
          condition.priority,
          'Disable animations for better performance'
        ),
        this.createModification(
          'performance',
          'rendering',
          'simplified-rendering',
          'true',
          condition.priority,
          'Use simplified rendering for better performance'
        )
      );
    }
    
    // Offline support
    if (value.includes('offline')) {
      modifications.push(
        this.createModification(
          'performance',
          'connectivity',
          'offline-support',
          'true',
          condition.priority,
          'Implement offline support with service workers'
        ),
        this.createModification(
          'performance',
          'data',
          'local-storage',
          'enhanced',
          condition.priority,
          'Use enhanced local storage for offline data'
        )
      );
    }
    
    return modifications;
  }
  
  /**
   * Map legacy support conditions to UI modifications
   */
  private mapLegacySupportCondition(condition: UICondition): UIModification[] {
    const modifications: UIModification[] = [];
    const value = condition.value.toLowerCase();
    
    // Older browsers
    if (value.includes('older_browsers') || value.includes('older browser')) {
      modifications.push(
        this.createModification(
          'compatibility',
          'features',
          'css-compatibility',
          'conservative',
          condition.priority,
          'Use more conservative CSS features'
        ),
        this.createModification(
          'compatibility',
          'js',
          'js-compatibility',
          'transpiled',
          condition.priority,
          'Ensure JavaScript is transpiled for older browsers'
        )
      );
    }
    
    // IE11
    if (value.includes('ie11') || value.includes('internet explorer')) {
      modifications.push(
        this.createModification(
          'compatibility',
          'browser',
          'ie11-support',
          'true',
          condition.priority,
          'Add specific IE11 support'
        ),
        this.createModification(
          'compatibility',
          'features',
          'css-grid-fallback',
          'true',
          condition.priority,
          'Provide fallbacks for modern CSS features'
        )
      );
    }
    
    // No JavaScript
    if (value.includes('no_javascript') || value.includes('no javascript')) {
      modifications.push(
        this.createModification(
          'compatibility',
          'js',
          'no-js-fallback',
          'true',
          condition.priority,
          'Provide fallbacks for no-JavaScript environments'
        )
      );
    }
    
    // Print friendly
    if (value.includes('print_friendly') || value.includes('print')) {
      modifications.push(
        this.createModification(
          'media',
          'print',
          'print-styles',
          'true',
          condition.priority,
          'Add print-friendly styles'
        )
      );
    }
    
    return modifications;
  }
  
  /**
   * Map content density conditions to UI modifications
   */
  private mapContentDensityCondition(condition: UICondition): UIModification[] {
    const modifications: UIModification[] = [];
    const value = condition.value.toLowerCase();
    
    // Data heavy
    if (value.includes('data_heavy') || value.includes('data heavy')) {
      modifications.push(
        this.createModification(
          'content',
          'data',
          'data-display',
          'tables',
          condition.priority,
          'Use tables and data visualization components'
        ),
        this.createModification(
          'layout',
          'density',
          'content-density',
          'high',
          condition.priority,
          'Use high-density layout for data presentation'
        )
      );
    }
    
    // Text heavy
    if (value.includes('text_heavy') || value.includes('text heavy')) {
      modifications.push(
        this.createModification(
          'typography',
          'text',
          'readability',
          'enhanced',
          condition.priority,
          'Optimize typography for reading long text'
        ),
        this.createModification(
          'layout',
          'width',
          'content-width',
          'readable',
          condition.priority,
          'Use optimal reading width for text content'
        )
      );
    }
    
    // Media rich
    if (value.includes('media_rich') || value.includes('media rich')) {
      modifications.push(
        this.createModification(
          'media',
          'display',
          'media-layout',
          'gallery',
          condition.priority,
          'Use gallery-style layout for media presentation'
        ),
        this.createModification(
          'media',
          'loading',
          'lazy-loading',
          'true',
          condition.priority,
          'Implement lazy loading for media'
        )
      );
    }
    
    // Spacing options
    if (value.includes('spaced_out') || value.includes('spacious')) {
      modifications.push(
        this.createModification(
          'layout',
          'whitespace',
          'spacing',
          'generous',
          condition.priority,
          'Use generous whitespace throughout layout'
        )
      );
    } else if (value.includes('compact')) {
      modifications.push(
        this.createModification(
          'layout',
          'whitespace',
          'spacing',
          'compact',
          condition.priority,
          'Use compact spacing throughout layout'
        )
      );
    }
    
    return modifications;
  }
} 