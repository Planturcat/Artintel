import { Model } from './model-api';
import { Dataset } from './dataset-api';
import { USE_MOCK_API } from './dashboard-api';
import axios from 'axios';
import { JobStatus } from '@/types/fine-tuning';

export interface FineTuningJob {
  id: string;
  name: string;
  baseModelId: string;
  baseModelName?: string;
  datasetId: string;
  datasetName?: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'stopped' | 'pending' | 'paused';
  createdAt: string;
  updatedAt: string;
  userId?: string;
  config: {
    epochs: number;
    batchSize: number;
    learningRate: number;
    warmupSteps?: number;
    optimizer: {
      type: string;
      weightDecay: number;
      gradientAccumulationSteps: number;
      schedulerType?: 'linear' | 'cosine' | 'constant';
    };
    lora: {
      rank: number;
      alpha: number;
      dropout?: number;
      targetModules?: string[];
    };
    mixedPrecision?: {
      enabled: boolean;
      dtype: 'float16' | 'bfloat16';
      gradScaling?: boolean;
    };
    distributedTraining?: {
      enabled: boolean;
      strategy: 'data_parallel' | 'model_parallel' | 'pipeline_parallel';
      worldSize: number;
      syncBatchNorm?: boolean;
    };
  };
  resources: {
    gpuCount: number;
    gpuType: string;
    memoryLimit?: number;
    priority?: 'low' | 'medium' | 'high';
  };
  metrics?: {
    currentEpoch?: number;
    currentStep?: number;
    totalSteps?: number;
    elapsedTime?: number;
    estimatedTimeRemaining?: number | undefined;
    trainingLoss?: number;
    validationLoss?: number;
    accuracy?: number;
    lossHistory?: Array<{
      step: number;
      trainingLoss: number;
      validationLoss?: number;
    }>;
  };
  error?: {
    message: string;
    details?: string;
  };
}

export interface CreateJobRequest {
  name: string;
  baseModelId: string;
  baseModelName?: string;
  datasetId: string;
  datasetName?: string;
  userId?: string;
  config: {
    epochs: number;
    batchSize: number;
    learningRate: number;
    warmupSteps?: number;
    optimizer: {
      type: string;
      weightDecay: number;
      gradientAccumulationSteps: number;
      schedulerType?: 'linear' | 'cosine' | 'constant';
    };
    lora: {
      rank: number;
      alpha: number;
      dropout?: number;
      targetModules?: string[];
    };
    mixedPrecision?: {
      enabled: boolean;
      dtype: 'float16' | 'bfloat16';
      gradScaling?: boolean;
    };
    distributedTraining?: {
      enabled: boolean;
      strategy: 'data_parallel' | 'model_parallel' | 'pipeline_parallel';
      worldSize: number;
      syncBatchNorm?: boolean;
    };
  };
  resources: {
    gpuCount: number;
    gpuType: string;
    memoryLimit?: number;
    priority?: 'low' | 'medium' | 'high';
  };
}

export interface GetJobsResponse {
  items: FineTuningJob[];
  total: number;
}

