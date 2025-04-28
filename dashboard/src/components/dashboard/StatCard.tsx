"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowUp, ArrowDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  changeText?: string;
  gradient?: string;
  isLoading?: boolean;
}

export default function StatCard({
  title,
  value,
  icon,
  change,
  changeText,
  gradient = 'from-[#00cbdd] to-blue-500',
  isLoading = false
}: StatCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl p-6 ${
        isDark 
          ? 'bg-[#00052d]/50 backdrop-blur-sm border border-[#00cbdd]/20' 
          : 'bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm'
      } overflow-hidden relative`}
    >
      {/* Gradient overlay */}
      <div className={`absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-gradient-to-br ${gradient} opacity-10`} />
      
      <div className="flex items-start justify-between">
        <div>
          <h3 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {title}
          </h3>
          
          {isLoading ? (
            <div className={`h-8 w-24 rounded mt-1 ${isDark ? 'bg-gray-700/50' : 'bg-gray-200'} animate-pulse`} />
          ) : (
            <p className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {value}
            </p>
          )}
          
          {!isLoading && change !== undefined && (
            <div className="flex items-center mt-2">
              <div 
                className={`flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
                  isPositive 
                    ? 'bg-green-500/20 text-green-500' 
                    : isNegative 
                      ? 'bg-red-500/20 text-red-500'
                      : 'bg-gray-500/20 text-gray-500'
                }`}
              >
                {isPositive ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : isNegative ? (
                  <ArrowDown className="h-3 w-3 mr-1" />
                ) : null}
                <span>{Math.abs(change)}%</span>
              </div>
              {changeText && (
                <span className={`ml-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {changeText}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} text-white`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
} 