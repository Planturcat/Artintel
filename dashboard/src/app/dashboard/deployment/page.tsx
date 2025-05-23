'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getDeploymentMetrics, getDeployments, createDeployment, updateDeploymentStatus } from '@/dashboard-api/deployment-api';
import { getFineTuningJobs } from '@/dashboard-api/fine-tuning-api';
import { getModels, Model, ModelTaskType, ModelTier } from '@/dashboard-api/model-api';
import { DeploymentMetricsResponse, DeploymentConfig, Deployment } from '@/types/deployment';
import { FineTuningJob } from '@/dashboard-api/fine-tuning-api';
import { getAlerts, Alert, AlertsResponse } from '@/dashboard-api/dashboard-api';
import { Server, Cpu, Memory, Activity, Globe, GitBranch, AlertTriangle, RefreshCw, PlusCircle, Brain, Info, Bell } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import DeploymentStatusCard from '@/components/deployment/DeploymentStatusCard';
import RegionalMetrics from '@/components/deployment/RegionalMetrics';
import ResourceMonitor from '@/components/deployment/ResourceMonitor';
import DeploymentList from '@/components/deployment/DeploymentList';
import DeploymentModal from '@/components/deployment/DeploymentModal';
import { toast } from 'react-hot-toast';

export default function DeploymentPage() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<DeploymentMetricsResponse | null>(null);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [fineTunedModels, setFineTunedModels] = useState<FineTuningJob[]>([]);
  const [platformModels, setPlatformModels] = useState<Model[]>([]);
  const [alerts, setAlerts] = useState<AlertsResponse | null>(null);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [metricsData, deploymentsData, jobsResponse, modelsResponse, alertsData] = await Promise.all([
        getDeploymentMetrics(),
        getDeployments(),
        getFineTuningJobs(),
        getModels({
          taskType: [ModelTaskType.TEXT_GENERATION],
          tier: [ModelTier.PRO]
        }),
        getAlerts()
      ]);

      setMetrics(metricsData);
      setDeployments(deploymentsData);
      setFineTunedModels(jobsResponse.items.filter(job => job.status === 'completed'));
      setPlatformModels(modelsResponse.items);
      setAlerts(alertsData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : t('failed_to_fetch_data'));
      toast.error(t('failed_to_fetch_deployment_data'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
    toast.success(t('data_refreshed_successfully'));
  };

  const handleDeploy = async (config: DeploymentConfig) => {
    try {
      const newDeployment = await createDeployment(config);
      setDeployments(prev => [...prev, newDeployment]);
      setIsDeployModalOpen(false);
      toast.success(t('model_deployed_successfully'));

      // Refresh metrics
      const updatedMetrics = await getDeploymentMetrics();
      setMetrics(updatedMetrics);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('failed_to_deploy_model'));
      throw err;
    }
  };

  const handleStatusChange = async (deploymentId: string, newStatus: Deployment['status']) => {
    try {
      const updatedDeployment = await updateDeploymentStatus(deploymentId, newStatus);
      setDeployments(prev =>
        prev.map(d => d.id === deploymentId ? updatedDeployment : d)
      );

      // Refresh metrics
      const updatedMetrics = await getDeploymentMetrics();
      setMetrics(updatedMetrics);

      toast.success(t('deployment_status_updated', { status: newStatus }));
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error(t('failed_to_update_deployment_status'));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00cbdd]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-error-500 text-center">
          <h2 className="text-xl font-semibold mb-2">{t('error')}</h2>
          <p>{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-[#00cbdd] to-[#0066ff] text-white rounded-lg hover:opacity-90"
          >
            {t('retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-[#00091b]'}`}>Deployment Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`p-2 rounded-lg ${
              isDark ? 'bg-cosmic-800 hover:bg-[#001824] text-white' : 'bg-white hover:bg-[#E6FCFF] text-[#00cbdd] border border-[#00cbdd]/20'
            } transition-colors`}
          >
            <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setIsDeployModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00cbdd] to-[#0066ff] text-white hover:opacity-90 flex items-center gap-2"
          >
            <PlusCircle className="h-5 w-5" />
            Deploy New Model
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DeploymentStatusCard
          title="Total Deployments"
          value={metrics?.totalDeployments || 0}
          icon={<Server className="h-5 w-5" />}
          trend={metrics?.totalDeploymentsTrend || 0}
          isDark={isDark}
        />
        <DeploymentStatusCard
          title="Active Deployments"
          value={metrics?.activeDeployments || 0}
          icon={<Activity className="h-5 w-5" />}
          trend={metrics?.activeDeploymentsTrend || 0}
          isDark={isDark}
        />
        <DeploymentStatusCard
          title="Regions"
          value={metrics?.regions.length || 0}
          icon={<Globe className="h-5 w-5" />}
          trend={0} /* Regions typically don't change often */
          isDark={isDark}
        />
        <DeploymentStatusCard
          title="Model Versions"
          value={fineTunedModels.length + platformModels.length}
          icon={<GitBranch className="h-5 w-5" />}
          trend={metrics?.modelVersionsTrend || 0}
          isDark={isDark}
        />
      </div>

      {/* Resource Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <ResourceMonitor
          title="CPU Utilization"
          value={metrics?.cpuUtilization || 0}
          trend={metrics?.cpuUtilizationTrend}
          icon={<Cpu />}
          isDark={isDark}
        />
        <ResourceMonitor
          title="Memory Usage"
          value={metrics?.memoryUsage || 0}
          trend={metrics?.memoryUsageTrend}
          icon={<Brain />}
          isDark={isDark}
        />
        <ResourceMonitor
          title="GPU Utilization"
          value={metrics?.gpuUtilization || 0}
          trend={metrics?.gpuUtilizationTrend}
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
            {alerts && alerts.alerts && alerts.alerts.length > 0 ? (
              // Display alerts from API
              alerts.alerts
                .filter(alert => alert.type === 'system' || alert.type === 'performance')
                .slice(0, 5)
                .map(alert => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg ${
                      isDark
                        ? 'bg-cosmic-800 hover:bg-[#001824]'
                        : 'bg-white hover:bg-[#E6FCFF]'
                    } border ${
                      isDark ? 'border-[#00cbdd]/20' : 'border-[#00cbdd]/10'
                    } transition-all duration-200`}
                  >
                    <div className="flex items-start">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${
                        alert.severity === 'critical' || alert.severity === 'error'
                          ? isDark ? 'bg-error-500/20' : 'bg-error-100'
                          : alert.severity === 'warning'
                            ? isDark ? 'bg-warning-500/20' : 'bg-warning-100'
                            : isDark ? 'bg-[#00cbdd]/20' : 'bg-[#00cbdd]/10'
                      }`}>
                        <div className={`h-5 w-5 ${
                          alert.severity === 'critical' || alert.severity === 'error'
                            ? isDark ? 'text-error-500' : 'text-error-700'
                            : alert.severity === 'warning'
                              ? isDark ? 'text-warning-500' : 'text-warning-700'
                              : isDark ? 'text-[#00cbdd]' : 'text-[#00cbdd]'
                        }`}>
                          {alert.severity === 'critical' || alert.severity === 'error'
                            ? <AlertTriangle />
                            : alert.severity === 'warning'
                              ? <AlertTriangle />
                              : <Info />
                          }
                        </div>
                      </div>

                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h4 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                            {alert.title}
                          </h4>
                          <span className={`text-xs ${isDark ? 'text-[#7fe4eb]/70' : 'text-[#00cbdd]/70'}`}>
                            {new Date(alert.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className={`mt-1 text-sm ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}>
                          {alert.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              // Show empty state when no alerts
              <div className="text-center py-8">
                <div className="mx-auto w-12 h-12 rounded-full bg-[#00cbdd]/10 dark:bg-[#00cbdd]/20 flex items-center justify-center mb-4">
                  <Bell className={`h-6 w-6 ${isDark ? 'text-[#00cbdd]' : 'text-[#00cbdd]'}`} />
                </div>
                <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#00091b]'} mb-1`}>
                  No active alerts
                </h3>
                <p className={`text-sm ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'} max-w-md mx-auto`}>
                  Your deployment is running smoothly with no issues to report
                </p>
              </div>
            )}
          </div>
        </DashboardCard>
      </div>

      {/* Deployment List */}
      <DashboardCard
        title="Active Deployments"
        subtitle="Currently running model deployments"
        isLoading={isLoading}
      >
        <DeploymentList
          deployments={deployments}
          isDark={isDark}
          onStatusChange={handleStatusChange}
        />
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