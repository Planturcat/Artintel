export enum JobStatus {
  PENDING = 'PENDING',
  QUEUED = 'QUEUED',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  STOPPED = 'STOPPED',
}

export interface HyperParameters {
  learningRate: number;
  batchSize: number;
  epochs: number;
  warmupSteps: number;
  weightDecay: number;
  optimizerType: 'adam' | 'adamw' | 'sgd';
  schedulerType: 'linear' | 'cosine' | 'constant';
}

export interface GPUConfig {
  count: number;
  type: string;
  memoryPerGpu: number;
}

export interface FineTuningJob {
  id: string;
  name: string;
  baseModelId: string;
  baseModelName?: string;
  datasetId: string;
  datasetName?: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
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