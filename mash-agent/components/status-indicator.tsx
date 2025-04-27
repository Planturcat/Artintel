import React from 'react';
import { Check, X, RefreshCw } from 'lucide-react';

interface StatusIndicatorProps {
  isCheckingConnection: boolean;
  aiServiceConnected: boolean;
  connectionError?: string;
  availableModels: any[];
  onCheckConnection: () => void;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  isCheckingConnection,
  aiServiceConnected,
  connectionError,
  availableModels,
  onCheckConnection,
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-white/60 text-sm">AI Service:</span>
      {isCheckingConnection ? (
        <div
          className="flex items-center gap-1 text-white/80"
          aria-live="polite"
        >
          <RefreshCw className="h-3 w-3 animate-spin" />
          <span className="text-xs">Connecting...</span>
        </div>
      ) : aiServiceConnected ? (
        <div
          className="flex items-center gap-1 text-green-400"
          aria-live="polite"
        >
          <Check className="h-3 w-3" />
          <span className="text-xs">Connected ({availableModels.length} models)</span>
        </div>
      ) : (
        <div
          className="flex items-center gap-1 text-red-400"
          aria-live="polite"
        >
          <X className="h-3 w-3" />
          <span className="text-xs">{connectionError ? 'Error' : 'Disconnected'}</span>
        </div>
      )}
      <button
        onClick={onCheckConnection}
        className="ml-1 text-white/60 hover:text-[#00cbdd] p-1 rounded hover:bg-[#00cbdd]/10"
        disabled={isCheckingConnection}
        aria-label="Check connection"
        title="Check AI service connection"
      >
        <RefreshCw className={`h-3 w-3 ${isCheckingConnection ? "animate-spin" : ""}`} />
      </button>

      {connectionError && (
        <div
          className="ml-2 text-xs text-red-400"
          aria-live="assertive"
        >
          {connectionError}
        </div>
      )}
    </div>
  );
};

export default StatusIndicator;