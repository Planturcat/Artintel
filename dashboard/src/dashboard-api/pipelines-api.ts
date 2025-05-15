/**
 * Pipelines API
 *
 * This file provides functions for interacting with the pipelines API.
 * It includes both real API calls and mock implementations.
 */

import { isMockApiEnabled } from './config';
import { getUserContext, seededRandomInt, seededRandomFloat } from './mock-user-context';
import { faker } from '@faker-js/faker';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// Types
export interface Pipeline {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'error' | 'draft';
  createdAt: string;
  updatedAt: string;
  lastRun?: string;
  type: 'inference' | 'training' | 'data-processing' | 'evaluation';
  tags: string[];
  metrics?: {
    averageRuntime?: number;
    successRate?: number;
    costPerRun?: number;
    lastRunDuration?: number;
  };
}

export interface PipelineRun {
  id: string;
  pipelineId: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: string;
  endTime?: string;
  duration?: number;
  logs?: string[];
  metrics?: Record<string, number>;
  cost?: number;
  triggeredBy: 'user' | 'schedule' | 'api';
}

export interface PipelineTemplate {
  id: string;
  name: string;
  description: string;
  type: 'inference' | 'training' | 'data-processing' | 'evaluation';
  complexity: 'simple' | 'medium' | 'complex';
  estimatedCost: number;
  popularity: number;
  tags: string[];
}

export interface PipelineStats {
  totalPipelines: number;
  activePipelines: number;
  totalRuns: number;
  successfulRuns: number;
  failedRuns: number;
  averageRuntime: number;
  totalCost: number;
}

/**
 * Get pipelines
 * @returns Promise with pipelines
 */
