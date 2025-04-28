"use client";

import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';

export interface LineChartProps {
  data: any[];
  lines: Array<{
    dataKey: string;
    name: string;
    color: string;
  }>;
  xAxisDataKey: string;
  height?: number;
  title?: string;
  subtitle?: string;
}

export default function LineChart({
  data,
  lines,
  xAxisDataKey,
  height = 300,
  title,
  subtitle,
}: LineChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Colors based on theme
  const axisColor = isDark ? '#6b7280' : '#9ca3af';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const backgroundColor = isDark ? '#00052d' : '#ffffff';
  const textColor = isDark ? '#e5e7eb' : '#374151';

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg border ${
          isDark 
            ? 'bg-[#000a47] border-[#00cbdd]/20 text-white' 
            : 'bg-white border-gray-100 text-gray-800 shadow-md'
        }`}>
          <p className="text-sm font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`tooltip-${index}`} className="flex items-center text-sm">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
              <span className="font-medium">{entry.name}:</span>
              <span className="ml-1">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`p-6 rounded-xl ${
      isDark 
        ? 'bg-[#00052d]/50 border border-[#00cbdd]/20 text-white' 
        : 'bg-white border border-gray-100 shadow-sm text-gray-900'
    }`}>
      {title && (
        <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
      )}
      {subtitle && (
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
          {subtitle}
        </p>
      )}
      
      <div className="mt-4" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={gridColor}
            />
            <XAxis
              dataKey={xAxisDataKey}
              tick={{ fill: axisColor, fontSize: 12 }}
              tickLine={{ stroke: axisColor }}
              axisLine={{ stroke: gridColor }}
            />
            <YAxis
              tick={{ fill: axisColor, fontSize: 12 }}
              tickLine={{ stroke: axisColor }}
              axisLine={{ stroke: gridColor }}
              width={35}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ 
                paddingTop: '10px',
                color: textColor,
                fontSize: '12px',
              }}
            />
            {lines.map((line, index) => (
              <Line
                key={`line-${index}`}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.color}
                strokeWidth={2}
                dot={{ 
                  r: 4, 
                  strokeWidth: 2, 
                  fill: backgroundColor, 
                  stroke: line.color 
                }}
                activeDot={{ 
                  r: 6, 
                  strokeWidth: 0, 
                  fill: line.color 
                }}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 