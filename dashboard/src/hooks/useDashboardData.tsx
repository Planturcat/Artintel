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
import { getUserContext } from '@/dashboard-api/mock-user-context';
import {
  generateUserSystemStatus,
  generateUserModelPerformance,
  generateUserTokenUsage,
  generateUserDeploymentMetrics,
  generateUserFineTuningData,
  generateUserAlerts
} from '@/dashboard-api/mock-data-generator';

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
      // Get user context for user-specific data
      const userContext = getUserContext();

      if (userContext) {
        // Generate user-specific data if we have a user context
        try {
          const userData = {
            // Only use base data for things we don't have user-specific generators for
            ...getDashboardData(),
            // Use user-specific data generators for everything else
            systemStatus: generateUserSystemStatus(),
            modelPerformance: generateUserModelPerformance(),
            tokenUsage: generateUserTokenUsage(),
            deploymentMetrics: generateUserDeploymentMetrics(),
            finetuningData: generateUserFineTuningData(),
            alerts: generateUserAlerts()
          };
          setDashboardData(userData);
        } catch (err) {
          console.error('Error generating user-specific dashboard data:', err);
          // Fall back to generic data if user-specific generation fails
          setDashboardData(getDashboardData());
        }
      } else {
        // Use generic data if no user context is available
        setDashboardData(getDashboardData());
      }
    } else {
      fetchApiData();
    }

    // Set up periodic refresh
    const intervalId = setInterval(() => {
      setLoading(true);

      if (USE_MOCK_API) {
        // Simulate a short loading time with mock data
        setTimeout(() => {
          // Get user context for user-specific data
          const userContext = getUserContext();

          if (userContext) {
            // Update with user-specific data
            setDashboardData((prevData: MockDashboardData) => {
              try {
                return {
                  ...getUpdatedDashboardData(prevData),
                  systemStatus: generateUserSystemStatus(),
                  modelPerformance: generateUserModelPerformance(),
                  tokenUsage: generateUserTokenUsage(),
                  deploymentMetrics: generateUserDeploymentMetrics(),
                  finetuningData: generateUserFineTuningData(),
                  alerts: generateUserAlerts()
                };
              } catch (err) {
                console.error('Error updating user-specific dashboard data:', err);
                return getUpdatedDashboardData(prevData);
              }
            });
          } else {
            // Update with generic data
            setDashboardData((prevData: MockDashboardData) => getUpdatedDashboardData(prevData));
          }
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
          // Get user context for user-specific data
          const userContext = getUserContext();

          if (userContext) {
            // Update with user-specific data
            setDashboardData((prevData: MockDashboardData) => {
              try {
                return {
                  ...getUpdatedDashboardData(prevData),
                  systemStatus: generateUserSystemStatus(),
                  modelPerformance: generateUserModelPerformance(),
                  tokenUsage: generateUserTokenUsage(),
                  deploymentMetrics: generateUserDeploymentMetrics(),
                  finetuningData: generateUserFineTuningData(),
                  alerts: generateUserAlerts()
                };
              } catch (err) {
                console.error('Error refreshing user-specific dashboard data:', err);
                return getUpdatedDashboardData(prevData);
              }
            });
          } else {
            // Update with generic data
            setDashboardData((prevData: MockDashboardData) => getUpdatedDashboardData(prevData));
          }
          setLoading(false);
        }, 300);
      } else {
        fetchApiData();
      }
    }
  };
}