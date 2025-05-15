/**
 * Test Zero Values
 *
 * This script tests that all dashboard pages show appropriate zero-starting values for new users.
 */

import { createNewUserContext, clearTestUserContext } from './test-new-user';
import { getMainDashboardMetrics } from './dashboard-api/main-dashboard-api';
import { getDeployments } from './dashboard-api/deployment-api';
import { getPipelines } from './dashboard-api/pipeline-api';
import { costOptimizationApi } from './dashboard-api/cost-optimization-api';
import { getDatasets } from './dashboard-api/dataset-api';
import { getFineTuningJobs } from './dashboard-api/fine-tuning-api';
import { getModels } from './dashboard-api/model-api';
import { getMonitoringMetrics } from './dashboard-api/monitoring-api';

/**
 * Test that the main dashboard shows zero-starting values for new users
 */
export const testMainDashboard = async (): Promise<boolean> => {
  try {
    // Create a new user
    const user = createNewUserContext();

    // Get main dashboard metrics
    const metrics = await getMainDashboardMetrics();

    // Check that metrics are zero or empty
    const isZero =
      metrics.activeDeployments === 0 &&
      metrics.totalModels === 0 &&
      metrics.totalDatasets === 0 &&
      metrics.totalRequests === 0 &&
      metrics.totalTokens === 0 &&
      metrics.recentActivity.length === 0;

    // Clean up
    clearTestUserContext();

    return isZero;
  } catch (error) {
    console.error('Error testing main dashboard:', error);
    return false;
  }
};

/**
 * Test that the deployments page shows zero-starting values for new users
 */
export const testDeployments = async (): Promise<boolean> => {
  try {
    // Create a new user
    const user = createNewUserContext();

    // Get deployments
    const deployments = await getDeployments();

    // Check that deployments are empty
    const isZero = deployments.items.length === 0;

    // Clean up
    clearTestUserContext();

    return isZero;
  } catch (error) {
    console.error('Error testing deployments:', error);
    return false;
  }
};

/**
 * Test that the custom pipelines page shows zero-starting values for new users
 */
export const testCustomPipelines = async (): Promise<boolean> => {
  try {
    // Create a new user
    const user = createNewUserContext();

    // Get pipelines
    const pipelines = await getPipelines();

    // Check that pipelines are empty
    const isZero = pipelines.items.length === 0;

    // Clean up
    clearTestUserContext();

    return isZero;
  } catch (error) {
    console.error('Error testing custom pipelines:', error);
    return false;
  }
};

/**
 * Test that the cost optimization page shows zero-starting values for new users
 */
export const testCostOptimization = async (): Promise<boolean> => {
  try {
    // Create a new user
    const user = createNewUserContext();

    // Get cost metrics and recommendations
    const metrics = await costOptimizationApi.getCostMetrics('last7Days');
    const recommendations = await costOptimizationApi.getSavingRecommendations();

    // Check that metrics are zero or empty
    const isZero =
      metrics.currentSpending === 0 &&
      metrics.projectedSpending === 0 &&
      metrics.breakdown.compute === 0 &&
      metrics.breakdown.storage === 0 &&
      metrics.breakdown.models === 0 &&
      metrics.breakdown.transfer === 0 &&
      recommendations.length === 0;

    // Clean up
    clearTestUserContext();

    return isZero;
  } catch (error) {
    console.error('Error testing cost optimization:', error);
    return false;
  }
};

/**
 * Test that the datasets page shows zero-starting values for new users
 */
export const testDatasets = async (): Promise<boolean> => {
  try {
    // Create a new user
    const user = createNewUserContext();

    // Get datasets
    const datasets = await getDatasets();

    // Check that datasets are empty
    const isZero = datasets.data.length === 0;

    // Clean up
    clearTestUserContext();

    return isZero;
  } catch (error) {
    console.error('Error testing datasets:', error);
    return false;
  }
};

/**
 * Test that the fine-tuning page shows zero-starting values for new users
 */
export const testFineTuning = async (): Promise<boolean> => {
  try {
    // Create a new user
    const user = createNewUserContext();

    // Get fine-tuning jobs
    const jobs = await getFineTuningJobs(user.userId);

    // Check that jobs are empty
    const isZero = jobs.items.length === 0;

    // Clean up
    clearTestUserContext();

    return isZero;
  } catch (error) {
    console.error('Error testing fine-tuning:', error);
    return false;
  }
};

/**
 * Test that the models page shows appropriate values for new users
 */
export const testModels = async (): Promise<boolean> => {
  try {
    // Create a new user
    const user = createNewUserContext();

    // Get models
    const models = await getModels();

    // Check that bookmarked models are empty
    const bookmarkedModels = models.items.filter(model => model.isBookmarked);
    const isZero = bookmarkedModels.length === 0;

    // Clean up
    clearTestUserContext();

    return isZero;
  } catch (error) {
    console.error('Error testing models:', error);
    return false;
  }
};

/**
 * Test that the monitoring page shows zero-starting values for new users
 */
export const testMonitoring = async (): Promise<boolean> => {
  try {
    // Create a new user
    const user = createNewUserContext();

    // Get monitoring metrics
    const metrics = await getMonitoringMetrics('24h', user.userId);

    // Check that metrics are zero or empty
    const isZero =
      metrics.alerts.length === 0 &&
      metrics.resourceUsage.length === 0 &&
      metrics.modelMetrics.accuracy === 0 &&
      metrics.modelMetrics.latency === 0 &&
      metrics.modelMetrics.throughput === 0;

    // Clean up
    clearTestUserContext();

    return isZero;
  } catch (error) {
    console.error('Error testing monitoring:', error);
    return false;
  }
};

/**
 * Run all tests
 */
export const runAllTests = async (): Promise<Record<string, boolean>> => {
  const results = {
    mainDashboard: await testMainDashboard(),
    deployments: await testDeployments(),
    customPipelines: await testCustomPipelines(),
    costOptimization: await testCostOptimization(),
    datasets: await testDatasets(),
    fineTuning: await testFineTuning(),
    models: await testModels(),
    monitoring: await testMonitoring()
  };

  console.log('Test results:', results);

  return results;
};

export default {
  testMainDashboard,
  testDeployments,
  testCustomPipelines,
  testCostOptimization,
  testDatasets,
  testFineTuning,
  testModels,
  testMonitoring,
  runAllTests
};
