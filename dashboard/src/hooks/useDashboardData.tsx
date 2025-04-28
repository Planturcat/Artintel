import { useState, useEffect } from 'react';
import { 
  getSystemStatus,
  getResourceUtilization,
  getModelPerformance,
  getFineTuningProgress,
  getDeploymentMetrics,
  getTokenUsage,
  getAlerts,
  getActivityFeed,
  SystemStatusResponse,
  ResourceUtilizationResponse,
  ModelPerformanceResponse,
  FineTuningResponse,
  DeploymentMetricsResponse,
  TokenUsageResponse,
  AlertsResponse,
  ActivityResponse,
  USE_MOCK_API
} from '@/dashboard-api/dashboard-api';
import { getDashboardData, getUpdatedDashboardData } from '@/lib/mockDashboardData';

// Define type for dashboard mock data
interface MockDashboardData {
  [key: string]: any;
}

// Define type for API dashboard data
interface DashboardData {
  systemStatus?: SystemStatusResponse | undefined;
  resourceUtilization?: ResourceUtilizationResponse | undefined;
  modelPerformance?: ModelPerformanceResponse | undefined;
  fineTuningJobs?: FineTuningResponse | undefined;
  deploymentMetrics?: DeploymentMetricsResponse | undefined;
  tokenUsage?: TokenUsageResponse | undefined;
  alerts?: AlertsResponse | undefined;
  activityFeed?: ActivityResponse | undefined;
}

export function useDashboardData(refreshInterval = 30000) {
  const [dashboardData, setDashboardData] = useState<MockDashboardData>(getDashboardData());
  const [apiData, setApiData] = useState<DashboardData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApiData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch all dashboard data in parallel
      const [
        systemStatusData,
        resourceUtilizationData,
        modelPerformanceData,
        fineTuningJobsData,
        deploymentMetricsData,
        tokenUsageData,
        alertsData,
        activityFeedData
      ] = await Promise.all([
        getSystemStatus().catch(() => undefined),
        getResourceUtilization('hour').catch(() => undefined),
        getModelPerformance(undefined, 'day').catch(() => undefined),
        getFineTuningProgress().catch(() => undefined),
        getDeploymentMetrics('day').catch(() => undefined),
        getTokenUsage('day', 'hour').catch(() => undefined),
        getAlerts().catch(() => undefined),
        getActivityFeed(undefined, 10).catch(() => undefined)
      ]);
      
      setApiData({
        systemStatus: systemStatusData,
        resourceUtilization: resourceUtilizationData,
        modelPerformance: modelPerformanceData,
        fineTuningJobs: fineTuningJobsData,
        deploymentMetrics: deploymentMetricsData,
        tokenUsage: tokenUsageData,
        alerts: alertsData,
        activityFeed: activityFeedData
      });
    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial data load - use mock data if API is disabled
    if (USE_MOCK_API) {
      setDashboardData(getDashboardData());
    } else {
      fetchApiData();
    }

    // Set up periodic refresh
    const intervalId = setInterval(() => {
      setLoading(true);
      
      if (USE_MOCK_API) {
        // Simulate a short loading time with mock data
        setTimeout(() => {
          setDashboardData((prevData: MockDashboardData) => getUpdatedDashboardData(prevData));
          setLoading(false);
        }, 300);
      } else {
        // Fetch real data
        fetchApiData();
      }
    }, refreshInterval);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  return {
    ...dashboardData,
    ...(USE_MOCK_API ? {} : apiData),
    loading,
    error,
    refreshData: () => {
      if (USE_MOCK_API) {
        setLoading(true);
        setTimeout(() => {
          setDashboardData((prevData: MockDashboardData) => getUpdatedDashboardData(prevData));
          setLoading(false);
        }, 300);
      } else {
        fetchApiData();
      }
    }
  };
} 