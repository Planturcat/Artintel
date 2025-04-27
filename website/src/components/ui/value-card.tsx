import React from "react";
import { cn } from "@/lib";
import AnimationContainer from "../global/animation-container";

interface ValueCardProps {
  title: string;
  description: string;
  icon: string;
  className?: string;
  delay?: number;
}

const ValueCard = ({
  title,
  description,
  icon,
  className,
  delay = 0,
}: ValueCardProps) => {
  return (
    <AnimationContainer animation="fadeUp" delay={delay}>
      <div
        className={cn(
          "bg-[#181818] p-8 rounded-2xl h-full flex flex-col items-center text-center",
          className,
        )}
      >
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-medium mb-3 text-white">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </AnimationContainer>
  );
};

export { ValueCard };
