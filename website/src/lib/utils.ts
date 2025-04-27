import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Main utility for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Delay execution for a specific amount of time
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Detect if the user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Generate random number between min and max (inclusive)
export function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Safely parse JSON with a fallback
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    return fallback;
  }
}

// Debounce function for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Get viewport dimensions
export function getViewportDimensions() {
  if (typeof window === 'undefined') return { width: 0, height: 0 };
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

// Format CSS variable name
export function cssVar(name: string): string {
  return `var(--${name})`;
}

// Create a CSS variable style object for React components
export function createCssVars(vars: Record<string, string | number>): React.CSSProperties {
  return Object.entries(vars).reduce((acc, [key, value]) => {
    acc[`--${key}`] = value.toString();
    return acc;
  }, {} as React.CSSProperties);
}

// Throttle function for performance optimization
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Check if an element is in viewport
export function isInViewport(element: HTMLElement, offset = 0): boolean {
  if (typeof window === 'undefined') return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= window.innerHeight - offset &&
    rect.bottom >= 0 + offset &&
    rect.left <= window.innerWidth - offset &&
    rect.right >= 0 + offset
  );
}

// Generate unique ID
export function generateId(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
} 