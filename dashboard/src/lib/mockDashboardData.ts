import { faker } from '@faker-js/faker';

// Ensure consistent data between renders
faker.seed(123);

// Generate mock data for system status
export function getSystemStatus() {
  return {
    systemLoad: faker.number.int({ min: 65, max: 95 }),
    responseTime: {
      p50: faker.number.int({ min: 120, max: 180 }),
      p90: faker.number.int({ min: 200, max: 350 }),
      p99: faker.number.int({ min: 400, max: 600 }),
    },
    uptime: 99.98,
    regions: [
      {
        name: 'US East',
        status: 'operational',
        load: faker.number.int({ min: 72, max: 86 }),
        latency: faker.number.int({ min: 20, max: 40 }),
      },
      {
        name: 'EU West',
        status: faker.helpers.arrayElement(['operational', 'degraded']),
        load: faker.number.int({ min: 65, max: 95 }),
        latency: faker.number.int({ min: 30, max: 60 }),
      },
      {
        name: 'Asia',
        status: 'operational',
        load: faker.number.int({ min: 60, max: 85 }),
        latency: faker.number.int({ min: 50, max: 90 }),
      },
      {
        name: 'US West',
        status: 'operational',
        load: faker.number.int({ min: 70, max: 90 }),
        latency: faker.number.int({ min: 25, max: 45 }),
      },
      {
        name: 'EU North',
        status: faker.helpers.arrayElement(['operational', 'degraded']),
        load: faker.number.int({ min: 82, max: 97 }),
        latency: faker.number.int({ min: 35, max: 65 }),
      },
      {
        name: 'Australia',
        status: 'operational',
        load: faker.number.int({ min: 55, max: 75 }),
        latency: faker.number.int({ min: 70, max: 120 }),
      }
    ]
  };
}

// Generate model performance data
export function getModelPerformance() {
  return [
    {
      model: 'GPT-4 Turbo',
      accuracy: 96.8,
      growth: 2.3,
      color: '#00cbdd'
    },
    {
      model: 'GPT-4o',
      accuracy: 95.3,
      growth: 1.9,
      color: '#0091bb'
    },
    {
      model: 'Claude 3 Opus',
      accuracy: 94.2,
      growth: 3.1,
      color: '#5A6ACF'
    },
    {
      model: 'Llama 3 70B',
      accuracy: 92.7,
      growth: 4.5,
      color: '#00cbdd'
    },
    {
      model: 'Mistral 7B',
      accuracy: 89.1,
      growth: 3.4,
      color: '#8952E0'
    }
  ];
}

// Generate fine-tuning data
export function getFinetuningData() {
  return [
    { epoch: 1, accuracy: 86.5, loss: 0.42 },
    { epoch: 2, accuracy: 88.3, loss: 0.36 },
    { epoch: 3, accuracy: 90.1, loss: 0.32 },
    { epoch: 4, accuracy: 91.5, loss: 0.29 },
    { epoch: 5, accuracy: 92.6, loss: 0.27 },
    { epoch: 6, accuracy: 93.8, loss: 0.25 }
  ];
}

// Generate deployment metrics
export function getDeploymentMetrics() {
  return {
    uptime: 99.97,
    activeModels: faker.number.int({ min: 5, max: 12 }),
    avgLatency: faker.number.int({ min: 120, max: 180 }),
    costPerToken: 0.0000002,
    totalDeployments: faker.number.int({ min: 6, max: 15 }),
    cpuUtilization: faker.number.int({ min: 65, max: 85 }),
    memoryUsage: faker.number.int({ min: 50, max: 75 }),
    gpuUtilization: faker.number.int({ min: 80, max: 95 }),
    modelVersions: [
      {
        version: 'v3.2.1',
        status: 'active',
        instances: faker.number.int({ min: 5, max: 20 })
      },
      {
        version: 'v3.1.0',
        status: 'active',
        instances: faker.number.int({ min: 2, max: 8 })
      },
      {
        version: 'v3.0.5',
        status: 'deprecated',
        instances: faker.number.int({ min: 1, max: 3 })
      }
    ]
  };
}

// Generate performance comparison data
export function getPerformanceComparison() {
  return [
    {
      category: 'Text Generation',
      current: 95,
      previous: 89
    },
    {
      category: 'Classification',
      current: 97,
      previous: 94
    },
    {
      category: 'Summarization',
      current: 92,
      previous: 87
    },
    {
      category: 'Translation',
      current: 94,
      previous: 91
    },
    {
      category: 'Code Generation',
      current: 89,
      previous: 82
    }
  ];
}

// Generate real-time alerts
export function getAlerts() {
  const alertTypes = [
    { color: '#00cbdd', prefix: 'Info: ' },
    { color: '#ffcc00', prefix: 'Warning: ' },
    { color: '#ff6b6b', prefix: 'Alert: ' }
  ];
  
  const alertMessages = [
    'New model version deployed successfully',
    'High load detected on EU West region',
    'Unusual traffic pattern from IP 192.168.1.45',
    'Latency spike detected for GPT-4 Turbo API',
    'Fine-tuning job completed for Custom Model v2',
    'System update scheduled for 04:00 UTC',
    'API rate limit reached for client ID #45872',
    'Low GPU memory warning on us-east-az2',
  ];
  
  return Array.from({ length: 5 }).map((_, i) => {
    const alertType = faker.helpers.arrayElement(alertTypes);
    const message = faker.helpers.arrayElement(alertMessages);
    const severity = alertType.color === '#ff6b6b' ? 'high' : 
                    alertType.color === '#ffcc00' ? 'medium' : 'low';
                    
    return {
      id: `alert-${Date.now()}-${i}`,
      severity,
      title: alertType.prefix + message.split(' ').slice(0, 3).join(' ') + '...',
      message,
      color: alertType.color,
      time: `${faker.number.int({ min: 1, max: 59 })}m ago`
    };
  });
}

// Generate token usage data
export function getTokenUsage() {
  const totalToday = faker.number.int({ min: 1000000, max: 2500000 });
  const promptTokens = Math.floor(totalToday * 0.4);
  const completionTokens = totalToday - promptTokens;
  const averagePerRequest = faker.number.int({ min: 1200, max: 2000 });
  
  // Generate hourly data
  const hourlyData = Array.from({ length: 24 }).map((_, hour) => {
    const total = faker.number.int({ min: 30000, max: 150000 });
    return {
      hour,
      prompt: Math.floor(total * 0.35),
      completion: Math.floor(total * 0.65),
      total
    };
  });
  
  // Calculate maximum for scaling
  const maxHourly = Math.max(...hourlyData.map(h => h.total));
  
  return {
    totalToday,
    promptTokens,
    completionTokens,
    averagePerRequest,
    hourlyData,
    maxHourly
  };
}

// Generate monitoring performance data
export function getMonitoringPerformance() {
  return {
    gpuUtilization: faker.number.int({ min: 75, max: 95 }),
    vramUsage: faker.number.int({ min: 70, max: 90 }),
    requestsPerMinute: faker.number.int({ min: 500, max: 1000 }),
    queueLength: faker.number.int({ min: 0, max: 30 }),
    responseTime: faker.number.int({ min: 100, max: 200 }),
    errorRate: Number((0.01 + Math.random() * 0.09).toFixed(2)),
    alerts: [
      {
        level: 'success',
        message: 'All systems operational'
      },
      {
        level: 'warning',
        message: 'High demand during peak hours (07:00-09:00 UTC)'
      }
    ]
  };
}

// Get all dashboard data in a single call
export function getDashboardData() {
  return {
    systemStatus: getSystemStatus(),
    modelPerformance: getModelPerformance(),
    finetuningData: getFinetuningData(),
    deploymentMetrics: getDeploymentMetrics(),
    performanceComparison: getPerformanceComparison(),
    alerts: getAlerts(),
    tokenUsage: getTokenUsage(),
    monitoringPerformance: getMonitoringPerformance(),
    currentTime: new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false
    })
  };
}

// Function to update data with slight variations to simulate real-time changes
export function getUpdatedDashboardData(previous: any) {
  const data = { ...getDashboardData() };
  
  // Update system load with small variations
  data.systemStatus.systemLoad = previous.systemStatus.systemLoad + 
    faker.number.int({ min: -3, max: 3 });
  
  // Cap the system load between 60 and 98
  data.systemStatus.systemLoad = Math.min(98, Math.max(60, data.systemStatus.systemLoad));
  
  // Update response time
  data.systemStatus.responseTime.p50 = previous.systemStatus.responseTime.p50 +
    faker.number.int({ min: -5, max: 5 });
  
  // Update alerts with possibly new ones
  if (faker.helpers.maybe(() => true, { probability: 0.3 })) { // 30% chance to add a new alert
    const newAlerts = getAlerts();
    data.alerts = [newAlerts[0], ...previous.alerts.slice(0, 4)];
  }
  
  // Update token usage for the last hour
  const lastHourTokens = previous.tokenUsage.hourlyData[previous.tokenUsage.hourlyData.length - 1].total +
    faker.number.int({ min: -100000, max: 100000 });
  data.tokenUsage.hourlyData[data.tokenUsage.hourlyData.length - 1].total = Math.max(100000, lastHourTokens);
  
  // Update current time
  data.currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: false
  });
  
  return data;
} 