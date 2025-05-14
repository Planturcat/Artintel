"use client"
import React, { useEffect, useState, useRef, useId } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ClientOnly from '@/components/client-only';

interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface EnhancedIPhoneShowcaseProps {
  features: Feature[];
  rotationSpeed?: number; // seconds per full rotation
  featureChangeInterval?: number; // milliseconds between feature changes
}

// Generate deterministic "random" values based on index
const getParticleSize = (index: number): number => {
  // Use a simple algorithm to generate values between 2-6
  return 2 + (index % 5);
};

const getParticlePosition = (index: number, max: number): number => {
  // Generate a value between -max/2 and max/2
  return ((index * 17) % max) - max / 2;
};

const getParticleDelay = (index: number): number => {
  // Generate a delay between 0-5 seconds
  return (index % 6);
};

const getParticleDuration = (index: number): number => {
  // Generate a duration between 5-10 seconds
  return 5 + (index % 6);
};

const EnhancedIPhoneShowcase: React.FC<EnhancedIPhoneShowcaseProps> = ({
  features,
  rotationSpeed = 10,
  featureChangeInterval = 3000,
}) => {
  const componentId = useId(); // Stable ID for keys
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();

    // Calculate normalized mouse position (-1 to 1)
    const x = ((clientX - left) / width - 0.5) * 2;
    const y = ((clientY - top) / height - 0.5) * 2;

    setMousePosition({ x, y });
  };

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
      className="enhanced-iphone-container relative w-full h-[600px] flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow effect */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-primary/20 blur-[100px] opacity-70 animate-pulse-slow"></div>

      {/* Floating particles - Only rendered on client side */}
      <ClientOnly>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`${componentId}-particle-${i}`}
            className="absolute rounded-full bg-primary/60"
            style={{
              width: getParticleSize(i),
              height: getParticleSize(i),
            }}
            initial={{
              x: getParticlePosition(i, 400),
              y: getParticlePosition(i + 10, 400),
              opacity: 0,
            }}
            animate={{
              x: getParticlePosition(i + 20, 400),
              y: getParticlePosition(i + 30, 400),
              opacity: [0, 0.8, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: getParticleDuration(i),
              repeat: Infinity,
              delay: getParticleDelay(i),
            }}
          />
        ))}
      </ClientOnly>

      {/* iPhone container with 3D effect */}
      <motion.div
        className="iphone-3d-container relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isClient ? {
          opacity: 1,
          scale: 1,
          rotateY: isHovered ? mousePosition.x * 15 : [0, 5, 0, -5, 0],
          rotateX: isHovered ? mousePosition.y * -15 : [0, 2, 0, -2, 0],
        } : {
          opacity: 1,
          scale: 1,
          // Static values for server rendering
          rotateY: 0,
          rotateX: 0,
        }}
        transition={{
          duration: isHovered ? 0.2 : rotationSpeed,
          repeat: isHovered ? 0 : Infinity,
          ease: isHovered ? "easeOutQuint" : "easeInOut",
        }}
      >
        {/* iPhone body */}
        <div className="iphone-body relative w-[250px] h-[500px] rounded-[40px] bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] overflow-hidden shadow-xl">
          {/* Titanium-like edge */}
          <div className="absolute inset-0 rounded-[40px] border border-[#3a3a3a] opacity-50"></div>

          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full z-10 flex items-center justify-center">
            {/* Front camera */}
            <div className="absolute left-6 w-[10px] h-[10px] rounded-full bg-[#222] flex items-center justify-center">
              <div className="w-[4px] h-[4px] rounded-full bg-primary/80"></div>
            </div>

            {/* Face ID sensors */}
            <div className="absolute right-6 w-[8px] h-[8px] rounded-full bg-[#222]"></div>
          </div>

          {/* Camera module */}
          <div className="absolute top-3 right-3 w-[40px] h-[40px] rounded-xl bg-[#1a1a1a] flex items-center justify-center p-1">
            {/* Main camera */}
            <div className="w-[14px] h-[14px] rounded-full bg-[#111] m-1 border border-[#444] flex items-center justify-center">
              <div className="w-[6px] h-[6px] rounded-full bg-[#222] border border-[#555]"></div>
            </div>
            {/* Ultra wide camera */}
            <div className="w-[14px] h-[14px] rounded-full bg-[#111] m-1 border border-[#444] flex items-center justify-center">
              <div className="w-[6px] h-[6px] rounded-full bg-[#222] border border-[#555]"></div>
            </div>
          </div>

          {/* Screen */}
          <div className="absolute inset-0 rounded-[40px] overflow-hidden">
            {/* Boot animation */}
            <motion.div
              className="absolute inset-0 bg-black flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: isLoaded ? 0 : 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Image
                  src="/icons/artintel-logo.png"
                  alt="Artintel Logo"
                  width={60}
                  height={60}
                  className="opacity-80"
                />
              </motion.div>
            </motion.div>

            {/* App interface */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-[#000] to-[#111] p-6 pt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {/* App header */}
              <div className="flex items-center mb-6">
                <Image
                  src="/icons/artintel-logo.png"
                  alt="Artintel Logo"
                  width={24}
                  height={24}
                />
                <span className="ml-2 text-white font-bold text-lg">Artintel AI</span>
              </div>

              {/* Feature content */}
              <div className="h-full">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#1a1a1a]/50 rounded-xl p-4 mb-4 border border-[#333]/50 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: currentFeatureIndex === index ? 1 : 0,
                      y: currentFeatureIndex === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-primary font-bold mb-2">{feature.title}</h3>
                    <p className="text-white/80 text-sm">
                      {index === currentFeatureIndex ? (
                        <>
                          {typedText}
                          {isTyping && <span className="animate-pulse">|</span>}
                        </>
                      ) : feature.description}
                    </p>
                  </motion.div>
                ))}

                {/* AI processing visualization */}
                <div className="mt-6">
                  <div className="h-1 w-full bg-[#333] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-blue-500"
                      animate={{ width: ["0%", "100%", "0%"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-white/50">AI Processing</span>
                    <span className="text-[10px] text-white/50">Optimizing</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Screen reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20 pointer-events-none"></div>
          </div>

          {/* Side buttons */}
          <div className="absolute left-[-2px] top-[120px] w-[3px] h-[30px] bg-[#2a2a2a] rounded-l-lg"></div>
          <div className="absolute left-[-2px] top-[160px] w-[3px] h-[30px] bg-[#2a2a2a] rounded-l-lg"></div>
          <div className="absolute right-[-2px] top-[120px] w-[3px] h-[40px] bg-[#2a2a2a] rounded-r-lg"></div>

          {/* Bottom port */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[60px] h-[6px] bg-[#2a2a2a] rounded-full"></div>
        </div>

        {/* Shadow */}
        <motion.div
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[200px] h-[20px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%)",
          }}
          animate={isClient ? {
            width: isHovered ? 180 : [200, 220, 200],
            opacity: isHovered ? 0.3 : [0.3, 0.2, 0.3],
          } : {
            // Static values for server rendering
            width: 200,
            opacity: 0.3,
          }}
          transition={{
            duration: isHovered ? 0.2 : 3,
            repeat: isHovered ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};

export default EnhancedIPhoneShowcase;
