import React from 'react';
import { Settings, ChevronDown, Database, Brain, Upload, List } from 'lucide-react';
import { NavLink } from './nav-link';
import { StatusIndicator } from './status-indicator';
import MashLogo from './mash-logo';

interface HeaderProps {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  isCheckingConnection: boolean;
  ollamaConnected: boolean;
  connectionError?: string;
  ollamaModels: any[];
  checkOllamaConnection: () => void;
  activeNavItem?: 'datasets' | 'models' | 'fine-tuning' | 'jobs';
}

export const Header: React.FC<HeaderProps> = ({
  showSettings,
  setShowSettings,
  isCheckingConnection,
  ollamaConnected,
  connectionError,
  ollamaModels,
  checkOllamaConnection,
  activeNavItem,
}) => {
  return (
    <header className="relative z-10 border-b border-[#00cbdd]/20 bg-[#00031b]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MashLogo className="h-8 w-8" />
          <span className="text-xl font-bold text-[#00cbdd]">mash</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink 
            href="#datasets" 
            icon={<Database className="h-4 w-4" />}
            isActive={activeNavItem === 'datasets'}
          >
            Datasets
          </NavLink>
          <NavLink 
            href="#models" 
            icon={<Brain className="h-4 w-4" />}
            isActive={activeNavItem === 'models'}
          >
            Models
          </NavLink>
          <NavLink 
            href="#fine-tuning" 
            icon={<Upload className="h-4 w-4" />}
            isActive={activeNavItem === 'fine-tuning'}
          >
            Fine-Tuning
          </NavLink>
          <NavLink 
            href="#jobs" 
            icon={<List className="h-4 w-4" />}
            isActive={activeNavItem === 'jobs'}
          >
            Jobs
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <StatusIndicator
            isCheckingConnection={isCheckingConnection}
            ollamaConnected={ollamaConnected}
            connectionError={connectionError}
            ollamaModels={ollamaModels}
            onCheckConnection={checkOllamaConnection}
          />
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-1 text-sm text-white/80 hover:text-[#00cbdd] transition px-2 py-1 rounded-md hover:bg-[#00cbdd]/10"
            aria-expanded={showSettings}
            aria-controls="settings-panel"
            aria-label="Toggle settings panel"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
            <ChevronDown className={`h-3 w-3 transition-transform ${showSettings ? "rotate-180" : ""}`} />
          </button>
          
          <div className="h-8 w-8 rounded-full bg-[#00cbdd] flex items-center justify-center text-xs font-bold text-[#00031b]" aria-hidden="true">
            M
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 