"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroPathEquilibrium({
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

  // Path animation variants - enhanced for perfect edge-to-center reveal
  const pathVariants = {
    hidden: (custom: { isLeft: boolean }) => ({
      pathLength: 0,
      opacity: 0,
      // Critical: this ensures animations start from the edges
      pathOffset: custom.isLeft ? 1 : 0, // Start from right edge for left paths, left edge for right paths
    }),
    visible: (custom: { isLeft: boolean; delay: number }) => ({
      pathLength: 1,
      opacity: 1,
      pathOffset: 0, // End at normal position
      transition: {
        pathLength: {
          duration: 1.2,
          delay: custom.delay * 0.03, // Minimal delay for nearly simultaneous reveal from edges
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
      scale: [0, 1.2, 0.9, 1], // Refined scale values
      opacity: [0, 0.8, 0.7, 1], // Better opacity curve
      transition: {
        scale: {
          duration: 1.2,
          delay: custom * 0.03, // Coordinated with path animations
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
      scale: [1, 1.08, 1], // Subtler scale change for better performance
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

  return (
    <AnimatePresence data-oid="o-gbqwz">
      {isVisible && (
        <div
          className={cn(
            "hero-path-effect absolute inset-0 z-0 overflow-hidden w-full h-full size-full",
            className,
          )}
          // Important: pointer-events-none removed to not interfere with button clicks
          style={{ pointerEvents: "none" }}
          data-oid="1515t9j"
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1440 1200"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full size-full"
            style={{ minWidth: "100%", minHeight: "100%" }}
            data-oid="rlk8gkw"
          >
            {/* Equilibrium grid pattern - perfect balance of elements */}
            <pattern
              id="equilibrium-grid"
              patternUnits="userSpaceOnUse"
              width="100"
              height="100"
              data-oid="p524-lr"
            >
              <rect width="100" height="100" fill="none" data-oid="p5q1nl." />
              <path
                d="M0 25 H100 M0 50 H100 M0 75 H100 M25 0 V100 M50 0 V100 M75 0 V100"
                stroke="#00cddd0a"
                strokeWidth="0.6"
                data-oid="2bgu-9e"
              />

              <circle
                cx="25"
                cy="25"
                r="1"
                fill="#00cddd10"
                data-oid="0.wy1zn"
              />

              <circle
                cx="50"
                cy="25"
                r="1"
                fill="#06b6d410"
                data-oid="fsdu-.y"
              />

              <circle
                cx="75"
                cy="25"
                r="1"
                fill="#0891b210"
                data-oid="2651vto"
              />

              <circle
                cx="25"
                cy="50"
                r="1"
                fill="#06b6d410"
                data-oid="md2wtmg"
              />

              <circle
                cx="50"
                cy="50"
                r="1"
                fill="#0891b210"
                data-oid="k18w_mh"
              />

              <circle
                cx="75"
                cy="50"
                r="1"
                fill="#0e749010"
                data-oid="vuy6x8q"
              />

              <circle
                cx="25"
                cy="75"
                r="1"
                fill="#0891b210"
                data-oid="_vyov6l"
              />

              <circle
                cx="50"
                cy="75"
                r="1"
                fill="#0e749010"
                data-oid=".cuo0u9"
              />

              <circle
                cx="75"
                cy="75"
                r="1"
                fill="#00cddd10"
                data-oid="6is:z:y"
              />

              {/* Subtle diagonals for added depth */}
              <path
                d="M0 0 L100 100 M100 0 L0 100"
                stroke="#00cddd05"
                strokeWidth="0.4"
                data-oid="_o-b7oy"
              />
            </pattern>

            <rect
              width="100%"
              height="100%"
              fill="url(#equilibrium-grid)"
              opacity="0.7"
              data-oid="na1vuek"
            />

            {/* Enhanced filters and gradients */}
            <defs data-oid="byd5upo">
              <filter
                id="subtle-glow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
                data-oid="ylyqanv"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="3"
                  data-oid="si15yx6"
                />

                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0.8 0 0 0 0 0.9 0 0 0 0.8 0"
                  data-oid="4_iefx3"
                />
              </filter>

              <filter
                id="node-glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
                data-oid="qmmy7ag"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="2"
                  data-oid="u47ctn7"
                />

                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0.9 0 0 0 0 1 0 0 0 0.9 0"
                  data-oid="qqt2iqz"
                />
              </filter>

              <linearGradient
                id="path-gradient-1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
                data-oid="spqwb-y"
              >
                <stop offset="0%" stopColor="#00cddd" data-oid="m6t36:m" />
                <stop offset="50%" stopColor="#06b6d4" data-oid="81glrvz" />
                <stop offset="100%" stopColor="#00cddd" data-oid="gd1br__" />
              </linearGradient>

              <linearGradient
                id="path-gradient-2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
                data-oid="76.r:ac"
              >
                <stop offset="0%" stopColor="#06b6d4" data-oid="wx5ly_e" />
                <stop offset="50%" stopColor="#0891b2" data-oid="uv-9u1r" />
                <stop offset="100%" stopColor="#06b6d4" data-oid="461fdq9" />
              </linearGradient>

              <linearGradient
                id="path-gradient-3"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
                data-oid="31qlxky"
              >
                <stop offset="0%" stopColor="#0891b2" data-oid="hm:i-3g" />
                <stop offset="50%" stopColor="#0e7490" data-oid="5btjncu" />
                <stop offset="100%" stopColor="#0891b2" data-oid="x:.tw89" />
              </linearGradient>

              <radialGradient
                id="central-glow"
                cx="50%"
                cy="50%"
                r="50%"
                fx="50%"
                fy="50%"
                data-oid="3n7inft"
              >
                <stop
                  offset="0%"
                  stopColor="#00cddd"
                  stopOpacity="0.3"
                  data-oid="o5waydy"
                />

                <stop
                  offset="60%"
                  stopColor="#06b6d4"
                  stopOpacity="0.1"
                  data-oid="wi7r8dz"
                />

                <stop
                  offset="100%"
                  stopColor="#0891b2"
                  stopOpacity="0"
                  data-oid="a903--v"
                />
              </radialGradient>

              {/* Path for hexagon animation */}
              <path
                id="hex-path"
                d="M720 350 L765 375 L765 425 L720 450 L675 425 L675 375 Z"
                fill="none"
                data-oid="2vwy2wt"
              />
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
              data-oid="n5jvdqu"
            />

            {/* Subtle background glow layer */}
            <g
              className="glow-layer"
              filter="url(#subtle-glow)"
              opacity="0.3"
              data-oid=":7dhjin"
            >
              <path
                d="M0 300 L240 300 L340 300 L380 260 L480 260 L520 300 L620 300 L660 260 L690 260 L720 220 L750 260 L780 260 L820 300 L920 300 L960 260 L1060 260 L1100 300 L1200 300 L1440 300"
                stroke="#00cddd"
                strokeWidth="1.5"
                fill="none"
                data-oid="ku3qkyl"
              />

              <path
                d="M0 380 L240 380 L320 380 L360 340 L460 340 L500 380 L580 380 L620 340 L680 340 L720 300 L760 340 L820 340 L860 380 L940 380 L980 340 L1080 340 L1120 380 L1200 380 L1440 380"
                stroke="#06b6d4"
                strokeWidth="1.5"
                fill="none"
                data-oid="jd8sa0s"
              />

              <path
                d="M0 460 L240 460 L320 460 L360 500 L440 500 L480 460 L560 460 L600 500 L660 500 L700 460 L720 420 L740 460 L780 500 L840 500 L880 460 L960 460 L1000 500 L1080 500 L1120 460 L1200 460 L1440 460"
                stroke="#0891b2"
                strokeWidth="1.5"
                fill="none"
                data-oid="2xtntl2"
              />

              <path
                d="M0 540 L240 540 L320 540 L360 580 L440 580 L480 540 L560 540 L600 580 L660 580 L700 540 L720 500"
                stroke="#0e7490"
                strokeWidth="1.5"
                fill="none"
                data-oid="m1n5ktd"
              />

              <path
                d="M0 620 L240 620 L320 620 L360 580 L440 580 L480 620 L560 620 L600 580 L660 580 L700 620 L720 620 L740 620 L780 580 L840 580 L880 620 L960 620 L1000 580 L1080 580 L1120 620 L1200 620 L1440 620"
                stroke="#00cddd"
                strokeWidth="1.5"
                fill="none"
                data-oid="7z241:e"
              />

              <path
                d="M0 700 L240 700 L340 700 L380 660 L480 660 L520 700 L620 700 L660 660 L690 660 L720 700 L750 660 L780 660 L820 700 L920 700 L960 660 L1060 660 L1100 700 L1200 700 L1440 700"
                stroke="#06b6d4"
                strokeWidth="1.5"
                fill="none"
                data-oid="qy:_y:0"
              />

              <path
                d="M0 780 L240 780 L320 780 L360 820 L460 820 L500 780 L580 780 L620 820 L680 820 L720 780 L760 820 L820 820 L860 780 L940 780 L980 820 L1080 820 L1120 780 L1200 780 L1440 780"
                stroke="#0891b2"
                strokeWidth="1.5"
                fill="none"
                data-oid="aiufi9n"
              />

              <path
                d="M0 860 L240 860 L320 860 L360 820 L440 820 L480 860 L560 860 L600 820 L660 820 L700 860 L720 820"
                stroke="#00cddd"
                strokeWidth="1.5"
                fill="none"
                data-oid="9b14l2j"
              />
            </g>

            {/* Main horizontal paths - with perfect geometric symmetry */}
            <g className="primary-paths" data-oid="g_auzbx">
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
                data-oid="5duieug"
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
                data-oid="28wzts7"
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
                data-oid="wx0bqwh"
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
                data-oid="xwg5lpy"
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
                data-oid="opwauh3"
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
                data-oid="0_hecr4"
              />

              {/* Row 4 */}
              <motion.path
                d="M0 540 L240 540 L320 540 L360 580 L440 580 L480 540 L560 540 L600 580 L660 580 L700 540 L720 500"
                stroke="url(#path-gradient-2)"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: true, delay: 3 }}
                initial="hidden"
                animate="visible"
                data-oid="hkvekps"
              />

              <motion.path
                d="M720 500 L740 540 L780 580 L840 580 L880 540 L960 540 L1000 580 L1080 580 L1120 540 L1200 540 L1440 540"
                stroke="url(#path-gradient-2)"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: false, delay: 3 }}
                initial="hidden"
                animate="visible"
                data-oid="jo:s4n."
              />

              {/* Row 5 */}
              <motion.path
                d="M0 620 L240 620 L320 620 L360 580 L440 580 L480 620 L560 620 L600 580 L660 580 L700 620 L720 620"
                stroke="url(#path-gradient-1)"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: true, delay: 4 }}
                initial="hidden"
                animate="visible"
                data-oid="edn8zfk"
              />

              <motion.path
                d="M720 620 L740 620 L780 580 L840 580 L880 620 L960 620 L1000 580 L1080 580 L1120 620 L1200 620 L1440 620"
                stroke="url(#path-gradient-1)"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: false, delay: 4 }}
                initial="hidden"
                animate="visible"
                data-oid="8:2ln4m"
              />

              {/* Row 6 - New bottom paths */}
              <motion.path
                d="M0 700 L240 700 L340 700 L380 660 L480 660 L520 700 L620 700 L660 660 L690 660 L720 700"
                stroke="url(#path-gradient-2)"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: true, delay: 5 }}
                initial="hidden"
                animate="visible"
                data-oid="asknmnc"
              />

              <motion.path
                d="M720 700 L750 660 L780 660 L820 700 L920 700 L960 660 L1060 660 L1100 700 L1200 700 L1440 700"
                stroke="url(#path-gradient-2)"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: false, delay: 5 }}
                initial="hidden"
                animate="visible"
                data-oid="b_fq608"
              />

              {/* Row 7 - New bottom paths */}
              <motion.path
                d="M0 780 L240 780 L320 780 L360 820 L460 820 L500 780 L580 780 L620 820 L680 820 L720 780"
                stroke="url(#path-gradient-3)"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: true, delay: 6 }}
                initial="hidden"
                animate="visible"
                data-oid="11t9n3m"
              />

              <motion.path
                d="M720 780 L760 820 L820 820 L860 780 L940 780 L980 820 L1080 820 L1120 780 L1200 780 L1440 780"
                stroke="url(#path-gradient-3)"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: false, delay: 6 }}
                initial="hidden"
                animate="visible"
                data-oid="rr2t6l0"
              />

              {/* Row 8 - New bottom paths */}
              <motion.path
                d="M0 860 L240 860 L320 860 L360 820 L440 820 L480 860 L560 860 L600 820 L660 820 L700 860 L720 820"
                stroke="url(#path-gradient-1)"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: true, delay: 7 }}
                initial="hidden"
                animate="visible"
                data-oid="jw:oxdd"
              />

              <motion.path
                d="M720 820 L740 860 L780 820 L840 820 L880 860 L960 860 L1000 820 L1080 820 L1120 860 L1200 860 L1440 860"
                stroke="url(#path-gradient-1)"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: false, delay: 7 }}
                initial="hidden"
                animate="visible"
                data-oid="lkz0d21"
              />
            </g>

            {/* Vertical connections - symmetric around centerline */}
            <g className="vertical-connections" data-oid="iz2kehz">
              <motion.path
                d="M340 260 L340 860"
                stroke="#0891b2"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: true, delay: 5 }}
                initial="hidden"
                animate="visible"
                data-oid="8jci3bx"
              />

              <motion.path
                d="M480 260 L480 860"
                stroke="#0891b2"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: true, delay: 5.2 }}
                initial="hidden"
                animate="visible"
                data-oid="umc09-j"
              />

              <motion.path
                d="M620 260 L620 860"
                stroke="#0891b2"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: true, delay: 5.4 }}
                initial="hidden"
                animate="visible"
                data-oid="1-i-g10"
              />

              <motion.path
                d="M820 260 L820 860"
                stroke="#0891b2"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: false, delay: 5.4 }}
                initial="hidden"
                animate="visible"
                data-oid="g847ash"
              />

              <motion.path
                d="M960 260 L960 860"
                stroke="#0891b2"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: false, delay: 5.2 }}
                initial="hidden"
                animate="visible"
                data-oid="3lihwdl"
              />

              <motion.path
                d="M1100 260 L1100 860"
                stroke="#0891b2"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: false, delay: 5 }}
                initial="hidden"
                animate="visible"
                data-oid="96rn5r8"
              />
            </g>

            {/* Central hexagon structure */}
            <g className="central-processor" data-oid="cr499oq">
              <motion.path
                d="M720 350 L765 375 L765 425 L720 450 L675 425 L675 375 Z"
                stroke="#00cddd"
                strokeWidth="1.5"
                fill="none"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{
                  opacity: 1,
                  pathLength: 1,
                  transition: { duration: 1.0, delay: 1.0 },
                }}
                data-oid="ckx-px3"
              />

              <motion.path
                d="M720 370 L745 385 L745 415 L720 430 L695 415 L695 385 Z"
                stroke="#06b6d4"
                strokeWidth="1.2"
                fill="none"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{
                  opacity: 1,
                  pathLength: 1,
                  transition: { duration: 1.0, delay: 1.2 },
                }}
                data-oid="3y_:skm"
              />

              {/* Connecting paths to hexagon - left side */}
              <motion.path
                d="M690 260 L675 375"
                stroke="#0891b2"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: true, delay: 4 }}
                initial="hidden"
                animate="visible"
                data-oid="9j_or.m"
              />

              {/* Connecting paths to hexagon - right side */}
              <motion.path
                d="M750 260 L765 375"
                stroke="#0891b2"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: false, delay: 4 }}
                initial="hidden"
                animate="visible"
                data-oid="t._dm6:"
              />

              {/* Bottom connections - left */}
              <motion.path
                d="M675 425 L660 500"
                stroke="#0891b2"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: true, delay: 4.5 }}
                initial="hidden"
                animate="visible"
                data-oid="0d3gw.t"
              />

              {/* Bottom connections - right */}
              <motion.path
                d="M765 425 L780 500"
                stroke="#0891b2"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: false, delay: 4.5 }}
                initial="hidden"
                animate="visible"
                data-oid="bbp23d1"
              />
            </g>

            {/* Connection nodes */}
            <g className="connection-nodes" data-oid="p:8o4sq">
              {/* Left side nodes - perfect spacing */}
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
                data-oid=".q_-971"
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
                data-oid="g0je_bu"
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
                data-oid="-_9g23m"
              />

              <motion.circle
                cx="360"
                cy="340"
                r="3"
                fill="#06b6d4"
                variants={nodeVariants}
                custom={1.4}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
                data-oid="guhrxhl"
              />

              <motion.circle
                cx="500"
                cy="380"
                r="3"
                fill="#06b6d4"
                variants={nodeVariants}
                custom={1.7}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
                data-oid="-xh-1wd"
              />

              <motion.circle
                cx="620"
                cy="340"
                r="3"
                fill="#06b6d4"
                variants={nodeVariants}
                custom={2.0}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
                data-oid="xm:s5vv"
              />

              <motion.circle
                cx="360"
                cy="500"
                r="3"
                fill="#0891b2"
                variants={nodeVariants}
                custom={2.3}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
                data-oid="nqc9gj6"
              />

              <motion.circle
                cx="480"
                cy="460"
                r="3"
                fill="#0891b2"
                variants={nodeVariants}
                custom={2.6}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
                data-oid=".k63n:v"
              />

              <motion.circle
                cx="600"
                cy="500"
                r="3"
                fill="#0891b2"
                variants={nodeVariants}
                custom={2.9}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
                data-oid="6t9_mko"
              />

              {/* Right side nodes - perfect symmetry with left side */}
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
                data-oid="392.f:g"
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
                data-oid="ligf-l1"
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
                data-oid="49w17bc"
              />

              <motion.circle
                cx="1080"
                cy="340"
                r="3"
                fill="#06b6d4"
                variants={nodeVariants}
                custom={1.4}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
                data-oid="._0.ogf"
              />

              <motion.circle
                cx="940"
                cy="380"
                r="3"
                fill="#06b6d4"
                variants={nodeVariants}
                custom={1.7}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
                data-oid="vxznphv"
              />

              <motion.circle
                cx="820"
                cy="340"
                r="3"
                fill="#06b6d4"
                variants={nodeVariants}
                custom={2.0}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
                data-oid="_3v14hp"
              />

              <motion.circle
                cx="1080"
                cy="500"
                r="3"
                fill="#0891b2"
                variants={nodeVariants}
                custom={2.3}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
                data-oid="fe6xr43"
              />

              <motion.circle
                cx="960"
                cy="460"
                r="3"
                fill="#0891b2"
                variants={nodeVariants}
                custom={2.6}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
                data-oid="9ibcn6h"
              />

              <motion.circle
                cx="840"
                cy="500"
                r="3"
                fill="#0891b2"
                variants={nodeVariants}
                custom={2.9}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
                data-oid="439nhoo"
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
                data-oid="gh_ppeh"
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
                data-oid="5.75dkc"
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
                data-oid=":luoe5m"
              />

              <motion.circle
                cx="720"
                cy="500"
                r="3.5"
                fill="#00cddd"
                variants={nodeVariants}
                custom={4.1}
                initial="hidden"
                animate="visible"
                filter="url(#node-glow)"
                data-oid=":9y-1q4"
              />
            </g>

            {/* Animated particles - balanced across the grid */}
            <g className="animated-particles" data-oid="1ahqwq9">
              {/* Main horizontal paths */}
              <circle
                r="2"
                fill="#00cddd"
                filter="url(#node-glow)"
                data-oid="rljncs:"
              >
                <animateMotion
                  dur="12s"
                  repeatCount="indefinite"
                  path="M0 300 L240 300 L340 300 L380 260 L480 260 L520 300 L620 300 L660 260 L690 260 L720 220 L750 260 L780 260 L820 300 L920 300 L960 260 L1060 260 L1100 300 L1200 300 L1440 300"
                  data-oid="fc04b2c"
                />
              </circle>

              <circle
                r="2"
                fill="#06b6d4"
                filter="url(#node-glow)"
                data-oid="6a7u:3."
              >
                <animateMotion
                  dur="10s"
                  repeatCount="indefinite"
                  path="M0 380 L240 380 L320 380 L360 340 L460 340 L500 380 L580 380 L620 340 L680 340 L720 300 L760 340 L820 340 L860 380 L940 380 L980 340 L1080 340 L1120 380 L1200 380 L1440 380"
                  data-oid="7au5:fs"
                />
              </circle>

              <circle
                r="2"
                fill="#0891b2"
                filter="url(#node-glow)"
                data-oid="yyezmiu"
              >
                <animateMotion
                  dur="14s"
                  repeatCount="indefinite"
                  path="M0 460 L240 460 L320 460 L360 500 L440 500 L480 460 L560 460 L600 500 L660 500 L700 460 L720 420 L740 460 L780 500 L840 500 L880 460 L960 460 L1000 500 L1080 500 L1120 460 L1200 460 L1440 460"
                  data-oid="lmdgx5a"
                />
              </circle>

              {/* Additional particles for new paths */}
              <circle
                r="2"
                fill="#00cddd"
                filter="url(#node-glow)"
                data-oid="wlu6ac8"
              >
                <animateMotion
                  dur="15s"
                  repeatCount="indefinite"
                  path="M0 700 L240 700 L340 700 L380 660 L480 660 L520 700 L620 700 L660 660 L690 660 L720 700 L750 660 L780 660 L820 700 L920 700 L960 660 L1060 660 L1100 700 L1200 700 L1440 700"
                  data-oid="a5z3qbx"
                />
              </circle>

              <circle
                r="2"
                fill="#06b6d4"
                filter="url(#node-glow)"
                data-oid="s1tnmm2"
              >
                <animateMotion
                  dur="13s"
                  repeatCount="indefinite"
                  path="M0 780 L240 780 L320 780 L360 820 L460 820 L500 780 L580 780 L620 820 L680 820 L720 780 L760 820 L820 820 L860 780 L940 780 L980 820 L1080 820 L1120 780 L1200 780 L1440 780"
                  data-oid="zx33d3h"
                />
              </circle>

              {/* Vertical paths */}
              <circle
                r="1.5"
                fill="#0891b2"
                filter="url(#node-glow)"
                data-oid="y5nkfqs"
              >
                <animateMotion
                  dur="6s"
                  repeatCount="indefinite"
                  path="M480 260 L480 860"
                  data-oid="3vt0lyl"
                />
              </circle>

              <circle
                r="1.5"
                fill="#0891b2"
                filter="url(#node-glow)"
                data-oid="7tej9x0"
              >
                <animateMotion
                  dur="6s"
                  repeatCount="indefinite"
                  path="M960 260 L960 860"
                  data-oid="gj2l0bl"
                />
              </circle>

              {/* Hexagon orbit */}
              <circle
                r="1.5"
                fill="#00cddd"
                filter="url(#node-glow)"
                data-oid="2ae-swd"
              >
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path="M720 350 L765 375 L765 425 L720 450 L675 425 L675 375 Z"
                  data-oid="rwt5h4e"
                />
              </circle>
            </g>

            {/* Enhanced center glow and rotating logo */}
            <motion.circle
              cx="720"
              cy="400"
              r="60"
              fill="#00cddd08"
              filter="url(#subtle-glow)"
              variants={glowVariants}
              initial="hidden"
              animate="visible"
              data-oid="0-141ks"
            />

            {/* Logo */}
            <motion.image
              href="/logos/Logo.png"
              x="700"
              y="380"
              width="40"
              height="40"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  opacity: { duration: 1.5, delay: 2.0 },
                  rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                },
              }}
              data-oid="wn6cad_"
            />

            {/* Pulse effects at key intersections */}
            <g className="pulse-effects" data-oid="uh:sz31">
              <circle
                cx="720"
                cy="400"
                r="12"
                fill="none"
                stroke="#00cddd"
                strokeWidth="0.8"
                data-oid="giqszpx"
              >
                <animate
                  attributeName="r"
                  values="12;24;12"
                  dur="6s"
                  repeatCount="indefinite"
                  data-oid="9cq:q0z"
                />

                <animate
                  attributeName="opacity"
                  values="0.6;0.2;0.6"
                  dur="6s"
                  repeatCount="indefinite"
                  data-oid="wo-.vn:"
                />
              </circle>

              <circle
                cx="720"
                cy="400"
                r="20"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="0.6"
                data-oid="3c9o0i3"
              >
                <animate
                  attributeName="r"
                  values="20;36;20"
                  dur="8s"
                  repeatCount="indefinite"
                  data-oid="xh8k2et"
                />

                <animate
                  attributeName="opacity"
                  values="0.4;0.1;0.4"
                  dur="8s"
                  repeatCount="indefinite"
                  data-oid=".hs83ea"
                />
              </circle>
            </g>
          </svg>
        </div>
      )}
    </AnimatePresence>
  );
}
