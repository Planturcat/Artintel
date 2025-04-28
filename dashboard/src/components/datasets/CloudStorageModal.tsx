"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Cloud,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Lock
} from 'lucide-react';
import { CloudProvider, CloudStorageConfig } from '@/types/dataset';

interface CloudStorageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (config: CloudStorageConfig) => Promise<void>;
  isDark?: boolean;
}

const cloudProviders: { id: CloudProvider; name: string; }[] = [
  { id: 'aws', name: 'Amazon S3' },
  { id: 'gcp', name: 'Google Cloud Storage' },
  { id: 'azure', name: 'Azure Blob Storage' }
];

export default function CloudStorageModal({ isOpen, onClose, onConnect, isDark }: CloudStorageModalProps) {
  const [provider, setProvider] = useState<CloudProvider>('aws');
  const [credentials, setCredentials] = useState({
    accessKeyId: '',
    secretAccessKey: '',
    projectId: '',
    connectionString: ''
  });
  const [region, setRegion] = useState('');
  const [bucket, setBucket] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setError(null);
    setIsConnecting(true);

    try {
      // Validate required fields based on provider
      if (provider === 'aws') {
        if (!credentials.accessKeyId || !credentials.secretAccessKey || !bucket) {
          throw new Error('Please fill in all required fields for AWS S3');
        }
      } else if (provider === 'gcp') {
        if (!credentials.projectId || !bucket) {
          throw new Error('Please fill in all required fields for Google Cloud Storage');
        }
      } else if (provider === 'azure') {
        if (!credentials.connectionString || !bucket) {
          throw new Error('Please fill in all required fields for Azure Blob Storage');
        }
      }

      await onConnect({
        provider,
        credentials: {
          accessKeyId: credentials.accessKeyId,
          secretAccessKey: credentials.secretAccessKey,
          projectId: credentials.projectId,
          connectionString: credentials.connectionString
        },
        region,
        bucket
      });

      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to connect to cloud storage');
    } finally {
      setIsConnecting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className={`w-full max-w-2xl rounded-xl ${
          isDark 
            ? 'bg-[#00052d]/90 border border-[#00cbdd]/20' 
            : 'bg-white border border-gray-200'
        } shadow-xl overflow-hidden`}
      >
        {/* Header */}
        <div className={`p-6 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Connect Cloud Storage
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${
                isDark 
                  ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Error message */}
          {error && (
            <div className="flex items-center p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p>{error}</p>
            </div>
          )}

          {/* Provider Selection */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Cloud Provider
            </label>
            <div className="relative">
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as CloudProvider)}
                className={`w-full px-3 py-2 rounded-lg border appearance-none ${
                  isDark 
                    ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40`}
              >
                {cloudProviders.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
          </div>

          {/* Credentials */}
          <div className="space-y-4">
            {provider === 'aws' && (
              <>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Access Key ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={credentials.accessKeyId}
                      onChange={(e) => setCredentials(prev => ({ ...prev, accessKeyId: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDark 
                          ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white placeholder:text-gray-500'
                          : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
                      } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40`}
                      placeholder="Enter your AWS Access Key ID"
                    />
                    <Lock className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Secret Access Key
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={credentials.secretAccessKey}
                      onChange={(e) => setCredentials(prev => ({ ...prev, secretAccessKey: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDark 
                          ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white placeholder:text-gray-500'
                          : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
                      } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40`}
                      placeholder="Enter your AWS Secret Access Key"
                    />
                    <Lock className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                  </div>
                </div>
              </>
            )}

            {provider === 'gcp' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Project ID
                </label>
                <input
                  type="text"
                  value={credentials.projectId}
                  onChange={(e) => setCredentials(prev => ({ ...prev, projectId: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDark 
                      ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white placeholder:text-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
                  } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40`}
                  placeholder="Enter your GCP Project ID"
                />
              </div>
            )}

            {provider === 'azure' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Connection String
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={credentials.connectionString}
                    onChange={(e) => setCredentials(prev => ({ ...prev, connectionString: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white placeholder:text-gray-500'
                        : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
                    } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40`}
                    placeholder="Enter your Azure Storage Connection String"
                  />
                  <Lock className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
              </div>
            )}

            {/* Region (optional for AWS) */}
            {provider === 'aws' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Region (Optional)
                </label>
                <input
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDark 
                      ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white placeholder:text-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
                  } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40`}
                  placeholder="e.g., us-east-1"
                />
              </div>
            )}

            {/* Bucket/Container Name */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {provider === 'azure' ? 'Container Name' : 'Bucket Name'}
              </label>
              <input
                type="text"
                value={bucket}
                onChange={(e) => setBucket(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark 
                    ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white placeholder:text-gray-500'
                    : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
                } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40`}
                placeholder={`Enter your ${provider === 'azure' ? 'container' : 'bucket'} name`}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/15 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white hover:from-[#00b0c0] hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isConnecting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Connecting...
                </>
              ) : (
                <>
                  <Cloud className="h-4 w-4 mr-2" />
                  Connect
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 