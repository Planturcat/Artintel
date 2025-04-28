import React from 'react';
import { X, BookOpen, Brain, Code, MessageSquare, BarChart, ChevronLeft } from 'lucide-react';
import { Model, ModelType } from '@/dashboard-api/model-api';

interface ModelCompareModalProps {
  models: Model[];
  onClose: () => void;
  isDark: boolean;
}

export default function ModelCompareModal({ models, onClose, isDark }: ModelCompareModalProps) {
  // Model attributes to compare
  const comparisonAttributes = [
    { key: 'modelType', label: 'Model Type' },
    { key: 'taskType', label: 'Task Type' },
    { key: 'parameters', label: 'Parameters', suffix: 'B' },
    { key: 'contextLength', label: 'Context Length', suffix: 'tokens' },
    { key: 'metrics.accuracy', label: 'Accuracy', suffix: '%' },
    { key: 'metrics.latency', label: 'Latency', suffix: 'ms' },
    { key: 'metrics.throughput', label: 'Throughput', suffix: 'tokens/sec' },
    { key: 'licenseType', label: 'License' },
    { key: 'creator', label: 'Creator' },
    { key: 'version', label: 'Version', prefix: 'v' },
    { key: 'updatedAt', label: 'Last Updated', isDate: true },
  ];

  // Function to get nested property value from an object
  const getNestedValue = (obj: any, path: string) => {
    const keys = path.split('.');
    return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : '-'), obj);
  };

  // Format value based on attribute
  const formatValue = (attribute: any, value: any) => {
    if (value === undefined || value === null || value === '') return '-';
    
    if (attribute.isDate && value) {
      return new Date(value).toLocaleDateString();
    }
    
    let formattedValue = value;
    if (attribute.prefix) {
      formattedValue = `${attribute.prefix}${formattedValue}`;
    }
    if (attribute.suffix) {
      formattedValue = `${formattedValue} ${attribute.suffix}`;
    }
    
    return formattedValue;
  };

  return (
    <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/70" 
        onClick={onClose}
      />
      
      <div 
        className={`relative w-full max-w-6xl max-h-[90vh] overflow-auto rounded-xl shadow-2xl ${
          isDark ? 'bg-[#00052d] border border-[#00cbdd]/30' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className={`sticky top-0 p-4 border-b z-10 ${
          isDark ? 'bg-[#000423] border-gray-800' : 'bg-white border-gray-200'
        } flex items-center justify-between`}>
          <div className="flex items-center">
            <button 
              onClick={onClose}
              className={`p-2 rounded-full ${
                isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className={`ml-2 text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Compare Models
            </h2>
          </div>
          
          <button 
            onClick={onClose}
            className={`p-2 rounded-full ${
              isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Models comparison table */}
        <div className="p-6 overflow-x-auto">
          <table className={`w-full border-collapse ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {/* Models headers */}
            <thead>
              <tr>
                <th className={`text-left p-3 ${isDark ? 'bg-[#000423]' : 'bg-gray-50'} rounded-tl-lg`}>
                  Attribute
                </th>
                {models.map((model, index) => (
                  <th 
                    key={model.id} 
                    className={`text-left p-3 ${
                      isDark ? 'bg-[#000423]' : 'bg-gray-50'
                    } ${index === models.length - 1 ? 'rounded-tr-lg' : ''}`}
                  >
                    <div className={`font-semibold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {model.name}
                    </div>
                    <div className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {model.creator}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            {/* Models comparison rows */}
            <tbody>
              {comparisonAttributes.map((attribute, attrIndex) => (
                <tr 
                  key={attribute.key}
                  className={attrIndex % 2 === 0 
                    ? isDark ? 'bg-[#000423]/50' : 'bg-gray-50/50' 
                    : ''
                  }
                >
                  <td className={`p-3 font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                    {attribute.label}
                  </td>
                  
                  {models.map((model) => {
                    const value = getNestedValue(model, attribute.key);
                    
                    // Determine if this value is the best (for numeric comparisons)
                    let isHighlighted = false;
                    if (['parameters', 'contextLength', 'metrics.accuracy', 'metrics.throughput'].includes(attribute.key)) {
                      // Higher is better
                      const allValues = models.map(m => {
                        const val = getNestedValue(m, attribute.key);
                        return typeof val === 'number' ? val : Number(val);
                      }).filter(v => !isNaN(v));
                      isHighlighted = allValues.length > 0 && value === Math.max(...allValues);
                    } else if (['metrics.latency'].includes(attribute.key)) {
                      // Lower is better
                      const allValues = models.map(m => {
                        const val = getNestedValue(m, attribute.key);
                        return typeof val === 'number' ? val : Number(val);
                      }).filter(v => !isNaN(v));
                      isHighlighted = allValues.length > 0 && value === Math.min(...allValues);
                    }
                    
                    return (
                      <td 
                        key={`${model.id}-${attribute.key}`} 
                        className={`p-3 ${
                          isHighlighted
                            ? isDark 
                              ? 'text-[#00cbdd] font-medium' 
                              : 'text-blue-600 font-medium'
                            : ''
                        }`}
                      >
                        {formatValue(attribute, value)}
                      </td>
                    );
                  })}
                </tr>
              ))}
              
              {/* Description comparison */}
              <tr className={isDark ? 'bg-[#000423]/50' : 'bg-gray-50/50'}>
                <td className={`p-3 font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                  Description
                </td>
                {models.map((model) => (
                  <td key={`${model.id}-description`} className="p-3">
                    <p className="text-sm line-clamp-3">
                      {model.description || '-'}
                    </p>
                  </td>
                ))}
              </tr>
              
              {/* Tags comparison */}
              <tr>
                <td className={`p-3 font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                  Tags
                </td>
                {models.map((model) => (
                  <td key={`${model.id}-tags`} className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {model.tags?.slice(0, 3).map((tag, i) => (
                        <span 
                          key={i} 
                          className={`text-xs px-2 py-0.5 rounded ${
                            isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {(model.tags?.length || 0) > 3 && (
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}>
                          +{model.tags!.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Footer with actions */}
        <div className={`sticky bottom-0 p-4 border-t ${
          isDark ? 'bg-[#000423] border-gray-800' : 'bg-white border-gray-200'
        } flex justify-end space-x-3`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg ${
              isDark 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Close
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              isDark 
                ? 'bg-[#00cbdd] text-[#000423] hover:bg-[#00b0c0]' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            View Detailed Report
          </button>
        </div>
      </div>
    </div>
  );
} 