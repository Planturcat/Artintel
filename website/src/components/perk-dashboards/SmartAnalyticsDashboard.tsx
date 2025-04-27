"use client";

import React, { useState, useEffect } from 'react';
import './animations.css';

interface SmartAnalyticsDashboardProps {
  className?: string;
}

const SmartAnalyticsDashboard: React.FC<SmartAnalyticsDashboardProps> = ({ className }) => {
  const [dataPoints, setDataPoints] = useState<number[]>([25, 40, 30, 60, 45, 75, 50, 65]);
  const [barData, setBarData] = useState<number[]>([65, 40, 85, 30, 70, 50]);
  const [metrics, setMetrics] = useState({
    accuracy: 75,
    uptime: 98,
    latency: 1.2
  });
  const [activeTab, setActiveTab] = useState<'performance' | 'usage' | 'insights'>('performance');
  const [activeChart, setActiveChart] = useState<'line' | 'bar'>('line');

  // Simulate changing data points
  useEffect(() => {
    const interval = setInterval(() => {
      // Update line chart data
      setDataPoints(prev =>
        prev.map(point => {
          const change = Math.random() * 10 - 5; // Random value between -5 and 5
          const newValue = point + change;
          return Math.max(10, Math.min(90, newValue)); // Keep between 10 and 90
        })
      );

      // Update bar chart data
      setBarData(prev =>
        prev.map(point => {
          const change = Math.random() * 8 - 4; // Random value between -4 and 4
          const newValue = point + change;
          return Math.max(10, Math.min(90, newValue)); // Keep between 10 and 90
        })
      );

      // Occasionally update metrics
      if (Math.random() > 0.7) {
        setMetrics(prev => ({
          accuracy: Math.min(99, Math.max(70, prev.accuracy + (Math.random() * 2 - 1))),
          uptime: Math.min(99.9, Math.max(95, prev.uptime + (Math.random() * 0.5 - 0.2))),
          latency: Math.min(2, Math.max(0.8, prev.latency + (Math.random() * 0.2 - 0.1)))
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Background container combining multiple SVG styles */}
      <div className="absolute inset-0 rounded-xl bg-black/20 backdrop-blur-md border border-[#00cbdd]/30 overflow-hidden">
        {/* Grid lines from grid-lines.svg */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full h-px bg-[#00cbdd]/10" style={{ top: `${(100 / 8) * (i + 1)}%` }}></div>
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full w-px bg-[#00cbdd]/10" style={{ left: `${(100 / 8) * (i + 1)}%` }}></div>
          ))}
        </div>

        {/* Diagonal lines inspired by hiw-one.svg */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="100" y2="100" stroke="#00cbdd" strokeWidth="0.1" strokeOpacity="0.2" />
          <line x1="0" y1="100" x2="100" y2="0" stroke="#00cbdd" strokeWidth="0.1" strokeOpacity="0.2" />
        </svg>

        {/* Curved paths inspired by hiw-two.svg */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M0,50 C20,20 80,80 100,50"
            fill="none"
            stroke="#00cbdd"
            strokeWidth="0.2"
            strokeOpacity="0.2"
          />
          <path
            d="M0,70 C30,30 70,70 100,30"
            fill="none"
            stroke="#00cbdd"
            strokeWidth="0.2"
            strokeOpacity="0.2"
          />
        </svg>

        {/* Glow effects inspired by hero-gradient.svg */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#00cbdd]/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[#00cbdd]/5 rounded-full blur-[30px]"></div>
      </div>

      {/* Simplified Analytics Dashboard */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full p-[10%]">
          {/* Chart area */}
          <div className="w-full h-full bg-black/40 backdrop-blur-md border border-[#00cbdd]/30 rounded-xl p-2 relative">
            {/* Live data indicator */}
            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md border border-[#00cbdd]/40 px-2 py-0.5 rounded-md text-[8px] text-white font-mono flex items-center shadow-lg shadow-black/20 z-20">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00cbdd] mr-1 animate-pulse"></span>
              <span>LIVE</span>
            </div>

            {/* Chart type selector */}
            <div className="absolute top-2 left-2 flex space-x-1 bg-black/30 rounded-md p-0.5 z-20">
              <button
                className={`px-1.5 py-0.5 text-[8px] rounded ${
                  activeChart === 'line'
                    ? 'bg-[#00cbdd]/30 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveChart('line')}
              >
                Line
              </button>
              <button
                className={`px-1.5 py-0.5 text-[8px] rounded ${
                  activeChart === 'bar'
                    ? 'bg-[#00cbdd]/30 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveChart('bar')}
              >
                Bar
              </button>
            </div>

            {/* Line Chart */}
            {activeChart === 'line' && (
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Chart line */}
                <path
                  d={`M 0,${100 - dataPoints[0]} ${dataPoints.map((point, i) =>
                    `L ${(i + 1) * (100 / (dataPoints.length - 1))},${100 - point}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="#00cbdd"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-glow"
                />

                {/* Area under the line */}
                <path
                  d={`M 0,${100 - dataPoints[0]} ${dataPoints.map((point, i) =>
                    `L ${(i + 1) * (100 / (dataPoints.length - 1))},${100 - point}`
                  ).join(' ')} L 100,100 L 0,100 Z`}
                  fill="url(#analytics-gradient)"
                  opacity="0.3"
                />

                {/* Data points */}
                {dataPoints.map((point, i) => (
                  <circle
                    key={i}
                    cx={`${i * (100 / (dataPoints.length - 1))}`}
                    cy={`${100 - point}`}
                    r="2"
                    fill="#00cbdd"
                    className="animate-pulse"
                  />
                ))}

                {/* Gradient definition */}
                <defs>
                  <linearGradient id="analytics-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00cbdd" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#00cbdd" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            )}

            {/* Bar Chart */}
            {activeChart === 'bar' && (
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {barData.map((value, index) => {
                  const barWidth = 10;
                  const gap = (100 - barData.length * barWidth) / (barData.length + 1);
                  const x = gap + index * (barWidth + gap);

                  return (
                    <g key={index}>
                      <rect
                        x={x}
                        y={100 - value}
                        width={barWidth}
                        height={value}
                        rx={2}
                        fill="url(#bar-gradient)"
                        className="transition-all duration-500"
                      />
                      <rect
                        x={x}
                        y={100 - value}
                        width={barWidth}
                        height={4}
                        rx={2}
                        fill="#00cbdd"
                        className="animate-glow"
                      />
                    </g>
                  );
                })}

                {/* Gradient definition */}
                <defs>
                  <linearGradient id="bar-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00cbdd" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00cbdd" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            )}

            {/* Metrics overlay */}
            <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-md border border-[#00cbdd]/40 rounded-md p-1.5 grid grid-cols-3 gap-1">
              <div className="flex flex-col items-center">
                <div className="text-[8px] text-[#00cbdd]/80">Accuracy</div>
                <div className="text-xs font-bold text-white">{Math.round(metrics.accuracy)}%</div>
              </div>
              <div className="flex flex-col items-center border-x border-[#00cbdd]/20">
                <div className="text-[8px] text-[#00cbdd]/80">Uptime</div>
                <div className="text-xs font-bold text-white">{metrics.uptime.toFixed(1)}%</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-[8px] text-[#00cbdd]/80">Latency</div>
                <div className="text-xs font-bold text-white">{metrics.latency.toFixed(1)}s</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartAnalyticsDashboard;
