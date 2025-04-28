"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/landing/AboutSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import UseCasesSection from "@/components/landing/UseCasesSection";
import CTASection from "@/components/landing/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#00031b] dark:bg-[#00031b] light:bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />
      
      {/* About Section */}
      <AboutSection />
      
      {/* How It Works Section */}
      <HowItWorksSection />
      
      {/* Key Features Section */}
      <FeaturesSection />
      
      {/* Use Cases Section */}
      <UseCasesSection />
      
      {/* Call to Action Section */}
      <CTASection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
