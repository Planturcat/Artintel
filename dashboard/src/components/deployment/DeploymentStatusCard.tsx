import { ReactNode } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface DeploymentStatusCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  trend: number;
  isDark?: boolean;
}

export default function DeploymentStatusCard({
  title,
  value,
  icon,
  trend,
  isDark = false
}: DeploymentStatusCardProps) {
  const isPositiveTrend = trend >= 0;
  
  return (
    <div 
      className={`p-6 rounded-xl ${
        isDark 
          ? 'bg-gray-800/50 hover:bg-gray-800/70' 
          : 'bg-white hover:bg-gray-50'
      } transition-all duration-200 border ${
        isDark ? 'border-gray-700' : 'border-gray-100'
      } shadow-sm hover:shadow-md`}
    >
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
          {icon}
        </div>
        <div className="flex items-center">
          {isPositiveTrend ? (
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm ${
            isPositiveTrend ? 'text-green-500' : 'text-red-500'
          }`}>
            {Math.abs(trend)}%
          </span>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {title}
        </h3>
        <p className={`text-2xl font-semibold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {value.toLocaleString()}
        </p>
      </div>
      
      {/* Gradient line */}
      <div className="mt-4 h-1 w-full bg-gradient-to-r from-[#00cbdd] to-blue-500 rounded-full opacity-50" />
    </div>
  );
} 