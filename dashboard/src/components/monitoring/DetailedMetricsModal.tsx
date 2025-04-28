'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
  Bar,
  BarChart,
  ReferenceLine
} from 'recharts';
import { X } from 'lucide-react';

interface DetailedMetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any;
  type: 'system' | 'model' | 'resource';
}

const COLORS = ['#00cbdd', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function DetailedMetricsModal({
  isOpen,
  onClose,
  title,
  data,
  type
}: DetailedMetricsModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!isOpen || !data) return null;

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const renderSystemMetrics = () => {
    if (!data || !data.systemHealth) {
      return (
        <div className="p-4 text-center">
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No system metrics available</p>
        </div>
      );
    }

    const { systemHealth: health } = data;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <h4 className="font-medium mb-2">Hardware Details</h4>
            <div className="space-y-2">
              <p>CPU Cores: {health.details?.cpuCores || 'N/A'}</p>
              <p>CPU Threads: {health.details?.cpuThreads || 'N/A'}</p>
              <p>Total Memory: {health.details?.totalMemory || 'N/A'}GB</p>
              <p>GPU Model: {health.details?.gpuModel || 'N/A'}</p>
            </div>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <h4 className="font-medium mb-2">Current Usage</h4>
            <div className="space-y-2">
              <p>CPU: {health.cpu || 0}%</p>
              <p>Memory: {health.memory || 0}%</p>
              <p>GPU: {health.gpu || 0}%</p>
              <p>Storage: {health.storage || 0}%</p>
            </div>
          </div>
        </div>

        {data.responseTime && (
          <div className="h-[300px]">
            <h4 className="font-medium mb-2">Resource Usage Over Time</h4>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.responseTime}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1f2937' : '#e5e7eb'} />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={formatDate}
                  stroke={isDark ? '#9ca3af' : '#6b7280'}
                />
                <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '0.5rem'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Response Time"
                  stroke={COLORS[0]}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {health.details && (
          <div className="grid grid-cols-2 gap-4">
            <div className="h-[200px]">
              <h4 className="font-medium mb-2">Memory Usage</h4>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Used', value: health.details.totalMemory - health.details.freeMemory },
                      { name: 'Free', value: health.details.freeMemory }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {[0, 1].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="h-[200px]">
              <h4 className="font-medium mb-2">Network Traffic</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Network In', value: health.details.networkIn || 0 },
                    { name: 'Network Out', value: health.details.networkOut || 0 }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1f2937' : '#e5e7eb'} />
                  <XAxis dataKey="name" stroke={isDark ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1f2937' : '#ffffff',
                      border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Bar dataKey="value" fill="#00cbdd" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderModelMetrics = () => {
    if (!data || !data.modelMetrics) {
      return (
        <div className="p-4 text-center">
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No model metrics available</p>
        </div>
      );
    }

    const { modelMetrics: metrics } = data;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <h4 className="font-medium mb-2">Performance Metrics</h4>
            <div className="space-y-2">
              <p>Accuracy: {((metrics.accuracy || 0) * 100).toFixed(1)}%</p>
              <p>Latency: {metrics.latency || 0}ms</p>
              <p>Throughput: {metrics.throughput || 0}/s</p>
              <p>Drift Score: {typeof metrics.driftScore === 'number' ? metrics.driftScore.toFixed(3) : '0.000'}</p>
            </div>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <h4 className="font-medium mb-2">Class Metrics</h4>
            <div className="space-y-2">
              {metrics.details?.f1ScoreByClass && Object.entries(metrics.details.f1ScoreByClass).map(([cls, score]) => (
                <p key={cls}>Class {cls}: {(Number(score) * 100).toFixed(1)}% F1</p>
              ))}
            </div>
          </div>
        </div>

        {metrics.details?.rocCurve && metrics.details?.prCurve && (
          <div className="grid grid-cols-2 gap-4">
            <div className="h-[300px]">
              <h4 className="font-medium mb-2">ROC Curve</h4>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics.details.rocCurve}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1f2937' : '#e5e7eb'} />
                  <XAxis
                    dataKey="fpr"
                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                    label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis
                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                    label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip />
                  <Line type="monotone" dataKey="tpr" stroke="#00cbdd" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="h-[300px]">
              <h4 className="font-medium mb-2">Precision-Recall Curve</h4>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics.details.prCurve}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1f2937' : '#e5e7eb'} />
                  <XAxis
                    dataKey="recall"
                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                    label={{ value: 'Recall', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis
                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                    label={{ value: 'Precision', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip />
                  <Line type="monotone" dataKey="precision" stroke="#00cbdd" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {data.throughput && (
          <div className="h-[300px]">
            <h4 className="font-medium mb-2">Metrics History</h4>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.throughput}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1f2937' : '#e5e7eb'} />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={formatDate}
                  stroke={isDark ? '#9ca3af' : '#6b7280'}
                />
                <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '0.5rem'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Throughput"
                  stroke={COLORS[0]}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    );
  };

  const renderResourceMetrics = () => {
    if (!data || !data.resourceUsage) {
      return (
        <div className="p-4 text-center">
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No resource metrics available</p>
        </div>
      );
    }

    const resource = data.resourceUsage.find((r: any) => r.modelId === data.selectedModelId);
    
    if (!resource) {
      return (
        <div className="p-4 text-center">
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Resource data not found for the selected model</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <h4 className="font-medium mb-2">Resource Usage</h4>
            <div className="space-y-2">
              <p>CPU Usage: {resource.cpuUsage || 0}%</p>
              <p>Memory Usage: {resource.memoryUsage || 0}%</p>
              <p>GPU Usage: {resource.gpuUsage || 0}%</p>
            </div>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <h4 className="font-medium mb-2">Performance</h4>
            <div className="space-y-2">
              <p>Requests: {resource.requestCount || 0}</p>
              <p>Errors: {resource.errorCount || 0}</p>
              <p>Error Rate: {((resource.errorCount || 0) / (resource.requestCount || 1) * 100).toFixed(2)}%</p>
            </div>
          </div>
        </div>

        {data.responseTime && (
          <div className="grid grid-cols-2 gap-4">
            <div className="h-[300px]">
              <h4 className="font-medium mb-2">Resource Usage History</h4>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.responseTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1f2937' : '#e5e7eb'} />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={formatDate}
                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                  />
                  <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1f2937' : '#ffffff',
                      border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Response Time"
                    stroke={COLORS[0]}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="h-[300px]">
              <h4 className="font-medium mb-2">Request Metrics</h4>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.errorRates}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1f2937' : '#e5e7eb'} />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={formatDate}
                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                  />
                  <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1f2937' : '#ffffff',
                      border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Error Rate"
                    stroke={COLORS[1]}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="h-[300px]">
          <h4 className="font-medium mb-2">Latency Distribution</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { name: 'Average', value: resource.avgLatency || 0 },
                { name: 'P95', value: resource.p95Latency || 0 },
                { name: 'P99', value: resource.p99Latency || 0 }
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1f2937' : '#e5e7eb'} />
              <XAxis dataKey="name" stroke={isDark ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '0.5rem'
                }}
              />
              <Bar dataKey="value" fill="#00cbdd" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  // New function to render alert details
  const renderAlertDetails = () => {
    if (!data || !data.alerts) {
      return (
        <div className="p-4 text-center">
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No alert details available</p>
        </div>
      );
    }

    // Find the alert by ID from the title (format: "Alert: [message]")
    const alertMessage = title.replace('Alert: ', '');
    const alert = data.alerts.find((a: any) => a.message === alertMessage);

    if (!alert) {
      return (
        <div className="p-4 text-center">
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Alert details not found</p>
        </div>
      );
    }

    // Determine severity class
    const getSeverityClass = (severity: string) => {
      switch (severity) {
        case 'high': return 'text-red-500';
        case 'medium': return 'text-yellow-500';
        case 'low': return 'text-blue-500';
        default: return 'text-gray-500';
      }
    };

    return (
      <div className="space-y-6">
        <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
          <h4 className="font-medium mb-2">Alert Information</h4>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Severity: </span>
              <span className={getSeverityClass(alert.severity)}>{alert.severity.toUpperCase()}</span>
            </p>
            <p><span className="font-medium">Message: </span>{alert.message}</p>
            <p><span className="font-medium">Time: </span>{new Date(alert.timestamp).toLocaleString()}</p>
            <p><span className="font-medium">Component: </span>{alert.details?.component || 'N/A'}</p>
            <p><span className="font-medium">Duration: </span>{alert.details?.duration || 0} seconds</p>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
          <h4 className="font-medium mb-2">Alert Details</h4>
          <div className="space-y-2">
            <p><span className="font-medium">Threshold: </span>{alert.details?.threshold || 0}</p>
            <p><span className="font-medium">Current Value: </span>{alert.details?.currentValue || 0}</p>
            {alert.details?.affectedModels && (
              <div>
                <p className="font-medium">Affected Models:</p>
                <ul className="list-disc list-inside ml-2">
                  {alert.details.affectedModels.map((model: string) => (
                    <li key={model}>{model}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {alert.details?.recommendations && (
          <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <h4 className="font-medium mb-2">Recommendations</h4>
            <ul className="list-disc list-inside ml-2">
              {alert.details.recommendations.map((rec: string, index: number) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Historical data visualization */}
        <div className="h-[300px]">
          <h4 className="font-medium mb-2">Related Metrics History</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.responseTime?.slice(0, 24) || []}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1f2937' : '#e5e7eb'} />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatDate}
                stroke={isDark ? '#9ca3af' : '#6b7280'}
              />
              <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '0.5rem'
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                name="Value Over Time"
                stroke="#ff4d4f"
                dot={false}
              />
              {/* Mark the threshold as a reference line */}
              {alert.details?.threshold && (
                <ReferenceLine y={alert.details.threshold} stroke="#ffcb6b" strokeDasharray="3 3" label="Threshold" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className={`w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-xl p-6 ${
          isDark ? 'bg-[#00052d] text-white' : 'bg-white text-gray-900'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? 'hover:bg-white/10'
                : 'hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {type === 'system' && (title.startsWith('Alert:') ? renderAlertDetails() : renderSystemMetrics())}
        {type === 'model' && renderModelMetrics()}
        {type === 'resource' && renderResourceMetrics()}
      </motion.div>
    </motion.div>
  );
}