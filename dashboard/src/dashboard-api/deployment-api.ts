import { Deployment, DeploymentConfig, DeploymentMetricsResponse } from '@/types/deployment';
import { USE_MOCK_API } from './dashboard-api';

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
    const newDeployment: Deployment = {
      id: `dep-${Date.now()}`,
      name: config.name,
      model: config.modelId,
      modelType: config.modelType,
      environment: config.environment,
      status: 'running',
      region: config.region,
      version: '1.0.0',
      endpoint: `https://api.example.com/v1/${config.name.toLowerCase().replace(/\s+/g, '-')}`,
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
        instanceType: 'g4dn.xlarge',
        cost: 0
      }
    };

    mockDeployments.push(newDeployment);
    return newDeployment;
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
