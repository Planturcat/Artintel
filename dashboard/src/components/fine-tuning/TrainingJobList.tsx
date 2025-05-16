'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Play,
  Pause,
  StopCircle,
  ChevronRight,
  AlertCircle,
  Clock,
  Cpu,
  BarChart3
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { FineTuningJob, JobStatus } from '@/types/fine-tuning';
import { Model } from '@/dashboard-api/model-api';
import { Dataset } from '@/dashboard-api/dataset-api';

interface TrainingJobListProps {
  initialJobs: FineTuningJob[];
  availableModels: Model[];
  availableDatasets: Dataset[];
}

export default function TrainingJobList({
  initialJobs,
  availableModels,
  availableDatasets,
}: TrainingJobListProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [jobs, setJobs] = useState(initialJobs);

  const formatElapsedTime = (seconds?: number) => {
    if (!seconds) return 'N/A';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const calculateProgress = (job: FineTuningJob) => {
    if (job.status === 'completed') return 100;
    if (job.status === 'failed' || job.status === 'stopped') return 0;
    if (job.status === 'queued') return 0;
    
    if (job.metrics?.currentStep && job.metrics?.totalSteps) {
      return Math.round((job.metrics.currentStep / job.metrics.totalSteps) * 100);
    }
    
    if (job.metrics?.currentEpoch && job.config.epochs) {
      return Math.round((job.metrics.currentEpoch / job.config.epochs) * 100);
    }
    
    return 0;
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'queued': return 'bg-yellow-500/20 text-yellow-500';
      case 'running': return 'bg-blue-500/20 text-blue-500';
      case 'completed': return 'bg-green-500/20 text-green-500';
      case 'failed': return 'bg-red-500/20 text-red-500';
      case 'stopped': return 'bg-gray-500/20 text-gray-500';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  const formatStatus = (status: string | undefined) => {
    if (!status) return 'Unknown';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const handleJobClick = (jobId: string) => {
    router.push(`/dashboard/fine-tuning/jobs/${jobId}`);
  };

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <motion.div
          key={job.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-lg border cursor-pointer transition-all duration-200 ${
            isDark 
              ? 'bg-[#00091b]/90 border-[#00cbdd]/20 hover:border-[#00cbdd]/40' 
              : 'bg-white border-[#00cbdd]/10 hover:border-[#00cbdd]/30'
          }`}
          onClick={() => handleJobClick(job.id)}
        >
          <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
            {/* Left side - Job info */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {job.name || 'Unnamed Job'}
                  </h3>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status || '')}`}>
                      {formatStatus(job.status)}
                    </span>
                    <span className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Clock className="w-4 h-4 mr-1" />
                      {formatElapsedTime(job.metrics?.elapsedTime)}
                    </span>
                    <span className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Cpu className="w-4 h-4 mr-1" />
                      {job.resources?.gpuCount || 0}× {(job.resources?.gpuType || '').replace('nvidia-', '').toUpperCase() || 'GPU'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Base Model</p>
                  <p className={`mt-1 font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {job.baseModelName || job.baseModelId || 'Unknown Model'}
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Dataset</p>
                  <p className={`mt-1 font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {job.datasetName || job.datasetId || 'Unknown Dataset'}
                  </p>
                </div>
                {job.metrics && (
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <BarChart3 className="w-4 h-4 inline mr-1" />
                      Training Loss
                    </p>
                    <p className={`mt-1 font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      {job.metrics.trainingLoss?.toFixed(4) || 'N/A'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right side - Progress and actions */}
            <div className="flex items-center space-x-4">
              {(job.status === 'running' || job.status === 'queued') && (
                <div className="w-48">
                  <div className="flex justify-between text-sm mb-2">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Progress</span>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {calculateProgress(job)}%
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                    <motion.div 
                      className="h-full rounded-full bg-gradient-to-r from-[#00cbdd] to-[#00cbdd]/70"
                      initial={{ width: 0 }}
                      animate={{ width: `${calculateProgress(job)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )}
              <ChevronRight className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            </div>
          </div>

          {job.error && (
            <div className="mt-4 p-3 rounded bg-red-500/10 border border-red-500/20">
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-red-500">{job.error.message}</p>
              </div>
            </div>
          )}
        </motion.div>
      ))}

      {jobs.length === 0 && (
        <div className={`p-8 text-center rounded-lg border ${
          isDark 
            ? 'bg-[#00091b]/90 border-[#00cbdd]/20' 
            : 'bg-white border-[#00cbdd]/10'
        }`}>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            No training jobs found. Create a new job to get started.
          </p>
        </div>
      )}
    </div>
  );
} 