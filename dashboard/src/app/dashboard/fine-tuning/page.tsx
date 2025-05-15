'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { PlusCircle, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';
import TrainingJobList from '@/components/fine-tuning/TrainingJobList';
import ResourceMonitor from '@/components/fine-tuning/ResourceMonitor';
import CreateJobModal from '@/components/fine-tuning/CreateJobModal';
import { getFineTuningJobs, mockJobs, FineTuningJob as ApiFineTuningJob, stopAllJobSimulations } from '@/dashboard-api/fine-tuning-api';
import { getModels } from '@/dashboard-api/model-api';
import { getDatasets } from '@/dashboard-api/dataset-api';
import { FineTuningJob, JobStatus } from '@/types/fine-tuning';
import { Model, ModelTaskType, ModelTier, ModelType, ModelFramework } from '@/dashboard-api/model-api';
import { Dataset, DatasetType, DatasetFormat, DatasetSource, DatasetStatus, DatasetPrivacy } from '@/dashboard-api/dataset-api';
import { useAuth } from '@/contexts/AuthContext';
import { getUserContext, getUserTierMultiplier } from '@/dashboard-api/mock-user-context';

// We'll use the API to get models and datasets instead of hardcoding them

// Helper function to convert API job to internal job type
const convertApiJobToInternal = (apiJob: ApiFineTuningJob): FineTuningJob => {
  // Map from API status (string) to JobStatus enum
  const statusMap: Record<string, JobStatus> = {
    'queued': JobStatus.QUEUED,
    'running': JobStatus.RUNNING,
    'completed': JobStatus.COMPLETED,
    'failed': JobStatus.FAILED,
    'stopped': JobStatus.STOPPED,
    'pending': JobStatus.PENDING,
    'paused': JobStatus.PAUSED,
  };

  const jobStatus = apiJob.status ? statusMap[apiJob.status.toLowerCase()] : JobStatus.PENDING;

  // Ensure we have a valid status
  return {
    ...apiJob,
    status: jobStatus || JobStatus.PENDING
  } as FineTuningJob;
};

