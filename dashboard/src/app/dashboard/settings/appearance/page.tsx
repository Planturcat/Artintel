'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Moon, 
  Sun, 
  Monitor, 
  Palette, 
  Type, 
  Layout, 
  Check,
  Sliders 
} from 'lucide-react';

interface ExtendedSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    tier?: string;
  };
}

export default function AppearanceSettingsPage() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const { data: session } = useSession() as { data: ExtendedSession | null };
  
  // Theme settings
  const [themePreference, setThemePreference] = useState(isDark ? 'dark' : 'light');
  const [accentColor, setAccentColor] = useState('#00cbdd');
  
  // Font settings
  const [fontPreference, setFontPreference] = useState('system');
  const [fontSize, setFontSize] = useState('medium');
  
  // Layout settings
  const [sidebarCompact, setSidebarCompact] = useState(false);
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(true);
  const [contentWidth, setContentWidth] = useState('default');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  // Color theme options
  const accentColorOptions = [
    { name: 'Teal', value: '#00cbdd', label: 'Default' }, 
    { name: 'Blue', value: '#2563eb', label: '' },
    { name: 'Purple', value: '#8b5cf6', label: '' },
    { name: 'Pink', value: '#ec4899', label: '' },
    { name: 'Orange', value: '#f97316', label: '' },
    { name: 'Green', value: '#10b981', label: '' }
  ];
  
  // Font options
  const fontOptions = [
    { name: 'System Font', value: 'system', description: 'Uses your system default font' },
    { name: 'Inter', value: 'inter', description: 'Clean, modern sans-serif' },
    { name: 'Roboto', value: 'roboto', description: 'Google\'s signature font' },
    { name: 'Mono', value: 'mono', description: 'Monospaced font for code' }
  ];
  
  // Font size options
  const fontSizeOptions = [
    { name: 'Small', value: 'small' },
    { name: 'Medium', value: 'medium' },
    { name: 'Large', value: 'large' }
  ];
  
  // Content width options
  const contentWidthOptions = [
    { name: 'Default', value: 'default', description: 'Optimal reading width' },
    { name: 'Wide', value: 'wide', description: 'Maximum screen utilization' },
    { name: 'Narrow', value: 'narrow', description: 'Focused reading experience' }
  ];

  // Update theme when themePreference changes
  useEffect(() => {
    if (themePreference === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme as 'dark' | 'light');
    } else {
      setTheme(themePreference as 'dark' | 'light');
    }
  }, [themePreference, setTheme]);
  
  const handleSaveSettings = () => {
    // Here you would save settings to the user's profile
    toast.success('Appearance settings saved successfully');
  };
  
  const handleRestoreDefaults = () => {
    setThemePreference('system');
    setAccentColor('#00cbdd');
    setFontPreference('system');
    setFontSize('medium');
    setSidebarCompact(false);
    setShowBreadcrumbs(true);
    setContentWidth('default');
    setAnimationsEnabled(true);
    
    toast.success('Default appearance settings restored');
  };

  return (
    <div className={`space-y-6 ${isDark ? 'bg-transparent' : 'bg-white'}`}>
      {/* Header with Back Button */}
      <div className="flex items-center">
        <Link 
          href="/dashboard/settings" 
          className={`mr-4 p-2 rounded-full transition-colors ${
            isDark 
              ? 'hover:bg-gray-800' 
              : 'hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
        </Link>
        <div>
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Appearance Settings
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Customize how your dashboard looks and feels
          </p>
        </div>
      </div>

      {/* Theme Settings Card */}
      <div className={`rounded-xl shadow-sm ${isDark ? 'border border-[#00cbdd]/20 bg-[#00091b]/90 backdrop-blur-md' : 'border-0 bg-white shadow-md'}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-[#00cbdd]/10' : 'bg-slate-100'}`}>
              <Palette className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-slate-600'}`} />
            </div>
            <h2 className={`ml-3 text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Theme
            </h2>
          </div>
          
          <div className="space-y-6">
            {/* Theme Mode Selection */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Theme Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setThemePreference('light')}
                  className={`relative flex items-center justify-center p-4 rounded-lg transition-all ${
                    themePreference === 'light'
                      ? isDark 
                          ? 'border-[#00cbdd] bg-[#00cbdd]/10 border' 
                          : 'border-0 bg-slate-800 text-white shadow-md'
                      : isDark 
                          ? 'border border-gray-800 bg-transparent hover:bg-gray-900/50' 
                          : 'border border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <Sun className={`h-8 w-8 mb-2 ${themePreference === 'light' && !isDark ? 'text-white' : isDark ? 'text-gray-100' : 'text-gray-900'}`} />
                    <span className={`font-medium text-sm ${themePreference === 'light' && !isDark ? 'text-white' : isDark ? 'text-gray-100' : 'text-gray-900'}`}>Light</span>
                  </div>
                  {themePreference === 'light' && (
                    <div className="absolute top-2 right-2">
                      <div className={`p-1 rounded-full ${isDark ? 'bg-[#00cbdd]' : 'bg-white'}`}>
                        <Check className={`h-3 w-3 ${isDark ? 'text-white' : 'text-slate-800'}`} />
                      </div>
                    </div>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => setThemePreference('dark')}
                  className={`relative flex items-center justify-center p-4 rounded-lg transition-all ${
                    themePreference === 'dark'
                      ? isDark 
                          ? 'border-[#00cbdd] bg-[#00cbdd]/10 border' 
                          : 'border-0 bg-slate-800 text-white shadow-md'
                      : isDark 
                          ? 'border border-gray-800 bg-transparent hover:bg-gray-900/50' 
                          : 'border border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <Moon className={`h-8 w-8 mb-2 ${themePreference === 'dark' && !isDark ? 'text-white' : isDark ? 'text-gray-100' : 'text-gray-900'}`} />
                    <span className={`font-medium text-sm ${themePreference === 'dark' && !isDark ? 'text-white' : isDark ? 'text-gray-100' : 'text-gray-900'}`}>Dark</span>
                  </div>
                  {themePreference === 'dark' && (
                    <div className="absolute top-2 right-2">
                      <div className={`p-1 rounded-full ${isDark ? 'bg-[#00cbdd]' : 'bg-white'}`}>
                        <Check className={`h-3 w-3 ${isDark ? 'text-white' : 'text-slate-800'}`} />
                      </div>
                    </div>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => setThemePreference('system')}
                  className={`relative flex items-center justify-center p-4 rounded-lg transition-all ${
                    themePreference === 'system'
                      ? isDark 
                          ? 'border-[#00cbdd] bg-[#00cbdd]/10 border' 
                          : 'border-0 bg-slate-800 text-white shadow-md'
                      : isDark 
                          ? 'border border-gray-800 bg-transparent hover:bg-gray-900/50' 
                          : 'border border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <Monitor className={`h-8 w-8 mb-2 ${themePreference === 'system' && !isDark ? 'text-white' : isDark ? 'text-gray-100' : 'text-gray-900'}`} />
                    <span className={`font-medium text-sm ${themePreference === 'system' && !isDark ? 'text-white' : isDark ? 'text-gray-100' : 'text-gray-900'}`}>System</span>
                  </div>
                  {themePreference === 'system' && (
                    <div className="absolute top-2 right-2">
                      <div className={`p-1 rounded-full ${isDark ? 'bg-[#00cbdd]' : 'bg-white'}`}>
                        <Check className={`h-3 w-3 ${isDark ? 'text-white' : 'text-slate-800'}`} />
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>
            
            {/* Accent Color Selection */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Accent Color
              </label>
              <div className="flex flex-wrap gap-3">
                {accentColorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setAccentColor(color.value)}
                    className={`relative flex items-center justify-center h-10 w-10 rounded-full transition-all ${
                      accentColor === color.value
                        ? 'ring-2 ring-offset-2 ring-offset-black shadow-lg'
                        : ''
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {accentColor === color.value && (
                      <Check className="h-5 w-5 text-white" />
                    )}
                    {color.label && (
                      <span className="absolute -top-2 -right-2 px-1 py-0.5 text-[10px] rounded-full bg-gray-800 text-white">
                        {color.label}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <p className={`mt-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Note: Accent color changes will be applied on your next login
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Typography Settings Card */}
      <div className={`rounded-xl shadow-sm ${isDark ? 'border border-[#00cbdd]/20 bg-[#00091b]/90 backdrop-blur-md' : 'border-0 bg-white shadow-md'}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-[#00cbdd]/10' : 'bg-slate-100'}`}>
              <Type className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-slate-600'}`} />
            </div>
            <h2 className={`ml-3 text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Typography
            </h2>
          </div>
          
          <div className="space-y-6">
            {/* Font Family Selection */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Font Family
              </label>
              <div className="space-y-2">
                {fontOptions.map((font) => (
                  <div 
                    key={font.value}
                    onClick={() => setFontPreference(font.value)}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                      fontPreference === font.value
                        ? isDark 
                            ? 'bg-[#00cbdd]/10 border border-[#00cbdd]/30' 
                            : 'bg-slate-800 text-white shadow-sm'
                        : isDark 
                            ? 'hover:bg-gray-900/50 border border-gray-800' 
                            : 'hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <div className="flex-1">
                      <div className={`font-medium ${
                        fontPreference === font.value && !isDark 
                          ? 'text-white' 
                          : isDark ? 'text-white' : 'text-gray-900'
                      }`}>{font.name}</div>
                      <div className={`text-xs mt-1 ${
                        fontPreference === font.value && !isDark 
                          ? 'text-gray-200' 
                          : isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>{font.description}</div>
                    </div>
                    {fontPreference === font.value && (
                      <div className={`p-1 rounded-full ${isDark ? 'bg-[#00cbdd]' : 'bg-white'}`}>
                        <Check className={`h-3 w-3 ${isDark ? 'text-white' : 'text-slate-800'}`} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Font Size Selection */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Font Size
              </label>
              <div className="flex gap-3">
                {fontSizeOptions.map((size) => (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() => setFontSize(size.value)}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                      fontSize === size.value
                        ? isDark 
                            ? 'bg-[#00cbdd] text-[#00091b]' 
                            : 'bg-slate-800 text-white shadow-sm'
                        : isDark 
                            ? 'bg-gray-900/50 text-gray-300 border border-gray-800 hover:bg-gray-800' 
                            : 'bg-white text-gray-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout Settings Card */}
      <div className={`rounded-xl shadow-sm ${isDark ? 'border border-[#00cbdd]/20 bg-[#00091b]/90 backdrop-blur-md' : 'border-0 bg-white shadow-md'}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-[#00cbdd]/10' : 'bg-slate-100'}`}>
              <Layout className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-slate-600'}`} />
            </div>
            <h2 className={`ml-3 text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Layout
            </h2>
          </div>
          
          <div className="space-y-6">
            {/* Sidebar Options */}
            <div>
              <label className={`flex items-center gap-3 cursor-pointer ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="relative h-6 w-11 flex-shrink-0">
                  <input
                    type="checkbox"
                    className="peer absolute h-0 w-0 opacity-0"
                    checked={sidebarCompact}
                    onChange={(e) => setSidebarCompact(e.target.checked)}
                  />
                  <div className={`absolute inset-0 rounded-full transition ${
                    isDark 
                      ? 'bg-gray-800 peer-checked:bg-[#00cbdd]/50'
                      : 'bg-gray-200 peer-checked:bg-slate-700'
                  }`}></div>
                  <div className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-transform ${
                    isDark 
                      ? 'bg-gray-500 peer-checked:bg-[#00cbdd]'
                      : 'bg-white peer-checked:bg-white'
                  } ${
                    sidebarCompact ? 'translate-x-5' : 'translate-x-0'
                  }`}></div>
                </div>
                <span className="text-sm font-medium">Compact Sidebar</span>
              </label>
              
              <p className={`mt-1 text-xs pl-14 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Use icons only in the sidebar to save space
              </p>
            </div>
            
            {/* Breadcrumbs Option */}
            <div>
              <label className={`flex items-center gap-3 cursor-pointer ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="relative h-6 w-11 flex-shrink-0">
                  <input
                    type="checkbox"
                    className="peer absolute h-0 w-0 opacity-0"
                    checked={showBreadcrumbs}
                    onChange={(e) => setShowBreadcrumbs(e.target.checked)}
                  />
                  <div className={`absolute inset-0 rounded-full transition ${
                    isDark 
                      ? 'bg-gray-800 peer-checked:bg-[#00cbdd]/50'
                      : 'bg-gray-200 peer-checked:bg-slate-700'
                  }`}></div>
                  <div className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-transform ${
                    isDark 
                      ? 'bg-gray-500 peer-checked:bg-[#00cbdd]'
                      : 'bg-white peer-checked:bg-white'
                  } ${
                    showBreadcrumbs ? 'translate-x-5' : 'translate-x-0'
                  }`}></div>
                </div>
                <span className="text-sm font-medium">Show Breadcrumbs</span>
              </label>
              
              <p className={`mt-1 text-xs pl-14 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Display navigation breadcrumbs at the top of each page
              </p>
            </div>
            
            {/* Content Width */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Content Width
              </label>
              <div className="space-y-2">
                {contentWidthOptions.map((option) => (
                  <div 
                    key={option.value}
                    onClick={() => setContentWidth(option.value)}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                      contentWidth === option.value
                        ? isDark 
                            ? 'bg-[#00cbdd]/10 border border-[#00cbdd]/30' 
                            : 'bg-slate-800 text-white shadow-sm'
                        : isDark 
                            ? 'hover:bg-gray-900/50 border border-gray-800' 
                            : 'hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <div className="flex-1">
                      <div className={`font-medium ${
                        contentWidth === option.value && !isDark 
                          ? 'text-white' 
                          : isDark ? 'text-white' : 'text-gray-900'
                      }`}>{option.name}</div>
                      <div className={`text-xs mt-1 ${
                        contentWidth === option.value && !isDark 
                          ? 'text-gray-200' 
                          : isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>{option.description}</div>
                    </div>
                    {contentWidth === option.value && (
                      <div className={`p-1 rounded-full ${isDark ? 'bg-[#00cbdd]' : 'bg-white'}`}>
                        <Check className={`h-3 w-3 ${isDark ? 'text-white' : 'text-slate-800'}`} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Animations Option */}
            <div>
              <label className={`flex items-center gap-3 cursor-pointer ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="relative h-6 w-11 flex-shrink-0">
                  <input
                    type="checkbox"
                    className="peer absolute h-0 w-0 opacity-0"
                    checked={animationsEnabled}
                    onChange={(e) => setAnimationsEnabled(e.target.checked)}
                  />
                  <div className={`absolute inset-0 rounded-full transition ${
                    isDark 
                      ? 'bg-gray-800 peer-checked:bg-[#00cbdd]/50'
                      : 'bg-gray-200 peer-checked:bg-slate-700'
                  }`}></div>
                  <div className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-transform ${
                    isDark 
                      ? 'bg-gray-500 peer-checked:bg-[#00cbdd]'
                      : 'bg-white peer-checked:bg-white'
                  } ${
                    animationsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}></div>
                </div>
                <span className="text-sm font-medium">Enable Animations</span>
              </label>
              
              <p className={`mt-1 text-xs pl-14 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Show animations and transitions throughout the interface
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          onClick={handleRestoreDefaults}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isDark 
              ? 'bg-gray-900 text-gray-300 border border-gray-800 hover:bg-gray-800' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Restore Defaults
        </button>
        <button
          onClick={handleSaveSettings}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isDark 
              ? 'bg-[#00cbdd] text-[#00091b] hover:bg-[#00cbdd]/90' 
              : 'bg-slate-800 text-white hover:bg-slate-700'
          }`}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
