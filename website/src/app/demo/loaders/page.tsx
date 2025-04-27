"use client";

import React from "react";
import {
  FirstLoader,
  SecondLoader,
  ThirdLoader,
  GridLayout,
  BrutalistButton,
  Wrapper,
  MaxWidthWrapper,
  Container,
  Background,
  AnimationContainer
} from "@/components";
import TextHoverEffect from "@/components/global/text-hover-effect";

// Designed Elements Components
// Temporarily comment out imports that are causing issues
// import { Timeline } from "../../../../designed elements/timeline";
// import PricingSection from "../../../../designed elements/pricing-section";
// import MobileNavbar from "../../../../designed elements/mobile-navbar";
// import { Lamp } from "../../../../designed elements/lamp";
// import HeroPathEquilibrium from "../../../../designed elements/HeroPathEquilibrium";
// import { GoogleGeminiEffect } from "../../../../designed elements/GoogleGeminiEffect";
// import Footer from "../../../../designed elements/footer";
// import FloatingNavbar from "../../../../designed elements/floating-navbar";

import "@/styles";

const LoadersDemoPage = () => {
  const handleButtonClick = () => {
    alert("Brutalist button clicked!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-6xl font-bold mb-4">Component Library & UI Showcase</h1>
        <p className="text-gray-600 text-xl mb-2">A comprehensive showcase of UI components, animations, and design elements</p>
        <p className="text-gray-600 text-lg mb-4">Each component is fully accessible, customizable, responsive, and ready for production use</p>
        <p className="mt-2">
          <a href="/docs/components.md" className="text-blue-600 hover:underline text-lg font-medium" tabIndex={0} aria-label="View full documentation">View Full Documentation</a>
        </p>
      </header>

      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Global Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">First Loader</h2>
            <p className="text-gray-600 mb-4">SVG-based animated loader with interactive hover effects</p>
            <div className="flex justify-center">
              <FirstLoader />
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">This loader features a complex SVG animation that transitions smoothly. The geometric elements rotate and transform to create a mesmerizing loading experience.</p>
              <p className="mb-2">Hover over the loader to see the interaction effect - elements will scale and colors will shift slightly.</p>
              <h3 className="text-lg font-medium mt-4 mb-2">Technical Specifications:</h3>
              <ul className="list-disc list-inside mb-4">
                <li>Built with pure SVG and CSS animations</li>
                <li>Animation speed: 7s/3s/4s/2s for different elements</li>
                <li>Hardware accelerated with transform-origin and will-change properties</li>
                <li>Zero JavaScript dependencies for animation</li>
                <li>Accessible: complies with WCAG 2.1 animation guidelines</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import { FirstLoader } from "@/components/global/loaders";

// Use in your component
<FirstLoader className="custom-class" />`}
              </pre>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Second Loader</h2>
            <p className="text-gray-600 mb-4">Ripple effect animation with customizable logo color</p>
            <div className="flex justify-center">
              <SecondLoader logoColor="#3b82f6" />
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">The Second Loader features a ripple animation effect that radiates outward from the center. The logo color in the middle can be customized to match your brand or theme.</p>
              <p className="mb-2">The ripple animations run continuously with staggered timing to create a fluid, never-ending effect.</p>
              <h3 className="text-lg font-medium mt-4 mb-2">Customization Options:</h3>
              <ul className="list-disc list-inside mb-4">
                <li><code className="bg-gray-200 px-1">logoColor</code>: Customize the center logo color (default: grey)</li>
                <li><code className="bg-gray-200 px-1">size</code>: Set the container size (default: 250px)</li>
                <li><code className="bg-gray-200 px-1">duration</code>: Animation duration (default: 2s)</li>
                <li><code className="bg-gray-200 px-1">background</code>: Customize the ripple gradient background</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import { SecondLoader } from "@/components/global/loaders";

// Use with custom logo color
<SecondLoader
  logoColor="#3b82f6"
  className="my-loader"
  // Additional props:
  // size="300px"
  // duration="3s"
/>`}
              </pre>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Third Loader</h2>
            <p className="text-gray-600 mb-4">Server-themed floating animation loader</p>
            <div className="flex justify-center">
              <ThirdLoader />
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">The Third Loader represents a server rack with data processing visualization. The elements float up and down to simulate active server operations.</p>
              <p className="mb-2">This loader is perfect for server-related operations, data processing screens, or backend operation indicators.</p>
              <h3 className="text-lg font-medium mt-4 mb-2">Animation Details:</h3>
              <ul className="list-disc list-inside mb-4">
                <li>Main animation: Float and bounce (4s infinite ease-in-out)</li>
                <li>Secondary animation: Strobe effect (0.8s infinite)</li>
                <li>SVG elements are accessible with ARIA roles</li>
                <li>Reduced motion support for users with vestibular disorders</li>
                <li>Zoom factor: 0.3 (can be customized via CSS)</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import { ThirdLoader } from "@/components/global/loaders";

// Use in your component
<ThirdLoader className="server-loader" />`}
              </pre>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Grid Layout</h2>
            <p className="text-gray-600 mb-4">Interactive grid layout with hover effects</p>
            <div className="flex justify-center">
              <GridLayout />
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">The Grid Layout component displays a responsive CSS grid with 14 different boxes arranged in various sizes. Each box has a unique position within the grid with backdrop filter effects.</p>
              <p className="mb-2">Hover over any grid box to see it scale up and its text enlarge. This component can be used for feature showcases, navigation menus, or dashboard layouts.</p>
              <h3 className="text-lg font-medium mt-4 mb-2">Grid Specifications:</h3>
              <ul className="list-disc list-inside mb-4">
                <li>CSS Grid: 5 columns × 4 rows (50px each)</li>
                <li>Gap: 2px with 4px padding</li>
                <li>Background: Linear gradient with rgba values</li>
                <li>Box effects: backdrop-filter blur(3px)</li>
                <li>Hover animations: scale transform (200ms) with box-shadow change</li>
                <li>Special hover effects on boxes 3 and 8 (font size increases to 60px)</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import { GridLayout } from "@/components/global/loaders";

// Use in your component
<GridLayout className="my-grid" />`}
              </pre>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Brutalist Button</h2>
            <p className="text-gray-600 mb-4">A brutalist-style button with animation effects</p>
            <div className="flex justify-center">
              <BrutalistButton
                onClick={handleButtonClick}
                buttonText="Powered By"
                subtitle="Components"
              />
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">The Brutalist Button embraces the raw, unpolished aesthetic of brutalist design. It features bold text, strong contrasts, and visible structural elements with minimal decoration.</p>
              <p className="mb-2">On hover, the button animates to create a 3D effect with a text reveal animation, and on click, it executes the provided onClick handler. The button icon also animates with a spin-and-zoom effect on hover.</p>
              <h3 className="text-lg font-medium mt-4 mb-2">Component Props:</h3>
              <ul className="list-disc list-inside mb-4">
                <li><code className="bg-gray-200 px-1">className</code>: Additional CSS classes</li>
                <li><code className="bg-gray-200 px-1">onClick</code>: Function to execute on button click</li>
                <li><code className="bg-gray-200 px-1">buttonText</code>: Primary text (default: "Powered By")</li>
                <li><code className="bg-gray-200 px-1">subtitle</code>: Secondary text (default: "GPT-Omni")</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import { BrutalistButton } from "@/components/global/loaders";

// Use with custom text and click handler
const handleClick = () => alert("Button clicked!");

<BrutalistButton
  onClick={handleClick}
  buttonText="Powered By"
  subtitle="Components"
  className="my-button"
/>`}
              </pre>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Text Hover Effect</h2>
            <p className="text-gray-600 mb-4">Interactive text with dynamic hover animations</p>
            <div className="flex justify-center py-8">
              <TextHoverEffect text="Hover Me" />
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">The TextHoverEffect component creates an interactive experience as users hover over text. Each letter responds individually to hover actions with subtle animations.</p>
              <p className="mb-2">Perfect for interactive headings, menu items, or call-to-action elements where you want to draw attention.</p>
              <h3 className="text-lg font-medium mt-4 mb-2">Features:</h3>
              <ul className="list-disc list-inside mb-4">
                <li>Character-by-character hover animation</li>
                <li>Smooth transitions with configurable timing</li>
                <li>Customizable text content</li>
                <li>Optional className for styling customization</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import TextHoverEffect from "@/components/global/text-hover-effect";

// Use in your component
<TextHoverEffect
  text="Your Text Here"
  className="custom-text-effect"
/>`}
              </pre>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Container</h2>
            <p className="text-gray-600 mb-4">Versatile container with customizable padding and sizing</p>
            <div className="flex justify-center border border-dashed border-gray-300 p-2">
              <Container className="bg-blue-100 p-4 text-center w-full">
                <p>Content inside Container</p>
                <p className="text-sm text-gray-500">This box is a Container component</p>
              </Container>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">The Container component provides a flexible wrapper for content with customizable padding, sizing, and styling options.</p>
              <p className="mb-2">Use it to create consistent spacing and alignment throughout your application for various content blocks.</p>
              <h3 className="text-lg font-medium mt-4 mb-2">Props:</h3>
              <ul className="list-disc list-inside mb-4">
                <li><code className="bg-gray-200 px-1">className</code>: Additional CSS classes</li>
                <li><code className="bg-gray-200 px-1">children</code>: Content to be rendered inside the container</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import Container from "@/components/global/container";