export default function FineTuningPage() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { user } = useAuth();
  const isDark = theme === 'dark';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<FineTuningJob[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userContext, setUserContext] = useState(getUserContext());

  // Auto-refresh the data every 3 seconds when there are running jobs
  useEffect(() => {
    // Only set up auto-refresh if there are running jobs
    const hasRunningJobs = jobs.some(job => job.status === JobStatus.RUNNING);

    if (hasRunningJobs) {
      const intervalId = setInterval(() => {
        fetchData(true); // Pass true to indicate this is a background refresh
      }, 3000); // Refresh every 3 seconds instead of 10

      return () => clearInterval(intervalId);
    }
  }, [jobs]);

  useEffect(() => {
    // Update user context
    const context = getUserContext();
    setUserContext(context);

    fetchData();

    // Clean up simulation intervals when component unmounts
    return () => {
      if (process.env.NODE_ENV === 'development') {
        stopAllJobSimulations();
      }
    };
  }, [user]);

  const fetchData = async (isBackgroundRefresh = false) => {
    // Don't show loading indicator for background refreshes
    if (!isBackgroundRefresh) {
      setLoading(true);
    }

    setError(null);
    try {
      // Get user ID from context or auth
      const userId = userContext?.userId || user?.user_id;

      if (process.env.NODE_ENV === 'development') {
        // Use mock data in development - filter by user ID if available
        const filteredJobs = userId
          ? mockJobs.filter(job => job.userId === userId)
          : mockJobs;

        // Convert API jobs to internal job type
        const internalJobs = filteredJobs.map(convertApiJobToInternal);

        // Get models and datasets from API
        const [modelsResponse, datasetsResponse] = await Promise.all([
          getModels({
            taskType: [ModelTaskType.TEXT_GENERATION],
            tier: userContext?.tier === 'enterprise'
              ? [ModelTier.FREE, ModelTier.PRO, ModelTier.ENTERPRISE]
              : userContext?.tier === 'pro'
                ? [ModelTier.FREE, ModelTier.PRO]
                : [ModelTier.FREE]
          }),
          getDatasets(),
        ]);

        setJobs(internalJobs);
        setModels(modelsResponse.items);
        setDatasets(datasetsResponse.data || []);
      } else {
        // Fetch real data in production
        const [jobsResponse, modelsResponse, datasetsResponse] = await Promise.all([
          getFineTuningJobs(userId),
          getModels({
            taskType: [ModelTaskType.TEXT_GENERATION],
            tier: userContext?.tier === 'enterprise'
              ? [ModelTier.FREE, ModelTier.PRO, ModelTier.ENTERPRISE]
              : userContext?.tier === 'pro'
                ? [ModelTier.FREE, ModelTier.PRO]
                : [ModelTier.FREE]
          }),
          getDatasets(),
        ]);

        // Convert API jobs to internal job type
        const internalJobs = jobsResponse.items.map(convertApiJobToInternal);

        setJobs(internalJobs);
        setModels(modelsResponse.items);
        setDatasets(datasetsResponse.data || []);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load fine-tuning data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  // Calculate resource statistics from actual jobs
  const calculateResourceStats = () => {
    // Get only running jobs
    const runningJobs = jobs.filter(job => job.status === JobStatus.RUNNING);

    // Calculate active jobs count
    const activeJobsCount = runningJobs.length;

    // Get tier-specific resource limits
    const tierMultiplier = getUserTierMultiplier();
    const maxA100 = userContext?.tier === 'enterprise' ? 8 : userContext?.tier === 'pro' ? 4 : 2;
    const maxV100 = userContext?.tier === 'enterprise' ? 12 : userContext?.tier === 'pro' ? 6 : 3;
    const maxGpuHours = userContext?.tier === 'enterprise' ? 500 : userContext?.tier === 'pro' ? 200 : 50;
    const maxJobs = userContext?.tier === 'enterprise' ? 10 : userContext?.tier === 'pro' ? 5 : 2;

    // Calculate allocated GPUs
    let allocatedA100 = 0;
    let allocatedV100 = 0;

    // Calculate GPU hours used (roughly based on elapsed time)
    let totalGpuHoursUsed = 0;

    runningJobs.forEach(job => {
      // Count GPUs by type
      if (job.resources.gpuType === 'nvidia-a100') {
        allocatedA100 += job.resources.gpuCount;
      } else if (job.resources.gpuType === 'nvidia-v100') {
        allocatedV100 += job.resources.gpuCount;
      }

      // Calculate GPU hours based on elapsed time and GPU count
      if (job.metrics?.elapsedTime) {
        // Convert seconds to hours and multiply by GPU count
        const jobGpuHours = (job.metrics.elapsedTime / 3600) * job.resources.gpuCount;
        totalGpuHoursUsed += jobGpuHours;
      }
    });

    // Add GPU hours from completed jobs (fixed estimate)
    const completedJobs = jobs.filter(job => job.status === JobStatus.COMPLETED);
    completedJobs.forEach(job => {
      const estimatedHours = job.config.epochs * 0.5 * job.resources.gpuCount;
      totalGpuHoursUsed += estimatedHours;
    });

    // Return calculated statistics
    return {
      activeJobs: activeJobsCount,
      gpuHoursUsed: totalGpuHoursUsed,
      maxGpuHours: maxGpuHours,
      maxJobs: maxJobs,
      gpuTypes: [
        {
          type: 'A100',
          available: maxA100 - allocatedA100,
          allocated: allocatedA100,
          total: maxA100
        },
        {
          type: 'V100',
          available: maxV100 - allocatedV100,
          allocated: allocatedV100,
          total: maxV100
        }
      ]
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00cbdd]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 rounded-lg border text-center ${
        isDark
          ? 'bg-red-500/10 border-red-500/30 text-red-400'
          : 'bg-red-50 border-red-200 text-red-600'
      }`}>
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {userContext
              ? `${userContext.fullName.split(' ')[0]}'s ${t('fineTuning')}`
              : t('fineTuning')}
          </h1>
          <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {userContext?.tier === 'enterprise'
              ? t('trainEnterpriseModels')
              : userContext?.tier === 'pro'
                ? t('trainProModels')
                : t('trainModels')}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleRefresh}
            variant="outline"
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-[#00cbdd] to-[#00cbdd]/70 hover:from-[#00cbdd]/90 hover:to-[#00cbdd]/60"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            New Training Job
          </Button>
        </div>
      </div>

      <ResourceMonitor
        gpuHoursUsed={calculateResourceStats().gpuHoursUsed}
        gpuHoursTotal={calculateResourceStats().maxGpuHours}
        activeJobs={calculateResourceStats().activeJobs}
        maxJobs={calculateResourceStats().maxJobs}
        gpuTypes={calculateResourceStats().gpuTypes}
      />

      <TrainingJobList
        initialJobs={jobs}
        availableModels={models}
        availableDatasets={datasets}
      />

      <CreateJobModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchData(); // Refresh data when modal closes
        }}
        availableModels={models}
        availableDatasets={datasets}
      />
    </div>
  );
}