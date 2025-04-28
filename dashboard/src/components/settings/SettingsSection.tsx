import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { LucideIcon } from 'lucide-react';

interface SettingsSectionProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
}

export default function SettingsSection({
  title,
  description,
  icon: Icon,
  children,
  className = ''
}: SettingsSectionProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        relative overflow-hidden rounded-xl border border-[#00cbdd]/10
        backdrop-blur-xl transition-all duration-200
        ${className}
      `}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00cbdd]/5 to-transparent opacity-50" />
      
      <div className="relative p-6 z-10">
        <div className="flex items-start space-x-4 mb-6">
          <div className="p-2 bg-gradient-to-br from-[#00cbdd]/20 to-[#00cbdd]/5 rounded-lg">
            <Icon className="h-5 w-5 text-[#00cbdd]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-[#00cbdd] to-[#00cbdd]/50 bg-clip-text text-transparent">
              {title}
            </h3>
            {description && (
              <p className="mt-1 text-sm text-gray-400">{description}</p>
            )}
          </div>
        </div>
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