// Use in your component
<Container className="my-custom-container">
  <h2>Content Title</h2>
  <p>Content description goes here...</p>
</Container>`}
              </pre>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Background</h2>
            <p className="text-gray-600 mb-4">Dynamic background component with customizable properties</p>
            <div className="flex justify-center h-40 relative border border-dashed border-gray-300 overflow-hidden">
              <Background>
                <div className="w-full h-full opacity-50 bg-gradient-to-r from-blue-200 to-purple-200">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold">
                    Content over Background
                  </div>
                </div>
              </Background>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">The Background component allows you to create dynamic, visually appealing backgrounds for different sections of your application.</p>
              <p className="mb-2">It can be customized with various colors, patterns, and effects to match your design requirements.</p>
              <h3 className="text-lg font-medium mt-4 mb-2">Props:</h3>
              <ul className="list-disc list-inside mb-4">
                <li><code className="bg-gray-200 px-1">children</code>: Content to be rendered inside the background</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import Background from "@/components/global/background";

// Use in your component
<div className="relative h-screen">
  <Background>
    <div className="opacity-30 w-full h-full bg-gradient-to-r from-blue-200 to-purple-200"/>
    <div className="relative z-10">Your content here</div>
  </Background>
</div>`}
              </pre>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Max Width Wrapper</h2>
            <p className="text-gray-600 mb-4">Responsive container with maximum width constraints</p>
            <div className="flex justify-center border border-dashed border-gray-300 p-2">
              <MaxWidthWrapper className="bg-purple-100 p-4 text-center w-full">
                <p>Content with Max Width</p>
                <p className="text-sm text-gray-500">This component prevents content from stretching too wide on large screens</p>
              </MaxWidthWrapper>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">The MaxWidthWrapper component constrains content to a maximum width for optimal readability and layout consistency across different screen sizes.</p>
              <p className="mb-2">Ideal for main content areas, especially in applications with a lot of text or structured layouts.</p>
              <h3 className="text-lg font-medium mt-4 mb-2">Props:</h3>
              <ul className="list-disc list-inside mb-4">
                <li><code className="bg-gray-200 px-1">className</code>: Additional CSS classes</li>
                <li><code className="bg-gray-200 px-1">children</code>: Content to be rendered with max-width constraints</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import MaxWidthWrapper from "@/components/global/max-width-wrapper";

