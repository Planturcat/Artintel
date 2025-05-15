/**
 * ArtIntel LLMs Dashboard API
 * This file serves as the central API client for all dashboard-related data.
 */

import axios from 'axios';

// Flag to determine whether to use mock data or real API endpoints
// Import from config to ensure consistency
import { USE_MOCK_API as MOCK_API_ENABLED } from './config';
export const USE_MOCK_API = MOCK_API_ENABLED;

// Base URL for API endpoints
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// Common error handling for API requests
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Generic API request function with error handling
export async function apiRequest<T>(
  endpoint: string,
  method: string = 'GET',
  body?: any,
  headers: Record<string, string> = {}
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new APIError(
        error.message || `API request failed with status ${response.status}`,
        response.status,
        error.details
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      500
    );
  }
}

/**
 * Authentication helpers
 */
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('AUTH_TOKEN', token);
  }
};

export const clearAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('AUTH_TOKEN');
  }
};

/**
 * Create headers for API requests
 */
const createHeaders = () => {
  // Get the auth token from localStorage if available
  const authToken = typeof window !== 'undefined' ? localStorage.getItem('AUTH_TOKEN') : null;

  return {
    'Content-Type': 'application/json',
    ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
  };
};

/**
 * Response type declarations
 */

// System status component type
export interface SystemStatusComponent {
  name: string;
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  message?: string;
  lastUpdated: string;
}

// System status response
export interface SystemStatusResponse {
  overall: 'operational' | 'degraded' | 'outage' | 'maintenance';
  components: SystemStatusComponent[];
  lastUpdated: string;
}

// Resource utilization response
export interface ResourceUtilizationResponse {
  cpu: {
    current: number;
    history: Array<{ timestamp: string; value: number }>;
  };
  memory: {
    current: number;
    history: Array<{ timestamp: string; value: number }>;
  };
  gpu: {
    current: number;
    history: Array<{ timestamp: string; value: number }>;
  };
  disk: {
    current: number;
    history: Array<{ timestamp: string; value: number }>;
  };
}

// Model metrics
export interface ModelMetrics {
  accuracy: number;
  latency: number;
  throughput: number;
}

// Model performance
export interface ModelPerformance {
  modelId: string;
  modelName: string;
  metrics: ModelMetrics;
}

// Model performance response
export interface ModelPerformanceResponse {
  models: ModelPerformance[];
  timeframe: string;
}

// Fine-tuning job
export interface FineTuningJob {
  id: string;
  modelId: string;
  modelName: string;
  startTime: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  progress: number;
  estimatedCompletion?: string;
  error?: string;
}

// Fine-tuning response
export interface FineTuningResponse {
  jobs: FineTuningJob[];
}

// Deployment regions
export interface DeploymentRegion {
  region: string;
  status: 'operational' | 'degraded' | 'outage';
  latency: number; // milliseconds
  requests: number;
  errors: number;
  availability: number; // percentage
}

// Deployment metrics response
export interface DeploymentMetricsResponse {
  totalDeployments: number;
  activeDeployments: number;
  requestsPerSecond: number;
  regions: DeploymentRegion[];
  cpuUtilization: number;
  memoryUsage: number;
  gpuUtilization: number;
}

// Token usage timeline point
export interface TokenUsageTimelinePoint {
  timestamp: string;
  generation: number;
  embedding: number;
  classification: number;
  total: number;
}

// Token usage response
export interface TokenUsageResponse {
  total: {
    generation: number;
    embedding: number;
    classification: number;
    total: number;
  };
  timeline: TokenUsageTimelinePoint[];
  costEstimate: number;
  timeframe: string;
}

// Alert
export interface Alert {
  id: string;
  timestamp: string;
  type: 'system' | 'billing' | 'security' | 'performance';
  severity: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  title: string;
  acknowledged: boolean;
  resource?: string;
}

// Alerts response
export interface AlertsResponse {
  alerts: Alert[];
  count: {
    info: number;
    warning: number;
    error: number;
    critical: number;
    total: number;
  };
}

// Activity
export interface Activity {
  id: string;
  timestamp: string;
  type: 'deployment' | 'user' | 'alert' | 'system' | 'billing';
  action: string;
  resource?: string;
  user?: string;
  details?: string;
  status?: 'success' | 'failure' | 'pending';
}

// Activity response
export interface ActivityResponse {
  activities: Activity[];
  totalCount: number;
}

// Model
export interface Model {
  id: string;
  name: string;
  type: string;
  version: string;
  status: string;
  metrics: {
    tokens: string;
    latency: string;
    cost: string;
    performance: number;
  };
  description: string;
  updated: string;
  license: string;
  parameters: string;
  tags: string[];
}

// Models response
export interface ModelsResponse {
  models: Model[];
}

/**
 * User API functions
 */

export interface UserProfile {
  full_name: string;
  email: string;
  phone?: string;
  organization?: string;
  website?: string;
  bio?: string;
  timezone?: string;
  language?: string;
  profile_image?: string;
}

export const updateUserProfile = async (profileData: UserProfile): Promise<UserProfile> => {
  return apiRequest<UserProfile>('/users/profile', 'PATCH', profileData, createHeaders());
};

export const getUserProfile = async (): Promise<UserProfile> => {
  return apiRequest<UserProfile>('/users/profile', 'GET', undefined, createHeaders());
};

/**
 * API functions
 */

// Get system status
export const getSystemStatus = (): Promise<SystemStatusResponse> => {
  return apiRequest<SystemStatusResponse>('/system/status');
};

// Get resource utilization
export const getResourceUtilization = (
  timeframe?: 'hour' | 'day' | 'week'
): Promise<ResourceUtilizationResponse> => {
  return apiRequest<ResourceUtilizationResponse>('/system/resources', 'GET', { timeframe });
};

// Get model performance
export const getModelPerformance = (
  modelId?: string,
  timeframe?: 'day' | 'week' | 'month'
): Promise<ModelPerformanceResponse> => {
  return apiRequest<ModelPerformanceResponse>('/models/performance', 'GET', {
    model_id: modelId,
    timeframe
  });
};

// Get fine-tuning progress
export const getFineTuningProgress = (
  jobId?: string,
  status?: 'running' | 'completed' | 'failed'
): Promise<FineTuningResponse> => {
  return apiRequest<FineTuningResponse>('/fine-tuning/jobs', 'GET', {
    job_id: jobId,
    status
  });
};

// Get deployment metrics
export const getDeploymentMetrics = (
  timeframe?: 'day' | 'week' | 'month'
): Promise<DeploymentMetricsResponse> => {
  return apiRequest<DeploymentMetricsResponse>('/deployments/metrics', 'GET', {
    timeframe
  });
};

// Get token usage
export const getTokenUsage = (
  timeframe?: 'day' | 'week' | 'month',
  granularity?: 'hour' | 'day' | 'week'
): Promise<TokenUsageResponse> => {
  return apiRequest<TokenUsageResponse>('/usage/tokens', 'GET', {
    timeframe,
    granularity
  });
};

// Get alerts
export const getAlerts = (
  severity?: 'info' | 'warning' | 'error' | 'critical',
  limit?: number
): Promise<AlertsResponse> => {
  return apiRequest<AlertsResponse>('/alerts', 'GET', {
    severity,
    limit
  });
};

// Get activity feed
export const getActivityFeed = (
  type?: 'deployment' | 'user' | 'alert' | 'system' | 'billing',
  limit?: number,
  offset?: number
): Promise<ActivityResponse> => {
  return apiRequest<ActivityResponse>('/activity', 'GET', {
    type,
    limit,
    offset
  });
};

// Get models information
export const getModels = (
  status?: 'running' | 'paused' | 'error',
  type?: string
): Promise<ModelsResponse> => {
  return apiRequest<ModelsResponse>('/models', 'GET', {
    status,
    type
  });
};

// Export all functions and types
export default {
  getSystemStatus,
  getResourceUtilization,
  getModelPerformance,
  getFineTuningProgress,
  getDeploymentMetrics,
  getTokenUsage,
  getAlerts,
  getActivityFeed,
  getModels,
  setAuthToken,
  clearAuthToken,
  updateUserProfile,
  getUserProfile
};