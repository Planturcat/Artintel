"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { APP_NAME } from "@/constants";
import { motion } from "framer-motion";

const FloatingIPhone = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // AI-generated text examples
  const aiTexts = [
    "Analyzing data patterns...",
    "Generating creative content...",
    "Optimizing language models...",
    "Processing natural language...",
    `Welcome to ${APP_NAME}!`
  ];

  // Handle mouse movement for subtle interaction
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 25;
    const y = (clientY - top - height / 2) / 25;
    setMousePosition({ x, y });
  };

  // Typing animation effect
  useEffect(() => {
    if (!isTyping) return;

    const text = aiTexts[currentTextIndex];
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setTypedText(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setIsTyping(false);
          setTimeout(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % aiTexts.length);
            setTypedText("");
            setIsTyping(true);
          }, 1000);
        }, 1500);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentTextIndex, isTyping, aiTexts]);

  return (
    <div 
      className="iphone-container relative h-[400px] w-full flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="iphone"
        animate={{
          rotateY: isHovered ? mousePosition.x : [0, 5, 0, -5, 0],
          rotateX: isHovered ? -mousePosition.y : [0, 2, 0, -2, 0],
        }}
        transition={{
          duration: isHovered ? 0.1 : 8,
          repeat: isHovered ? 0 : Infinity,
          ease: "linear"
        }}
      >
        {/* iPhone body */}
        <div className="iphone-body">
          {/* Front camera and speaker */}
          <div className="notch">
            <div className="camera"></div>
            <div className="speaker"></div>
          </div>
          
          {/* Screen content */}
          <div className="screen">
            {/* App header */}
            <div className="app-header">
              <Image
                src="/icons/artintel-logo.png"
                alt="Artintel Logo"
                width={20}
                height={20}
                className="app-logo"
              />
              <span className="app-name">{APP_NAME}</span>
            </div>
            
            {/* App content */}
            <div className="app-content">
              <div className="ai-chat">
                <div className="ai-message">
                  <div className="ai-avatar">
                    <Image
                      src="/icons/artintel-logo.png"
                      alt="AI"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="message-bubble">
                    <p className="typing-text">{typedText}<span className="cursor">|</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Home button/indicator */}
          <div className="home-indicator"></div>
          
          {/* Side buttons */}
          <div className="volume-button volume-up"></div>
          <div className="volume-button volume-down"></div>
          <div className="power-button"></div>
        </div>
        
        {/* Reflection and shadow */}
        <div className="iphone-shadow"></div>
        
        {/* Particle effects */}
        <div className="particles">
          {Array.from({ length: 8 }).map((_, index) => (
            <div 
              key={index} 
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        .iphone-container {
          perspective: 1000px;
        }
        
        .iphone {
          position: relative;
          width: 220px;
          height: 440px;
          transform-style: preserve-3d;
          will-change: transform;
        }
        
        .iphone-body {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 36px;
          background: #1a1a1a;
          border: 1px solid #333;
          overflow: hidden;
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.05) inset,
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 20px rgba(0, 203, 221, 0.2);
          transform-style: preserve-3d;
        }
        
        .notch {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 24px;
          background: #000;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }
        
        .camera {
          width: 8px;
          height: 8px;
          background: #222;
          border-radius: 50%;
          margin-right: 8px;
          position: relative;
        }
        
        .camera::after {
          content: '';
          position: absolute;
          width: 3px;
          height: 3px;
          background: #00CBDD;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .speaker {
          width: 40px;
          height: 4px;
          background: #222;
          border-radius: 4px;
        }
        
        .screen {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
          border-radius: 36px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .app-header {
          height: 60px;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          padding: 0 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .app-logo {
          margin-right: 8px;
        }
        
        .app-name {
          color: #00CBDD;
          font-weight: bold;
          font-size: 14px;
        }
        
        .app-content {
          flex: 1;
          padding: 20px;
          background: linear-gradient(to bottom, #111, #000);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        
        .ai-chat {
          display: flex;
          flex-direction: column;
        }
        
        .ai-message {
          display: flex;
          margin-bottom: 16px;
          align-items: flex-start;
        }
        
        .ai-avatar {
          width: 32px;
          height: 32px;
          border-radius: 16px;
          background: rgba(0, 203, 221, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
        }
        
        .message-bubble {
          background: rgba(0, 203, 221, 0.1);
          border-radius: 18px;
          padding: 10px 14px;
          max-width: 80%;
        }
        
        .typing-text {
          color: #fff;
          font-size: 12px;
          margin: 0;
        }
        
        .cursor {
          animation: blink 1s infinite;
        }
        
        .home-indicator {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 4px;
        }
        
        .volume-button {
          position: absolute;
          left: -2px;
          width: 2px;
          height: 20px;
          background: #333;
          border-radius: 2px;
        }
        
        .volume-up {
          top: 100px;
        }
        
        .volume-down {
          top: 130px;
        }
        
        .power-button {
          position: absolute;
          right: -2px;
          top: 100px;
          width: 2px;
          height: 30px;
          background: #333;
          border-radius: 2px;
        }
        
        .iphone-shadow {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          width: 180px;
          height: 20px;
          background: rgba(0, 0, 0, 0.2);
          filter: blur(15px);
          border-radius: 50%;
          z-index: -1;
          animation: shadow-pulse 4s infinite ease-in-out;
        }
        
        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(0, 203, 221, 0.6);
          border-radius: 50%;
          filter: blur(1px);
          animation: float-particle 5s infinite linear;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes shadow-pulse {
          0%, 100% { opacity: 0.2; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.3; transform: translateX(-50%) scale(1.1); }
        }
        
        @keyframes float-particle {
          0% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(20px, -30px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default FloatingIPhone;
