/**
 * Cost Optimization API Module
 * 
 * This module provides interfaces and functions for managing and optimizing
 * costs across the platform.
 */

// Cost Category
export type CostCategory = 'compute' | 'storage' | 'models' | 'transfer' | 'api' | 'support';

// Implementation Difficulty
export type ImplementationDifficulty = 'easy' | 'medium' | 'complex';

// Implementation Status
export type ImplementationStatus = 'not_started' | 'in_progress' | 'implemented' | 'declined';

// Time Range for Cost Data
export type TimeRange = 'last7Days' | 'last30Days' | 'last90Days' | 'lastYear' | 'custom';

// Cost Data Point
export interface CostDataPoint {
  date: string;
  amount: number;
  category?: CostCategory;
}

// Cost Breakdown
export interface CostBreakdown {
  compute: number;
  storage: number;
  models: number;
  transfer: number;
  api?: number;
  support?: number;
  other?: number;
  total: number;
}

// Resource Usage
export interface ResourceUsage {
  resourceId: string;
  resourceType: 'model' | 'dataset' | 'deployment' | 'storage';
  name: string;
  usageAmount: number;
  costAmount: number;
  lastUsed: string;
  utilization: number; // Percentage of resource utilized (0-100)
}

// Saving Recommendation
export interface SavingRecommendation {
  id: string;
  title: string;
  description: string;
  category: CostCategory;
  savingAmount: number;
  implementationDifficulty: ImplementationDifficulty;
  status: ImplementationStatus;
  createdAt: string;
  implementedAt?: string;
  expiresAt?: string;
  resourceIds?: string[];
  impact: 'high' | 'medium' | 'low';
  additionalDetails?: Record<string, any>;
}

// Budget Alert
export interface BudgetAlert {
  id: string;
  name: string;
  threshold: number;
  currentSpending: number;
  limit: number;
  category?: CostCategory;
  frequency: 'daily' | 'weekly' | 'monthly';
  status: 'ok' | 'warning' | 'exceeded';
  lastTriggered?: string;
  createdAt: string;
}

// Cost Metrics
export interface CostMetrics {
  currentSpending: number;
  projectedSpending: number;
  previousPeriodSpending: number;
  changePercentage: number;
  trendDirection: 'up' | 'down' | 'stable';
  forecastAccuracy: number;
  breakdown: CostBreakdown;
  averageDailyCost: number;
  peakDailyCost: number;
}

// Usage Trends
export interface UsageTrends {
  startDate: string;
  endDate: string;
  dailyCosts: CostDataPoint[];
  totalCost: number;
  costBreakdown: CostBreakdown;
  peakUsage: {
    date: string;
    amount: number;
    category: CostCategory;
  };
}

// Implementation Plan
export interface ImplementationPlan {
  id: string;
  recommendationId: string;
  steps: {
    id: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    estimatedCompletion?: string;
  }[];
  estimatedSavings: number;
  startDate?: string;
  completionDate?: string;
  owner?: string;
  status: 'draft' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
}

// Mock data for cost metrics
const mockCostMetrics: CostMetrics = {
  currentSpending: 1245.87,
  projectedSpending: 4250.00,
  previousPeriodSpending: 1350.45,
  changePercentage: -7.7,
  trendDirection: 'down',
  forecastAccuracy: 93.5,
  breakdown: {
    compute: 625.45,
    storage: 320.21,
    models: 210.32,
    transfer: 89.89,
    total: 1245.87
  },
  averageDailyCost: 41.53,
  peakDailyCost: 65.21
};

// Mock data for daily costs
const mockDailyCosts: CostDataPoint[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  
  // Generate a somewhat realistic cost pattern with weekday variations
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const baseCost = 35 + Math.random() * 15;
  const cost = isWeekend ? baseCost * 0.7 : baseCost;
  
  return {
    date: date.toISOString().split('T')[0],
    amount: parseFloat(cost.toFixed(2))
  };
});

