"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import {
  ArrowLeft,
  Brain,
  Server,
  Zap,
  Activity,
  Target,
  Clock,
  DollarSign,
  Cpu,
  Database,
  Gauge,
  FileText,
  BookOpen,
  Share2,
  Download,
  Copy,
  Settings,
  PlayCircle,
  Rocket,
  BarChart3,
  History,
  MessageSquare,
  Code,
  Image,
  HardDrive,
  Check as CheckIcon,
  X as XIcon
} from 'lucide-react';
import { modelApi, Model, ModelType, ModelStatus } from '@/dashboard-api/model-api';
import DashboardCard from '@/components/dashboard/DashboardCard';

export default function ModelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const modelId = params.id as string;

  const [model, setModel] = useState<Model | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'usage' | 'history'>('overview');

  useEffect(() => {
    const fetchModel = async () => {
      setIsLoading(true);
      console.log("Fetching model with ID:", modelId);
      try {
        // Fetch the model data using the modelApi
        const data = await modelApi.getModel(modelId);
        console.log("Successfully fetched model:", data);
        setModel(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch model details');
        console.error("Error fetching model:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModel();
  }, [modelId]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className={`h-8 w-48 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
        <div className={`h-64 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
      </div>
    );
  }

  if (error || !model) {
    return (
      <div className="text-center py-12">
        <div className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {error || 'Model not found'}
        </div>
        <button
          onClick={() => router.back()}
          className={`mt-4 px-4 py-2 rounded-lg ${
            isDark 
              ? 'bg-white/10 hover:bg-white/15 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className={`p-2 rounded-lg ${
              isDark 
                ? 'bg-white/10 hover:bg-white/15 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {model.name}
            </h1>
            <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {model.modelType} • v{model.version} • {model.parameters} parameters
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className={`px-4 py-2 rounded-lg ${
              isDark 
                ? 'bg-white/10 hover:bg-white/15 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Settings className="h-4 w-4 mr-2 inline-block" />
            Fine-tune
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white hover:from-[#00b0c0] hover:to-blue-600"
          >
            <Rocket className="h-4 w-4 mr-2 inline-block" />
            Deploy Model
          </button>
        </div>
      </div>

      {/* Model status badge */}
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        model.status === ModelStatus.RUNNING
          ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
          : model.status === ModelStatus.PAUSED
            ? isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700'
            : isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
      }`}>
        <span className={`w-2 h-2 rounded-full mr-2 ${
          model.status === ModelStatus.RUNNING
            ? 'bg-green-500'
            : model.status === ModelStatus.PAUSED
              ? 'bg-amber-500'
              : 'bg-red-500'
        }`}></span>
        {model.status}
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800">
        <nav className="flex gap-4">
          {[
            { id: 'overview', label: 'Overview', icon: Brain },
            { id: 'performance', label: 'Performance', icon: BarChart3 },
            { id: 'usage', label: 'Usage & Examples', icon: Code },
            { id: 'history', label: 'History', icon: History }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 flex items-center gap-2 border-b-2 -mb-px ${
                activeTab === tab.id
                  ? isDark
                    ? 'border-[#00cbdd] text-[#00cbdd]'
                    : 'border-blue-500 text-blue-600'
                  : isDark
                    ? 'border-transparent text-gray-400 hover:text-gray-300'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <DashboardCard title="Accuracy">
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Accuracy
                    </p>
                    <p className={`text-2xl font-semibold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {(model.metrics.accuracy * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-green-900/30' : 'bg-green-100'}`}>
                    <Target className={isDark ? 'text-green-400' : 'text-green-600'} />
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard title="Latency">
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Latency
                    </p>
                    <p className={`text-2xl font-semibold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {model.metrics.latency}ms
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                    <Zap className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard title="Throughput">
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Throughput
                    </p>
                    <p className={`text-2xl font-semibold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {model.metrics.throughput}/s
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                    <Activity className={isDark ? 'text-purple-400' : 'text-purple-600'} />
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard title="Memory Usage">
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Memory Usage
                    </p>
                    <p className={`text-2xl font-semibold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {model.metrics.memoryUsage / 1000}GB
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-amber-900/30' : 'bg-amber-100'}`}>
                    <Database className={isDark ? 'text-amber-400' : 'text-amber-600'} />
                  </div>
                </div>
              </DashboardCard>
            </div>

            {/* Model Information */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <DashboardCard title="Model Information" className="lg:col-span-2">
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Description
                    </h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {model.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Model Type
                      </h4>
                      <p className={`mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {model.modelType}
                      </p>
                    </div>
                    <div>
                      <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Parameters
                      </h4>
                      <p className={`mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {model.parameters}
                      </p>
                    </div>
                    <div>
                      <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Framework
                      </h4>
                      <p className={`mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {model.framework}
                      </p>
                    </div>
                    <div>
                      <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Task Type
                      </h4>
                      <p className={`mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {model.taskType}
                      </p>
                    </div>
                    <div>
                      <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Author
                      </h4>
                      <p className={`mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {model.author}
                      </p>
                    </div>
                    <div>
                      <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        License
                      </h4>
                      <p className={`mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {model.licenseType || model.license}
                      </p>
                    </div>
                    <div>
                      <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Context Length
                      </h4>
                      <p className={`mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {model.contextLength || model.architecture.contextWindow || 'N/A'} tokens
                      </p>
                    </div>
                    <div>
                      <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Model Size
                      </h4>
                      <p className={`mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {model.modelSize} GB
                      </p>
                    </div>
                    <div>
                      <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Last Updated
                      </h4>
                      <p className={`mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {model.lastUpdate ? new Date(model.lastUpdate).toLocaleDateString() : new Date(model.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Community Rating
                      </h4>
                      <p className={`mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {model.communityRating ? `${model.communityRating}/5.0` : 'Not rated yet'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {model.tags.map(tag => (
                        <span 
                          key={tag}
                          className={`px-2 py-1 text-xs rounded-full ${
                            isDark 
                              ? 'bg-[#00052d] text-[#00cbdd] border border-[#00cbdd]/30' 
                              : 'bg-blue-50 text-blue-600'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {model.useCase && model.useCase.length > 0 && (
                    <div>
                      <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Recommended Use Cases
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {model.useCase.map((useCase, index) => (
                          <span 
                            key={index}
                            className={`px-2 py-1 text-xs rounded-full ${
                              isDark 
                                ? 'bg-[#00052d] text-green-400 border border-green-500/30' 
                                : 'bg-green-50 text-green-600'
                            }`}
                          >
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {model.trainingDataset && (
                    <div>
                      <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Training Dataset
                      </h4>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {model.trainingDataset}
                      </p>
                    </div>
                  )}
                </div>
              </DashboardCard>

              <DashboardCard title="Technical Specifications">
                <div className="space-y-6">
                  <div>
                    <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Architecture
                    </h4>
                    <table className={`w-full text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <tbody>
                        <tr>
                          <td className={`py-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Layers</td>
                          <td className="text-right">{model.architecture.layers}</td>
                        </tr>
                        <tr>
                          <td className={`py-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Attention Heads</td>
                          <td className="text-right">{model.architecture.attentionHeads || 'N/A'}</td>
                        </tr>
                        <tr>
                          <td className={`py-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Context Window</td>
                          <td className="text-right">{model.architecture.contextWindow || 'N/A'} tokens</td>
                        </tr>
                        <tr>
                          <td className={`py-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Training Data</td>
                          <td className="text-right">{model.architecture.trainingData || 'Not specified'}</td>
                        </tr>
                        {model.architecture.modelArchitecture && (
                          <tr>
                            <td className={`py-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Model Architecture</td>
                            <td className="text-right">{model.architecture.modelArchitecture}</td>
                          </tr>
                        )}
                        {model.architecture.quantization && (
                          <tr>
                            <td className={`py-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Quantization</td>
                            <td className="text-right">{model.architecture.quantization}</td>
                          </tr>
                        )}
                        {model.architecture.parameterEfficiency && (
                          <tr>
                            <td className={`py-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Parameter Efficiency</td>
                            <td className="text-right">{(model.architecture.parameterEfficiency * 100).toFixed(1)}%</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Resource Requirements
                    </h4>
                    <table className={`w-full text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <tbody>
                        <tr>
                          <td className={`py-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>CPU</td>
                          <td className="text-right">{model.resourceRequirements.minCPU}</td>
                        </tr>
                        <tr>
                          <td className={`py-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Memory</td>
                          <td className="text-right">{model.resourceRequirements.minMemory}</td>
                        </tr>
                        <tr>
                          <td className={`py-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>GPU</td>
                          <td className="text-right">{model.resourceRequirements.recommendedGPU || 'N/A'}</td>
                        </tr>
                        {model.resourceRequirements.minDiskSpace && (
                          <tr>
                            <td className={`py-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Disk Space</td>
                            <td className="text-right">{model.resourceRequirements.minDiskSpace}</td>
                          </tr>
                        )}
                        {model.resourceRequirements.optimizedHardware && (
                          <tr>
                            <td className={`py-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Optimized Hardware</td>
                            <td className="text-right">{Array.isArray(model.resourceRequirements.optimizedHardware) 
                              ? model.resourceRequirements.optimizedHardware.join(', ') 
                              : model.resourceRequirements.optimizedHardware}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Documentation
                    </h4>
                    {model.documentation.technicalDocs && (
                      <a 
                        href={model.documentation.technicalDocs} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 py-1 ${
                          isDark ? 'text-[#00cbdd] hover:text-[#00b0c0]' : 'text-blue-600 hover:text-blue-800'
                        }`}
                      >
                        <FileText className="h-4 w-4" />
                        Technical Documentation
                      </a>
                    )}
                    {model.documentation.papers && model.documentation.papers.length > 0 && (
                      <a 
                        href={model.documentation.papers[0]} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 py-1 ${
                          isDark ? 'text-[#00cbdd] hover:text-[#00b0c0]' : 'text-blue-600 hover:text-blue-800'
                        }`}
                      >
                        <BookOpen className="h-4 w-4" />
                        Research Paper
                      </a>
                    )}
                    {model.documentation.githubRepo && (
                      <a 
                        href={model.documentation.githubRepo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 py-1 ${
                          isDark ? 'text-[#00cbdd] hover:text-[#00b0c0]' : 'text-blue-600 hover:text-blue-800'
                        }`}
                      >
                        <Code className="h-4 w-4" />
                        GitHub Repository
                      </a>
                    )}
                  </div>
                </div>
              </DashboardCard>
            </div>

            {/* Additional Details */}
            {(model.benchmarks || model.finetuningOptions || model.languageSupport) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {model.benchmarks && model.benchmarks.length > 0 && (
                  <DashboardCard title="Benchmarks">
                    <div className="space-y-3">
                      <table className={`w-full text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        <thead>
                          <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                            <th className="py-2 text-left">Benchmark</th>
                            <th className="py-2 text-right">Score</th>
                            <th className="py-2 text-right">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {model.benchmarks?.map((benchmark, index, array) => (
                            <tr key={index} className={index !== (array.length - 1) ? `border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}` : ''}>
                              <td className="py-2">{benchmark.name}</td>
                              <td className="py-2 text-right">{typeof benchmark.score === 'number' 
                                ? benchmark.score.toFixed(2) 
                                : benchmark.score}</td>
                              <td className="py-2 text-right">{typeof benchmark.date === 'string' 
                                ? benchmark.date.split('T')[0] // Extract just the date part
                                : benchmark.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </DashboardCard>
                )}

                {model.finetuningOptions && (
                  <DashboardCard title="Fine-tuning Options">
                    <div className="space-y-4">
                      <div className={`flex items-center gap-2 ${
                        model.finetuningOptions.supported 
                          ? isDark ? 'text-green-400' : 'text-green-600' 
                          : isDark ? 'text-red-400' : 'text-red-600'
                      }`}>
                        <div className={`p-1 rounded-full ${
                          model.finetuningOptions.supported 
                            ? isDark ? 'bg-green-900/40' : 'bg-green-100' 
                            : isDark ? 'bg-red-900/40' : 'bg-red-100'
                        }`}>
                          {model.finetuningOptions.supported 
                            ? <CheckIcon className="h-4 w-4" /> 
                            : <XIcon className="h-4 w-4" />}
                        </div>
                        <span className="font-medium">
                          {model.finetuningOptions.supported 
                            ? 'Fine-tuning supported' 
                            : 'Fine-tuning not supported'}
                        </span>
                      </div>

                      {model.finetuningOptions.supported && (
                        <>
                          {model.finetuningOptions.methods && model.finetuningOptions.methods.length > 0 && (
                            <div>
                              <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Supported Methods
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {model.finetuningOptions.methods.map((method, index) => (
                                  <span 
                                    key={index}
                                    className={`px-2 py-1 text-xs rounded-full ${
                                      isDark 
                                        ? 'bg-[#00052d] text-[#00cbdd] border border-[#00cbdd]/30' 
                                        : 'bg-blue-50 text-blue-600'
                                    }`}
                                  >
                                    {method}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {model.finetuningOptions.dataRequirements && (
                            <div>
                              <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Data Requirements
                              </h4>
                              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {model.finetuningOptions.dataRequirements}
                              </p>
                            </div>
                          )}

                          {model.finetuningOptions.complexity && (
                            <div>
                              <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Complexity
                              </h4>
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  model.finetuningOptions.complexity === 'Easy'
                                    ? isDark ? 'bg-green-900/40 text-green-400' : 'bg-green-100 text-green-700'
                                    : model.finetuningOptions.complexity === 'Medium'
                                      ? isDark ? 'bg-amber-900/40 text-amber-400' : 'bg-amber-100 text-amber-700'
                                      : isDark ? 'bg-red-900/40 text-red-400' : 'bg-red-100 text-red-700'
                                }`}>
                                  {model.finetuningOptions.complexity}
                                </span>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </DashboardCard>
                )}

                {model.languageSupport && model.languageSupport.length > 0 && (
                  <DashboardCard title="Supported Languages">
                    <div className="flex flex-wrap gap-2">
                      {model.languageSupport.map((language, index) => (
                        <span 
                          key={index}
                          className={`px-2 py-1 text-xs rounded-full ${
                            isDark 
                              ? 'bg-[#00052d] text-[#00cbdd] border border-[#00cbdd]/30' 
                              : 'bg-blue-50 text-blue-600'
                          }`}
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </DashboardCard>
                )}

                {model.resourceRequirements && model.resourceRequirements.deploymentOptions && (
                  <DashboardCard title="Deployment Options">
                    <div className="space-y-2">
                      {model.resourceRequirements.deploymentOptions.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className={`p-1 rounded-full ${isDark ? 'bg-purple-900/40' : 'bg-purple-100'}`}>
                            <Server className={`h-4 w-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                          </div>
                          <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {option}
                          </span>
                        </div>
                      ))}
                    </div>
                  </DashboardCard>
                )}

                {model.metrics && (model.metrics.reliability || model.metrics.costEfficiency) && (
                  <DashboardCard title="Additional Metrics">
                    <div className="space-y-4">
                      {model.metrics.reliability && (
                        <div>
                          <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Reliability
                          </h4>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" 
                              style={{ width: `${model.metrics.reliability * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-right mt-1 text-sm">{(model.metrics.reliability * 100).toFixed(1)}%</p>
                        </div>
                      )}

                      {model.metrics.costEfficiency && (
                        <div>
                          <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Cost Efficiency
                          </h4>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                              <DollarSign 
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= (model.metrics.costEfficiency || 0)
                                    ? isDark ? 'text-green-400' : 'text-green-600'
                                    : isDark ? 'text-gray-600' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-right mt-1 text-sm">{(model.metrics.costEfficiency || 0).toFixed(1)}/10</p>
                        </div>
                      )}
                    </div>
                  </DashboardCard>
                )}
              </div>
            )}

            {/* Example Usage Section */}
            <DashboardCard title="Example Usage">
              <div className="space-y-4">
                <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Example Applications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {model.documentation.examples && model.documentation.examples.map((example, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg ${
                        isDark ? 'bg-[#000c3e]/50 border border-[#00cbdd]/20' : 'bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <div className={`p-2 rounded-lg inline-block mb-2 ${
                        isDark ? 'bg-[#00cbdd]/20' : 'bg-blue-100'
                      }`}>
                        {index === 0 ? (
                          <MessageSquare className={isDark ? 'text-[#00cbdd]' : 'text-blue-600'} />
                        ) : index === 1 ? (
                          <Code className={isDark ? 'text-[#00cbdd]' : 'text-blue-600'} />
                        ) : (
                          <Brain className={isDark ? 'text-[#00cbdd]' : 'text-blue-600'} />
                        )}
                      </div>
                      <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {example}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </DashboardCard>
          </>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            <DashboardCard title="Performance Benchmarks">
              <div className="space-y-6">
                <div>
                  <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Benchmark Results
                  </h3>
                  <div className="overflow-x-auto">
                    <table className={`w-full text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <thead>
                        <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                          <th className="text-left py-2">Benchmark</th>
                          <th className="text-left py-2">Score</th>
                          <th className="text-left py-2">Percentile</th>
                          <th className="text-left py-2">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {model.benchmarks ? (
                          model.benchmarks.map((benchmark, index) => (
                            <tr key={index} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                              <td className="py-2">{benchmark.name}</td>
                              <td className="py-2">{benchmark.score.toFixed(2)}</td>
                              <td className="py-2">
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                  <div 
                                    className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" 
                                    style={{ width: `${benchmark.name === 'MMLU' || benchmark.name === 'HellaSwag' ? benchmark.score : benchmark.score * 10}%` }}
                                  ></div>
                                </div>
                              </td>
                              <td className="py-2">{new Date(benchmark.date).toLocaleDateString()}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="py-4 text-center">
                              No benchmark data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </DashboardCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DashboardCard title="Latency Analysis">
                <div className="space-y-4">
                  <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Response Time by Input Length
                  </h4>
                  <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="w-full h-full p-4">
                      <div className="relative h-full">
                        {/* Dynamic chart bars based on model metrics */}
                        <div className="absolute bottom-0 left-[10%] w-[15%] bg-blue-500 dark:bg-blue-600 rounded-t-sm" style={{height: `${model.metrics.latency * 0.2}%`}}></div>
                        <div className="absolute bottom-0 left-[30%] w-[15%] bg-blue-500 dark:bg-blue-600 rounded-t-sm" style={{height: `${model.metrics.latency * 0.3}%`}}></div>
                        <div className="absolute bottom-0 left-[50%] w-[15%] bg-blue-500 dark:bg-blue-600 rounded-t-sm" style={{height: `${model.metrics.latency * 0.4}%`}}></div>
                        <div className="absolute bottom-0 left-[70%] w-[15%] bg-blue-500 dark:bg-blue-600 rounded-t-sm" style={{height: `${model.metrics.latency * 0.5}%`}}></div>
                        
                        {/* X-axis labels */}
                        <div className="absolute bottom-[-20px] left-[10%] text-xs text-gray-500 dark:text-gray-400">128 tokens</div>
                        <div className="absolute bottom-[-20px] left-[30%] text-xs text-gray-500 dark:text-gray-400">512 tokens</div>
                        <div className="absolute bottom-[-20px] left-[50%] text-xs text-gray-500 dark:text-gray-400">1024 tokens</div>
                        <div className="absolute bottom-[-20px] left-[70%] text-xs text-gray-500 dark:text-gray-400">2048 tokens</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <p>Average latency: {model.metrics.latency}ms</p>
                    <p>P95 latency: {Math.round(model.metrics.latency * 1.4)}ms</p>
                    <p>P99 latency: {Math.round(model.metrics.latency * 1.8)}ms</p>
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard title="Resource Utilization">
                <div className="space-y-4">
                  <div>
                    <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Memory Usage
                    </h4>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
                        style={{ width: `${(model.metrics.memoryUsage / 20000) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-right mt-1 text-sm">{model.metrics.memoryUsage / 1000}GB</p>
                  </div>

                  {model.metrics.gpuUsage && (
                    <div>
                      <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        GPU Utilization
                      </h4>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div 
                          className="bg-amber-600 h-2.5 rounded-full dark:bg-amber-500" 
                          style={{ width: `${model.metrics.gpuUsage}%` }}
                        ></div>
                      </div>
                      <p className="text-right mt-1 text-sm">{model.metrics.gpuUsage}%</p>
                    </div>
                  )}

                  <div>
                    <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Throughput
                    </h4>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full dark:bg-green-500" 
                        style={{ width: `${(model.metrics.throughput / 3000) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-right mt-1 text-sm">{model.metrics.throughput} tokens/sec</p>
                  </div>
                </div>
              </DashboardCard>
            </div>

            <DashboardCard title="Comparative Analysis">
              <div className="space-y-4">
                <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Performance Relative to Similar Models
                </h3>
                <div className="overflow-x-auto">
                  <table className={`w-full text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <thead>
                      <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <th className="text-left py-2">Metric</th>
                        <th className="text-left py-2">This Model</th>
                        <th className="text-left py-2">Average in Class</th>
                        <th className="text-left py-2">Percentile</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <td className="py-2">Accuracy</td>
                        <td className="py-2">{(model.metrics.accuracy * 100).toFixed(1)}%</td>
                        <td className="py-2">{model.modelType === "SLM" ? "65%" : model.modelType === ModelType.VISION ? "80%" : "75%"}</td>
                        <td className="py-2">{model.metrics.accuracy > 0.8 ? "Top 10%" : model.metrics.accuracy > 0.75 ? "Top 25%" : model.metrics.accuracy > 0.65 ? "Top 50%" : "Bottom 50%"}</td>
                      </tr>
                      <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <td className="py-2">Latency</td>
                        <td className="py-2">{model.metrics.latency}ms</td>
                        <td className="py-2">{model.modelType === "SLM" ? "100ms" : model.modelType === ModelType.VISION ? "400ms" : "200ms"}</td>
                        <td className="py-2">{model.metrics.latency < 100 ? "Top 10%" : model.metrics.latency < 150 ? "Top 25%" : model.metrics.latency < 250 ? "Average" : "Bottom 50%"}</td>
                      </tr>
                      <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <td className="py-2">Memory Usage</td>
                        <td className="py-2">{(model.metrics.memoryUsage / 1000).toFixed(1)}GB</td>
                        <td className="py-2">{model.modelType === "SLM" ? "5GB" : model.modelType === ModelType.VISION ? "15GB" : "12GB"}</td>
                        <td className="py-2">{model.metrics.memoryUsage < 5000 ? "Top 10% (Efficient)" : model.metrics.memoryUsage < 10000 ? "Top 25%" : model.metrics.memoryUsage < 15000 ? "Average" : "Bottom 50%"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </DashboardCard>
          </div>
        )}

        {activeTab === 'usage' && (
          <div className="space-y-6">
            <DashboardCard title="Code Examples">
              <div className="space-y-6">
                <div>
                  <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Python Example
                  </h3>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'} font-mono text-sm`}>
                    <pre className="whitespace-pre-wrap">
{model.modelType === ModelType.VISION ? 
`import torch
from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler

# Load model
model_id = "${model.name.toLowerCase().replace(/\s+/g, '-')}"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
pipe = pipe.to("cuda")

# Generate image
prompt = "A beautiful sunset over mountains, photorealistic, detailed"
negative_prompt = "blurry, bad anatomy, bad hands, cropped, worst quality"

image = pipe(
    prompt=prompt,
    negative_prompt=negative_prompt,
    num_inference_steps=25,
    guidance_scale=7.5
).images[0]

# Save the image
image.save("generated_image.png")`
:
model.modelType === ModelType.TEXT_TO_SPEECH ?
`import torch
from transformers import AutoProcessor, AutoModel

# Load model and processor
model_id = "${model.name.toLowerCase().replace(/\s+/g, '-')}"
processor = AutoProcessor.from_pretrained(model_id)
model = AutoModel.from_pretrained(model_id)

# Prepare audio input
audio_file = "speech_sample.wav"
audio_array = processor.audio_to_mel(audio_file)
inputs = processor(audio=audio_array, return_tensors="pt")

# Generate transcription
with torch.no_grad():
    outputs = model.generate(**inputs)

# Get the transcription
transcription = processor.batch_decode(outputs, skip_special_tokens=True)[0]
print(transcription)`
:
`import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

# Load model and tokenizer
model_id = "${model.name.toLowerCase().replace(/\s+/g, '-')}"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype=torch.float16,
    device_map="auto",
)

# Generate text
prompt = "${model.documentation.examples && model.documentation.examples[0] ? model.documentation.examples[0] + ':' : 'Explain the concept of machine learning in simple terms:'}"
inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
output = model.generate(
    inputs.input_ids,
    max_length=${model.contextLength || model.architecture.contextWindow || 200},
    temperature=0.7,
    top_p=0.9,
)

# Decode and print the result
result = tokenizer.decode(output[0], skip_special_tokens=True)
print(result)`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    JavaScript Example
                  </h3>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'} font-mono text-sm`}>
                    <pre className="whitespace-pre-wrap">
{model.modelType === ModelType.VISION ?
`import { pipeline } from '@xenova/transformers';

// Create a text-to-image pipeline
const textToImage = await pipeline('text-to-image', '${model.name.toLowerCase().replace(/\s+/g, '-')}');

// Generate an image
const prompt = "A beautiful sunset over mountains, photorealistic, detailed";

const result = await textToImage(prompt, {
  negative_prompt: "blurry, bad anatomy, bad hands, cropped, worst quality",
  num_inference_steps: 25,
  guidance_scale: 7.5
});

// The result contains a Blob that can be used to create an image
const imageUrl = URL.createObjectURL(result);
console.log('Image URL:', imageUrl);`
:
model.modelType === ModelType.TEXT_TO_SPEECH ?
`import { pipeline } from '@xenova/transformers';

// Create a speech-to-text pipeline
const speechToText = await pipeline('automatic-speech-recognition', '${model.name.toLowerCase().replace(/\s+/g, '-')}');

// Transcribe audio
const audioElement = document.getElementById('audio');

const result = await speechToText(audioElement, {
  chunk_length_s: 30,
  stride_length_s: 5
});

console.log('Transcription:', result.text);`
:
`import { pipeline } from '@xenova/transformers';

// Create a text-generation pipeline
const generator = await pipeline('text-generation', '${model.name.toLowerCase().replace(/\s+/g, '-')}');

// Generate text
const prompt = "${model.documentation.examples && model.documentation.examples[0] ? model.documentation.examples[0] + ':' : 'Explain the concept of machine learning in simple terms:'}";
const result = await generator(prompt, {
  max_length: ${model.contextLength || model.architecture.contextWindow || 200},
  temperature: 0.7,
  top_p: 0.9,
});

console.log(result[0].generated_text);`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    API Example
                  </h3>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'} font-mono text-sm`}>
                    <pre className="whitespace-pre-wrap">
{model.modelType === ModelType.VISION ?
`curl -X POST \\
  https://api.artintellm.com/v1/models/${model.id}/generate-image \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "prompt": "A beautiful sunset over mountains, photorealistic, detailed",
    "negative_prompt": "blurry, bad anatomy, bad hands, cropped, worst quality",
    "num_inference_steps": 25,
    "guidance_scale": 7.5,
    "width": 512,
    "height": 512
  }'`
:
model.modelType === ModelType.TEXT_TO_SPEECH ?
`curl -X POST \\
  https://api.artintellm.com/v1/models/${model.id}/transcribe \\
  -H "Content-Type: multipart/form-data" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@speech_sample.wav" \\
  -F "language=en" \\
  -F "response_format=json"`
:
`curl -X POST \\
  https://api.artintellm.com/v1/models/${model.id}/generate \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "prompt": "${model.documentation.examples && model.documentation.examples[0] ? model.documentation.examples[0] + ':' : 'Explain the concept of machine learning in simple terms:'}",
    "max_tokens": ${Math.min(model.contextLength || model.architecture.contextWindow || 200, 1000)},
    "temperature": 0.7,
    "top_p": 0.9
  }'`}
                    </pre>
                  </div>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard title="Use Cases">
              <div className="space-y-4">
                <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Recommended Applications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {model.useCase && model.useCase.length > 0 ? (
                    model.useCase.slice(0, 4).map((useCase, index) => (
                      <div key={index} className={`p-4 rounded-lg ${isDark ? 'bg-[#000c3e]/50 border border-[#00cbdd]/20' : 'bg-gray-50 border border-gray-200'}`}>
                        <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{useCase}</h4>
                        <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {getUseCaseDescription(useCase, model.modelType)}
                        </p>
                      </div>
                    ))
                  ) : model.modelType === ModelType.LLM ? (
                    <>
                      <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000c3e]/50 border border-[#00cbdd]/20' : 'bg-gray-50 border border-gray-200'}`}>
                        <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Content Generation</h4>
                        <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          Create blog posts, marketing copy, and creative content with customizable tone and style.
                        </p>
                      </div>
                      <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000c3e]/50 border border-[#00cbdd]/20' : 'bg-gray-50 border border-gray-200'}`}>
                        <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Conversational AI</h4>
                        <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          Build chatbots and virtual assistants that can understand and respond to user queries naturally.
                        </p>
                      </div>
                    </>
                  ) : model.modelType === "SLM" ? (
                    <>
                      <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000c3e]/50 border border-[#00cbdd]/20' : 'bg-gray-50 border border-gray-200'}`}>
                        <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Edge Deployment</h4>
                        <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          Run on resource-constrained devices like mobile phones and IoT devices with minimal latency.
                        </p>
                      </div>
                      <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000c3e]/50 border border-[#00cbdd]/20' : 'bg-gray-50 border border-gray-200'}`}>
                        <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Specific Domain Tasks</h4>
                        <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          Optimized for specific tasks like text classification, sentiment analysis, or simple Q&A.
                        </p>
                      </div>
                    </>
                  ) : model.modelType === ModelType.VISION ? (
                    <>
                      <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000c3e]/50 border border-[#00cbdd]/20' : 'bg-gray-50 border border-gray-200'}`}>
                        <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Image Generation</h4>
                        <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          Create high-quality images from text descriptions for design, art, and content creation.
                        </p>
                      </div>
                      <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000c3e]/50 border border-[#00cbdd]/20' : 'bg-gray-50 border border-gray-200'}`}>
                        <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Visual Editing</h4>
                        <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          Modify existing images with text instructions for creative and professional editing.
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000c3e]/50 border border-[#00cbdd]/20' : 'bg-gray-50 border border-gray-200'}`}>
                      <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>General Purpose</h4>
                      <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Suitable for a wide range of AI tasks and applications.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </DashboardCard>

            <DashboardCard title="Integration Guide">
              <div className="space-y-4">
                <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Getting Started
                </h3>
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000c3e]/50 border border-[#00cbdd]/20' : 'bg-gray-50 border border-gray-200'}`}>
                    <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>1. Installation</h4>
                    <div className={`mt-2 p-3 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-100'} font-mono text-sm`}>
                      {model.modelType === ModelType.VISION ? 
                        `pip install diffusers transformers torch` : 
                        model.modelType === ModelType.TEXT_TO_SPEECH ?
                        `pip install transformers torch torchaudio` :
                        `pip install transformers torch`}
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000c3e]/50 border border-[#00cbdd]/20' : 'bg-gray-50 border border-gray-200'}`}>
                    <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>2. Authentication</h4>
                    <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Generate an API key from your dashboard and use it in your requests.
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000c3e]/50 border border-[#00cbdd]/20' : 'bg-gray-50 border border-gray-200'}`}>
                    <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>3. Make Your First Request</h4>
                    <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Follow the code examples above to make your first API request.
                    </p>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            <DashboardCard title="Version History">
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000c3e]/50 border border-[#00cbdd]/20' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className="flex items-start">
                    <div className={`p-2 rounded-lg ${isDark ? 'bg-[#00cbdd]/20' : 'bg-blue-100'} mr-4`}>
                      <History className={isDark ? 'text-[#00cbdd]' : 'text-blue-600'} />
                    </div>
                    <div>
                      <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        v{model.version} (Current)
                      </h4>
                      <p className={`mt-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Released on {new Date(model.updatedAt).toLocaleDateString()}
                      </p>
                      <ul className={`mt-2 text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        <li>• Improved accuracy and performance</li>
                        <li>• Expanded context window</li>
                        <li>• Reduced hallucinations</li>
                        <li>• Enhanced multilingual capabilities</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000c3e]/50 border border-[#00cbdd]/20' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className="flex items-start">
                    <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-200'} mr-4`}>
                      <History className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                    </div>
                    <div>
                      <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        v{parseFloat(model.version) - 0.1} (Previous)
                      </h4>
                      <p className={`mt-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Released on {new Date(new Date(model.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </p>
                      <ul className={`mt-2 text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        <li>• Initial release</li>
                        <li>• Basic functionality and capabilities</li>
                        <li>• Limited context window</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardCard>
            
            <DashboardCard title="Changelog">
              <div className="space-y-4">
                <div className="relative pl-6 pb-6 border-l-2 border-dashed border-gray-300 dark:border-gray-700">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-600"></div>
                  <div className="mb-2">
                    <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Performance Improvements
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {new Date(model.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Optimized inference speed by 15% and reduced memory usage by 10%.
                  </p>
                </div>
                
                <div className="relative pl-6 pb-6 border-l-2 border-dashed border-gray-300 dark:border-gray-700">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-green-500 dark:bg-green-600"></div>
                  <div className="mb-2">
                    <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      New Features
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {new Date(new Date(model.updatedAt).getTime() - 15 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </p>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Added support for longer context windows and improved instruction following.
                  </p>
                </div>
                
                <div className="relative pl-6">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-purple-500 dark:bg-purple-600"></div>
                  <div className="mb-2">
                    <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Initial Release
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {new Date(model.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    First public release of {model.name}.
                  </p>
                </div>
              </div>
            </DashboardCard>
          </div>
        )}
      </div>
    </div>
  );
}

// Function to get use case descriptions
function getUseCaseDescription(useCase: string, modelType: ModelType | string): string {
  const useCaseDescriptions: Record<string, string> = {
    // LLM use cases
    'Chatbots': 'Build conversational agents that can engage in natural dialogue with users.',
    'Content generation': 'Create blog posts, marketing copy, and creative content with customizable style.',
    'Summarization': 'Condense long documents into concise summaries preserving key information.',
    'Code assistance': 'Generate code snippets and provide programming help across various languages.',
    'Question answering': 'Answer factual questions based on the model\'s knowledge or provided context.',
    'Translation': 'Translate text between multiple languages with high accuracy.',
    
    // SLM use cases
    'Edge computing': 'Deploy on resource-constrained devices like mobile phones or IoT devices.',
    'Mobile applications': 'Integrate directly into mobile apps for on-device AI capabilities.',
    'IoT devices': 'Run on Internet of Things devices for intelligent local processing.',
    'Offline applications': 'Process data locally without requiring an internet connection.',
    'Embedded systems': 'Integrate into embedded systems with limited computational resources.',
    
    // Vision model use cases
    'Marketing materials': 'Generate visual content for marketing campaigns and advertising.',
    'Concept art': 'Create concept visuals for design projects, gaming, and entertainment.',
    'Digital content creation': 'Produce images for websites, social media, and digital publications.',
    'Visualization': 'Turn descriptions or data into visual representations.',
    'Image editing': 'Modify existing images with text-guided transformations.',
    
    // Text-to-Speech use cases
    'Media transcription': 'Convert audio recordings into accurate text transcriptions.',
    'Closed captioning': 'Generate captions for videos and multimedia content.',
    'Podcast transcription': 'Create text versions of podcast episodes for accessibility.',
    'Meeting notes': 'Automatically transcribe meetings and conversations into written notes.',
    'Voice assistants': 'Power the speech recognition component of voice assistant systems.',
    
    // Default for any other use case
    'default': 'Leverage the model\'s capabilities for this specific application area.'
  };
  
  return useCaseDescriptions[useCase] || useCaseDescriptions['default'];
} 