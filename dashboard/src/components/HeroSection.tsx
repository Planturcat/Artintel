import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroBackgroundGrid from "./HeroBackgroundGrid";
import { useTheme } from "@/contexts/ThemeContext";

export default function HeroSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <section className="relative flex-1 flex flex-col items-center px-6 py-16 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <HeroBackgroundGrid />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00cbdd]/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Content - Using mt-auto to push content towards bottom */}
      <div className="mt-50 mb-8 md:mb-16 max-w-5xl mx-auto  text-center z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight text-center ${
            isDark ? 'text-white' : 'text-[#00091b]'
          }`}>
            Democratizing Language Models for <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-blue-500">Every Enterprise</span>
          </h1>
          <p className={`text-xl mb-10 max-w-4xl mx-auto leading-relaxed text-center ${
            isDark ? 'text-gray-300' : 'text-[#00091b]'
          }`}>
            Empower your business with our no-code platform that simplifies fine-tuning, deployment, and management of open‑source AI models. 
            Experience accessible, scalable, and secure language model solutions—designed to break down barriers and drive innovation across industries.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link 
              href="/register" 
              className="bg-gradient-to-r from-[#00cbdd] to-blue-600 hover:from-[#00cbdd]/90 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 flex items-center w-full sm:w-auto justify-center shadow-lg shadow-blue-900/20"
            >
              Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link 
              href="#features" 
              className={`px-8 py-4 rounded-lg font-medium transition-all duration-300 border w-full sm:w-auto text-center backdrop-blur-sm ${
                isDark 
                ? 'bg-white/10 hover:bg-white/15 text-white border-cyan-950' 
                : 'bg-[#00091b]/10 hover:bg-[#00091b]/15 text-[#00091b] border-[#00cbdd]/30'
              }`}
            >
              Explore Features
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 