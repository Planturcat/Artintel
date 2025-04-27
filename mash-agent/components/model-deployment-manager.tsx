"use client"

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  Rocket, 
  Server, 
  RefreshCw,
  Trash2,
  ExternalLink,
  Terminal
} from 'lucide-react';
import { 
  listFineTuningJobs,
  listModelDeployments,
  deployModel,
  undeployModel,
  getModelDeploymentDetails,
  checkBackendConnection
} from '@/lib/api-service';

interface FineTuningJob {
  id: string;
  name?: string;
  model_name: string;
  status: string;
  created_at: string;
  completed_at?: string;
}

interface ModelDeployment {
  id: string;
  name: string;
  model_id: string;
  job_id?: string;
  status: string;
  endpoint?: string;
  created_at: string;
  last_used?: string;
  metrics?: {
    requests?: number;
    avg_latency?: number;
    uptime?: number;
  };
}

export function ModelDeploymentManager() {
  // State for jobs and deployments
  const [jobs, setJobs] = useState<FineTuningJob[]>([]);
  const [deployments, setDeployments] = useState<ModelDeployment[]>([]);
  const [selectedDeployment, setSelectedDeployment] = useState<ModelDeployment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [backendConnected, setBackendConnected] = useState(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  
  // State for creating a new deployment
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [deploymentName, setDeploymentName] = useState<string>('');
  const [isDeploying, setIsDeploying] = useState(false);
  
  // Check connection and load data on mount
  useEffect(() => {
    checkConnection();
  }, []);
  
  // Function to check backend connection
  const checkConnection = async () => {
    setIsCheckingConnection(true);
    setError(null);
    
    try {
      const isConnected = await checkBackendConnection();
      setBackendConnected(isConnected);
      
      if (isConnected) {
        await Promise.all([fetchJobs(), fetchDeployments()]);
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
  
  // Function to fetch completed fine-tuning jobs
  const fetchJobs = async () => {
    try {
      const response = await listFineTuningJobs();
      if (response && response.jobs) {
        // Filter for completed jobs only
        const completedJobs = response.jobs.filter(
          (job: FineTuningJob) => job.status.toLowerCase() === 'completed'
        );
        setJobs(completedJobs);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error("Error fetching fine-tuning jobs:", err);
      setJobs([]);
    }
  };
  
  // Function to fetch model deployments
  const fetchDeployments = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await listModelDeployments();
      if (response && response.deployments) {
        setDeployments(response.deployments);
        
        // Update selected deployment if it exists
        if (selectedDeployment) {
          const updatedDeployment = response.deployments.find(
            (d: ModelDeployment) => d.id === selectedDeployment.id
          );
          if (updatedDeployment) {
            setSelectedDeployment(updatedDeployment);
          }
        }
      } else {
        setDeployments([]);
      }
    } catch (err) {
      setError("Error fetching model deployments: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to deploy a model
  const handleDeployModel = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedJobId) {
      setError("Please select a fine-tuned model");
      return;
    }
    
    if (!deploymentName.trim()) {
      setError("Please enter a deployment name");
      return;
    }
    
    setIsDeploying(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Find the selected job to get the model name
      const selectedJob = jobs.find(job => job.id === selectedJobId);
      if (!selectedJob) {
        throw new Error("Selected job not found");
      }
      
      const response = await deployModel(selectedJobId, deploymentName);
      setSuccess(`Model deployed successfully!`);
      
      // Reset form
      setSelectedJobId('');
      setDeploymentName('');
      
      // Refresh deployments list
      fetchDeployments();
    } catch (err) {
      setError("Error deploying model: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsDeploying(false);
    }
  };
  
  // Function to view deployment details
  const handleViewDeployment = async (deployment: ModelDeployment) => {
    setSelectedDeployment(deployment);
    
    try {
      const details = await getModelDeploymentDetails(deployment.id);
      setSelectedDeployment(details);
    } catch (err) {
      console.error("Error fetching deployment details:", err);
    }
  };
  
  // Function to undeploy a model
  const handleUndeployModel = async (deploymentId: string) => {
    if (!confirm("Are you sure you want to undeploy this model?")) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await undeployModel(deploymentId);
      setSuccess("Model undeployed successfully");
      
      // Refresh deployments list
      fetchDeployments();
      
      // Clear selected deployment if it was undeployed
      if (selectedDeployment && selectedDeployment.id === deploymentId) {
        setSelectedDeployment(null);
      }
    } catch (err) {
      setError("Error undeploying model: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'running':
        return 'text-green-400';
      case 'deploying':
        return 'text-blue-400';
      case 'failed':
        return 'text-red-400';
      case 'stopped':
        return 'text-orange-400';
      default:
        return 'text-white/70';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Model Deployment Manager</h2>
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
      
      <Tabs defaultValue="deployments" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 bg-[#00031b]/50 border border-[#00cbdd]/20">
          <TabsTrigger 
            value="deployments" 
            className="data-[state=active]:bg-[#00cbdd]/10 data-[state=active]:text-[#00cbdd] text-white"
          >
            <Server className="h-4 w-4 mr-2" />
            Deployed Models
          </TabsTrigger>
          <TabsTrigger 
            value="deploy" 
            className="data-[state=active]:bg-[#00cbdd]/10 data-[state=active]:text-[#00cbdd] text-white"
          >
            <Rocket className="h-4 w-4 mr-2" />
            Deploy New Model
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="deployments" className="mt-0">
          {isLoading && !deployments.length ? (
            <div className="flex justify-center items-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#00cbdd]" />
            </div>
          ) : deployments.length === 0 ? (
            <div className="text-center p-12 border border-[#00cbdd]/20 rounded-md bg-[#00031b]">
              <Server className="h-12 w-12 mx-auto text-[#00cbdd]/40 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Deployed Models Found</h3>
              <p className="text-[#00cbdd]/70 mb-4">
                You haven't deployed any models yet. Deploy a fine-tuned model to get started.
              </p>
              <Button 
                variant="outline" 
                onClick={() => document.querySelector('[data-value="deploy"]')?.click()}
                className="border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10"
              >
                <Rocket className="h-4 w-4 mr-2" />
                Deploy New Model
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {deployments.map((deployment) => (
                <Card key={deployment.id} className="bg-[#00031b] border-[#00cbdd]/20 text-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between items-center">
                      <span className="truncate">{deployment.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(deployment.status)} bg-opacity-20`}>
                        {deployment.status}
                      </span>
                    </CardTitle>
                    <CardDescription className="text-[#00cbdd]/70">
                      Model ID: {deployment.model_id.slice(0, 8)}...
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    {deployment.metrics && (
                      <div className="grid grid-cols-2 gap-2 text-xs text-white/70 mb-3">
                        {deployment.metrics.requests !== undefined && (
                          <div className="bg-[#00cbdd]/5 p-2 rounded">
                            <div className="font-medium mb-1">Requests</div>
                            <div>{deployment.metrics.requests.toLocaleString()}</div>
                          </div>
                        )}
                        {deployment.metrics.avg_latency !== undefined && (
                          <div className="bg-[#00cbdd]/5 p-2 rounded">
                            <div className="font-medium mb-1">Avg. Latency</div>
                            <div>{deployment.metrics.avg_latency.toFixed(2)} ms</div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="text-xs text-white/50">
                      <div className="flex justify-between">
                        <span>Deployed:</span>
                        <span>{new Date(deployment.created_at).toLocaleString()}</span>
                      </div>
                      {deployment.last_used && (
                        <div className="flex justify-between mt-1">
                          <span>Last Used:</span>
                          <span>{new Date(deployment.last_used).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10"
                      onClick={() => handleViewDeployment(deployment)}
                    >
                      View Details
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-red-800/30 text-red-400 hover:bg-red-900/20"
                      onClick={() => handleUndeployModel(deployment.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Undeploy
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          {selectedDeployment && (
            <div className="mt-6 p-4 border border-[#00cbdd]/20 rounded-md bg-[#00031b]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">
                  Deployment Details: {selectedDeployment.name}
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedDeployment(null)}
                  className="text-[#00cbdd] hover:bg-[#00cbdd]/10"
                >
                  Close
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-[#00cbdd]">Deployment ID</h4>
                    <p className="text-white/70">{selectedDeployment.id}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-[#00cbdd]">Status</h4>
                    <p className={getStatusColor(selectedDeployment.status)}>{selectedDeployment.status}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-[#00cbdd]">Model ID</h4>
                    <p className="text-white/70">{selectedDeployment.model_id}</p>
                  </div>
                  
                  {selectedDeployment.job_id && (
                    <div>
                      <h4 className="text-sm font-medium text-[#00cbdd]">Fine-Tuning Job ID</h4>
                      <p className="text-white/70">{selectedDeployment.job_id}</p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-sm font-medium text-[#00cbdd]">Created At</h4>
                    <p className="text-white/70">{new Date(selectedDeployment.created_at).toLocaleString()}</p>
                  </div>
                  
                  {selectedDeployment.last_used && (
                    <div>
                      <h4 className="text-sm font-medium text-[#00cbdd]">Last Used</h4>
                      <p className="text-white/70">{new Date(selectedDeployment.last_used).toLocaleString()}</p>
                    </div>
                  )}
                </div>
                
                {selectedDeployment.endpoint && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-[#00cbdd]">API Endpoint</h4>
                    <div className="flex items-center gap-2">
                      <code className="p-2 bg-[#00031b] border border-[#00cbdd]/20 rounded text-white/90 text-sm flex-1 overflow-x-auto">
                        {selectedDeployment.endpoint}
                      </code>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10"
                        onClick={() => navigator.clipboard.writeText(selectedDeployment.endpoint || '')}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                )}
                
                {selectedDeployment.metrics && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-[#00cbdd]">Metrics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-[#00cbdd]/5 rounded">
                        <div className="text-xs text-white/70 mb-1">Total Requests</div>
                        <div className="text-lg font-medium text-white">
                          {selectedDeployment.metrics.requests?.toLocaleString() || '0'}
                        </div>
                      </div>
                      
                      <div className="p-3 bg-[#00cbdd]/5 rounded">
                        <div className="text-xs text-white/70 mb-1">Average Latency</div>
                        <div className="text-lg font-medium text-white">
                          {selectedDeployment.metrics.avg_latency?.toFixed(2) || '0'} ms
                        </div>
                      </div>
                      
                      <div className="p-3 bg-[#00cbdd]/5 rounded">
                        <div className="text-xs text-white/70 mb-1">Uptime</div>
                        <div className="text-lg font-medium text-white">
                          {selectedDeployment.metrics.uptime 
                            ? `${(selectedDeployment.metrics.uptime / 3600).toFixed(1)} hours` 
                            : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[#00cbdd]">Example Usage</h4>
                  <div className="p-3 bg-[#00031b] border border-[#00cbdd]/20 rounded text-white/90 text-sm overflow-x-auto">
                    <pre className="whitespace-pre-wrap">
                      <code>
{`// Example API call to the deployed model
fetch("${selectedDeployment.endpoint || 'https://api.example.com/v1/generate'}", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    prompt: "Your prompt here",
    max_tokens: 100
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));`}
                      </code>
                    </pre>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  {selectedDeployment.endpoint && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10"
                      onClick={() => window.open(selectedDeployment.endpoint, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Test Endpoint
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-red-800/30 text-red-400 hover:bg-red-900/20"
                    onClick={() => handleUndeployModel(selectedDeployment.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Undeploy Model
                  </Button>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="deploy" className="mt-0">
          <Card className="bg-[#00031b] border-[#00cbdd]/20 text-white">
            <CardHeader>
              <CardTitle>Deploy Fine-Tuned Model</CardTitle>
              <CardDescription className="text-[#00cbdd]/70">
                Deploy a fine-tuned model to make it available for inference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDeployModel} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="deployment-name" className="text-sm font-medium text-white">
                    Deployment Name
                  </label>
                  <Input
                    id="deployment-name"
                    value={deploymentName}
                    onChange={(e) => setDeploymentName(e.target.value)}
                    placeholder="Enter a name for your deployment"
                    className="bg-[#00031b] border-[#00cbdd]/20 text-white"
                    disabled={isDeploying || !backendConnected}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="model-select" className="text-sm font-medium text-white">
                    Fine-Tuned Model
                  </label>
                  <Select
                    value={selectedJobId}
                    onValueChange={setSelectedJobId}
                    disabled={isDeploying || !backendConnected || jobs.length === 0}
                  >
                    <SelectTrigger id="model-select" className="bg-[#00031b] border-[#00cbdd]/20 text-white">
                      <SelectValue placeholder="Select a fine-tuned model" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#00031b] border-[#00cbdd]/20 text-white">
                      {jobs.length === 0 ? (
                        <SelectItem value="no-jobs" disabled>
                          No completed fine-tuning jobs available
                        </SelectItem>
                      ) : (
                        jobs.map((job) => (
                          <SelectItem key={job.id} value={job.id}>
                            {job.name || job.model_name} (Completed: {
                              job.completed_at 
                                ? new Date(job.completed_at).toLocaleDateString() 
                                : 'Unknown'
                            })
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {jobs.length === 0 && (
                    <p className="text-xs text-[#00cbdd]/70">
                      You need to complete a fine-tuning job first. Go to the Fine-Tuning Manager to create one.
                    </p>
                  )}
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-[#00cbdd]/20 hover:bg-[#00cbdd]/30 text-white"
                    disabled={
                      isDeploying || 
                      !selectedJobId || 
                      !deploymentName.trim() || 
                      !backendConnected
                    }
                  >
                    {isDeploying ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deploying...
                      </>
                    ) : (
                      <>
                        <Rocket className="mr-2 h-4 w-4" />
                        Deploy Model
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-6 p-4 border border-[#00cbdd]/20 rounded-md bg-[#00031b]">
            <h3 className="text-lg font-medium text-white mb-4">
              <Terminal className="h-5 w-5 inline-block mr-2 text-[#00cbdd]" />
              What happens when you deploy a model?
            </h3>
            <div className="space-y-4 text-white/70">
              <p>
                When you deploy a fine-tuned model, the system:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Loads the model weights from your completed fine-tuning job</li>
                <li>Provisions computing resources to host your model</li>
                <li>Creates a dedicated API endpoint for your model</li>
                <li>Makes the model available for inference requests</li>
              </ol>
              <p>
                Once deployed, you can use the model's API endpoint to generate text, answer questions,
                or perform other tasks based on your fine-tuning data.
              </p>
              <p className="text-xs text-[#00cbdd]/70 mt-4">
                Note: Deployed models consume resources and may incur costs. Remember to undeploy models
                when they are no longer needed.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ModelDeploymentManager;
