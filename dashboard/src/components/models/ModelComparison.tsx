"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Brain,
  Zap,
  Clock,
  CheckCircle,
  Tag,
  Box,
  FileText,
  Info,
  HardDrive,
  Cpu as CpuIcon,
  DollarSign,
  Users,
  Layers,
  MonitorSmartphone
} from 'lucide-react';
import { Model } from '@/dashboard-api/model-api';

interface ModelComparisonProps {
  models: Model[];
  onClose: () => void;
  onRemoveModel: (modelId: string) => void;
  isDark?: boolean;
}

interface MetricRowProps {
  label: string;
  values: (string | number)[];
  icon?: React.ReactNode;
  isDark?: boolean;
  type?: 'higher-better' | 'lower-better' | 'neutral';
}

const MetricRow: React.FC<MetricRowProps> = ({ label, values, icon, isDark, type = 'neutral' }) => {
  const getComparisonClass = (value: number, index: number) => {
    if (values.length <= 1 || type === 'neutral') return '';
    
    const numericValues = values.map(v => typeof v === 'number' ? v : parseFloat(v.toString()));
    const best = type === 'higher-better' ? Math.max(...numericValues) : Math.min(...numericValues);
    
    if (numericValues[index] === best) {
      return isDark ? 'text-green-400' : 'text-green-600';
    }
    return '';
  };

  return (
    <div className={`grid gap-4 py-3 ${isDark ? 'border-gray-800' : 'border-gray-200'} border-b`} 
      style={{ 
        gridTemplateColumns: `200px repeat(${values.length}, 1fr)`
      }}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{label}</span>
      </div>
      {values.map((value, index) => (
        <div key={index} className={`font-medium ${getComparisonClass(Number(value), index)} ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {value}
        </div>
      ))}
    </div>
  );
};

const ModelComparison: React.FC<ModelComparisonProps> = ({ models, onClose, onRemoveModel, isDark }) => {
  const maxModels = 3;
  const canAddMore = models.length < maxModels;

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
        className={`w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-xl ${
          isDark 
            ? 'bg-[#00052d]/90 border border-[#00cbdd]/20' 
            : 'bg-white border border-gray-200'
        } shadow-xl`}
      >
        {/* Header */}
        <div className={`p-6 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Model Comparison
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
          <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Compare up to three models side by side
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="p-6">
          {/* Model Headers */}
          <div className={`grid gap-4 pb-6 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}
            style={{ 
              gridTemplateColumns: `200px repeat(${models.length}, 1fr)`
            }}
          >
            <div></div>
            {models.map((model, index) => (
              <div key={model.id} className="relative">
                <button
                  onClick={() => onRemoveModel(model.id)}
                  className={`absolute -top-2 -right-2 p-1 rounded-full ${
                    isDark 
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-400' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                  }`}
                >
                  <X className="h-3 w-3" />
                </button>
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {model.name}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  v{model.version}
                </p>
              </div>
            ))}
          </div>

          {/* Basic Information */}
          <div className="py-4">
            <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Basic Information
            </h4>
            <MetricRow
              label="Model Type"
              values={models.map(m => m.modelType)}
              icon={<Brain className="h-4 w-4" />}
              isDark={isDark}
            />
            <MetricRow
              label="Framework"
              values={models.map(m => m.framework)}
              icon={<Box className="h-4 w-4" />}
              isDark={isDark}
            />
            <MetricRow
              label="Task Type"
              values={models.map(m => m.taskType)}
              icon={<Tag className="h-4 w-4" />}
              isDark={isDark}
            />
          </div>

          {/* Performance Metrics */}
          <div className="py-4">
            <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Performance Metrics
            </h4>
            <MetricRow
              label="Accuracy"
              values={models.map(m => `${(m.metrics?.accuracy || 0) * 100}%`)}
              icon={<CheckCircle className="h-4 w-4" />}
              isDark={isDark}
              type="higher-better"
            />
            <MetricRow
              label="Latency"
              values={models.map(m => `${m.metrics?.latency}ms`)}
              icon={<Clock className="h-4 w-4" />}
              isDark={isDark}
              type="lower-better"
            />
            <MetricRow
              label="Throughput"
              values={models.map(m => `${m.metrics?.throughput} req/s`)}
              icon={<Zap className="h-4 w-4" />}
              isDark={isDark}
              type="higher-better"
            />
          </div>

          {/* Resource Requirements */}
          <div className="py-4">
            <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Resource Requirements
            </h4>
            <MetricRow
              label="Memory Usage"
              values={models.map(m => `${m.metrics?.memoryUsage}MB`)}
              icon={<HardDrive className="h-4 w-4" />}
              isDark={isDark}
              type="lower-better"
            />
            <MetricRow
              label="GPU Usage"
              values={models.map(m => `${m.metrics?.gpuUsage}%`)}
              icon={<MonitorSmartphone className="h-4 w-4" />}
              isDark={isDark}
              type="lower-better"
            />
            <MetricRow
              label="Min CPU"
              values={models.map(m => m.resourceRequirements?.minCPU || 'N/A')}
              icon={<CpuIcon className="h-4 w-4" />}
              isDark={isDark}
            />
            <MetricRow
              label="Min Memory"
              values={models.map(m => m.resourceRequirements?.minMemory || 'N/A')}
              icon={<HardDrive className="h-4 w-4" />}
              isDark={isDark}
            />
          </div>

          {/* Pricing */}
          <div className="py-4">
            <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Pricing
            </h4>
            <MetricRow
              label="Price per Request"
              values={models.map(m => `$${m.pricing?.pricePerRequest}`)}
              icon={<DollarSign className="h-4 w-4" />}
              isDark={isDark}
              type="lower-better"
            />
            <MetricRow
              label="Price per Token"
              values={models.map(m => `$${m.pricing?.pricePerToken}`)}
              icon={<DollarSign className="h-4 w-4" />}
              isDark={isDark}
              type="lower-better"
            />
            <MetricRow
              label="Free Quota"
              values={models.map(m => m.pricing?.freeQuota?.toLocaleString() || '0')}
              icon={<Users className="h-4 w-4" />}
              isDark={isDark}
              type="higher-better"
            />
          </div>

          {/* Documentation */}
          <div className="py-4">
            <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Documentation & Resources
            </h4>
            <div className={`grid gap-4`}
              style={{ 
                gridTemplateColumns: `200px repeat(${models.length}, 1fr)`
              }}
            >
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <FileText className="h-4 w-4 inline mr-2" />
                Resources
              </div>
              {models.map((model) => (
                <div key={model.id}>
                  {model.documentation?.technicalDocs && (
                    <a
                      href={model.documentation.technicalDocs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'} hover:underline block`}
                    >
                      Technical Documentation
                    </a>
                  )}
                  {model.documentation?.papers?.map((paper, i) => (
                    <a
                      key={i}
                      href={paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'} hover:underline block mt-1`}
                    >
                      Research Paper {i + 1}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Info className={`h-4 w-4 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {models.length < 3 ? `You can add ${3 - models.length} more model${3 - models.length === 1 ? '' : 's'} to compare` : 'Maximum number of models selected'}
              </span>
            </div>
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/15 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModelComparison;