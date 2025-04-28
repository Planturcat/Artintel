import { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode, useState } from 'react';
import { motion } from 'framer-motion';

interface BaseProps {
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  icon?: ReactNode;
  multiline?: boolean;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseProps {}
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseProps {}

type ModernInputProps = InputProps | TextareaProps;

export default function ModernInput({
  label,
  description,
  error,
  success,
  icon,
  multiline = false,
  className = '',
  ...props
}: ModernInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const baseClassName = `
    block w-full rounded-lg border
    bg-black/40 backdrop-blur-sm
    transition-all duration-200
    ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5
    text-gray-200 placeholder-gray-500
    border-[#00cbdd]/10 hover:border-[#00cbdd]/20
    focus:outline-none focus:border-[#00cbdd]/30
    ${error ? 'border-red-500/50 focus:border-red-500' : ''}
    ${success ? 'border-green-500/50 focus:border-green-500' : ''}
    ${className}
  `;

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-200">
          {label}
        </label>
      )}
      {description && (
        <p className="text-xs text-gray-400">
          {description}
        </p>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <motion.div
          animate={{
            scale: isFocused ? 1.02 : 1,
            boxShadow: isFocused 
              ? '0 0 0 2px rgba(0, 203, 221, 0.1)' 
              : '0 0 0 1px rgba(0, 203, 221, 0.05)'
          }}
          className="relative"
        >
          {multiline ? (
            <textarea
              {...(props as TextareaProps)}
              rows={4}
              onFocus={(e) => {
                setIsFocused(true);
                if ((props as TextareaProps).onFocus) {
                  (props as TextareaProps).onFocus(e);
                }
              }}
              onBlur={(e) => {
                setIsFocused(false);
                if ((props as TextareaProps).onBlur) {
                  (props as TextareaProps).onBlur(e);
                }
              }}
              className={baseClassName}
            />
          ) : (
            <input
              {...(props as InputProps)}
              onFocus={(e) => {
                setIsFocused(true);
                if ((props as InputProps).onFocus) {
                  (props as InputProps).onFocus(e);
                }
              }}
              onBlur={(e) => {
                setIsFocused(false);
                if ((props as InputProps).onBlur) {
                  (props as InputProps).onBlur(e);
                }
              }}
              className={baseClassName}
            />
          )}
          <div className="absolute inset-0 rounded-lg pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00cbdd]/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </div>
        </motion.div>
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-1 text-xs text-green-500">
          {success}
        </p>
      )}
    </div>
  );
}