import { useState } from 'react';
import { Deployment } from '@/types/deployment';
import { ChevronDown, ChevronUp, Server, Globe, Clock, BarChart, Play, Pause, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DeploymentListProps {
  deployments: Deployment[];
  isDark: boolean;
  onStatusChange: (deploymentId: string, newStatus: Deployment['status']) => Promise<void>;
}

export default function DeploymentList({ deployments, isDark, onStatusChange }: DeploymentListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleStatusToggle = async (deployment: Deployment) => {
    try {
      setIsUpdating(deployment.id);
      const newStatus = deployment.status === 'running' ? 'stopped' : 'running';
      await onStatusChange(deployment.id, newStatus);
    } finally {
      setIsUpdating(null);
    }
  };

  if (deployments.length === 0) {
    return (
      <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        No active deployments found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {deployments.map((deployment) => (
        <div
          key={deployment.id}
          className={`rounded-lg ${
            isDark ? 'bg-gray-800/50' : 'bg-gray-50'
          } overflow-hidden transition-all duration-200`}
        >
          {/* Header */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Server className={`h-5 w-5 ${
                deployment.status === 'running' ? 'text-green-500' : 
                deployment.status === 'failed' ? 'text-red-500' : 
                deployment.status === 'scaling' ? 'text-blue-500' : 'text-gray-500'
              }`} />
              <div>
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {deployment.name}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {deployment.model} • {deployment.environment}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleStatusToggle(deployment)}
                disabled={isUpdating === deployment.id || deployment.status === 'failed'}
                className={`p-1.5 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                } ${
                  isUpdating === deployment.id ? 'opacity-50 cursor-wait' : ''
                } ${
                  deployment.status === 'failed' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {deployment.status === 'running' ? (
                  <Pause className="h-4 w-4 text-gray-400" />
                ) : (
                  <Play className="h-4 w-4 text-gray-400" />
                )}
              </button>
              
              <button
                onClick={() => setExpandedId(expandedId === deployment.id ? null : deployment.id)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                }`}
              >
                {expandedId === deployment.id ? (
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Expanded Details */}
          {expandedId === deployment.id && (
            <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Region Info */}
                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-white'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      Region
                    </span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {deployment.region}
                  </p>
                </div>

                {/* Timing Info */}
                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-white'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      Deployed
                    </span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {formatDistanceToNow(new Date(deployment.createdAt))} ago
                  </p>
                </div>

                {/* Performance Metrics */}
                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-white'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart className="h-4 w-4 text-gray-400" />
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      Performance
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {deployment.metrics.requestsPerSecond} req/s
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {deployment.metrics.latency}ms latency
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {(deployment.metrics.errorRate * 100).toFixed(2)}% error rate
                    </p>
                  </div>
                </div>

                {/* Resource Usage */}
                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-white'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Server className="h-4 w-4 text-gray-400" />
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      Resources
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      CPU: {deployment.resources.cpuUsage}%
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Memory: {deployment.resources.memoryUsage}%
                    </p>
                    {deployment.resources.gpuUsage && (
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        GPU: {deployment.resources.gpuUsage}%
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Endpoint Information */}
              {deployment.endpoint && (
                <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-white'}`}>
                  <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    API Endpoint
                  </h4>
                  <code className={`text-sm font-mono p-2 rounded block w-full break-all ${
                    isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {deployment.endpoint}
                  </code>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}