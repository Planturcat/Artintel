import { UIConditionSet } from "./ui-condition-types";
import { UIModification, UIModificationSet } from "./condition-to-ui-mapper";
import { v4 as uuidv4 } from 'uuid';

/**
 * Template types for different UI frameworks
 */
export enum TemplateType {
  React = 'react',
  NextJS = 'nextjs',
  Vue = 'vue',
  Angular = 'angular',
  HTML = 'html',
  Svelte = 'svelte'
}

/**
 * A code template with modifications applied
 */
export interface GeneratedTemplate {
  id: string;
  name: string;
  type: TemplateType;
  code: string;
  cssCode?: string;
  jsCode?: string;
  otherFiles?: { name: string, content: string }[];
  appliedModifications: UIModification[];
}

/**
 * A template definition for a specific component
 */
interface ComponentTemplate {
  id: string;
  name: string;
  description: string;
  templateType: TemplateType;
  baseCode: string;
  baseCss?: string;
  baseJs?: string;
  variations: Record<string, { code: string; css?: string; js?: string }>;
}

/**
 * UI Template System for generating UI code based on condition mappings
 */
export class UITemplateSystem {
  private templates: ComponentTemplate[] = [];
  
  constructor() {
    // Initialize with built-in templates
    this.loadBuiltInTemplates();
  }
  
  /**
   * Generate a UI template based on modifications
   */
  public generateTemplate(
    templateName: string,
    templateType: TemplateType,
    modificationSet: UIModificationSet
  ): GeneratedTemplate {
    // Find the template
    const template = this.findTemplate(templateName, templateType);
    
    if (!template) {
      throw new Error(`Template not found: ${templateName} (${templateType})`);
    }
    
    // Apply modifications to generate the template
    return this.applyModificationsToTemplate(template, modificationSet.modifications);
  }
  
  /**
   * Find a template by name and type
   */
  private findTemplate(name: string, type: TemplateType): ComponentTemplate | undefined {
    return this.templates.find(t => t.name.toLowerCase() === name.toLowerCase() && t.templateType === type);
  }
  
  /**
   * Apply modifications to a template
   */
  private applyModificationsToTemplate(
    template: ComponentTemplate,
    modifications: UIModification[]
  ): GeneratedTemplate {
    // Start with the base template
    let resultCode = template.baseCode;
    let resultCss = template.baseCss || '';
    let resultJs = template.baseJs || '';
    
    // Track applied modifications
    const appliedModifications: UIModification[] = [];
    
    // Group modifications by type for more coherent application
    const modByType: Record<string, UIModification[]> = {};
    
    for (const mod of modifications) {
      if (!modByType[mod.type]) {
        modByType[mod.type] = [];
      }
      modByType[mod.type].push(mod);
    }
    
    // Apply theme modifications first
    if (modByType['theme']) {
      for (const mod of modByType['theme']) {
        const applied = this.applyThemeModification(template, mod, resultCode, resultCss);
        if (applied.applied) {
          resultCode = applied.code || resultCode;
          resultCss = applied.css || resultCss;
          appliedModifications.push(mod);
        }
      }
    }
    
    // Apply layout modifications
    if (modByType['layout']) {
      for (const mod of modByType['layout']) {
        const applied = this.applyLayoutModification(template, mod, resultCode, resultCss);
        if (applied.applied) {
          resultCode = applied.code || resultCode;
          resultCss = applied.css || resultCss;
          appliedModifications.push(mod);
        }
      }
    }
    
    // Apply accessibility modifications
    if (modByType['a11y']) {
      for (const mod of modByType['a11y']) {
        const applied = this.applyAccessibilityModification(template, mod, resultCode);
        if (applied.applied) {
          resultCode = applied.code;
          appliedModifications.push(mod);
        }
      }
    }
    
    // Apply other modifications by priority
    const otherTypes = Object.keys(modByType).filter(type => 
      !['theme', 'layout', 'a11y'].includes(type)
    );
    
    for (const type of otherTypes) {
      for (const mod of modByType[type]) {
        const applied = this.applyGenericModification(template, mod, resultCode, resultCss, resultJs);
        if (applied.applied) {
          resultCode = applied.code || resultCode;
          resultCss = applied.css || resultCss;
          resultJs = applied.js || resultJs;
          appliedModifications.push(mod);
        }
      }
    }
    
    // Generate the final template
    return {
      id: uuidv4(),
      name: template.name,
      type: template.templateType,
      code: resultCode,
      cssCode: resultCss || undefined,
      jsCode: resultJs || undefined,
      appliedModifications
    };
  }
  
