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
  User,
  AlertTriangle,
  AlertCircle,
  Info
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

  // Generate analytics data from token usage if available
  const analyticsData = tokenUsage?.hourlyData ?
    tokenUsage.hourlyData.map((hour, index) => {
      // Create data points for the chart
      return {
        name: `Hour ${hour.hour}`,
        Inference: hour.value * 0.6, // 60% of tokens used for inference
        Tokens: hour.value,
        Training: hour.value * 0.2, // 20% of tokens used for training
      };
    }) :
    // Fallback empty data if no token usage data is available
    Array(7).fill(0).map((_, i) => ({
      name: `Hour ${i}`,
      Inference: 0,
      Tokens: 0,
      Training: 0
    }));

  // Generate activity feed from alerts and fine-tuning data
  const generateActivityFeed = () => {
    if (!user) return [];

    const activities = [];

    // Add activities from alerts if available
    if (alerts && alerts.alerts) {
      alerts.alerts.forEach((alert, index) => {
        // Convert alert to activity
        activities.push({
          id: `alert-activity-${alert.id}`,
          type: alert.type,
          title: alert.title,
          description: alert.message,
          time: new Date(alert.timestamp).toLocaleString(),
          icon: alert.severity === 'critical' || alert.severity === 'error'
            ? <AlertTriangle className="h-5 w-5 text-red-500" />
            : alert.severity === 'warning'
              ? <AlertCircle className="h-5 w-5 text-amber-500" />
              : <Info className="h-5 w-5 text-blue-500" />
        });
      });
    }

    // Add activities from fine-tuning jobs if available
    if (finetuningData && finetuningData.jobs) {
      finetuningData.jobs.forEach((job, index) => {
        // Convert job to activity
        activities.push({
          id: `job-activity-${job.id}`,
          type: 'fine_tuning',
          title: job.status === 'completed'
            ? 'Fine-tuning Completed'
            : job.status === 'failed'
              ? 'Fine-tuning Failed'
              : 'Fine-tuning In Progress',
          description: `Model ${job.modelName} fine-tuning ${job.status}`,
          time: new Date(job.startTime).toLocaleString(),
          icon: <BrainCircuit className="h-5 w-5" />
        });
      });
    }

    // Add deployment activities if available
    if (deploymentMetrics && deploymentMetrics.regions) {
      deploymentMetrics.regions.forEach((region, index) => {
        if (region.status !== 'operational') {
          activities.push({
            id: `region-activity-${region.region}`,
            type: 'deployment',
            title: 'Region Status Alert',
            description: `${region.region} region is experiencing issues (${region.status})`,
            time: 'Recently',
            icon: <Globe className="h-5 w-5" />
          });
        }
      });
    }

    // Add account activity
    if (user) {
      activities.push({
        id: 'account-activity',
        type: 'account',
        title: 'Account Active',
        description: `Your ${user.tier || 'free'} tier account is active`,
        time: 'Now',
        icon: <User className="h-5 w-5" />
      });
    }

    // Sort by recency (this is a placeholder - in a real app we'd use actual timestamps)
    return activities.slice(0, 5);
  };

  // Activity feed
  const activityFeed = generateActivityFeed();

  return (

    <div className="space-y-6" onMouseMove={handleMouseMove}>
      {/* Welcome Header */}
      <div className="mb-8">
        <motion.h1
          className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#00091b]'}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {user?.full_name ? `${t('welcomeTitle')}, ${user.full_name}!` : t('welcomeTitle')}
        </motion.h1>
        <motion.p
          className={`mt-2 ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}
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
              ? 'border-[#00cbdd]/20 bg-cosmic-900/95 hover:bg-[#00cbdd]/10 hover:border-[#00cbdd]/30'
              : 'border-[#00cbdd]/10 bg-white hover:bg-[#E6FCFF] hover:border-[#00cbdd]/20'
          }`}
          onClick={() => router.push('/dashboard/models')}
        >
          <div className={`p-2 rounded-lg ${isDark ? 'bg-[#00cbdd]/10' : 'bg-[#00cbdd]/10'}`}>
            <Brain className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-[#00cbdd]'}`} />
          </div>
          <div className="ml-3 text-left">
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#00091b]'}`}>{t('deployModel')}</p>
            <p className={`text-xs ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}>{t('launchNewModel')}</p>
          </div>
        </button>

        <button
          className={`flex items-center p-4 rounded-xl border transition-all ${
            isDark
              ? 'border-[#00cbdd]/20 bg-cosmic-900/95 hover:bg-[#00cbdd]/10 hover:border-[#00cbdd]/30'
              : 'border-[#00cbdd]/10 bg-white hover:bg-[#E6FCFF] hover:border-[#00cbdd]/20'
          }`}
          onClick={() => router.push('/dashboard/datasets')}
        >
          <div className={`p-2 rounded-lg ${isDark ? 'bg-[#00cbdd]/10' : 'bg-[#00cbdd]/10'}`}>
            <Workflow className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-[#00cbdd]'}`} />
          </div>
          <div className="ml-3 text-left">
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#00091b]'}`}>{t('uploadDataset')}</p>
            <p className={`text-xs ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}>{t('addTrainingData')}</p>
          </div>
        </button>

        <button
          className={`flex items-center p-4 rounded-xl border transition-all ${
            isDark
              ? 'border-[#00cbdd]/20 bg-cosmic-900/95 hover:bg-[#00cbdd]/10 hover:border-[#00cbdd]/30'
              : 'border-[#00cbdd]/10 bg-white hover:bg-[#E6FCFF] hover:border-[#00cbdd]/20'
          }`}
          onClick={() => router.push('/dashboard/settings/api-keys')}
        >
          <div className={`p-2 rounded-lg ${isDark ? 'bg-[#00cbdd]/10' : 'bg-[#00cbdd]/10'}`}>
            <Key className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-[#00cbdd]'}`} />
          </div>
          <div className="ml-3 text-left">
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#00091b]'}`}>{t('createAPIKey')}</p>
            <p className={`text-xs ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}>{t('generateCredentials')}</p>
          </div>
        </button>

        <button
          className={`flex items-center p-4 rounded-xl border transition-all ${
            isDark
              ? 'border-[#00cbdd]/20 bg-cosmic-900/95 hover:bg-[#00cbdd]/10 hover:border-[#00cbdd]/30'
              : 'border-[#00cbdd]/10 bg-white hover:bg-[#E6FCFF] hover:border-[#00cbdd]/20'
          }`}
          onClick={() => router.push('/dashboard/team')}
        >
          <div className={`p-2 rounded-lg ${isDark ? 'bg-[#00cbdd]/10' : 'bg-[#00cbdd]/10'}`}>
            <UserPlus className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-[#00cbdd]'}`} />
          </div>
          <div className="ml-3 text-left">
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#00091b]'}`}>{t('inviteTeam')}</p>
            <p className={`text-xs ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}>{t('addCollaborators')}</p>
          </div>
        </button>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('activeModels')}
          value={loading ? "—" : modelPerformance?.models?.length.toString() || "0"}
          icon={<Brain className="h-5 w-5" />}
          change={modelPerformance?.aggregated?.averageAccuracy ? Math.round((modelPerformance.aggregated.averageAccuracy * 100) - 88) : 0}
          changeText={t('fromLastMonth')}
          isLoading={loading}
        />
        <StatCard
          title={t('totalInferences')}
          value={loading ? "—" : tokenUsage?.totalTokens ? `${(tokenUsage.totalTokens / 1000).toFixed(1)}k` : "0"}
          icon={<Zap className="h-5 w-5" />}
          change={tokenUsage?.trend || 0}
          changeText={t('fromLastWeek')}
          isLoading={loading}
          gradient="from-[#00cbdd] to-[#0066ff]"
        />
        <StatCard
          title={t('computeHours')}
          value={loading ? "—" : deploymentMetrics?.activeDeployments ? (deploymentMetrics.activeDeployments * 24).toString() : "0"}
          icon={<Clock className="h-5 w-5" />}
          change={deploymentMetrics?.cpuUtilization ? deploymentMetrics.cpuUtilization - 70 : 0}
          changeText={t('fromYesterday')}
          isLoading={loading}
          gradient="from-[#00cbdd] to-[#0066ff]"
        />
        <StatCard
          title={t('activeUsers')}
          value={loading ? "—" : user?.organization ? user.organization_size || "5" : "1"}
          icon={<Users className="h-5 w-5" />}
          change={user?.organization ? 15 : 0}
          changeText={t('fromLastMonth')}
          isLoading={loading}
          gradient="from-[#00cbdd] to-[#0066ff]"
        />

      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analytics Chart */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
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
                        : 'bg-[#00cbdd]/10 text-[#00cbdd]'
                      : isDark
                        ? 'text-[#7fe4eb] hover:text-white hover:bg-[#00cbdd]/10'
                        : 'text-[#00cbdd] hover:text-[#007a85] hover:bg-[#00cbdd]/10'
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
          {!loading && tokenUsage && (
            <div className="space-y-4">
              <div className={`space-y-1 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                <div className="flex justify-between items-center">
                  <span>{t('totalTokenUsage')}</span>
                  <span className="font-medium">{(tokenUsage.totalTokens / 1000000).toFixed(1)}M</span>
                </div>
                <div className="w-full bg-[#000a12] rounded-full h-2.5 dark:bg-[#000a12]">
                  <div
                    className="bg-gradient-to-r from-[#00cbdd] to-[#0066ff] h-2.5 rounded-full"
                    style={{ width: `${Math.min(100, (tokenUsage.totalTokens / tokenUsage.limit) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className={isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}>0</span>
                  <span className={isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}>{t('limit')}: {(tokenUsage.limit / 1000000).toFixed(0)}M</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#00cbdd]/20 dark:border-[#00cbdd]/20">
                <div className="flex items-center justify-between mb-4">
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-[#00091b]'}`}>{t('costBreakdown')}</h4>
                  <span className={`text-sm ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}>{t('thisMonth')}</span>
                </div>

                <div className="space-y-3">
                  {tokenUsage ? (
                    // Use real token usage data if available
                    <>
                      <div className={`flex justify-between ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-[#00cbdd] mr-2"></div>
                          <span>{t('inference')}</span>
                        </div>
                        <span>${((tokenUsage.totalTokens * 0.6) / 1000 * 0.002).toFixed(2)}</span>
                      </div>
                      <div className={`flex justify-between ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-[#33d5e3] mr-2"></div>
                          <span>{t('training')}</span>
                        </div>
                        <span>${((tokenUsage.totalTokens * 0.2) / 1000 * 0.006).toFixed(2)}</span>
                      </div>
                      <div className={`flex justify-between ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-[#7fe4eb] mr-2"></div>
                          <span>{t('storage')}</span>
                        </div>
                        <span>${((tokenUsage.totalTokens * 0.2) / 1000 * 0.0005).toFixed(2)}</span>
                      </div>
                    </>
                  ) : (
                    // Fallback for when no data is available
                    <>
                      <div className={`flex justify-between ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-[#00cbdd] mr-2"></div>
                          <span>{t('inference')}</span>
                        </div>
                        <span>{loading ? "—" : "$0.00"}</span>
                      </div>
                      <div className={`flex justify-between ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-[#33d5e3] mr-2"></div>
                          <span>{t('training')}</span>
                        </div>
                        <span>{loading ? "—" : "$0.00"}</span>
                      </div>
                      <div className={`flex justify-between ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-[#7fe4eb] mr-2"></div>
                          <span>{t('storage')}</span>
                        </div>
                        <span>{loading ? "—" : "$0.00"}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className={`mt-4 pt-4 border-t border-[#00cbdd]/20 dark:border-[#00cbdd]/20 flex justify-between items-center ${isDark ? 'text-white' : 'text-[#00091b]'} font-medium`}>
                  <span>{t('total')}</span>
                  <span>
                    {tokenUsage
                      ? `$${tokenUsage.costEstimate ? tokenUsage.costEstimate.toFixed(2) : ((tokenUsage.totalTokens / 1000) * 0.002).toFixed(2)}`
                      : loading ? "—" : "$0.00"
                    }
                  </span>
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
        {!loading && modelPerformance && modelPerformance.models && (
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
                {modelPerformance && modelPerformance.models ? modelPerformance.models.map((model) => (
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
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} w-16`}>{t('accuracy')}:</span>
                            <span>{(model.metrics.accuracy * 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex items-center">
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} w-16`}>{t('latency')}:</span>
                            <span>{model.metrics.latency}ms</span>
                          </div>
                          <div className="flex items-center">
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} w-16`}>{t('throughput')}:</span>
                            <span>{model.metrics.throughput}/s</span>
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
                )) : null}
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
            {activityFeed.map((activity) => (
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
                {systemStatus && systemStatus.components ? (
                  // Use real system status data if available
                  systemStatus.components.map((component, idx) => {
                    // Map component name to icon
                    let icon;
                    if (component.name.includes('API') || component.name.includes('Gateway')) {
                      icon = <Server />;
                    } else if (component.name.includes('Inference') || component.name.includes('Model')) {
                      icon = <BrainCircuit />;
                    } else if (component.name.includes('Database') || component.name.includes('DB')) {
                      icon = <Database />;
                    } else if (component.name.includes('Training') || component.name.includes('Learning')) {
                      icon = <Workflow />;
                    } else if (component.name.includes('Storage') || component.name.includes('File')) {
                      icon = <HardDrive />;
                    } else {
                      icon = <Server />;
                    }

                    // Create service object
                    const service = {
                      name: component.name,
                      status: component.status,
                      icon: icon
                    };

                    return (
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
                    );
                  })
                ) : (
                  // Fallback for when no data is available
                  ['API Gateway', 'Inference Engine', 'Database', 'Training Service', 'Storage'].map((name, idx) => {
                    const service = {
                      name: name,
                      status: 'unknown',
                      icon: idx === 0 ? <Server /> :
                            idx === 1 ? <BrainCircuit /> :
                            idx === 2 ? <Database /> :
                            idx === 3 ? <Workflow /> :
                            <HardDrive />
                    };

                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border ${
                          isDark
                            ? 'bg-gray-900/50 border-gray-800'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`p-1.5 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            <div className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {service.icon}
                            </div>
                          </div>
                          <span className={`ml-2 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {service.name}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center">
                          <div className="h-2 w-2 rounded-full mr-1.5 bg-gray-400"></div>
                          <span className="text-xs text-gray-400">
                            Loading...
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Resource Utilization */}
            <div>
              <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('resourceUtilization')}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {systemStatus && systemStatus.systemLoad ? (
                  // Use real system resource data if available
                  [
                    {
                      name: 'CPU Usage',
                      value: deploymentMetrics?.cpuUtilization || systemStatus.systemLoad,
                      icon: <Cpu />,
                      color: '#00cbdd'
                    },
                    {
                      name: 'Memory Usage',
                      value: deploymentMetrics?.memoryUsage || Math.round(systemStatus.systemLoad * 1.2),
                      icon: <BarChart />,
                      color: '#8b5cf6'
                    },
                    {
                      name: 'Storage Usage',
                      value: Math.round(systemStatus.systemLoad * 0.6),
                      icon: <HardDrive />,
                      color: '#ec4899'
                    }
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
                  ))
                ) : (
                  // Fallback for when no data is available
                  [
                    { name: 'CPU Usage', value: 0, icon: <Cpu />, color: '#00cbdd' },
                    { name: 'Memory Usage', value: 0, icon: <BarChart />, color: '#8b5cf6' },
                    { name: 'Storage Usage', value: 0, icon: <HardDrive />, color: '#ec4899' }
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
                          {loading ? "—" : "0%"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="h-2.5 rounded-full bg-gray-400"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Error Rate Metrics */}
            <div>
              <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('errorMetrics')}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deploymentMetrics && deploymentMetrics.regions ? (
                  // Use real error metrics if available
                  <>
                    <div className={`p-4 rounded-lg border ${
                      isDark
                        ? 'bg-gray-900/50 border-gray-800'
                        : 'bg-white border-gray-200'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('apiErrorRate')}</span>
                        <div className="flex items-center">
                          {/* Calculate average error rate across regions */}
                          {(() => {
                            const regions = deploymentMetrics.regions;
                            if (regions.length === 0) return 0;

                            const totalRequests = regions.reduce((sum, region) => sum + region.requests, 0);
                            const totalErrors = regions.reduce((sum, region) => sum + region.errors, 0);
                            const errorRate = totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0;

                            return (
                              <>
                                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {errorRate.toFixed(2)}%
                                </span>
                                <span className={`text-xs ${errorRate < 0.5 ? 'text-green-500' : 'text-red-500'} ml-2 flex items-center`}>
                                  {errorRate < 0.5 ? <ArrowDownRight className="h-3 w-3 mr-0.5" /> : <ArrowUpRight className="h-3 w-3 mr-0.5" />}
                                  {(errorRate * 0.2).toFixed(2)}%
                                </span>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        {(() => {
                          const regions = deploymentMetrics.regions;
                          if (regions.length === 0) return 0;

                          const totalRequests = regions.reduce((sum, region) => sum + region.requests, 0);
                          const totalErrors = regions.reduce((sum, region) => sum + region.errors, 0);
                          const errorRate = totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0;

                          return (
                            <div
                              className={`h-2.5 rounded-full ${errorRate < 0.5 ? 'bg-green-500' : 'bg-amber-500'}`}
                              style={{ width: `${Math.max(0.1, errorRate)}%` }}
                            ></div>
                          );
                        })()}
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
                          {/* Calculate timeout rate based on latency */}
                          {(() => {
                            const regions = deploymentMetrics.regions;
                            if (regions.length === 0) return 0;

                            // Estimate timeout rate based on latency (higher latency = more timeouts)
                            const avgLatency = regions.reduce((sum, region) => sum + region.latency, 0) / regions.length;
                            const timeoutRate = avgLatency > 150 ? (avgLatency - 150) / 1000 : 0.1;

                            return (
                              <>
                                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {timeoutRate.toFixed(2)}%
                                </span>
                                <span className={`text-xs ${timeoutRate < 0.5 ? 'text-green-500' : 'text-red-500'} ml-2 flex items-center`}>
                                  {timeoutRate < 0.5 ? <ArrowDownRight className="h-3 w-3 mr-0.5" /> : <ArrowUpRight className="h-3 w-3 mr-0.5" />}
                                  {(timeoutRate * 0.3).toFixed(2)}%
                                </span>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        {(() => {
                          const regions = deploymentMetrics.regions;
                          if (regions.length === 0) return 0;

                          const avgLatency = regions.reduce((sum, region) => sum + region.latency, 0) / regions.length;
                          const timeoutRate = avgLatency > 150 ? (avgLatency - 150) / 1000 : 0.1;

                          return (
                            <div
                              className={`h-2.5 rounded-full ${timeoutRate < 0.5 ? 'bg-green-500' : 'bg-amber-500'}`}
                              style={{ width: `${Math.max(0.1, timeoutRate)}%` }}
                            ></div>
                          );
                        })()}
                      </div>
                    </div>
                  </>
                ) : (
                  // Fallback for when no data is available
                  <>
                    <div className={`p-4 rounded-lg border ${
                      isDark
                        ? 'bg-gray-900/50 border-gray-800'
                        : 'bg-white border-gray-200'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('apiErrorRate')}</span>
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {loading ? "—" : "0.00%"}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="h-2.5 rounded-full bg-gray-400" style={{ width: '0.1%' }}></div>
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
                          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {loading ? "—" : "0.00%"}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="h-2.5 rounded-full bg-gray-400" style={{ width: '0.1%' }}></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </DashboardCard>

      {/* Activity Feed */}
      <DashboardCard
        title={t('activityFeed')}
        subtitle={t('recentActivityAndNotifications')}
        isLoading={loading}
        className="mt-6"
      >
        {!loading && (
          <div className="space-y-4">
            {activityFeed && activityFeed.length > 0 ? (
              // Use real activity feed data if available
              activityFeed.map((activity) => (
                <div
                  key={activity.id}
                  className={`p-4 rounded-lg border ${
                    isDark
                      ? 'bg-gray-900/50 border-gray-800'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex">
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'deployment' || activity.type === 'system'
                        ? isDark ? 'bg-[#00cbdd]/10' : 'bg-blue-100'
                        : activity.type === 'fine_tuning'
                          ? isDark ? 'bg-purple-500/10' : 'bg-purple-100'
                          : activity.type === 'account' || activity.type === 'billing'
                            ? isDark ? 'bg-amber-500/10' : 'bg-amber-100'
                            : isDark ? 'bg-green-500/10' : 'bg-green-100'
                    }`}>
                      <div className={`h-5 w-5 ${
                        activity.type === 'deployment' || activity.type === 'system'
                          ? isDark ? 'text-[#00cbdd]' : 'text-blue-600'
                          : activity.type === 'fine_tuning'
                            ? isDark ? 'text-purple-500' : 'text-purple-600'
                            : activity.type === 'account' || activity.type === 'billing'
                              ? isDark ? 'text-amber-500' : 'text-amber-600'
                              : isDark ? 'text-green-500' : 'text-green-600'
                      }`}>
                        {activity.icon}
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h4 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {activity.title}
                        </h4>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {activity.time}
                        </span>
                      </div>
                      <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Show empty state for new users
              <div className="text-center py-8">
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <Activity className={`h-6 w-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                  {t('noActivityYet')}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} max-w-md mx-auto`}>
                  {t('activityWillAppearHere')}
                </p>
              </div>
            )}
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