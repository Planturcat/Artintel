import React from 'react';
import { RefreshCw } from 'lucide-react';
import { ModelSelector } from './model-selector';
import { StatusIndicator } from './status-indicator';

interface SettingsPanelProps {
  currentModel: string;
  setCurrentModel: (modelId: string) => void;
  baseModels: Array<{ id: string; name: string; description: string }>;
  availableModels: Array<{ name: string; [key: string]: any }>;
  aiServiceConnected: boolean;
  isCheckingConnection: boolean;
  connectionError?: string;
  checkAIServiceConnection: () => void;
  showDownloadModelOption: () => void;
  modelPulling: { model: string; status: string } | null;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  currentModel,
  setCurrentModel,
  baseModels,
  availableModels,
  aiServiceConnected,
  isCheckingConnection,
  connectionError,
  checkAIServiceConnection,
  showDownloadModelOption,
  modelPulling,
}) => {
  // Convert models to the format expected by ModelSelector
  const allModels = [
    ...(Array.isArray(baseModels) ? baseModels : []),
    ...((aiServiceConnected && Array.isArray(availableModels) && availableModels.length > 0)
      ? availableModels.map((model) => ({
          id: `${model.id || model.name}`,
          name: `${model.name}`,
          description: model.description || "Local AI model"
        }))
      : []),
  ];

  return (
    <div className="w-full border-b border-[#00cbdd]/20 bg-[#00031b]/90 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3 border-t border-[#00cbdd]/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-white/80 mb-2">Model Selection</h3>
            <div className="flex flex-col gap-2">
              {allModels.length > 0 ? (
                <ModelSelector
                  models={allModels}
                  selectedModelId={currentModel}
                  onChange={setCurrentModel}
                  label="Select Model"
                />
              ) : (
                <div className="bg-[#00031b] border border-[#00cbdd]/30 rounded-md px-3 py-2 text-sm text-white/60">
                  No models available. Please check your AI service connection.
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white/80 mb-2">Connection Settings</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-white/60">AI Service URL</label>
                <input
                  type="text"
                  value={process.env.NEXT_PUBLIC_AI_SERVICE_URL || "http://127.0.0.1:11434/api"}
                  disabled
                  className="bg-[#00031b] border border-[#00cbdd]/30 rounded-md px-3 py-1.5 text-sm text-white/60 w-full"
                  aria-label="AI Service URL"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-white/60">Backend API URL</label>
                <input
                  type="text"
                  value={process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"}
                  disabled
                  className="bg-[#00031b] border border-[#00cbdd]/30 rounded-md px-3 py-1.5 text-sm text-white/60 w-full"
                  aria-label="Backend API URL"
                />
              </div>
            </div>

            {connectionError && (
              <div className="mt-2 p-2 bg-red-500/10 border border-red-500/30 rounded text-xs text-red-400">
                <strong>Connection Error:</strong> {connectionError}
              </div>
            )}

            <div className="mt-2 flex justify-between">
              <button
                onClick={checkAIServiceConnection}
                disabled={isCheckingConnection}
                className="text-xs px-2 py-1 bg-[#00cbdd]/10 hover:bg-[#00cbdd]/20 text-[#00cbdd] rounded flex items-center gap-1"
                aria-label="Check connection"
              >
                <RefreshCw className={`h-3 w-3 ${isCheckingConnection ? "animate-spin" : ""}`} />
                {isCheckingConnection ? "Connecting..." : "Check Connection"}
              </button>

              {!aiServiceConnected && (
                <div className="text-xs text-white/60">
                  <span className="text-[#00cbdd]">
                    Check your AI service connection
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {aiServiceConnected && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-white/80 mb-2 flex items-center justify-between">
              <span>Available AI Models</span>
              <button
                className="text-xs px-2 py-1 bg-[#00cbdd]/10 hover:bg-[#00cbdd]/20 text-[#00cbdd] rounded"
                onClick={showDownloadModelOption}
                aria-label="Select model"
              >
                Select Model
              </button>
            </h3>
            {Array.isArray(availableModels) && availableModels.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {availableModels.map((model, index) => (
                  <div
                    key={index}
                    className="bg-[#00031b] border border-[#00cbdd]/20 rounded-md px-3 py-1 text-xs text-white/80"
                  >
                    {model.name}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-[#00031b] border border-[#00cbdd]/20 rounded-md">
                <p className="text-sm text-white/70">No AI models found.</p>
                <p className="text-xs text-white/50 mt-1">To use AI models, you need to have at least one model available. Check your connection settings.</p>
              </div>
            )}
          </div>
        )}

        {modelPulling && (
          <div className="mt-4 p-3 bg-[#00cbdd]/5 border border-[#00cbdd]/20 rounded" role="alert">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-[#00cbdd] animate-spin" aria-hidden="true" />
              <div>
                <h4 className="text-sm font-medium text-white/90">Downloading Model: {modelPulling.model}</h4>
                <p className="text-xs text-white/60">{modelPulling.status}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPanel;