import { motion } from 'framer-motion';

interface ModernToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export default function ModernToggle({
  enabled,
  onChange,
  label,
  description,
  disabled = false
}: ModernToggleProps) {
  return (
    <div className={`flex items-center justify-between ${disabled ? 'opacity-50' : ''}`}>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-sm font-medium text-gray-200">{label}</span>
          )}
          {description && (
            <span className="text-xs text-gray-400">{description}</span>
          )}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        disabled={disabled}
        onClick={() => !disabled && onChange(!enabled)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-all duration-300 ease-spring
          focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/50 focus:ring-offset-2 focus:ring-offset-[#00031b]
          ${enabled 
            ? 'bg-gradient-to-r from-[#00cbdd] to-[#00cbdd]/80' 
            : 'bg-gradient-to-r from-gray-700 to-gray-600'
          }
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}
        `}
      >
        <span className="sr-only">Toggle setting</span>
        <motion.span
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
          initial={false}
          animate={{
            x: enabled ? '1.25rem' : '0.125rem',
            scale: enabled ? 1.1 : 1,
            backgroundColor: enabled ? '#fff' : '#94a3b8'
          }}
          className={`
            inline-block h-4 w-4 transform rounded-full
            shadow-lg transition-colors duration-200
          `}
        />
      </button>
    </div>
  );
}