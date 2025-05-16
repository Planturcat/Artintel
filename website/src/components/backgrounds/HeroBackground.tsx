"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { APP_NAME } from "@/constants";
import { Sparkles } from "../ui/sparkles";

export default function HeroBackground({
  className,
}: {
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure component is mounted before animation starts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Path animation variants
  const pathVariants = {
    hidden: (custom: { isLeft: boolean }) => ({
      pathLength: 0,
      opacity: 0,
      pathOffset: custom.isLeft ? 1 : 0,
    }),
    visible: (custom: { isLeft: boolean; delay: number }) => ({
      pathLength: 1,
      opacity: 1,
      pathOffset: 0,
      transition: {
        pathLength: {
          duration: 1.2,
          delay: custom.delay * 0.03,
          ease: "easeOut",
        },
        pathOffset: {
          duration: 1.2,
          delay: custom.delay * 0.03,
          ease: "easeOut",
        },
        opacity: {
          duration: 0.2,
          delay: custom.delay * 0.03,
        },
      },
    }),
  };

  // Node animation variants
  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
      scale: [0, 1.2, 0.9, 1],
      opacity: [0, 0.8, 0.7, 1],
      transition: {
        scale: {
          duration: 1.2,
          delay: custom * 0.03,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 2,
          ease: "easeOut",
        },
        opacity: {
          duration: 1.2,
          delay: custom * 0.03,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 2,
          ease: "easeOut",
        },
      },
    }),
  };

  // Glow animation for central elements
  const glowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.08, 1],
      transition: {
        opacity: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
        scale: {
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },
  };

  // State for logo hover
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  // Logo animation variants
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: 0.8, delay: 0.5 },
        scale: {
          duration: 1.2,
          delay: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 10
        }
      }
    },
    hover: {
      scale: 1.3,
      filter: "drop-shadow(0 0 25px rgba(0, 203, 221, 1))",
      transition: {
        scale: {
          duration: 0.3,
          type: "spring",
          stiffness: 300,
          damping: 10
        },
        filter: {
          duration: 0.2
        }
      }
    }
  };

  // Text pattern animation
  const textPatternVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.05,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  // Load-in effect for the entire background
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            "hero-background absolute inset-0 z-0 overflow-hidden w-full h-full",
            className
          )}
          style={{ pointerEvents: "none" }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Enhanced radial gradient effect with mask from example */}
          <motion.div
            className="relative overflow-hidden w-full h-full [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#00cddd,transparent_80%)] before:opacity-60 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-[#00cddd66] after:bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            {/* Grid pattern background */}
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]"></div>

            {/* Sparkles integration with radial mask */}
            <Sparkles
              density={400}
              speed={0.7}
              size={1}
              color="#00cddd"
              className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
            />
          </motion.div>

          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1440 1200"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full"
            style={{ minWidth: "100%", minHeight: "100%", maxHeight: "100vh" }}
          >


            {/* Dot pattern background */}
            <pattern
              id="dot-pattern"
              patternUnits="userSpaceOnUse"
              width="20"
              height="20"
            >
              <circle cx="10" cy="10" r="1" fill="#00cddd10" />
            </pattern>
            <rect
              width="100%"
              height="100%"
              fill="url(#dot-pattern)"
              opacity="0.5"
            />



            {/* Enhanced filters and gradients */}
            <defs>
              <filter
                id="subtle-glow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0.8 0 0 0 0 0.9 0 0 0 0.8 0"
                />
              </filter>

              <filter
                id="node-glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0.9 0 0 0 0 1 0 0 0 0.9 0"
                />
              </filter>

              <filter
                id="logo-glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0.9 0 0 0 0 1 0 0 0 0.7 0"
                />
              </filter>

              <filter
                id="text-glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0.9 0 0 0 0 1 0 0 0 1 0"
                />
                <feComposite in="SourceGraphic" operator="over" />
              </filter>

              <filter
                id="text-blur"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0.9 0 0 0 0 1 0 0 0 0.8 0"
                />
              </filter>

              <linearGradient
                id="path-gradient-1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#00cddd" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#00cddd" />
              </linearGradient>

              <linearGradient
                id="path-gradient-2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#0891b2" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>

              <linearGradient
                id="path-gradient-3"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#0891b2" />
                <stop offset="50%" stopColor="#0e7490" />
                <stop offset="100%" stopColor="#0891b2" />
              </linearGradient>

              <linearGradient
                id="logo-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00CBDD" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>

              <radialGradient
                id="central-glow"
                cx="50%"
                cy="50%"
                r="50%"
                fx="50%"
                fy="50%"
              >
                <stop offset="0%" stopColor="#00CBDD" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Central radial glow */}
            <motion.circle
              cx="720"
              cy="400"
              r="150"
              fill="url(#central-glow)"
              variants={glowVariants}
              initial="hidden"
              animate="visible"
            />

            {/* Subtle background glow layer */}
            <g className="glow-layer" filter="url(#subtle-glow)" opacity="0.3">
              <path
                d="M0 300 L240 300 L340 300 L380 260 L480 260 L520 300 L620 300 L660 260 L690 260 L720 220 L750 260 L780 260 L820 300 L920 300 L960 260 L1060 260 L1100 300 L1200 300 L1440 300"
                stroke="#00cddd"
                strokeWidth="1.5"
                fill="none"
              />

              <path
                d="M0 380 L240 380 L320 380 L360 340 L460 340 L500 380 L580 380 L620 340 L680 340 L720 300 L760 340 L820 340 L860 380 L940 380 L980 340 L1080 340 L1120 380 L1200 380 L1440 380"
                stroke="#06b6d4"
                strokeWidth="1.5"
                fill="none"
              />

              <path
                d="M0 460 L240 460 L320 460 L360 500 L440 500 L480 460 L560 460 L600 500 L660 500 L700 460 L720 420 L740 460 L780 500 L840 500 L880 460 L960 460 L1000 500 L1080 500 L1120 460 L1200 460 L1440 460"
                stroke="#0891b2"
                strokeWidth="1.5"
                fill="none"
              />

              <path
                d="M0 540 L240 540 L320 540 L360 580 L440 580 L480 540 L560 540 L600 580 L660 580 L700 540 L720 500"
                stroke="#0e7490"
                strokeWidth="1.5"
                fill="none"
              />

              <path
                d="M0 620 L240 620 L320 620 L360 580 L440 580 L480 620 L560 620 L600 580 L660 580 L700 620 L720 620 L740 620 L780 580 L840 580 L880 620 L960 620 L1000 580 L1080 580 L1120 620 L1200 620 L1440 620"
                stroke="#00cddd"
                strokeWidth="1.5"
                fill="none"
              />
            </g>

            {/* Main horizontal paths */}
            <g className="primary-paths">
              {/* Row 1 - split at center for perfect symmetry */}
              <motion.path
                d="M0 300 L240 300 L340 300 L380 260 L480 260 L520 300 L620 300 L660 260 L690 260 L720 220"
                stroke="url(#path-gradient-1)"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: true, delay: 0 }}
                initial="hidden"
                animate="visible"
              />

              <motion.path
                d="M720 220 L750 260 L780 260 L820 300 L920 300 L960 260 L1060 260 L1100 300 L1200 300 L1440 300"
                stroke="url(#path-gradient-1)"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: false, delay: 0 }}
                initial="hidden"
                animate="visible"
              />

              {/* Row 2 */}
              <motion.path
                d="M0 380 L240 380 L320 380 L360 340 L460 340 L500 380 L580 380 L620 340 L680 340 L720 300"
                stroke="url(#path-gradient-2)"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: true, delay: 1 }}
                initial="hidden"
                animate="visible"
              />

              <motion.path
                d="M720 300 L760 340 L820 340 L860 380 L940 380 L980 340 L1080 340 L1120 380 L1200 380 L1440 380"
                stroke="url(#path-gradient-2)"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: false, delay: 1 }}
                initial="hidden"
                animate="visible"
              />

              {/* Row 3 */}
              <motion.path
                d="M0 460 L240 460 L320 460 L360 500 L440 500 L480 460 L560 460 L600 500 L660 500 L700 460 L720 420"
                stroke="url(#path-gradient-3)"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: true, delay: 2 }}
                initial="hidden"
                animate="visible"
              />

              <motion.path
                d="M720 420 L740 460 L780 500 L840 500 L880 460 L960 460 L1000 500 L1080 500 L1120 460 L1200 460 L1440 460"
                stroke="url(#path-gradient-3)"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: false, delay: 2 }}
                initial="hidden"
                animate="visible"
              />
            </g>

            {/* Connection nodes */}
            <g className="connection-nodes">
              {/* Left side nodes */}
              <motion.circle
                cx="340"
                cy="300"
                r="3"
                fill="#00cddd"
                variants={nodeVariants}
                custom={0.5}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
              />

              <motion.circle
                cx="480"
                cy="260"
                r="3"
                fill="#00cddd"
                variants={nodeVariants}
                custom={0.8}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
              />

              <motion.circle
                cx="620"
                cy="300"
                r="3"
                fill="#00cddd"
                variants={nodeVariants}
                custom={1.1}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
              />

              {/* Right side nodes */}
              <motion.circle
                cx="1100"
                cy="300"
                r="3"
                fill="#00cddd"
                variants={nodeVariants}
                custom={0.5}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
              />

              <motion.circle
                cx="960"
                cy="260"
                r="3"
                fill="#00cddd"
                variants={nodeVariants}
                custom={0.8}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
              />

              <motion.circle
                cx="820"
                cy="300"
                r="3"
                fill="#00cddd"
                variants={nodeVariants}
                custom={1.1}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
              />

              {/* Central nodes */}
              <motion.circle
                cx="720"
                cy="220"
                r="3.5"
                fill="#00cddd"
                variants={nodeVariants}
                custom={3.2}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
              />

              <motion.circle
                cx="720"
                cy="300"
                r="3.5"
                fill="#06b6d4"
                variants={nodeVariants}
                custom={3.5}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
              />

              <motion.circle
                cx="720"
                cy="420"
                r="3.5"
                fill="#0891b2"
                variants={nodeVariants}
                custom={3.8}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
              />
            </g>

            {/* Animated particles */}
            <g className="animated-particles">
              <circle r="2" fill="#00cddd" filter="url(#node-glow)">
                <animateMotion
                  dur="12s"
                  repeatCount="indefinite"
                  path="M0 300 L240 300 L340 300 L380 260 L480 260 L520 300 L620 300 L660 260 L690 260 L720 220 L750 260 L780 260 L820 300 L920 300 L960 260 L1060 260 L1100 300 L1200 300 L1440 300"
                />
              </circle>

              <circle r="2" fill="#06b6d4" filter="url(#node-glow)">
                <animateMotion
                  dur="10s"
                  repeatCount="indefinite"
                  path="M0 380 L240 380 L320 380 L360 340 L460 340 L500 380 L580 380 L620 340 L680 340 L720 300 L760 340 L820 340 L860 380 L940 380 L980 340 L1080 340 L1120 380 L1200 380 L1440 380"
                />
              </circle>

              <circle r="2" fill="#0891b2" filter="url(#node-glow)">
                <animateMotion
                  dur="14s"
                  repeatCount="indefinite"
                  path="M0 460 L240 460 L320 460 L360 500 L440 500 L480 460 L560 460 L600 500 L660 500 L700 460 L720 420 L740 460 L780 500 L840 500 L880 460 L960 460 L1000 500 L1080 500 L1120 460 L1200 460 L1440 460"
                />
              </circle>
            </g>

            {/* Pulse effects */}
            <g className="pulse-effects">
              <circle
                cx="720"
                cy="400"
                r="12"
                fill="none"
                stroke="#00cddd"
                strokeWidth="0.8"
              >
                <animate
                  attributeName="r"
                  values="12;24;12"
                  dur="6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0.2;0.6"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle
                cx="720"
                cy="400"
                r="20"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="0.6"
              >
                <animate
                  attributeName="r"
                  values="20;36;20"
                  dur="8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.4;0.1;0.4"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* ARTINTEL text in the background - full width with hover effect */}
            <motion.g
              style={{ pointerEvents: "auto" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLogoHovered ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.text
                x="50%"
                y="350"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-bold"
                fontSize="180"
                fill="none"
                stroke="url(#logo-gradient)"
                strokeWidth="1"
                filter="url(#text-blur)"
              >
                {APP_NAME}
              </motion.text>

              {/* Duplicate text for glow effect */}
              <motion.text
                x="50%"
                y="350"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-bold"
                fontSize="180"
                fill="none"
                stroke="url(#logo-gradient)"
                strokeWidth="3"
                filter="url(#text-glow)"
                opacity="0.7"
              >
                {APP_NAME}
              </motion.text>
            </motion.g>

            {/* Logo in the center of the orb */}
            <foreignObject
              x="50%"
              y="325"
              width="150"
              height="150"
              style={{
                overflow: "visible",
                pointerEvents: "auto",
                cursor: "pointer",
                zIndex: 50,
                transform: "translateX(-50%)"
              }}
            >
              <motion.div
                className="w-full h-full flex items-center justify-center cursor-pointer"
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                style={{ filter: "drop-shadow(0 0 10px rgba(0, 203, 221, 0.8))", touchAction: "none" }}
                onMouseEnter={() => setIsLogoHovered(true)}
                onMouseLeave={() => setIsLogoHovered(false)}
                onHoverStart={() => setIsLogoHovered(true)}
                onHoverEnd={() => setIsLogoHovered(false)}
              >
                <Image
                  src="/logo/Icon - PNG (1).png"
                  alt="Artintel Logo"
                  width={15}
                  height={15}
                  className="object-contain transition-all duration-300"
                  style={{ pointerEvents: "auto" }}
                />
              </motion.div>
            </foreignObject>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
