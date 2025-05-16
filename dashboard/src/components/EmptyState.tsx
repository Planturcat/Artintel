import React, { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: ReactNode;
  isDark: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ title, description, icon, isDark, action }: EmptyStateProps) {
  return (
    <div className={`p-8 rounded-xl ${
      isDark 
        ? 'bg-[#00091b]/90 border border-[#00cbdd]/20' 
        : 'bg-white border border-gray-200'
    } text-center`}>
      <div className={`mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
        {icon}
      </div>
      <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>
      <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} max-w-md mx-auto mb-4`}>
        {description}
      </p>
      
      {action && (
        <button
          onClick={action.onClick}
          className={`mt-2 px-4 py-2 rounded-lg text-sm ${
            isDark 
              ? 'bg-[#00cbdd] text-[#000423] hover:bg-[#00b0c0]' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {action.label}
        </button>
      )}
    </div>
  );
} 