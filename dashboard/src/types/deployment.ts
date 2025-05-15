// Deployment Types
export interface Deployment {
  id: string;
  name: string;
  model: string;
  modelType: 'fine-tuned' | 'platform';
  environment: 'development' | 'staging' | 'production';
  status: 'running' | 'stopped' | 'failed' | 'scaling';
  region: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  metrics: DeploymentMetrics;
  resources: DeploymentResources;
  endpoint?: string;
}

export interface DeploymentMetrics {
  requestsPerSecond: number;
  latency: number;
  errorRate: number;
  uptimePercentage: number;
}

export interface DeploymentResources {
  cpuUsage: number;
  memoryUsage: number;
  gpuUsage?: number;
  instanceType: string;
  cost: number;
}

export interface DeploymentRegion {
  id: string;
  name: string;
  deployments: number;
  activeDeployments: number;
  uptimePercentage: number;
  uptime: number;
  latency: number;
  averageLatency: number;
  health: number;
  status: 'healthy' | 'degraded' | 'down';
  errorRate: number;
  requestsPerSecond: number;
  requestsPerMinute: number;
}

export interface DeploymentMetricsResponse {
  totalDeployments: number;
  activeDeployments: number;
  regions: DeploymentRegion[];
  cpuUtilization: number;
  memoryUsage: number;
  gpuUtilization: number;
  totalRequests?: number;
  averageLatency?: number;
  errorRate?: number;
  // Trend values (percentage change)
  totalDeploymentsTrend?: number;
  activeDeploymentsTrend?: number;
  modelVersionsTrend?: number;
  cpuUtilizationTrend?: number;
  memoryUsageTrend?: number;
  gpuUtilizationTrend?: number;
}

export interface DeploymentConfig {
  name: string;
  modelId: string;
  modelType: 'fine-tuned' | 'platform';
  environment: 'development' | 'staging' | 'production';
  region: string;
  resources: {
    cpu: string;
    memory: string;
    gpu: string;
  };
  scaling: {
    minInstances: number;
    maxInstances: number;
    targetConcurrency: number;
  };
  authentication: {
    type: 'api_key' | 'oauth2';
  };
}