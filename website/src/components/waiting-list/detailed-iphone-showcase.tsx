"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface DetailedIPhoneShowcaseProps {
  features: Feature[];
  featureChangeInterval?: number; // milliseconds between feature changes
}

const DetailedIPhoneShowcase: React.FC<DetailedIPhoneShowcaseProps> = ({
  features,
  featureChangeInterval = 3000,
}) => {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Change feature periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentFeatureIndex((prevIndex) => (prevIndex + 1) % features.length);
      setTypedText("");
      setIsTyping(true);
    }, featureChangeInterval);

    return () => clearInterval(intervalId);
  }, [features, featureChangeInterval]);

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (!isTyping) return;

    const currentFeature = features[currentFeatureIndex];
    const text = currentFeature.description;
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setTypedText(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentFeatureIndex, isTyping, features]);

  return (
    <div 
      ref={containerRef}
      className="iphone-container relative w-full h-[600px] flex items-center justify-center"
    >
      <div className="iphone">
        <div className="inner">
          {/* iPhone body */}
          <div className="iphone-body">
            {/* Screen */}
            <div className="screen">
              <div className="face-one">
                {/* Dynamic Island */}
                <div className="dynamic-island">
                  <div className="camera"></div>
                  <div className="sensor"></div>
                </div>
                
                <div className="display">
                  <div className="shade"></div>
                  <div className="content">
                    {/* Boot animation */}
                    {!isLoaded && (
                      <div className="boot-animation">
                        <Image 
                          src="/icons/artintel-logo.png" 
                          alt="Artintel Logo" 
                          width={60} 
                          height={60} 
                          className="logo"
                        />
                      </div>
                    )}
                    
                    {/* App interface */}
                    {isLoaded && (
                      <div className="app-interface">
                        {/* App header */}
                        <div className="app-header">
                          <Image 
                            src="/icons/artintel-logo.png" 
                            alt="Artintel Logo" 
                            width={24} 
                            height={24} 
                          />
                          <span className="app-title">Artintel AI</span>
                        </div>
                        
                        {/* Feature content */}
                        <div className="feature-content">
                          {features.map((feature, index) => (
                            <div 
                              key={index} 
                              className={`feature-card ${currentFeatureIndex === index ? 'active' : ''}`}
                            >
                              <h3 className="feature-title">{feature.title}</h3>
                              <p className="feature-description">
                                {index === currentFeatureIndex ? (
                                  <>
                                    {typedText}
                                    {isTyping && <span className="cursor">|</span>}
                                  </>
                                ) : feature.description}
                              </p>
                            </div>
                          ))}
                          
                          {/* AI processing visualization */}
                          <div className="processing-bar">
                            <div className="progress-track">
                              <div className="progress-fill"></div>
                            </div>
                            <div className="progress-labels">
                              <span>AI Processing</span>
                              <span>Optimizing</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Camera module */}
            <div className="camera-module">
              <div className="camera-lens main"></div>
              <div className="camera-lens wide"></div>
              <div className="camera-lens tele"></div>
              <div className="flash"></div>
            </div>
            
            {/* Side buttons */}
            <div className="side-button left-1"></div>
            <div className="side-button left-2"></div>
            <div className="side-button right"></div>
            
            {/* Bottom port */}
            <div className="bottom-port"></div>
          </div>
        </div>
        <div className="shadow"></div>
      </div>

      <style jsx>{`
        .iphone-container {
          perspective: 1000px;
        }
        
        .iphone {
          width: 250px;
          height: 500px;
          position: relative;
          transform-style: preserve-3d;
          animation: float 6s ease-in-out infinite;
        }
        
        .inner {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: rotate 15s ease-in-out infinite;
        }
        
        .iphone-body {
          width: 250px;
          height: 500px;
          position: absolute;
          border-radius: 40px;
          background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border: 1px solid #3a3a3a;
        }
        
        .screen {
          position: absolute;
          width: 240px;
          height: 490px;
          top: 5px;
          left: 5px;
          border-radius: 35px;
          overflow: hidden;
          background: #000;
        }
        
        .face-one {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .dynamic-island {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 35px;
          background: #000;
          border-radius: 20px;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
        }
        
        .camera {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #222;
          position: relative;
        }
        
        .camera::after {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #00cbdd;
          top: 3px;
          left: 3px;
        }
        
        .sensor {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #222;
        }
        
        .display {
          position: absolute;
          width: 100%;
          height: 100%;
          background: #000;
        }
        
        .shade {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
          animation: screen-shade 8s infinite;
        }
        
        .content {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 50px 15px 15px;
          color: white;
          z-index: 5;
        }
        
        .boot-animation {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          animation: pulse 2s infinite;
        }
        
        .logo {
          opacity: 0.8;
        }
        
        .app-interface {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .app-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .app-title {
          margin-left: 10px;
          font-weight: bold;
          font-size: 18px;
        }
        
        .feature-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .feature-card {
          background: rgba(26, 26, 26, 0.5);
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 15px;
          border: 1px solid rgba(51, 51, 51, 0.5);
          backdrop-filter: blur(4px);
          display: none;
        }
        
        .feature-card.active {
          display: block;
        }
        
        .feature-title {
          color: #00cbdd;
          font-weight: bold;
          margin-bottom: 8px;
          font-size: 16px;
        }
        
        .feature-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          line-height: 1.4;
        }
        
        .cursor {
          animation: blink 1s infinite;
        }
        
        .processing-bar {
          margin-top: auto;
        }
        
        .progress-track {
          height: 4px;
          width: 100%;
          background: #333;
          border-radius: 2px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(to right, #00cbdd, #0088ff);
          animation: progress 3s infinite;
        }
        
        .progress-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.5);
        }
        
        .camera-module {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 40px;
          height: 40px;
          background: #1a1a1a;
          border-radius: 12px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          padding: 4px;
          gap: 2px;
        }
        
        .camera-lens {
          background: #111;
          border-radius: 50%;
          border: 1px solid #444;
          position: relative;
        }
        
        .camera-lens::after {
          content: '';
          position: absolute;
          width: 50%;
          height: 50%;
          border-radius: 50%;
          background: #222;
          border: 1px solid #555;
          top: 25%;
          left: 25%;
        }
        
        .flash {
          background: #222;
          border-radius: 50%;
        }
        
        .side-button {
          position: absolute;
          background: #2a2a2a;
        }
        
        .side-button.left-1 {
          left: -2px;
          top: 120px;
          width: 3px;
          height: 30px;
          border-radius: 2px 0 0 2px;
        }
        
        .side-button.left-2 {
          left: -2px;
          top: 160px;
          width: 3px;
          height: 60px;
          border-radius: 2px 0 0 2px;
        }
        
        .side-button.right {
          right: -2px;
          top: 120px;
          width: 3px;
          height: 40px;
          border-radius: 0 2px 2px 0;
        }
        
        .bottom-port {
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 6px;
          background: #2a2a2a;
          border-radius: 3px;
        }
        
        .shadow {
          position: absolute;
          width: 200px;
          height: 20px;
          bottom: -30px;
          left: 25px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%);
          animation: shadow 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes rotate {
          0%, 100% { transform: rotateY(0deg) rotateX(0deg); }
          25% { transform: rotateY(10deg) rotateX(5deg); }
          50% { transform: rotateY(0deg) rotateX(0deg); }
          75% { transform: rotateY(-10deg) rotateX(-5deg); }
        }
        
        @keyframes screen-shade {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }
        
        @keyframes shadow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(0.8); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};

export default DetailedIPhoneShowcase;
