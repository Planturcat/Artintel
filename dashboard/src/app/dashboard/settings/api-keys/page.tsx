'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import {
  ChevronLeft,
  Key,
  Plus,
  Copy,
  Trash2,
  RefreshCw,
  Clock,
  Shield,
  EyeOff,
  Info,
  Check,
  AlertTriangle,
  Globe,
  Database,
  Cpu,
  CheckCircle,
  EyeIcon,
  Eye
} from 'lucide-react';

interface ExtendedSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    tier?: string;
    role?: string;
    organization?: string | null;
  };
}

// Types for API keys
interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsed: string | null;
  expiration: string | null;
  scopes: string[];
  active: boolean;
}

interface CreateKeyForm {
  name: string;
  scopes: string[];
  expiration: string | null;
  environment: 'development' | 'production';
}

// Dummy data
const apiKeys: ApiKey[] = [
  {
    id: 'key_1',
    name: 'Development API Key',
    prefix: 'art_dev_1x2y3z',
    createdAt: '2023-02-15',
    lastUsed: '2023-03-12',
    expiration: '2023-12-31',
    scopes: ['model.read', 'model.write', 'data.read'],
    active: true
  },
  {
    id: 'key_2',
    name: 'Production API Key',
    prefix: 'art_prod_4a5b6c',
    createdAt: '2023-01-10',
    lastUsed: '2023-03-14',
    expiration: null,
    scopes: ['model.read', 'model.write', 'data.read', 'data.write'],
    active: true
  },
  {
    id: 'key_3',
    name: 'Test API Key',
    prefix: 'art_test_7d8e9f',
    createdAt: '2022-11-05',
    lastUsed: null,
    expiration: '2023-02-01',
    scopes: ['model.read'],
    active: false
  }
];

// Available scopes
const availableScopes = [
  { id: 'model.read', name: 'Model Access (Read)', description: 'Access to use any models' },
  { id: 'model.write', name: 'Model Management (Write)', description: 'Create and manage custom models' },
  { id: 'data.read', name: 'Data Access (Read)', description: 'Access to retrieve data' },
  { id: 'data.write', name: 'Data Management (Write)', description: 'Upload and manage data' },
  { id: 'audit.read', name: 'Audit Logs (Read)', description: 'Access audit and usage logs' }
];

