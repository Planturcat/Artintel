"use client";

import React from "react";
import { motion } from "framer-motion";
import { Laptop, Smartphone, Watch, Cpu, Server, Wifi, Cloud } from "lucide-react";
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from "@/components/ui/modern-card";

const EdgeDeployment = () => {
  return (
    <div className="w-full mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-gradient-primary">
        Edge Deployment
      </h2>
      
      <div className="max-w-4xl mx-auto">
        <ModernCard variant="glass" className="mb-8">
          <ModernCardHeader>
            <ModernCardTitle className="flex items-center gap-2">
              <Laptop className="h-5 w-5 text-primary" />
              Deploying SLMs at the Edge
            </ModernCardTitle>
          </ModernCardHeader>
          <ModernCardContent>
            <p className="text-muted-foreground mb-6">
              Small Language Models are ideal for edge deployment, bringing AI capabilities directly to end-user devices without requiring constant cloud connectivity. This approach offers significant advantages in privacy, latency, and operational costs.
            </p>
            
            <div className="relative h-[300px] my-8">
              {/* Cloud */}
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 top-0 w-[200px] h-[80px] rounded-lg border border-primary/30 bg-primary/5 flex items-center justify-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3">
                  <Cloud className="h-8 w-8 text-primary/70" />
                  <div>
                    <h4 className="font-medium">Cloud</h4>
                    <p className="text-xs text-muted-foreground">Training & Updates</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Connection lines */}
              <motion.div 
                className="absolute left-1/2 top-[80px] w-[2px] h-[40px] bg-primary/30"
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
                  animate={{ y: [0, 40, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
              
              {/* Edge Server */}
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 top-[120px] w-[240px] h-[80px] rounded-lg border border-primary/30 bg-primary/5 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3">
                  <Server className="h-8 w-8 text-primary/70" />
                  <div>
                    <h4 className="font-medium">Edge Server</h4>
                    <p className="text-xs text-muted-foreground">Model Distribution & Management</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Wifi icon */}
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 top-[210px] bg-primary/10 p-2 rounded-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <Wifi className="h-5 w-5 text-primary" />
              </motion.div>
              
              {/* Edge Devices */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-6">
                {[
                  { icon: Laptop, name: "Laptop", delay: 1.1 },
                  { icon: Smartphone, name: "Mobile", delay: 1.3 },
                  { icon: Watch, name: "Wearable", delay: 1.5 },
                  { icon: Cpu, name: "IoT Device", delay: 1.7 }
                ].map((device, index) => {
                  const DeviceIcon = device.icon;
                  return (
                    <motion.div 
                      key={index}
                      className="w-[100px] h-[80px] rounded-lg border border-primary/30 bg-primary/5 flex flex-col items-center justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: device.delay }}
                      viewport={{ once: true }}
                    >
                      <DeviceIcon className="h-6 w-6 text-primary/70 mb-2" />
                      <p className="text-xs font-medium">{device.name}</p>
                      <p className="text-[10px] text-primary">SLM Enabled</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </ModernCardContent>
        </ModernCard>
        
        <div className="grid md:grid-cols-2 gap-6">
          <ModernCard variant="gradient" interactive={true}>
            <ModernCardHeader>
              <ModernCardTitle>Edge Deployment Benefits</ModernCardTitle>
            </ModernCardHeader>
            <ModernCardContent>
              <div className="space-y-4">
                <div className="glass p-3 rounded-lg">
                  <h4 className="font-medium mb-1 flex items-center gap-2">
                    <div className="bg-primary/10 p-1 rounded-full">
                      <Wifi className="h-3.5 w-3.5 text-primary" />
                    </div>
                    Offline Functionality
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    AI capabilities remain available even without internet connectivity, ensuring consistent user experience.
                  </p>
                </div>
                
                <div className="glass p-3 rounded-lg">
                  <h4 className="font-medium mb-1 flex items-center gap-2">
                    <div className="bg-primary/10 p-1 rounded-full">
                      <Cpu className="h-3.5 w-3.5 text-primary" />
                    </div>
                    Reduced Latency
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Processing happens locally, eliminating network round-trip delays for near-instantaneous responses.
                  </p>
                </div>
                
                <div className="glass p-3 rounded-lg">
                  <h4 className="font-medium mb-1 flex items-center gap-2">
                    <div className="bg-primary/10 p-1 rounded-full">
                      <Server className="h-3.5 w-3.5 text-primary" />
                    </div>
                    Lower Infrastructure Costs
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Significantly reduces cloud computing expenses by leveraging end-user devices for inference.
                  </p>
                </div>
              </div>
            </ModernCardContent>
          </ModernCard>
          
          <ModernCard variant="gradient" interactive={true}>
            <ModernCardHeader>
              <ModernCardTitle>Implementation Strategies</ModernCardTitle>
            </ModernCardHeader>
            <ModernCardContent>
              <div className="space-y-4">
                <div className="glass p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Quantization</h4>
                  <p className="text-sm text-muted-foreground">
                    Reduce model precision from 32-bit to 8-bit or 4-bit to decrease memory footprint while maintaining acceptable accuracy.
                  </p>
                </div>
                
                <div className="glass p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Model Pruning</h4>
                  <p className="text-sm text-muted-foreground">
                    Remove redundant or less important weights from the model to reduce size without significant performance loss.
                  </p>
                </div>
                
                <div className="glass p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Hardware Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    Leverage device-specific accelerators (NPUs, DSPs) and optimized inference engines for maximum performance.
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

export default EdgeDeployment;
