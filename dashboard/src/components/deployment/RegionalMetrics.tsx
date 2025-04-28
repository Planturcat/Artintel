import { Globe } from 'lucide-react';
import { DeploymentRegion } from '@/types/deployment';

interface RegionalMetricsProps {
  regions: DeploymentRegion[];
  isDark: boolean;
}

export default function RegionalMetrics({ regions, isDark }: RegionalMetricsProps) {
  return (
    <div className={`rounded-xl border ${
      isDark 
        ? 'border-gray-800 bg-gray-900/50 backdrop-blur-xl' 
        : 'border-gray-200 bg-white'
    }`}>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Globe className={`h-5 w-5 mr-2 ${
            isDark ? 'text-[#00cbdd]' : 'text-blue-500'
          }`} />
          <h2 className={`text-xl font-semibold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Regional Performance
          </h2>
        </div>

        <div className="space-y-4">
          {regions.map((region) => (
            <div key={region.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className={`font-medium ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {region.name}
                  </h3>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {region.activeDeployments} active deployments
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {region.averageLatency}ms
                  </p>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    avg. latency
                  </p>
                </div>
              </div>

              {/* Performance Bar */}
              <div className={`h-2 rounded-full overflow-hidden ${
                isDark ? 'bg-gray-800' : 'bg-gray-200'
              }`}>
                <div 
                  className={`h-full rounded-full transition-all ${
                    region.health >= 90 
                      ? isDark ? 'bg-green-500' : 'bg-green-500' 
                      : region.health >= 75 
                        ? isDark ? 'bg-amber-500' : 'bg-amber-500'
                        : isDark ? 'bg-red-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${region.health}%` }}
                />
              </div>

              {/* Additional Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Requests/min
                  </p>
                  <p className={`font-medium ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {region.requestsPerMinute}
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Error Rate
                  </p>
                  <p className={`font-medium ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {region.errorRate}%
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Uptime
                  </p>
                  <p className={`font-medium ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {region.uptime}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}