export default function ApiKeysSettingsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { data: session, status } = useSession() as { data: ExtendedSession | null; status: string };
  
  const [isCreatingKey, setIsCreatingKey] = useState(false);
  const [showKeyInfo, setShowKeyInfo] = useState<string | null>(null);
  const [activeKeys, setActiveKeys] = useState<ApiKey[]>(apiKeys);
  
  // Form state
  const [createKeyForm, setCreateKeyForm] = useState<CreateKeyForm>({
    name: '',
    scopes: ['model.read'],
    expiration: null,
    environment: 'development'
  });

  // New key state after creation
  const [newKey, setNewKey] = useState<{fullKey: string, apiKey: ApiKey} | null>(null);

  // Validation
  const isCreateFormValid = createKeyForm.name.trim() !== '' && createKeyForm.scopes.length > 0;

  // Functions
  const handleCreateKey = () => {
    if (!isCreateFormValid) return;
    
    // Generate a fake key
    const keyPrefix = createKeyForm.environment === 'development' ? 'art_dev_' : 'art_prod_';
    const randomSuffix = Math.random().toString(36).substring(2, 10);
    const fakeFullKey = `${keyPrefix}${randomSuffix}_${Math.random().toString(36).substring(2, 10)}`;
    
    const newApiKey: ApiKey = {
      id: `key_${Date.now()}`,
      name: createKeyForm.name,
      prefix: `${keyPrefix}${randomSuffix}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: null,
      expiration: createKeyForm.expiration,
      scopes: createKeyForm.scopes,
      active: true
    };
    
    // Add to list
    setActiveKeys([newApiKey, ...activeKeys]);
    
    // Show the new key
    setNewKey({
      fullKey: fakeFullKey,
      apiKey: newApiKey
    });
    
    // Reset form
    setCreateKeyForm({
      name: '',
      scopes: ['model.read'],
      expiration: null,
      environment: 'development'
    });
    
    setIsCreatingKey(false);
    toast.success('API key created successfully');
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('API key copied to clipboard');
  };

  const handleToggleKeyInfo = (keyId: string) => {
    if (showKeyInfo === keyId) {
      setShowKeyInfo(null);
    } else {
      setShowKeyInfo(keyId);
    }
  };

  const handleRevokeKey = (keyId: string) => {
    setActiveKeys(activeKeys.map(key => 
      key.id === keyId ? { ...key, active: false } : key
    ));
    toast.success('API key revoked');
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    
    if (value === 'never') {
      setCreateKeyForm({ ...createKeyForm, expiration: null });
    } else if (value === 'custom') {
      // For simplicity, set to 30 days from now
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      setCreateKeyForm({ 
        ...createKeyForm, 
        expiration: thirtyDaysFromNow.toISOString().split('T')[0]
      });
    } else {
      const days = parseInt(value);
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + days);
      setCreateKeyForm({ 
        ...createKeyForm, 
        expiration: futureDate.toISOString().split('T')[0]
      });
    }
  };

  const handleScopeChange = (scopeId: string) => {
    const newScopes = createKeyForm.scopes.includes(scopeId)
      ? createKeyForm.scopes.filter(id => id !== scopeId)
      : [...createKeyForm.scopes, scopeId];
      
    setCreateKeyForm({ ...createKeyForm, scopes: newScopes });
  };

  const closeNewKeyDialog = () => {
    setNewKey(null);
  };

  // Count active keys
  const activeKeyCount = activeKeys.filter(key => key.active).length;
  
  // Determine max keys based on tier
  const tierLimits = {
    Free: 2,
    Pro: 10,
    Enterprise: Infinity
  };
  
  const maxKeys = session?.user.tier === 'Pro' 
    ? tierLimits.Pro 
    : session?.user.tier === 'Enterprise' 
      ? tierLimits.Enterprise 
      : tierLimits.Free;
      
  const canCreateMoreKeys = activeKeyCount < maxKeys;

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center">
        <Link 
          href="/dashboard/settings" 
          className={`mr-4 p-2 rounded-full transition-colors ${
            isDark 
              ? 'hover:bg-gray-800' 
              : 'hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
        </Link>
        <div>
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            API Keys
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Create and manage API keys for accessing Artintel services
          </p>
        </div>
      </div>

      {/* API Keys Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className={`px-4 py-2 rounded-lg ${
          isDark ? 'bg-indigo-900/20 border border-indigo-900/30' : 'bg-indigo-50 border border-indigo-100'
        }`}>
          <span className={`text-sm font-medium ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
            {activeKeyCount} / {maxKeys === Infinity ? '∞' : maxKeys} API Keys Used
          </span>
        </div>
        
        <button
          onClick={() => setIsCreatingKey(!isCreatingKey)}
          disabled={!canCreateMoreKeys}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors ${
            canCreateMoreKeys
              ? isDark 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
              : isDark
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isCreatingKey ? (
            <>
              <Key className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Create New API Key
            </>
          )}
        </button>
      </div>

      {/* New Key Form */}
      {isCreatingKey && (
        <div className={`rounded-xl border ${isDark ? 'border-indigo-500/20 bg-[#00091b]/90 backdrop-blur-md' : 'border-indigo-200 bg-white shadow-sm'}`}>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Key className={`h-5 w-5 mr-2 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Create New API Key
              </h2>
            </div>
            
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="key-name" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Key Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="key-name"
                  value={createKeyForm.name}
                  onChange={(e) => setCreateKeyForm({ ...createKeyForm, name: e.target.value })}
                  placeholder="e.g. Development API Key"
                  className={`w-full rounded-lg border px-3 py-2 ${
                    isDark
                      ? 'bg-gray-900/50 border-gray-700 text-white focus:border-indigo-500 focus:ring focus:ring-indigo-500/20'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-500/20'
                  }`}
                  required
                />
              </div>
              
              {/* Environment */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Environment
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="environment"
                      checked={createKeyForm.environment === 'development'}
                      onChange={() => setCreateKeyForm({ ...createKeyForm, environment: 'development' })}
                      className={`mr-2 ${
                        isDark ? 'text-indigo-500 focus:ring-indigo-500/20' : 'text-indigo-600 focus:ring-indigo-500/20'
                      }`}
                    />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Development</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="environment"
                      checked={createKeyForm.environment === 'production'}
                      onChange={() => setCreateKeyForm({ ...createKeyForm, environment: 'production' })}
                      className={`mr-2 ${
                        isDark ? 'text-indigo-500 focus:ring-indigo-500/20' : 'text-indigo-600 focus:ring-indigo-500/20'
                      }`}
                    />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Production</span>
                  </label>
                </div>
              </div>
              
              {/* Expiration */}
              <div>
                <label htmlFor="key-expiration" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Expiration
                </label>
                <select
                  id="key-expiration"
                  onChange={handleExpirationChange}
                  className={`w-full rounded-lg border px-3 py-2 ${
                    isDark
                      ? 'bg-gray-900/50 border-gray-700 text-white focus:border-indigo-500 focus:ring focus:ring-indigo-500/20'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-500/20'
                  }`}
                >
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">365 days</option>
                  <option value="never">Never expires</option>
                  <option value="custom">Custom date</option>
                </select>
                {createKeyForm.expiration && (
                  <p className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    This key will expire on {new Date(createKeyForm.expiration).toLocaleDateString()}
                  </p>
                )}
              </div>
              
              {/* Scopes */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Permissions <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {availableScopes.map((scope) => (
                    <label key={scope.id} className="flex items-start">
                      <input
                        type="checkbox"
                        checked={createKeyForm.scopes.includes(scope.id)}
                        onChange={() => handleScopeChange(scope.id)}
                        className={`mt-1 mr-2 ${
                          isDark ? 'text-indigo-500 focus:ring-indigo-500/20' : 'text-indigo-600 focus:ring-indigo-500/20'
                        }`}
                      />
                      <div>
                        <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {scope.name}
                        </span>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {scope.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Create Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleCreateKey}
                  disabled={!isCreateFormValid}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isCreateFormValid
                      ? isDark 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : isDark
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Create API Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newly Created Key */}
      {newKey && (
        <div className={`rounded-xl border ${isDark ? 'border-indigo-500/20 bg-indigo-900/20 backdrop-blur-md' : 'border-indigo-200 bg-indigo-50 shadow-sm'}`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Key className={`h-5 w-5 mr-2 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Your New API Key
                </h2>
              </div>
              <button
                onClick={closeNewKeyDialog}
                className={`p-1 rounded-full ${
                  isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-200'
                }`}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            
            <div className={`p-4 rounded-lg border mb-4 ${
              isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
            }`}>
              <div className="flex justify-between items-center">
                <span className={`font-mono ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
                  {newKey.fullKey}
                </span>
                <button
                  onClick={() => handleCopyKey(newKey.fullKey)}
                  className={`p-2 rounded ${
                    isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <Copy className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              isDark ? 'bg-amber-900/30 border-amber-900/30 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}>
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm">
                  This API key will only be displayed once. Please store it securely as you won't be able to see it again.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Keys List */}
      <div className={`rounded-xl border ${isDark ? 'border-[#00cbdd]/20 bg-[#00091b]/90 backdrop-blur-md' : 'border-gray-200 bg-white shadow-sm'}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Key className={`h-5 w-5 mr-2 ${isDark ? 'text-[#00cbdd]' : 'text-indigo-600'}`} />
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Your API Keys
            </h2>
          </div>
          
          {activeKeys.length === 0 ? (
            <div className={`p-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <Key className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No API keys found</p>
              <p className="text-sm mt-1">Create your first API key to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeKeys.map((apiKey) => (
                <div 
                  key={apiKey.id}
                  className={`rounded-lg border ${
                    !apiKey.active 
                      ? isDark 
                        ? 'border-gray-800 bg-gray-900/40 opacity-60' 
                        : 'border-gray-200 bg-gray-50 opacity-60'
                      : isDark 
                        ? 'border-gray-800 bg-gray-900/40' 
                        : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="mb-2 sm:mb-0">
                        <div className="flex items-center">
                          <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {apiKey.name}
                          </span>
                          {!apiKey.active && (
                            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                              isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
                            }`}>
                              Revoked
                            </span>
                          )}
                          {apiKey.expiration && new Date(apiKey.expiration) < new Date() && (
                            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                              isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-800'
                            }`}>
                              Expired
                            </span>
                          )}
                        </div>
                        <div className="flex items-center">
                          <span className={`text-sm font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {apiKey.prefix}•••••••••••••••••••
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleKeyInfo(apiKey.id)}
                          className={`p-2 rounded transition-colors ${
                            isDark 
                              ? 'hover:bg-gray-800 text-gray-400' 
                              : 'hover:bg-gray-100 text-gray-600'
                          }`}
                          aria-label="Show key details"
                        >
                          {showKeyInfo === apiKey.id ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                        {apiKey.active && (
                          <button
                            onClick={() => handleRevokeKey(apiKey.id)}
                            className={`p-2 rounded transition-colors ${
                              isDark 
                                ? 'hover:bg-gray-800 text-gray-400' 
                                : 'hover:bg-gray-100 text-gray-600'
                            }`}
                            aria-label="Revoke key"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {showKeyInfo === apiKey.id && (
                      <div className={`mt-4 p-4 rounded-lg border ${
                        isDark ? 'border-gray-800 bg-gray-900/40' : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className={`text-xs font-medium uppercase mb-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                              Created
                            </h4>
                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {apiKey.createdAt}
                            </div>
                          </div>
                          <div>
                            <h4 className={`text-xs font-medium uppercase mb-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                              Last Used
                            </h4>
                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {apiKey.lastUsed || 'Never used'}
                            </div>
                          </div>
                          <div>
                            <h4 className={`text-xs font-medium uppercase mb-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                              Expiration
                            </h4>
                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {apiKey.expiration || 'Never expires'}
                            </div>
                          </div>
                          <div>
                            <h4 className={`text-xs font-medium uppercase mb-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                              Status
                            </h4>
                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {!apiKey.active ? (
                                <span className="flex items-center text-red-500">
                                  <Trash2 className="h-3 w-3 mr-1" /> Revoked
                                </span>
                              ) : apiKey.expiration && new Date(apiKey.expiration) < new Date() ? (
                                <span className="flex items-center text-amber-500">
                                  <Clock className="h-3 w-3 mr-1" /> Expired
                                </span>
                              ) : (
                                <span className="flex items-center text-green-500">
                                  <CheckCircle className="h-3 w-3 mr-1" /> Active
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <h4 className={`text-xs font-medium uppercase mt-4 mb-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          Permissions
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {apiKey.scopes.map((scope) => (
                            <span 
                              key={scope}
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                isDark 
                                  ? 'bg-indigo-900/30 text-indigo-300' 
                                  : 'bg-indigo-100 text-indigo-800'
                              }`}
                            >
                              {availableScopes.find(s => s.id === scope)?.name || scope}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* API Keys Security Notice */}
      <div className={`rounded-xl border ${isDark ? 'border-[#00cbdd]/20 bg-[#00091b]/90 backdrop-blur-md' : 'border-gray-200 bg-white shadow-sm'}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Shield className={`h-5 w-5 mr-2 ${isDark ? 'text-[#00cbdd]' : 'text-indigo-600'}`} />
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              API Key Security
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className={`p-4 rounded-lg flex items-start gap-3 ${
              isDark 
                ? 'bg-blue-500/10 border border-blue-500/20'
                : 'bg-blue-50 border border-blue-100'
            }`}>
              <Info className={`h-5 w-5 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
              <div>
                <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                  Your API keys carry many privileges, so be sure to keep them secure. Do not share your API keys in publicly accessible areas such as GitHub, client-side code, or social media.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border ${
                isDark ? 'border-gray-800 bg-gray-900/40' : 'border-gray-200 bg-gray-50'
              }`}>
                <h3 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Rate Limiting
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {session?.user.tier === 'Free' 
                    ? "Free tier is limited to 60 requests per minute."
                    : session?.user.tier === 'Pro'
                      ? "Pro tier is limited to 300 requests per minute."
                      : "Enterprise tier has custom rate limits based on your plan."}
                </p>
              </div>
              
              <div className={`p-4 rounded-lg border ${
                isDark ? 'border-gray-800 bg-gray-900/40' : 'border-gray-200 bg-gray-50'
              }`}>
                <h3 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Authentication
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Use API keys in the header of your requests:
                  <code className={`block mt-2 p-2 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                    Authorization: Bearer YOUR_API_KEY
                  </code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 