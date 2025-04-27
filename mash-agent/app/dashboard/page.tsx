"use client"

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Database, BarChart, Rocket, Code, RefreshCw } from 'lucide-react';
import { DatasetManager } from '@/components/dataset-manager';
import { FineTuningManager } from '@/components/fine-tuning-manager';
import { ModelDeploymentManager } from '@/components/model-deployment-manager';
import { UIGenerator } from '@/components/ui-generator';
import { checkBackendConnection } from '@/lib/api-service';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('datasets');
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [backendConnected, setBackendConnected] = useState<boolean | null>(null);
  
  // Function to check backend connection
  const checkConnection = async () => {
    setIsCheckingConnection(true);
    
    try {
      const isConnected = await checkBackendConnection();
      setBackendConnected(isConnected);
    } catch (err) {
      console.error("Error checking connection:", err);
      setBackendConnected(false);
    } finally {
      setIsCheckingConnection(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Platform Dashboard</h1>
          <p className="text-[#00cbdd]/70 mt-1">
            Manage datasets, fine-tune models, deploy endpoints, and create UI components
          </p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={checkConnection}
          disabled={isCheckingConnection}
          className="border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10"
        >
          {isCheckingConnection ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          {isCheckingConnection ? 'Checking...' : 'Check Connection'}
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8 bg-[#00031b]/50 border border-[#00cbdd]/20">
          <TabsTrigger 
            value="datasets" 
            className="data-[state=active]:bg-[#00cbdd]/10 data-[state=active]:text-[#00cbdd] text-white"
          >
            <Database className="h-4 w-4 mr-2" />
            Datasets
          </TabsTrigger>
          <TabsTrigger 
            value="fine-tuning" 
            className="data-[state=active]:bg-[#00cbdd]/10 data-[state=active]:text-[#00cbdd] text-white"
          >
            <BarChart className="h-4 w-4 mr-2" />
            Fine-Tuning
          </TabsTrigger>
          <TabsTrigger 
            value="deployments" 
            className="data-[state=active]:bg-[#00cbdd]/10 data-[state=active]:text-[#00cbdd] text-white"
          >
            <Rocket className="h-4 w-4 mr-2" />
            Deployments
          </TabsTrigger>
          <TabsTrigger 
            value="ui-generator" 
            className="data-[state=active]:bg-[#00cbdd]/10 data-[state=active]:text-[#00cbdd] text-white"
          >
            <Code className="h-4 w-4 mr-2" />
            UI Generator
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="datasets" className="mt-0">
          <DatasetManager />
        </TabsContent>
        
        <TabsContent value="fine-tuning" className="mt-0">
          <FineTuningManager />
        </TabsContent>
        
        <TabsContent value="deployments" className="mt-0">
          <ModelDeploymentManager />
        </TabsContent>
        
        <TabsContent value="ui-generator" className="mt-0">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">UI Generator</h2>
              <p className="text-[#00cbdd]/70">
                Generate UI components that connect to your AI models
              </p>
            </div>
            
            <UIGenerator 
              onGeneratedCode={(code) => {
                console.log("Generated code:", code);
                // You could save this code or display it in a preview
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
