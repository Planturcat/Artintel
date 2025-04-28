'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { X, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { Model } from '@/dashboard-api/model-api';
import { Dataset } from '@/dashboard-api/dataset-api';
import { createFineTuningJob } from '@/dashboard-api/fine-tuning-api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { useAuth } from '@/contexts/AuthContext';

interface JobFormData {
  name: string;
  baseModelId: string;
  datasetId: string;
  userId: string;
  config: {
    epochs: number;
    batchSize: number;
    learningRate: number;
    warmupSteps: number;
    optimizer: {
      type: 'adam' | 'adamw' | 'sgd';
      weightDecay: number;
      gradientAccumulationSteps: number;
      schedulerType: 'linear' | 'cosine' | 'constant';
    };
    lora: {
      rank: number;
      alpha: number;
      dropout: number;
      targetModules: string[];
    };
  };
  resources: {
    gpuCount: number;
    gpuType: string;
  };
}

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableModels: Model[];
  availableDatasets: Dataset[];
}

const defaultFormData = (userId = ''): JobFormData => ({
  name: '',
  baseModelId: '',
  datasetId: '',
  userId: userId,
  config: {
    epochs: 3,
    batchSize: 8,
    learningRate: 0.0002,
    warmupSteps: 100,
    optimizer: {
      type: 'adamw',
      weightDecay: 0.01,
      gradientAccumulationSteps: 4,
      schedulerType: 'linear',
    },
    lora: {
      rank: 8,
      alpha: 32,
      dropout: 0.1,
      targetModules: ['query', 'key', 'value', 'output'],
    },
  },
  resources: {
    gpuCount: 1,
    gpuType: 'nvidia-a100',
  },
});

