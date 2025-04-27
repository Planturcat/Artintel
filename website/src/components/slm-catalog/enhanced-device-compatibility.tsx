"use client";

import React from "react";
import { motion } from "framer-motion";
import { Laptop, Smartphone, Watch, Cpu, Server, Check, X } from "lucide-react";
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from "@/components/ui/modern-card";

const EnhancedDeviceCompatibility = () => {
  const devices = [
    {
      name: "Smartphones",
      icon: Smartphone,
      slmCompatible: true,
      llmCompatible: false,
      specs: "4-8GB RAM, Mobile SoCs",
      description: "Modern smartphones can run optimized SLMs for on-device AI capabilities."
    },
    {
      name: "Laptops",
      icon: Laptop,
      slmCompatible: true,
      llmCompatible: true,
      specs: "8-32GB RAM, Integrated/Discrete GPUs",
      description: "Most laptops can run SLMs efficiently; high-end models can run smaller LLMs."
    },
    {
      name: "IoT Devices",
      icon: Cpu,
      slmCompatible: true,
      llmCompatible: false,
      specs: "512MB-4GB RAM, Low-power CPUs",
      description: "Highly optimized SLMs can run on edge computing devices with limited resources."
    },
    {
      name: "Wearables",
      icon: Watch,
      slmCompatible: true,
      llmCompatible: false,
      specs: "512MB-2GB RAM, Ultra-low power",
      description: "Specialized micro SLMs can enable AI features on smartwatches and wearables."
    },
    {
      name: "Servers",
      icon: Server,
      slmCompatible: true,
      llmCompatible: true,
      specs: "32GB+ RAM, Multiple GPUs",
      description: "Can run multiple SLM instances or full-scale LLMs depending on hardware."
    }
  ];

  return (
    <div className="w-full mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-gradient-primary">
        Device Compatibility
      </h2>
      
      <div className="max-w-4xl mx-auto">
        <ModernCard variant="glass" className="mb-8">
          <ModernCardHeader>
            <ModernCardTitle>
              SLMs Enable AI Across a Wide Range of Devices
            </ModernCardTitle>
          </ModernCardHeader>
          <ModernCardContent>
            <p className="text-muted-foreground mb-6">
              One of the key advantages of Small Language Models is their ability to run on diverse hardware platforms, from resource-constrained IoT devices to high-end servers, bringing AI capabilities to previously inaccessible environments.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {devices.map((device, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass p-4 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <device.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">{device.name}</h3>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-3">
                    <span className="font-medium text-foreground">Typical Specs:</span> {device.specs}
                  </p>
                  
                  <div className="flex items-center gap-6 mb-3">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium">SLM:</span>
                      {device.slmCompatible ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium">LLM:</span>
                      {device.llmCompatible ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    {device.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </ModernCardContent>
        </ModernCard>
        
        <div className="grid md:grid-cols-2 gap-6">
          <ModernCard variant="gradient" interactive={true}>
            <ModernCardHeader>
              <ModernCardTitle>Optimization Techniques</ModernCardTitle>
            </ModernCardHeader>
            <ModernCardContent>
              <div className="space-y-4">
                <div className="glass p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Quantization</h4>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-2 bg-primary/70 rounded-full w-[70%]"></div>
                    <span className="text-xs font-mono">High Impact</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Reducing precision from FP32 to INT8 or INT4 can shrink model size by 75% with minimal accuracy loss.
                  </p>
                </div>
                
                <div className="glass p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Knowledge Distillation</h4>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-2 bg-primary/70 rounded-full w-[90%]"></div>
                    <span className="text-xs font-mono">Very High Impact</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Training smaller models to mimic larger ones can reduce parameter count by 90%+ while retaining core capabilities.
                  </p>
                </div>
                
                <div className="glass p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Pruning</h4>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-2 bg-primary/70 rounded-full w-[50%]"></div>
                    <span className="text-xs font-mono">Medium Impact</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Removing redundant weights can reduce model size by 30-50% with careful implementation.
                  </p>
                </div>
              </div>
            </ModernCardContent>
          </ModernCard>
          
          <ModernCard variant="gradient" interactive={true}>
            <ModernCardHeader>
              <ModernCardTitle>Hardware Acceleration</ModernCardTitle>
            </ModernCardHeader>
            <ModernCardContent>
              <div className="space-y-4">
                <div className="glass p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Mobile NPUs</h4>
                  <p className="text-xs text-muted-foreground">
                    Modern smartphones include Neural Processing Units specifically designed for AI workloads, enabling efficient SLM inference.
                  </p>
                </div>
                
                <div className="glass p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Edge TPUs</h4>
                  <p className="text-xs text-muted-foreground">
                    Specialized tensor processing hardware for edge devices can accelerate SLM inference by 5-10x compared to CPU-only execution.
                  </p>
                </div>
                
                <div className="glass p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Optimized Runtimes</h4>
                  <p className="text-xs text-muted-foreground">
                    Frameworks like ONNX Runtime, TensorRT, and CoreML provide device-specific optimizations for maximum performance.
                  </p>
                </div>
              </div>
            </ModernCardContent>
          </ModernCard>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDeviceCompatibility;