// Mock data for saving recommendations
const mockRecommendations: SavingRecommendation[] = [
  {
    id: 'rec-001',
    title: 'Idle GPU Instances',
    description: 'Two GPU instances have been inactive for 7+ days. Consider shutting them down or switching to on-demand.',
    category: 'compute',
    savingAmount: 192.45,
    implementationDifficulty: 'easy',
    status: 'not_started',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    resourceIds: ['res-gpu-01', 'res-gpu-03'],
    impact: 'high'
  },
  {
    id: 'rec-002',
    title: 'Over-provisioned Storage',
    description: 'Reduce unused storage allocation by 30% to save on costs.',
    category: 'storage',
    savingAmount: 96.21,
    implementationDifficulty: 'easy',
    status: 'not_started',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    resourceIds: ['res-storage-cluster-a'],
    impact: 'medium'
  },
  {
    id: 'rec-003',
    title: 'Right-size Model Deployments',
    description: 'Use smaller models for low-complexity tasks to reduce inference costs.',
    category: 'models',
    savingAmount: 64.76,
    implementationDifficulty: 'complex',
    status: 'not_started',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    resourceIds: ['model-deployment-12', 'model-deployment-15'],
    impact: 'medium',
    additionalDetails: {
      suggestedModels: ['small-bert', 'minilm-v2'],
      currentModels: ['bert-large', 'roberta-large']
    }
  },
  {
    id: 'rec-004',
    title: 'Batch Processing Opportunity',
    description: 'Convert real-time to batch processing for non-urgent tasks.',
    category: 'compute',
    savingAmount: 25.00,
    implementationDifficulty: 'medium',
    status: 'not_started',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    impact: 'low'
  },
  {
    id: 'rec-005',
    title: 'Optimize Data Transfer',
    description: 'Implement compression for API responses to reduce data transfer costs.',
    category: 'transfer',
    savingAmount: 35.15,
    implementationDifficulty: 'medium',
    status: 'not_started',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    impact: 'low'
  },
  {
    id: 'rec-006',
    title: 'Consolidated API Calls',
    description: 'Reduce the number of API calls by batching requests.',
    category: 'api',
    savingAmount: 42.50,
    implementationDifficulty: 'medium',
    status: 'in_progress',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    impact: 'medium'
  },
  {
    id: 'rec-007',
    title: 'Reserved Instance Opportunity',
    description: 'Convert on-demand instances to reserved instances for steady workloads.',
    category: 'compute',
    savingAmount: 210.30,
    implementationDifficulty: 'easy',
    status: 'implemented',
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    implementedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    resourceIds: ['res-compute-23', 'res-compute-24'],
    impact: 'high'
  }
];

