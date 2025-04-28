"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { EllipsisVertical, Maximize2, Minimize2 } from 'lucide-react';

export interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void | Promise<void>;
}

export default function DashboardCard({
  title,
  subtitle,
  children,
  className = '',
  action,
  isLoading = false,
  fullWidth = false,
  onClick,
}: DashboardCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [expanded, setExpanded] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(false);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl ${
        isDark 
          ? 'bg-[#00052d]/50 backdrop-blur-sm border border-[#00cbdd]/20' 
          : 'bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm'
      } overflow-hidden ${className} ${expanded ? 'fixed inset-6 z-50' : ''}`}
    >
      {/* Card Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-opacity-10 border-[#00cbdd]">
        <div>
          <h2 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`text-sm mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {action}
          
          <button 
            onClick={() => setExpanded(!expanded)}
            className={`p-1.5 rounded-md ${
              isDark 
                ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            } transition-colors`}
          >
            {expanded ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className={`p-1.5 rounded-md ${
                isDark 
                  ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
              } transition-colors`}
            >
              <EllipsisVertical className="h-4 w-4" />
            </button>
            
            {showOptions && (
              <div 
                className={`absolute right-0 mt-1 w-48 rounded-md shadow-lg z-10 ${
                  isDark 
                    ? 'bg-[#000a47] border border-[#00cbdd]/20' 
                    : 'bg-white border border-gray-100'
                } overflow-hidden`}
              >
                <div className="py-1">
                  <button
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      isDark 
                        ? 'text-gray-300 hover:bg-[#00cbdd]/10 hover:text-white' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#00cbdd]'
                    }`}
                  >
                    Refresh
                  </button>
                  <button
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      isDark 
                        ? 'text-gray-300 hover:bg-[#00cbdd]/10 hover:text-white' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#00cbdd]'
                    }`}
                  >
                    Download
                  </button>
                  <button
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      isDark 
                        ? 'text-gray-300 hover:bg-[#00cbdd]/10 hover:text-white' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#00cbdd]'
                    }`}
                  >
                    Share
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Card Content */}
      <div className={fullWidth ? '' : 'p-6'}>
        {isLoading ? (
          <div className="flex flex-col space-y-4 animate-pulse">
            <div className={`h-4 rounded-full w-3/4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <div className={`h-4 rounded-full w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <div className={`h-4 rounded-full w-5/6 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <div className={`h-4 rounded-full w-2/3 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
          </div>
        ) : (
          children
        )}
      </div>
    </motion.div>
  );
} 