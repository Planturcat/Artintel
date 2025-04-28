import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Play, Pause, StopCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { FineTuningJob, JobStatus } from '@/types/fine-tuning';
import { getFineTuningJob, updateJobStatus } from '@/lib/api/fine-tuning';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { formatDistanceToNow } from 'date-fns';

interface JobDetailViewProps {
  jobId: string;
}

export default function JobDetailView({ jobId }: JobDetailViewProps) {
  const [job, setJob] = useState<FineTuningJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await getFineTuningJob(jobId);
        setJob(jobData);
        setError(null);
      } catch (err) {
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
    const interval = setInterval(fetchJob, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [jobId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !job) {
    return <div className="text-red-500">{error || 'Job not found'}</div>;
  }

  const isRunning = job.status === JobStatus.RUNNING;
  const canControl = [JobStatus.RUNNING, JobStatus.PAUSED].includes(job.status as JobStatus);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/fine-tuning" className="hover:text-primary">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">{job.name}</h1>
          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(job.status)}`}>
            {job.status}
          </span>
        </div>
        <div className="flex space-x-3">
          {canControl && (
            <>
              <Button
                variant="outline"
                onClick={() => handleJobControl(jobId, isRunning ? 'pause' : 'resume')}
              >
                {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isRunning ? 'Pause' : 'Resume'}
              </Button>
              <Button variant="destructive" onClick={() => handleJobControl(jobId, 'stop')}>
                <StopCircle className="h-4 w-4 mr-2" />
                Stop
              </Button>
            </>
          )}
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Job Details</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Base Model</dt>
              <dd className="mt-1">{job.baseModel}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Created</dt>
              <dd className="mt-1">{formatDistanceToNow(new Date(job.createdAt))} ago</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Dataset</dt>
              <dd className="mt-1">{job.dataset}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">GPU Configuration</dt>
              <dd className="mt-1">{job.gpuCount} GPU(s)</dd>
            </div>
          </dl>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Training Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Progress</span>
                <span>{job.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${job.progress}%` }}
                />
              </div>
            </div>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Current Epoch</dt>
                <dd className="mt-1">{job.currentEpoch} / {job.totalEpochs}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Loss</dt>
                <dd className="mt-1">{job.loss?.toFixed(4) || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Learning Rate</dt>
                <dd className="mt-1">{job.learningRate?.toExponential(2) || 'N/A'}</dd>
              </div>
            </dl>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}

function getStatusColor(status: string): string {
  const colors = {
    [JobStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
    [JobStatus.RUNNING]: 'bg-green-100 text-green-800',
    [JobStatus.COMPLETED]: 'bg-blue-100 text-blue-800',
    [JobStatus.FAILED]: 'bg-red-100 text-red-800',
    [JobStatus.PAUSED]: 'bg-gray-100 text-gray-800',
    [JobStatus.STOPPED]: 'bg-gray-100 text-gray-800',
  };
  return colors[status as JobStatus] || 'bg-gray-100 text-gray-800';
}

async function handleJobControl(jobId: string, action: 'pause' | 'resume' | 'stop') {
  try {
    await updateJobStatus(jobId, action);
    // Refresh will happen automatically due to the polling in useEffect
  } catch (error) {
    console.error(`Failed to ${action} job:`, error);
    // You might want to show a toast notification here
  }
} 