// Mock data for budget alerts
const mockBudgetAlerts: BudgetAlert[] = [
  {
    id: 'alert-001',
    name: 'Monthly Spending Limit',
    threshold: 4000,
    currentSpending: 1245.87,
    limit: 5000,
    frequency: 'monthly',
    status: 'ok',
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'alert-002',
    name: 'GPU Compute Warning',
    threshold: 500,
    currentSpending: 450.25,
    limit: 600,
    category: 'compute',
    frequency: 'weekly',
    status: 'warning',
    lastTriggered: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'alert-003',
    name: 'Storage Growth Alert',
    threshold: 250,
    currentSpending: 320.21,
    limit: 300,
    category: 'storage',
    frequency: 'monthly',
    status: 'exceeded',
    lastTriggered: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Mock implementation plans
const mockImplementationPlans: ImplementationPlan[] = [
  {
    id: 'plan-001',
    recommendationId: 'rec-006',
    steps: [
      {
        id: 'step-1',
        description: 'Identify API endpoints with high call volume',
        status: 'completed'
      },
      {
        id: 'step-2',
        description: 'Modify client code to batch requests',
        status: 'in_progress'
      },
      {
        id: 'step-3',
        description: 'Test and deploy changes',
        status: 'pending'
      }
    ],
    estimatedSavings: 42.50,
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    owner: '1', // Reference to a team member ID
    status: 'in_progress'
  },
  {
    id: 'plan-002',
    recommendationId: 'rec-007',
    steps: [
      {
        id: 'step-1',
        description: 'Analyze usage patterns to confirm steady workload',
        status: 'completed'
      },
      {
        id: 'step-2',
        description: 'Purchase reserved instances',
        status: 'completed'
      },
      {
        id: 'step-3',
        description: 'Migrate workloads to reserved instances',
        status: 'completed'
      }
    ],
    estimatedSavings: 210.30,
    startDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    completionDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    owner: '2', // Reference to a team member ID
    status: 'completed'
  }
];

// Mock resource usage data
const mockResourceUsage: ResourceUsage[] = [
  {
    resourceId: 'res-gpu-01',
    resourceType: 'deployment',
    name: 'LLM-Inference-Cluster-1',
    usageAmount: 720, // Hours
    costAmount: 86.40,
    lastUsed: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    utilization: 15
  },
  {
    resourceId: 'res-gpu-03',
    resourceType: 'deployment',
    name: 'Vision-Model-Endpoint',
    usageAmount: 720, // Hours
    costAmount: 106.05,
    lastUsed: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    utilization: 8
  },
  {
    resourceId: 'res-storage-cluster-a',
    resourceType: 'storage',
    name: 'Primary Dataset Storage',
    usageAmount: 2000, // GB
    costAmount: 96.21,
    lastUsed: new Date().toISOString(),
    utilization: 35
  },
  {
    resourceId: 'model-deployment-12',
    resourceType: 'model',
    name: 'BERT-Large-Production',
    usageAmount: 1500000, // Inferences
    costAmount: 45.00,
    lastUsed: new Date().toISOString(),
    utilization: 60
  },
  {
    resourceId: 'model-deployment-15',
    resourceType: 'model',
    name: 'RoBERTa-Large-Sentiment',
    usageAmount: 750000, // Inferences
    costAmount: 19.76,
    lastUsed: new Date().toISOString(),
    utilization: 75
  }
];

/**
 * Cost Optimization API
 */
export const costOptimizationApi = {
  /**
   * Get cost metrics for a specified time range
   */
  getCostMetrics: async (timeRange: TimeRange = 'last30Days'): Promise<CostMetrics> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return { ...mockCostMetrics };
  },

  /**
   * Get detailed usage trends over a period
   */
  getUsageTrends: async (timeRange: TimeRange = 'last30Days'): Promise<UsageTrends> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create mock usage trends based on the specified time range
    const today = new Date();
    let startDate = new Date();
    
    switch (timeRange) {
      case 'last7Days':
        startDate.setDate(today.getDate() - 7);
        break;
      case 'last30Days':
        startDate.setDate(today.getDate() - 30);
        break;
      case 'last90Days':
        startDate.setDate(today.getDate() - 90);
        break;
      case 'lastYear':
        startDate.setDate(today.getDate() - 365);
        break;
      default:
        startDate.setDate(today.getDate() - 30);
    }
    
    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
      dailyCosts: mockDailyCosts.slice(-30), // Just return last 30 days for simplicity
      totalCost: mockDailyCosts.reduce((sum, point) => sum + point.amount, 0),
      costBreakdown: mockCostMetrics.breakdown,
      peakUsage: {
        date: mockDailyCosts.sort((a, b) => b.amount - a.amount)[0].date,
        amount: mockDailyCosts.sort((a, b) => b.amount - a.amount)[0].amount,
        category: 'compute'
      }
    };
  },

  /**
   * Get cost saving recommendations
   */
  getSavingRecommendations: async (): Promise<SavingRecommendation[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    return [...mockRecommendations];
  },

  /**
   * Get a specific recommendation by ID
   */
  getSavingRecommendation: async (id: string): Promise<SavingRecommendation | null> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const recommendation = mockRecommendations.find(r => r.id === id);
    return recommendation ? { ...recommendation } : null;
  },

  /**
   * Implement a cost saving recommendation
   */
  implementRecommendation: async (id: string): Promise<SavingRecommendation | null> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const index = mockRecommendations.findIndex(r => r.id === id);
    if (index === -1) return null;
    
    const updatedRecommendation = {
      ...mockRecommendations[index],
      status: 'in_progress' as const
    };
    
    mockRecommendations[index] = updatedRecommendation;
    
    // Simulate an implementation plan being created
    if (!mockImplementationPlans.some(p => p.recommendationId === id)) {
      mockImplementationPlans.push({
        id: `plan-${mockImplementationPlans.length + 1}`,
        recommendationId: id,
        steps: [
          {
            id: 'step-1',
            description: 'Analyze impact of implementation',
            status: 'pending'
          },
          {
            id: 'step-2',
            description: 'Implement changes',
            status: 'pending'
          },
          {
            id: 'step-3',
            description: 'Monitor results',
            status: 'pending'
          }
        ],
        estimatedSavings: updatedRecommendation.savingAmount,
        startDate: new Date().toISOString(),
        owner: '1', // Default owner
        status: 'in_progress'
      });
    }
    
    return { ...updatedRecommendation };
  },

  /**
   * Mark a recommendation as implemented
   */
  markAsImplemented: async (id: string): Promise<SavingRecommendation | null> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const index = mockRecommendations.findIndex(r => r.id === id);
    if (index === -1) return null;
    
    const updatedRecommendation = {
      ...mockRecommendations[index],
      status: 'implemented' as const,
      implementedAt: new Date().toISOString()
    };
    
    mockRecommendations[index] = updatedRecommendation;
    
    // Update the implementation plan if it exists
    const planIndex = mockImplementationPlans.findIndex(p => p.recommendationId === id);
    if (planIndex !== -1) {
      mockImplementationPlans[planIndex] = {
        ...mockImplementationPlans[planIndex],
        status: 'completed' as const,
        completionDate: new Date().toISOString(),
        steps: mockImplementationPlans[planIndex].steps.map(step => ({
          ...step,
          status: 'completed' as const
        }))
      };
    }
    
    return { ...updatedRecommendation };
  },

  /**
   * Decline a recommendation
   */
  declineRecommendation: async (id: string, reason?: string): Promise<SavingRecommendation | null> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const index = mockRecommendations.findIndex(r => r.id === id);
    if (index === -1) return null;
    
    const updatedRecommendation = {
      ...mockRecommendations[index],
      status: 'declined' as const,
      additionalDetails: {
        ...(mockRecommendations[index].additionalDetails || {}),
        declineReason: reason || 'No reason provided'
      }
    };
    
    mockRecommendations[index] = updatedRecommendation;
    return { ...updatedRecommendation };
  },

  /**
   * Get budget alerts
   */
  getBudgetAlerts: async (): Promise<BudgetAlert[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    return [...mockBudgetAlerts];
  },

  /**
   * Create a new budget alert
   */
  createBudgetAlert: async (alert: Omit<BudgetAlert, 'id' | 'createdAt' | 'status' | 'currentSpending'>): Promise<BudgetAlert> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newAlert: BudgetAlert = {
      ...alert,
      id: `alert-${mockBudgetAlerts.length + 1}`,
      createdAt: new Date().toISOString(),
      status: 'ok',
      currentSpending: alert.category 
        ? mockCostMetrics.breakdown[alert.category as keyof typeof mockCostMetrics.breakdown] || 0
        : mockCostMetrics.currentSpending
    };
    
    mockBudgetAlerts.push(newAlert);
    return { ...newAlert };
  },

  /**
   * Update a budget alert
   */
  updateBudgetAlert: async (id: string, updates: Partial<BudgetAlert>): Promise<BudgetAlert | null> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const index = mockBudgetAlerts.findIndex(a => a.id === id);
    if (index === -1) return null;
    
    const updatedAlert = {
      ...mockBudgetAlerts[index],
      ...updates
    };
    
    mockBudgetAlerts[index] = updatedAlert;
    return { ...updatedAlert };
  },

  /**
   * Delete a budget alert
   */
  deleteBudgetAlert: async (id: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const index = mockBudgetAlerts.findIndex(a => a.id === id);
    if (index === -1) return false;
    
    mockBudgetAlerts.splice(index, 1);
    return true;
  },

  /**
   * Get resource usage details
   */
  getResourceUsage: async (): Promise<ResourceUsage[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 900));
    return [...mockResourceUsage];
  },

  /**
   * Get implementation plans
   */
  getImplementationPlans: async (): Promise<ImplementationPlan[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    return [...mockImplementationPlans];
  },

  /**
   * Get a specific implementation plan
   */
  getImplementationPlan: async (id: string): Promise<ImplementationPlan | null> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const plan = mockImplementationPlans.find(p => p.id === id);
    return plan ? { ...plan } : null;
  },

  /**
   * Update implementation plan
   */
  updateImplementationPlan: async (id: string, updates: Partial<ImplementationPlan>): Promise<ImplementationPlan | null> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 900));
    
    const index = mockImplementationPlans.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    const updatedPlan = {
      ...mockImplementationPlans[index],
      ...updates
    };
    
    mockImplementationPlans[index] = updatedPlan;
    return { ...updatedPlan };
  }
}; 