import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  MessageSquare,
  Image,
  Code,
  FileText,
  PlayCircle,
  PauseCircle,
  AlertTriangle,
  CheckCircle,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Scale,
  Rocket
} from 'lucide-react';
import { Model, ModelType, ModelTaskType, ModelStatus } from '@/dashboard-api/model-api';

interface ModelCardProps {
  model: Model;
  isDark: boolean;
  expandedModel: string | null;
  toggleModelDetails: (modelId: string) => void;
  handleToggleBookmark: (modelId: string) => void;
  onCompare: (model: Model) => void;
  onViewDetails: (modelId: string) => void;
  isSelectedForComparison?: boolean;
  viewMode: 'grid' | 'list';
  delay?: number;
}

export default function ModelCard({ 
  model, 
  isDark, 
  expandedModel, 
  toggleModelDetails, 
  handleToggleBookmark, 
  onCompare,
  onViewDetails,
  isSelectedForComparison = false,
  viewMode,
  delay = 0
}: ModelCardProps) {
  const isExpanded = expandedModel === model.id;
  const isBookmarked = model.isBookmarked;
  
  // Determine card styling based on view mode
  const cardClasses = viewMode === 'grid'
    ? 'flex-col h-full'
    : 'flex-row items-center justify-between';
  
  // Function to get the appropriate icon for model type
  const getModelTypeIcon = () => {
    switch (model.modelType) {
      case ModelType.LLM:
        return <Brain className="h-4 w-4" />;
      case ModelType.CHAT_LLM:
        return <MessageSquare className="h-4 w-4" />;
      case ModelType.VISION:
        return <Image className="h-4 w-4" />;
      case ModelType.CODE:
        return <Code className="h-4 w-4" />;
      case ModelType.TEXT_TO_SPEECH:
        return <FileText className="h-4 w-4" />;
      default:
        return <Brain className="h-4 w-4" />;
    }
  };
  
  // Function to get background style for task type
  const getTaskTypeBackground = () => {
    switch (model.taskType) {
      case ModelTaskType.TEXT_GENERATION:
        return isDark ? 'bg-blue-900/30' : 'bg-blue-100';
      case ModelTaskType.CLASSIFICATION:
        return isDark ? 'bg-green-900/30' : 'bg-green-100';
      case ModelTaskType.EMBEDDINGS:
        return isDark ? 'bg-yellow-900/30' : 'bg-yellow-100';
      case ModelTaskType.TRANSLATION:
        return isDark ? 'bg-purple-900/30' : 'bg-purple-100';
      case ModelTaskType.SUMMARIZATION:
        return isDark ? 'bg-pink-900/30' : 'bg-pink-100';
      default:
        return isDark ? 'bg-gray-800/50' : 'bg-gray-100';
    }
  };
  
  // Function to get color for model status
  const getStatusColor = () => {
    switch (model.status) {
      case ModelStatus.RUNNING:
        return {
          bg: isDark ? 'bg-green-900/20' : 'bg-green-100',
          text: isDark ? 'text-green-400' : 'text-green-700',
          icon: <PlayCircle className="h-3 w-3 mr-1" />
        };
      case ModelStatus.PAUSED:
        return {
          bg: isDark ? 'bg-yellow-900/20' : 'bg-yellow-100',
          text: isDark ? 'text-yellow-400' : 'text-yellow-700',
          icon: <PauseCircle className="h-3 w-3 mr-1" />
        };
      case ModelStatus.ERROR:
        return {
          bg: isDark ? 'bg-red-900/20' : 'bg-red-100',
          text: isDark ? 'text-red-400' : 'text-red-700',
          icon: <AlertTriangle className="h-3 w-3 mr-1" />
        };
      default:
        return {
          bg: isDark ? 'bg-gray-800/50' : 'bg-gray-100',
          text: isDark ? 'text-gray-400' : 'text-gray-700',
          icon: <CheckCircle className="h-3 w-3 mr-1" />
        };
    }
  };
  
  const statusColors = getStatusColor();
  
  // Get border color for selection highlighting
  const getBorderStyle = () => {
    if (isSelectedForComparison) {
      return isDark 
        ? 'border-[#00cbdd] ring-2 ring-[#00cbdd]/50' 
        : 'border-blue-500 ring-2 ring-blue-300/50';
    }
    return isDark 
      ? 'border-[#00cbdd]/20 hover:border-[#00cbdd]/40' 
      : 'border-gray-200 hover:border-blue-300';
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`${
        isDark 
          ? 'bg-[#00052d]/60' 
          : 'bg-white/80'
      } ${getBorderStyle()} border rounded-xl overflow-hidden transition-all duration-300 group h-full`}
    >
      <div className={`flex ${cardClasses} p-4`}>
        {/* Model basic info */}
        <div className={`${viewMode === 'grid' ? 'w-full' : 'flex-1'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                {getModelTypeIcon()}
              </div>
              <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {model.name}
              </h3>
            </div>
            
            <button
              onClick={() => handleToggleBookmark(model.id)}
              className={`ml-2 p-1.5 rounded-full transition-colors ${
                isBookmarked
                  ? isDark
                    ? 'bg-amber-900/30 text-amber-400 hover:bg-amber-900/40'
                    : 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                  : isDark
                    ? 'bg-gray-800/60 text-gray-500 hover:bg-gray-800'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </button>
          </div>
          
          {/* Version and Status */}
          <div className="flex items-center mt-2 space-x-2">
            <div className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
              v{model.version}
            </div>
            <div className={`text-xs px-2 py-1 rounded flex items-center ${statusColors.bg} ${statusColors.text}`}>
              {statusColors.icon}
              {model.status}
            </div>
          </div>
          
          {/* Model description */}
          <p className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
            {model.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-3">
            {model.tags?.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className={`text-xs px-2 py-0.5 rounded ${
                  isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {tag}
              </span>
            ))}
            {model.tags?.length > 3 && (
              <span className={`text-xs px-2 py-0.5 rounded ${
                isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}>
                +{model.tags.length - 3}
              </span>
            )}
          </div>
          
          {/* Metrics */}
          <div className={`grid grid-cols-2 gap-2 mt-4`}>
            <div className="space-y-1">
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Size</p>
              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {model.parameters}
              </p>
            </div>
            <div className="space-y-1">
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Latency</p>
              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {model.metrics?.latency}ms
              </p>
            </div>
          </div>

          {/* Additional Metrics - Only shown when expanded */}
          {isExpanded && (
            <div className="mt-4 space-y-4">
              {/* Context Window */}
              {(model.contextLength || model.architecture?.contextWindow) && (
                <div className="space-y-1">
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Context Window</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {model.contextLength || model.architecture?.contextWindow} tokens
                  </p>
                </div>
              )}

              {/* Language Support */}
              {model.languageSupport && model.languageSupport.length > 0 && (
                <div className="space-y-1">
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Languages</p>
                  <div className="flex flex-wrap gap-1">
                    {model.languageSupport.slice(0, 3).map((lang, index) => (
                      <span 
                        key={index} 
                        className={`text-xs px-2 py-0.5 rounded ${
                          isDark ? 'bg-[#00052d] text-[#00cbdd] border border-[#00cbdd]/30' : 'bg-blue-50 text-blue-600'
                        }`}
                      >
                        {lang}
                      </span>
                    ))}
                    {model.languageSupport.length > 3 && (
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        +{model.languageSupport.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Benchmarks */}
              {model.benchmarks && model.benchmarks.length > 0 && (
                <div className="space-y-2">
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Benchmarks</p>
                  <div className="grid grid-cols-2 gap-2">
                    {model.benchmarks.slice(0, 2).map((benchmark, index) => (
                      <div key={index} className="space-y-1">
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{benchmark.name}</p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500" 
                            style={{ width: `${benchmark.name === 'MMLU' ? benchmark.score : benchmark.score * 10}%` }}
                          ></div>
                        </div>
                        <p className="text-right text-xs">{benchmark.score.toFixed(1)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Use Cases */}
              {model.useCase && model.useCase.length > 0 && (
                <div className="space-y-1">
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Use Cases</p>
                  <div className="flex flex-wrap gap-1">
                    {model.useCase.slice(0, 3).map((useCase, index) => (
                      <span 
                        key={index} 
                        className={`text-xs px-2 py-0.5 rounded ${
                          isDark ? 'bg-[#00052d] text-green-400 border border-green-500/30' : 'bg-green-50 text-green-600'
                        }`}
                      >
                        {useCase}
                      </span>
                    ))}
                    {model.useCase.length > 3 && (
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        +{model.useCase.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Fine-tuning */}
              {model.finetuningOptions && (
                <div className="space-y-1">
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Fine-tuning</p>
                  <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {model.finetuningOptions.supported ? (
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                      }`}>
                        Supported
                      </span>
                    ) : (
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
                      }`}>
                        Not Supported
                      </span>
                    )}
                    {model.finetuningOptions.supported && model.finetuningOptions.complexity && (
                      <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
                        model.finetuningOptions.complexity === 'Easy'
                          ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                          : model.finetuningOptions.complexity === 'Medium'
                            ? isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700'
                            : isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
                      }`}>
                        {model.finetuningOptions.complexity}
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons - Now shown in both grid and list views */}
          <div className="flex items-center space-x-2 mt-4">
            <button 
              onClick={() => onViewDetails(model.id)}
              className={`px-3 py-1.5 rounded-lg text-sm flex-1 ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/15 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <FileText className="h-4 w-4 mr-1 inline-block" />
              Details
            </button>
            <button
              onClick={() => onCompare(model)}
              className={`px-3 py-1.5 rounded-lg text-sm flex-1 ${
                isSelectedForComparison
                  ? isDark
                    ? 'bg-[#00cbdd]/20 text-[#00cbdd] ring-1 ring-[#00cbdd]'
                    : 'bg-blue-100 text-blue-700 ring-1 ring-blue-300'
                  : isDark
                    ? 'bg-white/10 hover:bg-white/15 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Scale className="h-4 w-4 mr-1 inline-block" />
              {isSelectedForComparison ? 'Selected' : 'Compare'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Expandable section (grid view only) */}
      {viewMode === 'grid' && (
        <div 
          className={`px-4 pb-4 pt-0 transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`pt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            {/* Full description */}
            <div className="mb-4">
              <h4 className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Description
              </h4>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {model.description}
              </p>
            </div>
            
            {/* Additional Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Cost</p>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  ${model.pricing?.pricePerRequest}/req
                </p>
              </div>
              <div className="space-y-1">
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Updated</p>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {new Date(model.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-1">
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Memory</p>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {model.metrics?.memoryUsage}MB
                </p>
              </div>
              <div className="space-y-1">
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>GPU Usage</p>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {model.metrics?.gpuUsage}%
                </p>
              </div>
            </div>
            
            {/* All tags */}
            <div className="mb-4">
              <h4 className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Tags
              </h4>
              <div className="flex flex-wrap gap-1">
                {model.tags?.map((tag, index) => (
                  <span 
                    key={index} 
                    className={`text-xs px-2 py-0.5 rounded ${
                      isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Expand/Collapse Button */}
      <div className="mt-4 text-center">
        <button
          onClick={() => toggleModelDetails(model.id)}
          className={`w-full py-1 rounded-lg text-xs ${
            isDark 
              ? 'bg-white/5 hover:bg-white/10 text-gray-400' 
              : 'bg-gray-50 hover:bg-gray-100 text-gray-500'
          }`}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-3 w-3 inline-block mr-1" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3 inline-block mr-1" />
              Show More
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
} 