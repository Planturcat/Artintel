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
   - General models page with SLM vs LLM comparison
   - Contains links to dedicated SLM and LLM pages
   
2. **LLM Models** (`/models/llm` - src/app/(marketing)/models/llm/page.tsx)
   - Focuses specifically on Large Language Models
   - Includes model benefits, use cases, and hardware requirements
   - Contains recommended LLM models and their specifications
   
3. **SLM Models** (`/models/slm` - src/app/(marketing)/models/slm/page.tsx)
   - Focuses specifically on Small Language Models
   - Includes model benefits, use cases, and resource efficiency
   - Contains recommended SLM models and their specifications

4. **Models Comparison** (`/models/comparison` - src/app/(marketing)/models/comparison/page.tsx)
   - Detailed side-by-side comparison of LLMs and SLMs
   - Interactive comparison tool for specific use cases
   - Performance benchmarks and tradeoff analysis

5. **Model Catalog** (`/models/catalog` - src/app/(marketing)/models/catalog/page.tsx)
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
