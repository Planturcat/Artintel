"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Upload,
  Database,
  Cloud,
  FileText,
  Search,
  Filter,
  Grid,
  List,
  Plus,
  RefreshCw,
  SlidersHorizontal,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import DatasetCard from '@/components/datasets/DatasetCard';
import UploadModal from '@/components/datasets/UploadModal';
import CloudStorageModal from '@/components/datasets/CloudStorageModal';
import DatabaseModal from '@/components/datasets/DatabaseModal';
import { datasetService, CloudStorageConfig, DatabaseConfig } from '@/services/datasetService';
import { Dataset } from '@/types/dataset';

// For now, we'll use these mock user details for development
// In a real app, this would come from an auth context
const mockCurrentUser = {
  id: '123',
  name: 'Test User',
  email: 'test@example.com'
};

// Mock data for testing
const mockDatasets = [
  {
    id: '1',
    name: 'Training Dataset 2023',
    description: 'Main training dataset for language models',
    type: 'Training',
    size: 1024 * 1024 * 500, // 500MB
    format: 'CSV',
    lastModified: new Date().toISOString(),
    tags: ['training', 'language', '2023'],
    source: 'local' as const,
    status: 'ready' as const,
    ownerId: '123' // Current user
  },
  {
    id: '2',
    name: 'Validation Data Q4',
    description: 'Quarterly validation dataset for model evaluation',
    type: 'Validation',
    size: 1024 * 1024 * 200, // 200MB
    format: 'JSON',
    lastModified: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    tags: ['validation', 'quarterly'],
    source: 'cloud' as const,
    status: 'ready' as const,
    ownerId: '123' // Current user
  },
  {
    id: '3',
    name: 'Test Dataset Beta',
    description: 'Beta testing dataset for new model features',
    type: 'Testing',
    size: 1024 * 1024 * 100, // 100MB
    format: 'CSV',
    lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['testing', 'beta'],
    source: 'database' as const,
    status: 'processing' as const,
    ownerId: '456' // Different user
  }
];

