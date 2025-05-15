// Import the test functions
import { 
  testDeployments, 
  testCustomPipelines, 
  testCostOptimization,
  testDatasets
} from './test-zero-values';

// Run the tests
async function runTests() {
  console.log('Running tests...');
  
  const deploymentResult = await testDeployments();
  console.log('Deployments test:', deploymentResult ? 'PASSED' : 'FAILED');
  
  const pipelinesResult = await testCustomPipelines();
  console.log('Custom Pipelines test:', pipelinesResult ? 'PASSED' : 'FAILED');
  
  const costResult = await testCostOptimization();
  console.log('Cost Optimization test:', costResult ? 'PASSED' : 'FAILED');
  
  const datasetsResult = await testDatasets();
  console.log('Datasets test:', datasetsResult ? 'PASSED' : 'FAILED');
  
  console.log('All tests completed.');
}

runTests().catch(error => {
  console.error('Error running tests:', error);
});
