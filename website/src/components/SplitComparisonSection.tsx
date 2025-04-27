"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface ComparisonMetric {
  id: string;
  label: string;
  llmValue: string | number;
  slmValue: string | number;
  description: string;
}

interface SplitComparisonSectionProps {
  llmTitle: string;
  llmDescription: string;
  slmTitle: string;
  slmDescription: string;
  metrics: ComparisonMetric[];
  llmLink?: string;
  slmLink?: string;
  className?: string;
}

const SplitComparisonSection: React.FC<SplitComparisonSectionProps> = ({
  llmTitle,
  llmDescription,
  slmTitle,
  slmDescription,
  metrics,
  llmLink = "/models/llm",
  slmLink = "/models/slm",
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<'llm' | 'slm' | 'split'>('split');
  const [activeMetric, setActiveMetric] = useState<string>(metrics[0]?.id || "");
  const [floatingMetrics, setFloatingMetrics] = useState<ComparisonMetric[]>([]);

  useEffect(() => {
    // Randomly select metrics to float around in the background
    const interval = setInterval(() => {
      if (metrics.length > 0) {
        const randomMetrics = [...metrics]
          .sort(() => 0.5 - Math.random()) // Shuffle array
          .slice(0, Math.min(3, metrics.length)); // Take 3 or less
        
        setFloatingMetrics(randomMetrics);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [metrics]);

  const getActiveMetric = () => metrics.find(m => m.id === activeMetric) || metrics[0];

  return (
    <div className={`split-comparison-section relative overflow-hidden rounded-xl border border-primary/20 ${className}`}>
      {/* Background floating metrics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {floatingMetrics.map((metric, index) => (
            <motion.div
              key={`${metric.id}-${index}`}
              className="absolute text-primary/10 font-bold text-4xl lg:text-6xl"
              initial={{ 
                opacity: 0,
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%` 
              }}
              animate={{ 
                opacity: 0.3,
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                transition: { 
                  duration: 15,
                  ease: "easeInOut"
                }
              }}
              exit={{ opacity: 0 }}
            >
              {typeof metric.llmValue === 'number' || typeof metric.slmValue === 'number' ? 
                `${metric.label}: ${metric.llmValue} vs ${metric.slmValue}` : metric.label}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Comparison tabs */}
      <div className="flex border-b border-primary/20">
        <button 
          onClick={() => setActiveTab('llm')}
          className={`flex-1 py-4 px-6 text-center font-medium transition-all ${activeTab === 'llm' ? 'bg-primary/20 text-primary' : 'hover:bg-primary/5'}`}
        >
          LLM View
        </button>
        <button 
          onClick={() => setActiveTab('split')}
          className={`flex-1 py-4 px-6 text-center font-medium transition-all ${activeTab === 'split' ? 'bg-primary/20 text-primary' : 'hover:bg-primary/5'}`}
        >
          Side-by-Side
        </button>
        <button 
          onClick={() => setActiveTab('slm')}
          className={`flex-1 py-4 px-6 text-center font-medium transition-all ${activeTab === 'slm' ? 'bg-primary/20 text-primary' : 'hover:bg-primary/5'}`}
        >
          SLM View
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row relative min-h-[500px]">
        {/* LLM Side */}
        <div 
          className={`
            ${activeTab === 'split' ? 'w-full md:w-1/2' : 'w-full'} 
            ${activeTab === 'slm' ? 'hidden md:hidden' : 'block'}
            transition-all duration-500 ease-in-out
            p-6 md:p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10
          `}
        >
          <div className="mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-3">{llmTitle}</h3>
            <p className="text-muted-foreground">{llmDescription}</p>
          </div>

          {activeTab !== 'split' && (
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-3">Key Metrics</h4>
              <div className="space-y-2">
                {metrics.map(metric => (
                  <button
                    key={metric.id}
                    onClick={() => setActiveMetric(metric.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      activeMetric === metric.id 
                        ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-transparent hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{metric.label}</span>
                      <span className={`font-bold ${typeof metric.llmValue === 'number' ? 'text-blue-600' : ''}`}>
                        {metric.llmValue}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto pt-4">
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg">
              <a href={llmLink}>Explore LLMs</a>
            </Button>
          </div>
        </div>

        {/* SLM Side */}
        <div 
          className={`
            ${activeTab === 'split' ? 'w-full md:w-1/2' : 'w-full'} 
            ${activeTab === 'llm' ? 'hidden md:hidden' : 'block'}
            transition-all duration-500 ease-in-out
            p-6 md:p-8 bg-gradient-to-br from-green-500/10 to-teal-500/10
          `}
        >
          <div className="mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-green-600 mb-3">{slmTitle}</h3>
            <p className="text-muted-foreground">{slmDescription}</p>
          </div>

          {activeTab !== 'split' && (
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-3">Key Metrics</h4>
              <div className="space-y-2">
                {metrics.map(metric => (
                  <button
                    key={metric.id}
                    onClick={() => setActiveMetric(metric.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      activeMetric === metric.id 
                        ? 'border-green-400 bg-green-50 dark:bg-green-900/20'
                        : 'border-transparent hover:bg-green-50/50 dark:hover:bg-green-900/10'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{metric.label}</span>
                      <span className={`font-bold ${typeof metric.slmValue === 'number' ? 'text-green-600' : ''}`}>
                        {metric.slmValue}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto pt-4">
            <Button asChild className="w-full bg-green-600 hover:bg-green-700 rounded-lg">
              <a href={slmLink}>Explore SLMs</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Metric comparison section */}
      {activeTab === 'split' && (
        <div className="p-6 md:p-8 border-t border-primary/20 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-green-500/5">
          <h4 className="text-xl font-bold mb-4">Compare Metrics</h4>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {metrics.map(metric => (
              <button
                key={metric.id}
                onClick={() => setActiveMetric(metric.id)}
                className={`p-3 rounded-lg border transition-all ${
                  activeMetric === metric.id 
                    ? 'border-primary bg-primary/10'
                    : 'border-transparent hover:bg-primary/5'
                }`}
              >
                {metric.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeMetric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-xl bg-card/50 border border-border"
            >
              <h5 className="text-lg font-medium mb-3">{getActiveMetric().label}</h5>
              <p className="text-muted-foreground mb-6">{getActiveMetric().description}</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <h6 className="font-medium text-blue-600 mb-2">LLM</h6>
                  <div className="text-2xl font-bold">{getActiveMetric().llmValue}</div>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <h6 className="font-medium text-green-600 mb-2">SLM</h6>
                  <div className="text-2xl font-bold">{getActiveMetric().slmValue}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default SplitComparisonSection; 