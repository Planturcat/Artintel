import React, { useState } from 'react';
import { X, Check, ChevronDown, ChevronUp, BookmarkX } from 'lucide-react';
import { ModelType, ModelTaskType, ModelStatus } from '@/dashboard-api/model-api';

interface ModelFiltersMenuProps {
  onApply: (filters: any) => void;
  onCancel: () => void;
  activeFilters: {
    modelTypes: string[];
    taskTypes: string[];
    parameters: string[];
    status: string[];
  };
  isDark: boolean;
}

export default function ModelFiltersMenu({ onApply, onCancel, activeFilters, isDark }: ModelFiltersMenuProps) {
  const [filters, setFilters] = useState({
    modelTypes: [...activeFilters.modelTypes],
    taskTypes: [...activeFilters.taskTypes],
    parameters: [...activeFilters.parameters],
    status: [...activeFilters.status],
  });

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    modelTypes: true,
    taskTypes: true,
    parameters: true,
    status: true,
  });

  const toggleSection = (section: string) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleToggle = (section: string, value: string) => {
    setFilters(prev => {
      const currentValues = [...prev[section as keyof typeof prev]];
      const index = currentValues.indexOf(value);
      
      if (index === -1) {
        currentValues.push(value);
      } else {
        currentValues.splice(index, 1);
      }
      
      return {
        ...prev,
        [section]: currentValues
      };
    });
  };

  const clearSection = (section: string) => {
    setFilters(prev => ({
      ...prev,
      [section]: []
    }));
  };

  const handleApply = () => {
    onApply(filters);
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden`}>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50"
        onClick={onCancel}
      />
      
      {/* Filters Menu */}
      <div className="absolute top-[60px] right-6 w-80 overflow-auto max-h-[calc(100vh-120px)]">
        <div className={`rounded-xl shadow-xl ${
          isDark ? 'bg-[#00052d] border border-[#00cbdd]/30' : 'bg-white border border-gray-200'
        }`}>
          <div className={`p-4 border-b flex items-center justify-between ${
            isDark ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Filters</h3>
            <button 
              onClick={onCancel}
              className={`p-1 rounded-full ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
              }`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="p-4 space-y-4">
            {/* Model Types Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <button 
                  onClick={() => toggleSection('modelTypes')}
                  className="flex items-center"
                >
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Model Type
                  </h4>
                  {expanded.modelTypes ? (
                    <ChevronUp className="h-4 w-4 ml-1" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </button>
                
                {filters.modelTypes.length > 0 && (
                  <button 
                    onClick={() => clearSection('modelTypes')}
                    className={`text-xs ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'} hover:underline`}
                  >
                    Clear
                  </button>
                )}
              </div>
              
              {expanded.modelTypes && (
                <div className="space-y-2 mt-2">
                  {Object.values(ModelType).map((type) => (
                    <label 
                      key={type}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        filters.modelTypes.includes(type)
                          ? isDark
                            ? 'bg-[#00cbdd] border-[#00cbdd]'
                            : 'bg-blue-600 border-blue-600'
                          : isDark
                            ? 'border-gray-700'
                            : 'border-gray-300'
                      }`}>
                        {filters.modelTypes.includes(type) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            {/* Task Types Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <button 
                  onClick={() => toggleSection('taskTypes')}
                  className="flex items-center"
                >
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Task Type
                  </h4>
                  {expanded.taskTypes ? (
                    <ChevronUp className="h-4 w-4 ml-1" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </button>
                
                {filters.taskTypes.length > 0 && (
                  <button 
                    onClick={() => clearSection('taskTypes')}
                    className={`text-xs ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'} hover:underline`}
                  >
                    Clear
                  </button>
                )}
              </div>
              
              {expanded.taskTypes && (
                <div className="space-y-2 mt-2">
                  {Object.values(ModelTaskType).map((type) => (
                    <label 
                      key={type}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        filters.taskTypes.includes(type)
                          ? isDark
                            ? 'bg-[#00cbdd] border-[#00cbdd]'
                            : 'bg-blue-600 border-blue-600'
                          : isDark
                            ? 'border-gray-700'
                            : 'border-gray-300'
                      }`}>
                        {filters.taskTypes.includes(type) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            {/* Parameters Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <button 
                  onClick={() => toggleSection('parameters')}
                  className="flex items-center"
                >
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Parameters
                  </h4>
                  {expanded.parameters ? (
                    <ChevronUp className="h-4 w-4 ml-1" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </button>
                
                {filters.parameters.length > 0 && (
                  <button 
                    onClick={() => clearSection('parameters')}
                    className={`text-xs ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'} hover:underline`}
                  >
                    Clear
                  </button>
                )}
              </div>
              
              {expanded.parameters && (
                <div className="space-y-2 mt-2">
                  {['0-1', '1-10', '10-100', '100-1000'].map((range) => (
                    <label 
                      key={range}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        filters.parameters.includes(range)
                          ? isDark
                            ? 'bg-[#00cbdd] border-[#00cbdd]'
                            : 'bg-blue-600 border-blue-600'
                          : isDark
                            ? 'border-gray-700'
                            : 'border-gray-300'
                      }`}>
                        {filters.parameters.includes(range) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {range === '0-1' && '< 1B'}
                        {range === '1-10' && '1B - 10B'}
                        {range === '10-100' && '10B - 100B'}
                        {range === '100-1000' && '> 100B'}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            {/* Status Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <button 
                  onClick={() => toggleSection('status')}
                  className="flex items-center"
                >
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Status
                  </h4>
                  {expanded.status ? (
                    <ChevronUp className="h-4 w-4 ml-1" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </button>
                
                {filters.status.length > 0 && (
                  <button 
                    onClick={() => clearSection('status')}
                    className={`text-xs ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'} hover:underline`}
                  >
                    Clear
                  </button>
                )}
              </div>
              
              {expanded.status && (
                <div className="space-y-2 mt-2">
                  {Object.values(ModelStatus).map((status) => (
                    <label 
                      key={status}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        filters.status.includes(status)
                          ? isDark
                            ? 'bg-[#00cbdd] border-[#00cbdd]'
                            : 'bg-blue-600 border-blue-600'
                          : isDark
                            ? 'border-gray-700'
                            : 'border-gray-300'
                      }`}>
                        {filters.status.includes(status) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {status}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className={`p-4 border-t ${
            isDark ? 'border-gray-800' : 'border-gray-200'
          } flex justify-end space-x-3`}>
            <button
              onClick={onCancel}
              className={`px-4 py-2 rounded-lg text-sm ${
                isDark 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className={`px-4 py-2 rounded-lg text-sm ${
                isDark 
                  ? 'bg-[#00cbdd] text-[#000423] hover:bg-[#00b0c0]' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 