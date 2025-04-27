import React from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickActionButtonProps {
  icon: string;
  name: string;
  onClick: (action: string) => void;
  className?: string;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon,
  name,
  onClick,
  className,
}) => {
  const handleClick = () => {
    onClick(name);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(name);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full bg-[#00031b] hover:bg-[#00031b]/80 border border-[#00cbdd]/30 hover:border-[#00cbdd]/60 transition-colors cursor-pointer",
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${name} action`}
    >
      <span>{icon}</span>
      <span className="text-sm">{name}</span>
      <ArrowUp className="h-3 w-3 ml-1" />
    </div>
  );
};

export default QuickActionButton; 