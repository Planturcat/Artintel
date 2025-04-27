import React from "react";
import { cn } from "@/lib";
import AnimationContainer from "../global/animation-container";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  position: "left" | "right";
  delay?: number;
}

const TimelineItem = ({
  year,
  title,
  description,
  position,
  delay = 0,
}: TimelineItemProps) => {
  return (
    <AnimationContainer
      animation={position === "left" ? "fadeRight" : "fadeLeft"}
      delay={delay}
    >
      <div
        className={`flex ${
          position === "left" ? "flex-row" : "flex-row-reverse"
        } items-center gap-8`}
      >
        <div className="w-1/2 flex flex-col gap-2">
          <div className="text-2xl font-bold text-[#00cbdd]">{year}</div>
          <h3 className="text-xl font-medium text-white">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="relative w-1/2 flex justify-center">
          <div
            className={`absolute w-4 h-4 bg-[#00cbdd] rounded-full ${
              position === "left"
                ? "left-0 -translate-x-1/2"
                : "right-0 translate-x-1/2"
            } transform`}
          ></div>
          <div className="w-3 h-3 bg-[#00cbdd] rounded-full relative z-10"></div>
        </div>
      </div>
    </AnimationContainer>
  );
};

interface TimelineProps {
  items: Array<{
    year: string;
    title: string;
    description: string;
  }>;
  className?: string;
}

const Timeline = ({ items, className }: TimelineProps) => {
  return (
    <div className={cn("relative w-full max-w-4xl", className)}>
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#00cbdd] to-[#0891b2] rounded-full"></div>

      <div className="flex flex-col gap-12">
        {items.map((item, index) => (
          <TimelineItem
            key={index}
            year={item.year}
            title={item.title}
            description={item.description}
            position={index % 2 === 0 ? "left" : "right"}
            delay={0.4 + index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export { Timeline, TimelineItem };
