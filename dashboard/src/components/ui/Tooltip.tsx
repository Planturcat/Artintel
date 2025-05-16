'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  };

  const getArrowStyles = () => {
    switch (position) {
      case 'top':
        return 'bottom-[-6px] left-1/2 -translate-x-1/2 border-t-[#00cbdd] border-x-transparent border-b-transparent';
      case 'bottom':
        return 'top-[-6px] left-1/2 -translate-x-1/2 border-b-[#00cbdd] border-x-transparent border-t-transparent';
      case 'left':
        return 'right-[-6px] top-1/2 -translate-y-1/2 border-l-[#00cbdd] border-y-transparent border-r-transparent';
      case 'right':
        return 'left-[-6px] top-1/2 -translate-y-1/2 border-r-[#00cbdd] border-y-transparent border-l-transparent';
      default:
        return 'bottom-[-6px] left-1/2 -translate-x-1/2 border-t-[#00cbdd] border-x-transparent border-b-transparent';
    }
  };

  return (
    <div
      ref={ref}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className={`
              absolute z-50 px-2 py-1 text-sm rounded-lg whitespace-nowrap
              ${getPositionStyles()}
              ${isDark 
                ? 'bg-[#00091b]/90 border border-[#00cbdd]/20 text-white' 
                : 'bg-white border border-[#00cbdd]/10 text-gray-900'
              }
              shadow-lg backdrop-blur-md
            `}
          >
            {content}
            <div
              className={`
                absolute w-0 h-0
                border-[6px] border-solid
                ${getArrowStyles()}
              `}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Add display name for React DevTools
Tooltip.displayName = 'Tooltip'; 