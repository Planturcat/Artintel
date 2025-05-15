'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getDeploymentMetrics } from '@/dashboard-api';
import { getFineTuningJobs } from '@/dashboard-api/fine-tuning-api';
import { getModels, Model, ModelTaskType, ModelTier } from '@/dashboard-api/model-api';
import { DeploymentMetricsResponse, DeploymentConfig } from '@/types/deployment';
import { FineTuningJob } from '@/dashboard-api/fine-tuning-api';
import { Server, Cpu, Activity, Globe, GitBranch, AlertTriangle, HardDrive } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import DeploymentStatusCard from '@/components/deployment/DeploymentStatusCard';
import RegionalMetrics from '@/components/deployment/RegionalMetrics';
import ResourceMonitor from '@/components/deployment/ResourceMonitor';
import DeploymentList from '@/components/deployment/DeploymentList';
import DeploymentModal from '@/components/deployment/DeploymentModal';

export default function DeploymentPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<DeploymentMetricsResponse | null>(null);
  const [fineTunedModels, setFineTunedModels] = useState<FineTuningJob[]>([]);
  const [platformModels, setPlatformModels] = useState<Model[]>([]);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch deployment metrics
        const metricsData = await getDeploymentMetrics();
        setMetrics(metricsData);

        // Fetch fine-tuned models
        const jobsResponse = await getFineTuningJobs();
        const completedJobs = jobsResponse.items.filter(job => job.status === 'completed');
        setFineTunedModels(completedJobs);

        // Fetch platform models
        const modelsResponse = await getModels({
          taskType: [ModelTaskType.TEXT_GENERATION],
          tier: [ModelTier.PRO]
        });
        setPlatformModels(modelsResponse.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeploy = async (config: DeploymentConfig) => {
    try {
      // TODO: Implement deployment API call
      console.log('Deploying model with config:', config);

      // Mock deployment success
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Close modal
      setIsDeployModalOpen(false);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to deploy model');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Deployment Dashboard</h1>
        <button
          onClick={() => setIsDeployModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white hover:from-[#00b0c0] hover:to-blue-600"
        >
          <Server className="h-4 w-4 mr-2 inline-block" />
          Deploy New Model
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DeploymentStatusCard
          title="Total Deployments"
          value={metrics?.totalDeployments || 0}
          icon={<Server className="h-5 w-5" />}
          trend={10}
          isDark={isDark}
        />
        <DeploymentStatusCard
          title="Active Deployments"
          value={metrics?.activeDeployments || 0}
          icon={<Activity className="h-5 w-5" />}
          trend={5}
          isDark={isDark}
        />
        <DeploymentStatusCard
          title="Regions"
          value={metrics?.regions.length || 0}
          icon={<Globe className="h-5 w-5" />}
          trend={0}
          isDark={isDark}
        />
        <DeploymentStatusCard
          title="Model Versions"
          value={fineTunedModels.length + platformModels.length}
          icon={<GitBranch className="h-5 w-5" />}
          trend={2}
          isDark={isDark}
        />
      </div>

      {/* Resource Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <ResourceMonitor
          title="CPU Utilization"
          value={metrics?.cpuUtilization || 0}
          icon={<Cpu />}
          isDark={isDark}
        />
        <ResourceMonitor
          title="Memory Usage"
          value={metrics?.memoryUsage || 0}
          icon={<HardDrive />}
          isDark={isDark}
        />
        <ResourceMonitor
          title="GPU Utilization"
          value={metrics?.gpuUtilization || 0}
          icon={<Activity />}
          isDark={isDark}
        />
      </div>

      {/* Regional Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DashboardCard
          title="Regional Performance"
          subtitle="Deployment metrics across regions"
          isLoading={isLoading}
        >
          <RegionalMetrics regions={metrics?.regions || []} isDark={isDark} />
        </DashboardCard>

        <DashboardCard
          title="Active Alerts"
          subtitle="Recent deployment issues and warnings"
          isLoading={isLoading}
        >
          <div className="space-y-4">
            {[
              {
                id: 1,
                severity: 'warning',
                message: 'High latency detected in EU-West region',
                time: '10 minutes ago'
              },
              {
                id: 2,
                severity: 'error',
                message: 'Failed health check in US-East deployment',
                time: '25 minutes ago'
              }
            ].map(alert => (
              <div
                key={alert.id}
                className={`flex items-start p-3 rounded-lg ${
                  isDark
                    ? 'bg-gray-800/50'
                    : 'bg-gray-50'
                }`}
              >
                <AlertTriangle className={`h-5 w-5 mr-3 ${
                  alert.severity === 'warning'
                    ? 'text-amber-500'
                    : 'text-red-500'
                }`} />
                <div>
                  <p className={`text-sm font-medium ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {alert.message}
                  </p>
                  <p className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {alert.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Deployment List */}
      <DashboardCard
        title="Active Deployments"
        subtitle="Currently running model deployments"
        isLoading={isLoading}
      >
        <DeploymentList deployments={[]} isDark={isDark} />
      </DashboardCard>

      {/* Deployment Modal */}
      <DeploymentModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        onDeploy={handleDeploy}
        fineTunedModels={fineTunedModels}
        platformModels={platformModels}
        isDark={isDark}
      />
    </div>
  );
}