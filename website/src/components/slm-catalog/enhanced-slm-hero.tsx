"use client";

import { useState, useEffect, useRef } from "react";
import { Cpu, Zap, Laptop, CircleDollarSign } from "lucide-react";
import { ModernButton } from "@/components/ui/modern-button";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import "../llm-catalog/llm-styles.css";

export default function EnhancedSLMHero() {
  const [isMounted, setIsMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    setIsMounted(true);

    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Circuit board visualization
  const renderCircuitBoard = () => {
    const nodes = [];
    const connections = [];
    const nodeCount = 16;
    const width = 280;
    const height = 240;
    const gridSize = 4;
    const nodeSpacing = width / gridSize;

    // Create nodes
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const x = col * nodeSpacing + nodeSpacing / 2;
        const y = row * nodeSpacing + nodeSpacing / 2;
        const size = Math.random() > 0.7 ? 8 : 6;
        const delay = Math.random() * 3;

        nodes.push(
          <motion.div
            key={`node-${row}-${col}`}
            className="absolute rounded-full bg-primary"
            style={{
              width: size,
              height: size,
              left: x,
              top: y,
              transformOrigin: "center",
            }}
            initial={{ opacity: 0.3 }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              boxShadow: [
                "0 0 0px rgba(0, 203, 221, 0)",
                "0 0 10px rgba(0, 203, 221, 0.5)",
                "0 0 0px rgba(0, 203, 221, 0)",
              ],
            }}
            transition={{
              duration: 4,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />,
        );

        // Create horizontal connections
        if (col < gridSize - 1) {
          const shouldAnimate = Math.random() > 0.5;
          connections.push(
            <motion.div
              key={`h-connection-${row}-${col}`}
              className="absolute bg-gradient-to-r from-primary/40 to-primary/60"
              style={{
                width: nodeSpacing,
                height: 1,
                left: x + size / 2,
                top: y + size / 2,
              }}
              initial={{ opacity: 0.2 }}
              animate={
                shouldAnimate
                  ? {
                      opacity: [0.2, 0.6, 0.2],
                    }
                  : { opacity: 0.2 }
              }
              transition={{
                duration: 2,
                delay: Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />,
          );

          // Add data pulse animation
          if (shouldAnimate) {
            connections.push(
              <motion.div
                key={`h-pulse-${row}-${col}`}
                className="absolute w-1.5 h-1.5 rounded-full bg-primary"
                style={{
                  left: x + size / 2,
                  top: y + size / 2,
                  zIndex: 2,
                }}
                animate={{
                  x: nodeSpacing,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />,
            );
          }
        }

        // Create vertical connections
        if (row < gridSize - 1) {
          const shouldAnimate = Math.random() > 0.5;
          connections.push(
            <motion.div
              key={`v-connection-${row}-${col}`}
              className="absolute bg-gradient-to-b from-primary/40 to-primary/60"
              style={{
                width: 1,
                height: nodeSpacing,
                left: x + size / 2,
                top: y + size / 2,
              }}
              initial={{ opacity: 0.2 }}
              animate={
                shouldAnimate
                  ? {
                      opacity: [0.2, 0.6, 0.2],
                    }
                  : { opacity: 0.2 }
              }
              transition={{
                duration: 2,
                delay: Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />,
          );

          // Add data pulse animation
          if (shouldAnimate) {
            connections.push(
              <motion.div
                key={`v-pulse-${row}-${col}`}
                className="absolute w-1.5 h-1.5 rounded-full bg-primary"
                style={{
                  left: x + size / 2,
                  top: y + size / 2,
                  zIndex: 2,
                }}
                animate={{
                  y: nodeSpacing,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />,
            );
          }
        }
      }
    }

    return (
      <div
        className="relative w-[280px] h-[240px] mx-auto transform-3d"
      >
        {/* Circuit board container */}
        <motion.div
          className="absolute inset-0 rounded-lg border border-primary/60 bg-background/50 backdrop-blur-sm overflow-hidden shadow-[0_0_15px_rgba(0,203,221,0.3)] slm-chip"
          initial={{ rotateX: 20, rotateY: 0 }}
          animate={{
            rotateX: [20, 10, 20],
            rotateY: [0, 10, 0],
            z: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          {/* SLM label */}
          <motion.div
            className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono text-primary flex items-center z-10"
            animate={{
              boxShadow: [
                "0 0 0px rgba(0, 203, 221, 0)",
                "0 0 10px rgba(0, 203, 221, 0.5)",
                "0 0 0px rgba(0, 203, 221, 0)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Cpu className="mr-1 h-3 w-3" />
            <span>SLM</span>
          </motion.div>

          {/* Circuit board visualization */}
          {connections}
          {nodes}

          {/* Chip glow */}
          <motion.div
            className="absolute w-80 h-80 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(0, 203, 221, 0.3) 0%, rgba(0, 203, 221, 0) 70%)",
              left: "50%",
              top: "50%",
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Cursor interaction glow effect */}
        {isMounted && (
          <div
            className="absolute pointer-events-none w-[100px] h-[100px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(0, 203, 221, 0.3) 0%, rgba(0, 203, 221, 0) 70%)",
              left: mousePosition.x,
              top: mousePosition.y,
              transform: "translate(-50%, -50%)",
              opacity: 0.7,
              zIndex: 10,
            }}
          />
        )}
      </div>
    );
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  // Button animation variants
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 15px rgba(0, 203, 221, 0.5)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Background circuit pattern animation
  const renderBackgroundPattern = () => {
    const elements = [];
    for (let i = 0; i < 20; i++) {
      const size = 100 + Math.random() * 200;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const opacity = 0.03 + Math.random() * 0.07;
      const delay = Math.random() * 5;

      elements.push(
        <motion.div
          key={`bg-element-${i}`}
          className="absolute rounded-full border border-dashed border-primary/30"
          style={{
            width: size,
            height: size,
            left: `${x}%`,
            top: `${y}%`,
            opacity,
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0, opacity, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />,
      );
    }
    return elements;
  };

  return (
    <section
      ref={heroRef}
      className="relative z-10 overflow-hidden px-4 py-20 md:py-28"
      suppressHydrationWarning
    >
      {/* Decorative background elements */}
      <div
        className="absolute inset-0 z-0 neural-pattern opacity-10"
      ></div>
      <div className="absolute inset-0 z-0">
        <div
          className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"
        ></div>
        <div
          className="absolute right-1/3 bottom-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"
        ></div>
        {renderBackgroundPattern()}
      </div>

      <div className="container mx-auto max-w-6xl">
        <div
          className="grid gap-12 md:grid-cols-2 items-center"
        >
          {isMounted && (
            <div className="flex flex-col justify-center">
              <motion.div
                className="mb-2 inline-flex self-start items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm text-primary"
                custom={0}
                initial="hidden"
                animate={controls}
                variants={textVariants}
              >
                <Cpu className="mr-1 h-3 w-3" />
                <span>Small Language Models</span>
              </motion.div>

              <motion.h1
                className="mb-4 text-4xl font-bold uppercase tracking-wider text-foreground md:text-5xl"
                custom={1}
                initial="hidden"
                animate={controls}
                variants={textVariants}
              >
                Efficient{" "}
                <span className="gradient-text glow-text">
                  AI
                </span>{" "}
                for Edge Devices
              </motion.h1>

              <motion.p
                className="mb-6 text-lg text-muted-foreground"
                custom={2}
                initial="hidden"
                animate={controls}
                variants={textVariants}
              >
                Explore our collection of lightweight, efficient language models
                designed for resource-constrained environments and edge devices.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3"
                initial="hidden"
                animate={controls}
                variants={buttonVariants}
              >
                <motion.div
                  whileHover="hover"
                  variants={buttonVariants}
                >
                  <ModernButton
                    asChild
                    size="lg"
                    variant="primary"
                    glow="md"
                    className="rounded-full reflection"
                  >
                    <Link href="#models">
                      Browse Models
                    </Link>
                  </ModernButton>
                </motion.div>
                <motion.div
                  whileHover="hover"
                  variants={buttonVariants}
                >
                  <ModernButton
                    asChild
                    variant="glass"
                    size="lg"
                    className="rounded-full"
                  >
                    <Link href="/llm-models">
                      Compare to LLMs
                    </Link>
                  </ModernButton>
                </motion.div>
              </motion.div>
            </div>
          )}

          {isMounted && (
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative">
                {/* Outer circuit rings */}
                <div
                  className="absolute -inset-6 rounded-full border border-dashed border-primary/30 rotate-slow"
                ></div>
                <div
                  className="absolute -inset-12 rounded-full border border-dashed border-primary/20 rotate-medium"
                ></div>
                <div
                  className="absolute -inset-20 rounded-full border border-dashed border-primary/10 rotate-fast"
                ></div>

                {/* Inner container with 3D effect */}
                <div
                  className="relative w-[280px] h-[240px] rounded-xl border border-primary/20 bg-background/30 backdrop-blur-sm p-4 transform-3d"
                >
                  {/* Decorative corner elements */}
                  <div
                    className="absolute top-0 left-0 w-12 h-12 border-b border-r border-primary/30 rounded-br-xl"
                  ></div>
                  <div
                    className="absolute bottom-0 right-0 w-12 h-12 border-t border-l border-primary/30 rounded-tl-xl"
                  ></div>

                  {/* Render the circuit board visualization */}
                  {renderCircuitBoard()}

                  {/* Text labels */}
                  <div
                    className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full text-xs text-primary/70 font-mono"
                  >
                    SLM.v1
                  </div>
                  <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full text-xs text-primary/70 font-mono"
                  >
                    Artintel
                  </div>
                </div>

                {/* Feature icons floating around */}
                <motion.div
                  className="absolute -left-8 top-1/4 p-2 rounded-full bg-primary/10 border border-primary/30"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Laptop className="h-5 w-5 text-primary" />
                </motion.div>

                <motion.div
                  className="absolute -right-8 top-1/4 p-2 rounded-full bg-primary/10 border border-primary/30"
                  animate={{
                    y: [0, 10, 0],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 4,
                    delay: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Zap className="h-5 w-5 text-primary" />
                </motion.div>

                <motion.div
                  className="absolute left-1/4 -bottom-8 p-2 rounded-full bg-primary/10 border border-primary/30"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 4,
                    delay: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <CircleDollarSign className="h-5 w-5 text-primary" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
