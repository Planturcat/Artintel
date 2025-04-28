'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-white transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00cbdd] focus-visible:ring-offset-2',
            isDark
              ? 'bg-[#00031b]/50 border border-[#00cbdd]/20 text-white placeholder:text-gray-400'
              : 'bg-white border border-[#00cbdd]/10 text-gray-900 placeholder:text-gray-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-red-500' : '',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

// Add display name for React DevTools
Input.displayName = 'Input';

export default Input; 