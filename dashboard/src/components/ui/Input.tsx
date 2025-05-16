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
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00cbdd]/30 focus-visible:ring-offset-2',
            isDark
              ? 'bg-cosmic-800 border border-[#00cbdd]/25 text-white placeholder:text-[#7fe4eb]/50'
              : 'bg-white border border-[#00cbdd]/20 text-[#00cbdd] placeholder:text-[#00cbdd]/50',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-error-500' : '',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error-500">
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