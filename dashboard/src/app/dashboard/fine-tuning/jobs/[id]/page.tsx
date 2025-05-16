'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  StopCircle, 
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Download,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { FineTuningJob } from '@/types/fine-tuning';
import { getFineTuningJob, stopFineTuningJob, resumeFineTuningJob, mockJobs } from '@/dashboard-api/fine-tuning-api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function JobDetailPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const params = useParams();
  const id = params?.id as string;
  const [job, setJob] = useState<FineTuningJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchJob();
    
    // Set up polling for active jobs
    const interval = setInterval(() => {
      if (job?.status === 'running' || job?.status === 'queued') {
        fetchJob();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      // In development, use mock data
      if (process.env.NODE_ENV === 'development') {
        const mockJob = mockJobs.find(j => j.id === id);
        if (!mockJob) {
          throw new Error('Job not found');
        }
        setJob(mockJob);
      } else {
        const data = await getFineTuningJob(id);
        setJob(data);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching job:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch job details');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: 'stop' | 'resume') => {
    if (!job) return;
    
    setIsActionLoading(true);
    try {
      if (process.env.NODE_ENV === 'development') {
        // Simulate API call in development
        await new Promise(resolve => setTimeout(resolve, 1000));
        const updatedJob = {
          ...job,
          status: action === 'stop' ? 'stopped' : 'running',
        };
        setJob(updatedJob);
      } else {
        if (action === 'stop') {
          await stopFineTuningJob(id);
        } else {
          await resumeFineTuningJob(id);
        }
        await fetchJob();
      }
    } catch (err) {
      console.error(`Failed to ${action} job:`, err);
      setError(`Failed to ${action} job: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsActionLoading(false);
    }
  };

  const formatElapsedTime = (seconds?: number) => {
    if (!seconds) return 'N/A';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const calculateProgress = () => {
    if (!job) return 0;
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
    switch (status) {
      case 'queued': return 'bg-yellow-500/20 text-yellow-500';
      case 'running': return 'bg-blue-500/20 text-blue-500';
      case 'completed': return 'bg-green-500/20 text-green-500';
      case 'failed': return 'bg-red-500/20 text-red-500';
      case 'stopped': return 'bg-gray-500/20 text-gray-500';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <RefreshCw className="w-6 h-6 animate-spin text-[#00cbdd]" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/dashboard/fine-tuning">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Button>
          </Link>
        </div>
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
            <p>{error || 'Job not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  const chartData = job.metrics?.lossHistory?.map((point, index) => ({
    step: point.step,
    training: point.trainingLoss,
    validation: point.validationLoss,
  })) || [];

  return (
    <div className="min-h-screen">
      {/* Sticky Header */}
      <div className={`sticky top-0 z-10 border-b ${
        isDark ? 'bg-[#00091b]/90 border-[#00cbdd]/20' : 'bg-white/90 border-[#00cbdd]/10'
      } backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/fine-tuning">
                <Button variant="ghost">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Jobs
                </Button>
              </Link>
              <div>
                <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {job?.name}
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Job ID: {job?.id}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {job?.status === 'running' && (
                <Button
                  onClick={() => handleAction('stop')}
                  disabled={isActionLoading}
                  variant="outline"
                  className="text-red-500 hover:text-red-600"
                >
                  <StopCircle className="w-4 h-4 mr-2" />
                  Stop Training
                </Button>
              )}
              {job?.status === 'stopped' && (
                <Button
                  onClick={() => handleAction('resume')}
                  disabled={isActionLoading}
                  variant="outline"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Resume Training
                </Button>
              )}
              {job?.status === 'completed' && (
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Model
                </Button>
              )}
              <Button
                variant="outline"
                onClick={fetchJob}
                disabled={isActionLoading}
              >
                <RefreshCw className={`w-4 h-4 ${isActionLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Status and Progress Card */}
        <div className={`p-6 rounded-lg border ${
          isDark 
            ? 'bg-[#00091b]/90 border-[#00cbdd]/20' 
            : 'bg-white border-[#00cbdd]/10'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job?.status || '')}`}>
                  {job?.status.charAt(0).toUpperCase() + job?.status.slice(1)}
                </span>
              </div>
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Created</p>
              <p className={`mt-2 text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {new Date(job?.createdAt || '').toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Runtime</p>
              <p className={`mt-2 text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {formatElapsedTime(job?.metrics?.elapsedTime)}
              </p>
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>GPU Resources</p>
              <p className={`mt-2 text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {job?.resources.gpuCount}× {job?.resources.gpuType.replace('nvidia-', '').toUpperCase()}
              </p>
            </div>
          </div>

          {(job?.status === 'running' || job?.status === 'queued') && (
            <div className="mt-8">
              <div className="flex justify-between text-sm mb-2">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Progress</span>
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {calculateProgress()}%
                </span>
              </div>
              <div className={`w-full h-3 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <motion.div 
                  className="h-full rounded-full bg-gradient-to-r from-[#00cbdd] to-[#00cbdd]/70"
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateProgress()}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              {job?.metrics?.estimatedTimeRemaining && (
                <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {formatElapsedTime(job.metrics.estimatedTimeRemaining)} remaining
                </p>
              )}
            </div>
          )}
        </div>

        {/* Training Metrics */}
        {job?.metrics && (
          <div className={`p-6 rounded-lg border ${
            isDark 
              ? 'bg-[#00091b]/90 border-[#00cbdd]/20' 
              : 'bg-white border-[#00cbdd]/10'
          }`}>
            <h2 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Training Metrics
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Current Epoch
                </p>
                <p className={`text-2xl font-semibold mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {job.metrics.currentEpoch || 0}/{job.config.epochs}
                </p>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {Math.round((job.metrics.currentEpoch / job.config.epochs) * 100)}% complete
                </p>
              </div>
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Training Loss
                </p>
                <p className={`text-2xl font-semibold mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {job.metrics.trainingLoss?.toFixed(4) || 'N/A'}
                </p>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Current batch loss
                </p>
              </div>
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Validation Loss
                </p>
                <p className={`text-2xl font-semibold mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {job.metrics.validationLoss?.toFixed(4) || 'N/A'}
                </p>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Last validation
                </p>
              </div>
            </div>

            {chartData.length > 0 && (
              <div className="h-[400px] mt-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1f2937' : '#e5e7eb'} />
                    <XAxis 
                      dataKey="step" 
                      stroke={isDark ? '#9ca3af' : '#6b7280'}
                      label={{ 
                        value: 'Training Steps', 
                        position: 'insideBottom', 
                        offset: -5,
                        fill: isDark ? '#9ca3af' : '#6b7280'
                      }}
                    />
                    <YAxis 
                      stroke={isDark ? '#9ca3af' : '#6b7280'}
                      label={{ 
                        value: 'Loss Value', 
                        angle: -90, 
                        position: 'insideLeft',
                        fill: isDark ? '#9ca3af' : '#6b7280'
                      }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: isDark ? '#1f2937' : '#ffffff',
                        border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '0.5rem',
                        padding: '12px'
                      }}
                      labelStyle={{ color: isDark ? '#e5e7eb' : '#111827' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="training" 
                      name="Training Loss"
                      stroke="#00cbdd" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="validation" 
                      name="Validation Loss"
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}

        {/* Configuration */}
        <div className={`p-6 rounded-lg border ${
          isDark 
            ? 'bg-[#00091b]/90 border-[#00cbdd]/20' 
            : 'bg-white border-[#00cbdd]/10'
        }`}>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between"
          >
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Configuration
            </h2>
            {showAdvanced ? (
              <ChevronUp className={isDark ? 'text-gray-400' : 'text-gray-600'} />
            ) : (
              <ChevronDown className={isDark ? 'text-gray-400' : 'text-gray-600'} />
            )}
          </button>

          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Base Model
                </p>
                <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {job.baseModelName || job.baseModelId}
                </p>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Dataset
                </p>
                <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {job.datasetName || job.datasetId}
                </p>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Batch Size
                </p>
                <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {job.config.batchSize}
                </p>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Learning Rate
                </p>
                <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {job.config.learningRate}
                </p>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Optimizer
                </p>
                <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {job.config.optimizer.type.toUpperCase()}
                </p>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Weight Decay
                </p>
                <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {job.config.optimizer.weightDecay}
                </p>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Gradient Accumulation Steps
                </p>
                <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {job.config.optimizer.gradientAccumulationSteps}
                </p>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  LoRA Rank
                </p>
                <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {job.config.lora.rank}
                </p>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  LoRA Alpha
                </p>
                <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {job.config.lora.alpha}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Error Message */}
        {job?.error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500"
          >
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">Training Error</p>
                <p className="mt-1">{job.error.message}</p>
                {job.error.details && (
                  <pre className="mt-3 p-4 rounded-lg bg-red-500/5 text-sm overflow-auto">
                    {job.error.details}
                  </pre>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}