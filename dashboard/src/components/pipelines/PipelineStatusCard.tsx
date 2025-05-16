import { ArrowUp, ArrowDown } from 'lucide-react';
import React, { ReactNode } from 'react';

interface PipelineStatusCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  trend: number;
  isDark: boolean;
}

export default function PipelineStatusCard({
  title,
  value,
  icon,
  trend,
  isDark
}: PipelineStatusCardProps) {
  const getTrendColor = () => {
    if (title.includes('Error') || title.includes('Failed')) {
      return trend > 0 
        ? { text: isDark ? 'text-red-400' : 'text-red-600', bg: isDark ? 'bg-red-400/10' : 'bg-red-100' }
        : { text: isDark ? 'text-green-400' : 'text-green-600', bg: isDark ? 'bg-green-400/10' : 'bg-green-100' };
    }
    
    return trend >= 0 
      ? { text: isDark ? 'text-green-400' : 'text-green-600', bg: isDark ? 'bg-green-400/10' : 'bg-green-100' }
      : { text: isDark ? 'text-red-400' : 'text-red-600', bg: isDark ? 'bg-red-400/10' : 'bg-red-100' };
  };
  
  const trendColors = getTrendColor();
  
  return (
    <div className={`relative rounded-xl overflow-hidden ${
      isDark 
        ? 'bg-[#00091b]/70 border border-[#00cbdd]/20' 
        : 'bg-white border border-gray-200 shadow-sm'
    }`}>
      <div className="px-6 py-5">
        <div className="flex justify-between items-start">
          <div>
            <p className={`text-sm font-medium ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {title}
            </p>
            <h3 className={`mt-1 text-2xl font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </h3>
          </div>
          
          <div className={`p-2 rounded-lg ${
            isDark ? 'bg-[#00cbdd]/10' : 'bg-blue-50'
          }`}>
            <div className={isDark ? 'text-[#00cbdd]' : 'text-blue-500'}>
              {icon}
            </div>
          </div>
        </div>
        
        {typeof trend === 'number' && (
          <div className="mt-3 flex items-center">
            <div className={`flex items-center px-1.5 py-0.5 rounded-full text-xs ${trendColors.bg} ${trendColors.text}`}>
              {trend > 0 ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : trend < 0 ? (
                <ArrowDown className="h-3 w-3 mr-1" />
              ) : null}
              <span>{Math.abs(trend)}%</span>
            </div>
            <span className={`ml-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              vs. last month
            </span>
          </div>
        )}
      </div>
      
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${
        isDark 
          ? 'bg-gradient-to-r from-[#00cbdd]/50 to-blue-500/50' 
          : 'bg-gradient-to-r from-[#00cbdd] to-blue-500'
      }`}></div>
    </div>
  );
} 