  /**
   * Apply theme modifications
   */
  private applyThemeModification(
    template: ComponentTemplate,
    modification: UIModification,
    code: string,
    css: string
  ): { applied: boolean; code?: string; css?: string } {
    // Handle dark/light mode
    if (modification.modification === 'theme-mode') {
      if (modification.value === 'dark') {
        // Apply dark theme variation if available
        if (template.variations['dark-theme']) {
          return {
            applied: true,
            code: template.variations['dark-theme'].code,
            css: template.variations['dark-theme'].css || css
          };
        }
        
        // Otherwise modify the CSS
        const darkModeCss = this.addDarkThemeStyles(css);
        return {
          applied: true,
          css: darkModeCss
        };
      } else if (modification.value === 'light') {
        // Use light theme variation if available, otherwise use base
        if (template.variations['light-theme']) {
          return {
            applied: true,
            code: template.variations['light-theme'].code,
            css: template.variations['light-theme'].css || css
          };
        }
      }
    }
    
    // Handle high contrast
    if (modification.modification === 'contrast' && modification.value === 'high') {
      if (template.variations['high-contrast']) {
        return {
          applied: true,
          code: template.variations['high-contrast'].code,
          css: template.variations['high-contrast'].css || css
        };
      }
      
      // Otherwise modify the CSS
      const highContrastCss = this.addHighContrastStyles(css);
      return {
        applied: true,
        css: highContrastCss
      };
    }
    
    return { applied: false };
  }
  
  /**
   * Apply layout modifications
   */
  private applyLayoutModification(
    template: ComponentTemplate,
    modification: UIModification,
    code: string,
    css: string
  ): { applied: boolean; code?: string; css?: string } {
    // Handle layout type changes
    if (modification.modification === 'layout-type') {
      // Check for device-specific layouts
      const layoutVariation = `${modification.value}-layout`;
      
      if (template.variations[layoutVariation]) {
        return {
          applied: true,
          code: template.variations[layoutVariation].code,
          css: template.variations[layoutVariation].css || css
        };
      }
      
      // Apply mobile-first layout
      if (modification.value === 'mobile-first') {
        const mobileFirstCss = this.addMobileFirstStyles(css);
        return {
          applied: true,
          css: mobileFirstCss
        };
      }
    }
    
    // Handle spacing modifications
    if (modification.modification === 'spacing') {
      if (modification.value === 'generous') {
        const generousSpacingCss = this.addGenerousSpacingStyles(css);
        return {
          applied: true,
          css: generousSpacingCss
        };
      } else if (modification.value === 'compact') {
        const compactSpacingCss = this.addCompactSpacingStyles(css);
        return {
          applied: true,
          css: compactSpacingCss
        };
      }
    }
    
    // Handle content density
    if (modification.modification === 'content-density') {
      if (modification.value === 'high') {
        const highDensityCss = this.addHighDensityStyles(css);
        return {
          applied: true,
          css: highDensityCss
        };
      }
    }
    
    return { applied: false };
  }
  
  /**
   * Apply accessibility modifications
   */
  private applyAccessibilityModification(
    template: ComponentTemplate,
    modification: UIModification,
    code: string
  ): { applied: boolean; code: string } {
    // Add ARIA attributes
    if (modification.modification === 'aria' && modification.value === 'true') {
      const codeWithAria = this.addAriaAttributes(code);
      return {
        applied: true,
        code: codeWithAria
      };
    }
    
    // Ensure alt text for images
    if (modification.modification === 'alt-text' && modification.value === 'required') {
      const codeWithAlt = this.ensureImageAltText(code);
      return {
        applied: true,
        code: codeWithAlt
      };
    }
    
    // Enhanced keyboard navigation
    if (modification.modification === 'keyboard-nav' && modification.value === 'enhanced') {
      const codeWithKeyboard = this.addKeyboardNavigation(code);
      return {
        applied: true,
        code: codeWithKeyboard
      };
    }
    
    return { applied: false, code };
  }
  
  /**
   * Apply generic modifications
   */
  private applyGenericModification(
    template: ComponentTemplate,
    modification: UIModification,
    code: string,
    css: string,
    js: string
  ): { applied: boolean; code?: string; css?: string; js?: string } {
    // Look for specific variation first
    const variationKey = `${modification.modification}-${modification.value}`;
    
    if (template.variations[variationKey]) {
      return {
        applied: true,
        code: template.variations[variationKey].code,
        css: template.variations[variationKey].css,
        js: template.variations[variationKey].js
      };
    }
    
    // Apply performance optimizations
    if (modification.type === 'performance') {
      if (modification.modification === 'lazy-loading' && modification.value === 'true') {
        const lazyLoadingCode = this.addLazyLoading(code);
        return {
          applied: true,
          code: lazyLoadingCode
        };
      }
      
      if (modification.modification === 'image-optimization' && modification.value === 'aggressive') {
        const optimizedCode = this.optimizeImagesInCode(code);
        return {
          applied: true,
          code: optimizedCode
        };
      }
    }
    
    // Apply visual style modifications
    if (modification.type === 'branding' && modification.modification === 'visual-style') {
      const styleVariation = `${modification.value}-style`;
      
      if (template.variations[styleVariation]) {
        return {
          applied: true,
          code: template.variations[styleVariation].code,
          css: template.variations[styleVariation].css,
          js: template.variations[styleVariation].js
        };
      }
    }
    
    return { applied: false };
  }
  
  /**
   * Add dark theme styles to CSS
   */
  private addDarkThemeStyles(css: string): string {
    // Simplified dark theme implementation
    const darkThemeAddition = `
/* Dark theme styles */
:root {
  --bg-color: #121212;
  --text-color: #e0e0e0;
  --primary-color: #90caf9;
  --secondary-color: #ce93d8;
  --surface-color: #1e1e1e;
  --error-color: #f44336;
  --border-color: #333333;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}

a {
  color: var(--primary-color);
}

button, .btn {
  background-color: var(--primary-color);
  color: #000000;
}

input, select, textarea {
  background-color: var(--surface-color);
  color: var(--text-color);
  border-color: var(--border-color);
}
`;

    return css + darkThemeAddition;
  }
  
  /**
   * Add high contrast styles to CSS
   */
  private addHighContrastStyles(css: string): string {
    // High contrast theme
    const highContrastAddition = `
/* High contrast styles */
:root {
  --bg-color: #000000;
  --text-color: #ffffff;
  --primary-color: #ffff00;
  --secondary-color: #00ffff;
  --link-color: #3ff23f;
  --border-color: #ffffff;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}

a {
  color: var(--link-color);
  text-decoration: underline;
}

button, .btn {
  background-color: var(--primary-color);
  color: #000000;
  border: 2px solid #ffffff;
}

input, select, textarea {
  background-color: var(--bg-color);
  color: var(--text-color);
  border: 2px solid var(--border-color);
}

/* Enhance focus states */
:focus {
  outline: 3px solid var(--primary-color);
}
`;

    return css + highContrastAddition;
  }
  
  /**
   * Add mobile-first styles to CSS
   */
  private addMobileFirstStyles(css: string): string {
    // Mobile-first styles
    const mobileFirstAddition = `
/* Mobile-first styles */
:root {
  --container-padding: 1rem;
}

body {
  margin: 0;
  padding: 0;
}

.container {
  padding: var(--container-padding);
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
}

button, .btn, input, select, textarea {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

/* Responsive design */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin: 0 auto;
  }
  
  button, .btn {
    width: auto;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
`;

    return css + mobileFirstAddition;
  }
  
