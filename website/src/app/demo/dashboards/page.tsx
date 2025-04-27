"use client";

import React, { useState } from 'react';
import FineTuningDashboard from '@/components/perk-dashboards/FineTuningDashboard';
import SmartAnalyticsDashboard from '@/components/perk-dashboards/SmartAnalyticsDashboard';
import APIGatewayDashboard from '@/components/perk-dashboards/APIGatewayDashboard';
import DeploymentToolsDashboard from '@/components/perk-dashboards/DeploymentToolsDashboard';
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardsDemo = () => {
  const [activeTab, setActiveTab] = useState<'fine-tuning' | 'analytics' | 'api-gateway' | 'deployment'>('fine-tuning');

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="mb-8">
        <Link href="/demo">
          <Button variant="outline" size="sm">← Back to Demo Home</Button>
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8 text-center">Dashboard Components Demo</h1>
      
      {/* Tab navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex flex-wrap space-x-2 bg-[#191919] p-1 rounded-lg">
          <button 
            className={`px-4 py-2 rounded-md transition-all ${activeTab === 'fine-tuning' ? 'bg-[#00cbdd]/20 text-[#00cbdd]' : 'hover:bg-[#333]/50'}`}
            onClick={() => setActiveTab('fine-tuning')}
          >
            Fine Tuning
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-all ${activeTab === 'analytics' ? 'bg-[#00cbdd]/20 text-[#00cbdd]' : 'hover:bg-[#333]/50'}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-all ${activeTab === 'api-gateway' ? 'bg-[#00cbdd]/20 text-[#00cbdd]' : 'hover:bg-[#333]/50'}`}
            onClick={() => setActiveTab('api-gateway')}
          >
            API Gateway
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-all ${activeTab === 'deployment' ? 'bg-[#00cbdd]/20 text-[#00cbdd]' : 'hover:bg-[#333]/50'}`}
            onClick={() => setActiveTab('deployment')}
          >
            Deployment
          </button>
        </div>
      </div>
      
      {/* Dashboard display */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#191919] rounded-xl border border-[#333] overflow-hidden shadow-xl">
          <div className="h-[500px] relative">
            {activeTab === 'fine-tuning' && <FineTuningDashboard />}
            {activeTab === 'analytics' && <SmartAnalyticsDashboard />}
            {activeTab === 'api-gateway' && <APIGatewayDashboard />}
            {activeTab === 'deployment' && <DeploymentToolsDashboard />}
          </div>
        </div>
      </div>
      
      {/* Description */}
      <div className="max-w-2xl mx-auto mt-8 text-center text-gray-400">
        <h2 className="text-xl font-semibold mb-2 text-[#00cbdd]">
          {activeTab === 'fine-tuning' && 'Fine Tuning Dashboard'}
          {activeTab === 'analytics' && 'Smart Analytics Dashboard'}
          {activeTab === 'api-gateway' && 'API Gateway Dashboard'}
          {activeTab === 'deployment' && 'Deployment Tools Dashboard'}
        </h2>
        <p>
          {activeTab === 'fine-tuning' && 'Interactive dashboard for fine-tuning language models with rotating model selection and real-time training progress.'}
          {activeTab === 'analytics' && 'Real-time analytics dashboard with interactive charts, metrics, and insights for monitoring model performance.'}
          {activeTab === 'api-gateway' && 'API Gateway visualization with connection lines, animated data packets, and status indicators.'}
          {activeTab === 'deployment' && 'Deployment dashboard with environment selection, progress tracking, and animated deployment visualization.'}
        </p>
      </div>
    </div>
  );
};

export default DashboardsDemo;
