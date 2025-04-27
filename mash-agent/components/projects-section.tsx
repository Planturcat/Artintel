import React, { useState } from 'react';
import { ModelCard } from './model-card';

interface ProjectFilterProps {
  active: 'models' | 'latest' | 'featured';
  onChange: (filter: 'models' | 'latest' | 'featured') => void;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({ active, onChange }) => {
  return (
    <div className="bg-[#00031b] border border-[#00cbdd]/20 p-1 rounded-lg flex mb-4">
      <button 
        className={`flex-1 py-2 px-4 rounded text-sm font-medium flex items-center justify-center ${
          active === 'models' 
            ? 'bg-[#00cbdd]/10 text-white' 
            : 'text-white/70'
        }`}
        onClick={() => onChange('models')}
        aria-pressed={active === 'models'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
          aria-hidden="true"
        >
          <path d="M3 3h7v7H3z"></path>
          <path d="M14 3h7v7h-7z"></path>
          <path d="M14 14h7v7h-7z"></path>
          <path d="M3 14h7v7H3z"></path>
        </svg>
        My Models
      </button>
      
      <button 
        className={`flex-1 py-2 px-4 rounded text-sm font-medium flex items-center justify-center ${
          active === 'latest' 
            ? 'bg-[#00cbdd]/10 text-white' 
            : 'text-white/70'
        }`}
        onClick={() => onChange('latest')}
        aria-pressed={active === 'latest'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        Latest
      </button>
      
      <button 
        className={`flex-1 py-2 px-4 rounded text-sm font-medium flex items-center justify-center ${
          active === 'featured' 
            ? 'bg-[#00cbdd]/10 text-white' 
            : 'text-white/70'
        }`}
        onClick={() => onChange('featured')}
        aria-pressed={active === 'featured'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        Featured
      </button>
    </div>
  );
};

interface ProjectsSectionProps {
  onModelSelect?: (modelId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onModelSelect }) => {
  const [activeFilter, setActiveFilter] = useState<'models' | 'latest' | 'featured'>('models');

  // Example models - in a real app, these would come from props or an API
  const models = [
    {
      id: '1',
      name: 'Llama 2 Fine-tuned 1',
      description: 'Fine-tuned on customer support data',
      status: 'active' as const,
      version: 'v1.0.1',
      createdTime: 'Created 2d ago',
    },
    {
      id: '2',
      name: 'Llama 2 Fine-tuned 2',
      description: 'Fine-tuned on customer support data',
      status: 'active' as const,
      version: 'v1.0.2',
      createdTime: 'Created 2d ago',
    },
    {
      id: '3',
      name: 'Llama 2 Fine-tuned 3',
      description: 'Fine-tuned on customer support data',
      status: 'active' as const,
      version: 'v1.0.3',
      createdTime: 'Created 2d ago',
    },
  ];

  const handleModelClick = (modelId: string) => {
    if (onModelSelect) {
      onModelSelect(modelId);
    }
  };

  return (
    <section className="relative z-10 container mx-auto px-4 py-8 mt-auto">
      <ProjectFilter active={activeFilter} onChange={setActiveFilter} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {models.map((model) => (
          <ModelCard
            key={model.id}
            name={model.name}
            description={model.description}
            status={model.status}
            version={model.version}
            createdTime={model.createdTime}
            onClick={() => handleModelClick(model.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection; 