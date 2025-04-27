import React from 'react';
import MashLogo from './mash-logo';
import { QuickActionButton } from './quick-action-button';

interface WelcomeSectionProps {
  onQuickActionSelect: (action: string) => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onQuickActionSelect }) => {
  const quickActions = [
    { name: "List Datasets", icon: "📊" },
    { name: "Fine-tune Model", icon: "🧠" },
    { name: "Run Inference", icon: "💬" },
    { name: "Deploy Model", icon: "🚀" },
  ];

  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 relative">
          <MashLogo className="w-full h-full" />
        </div>
      </div>
      <h1 className="text-5xl font-bold mb-4 text-white">Idea to ML in seconds.</h1>
      <p className="text-xl text-white/70 max-w-2xl mx-auto">
        Mash is your superhuman ML assistant. Manage datasets, fine-tune models, and run inferences with simple
        commands.
      </p>

      <div className="w-full max-w-3xl mx-auto mt-8">
        <div className="flex flex-wrap justify-center gap-3">
          {quickActions.map((action) => (
            <QuickActionButton
              key={action.name}
              icon={action.icon}
              name={action.name}
              onClick={onQuickActionSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection; 