export const getPipelines = async (): Promise<Pipeline[]> => {
  if (isMockApiEnabled()) {
    return getMockPipelines();
  }

  try {
    const response = await fetch(`${API_BASE_URL}/pipelines`);
    if (!response.ok) {
      throw new Error(`Failed to fetch pipelines: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching pipelines:', error);
    throw error;
  }
};

/**
 * Get pipeline templates
 * @returns Promise with pipeline templates
 */
export const getPipelineTemplates = async (): Promise<PipelineTemplate[]> => {
  if (isMockApiEnabled()) {
    return getMockPipelineTemplates();
  }

  try {
    const response = await fetch(`${API_BASE_URL}/pipelines/templates`);
    if (!response.ok) {
      throw new Error(`Failed to fetch pipeline templates: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching pipeline templates:', error);
    throw error;
  }
};

/**
 * Get pipeline runs
 * @param pipelineId Pipeline ID (optional)
 * @returns Promise with pipeline runs
 */
export const getPipelineRuns = async (pipelineId?: string): Promise<PipelineRun[]> => {
  if (isMockApiEnabled()) {
    return getMockPipelineRuns(pipelineId);
  }

  try {
    const url = pipelineId
      ? `${API_BASE_URL}/pipelines/${pipelineId}/runs`
      : `${API_BASE_URL}/pipelines/runs`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch pipeline runs: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching pipeline runs:', error);
    throw error;
  }
};

/**
 * Get pipeline statistics
 * @returns Promise with pipeline statistics
 */
export const getPipelineStats = async (): Promise<PipelineStats> => {
  if (isMockApiEnabled()) {
    return getMockPipelineStats();
  }

  try {
    const response = await fetch(`${API_BASE_URL}/pipelines/stats`);
    if (!response.ok) {
      throw new Error(`Failed to fetch pipeline statistics: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching pipeline statistics:', error);
    throw error;
  }
};

/**
 * Create a new pipeline
 * @param pipeline Pipeline data
 * @returns Promise with created pipeline
 */
export const createPipeline = async (pipeline: Omit<Pipeline, 'id' | 'createdAt' | 'updatedAt'>): Promise<Pipeline> => {
  if (isMockApiEnabled()) {
    return createMockPipeline(pipeline);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/pipelines`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pipeline),
    });
    if (!response.ok) {
      throw new Error(`Failed to create pipeline: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating pipeline:', error);
    throw error;
  }
};

/**
 * Get mock pipelines
 * @returns Promise with mock pipelines
 */
const getMockPipelines = (): Promise<Pipeline[]> => {
  // Get user context for user-specific data
  const userContext = getUserContext();

  if (userContext) {
    // Number of pipelines based on user tier
    const pipelineCount = userContext.tier === 'free'
      ? 2
      : userContext.tier === 'pro'
        ? 5
        : 10;

    const pipelines: Pipeline[] = [];
    const pipelineTypes: Array<'inference' | 'training' | 'data-processing' | 'evaluation'> = [
      'inference', 'training', 'data-processing', 'evaluation'
    ];

    for (let i = 0; i < pipelineCount; i++) {
      const type = pipelineTypes[i % pipelineTypes.length];
      const id = `pipeline-${userContext.userId.substring(0, 8)}-${i}`;
      const status: 'active' | 'inactive' | 'error' | 'draft' =
        i === 0 ? 'active' :
        i === 1 ? 'inactive' :
        i === pipelineCount - 1 ? 'draft' :
        seededRandomInt(userContext.userId + `pipeline-status-${i}`, 1, 10) <= 8 ? 'active' : 'error';

      const createdAt = new Date(Date.now() - seededRandomInt(userContext.userId + `pipeline-created-${i}`, 1, 90) * 24 * 60 * 60 * 1000).toISOString();
      const updatedAt = new Date(Date.now() - seededRandomInt(userContext.userId + `pipeline-updated-${i}`, 0, 30) * 24 * 60 * 60 * 1000).toISOString();
      const lastRun = status === 'active' || status === 'error'
        ? new Date(Date.now() - seededRandomInt(userContext.userId + `pipeline-lastrun-${i}`, 0, 7) * 24 * 60 * 60 * 1000).toISOString()
        : undefined;

      let name, description, tags;

      switch (type) {
        case 'inference':
          name = `${userContext.fullName.split(' ')[0]}'s Inference Pipeline ${i + 1}`;
          description = 'Processes incoming requests through the model and returns predictions';
          tags = ['inference', 'production', 'api'];
          break;
        case 'training':
          name = `${userContext.fullName.split(' ')[0]}'s Training Pipeline ${i + 1}`;
          description = 'Trains models on new data and evaluates performance';
          tags = ['training', 'ml-ops', 'batch'];
          break;
        case 'data-processing':
          name = `${userContext.fullName.split(' ')[0]}'s Data Processing Pipeline ${i + 1}`;
          description = 'Cleans, transforms, and prepares data for model training';
          tags = ['data', 'etl', 'preprocessing'];
          break;
        case 'evaluation':
          name = `${userContext.fullName.split(' ')[0]}'s Evaluation Pipeline ${i + 1}`;
          description = 'Evaluates model performance against benchmarks';
          tags = ['evaluation', 'metrics', 'quality'];
          break;
      }

      pipelines.push({
        id,
        name,
        description,
        status,
        createdAt,
        updatedAt,
        lastRun,
        type,
        tags,
        metrics: status !== 'draft' ? {
          averageRuntime: seededRandomInt(userContext.userId + `pipeline-runtime-${i}`, 30, 300),
          successRate: seededRandomFloat(userContext.userId + `pipeline-success-${i}`, status === 'error' ? 70 : 90, 100, 1),
          costPerRun: seededRandomFloat(userContext.userId + `pipeline-cost-${i}`, 0.5, 5, 2),
          lastRunDuration: lastRun ? seededRandomInt(userContext.userId + `pipeline-duration-${i}`, 20, 350) : undefined
        } : undefined
      });
    }

    return Promise.resolve(pipelines);
  }

  // Default mock pipelines if no user context
  return Promise.resolve([
    {
      id: 'pipeline-default-1',
      name: 'Default Inference Pipeline',
      description: 'Processes incoming requests through the model and returns predictions',
      status: 'active',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      lastRun: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      type: 'inference',
      tags: ['inference', 'production', 'api'],
      metrics: {
        averageRuntime: 120,
        successRate: 98.5,
        costPerRun: 1.25,
        lastRunDuration: 115
      }
    },
    {
      id: 'pipeline-default-2',
      name: 'Default Training Pipeline',
      description: 'Trains models on new data and evaluates performance',
      status: 'inactive',
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      type: 'training',
      tags: ['training', 'ml-ops', 'batch']
    }
  ]);
};

/**
 * Get mock pipeline templates
 * @returns Promise with mock pipeline templates
 */
const getMockPipelineTemplates = (): Promise<PipelineTemplate[]> => {
  // Get user context for user-specific data
  const userContext = getUserContext();

  // Base templates available to all users
  const baseTemplates: PipelineTemplate[] = [
    {
      id: 'template-1',
      name: 'Basic Inference Pipeline',
      description: 'Simple pipeline for serving model predictions via API',
      type: 'inference',
      complexity: 'simple',
      estimatedCost: 1.5,
      popularity: 95,
      tags: ['inference', 'api', 'beginner']
    },
    {
      id: 'template-2',
      name: 'Data Preprocessing Pipeline',
      description: 'Clean and transform data for model training',
      type: 'data-processing',
      complexity: 'medium',
      estimatedCost: 2.0,
      popularity: 85,
      tags: ['data', 'preprocessing', 'etl']
    }
  ];

  // Pro templates available to pro and enterprise users
  const proTemplates: PipelineTemplate[] = [
    {
      id: 'template-3',
      name: 'Advanced Training Pipeline',
      description: 'Complete pipeline for model training with hyperparameter tuning',
      type: 'training',
      complexity: 'complex',
      estimatedCost: 8.0,
      popularity: 75,
      tags: ['training', 'hyperparameter', 'advanced']
    },
    {
      id: 'template-4',
      name: 'Model Evaluation Pipeline',
      description: 'Comprehensive evaluation of model performance against benchmarks',
      type: 'evaluation',
      complexity: 'medium',
      estimatedCost: 3.0,
      popularity: 70,
      tags: ['evaluation', 'metrics', 'quality']
    }
  ];

  // Enterprise templates available only to enterprise users
  const enterpriseTemplates: PipelineTemplate[] = [
    {
      id: 'template-5',
      name: 'Enterprise MLOps Pipeline',
      description: 'End-to-end MLOps pipeline with CI/CD integration',
      type: 'training',
      complexity: 'complex',
      estimatedCost: 12.0,
      popularity: 60,
      tags: ['mlops', 'ci-cd', 'enterprise']
    },
    {
      id: 'template-6',
      name: 'Multi-Model Ensemble Pipeline',
      description: 'Combine multiple models for improved prediction accuracy',
      type: 'inference',
      complexity: 'complex',
      estimatedCost: 10.0,
      popularity: 55,
      tags: ['ensemble', 'advanced', 'inference']
    }
  ];

  // Return templates based on user tier
  if (userContext) {
    if (userContext.tier === 'free') {
      return Promise.resolve(baseTemplates);
    } else if (userContext.tier === 'pro') {
      return Promise.resolve([...baseTemplates, ...proTemplates]);
    } else {
      return Promise.resolve([...baseTemplates, ...proTemplates, ...enterpriseTemplates]);
    }
  }

  // Default to base templates if no user context
  return Promise.resolve(baseTemplates);
};

/**
 * Get mock pipeline runs
 * @param pipelineId Pipeline ID (optional)
 * @returns Promise with mock pipeline runs
 */
const getMockPipelineRuns = (pipelineId?: string): Promise<PipelineRun[]> => {
  // Get user context for user-specific data
  const userContext = getUserContext();

  if (userContext) {
    // Generate user-specific pipeline runs
    const runs: PipelineRun[] = [];

    // Number of runs to generate
    const runCount = pipelineId ? 10 : 20;

    for (let i = 0; i < runCount; i++) {
      const id = `run-${userContext.userId.substring(0, 8)}-${i}`;
      const currentPipelineId = pipelineId || `pipeline-${userContext.userId.substring(0, 8)}-${i % 5}`;

      // Generate status with more recent runs more likely to be running
      const statusRandom = seededRandomInt(userContext.userId + `run-status-${i}`, 1, 10);
      const status: 'running' | 'completed' | 'failed' | 'cancelled' =
        i < 2 ? 'running' :
        statusRandom <= 7 ? 'completed' :
        statusRandom <= 9 ? 'failed' :
        'cancelled';

      // Generate timestamps
      const startTime = new Date(Date.now() - seededRandomInt(userContext.userId + `run-start-${i}`, 0, 30) * 24 * 60 * 60 * 1000).toISOString();
      const duration = status !== 'running' ? seededRandomInt(userContext.userId + `run-duration-${i}`, 30, 300) : undefined;
      const endTime = status !== 'running' && duration ? new Date(new Date(startTime).getTime() + duration * 1000).toISOString() : undefined;

      // Generate trigger type
      const triggerRandom = seededRandomInt(userContext.userId + `run-trigger-${i}`, 1, 10);
      const triggeredBy: 'user' | 'schedule' | 'api' =
        triggerRandom <= 5 ? 'user' :
        triggerRandom <= 8 ? 'schedule' :
        'api';

      runs.push({
        id,
        pipelineId: currentPipelineId,
        status,
        startTime,
        endTime,
        duration,
        logs: status !== 'running' ? [
          `[INFO] Pipeline run started at ${startTime}`,
          `[INFO] Processing input data...`,
          status === 'failed' ? `[ERROR] Failed to process data: Connection timeout` : `[INFO] Data processing complete`,
          status === 'completed' ? `[INFO] Pipeline run completed successfully` :
          status === 'failed' ? `[ERROR] Pipeline run failed` :
          `[INFO] Pipeline run cancelled by user`
        ] : undefined,
        metrics: status === 'completed' ? {
          accuracy: seededRandomFloat(userContext.userId + `run-accuracy-${i}`, 0.85, 0.98, 3),
          latency: seededRandomInt(userContext.userId + `run-latency-${i}`, 50, 200),
          throughput: seededRandomInt(userContext.userId + `run-throughput-${i}`, 100, 500)
        } : undefined,
        cost: status !== 'running' ? seededRandomFloat(userContext.userId + `run-cost-${i}`, 0.5, 5, 2) : undefined,
        triggeredBy
      });
    }

    // Filter by pipeline ID if provided
    return Promise.resolve(pipelineId ? runs.filter(run => run.pipelineId === pipelineId) : runs);
  }

  // Default mock runs if no user context
  return Promise.resolve([
    {
      id: 'run-default-1',
      pipelineId: pipelineId || 'pipeline-default-1',
      status: 'completed',
      startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 120 * 1000).toISOString(),
      duration: 120,
      logs: [
        `[INFO] Pipeline run started`,
        `[INFO] Processing input data...`,
        `[INFO] Data processing complete`,
        `[INFO] Pipeline run completed successfully`
      ],
      metrics: {
        accuracy: 0.92,
        latency: 115,
        throughput: 250
      },
      cost: 1.25,
      triggeredBy: 'user'
    },
    {
      id: 'run-default-2',
      pipelineId: pipelineId || 'pipeline-default-1',
      status: 'running',
      startTime: new Date().toISOString(),
      triggeredBy: 'schedule'
    }
  ]);
};

