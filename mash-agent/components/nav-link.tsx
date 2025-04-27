import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  icon,
  children,
  isActive = false,
  onClick,
  className,
}) => {
  return (
    <Link 
      href={href}
      className={cn(
        "text-sm transition flex items-center gap-1",
        isActive ? "text-[#00cbdd]" : "text-white/80 hover:text-[#00cbdd]",
        className
      )}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
    >
      {icon}
      {children}
    </Link>
  );
};

export default NavLink; 