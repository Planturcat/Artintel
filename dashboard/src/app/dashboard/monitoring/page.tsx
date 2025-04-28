'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Activity,
  Clock,
  Cpu,
  Database,
  HardDrive,
  LineChart,
  RefreshCw,
  AlertTriangle,
  BarChart2,
  Zap,
  Calendar,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import Button from '@/components/ui/Button';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { getMonitoringMetrics, getDetailedMetrics } from '@/dashboard-api/monitoring-api';
import DetailedMetricsModal from '@/components/monitoring/DetailedMetricsModal';

export default function MonitoringPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailedMetrics, setDetailedMetrics] = useState<any>(null);
  const [detailedMetricsType, setDetailedMetricsType] = useState<'system' | 'model' | 'resource'>('system');
  const [detailedMetricsTitle, setDetailedMetricsTitle] = useState('');
  const [showDetailedMetrics, setShowDetailedMetrics] = useState(false);

  const fetchMetrics = async () => {
    setLoading(true);
    setIsRefreshing(true);
    setError(null);
    
    try {
      const data = await getMonitoringMetrics(timeRange);
      console.log("Received metrics data:", data);
      console.log("systemHealth:", data.systemHealth);
      console.log("responseTime:", data.responseTime ? data.responseTime.length : 0, "items");
      console.log("throughput:", data.throughput ? data.throughput.length : 0, "items");
      console.log("modelMetrics:", data.modelMetrics);
      console.log("alerts:", data.alerts ? data.alerts.length : 0, "items");
      console.log("resourceUsage:", data.resourceUsage ? data.resourceUsage.length : 0, "items");
      setMetrics(data);
    } catch (error) {
      console.error("Error fetching monitoring metrics:", error);
      // Set metrics to a default state that matches the exact structure from the API
      setMetrics({
        systemHealth: {
          cpu: 0,
          memory: 0,
          gpu: 0,
          storage: 0,
          network: 0,
          details: {
            cpuCores: 0,
            cpuThreads: 0,
            totalMemory: 0,
            freeMemory: 0,
            gpuModel: 'N/A',
            gpuMemory: 0,
            diskTotal: 0,
            diskFree: 0,
            networkIn: 0,
            networkOut: 0
          }
        },
        responseTime: [],
        throughput: [],
        errorRates: [],
        modelMetrics: {
          accuracy: 0,
          latency: 0,
          throughput: 0,
          driftScore: 0,
          details: {
            precisionByClass: {},
            recallByClass: {},
            f1ScoreByClass: {},
            confusionMatrix: [],
            rocCurve: [],
            prCurve: []
          }
        },
        alerts: [],
        resourceUsage: []
      });
      setError('Failed to fetch monitoring metrics. Please try again.');
    } finally {
      // Small delay to ensure UI updates are visible
      setTimeout(() => {
        setIsRefreshing(false);
      }, 500);
    }
  };

  const showDetails = async (type: 'system' | 'model' | 'resource', title: string, id?: string) => {
    try {
      const data = await getDetailedMetrics(type, id, timeRange);
      setDetailedMetrics(data);
      setDetailedMetricsType(type);
      setDetailedMetricsTitle(title);
      setShowDetailedMetrics(true);
    } catch (err) {
      setError('Failed to load detailed metrics');
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [timeRange]);

  useEffect(() => {
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, [timeRange]);

  // Update loading state when metrics are received
  useEffect(() => {
    if (metrics) {
      console.log("Metrics state updated:", metrics);
      setLoading(false);
    }
  }, [metrics]);

  const getStatusColor = (value: number) => {
    if (value >= 80) return 'text-red-500';
    if (value >= 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  if (loading && !metrics) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin">
          <RefreshCw className="w-8 h-8 text-[#00cbdd]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-500 mb-2">Error Loading Metrics</h3>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{error}</p>
          <Button onClick={fetchMetrics} variant="outline" className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Monitoring
          </h1>
          <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Track system performance and model health
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className={showFilters ? 'ring-2 ring-[#00cbdd]' : ''}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button
            onClick={fetchMetrics}
            variant="outline"
            disabled={isRefreshing}
            className="flex items-center"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Metrics'}
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <DashboardCard
        title="Time Range"
        subtitle="Select the time period for metrics display"
      >
        <div className="flex items-center space-x-4">
          <Calendar className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <div className="flex space-x-2">
            {(['1h', '24h', '7d', '30d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  timeRange === range
                    ? 'bg-[#00cbdd] text-white'
                    : isDark
                      ? 'bg-white/10 text-gray-300 hover:bg-white/15'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </DashboardCard>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {metrics && metrics.systemHealth ? Object.entries(metrics.systemHealth).map(([key, value]) => {
          if (key === 'details') return null;
          const numericValue = typeof value === 'number' ? value : 0;
          return (
            <DashboardCard
              key={key}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
              subtitle={`Current ${key} utilization`}
              className="cursor-pointer hover:ring-2 hover:ring-[#00cbdd] transition-all"
              onClick={() => showDetails('system', 'System Health')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {key === 'cpu' && <Cpu className={`w-5 h-5 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />}
                  {key === 'memory' && <HardDrive className={`w-5 h-5 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />}
                  {key === 'gpu' && <Activity className={`w-5 h-5 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />}
                  {key === 'storage' && <Database className={`w-5 h-5 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />}
                  {key === 'network' && <Activity className={`w-5 h-5 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />}
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                </div>
                <div className="flex items-center">
                  <span className={`text-lg font-semibold ${getStatusColor(numericValue)}`}>
                    {numericValue}%
                  </span>
                  <ChevronRight className="w-5 h-5 ml-2 text-gray-400" />
                </div>
              </div>
              <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00cbdd] to-[#00cbdd]/70 rounded-full transition-all duration-500"
                  style={{ width: `${numericValue}%` }}
                />
              </div>
            </DashboardCard>
          );
        }) : (
          <div className="col-span-5 text-center p-4">
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No system health metrics available</p>
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Response Time"
          subtitle="Average response time over time"
          className="cursor-pointer hover:ring-2 hover:ring-[#00cbdd] transition-all"
          onClick={() => showDetails('model', 'Response Time')}
        >
          <div className="h-[300px]">
            {metrics && metrics.responseTime && metrics.responseTime.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics.responseTime}>
                  <defs>
                    <linearGradient id="responseTimeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00cbdd" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00cbdd" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1f2937' : '#e5e7eb'} />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                  />
                  <YAxis
                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                    label={{
                      value: 'ms',
                      angle: -90,
                      position: 'insideLeft',
                      fill: isDark ? '#9ca3af' : '#6b7280'
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1f2937' : '#ffffff',
                      border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#00cbdd"
                    fill="url(#responseTimeGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No response time data available</p>
              </div>
            )}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Throughput"
          subtitle="Requests processed per second"
          className="cursor-pointer hover:ring-2 hover:ring-[#00cbdd] transition-all"
          onClick={() => showDetails('model', 'Throughput')}
        >
          <div className="h-[300px]">
            {metrics && metrics.throughput && metrics.throughput.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics.throughput}>
                  <defs>
                    <linearGradient id="throughputGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00cbdd" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00cbdd" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1f2937' : '#e5e7eb'} />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                  />
                  <YAxis
                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                    label={{
                      value: 'req/s',
                      angle: -90,
                      position: 'insideLeft',
                      fill: isDark ? '#9ca3af' : '#6b7280'
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1f2937' : '#ffffff',
                      border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#00cbdd"
                    fill="url(#throughputGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No throughput data available</p>
              </div>
            )}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Error Rates"
          subtitle="Percentage of failed requests"
          className="cursor-pointer hover:ring-2 hover:ring-[#00cbdd] transition-all"
          onClick={() => showDetails('system', 'Error Rates')}
        >
          <div className="h-[300px]">
            {metrics && metrics.errorRates && metrics.errorRates.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics.errorRates}>
                  <defs>
                    <linearGradient id="errorRateGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff4d4f" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ff4d4f" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1f2937' : '#e5e7eb'} />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                  />
                  <YAxis
                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                    label={{
                      value: '%',
                      angle: -90,
                      position: 'insideLeft',
                      fill: isDark ? '#9ca3af' : '#6b7280'
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1f2937' : '#ffffff',
                      border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '0.5rem'
                    }}
                    formatter={(value: any) => [`${(value * 100).toFixed(2)}%`, 'Error Rate']}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#ff4d4f"
                    fill="url(#errorRateGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No error rate data available</p>
              </div>
            )}
          </div>
        </DashboardCard>
      </div>

      {/* Model Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard
          title="Model Performance"
          subtitle="Key performance indicators"
          className="cursor-pointer hover:ring-2 hover:ring-[#00cbdd] transition-all"
          onClick={() => showDetails('model', 'Model Performance')}
        >
          {metrics && metrics.modelMetrics ? (
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Accuracy</span>
                  <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {(metrics.modelMetrics.accuracy * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Latency</span>
                  <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {metrics.modelMetrics.latency}ms
                  </span>
                </div>
              </div>
              <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Throughput</span>
                  <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {metrics.modelMetrics.throughput}/s
                  </span>
                </div>
              </div>
              <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Drift Score</span>
                  <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {typeof metrics.modelMetrics.driftScore === 'number' 
                      ? metrics.modelMetrics.driftScore.toFixed(3) 
                      : '0.000'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center">
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No model metrics available</p>
            </div>
          )}
        </DashboardCard>

        <DashboardCard
          title="Recent Alerts"
          subtitle="System and model alerts"
        >
          {metrics && metrics.alerts && metrics.alerts.length > 0 ? (
            <div className="space-y-4">
              {metrics.alerts.map((alert: any) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} cursor-pointer hover:ring-2 hover:ring-[#00cbdd] transition-all`}
                  onClick={() => showDetails('system', `Alert: ${alert.message}`, alert.id)}
                >
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium">{alert.message}</p>
                      <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No alerts available</p>
            </div>
          )}
        </DashboardCard>
      </div>

      {/* Resource Usage */}
      <div className="grid grid-cols-1 gap-6">
        <DashboardCard
          title="Resource Usage by Model"
          subtitle="Resource consumption metrics per model"
        >
          {metrics && metrics.resourceUsage && metrics.resourceUsage.length > 0 ? (
            <div className="space-y-4">
              {metrics.resourceUsage.map((resource: any) => (
                <div
                  key={resource.modelId}
                  className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'} cursor-pointer hover:ring-2 hover:ring-[#00cbdd] transition-all`}
                  onClick={() => showDetails('resource', `Resource Usage: ${resource.modelName}`, resource.modelId)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium">{resource.modelName}</h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {resource.requestCount.toLocaleString()} requests • {resource.errorCount} errors
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>CPU</p>
                      <div className="mt-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#00cbdd] to-[#00cbdd]/70 rounded-full"
                          style={{ width: `${resource.cpuUsage}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Memory</p>
                      <div className="mt-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#00cbdd] to-[#00cbdd]/70 rounded-full"
                          style={{ width: `${resource.memoryUsage}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>GPU</p>
                      <div className="mt-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#00cbdd] to-[#00cbdd]/70 rounded-full"
                          style={{ width: `${resource.gpuUsage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No resource usage data available</p>
            </div>
          )}
        </DashboardCard>
      </div>

      {/* Detailed Metrics Modal */}
      <DetailedMetricsModal
        isOpen={showDetailedMetrics}
        onClose={() => setShowDetailedMetrics(false)}
        title={detailedMetricsTitle}
        data={detailedMetrics}
        type={detailedMetricsType}
      />
    </div>
  );
}