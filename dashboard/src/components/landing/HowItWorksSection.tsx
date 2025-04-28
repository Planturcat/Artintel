"use client";

import { useTheme } from '@/contexts/ThemeContext';
import { Database, Zap, Rocket, LineChart, BrainCircuit } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useState, useEffect } from 'react';

export default function HowItWorksSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isClient, setIsClient] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  // Initialize on client-side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Define steps
  const steps = [
    {
      id: 1,
      title: "Model Selection",
      description: "Browse a curated directory of open-source models with performance metrics, resource requirements, and licensing details.",
      icon: <BrainCircuit className="h-6 w-6" />,
      color: "from-blue-500 to-purple-500",
      shadow: "shadow-blue-500/20",
      detailedDescription: "Our platform offers a comprehensive directory of the best open-source models. Each listing includes detailed performance benchmarks, hardware requirements, and clear licensing information so you can make informed decisions."
    },
    {
      id: 2,
      title: "Data Integration",
      description: "Securely upload or connect your data sources with built-in preprocessing tools for deduplication and PII redaction.",
      icon: <Database className="h-6 w-6" />,
      color: "from-green-500 to-teal-500",
      shadow: "shadow-green-500/20",
      detailedDescription: "Security is our priority. Our platform allows you to safely connect to your existing data sources or upload files directly. Built-in preprocessing tools automatically handle deduplication, cleaning, and PII redaction to protect sensitive information."
    },
    {
      id: 3,
      title: "Fine-Tuning",
      description: "Customize models to your specific needs with our no-code studio - no programming experience required.",
      icon: <Zap className="h-6 w-6" />,
      color: "from-[#00cbdd] to-blue-500",
      shadow: "shadow-[#00cbdd]/20",
      detailedDescription: "Our intuitive no-code studio makes fine-tuning accessible to everyone. With a simple drag-and-drop interface, you can customize models to your specific use case, set training parameters, and monitor progress without writing a single line of code."
    },
    {
      id: 4,
      title: "Deployment",
      description: "Deploy with one click to cloud, on-premise, or hybrid environments with robust scaling and security.",
      icon: <Rocket className="h-6 w-6" />,
      color: "from-orange-500 to-red-500",
      shadow: "shadow-orange-500/20",
      detailedDescription: "Deployment shouldn't be difficult. With a single click, you can deploy your fine-tuned models to cloud providers, your own infrastructure, or hybrid environments. Our platform handles load balancing, auto-scaling, and security so you don't have to."
    },
    {
      id: 5,
      title: "Monitoring",
      description: "Track performance with real-time dashboards for latency, throughput, cost, and quality metrics.",
      icon: <LineChart className="h-6 w-6" />,
      color: "from-purple-500 to-indigo-500",
      shadow: "shadow-purple-500/20",
      detailedDescription: "Our comprehensive monitoring dashboards give you full visibility into your AI systems. Track key metrics like latency, throughput, cost per request, and quality scores in real-time. Set up alerts and automated responses to keep everything running smoothly."
    }
  ];

  return (
    <section 
      id="how-it-works"
      className={`w-full py-24 relative ${
        isDark 
          ? 'bg-[#00031b]' 
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="block text-lg font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-blue-500">
            Simplified Process
          </span>
          
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#00031b]'}`}>
            How It <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-blue-500">Works</span>
          </h2>
          
          <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Our end-to-end platform simplifies every step of the AI implementation process
          </p>
        </div>

        <div className="relative z-10">
          <DashboardCard 
            title="The 5-Step Process" 
            subtitle="From model selection to deployment and beyond"
            fullWidth
            className={`border border-[#00cbdd]/20 ${isDark ? 'bg-[#00061b]/80' : 'bg-gray-50/90'}`}
          >
            <div className="py-10 px-6 relative">
              {/* Connection line */}
              <div className="absolute top-32 left-8 md:left-1/2 w-0.5 md:w-[calc(100%-8rem)] h-[calc(100%-3rem)] md:h-0.5 bg-gradient-to-r from-[#00cbdd] to-blue-500 hidden sm:block" />
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-6 relative z-10">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="relative z-10 transition-transform duration-300 hover:scale-105"
                    onMouseEnter={() => setActiveStep(index)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    <div className="flex flex-col md:items-center">
                      <div 
                        className={`flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br ${step.color} p-5 text-white mb-6 ${step.shadow} relative z-10 transition-transform duration-300 hover:scale-105`}
                      >
                        {step.icon}
                      </div>
                      
                      <div className={`bg-gradient-to-r ${step.color} text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3`}>
                        Step {step.id}
                      </div>
                      
                      <h3 className={`text-xl font-bold mb-3 text-center ${isDark ? 'text-white' : 'text-[#00031b]'}`}>
                        {step.title}
                      </h3>
                      
                      <p className={`text-sm text-center mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {step.description}
                      </p>
                      
                      <div
                        className={`text-sm overflow-hidden rounded-lg p-4 mt-2 transition-all duration-300 ${
                          activeStep === index 
                            ? 'max-h-96 opacity-100' 
                            : 'max-h-0 opacity-0 p-0'
                        } ${
                          isDark 
                            ? 'bg-[#00031b]/80 text-gray-300 border border-[#00cbdd]/20' 
                            : 'bg-white text-gray-700 border border-gray-200'
                        }`}
                      >
                        {step.detailedDescription}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DashboardCard>
        </div>

        <div className="mt-16 text-center">
          <div className="relative inline-block">
            <blockquote className={`text-lg md:text-xl italic relative z-10 ${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-3xl mx-auto`}>
              "Our platform is designed to make AI accessible to all businesses, regardless of their technical expertise."
            </blockquote>
            <div className="absolute top-0 -left-4 text-6xl opacity-20 text-[#00cbdd]">"</div>
            <div className="absolute bottom-0 -right-4 text-6xl opacity-20 text-[#00cbdd]">"</div>
          </div>
          
          <div className="mt-6">
            <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              — Sarah Chen, CTO
            </span>
          </div>
        </div>
      </div>

      {/* Static background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-[#00cbdd]/10 blur-3xl" />
        
        <div className="absolute inset-0 grid grid-cols-3 gap-4 opacity-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={`grid-line-${index}`} className="h-full w-px bg-[#00cbdd] ml-auto" />
          ))}
        </div>
        
        <div className="absolute inset-0 grid grid-rows-3 gap-4 opacity-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={`grid-row-${index}`} className="w-full h-px bg-[#00cbdd] mt-auto" />
          ))}
        </div>
      </div>
    </section>
  );
} 