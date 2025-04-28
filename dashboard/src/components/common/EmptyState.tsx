import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: React.ReactNode;
  isDark?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  isDark = false
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center rounded-xl border ${
        isDark
          ? 'bg-[#00031b]/90 border-[#00cbdd]/20 text-white'
          : 'bg-white border-gray-200 text-gray-800'
      }`}
    >
      <div
        className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 ${
          isDark ? 'bg-[#00052d]/60 text-[#00cbdd]' : 'bg-blue-100 text-blue-600'
        }`}
      >
        {icon}
      </div>
      
      <h3 className={`text-xl font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>
      
      <p className={`max-w-md mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {description}
      </p>
      
      {action && action}
    </div>
  );
};

export default EmptyState; 