// Mock data for fine-tuning jobs with consistent IDs from mock datasets and models
export const mockJobs: FineTuningJob[] = [
  {
    id: "ft-1",
    name: "GPT-4 Custom Assistant",
    baseModelId: "gpt-4",
    baseModelName: "GPT-4",
    datasetId: "customer-support",
    datasetName: "Customer Support",
    status: "running",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date().toISOString(),
    userId: "user_1",
    config: {
      epochs: 3,
      batchSize: 8,
      learningRate: 0.0002,
      warmupSteps: 100,
      optimizer: {
        type: "adamw",
        weightDecay: 0.01,
        gradientAccumulationSteps: 4,
        schedulerType: "linear"
      },
      lora: {
        rank: 8,
        alpha: 32,
        dropout: 0.1,
        targetModules: ['query', 'key', 'value', 'output']
      },
      mixedPrecision: {
        enabled: true,
        dtype: "float16",
        gradScaling: true
      }
    },
    resources: {
      gpuCount: 1,
      gpuType: "nvidia-a100",
      memoryLimit: 40000,
      priority: "high"
    },
    metrics: {
      currentEpoch: 2,
      currentStep: 156,
      totalSteps: 300,
      elapsedTime: 1800,
      estimatedTimeRemaining: 900,
      trainingLoss: 0.245,
      validationLoss: 0.267,
      accuracy: 0.89,
      lossHistory: [
        { step: 50, trainingLoss: 0.456, validationLoss: 0.478 },
        { step: 100, trainingLoss: 0.312, validationLoss: 0.334 },
        { step: 150, trainingLoss: 0.245, validationLoss: 0.267 }
      ]
    }
  },
  {
    id: "ft-2",
    name: "BERT Classification Model",
    baseModelId: "bert-base",
    baseModelName: "BERT Base",
    datasetId: "sentiment-analysis",
    datasetName: "Sentiment Analysis",
    status: "completed",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    userId: "user_1",
    config: {
      epochs: 5,
      batchSize: 16,
      learningRate: 0.0001,
      warmupSteps: 50,
      optimizer: {
        type: "adamw",
        weightDecay: 0.01,
        gradientAccumulationSteps: 2,
        schedulerType: "cosine"
      },
      lora: {
        rank: 16,
        alpha: 64,
        dropout: 0.05,
        targetModules: ['query', 'key', 'value']
      },
      distributedTraining: {
        enabled: true,
        strategy: "data_parallel",
        worldSize: 2,
        syncBatchNorm: true
      }
    },
    resources: {
      gpuCount: 2,
      gpuType: "nvidia-a100",
      memoryLimit: 80000,
      priority: "medium"
    },
    metrics: {
      currentEpoch: 5,
      currentStep: 500,
      totalSteps: 500,
      elapsedTime: 7200,
      estimatedTimeRemaining: 0,
      trainingLoss: 0.123,
      validationLoss: 0.145,
      accuracy: 0.94,
      lossHistory: [
        { step: 100, trainingLoss: 0.345, validationLoss: 0.367 },
        { step: 300, trainingLoss: 0.189, validationLoss: 0.211 },
        { step: 500, trainingLoss: 0.123, validationLoss: 0.145 }
      ]
    }
  },
  {
    id: "ft-3",
    name: "T5 Translation Model",
    baseModelId: "t5-base",
    baseModelName: "T5 Base",
    datasetId: "ds-3",
    datasetName: "Multilingual Translation Dataset",
    status: "failed",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 169200000).toISOString(),
    userId: "user_1",
    config: {
      epochs: 8,
      batchSize: 24,
      learningRate: 0.0001,
      warmupSteps: 75,
      optimizer: {
        type: "adamw",
        weightDecay: 0.05,
        gradientAccumulationSteps: 3,
        schedulerType: "cosine"
      },
      lora: {
        rank: 6,
        alpha: 24,
        dropout: 0.1,
        targetModules: ['q', 'v']
      }
    },
    resources: {
      gpuCount: 2,
      gpuType: "nvidia-v100"
    },
    metrics: {
      currentEpoch: 2,
      currentStep: 180,
      totalSteps: 800,
      elapsedTime: 1800,
      estimatedTimeRemaining: undefined,
      trainingLoss: 3.5,
      validationLoss: 3.8,
      accuracy: 0.45,
      lossHistory: [
        { step: 50, trainingLoss: 4.1, validationLoss: 4.3 },
        { step: 100, trainingLoss: 3.8, validationLoss: 4.0 },
        { step: 150, trainingLoss: 3.6, validationLoss: 3.9 }
      ]
    },
    error: {
      message: "Out of memory error occurred during training",
      details: `CUDA out of memory. Tried to allocate 2.5 GB. GPU 0 has 16GB total capacity and 14.8GB already allocated.
Stack trace:
  File "train.py", line 245, in train_step
    outputs = model(input_ids, attention_mask=attention_mask, labels=labels)
  File "torch/nn/modules/module.py", line 1190, in _call_impl
    return forward_call(*args, **kwargs)`
    }
  }
];

// Simulation intervals for mock data
const simulationIntervals: Record<string, NodeJS.Timeout> = {};

// Job progression simulation function
function simulateJobProgress(jobId: string) {
  // Clear any existing interval for this job
  if (simulationIntervals[jobId]) {
    clearInterval(simulationIntervals[jobId]);
  }
  
  // Set up progression interval (runs every 2 seconds instead of 5)
  simulationIntervals[jobId] = setInterval(() => {
    const job = mockJobs.find(j => j.id === jobId);
    if (!job || job.status !== 'running') {
      clearInterval(simulationIntervals[jobId]);
      delete simulationIntervals[jobId];
      return;
    }
    
    // Update metrics
    if (job.metrics) {
      const totalSteps = job.metrics.totalSteps || 100;
      // Increase by 3 steps each update for faster progress
      const currentStep = (job.metrics.currentStep || 0) + 3;
      const totalEpochs = job.config.epochs;
      const currentEpoch = Math.floor((currentStep / totalSteps) * totalEpochs);
      
      // Calculate loss (decreasing over time)
      const initialLoss = 0.8;
      const targetLoss = 0.1;
      const progress = currentStep / totalSteps;
      const trainingLoss = initialLoss - ((initialLoss - targetLoss) * progress);
      const validationLoss = trainingLoss * 1.05; // Slightly higher than training loss
      
      // Update job metrics
      job.metrics = {
        ...job.metrics,
        currentStep,
        currentEpoch,
        elapsedTime: (job.metrics.elapsedTime || 0) + 2,  // Add 2 seconds instead of 5
        estimatedTimeRemaining: Math.max(0, totalSteps - currentStep) * 2,  // 2 seconds per step
        trainingLoss,
        validationLoss,
        accuracy: 0.7 + (0.25 * progress), // Accuracy increases over time (0.7 to 0.95)
      };
      
      // Add to loss history every 10 steps instead of 20
      if (currentStep % 10 === 0) {
        job.metrics.lossHistory = [
          ...(job.metrics.lossHistory || []),
          { step: currentStep, trainingLoss, validationLoss }
        ];
      }
      
      // If we reached the end, complete the job
      if (currentStep >= totalSteps) {
        job.status = 'completed';
        job.updatedAt = new Date().toISOString();
        clearInterval(simulationIntervals[jobId]);
        delete simulationIntervals[jobId];
        console.log(`Mock job ${jobId} completed`);
      } else {
        job.updatedAt = new Date().toISOString();
      }
    }
  }, 2000); // Run every 2 seconds instead of 5
}