// Use in your component
<MaxWidthWrapper className="py-10">
  <h1>Page Title</h1>
  <p>Your content here will have a consistent maximum width...</p>
</MaxWidthWrapper>`}
              </pre>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Wrapper</h2>
            <p className="text-gray-600 mb-4">Flexible wrapper component for layout organization</p>
            <div className="flex justify-center border border-dashed border-gray-300 p-2">
              <Wrapper className="bg-green-100 p-4 text-center w-full">
                <p>Content inside Wrapper</p>
                <p className="text-sm text-gray-500">Use this component to group related elements</p>
              </Wrapper>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">The Wrapper component provides a simple yet versatile container for grouping related UI elements and applying consistent styling.</p>
              <p className="mb-2">It offers flexibility for various layout needs while maintaining a clean component structure.</p>
              <h3 className="text-lg font-medium mt-4 mb-2">Props:</h3>
              <ul className="list-disc list-inside mb-4">
                <li><code className="bg-gray-200 px-1">className</code>: Additional CSS classes</li>
                <li><code className="bg-gray-200 px-1">children</code>: Content to be wrapped</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import Wrapper from "@/components/global/wrapper";

// Use in your component
<Wrapper className="my-section-wrapper">
  <h2>Section Title</h2>
  <div>Section content goes here...</div>
</Wrapper>`}
              </pre>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md col-span-1 md:col-span-2">
            <h2 className="text-2xl font-semibold mb-2">Animation Container</h2>
            <p className="text-gray-600 mb-4">Container with built-in animation capabilities</p>
            <div className="flex justify-center py-8">
              <AnimationContainer className="bg-yellow-100 p-6 rounded-lg shadow-sm">
                <p className="text-center">This content animates in automatically</p>
                <p className="text-sm text-gray-500 text-center mt-2">The AnimationContainer handles entrance animations</p>
              </AnimationContainer>
            </div>
            <div className="mt-6 text-sm text-gray-500 max-w-2xl mx-auto">
              <p className="mb-2">The AnimationContainer component wraps content with configurable entrance animations, making it easy to add motion to your UI elements.</p>
              <p className="mb-2">Perfect for creating engaging user experiences with staggered animations, reveals, and transitions.</p>
              <h3 className="text-lg font-medium mt-4 mb-2">Features:</h3>
              <ul className="list-disc list-inside mb-4">
                <li>Built-in animation options (fade, slide, scale)</li>
                <li>Control over animation timing and delays</li>
                <li>Support for staggered child animations</li>
                <li>Respects reduced motion preferences for accessibility</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import AnimationContainer from "@/components/global/animation-container";

