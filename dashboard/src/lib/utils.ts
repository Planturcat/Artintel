import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get text color class for a status
 */
export function getStatusColor(status: 'success' | 'warning' | 'error' | 'info', isDark: boolean) {
  switch(status) {
    case 'success':
      return isDark ? 'text-success-500' : 'text-success-700';
    case 'warning':
      return isDark ? 'text-warning-500' : 'text-warning-700';
    case 'error':
      return isDark ? 'text-error-500' : 'text-error-700';
    case 'info':
    default:
      return isDark ? 'text-[#00cbdd]' : 'text-[#007a85]';
  }
}

/**
 * Get background color class for a status
 */
export function getStatusBgColor(status: 'success' | 'warning' | 'error' | 'info', isDark: boolean) {
  switch(status) {
    case 'success':
      return isDark ? 'bg-success-500/10' : 'bg-success-500/10';
    case 'warning':
      return isDark ? 'bg-warning-500/10' : 'bg-warning-500/10';
    case 'error':
      return isDark ? 'bg-error-500/10' : 'bg-error-500/10';
    case 'info':
    default:
      return isDark ? 'bg-[#00cbdd]/10' : 'bg-[#00cbdd]/10';
  }
}