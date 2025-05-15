/**
 * Mock Data Generator
 *
 * This utility provides functions for generating consistent mock data
 * based on the user ID. It ensures that data relationships are maintained
 * and that the same user always gets the same data.
 */

import { faker } from '@faker-js/faker';
import {
  getUserContext,
  seededRandomInt,
  seededRandomFloat,
  getUserTierMultiplier,
  UserContext
} from './mock-user-context';

/**
 * Initialize faker with a seed based on user ID
 * This ensures consistent data generation for the same user
 * @param userId User ID to use as seed
 */
export const initializeUserSeed = (userId: string): void => {
  // Set faker seed based on user ID
  faker.seed(parseInt(userId.replace(/\D/g, '').substring(0, 9) || '12345', 10));
};

/**
 * Check if user is new (has no data yet)
 * @param context User context
 * @returns Boolean indicating if user is new
 */
export const isNewUser = (context: UserContext): boolean => {
  // For demonstration purposes, we'll consider users with IDs ending in "0" as new users
  return context.userId.endsWith('0');
};

/**
 * Generate user-specific system status data
 * @returns System status data
 */
export const generateUserSystemStatus = () => {
  const context = getUserContext();
  if (!context) {
    throw new Error('User context not set');
  }

  // Initialize faker with user seed
  initializeUserSeed(context.userId);

  // Get tier multiplier for realistic data differences
  const tierMultiplier = getUserTierMultiplier();

  // Generate system components with user-specific values
  const components = [
    {
      name: 'API Gateway',
      status: seededRandomInt(context.userId + 'api', 1, 100) > 5 ? 'operational' : 'degraded',
      uptime: seededRandomFloat(context.userId + 'api-uptime', 99.5, 100, 2),
      responseTime: seededRandomInt(context.userId + 'api-response', 20, 50)
    },
    {
      name: 'Model Inference',
      status: seededRandomInt(context.userId + 'inference', 1, 100) > 10 ? 'operational' : 'degraded',
      uptime: seededRandomFloat(context.userId + 'inference-uptime', 99.0, 99.9, 2),
      responseTime: seededRandomInt(context.userId + 'inference-response', 100, 300)
    },
    {
      name: 'Database',
      status: seededRandomInt(context.userId + 'db', 1, 100) > 2 ? 'operational' : 'degraded',
      uptime: seededRandomFloat(context.userId + 'db-uptime', 99.8, 100, 2),
      responseTime: seededRandomInt(context.userId + 'db-response', 5, 20)
    },
    {
      name: 'Authentication',
      status: 'operational',
      uptime: 100,
      responseTime: seededRandomInt(context.userId + 'auth-response', 10, 30)
    }
  ];

  // Calculate overall system status
  const systemLoad = seededRandomInt(context.userId + 'load', 60, 90);
  const overallStatus = components.every(c => c.status === 'operational') ? 'operational' : 'degraded';

  return {
    status: overallStatus,
    components,
    systemLoad,
    responseTime: {
      p50: seededRandomInt(context.userId + 'p50', 80, 120),
      p95: seededRandomInt(context.userId + 'p95', 150, 250),
      p99: seededRandomInt(context.userId + 'p99', 250, 400)
    },
    lastUpdated: new Date().toISOString()
  };
};

/**
 * Generate user-specific model performance data
 * @returns Model performance data
 */
export const generateUserModelPerformance = () => {
  const context = getUserContext();
  if (!context) {
    throw new Error('User context not set');
  }

  // Initialize faker with user seed
  initializeUserSeed(context.userId);

  // Get tier multiplier for realistic data differences
  const tierMultiplier = getUserTierMultiplier();

  // Generate models with user-specific metrics
  const models = [
    {
      id: 'model-1',
      name: 'ArtIntel-7B',
      type: 'Foundational LLM',
      metrics: {
        accuracy: seededRandomFloat(context.userId + 'model1-acc', 0.85, 0.95, 2),
        latency: seededRandomInt(context.userId + 'model1-lat', 200, 300),
        throughput: seededRandomFloat(context.userId + 'model1-thru', 40, 50, 1),
        errorRate: seededRandomFloat(context.userId + 'model1-err', 0.02, 0.05, 2)
      }
    },
    {
      id: 'model-2',
      name: 'ArtIntel-Vision',
      type: 'Multimodal',
      metrics: {
        accuracy: seededRandomFloat(context.userId + 'model2-acc', 0.80, 0.90, 2),
        latency: seededRandomInt(context.userId + 'model2-lat', 300, 450),
        throughput: seededRandomFloat(context.userId + 'model2-thru', 30, 40, 1),
        errorRate: seededRandomFloat(context.userId + 'model2-err', 0.03, 0.06, 2)
      }
    },
    {
      id: 'model-3',
      name: 'ArtIntel-Embedding',
      type: 'Embedding',
      metrics: {
        accuracy: seededRandomFloat(context.userId + 'model3-acc', 0.90, 0.98, 2),
        latency: seededRandomInt(context.userId + 'model3-lat', 50, 100),
        throughput: seededRandomFloat(context.userId + 'model3-thru', 80, 100, 1),
        errorRate: seededRandomFloat(context.userId + 'model3-err', 0.01, 0.03, 2)
      }
    }
  ];

  // Calculate aggregated metrics
  const accuracySum = models.reduce((sum, model) => sum + model.metrics.accuracy, 0);
  const latencySum = models.reduce((sum, model) => sum + model.metrics.latency, 0);
  const throughputSum = models.reduce((sum, model) => sum + model.metrics.throughput, 0);
  const errorRateSum = models.reduce((sum, model) => sum + model.metrics.errorRate, 0);
  const count = models.length;

  return {
    models,
    aggregated: {
      averageAccuracy: count > 0 ? accuracySum / count : 0,
      averageLatency: count > 0 ? latencySum / count : 0,
      totalThroughput: throughputSum,
      averageErrorRate: count > 0 ? errorRateSum / count : 0
    },
    timestamp: new Date().toISOString()
  };
};

