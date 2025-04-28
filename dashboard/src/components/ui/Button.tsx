'use client';

import { forwardRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = '', 
    variant = 'default', 
    size = 'md', 
    loading = false,
    disabled,
    children,
    ...props 
  }, ref) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const getVariantStyles = () => {
      switch (variant) {
        case 'outline':
          return isDark
            ? 'border border-[#00cbdd]/20 hover:bg-[#00cbdd]/10 text-white'
            : 'border border-gray-200 hover:border-[#00cbdd] text-gray-700 hover:text-[#00cbdd]';
        case 'ghost':
          return isDark
            ? 'hover:bg-white/10'
            : 'hover:bg-gray-100';
        default:
          return 'bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white hover:opacity-90';
      }
    };

    const getSizeStyles = () => {
      switch (size) {
        case 'sm':
          return 'px-3 py-1.5 text-sm';
        case 'lg':
          return 'px-6 py-3 text-lg';
        default:
          return 'px-4 py-2';
      }
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          relative rounded-lg font-medium transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${getVariantStyles()}
          ${getSizeStyles()}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span className="ml-2">Loading...</span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

// Add display name for React DevTools
Button.displayName = 'Button';

export default Button; 