import { Deployment, DeploymentConfig, DeploymentMetricsResponse } from '@/types/deployment';
import { USE_MOCK_API } from './dashboard-api';
import { getUserContext, seededRandomInt, seededRandomFloat } from './mock-user-context';
import { faker } from '@faker-js/faker';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// Mock data for deployments
const mockDeployments: Deployment[] = [
  {
    id: 'dep-1',
    name: 'GPT-4 Production API',
    model: 'GPT-4',
    modelType: 'platform',
    environment: 'production',
    status: 'running',
    region: 'us-east-1',
    version: '1.0.0',
    endpoint: 'https://api.example.com/v1/gpt4-prod',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metrics: {
      requestsPerSecond: 150,
      latency: 120,
      errorRate: 0.02,
      uptimePercentage: 99.9
    },
    resources: {
      cpuUsage: 65,
      memoryUsage: 78,
      gpuUsage: 82,
      instanceType: 'g4dn.xlarge',
      cost: 2.5
    }
  },
  {
    id: 'dep-2',
    name: 'BERT Sentiment Analysis',
    model: 'BERT Base',
    modelType: 'fine-tuned',
    environment: 'staging',
    status: 'stopped',
    region: 'eu-west-1',
    version: '2.1.0',
    endpoint: 'https://api.example.com/v1/bert-staging',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    metrics: {
      requestsPerSecond: 75,
      latency: 85,
      errorRate: 0.01,
      uptimePercentage: 99.95
    },
    resources: {
      cpuUsage: 45,
      memoryUsage: 60,
      gpuUsage: 55,
      instanceType: 'g4dn.large',
      cost: 1.8
    }
  }
];

// Mock metrics data
const mockMetricsData: DeploymentMetricsResponse = {
  totalDeployments: 8,
  activeDeployments: 5,
  cpuUtilization: 72,
  memoryUsage: 68,
  gpuUtilization: 75,
  totalRequests: 42500,
  averageLatency: 87,
  errorRate: 0.015,
  // Trend values
  totalDeploymentsTrend: 10,
  activeDeploymentsTrend: 5,
  modelVersionsTrend: 2,
  cpuUtilizationTrend: 8,
  memoryUsageTrend: 3,
  gpuUtilizationTrend: -2,
  regions: [
    {
      id: 'us-east-1',
      name: 'US East (N. Virginia)',
      deployments: 3,
      activeDeployments: 3,
      uptimePercentage: 99.95,
      uptime: 99.95,
      latency: 85,
      averageLatency: 85,
      health: 95,
      status: 'healthy',
      errorRate: 0.02,
      requestsPerSecond: 250,
      requestsPerMinute: 15000
    },
    {
      id: 'eu-west-1',
      name: 'EU West (Ireland)',
      deployments: 2,
      activeDeployments: 2,
      uptimePercentage: 99.98,
      uptime: 99.98,
      latency: 92,
      averageLatency: 92,
      health: 97,
      status: 'healthy',
      errorRate: 0.01,
      requestsPerSecond: 180,
      requestsPerMinute: 10800
    }
  ]
};

const formatStatus = (status: string | undefined) => {
  if (!status) return 'Unknown';
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

export async function getDeployments(): Promise<Deployment[]> {
  if (USE_MOCK_API) {
    // Get user context for user-specific data
    const userContext = getUserContext();

    if (userContext) {
      // Generate user-specific deployments
      const deploymentCount = userContext.tier === 'free'
        ? 1
        : userContext.tier === 'pro'
          ? 3
          : 5;

      const userDeployments: Deployment[] = [];

      for (let i = 0; i < deploymentCount; i++) {
        const id = `dep-${userContext.userId.substring(0, 8)}-${i}`;
        const status = i === 0 ? 'running' : i === deploymentCount - 1 ? 'stopped' : 'running';
        const modelTypes = ['platform', 'fine-tuned'];
        const modelType = modelTypes[i % modelTypes.length];
        const environments = ['production', 'staging', 'development'];
        const environment = environments[i % environments.length];
        const regions = ['us-east-1', 'eu-west-1', 'ap-southeast-1'];
        const region = regions[i % regions.length];

        userDeployments.push({
          id,
          name: `${userContext.fullName.split(' ')[0]}'s ${modelType === 'platform' ? 'Platform' : 'Fine-tuned'} Model ${i + 1}`,
          model: modelType === 'platform' ? ['GPT-4', 'BERT Base', 'ArtIntel-7B'][i % 3] : `Custom-${i}`,
          modelType,
          environment,
          status,
          region,
          version: `${seededRandomInt(userContext.userId + `version-${i}`, 1, 3)}.${seededRandomInt(userContext.userId + `subversion-${i}`, 0, 9)}.${seededRandomInt(userContext.userId + `patch-${i}`, 0, 9)}`,
          endpoint: `https://api.example.com/v1/${userContext.userId.substring(0, 8)}/${modelType}-${i}`,
          createdAt: new Date(Date.now() - i * 86400000 * (i + 1)).toISOString(),
          updatedAt: new Date(Date.now() - i * 3600000).toISOString(),
          metrics: {
            requestsPerSecond: status === 'running' ? seededRandomInt(userContext.userId + `rps-${i}`, 50, 200) : 0,
            latency: status === 'running' ? seededRandomInt(userContext.userId + `latency-${i}`, 70, 150) : 0,
            errorRate: status === 'running' ? seededRandomFloat(userContext.userId + `error-${i}`, 0.01, 0.03, 3) : 0,
            uptimePercentage: status === 'running' ? seededRandomFloat(userContext.userId + `uptime-${i}`, 99.5, 100, 2) : 0
          },
          resources: {
            cpuUsage: status === 'running' ? seededRandomInt(userContext.userId + `cpu-${i}`, 40, 80) : 0,
            memoryUsage: status === 'running' ? seededRandomInt(userContext.userId + `memory-${i}`, 50, 85) : 0,
            gpuUsage: status === 'running' ? seededRandomInt(userContext.userId + `gpu-${i}`, 60, 90) : 0,
            instanceType: ['g4dn.xlarge', 'g4dn.2xlarge', 'g5.xlarge'][i % 3],
            cost: status === 'running' ? seededRandomFloat(userContext.userId + `cost-${i}`, 1.5, 3.5, 1) : 0
          }
        });
      }

      return userDeployments;
    }

    // Fall back to mock data if no user context
    return mockDeployments;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/deployments`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch deployments: ${response.statusText}`);
  }

  return response.json();
}

