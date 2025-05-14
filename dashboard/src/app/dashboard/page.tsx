"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import StatCard from '@/components/dashboard/StatCard';
import DashboardCard from '@/components/dashboard/DashboardCard';
import LineChart from '@/components/dashboard/LineChart';
import { useDashboardData } from '@/hooks/useDashboardData';
import {
  Brain,
  Server,
  Zap,
  Clock,
  Users,
  CreditCard,
  MoreHorizontal,
  Sparkles,
  Star,
  Play,
  Pause,
  Activity,
  BrainCircuit,
  Workflow,
  Gauge,
  Layers,
  FileCode,
  Network,
  Cpu,
  BarChart,
  Bell,
  Globe,
  CheckCircle2,
  ArrowDownRight,
  ArrowUpRight,
  LineChart as LineChartIcon,
  Key,
  UserPlus,
  Database,
  HardDrive,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { user } = useAuth();
  const isDark = theme === 'dark';
  const [hoveredPanel, setHoveredPanel] = useState<string | null>(null);
  const router = useRouter();
  
  // Use our dashboard data hook
  const {
    systemStatus,
    modelPerformance,
    finetuningData,
    deploymentMetrics,
    performanceComparison,
    alerts,
    tokenUsage,
    monitoringPerformance,
    currentTime,
    loading,
    refreshData
  } = useDashboardData(10000); // Refresh every 10 seconds

  // Track mouse movement for panel hover effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const panels = document.querySelectorAll('.dashboard-panel-core');
    
    panels.forEach(panel => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (
        x >= 0 && 
        x <= rect.width && 
        y >= 0 && 
        y <= rect.height
      ) {
        const mouseX = Math.floor((x / rect.width) * 100);
        const mouseY = Math.floor((y / rect.height) * 100);
        
        (panel as HTMLElement).style.setProperty('--mouse-x', `${mouseX}%`);
        (panel as HTMLElement).style.setProperty('--mouse-y', `${mouseY}%`);
      }
    });
  };

  // Generate random flashing dots for the connection lines
  const generateFlashingDots = (count: number) => {
    return Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={`dot-${i}`}
        className="absolute rounded-full bg-[#00cbdd]/30"
        style={{
          width: 2 + Math.random() * 4,
          height: 2 + Math.random() * 4,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8 + Math.random() * 4,
          delay: Math.random() * 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    ));
  };

  // Legacy data format for compatibility with the existing components
  const analyticsData = [
    { name: 'Jan', Inference: 4000, Tokens: 2400, Training: 1200 },
    { name: 'Feb', Inference: 3000, Tokens: 1398, Training: 800 },
    { name: 'Mar', Inference: 2000, Tokens: 9800, Training: 1700 },
    { name: 'Apr', Inference: 2780, Tokens: 3908, Training: 2600 },
    { name: 'May', Inference: 1890, Tokens: 4800, Training: 2100 },
    { name: 'Jun', Inference: 2390, Tokens: 3800, Training: 1800 },
    { name: 'Jul', Inference: 3490, Tokens: 4300, Training: 2400 },
  ];

  // Convert our mock models data to the expected format
  const modelsData = [
    {
      id: 'model-1',
      name: 'ArtIntel-7B',
      type: 'Foundational LLM',
      status: 'Running',
      metrics: {
        tokens: '1.2B',
        latency: `${deploymentMetrics?.avgLatency || 250}ms`,
        cost: '$0.10/1K tokens',
      },
      description: 'General purpose language model optimized for creative content generation.',
      updated: '2 hours ago',
      version: '1.4.0',
    },
    {
      id: 'model-2',
      name: 'ArtIntel-Vision',
      type: 'Multimodal',
      status: 'Running',
      metrics: {
        tokens: '752M',
        latency: '450ms',
        cost: '$0.15/1K tokens',
      },
      description: 'Vision-language model for image understanding and generation.',
      updated: '1 day ago',
      version: '2.1.0',
    },
    {
      id: 'model-3',
      name: 'ArtIntel-Code',
      type: 'Code Generator',
      status: 'Paused',
      metrics: {
        tokens: '486M',
        latency: '180ms',
        cost: '$0.08/1K tokens',
      },
      description: 'Specialized model for code generation and completion.',
      updated: '5 days ago',
      version: '0.9.2',
    },
    {
      id: 'model-4',
      name: 'ArtIntel-Assistant',
      type: 'Fine-tuned Assistant',
      status: 'Running',
      metrics: {
        tokens: '934M',
        latency: '320ms',
        cost: '$0.12/1K tokens',
      },
      description: 'Customer support and assistance specialized model.',
      updated: '3 days ago',
      version: '1.2.1',
    },
  ];

  // Generate personalized activity feed based on user
  const generatePersonalizedActivity = () => {
    if (!user) return [];
    
    // Base activities that are always shown
    const baseActivities = [
      {
        id: 'activity-1',
        type: 'model_deployed',
        title: 'Model Deployed',
        description: 'ArtIntel-7B was successfully deployed to production',
        time: '2 hours ago',
        icon: <Server className="h-5 w-5" />
      },
      {
        id: 'activity-2',
        type: 'dataset_processed',
        title: 'Dataset Processed',
        description: 'Customer Support dataset processing completed',
        time: '5 hours ago',
        icon: <Database className="h-5 w-5" />
      }
    ];
    
    // User-specific activities
    const userActivities = [
      {
        id: 'activity-user-1',
        type: 'account_updated',
        title: 'Account Updated',
        description: `Your ${user.tier} tier subscription was renewed`,
        time: '1 day ago',
        icon: <CreditCard className="h-5 w-5" />
      },
      {
        id: 'activity-user-2',
        type: 'model_trained',
        title: 'Fine-tuning Completed',
        description: `Your custom model based on ${user.stats?.models_used > 2 ? 'ArtIntel-7B' : 'ArtIntel-Vision'} is ready`,
        time: '2 days ago',
        icon: <BrainCircuit className="h-5 w-5" />
      }
    ];
    
    return [...userActivities, ...baseActivities];
  };
  
  // Personalized activity feed
  const personalizedActivity = generatePersonalizedActivity();

  return (
    
    <div className="space-y-6" onMouseMove={handleMouseMove}>
      {/* Welcome Header */}
      <div className="mb-8">
        <motion.h1 
          className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {user?.full_name ? `${t('welcomeTitle')}, ${user.full_name}!` : t('welcomeTitle')}
        </motion.h1>
        <motion.p 
          className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {user?.tier === 'pro' 
            ? t('welcomeDescriptionPro') 
            : user?.tier === 'enterprise' 
              ? t('welcomeDescriptionEnterprise') 
              : t('welcomeDescription')}
        </motion.p>
      </div>
      
      {/* Quick Actions Panel */}
      <motion.div 
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-8`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <button 
          className={`flex items-center p-4 rounded-xl border transition-all ${
            isDark 
              ? 'border-gray-800 bg-gray-900/50 hover:bg-[#00cbdd]/5 hover:border-[#00cbdd]/30' 
              : 'border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-200'
          }`}
          onClick={() => router.push('/dashboard/models')}
        >
          <div className={`p-2 rounded-lg ${isDark ? 'bg-[#00cbdd]/10' : 'bg-blue-100'}`}>
            <Brain className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'}`} />
          </div>
          <div className="ml-3 text-left">
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('deployModel')}</p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('launchNewModel')}</p>
          </div>
        </button>
        
        <button 
          className={`flex items-center p-4 rounded-xl border transition-all ${
            isDark 
              ? 'border-gray-800 bg-gray-900/50 hover:bg-purple-500/5 hover:border-purple-500/30' 
              : 'border-gray-200 bg-white hover:bg-purple-50 hover:border-purple-200'
          }`}
          onClick={() => router.push('/dashboard/datasets')}
        >
          <div className={`p-2 rounded-lg ${isDark ? 'bg-purple-500/10' : 'bg-purple-100'}`}>
            <Workflow className={`h-5 w-5 ${isDark ? 'text-purple-500' : 'text-purple-600'}`} />
          </div>
          <div className="ml-3 text-left">
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('uploadDataset')}</p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('addTrainingData')}</p>
          </div>
        </button>
        
        <button 
          className={`flex items-center p-4 rounded-xl border transition-all ${
            isDark 
              ? 'border-gray-800 bg-gray-900/50 hover:bg-amber-500/5 hover:border-amber-500/30' 
              : 'border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200'
          }`}
          onClick={() => router.push('/dashboard/settings/api-keys')}
        >
          <div className={`p-2 rounded-lg ${isDark ? 'bg-amber-500/10' : 'bg-amber-100'}`}>
            <Key className={`h-5 w-5 ${isDark ? 'text-amber-500' : 'text-amber-600'}`} />
          </div>
          <div className="ml-3 text-left">
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('createAPIKey')}</p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('generateCredentials')}</p>
          </div>
        </button>
        
        <button 
          className={`flex items-center p-4 rounded-xl border transition-all ${
            isDark 
              ? 'border-gray-800 bg-gray-900/50 hover:bg-green-500/5 hover:border-green-500/30' 
              : 'border-gray-200 bg-white hover:bg-green-50 hover:border-green-200'
          }`}
          onClick={() => router.push('/dashboard/team')}
        >
          <div className={`p-2 rounded-lg ${isDark ? 'bg-green-500/10' : 'bg-green-100'}`}>
            <UserPlus className={`h-5 w-5 ${isDark ? 'text-green-500' : 'text-green-600'}`} />
          </div>
          <div className="ml-3 text-left">
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('inviteTeam')}</p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('addCollaborators')}</p>
          </div>
        </button>
      </motion.div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('activeModels')}
          value={loading ? "—" : user?.stats?.models_used.toString() || "0"}
          icon={<Brain className="h-5 w-5" />}
          change={12}
          changeText={t('fromLastMonth')}
          isLoading={loading}
        />
        <StatCard
          title={t('totalInferences')}
          value={loading ? "—" : `${((user?.stats?.tokens_used || 0) / 1000).toFixed(1)}k`}
          icon={<Zap className="h-5 w-5" />}
          change={8}
          changeText={t('fromLastWeek')}
          isLoading={loading}
          gradient="from-purple-500 to-pink-500"
        />
        <StatCard
          title={t('computeHours')}
          value={loading ? "—" : user?.stats?.fine_tuning_jobs > 0 ? "328" : "0"}
          icon={<Clock className="h-5 w-5" />}
          change={-3}
          changeText={t('fromYesterday')}
          isLoading={loading}
          gradient="from-amber-500 to-orange-500"
        />
        <StatCard
          title={t('activeUsers')}
          value={loading ? "—" : user?.organization ? "1,024" : "1"}
          icon={<Users className="h-5 w-5" />}
          change={15}
          changeText={t('fromLastMonth')}
          isLoading={loading}
          gradient="from-green-500 to-emerald-500"
        />
       
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analytics Chart */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('apiUsageAnalytics')}
            </h3>
            <div className="flex space-x-2">
              {['24h', '7d', '30d', '90d', 'All'].map((range) => (
                <button
                  key={range}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    range === '30d'
                      ? isDark
                        ? 'bg-[#00cbdd]/20 text-[#00cbdd]'
                        : 'bg-blue-100 text-blue-700'
                      : isDark
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {t(`time_range_${range.toLowerCase()}`)}
                </button>
              ))}
            </div>
          </div>
          <LineChart
            data={analyticsData}
            lines={[
              { dataKey: 'Inference', name: 'Inference Calls', color: '#00cbdd' },
              { dataKey: 'Tokens', name: 'Token Usage', color: '#8b5cf6' },
              { dataKey: 'Training', name: 'Training Hours', color: '#ec4899' },
            ]}
            xAxisDataKey="name"
            height={350}
            title={t('apiUsageAnalytics')}
            subtitle={t('monthlyStatisticsForAPICallsAndTokenUsage')}
          />
        </div>
        
        {/* Usage and Billing Summary */}
        <DashboardCard
          title={t('usageBilling')}
          subtitle={t('currentPeriodSummary')}
          isLoading={loading}
        >
          {!loading && (
            <div className="space-y-4">
              <div className={`space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex justify-between items-center">
                  <span>{t('totalTokenUsage')}</span>
                  <span className="font-medium">24.5M</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-gradient-to-r from-[#00cbdd] to-blue-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>{t('limit')}: 35M</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('costBreakdown')}</h4>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('thisMonth')}</span>
                </div>
                
                <div className="space-y-3">
                  <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#00cbdd] mr-2"></div>
                      <span>{t('inference')}</span>
                    </div>
                    <span>$124.50</span>
                  </div>
                  <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span>{t('training')}</span>
                    </div>
                    <span>$76.80</span>
                  </div>
                  <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                      <span>{t('storage')}</span>
                    </div>
                    <span>$23.15</span>
                  </div>
                </div>
                
                <div className={`mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center ${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>
                  <span>{t('total')}</span>
                  <span>$224.45</span>
                </div>
                
                <button className={`mt-4 w-full py-2 px-4 rounded-lg flex items-center justify-center ${isDark ? 'bg-[#00cbdd] hover:bg-[#00b3c3] text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} transition-colors`}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  {t('viewBillingDetails')}
                </button>
              </div>
            </div>
          )}
        </DashboardCard>
      </div>
      
      {/* Models Section */}
      <DashboardCard
        title={t('yourAIModels')}
        subtitle={t('statusAndPerformanceOfYourDeployedModels')}
        isLoading={loading}
        className="mt-6"
      >
        {!loading && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                    {t('model')}
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                    {t('type')}
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                    {t('status')}
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                    {t('metrics')}
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                    {t('lastUpdated')}
                  </th>
                  <th className={`px-6 py-3 text-right text-xs font-medium ${isDark ? 'text-gray-400 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                    {t('actions')}
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {modelsData.map((model) => (
                  <tr key={model.id} className={`${isDark ? 'hover:bg-[#00cbdd]/5' : 'hover:bg-gray-50'} transition-colors`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg ${
                          model.type === 'Multimodal' 
                            ? 'bg-purple-500/10'
                            : model.type === 'Code Generator' 
                              ? 'bg-amber-500/10'
                              : model.type === 'Fine-tuned Assistant'
                                ? 'bg-green-500/10'
                                : 'bg-[#00cbdd]/10'
                        }`}>
                          {model.type === 'Multimodal' ? (
                            <Sparkles className={`h-5 w-5 text-purple-500`} />
                          ) : model.type === 'Code Generator' ? (
                            <Server className={`h-5 w-5 text-amber-500`} />
                          ) : model.type === 'Fine-tuned Assistant' ? (
                            <Star className={`h-5 w-5 text-green-500`} />
                          ) : (
                            <Brain className={`h-5 w-5 text-[#00cbdd]`} />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {model.name}
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            v{model.version}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {model.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        model.status === 'Running'
                          ? isDark 
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-green-100 text-green-800'
                          : isDark
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {model.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center">
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} w-16`}>{t('tokens')}:</span>
                            <span>{model.metrics.tokens}</span>
                          </div>
                          <div className="flex items-center">
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} w-16`}>{t('latency')}:</span>
                            <span>{model.metrics.latency}</span>
                          </div>
                          <div className="flex items-center">
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} w-16`}>{t('cost')}:</span>
                            <span>{model.metrics.cost}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {model.updated}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        {model.status === 'Running' ? (
                          <button className={`p-1.5 rounded ${
                            isDark ? 'hover:bg-red-500/10 text-red-400' : 'hover:bg-red-100 text-red-600'
                          }`}>
                            <Pause className="h-4 w-4" />
                          </button>
                        ) : (
                          <button className={`p-1.5 rounded ${
                            isDark ? 'hover:bg-green-500/10 text-green-400' : 'hover:bg-green-100 text-green-600'
                          }`}>
                            <Play className="h-4 w-4" />
                          </button>
                        )}
                        <button className={`p-1.5 rounded ${
                          isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                        }`}>
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DashboardCard>
      
      {/* Activity Feed */}
      <DashboardCard
        title={t('recentActivity')}
        subtitle={t('latestActivityOnYourAccount')}
        isLoading={loading}
        className="mt-6"
      >
        {!loading && (
          <div className="space-y-4">
            {personalizedActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg flex-shrink-0 ${
                  isDark ? 'bg-[#00052d]' : 'bg-gray-100'
                }`}>
                  {activity.icon}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h4 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {activity.title}
                    </h4>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {activity.time}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
            
            <div className="mt-4 text-center">
              <button 
                className={`text-sm ${isDark ? 'text-[#00cbdd] hover:text-[#00b3c3]' : 'text-blue-600 hover:text-blue-800'} font-medium transition-colors`}
                onClick={() => router.push('/dashboard/activity')}
              >
                {t('viewAllActivity')}
              </button>
            </div>
          </div>
        )}
      </DashboardCard>
      
      {/* System Health Indicators */}
      <DashboardCard
        title={t('systemHealth')}
        subtitle={t('realTimeStatusOfSystemComponents')}
        isLoading={loading}
        className="mt-6"
      >
        {!loading && (
          <div className="space-y-6">
            {/* Service Status */}
            <div>
              <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('serviceStatus')}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { name: 'API Gateway', status: 'operational', icon: <Server /> },
                  { name: 'Inference Engine', status: 'operational', icon: <BrainCircuit /> },
                  { name: 'Database', status: 'operational', icon: <Database /> },
                  { name: 'Training Service', status: 'degraded', icon: <Workflow /> },
                  { name: 'Storage', status: 'operational', icon: <HardDrive /> }
                ].map((service, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-900/50 border-gray-800' 
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`p-1.5 rounded-lg ${
                        service.status === 'operational'
                          ? isDark ? 'bg-green-500/10' : 'bg-green-100'
                          : service.status === 'degraded'
                            ? isDark ? 'bg-amber-500/10' : 'bg-amber-100'
                            : isDark ? 'bg-red-500/10' : 'bg-red-100'
                      }`}>
                        <div className={`h-4 w-4 ${
                          service.status === 'operational'
                            ? isDark ? 'text-green-500' : 'text-green-600'
                            : service.status === 'degraded'
                              ? isDark ? 'text-amber-500' : 'text-amber-600'
                              : isDark ? 'text-red-500' : 'text-red-600'
                        }`}>
                          {service.icon}
                        </div>
                      </div>
                      <span className={`ml-2 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {service.name}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-1.5 ${
                        service.status === 'operational'
                          ? 'bg-green-500'
                          : service.status === 'degraded'
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                      }`}></div>
                      <span className={`text-xs capitalize ${
                        service.status === 'operational'
                          ? isDark ? 'text-green-400' : 'text-green-600'
                          : service.status === 'degraded'
                            ? isDark ? 'text-amber-400' : 'text-amber-600'
                            : isDark ? 'text-red-400' : 'text-red-600'
                      }`}>
                        {service.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Resource Utilization */}
            <div>
              <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('resourceUtilization')}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'CPU Usage', value: 42, icon: <Cpu />, color: '#00cbdd' },
                  { name: 'Memory Usage', value: 68, icon: <BarChart />, color: '#8b5cf6' },
                  { name: 'Storage Usage', value: 23, icon: <HardDrive />, color: '#ec4899' }
                ].map((resource, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-900/50 border-gray-800' 
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'} mr-2`}>
                          {resource.icon}
                        </div>
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {resource.name}
                        </span>
                      </div>
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {resource.value}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="h-2.5 rounded-full" 
                        style={{ 
                          width: `${resource.value}%`,
                          backgroundColor: resource.color
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Error Rate Metrics */}
            <div>
              <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('errorMetrics')}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg border ${
                  isDark 
                    ? 'bg-gray-900/50 border-gray-800' 
                    : 'bg-white border-gray-200'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('apiErrorRate')}</span>
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>0.12%</span>
                      <span className="text-xs text-green-500 ml-2 flex items-center">
                        <ArrowDownRight className="h-3 w-3 mr-0.5" />
                        0.04%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="h-2.5 rounded-full bg-green-500" style={{ width: '0.12%' }}></div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg border ${
                  isDark 
                    ? 'bg-gray-900/50 border-gray-800' 
                    : 'bg-white border-gray-200'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('modelTimeoutRate')}</span>
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>0.87%</span>
                      <span className="text-xs text-red-500 ml-2 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-0.5" />
                        0.23%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="h-2.5 rounded-full bg-amber-500" style={{ width: '0.87%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DashboardCard>
      
      {/* Floating particles for added visual effects */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-[#00cbdd] opacity-20 blur-xl"
        >
          <motion.div
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              width: 50 + Math.random() * 100,
              height: 50 + Math.random() * 100,
              borderRadius: '50%',
            }}
          />
        </motion.div>
      ))}
    </div>
    
  );
}