  /**
   * Add generous spacing styles to CSS
   */
  private addGenerousSpacingStyles(css: string): string {
    // Generous spacing
    const generousSpacingAddition = `
/* Generous spacing styles */
:root {
  --spacing-xs: 0.75rem;
  --spacing-sm: 1.25rem;
  --spacing-md: 2rem;
  --spacing-lg: 3rem;
  --spacing-xl: 4.5rem;
}

body {
  line-height: 1.8;
}

p {
  margin-bottom: var(--spacing-md);
}

h1, h2, h3, h4, h5, h6 {
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

section {
  margin-bottom: var(--spacing-xl);
}

.container {
  padding: var(--spacing-md);
}

button, .btn {
  padding: var(--spacing-xs) var(--spacing-md);
  margin-right: var(--spacing-sm);
}

form > * {
  margin-bottom: var(--spacing-md);
}

.card {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}
`;

    return css + generousSpacingAddition;
  }
  
  /**
   * Add compact spacing styles to CSS
   */
  private addCompactSpacingStyles(css: string): string {
    // Compact spacing
    const compactSpacingAddition = `
/* Compact spacing styles */
:root {
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 0.75rem;
  --spacing-lg: 1rem;
  --spacing-xl: 1.5rem;
}

body {
  line-height: 1.4;
}

p {
  margin-bottom: var(--spacing-sm);
}

h1, h2, h3, h4, h5, h6 {
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
}

section {
  margin-bottom: var(--spacing-lg);
}

.container {
  padding: var(--spacing-sm);
}

button, .btn {
  padding: var(--spacing-xs) var(--spacing-sm);
  margin-right: var(--spacing-xs);
}

form > * {
  margin-bottom: var(--spacing-sm);
}

.card {
  padding: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}
`;

    return css + compactSpacingAddition;
  }
  
  /**
   * Add high density styles to CSS
   */
  private addHighDensityStyles(css: string): string {
    // High density content styles
    const highDensityAddition = `
/* High density content styles */
:root {
  --font-size-base: 0.875rem;
  --line-height-base: 1.4;
  --spacing-sm: 0.375rem;
  --spacing-md: 0.625rem;
}

body {
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
}

table {
  font-size: 0.8125rem;
}

th, td {
  padding: var(--spacing-sm);
}

.container {
  padding: var(--spacing-md);
}

.card {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

button, .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.8125rem;
}
`;

    return css + highDensityAddition;
  }
  
  /**
   * Add ARIA attributes to HTML code
   */
  private addAriaAttributes(code: string): string {
    // Simple replacements for common elements to add ARIA attributes
    let result = code;
    
    // Add aria-label to icons
    result = result.replace(
      /<([^>]*)(icon|svg)([^>]*)>/gi,
      '<$1$2$3 aria-hidden="true">'
    );
    
    // Add roles to common elements
    result = result.replace(
      /<nav([^>]*)>/gi,
      '<nav$1 role="navigation">'
    );
    
    result = result.replace(
      /<header([^>]*)>/gi,
      '<header$1 role="banner">'
    );
    
    result = result.replace(
      /<footer([^>]*)>/gi,
      '<footer$1 role="contentinfo">'
    );
    
    result = result.replace(
      /<main([^>]*)>/gi,
      '<main$1 role="main">'
    );
    
    result = result.replace(
      /<button([^>]*)>/gi,
      (match, p1) => {
        if (match.includes('aria-label')) return match;
        return `<button${p1} aria-label="Button">`;
      }
    );
    
    return result;
  }
  
  /**
   * Ensure all images have alt text
   */
  private ensureImageAltText(code: string): string {
    // Add alt text to images that don't have it
    return code.replace(
      /<img([^>]*)>/gi,
      (match, attributes) => {
        if (match.includes('alt=')) return match;
        return `<img${attributes} alt="Image description">`;
      }
    );
  }
  
  /**
   * Add keyboard navigation enhancements
   */
  private addKeyboardNavigation(code: string): string {
    // Add tabindex to interactive elements that might need it
    let result = code;
    
    // Add tabindex and keyboard event handlers
    result = result.replace(
      /<div([^>]*)(onClick|click)([^>]*)>/gi,
      '<div$1$2$3 tabIndex="0" onKeyDown={(e) => e.key === \'Enter\' && handleClick(e)}>'
    );
    
    return result;
  }
  
