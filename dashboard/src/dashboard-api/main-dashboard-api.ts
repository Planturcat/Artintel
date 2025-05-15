/**
 * Main Dashboard API
 * 
 * This file contains API functions for the main dashboard page.
 */

import { getUserContext, seededRandomInt, seededRandomFloat } from './mock-user-context';

// Mock data for new users
const mockEmptyDashboardMetrics = {
  activeDeployments: 0,
  totalModels: 0,
  totalDatasets: 0,
  totalRequests: 0,
  totalTokens: 0,
  recentActivity: [],
  cpuUtilization: 0,
  memoryUsage: 0,
  gpuUtilization: 0,
  costEstimate: 0,
  alerts: []
};

// Interface for main dashboard metrics
export interface MainDashboardMetrics {
  activeDeployments: number;
  totalModels: number;
  totalDatasets: number;
  totalRequests: number;
  totalTokens: number;
  recentActivity: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    timestamp: string;
  }>;
  cpuUtilization: number;
  memoryUsage: number;
  gpuUtilization: number;
  costEstimate: number;
  alerts: Array<{
    id: string;
    severity: 'high' | 'medium' | 'low';
    message: string;
  }>;
}

/**
 * Get main dashboard metrics
 * 
 * This function returns metrics for the main dashboard page.
 * For new users, it returns zero values.
 */
export const getMainDashboardMetrics = async (): Promise<MainDashboardMetrics> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Get user context
  const userContext = getUserContext();
  
  // If no user context or new user, return empty metrics
  if (!userContext || userContext.userId.startsWith('new-user')) {
    return { ...mockEmptyDashboardMetrics };
  }
  
  // Generate user-specific metrics based on user ID
  const activeDeployments = seededRandomInt(userContext.userId + 'active-deployments', 1, 5);
  const totalModels = seededRandomInt(userContext.userId + 'total-models', 3, 10);
  const totalDatasets = seededRandomInt(userContext.userId + 'total-datasets', 2, 8);
  const totalRequests = seededRandomInt(userContext.userId + 'total-requests', 1000, 10000);
  const totalTokens = seededRandomInt(userContext.userId + 'total-tokens', 50000, 500000);
  
  // Generate recent activity
  const recentActivity = [];
  const activityTypes = ['deployment', 'model', 'dataset', 'inference', 'billing'];
  const activityTitles = {
    deployment: ['Deployment Created', 'Deployment Updated', 'Deployment Scaled'],
    model: ['Model Trained', 'Model Deployed', 'Model Updated'],
    dataset: ['Dataset Uploaded', 'Dataset Processed', 'Dataset Annotated'],
    inference: ['Inference Job Completed', 'Batch Processing Finished'],
    billing: ['Invoice Generated', 'Payment Processed']
  };
  
  // Generate 0-5 activities based on user ID
  const numActivities = seededRandomInt(userContext.userId + 'num-activities', 0, 5);
  for (let i = 0; i < numActivities; i++) {
    const type = activityTypes[seededRandomInt(userContext.userId + `activity-type-${i}`, 0, activityTypes.length - 1)];
    const titles = activityTitles[type];
    const title = titles[seededRandomInt(userContext.userId + `activity-title-${i}`, 0, titles.length - 1)];
    
    recentActivity.push({
      id: `activity-${i}`,
      type,
      title,
      description: `This is a description for ${title.toLowerCase()}`,
      timestamp: new Date(Date.now() - seededRandomInt(userContext.userId + `activity-time-${i}`, 0, 7 * 24 * 60 * 60 * 1000)).toISOString()
    });
  }
  
  // Sort activities by timestamp (newest first)
  recentActivity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  // Generate system metrics
  const cpuUtilization = seededRandomInt(userContext.userId + 'cpu-utilization', 10, 80);
  const memoryUsage = seededRandomInt(userContext.userId + 'memory-usage', 15, 75);
  const gpuUtilization = seededRandomInt(userContext.userId + 'gpu-utilization', 5, 90);
  
  // Generate cost estimate based on token usage
  const costEstimate = seededRandomFloat(userContext.userId + 'cost-estimate', 0.5, 50, 2);
  
  // Generate alerts
  const alerts = [];
  const alertSeverities: Array<'high' | 'medium' | 'low'> = ['high', 'medium', 'low'];
  const alertMessages = [
    'High CPU usage detected',
    'Memory usage approaching limit',
    'GPU utilization spike',
    'Unusual token consumption pattern',
    'Deployment scaling event'
  ];
  
  // Generate 0-3 alerts based on user ID
  const numAlerts = seededRandomInt(userContext.userId + 'num-alerts', 0, 3);
  for (let i = 0; i < numAlerts; i++) {
    const severity = alertSeverities[seededRandomInt(userContext.userId + `alert-severity-${i}`, 0, alertSeverities.length - 1)];
    const message = alertMessages[seededRandomInt(userContext.userId + `alert-message-${i}`, 0, alertMessages.length - 1)];
    
    alerts.push({
      id: `alert-${i}`,
      severity,
      message
    });
  }
  
  return {
    activeDeployments,
    totalModels,
    totalDatasets,
    totalRequests,
    totalTokens,
    recentActivity,
    cpuUtilization,
    memoryUsage,
    gpuUtilization,
    costEstimate,
    alerts
  };
};
