# Current Page Being Edited
**File Path:** src\app\(marketing)\page.tsx

## Current Component Focus
**Component:** Perks Section (src\components\perks.tsx)
**Current Task:** Replacing static icons with interactive dashboard components based on hiw-*.svg designs

## Workflow Guidelines
1. We will focus only on the component or section we are currently working on
2. I will wait for your instructions on whether:
   - I should create the content myself
   - You will provide the CSS and code for it
3. This approach is for demonstrative purposes as we work through all pages
4. For the Perks section, we're creating interactive dashboard components to replace static icons
5. We're using hiw-*.svg files as design benchmarks for our interactive components

## Design Guidelines for Interactive Elements
1. **Component Approach:**
   - Each section should be built as a modular, reusable component
   - Use TypeScript for type safety and better code organization
   - Implement responsive design for all components

2. **Styling Approach:**
   - Use TailwindCSS classes for all styling needs
   - Prefer Tailwind's utility classes over custom CSS
   - Use `class:` syntax instead of ternary operators when possible

3. **Accessibility:**
   - Ensure all interactive elements have proper ARIA attributes
   - Include keyboard navigation support (tabindex, keydown handlers)
   - Maintain proper contrast ratios and focus states

4. **Animation & Interaction:**
   - Use subtle animations for hover/focus states
   - Implement smooth transitions between states
   - Ensure animations don't interfere with usability

5. **Code Quality:**
   - Follow DRY principles
   - Use early returns for cleaner code
   - Use descriptive variable names (prefix event handlers with "handle")
   - Implement proper error handling

6. **Background Creation Rule:**
   - All advanced background creations must first be developed in a new, standalone component that renders only the background
   - New background components should be added to src\app\demo/ first for review before being implemented in production pages
   - Background components should be placed in the src\components\backgrounds/ directory

## Design Preferences

### Global Design Preferences
- Headings should be on one line
- Content should be positioned to avoid blocking background elements
- Add hover effects to interactive elements
- Use gradients with color #00CBDD for main headings
- Larger text sizes for better readability
- Main headings should use only gradients with the color #00CBDD
- Add blur effects to UI elements for enhanced visual styling

### Hero Section
- Hero content should be centered in the middle without dashboard visuals
- Hero section should follow 'Discover.Fine-tune.Inference.Deploy' structure
- Text should be 'Open-source Language Models. The complete no-code platform for language models. Go from idea to implementation in minutes, not months. No Machine Learning expertise required. Just pure innovation potential.'
- Include statscard sections with related stats under buttons
- Merge background designs for visual cohesion
- Enhance background designs with additional elements including logos, dotted patterns, and circular orbs with loading effects
- Position ARTINTEL text higher on the page and make it appear only when hovering over the logo
- Use the Black Icon.jpg logo from the public/logo directory
- Smaller stats cards with values of 40+ Models, 50+ languages, 99.9% Uptime
- Larger main text that fits on one line
- Reduced size for the stats cards overall

### GoogleGeminiEffect Section
- Content positioned directly on top of paths
- Paths positioned higher on the page

