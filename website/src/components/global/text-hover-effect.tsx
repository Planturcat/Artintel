"use client";

import React, { useState } from "react";
import { cn } from "@/lib";

interface TextHoverEffectProps {
  text: string;
  className?: string;
}

const TextHoverEffect = ({ text, className }: TextHoverEffectProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Split text into individual characters for letter-by-letter animation
  const characters = text.split('');

  return (
    <div
      className={cn("relative flex items-center justify-center overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex">
        {characters.map((char, index) => (
          <span
            key={`${char}-${index}`}
            className={cn(
              "text-4xl md:text-6xl font-bold transition-all duration-200",
              isHovered ? "text-primary transform hover:scale-110" : "text-gray-700"
            )}
            style={{
              transitionDelay: `${index * 30}ms`,
              transform: isHovered ? `translateY(-${Math.random() * 10}px)` : 'none'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TextHoverEffect;