// Basic usage
<AnimationContainer>
  <div>Your content here</div>
</AnimationContainer>

// Advanced usage with options
<AnimationContainer
  className="my-animated-section"
  animation="fade-up"
  duration={0.8}
  delay={0.2}
>
  <h2>Animated Title</h2>
  <p>This content will animate in with the specified parameters</p>
</AnimationContainer>`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-24">
        <h2 className="text-3xl font-bold mb-8 text-center">Designed Elements</h2>
        <p className="text-center text-gray-600 mb-12">Advanced UI components and design patterns for modern web applications</p>

        <div className="grid grid-cols-1 gap-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Timeline Component</h2>
            <p className="text-gray-600 mb-6">Interactive timeline for displaying chronological events or processes</p>
            <div className="py-8 px-4">
              {/* <Timeline /> */}
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">The Timeline component provides a visual representation of events, milestones, or processes in chronological order.</p>
              <p className="mb-2">Perfect for project histories, company milestones, or step-by-step process visualization.</p>
              <h3 className="text-lg font-medium mt-4 mb-2">Features:</h3>
              <ul className="list-disc list-inside mb-4">
                <li>Responsive vertical timeline layout</li>
                <li>Customizable event content and styling</li>
                <li>Visual indicators for active/completed states</li>
                <li>Smooth animations when scrolling into view</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import Timeline from "@/designed-elements/timeline";

// Use in your component
<Timeline />`}
              </pre>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Lamp Effect</h2>
            <p className="text-gray-600 mb-6">Illuminating spotlight effect for highlighting content</p>
            <div className="flex justify-center py-12 bg-slate-950">
              {/* <Lamp /> */}
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">The Lamp component creates a spotlight or illumination effect that follows cursor movement, drawing attention to specific areas.</p>
              <p className="mb-2">Ideal for hero sections, featured content areas, or to create a dramatic visual effect on dark backgrounds.</p>
              <h3 className="text-lg font-medium mt-4 mb-2">Features:</h3>
              <ul className="list-disc list-inside mb-4">
                <li>Interactive light effect that follows cursor movement</li>
                <li>Customizable light intensity and color</li>
                <li>Smooth transition animations</li>
                <li>Works on touch devices with fallback behavior</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import Lamp from "@/designed-elements/lamp";

