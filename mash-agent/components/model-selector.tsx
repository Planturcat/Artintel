import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Model {
  id: string;
  name: string;
  description?: string;
}

interface ModelSelectorProps {
  models: Model[];
  selectedModelId: string;
  onChange: (modelId: string) => void;
  className?: string;
  label?: string;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selectedModelId,
  onChange,
  className,
  label = 'Select Model',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedModel = models.find(model => model.id === selectedModelId) || models[0];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleModelSelect = (modelId: string) => {
    onChange(modelId);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown();
    } else if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown' && isOpen) {
      e.preventDefault();
      const currentIndex = models.findIndex(model => model.id === selectedModelId);
      const nextIndex = (currentIndex + 1) % models.length;
      onChange(models[nextIndex].id);
    } else if (e.key === 'ArrowUp' && isOpen) {
      e.preventDefault();
      const currentIndex = models.findIndex(model => model.id === selectedModelId);
      const prevIndex = (currentIndex - 1 + models.length) % models.length;
      onChange(models[prevIndex].id);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {label && (
        <label className="text-sm font-medium text-white/80 mb-2 block">
          {label}
        </label>
      )}
      <div
        className="bg-[#00031b] border border-[#00cbdd]/30 rounded-md px-3 py-2 text-sm text-white w-full focus:border-[#00cbdd] flex items-center justify-between cursor-pointer hover:border-[#00cbdd]/50 transition-colors"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="model-dropdown"
        aria-label={label}
      >
        <span>{selectedModel?.name || 'Select a model'}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </div>
      
      {isOpen && (
        <div
          id="model-dropdown"
          className="absolute z-10 mt-1 w-full bg-[#00031b] border border-[#00cbdd]/30 rounded-md shadow-lg max-h-60 overflow-auto py-1"
          role="listbox"
        >
          {models.map((model) => (
            <div
              key={model.id}
              className={cn(
                "px-3 py-2 text-sm cursor-pointer hover:bg-[#00cbdd]/10",
                model.id === selectedModelId ? "bg-[#00cbdd]/20 text-[#00cbdd]" : "text-white"
              )}
              onClick={() => handleModelSelect(model.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleModelSelect(model.id);
                }
              }}
              tabIndex={0}
              role="option"
              aria-selected={model.id === selectedModelId}
            >
              <div className="font-medium">{model.name}</div>
              {model.description && (
                <div className="text-xs text-white/50 mt-0.5">{model.description}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelSelector; 