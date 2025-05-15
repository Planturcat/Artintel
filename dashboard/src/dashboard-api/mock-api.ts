/**
 * Artintel Dashboard Mock API Client
 * This file provides mock implementations of the dashboard API endpoints.
 * It can be used during development and testing when the real API is not available.
 */

import { faker } from '@faker-js/faker';
import {
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
  FineTuningJob,
  Alert,
  Activity,
  Model,
  DeploymentRegion,
  TokenUsageTimelinePoint
} from './dashboard-api';

// Seed value for consistent random data
faker.seed(123);

// -------------------- Mock Data Generators --------------------

/**
 * Generate a mock system status component
 */
const generateSystemStatusComponent = (name: string, isHealthy: boolean = true): SystemStatusComponent => {
  const statuses = isHealthy 
    ? ['operational', 'operational', 'operational', 'degraded'] 
    : ['operational', 'degraded', 'degraded', 'outage'];
  
  return {
    name,
    status: faker.helpers.arrayElement(statuses) as 'operational' | 'degraded' | 'outage',
    uptime: isHealthy ? faker.number.float({ min: 99.5, max: 100, precision: 0.01 }) : faker.number.float({ min: 95, max: 99.5, precision: 0.01 })
  };
};

/**
 * Generate a mock fine-tuning job
 */
const generateFineTuningJob = (id: string, status: 'running' | 'completed' | 'failed' = 'running'): FineTuningJob => {
  const baseModel = faker.helpers.arrayElement(['ArtIntel-7B', 'ArtIntel-13B', 'ArtIntel-34B']);
  const progress = status === 'completed' ? 100 : status === 'failed' ? faker.number.int({ min: 10, max: 90 }) : faker.number.int({ min: 10, max: 95 });
  const epoch = status === 'completed' ? 10 : Math.floor((progress / 100) * 10);
  
  const startTime = faker.date.recent({ days: 3 }).toISOString();
  const completionTime = status === 'completed' ? faker.date.recent({ days: 1 }).toISOString() : undefined;
  
  return {
    id,
    modelName: `${faker.commerce.productAdjective()}-${faker.animal.type()}-Assistant`,
    baseModel,
    progress,
    status,
    startTime,
    estimatedCompletion: status === 'running' ? faker.date.soon({ days: 1 }).toISOString() : undefined,
    completionTime,
    metrics: {
      epoch,
      totalEpochs: 10,
      lossValue: faker.number.float({ min: 0.05, max: 0.2, precision: 0.001 }),
      learningRate: 0.0001
    },
    cost: status === 'completed' 
      ? { total: faker.number.float({ min: 50, max: 120, precision: 0.1 }) }
      : { 
          current: faker.number.float({ min: 20, max: 60, precision: 0.1 }),
          estimated: faker.number.float({ min: 60, max: 100, precision: 0.1 })
        }
  };
};

/**
 * Generate a mock alert
 */
const generateAlert = (id: string, severityOverride?: 'info' | 'warning' | 'error' | 'critical'): Alert => {
  const severity = severityOverride || faker.helpers.arrayElement(['info', 'info', 'info', 'warning', 'warning', 'error']) as 'info' | 'warning' | 'error' | 'critical';
  const component = faker.helpers.arrayElement(['API Gateway', 'Inference Engine', 'Database', 'Training Service', 'Storage', 'Billing', 'Authentication']);
  
  let title: string;
  let message: string;
  let metadata: Record<string, any> = {};
  
  switch (severity) {
    case 'info':
      title = faker.helpers.arrayElement([
        'System Update Completed',
        'Approaching Token Limit',
        'Model Deployment Successful',
        'New Feature Available'
      ]);
      message = faker.helpers.arrayElement([
        'System update completed successfully',
        'Your project is approaching the monthly token limit (70% used)',
        'Model deployed successfully to production',
        'New fine-tuning feature is now available'
      ]);
      break;
    case 'warning':
      title = faker.helpers.arrayElement([
        'High Latency Detected',
        'Approaching Storage Limit',
        'Resource Utilization High'
      ]);
      message = faker.helpers.arrayElement([
        'High latency detected in EU-West region',
        'Storage usage approaching 85% of allocated limit',
        'CPU utilization above 75% for past 30 minutes'
      ]);
      metadata = {
        region: 'eu-west',
        latency: faker.number.int({ min: 250, max: 500 }),
        threshold: 200
      };
      break;
    case 'error':
      title = faker.helpers.arrayElement([
        'API Rate Limit Exceeded',
        'Database Connection Failed',
        'Model Inference Error'
      ]);
      message = faker.helpers.arrayElement([
        'API rate limit exceeded for your tier',
        'Database connection failed multiple times',
        'Model inference errors increased by 200%'
      ]);
      break;
    case 'critical':
      title = faker.helpers.arrayElement([
        'Service Outage Detected',
        'Security Breach Detected',
        'Critical System Failure'
      ]);
      message = faker.helpers.arrayElement([
        'Service outage detected in multiple regions',
        'Potential security breach detected',
        'Critical system failure affects all services'
      ]);
      break;
  }
  
  return {
    id,
    title,
    message,
    severity,
    timestamp: faker.date.recent({ days: 1 }).toISOString(),
    status: faker.helpers.arrayElement(['active', 'active', 'active', 'resolved']) as 'active' | 'resolved',
    component,
    metadata
  };
};

/**
 * Generate a mock activity
 */
const generateActivity = (id: string): Activity => {
  const type = faker.helpers.arrayElement(['deployment', 'user', 'alert', 'system', 'billing']) as 'deployment' | 'user' | 'alert' | 'system' | 'billing';
  const severity = faker.helpers.arrayElement(['info', 'info', 'info', 'warning', 'warning', 'error']) as 'info' | 'warning' | 'error' | 'critical';
  const user = faker.internet.email();
  let message: string;
  let metadata: Record<string, any> = {};
  
  switch (type) {
    case 'deployment':
      message = `${faker.helpers.arrayElement(['ArtIntel-7B', 'ArtIntel-Vision', 'ArtIntel-Code', 'ArtIntel-Assistant'])} model deployed to ${faker.helpers.arrayElement(['production', 'staging', 'testing'])}`;
      metadata = {
        modelId: `model-${faker.number.int({ min: 1, max: 10 })}`,
        environment: 'production',
        region: faker.helpers.arrayElement(['us-east', 'eu-west', 'asia-east'])
      };
      break;
    case 'user':
      message = `${faker.person.fullName()} ${faker.helpers.arrayElement(['updated API key permissions', 'created a new model', 'modified team access', 'updated account settings'])}`;
      metadata = {
        keyId: `key-${faker.number.int({ min: 100, max: 999 })}`,
        actions: ['updated_permissions']
      };
      break;
    case 'alert':
      message = generateAlert(`alert-${faker.number.int({ min: 100, max: 999 })}`).message;
      metadata = {
        alertId: `alert-${faker.number.int({ min: 100, max: 999 })}`
      };
      break;
    case 'system':
      message = `${faker.helpers.arrayElement(['Scheduled maintenance completed', 'System update applied', 'New feature rollout', 'Security patch applied'])}`;
      break;
    case 'billing':
      message = `${faker.helpers.arrayElement(['Monthly invoice generated', 'Payment processed', 'Subscription renewed', 'Plan upgraded'])}`;
      metadata = {
        amount: faker.finance.amount(50, 500, 2)
      };
      break;
  }
  
  return {
    id,
    type,
    message,
    timestamp: faker.date.recent({ days: 2 }).toISOString(),
    severity,
    user: type === 'user' ? user : undefined,
    metadata
  };
};

/**
 * Generate a mock model
 */
const generateModel = (id: string): Model => {
  const types = ['Foundational LLM', 'Fine-tuned', 'Multimodal', 'Code Generator', 'Chat', 'Text2SQL'];
  const type = faker.helpers.arrayElement(types);
  const status = faker.helpers.arrayElement(['running', 'running', 'running', 'paused', 'error']) as 'running' | 'paused' | 'error';
  const name = `ArtIntel-${type === 'Foundational LLM' ? faker.number.int({ min: 1, max: 70 }) + 'B' : faker.helpers.arrayElement(['Vision', 'Code', 'Assistant', 'Chat', 'Text', 'SQL'])}`;
  
  return {
    id,
    name,
    type,
    status,
    metrics: {
      tokens: faker.number.int({ min: 100, max: 2000 }) * 1000000,
      latency: faker.number.int({ min: 50, max: 500 }),
      cost: `$${faker.number.float({ min: 0.05, max: 0.25, precision: 0.01 })}/1K tokens`
    },
    description: `${type} model for ${faker.company.buzzPhrase()}`,
    updated: faker.date.recent({ days: 7 }).toISOString(),
    version: `${faker.number.int({ min: 0, max: 3 })}.${faker.number.int({ min: 0, max: 9 })}.${faker.number.int({ min: 0, max: 9 })}`
  };
};

/**
 * Generate a mock deployment region
 */
const generateDeploymentRegion = (name: string): DeploymentRegion => {
  return {
    name,
    deployments: faker.number.int({ min: 1, max: 5 }),
    uptimePercentage: faker.number.float({ min: 99.5, max: 100, precision: 0.01 }),
    latency: faker.number.int({ min: 100, max: 300 })
  };
};

/**
 * Generate token usage timeline
 */
const generateTokenUsageTimeline = (
  timeframe: string = 'day',
  granularity: string = 'hour'
): TokenUsageTimelinePoint[] => {
  let points: TokenUsageTimelinePoint[] = [];
  let count = timeframe === 'day' ? 24 : timeframe === 'week' ? 7 : 30;
  const now = new Date();
  
  if (granularity === 'hour') {
    for (let i = 0; i < count; i++) {
      const date = new Date(now);
      date.setHours(now.getHours() - i);
      points.push({
        timestamp: date.toISOString(),
        tokens: faker.number.int({ min: 800000, max: 1500000 })
      });
    }
  } else if (granularity === 'day') {
    for (let i = 0; i < count; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      points.push({
        timestamp: date.toISOString(),
        tokens: faker.number.int({ min: 10000000, max: 25000000 })
      });
    }
  } else {
    for (let i = 0; i < count; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() - (i * 7));
      points.push({
        timestamp: date.toISOString(),
        tokens: faker.number.int({ min: 50000000, max: 120000000 })
      });
    }
  }
  
  return points.reverse();
};

// -------------------- Mock API Implementations --------------------

/**
 * Get mock system status information
 */
export const mockGetSystemStatus = (): Promise<SystemStatusResponse> => {
  const components = [
    generateSystemStatusComponent('API Gateway', true),
    generateSystemStatusComponent('Inference Engine', true),
    generateSystemStatusComponent('Database', true),
    generateSystemStatusComponent('Training Service', false),
    generateSystemStatusComponent('Storage', true)
  ];
  
  // Overall status is based on component status
  let status: 'healthy' | 'degraded' | 'critical' = 'healthy';
  if (components.some(c => c.status === 'outage')) {
    status = 'critical';
  } else if (components.some(c => c.status === 'degraded')) {
    status = 'degraded';
  }
  
  return Promise.resolve({
    status,
    components,
    timestamp: new Date().toISOString()
  });
};

/**
 * Get mock resource utilization metrics
 */
export const mockGetResourceUtilization = (
  timeframe: string = 'hour'
): Promise<ResourceUtilizationResponse> => {
  return Promise.resolve({
    cpuUtilization: faker.number.int({ min: 30, max: 80 }),
    memoryUsage: faker.number.int({ min: 50, max: 90 }),
    storageUsage: faker.number.int({ min: 20, max: 60 }),
    gpuUtilization: faker.number.int({ min: 40, max: 90 }),
    timestamp: new Date().toISOString(),
    timeframe
  });
};

/**
 * Get mock model performance metrics
 */
