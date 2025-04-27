# Artintel Site Structure

## Pages

### Main Pages
1. **Home Page** (`/` - src/app/(marketing)/page.tsx)
   - **Sections:**
     - Hero - Main landing section with headline and CTA
     - GoogleGeminiEffect - Animated section showing platform capabilities
     - ModelSelection - Showcase of available models
     - Perks - Platform capabilities with icons
     - HowItWorks - Step-by-step process explanation
     - Features - Detailed platform features
     - Testimonials - User testimonials
     - Pricing - Pricing plans
     - PlatformMetrics - Statistics and metrics
     - FAQ - Frequently asked questions
     - CTA - Call to action section
   - **Components:**
     - Hero.tsx
     - GoogleGeminiEffect.tsx
     - ModelSelection.tsx
     - Perks.tsx
     - HowItWorks.tsx
     - Features.tsx
     - Testimonials.tsx
     - Pricing.tsx
     - PlatformMetrics.tsx
     - FAQ.tsx
     - CTA.tsx
   - **Images:**
     - /logo/Icon - PNG (1).png - Main logo
     - /images/hero-gradient.svg - Background gradient
     - /images/grid-lines.svg - Grid pattern for perks section
     - /icons/perk-*.svg - Icons for perks
     - /images/f*.svg - Feature section images
     - /images/hiw-*.svg - How it works section images
     - /images/quote.svg - Testimonial quote icon

2. **Dashboard** (`/dashboard` - src/app/dashboard/page.tsx)
   - **Sections:**
     - Welcome message
     - Navigation links
   - **Components:**
     - SignOut.tsx
     - Button.tsx
   - **Images:** None specific

### Authentication Pages
1. **Sign In** (`/signin` - src/app/(auth)/signin/page.tsx)
2. **Sign Up** (`/signup` - src/app/(auth)/signup/page.tsx)
3. **Forgot Password** (`/forgot-password` - src/app/(auth)/forgot-password/page.tsx)
4. **Reset Password** (`/reset-password` - src/app/(auth)/reset-password/page.tsx)
5. **Verify Email** (`/verify-email` - src/app/(auth)/verify-email/page.tsx)

### Model Pages
1. **Models Overview** (`/models` - src/app/(marketing)/models/page.tsx)
   - **Purpose:** Main landing page for the models section, providing an overview of language models
   - **Content Focus:** Presents a clear comparison between SLMs and LLMs at a high level
   - **Key Sections:**
     - Introduction to language models
     - Visual comparison of SLM vs LLM
     - Key strengths and use cases for each model type
     - Links to dedicated model pages
   
2. **LLM Models** (`/models/llm` - src/app/(marketing)/models/llm/page.tsx)
   - **Purpose:** Dedicated page focused solely on Large Language Models
   - **Content Focus:** Detailed information about LLMs without comparisons to SLMs
   - **Key Sections:**
     - LLM definition and capabilities
     - Key strengths (advanced reasoning, rich knowledge, long context windows)
     - Popular LLM models with specifications
     - Resource requirements and hardware recommendations
     - LLM-specific use cases and applications
   
3. **SLM Models** (`/models/slm` - src/app/(marketing)/models/slm/page.tsx)
   - **Purpose:** Dedicated page focused solely on Small Language Models
   - **Content Focus:** Detailed information about SLMs without comparisons to LLMs
   - **Key Sections:**
     - SLM definition and capabilities
     - Key advantages (lower resource footprint, faster inference, cost-effectiveness)
     - Popular SLM models with specifications
     - SLM-friendly tasks and deployment scenarios
     - Edge deployment and mobile use cases
   
4. **Models Comparison** (`/models/comparison` - src/app/(marketing)/models/comparison/page.tsx)
   - **Purpose:** The only page that directly compares SLMs and LLMs side-by-side
   - **Content Focus:** Comprehensive comparison across multiple dimensions
   - **Key Sections:**
     - Interactive comparison with model type toggle
     - Feature comparison table (parameters, hardware, speed, cost)
     - Use case recommendations for both model types
     - Performance comparisons and tradeoffs
     - Resources for making an informed model selection

5. **Model Performance** (`/models/performance` - src/app/(marketing)/models/performance/page.tsx)
   - **Purpose:** Detailed performance metrics and benchmarks for all model types
   - **Content Focus:** Technical performance data and benchmarking comparisons
   - **Key Sections:**
     - Performance metrics explanation
     - Benchmark categories (NLU, generation quality, resource efficiency)
     - Interactive benchmark tables and visualizations
     - Performance optimization techniques
     - Model efficiency considerations

### Other Key Pages
1. **Features** (`/features` - src/app/(marketing)/features/page.tsx)
   - **Purpose:** Comprehensive breakdown of the Artintel platform's capabilities
   - **Content Focus:** Detailed explanation of all platform features and benefits
   - **Key Sections:**
     - Model Selection: Finding the right models for specific use cases
     - Data Integration: Tools for integrating with existing data systems
     - Fine-Tuning: Workflows for customizing models
     - Deployment: Options for deploying models in various environments
     - Monitoring: Tools for tracking model performance
     - Data Correction & Quality Enhancement: Tools for improving data quality
     - Mash AI Agent: Agent-based capabilities for complex tasks
     - Security: End-to-end encryption and security features

### Model Catalog
1. **Model Catalog** (`/models/catalog` - src/app/(marketing)/models/catalog/page.tsx)
   - Searchable catalog of all available models
   - Filterable by type, size, domain and capabilities

### Documentation & Resources
1. **Documentation** (`/docs` - src/app/(marketing)/docs/page.tsx)
2. **Features** (`/features` - src/app/(marketing)/features/page.tsx)
   - Comprehensive breakdown of platform capabilities
   - Sections on model selection, fine-tuning, and deployment

### Demo Pages
1. **Demo Home** (`/demo` - src/app/demo/page.tsx)
   - Showcases HeroBackground component
   - Links to other demo pages
   - **Images:** Uses HeroBackground component

2. **SVG Test** (`/demo/svg-test` - src/app/demo/svg-test/page.tsx)
   - Tests SVG rendering with model logos
   - **Images:** Model logos from /model/ directory

3. **Loaders** (`/demo/loaders` - src/app/demo/loaders/page.tsx)
   - Showcases loader components
   - **Components:** Various loader components

4. **Advanced Components** (`/demo/advanced` - src/app/demo/advanced/page.tsx)
   - Showcases advanced UI components
   - **Components:** Advanced loaders and layouts

5. **Dashboards** (`/demo/dashboards` - src/app/demo/dashboards/page.tsx)
   - Showcases dashboard components for different features
   - **Components:**
     - FineTuningDashboard
     - SmartAnalyticsDashboard
     - APIGatewayDashboard
     - DeploymentToolsDashboard

6. **MASH Chatbot** (`/mash-chatbot` - src/app/mash-chatbot/page.tsx)
   - AI-powered chatbot interface
   - **Components:** ChatInterface

## Components

### UI Components
1. **Button** (`src/components/ui/button.tsx`)
   - Standard button component with variants

2. **StatsCard** (`src/components/ui/stats-card.tsx`)
   - Displays statistics with icons

3. **Marquee** (`src/components/ui/marquee.tsx`)
   - Scrolling content component

4. **SectionBadge** (`src/components/ui/section-badge.tsx`)
   - Section title badge

5. **FlickeringGrid** (`src/components/ui/flickering-grid.tsx`)
   - Animated grid background

6. **GoogleGeminiEffect** (`src/components/ui/google-gemini-effect.tsx`)
   - Particle animation inspired by Google Gemini

### Global Components
1. **MaxWidthWrapper** (`src/components/global/max-width-wrapper.tsx`)
   - Container with max width

2. **AnimationContainer** (`src/components/global/animation-container.tsx`)
   - Wrapper for animated elements

3. **Wrapper** (`src/components/global/wrapper.tsx`)
   - General wrapper component

4. **Container** (`src/components/global/container.tsx`)
   - Container component

5. **Background** (`src/components/global/background.tsx`)
   - Background component

6. **HeroBackground** (`src/components/backgrounds/HeroBackground.tsx`)
   - Hero section background with animated elements

### Loader Components
1. **FirstLoader** (`src/components/global/loaders.tsx`)
2. **SecondLoader** (`src/components/global/loaders.tsx`)
3. **ThirdLoader** (`src/components/global/loaders.tsx`)
4. **GridLayout** (`src/components/global/loaders.tsx`)
5. **BrutalistButton** (`src/components/global/loaders.tsx`)
6. **EnhancedGridLayout** (`src/components/global/loaders.tsx`)
7. **AdvancedLoader** (`src/components/global/loaders.tsx`)

### Dashboard Components
1. **FineTuningDashboard** (`src/components/perk-dashboards/FineTuningDashboard.tsx`)
2. **SmartAnalyticsDashboard** (`src/components/perk-dashboards/SmartAnalyticsDashboard.tsx`)
3. **APIGatewayDashboard** (`src/components/perk-dashboards/APIGatewayDashboard.tsx`)
4. **DeploymentToolsDashboard** (`src/components/perk-dashboards/DeploymentToolsDashboard.tsx`)

## SVG Files

### Icon SVGs (public/icons/)
1. **artintel-logo.svg** - Artintel logo
2. **clock.svg** - Clock icon
3. **icon.svg** - Generic icon
4. **magicpen.svg** - Magic pen icon
5. **metric-one.svg** - Metric icon 1
6. **metric-three.svg** - Metric icon 3
7. **metric-two.svg** - Metric icon 2
8. **perk-four.svg** - Perk icon 4
9. **perk-one.svg** - Perk icon 1
10. **perk-three.svg** - Perk icon 3
11. **perk-two.svg** - Perk icon 2
12. **shield.svg** - Shield icon

### Image SVGs (public/images/)
1. **about-gradient.svg** - About page gradient
2. **dashboard.svg** - Dashboard illustration
3. **f1.svg** - Feature 1 illustration
4. **f2.svg** - Feature 2 illustration
5. **f3.svg** - Feature 3 illustration
6. **f4.svg** - Feature 4 illustration
7. **grid-lines.svg** - Grid lines pattern
8. **hero-gradient.svg** - Hero section gradient
9. **hiw-one.svg** - How it works step 1
10. **hiw-three.svg** - How it works step 3
11. **hiw-two.svg** - How it works step 2
12. **quote.svg** - Quote icon

### Artintel SVGs (public/images/artintel/)
1. **deploy-scale.svg** - Deployment and scaling illustration
2. **fine-tune.svg** - Fine-tuning illustration
3. **model-selection.svg** - Model selection illustration

### Logo SVGs (public/logo/)
1. **wordmark.svg** - Artintel wordmark logo
