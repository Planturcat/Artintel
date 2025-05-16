'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Cpu, HardDrive, Database, Clock, AlertTriangle } from 'lucide-react';
import Tooltip from '@/components/ui/Tooltip';

interface ResourceMonitorProps {
  gpuHoursUsed: number;
  gpuHoursTotal: number;
  activeJobs: number;
  maxJobs: number;
  gpuTypes: {
    type: string;
    available: number;
    allocated: number;
    total: number;
  }[];
}

export default function ResourceMonitor({
  gpuHoursUsed,
  gpuHoursTotal,
  activeJobs,
  maxJobs,
  gpuTypes
}: ResourceMonitorProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Calculate percentages
  const gpuHoursPercentage = Math.min(100, Math.round((gpuHoursUsed / gpuHoursTotal) * 100));
  const jobsPercentage = Math.min(100, Math.round((activeJobs / maxJobs) * 100));

  // Calculate total GPUs
  const totalGpus = gpuTypes.reduce((sum, gpu) => sum + gpu.total, 0);
  const allocatedGpus = gpuTypes.reduce((sum, gpu) => sum + gpu.allocated, 0);
  const gpuPercentage = Math.min(100, Math.round((allocatedGpus / totalGpus) * 100));

  // Format large numbers
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  // Format GPU hours with one decimal place
  const formatGpuHours = (hours: number) => {
    return (Math.round(hours * 10) / 10).toFixed(1);
  };

  // Helper to get the status color based on percentage
  const getStatusColor = (percentage: number) => {
    if (percentage < 60) return 'text-green-500 bg-green-500/10';
    if (percentage < 80) return 'text-yellow-500 bg-yellow-500/10';
    return 'text-red-500 bg-red-500/10';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg border ${
        isDark 
          ? 'bg-[#00091b]/90 border-[#00cbdd]/20' 
          : 'bg-white border-[#00cbdd]/10'
      } overflow-hidden`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Resource Monitoring
        </h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Current usage and available resources for fine-tuning
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-4">
        {/* GPU Hours Usage */}
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                GPU Hours
              </h4>
            </div>
            <Tooltip content="Total GPU compute hours allocated to your account for fine-tuning">
              <AlertTriangle className="w-4 h-4 text-gray-400" />
            </Tooltip>
          </div>

          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                Used: {formatGpuHours(gpuHoursUsed)} hours
              </span>
              <span className={`${getStatusColor(gpuHoursPercentage)} px-2 py-0.5 rounded-full text-xs`}>
                {gpuHoursPercentage}%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <div 
                className={`h-full rounded-full ${
                  gpuHoursPercentage < 60 
                    ? 'bg-green-500' 
                    : gpuHoursPercentage < 80 
                      ? 'bg-yellow-500' 
                      : 'bg-red-500'
                }`}
                style={{ width: `${gpuHoursPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="text-sm text-right mt-3">
            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              {formatGpuHours(gpuHoursTotal - gpuHoursUsed)} hours remaining
            </span>
          </div>
        </div>

        {/* Active Jobs */}
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <Cpu className="w-5 h-5 mr-2 text-purple-500" />
              <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Active Jobs
              </h4>
            </div>
            <Tooltip content="Maximum number of concurrent fine-tuning jobs allowed">
              <AlertTriangle className="w-4 h-4 text-gray-400" />
            </Tooltip>
          </div>

          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                Current: {activeJobs} jobs
              </span>
              <span className={`${getStatusColor(jobsPercentage)} px-2 py-0.5 rounded-full text-xs`}>
                {jobsPercentage}%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <div 
                className={`h-full rounded-full ${
                  jobsPercentage < 60 
                    ? 'bg-green-500' 
                    : jobsPercentage < 80 
                      ? 'bg-yellow-500' 
                      : 'bg-red-500'
                }`}
                style={{ width: `${jobsPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="text-sm text-right mt-3">
            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              {maxJobs - activeJobs} slots available
            </span>
          </div>
        </div>

        {/* GPU Allocation */}
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <HardDrive className="w-5 h-5 mr-2 text-green-500" />
              <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                GPU Allocation
              </h4>
            </div>
            <Tooltip content="Current GPU allocation across all your active jobs">
              <AlertTriangle className="w-4 h-4 text-gray-400" />
            </Tooltip>
          </div>

          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                In use: {allocatedGpus} GPUs
              </span>
              <span className={`${getStatusColor(gpuPercentage)} px-2 py-0.5 rounded-full text-xs`}>
                {gpuPercentage}%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <div 
                className={`h-full rounded-full ${
                  gpuPercentage < 60 
                    ? 'bg-green-500' 
                    : gpuPercentage < 80 
                      ? 'bg-yellow-500' 
                      : 'bg-red-500'
                }`}
                style={{ width: `${gpuPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="text-sm text-right mt-3">
            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              {totalGpus - allocatedGpus} GPUs available
            </span>
          </div>
        </div>

        {/* GPU Types */}
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <Database className="w-5 h-5 mr-2 text-orange-500" />
              <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Available GPUs
              </h4>
            </div>
            <Tooltip content="GPU types available for fine-tuning jobs">
              <AlertTriangle className="w-4 h-4 text-gray-400" />
            </Tooltip>
          </div>

          <div className="space-y-3">
            {gpuTypes.map((gpu) => (
              <div key={gpu.type}>
                <div className="flex justify-between text-sm mb-1">
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    {gpu.type.replace('nvidia-', '').toUpperCase()}
                  </span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    {gpu.available} / {gpu.total} available
                  </span>
                </div>
                <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                  <div 
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: `${(gpu.available / gpu.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Summary */}
      <div className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} p-4 flex justify-between items-center`}>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full bg-blue-500 mr-2`}></div>
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Usage refreshes on the 1st of each month
          </span>
        </div>
        
        {gpuHoursPercentage > 80 && (
          <div className="flex items-center">
            <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
            <span className="text-sm text-red-500">
              Low resources! Contact support to increase your quota.
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
} 