export const mockGetModelPerformance = (
  modelId?: string,
  timeframe: string = 'day'
): Promise<ModelPerformanceResponse> => {
  const models = [
    {
      id: 'model-1',
      name: 'ArtIntel-7B',
      type: 'Foundational LLM',
      metrics: {
        accuracy: faker.number.float({ min: 0.85, max: 0.95, precision: 0.01 }),
        latency: faker.number.int({ min: 200, max: 300 }),
        throughput: faker.number.float({ min: 40, max: 50, precision: 0.1 }),
        errorRate: faker.number.float({ min: 0.02, max: 0.05, precision: 0.01 })
      },
      comparison: {
        lastWeek: {
          accuracy: faker.number.float({ min: 0.82, max: 0.92, precision: 0.01 }),
          latency: faker.number.int({ min: 220, max: 320 }),
          throughput: faker.number.float({ min: 35, max: 45, precision: 0.1 }),
          errorRate: faker.number.float({ min: 0.03, max: 0.07, precision: 0.01 })
        }
      }
    },
    {
      id: 'model-2',
      name: 'ArtIntel-Vision',
      type: 'Multimodal',
      metrics: {
        accuracy: faker.number.float({ min: 0.80, max: 0.90, precision: 0.01 }),
        latency: faker.number.int({ min: 400, max: 500 }),
        throughput: faker.number.float({ min: 30, max: 35, precision: 0.1 }),
        errorRate: faker.number.float({ min: 0.04, max: 0.08, precision: 0.01 })
      },
      comparison: {
        lastWeek: {
          accuracy: faker.number.float({ min: 0.75, max: 0.85, precision: 0.01 }),
          latency: faker.number.int({ min: 420, max: 550 }),
          throughput: faker.number.float({ min: 25, max: 30, precision: 0.1 }),
          errorRate: faker.number.float({ min: 0.05, max: 0.09, precision: 0.01 })
        }
      }
    }
  ];
  
  // Filter by model ID if provided
  const filteredModels = modelId ? models.filter(m => m.id === modelId) : models;
  
  // Calculate aggregated metrics
  const accuracySum = filteredModels.reduce((sum, model) => sum + model.metrics.accuracy, 0);
  const latencySum = filteredModels.reduce((sum, model) => sum + model.metrics.latency, 0);
  const throughputSum = filteredModels.reduce((sum, model) => sum + model.metrics.throughput, 0);
  const errorRateSum = filteredModels.reduce((sum, model) => sum + model.metrics.errorRate, 0);
  
  const count = filteredModels.length;
  
  return Promise.resolve({
    models: filteredModels,
    aggregated: {
      averageAccuracy: count > 0 ? accuracySum / count : 0,
      averageLatency: count > 0 ? latencySum / count : 0,
      totalThroughput: throughputSum,
      averageErrorRate: count > 0 ? errorRateSum / count : 0
    },
    timestamp: new Date().toISOString()
  });
};

/**
 * Get mock fine-tuning progress information
 */
export const mockGetFineTuningProgress = (
  jobId?: string,
  status?: 'running' | 'completed' | 'failed'
): Promise<FineTuningResponse> => {
  let jobs: FineTuningJob[] = [
    generateFineTuningJob('ft-job-123', 'running'),
    generateFineTuningJob('ft-job-124', 'completed'),
    generateFineTuningJob('ft-job-125', 'failed')
  ];
  
  // Filter by job ID if provided
  if (jobId) {
    jobs = jobs.filter(job => job.id === jobId);
  }
  
  // Filter by status if provided
  if (status) {
    jobs = jobs.filter(job => job.status === status);
  }
  
  return Promise.resolve({
    jobs,
    timestamp: new Date().toISOString()
  });
};

/**
 * Get mock deployment metrics
 */
export const mockGetDeploymentMetrics = (
  timeframe: string = 'day'
): Promise<DeploymentMetricsResponse> => {
  const regions = [
    generateDeploymentRegion('us-east'),
    generateDeploymentRegion('eu-west'),
    generateDeploymentRegion('asia-east')
  ];
  
  const totalDeployments = regions.reduce((sum, region) => sum + region.deployments, 0);
  
  return Promise.resolve({
    totalDeployments,
    activeDeployments: faker.number.int({ min: totalDeployments - 4, max: totalDeployments }),
    regions,
    cpuUtilization: faker.number.int({ min: 40, max: 60 }),
    memoryUsage: faker.number.int({ min: 50, max: 70 }),
    gpuUtilization: faker.number.int({ min: 60, max: 80 }),
    performance: {
      p50Latency: faker.number.int({ min: 120, max: 180 }),
      p95Latency: faker.number.int({ min: 200, max: 250 }),
      p99Latency: faker.number.int({ min: 300, max: 400 }),
      requestsPerSecond: faker.number.int({ min: 200, max: 300 })
    },
    timestamp: new Date().toISOString()
  });
};

/**
 * Get mock token usage statistics
 */
export const mockGetTokenUsage = (
  timeframe: string = 'day',
  granularity: string = 'hour'
): Promise<TokenUsageResponse> => {
  const totalTokens = faker.number.int({ min: 20000000, max: 28000000 });
  const limit = 35000000;
  const percentageUsed = Math.round((totalTokens / limit) * 100);
  
  // Breakdown of token usage
  const inference = Math.round(totalTokens * faker.number.float({ min: 0.65, max: 0.75 }));
  const training = Math.round(totalTokens * faker.number.float({ min: 0.15, max: 0.25 }));
  const embedding = totalTokens - inference - training;
  
  // Cost calculation
  const inferenceCost = Math.round(inference / 1000000 * 7) / 10;
  const trainingCost = Math.round(training / 1000000 * 15) / 10;
  const storageCost = faker.number.float({ min: 18, max: 25, precision: 0.01 });
  const totalCost = inferenceCost + trainingCost + storageCost;
  
  return Promise.resolve({
    totalTokens,
    limit,
    percentageUsed,
    breakdown: {
      inference,
      training,
      embedding
    },
    timeline: generateTokenUsageTimeline(timeframe, granularity),
    cost: {
      total: totalCost,
      inference: inferenceCost,
      training: trainingCost,
      storage: storageCost
    },
    timestamp: new Date().toISOString()
  });
};

/**
 * Get mock system alerts
 */
export const mockGetAlerts = (
  severity?: 'info' | 'warning' | 'error' | 'critical',
  limit: number = 20
): Promise<AlertsResponse> => {
  let alerts: Alert[] = [
    generateAlert('alert-789', 'warning'),
    generateAlert('alert-790', 'info'),
    generateAlert('alert-791', 'info'),
    generateAlert('alert-792', 'error'),
    generateAlert('alert-793', 'info'),
    generateAlert('alert-794', 'warning'),
    generateAlert('alert-795', 'info'),
    generateAlert('alert-796', 'info'),
    generateAlert('alert-797', 'info'),
    generateAlert('alert-798', 'info'),
    generateAlert('alert-799', 'info'),
    generateAlert('alert-800', 'info')
  ];
  
  // Filter by severity if provided
  if (severity) {
    alerts = alerts.filter(alert => alert.severity === severity);
  }
  
  // Limit the number of alerts
  alerts = alerts.slice(0, limit);
  
  // Count by severity
  const infoCount = alerts.filter(alert => alert.severity === 'info').length;
  const warningCount = alerts.filter(alert => alert.severity === 'warning').length;
  const errorCount = alerts.filter(alert => alert.severity === 'error').length;
  const criticalCount = alerts.filter(alert => alert.severity === 'critical').length;
  
  return Promise.resolve({
    alerts,
    total: alerts.length,
    unread: faker.number.int({ min: 1, max: 5 }),
    criticalCount,
    errorCount,
    warningCount,
    infoCount,
    timestamp: new Date().toISOString()
  });
};

/**
 * Get mock activity feed
 */
export const mockGetActivityFeed = (
  type?: 'deployment' | 'user' | 'alert' | 'system' | 'billing',
  limit: number = 20,
  offset: number = 0
): Promise<ActivityResponse> => {
  let activities: Activity[] = [
    generateActivity('act-456'),
    generateActivity('act-457'),
    generateActivity('act-458'),
    generateActivity('act-459'),
    generateActivity('act-460'),
    generateActivity('act-461'),
    generateActivity('act-462'),
    generateActivity('act-463'),
    generateActivity('act-464'),
    generateActivity('act-465'),
    generateActivity('act-466'),
    generateActivity('act-467'),
    generateActivity('act-468'),
    generateActivity('act-469'),
    generateActivity('act-470'),
    generateActivity('act-471'),
    generateActivity('act-472'),
    generateActivity('act-473'),
    generateActivity('act-474'),
    generateActivity('act-475'),
    generateActivity('act-476'),
    generateActivity('act-477'),
    generateActivity('act-478'),
    generateActivity('act-479'),
    generateActivity('act-480')
  ];
  
  // Filter by type if provided
  if (type) {
    activities = activities.filter(activity => activity.type === type);
  }
  
  // Apply pagination
  activities = activities.slice(offset, offset + limit);
  
  return Promise.resolve({
    activities,
    total: 127, // Total count, not just the currently returned items
    timestamp: new Date().toISOString()
  });
};

/**
 * Get mock models information
 */
export const mockGetModels = (
  status?: 'running' | 'paused' | 'error',
  type?: string
): Promise<ModelsResponse> => {
  let models: Model[] = [
    generateModel('model-1'),
    generateModel('model-2'),
    generateModel('model-3'),
    generateModel('model-4')
  ];
  
  // Filter by status if provided
  if (status) {
    models = models.filter(model => model.status === status);
  }
  
  // Filter by type if provided
  if (type) {
    models = models.filter(model => model.type === type);
  }
  
  // Count by status
  const running = models.filter(model => model.status === 'running').length;
  const paused = models.filter(model => model.status === 'paused').length;
  
  return Promise.resolve({
    models,
    total: models.length,
    running,
    paused,
    timestamp: new Date().toISOString()
  });
}; 