/**
 * Get mock pipeline statistics
 * @returns Promise with mock pipeline statistics
 */
const getMockPipelineStats = (): Promise<PipelineStats> => {
  // Get user context for user-specific data
  const userContext = getUserContext();

  if (userContext) {
    // Generate user-specific pipeline statistics based on tier
    const multiplier = userContext.tier === 'free'
      ? 1
      : userContext.tier === 'pro'
        ? 3
        : 10;

    const totalPipelines = seededRandomInt(userContext.userId + 'total-pipelines', 2, 5) * multiplier;
    const activePipelines = seededRandomInt(userContext.userId + 'active-pipelines', 1, totalPipelines);
    const totalRuns = seededRandomInt(userContext.userId + 'total-runs', 10, 30) * multiplier;
    const successfulRuns = Math.floor(totalRuns * seededRandomFloat(userContext.userId + 'success-rate', 0.7, 0.95, 2));
    const failedRuns = totalRuns - successfulRuns;

    return Promise.resolve({
      totalPipelines,
      activePipelines,
      totalRuns,
      successfulRuns,
      failedRuns,
      averageRuntime: seededRandomInt(userContext.userId + 'avg-runtime', 60, 240),
      totalCost: seededRandomFloat(userContext.userId + 'total-cost', 50, 200, 2) * multiplier
    });
  }

  // Default mock statistics if no user context
  return Promise.resolve({
    totalPipelines: 5,
    activePipelines: 3,
    totalRuns: 42,
    successfulRuns: 36,
    failedRuns: 6,
    averageRuntime: 120,
    totalCost: 150.75
  });
};

/**
 * Create a mock pipeline
 * @param pipeline Pipeline data
 * @returns Promise with created mock pipeline
 */
const createMockPipeline = (pipeline: Omit<Pipeline, 'id' | 'createdAt' | 'updatedAt'>): Promise<Pipeline> => {
  // Get user context for user-specific data
  const userContext = getUserContext();

  const now = new Date().toISOString();
  const id = userContext
    ? `pipeline-${userContext.userId.substring(0, 8)}-${Date.now().toString().substring(9, 13)}`
    : `pipeline-${Date.now().toString()}`;

  const newPipeline: Pipeline = {
    ...pipeline,
    id,
    createdAt: now,
    updatedAt: now
  };

  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(newPipeline);
    }, 800);
  });
};