/**
 * Generate user-specific token usage data
 * @returns Token usage data
 */
export const generateUserTokenUsage = () => {
  const context = getUserContext();
  if (!context) {
    throw new Error('User context not set');
  }

  // Initialize faker with user seed
  initializeUserSeed(context.userId);

  // Get tier multiplier for realistic data differences
  const tierMultiplier = getUserTierMultiplier();

  // Check if user is new
  const newUser = isNewUser(context);

  // Base values adjusted by tier
  const baseTokens = newUser ? 0 : 500000 * tierMultiplier;
  const baseLimit = 1000000 * tierMultiplier;

  // Generate token usage data
  const totalTokens = newUser ? 0 : baseTokens + seededRandomInt(context.userId + 'tokens', 0, 500000 * tierMultiplier);
  const limit = baseLimit;
  const trend = newUser ? 0 : seededRandomInt(context.userId + 'trend', -10, 15);

  // Generate hourly data for chart
  const hourlyData = [];
  for (let i = 0; i < 24; i++) {
    const hourValue = newUser ? 0 : seededRandomInt(context.userId + 'hour' + i, 10000, 50000 * tierMultiplier);
    hourlyData.push({
      hour: i,
      value: hourValue
    });
  }

  return {
    totalTokens,
    limit,
    trend,
    hourlyData,
    costEstimate: newUser ? 0 : (totalTokens / 1000) * 0.002 * tierMultiplier
  };
};

/**
 * Generate user-specific deployment metrics
 * @returns Deployment metrics data
 */
export const generateUserDeploymentMetrics = () => {
  const context = getUserContext();
  if (!context) {
    throw new Error('User context not set');
  }

  // Initialize faker with user seed
  initializeUserSeed(context.userId);

  // Get tier multiplier for realistic data differences
  const tierMultiplier = getUserTierMultiplier();

  // Check if user is new
  const newUser = isNewUser(context);

  // Generate deployment metrics
  const totalDeployments = newUser ? 0 : seededRandomInt(context.userId + 'total-deployments', 1, 5 * tierMultiplier);
  const activeDeployments = newUser ? 0 : Math.min(totalDeployments, seededRandomInt(context.userId + 'active-deployments', 1, totalDeployments));

  // Generate regions data
  const regions = [];
  const regionNames = ['us-east', 'us-west', 'eu-west', 'ap-southeast'];

  // New users have no regions, existing users have at least one
  const numRegions = newUser ? 0 : seededRandomInt(context.userId + 'num-regions', 1, Math.min(4, tierMultiplier));

  for (let i = 0; i < numRegions; i++) {
    regions.push({
      region: regionNames[i],
      status: seededRandomInt(context.userId + 'region-status-' + i, 1, 10) > 1 ? 'operational' : 'degraded',
      latency: seededRandomInt(context.userId + 'region-latency-' + i, 50, 200),
      requests: seededRandomInt(context.userId + 'region-requests-' + i, 1000, 10000 * tierMultiplier),
      errors: seededRandomInt(context.userId + 'region-errors-' + i, 0, 100),
      availability: seededRandomFloat(context.userId + 'region-availability-' + i, 99.0, 100.0, 2)
    });
  }

  return {
    totalDeployments,
    activeDeployments,
    requestsPerSecond: newUser ? 0 : seededRandomInt(context.userId + 'rps', 10, 100 * tierMultiplier),
    regions,
    cpuUtilization: newUser ? 0 : seededRandomInt(context.userId + 'cpu', 10, 90),
    memoryUsage: newUser ? 0 : seededRandomInt(context.userId + 'memory', 10, 90),
    gpuUtilization: newUser ? 0 : seededRandomInt(context.userId + 'gpu', 10, 95),
    avgLatency: newUser ? 0 : seededRandomInt(context.userId + 'latency', 50, 300)
  };
};

