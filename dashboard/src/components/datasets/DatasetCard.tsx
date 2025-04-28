"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Database,
  Cloud,
  HardDrive,
  Download,
  Trash2,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  Clock,
  Tag,
  Eye,
  Edit2,
  Share2,
  X
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import FileViewer from './FileViewer';
import { datasetService } from '@/services/datasetService';
import { Dataset } from '@/types/dataset';

interface DatasetCardProps {
  dataset: Dataset;
  isDark?: boolean;
  viewMode?: 'grid' | 'list';
  onDelete?: (id: string) => void;
  currentUserId?: string;
  onRefresh?: () => void;
}

const formatFileSize = (bytes: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

const getSourceIcon = (source: string) => {
  switch (source) {
    case 'cloud':
      return <Cloud className="h-5 w-5" />;
    case 'database':
      return <Database className="h-5 w-5" />;
    case 'api':
      return <HardDrive className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'ready':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'processing':
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case 'error':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

export default function DatasetCard({ 
  dataset, 
  isDark, 
  viewMode = 'grid', 
  onDelete, 
  currentUserId,
  onRefresh
}: DatasetCardProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);

  const handleView = () => {
    setIsViewerOpen(true);
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setError(null);
      
      if (process.env.NODE_ENV === 'development') {
        // For development, we need to get the content first
        const response = await datasetService.mockGetDatasetContent(dataset.id, 0, 100000);
        const content = response.content;
        
        const type = dataset.format.match(/^(jpg|jpeg|png|gif|bmp|webp)$/)
          ? `image/${dataset.format}`
          : dataset.format === 'json' 
            ? 'application/json'
            : 'text/plain';
        
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = dataset.name;
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        setActionMessage({
          text: 'Dataset downloaded successfully',
          type: 'success'
        });
        
        // Clear message after a delay
        setTimeout(() => {
          setActionMessage(null);
        }, 3000);
      } else {
        // Production code
        const blob = await datasetService.downloadDataset(dataset.id);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = dataset.name;
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        setActionMessage({
          text: 'Dataset downloaded successfully',
          type: 'success'
        });
        
        // Clear message after a delay
        setTimeout(() => {
          setActionMessage(null);
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to download dataset');
      setActionMessage({
        text: err.message || 'Failed to download dataset',
        type: 'error'
      });
      
      // Clear message after a delay
      setTimeout(() => {
        setActionMessage(null);
      }, 5000);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const email = prompt('Enter the email of the user to share with:');
    if (!email) return;
    
    const permission = confirm('Click OK to grant edit permissions, or Cancel for view-only access') 
      ? 'edit' 
      : 'view';
    
    try {
      setIsLoading(true);
      
      if (process.env.NODE_ENV === 'development') {
        if (datasetService.mockShareDataset) {
          await datasetService.mockShareDataset(dataset.id, [email], permission);
        }
      } else {
        await datasetService.shareDataset(dataset.id, [email], permission);
      }
      
      setActionMessage({
        text: `Dataset shared with ${email}`,
        type: 'success'
      });
      
      // Clear message after a delay
      setTimeout(() => {
        setActionMessage(null);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to share dataset');
      setActionMessage({
        text: err.message || 'Failed to share dataset',
        type: 'error'
      });
      
      // Clear message after a delay
      setTimeout(() => {
        setActionMessage(null);
      }, 5000);
    } finally {
      setIsLoading(false);
      setIsMenuOpen(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this dataset?');
    if (!confirmed) return;
    
    try {
      setIsLoading(true);
      
      if (process.env.NODE_ENV === 'development') {
        // In development, just call the callback
        if (onDelete) {
          onDelete(dataset.id);
        }
      } else {
        await datasetService.deleteDataset(dataset.id);
        if (onDelete) {
          onDelete(dataset.id);
        }
      }
      
      setActionMessage({
        text: 'Dataset deleted successfully',
        type: 'success'
      });
      
      // Clear message after a delay
      setTimeout(() => {
        setActionMessage(null);
      }, 3000);
      
      // Refresh the list
      if (onRefresh) {
        onRefresh();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete dataset');
      setActionMessage({
        text: err.message || 'Failed to delete dataset',
        type: 'error'
      });
      
      // Clear message after a delay
      setTimeout(() => {
        setActionMessage(null);
      }, 5000);
    } finally {
      setIsLoading(false);
      setIsMenuOpen(false);
    }
  };

  const sourceIcon = getSourceIcon(dataset.source);
  const statusIcon = getStatusIcon(dataset.status);
  
  // Check if user owns this dataset
  const isOwner = dataset.ownerId === currentUserId;
  
  // Use updatedAt or lastModified or current date for the time display
  const getModifiedDate = () => {
    if (dataset.updatedAt) {
      return new Date(dataset.updatedAt);
    }
    if (dataset.lastModified) {
      return new Date(dataset.lastModified);
    }
    return new Date();
  };
  
  if (viewMode === 'list') {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl ${
            isDark 
              ? 'bg-[#00052d]/60 border border-[#00cbdd]/20 hover:border-[#00cbdd]/40' 
              : 'bg-white/80 border border-gray-200 hover:border-blue-300'
          } transition-all duration-300 relative`}
        >
          {/* Action message notification */}
          {actionMessage && (
            <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-sm flex items-center ${
              actionMessage.type === 'success' 
                ? 'bg-green-500/90 text-white' 
                : 'bg-red-500/90 text-white'
            }`}>
              {actionMessage.type === 'success' ? <CheckCircle className="h-4 w-4 mr-2" /> : <AlertCircle className="h-4 w-4 mr-2" />}
              <span>{actionMessage.text}</span>
              <button onClick={() => setActionMessage(null)} className="ml-2">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                {sourceIcon}
              </div>
              <div>
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {dataset.name}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {dataset.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                {statusIcon}
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {formatFileSize(dataset.size)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleView}
                  disabled={isLoading}
                  className={`p-2 rounded-lg ${
                    isDark 
                      ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Eye className="h-4 w-4" />
                </button>
                
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className={`p-2 rounded-lg ${
                    isDark 
                      ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  } ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Download className="h-4 w-4" />
                </button>
                
                {isOwner && (
                  <button
                    onClick={handleDelete}
                    disabled={isLoading}
                    className={`p-2 rounded-lg ${
                      isDark 
                        ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                        : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isViewerOpen && (
            <FileViewer
              isOpen={isViewerOpen}
              onClose={() => setIsViewerOpen(false)}
              dataset={dataset}
              isDark={isDark}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl border shadow-sm overflow-hidden ${
        isDark 
          ? 'bg-[#00052d]/80 border-[#00cbdd]/20 hover:border-[#00cbdd]/40' 
          : 'bg-white border-gray-200 hover:border-blue-300'
      } transition-colors ${viewMode === 'list' ? 'flex' : ''} relative`}
    >
      {/* Action message notification */}
      {actionMessage && (
        <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-sm flex items-center ${
          actionMessage.type === 'success' 
            ? 'bg-green-500/90 text-white' 
            : 'bg-red-500/90 text-white'
        }`}>
          {actionMessage.type === 'success' ? <CheckCircle className="h-4 w-4 mr-2" /> : <AlertCircle className="h-4 w-4 mr-2" />}
          <span>{actionMessage.text}</span>
          <button onClick={() => setActionMessage(null)} className="ml-2">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      
      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-lg ${
              isDark ? 'bg-white/10' : 'bg-gray-100'
            }`}>
              {getSourceIcon(dataset.source)}
            </div>
            <div>
              <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {dataset.name}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                {getStatusIcon(dataset.status)}
                <p className={`text-xs ${
                  dataset.status === 'ready' 
                    ? isDark ? 'text-green-400' : 'text-green-600'
                    : dataset.status === 'processing'
                    ? isDark ? 'text-yellow-400' : 'text-yellow-600'
                    : isDark ? 'text-red-400' : 'text-red-600'
                }`}>
                  {dataset.status.charAt(0).toUpperCase() + dataset.status.slice(1)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-1.5 rounded-md ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
              }`}
              aria-label="Dataset actions"
            >
              <MoreVertical className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </button>

            {isMenuOpen && (
              <div 
                className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10 ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <ul>
                  <li>
                    <button
                      onClick={handleShare}
                      disabled={isLoading || !isOwner}
                      className={`w-full text-left px-4 py-2 flex items-center ${
                        isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                      } ${(!isOwner || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Dataset
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleDelete}
                      disabled={isLoading || !isOwner}
                      className={`w-full text-left px-4 py-2 flex items-center ${
                        isDark ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-600'
                      } ${(!isOwner || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Dataset
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <p className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} line-clamp-2`}>
          {dataset.description}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-1.5">
          {dataset.tags.map((tag, index) => (
            <span 
              key={index}
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                isDark 
                  ? 'bg-[#00cbdd]/10 text-[#00cbdd]' 
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        
        <div className={`mt-6 flex items-center justify-between text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          <span>{dataset.format.toUpperCase()} • {formatFileSize(dataset.size)}</span>
          <span>Modified {formatDistanceToNow(getModifiedDate(), { addSuffix: true })}</span>
        </div>
        
        <div className="mt-6 flex gap-2">
          <button
            onClick={handleView}
            disabled={isLoading}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
              isDark 
                ? 'bg-[#00cbdd]/10 text-[#00cbdd] hover:bg-[#00cbdd]/20' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </button>
          
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
              isDark 
                ? 'bg-white/10 text-white hover:bg-white/15' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </button>
          
          {isOwner && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-white/10 text-white hover:bg-white/15' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* File Viewer */}
      <AnimatePresence>
        {isViewerOpen && (
          <FileViewer
            isOpen={isViewerOpen}
            onClose={() => setIsViewerOpen(false)}
            dataset={dataset}
            isDark={isDark}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
} 