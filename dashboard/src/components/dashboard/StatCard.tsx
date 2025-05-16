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
  gradient = 'from-[#00cbdd] to-[#0066ff]',
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
          ? 'bg-cosmic-900/95 backdrop-blur-sm border border-[#00cbdd]/20'
          : 'bg-white/80 backdrop-blur-sm border border-[#00cbdd]/10 shadow-sm'
      } overflow-hidden relative`}
    >
      {/* Gradient overlay */}
      <div className={`absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-gradient-to-br ${gradient} opacity-10`} />

      <div className="flex items-start justify-between">
        <div>
          <h3 className={`text-sm font-medium ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}>
            {title}
          </h3>

          {isLoading ? (
            <div className={`h-8 w-24 rounded mt-1 ${isDark ? 'bg-[#00cbdd]/20' : 'bg-[#00cbdd]/10'} animate-pulse`} />
          ) : (
            <p className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
              {value}
            </p>
          )}

          {!isLoading && change !== undefined && (
            <div className="flex items-center mt-2">
              <div
                className={`flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
                  isPositive
                    ? 'bg-success-500/20 text-success-500'
                    : isNegative
                      ? 'bg-error-500/20 text-error-500'
                      : 'bg-[#00cbdd]/20 text-[#00cbdd]'
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
                <span className={`ml-2 text-xs ${isDark ? 'text-[#7fe4eb]' : 'text-[#00cbdd]'}`}>
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