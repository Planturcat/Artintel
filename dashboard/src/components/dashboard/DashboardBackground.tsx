"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export default function DashboardBackground() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true on component mount
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Generate random particles for the background
  const particles = useMemo(() => {
    // Only generate particles on the client side to avoid hydration mismatch
    if (!isClient) return [];
    
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 5,
    }));
  }, [isClient]);

  const gradientStart = isDark ? '#00021a' : '#f9fafb';
  const gradientEnd = isDark ? '#000c26' : '#f3f4f6';

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
      {/* Main gradient background */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
        }}
      />
      
      {/* Grid pattern overlay */}
      {isDark && (
        <div 
          className="absolute inset-0 w-full h-full opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 203, 221, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 203, 221, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      )}
      
      {/* Glow effect in top left and bottom right */}
      {isDark && (
        <>
          <div 
            className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(0, 203, 221, 0.7) 0%, rgba(0, 203, 221, 0) 70%)',
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(73, 132, 255, 0.7) 0%, rgba(73, 132, 255, 0) 70%)',
            }}
          />
        </>
      )}
      
      {/* Floating particles - only render on client side */}
      {isDark && isClient && particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#00cbdd]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: 0.1,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
      
      {/* Star-like elements - only render on client side */}
      {isDark && isClient && Array.from({ length: 15 }, (_, i) => {
        // Generate all random values here instead of inline
        const width = 1 + Math.random() * 2;
        const height = 1 + Math.random() * 2;
        const left = `${Math.random() * 100}%`;
        const top = `${Math.random() * 100}%`;
        const duration = 3 + Math.random() * 3;
        const delay = Math.random() * 2;
        
        return (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width,
              height,
              left,
              top,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        );
      })}
    </div>
  );
} 