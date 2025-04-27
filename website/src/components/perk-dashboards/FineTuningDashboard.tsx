"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './animations.css';

interface FineTuningDashboardProps {
  className?: string;
}

const FineTuningDashboard: React.FC<FineTuningDashboardProps> = ({ className }) => {
  const [activeModel, setActiveModel] = useState(0);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'training' | 'complete'>('idle');
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number | null>(null);

  // Models to display in the dashboard
  const models = [
    { name: 'Llama', src: '/model/Llama.png' },
    { name: 'Mistral', src: '/model/Mistral.png' },
    { name: 'Phi', src: '/model/Phi.png' },
  ];

  // Animate rotation for the model selection wheel
  useEffect(() => {
    const animate = () => {
      setRotation(prev => (prev + 0.05) % 360);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Simulate model training process
  useEffect(() => {
    if (status === 'idle') {
      const timeout = setTimeout(() => {
        setStatus('training');
        setActiveModel(Math.floor(Math.random() * models.length));
      }, 3000);
      return () => clearTimeout(timeout);
    }

    if (status === 'training') {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (Math.random() * 1.5);
          if (newProgress >= 100) {
            setStatus('complete');
            return 100;
          }
          return newProgress;
        });
      }, 150);
      return () => clearInterval(interval);
    }

    if (status === 'complete') {
      const timeout = setTimeout(() => {
        setProgress(0);
        setStatus('idle');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [status, models.length]);

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Background elements combining multiple SVG styles */}
      <div className="absolute inset-0">
        {/* Grid lines from grid-lines.svg */}
        <div className="absolute w-full h-full grid grid-cols-6 grid-rows-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full h-px bg-[#00cbdd]/10" style={{ top: `${(100 / 6) * (i + 1)}%` }}></div>
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full w-px bg-[#00cbdd]/10" style={{ left: `${(100 / 6) * (i + 1)}%` }}></div>
          ))}
        </div>

        {/* Concentric circles from hiw-three.svg */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[90%] h-[90%] rounded-full border border-[#00cbdd]/20"></div>
          <div className="absolute w-[70%] h-[70%] rounded-full border border-[#00cbdd]/30"></div>
          <div className="absolute w-[50%] h-[50%] rounded-full border border-[#00cbdd]/40"></div>
        </div>

        {/* Diagonal lines inspired by hiw-one.svg */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="100" x2="100" y2="0" stroke="#00cbdd" strokeWidth="0.1" strokeOpacity="0.2" />
          <line x1="25" y1="100" x2="100" y2="25" stroke="#00cbdd" strokeWidth="0.1" strokeOpacity="0.2" />
          <line x1="0" y1="75" x2="75" y2="0" stroke="#00cbdd" strokeWidth="0.1" strokeOpacity="0.2" />
        </svg>
      </div>

      {/* Glow effects inspired by hero-gradient.svg */}
      <div className="absolute inset-0 m-auto w-[60%] h-[60%] bg-[#00cbdd]/10 rounded-full blur-[40px]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#00cbdd]/10 to-transparent blur-[30px]"></div>

      {/* Main dashboard container */}
      <div className="absolute inset-0 flex">
        {/* Left side - Model selection */}
        <div className="w-1/2 h-full relative flex items-center justify-center">
          <div className="relative w-[80%] h-[80%]">
            {models.map((model, index) => {
              // Calculate position based on rotation
              const angle = (index * (360 / models.length) + rotation) % 360;
              const radian = (angle * Math.PI) / 180;
              const radius = 40; // % of container

              const left = 50 + radius * Math.cos(radian);
              const top = 50 + radius * Math.sin(radian);

              const isActive = index === activeModel;
              const scale = isActive ? 1.2 : 1;

              return (
                <div
                  key={model.name}
                  className={`absolute w-[22%] aspect-square rounded-full bg-black/40 backdrop-blur-md border-2 ${
                    isActive ? 'border-[#00cbdd]' : 'border-[#00cbdd]/30'
                  } flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 hover:border-[#00cbdd] hover:shadow-lg hover:shadow-[#00cbdd]/20`}
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    zIndex: isActive ? 10 : 5,
                    transform: `translate(-50%, -50%) scale(${scale})`,
                  }}
                  onClick={() => {
                    setActiveModel(index);
                    if (status === 'idle') {
                      setStatus('training');
                    }
                  }}
                >
                  <Image
                    src={model.src}
                    alt={model.name}
                    width={40}
                    height={40}
                    className="w-[60%] h-[60%] object-contain"
                  />

                  {isActive && (
                    <div className="absolute w-full h-full rounded-full border-2 border-[#00cbdd]/60 animate-ripple"></div>
                  )}
                </div>
              );
            })}

            {/* Connection lines (inspired by hiw-two.svg) */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {models.map((_, index) => {
                const angle = (index * (360 / models.length) + rotation) % 360;
                const radian = (angle * Math.PI) / 180;
                const radius = 40;

                const x = 50 + radius * Math.cos(radian);
                const y = 50 + radius * Math.sin(radian);

                const isActive = index === activeModel;

                return (
                  <g key={`line-${index}`}>
                    <line
                      x1="50"
                      y1="50"
                      x2={x}
                      y2={y}
                      stroke={isActive ? "#00cbdd" : "#00cbdd40"}
                      strokeWidth="0.5"
                      strokeDasharray={isActive ? "0" : "1,1"}
                    />

                    {isActive && status === 'training' && (
                      <>
                        <circle
                          cx={(50 + x) / 2}
                          cy={(50 + y) / 2}
                          r="0.8"
                          fill="#00cbdd"
                          className="animate-pulse"
                        />
                        <circle
                          cx={(50 + x) / 3}
                          cy={(50 + y) / 3}
                          r="0.5"
                          fill="#00cbdd"
                          className="animate-pulse delay-300"
                        />
                        <circle
                          cx={(50 + x) * 2/3}
                          cy={(50 + y) * 2/3}
                          r="0.5"
                          fill="#00cbdd"
                          className="animate-pulse delay-600"
                        />
                      </>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Center element */}
            <div className="absolute left-1/2 top-1/2 w-[30%] aspect-square rounded-full bg-black/60 backdrop-blur-md border-2 border-[#00cbdd] flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-20 shadow-lg shadow-[#00cbdd]/20">
              <div className="text-[#00cbdd] font-bold text-xs text-center">
                <div className="text-white text-base">Fine</div>
                Tuning
              </div>

              {/* Ripple effect */}
              <div className="absolute w-full h-full rounded-full border-2 border-[#00cbdd]/80 animate-ripple"></div>
              <div className="absolute w-full h-full rounded-full border-2 border-[#00cbdd]/60 animate-ripple delay-500"></div>
              <div className="absolute w-full h-full rounded-full border-2 border-[#00cbdd]/40 animate-ripple delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Right side - Training dashboard */}
        <div className="w-1/2 h-full flex items-center justify-center p-4">
          <div className="w-full h-full max-h-[180px] bg-black/60 backdrop-blur-md border border-[#00cbdd]/40 rounded-xl overflow-hidden shadow-lg shadow-black/30">
            {/* Header */}
            <div className="w-full bg-[#00cbdd]/20 px-4 py-2 flex items-center justify-between border-b border-[#00cbdd]/30">
              <div className="text-white font-medium text-sm">Fine-Tuning</div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Selected model */}
              <div className="flex items-center mb-3">
                <div className="text-xs text-[#00cbdd] font-mono mr-2">MODEL:</div>
                <div className="flex items-center bg-black/40 rounded-md px-2 py-1 border border-[#00cbdd]/30">
                  <Image
                    src={models[activeModel].src}
                    alt={models[activeModel].name}
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  <span className="text-white text-xs font-mono">{models[activeModel].name}</span>
                </div>
              </div>

              {/* Code snippet */}
              <div className="bg-black/40 rounded-md p-2 border border-[#00cbdd]/20 mb-3 font-mono text-xs">
                <div className="text-gray-400">// Training parameters</div>
                <div><span className="text-[#00cbdd]">const</span> <span className="text-yellow-400">params</span> = {'{'}</div>
                <div className="pl-4"><span className="text-purple-400">epochs</span>: <span className="text-orange-400">3</span>,</div>
                <div className="pl-4"><span className="text-purple-400">batchSize</span>: <span className="text-orange-400">8</span></div>
                <div>{'}'}</div>
              </div>

              {/* Progress bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs text-[#00cbdd]/80 mb-1">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0891b2] to-[#00cbdd] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center">
                <div className="text-xs text-[#00cbdd] font-mono mr-2">STATUS:</div>
                <div className="text-xs text-white font-mono flex items-center">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    status === 'idle' ? 'bg-yellow-500' :
                    status === 'training' ? 'bg-green-500 animate-pulse' :
                    'bg-blue-500'
                  }`}></span>
                  {status === 'idle' ? 'Ready' :
                   status === 'training' ? 'Training in progress...' :
                   'Training complete'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles (inspired by hiw-one.svg) */}
      {status === 'training' && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => {
            const delay = i * 0.3;
            const size = Math.random() * 3 + 1;
            const duration = Math.random() * 1.5 + 1;

            return (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[#00cbdd] rounded-full animate-packet"
                style={{
                  left: '50%',
                  top: '50%',
                  width: `${size}px`,
                  height: `${size}px`,
                  boxShadow: '0 0 8px 2px rgba(0, 203, 221, 0.6)',
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                  '--packet-x': `${Math.random() * 100 - 50}%`,
                  '--packet-y': `${Math.random() * 100 - 50}%`,
                } as React.CSSProperties}
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FineTuningDashboard;
