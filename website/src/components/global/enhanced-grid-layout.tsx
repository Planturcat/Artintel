"use client";

import React, { useState } from 'react';
import { cn, createCssVars } from '@/lib';
import { useDelayedAnimation } from '@/lib/hooks';

export interface GridItem {
  id: string;
  content: React.ReactNode;
  gridArea?: string;
  className?: string;
  animationDelay?: number;
  interactive?: boolean;
}

export interface EnhancedGridLayoutProps {
  items: GridItem[];
  className?: string;
  containerClassName?: string;
  columns?: number;
  rows?: number;
  gap?: number;
  responsive?: boolean;
  backgroundColor?: string;
  highlightColor?: string;
  animationDuration?: number;
  onItemClick?: (id: string) => void;
}

const EnhancedGridLayout: React.FC<EnhancedGridLayoutProps> = ({
  items,
  className,
  containerClassName,
  columns = 5,
  rows = 4,
  gap = 2,
  responsive = true,
  backgroundColor = 'linear-gradient(165deg, rgba(0, 0, 0, 1) 0%, rgba(171, 0, 0, 1) 75%, rgba(255, 244, 0, 1) 100%)',
  highlightColor = 'rgba(255, 255, 255, 0.3)',
  animationDuration = 0.2,
  onItemClick
}) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const { ref, isInView } = useDelayedAnimation(0, 0.2);

  const handleItemClick = (id: string) => {
    setActiveItem(id === activeItem ? null : id);
    if (onItemClick) onItemClick(id);
  };

  const handleItemKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleItemClick(id);
    }
  };

  const gridVars = createCssVars({
    columns: columns,
    rows: rows,
    gap: `${gap}px`,
    animation: `${animationDuration}s`,
    highlight: highlightColor
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        'grid-wrapper',
        isInView && 'opacity-100 translate-y-0',
        !isInView && 'opacity-0 translate-y-4',
        'transition-all duration-700',
        className
      )}
    >
      <div
        className={cn(
          'enhanced-grid-container',
          'p-4 rounded-md shadow-lg',
          containerClassName
        )}
        style={{
          ...gridVars,
          background: backgroundColor,
          display: 'grid',
          gridTemplateColumns: `repeat(var(--columns), ${responsive ? 'minmax(40px, 1fr)' : '50px'})`,
          gridTemplateRows: `repeat(var(--rows), ${responsive ? 'minmax(40px, auto)' : '50px'})`,
          gap: 'var(--gap)',
          boxShadow: '0 0 32px inset rgba(255, 255, 255, 0.329), 0 0 40px rgba(0, 0, 0, 0.67)'
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              'enhanced-grid-item',
              'flex items-center justify-center font-bold rounded',
              'transition-all cursor-default backdrop-blur-sm',
              'bg-white/30 shadow-inner border border-white/20',
              item.interactive && 'cursor-pointer hover:scale-105',
              activeItem === item.id && 'scale-105 bg-white/50',
              item.className
            )}
            style={{
              gridArea: item.gridArea || '',
              transitionDuration: `calc(var(--animation) * ${1 + (item.animationDelay || 0)})`,
              animationDelay: item.animationDelay ? `${item.animationDelay}s` : undefined
            }}
            onClick={item.interactive ? () => handleItemClick(item.id) : undefined}
            onKeyDown={item.interactive ? (e) => handleItemKeyDown(e, item.id) : undefined}
            tabIndex={item.interactive ? 0 : -1}
            aria-pressed={activeItem === item.id}
            role={item.interactive ? 'button' : 'presentation'}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedGridLayout;