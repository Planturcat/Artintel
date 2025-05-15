import { ApiResponse } from '../types/api';
import { getUserContext } from './mock-user-context';

export interface SystemHealth {
  cpu: number;
  memory: number;
  gpu: number;
  storage: number;
  network: number;
  details: {
    cpuCores: number;
    cpuThreads: number;
    totalMemory: number;
    freeMemory: number;
    gpuModel: string;
    gpuMemory: number;
    diskTotal: number;
    diskFree: number;
    networkIn: number;
    networkOut: number;
  };
}

export interface MetricPoint {
  timestamp: string;
  value: number;
}

export interface ModelMetrics {
  accuracy: number;
  latency: number;
  throughput: number;
  driftScore: number;
  details: {
    precisionByClass: Record<string, number>;
    recallByClass: Record<string, number>;
    f1ScoreByClass: Record<string, number>;
    confusionMatrix: number[][];
    rocCurve: { fpr: number; tpr: number }[];
    prCurve: { precision: number; recall: number }[];
  };
}

export interface Alert {
  id: number;
  severity: 'high' | 'medium' | 'low';
  message: string;
  timestamp: string;
  details: {
    component: string;
    threshold: number;
    currentValue: number;
    duration: number;
    affectedModels?: string[];
    recommendations: string[];
  };
}

export interface ResourceUsage {
  modelId: string;
  modelName: string;
  cpuUsage: number;
  memoryUsage: number;
  gpuUsage: number;
  requestCount: number;
  errorCount: number;
  avgLatency: number;
  p95Latency: number;
  p99Latency: number;
}

export interface MonitoringMetrics {
  systemHealth: SystemHealth;
  responseTime: MetricPoint[];
  throughput: MetricPoint[];
  errorRates: MetricPoint[];
  modelMetrics: ModelMetrics;
  alerts: Alert[];
  resourceUsage: ResourceUsage[];
}

export interface DetailedChartData {
  title: string;
  subtitle: string;
  data: {
    name: string;
    value: number;
    timestamp?: string;
  }[];
  type: 'line' | 'area' | 'bar' | 'pie';
  metrics?: {
    current: number;
    previous: number;
    change: number;
  };
}

export interface DetailedCardData {
  title: string;
  subtitle: string;
  charts: DetailedChartData[];
  metrics: Record<string, {
    value: number;
    unit: string;
    change: number;
  }>;
}

// Mock data objects
const mockSystemHealth: SystemHealth = {
  cpu: 45,
  memory: 62,
  gpu: 78,
  storage: 34,
  network: 56,
  details: {
    cpuCores: 32,
    cpuThreads: 64,
    totalMemory: 256,
    freeMemory: 97,
    gpuModel: 'NVIDIA A100',
    gpuMemory: 80,
    diskTotal: 2000,
    diskFree: 1320,
    networkIn: 1250,
    networkOut: 890
  }
};

const mockModelMetrics: ModelMetrics = {
  accuracy: 0.92,
  latency: 245,
  throughput: 1250,
  driftScore: 0.03,
  details: {
    precisionByClass: {
      'class_0': 0.95,
      'class_1': 0.89,
      'class_2': 0.91
    },
    recallByClass: {
      'class_0': 0.93,
      'class_1': 0.88,
      'class_2': 0.90
    },
    f1ScoreByClass: {
      'class_0': 0.94,
      'class_1': 0.88,
      'class_2': 0.90
    },
    confusionMatrix: [
      [950, 30, 20],
      [25, 880, 95],
      [15, 85, 900]
    ],
    rocCurve: Array.from({ length: 100 }, (_, i) => ({
      fpr: i / 100,
      tpr: Math.min(1, (i / 100) * 1.2 + Math.random() * 0.1)
    })),
    prCurve: Array.from({ length: 100 }, (_, i) => ({
      precision: 1 - (i / 100) * 0.3 + Math.random() * 0.05,
      recall: i / 100
    }))
  }
};

const mockAlerts: Alert[] = [
  {
    id: 1,
    severity: 'high',
    message: 'High GPU memory usage detected',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    details: {
      component: 'GPU',
      threshold: 80,
      currentValue: 92,
      duration: 300,
      affectedModels: ['gpt-4-ft', 'bert-qa'],
      recommendations: [
        'Scale down batch size',
        'Distribute load across multiple GPUs',
        'Terminate non-critical inference jobs'
      ]
    }
  },
  {
    id: 2,
    severity: 'medium',
    message: 'Increased error rate in production model',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    details: {
      component: 'Model Inference',
      threshold: 0.05,
      currentValue: 0.08,
      duration: 900,
      affectedModels: ['bert-qa'],
      recommendations: [
        'Check input data quality',
        'Review recent model updates',
        'Monitor system resources'
      ]
    }
  },
  {
    id: 3,
    severity: 'low',
    message: 'Minor data drift detected in input features',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    details: {
      component: 'Data Quality',
      threshold: 0.1,
      currentValue: 0.12,
      duration: 1800,
      affectedModels: ['gpt-4-ft'],
      recommendations: [
        'Review input data distribution',
        'Consider model retraining',
        'Monitor prediction confidence'
      ]
    }
  }
];

const mockResourceUsage: ResourceUsage[] = [
  {
    modelId: 'gpt-4-ft',
    modelName: 'GPT-4 Fine-tuned',
    cpuUsage: 45,
    memoryUsage: 62,
    gpuUsage: 78,
    requestCount: 15000,
    errorCount: 75,
    avgLatency: 245,
    p95Latency: 320,
    p99Latency: 450
  },
  {
    modelId: 'bert-qa',
    modelName: 'BERT QA Model',
    cpuUsage: 35,
    memoryUsage: 48,
    gpuUsage: 65,
    requestCount: 25000,
    errorCount: 125,
    avgLatency: 180,
    p95Latency: 250,
    p99Latency: 350
  }
];

const generateMetricPoints = (hours: number, baseValue: number, variance: number): MetricPoint[] => {
  return Array.from({ length: hours }, (_, i) => ({
    timestamp: new Date(Date.now() - (hours - i) * 3600000).toISOString(),
    value: baseValue + Math.random() * variance + Math.sin(i / 2) * (variance / 2)
  }));
};

const generateDetailedChartData = (type: string, hours: number): DetailedChartData[] => {
  const charts: DetailedChartData[] = [];

  switch (type) {
    case 'system':
      // Resource Usage Chart
      charts.push({
        title: 'Resource Usage Over Time',
        subtitle: 'CPU, Memory, and GPU utilization',
        type: 'line',
        data: Array.from({ length: hours }, (_, i) => {
          const timestamp = new Date(Date.now() - (hours - i) * 3600000).toISOString();
          return {
            name: timestamp,
            value: 45 + Math.random() * 20,
            timestamp
          };
        })
      });

      // Network Traffic Chart
      charts.push({
        title: 'Network Traffic',
        subtitle: 'Inbound and Outbound traffic',
        type: 'area',
        data: Array.from({ length: hours }, (_, i) => {
          const timestamp = new Date(Date.now() - (hours - i) * 3600000).toISOString();
          return {
            name: timestamp,
            value: 1250 + Math.random() * 500,
            timestamp
          };
        })
      });
      break;

    case 'model':
      // Model Performance Chart
      charts.push({
        title: 'Model Performance Metrics',
        subtitle: 'Accuracy and Loss over time',
        type: 'line',
        data: Array.from({ length: hours }, (_, i) => {
          const timestamp = new Date(Date.now() - (hours - i) * 3600000).toISOString();
          return {
            name: timestamp,
            value: 0.92 + Math.random() * 0.05,
            timestamp
          };
        })
      });

      // Inference Metrics Chart
      charts.push({
        title: 'Inference Metrics',
        subtitle: 'Latency and Throughput',
        type: 'area',
        data: Array.from({ length: hours }, (_, i) => {
          const timestamp = new Date(Date.now() - (hours - i) * 3600000).toISOString();
          return {
            name: timestamp,
            value: 245 + Math.random() * 50,
            timestamp
          };
        })
      });
      break;

    case 'resource':
      // Resource Consumption Chart
      charts.push({
        title: 'Resource Consumption',
        subtitle: 'CPU, Memory, and GPU usage by model',
        type: 'line',
        data: Array.from({ length: hours }, (_, i) => {
          const timestamp = new Date(Date.now() - (hours - i) * 3600000).toISOString();
          return {
            name: timestamp,
            value: 45 + Math.random() * 20,
            timestamp
          };
        })
      });

      // Request Distribution Chart
      charts.push({
        title: 'Request Distribution',
        subtitle: 'Success vs Error rate',
        type: 'pie',
        data: [
          { name: 'Successful', value: 14850 },
          { name: 'Failed', value: 150 }
        ]
      });
      break;
  }

  return charts;
};

export const getMonitoringMetrics = async (timeRange: '1h' | '24h' | '7d' | '30d' = '24h', userId?: string): Promise<MonitoringMetrics> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Get user context for user-specific data
  const userContext = getUserContext();

  // If no user context or new user, return empty metrics
  if (!userContext || userContext.userId.startsWith('new-user') || (userId && userId.startsWith('new-user'))) {
    return {
      systemHealth: {
        cpu: 0,
        memory: 0,
        gpu: 0,
        storage: 0,
        network: 0,
        details: {
          cpuCores: 0,
          cpuThreads: 0,
          totalMemory: 0,
          freeMemory: 0,
          gpuModel: '',
          gpuMemory: 0,
          diskTotal: 0,
          diskFree: 0,
          networkIn: 0,
          networkOut: 0
        }
      },
      responseTime: [],
      throughput: [],
      errorRates: [],
      modelMetrics: {
        accuracy: 0,
        latency: 0,
        throughput: 0,
        driftScore: 0,
        details: {
          precisionByClass: {},
          recallByClass: {},
          f1ScoreByClass: {},
          confusionMatrix: [],
          rocCurve: [],
          prCurve: []
        }
      },
      alerts: [],
      resourceUsage: []
    };
  }

  const hours = timeRange === '1h' ? 1 : timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : 720;

  // Return the data directly without ApiResponse wrapper
  return {
    systemHealth: mockSystemHealth,
    responseTime: generateMetricPoints(hours, 150, 100),
    throughput: generateMetricPoints(hours, 1000, 500),
    errorRates: generateMetricPoints(hours, 0.5, 0.5),
    modelMetrics: mockModelMetrics,
    alerts: mockAlerts,
    resourceUsage: mockResourceUsage
  };
};

