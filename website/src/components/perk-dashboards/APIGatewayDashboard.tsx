"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './animations.css';

interface APIGatewayDashboardProps {
  className?: string;
}

const APIGatewayDashboard: React.FC<APIGatewayDashboardProps> = ({ className }) => {
  const [activeConnections, setActiveConnections] = useState<number[]>([]);
  const [requestCount, setRequestCount] = useState(0);
  const [responseTime, setResponseTime] = useState(120); // ms
  const [logs, setLogs] = useState<string[]>([
    "GET /api/models/list 200 OK",
    "POST /api/inference 200 OK",
    "GET /api/status 200 OK"
  ]);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'routes' | 'logs'>('overview');

  // Models to display in the dashboard
  const models = [
    { name: 'DeepSeek', src: '/model/DeepSeek.png' },
    { name: 'Falcon', src: '/model/Falcon.png' },
    { name: 'GPT-J', src: '/model/gpt-j-6b.png' },
  ];

  // Client applications
  const clients = [
    { id: 1, name: 'Web App', type: 'frontend' },
    { id: 2, name: 'Mobile', type: 'mobile' },
    { id: 3, name: 'API', type: 'backend' },
  ];

  // API routes
  const routes = [
    { path: '/api/models/list', method: 'GET', status: 'active' },
    { path: '/api/inference', method: 'POST', status: 'active' },
    { path: '/api/fine-tune', method: 'POST', status: 'active' },
    { path: '/api/status', method: 'GET', status: 'active' },
    { path: '/api/models/download', method: 'GET', status: 'inactive' },
  ];

  // Simulate API connections
  useEffect(() => {
    // Initial connection
    setActiveConnections([Math.floor(Math.random() * models.length)]);

    const connectionInterval = setInterval(() => {
      // Randomly add or remove connections
      setActiveConnections(prev => {
        const newConnections = [...prev];

        // Randomly add a connection
        if (newConnections.length < models.length && Math.random() > 0.7) {
          const availableModels = models.map((_, i) => i).filter(i => !newConnections.includes(i));
          if (availableModels.length > 0) {
            const randomModel = availableModels[Math.floor(Math.random() * availableModels.length)];
            newConnections.push(randomModel);
          }
        }

        // Randomly remove a connection
        if (newConnections.length > 1 && Math.random() > 0.8) {
          const indexToRemove = Math.floor(Math.random() * newConnections.length);
          newConnections.splice(indexToRemove, 1);
        }

        return newConnections;
      });

      // Update request count
      setRequestCount(prev => prev + Math.floor(Math.random() * 5) + 1);

      // Update response time
      setResponseTime(prev => {
        const change = Math.random() * 20 - 10;
        return Math.max(80, Math.min(200, prev + change));
      });

      // Add a new log entry
      if (Math.random() > 0.5) {
        const methods = ['GET', 'POST', 'PUT', 'DELETE'];
        const paths = ['/api/models/list', '/api/inference', '/api/fine-tune', '/api/status', '/api/models/download'];
        const statuses = ['200 OK', '201 Created', '204 No Content', '400 Bad Request', '404 Not Found', '500 Server Error'];

        const method = methods[Math.floor(Math.random() * methods.length)];
        const path = paths[Math.floor(Math.random() * paths.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        setLogs(prev => {
          const newLogs = [...prev, `${method} ${path} ${status}`];
          if (newLogs.length > 8) {
            return newLogs.slice(newLogs.length - 8);
          }
          return newLogs;
        });
      }
    }, 2000);

    return () => clearInterval(connectionInterval);
  }, [models.length]);

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Background container combining multiple SVG styles */}
      <div className="absolute inset-0 rounded-xl bg-black/20 backdrop-blur-md border border-[#00cbdd]/30 overflow-hidden">
        {/* Grid lines from grid-lines.svg */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-30">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full h-px bg-[#00cbdd]/10" style={{ top: `${(100 / 6) * (i + 1)}%` }}></div>
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full w-px bg-[#00cbdd]/10" style={{ left: `${(100 / 6) * (i + 1)}%` }}></div>
          ))}
        </div>

        {/* Network paths inspired by hiw-two.svg */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M10,50 C30,30 70,70 90,50"
            fill="none"
            stroke="#00cbdd"
            strokeWidth="0.2"
            strokeOpacity="0.3"
            strokeDasharray="1,1"
          />
          <path
            d="M10,30 C30,70 70,30 90,70"
            fill="none"
            stroke="#00cbdd"
            strokeWidth="0.2"
            strokeOpacity="0.3"
            strokeDasharray="1,1"
          />
          <path
            d="M50,10 C30,30 70,70 50,90"
            fill="none"
            stroke="#00cbdd"
            strokeWidth="0.2"
            strokeOpacity="0.3"
            strokeDasharray="1,1"
          />
        </svg>

        {/* Concentric circles from hiw-three.svg */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="absolute w-[80%] h-[80%] rounded-full border border-[#00cbdd]/20"></div>
          <div className="absolute w-[60%] h-[60%] rounded-full border border-[#00cbdd]/30"></div>
          <div className="absolute w-[40%] h-[40%] rounded-full border border-[#00cbdd]/40"></div>
        </div>

        {/* Glow effects */}
        <div className="absolute inset-0 bg-[#00cbdd]/5 rounded-full blur-[50px]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#00cbdd]/10 to-transparent blur-[20px]"></div>
      </div>

      {/* Simplified API Gateway dashboard */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Connection visualization */}
        <div className="relative w-full h-full">
          {/* Central API Gateway */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] aspect-square rounded-full bg-black/60 backdrop-blur-md border-2 border-[#00cbdd] flex items-center justify-center z-20 shadow-lg shadow-[#00cbdd]/20">
            <div className="text-[#00cbdd] font-bold text-[10px] text-center">
              <div className="text-white text-sm">API</div>
              Gateway
            </div>

            {/* Stats overlay */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[90%] bg-black/70 backdrop-blur-md border border-[#00cbdd]/40 rounded-md px-2 py-1 text-[8px] text-white font-mono flex items-center justify-between">
              <div>
                <span className="text-[#00cbdd]">Req:</span> {requestCount}
              </div>
              <div>
                <span className="text-[#00cbdd]">Resp:</span> {Math.round(responseTime)}ms
              </div>
            </div>

            {/* Ripple effect */}
            <div className="absolute w-full h-full rounded-full border-2 border-[#00cbdd]/80 animate-ripple"></div>
            <div className="absolute w-full h-full rounded-full border-2 border-[#00cbdd]/60 animate-ripple delay-500"></div>
            <div className="absolute w-full h-full rounded-full border-2 border-[#00cbdd]/40 animate-ripple delay-1000"></div>
          </div>

          {/* Model nodes */}
          {models.map((model, index) => {
            // Position models in a circle around the center
            const angle = (index * (360 / models.length) + 90) % 360; // Start from top
            const radian = (angle * Math.PI) / 180;
            const radius = 35; // % of container - reduced for better fit

            const left = 50 + radius * Math.cos(radian);
            const top = 50 + radius * Math.sin(radian);

            const isActive = activeConnections.includes(index);

            return (
              <div
                key={model.name}
                className={`absolute w-[22%] aspect-square rounded-full bg-black/40 backdrop-blur-md border-2 ${isActive ? 'border-[#00cbdd]' : 'border-[#00cbdd]/30'} flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 hover:border-[#00cbdd] hover:shadow-lg hover:shadow-[#00cbdd]/20`}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
              >
                <Image
                  src={model.src}
                  alt={model.name}
                  width={32}
                  height={32}
                  className="w-[60%] h-[60%] object-contain"
                />

                {/* Connection line */}
                <svg
                  className="absolute left-1/2 top-1/2 w-full h-full"
                  style={{
                    width: `${radius * 2}%`,
                    height: `${radius * 2}%`,
                    transform: `rotate(${angle + 180}deg)`,
                    transformOrigin: '0 0',
                    zIndex: -1,
                  }}
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="0"
                    stroke={isActive ? '#00cbdd' : '#00cbdd40'}
                    strokeWidth="2"
                    strokeDasharray={isActive ? '0' : '5,5'}
                    className="transition-all duration-300"
                  />

                  {isActive && (
                    <>
                      {/* Animated data packet */}
                      <circle
                        cx="25%"
                        cy="0"
                        r="2"
                        fill="#00cbdd"
                        className="animate-packet"
                        style={{ '--packet-x': '100%', '--packet-y': '0' } as React.CSSProperties}
                      />
                      <circle
                        cx="50%"
                        cy="0"
                        r="2"
                        fill="#00cbdd"
                        className="animate-packet delay-300"
                        style={{ '--packet-x': '100%', '--packet-y': '0' } as React.CSSProperties}
                      />
                      <circle
                        cx="75%"
                        cy="0"
                        r="2"
                        fill="#00cbdd"
                        className="animate-packet delay-600"
                        style={{ '--packet-x': '100%', '--packet-y': '0' } as React.CSSProperties}
                      />
                    </>
                  )}
                </svg>
              </div>
            );
          })}

          {/* Client indicators at the bottom */}
          <div className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 flex space-x-2">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-black/50 backdrop-blur-md border border-[#00cbdd]/40 rounded-md px-2 py-1 text-[8px] text-white font-mono transition-all duration-300 hover:border-[#00cbdd] hover:shadow-lg hover:shadow-[#00cbdd]/20 flex items-center"
              >
                <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
                  client.type === 'frontend' ? 'bg-blue-500' :
                  client.type === 'mobile' ? 'bg-purple-500' :
                  'bg-yellow-500'
                } animate-pulse`}></div>
                {client.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIGatewayDashboard;
