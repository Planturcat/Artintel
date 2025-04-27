"use client"

import React, { useState } from 'react';
import { X, ChevronRight, Check } from 'lucide-react';

// Template categories and their templates
const TEMPLATE_CATEGORIES = {
  'Image Generator': [
    { 
      id: 'image-gen-basic', 
      name: 'Basic Image Generator', 
      description: 'A simple image generation UI with prompt input and results display',
      preview: '🖼️'
    },
    { 
      id: 'image-gen-advanced', 
      name: 'Advanced Image Generator', 
      description: 'Feature-rich image generator with settings and gallery',
      preview: '🎨'
    }
  ],
  'Code Builder': [
    { 
      id: 'code-builder-simple', 
      name: 'Simple Code Editor', 
      description: 'Basic code editor with syntax highlighting',
      preview: '📝'
    },
    { 
      id: 'code-builder-advanced', 
      name: 'Advanced Code IDE', 
      description: 'Full-featured code IDE with terminal and file explorer',
      preview: '💻'
    }
  ],
  'Chatbot': [
    { 
      id: 'chatbot-basic', 
      name: 'Basic Chat Interface', 
      description: 'Simple chat UI with message bubbles',
      preview: '💬'
    },
    { 
      id: 'chatbot-advanced', 
      name: 'Advanced Chat App', 
      description: 'Feature-rich chat with typing indicators and attachments',
      preview: '🤖'
    }
  ],
  'Full NextJS App': [
    { 
      id: 'nextjs-landing', 
      name: 'Landing Page', 
      description: 'Complete landing page with hero, features, and CTA sections',
      preview: '🚀'
    },
    { 
      id: 'nextjs-dashboard', 
      name: 'Admin Dashboard', 
      description: 'Full dashboard with charts, tables, and navigation',
      preview: '📊'
    }
  ]
};

interface TemplateWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: any) => void;
}

const TemplateWizard: React.FC<TemplateWizardProps> = ({ 
  isOpen, 
  onClose,
  onSelectTemplate
}) => {
  const [step, setStep] = useState<'category' | 'template'>('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  if (!isOpen) return null;
  
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setStep('template');
  };
  
  const handleTemplateSelect = (template: any) => {
    onSelectTemplate({
      category: selectedCategory,
      template: template
    });
    onClose();
  };
  
  const handleBack = () => {
    setStep('category');
    setSelectedCategory(null);
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#00031b] border border-[#00cbdd]/30 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#00cbdd]/20">
          <h2 className="text-xl font-semibold text-white">
            {step === 'category' ? 'Select Template Category' : `Select ${selectedCategory} Template`}
          </h2>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {step === 'category' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(TEMPLATE_CATEGORIES).map((category) => (
                <div 
                  key={category}
                  className="border border-[#00cbdd]/20 rounded-lg p-4 hover:bg-[#00cbdd]/5 cursor-pointer transition-colors"
                  onClick={() => handleCategorySelect(category)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">{category}</h3>
                    <ChevronRight className="text-[#00cbdd]" size={18} />
                  </div>
                  <p className="text-white/70 text-sm mt-2">
                    {TEMPLATE_CATEGORIES[category as keyof typeof TEMPLATE_CATEGORIES].length} templates available
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {selectedCategory && TEMPLATE_CATEGORIES[selectedCategory as keyof typeof TEMPLATE_CATEGORIES].map((template) => (
                <div 
                  key={template.id}
                  className="border border-[#00cbdd]/20 rounded-lg p-4 hover:bg-[#00cbdd]/5 cursor-pointer transition-colors"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="flex items-start">
                    <div className="text-4xl mr-4">{template.preview}</div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{template.name}</h3>
                      <p className="text-white/70 text-sm mt-1">{template.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-[#00cbdd]/20 flex justify-between">
          {step === 'template' ? (
            <button 
              onClick={handleBack}
              className="px-4 py-2 text-white hover:bg-[#00cbdd]/10 rounded-md transition-colors"
            >
              Back to Categories
            </button>
          ) : (
            <div></div>
          )}
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-[#00031b] border border-[#00cbdd]/30 text-white hover:bg-[#00cbdd]/10 rounded-md transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateWizard;