export const getDetailedMetrics = async (
  metricType: 'system' | 'model' | 'resource',
  id?: string,
  timeRange: '1h' | '24h' | '7d' | '30d' = '24h'
): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  // Get user context for user-specific data
  const userContext = getUserContext();

  // If no user context or new user, return empty metrics
  if (!userContext || userContext.userId.startsWith('new-user') || (id && id.startsWith('new-user'))) {
    return {
      title: getDetailedTitle(metricType, id),
      subtitle: getDetailedSubtitle(metricType, id),
      charts: [],
      metrics: {},
      systemHealth: {
        cpu: 0,
        memory: 0,
        gpu: 0,
        storage: 0,
        network: 0,
        details: {
          cpuCores: 0,
          cpuThreads: 0,
          totalMemory: 0,
          freeMemory: 0,
          gpuModel: '',
          gpuMemory: 0,
          diskTotal: 0,
          diskFree: 0,
          networkIn: 0,
          networkOut: 0
        }
      },
      modelMetrics: {
        accuracy: 0,
        latency: 0,
        throughput: 0,
        driftScore: 0,
        details: {
          precisionByClass: {},
          recallByClass: {},
          f1ScoreByClass: {},
          confusionMatrix: [],
          rocCurve: [],
          prCurve: []
        }
      },
      resourceUsage: [],
      alerts: [],
      responseTime: [],
      throughput: [],
      selectedModelId: id,
      errorRates: []
    };
  }

  const hours = timeRange === '1h' ? 1 : timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : 720;
  const charts = generateDetailedChartData(metricType, hours);

  let metrics: Record<string, { value: number; unit: string; change: number }> = {};
  let responseTime = generateMetricPoints(hours, 150, 100);
  let throughput = generateMetricPoints(hours, 1000, 500);
  let selectedModelId = id;

  switch (metricType) {
    case 'system':
      metrics = {
        cpu: { value: mockSystemHealth.cpu, unit: '%', change: 5.2 },
        memory: { value: mockSystemHealth.memory, unit: '%', change: -2.1 },
        gpu: { value: mockSystemHealth.gpu, unit: '%', change: 8.7 },
        network: { value: mockSystemHealth.network, unit: 'MB/s', change: 1.5 }
      };
      break;

    case 'model':
      metrics = {
        accuracy: { value: mockModelMetrics.accuracy * 100, unit: '%', change: 2.3 },
        latency: { value: mockModelMetrics.latency, unit: 'ms', change: -15.4 },
        throughput: { value: mockModelMetrics.throughput, unit: 'req/s', change: 12.8 },
        driftScore: { value: mockModelMetrics.driftScore * 100, unit: '%', change: 0.5 }
      };
      break;

    case 'resource':
      const resource = mockResourceUsage.find(r => r.modelId === id);
      if (!resource) throw new Error('Resource not found');

      metrics = {
        cpuUsage: { value: resource.cpuUsage, unit: '%', change: 3.2 },
        memoryUsage: { value: resource.memoryUsage, unit: '%', change: -1.8 },
        gpuUsage: { value: resource.gpuUsage, unit: '%', change: 5.4 },
        errorRate: {
          value: (resource.errorCount / resource.requestCount) * 100,
          unit: '%',
          change: -0.8
        }
      };
      break;
  }

  // Return a complete data structure that includes all required data for detailed views
  return {
    title: getDetailedTitle(metricType, id),
    subtitle: getDetailedSubtitle(metricType, id),
    charts,
    metrics,
    // Include data needed by DetailedMetricsModal component
    systemHealth: mockSystemHealth,
    modelMetrics: mockModelMetrics,
    resourceUsage: mockResourceUsage,
    alerts: mockAlerts,
    responseTime: responseTime,
    throughput: throughput,
    selectedModelId: selectedModelId,
    errorRates: generateMetricPoints(hours, 0.5, 0.5),
  };
};

function getDetailedTitle(type: string, id?: string): string {
  switch (type) {
    case 'system':
      return 'System Performance Details';
    case 'model':
      return 'Model Performance Analytics';
    case 'resource':
      const resource = mockResourceUsage.find(r => r.modelId === id);
      return `Resource Usage: ${resource?.modelName || 'Unknown Model'}`;
    default:
      return 'Detailed Metrics';
  }
}

function getDetailedSubtitle(type: string, id?: string): string {
  switch (type) {
    case 'system':
      return 'Comprehensive system resource utilization metrics';
    case 'model':
      return 'Detailed model performance and inference metrics';
    case 'resource':
      return 'Resource consumption and request distribution analysis';
    default:
      return 'Detailed analysis and metrics';
  }
}