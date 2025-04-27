"use client"

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  Play, 
  StopCircle, 
  Clock, 
  BarChart, 
  Settings,
  RefreshCw
} from 'lucide-react';
import { 
  listDatasets, 
  listFineTuningJobs, 
  createFineTuningJob, 
  getJobDetails, 
  cancelJob,
  checkBackendConnection
} from '@/lib/api-service';

interface Dataset {
  id: string;
  name: string;
  records?: number;
}

interface FineTuningJob {
  id: string;
  name?: string;
  model_name: string;
  dataset_id: string;
  dataset_name?: string;
  status: string;
  progress?: number;
  created_at: string;
  completed_at?: string;
  error?: string;
}

export function FineTuningManager() {
  // State for datasets and jobs
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [jobs, setJobs] = useState<FineTuningJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<FineTuningJob | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [backendConnected, setBackendConnected] = useState(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  
  // State for creating a new job
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('');
  const [selectedModelName, setSelectedModelName] = useState<string>('');
  const [jobName, setJobName] = useState<string>('');
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  
  // Available base models for fine-tuning
  const baseModels = [
    { id: 'llama2-7b', name: 'Llama 2 (7B)' },
    { id: 'mistral-7b', name: 'Mistral (7B)' },
    { id: 'phi-2', name: 'Phi-2' },
    { id: 'gemma-7b', name: 'Gemma (7B)' }
  ];
  
  // Check connection and load data on mount
  useEffect(() => {
    checkConnection();
  }, []);
  
  // Refresh job status periodically for active jobs
  useEffect(() => {
    if (jobs.some(job => ['running', 'pending', 'queued'].includes(job.status))) {
      const interval = setInterval(() => {
        fetchJobs();
      }, 10000); // Refresh every 10 seconds
      
      return () => clearInterval(interval);
    }
  }, [jobs]);
  
  // Function to check backend connection
  const checkConnection = async () => {
    setIsCheckingConnection(true);
    setError(null);
    
    try {
      const isConnected = await checkBackendConnection();
      setBackendConnected(isConnected);
      
      if (isConnected) {
        await Promise.all([fetchDatasets(), fetchJobs()]);
      } else {
        setError("Cannot connect to backend API. Please check your connection.");
      }
    } catch (err) {
      setError("Error checking connection: " + (err instanceof Error ? err.message : String(err)));
      setBackendConnected(false);
    } finally {
      setIsCheckingConnection(false);
    }
  };
  
  // Function to fetch datasets
  const fetchDatasets = async () => {
    try {
      const response = await listDatasets();
      if (response && response.datasets) {
        setDatasets(response.datasets);
      } else {
        setDatasets([]);
      }
    } catch (err) {
      console.error("Error fetching datasets:", err);
      setDatasets([]);
    }
  };
  
  // Function to fetch fine-tuning jobs
  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await listFineTuningJobs();
      if (response && response.jobs) {
        setJobs(response.jobs);
        
        // Update selected job if it exists
        if (selectedJob) {
          const updatedJob = response.jobs.find(job => job.id === selectedJob.id);
          if (updatedJob) {
            setSelectedJob(updatedJob);
          }
        }
      } else {
        setJobs([]);
      }
    } catch (err) {
      setError("Error fetching fine-tuning jobs: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to create a new fine-tuning job
  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDatasetId) {
      setError("Please select a dataset");
      return;
    }
    
    if (!selectedModelName) {
      setError("Please select a base model");
      return;
    }
    
    setIsCreatingJob(true);
    setError(null);
    setSuccess(null);
    
    try {
      const parameters = {
        name: jobName || `${selectedModelName}-finetune-${new Date().toISOString().slice(0, 10)}`
      };
      
      const response = await createFineTuningJob(selectedDatasetId, selectedModelName, parameters);
      setSuccess(`Fine-tuning job created successfully!`);
      
      // Reset form
      setSelectedDatasetId('');
      setSelectedModelName('');
      setJobName('');
      
      // Refresh jobs list
      fetchJobs();
    } catch (err) {
      setError("Error creating fine-tuning job: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsCreatingJob(false);
    }
  };
  
  // Function to view job details
  const handleViewJob = async (job: FineTuningJob) => {
    setSelectedJob(job);
    
    try {
      const details = await getJobDetails(job.id);
      setSelectedJob(details);
    } catch (err) {
      console.error("Error fetching job details:", err);
    }
  };
  
  // Function to cancel a job
  const handleCancelJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to cancel this fine-tuning job?")) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await cancelJob(jobId);
      setSuccess("Job cancelled successfully");
      
      // Refresh jobs list
      fetchJobs();
    } catch (err) {
      setError("Error cancelling job: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-400';
      case 'running':
        return 'text-blue-400';
      case 'failed':
        return 'text-red-400';
      case 'cancelled':
        return 'text-orange-400';
      case 'pending':
      case 'queued':
        return 'text-yellow-400';
      default:
        return 'text-white/70';
    }
  };
  
  // Helper function to get progress color
  const getProgressColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500';
      case 'running':
        return 'bg-blue-500';
      case 'failed':
        return 'bg-red-500';
      case 'cancelled':
        return 'bg-orange-500';
      case 'pending':
      case 'queued':
        return 'bg-yellow-500';
      default:
        return 'bg-[#00cbdd]';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Fine-Tuning Manager</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={checkConnection}
            disabled={isCheckingConnection}
            className="border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10"
          >
            {isCheckingConnection ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            {isCheckingConnection ? 'Checking...' : 'Refresh'}
          </Button>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/60">Backend:</span>
            {isCheckingConnection ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#00cbdd]" />
            ) : backendConnected ? (
              <span className="flex items-center text-green-400">
                <CheckCircle className="h-4 w-4 mr-1" /> Connected
              </span>
            ) : (
              <span className="flex items-center text-red-400">
                <AlertCircle className="h-4 w-4 mr-1" /> Disconnected
              </span>
            )}
          </div>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive" className="bg-red-900/20 border-red-800/30 text-red-400">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert className="bg-green-900/20 border-green-800/30 text-green-400">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="jobs" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 bg-[#00031b]/50 border border-[#00cbdd]/20">
          <TabsTrigger 
            value="jobs" 
            className="data-[state=active]:bg-[#00cbdd]/10 data-[state=active]:text-[#00cbdd] text-white"
          >
            <BarChart className="h-4 w-4 mr-2" />
            Fine-Tuning Jobs
          </TabsTrigger>
          <TabsTrigger 
            value="create" 
            className="data-[state=active]:bg-[#00cbdd]/10 data-[state=active]:text-[#00cbdd] text-white"
          >
            <Play className="h-4 w-4 mr-2" />
            Create New Job
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs" className="mt-0">
          {isLoading && !jobs.length ? (
            <div className="flex justify-center items-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#00cbdd]" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center p-12 border border-[#00cbdd]/20 rounded-md bg-[#00031b]">
              <BarChart className="h-12 w-12 mx-auto text-[#00cbdd]/40 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Fine-Tuning Jobs Found</h3>
              <p className="text-[#00cbdd]/70 mb-4">
                You haven't created any fine-tuning jobs yet. Create a new job to get started.
              </p>
              <Button 
                variant="outline" 
                onClick={() => document.querySelector('[data-value="create"]')?.click()}
                className="border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10"
              >
                <Play className="h-4 w-4 mr-2" />
                Create New Job
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.map((job) => (
                  <Card key={job.id} className="bg-[#00031b] border-[#00cbdd]/20 text-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex justify-between items-center">
                        <span className="truncate">{job.name || `Job ${job.id.slice(0, 8)}`}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(job.status)} bg-opacity-20`}>
                          {job.status}
                        </span>
                      </CardTitle>
                      <CardDescription className="text-[#00cbdd]/70">
                        {job.model_name} • {job.dataset_name || 'Unknown dataset'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      {job.progress !== undefined && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-white/70">Progress</span>
                            <span className="text-white/70">{job.progress}%</span>
                          </div>
                          <Progress 
                            value={job.progress} 
                            className="h-1 bg-[#00031b]"
                            indicatorClassName={getProgressColor(job.status)}
                          />
                        </div>
                      )}
                      
                      <div className="mt-3 text-xs text-white/50">
                        <div className="flex justify-between">
                          <span>Created:</span>
                          <span>{new Date(job.created_at).toLocaleString()}</span>
                        </div>
                        {job.completed_at && (
                          <div className="flex justify-between mt-1">
                            <span>Completed:</span>
                            <span>{new Date(job.completed_at).toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10"
                        onClick={() => handleViewJob(job)}
                      >
                        View Details
                      </Button>
                      
                      {['running', 'pending', 'queued'].includes(job.status.toLowerCase()) && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-red-800/30 text-red-400 hover:bg-red-900/20"
                          onClick={() => handleCancelJob(job.id)}
                        >
                          <StopCircle className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {isLoading && jobs.length > 0 && (
                <div className="flex justify-center items-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-[#00cbdd]" />
                </div>
              )}
            </div>
          )}
          
          {selectedJob && (
            <div className="mt-6 p-4 border border-[#00cbdd]/20 rounded-md bg-[#00031b]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">
                  Job Details: {selectedJob.name || `Job ${selectedJob.id.slice(0, 8)}`}
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedJob(null)}
                  className="text-[#00cbdd] hover:bg-[#00cbdd]/10"
                >
                  Close
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-[#00cbdd]">Job ID</h4>
                    <p className="text-white/70">{selectedJob.id}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-[#00cbdd]">Status</h4>
                    <p className={getStatusColor(selectedJob.status)}>{selectedJob.status}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-[#00cbdd]">Base Model</h4>
                    <p className="text-white/70">{selectedJob.model_name}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-[#00cbdd]">Dataset</h4>
                    <p className="text-white/70">{selectedJob.dataset_name || selectedJob.dataset_id}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-[#00cbdd]">Created At</h4>
                    <p className="text-white/70">{new Date(selectedJob.created_at).toLocaleString()}</p>
                  </div>
                  
                  {selectedJob.completed_at && (
                    <div>
                      <h4 className="text-sm font-medium text-[#00cbdd]">Completed At</h4>
                      <p className="text-white/70">{new Date(selectedJob.completed_at).toLocaleString()}</p>
                    </div>
                  )}
                </div>
                
                {selectedJob.progress !== undefined && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-[#00cbdd]">Progress</h4>
                    <div className="space-y-1">
                      <Progress 
                        value={selectedJob.progress} 
                        className="h-2 bg-[#00031b]"
                        indicatorClassName={getProgressColor(selectedJob.status)}
                      />
                      <div className="flex justify-between text-xs text-white/70">
                        <span>0%</span>
                        <span>{selectedJob.progress}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedJob.error && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-red-400">Error</h4>
                    <div className="p-3 bg-red-900/20 border border-red-800/30 rounded text-red-400 text-sm">
                      {selectedJob.error}
                    </div>
                  </div>
                )}
                
                {['running', 'pending', 'queued'].includes(selectedJob.status.toLowerCase()) && (
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-800/30 text-red-400 hover:bg-red-900/20"
                      onClick={() => handleCancelJob(selectedJob.id)}
                    >
                      <StopCircle className="h-4 w-4 mr-2" />
                      Cancel Job
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="create" className="mt-0">
          <Card className="bg-[#00031b] border-[#00cbdd]/20 text-white">
            <CardHeader>
              <CardTitle>Create New Fine-Tuning Job</CardTitle>
              <CardDescription className="text-[#00cbdd]/70">
                Fine-tune a pre-trained model on your custom dataset
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateJob} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="job-name" className="text-sm font-medium text-white">
                    Job Name (Optional)
                  </label>
                  <Input
                    id="job-name"
                    value={jobName}
                    onChange={(e) => setJobName(e.target.value)}
                    placeholder="Enter a name for your fine-tuning job"
                    className="bg-[#00031b] border-[#00cbdd]/20 text-white"
                    disabled={isCreatingJob || !backendConnected}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="dataset-select" className="text-sm font-medium text-white">
                    Dataset
                  </label>
                  <Select
                    value={selectedDatasetId}
                    onValueChange={setSelectedDatasetId}
                    disabled={isCreatingJob || !backendConnected || datasets.length === 0}
                  >
                    <SelectTrigger id="dataset-select" className="bg-[#00031b] border-[#00cbdd]/20 text-white">
                      <SelectValue placeholder="Select a dataset" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#00031b] border-[#00cbdd]/20 text-white">
                      {datasets.length === 0 ? (
                        <SelectItem value="no-datasets" disabled>
                          No datasets available
                        </SelectItem>
                      ) : (
                        datasets.map((dataset) => (
                          <SelectItem key={dataset.id} value={dataset.id}>
                            {dataset.name} {dataset.records ? `(${dataset.records} records)` : ''}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {datasets.length === 0 && (
                    <p className="text-xs text-[#00cbdd]/70">
                      You need to upload a dataset first. Go to the Dataset Manager to upload one.
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="model-select" className="text-sm font-medium text-white">
                    Base Model
                  </label>
                  <Select
                    value={selectedModelName}
                    onValueChange={setSelectedModelName}
                    disabled={isCreatingJob || !backendConnected}
                  >
                    <SelectTrigger id="model-select" className="bg-[#00031b] border-[#00cbdd]/20 text-white">
                      <SelectValue placeholder="Select a base model" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#00031b] border-[#00cbdd]/20 text-white">
                      {baseModels.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-[#00cbdd]/20 hover:bg-[#00cbdd]/30 text-white"
                    disabled={
                      isCreatingJob || 
                      !selectedDatasetId || 
                      !selectedModelName || 
                      !backendConnected
                    }
                  >
                    {isCreatingJob ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Job...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Start Fine-Tuning
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default FineTuningManager;