### Perks Section
- UI elements should have a glow effect on the outline when hovered
- Perk cards should use glassmorphic design with rounded corners
- Use cyan color (#00CBDD) for all gradients and accents
- Add ripple effects to perk icons similar to the ModelSelection component
- Replace static icons with custom loaders for each perk
- Each perk loader should incorporate model logos from the public/model directory
- Available model logos: Bloom.png, DeepSeek.png, Falcon.png, gpt-j-6b.png, Llama.png, Mistral.png, mpt-7b.png, Phi.png, Qwen.png, SantaCoder.png
- Add subtle background glow effects to enhance visual appeal
- Ensure consistent spacing and alignment between perk cards

## Component Status
- Current component: Perks Section
- Status: Implementation phase - Creating interactive dashboard components
- Interactive elements:
  - Animated perk cards with fade effects
  - Interactive dashboard-like components for each perk
  - Responsive layout with different animations based on screen size
  - Hover effects on perk cards with scale transformation
  - Custom interactive visualizations for each perk with model logos
  - Ripple effects and data animations based on hiw-*.svg designs

## Perks Section Structure
- **Content:**
  - Section Badge with title "Platform Capabilities"
  - Heading "Powerful AI platform capabilities"
  - Description "Comprehensive tools for fine-tuning, analyzing, and deploying language models"
  - Four perk cards in a 2x2 grid layout:
    1. Fine-Tuning - "Customize models for your specific use cases with no-code tools"
    2. Smart Analytics - "Track performance with realtime insights and metrics"
    3. API Gateway - "Seamless integration with your existing systems"
    4. Deployment Tools - "One-click deployment to any environment or device"

- **Visual Elements:**
  - Grid lines background (SVG pattern with cross lines) with reduced opacity
  - Cyan background glow effect (#00CBDD)
  - Perk icons in circular containers with glassmorphic design
  - Custom loaders for each perk featuring model logos
  - Ripple effects around perk icons
  - Animation effects (fadeUp, fadeRight, fadeLeft, scaleUp)
  - Responsive layout that adjusts for different screen sizes
  - Cyan accent color (#00CBDD) for all gradients and text effects
  - Hover scale effect (1.1x) on perk icons

## Features Section Structure
- **Content:**
  - Section Badge with title "Platform Features"
  - Heading "Manage AI models smarter"
  - Description "Experience the future of AI with our all-in-one platform for seamless model management and deployment."
  - Four feature cards in a 2x2 grid layout:
    1. AI Model Management - "Manage multiple AI models effortlessly with our intuitive dashboard. Track performance metrics and deployment status."
    2. Real-time Analytics - "Track model performance, inference requests, and usage metrics through real-time analytics."
    3. Enterprise Integration Hub - "Connect AI models securely to your existing systems with our comprehensive API and integration tools."
    4. Automated Model Training - "Fine-tune models with your data using our automated training pipelines powered by cutting-edge techniques."

- **Visual Elements:**
  - Dark background with subtle glow effects
  - Glassmorphic card design with rounded corners
  - Interactive dashboard components for each feature
  - Cyan accent color (#00CBDD) for all gradients and text effects
  - Hover scale effect on feature cards
  - Animation effects (fadeRight, fadeLeft, fadeUp)

## Interactive Perk Components
- **Development Approach:**
  - Create each dashboard component in a separate file in the perk-dashboards directory
  - Use shared animations.css file for consistent animation effects
  - Implement responsive design for all components
  - Use model logos from the public/model directory
  - Base designs on hiw-*.svg files for visual consistency

- **Planned Perk Components:**
  1. **Fine-Tuning Dashboard:**
     - Rotating model selection wheel with model logos
     - Central dashboard with model parameters and training status
     - Progress indicators and status displays
     - Based on hiw-three.svg with concentric circles design
     - Featured models: Llama, Mistral, Phi

  2. **Smart Analytics Dashboard:**
     - Live-updating charts (line and bar)
     - Data visualization with animated data points
     - Metrics display with key performance indicators
     - Based on hiw-one.svg with grid layout
     - Animated data flow and pulse effects

  3. **API Gateway Dashboard:**
     - API gateway visualization with connection lines
     - Animated data packets flowing between nodes
     - Status indicators and connection visualization
     - Based on hiw-two.svg with connection paths
     - Featured models: DeepSeek, Falcon, GPT-J

  4. **Deployment Tools Dashboard:**
     - Deployment progress visualization
     - Environment selection interface
     - Animated deployment process
     - Based on hiw-three.svg with circular elements
     - Featured models: Bloom, Qwen, SantaCoder

## GoogleGeminiEffect Section Structure (Completed)
- **Content:**
  - Title ("What Can You Do With Artintel?")
  - Description ("The Complete No-Code Platform For Discovering, Fine-Tuning, And Deploying Open-Source Language Models.")
- **Visual Elements:**
  - Five animated flowing paths with cyan/blue gradient colors (#00CBDD)
  - Glowing path effects with enhanced blur and color matrix
  - Auto-animating sequence that draws paths and creates pulsing glow effects
  - Responsive design that works on all screen sizes
  - Content positioned directly on top of the paths

## Hero Section Structure (Completed)
- **Centered Content:**
  - Main Heading ("Discover.Fine-tune.Inference.Deploy.")
  - Subheading ("Open-source Language Models")
  - Descriptive paragraph
  - CTA Button ("Start free trial")
  - StatsCard section with 4 key metrics
  - Company logos in scrolling marquee
- **Background:**
  - Custom HeroBackground component with animated paths and nodes
  - Central orb with the Artintel logo that grows and glows when hovered
  - ARTINTEL text with blur and glow effects that appears when the logo is hovered

---

**REMINDER:** Always focus only on the specific component or section mentioned. Wait for instructions on content creation vs. using provided code. When designing interactive elements, prioritize accessibility, responsiveness, and clean code practices. This document will be updated as we progress through different pages.
