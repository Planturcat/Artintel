"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Cpu, Zap, Clock, CircleDollarSign, Database, Shield } from "lucide-react";
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from "@/components/ui/modern-card";

const EnhancedModelComparison = () => {
  return (
    <div className="w-full mb-16 mt-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-gradient-primary">
        SLM vs. LLM Comparison
      </h2>
      
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* SLM Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <ModernCard variant="gradient" className="h-full border-primary/30">
              <ModernCardHeader>
                <div className="flex items-center justify-between">
                  <ModernCardTitle className="flex items-center gap-2 text-2xl">
                    <Cpu className="h-6 w-6 text-primary" />
                    SLM
                  </ModernCardTitle>
                  <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-medium text-primary">
                    Small Language Model
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Compact models optimized for efficiency and specific tasks
                </p>
              </ModernCardHeader>
              <ModernCardContent className="space-y-6">
                <div className="glass p-4 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Database className="h-4 w-4 text-primary" />
                    Size & Parameters
                  </h4>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-3 bg-primary/70 rounded-full w-[30%]"></div>
                    <span className="text-sm font-mono">60M - 2B</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Significantly smaller parameter count, requiring less memory and computational resources
                  </p>
                </div>
                
                <div className="glass p-4 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Inference Speed
                  </h4>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-3 bg-green-500/70 rounded-full w-[80%]"></div>
                    <span className="text-sm font-mono">10-100ms</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Fast inference times suitable for real-time applications and high-throughput scenarios
                  </p>
                </div>
                
                <div className="glass p-4 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <CircleDollarSign className="h-4 w-4 text-primary" />
                    Cost Efficiency
                  </h4>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-3 bg-green-500/70 rounded-full w-[90%]"></div>
                    <span className="text-sm font-mono">High</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Lower operational costs due to reduced compute requirements and ability to run on standard hardware
                  </p>
                </div>
                
                <div className="glass p-4 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Brain className="h-4 w-4 text-primary" />
                    Capabilities
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <span className="text-foreground">Classification</span> tasks with high accuracy
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <span className="text-foreground">Entity extraction</span> and information retrieval
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <span className="text-foreground">Simple Q&A</span> and domain-specific tasks
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className="glass p-4 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Ideal Use Cases
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Edge devices with limited resources
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        High-throughput applications requiring low latency
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Privacy-sensitive environments requiring on-device processing
                      </span>
                    </li>
                  </ul>
                </div>
              </ModernCardContent>
            </ModernCard>
          </motion.div>
          
          {/* LLM Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ModernCard variant="glass" className="h-full border-purple-500/30">
              <ModernCardHeader>
                <div className="flex items-center justify-between">
                  <ModernCardTitle className="flex items-center gap-2 text-2xl">
                    <Brain className="h-6 w-6 text-purple-500" />
                    LLM
                  </ModernCardTitle>
                  <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-medium text-purple-500">
                    Large Language Model
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Powerful models with broad knowledge and advanced reasoning
                </p>
              </ModernCardHeader>
              <ModernCardContent className="space-y-6">
                <div className="glass p-4 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Database className="h-4 w-4 text-purple-500" />
                    Size & Parameters
                  </h4>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-3 bg-purple-500/70 rounded-full w-[90%]"></div>
                    <span className="text-sm font-mono">7B - 175B+</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Large parameter count enabling complex reasoning and broad knowledge representation
                  </p>
                </div>
                
                <div className="glass p-4 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-500" />
                    Inference Speed
                  </h4>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-3 bg-yellow-500/70 rounded-full w-[40%]"></div>
                    <span className="text-sm font-mono">300ms - 2s+</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Slower inference times due to model size, requiring more powerful hardware
                  </p>
                </div>
                
                <div className="glass p-4 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <CircleDollarSign className="h-4 w-4 text-purple-500" />
                    Cost Efficiency
                  </h4>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-3 bg-red-500/70 rounded-full w-[30%]"></div>
                    <span className="text-sm font-mono">Low-Medium</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Higher operational costs due to GPU/TPU requirements and greater computational demands
                  </p>
                </div>
                
                <div className="glass p-4 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Brain className="h-4 w-4 text-purple-500" />
                    Capabilities
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-3.5 w-3.5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <span className="text-foreground">Complex reasoning</span> and multi-step problem solving
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-3.5 w-3.5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <span className="text-foreground">Creative generation</span> of long-form content
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-3.5 w-3.5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <span className="text-foreground">Broad knowledge</span> across diverse domains
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className="glass p-4 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-500" />
                    Ideal Use Cases
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-3.5 w-3.5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Complex content generation and summarization
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-3.5 w-3.5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Advanced conversational agents requiring deep context
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-3.5 w-3.5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Research and applications where accuracy trumps speed
                      </span>
                    </li>
                  </ul>
                </div>
              </ModernCardContent>
            </ModernCard>
          </motion.div>
        </div>
        
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground max-w-3xl mx-auto">
            The choice between SLMs and LLMs isn't about which is better overall, but rather which is better suited for your specific use case, resource constraints, and performance requirements.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedModelComparison;
