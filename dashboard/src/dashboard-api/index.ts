/**
 * ArtIntel LLMs Dashboard API
 * Index file that exports all API functions and allows switching between real and mock APIs.
 */

import {
  getSystemStatus as realGetSystemStatus,
  getResourceUtilization as realGetResourceUtilization,
  getModelPerformance as realGetModelPerformance,
  getFineTuningProgress as realGetFineTuningProgress,
  getDeploymentMetrics as realGetDeploymentMetrics,
  getTokenUsage as realGetTokenUsage,
  getAlerts as realGetAlerts,
  getActivityFeed as realGetActivityFeed,
  getModels as realGetModels,
  // Type exports
  SystemStatusResponse,
  ResourceUtilizationResponse,
  ModelPerformanceResponse,
  FineTuningResponse,
  DeploymentMetricsResponse,
  TokenUsageResponse,
  AlertsResponse,
  ActivityResponse,
  ModelsResponse,
  SystemStatusComponent,
  ModelMetrics,
  ModelPerformance,
  FineTuningJob,
  DeploymentRegion,
  TokenUsageTimelinePoint,
  Alert,
  Activity,
  Model
} from './dashboard-api';

import {
  mockGetSystemStatus,
  mockGetResourceUtilization,
  mockGetModelPerformance,
  mockGetFineTuningProgress,
  mockGetDeploymentMetrics,
  mockGetTokenUsage,
  mockGetAlerts,
  mockGetActivityFeed,
  mockGetModels
} from './mock-api';

// Export the model API client
import * as modelApi from './model-api';
export { modelApi };

// Export the team API client
import * as teamApi from './team-api';
export { teamApi };

// Export the cost optimization API client
import * as costOptimizationApi from './cost-optimization-api';
export { costOptimizationApi };

// Import configuration and auth functions
import { 
  isMockApiEnabled, 
  toggleMockApi,
  setAuthToken,
  clearAuthToken
} from './config';

// Re-export types
export type {
  SystemStatusResponse,
  ResourceUtilizationResponse,
  ModelPerformanceResponse,
  FineTuningResponse,
  DeploymentMetricsResponse,
  TokenUsageResponse,
  AlertsResponse,
  ActivityResponse,
  ModelsResponse,
  SystemStatusComponent,
  ModelMetrics,
  ModelPerformance,
  FineTuningJob,
  DeploymentRegion,
  TokenUsageTimelinePoint,
  Alert,
  Activity,
  Model
};

// Re-export configuration and auth functions
export { toggleMockApi, setAuthToken, clearAuthToken };

/**
 * Get system status information
 * Switches between real and mock implementations based on the mock API setting
 */
export const getSystemStatus = (): Promise<SystemStatusResponse> => {
  return isMockApiEnabled() ? mockGetSystemStatus() : realGetSystemStatus();
};

/**
 * Get resource utilization metrics
 * Switches between real and mock implementations based on the mock API setting
 */
export const getResourceUtilization = (
  timeframe?: 'hour' | 'day' | 'week'
): Promise<ResourceUtilizationResponse> => {
  return isMockApiEnabled() 
    ? mockGetResourceUtilization(timeframe) 
    : realGetResourceUtilization(timeframe);
};

/**
 * Get model performance metrics
 * Switches between real and mock implementations based on the mock API setting
 */
export const getModelPerformance = (
  modelId?: string,
  timeframe?: 'day' | 'week' | 'month'
): Promise<ModelPerformanceResponse> => {
  return isMockApiEnabled()
    ? mockGetModelPerformance(modelId, timeframe)
    : realGetModelPerformance(modelId, timeframe);
};

/**
 * Get fine-tuning progress information
 * Switches between real and mock implementations based on the mock API setting
 */
export const getFineTuningProgress = (
  jobId?: string,
  status?: 'running' | 'completed' | 'failed'
): Promise<FineTuningResponse> => {
  return isMockApiEnabled()
    ? mockGetFineTuningProgress(jobId, status)
    : realGetFineTuningProgress(jobId, status);
};

/**
 * Get deployment metrics
 * Switches between real and mock implementations based on the mock API setting
 */
export const getDeploymentMetrics = (
  timeframe?: 'day' | 'week' | 'month'
): Promise<DeploymentMetricsResponse> => {
  return isMockApiEnabled()
    ? mockGetDeploymentMetrics(timeframe)
    : realGetDeploymentMetrics(timeframe);
};

/**
 * Get token usage statistics
 * Switches between real and mock implementations based on the mock API setting
 */
export const getTokenUsage = (
  timeframe?: 'day' | 'week' | 'month',
  granularity?: 'hour' | 'day' | 'week'
): Promise<TokenUsageResponse> => {
  return isMockApiEnabled()
    ? mockGetTokenUsage(timeframe, granularity)
    : realGetTokenUsage(timeframe, granularity);
};

/**
 * Get system alerts
 * Switches between real and mock implementations based on the mock API setting
 */
export const getAlerts = (
  severity?: 'info' | 'warning' | 'error' | 'critical',
  limit?: number
): Promise<AlertsResponse> => {
  return isMockApiEnabled()
    ? mockGetAlerts(severity, limit)
    : realGetAlerts(severity, limit);
};

/**
 * Get activity feed
 * Switches between real and mock implementations based on the mock API setting
 */
export const getActivityFeed = (
  type?: 'deployment' | 'user' | 'alert' | 'system' | 'billing',
  limit?: number,
  offset?: number
): Promise<ActivityResponse> => {
  return isMockApiEnabled()
    ? mockGetActivityFeed(type, limit, offset)
    : realGetActivityFeed(type, limit, offset);
};

/**
 * Get models information
 * Switches between real and mock implementations based on the mock API setting
 */
export const getModels = (
  status?: 'running' | 'paused' | 'error',
  type?: string
): Promise<ModelsResponse> => {
  return isMockApiEnabled()
    ? mockGetModels(status, type)
    : realGetModels(status, type);
};

/**
 * Check if mock API mode is currently enabled
 */
export const isMockMode = (): boolean => {
  return isMockApiEnabled();
};

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
  toggleMockApi,
  setAuthToken,
  clearAuthToken,
  isMockMode,
  modelApi,
  teamApi,
  costOptimizationApi
}; 