export default function CreateJobModal({
  isOpen,
  onClose,
  availableModels,
  availableDatasets,
}: CreateJobModalProps) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const isDark = theme === 'dark';
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<JobFormData>(defaultFormData(user?.user_id || ''));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setFormData(defaultFormData(user?.user_id || ''));
      setStep(1);
      setErrors({});
    }
  }, [isOpen, user]);

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Job name is required';
      }
      if (!formData.baseModelId) {
        newErrors.baseModelId = 'Base model is required';
      }
      if (!formData.datasetId) {
        newErrors.datasetId = 'Dataset is required';
      }
    } else if (currentStep === 2) {
      if (formData.config.epochs < 1) {
        newErrors.epochs = 'Epochs must be at least 1';
      }
      if (formData.config.batchSize < 1) {
        newErrors.batchSize = 'Batch size must be at least 1';
      }
      if (formData.config.learningRate <= 0) {
        newErrors.learningRate = 'Learning rate must be greater than 0';
      }
      if (formData.config.warmupSteps < 0) {
        newErrors.warmupSteps = 'Warmup steps must be non-negative';
      }
      if (formData.config.optimizer.weightDecay < 0) {
        newErrors.weightDecay = 'Weight decay must be non-negative';
      }
      if (formData.config.optimizer.gradientAccumulationSteps < 1) {
        newErrors.gradientAccumulationSteps = 'Gradient accumulation steps must be at least 1';
      }
      if (formData.config.lora.rank < 1) {
        newErrors.loraRank = 'LoRA rank must be at least 1';
      }
      if (formData.config.lora.alpha <= 0) {
        newErrors.loraAlpha = 'LoRA alpha must be greater than 0';
      }
      if (formData.config.lora.dropout < 0 || formData.config.lora.dropout >= 1) {
        newErrors.loraDropout = 'LoRA dropout must be between 0 and 1';
      }
      if (formData.config.lora.targetModules.length === 0) {
        newErrors.loraTargetModules = 'At least one target module must be selected';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    try {
      const selectedModel = availableModels.find(model => model.id === formData.baseModelId);
      const selectedDataset = availableDatasets.find(dataset => dataset.id === formData.datasetId);
      
      const response = await createFineTuningJob({
        ...formData,
        baseModelName: selectedModel?.name,
        datasetName: selectedDataset?.name,
      });
      
      onClose();
    } catch (error: any) {
      console.error('Error creating job:', error);
      setErrors({ 
        submit: error.message || 'Failed to create job. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData(defaultFormData(user?.user_id || ''));
    setStep(1);
    setErrors({});
    onClose();
  };

  const targetModuleOptions = [
    { value: 'query,key,value', label: 'Attention (Q,K,V)' },
    { value: 'query,key,value,output', label: 'Full Attention' },
    { value: 'mlp', label: 'MLP Only' },
    { value: 'query,key,value,output,mlp', label: 'All' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`absolute inset-0 ${
              isDark ? 'bg-[#00031b]' : 'bg-white'
            }`}
          >
            <div className={`fixed top-0 left-0 right-0 z-10 px-6 py-4 border-b ${
              isDark ? 'bg-[#00031b]/90 border-[#00cbdd]/20' : 'bg-white/90 border-[#00cbdd]/10'
            } backdrop-blur-md`}>
              <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleClose}
                    className={`p-2 rounded-full transition-colors ${
                      isDark 
                        ? 'text-gray-400 hover:text-white hover:bg-white/10' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div>
                    <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Create New Training Job
                    </h2>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {step === 1 
                        ? 'Select a base model and dataset for fine-tuning'
                        : 'Configure training parameters and resources'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-8">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isDark
                        ? step >= 1 ? 'bg-[#00cbdd] text-white' : 'bg-gray-800 text-gray-400'
                        : step >= 1 ? 'bg-[#00cbdd] text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      1
                    </div>
                    <div className={`ml-3 ${
                      isDark
                        ? step >= 1 ? 'text-white' : 'text-gray-400'
                        : step >= 1 ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      <p className="text-sm font-medium">Basic Info</p>
                      <p className="text-xs">Model & Dataset</p>
                    </div>
                  </div>

                  <div className={`h-0.5 w-12 ${
                    isDark ? 'bg-gray-800' : 'bg-gray-200'
                  }`} />

                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isDark
                        ? step >= 2 ? 'bg-[#00cbdd] text-white' : 'bg-gray-800 text-gray-400'
                        : step >= 2 ? 'bg-[#00cbdd] text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      2
                    </div>
                    <div className={`ml-3 ${
                      isDark
                        ? step >= 2 ? 'text-white' : 'text-gray-400'
                        : step >= 2 ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      <p className="text-sm font-medium">Configuration</p>
                      <p className="text-xs">Training Settings</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-full pt-24 pb-24 overflow-y-auto">
              <div className="max-w-4xl mx-auto px-6">
                {errors.submit && (
                  <div className={`mb-6 p-4 rounded-lg border ${
                    isDark ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-red-50 border-red-200 text-red-600'
                  }`}>
                    {errors.submit}
                  </div>
                )}
                
                <div className="space-y-8">
                  {step === 1 ? (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Job Name
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Enter a descriptive name for your training job"
                          error={errors.name}
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Base Model
                        </label>
                        <Select
                          value={formData.baseModelId}
                          onChange={(value) => setFormData({ ...formData, baseModelId: value })}
                          options={availableModels.map(model => ({
                            value: model.id,
                            label: model.name,
                          }))}
                          placeholder="Select a base model"
                          error={errors.baseModelId}
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Dataset
                        </label>
                        <Select
                          value={formData.datasetId}
                          onChange={(value) => setFormData({ ...formData, datasetId: value })}
                          options={availableDatasets.map(dataset => ({
                            value: dataset.id,
                            label: dataset.name,
                          }))}
                          placeholder="Select a dataset"
                          error={errors.datasetId}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div>
                        <h3 className={`text-sm font-medium mb-4 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Training Parameters
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-sm mb-2 ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Epochs
                            </label>
                            <Input
                              type="number"
                              value={formData.config.epochs}
                              onChange={(e) => setFormData({
                                ...formData,
                                config: {
                                  ...formData.config,
                                  epochs: parseInt(e.target.value) || 0,
                                },
                              })}
                              min={1}
                              error={errors.epochs}
                            />
                          </div>

                          <div>
                            <label className={`block text-sm mb-2 ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Batch Size
                            </label>
                            <Input
                              type="number"
                              value={formData.config.batchSize}
                              onChange={(e) => setFormData({
                                ...formData,
                                config: {
                                  ...formData.config,
                                  batchSize: parseInt(e.target.value) || 0,
                                },
                              })}
                              min={1}
                              error={errors.batchSize}
                            />
                          </div>

                          <div>
                            <label className={`block text-sm mb-2 ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Learning Rate
                            </label>
                            <Input
                              type="number"
                              value={formData.config.learningRate}
                              onChange={(e) => setFormData({
                                ...formData,
                                config: {
                                  ...formData.config,
                                  learningRate: parseFloat(e.target.value) || 0,
                                },
                              })}
                              step={0.0001}
                              min={0}
                              error={errors.learningRate}
                            />
                          </div>

                          <div>
                            <label className={`block text-sm mb-2 ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Warmup Steps
                            </label>
                            <Input
                              type="number"
                              value={formData.config.warmupSteps}
                              onChange={(e) => setFormData({
                                ...formData,
                                config: {
                                  ...formData.config,
                                  warmupSteps: parseInt(e.target.value) || 0,
                                },
                              })}
                              min={0}
                              error={errors.warmupSteps}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-sm font-medium mb-4 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Optimizer Settings
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-sm mb-2 ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Optimizer Type
                            </label>
                            <Select
                              value={formData.config.optimizer.type}
                              onChange={(value) => setFormData({
                                ...formData,
                                config: {
                                  ...formData.config,
                                  optimizer: {
                                    ...formData.config.optimizer,
                                    type: value as 'adam' | 'adamw' | 'sgd',
                                  },
                                },
                              })}
                              options={[
                                { value: 'adam', label: 'Adam' },
                                { value: 'adamw', label: 'AdamW' },
                                { value: 'sgd', label: 'SGD' },
                              ]}
                              error={errors.optimizerType}
                            />
                          </div>

                          <div>
                            <label className={`block text-sm mb-2 ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Scheduler Type
                            </label>
                            <Select
                              value={formData.config.optimizer.schedulerType}
                              onChange={(value) => setFormData({
                                ...formData,
                                config: {
                                  ...formData.config,
                                  optimizer: {
                                    ...formData.config.optimizer,
                                    schedulerType: value as 'linear' | 'cosine' | 'constant',
                                  },
                                },
                              })}
                              options={[
                                { value: 'linear', label: 'Linear' },
                                { value: 'cosine', label: 'Cosine' },
                                { value: 'constant', label: 'Constant' },
                              ]}
                              error={errors.schedulerType}
                            />
                          </div>

                          <div>
                            <label className={`block text-sm mb-2 ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Weight Decay
                            </label>
                            <Input
                              type="number"
                              value={formData.config.optimizer.weightDecay}
                              onChange={(e) => setFormData({
                                ...formData,
                                config: {
                                  ...formData.config,
                                  optimizer: {
                                    ...formData.config.optimizer,
                                    weightDecay: parseFloat(e.target.value) || 0,
                                  },
                                },
                              })}
                              step={0.001}
                              min={0}
                              error={errors.weightDecay}
                            />
                          </div>

                          <div>
                            <label className={`block text-sm mb-2 ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Gradient Accumulation Steps
                            </label>
                            <Input
                              type="number"
                              value={formData.config.optimizer.gradientAccumulationSteps}
                              onChange={(e) => setFormData({
                                ...formData,
                                config: {
                                  ...formData.config,
                                  optimizer: {
                                    ...formData.config.optimizer,
                                    gradientAccumulationSteps: parseInt(e.target.value) || 0,
                                  },
                                },
                              })}
                              min={1}
                              error={errors.gradientAccumulationSteps}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-sm font-medium mb-4 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          LoRA Settings
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-sm mb-2 ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              LoRA Rank
                            </label>
                            <Input
                              type="number"
                              value={formData.config.lora.rank}
                              onChange={(e) => setFormData({
                                ...formData,
                                config: {
                                  ...formData.config,
                                  lora: {
                                    ...formData.config.lora,
                                    rank: parseInt(e.target.value) || 0,
                                  },
                                },
                              })}
                              min={1}
                              error={errors.loraRank}
                            />
                          </div>

                          <div>
                            <label className={`block text-sm mb-2 ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              LoRA Alpha
                            </label>
                            <Input
                              type="number"
                              value={formData.config.lora.alpha}
                              onChange={(e) => setFormData({
                                ...formData,
                                config: {
                                  ...formData.config,
                                  lora: {
                                    ...formData.config.lora,
                                    alpha: parseInt(e.target.value) || 0,
                                  },
                                },
                              })}
                              min={1}
                              error={errors.loraAlpha}
                            />
                          </div>

                          <div>
                            <label className={`block text-sm mb-2 ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              LoRA Dropout
                            </label>
                            <Input
                              type="number"
                              value={formData.config.lora.dropout}
                              onChange={(e) => setFormData({
                                ...formData,
                                config: {
                                  ...formData.config,
                                  lora: {
                                    ...formData.config.lora,
                                    dropout: parseFloat(e.target.value) || 0,
                                  },
                                },
                              })}
                              step={0.1}
                              min={0}
                              max={1}
                              error={errors.loraDropout}
                            />
                          </div>

                          <div>
                            <label className={`block text-sm mb-2 ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Target Modules
                            </label>
                            <Select
                              value={formData.config.lora.targetModules.join(',')}
                              onChange={(value) => setFormData({
                                ...formData,
                                config: {
                                  ...formData.config,
                                  lora: {
                                    ...formData.config.lora,
                                    targetModules: value.split(','),
                                  },
                                },
                              })}
                              options={targetModuleOptions}
                              error={errors.loraTargetModules}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-sm font-medium mb-4 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          GPU Resources
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-sm mb-2 ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              GPU Count
                            </label>
                            <Select
                              value={formData.resources.gpuCount.toString()}
                              onChange={(value) => setFormData({
                                ...formData,
                                resources: {
                                  ...formData.resources,
                                  gpuCount: parseInt(value),
                                },
                              })}
                              options={[
                                { value: '1', label: '1 GPU' },
                                { value: '2', label: '2 GPUs' },
                                { value: '4', label: '4 GPUs' },
                                { value: '8', label: '8 GPUs' },
                              ]}
                              error={errors.gpuCount}
                            />
                          </div>

                          <div>
                            <label className={`block text-sm mb-2 ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              GPU Type
                            </label>
                            <Select
                              value={formData.resources.gpuType}
                              onChange={(value) => setFormData({
                                ...formData,
                                resources: {
                                  ...formData.resources,
                                  gpuType: value,
                                },
                              })}
                              options={[
                                { value: 'nvidia-a100', label: 'NVIDIA A100' },
                                { value: 'nvidia-v100', label: 'NVIDIA V100' },
                              ]}
                              error={errors.gpuType}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            <div className={`fixed bottom-0 left-0 right-0 px-6 py-4 border-t ${
              isDark ? 'bg-[#00031b]/90 border-[#00cbdd]/20' : 'bg-white/90 border-[#00cbdd]/10'
            } backdrop-blur-md`}>
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                {step > 1 ? (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={isSubmitting}
                    size="lg"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                <Button
                  onClick={step === 2 ? handleSubmit : handleNext}
                  disabled={isSubmitting}
                  size="lg"
                  className="bg-gradient-to-r from-[#00cbdd] to-[#00cbdd]/70 hover:from-[#00cbdd]/90 hover:to-[#00cbdd]/60 min-w-[150px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : step === 2 ? (
                    'Create Job'
                  ) : (
                    <>
                      Next
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}