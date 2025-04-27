import React from 'react';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModelCardProps {
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'pending';
  version: string;
  createdTime: string;
  onClick?: () => void;
  className?: string;
}

export const ModelCard: React.FC<ModelCardProps> = ({
  name,
  description,
  status,
  version,
  createdTime,
  onClick,
  className,
}) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) onClick();
    }
  };

  const statusColors = {
    active: 'bg-[#00cbdd]/10 text-[#00cbdd]',
    inactive: 'bg-white/10 text-white/70',
    pending: 'bg-amber-500/10 text-amber-500',
  };

  return (
    <div
      className={cn(
        "rounded-xl bg-[#00031b] border border-[#00cbdd]/20 p-4 hover:bg-[#00031b]/80 hover:border-[#00cbdd]/40 transition-colors",
        onClick ? "cursor-pointer" : "",
        className
      )}
      onClick={onClick ? handleClick : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      aria-label={`Model: ${name} - ${description}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="h-10 w-10 rounded-lg bg-[#00cbdd] flex items-center justify-center">
          <Bot className="h-6 w-6 text-[#00031b]" />
        </div>
        <div className={cn("text-xs px-2 py-1 rounded-full", statusColors[status])}>
          {status === 'active' ? 'Active' : status === 'pending' ? 'Pending' : 'Inactive'}
        </div>
      </div>
      <h3 className="font-medium mb-1">{name}</h3>
      <p className="text-sm text-white/70 mb-3">{description}</p>
      <div className="flex justify-between text-xs text-white/50">
        <span>{createdTime}</span>
        <span>{version}</span>
      </div>
    </div>
  );
};

export default ModelCard; 