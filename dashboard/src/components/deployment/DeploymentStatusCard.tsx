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
          ? 'bg-cosmic-800 hover:bg-[#001824]'
          : 'bg-white hover:bg-[#E6FCFF]'
      } transition-all duration-200 border ${
        isDark ? 'border-[#00cbdd]/20' : 'border-[#00cbdd]/10'
      } shadow-sm hover:shadow-md`}
    >
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg ${isDark ? 'bg-[#00cbdd]/20' : 'bg-[#00cbdd]/10'}`}>
          {icon}
        </div>
        <div className="flex items-center">
          {isPositiveTrend ? (
            <ArrowUpRight className="h-4 w-4 text-success-500 mr-1" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-error-500 mr-1" />
          )}
          <span className={`text-sm ${
            isPositiveTrend ? 'text-success-500' : 'text-error-500'
          }`}>
            {Math.abs(trend)}%
          </span>
        </div>
      </div>

      <div className="mt-4">
        <h3 className={`text-sm font-medium ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}>
          {title}
        </h3>
        <p className={`text-2xl font-semibold mt-1 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
          {value.toLocaleString()}
        </p>
      </div>

      {/* Gradient line */}
      <div className="mt-4 h-1 w-full bg-gradient-to-r from-[#00cbdd] to-[#0066ff] rounded-full opacity-50" />
    </div>
  );
}