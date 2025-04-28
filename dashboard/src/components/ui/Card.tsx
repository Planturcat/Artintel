import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg',
          isDark
            ? 'bg-[#00031b]/90 border border-[#00cbdd]/20 backdrop-blur-md'
            : 'bg-white border border-[#00cbdd]/10 shadow-sm backdrop-blur-md',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export default Card; 