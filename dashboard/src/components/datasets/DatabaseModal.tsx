"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Database,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Lock,
  Shield
} from 'lucide-react';
import { DatabaseType, DatabaseConfig } from '@/types/dataset';

interface DatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (config: DatabaseConfig) => Promise<void>;
  isDark?: boolean;
}

const databaseTypes: { id: DatabaseType; name: string; }[] = [
  { id: 'postgresql', name: 'PostgreSQL' },
  { id: 'mysql', name: 'MySQL' },
  { id: 'mongodb', name: 'MongoDB' },
  { id: 'elasticsearch', name: 'Elasticsearch' }
];

export default function DatabaseModal({ isOpen, onClose, onConnect, isDark }: DatabaseModalProps) {
  const [type, setType] = useState<DatabaseType>('postgresql');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [database, setDatabase] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ssl, setSsl] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setError(null);
    setIsConnecting(true);

    try {
      // Validate required fields
      if (!host || !port || !database || !username || !password) {
        throw new Error('Please fill in all required fields');
      }

      // Validate port number
      const portNumber = parseInt(port, 10);
      if (isNaN(portNumber) || portNumber < 1 || portNumber > 65535) {
        throw new Error('Please enter a valid port number (1-65535)');
      }

      await onConnect({
        type,
        host,
        port: portNumber,
        database,
        username,
        password,
        ssl,
      });

      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to connect to database');
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
              Connect Database
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

          {/* Database Type Selection */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Database Type
            </label>
            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value as DatabaseType)}
                className={`w-full px-3 py-2 rounded-lg border appearance-none ${
                  isDark 
                    ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40`}
              >
                {databaseTypes.map((db) => (
                  <option key={db.id} value={db.id}>{db.name}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
          </div>

          {/* Connection Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Host
              </label>
              <input
                type="text"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark 
                    ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white placeholder:text-gray-500'
                    : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
                } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40`}
                placeholder="e.g., localhost or db.example.com"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Port
              </label>
              <input
                type="text"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark 
                    ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white placeholder:text-gray-500'
                    : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
                } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40`}
                placeholder={type === 'postgresql' ? '5432' : type === 'mysql' ? '3306' : type === 'mongodb' ? '27017' : '9200'}
              />
            </div>

            <div className="md:col-span-2">
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Database Name
              </label>
              <input
                type="text"
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark 
                    ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white placeholder:text-gray-500'
                    : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
                } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40`}
                placeholder="Enter database name"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDark 
                      ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white placeholder:text-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
                  } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40`}
                  placeholder="Enter username"
                />
                <Lock className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDark 
                      ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white placeholder:text-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
                  } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40`}
                  placeholder="Enter password"
                />
                <Lock className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
            </div>
          </div>

          {/* SSL Option */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="ssl"
              checked={ssl}
              onChange={(e) => setSsl(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-[#00cbdd] focus:ring-[#00cbdd]"
            />
            <label
              htmlFor="ssl"
              className={`ml-2 flex items-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              <Shield className="h-4 w-4 mr-1" />
              Use SSL/TLS connection
            </label>
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
                  <Database className="h-4 w-4 mr-2" />
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