import React from "react";
import { cn } from "@/lib";
import AnimationContainer from "../global/animation-container";

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
  delay?: number;
}

const StatCard = ({ value, label, className, delay = 0 }: StatCardProps) => {
  return (
    <AnimationContainer animation="fadeUp" delay={delay} data-oid="6:.-1:v">
      <div
        className={cn("flex flex-col items-center text-center p-6", className)}
        data-oid="0-h2mvg"
      >
        <h3
          className="text-3xl md:text-4xl font-bold text-[#00cbdd] mb-2"
          data-oid="32lumak"
        >
          {value}
        </h3>
        <p className="text-sm text-muted-foreground" data-oid="7lb3ah5">
          {label}
        </p>
      </div>
    </AnimationContainer>
  );
};

export { StatCard };
