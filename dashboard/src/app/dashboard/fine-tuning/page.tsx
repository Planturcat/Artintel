'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
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

// Define consistent IDs for the mock models
const mockModels: Model[] = [
  { 
    id: 'gpt-4',
    name: 'GPT-4',
    displayName: 'GPT-4',
    version: '1.0.0',
    modelType: ModelType.LLM,
    framework: ModelFramework.TRANSFORMERS,
    taskType: ModelTaskType.TEXT_GENERATION,
    tier: ModelTier.PRO,
    description: 'Advanced language model for text generation',
    parameters: '175B' as any, // Fix type
    modelSize: '350GB' as any, // Fix type
    license: 'proprietary',
    author: 'OpenAI',
    creator: 'OpenAI',
    tags: ['language-model', 'text-generation'],
    status: 'active' as any, // Fix ModelStatus enum issue
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metrics: {
      accuracy: 0.95,
      latency: 100,
      throughput: 1000,
      memoryUsage: 40000,
      gpuUsage: 80
    },
    pricing: {
      pricePerRequest: 0.01,
      pricePerToken: 0.0001,
      freeQuota: 1000
    },
    architecture: {
      framework: 'transformers',
      layers: 96,
      attentionHeads: 96,
      contextWindow: 8192,
      trainingData: 'Mixed internet data'
    },
    resourceRequirements: {
      minCPU: '8 cores',
      minMemory: '16GB',
      recommendedGPU: 'NVIDIA A100'
    },
    documentation: {
      technicalDocs: 'https://docs.example.com/gpt4',
      examples: ['https://examples.com/gpt4/1'],
      papers: ['https://arxiv.org/abs/example']
    }
  },
  {
    id: 'bert-base',
    name: 'BERT Base',
    displayName: 'BERT Base',
    version: '1.0.0',
    modelType: ModelType.LLM,
    framework: ModelFramework.TRANSFORMERS,
    taskType: ModelTaskType.CLASSIFICATION,
    tier: ModelTier.PRO,
    description: 'Base BERT model for classification tasks',
    parameters: '110M' as any, // Fix type
    modelSize: '440MB' as any, // Fix type
    license: 'apache-2.0',
    author: 'Google Research',
    creator: 'Google Research',
    tags: ['language-model', 'classification'],
    status: 'active' as any, // Fix ModelStatus enum issue
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metrics: {
      accuracy: 0.89,
      latency: 50,
      throughput: 2000,
      memoryUsage: 20000,
      gpuUsage: 60
    },
    pricing: {
      pricePerRequest: 0.005,
      pricePerToken: 0.00005,
      freeQuota: 2000
    },
    architecture: {
      framework: 'transformers',
      layers: 12,
      attentionHeads: 12,
      contextWindow: 512,
      trainingData: 'Wikipedia and BookCorpus'
    },
    resourceRequirements: {
      minCPU: '4 cores',
      minMemory: '8GB',
      recommendedGPU: 'NVIDIA V100'
    },
    documentation: {
      technicalDocs: 'https://docs.example.com/bert',
      examples: ['https://examples.com/bert/1'],
      papers: ['https://arxiv.org/abs/1810.04805']
    }
  },
];

// Define consistent IDs for the mock datasets
const mockDatasets: Dataset[] = [
  {
    id: 'customer-support',
    name: 'Customer Support',
    description: 'Customer support conversations dataset',
    type: DatasetType.Text,
    format: DatasetFormat.JSONL,
    source: DatasetSource.Upload,
    size: 1024 * 1024 * 100, // 100MB
    itemCount: 50000,
    privacy: DatasetPrivacy.Private,
    status: DatasetStatus.Ready,
    tags: ['support', 'customer-service', 'chat'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metadata: {
      language: 'en',
      domain: 'customer-service'
    }
  },
  {
    id: 'sentiment-analysis',
    name: 'Sentiment Analysis',
    description: 'Sentiment analysis dataset',
    type: DatasetType.Text,
    format: DatasetFormat.JSONL,
    source: DatasetSource.Upload,
    size: 1024 * 1024 * 50, // 50MB
    itemCount: 25000,
    privacy: DatasetPrivacy.Private,
    status: DatasetStatus.Ready,
    tags: ['sentiment', 'classification'],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    metadata: {
      language: 'en',
      domain: 'sentiment'
    }
  },
];

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
  const { user } = useAuth();
  const isDark = theme === 'dark';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<FineTuningJob[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  
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
      if (process.env.NODE_ENV === 'development') {
        // Use mock data in development - filter by user ID if available
        const userId = user?.user_id; // Use user_id instead of id
        
        const filteredJobs = userId
          ? mockJobs.filter(job => job.userId === userId)
          : mockJobs;
        
        // Convert API jobs to internal job type
        const internalJobs = filteredJobs.map(convertApiJobToInternal);
        
        setJobs(internalJobs);
        setModels(mockModels);
        setDatasets(mockDatasets);
      } else {
        // Fetch real data in production
        const userId = user?.user_id; // Use user_id instead of id
        
        const [jobsResponse, modelsResponse, datasetsResponse] = await Promise.all([
          getFineTuningJobs(userId),
          getModels({ taskType: [ModelTaskType.TEXT_GENERATION], tier: [ModelTier.PRO] }),
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
      gpuTypes: [
        { 
          type: 'A100',
          available: 8 - allocatedA100, 
          allocated: allocatedA100, 
          total: 8 
        },
        { 
          type: 'V100',
          available: 12 - allocatedV100, 
          allocated: allocatedV100, 
          total: 12 
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
            Fine-tuning
          </h1>
          <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Train custom models on your data
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
        gpuHoursTotal={500}
        activeJobs={calculateResourceStats().activeJobs}
        maxJobs={10}
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