export async function getDeploymentMetrics(): Promise<DeploymentMetricsResponse> {
  if (USE_MOCK_API) {
    // Get user context for user-specific data
    const userContext = getUserContext();

    if (userContext) {
      // Generate user-specific metrics
      const regions = [
        {
          id: 'us-east-1',
          name: 'US East (N. Virginia)',
          deployments: seededRandomInt(userContext.userId + 'us-east', 2, 5),
          activeDeployments: seededRandomInt(userContext.userId + 'us-east-active', 1, 3),
          uptimePercentage: seededRandomFloat(userContext.userId + 'us-east-uptime', 99.5, 100, 2),
          uptime: seededRandomFloat(userContext.userId + 'us-east-uptime', 99.5, 100, 2),
          latency: seededRandomInt(userContext.userId + 'us-east-latency', 70, 100),
          averageLatency: seededRandomInt(userContext.userId + 'us-east-avg-latency', 70, 100),
          health: seededRandomInt(userContext.userId + 'us-east-health', 90, 98),
          status: 'healthy',
          errorRate: seededRandomFloat(userContext.userId + 'us-east-error', 0.01, 0.03, 3),
          requestsPerSecond: seededRandomInt(userContext.userId + 'us-east-rps', 200, 300),
          requestsPerMinute: seededRandomInt(userContext.userId + 'us-east-rpm', 12000, 18000)
        },
        {
          id: 'eu-west-1',
          name: 'EU West (Ireland)',
          deployments: seededRandomInt(userContext.userId + 'eu-west', 1, 3),
          activeDeployments: seededRandomInt(userContext.userId + 'eu-west-active', 1, 2),
          uptimePercentage: seededRandomFloat(userContext.userId + 'eu-west-uptime', 99.7, 100, 2),
          uptime: seededRandomFloat(userContext.userId + 'eu-west-uptime', 99.7, 100, 2),
          latency: seededRandomInt(userContext.userId + 'eu-west-latency', 80, 110),
          averageLatency: seededRandomInt(userContext.userId + 'eu-west-avg-latency', 80, 110),
          health: seededRandomInt(userContext.userId + 'eu-west-health', 92, 99),
          status: 'healthy',
          errorRate: seededRandomFloat(userContext.userId + 'eu-west-error', 0.005, 0.02, 3),
          requestsPerSecond: seededRandomInt(userContext.userId + 'eu-west-rps', 150, 250),
          requestsPerMinute: seededRandomInt(userContext.userId + 'eu-west-rpm', 9000, 15000)
        }
      ];

      // Add a third region based on user tier
      if (userContext.tier === 'enterprise') {
        regions.push({
          id: 'ap-southeast-1',
          name: 'Asia Pacific (Singapore)',
          deployments: seededRandomInt(userContext.userId + 'ap-southeast', 1, 2),
          activeDeployments: seededRandomInt(userContext.userId + 'ap-southeast-active', 1, 1),
          uptimePercentage: seededRandomFloat(userContext.userId + 'ap-southeast-uptime', 99.6, 100, 2),
          uptime: seededRandomFloat(userContext.userId + 'ap-southeast-uptime', 99.6, 100, 2),
          latency: seededRandomInt(userContext.userId + 'ap-southeast-latency', 100, 130),
          averageLatency: seededRandomInt(userContext.userId + 'ap-southeast-avg-latency', 100, 130),
          health: seededRandomInt(userContext.userId + 'ap-southeast-health', 90, 97),
          status: 'healthy',
          errorRate: seededRandomFloat(userContext.userId + 'ap-southeast-error', 0.01, 0.03, 3),
          requestsPerSecond: seededRandomInt(userContext.userId + 'ap-southeast-rps', 100, 200),
          requestsPerMinute: seededRandomInt(userContext.userId + 'ap-southeast-rpm', 6000, 12000)
        });
      }

      const totalDeployments = regions.reduce((sum, region) => sum + region.deployments, 0);
      const activeDeployments = regions.reduce((sum, region) => sum + region.activeDeployments, 0);
      const totalRequests = regions.reduce((sum, region) => sum + region.requestsPerMinute, 0);

      // Generate trend values based on user ID
      const totalDeploymentsTrend = seededRandomInt(userContext.userId + 'total-trend', -5, 15);
      const activeDeploymentsTrend = seededRandomInt(userContext.userId + 'active-trend', -3, 10);
      const modelVersionsTrend = seededRandomInt(userContext.userId + 'model-trend', -2, 8);
      const cpuUtilizationTrend = seededRandomInt(userContext.userId + 'cpu-trend', -10, 10);
      const memoryUsageTrend = seededRandomInt(userContext.userId + 'memory-trend', -8, 12);
      const gpuUtilizationTrend = seededRandomInt(userContext.userId + 'gpu-trend', -15, 15);

      return {
        totalDeployments,
        activeDeployments,
        cpuUtilization: seededRandomInt(userContext.userId + 'cpu', 60, 80),
        memoryUsage: seededRandomInt(userContext.userId + 'memory', 55, 75),
        gpuUtilization: seededRandomInt(userContext.userId + 'gpu', 65, 85),
        totalRequests,
        averageLatency: Math.floor(regions.reduce((sum, region) => sum + region.averageLatency, 0) / regions.length),
        errorRate: seededRandomFloat(userContext.userId + 'error-rate', 0.01, 0.02, 3),
        // Add trend values
        totalDeploymentsTrend,
        activeDeploymentsTrend,
        modelVersionsTrend,
        cpuUtilizationTrend,
        memoryUsageTrend,
        gpuUtilizationTrend,
        regions
      };
    }

    // Fall back to mock data if no user context
    return mockMetricsData;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/deployments/metrics`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch deployment metrics: ${response.statusText}`);
  }

  return response.json();
}

