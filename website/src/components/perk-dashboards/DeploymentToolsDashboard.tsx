"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './animations.css';

interface DeploymentToolsDashboardProps {
  className?: string;
}

const DeploymentToolsDashboard: React.FC<DeploymentToolsDashboardProps> = ({ className }) => {
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'success' | 'failed'>('idle');
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [selectedEnvironment, setSelectedEnvironment] = useState<'development' | 'staging' | 'production'>('development');
  const [logs, setLogs] = useState<string[]>([
    "System ready for deployment"
  ]);
  const [selectedModel, setSelectedModel] = useState<string>('Bloom');

  // Models to display in the dashboard
  const models = [
    { name: 'Bloom', src: '/model/Bloom.png' },
    { name: 'Qwen', src: '/model/Qwen.png' },
    { name: 'SantaCoder', src: '/model/SantaCoder.png' },
  ];

  // Deployment environments
  const environments = [
    { id: 'development', name: 'Development', color: 'green' },
    { id: 'staging', name: 'Staging', color: 'yellow' },
    { id: 'production', name: 'Production', color: 'red' },
  ] as const;

  // Simulate deployment process
  useEffect(() => {
    if (deploymentStatus === 'deploying') {
      const interval = setInterval(() => {
        setDeploymentProgress(prev => {
          const newProgress = prev + (Math.random() * 2);

          if (newProgress >= 100) {
            clearInterval(interval);

            // 90% chance of success, 10% chance of failure
            if (Math.random() > 0.1) {
              setDeploymentStatus('success');
              addLog(`Deployment to ${selectedEnvironment} completed successfully`);
            } else {
              setDeploymentStatus('failed');
              addLog(`Deployment to ${selectedEnvironment} failed: Connection timeout`);
            }

            return 100;
          }

          // Add logs at certain progress points
          if (Math.floor(prev / 10) < Math.floor(newProgress / 10)) {
            const milestone = Math.floor(newProgress / 10) * 10;
            addDeploymentLog(milestone);
          }

          return newProgress;
        });
      }, 200);

      return () => clearInterval(interval);
    }

    // Reset after success or failure
    if (deploymentStatus === 'success' || deploymentStatus === 'failed') {
      const timeout = setTimeout(() => {
        setDeploymentStatus('idle');
        setDeploymentProgress(0);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [deploymentStatus, selectedEnvironment]);

  // Add a deployment log based on progress
  const addDeploymentLog = (progress: number) => {
    const logMessages: Record<number, string> = {
      10: `Preparing ${selectedModel} model for ${selectedEnvironment}`,
      20: `Validating model configuration`,
      30: `Optimizing model for deployment`,
      40: `Setting up ${selectedEnvironment} environment`,
      50: `Allocating resources`,
      60: `Uploading model artifacts`,
      70: `Configuring API endpoints`,
      80: `Running pre-deployment tests`,
      90: `Finalizing deployment`,
      100: `Deployment complete`
    };

    addLog(logMessages[progress]);
  };

  // Add a log entry
  const addLog = (message: string) => {
    setLogs(prev => {
      const timestamp = new Date().toLocaleTimeString();
      return [...prev, `[${timestamp}] ${message}`];
    });
  };

  // Start deployment
  const handleDeploy = () => {
    if (deploymentStatus === 'idle') {
      setDeploymentStatus('deploying');
      setDeploymentProgress(0);
      addLog(`Starting deployment of ${selectedModel} to ${selectedEnvironment}`);
    }
  };

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Background container combining multiple SVG styles */}
      <div className="absolute inset-0 rounded-xl bg-black/20 backdrop-blur-md border border-[#00cbdd]/30 overflow-hidden">
        {/* Concentric circles from hiw-three.svg */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[80%] h-[80%] rounded-full border border-[#00cbdd]/10"></div>
          <div className="absolute w-[60%] h-[60%] rounded-full border border-[#00cbdd]/20"></div>
          <div className="absolute w-[40%] h-[40%] rounded-full border border-[#00cbdd]/30"></div>
        </div>

        {/* Grid lines from grid-lines.svg */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-30">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full h-px bg-[#00cbdd]/10" style={{ top: `${(100 / 6) * (i + 1)}%` }}></div>
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full w-px bg-[#00cbdd]/10" style={{ left: `${(100 / 6) * (i + 1)}%` }}></div>
          ))}
        </div>

        {/* Deployment paths inspired by hiw-two.svg and f3.svg */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M50,10 L50,90"
            fill="none"
            stroke="#00cbdd"
            strokeWidth="0.2"
            strokeOpacity="0.3"
            strokeDasharray="1,1"
          />
          <path
            d="M10,50 L90,50"
            fill="none"
            stroke="#00cbdd"
            strokeWidth="0.2"
            strokeOpacity="0.3"
            strokeDasharray="1,1"
          />
          <path
            d="M20,20 L80,80"
            fill="none"
            stroke="#00cbdd"
            strokeWidth="0.2"
            strokeOpacity="0.3"
            strokeDasharray="1,1"
          />
          <path
            d="M20,80 L80,20"
            fill="none"
            stroke="#00cbdd"
            strokeWidth="0.2"
            strokeOpacity="0.3"
            strokeDasharray="1,1"
          />
        </svg>

        {/* Glow effects inspired by hero-gradient.svg */}
        <div className="absolute inset-0 bg-[#00cbdd]/5 rounded-full blur-[50px]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#00cbdd]/10 to-transparent blur-[30px]"></div>
        <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-[#00cbdd]/5 rounded-full blur-[20px]"></div>
      </div>

      {/* Simplified Deployment Dashboard */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Central deployment hub */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] aspect-square rounded-full bg-black/60 backdrop-blur-md border-2 border-[#00cbdd] flex items-center justify-center z-20 shadow-lg shadow-[#00cbdd]/20">
            <div className="text-[#00cbdd] font-bold text-[10px] text-center">
              <div className="text-white text-sm">Deploy</div>
              {selectedModel}
            </div>

            {/* Progress indicator */}
            {deploymentStatus !== 'idle' && (
              <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[60%]">
                <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      deploymentStatus === 'failed' ? 'bg-red-500' : 'bg-gradient-to-r from-[#0891b2] to-[#00cbdd]'
                    }`}
                    style={{ width: `${deploymentProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Status indicator */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md border border-[#00cbdd]/40 rounded-md px-2 py-0.5 text-[8px] text-white font-mono">
              <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${
                deploymentStatus === 'idle' ? 'bg-yellow-500' :
                deploymentStatus === 'deploying' ? 'bg-blue-500 animate-pulse' :
                deploymentStatus === 'success' ? 'bg-green-500' :
                'bg-red-500'
              }`}></span>
              {deploymentStatus === 'idle' ? 'Ready' :
               deploymentStatus === 'deploying' ? `${Math.round(deploymentProgress)}%` :
               deploymentStatus === 'success' ? 'Completed' : 'Failed'}
            </div>

            {/* Ripple effect */}
            <div className="absolute w-full h-full rounded-full border-2 border-[#00cbdd]/80 animate-ripple"></div>
            <div className="absolute w-full h-full rounded-full border-2 border-[#00cbdd]/60 animate-ripple delay-500"></div>
            <div className="absolute w-full h-full rounded-full border-2 border-[#00cbdd]/40 animate-ripple delay-1000"></div>
          </div>

          {/* Model selection */}
          <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 flex space-x-2">
            {models.map((model) => (
              <div
                key={model.name}
                className={`flex items-center bg-black/40 rounded-md px-1.5 py-0.5 border ${
                  selectedModel === model.name
                    ? 'border-[#00cbdd] shadow-md shadow-[#00cbdd]/20'
                    : 'border-[#00cbdd]/30 hover:border-[#00cbdd]/60'
                } cursor-pointer transition-all duration-300`}
                onClick={() => {
                  if (deploymentStatus === 'idle') {
                    setSelectedModel(model.name);
                    addLog(`Selected model: ${model.name}`);
                  }
                }}
              >
                <Image
                  src={model.src}
                  alt={model.name}
                  width={16}
                  height={16}
                  className="mr-1"
                />
                <span className="text-white text-[8px]">{model.name}</span>
              </div>
            ))}
          </div>

          {/* Environment selection */}
          <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 flex space-x-2">
            {environments.map((env) => (
              <button
                key={env.id}
                className={`px-2 py-0.5 text-[8px] rounded-md border ${
                  selectedEnvironment === env.id
                    ? `border-${env.color}-500 bg-${env.color}-500/20 text-white`
                    : 'border-gray-500/30 bg-black/40 text-gray-400 hover:border-gray-400'
                } transition-all duration-300`}
                onClick={() => {
                  if (deploymentStatus === 'idle') {
                    setSelectedEnvironment(env.id);
                    addLog(`Selected environment: ${env.name}`);
                  }
                }}
                disabled={deploymentStatus !== 'idle'}
              >
                <div className="flex items-center justify-center">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full bg-${env.color}-500 mr-1`}></span>
                  {env.name}
                </div>
              </button>
            ))}
          </div>

          {/* Deploy button */}
          {deploymentStatus === 'idle' && (
            <button
              className="absolute right-[20%] top-1/2 transform -translate-y-1/2 px-2 py-1 text-[8px] rounded-md border border-[#00cbdd] bg-[#00cbdd]/20 text-white hover:bg-[#00cbdd]/30 transition-all duration-300"
              onClick={handleDeploy}
            >
              Deploy
            </button>
          )}

          {/* Cancel button */}
          {deploymentStatus === 'deploying' && (
            <button
              className="absolute right-[20%] top-1/2 transform -translate-y-1/2 px-2 py-1 text-[8px] rounded-md border border-red-500 bg-red-500/20 text-white hover:bg-red-500/30 transition-all duration-300"
              onClick={() => {
                setDeploymentStatus('failed');
                setDeploymentProgress(100);
                addLog('Deployment canceled by user');
              }}
            >
              Cancel
            </button>
          )}

          {/* Deployment visualization */}
          {deploymentStatus === 'deploying' && (
            <>
              {/* Animated particles */}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeploymentToolsDashboard;
