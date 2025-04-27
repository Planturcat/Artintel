"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Cpu, Zap } from "lucide-react";
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from "@/components/ui/modern-card";

const ModelDistillation = () => {
  return (
    <div className="w-full mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-gradient-primary">
        Knowledge Distillation
      </h2>
      
      <div className="max-w-4xl mx-auto">
        <ModernCard variant="glass" className="mb-8">
          <ModernCardHeader>
            <ModernCardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              What is Model Distillation?
            </ModernCardTitle>
          </ModernCardHeader>
          <ModernCardContent>
            <p className="text-muted-foreground mb-4">
              Knowledge distillation is a technique where a smaller model (the "student") is trained to mimic the behavior of a larger, more powerful model (the "teacher"). This process allows the student model to achieve performance closer to the teacher while maintaining a smaller size.
            </p>
            
            <div className="relative h-[200px] my-8">
              {/* Teacher model */}
              <motion.div 
                className="absolute left-0 top-0 w-[200px] h-[200px] rounded-lg border border-primary/30 bg-primary/5 flex flex-col items-center justify-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Brain className="h-16 w-16 text-primary/70 mb-2" />
                <div className="text-center">
                  <h4 className="font-medium">Teacher Model</h4>
                  <p className="text-xs text-muted-foreground">Large, powerful LLM</p>
                  <p className="text-xs text-primary mt-2">7B-70B parameters</p>
                </div>
              </motion.div>
              
              {/* Distillation process */}
              <motion.div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="relative w-[100px] h-[2px] bg-gradient-to-r from-primary/80 to-primary/30">
                  <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                    animate={{ x: [0, 100, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div className="mt-2 text-xs text-primary font-mono">
                  Knowledge Transfer
                </div>
              </motion.div>
              
              {/* Student model */}
              <motion.div 
                className="absolute right-0 top-0 w-[200px] h-[200px] rounded-lg border border-primary/30 bg-primary/5 flex flex-col items-center justify-center"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Cpu className="h-12 w-12 text-primary/70 mb-2" />
                <div className="text-center">
                  <h4 className="font-medium">Student Model</h4>
                  <p className="text-xs text-muted-foreground">Compact, efficient SLM</p>
                  <p className="text-xs text-primary mt-2">60M-2B parameters</p>
                </div>
              </motion.div>
            </div>
          </ModernCardContent>
        </ModernCard>
        
        <div className="grid md:grid-cols-2 gap-6">
          <ModernCard variant="gradient" interactive={true}>
            <ModernCardHeader>
              <ModernCardTitle>Benefits of Distillation</ModernCardTitle>
            </ModernCardHeader>
            <ModernCardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <ArrowRight className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-muted-foreground">
                    <span className="text-foreground font-medium">Efficiency:</span> Smaller models require less memory and compute
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <ArrowRight className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-muted-foreground">
                    <span className="text-foreground font-medium">Speed:</span> Faster inference times for real-time applications
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <ArrowRight className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-muted-foreground">
                    <span className="text-foreground font-medium">Deployment:</span> Can run on edge devices with limited resources
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <ArrowRight className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-muted-foreground">
                    <span className="text-foreground font-medium">Cost:</span> Lower operational expenses for inference
                  </span>
                </li>
              </ul>
            </ModernCardContent>
          </ModernCard>
          
          <ModernCard variant="gradient" interactive={true}>
            <ModernCardHeader>
              <ModernCardTitle>Distillation Techniques</ModernCardTitle>
            </ModernCardHeader>
            <ModernCardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-muted-foreground">
                    <span className="text-foreground font-medium">Response-Based:</span> Student learns from teacher's final outputs
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-muted-foreground">
                    <span className="text-foreground font-medium">Feature-Based:</span> Student learns from teacher's intermediate representations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-muted-foreground">
                    <span className="text-foreground font-medium">Relation-Based:</span> Student learns relationships between different outputs
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-muted-foreground">
                    <span className="text-foreground font-medium">Task-Specific:</span> Focused distillation for particular use cases
                  </span>
                </li>
              </ul>
            </ModernCardContent>
          </ModernCard>
        </div>
      </div>
    </div>
  );
};

export default ModelDistillation;