// Basic usage
<Lamp />

// With custom content
<Lamp>
  <h2 className="text-white">Highlighted Content</h2>
</Lamp>`}
              </pre>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Google Gemini Effect</h2>
            <p className="text-gray-600 mb-6">Fluid particle animation inspired by Google's Gemini AI</p>
            <div className="flex justify-center py-8 bg-gray-900 rounded-lg">
              <div className="w-full max-w-2xl h-72">
                {/* <GoogleGeminiEffect /> */}
              </div>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">The GoogleGeminiEffect creates a fluid, animated particle system inspired by Google's Gemini AI visualization.</p>
              <p className="mb-2">Perfect for AI-related applications, data visualization sections, or as a dynamic background element.</p>
              <h3 className="text-lg font-medium mt-4 mb-2">Technical Details:</h3>
              <ul className="list-disc list-inside mb-4">
                <li>WebGL-powered particle animation system</li>
                <li>Interactive particles that respond to cursor movement</li>
                <li>Customizable color schemes and animation parameters</li>
                <li>Optimized performance with canvas rendering</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import GoogleGeminiEffect from "@/designed-elements/GoogleGeminiEffect";

// Basic usage
<GoogleGeminiEffect />

// With custom wrapper
<div className="h-96 w-full relative">
  <GoogleGeminiEffect />
  <div className="relative z-10">Your overlay content here</div>
</div>`}
              </pre>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Hero Path Equilibrium</h2>
            <p className="text-gray-600 mb-6">Dynamic hero section with path-based animations</p>
            <div className="flex justify-center py-8 bg-slate-900 rounded-lg">
              <div className="w-full max-w-3xl h-96">
                {/* <HeroPathEquilibrium /> */}
              </div>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">The HeroPathEquilibrium component creates a visually stunning hero section with animated SVG paths and interactive elements.</p>
              <p className="mb-2">Perfect for landing pages, feature introductions, or any section where you want to make a strong visual impression.</p>
              <h3 className="text-lg font-medium mt-4 mb-2">Features:</h3>
              <ul className="list-disc list-inside mb-4">
                <li>Animated path equilibrium effects</li>
                <li>Responsive design that adapts to various screen sizes</li>
                <li>Interactive elements that respond to user interaction</li>
                <li>Configurable animation speed and behavior</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import HeroPathEquilibrium from "@/designed-elements/HeroPathEquilibrium";

// Basic usage
<HeroPathEquilibrium />

// With custom overlay content
<div className="relative">
  <HeroPathEquilibrium />
  <div className="absolute inset-0 flex items-center justify-center">
    <h1 className="text-white text-4xl font-bold">Your Headline Here</h1>
  </div>
</div>`}
              </pre>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Pricing Section</h2>
            <p className="text-gray-600 mb-6">Comprehensive pricing plans display with toggle and feature lists</p>
            <div className="py-8">
              {/* <PricingSection /> */}
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">The PricingSection component provides a complete pricing table solution with monthly/annual toggle, feature comparison, and call-to-action buttons.</p>
              <p className="mb-2">Ideal for SaaS applications, subscription services, or any product with tiered pricing models.</p>
              <h3 className="text-lg font-medium mt-4 mb-2">Features:</h3>
              <ul className="list-disc list-inside mb-4">
                <li>Monthly/Annual billing toggle with price adjustment</li>
                <li>Highlighted recommended plan option</li>
                <li>Comprehensive feature comparison across plans</li>
                <li>Responsive design that adapts from mobile to desktop</li>
                <li>Customizable pricing tiers, features, and CTAs</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import PricingSection from "@/designed-elements/pricing-section";

// Basic usage
<PricingSection />

// With custom configuration
<PricingSection
  plans={customPlans}
  currency="€"
  highlightedPlan="pro"
  showToggle={true}
/>`}
              </pre>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Floating Navbar</h2>
            <p className="text-gray-600 mb-6">Modern floating navigation bar with animations and hover effects</p>
            <div className="py-8 px-4 flex justify-center">
              <div className="w-full max-w-3xl">
                {/* <FloatingNavbar /> */}
              </div>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">The FloatingNavbar component provides a modern, floating navigation experience with smooth animations and hover effects.</p>
              <p className="mb-2">Perfect for minimalist designs, landing pages, or any site where you want a distinctive navigation style.</p>
              <h3 className="text-lg font-medium mt-4 mb-2">Features:</h3>
              <ul className="list-disc list-inside mb-4">
                <li>Floating appearance with subtle shadow effects</li>
                <li>Smooth hover animations for navigation items</li>
                <li>Active state indicators</li>
                <li>Fully responsive design</li>
                <li>Customizable links, colors, and behaviors</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import FloatingNavbar from "@/designed-elements/floating-navbar";

// Basic usage
<FloatingNavbar />

// With custom navigation items
<FloatingNavbar
  items={[
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" }
  ]}
/>`}
              </pre>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Mobile Navbar</h2>
            <p className="text-gray-600 mb-6">Mobile-optimized navigation with animated hamburger menu</p>
            <div className="py-8 px-4 flex justify-center">
              <div className="w-full max-w-sm">
                {/* <MobileNavbar /> */}
              </div>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">The MobileNavbar component provides a mobile-optimized navigation experience with a hamburger menu icon and animated dropdown.</p>
              <p className="mb-2">Ideal for responsive websites and applications where screen space is limited.</p>
              <h3 className="text-lg font-medium mt-4 mb-2">Features:</h3>
              <ul className="list-disc list-inside mb-4">
                <li>Animated hamburger icon that transforms on click</li>
                <li>Smooth dropdown animation for menu items</li>
                <li>Compact design optimized for mobile devices</li>
                <li>Customizable navigation items and styling</li>
                <li>Accessibility features for keyboard and screen reader users</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import MobileNavbar from "@/designed-elements/mobile-navbar";

// Basic usage
<MobileNavbar />

// With custom options
<MobileNavbar
  logo="/your-logo.svg"
  navItems={customNavItems}
  theme="dark"
/>`}
              </pre>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Footer Component</h2>
            <p className="text-gray-600 mb-6">Comprehensive website footer with multiple sections and links</p>
            <div className="py-8 bg-gray-50 rounded-lg">
              {/* <Footer /> */}
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p className="mb-2">The Footer component provides a complete website footer solution with multiple columns, links, social icons, and legal information.</p>
              <p className="mb-2">Essential for providing navigation, contact information, legal links, and brand reinforcement at the bottom of your pages.</p>
              <h3 className="text-lg font-medium mt-4 mb-2">Features:</h3>
              <ul className="list-disc list-inside mb-4">
                <li>Multi-column layout for organized content</li>
                <li>Social media icon links with hover effects</li>
                <li>Newsletter signup form integration</li>
                <li>Copyright and legal information section</li>
                <li>Fully responsive design that adapts to all screen sizes</li>
              </ul>
              <pre className="bg-gray-100 p-4 mt-2 rounded text-xs">
                {`// Import the component
import Footer from "@/designed-elements/footer";

// Basic usage
<Footer />

// With custom configuration
<Footer
  companyName="Your Company"
  logo="/your-logo.svg"
  socialLinks={customSocialLinks}
  navigationLinks={customNavLinks}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>Components are located in the following directories:</p>
        <p className="mt-2">
          <code className="bg-gray-100 px-2 py-1 rounded">src/components/global/</code> - Basic UI components and utilities
        </p>
        <p className="mt-1">
          <code className="bg-gray-100 px-2 py-1 rounded">designed elements/</code> - Advanced UI components and design patterns
        </p>
        <p className="mt-4">Loaders and animations use styles from <code className="bg-gray-100 px-2 py-1 rounded">src/styles/loaders.css</code></p>
        <p className="mt-2">For best performance, many components use CSS variables for theming and animation parameters</p>
        <p className="mt-2 mb-4">All animations respect the <code className="bg-gray-100 px-2 py-1 rounded">prefers-reduced-motion</code> media query for accessibility</p>
        <p className="mt-4 text-xs">View the full documentation at <code className="bg-gray-100 px-2 py-1 rounded">/docs/components.md</code> for detailed API references and advanced usage</p>
      </footer>
    </div>
  );
};

export default LoadersDemoPage;