  /**
   * Add lazy loading to images and other media
   */
  private addLazyLoading(code: string): string {
    // Add loading="lazy" to images
    return code.replace(
      /<img([^>]*)>/gi,
      (match, attributes) => {
        if (match.includes('loading=')) return match;
        return `<img${attributes} loading="lazy">`;
      }
    );
  }
  
  /**
   * Optimize images in code by adding size attributes
   */
  private optimizeImagesInCode(code: string): string {
    // Add width and height attributes to images that don't have them
    return code.replace(
      /<img([^>]*)>/gi,
      (match, attributes) => {
        if (match.includes('width=') && match.includes('height=')) return match;
        return `<img${attributes} width="100%" height="auto">`;
      }
    );
  }
  
  /**
   * Load built-in templates
   */
  private loadBuiltInTemplates(): void {
    // Add basic card component template for React
    const reactCardTemplate: ComponentTemplate = {
      id: 'react-card',
      name: 'Card',
      description: 'A simple card component with title, content, and optional image',
      templateType: TemplateType.React,
      baseCode: `import React from 'react';
import './Card.css';

interface CardProps {
  title: string;
  content: string;
  imageSrc?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, content, imageSrc, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      {imageSrc && <img src={imageSrc} className="card-image" />}
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-content">{content}</p>
      </div>
    </div>
  );
};

export default Card;`,
      baseCss: `.card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: white;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-body {
  padding: 16px;
}

.card-title {
  margin: 0 0 8px;
  font-size: 1.25rem;
  font-weight: 600;
}

.card-content {
  color: #666;
  margin: 0;
  line-height: 1.5;
}`,
      variations: {
        'dark-theme': {
          code: `import React from 'react';
import './Card.css';

interface CardProps {
  title: string;
  content: string;
  imageSrc?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, content, imageSrc, onClick }) => {
  return (
    <div className="card dark" onClick={onClick}>
      {imageSrc && <img src={imageSrc} className="card-image" alt={title} />}
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-content">{content}</p>
      </div>
    </div>
  );
};

export default Card;`,
          css: `.card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
}

.card.dark {
  background-color: #2a2a2a;
  color: #e0e0e0;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-body {
  padding: 16px;
}

.card-title {
  margin: 0 0 8px;
  font-size: 1.25rem;
  font-weight: 600;
}

.card.dark .card-title {
  color: #ffffff;
}

.card-content {
  margin: 0;
  line-height: 1.5;
}

.card.dark .card-content {
  color: #b0b0b0;
}`
        },
        'high-contrast': {
          code: `import React from 'react';
import './Card.css';

interface CardProps {
  title: string;
  content: string;
  imageSrc?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, content, imageSrc, onClick }) => {
  return (
    <div className="card high-contrast" onClick={onClick} tabIndex={0} role="button" aria-label={title}>
      {imageSrc && <img src={imageSrc} className="card-image" alt={title} />}
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-content">{content}</p>
      </div>
    </div>
  );
};

export default Card;`,
          css: `.card.high-contrast {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 0 2px #ffffff;
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: #000000;
  color: #ffffff;
  border: 3px solid #ffffff;
}

.card.high-contrast:hover,
.card.high-contrast:focus {
  outline: 4px solid #ffff00;
  transform: translateY(-5px);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-body {
  padding: 16px;
}

.card-title {
  margin: 0 0 8px;
  font-size: 1.5rem;
  font-weight: bold;
}

.card.high-contrast .card-title {
  color: #ffff00;
}

.card-content {
  margin: 0;
  line-height: 1.5;
}

.card.high-contrast .card-content {
  color: #ffffff;
}`
        }
      }
    };
    
    // Add more built-in templates here
    
    this.templates.push(reactCardTemplate);
  }
  
  /**
   * Add a custom template
   */
  public addTemplate(template: ComponentTemplate): void {
    this.templates.push(template);
  }
  
  /**
   * Get all available templates
   */
  public getAvailableTemplates(): { id: string; name: string; description: string; type: TemplateType }[] {
    return this.templates.map(t => ({
      id: t.id,
      name: t.name,
      description: t.description,
      type: t.templateType
    }));
  }
} 