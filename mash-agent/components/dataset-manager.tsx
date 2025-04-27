"use client"

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Loader2, Upload, Trash2, Database, AlertCircle, CheckCircle } from 'lucide-react';
import { 
  listDatasets, 
  uploadDataset, 
  getDatasetDetails, 
  deleteDataset,
  checkBackendConnection
} from '@/lib/api-service';

interface Dataset {
  id: string;
  name: string;
  description?: string;
  records?: number;
  created_at?: string;
  status?: string;
}

export function DatasetManager() {
  // State for datasets
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [backendConnected, setBackendConnected] = useState(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  
  // State for file upload
  const [file, setFile] = useState<File | null>(null);
  const [datasetName, setDatasetName] = useState('');
  
  // Check connection and load datasets on mount
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
        fetchDatasets();
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
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await listDatasets();
      if (response && response.datasets) {
        setDatasets(response.datasets);
      } else {
        setDatasets([]);
      }
    } catch (err) {
      setError("Error fetching datasets: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  // Function to upload dataset
  const handleUploadDataset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError("Please select a file to upload");
      return;
    }
    
    if (!datasetName.trim()) {
      setError("Please enter a dataset name");
      return;
    }
    
    setIsUploading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await uploadDataset(datasetName, file);
      setSuccess(`Dataset "${datasetName}" uploaded successfully!`);
      setDatasetName('');
      setFile(null);
      
      // Refresh the dataset list
      fetchDatasets();
    } catch (err) {
      setError("Error uploading dataset: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsUploading(false);
    }
  };
  
  // Function to delete dataset
  const handleDeleteDataset = async (datasetId: string) => {
    if (!confirm("Are you sure you want to delete this dataset?")) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await deleteDataset(datasetId);
      setSuccess("Dataset deleted successfully");
      
      // Refresh the dataset list
      fetchDatasets();
      
      // Clear selected dataset if it was deleted
      if (selectedDataset && selectedDataset.id === datasetId) {
        setSelectedDataset(null);
      }
    } catch (err) {
      setError("Error deleting dataset: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to view dataset details
  const handleViewDataset = async (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setIsLoading(true);
    setError(null);
    
    try {
      const details = await getDatasetDetails(dataset.id);
      setSelectedDataset(details);
    } catch (err) {
      setError("Error fetching dataset details: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Dataset Manager</h2>
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
            ) : null}
            {isCheckingConnection ? 'Checking...' : 'Check Connection'}
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
      
      <Tabs defaultValue="datasets" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 bg-[#00031b]/50 border border-[#00cbdd]/20">
          <TabsTrigger 
            value="datasets" 
            className="data-[state=active]:bg-[#00cbdd]/10 data-[state=active]:text-[#00cbdd] text-white"
          >
            <Database className="h-4 w-4 mr-2" />
            My Datasets
          </TabsTrigger>
          <TabsTrigger 
            value="upload" 
            className="data-[state=active]:bg-[#00cbdd]/10 data-[state=active]:text-[#00cbdd] text-white"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Dataset
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="datasets" className="mt-0">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#00cbdd]" />
            </div>
          ) : datasets.length === 0 ? (
            <div className="text-center p-12 border border-[#00cbdd]/20 rounded-md bg-[#00031b]">
              <Database className="h-12 w-12 mx-auto text-[#00cbdd]/40 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Datasets Found</h3>
              <p className="text-[#00cbdd]/70 mb-4">
                You don't have any datasets yet. Upload a dataset to get started.
              </p>
              <Button 
                variant="outline" 
                onClick={() => document.querySelector('[data-value="upload"]')?.click()}
                className="border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Dataset
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {datasets.map((dataset) => (
                <Card key={dataset.id} className="bg-[#00031b] border-[#00cbdd]/20 text-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between items-center">
                      {dataset.name}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteDataset(dataset.id)}
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </CardTitle>
                    <CardDescription className="text-[#00cbdd]/70">
                      {dataset.records ? `${dataset.records} records` : 'Dataset'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-white/70">
                      {dataset.description || 'No description available'}
                    </p>
                    {dataset.created_at && (
                      <p className="text-xs text-white/50 mt-2">
                        Created: {new Date(dataset.created_at).toLocaleDateString()}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10"
                      onClick={() => handleViewDataset(dataset)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          {selectedDataset && (
            <div className="mt-6 p-4 border border-[#00cbdd]/20 rounded-md bg-[#00031b]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">Dataset Details: {selectedDataset.name}</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedDataset(null)}
                  className="text-[#00cbdd] hover:bg-[#00cbdd]/10"
                >
                  Close
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-[#00cbdd]">Description</h4>
                  <p className="text-white/70">{selectedDataset.description || 'No description available'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-[#00cbdd]">Records</h4>
                  <p className="text-white/70">{selectedDataset.records || 'Unknown'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-[#00cbdd]">Status</h4>
                  <p className="text-white/70">{selectedDataset.status || 'Active'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-[#00cbdd]">Created At</h4>
                  <p className="text-white/70">
                    {selectedDataset.created_at 
                      ? new Date(selectedDataset.created_at).toLocaleString() 
                      : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upload" className="mt-0">
          <Card className="bg-[#00031b] border-[#00cbdd]/20 text-white">
            <CardHeader>
              <CardTitle>Upload New Dataset</CardTitle>
              <CardDescription className="text-[#00cbdd]/70">
                Upload a CSV or JSON file containing your training data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUploadDataset} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="dataset-name" className="text-sm font-medium text-white">
                    Dataset Name
                  </label>
                  <Input
                    id="dataset-name"
                    value={datasetName}
                    onChange={(e) => setDatasetName(e.target.value)}
                    placeholder="Enter a name for your dataset"
                    className="bg-[#00031b] border-[#00cbdd]/20 text-white"
                    disabled={isUploading || !backendConnected}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="dataset-file" className="text-sm font-medium text-white">
                    Dataset File
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="dataset-file"
                      type="file"
                      accept=".csv,.json"
                      onChange={handleFileChange}
                      className="bg-[#00031b] border-[#00cbdd]/20 text-white"
                      disabled={isUploading || !backendConnected}
                    />
                  </div>
                  <p className="text-xs text-[#00cbdd]/70">
                    Accepted formats: CSV, JSON
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#00cbdd]/20 hover:bg-[#00cbdd]/30 text-white"
                  disabled={isUploading || !file || !datasetName.trim() || !backendConnected}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Dataset
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DatasetManager;
