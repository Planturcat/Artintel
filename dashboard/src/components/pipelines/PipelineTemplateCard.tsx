import React from 'react';
import { ArrowRight, Star, Users } from 'lucide-react';
import { PipelineTemplate } from '@/types/pipeline';

interface PipelineTemplateCardProps {
  template: PipelineTemplate;
  isDark: boolean;
  onClick: () => void;
}

export default function PipelineTemplateCard({
  template,
  isDark,
  onClick
}: PipelineTemplateCardProps) {
  // Function to determine difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600';
      case 'intermediate':
        return isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600';
      case 'advanced':
        return isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600';
      default:
        return isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div
      className={`rounded-xl overflow-hidden border ${
        isDark
          ? 'bg-[#00031b]/70 border-[#00cbdd]/20 hover:bg-[#00031b]/90'
          : 'bg-white border-gray-200 hover:bg-gray-50 shadow-sm'
      } transition-all duration-200 cursor-pointer group`}
      onClick={onClick}
    >
      {template.thumbnail ? (
        <div
          className="h-36 bg-cover bg-center"
          style={{ backgroundImage: `url(${template.thumbnail})` }}
        />
      ) : (
        <div
          className={`h-36 flex items-center justify-center ${
            isDark ? 'bg-gray-800' : 'bg-gray-100'
          }`}
        >
          <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>No Preview</span>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3
              className={`font-medium text-base ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {template.name}
            </h3>
            <p
              className={`text-xs mt-1 line-clamp-2 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {template.description}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
                template.difficulty
              )}`}
            >
              {template.difficulty.charAt(0).toUpperCase() + template.difficulty.slice(1)}
            </span>
            <div
              className={`ml-2 flex items-center text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <Star className="h-3 w-3 mr-0.5 text-yellow-400" />
              {template.popularity.toFixed(1)}
            </div>
            <div
              className={`ml-2 flex items-center text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <Users className="h-3 w-3 mr-0.5" />
              {template.usageCount}
            </div>
          </div>
          <div
            className={`p-1.5 rounded-full ${
              isDark
                ? 'text-[#00cbdd] group-hover:bg-[#00cbdd]/10'
                : 'text-blue-500 group-hover:bg-blue-50'
            } transition-all duration-200`}
          >
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
} 