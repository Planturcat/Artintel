import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface Option {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
}

interface ModernSelectProps {
  label?: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  error?: string;
}

export default function ModernSelect({
  label,
  description,
  value,
  onChange,
  options,
  error
}: ModernSelectProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Use useMemo to prevent unnecessary re-renders
  const selectedOption = useMemo(() => 
    options.find(option => option.value === value), 
    [options, value]
  );

  return (
    <div className="space-y-1">
      {label && (
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
          {label}
        </label>
      )}
      {description && (
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {description}
        </p>
      )}
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <div className="relative">
            <motion.div
              animate={{
                scale: open ? 1.02 : 1,
                boxShadow: open 
                  ? '0 0 0 2px rgba(0, 203, 221, 0.1)' 
                  : '0 0 0 1px rgba(0, 203, 221, 0.05)'
              }}
            >
              <Listbox.Button className={`
                relative w-full rounded-lg border
                ${isDark 
                  ? 'bg-black/40 backdrop-blur-sm border-[#00cbdd]/10 hover:border-[#00cbdd]/20' 
                  : 'bg-white border-gray-300 hover:border-gray-400'
                }
                py-2.5 pl-4 pr-10 text-left
                transition-all duration-200
                focus:outline-none ${isDark ? 'focus:border-[#00cbdd]/30' : 'focus:border-blue-500'}
                ${error ? 'border-red-500/50' : ''}
              `}>
                <span className="flex items-center space-x-3">
                  {selectedOption?.icon}
                  <span className={`block truncate ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    {selectedOption?.label || 'Select an option'}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ChevronDown
                    className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'} transition-transform duration-200 ${
                      open ? 'rotate-180' : ''
                    }`}
                  />
                </span>
                <div className="absolute inset-0 rounded-lg pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00cbdd]/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </div>
              </Listbox.Button>
            </motion.div>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className={`
                absolute z-10 mt-2 w-full rounded-lg
                ${isDark 
                  ? 'bg-[#00031b]/95 backdrop-blur-xl border-[#00cbdd]/10' 
                  : 'bg-white border-gray-200'
                }
                border py-2 shadow-lg
                focus:outline-none
              `}>
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option.value}
                    className={({ active, selected }) => `
                      relative cursor-pointer select-none py-2 pl-4 pr-9
                      transition-colors duration-200
                      ${active 
                        ? isDark ? 'bg-[#00cbdd]/10' : 'bg-blue-50' 
                        : ''
                      }
                      ${selected 
                        ? isDark ? 'text-[#00cbdd]' : 'text-blue-700' 
                        : isDark ? 'text-gray-200' : 'text-gray-700'
                      }
                    `}
                  >
                    {({ selected }) => (
                      <>
                        <div className="flex items-center space-x-3">
                          {option.icon}
                          <div>
                            <span className={`block truncate ${selected ? 'font-semibold' : ''}`}>
                              {option.label}
                            </span>
                            {option.description && (
                              <span className={`block truncate text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {option.description}
                              </span>
                            )}
                          </div>
                        </div>
                        {selected && (
                          <span className={`absolute inset-y-0 right-0 flex items-center pr-3 ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'}`}>
                            <Check className="h-4 w-4" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}