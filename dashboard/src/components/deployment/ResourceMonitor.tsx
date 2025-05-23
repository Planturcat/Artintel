import { ReactNode } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface ResourceMonitorProps {
  title: string;
  value: number;
  icon: ReactNode;
  trend?: number;
  isDark?: boolean;
}

export default function ResourceMonitor({
  title,
  value,
  icon,
  trend = 0,
  isDark = false
}: ResourceMonitorProps) {
  // Determine status color based on value
  const getStatusColor = (value: number) => {
    if (value >= 90) return 'text-error-500';
    if (value >= 75) return 'text-warning-500';
    return 'text-success-500';
  };

  // Determine background color based on value and theme
  const getBackgroundColor = (value: number) => {
    if (isDark) {
      if (value >= 90) return 'from-error-500/20 to-error-900/20';
      if (value >= 75) return 'from-warning-500/20 to-warning-900/20';
      return 'from-success-500/20 to-success-900/20';
    } else {
      if (value >= 90) return 'from-error-50 to-error-100';
      if (value >= 75) return 'from-warning-50 to-warning-100';
      return 'from-success-50 to-success-100';
    }
  };

  return (
    <div
      className={`p-6 rounded-xl ${
        isDark
          ? 'bg-cosmic-800 hover:bg-[#001824]'
          : 'bg-white hover:bg-[#E6FCFF]'
      } transition-all duration-200 border ${
        isDark ? 'border-[#00cbdd]/20' : 'border-[#00cbdd]/10'
      } shadow-sm hover:shadow-md`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
            {icon}
          </div>
          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
        </div>
        <div className="flex items-center">
          <span className={`text-2xl font-semibold ${getStatusColor(value)}`}>
            {value}%
          </span>
          {trend !== 0 && (
            <div className="flex items-center ml-2">
              {trend > 0 ? (
                <ArrowUpRight className="h-4 w-4 text-red-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
              )}
              <span className={`text-xs ${
                trend > 0 ? 'text-red-500' : 'text-green-500'
              }`}>
                {Math.abs(trend)}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${getBackgroundColor(value)} transition-all duration-500`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>

      {/* Status indicators */}
      <div className="mt-4 flex justify-between text-xs">
        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>0%</span>
        <div className="flex space-x-2">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-1" />
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Normal</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-amber-500 mr-1" />
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Warning</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-1" />
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Critical</span>
          </div>
        </div>
        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>100%</span>
      </div>
    </div>
  );
}