export async function createDeployment(config: DeploymentConfig): Promise<Deployment> {
  if (USE_MOCK_API) {
    // Get user context for user-specific data
    const userContext = getUserContext();

    const id = userContext
      ? `dep-${userContext.userId.substring(0, 8)}-${Date.now().toString().substring(9, 13)}`
      : `dep-${Date.now()}`;

    const newDeployment: Deployment = {
      id,
      name: config.name,
      model: config.modelId,
      modelType: config.modelType,
      environment: config.environment,
      status: 'provisioning', // Start with provisioning status
      region: config.region,
      version: '1.0.0',
      endpoint: userContext
        ? `https://api.example.com/v1/${userContext.userId.substring(0, 8)}/${config.name.toLowerCase().replace(/\s+/g, '-')}`
        : `https://api.example.com/v1/${config.name.toLowerCase().replace(/\s+/g, '-')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metrics: {
        requestsPerSecond: 0,
        latency: 0,
        errorRate: 0,
        uptimePercentage: 100
      },
      resources: {
        cpuUsage: 0,
        memoryUsage: 0,
        gpuUsage: 0,
        instanceType: config.resources?.cpu || 'g4dn.xlarge',
        cost: 0
      }
    };

    // Add to mock deployments
    if (userContext) {
      // For user-specific deployments, we don't modify the global mock data
      // Instead, we'll return the new deployment directly
      // The next call to getDeployments will generate fresh user-specific deployments including this one

      // Simulate deployment creation delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Return with running status after the delay
      return {
        ...newDeployment,
        status: 'running',
        updatedAt: new Date().toISOString()
      };
    } else {
      // For non-user-specific deployments, add to the global mock data
      mockDeployments.push(newDeployment);
      return newDeployment;
    }
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/deployments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create deployment');
  }

  return response.json();
}

export async function updateDeploymentStatus(
  deploymentId: string,
  newStatus: Deployment['status']
): Promise<Deployment> {
  if (USE_MOCK_API) {
    const deployment = mockDeployments.find(d => d.id === deploymentId);
    if (!deployment) {
      throw new Error('Deployment not found');
    }

    deployment.status = newStatus;
    deployment.updatedAt = new Date().toISOString();
    return deployment;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/deployments/${deploymentId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update deployment status');
  }

  return response.json();
}

// Delete deployment
export const deleteDeployment = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const index = mockDeployments.findIndex(d => d.id === id);
  if (index === -1) {
    throw new Error('Deployment not found');
  }

  mockDeployments.splice(index, 1);
};