// Function to stop all job simulations
export function stopAllJobSimulations() {
  Object.keys(simulationIntervals).forEach(jobId => {
    clearInterval(simulationIntervals[jobId]);
    delete simulationIntervals[jobId];
  });
  console.log('Stopped all job simulations');
}

// Function to stop a specific job simulation
export function stopJobSimulation(jobId: string) {
  if (simulationIntervals[jobId]) {
    clearInterval(simulationIntervals[jobId]);
    delete simulationIntervals[jobId];
    console.log(`Stopped simulation for job ${jobId}`);
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export async function getFineTuningJobs(userId?: string): Promise<GetJobsResponse> {
  if (USE_MOCK_API) {
    const filteredJobs = userId
      ? mockJobs.filter(job => job.userId === userId)
      : mockJobs;
    
    return {
      items: filteredJobs,
      total: filteredJobs.length
    };
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/fine-tuning/jobs`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function getFineTuningJob(jobId: string): Promise<FineTuningJob> {
  if (USE_MOCK_API) {
    const job = mockJobs.find(j => j.id === jobId);
    if (!job) {
      throw new Error(`Job with id ${jobId} not found`);
    }
    return job;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/fine-tuning/jobs/${jobId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch job: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function createFineTuningJob(request: CreateJobRequest): Promise<FineTuningJob> {
  if (USE_MOCK_API) {
    const uniqueId = `ft-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`;
    
    const newJob: FineTuningJob = {
      id: uniqueId,
      ...request,
      userId: request.userId,
      status: 'queued',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metrics: {
        currentEpoch: 0,
        currentStep: 0,
        totalSteps: request.config.epochs * 100,
        elapsedTime: 0,
        estimatedTimeRemaining: request.config.epochs * 1800,
        trainingLoss: 0.8,
        validationLoss: 0.85,
        accuracy: 0.7,
        lossHistory: []
      }
    };
    
    mockJobs.push(newJob);
    
    console.log(`Created mock job with ID ${uniqueId} for user ${request.userId}`);
    
    // Simulate job starting faster (500ms instead of 2000ms)
    setTimeout(() => {
      const job = mockJobs.find(j => j.id === uniqueId);
      if (job) {
        job.status = 'running';
        job.updatedAt = new Date().toISOString();
        
        console.log(`Mock job ${uniqueId} started running`);
        
        // Start job simulation immediately
        simulateJobProgress(uniqueId);
      }
    }, 500);
    
    return {...newJob};
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/fine-tuning/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create job');
  }

  const data = await response.json();
  return data;
}

export async function stopFineTuningJob(jobId: string): Promise<void> {
  if (USE_MOCK_API) {
    const job = mockJobs.find(j => j.id === jobId);
    if (job) {
      job.status = 'stopped';
      job.updatedAt = new Date().toISOString();
      
      // Stop the simulation for this job
      stopJobSimulation(jobId);
      console.log(`Job ${jobId} has been stopped`);
    }
    return;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/fine-tuning/jobs/${jobId}/stop`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to stop job: ${response.statusText}`);
  }
}

export async function resumeFineTuningJob(jobId: string): Promise<void> {
  if (USE_MOCK_API) {
    const job = mockJobs.find(j => j.id === jobId);
    if (job && (job.status === 'stopped' || job.status === 'paused')) {
      job.status = 'running';
      job.updatedAt = new Date().toISOString();
      
      // Resume simulation for this job
      simulateJobProgress(jobId);
      console.log(`Job ${jobId} has been resumed`);
      return;
    }
  }
  
  const response = await fetch(`${API_BASE_URL}/api/v1/fine-tuning/jobs/${jobId}/resume`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to resume job: ${response.statusText}`);
  }
}

export async function deleteFineTuningJob(jobId: string): Promise<void> {
  if (USE_MOCK_API) {
    const index = mockJobs.findIndex(j => j.id === jobId);
    if (index !== -1) {
      mockJobs.splice(index, 1);
    }
    return;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/fine-tuning/jobs/${jobId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete job: ${response.statusText}`);
  }
}

export async function downloadFineTunedModel(jobId: string): Promise<Blob> {
  const response = await fetch(`${API_BASE_URL}/api/v1/fine-tuning/jobs/${jobId}/model`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download model: ${response.statusText}`);
  }

  return response.blob();
}

// Start simulating progress for any running jobs when this module loads
if (typeof window !== 'undefined') { // Only run in browser environment
  setTimeout(() => {
    mockJobs.forEach(job => {
      if (job.status === 'running') {
        simulateJobProgress(job.id);
        console.log(`Started simulation for existing job ${job.id}`);
      }
    });
  }, 1000);
} 