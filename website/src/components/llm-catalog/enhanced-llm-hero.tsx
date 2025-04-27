"use client";

import { useState, useEffect, useRef } from "react";
import { Brain, Database, Network, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import "./llm-styles.css";
import ServerAnimation from "./server-animation";

export default function EnhancedLLMHero() {
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

  // Neural network visualization with enhanced animations
  const renderNeuralNetwork = () => {
    // Only render on client side to avoid hydration mismatch
    if (!isMounted) return null;

    const neurons = [];
    const connections = [];
    const neuronCount = 24;
    const layerCount = 4;
    const width = 280;
    const height = 240;
    const layerSpacing = width / (layerCount + 1);
    const neuronSpacing = height / (neuronCount / layerCount + 1);

    // Create neurons
    for (let layer = 0; layer < layerCount; layer++) {
      const neuronsInLayer =
        layer === 0 || layer === layerCount - 1
          ? neuronCount / layerCount - 1
          : neuronCount / layerCount + 1;

      for (let i = 0; i < neuronsInLayer; i++) {
        const x = (layer + 1) * layerSpacing;
        const y = (i + 1) * (height / (neuronsInLayer + 1));
        const size = layer === 0 || layer === layerCount - 1 ? 6 : 8;
        const delay = Math.random() * 3;

        neurons.push(
          <motion.div
            key={`neuron-${layer}-${i}`}
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
                "0 0 0px rgba(124, 58, 237, 0)",
                "0 0 10px rgba(124, 58, 237, 0.5)",
                "0 0 0px rgba(124, 58, 237, 0)",
              ],
            }}
            transition={{
              duration: 4,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            data-oid="fl2bywy"
            suppressHydrationWarning
          />,
        );

        // Create connections to next layer
        if (layer < layerCount - 1) {
          const nextLayerNeurons =
            layer === layerCount - 2
              ? neuronCount / layerCount - 1
              : neuronCount / layerCount + 1;

          for (let j = 0; j < nextLayerNeurons; j++) {
            const nextX = (layer + 2) * layerSpacing;
            const nextY = (j + 1) * (height / (nextLayerNeurons + 1));
            const length = Math.sqrt(
              Math.pow(nextX - x, 2) + Math.pow(nextY - y, 2),
            );
            const angle = Math.atan2(nextY - y, nextX - x) * (180 / Math.PI);
            const shouldAnimate = Math.random() > 0.7;

            connections.push(
              <motion.div
                key={`connection-${layer}-${i}-${j}`}
                className="absolute bg-gradient-to-r from-primary/40 to-primary/60"
                style={{
                  width: length,
                  height: 1,
                  left: x,
                  top: y,
                  transformOrigin: "left center",
                  rotate: `${angle}deg`,
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
                data-oid="u2euh9w"
                suppressHydrationWarning
              />,
            );

            // Add data pulse animation
            if (shouldAnimate) {
              connections.push(
                <motion.div
                  key={`pulse-${layer}-${i}-${j}`}
                  className="absolute w-1.5 h-1.5 rounded-full bg-primary"
                  style={{
                    left: x,
                    top: y,
                    zIndex: 2,
                  }}
                  animate={{
                    x: nextX - x,
                    y: nextY - y,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: Math.random() * 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  data-oid="c-qk26e"
                  suppressHydrationWarning
                />,
              );
            }
          }
        }
      }
    }

    return (
      <div
        className="relative w-[280px] h-[240px] mx-auto transform-3d"
        data-oid="0nc0u:s"
      >
        {/* Neural network container */}
        <motion.div
          className="absolute inset-0 rounded-lg border border-primary/60 bg-background/50 backdrop-blur-sm overflow-hidden shadow-[0_0_15px_rgba(124,58,237,0.3)] llm-brain"
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
          data-oid="3.9lim1"
        >
          {/* LLM label */}
          <motion.div
            className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono text-primary flex items-center z-10"
            animate={{
              boxShadow: [
                "0 0 0px rgba(124, 58, 237, 0)",
                "0 0 10px rgba(124, 58, 237, 0.5)",
                "0 0 0px rgba(124, 58, 237, 0)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            data-oid="zbhxi4t"
          >
            <Brain className="mr-1 h-3 w-3" data-oid="-8dxha2" />
            <span data-oid="7ym6mft">LLM</span>
          </motion.div>

          {/* Neural network visualization */}
          {connections}
          {neurons}

          {/* Brain lobes visualization */}
          <motion.div
            className="absolute w-80 h-80 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, rgba(124, 58, 237, 0) 70%)",
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
            data-oid="7f.czwc"
          />
        </motion.div>

        {/* Cursor interaction glow effect */}
        {isMounted && (
          <div
            className="absolute pointer-events-none w-[100px] h-[100px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, rgba(124, 58, 237, 0) 70%)",
              left: mousePosition.x,
              top: mousePosition.y,
              transform: "translate(-50%, -50%)",
              opacity: 0.7,
              zIndex: 10,
            }}
            data-oid="rfixora"
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
      boxShadow: "0px 0px 15px rgba(124, 58, 237, 0.5)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Background neural pattern animation
  const renderBackgroundPattern = () => {
    // Only render on client side to avoid hydration mismatch
    if (!isMounted) return [];

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
          data-oid="n0ftm6_"
          suppressHydrationWarning
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
      data-oid="ecu9-w4"
    >
      {/* Decorative background elements */}
      <div
        className="absolute inset-0 z-0 neural-pattern opacity-10"
        data-oid="0j-muy_"
      ></div>
      <div className="absolute inset-0 z-0" data-oid="j:1q3y0">
        <div
          className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"
          data-oid="--cyx.9"
        ></div>
        <div
          className="absolute right-1/3 bottom-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"
          data-oid="qotjw_-"
        ></div>
        {renderBackgroundPattern()}
      </div>

      <div className="container mx-auto max-w-6xl" data-oid="s2ex-pe">
        <div
          className="grid gap-12 md:grid-cols-2 items-center"
          data-oid="3ttqvj-"
        >
          {isMounted && (
            <div className="flex flex-col justify-center" data-oid="l-vy1az">
              <motion.div
                className="mb-2 inline-flex self-start items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm text-primary"
                custom={0}
                initial="hidden"
                animate={controls}
                variants={textVariants}
                data-oid="q6m7gmp"
              >
                <Brain className="mr-1 h-3 w-3" data-oid="m8dzxh2" />
                <span data-oid="lt8w:ss">Large Language Models</span>
              </motion.div>

              <motion.h1
                className="mb-4 text-4xl font-bold uppercase tracking-wider text-foreground md:text-5xl"
                custom={1}
                initial="hidden"
                animate={controls}
                variants={textVariants}
                data-oid="mlv4en4"
              >
                Advanced{" "}
                <span className="gradient-text glow-text" data-oid="yqiyl2l">
                  AI
                </span>{" "}
                for Complex Tasks
              </motion.h1>

              <motion.p
                className="mb-6 text-lg text-muted-foreground"
                custom={2}
                initial="hidden"
                animate={controls}
                variants={textVariants}
                data-oid="3_kd725"
              >
                Explore our collection of powerful large language models
                designed for advanced reasoning, creative generation, and
                complex problem-solving.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3"
                initial="hidden"
                animate={controls}
                variants={buttonVariants}
                data-oid="yka2j-4"
              >
                <motion.div
                  whileHover="hover"
                  variants={buttonVariants}
                  data-oid="5ut2ida"
                >
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full reflection"
                    data-oid="oo_z_e4"
                  >
                    <Link href="#models" data-oid=".s087nz">
                      Browse Models
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover="hover"
                  variants={buttonVariants}
                  data-oid="fxyeesp"
                >
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full"
                    data-oid="mahwmm3"
                  >
                    <Link href="/slm-models" data-oid="wug3b-l">
                      Compare to SLMs
                    </Link>
                  </Button>
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
              data-oid="6.6w:qc"
            >
              <div className="relative" data-oid="rwz7f-q">
                {/* Outer neural rings */}
                <div
                  className="absolute -inset-6 rounded-full border border-dashed border-primary/30 rotate-slow"
                  data-oid="0ju_emp"
                ></div>
                <div
                  className="absolute -inset-12 rounded-full border border-dashed border-primary/20 rotate-medium"
                  data-oid="bdrc:d0"
                ></div>
                <div
                  className="absolute -inset-20 rounded-full border border-dashed border-primary/10 rotate-fast"
                  data-oid="r7v9k.1"
                ></div>

                {/* Server Animation */}
                <ServerAnimation />

                {/* Energy nodes floating around */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`energy-node-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-primary/80"
                    style={{
                      left: 140 + Math.cos((i * Math.PI) / 4) * 160,
                      top: 120 + Math.sin((i * Math.PI) / 4) * 160,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 0.8, 0.4],
                      boxShadow: [
                        "0 0 0px rgba(124, 58, 237, 0)",
                        "0 0 10px rgba(124, 58, 237, 0.5)",
                        "0 0 0px rgba(124, 58, 237, 0)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    data-oid="anmeg77"
                  />
                ))}

                {/* Energy zaps */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`zap-${i}`}
                    className="absolute"
                    style={{
                      left: 140,
                      top: 120,
                      zIndex: 5,
                    }}
                    initial={{ opacity: 0 }}
                    data-oid="psa7gqv"
                  >
                    <Zap
                      className="text-primary/70"
                      size={24}
                      style={{
                        transform: `rotate(${i * 120}deg)`,
                      }}
                      data-oid="tw1sv82"
                    />

                    <motion.div
                      animate={{
                        opacity: [0, 0.7, 0],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      data-oid="_xw6vap"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
