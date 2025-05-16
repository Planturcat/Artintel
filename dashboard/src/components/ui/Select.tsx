'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronDown } from 'lucide-react';
import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
  className?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ value, onChange, options, placeholder = 'Select an option', error, className = '', ...props }, ref) => {
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const refDiv = useRef<HTMLDivElement>(null);
    const isDark = theme === 'dark';

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (refDiv.current && !refDiv.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(option => option.value === value);

    return (
      <div ref={refDiv} className="relative">
        <select
          className={cn(
            'flex h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-white transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00cbdd] focus-visible:ring-offset-2',
            isDark
              ? 'bg-[#00091b]/50 border border-[#00cbdd]/20 text-white'
              : 'bg-white border border-[#00cbdd]/10 text-gray-900',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full px-3 py-2 rounded-lg cursor-pointer
            flex items-center justify-between
            transition-all duration-200
            ${isDark 
              ? 'bg-[#00091b]/50 border border-[#00cbdd]/20 text-white' 
              : 'bg-white border border-gray-200 text-gray-900'
            }
            ${error ? 'border-red-500' : ''}
          `}
        >
          <span className={!selectedOption ? 'text-gray-500' : ''}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`
                absolute z-50 w-full mt-1 rounded-lg shadow-lg
                ${isDark 
                  ? 'bg-[#00091b]/90 border border-[#00cbdd]/20' 
                  : 'bg-white border border-gray-200'
                }
              `}
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`
                    px-3 py-2 cursor-pointer first:rounded-t-lg last:rounded-b-lg
                    ${isDark 
                      ? 'hover:bg-[#00cbdd]/10' 
                      : 'hover:bg-gray-50'
                    }
                    ${option.value === value 
                      ? isDark 
                        ? 'bg-[#00cbdd]/20 text-[#00cbdd]' 
                        : 'bg-[#00cbdd]/10 text-[#00cbdd]'
                      : isDark 
                        ? 'text-white' 
                        : 'text-gray-900'
                    }
                  `}
                >
                  {option.label}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select; 