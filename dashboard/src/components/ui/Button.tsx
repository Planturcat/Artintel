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
            ? 'border border-[#00cbdd]/30 hover:bg-[#00cbdd]/15 text-white'
            : 'border border-[#00cbdd]/30 hover:border-[#00cbdd] text-[#00cbdd] hover:text-[#00cbdd]';
        case 'ghost':
          return isDark
            ? 'hover:bg-[#00cbdd]/15 text-white'
            : 'hover:bg-[#00cbdd]/10 text-[#00cbdd]';
        default:
          return 'bg-gradient-to-r from-[#00cbdd] to-[#0066ff] text-white hover:opacity-90';
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
            <span className="ml-2 text-white">Loading...</span>
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