/**
 * Generate user-specific fine-tuning data
 * @returns Fine-tuning data
 */
export const generateUserFineTuningData = () => {
  const context = getUserContext();
  if (!context) {
    throw new Error('User context not set');
  }

  // Initialize faker with user seed
  initializeUserSeed(context.userId);

  // Get tier multiplier for realistic data differences
  const tierMultiplier = getUserTierMultiplier();

  // Check if user is new
  const newUser = isNewUser(context);

  // New users have no jobs
  if (newUser) {
    return {
      jobs: [],
      totalJobs: 0,
      activeJobs: 0,
      completedJobs: 0,
      failedJobs: 0
    };
  }

  // Generate jobs for existing users
  const totalJobs = seededRandomInt(context.userId + 'total-jobs', 1, 5 * tierMultiplier);
  const jobs = [];

  let activeJobs = 0;
  let completedJobs = 0;
  let failedJobs = 0;

  for (let i = 0; i < totalJobs; i++) {
    const statusRoll = seededRandomInt(context.userId + 'job-status-' + i, 1, 10);
    let status;

    if (statusRoll <= 2) {
      status = 'queued';
      activeJobs++;
    } else if (statusRoll <= 4) {
      status = 'running';
      activeJobs++;
    } else if (statusRoll <= 9) {
      status = 'completed';
      completedJobs++;
    } else {
      status = 'failed';
      failedJobs++;
    }

    const progress = status === 'completed' ? 100 : status === 'failed' ? seededRandomInt(context.userId + 'job-progress-' + i, 10, 90) : seededRandomInt(context.userId + 'job-progress-' + i, 0, 99);

    jobs.push({
      id: `job-${context.userId}-${i}`,
      modelId: `model-${i % 3 + 1}`,
      modelName: ['ArtIntel-7B', 'ArtIntel-Vision', 'ArtIntel-Embedding'][i % 3],
      startTime: new Date(Date.now() - seededRandomInt(context.userId + 'job-time-' + i, 1, 30) * 86400000).toISOString(),
      status,
      progress,
      estimatedCompletion: status === 'completed' || status === 'failed' ? undefined : new Date(Date.now() + seededRandomInt(context.userId + 'job-eta-' + i, 1, 24) * 3600000).toISOString(),
      error: status === 'failed' ? 'Training diverged due to high learning rate' : undefined
    });
  }

  return {
    jobs,
    totalJobs,
    activeJobs,
    completedJobs,
    failedJobs
  };
};

/**
 * Generate user-specific alerts
 * @returns Alerts data
 */
export const generateUserAlerts = () => {
  const context = getUserContext();
  if (!context) {
    throw new Error('User context not set');
  }

  // Initialize faker with user seed
  initializeUserSeed(context.userId);

  // Check if user is new
  const newUser = isNewUser(context);

  // New users have no alerts
  if (newUser) {
    return {
      alerts: [],
      count: {
        info: 0,
        warning: 0,
        error: 0,
        critical: 0,
        total: 0
      }
    };
  }

  // Generate alerts for existing users
  const alertTypes = ['system', 'billing', 'security', 'performance'];
  const severities = ['info', 'warning', 'error', 'critical'];
  const alertCount = seededRandomInt(context.userId + 'alert-count', 0, 5);
  const alerts = [];

  const counts = {
    info: 0,
    warning: 0,
    error: 0,
    critical: 0,
    total: alertCount
  };

  for (let i = 0; i < alertCount; i++) {
    const type = alertTypes[seededRandomInt(context.userId + 'alert-type-' + i, 0, alertTypes.length - 1)];
    const severity = severities[seededRandomInt(context.userId + 'alert-severity-' + i, 0, severities.length - 1)];

    // Increment the count for this severity
    counts[severity as keyof typeof counts]++;

    alerts.push({
      id: `alert-${context.userId}-${i}`,
      timestamp: new Date(Date.now() - seededRandomInt(context.userId + 'alert-time-' + i, 0, 72) * 3600000).toISOString(),
      type,
      severity,
      title: `${severity.charAt(0).toUpperCase() + severity.slice(1)} Alert`,
      message: `This is a ${severity} ${type} alert for testing purposes.`,
      acknowledged: seededRandomInt(context.userId + 'alert-ack-' + i, 0, 1) === 1,
      resource: type === 'system' ? 'API Gateway' : undefined
    });
  }

  return {
    alerts,
    count: counts
  };
};

// Export all generator functions
export default {
  initializeUserSeed,
  isNewUser,
  generateUserSystemStatus,
  generateUserModelPerformance,
  generateUserTokenUsage,
  generateUserDeploymentMetrics,
  generateUserFineTuningData,
  generateUserAlerts
};