export default function DatasetsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [filteredDatasets, setFilteredDatasets] = useState<Dataset[]>([]);
  const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);
  const [isDatabaseModalOpen, setIsDatabaseModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Filter states
  const [filterSource, setFilterSource] = useState<string | null>(null);
  const [filterFormat, setFilterFormat] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  
  // Set auth context on mount
  useEffect(() => {
    // In a real app, this would use real user data from an auth context
    datasetService.setAuthContext({
      userId: mockCurrentUser.id,
      token: 'mock-token-for-development'
    });
    
    // Load datasets
    loadDatasets();
  }, []);
  
  // Load datasets from API
  const loadDatasets = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create filters object
      const filters: any = {};
      
      if (filterSource) {
        filters.source = filterSource;
      }
      
      if (filterFormat) {
        filters.format = filterFormat;
      }
      
      if (filterStatus) {
        filters.status = filterStatus;
      }
      
      if (searchQuery) {
        filters.search = searchQuery;
      }
      
      // Always filter by current user ID
      filters.userId = mockCurrentUser.id;
      
      // Get datasets from service
      const response = await datasetService.listDatasets(filters);
      setDatasets(response);
      setFilteredDatasets(response);
    } catch (err: any) {
      setError(err.message || 'Failed to load datasets');
      console.error('Failed to load datasets:', err);
    } finally {
      setIsLoading(false);
    }
  }, [filterSource, filterFormat, filterStatus, searchQuery]);

  // Success message handler
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleUpload = async (files: File[], metadata: any) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Use the datasetService to upload files
      const responses = await datasetService.mockUploadFiles(files, metadata);
      
      // Reload datasets after upload
      await loadDatasets();
      
      showSuccess(`Successfully uploaded ${files.length} file(s)`);
    } catch (err: any) {
      setError(err.message || 'Failed to upload files');
      console.error('Failed to upload files:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloudConnect = async (config: CloudStorageConfig) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In development, use mock service
      if (process.env.NODE_ENV === 'development') {
      const newDataset = await datasetService.mockConnectCloudStorage(config);
        await loadDatasets(); // Reload datasets after connection
        showSuccess('Successfully connected to cloud storage');
      } else {
        const newDataset = await datasetService.connectCloudStorage(config);
        await loadDatasets(); // Reload datasets after connection
        showSuccess('Successfully connected to cloud storage');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect to cloud storage');
      console.error('Failed to connect to cloud storage:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDatabaseConnect = async (config: DatabaseConfig) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In development, use mock service
      if (process.env.NODE_ENV === 'development') {
      const newDataset = await datasetService.mockConnectDatabase(config);
        await loadDatasets(); // Reload datasets after connection
        showSuccess('Successfully connected to database');
      } else {
        const newDataset = await datasetService.connectDatabase(config);
        await loadDatasets(); // Reload datasets after connection
        showSuccess('Successfully connected to database');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect to database');
      console.error('Failed to connect to database:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (process.env.NODE_ENV === 'development') {
        // Just update local state in development
        setDatasets(prev => prev.filter(dataset => dataset.id !== id));
        showSuccess('Dataset deleted successfully');
      } else {
      await datasetService.deleteDataset(id);
        await loadDatasets(); // Reload datasets after deletion
        showSuccess('Dataset deleted successfully');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete dataset');
      console.error('Failed to delete dataset:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    await loadDatasets();
    showSuccess('Datasets refreshed');
  };
  
  // Filter handlers
  const handleFilterBySource = (source: string | null) => {
    setFilterSource(prev => prev === source ? null : source);
    // Reload datasets with new filter
    setTimeout(() => loadDatasets(), 0);
  };
  
  const handleFilterByFormat = (format: string | null) => {
    setFilterFormat(prev => prev === format ? null : format);
    // Reload datasets with new filter
    setTimeout(() => loadDatasets(), 0);
  };
  
  const handleFilterByStatus = (status: string | null) => {
    setFilterStatus(prev => prev === status ? null : status);
    // Reload datasets with new filter
    setTimeout(() => loadDatasets(), 0);
  };
  
  const clearFilters = () => {
    setFilterSource(null);
    setFilterFormat(null);
    setFilterStatus(null);
    setSearchQuery('');
    // Reload datasets with cleared filters
    setTimeout(() => loadDatasets(), 0);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(() => loadDatasets(), 500);
    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="space-y-6">
      {/* Error/Success message */}
      {error && (
        <div className="fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg bg-red-500/90 text-white max-w-sm">
          <AlertCircle className="h-5 w-5 mr-2" />
          <p>{error}</p>
          <button 
            onClick={() => setError(null)} 
            className="ml-4 p-1 rounded-full hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg bg-green-500/90 text-white max-w-sm">
          <CheckCircle className="h-5 w-5 mr-2" />
          <p>{successMessage}</p>
          <button 
            onClick={() => setSuccessMessage(null)} 
            className="ml-4 p-1 rounded-full hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <motion.h1 
            className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Datasets
          </motion.h1>
          <motion.p 
            className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Manage your training and evaluation datasets
          </motion.p>
        </div>
        
        <motion.div 
          className="flex gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center px-4 py-2 rounded-lg ${
              isDark 
                ? 'bg-white/10 hover:bg-white/15 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } transition-colors ${showFilters ? 'ring-2 ring-[#00cbdd]' : ''}`}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <span>Filters</span>
          </button>
          
          <button
            onClick={handleRefresh}
            className={`flex items-center px-4 py-2 rounded-lg ${
              isDark 
                ? 'bg-white/10 hover:bg-white/15 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } transition-colors`}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          
          <button 
            onClick={() => setIsUploading(true)}
            className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white hover:from-[#00b0c0] hover:to-blue-600 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span>New Dataset</span>
          </button>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard 
          title="Upload Dataset"
          subtitle="Add your local files to the platform"
        >
          <button 
            onClick={() => setIsUploading(true)}
            className={`w-full h-full p-6 flex flex-col items-center justify-center rounded-xl border-2 border-dashed ${
              isDark 
                ? 'border-gray-700 hover:border-[#00cbdd]/50 text-gray-400 hover:text-[#00cbdd]' 
                : 'border-gray-200 hover:border-[#00cbdd]/50 text-gray-500 hover:text-[#00cbdd]'
            } transition-all duration-300`}
          >
            <Upload className="h-8 w-8 mb-3" />
            <h3 className="font-medium">Upload Files</h3>
            <p className="text-sm mt-1">Drag & drop or click to upload</p>
          </button>
        </DashboardCard>

        <DashboardCard
          title="Cloud Integration" 
          subtitle="Connect with cloud storage providers"
        >
          <button 
            onClick={() => setIsCloudModalOpen(true)}
            className={`w-full h-full p-6 flex flex-col items-center justify-center rounded-xl border-2 border-dashed ${
              isDark 
                ? 'border-gray-700 hover:border-[#00cbdd]/50 text-gray-400 hover:text-[#00cbdd]' 
                : 'border-gray-200 hover:border-[#00cbdd]/50 text-gray-500 hover:text-[#00cbdd]'
            } transition-all duration-300`}
          >
            <Cloud className="h-8 w-8 mb-3" />
            <h3 className="font-medium">Connect Cloud Storage</h3>
            <p className="text-sm mt-1">AWS, GCP, or Azure</p>
          </button>
        </DashboardCard>

        <DashboardCard
          title="Database Connection"
          subtitle="Import data from SQL and NoSQL sources"
        >
          <button 
            onClick={() => setIsDatabaseModalOpen(true)}
            className={`w-full h-full p-6 flex flex-col items-center justify-center rounded-xl border-2 border-dashed ${
              isDark 
                ? 'border-gray-700 hover:border-[#00cbdd]/50 text-gray-400 hover:text-[#00cbdd]' 
                : 'border-gray-200 hover:border-[#00cbdd]/50 text-gray-500 hover:text-[#00cbdd]'
            } transition-all duration-300`}
          >
            <Database className="h-8 w-8 mb-3" />
            <h3 className="font-medium">Connect Database</h3>
            <p className="text-sm mt-1">SQL or NoSQL databases</p>
          </button>
        </DashboardCard>
      </div>

      {/* Search and Filters */}
      <DashboardCard
        title="Search & Filter"
        subtitle="Find and organize your datasets"
      >
        <div className={`relative ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
          <input
            type="text"
            placeholder="Search datasets by name, type, or tags..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={`w-full py-3 pl-10 pr-4 rounded-lg border ${
              isDark 
                ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white placeholder:text-gray-500'
                : 'bg-gray-50/70 border-gray-200 text-gray-800 placeholder:text-gray-400'
            } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40 transition-all duration-200`}
          />
        </div>

        {/* Quick filter buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className={`flex items-center px-3 py-1.5 rounded-lg text-xs ${
              isDark
                ? 'bg-white/10 text-gray-300 hover:bg-white/15'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            {viewMode === 'grid' ? (
              <><Grid className="h-3 w-3 mr-1" /><span>Grid</span></>
            ) : (
              <><List className="h-3 w-3 mr-1" /><span>List</span></>
            )}
          </button>

          <button
            onClick={() => handleFilterByFormat('csv')}
            className={`flex items-center px-3 py-1.5 rounded-lg text-xs ${
              filterFormat === 'csv'
                ? isDark
                  ? 'bg-[#00cbdd]/20 text-[#00cbdd] ring-1 ring-[#00cbdd]/50'
                  : 'bg-blue-100 text-blue-700 ring-1 ring-blue-300'
                : isDark
                ? 'bg-white/10 text-gray-300 hover:bg-white/15'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            <FileText className="h-3 w-3 mr-1" />
            <span>CSV</span>
          </button>

          <button
            onClick={() => handleFilterByFormat('json')}
            className={`flex items-center px-3 py-1.5 rounded-lg text-xs ${
              filterFormat === 'json'
                ? isDark
                  ? 'bg-[#00cbdd]/20 text-[#00cbdd] ring-1 ring-[#00cbdd]/50'
                  : 'bg-blue-100 text-blue-700 ring-1 ring-blue-300'
                : isDark
                  ? 'bg-white/10 text-gray-300 hover:bg-white/15'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            <FileText className="h-3 w-3 mr-1" />
            <span>JSON</span>
          </button>

          <button
            onClick={() => handleFilterBySource('cloud')}
            className={`flex items-center px-3 py-1.5 rounded-lg text-xs ${
              filterSource === 'cloud'
                ? isDark
                  ? 'bg-[#00cbdd]/20 text-[#00cbdd] ring-1 ring-[#00cbdd]/50'
                  : 'bg-blue-100 text-blue-700 ring-1 ring-blue-300'
                : isDark
                ? 'bg-white/10 text-gray-300 hover:bg-white/15'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            <Cloud className="h-3 w-3 mr-1" />
            <span>Cloud</span>
          </button>

          <button
            onClick={() => handleFilterBySource('database')}
            className={`flex items-center px-3 py-1.5 rounded-lg text-xs ${
              filterSource === 'database'
                ? isDark
                  ? 'bg-[#00cbdd]/20 text-[#00cbdd] ring-1 ring-[#00cbdd]/50'
                  : 'bg-blue-100 text-blue-700 ring-1 ring-blue-300'
                : isDark
                ? 'bg-white/10 text-gray-300 hover:bg-white/15'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            <Database className="h-3 w-3 mr-1" />
            <span>Database</span>
          </button>
          
          <button
            onClick={() => handleFilterBySource('local')}
            className={`flex items-center px-3 py-1.5 rounded-lg text-xs ${
              filterSource === 'local'
                ? isDark
                  ? 'bg-[#00cbdd]/20 text-[#00cbdd] ring-1 ring-[#00cbdd]/50'
                  : 'bg-blue-100 text-blue-700 ring-1 ring-blue-300'
                : isDark
                  ? 'bg-white/10 text-gray-300 hover:bg-white/15'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            <FileText className="h-3 w-3 mr-1" />
            <span>Local</span>
          </button>
          
          {(filterSource || filterFormat || filterStatus || searchQuery) && (
            <button
              onClick={clearFilters}
              className={`flex items-center px-3 py-1.5 rounded-lg text-xs ${
                isDark
                  ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              } transition-colors`}
            >
              <X className="h-3 w-3 mr-1" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </DashboardCard>

      {/* Dataset Grid/List */}
      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
        {isLoading && filteredDatasets.length === 0 ? (
          <div className="col-span-full flex justify-center py-20">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-2 border-t-transparent border-[#00cbdd] rounded-full animate-spin mb-4"></div>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Loading datasets...</p>
            </div>
          </div>
        ) : filteredDatasets.length === 0 ? (
          <div className="col-span-full flex justify-center py-20">
            <div className="flex flex-col items-center">
              <FileText className={`h-16 w-16 mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>No datasets found</h3>
              <p className={`mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                {searchQuery || filterSource || filterFormat || filterStatus
                  ? 'Try adjusting your filters or search query'
                  : 'Click "New Dataset" to upload your first dataset'}
              </p>
            </div>
          </div>
        ) : (
        <AnimatePresence>
            {filteredDatasets.map((dataset) => (
            <DatasetCard
              key={dataset.id}
              dataset={dataset}
              isDark={isDark}
              viewMode={viewMode}
              onDelete={handleDelete}
                currentUserId={mockCurrentUser.id}
                onRefresh={handleRefresh}
            />
          ))}
        </AnimatePresence>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isUploading && (
          <UploadModal
            isOpen={isUploading}
            onClose={() => setIsUploading(false)}
            onUpload={handleUpload}
            isDark={isDark}
          />
        )}
        {isCloudModalOpen && (
          <CloudStorageModal
            isOpen={isCloudModalOpen}
            onClose={() => setIsCloudModalOpen(false)}
            onConnect={handleCloudConnect}
            isDark={isDark}
          />
        )}
        {isDatabaseModalOpen && (
          <DatabaseModal
            isOpen={isDatabaseModalOpen}
            onClose={() => setIsDatabaseModalOpen(false)}
            onConnect={handleDatabaseConnect}
            isDark={isDark}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 