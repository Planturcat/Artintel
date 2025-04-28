import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Server } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Model } from '@/dashboard-api/model-api';
import { DeploymentConfig } from '@/types/deployment';
import { FineTuningJob } from '@/dashboard-api/fine-tuning-api';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (config: DeploymentConfig) => Promise<void>;
  fineTunedModels: FineTuningJob[];
  platformModels: Model[];
  isDark: boolean;
}

export default function DeploymentModal({
  isOpen,
  onClose,
  onDeploy,
  fineTunedModels,
  platformModels,
  isDark
}: DeploymentModalProps) {
  const [selectedModelId, setSelectedModelId] = useState<string>('');
  const [deploymentName, setDeploymentName] = useState('');
  const [environment, setEnvironment] = useState<'development' | 'staging' | 'production'>('development');
  const [region, setRegion] = useState('us-east-1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Convert fineTunedModels to a format compatible with the component
  const convertedFineTunedModels = fineTunedModels?.map(job => ({
    id: job.id,
    displayName: job.name,
    description: `Fine-tuned model based on ${job.baseModelName || 'base model'}`,
    modelType: 'fine-tuned'
  })) || [];

  // Prepare platform models for display
  const formattedPlatformModels = platformModels?.map(model => ({
    id: model.id,
    displayName: model.displayName || model.name,
    description: model.description,
    modelType: 'platform'
  })) || [];

  // Combine both model types
  const availableModels = [...convertedFineTunedModels, ...formattedPlatformModels];

  const regions = [
    { id: 'us-east-1', name: 'US East (N. Virginia)' },
    { id: 'us-west-2', name: 'US West (Oregon)' },
    { id: 'eu-west-1', name: 'EU West (Ireland)' },
    { id: 'ap-southeast-1', name: 'Asia Pacific (Singapore)' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedModelId) {
      setError('Please select a model');
      return;
    }

    if (!deploymentName.trim()) {
      setError('Please enter a deployment name');
      return;
    }

    setIsSubmitting(true);

    try {
      // Find the selected model to determine its type
      const selectedModel = availableModels.find(model => model.id === selectedModelId);
      
      const config: DeploymentConfig = {
        name: deploymentName,
        modelId: selectedModelId,
        modelType: selectedModel?.modelType as 'fine-tuned' | 'platform',
        environment,
        region,
        resources: {
          cpu: '2',
          memory: '8Gi',
          gpu: 'nvidia-t4'
        },
        scaling: {
          minInstances: 1,
          maxInstances: 5,
          targetConcurrency: 10
        },
        authentication: {
          type: 'api_key'
        }
      };

      await onDeploy(config);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to deploy model');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Full-screen container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`w-full max-w-2xl rounded-xl ${
          isDark 
            ? 'bg-gray-900 border border-gray-800' 
            : 'bg-white border border-gray-200'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <Dialog.Title className={`text-xl font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Deploy Model
            </Dialog.Title>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Model Selection */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Select Model
              </label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {availableModels.map((model) => (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => setSelectedModelId(model.id)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      selectedModelId === model.id
                        ? isDark
                          ? 'border-[#00cbdd] bg-[#00cbdd]/10'
                          : 'border-blue-500 bg-blue-50'
                        : isDark
                          ? 'border-gray-800 hover:border-gray-700'
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Server className={selectedModelId === model.id
                        ? 'text-[#00cbdd]'
                        : isDark ? 'text-gray-400' : 'text-gray-500'
                      } />
                      <div>
                        <h3 className={`font-medium ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {model.displayName}
                        </h3>
                        <p className={`text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {model.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Configuration Fields */}
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Deployment Name
                </label>
                <input
                  type="text"
                  value={deploymentName}
                  onChange={(e) => setDeploymentName(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter deployment name"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Environment
                </label>
                <select
                  value={environment}
                  onChange={(e) => setEnvironment(e.target.value as any)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="development">Development</option>
                  <option value="staging">Staging</option>
                  <option value="production">Production</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Region
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className={`p-4 rounded-lg ${
                isDark
                  ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                  : 'bg-red-50 border border-red-200 text-red-600'
              }`}>
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#00cbdd] to-[#00cbdd]/70 hover:from-[#00cbdd]/90 hover:to-[#00cbdd]/60"
              >
                {isSubmitting ? 'Deploying...' : 'Deploy Model'}
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 