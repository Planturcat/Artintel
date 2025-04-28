"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { getModels } from '@/dashboard-api/dashboard-api';
import { isMockApiEnabled } from '@/dashboard-api/config';

// Types
type DashboardContextType = {
  selectedModel: string | null;
  setSelectedModel: (modelId: string | null) => void;
  refreshData: () => Promise<void>;
  // Data states
  modelData: any;
  datasetData: any;
  deploymentData: any;
  monitoringData: any;
  costData: any;
  // Loading states
  loadingModel: boolean;
  loadingDataset: boolean;
  loadingDeployment: boolean;
  loadingMonitoring: boolean;
  loadingCost: boolean;
  // Error states
  modelError: string | null;
  datasetError: string | null;
  deploymentError: string | null;
  monitoringError: string | null;
  costError: string | null;
};

// Create context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Provider component
export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  
  // Data states
  const [modelData, setModelData] = useState<any>(null);
  const [datasetData, setDatasetData] = useState<any>(null);
  const [deploymentData, setDeploymentData] = useState<any>(null);
  const [monitoringData, setMonitoringData] = useState<any>(null);
  const [costData, setCostData] = useState<any>(null);
  
  // Loading states
  const [loadingModel, setLoadingModel] = useState<boolean>(false);
  const [loadingDataset, setLoadingDataset] = useState<boolean>(false);
  const [loadingDeployment, setLoadingDeployment] = useState<boolean>(false);
  const [loadingMonitoring, setLoadingMonitoring] = useState<boolean>(false);
  const [loadingCost, setLoadingCost] = useState<boolean>(false);
  
  // Error states
  const [modelError, setModelError] = useState<string | null>(null);
  const [datasetError, setDatasetError] = useState<string | null>(null);
  const [deploymentError, setDeploymentError] = useState<string | null>(null);
  const [monitoringError, setMonitoringError] = useState<string | null>(null);
  const [costError, setCostError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    if (!isAuthenticated) return;
    
    // Fetch model data
    setLoadingModel(true);
    setModelError(null);
    try {
      const modelsResponse = await getModels();
      setModelData(modelsResponse);
      
      // If no model selected and we have models, select the first one
      if (!selectedModel && modelsResponse.models.length > 0) {
        setSelectedModel(modelsResponse.models[0].id);
      }
    } catch (error: any) {
      console.error('Error fetching model data:', error);
      setModelError(error.message || 'Failed to fetch models');
    } finally {
      setLoadingModel(false);
    }
    
    // Additional data fetching would go here
    // For now, we'll keep it simple for the integration
  };

  // Fetch data on initial load
  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  return (
    <DashboardContext.Provider 
      value={{
        selectedModel,
        setSelectedModel,
        refreshData: fetchDashboardData,
        // Data states
        modelData,
        datasetData,
        deploymentData,
        monitoringData,
        costData,
        // Loading states
        loadingModel,
        loadingDataset,
        loadingDeployment,
        loadingMonitoring,
        loadingCost,
        // Error states
        modelError,
        datasetError,
        deploymentError,
        monitoringError,
        costError,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Hook for using dashboard context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  
  return context;
}; 