import { ReactNode } from 'react';

interface ResourceMonitorProps {
  title: string;
  value: number;
  icon: ReactNode;
  isDark?: boolean;
}

export default function ResourceMonitor({
  title,
  value,
  icon,
  isDark = false
}: ResourceMonitorProps) {
  // Determine status color based on value
  const getStatusColor = (value: number) => {
    if (value >= 90) return 'text-red-500';
    if (value >= 75) return 'text-amber-500';
    return 'text-green-500';
  };

  // Determine background color based on value and theme
  const getBackgroundColor = (value: number) => {
    if (isDark) {
      if (value >= 90) return 'from-red-500/20 to-red-900/20';
      if (value >= 75) return 'from-amber-500/20 to-amber-900/20';
      return 'from-green-500/20 to-green-900/20';
    } else {
      if (value >= 90) return 'from-red-50 to-red-100';
      if (value >= 75) return 'from-amber-50 to-amber-100';
      return 'from-green-50 to-green-100';
    }
  };

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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
            {icon}
          </div>
          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
        </div>
        <span className={`text-2xl font-semibold ${getStatusColor(value)}`}>
          {value}%
        </span>
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