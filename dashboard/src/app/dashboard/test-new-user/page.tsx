'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  createNewUserContext,
  createNewProUserContext,
  createNewEnterpriseUserContext,
  clearTestUserContext
} from '@/test-new-user';
import { getUserContext } from '@/dashboard-api/mock-user-context';
import Button from '@/components/ui/Button';
import { runAllTests } from '@/test-zero-values';
import { CheckCircle, XCircle } from 'lucide-react';

export default function TestNewUserPage() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(getUserContext());
  const [message, setMessage] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, boolean> | null>(null);
  const [isRunningTests, setIsRunningTests] = useState(false);

  // Update current user when it changes
  useEffect(() => {
    const interval = setInterval(() => {
      const user = getUserContext();
      setCurrentUser(user);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Create a new free user
  const handleCreateFreeUser = () => {
    createNewUserContext();
    setMessage('Created new free user. Refresh the page to see the changes.');
  };

  // Create a new pro user
  const handleCreateProUser = () => {
    createNewProUserContext();
    setMessage('Created new pro user. Refresh the page to see the changes.');
  };

  // Create a new enterprise user
  const handleCreateEnterpriseUser = () => {
    createNewEnterpriseUserContext();
    setMessage('Created new enterprise user. Refresh the page to see the changes.');
  };

  // Clear the user context
  const handleClearUser = () => {
    clearTestUserContext();
    setMessage('Cleared user context. Refresh the page to see the changes.');
  };

  // Navigate to a dashboard page
  const navigateTo = (path: string) => {
    router.push(path);
  };

  // Run all tests
  const handleRunTests = async () => {
    setIsRunningTests(true);
    setTestResults(null);
    setMessage('Running tests...');

    try {
      const results = await runAllTests();
      setTestResults(results);

      // Check if all tests passed
      const allPassed = Object.values(results).every(result => result);

      if (allPassed) {
        setMessage('All tests passed! All pages show appropriate zero-starting values for new users.');
      } else {
        setMessage('Some tests failed. Check the results below.');
      }
    } catch (error) {
      console.error('Error running tests:', error);
      setMessage('Error running tests. Check the console for details.');
    } finally {
      setIsRunningTests(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Test New User Scenario
        </h1>
        <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Create a new user and test the dashboard pages
        </p>
      </div>

      {/* Current User */}
      <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000426]' : 'bg-gray-50'} border ${isDark ? 'border-[#00cbdd]/20' : 'border-gray-200'}`}>
        <h2 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Current User
        </h2>
        {currentUser ? (
          <div className="space-y-2">
            <p><span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>User ID:</span> {currentUser.userId}</p>
            <p><span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email:</span> {currentUser.email}</p>
            <p><span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Name:</span> {currentUser.fullName}</p>
            <p><span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Role:</span> {currentUser.role}</p>
            <p><span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Tier:</span> {currentUser.tier}</p>
            <p><span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Organization:</span> {currentUser.organization || 'None'}</p>
          </div>
        ) : (
          <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>No user context set</p>
        )}
      </div>

      {/* User Actions */}
      <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000426]' : 'bg-gray-50'} border ${isDark ? 'border-[#00cbdd]/20' : 'border-gray-200'}`}>
        <h2 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          User Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button onClick={handleCreateFreeUser} variant="primary">
            Create Free User
          </Button>
          <Button onClick={handleCreateProUser} variant="primary">
            Create Pro User
          </Button>
          <Button onClick={handleCreateEnterpriseUser} variant="primary">
            Create Enterprise User
          </Button>
          <Button onClick={handleClearUser} variant="destructive">
            Clear User
          </Button>
        </div>
        {message && (
          <div className="mt-4 p-3 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20">
            {message}
          </div>
        )}
      </div>

      {/* Dashboard Pages */}
      <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000426]' : 'bg-gray-50'} border ${isDark ? 'border-[#00cbdd]/20' : 'border-gray-200'}`}>
        <h2 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Dashboard Pages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button onClick={() => navigateTo('/dashboard')} variant="outline">
            Main Dashboard
          </Button>
          <Button onClick={() => navigateTo('/dashboard/deployments')} variant="outline">
            Deployments
          </Button>
          <Button onClick={() => navigateTo('/dashboard/custom-pipelines')} variant="outline">
            Custom Pipelines
          </Button>
          <Button onClick={() => navigateTo('/dashboard/cost-optimization')} variant="outline">
            Cost Optimization
          </Button>
          <Button onClick={() => navigateTo('/dashboard/datasets')} variant="outline">
            Datasets
          </Button>
          <Button onClick={() => navigateTo('/dashboard/fine-tuning')} variant="outline">
            Fine-tuning
          </Button>
          <Button onClick={() => navigateTo('/dashboard/models')} variant="outline">
            Models
          </Button>
          <Button onClick={() => navigateTo('/dashboard/monitoring')} variant="outline">
            Monitoring
          </Button>
        </div>
      </div>

      {/* Test Runner */}
      <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000426]' : 'bg-gray-50'} border ${isDark ? 'border-[#00cbdd]/20' : 'border-gray-200'}`}>
        <h2 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Test Zero-Starting Values
        </h2>
        <div className="mb-4">
          <Button
            onClick={handleRunTests}
            variant="primary"
            disabled={isRunningTests}
            className="w-full sm:w-auto"
          >
            {isRunningTests ? 'Running Tests...' : 'Run All Tests'}
          </Button>
        </div>

        {testResults && (
          <div className="space-y-4">
            <h3 className={`text-md font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Test Results
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                <div className="flex items-center">
                  {testResults.mainDashboard ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Main Dashboard</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                <div className="flex items-center">
                  {testResults.deployments ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Deployments</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                <div className="flex items-center">
                  {testResults.customPipelines ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Custom Pipelines</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                <div className="flex items-center">
                  {testResults.costOptimization ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Cost Optimization</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                <div className="flex items-center">
                  {testResults.datasets ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Datasets</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                <div className="flex items-center">
                  {testResults.fineTuning ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Fine-tuning</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                <div className="flex items-center">
                  {testResults.models ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Models</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                <div className="flex items-center">
                  {testResults.monitoring ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
