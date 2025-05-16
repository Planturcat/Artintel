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
      <div className={`text-center py-8 ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}>
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
            isDark ? 'bg-cosmic-800' : 'bg-white border border-[#00cbdd]/10'
          } overflow-hidden transition-all duration-200`}
        >
          {/* Header */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Server className={`h-5 w-5 ${
                deployment.status === 'running' ? 'text-success-500' :
                deployment.status === 'failed' ? 'text-error-500' :
                deployment.status === 'scaling' ? 'text-[#00cbdd]' : 'text-[#7fe4eb]'
              }`} />
              <div>
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                  {deployment.name}
                </h3>
                <p className={`text-sm ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}>
                  {deployment.model} • {deployment.environment}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleStatusToggle(deployment)}
                disabled={isUpdating === deployment.id || deployment.status === 'failed'}
                className={`p-1.5 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-[#001824]' : 'hover:bg-[#E6FCFF]'
                } ${
                  isUpdating === deployment.id ? 'opacity-50 cursor-wait' : ''
                } ${
                  deployment.status === 'failed' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {deployment.status === 'running' ? (
                  <Pause className={`h-4 w-4 ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`} />
                ) : (
                  <Play className={`h-4 w-4 ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`} />
                )}
              </button>

              <button
                onClick={() => setExpandedId(expandedId === deployment.id ? null : deployment.id)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-[#001824]' : 'hover:bg-[#E6FCFF]'
                }`}
              >
                {expandedId === deployment.id ? (
                  <ChevronUp className={`h-4 w-4 ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`} />
                ) : (
                  <ChevronDown className={`h-4 w-4 ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`} />
                )}
              </button>
            </div>
          </div>

          {/* Expanded Details */}
          {expandedId === deployment.id && (
            <div className={`p-4 border-t ${isDark ? 'border-[#00cbdd]/20' : 'border-[#00cbdd]/10'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Region Info */}
                <div className={`p-3 rounded-lg ${isDark ? 'bg-cosmic-800/80' : 'bg-white border border-[#00cbdd]/10'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className={`h-4 w-4 ${isDark ? 'text-[#00cbdd]' : 'text-[#00cbdd]'}`} />
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                      Region
                    </span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}>
                    {deployment.region}
                  </p>
                </div>

                {/* Timing Info */}
                <div className={`p-3 rounded-lg ${isDark ? 'bg-cosmic-800/80' : 'bg-white border border-[#00cbdd]/10'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className={`h-4 w-4 ${isDark ? 'text-[#00cbdd]' : 'text-[#00cbdd]'}`} />
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                      Deployed
                    </span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}>
                    {formatDistanceToNow(new Date(deployment.createdAt))} ago
                  </p>
                </div>

                {/* Performance Metrics */}
                <div className={`p-3 rounded-lg ${isDark ? 'bg-cosmic-800/80' : 'bg-white border border-[#00cbdd]/10'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart className={`h-4 w-4 ${isDark ? 'text-[#00cbdd]' : 'text-[#00cbdd]'}`} />
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                      Performance
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}>
                      {deployment.metrics.requestsPerSecond} req/s
                    </p>
                    <p className={`text-sm ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}>
                      {deployment.metrics.latency}ms latency
                    </p>
                    <p className={`text-sm ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}>
                      {(deployment.metrics.errorRate * 100).toFixed(2)}% error rate
                    </p>
                  </div>
                </div>

                {/* Resource Usage */}
                <div className={`p-3 rounded-lg ${isDark ? 'bg-cosmic-800/80' : 'bg-white border border-[#00cbdd]/10'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Server className={`h-4 w-4 ${isDark ? 'text-[#00cbdd]' : 'text-[#00cbdd]'}`} />
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                      Resources
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}>
                      CPU: {deployment.resources.cpuUsage}%
                    </p>
                    <p className={`text-sm ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}>
                      Memory: {deployment.resources.memoryUsage}%
                    </p>
                    {deployment.resources.gpuUsage && (
                      <p className={`text-sm ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}>
                        GPU: {deployment.resources.gpuUsage}%
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Endpoint Information */}
              {deployment.endpoint && (
                <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-cosmic-800/80' : 'bg-white border border-[#00cbdd]/10'}`}>
                  <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                    API Endpoint
                  </h4>
                  <code className={`text-sm font-mono p-2 rounded block w-full break-all ${
                    isDark ? 'bg-cosmic-900 text-[#7fe4eb]' : 'bg-[#E6FCFF] text-[#00cbdd]'
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