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
    <AnimatePresence data-oid="zodjo5d">
      {isVisible && (
        <div
          className={cn(
            "hero-path-effect absolute inset-0 z-0 overflow-hidden w-full h-full size-full",
            className,
          )}
          // Important: pointer-events-none removed to not interfere with button clicks
          style={{ pointerEvents: "none" }}
          data-oid="ziz:nu1"
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1440 1200"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full size-full"
            style={{ minWidth: "100%", minHeight: "100%" }}
            data-oid="d9kux5w"
          >
            {/* Equilibrium grid pattern - perfect balance of elements */}
            <pattern
              id="equilibrium-grid"
              patternUnits="userSpaceOnUse"
              width="100"
              height="100"
              data-oid="hlmjg26"
            >
              <rect width="100" height="100" fill="none" data-oid="6ir:7bh" />
              <path
                d="M0 25 H100 M0 50 H100 M0 75 H100 M25 0 V100 M50 0 V100 M75 0 V100"
                stroke="#00cddd0a"
                strokeWidth="0.6"
                data-oid="kdgt:sf"
              />

              <circle
                cx="25"
                cy="25"
                r="1"
                fill="#00cddd10"
                data-oid="vxtplqc"
              />

              <circle
                cx="50"
                cy="25"
                r="1"
                fill="#06b6d410"
                data-oid="71haptj"
              />

              <circle
                cx="75"
                cy="25"
                r="1"
                fill="#0891b210"
                data-oid="3n8lzof"
              />

              <circle
                cx="25"
                cy="50"
                r="1"
                fill="#06b6d410"
                data-oid="s6rv_6g"
              />

              <circle
                cx="50"
                cy="50"
                r="1"
                fill="#0891b210"
                data-oid="gl7-po0"
              />

              <circle
                cx="75"
                cy="50"
                r="1"
                fill="#0e749010"
                data-oid="yp3ul2k"
              />

              <circle
                cx="25"
                cy="75"
                r="1"
                fill="#0891b210"
                data-oid="3dfx81w"
              />

              <circle
                cx="50"
                cy="75"
                r="1"
                fill="#0e749010"
                data-oid="41zbnai"
              />

              <circle
                cx="75"
                cy="75"
                r="1"
                fill="#00cddd10"
                data-oid="vajoika"
              />

              {/* Subtle diagonals for added depth */}
              <path
                d="M0 0 L100 100 M100 0 L0 100"
                stroke="#00cddd05"
                strokeWidth="0.4"
                data-oid="p1utf28"
              />
            </pattern>

            <rect
              width="100%"
              height="100%"
              fill="url(#equilibrium-grid)"
              opacity="0.7"
              data-oid="ppss0et"
            />

            {/* Enhanced filters and gradients */}
            <defs data-oid="jr7lns4">
              <filter
                id="subtle-glow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
                data-oid="3z.3s9e"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="3"
                  data-oid="c-d3222"
                />

                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0.8 0 0 0 0 0.9 0 0 0 0.8 0"
                  data-oid="ru.-dh6"
                />
              </filter>

              <filter
                id="node-glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
                data-oid="a_t1rjr"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="2"
                  data-oid="b8lutit"
                />

                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0.9 0 0 0 0 1 0 0 0 0.9 0"
                  data-oid="nv-h.zu"
                />
              </filter>

              <linearGradient
                id="path-gradient-1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
                data-oid="gbjbn2p"
              >
                <stop offset="0%" stopColor="#00cddd" data-oid="i53.720" />
                <stop offset="50%" stopColor="#06b6d4" data-oid="dqv-.61" />
                <stop offset="100%" stopColor="#00cddd" data-oid="z:e46ae" />
              </linearGradient>

              <linearGradient
                id="path-gradient-2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
                data-oid="hh:aiwj"
              >
                <stop offset="0%" stopColor="#06b6d4" data-oid="gb:gm65" />
                <stop offset="50%" stopColor="#0891b2" data-oid="bx5vz9l" />
                <stop offset="100%" stopColor="#06b6d4" data-oid="36scxyn" />
              </linearGradient>

              <linearGradient
                id="path-gradient-3"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
                data-oid="iit4co5"
              >
                <stop offset="0%" stopColor="#0891b2" data-oid="z49tlu:" />
                <stop offset="50%" stopColor="#0e7490" data-oid="5s1bpl6" />
                <stop offset="100%" stopColor="#0891b2" data-oid="7k6fl7p" />
              </linearGradient>

              <radialGradient
                id="central-glow"
                cx="50%"
                cy="50%"
                r="50%"
                fx="50%"
                fy="50%"
                data-oid=".xqoyfb"
              >
                <stop
                  offset="0%"
                  stopColor="#00cddd"
                  stopOpacity="0.3"
                  data-oid="o4i.:.v"
                />

                <stop
                  offset="60%"
                  stopColor="#06b6d4"
                  stopOpacity="0.1"
                  data-oid="0i1g.0r"
                />

                <stop
                  offset="100%"
                  stopColor="#0891b2"
                  stopOpacity="0"
                  data-oid="llc82i0"
                />
              </radialGradient>

              {/* Path for hexagon animation */}
              <path
                id="hex-path"
                d="M720 350 L765 375 L765 425 L720 450 L675 425 L675 375 Z"
                fill="none"
                data-oid="l2i3s:7"
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
              data-oid="k.7p0p4"
            />

            {/* Subtle background glow layer */}
            <g
              className="glow-layer"
              filter="url(#subtle-glow)"
              opacity="0.3"
              data-oid="lm5:.u5"
            >
              <path
                d="M0 300 L240 300 L340 300 L380 260 L480 260 L520 300 L620 300 L660 260 L690 260 L720 220 L750 260 L780 260 L820 300 L920 300 L960 260 L1060 260 L1100 300 L1200 300 L1440 300"
                stroke="#00cddd"
                strokeWidth="1.5"
                fill="none"
                data-oid="99dzctw"
              />

              <path
                d="M0 380 L240 380 L320 380 L360 340 L460 340 L500 380 L580 380 L620 340 L680 340 L720 300 L760 340 L820 340 L860 380 L940 380 L980 340 L1080 340 L1120 380 L1200 380 L1440 380"
                stroke="#06b6d4"
                strokeWidth="1.5"
                fill="none"
                data-oid=".i.vxxr"
              />

              <path
                d="M0 460 L240 460 L320 460 L360 500 L440 500 L480 460 L560 460 L600 500 L660 500 L700 460 L720 420 L740 460 L780 500 L840 500 L880 460 L960 460 L1000 500 L1080 500 L1120 460 L1200 460 L1440 460"
                stroke="#0891b2"
                strokeWidth="1.5"
                fill="none"
                data-oid="1irr4kd"
              />

              <path
                d="M0 540 L240 540 L320 540 L360 580 L440 580 L480 540 L560 540 L600 580 L660 580 L700 540 L720 500"
                stroke="#0e7490"
                strokeWidth="1.5"
                fill="none"
                data-oid="t8f_2i3"
              />

              <path
                d="M0 620 L240 620 L320 620 L360 580 L440 580 L480 620 L560 620 L600 580 L660 580 L700 620 L720 620 L740 620 L780 580 L840 580 L880 620 L960 620 L1000 580 L1080 580 L1120 620 L1200 620 L1440 620"
                stroke="#00cddd"
                strokeWidth="1.5"
                fill="none"
                data-oid="b73mc7m"
              />

              <path
                d="M0 700 L240 700 L340 700 L380 660 L480 660 L520 700 L620 700 L660 660 L690 660 L720 700 L750 660 L780 660 L820 700 L920 700 L960 660 L1060 660 L1100 700 L1200 700 L1440 700"
                stroke="#06b6d4"
                strokeWidth="1.5"
                fill="none"
                data-oid="j6-5ekb"
              />

              <path
                d="M0 780 L240 780 L320 780 L360 820 L460 820 L500 780 L580 780 L620 820 L680 820 L720 780 L760 820 L820 820 L860 780 L940 780 L980 820 L1080 820 L1120 780 L1200 780 L1440 780"
                stroke="#0891b2"
                strokeWidth="1.5"
                fill="none"
                data-oid="-lku37m"
              />

              <path
                d="M0 860 L240 860 L320 860 L360 820 L440 820 L480 860 L560 860 L600 820 L660 820 L700 860 L720 820"
                stroke="#00cddd"
                strokeWidth="1.5"
                fill="none"
                data-oid="v1qftq1"
              />
            </g>

            {/* Main horizontal paths - with perfect geometric symmetry */}
            <g className="primary-paths" data-oid="g232fg6">
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
                data-oid="1uifdjp"
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
                data-oid="-.jz0uy"
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
                data-oid="2yzbdzj"
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
                data-oid="r_-zt5u"
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
                data-oid=".f7xx0a"
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
                data-oid="g1lyq8w"
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
                data-oid="u_vy-xz"
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
                data-oid="i4uo0yp"
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
                data-oid="o3nrrhf"
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
                data-oid="0yqvvxn"
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
                data-oid="e-7jrbn"
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
                data-oid="lpnq:r8"
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
                data-oid="xznkv3_"
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
                data-oid="9preq_9"
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
                data-oid="1b37ssx"
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
                data-oid="_d7_tfp"
              />
            </g>

            {/* Vertical connections - symmetric around centerline */}
            <g className="vertical-connections" data-oid="8t.wgum">
              <motion.path
                d="M340 260 L340 860"
                stroke="#0891b2"
                strokeWidth="1.5"
                fill="none"
                variants={pathVariants}
                custom={{ isLeft: true, delay: 5 }}
                initial="hidden"
                animate="visible"
                data-oid="03u2ros"
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
                data-oid="lb51enh"
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
                data-oid="fje41h:"
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
                data-oid="y_ofqhn"
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
                data-oid="tdk80mg"
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
                data-oid="p-w.nw4"
              />
            </g>

            {/* Central hexagon structure */}
            <g className="central-processor" data-oid="ioqz.vz">
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
                data-oid="t7-4lmm"
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
                data-oid="s72nos7"
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
                data-oid=".s8ujzt"
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
                data-oid="_43:hja"
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
                data-oid="qwh..l7"
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
                data-oid="r0-dfva"
              />
            </g>

            {/* Connection nodes */}
            <g className="connection-nodes" data-oid="ni24g45">
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
                data-oid="wq9ezps"
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
                data-oid="w6q..lf"
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
                data-oid="y8w0bt5"
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
                data-oid="zr23f85"
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
                data-oid="yom2om0"
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
                data-oid="jf.ovna"
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
                data-oid="00o1wjr"
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
                data-oid="rzsflas"
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
                data-oid="rb3_33r"
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
                data-oid="dq..5fk"
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
                data-oid="4vnlk9i"
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
                data-oid="w.hc:0b"
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
                data-oid="4ix3h11"
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
                data-oid="nw3g05m"
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
                data-oid="eavdi54"
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
                data-oid="y0gpx16"
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
                data-oid="ub8lzi4"
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
                data-oid="txhxh46"
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
                data-oid="--2fdgw"
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
                data-oid="f41wawn"
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
                data-oid="lligm0r"
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
                data-oid=":u32zhw"
              />
            </g>

            {/* Animated particles - balanced across the grid */}
            <g className="animated-particles" data-oid="e37fio5">
              {/* Main horizontal paths */}
              <circle
                r="2"
                fill="#00cddd"
                filter="url(#node-glow)"
                data-oid="tykgc7p"
              >
                <animateMotion
                  dur="12s"
                  repeatCount="indefinite"
                  path="M0 300 L240 300 L340 300 L380 260 L480 260 L520 300 L620 300 L660 260 L690 260 L720 220 L750 260 L780 260 L820 300 L920 300 L960 260 L1060 260 L1100 300 L1200 300 L1440 300"
                  data-oid="i771t.h"
                />
              </circle>

              <circle
                r="2"
                fill="#06b6d4"
                filter="url(#node-glow)"
                data-oid="l634xbq"
              >
                <animateMotion
                  dur="10s"
                  repeatCount="indefinite"
                  path="M0 380 L240 380 L320 380 L360 340 L460 340 L500 380 L580 380 L620 340 L680 340 L720 300 L760 340 L820 340 L860 380 L940 380 L980 340 L1080 340 L1120 380 L1200 380 L1440 380"
                  data-oid="5i-mdgs"
                />
              </circle>

              <circle
                r="2"
                fill="#0891b2"
                filter="url(#node-glow)"
                data-oid="m.l.g14"
              >
                <animateMotion
                  dur="14s"
                  repeatCount="indefinite"
                  path="M0 460 L240 460 L320 460 L360 500 L440 500 L480 460 L560 460 L600 500 L660 500 L700 460 L720 420 L740 460 L780 500 L840 500 L880 460 L960 460 L1000 500 L1080 500 L1120 460 L1200 460 L1440 460"
                  data-oid="c7_tcyr"
                />
              </circle>

              {/* Additional particles for new paths */}
              <circle
                r="2"
                fill="#00cddd"
                filter="url(#node-glow)"
                data-oid="1tngn9c"
              >
                <animateMotion
                  dur="15s"
                  repeatCount="indefinite"
                  path="M0 700 L240 700 L340 700 L380 660 L480 660 L520 700 L620 700 L660 660 L690 660 L720 700 L750 660 L780 660 L820 700 L920 700 L960 660 L1060 660 L1100 700 L1200 700 L1440 700"
                  data-oid="vm22pwz"
                />
              </circle>

              <circle
                r="2"
                fill="#06b6d4"
                filter="url(#node-glow)"
                data-oid="f.p08l1"
              >
                <animateMotion
                  dur="13s"
                  repeatCount="indefinite"
                  path="M0 780 L240 780 L320 780 L360 820 L460 820 L500 780 L580 780 L620 820 L680 820 L720 780 L760 820 L820 820 L860 780 L940 780 L980 820 L1080 820 L1120 780 L1200 780 L1440 780"
                  data-oid="se3i2_c"
                />
              </circle>

              {/* Vertical paths */}
              <circle
                r="1.5"
                fill="#0891b2"
                filter="url(#node-glow)"
                data-oid="vmpr.e5"
              >
                <animateMotion
                  dur="6s"
                  repeatCount="indefinite"
                  path="M480 260 L480 860"
                  data-oid="4ms45c8"
                />
              </circle>

              <circle
                r="1.5"
                fill="#0891b2"
                filter="url(#node-glow)"
                data-oid="67b97hl"
              >
                <animateMotion
                  dur="6s"
                  repeatCount="indefinite"
                  path="M960 260 L960 860"
                  data-oid="p9l.vhr"
                />
              </circle>

              {/* Hexagon orbit */}
              <circle
                r="1.5"
                fill="#00cddd"
                filter="url(#node-glow)"
                data-oid="od2x2w4"
              >
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path="M720 350 L765 375 L765 425 L720 450 L675 425 L675 375 Z"
                  data-oid="z0s1f5a"
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
              data-oid="yps8sjp"
            />

            {/* Logo */}
            <motion.image
              href="/icons/artintel-logo.png"
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
              data-oid="yavjjug"
            />

            {/* Pulse effects at key intersections */}
            <g className="pulse-effects" data-oid="nsdxko6">
              <circle
                cx="720"
                cy="400"
                r="12"
                fill="none"
                stroke="#00cddd"
                strokeWidth="0.8"
                data-oid="a0be-4j"
              >
                <animate
                  attributeName="r"
                  values="12;24;12"
                  dur="6s"
                  repeatCount="indefinite"
                  data-oid="o6kw.jo"
                />

                <animate
                  attributeName="opacity"
                  values="0.6;0.2;0.6"
                  dur="6s"
                  repeatCount="indefinite"
                  data-oid="7mf._b5"
                />
              </circle>

              <circle
                cx="720"
                cy="400"
                r="20"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="0.6"
                data-oid="5h64uif"
              >
                <animate
                  attributeName="r"
                  values="20;36;20"
                  dur="8s"
                  repeatCount="indefinite"
                  data-oid="8:o8.hd"
                />

                <animate
                  attributeName="opacity"
                  values="0.4;0.1;0.4"
                  dur="8s"
                  repeatCount="indefinite"
                  data-oid=".y3ncds"
                />
              </circle>
            </g>
          </svg>
        </div>
      )}
    </AnimatePresence>
  );
}
