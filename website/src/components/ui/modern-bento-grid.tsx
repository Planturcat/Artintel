"use client";

import React from "react";
import { cn } from "@/lib";
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle, ModernCardDescription } from "./modern-card";
import { motion } from "framer-motion";

interface BentoGridItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  variant?: "default" | "gradient" | "glass" | "glow";
}

interface ModernBentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  items: BentoGridItem[];
}

export function ModernBentoGrid({
  title,
  description,
  items,
  className,
  ...props
}: ModernBentoGridProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      {title && (
        <h2 className="text-3xl font-bold mb-4 text-center text-gradient-primary">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
          {description}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <BentoGridItem
              title={item.title}
              description={item.description}
              icon={item.icon}
              variant={item.variant || "default"}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BentoGridItem({
  title,
  description,
  icon,
  variant = "default",
}: BentoGridItem) {
  const getCardProps = () => {
    switch (variant) {
      case "gradient":
        return {
          variant: "gradient" as const,
          interactive: true,
        };
      case "glass":
        return {
          variant: "glass" as const,
          interactive: true,
        };
      case "glow":
        return {
          variant: "glass" as const,
          interactive: true,
          glowColor: "rgba(124, 58, 237, 0.2)",
        };
      default:
        return {
          variant: "default" as const,
          interactive: true,
        };
    }
  };

  return (
    <ModernCard className="h-full" {...getCardProps()}>
      <ModernCardHeader>
        <div className="flex items-center gap-2">
          {icon && <div>{icon}</div>}
          <ModernCardTitle>{title}</ModernCardTitle>
        </div>
      </ModernCardHeader>
      <ModernCardContent>
        <ModernCardDescription>{description}</ModernCardDescription>
      </ModernCardContent>
    </ModernCard>
  );
}
