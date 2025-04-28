"use client";

import { useTheme } from '@/contexts/ThemeContext';
import { Squares } from './ui/squares-background';

interface HeroBackgroundGridProps {
  className?: string;
}

export default function HeroBackgroundGrid({ className = '' }: HeroBackgroundGridProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`absolute inset-0 w-full h-full z-0 ${className}`}>
      <Squares 
        direction="diagonal"
        speed={0.5}
        squareSize={40}
        borderColor={isDark ? "rgba(0, 203, 221, 0.1)" : "rgba(0, 3, 27, 0.1)"}
        hoverFillColor={isDark ? "rgba(0, 203, 221, 0.15)" : "rgba(0, 203, 221, 0.1)"}
        className="absolute inset-0"
      />
    </div>
  );
} 