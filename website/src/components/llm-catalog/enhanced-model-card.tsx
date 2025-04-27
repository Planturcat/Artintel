"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Brain, Zap, Layers } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import "./llm-styles.css";

interface EnhancedModelCardProps {
  name: string;
  description: string;
  parameterCount: string;
  contextWindow: string;
  specialties: string[];
  tier: "Standard" | "Premium" | "Enterprise";
}

export default function EnhancedModelCard({
  name,
  description,
  parameterCount,
  contextWindow,
  specialties,
  tier,
}: EnhancedModelCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // For 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // Get tier color
  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Standard":
        return "text-green-500";
      case "Premium":
        return "text-primary";
      case "Enterprise":
        return "text-purple-500";
      default:
        return "text-muted-foreground";
    }
  };

  // Get tier background
  const getTierBackground = (tier: string) => {
    switch (tier) {
      case "Standard":
        return "bg-green-500/10";
      case "Premium":
        return "bg-primary/10";
      case "Enterprise":
        return "bg-purple-500/10";
      default:
        return "bg-muted/10";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="model-card h-full"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ z: 10 }}
      data-oid="4rnh-sw"
    >
      <div
        className="border border-border/40 rounded-lg p-6 bg-card/30 hover:border-primary/50 transition-all h-full flex flex-col relative overflow-hidden"
        data-oid="iq3eqoa"
      >
        {/* Background neural pattern */}
        <div
          className="absolute inset-0 neural-pattern opacity-10 z-0"
          data-oid=":::15nh"
        ></div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg z-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          data-oid="ytogfsv"
        />

        {/* Content */}
        <div className="relative z-10" data-oid="0bf-1b6">
          <div
            className="flex justify-between items-start mb-2"
            data-oid="3gu08dm"
          >
            <div data-oid="hl5sd1:">
              <motion.h3
                className="text-xl font-mono font-bold"
                animate={{
                  textShadow: isHovered
                    ? "0 0 8px rgba(124, 58, 237, 0.5)"
                    : "none",
                }}
                transition={{ duration: 0.3 }}
                data-oid="quve7_2"
              >
                {name}
              </motion.h3>
              <div
                className="text-xs text-primary font-mono"
                data-oid=":jp0:8q"
              >
                {parameterCount} parameters
              </div>
            </div>

            <motion.div
              className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(tier)} ${getTierBackground(tier)} border border-current/30`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              data-oid="ylia9h7"
            >
              {tier}
            </motion.div>
          </div>

          <p className="text-sm text-muted-foreground mb-4" data-oid="kew:oy7">
            {description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4" data-oid="cngmadp">
            <div data-oid="oz987ny">
              <div
                className="text-xs uppercase tracking-wider text-muted-foreground mb-1"
                data-oid="bte3zlp"
              >
                Parameters
              </div>
              <div
                className="text-sm font-mono flex items-center gap-1"
                data-oid=".zwhslj"
              >
                <Layers className="h-3 w-3 text-primary" data-oid="95b_woj" />
                {parameterCount}
              </div>
            </div>

            <div data-oid="4hfcfcy">
              <div
                className="text-xs uppercase tracking-wider text-muted-foreground mb-1"
                data-oid="r52s3fm"
              >
                Context
              </div>
              <div
                className="text-sm font-mono flex items-center gap-1"
                data-oid="cl6m.a8"
              >
                <Zap className="h-3 w-3 text-primary" data-oid="icupyu2" />
                {contextWindow}
              </div>
            </div>
          </div>

          <div className="mb-4" data-oid="d3s_4in">
            <div
              className="text-xs uppercase tracking-wider text-muted-foreground mb-1"
              data-oid="6ke4x.k"
            >
              Specialties
            </div>
            <div className="flex flex-wrap gap-1.5" data-oid="bxw_ew9">
              {specialties.map((specialty, i) => (
                <motion.span
                  key={i}
                  className="inline-block px-2 py-0.5 bg-background/50 border border-border/30 rounded-full text-xs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  whileHover={{
                    backgroundColor: "rgba(124, 58, 237, 0.1)",
                    borderColor: "rgba(124, 58, 237, 0.3)",
                  }}
                  data-oid="6rkpcwl"
                >
                  {specialty}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="mt-auto flex gap-2" data-oid="-hp1it5">
            <Button
              className="flex-1 bg-primary hover:bg-primary/90"
              data-oid="gxnj.9:"
            >
              Try Model
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              data-oid="e-:kx21"
            >
              <ExternalLink className="h-4 w-4" data-oid="6zmf45." />
            </Button>
          </div>
        </div>

        {/* Animated corner accents */}
        <motion.div
          className="absolute top-0 left-0 w-8 h-8 border-r border-b border-primary/0"
          animate={{
            borderColor: isHovered
              ? "rgba(124, 58, 237, 0.4)"
              : "rgba(124, 58, 237, 0)",
          }}
          transition={{ duration: 0.3 }}
          data-oid="1yqeytn"
        />

        <motion.div
          className="absolute bottom-0 right-0 w-8 h-8 border-l border-t border-primary/0"
          animate={{
            borderColor: isHovered
              ? "rgba(124, 58, 237, 0.4)"
              : "rgba(124, 58, 237, 0)",
          }}
          transition={{ duration: 0.3 }}
          data-oid="aj:a_q-"
        />

        {/* Data flow animation on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 data-flow z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-oid="1qh96u3"
          />
        )}

        {/* Brain visualization on hover */}
        {isHovered && (
          <motion.div
            className="absolute -right-10 -bottom-10 w-40 h-40 opacity-10 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-oid="6v18af9"
          >
            <Brain className="w-full h-full text-primary" data-oid="0ft-qhz" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
