"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/utils";
import { motion, useMotionValue, animate } from "framer-motion";

interface ArtintelWordBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  dotSize?: number;
  dotSpacing?: number;
}

// No drone particles needed

export const ArtintelWordBackground = ({
  children,
  className,
  color = "#00cbdd",
  dotSize = 2,
  dotSpacing = 8,
}: ArtintelWordBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  // Removed drone particles
  const [animationComplete, setAnimationComplete] = useState(false);
  const [marqueeActive, setMarqueeActive] = useState(false);

  // Create motion values for path animations
  const pathLength1 = useMotionValue(0);
  const pathLength2 = useMotionValue(0);

  // Helper function to animate a path with a promise
  const animatePath = (pathLength: any, targetValue: number, duration: number) => {
    return new Promise<void>((resolve) => {
      const animation = animate(pathLength, targetValue, {
        duration: duration,
        ease: "easeInOut",
      });

      animation.then(() => resolve());
    });
  };

  // Initialize animation immediately
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    // Set animation complete immediately
    setAnimationComplete(true);

    // Start marquee effect after a short delay
    setTimeout(() => {
      setMarqueeActive(true);
    }, 500);

    // Start path animations
    const animatePaths = async () => {
      await animatePath(pathLength1, 1, 2);
      await animatePath(pathLength2, 1, 2);

      // After all animations complete, set animation complete flag
      setTimeout(() => {
        setAnimationComplete(true);
        // Start marquee effect after a delay
        setTimeout(() => {
          setMarqueeActive(true);
        }, 1000);
      }, 3000);
    };

    animatePaths();
  }, [dimensions]);

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }

    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden bg-[#00031b]", // Default dark background
        className,
      )}
    >


      {/* ARTINTEL text behind background - with marquee effect when active */}
      <div className="absolute inset-0 z-[-2] flex items-center justify-center pointer-events-none overflow-hidden">
        {marqueeActive ? (
          <motion.div
            className="whitespace-nowrap"
            animate={{
              x: ["-5%", "5%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            <svg
              width={dimensions.width * 1.1 || 1100}
              height={dimensions.height || 500}
              viewBox={`0 0 ${dimensions.width * 1.1 || 1100} ${dimensions.height || 500}`}
              xmlns="http://www.w3.org/2000/svg"
              className="select-none"
            >
              <defs>
                <linearGradient
                  id="artintelGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={color} stopOpacity="0.8" />
                  <stop offset="50%" stopColor={color} stopOpacity="0.5" />
                  <stop offset="100%" stopColor={color} stopOpacity="0.8" />
                </linearGradient>

                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="20" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Text with glow effect */}
              <text
                x="50%"
                y="40%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-[helvetica] font-bold text-[25vw]"
                fill="url(#artintelGradient)"
                filter="url(#glow)"
                opacity="0.2"
              >
                ARTINTEL
              </text>

              {/* Text outline */}
              <text
                x="50%"
                y="40%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-[helvetica] font-bold text-[25vw]"
                fill="none"
                stroke={color}
                strokeWidth="0.8"
                opacity="0.15"
              >
                ARTINTEL
              </text>
            </svg>
          </motion.div>
        ) : (
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${dimensions.width || 1000} ${dimensions.height || 500}`}
            xmlns="http://www.w3.org/2000/svg"
            className="select-none"
          >
            <defs>
              <linearGradient
                id="artintelGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={color} stopOpacity="0.8" />
                <stop offset="50%" stopColor={color} stopOpacity="0.5" />
                <stop offset="100%" stopColor={color} stopOpacity="0.8" />
              </linearGradient>

              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="20" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Text with glow effect - initially hidden, revealed by drone animation */}
            <text
              x="50%"
              y="40%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-[helvetica] font-bold text-[25vw]"
              fill="url(#artintelGradient)"
              filter="url(#glow)"
              opacity={animationComplete ? "0.2" : "0"}
              style={{
                transition: "opacity 1s ease-in-out"
              }}
            >
              ARTINTEL
            </text>

            {/* Text outline - initially hidden, revealed by drone animation */}
            <text
              x="50%"
              y="40%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-[helvetica] font-bold text-[25vw]"
              fill="none"
              stroke={color}
              strokeWidth="0.8"
              opacity={animationComplete ? "0.15" : "0"}
              style={{
                transition: "opacity 1s ease-in-out"
              }}
            >
              ARTINTEL
            </text>
          </svg>
        )}
      </div>

     

      {/* Base layer with dot pattern */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, transparent 0, transparent ${dotSize}px, hsl(0 0 4%) ${dotSize}px)`,
            backgroundSize: `${dotSpacing}px ${dotSpacing}px`
          }}
        ></div>
      </div>

  

      {/* Content layer - pushed down slightly to appear under the ARTINTEL word */}
      <div className="relative z-20 pt-[15vh]">

        
      </div>
    </div>
  );
};

export default ArtintelWordBackground;
