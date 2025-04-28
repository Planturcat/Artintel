/**
 * ArtIntel LLMs Model Catalog API Client
 * This file provides TypeScript interfaces and functions to interact with the model catalog API.
 */

import axios from 'axios';
import { API_BASE_URL, createHeaders, isMockApiEnabled } from './config';
import { mockGetModels, mockGetModel, mockGetModelMetrics, mockToggleModelBookmark, mockGetBookmarkedModels } from './mock-api';

// -------------------- Type Definitions --------------------

/**
 * Model type enumeration
 */
export enum ModelType {
  LLM = 'LLM',  // Large Language Model
  SLM = 'SLM',  // Small Language Model
  CHAT_LLM = 'Chat LLM',  // Chat-optimized LLM
  VISION = 'Vision',  // Vision model
  CODE = 'Code',  // Code generation model
  TEXT_TO_SPEECH = 'Text-to-Speech'  // Text to speech model
}

/**
 * Model framework enumeration
 */
export enum ModelFramework {
  PYTORCH = 'pytorch',
  TENSORFLOW = 'tensorflow',
  JAX = 'jax',
  TRANSFORMERS = 'transformers',
  ONNX = 'onnx',
  OTHER = 'other',
}

/**
 * Model task type enumeration
 */
export enum ModelTaskType {
  TEXT_GENERATION = 'Text Generation',
  CHAT = 'chat',
  EMBEDDINGS = 'Embeddings',
  CLASSIFICATION = 'Classification',
  SUMMARIZATION = 'Summarization',
  TRANSLATION = 'Translation',
  QUESTION_ANSWERING = 'question-answering',
  CODE_GENERATION = 'code-generation',
  IMAGE_GENERATION = 'image-generation',
  MULTIMODAL = 'multimodal',
  OTHER = 'other',
}

/**
 * Model tier enumeration
 */
export enum ModelTier {
  FREE = 'free',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
}

/**
 * Model status enumeration
 */
export enum ModelStatus {
  RUNNING = 'Running',
  PAUSED = 'Paused',
  ERROR = 'Error',
  AVAILABLE = 'Available'
}

/**
 * Base model interface
 */
export interface Model {
  id: string;
  name: string;
  displayName?: string;
  version: string;
  modelType: ModelType | string;  // Updated to accept string for SLM
  framework: ModelFramework | string;
  taskType: ModelTaskType | string;
  description: string;
  parameters: string;
  modelSize: number;   // in GB
  license: string;
  author: string;
  tier: ModelTier | string;
  tags: string[];
  imageUrl?: string;
  status: ModelStatus;
  createdAt: string;
  updatedAt: string;
  isBookmarked?: boolean;
  metrics: {
    accuracy: number;
    latency: number;  // in ms
    throughput: number;  // tokens/second
    memoryUsage: number;  // in MB
    gpuUsage?: number;  // percentage
    reliability?: number; // percentage
    costEfficiency?: number; // score 1-10
  };
  pricing: {
    pricePerRequest: number;
    pricePerToken?: number;
    freeQuota?: number;
    subscriptionCost?: number;
    payAsYouGo?: boolean;
  };
  architecture: {
    framework: string;
    layers: number;
    attentionHeads?: number;
    contextWindow?: number;
    trainingData?: string;
    quantization?: string;
    modelArchitecture?: string;
    parameterEfficiency?: number;
    trainingFLOPs?: number;
  };
  resourceRequirements: {
    minCPU: string;
    minMemory: string;
    recommendedGPU?: string;
    minDiskSpace?: string;
    optimizedHardware?: string[];
    deploymentOptions?: string[];
  };
  documentation: {
    technicalDocs?: string;
    examples?: string[];
    papers?: string[];
    githubRepo?: string;
    communityForums?: string[];
    tutorials?: string[];
    bestPractices?: string[];
  };
  contextLength?: number;
  creator: string;
  licenseType?: string;
  languageSupport?: string[];
  finetuningOptions?: {
    supported: boolean;
    methods?: string[];
    dataRequirements?: string;
    complexity?: 'Easy' | 'Medium' | 'Advanced';
  };
  benchmarks?: {
    name: string;
    score: number;
    date: string;
  }[];
  useCase?: string[];
  lastUpdate?: string;
  communityRating?: number;
  trainingDataset?: string;
}

/**
 * Model metrics interface
 */
export interface ModelMetrics {
  id: string;
  modelId: string;
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1Score?: number;
  latency?: number;
  throughput?: number;
  memoryUsage: number;  // in MB
  gpuUsage?: number;  // percentage
  errorRate: number;  // percentage
  timestamp: string;
}

/**
 * Model performance interface
 */
export interface ModelPerformance {
  id: string;
  modelId: string;
  inferenceTime: number;  // in ms
  memoryUsage: number;    // in MB
  gpuUsage?: number;      // percentage
  throughput: number;     // requests/second
  timestamp: string;
}

/**
 * Model documentation interface
 */
export interface ModelDocumentation {
  id: string;
  modelId: string;
  usageExamples: string[];
  inputFormat: Record<string, any>;
  outputFormat: Record<string, any>;
  limitations: string[];
  bestPractices: string[];
}

/**
 * Model filter parameters
 */
export interface ModelFilterParams {
  search?: string;
  modelType?: ModelType;
  framework?: ModelFramework;
  taskType?: ModelTaskType[];
  tier?: ModelTier[];
  tags?: string[];
  minParameters?: number;
  maxParameters?: number;
  status?: ModelStatus[];
  sort?: 'name' | 'created' | 'updated' | 'parameters' | 'accuracy' | 'latency';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

/**
 * Paginated response interface
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

/**
 * Model comparison result
 */
export interface ModelComparison {
  models: Model[];
  metrics: Record<string, ModelMetrics>;
  performance: Record<string, ModelPerformance>;
}

/**
 * Generic API request function
 */
const apiRequest = async <T>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  params?: Record<string, any>,
  data?: any
): Promise<T> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await axios({
      method,
      url,
      headers: createHeaders(),
      params,
      data
    });
    
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('API endpoint not found. Make sure the backend server is running.');
      }
      const errorMessage = error.response?.data?.error?.message || 'An unknown error occurred';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// -------------------- API Functions --------------------

/**
 * Get all models with pagination and filtering
 */
export const getModels = (
  filters?: ModelFilterParams
): Promise<PaginatedResponse<Model>> => {
  if (isMockApiEnabled()) {
    return mockGetModels(filters);
  }
  return apiRequest<PaginatedResponse<Model>>('/api/models', 'GET', filters);
};

/**
 * Get a specific model by ID
 */
export const getModel = (modelId: string): Promise<Model> => {
  return apiRequest<Model>(`/api/models/${modelId}`);
};

/**
 * Get model metrics
 */
export const getModelMetrics = (modelId: string): Promise<ModelMetrics[]> => {
  return apiRequest<ModelMetrics[]>(`/api/models/${modelId}/metrics`);
};

/**
 * Get model performance
 */
export const getModelPerformance = (modelId: string): Promise<ModelPerformance[]> => {
  return apiRequest<ModelPerformance[]>(`/api/models/${modelId}/performance`);
};

/**
 * Get model documentation
 */
export const getModelDocumentation = (modelId: string): Promise<ModelDocumentation> => {
  return apiRequest<ModelDocumentation>(`/api/models/${modelId}/documentation`);
};

/**
 * Compare multiple models
 */
export const compareModels = (modelIds: string[]): Promise<ModelComparison> => {
  return apiRequest<ModelComparison>('/api/models/compare', 'POST', undefined, { modelIds });
};

/**
 * Bookmark a model (toggle)
 */
export const toggleModelBookmark = (modelId: string): Promise<{ isBookmarked: boolean }> => {
  return apiRequest<{ isBookmarked: boolean }>(`/api/models/${modelId}/bookmark`, 'POST');
};

/**
 * Get bookmarked models
 */
export const getBookmarkedModels = (): Promise<Model[]> => {
  return apiRequest<Model[]>('/api/models/bookmarks');
};

// -------------------- Mock Implementation --------------------

/**
 * Generate a mock model
 */
export const generateMockModel = (
  id: string,
  modelType: ModelType | string = ModelType.LLM,
  isBookmarked: boolean = false
): Model => {
  // Generate model sizes based on type
  let parameters: number;
  if (modelType === ModelType.LLM) {
    parameters = [7, 13, 20, 34, 70][Math.floor(Math.random() * 5)];
  } else if (modelType === ModelType.SLM) {
    parameters = [0.1, 0.3, 0.5, 1.1, 3][Math.floor(Math.random() * 5)];
  } else {
    parameters = [0.1, 0.3, 0.5, 1, 3][Math.floor(Math.random() * 5)];
  }
  
  // Generate model names based on type
  let name: string;
  if (modelType === ModelType.LLM) {
    name = `ArtIntel-${parameters}B${Math.random() > 0.7 ? '-Chat' : ''}`;
  } else if (modelType === ModelType.SLM) {
    name = `TinyAI-${parameters}B`;
  } else {
    name = `ArtIntel-${['Code', 'Vision', 'Assistant', 'Summarizer'][Math.floor(Math.random() * 4)]}`;
  }
  
  // Generate task types based on model type
  const taskTypes = modelType === ModelType.LLM || modelType === ModelType.SLM
    ? [ModelTaskType.TEXT_GENERATION, ModelTaskType.CHAT, ModelTaskType.QUESTION_ANSWERING]
    : [ModelTaskType.CLASSIFICATION, ModelTaskType.SUMMARIZATION, ModelTaskType.TRANSLATION, ModelTaskType.CODE_GENERATION];
  
  // Generate tiers with weighted distribution
  const tiers = [
    ModelTier.FREE, ModelTier.FREE, ModelTier.FREE,
    ModelTier.PRO, ModelTier.PRO,
    ModelTier.ENTERPRISE
  ];
  
  // Generate tags
  const allTags = [
    'text-generation', 'multilingual', 'chat', 'instruct', 'gpt', 'language-model',
    'fine-tuned', 'code', 'medical', 'finance', 'legal', 'optimized', 'edge-deployable',
    'low-latency', 'high-throughput', 'distilled', 'quantized'
  ];
  
  // Select 2-4 random tags
  const tagCount = 2 + Math.floor(Math.random() * 3);
  const shuffledTags = [...allTags].sort(() => 0.5 - Math.random());
  const tags = shuffledTags.slice(0, tagCount);
  
  // Generate context window based on model size
  const contextWindow = modelType === ModelType.SLM 
    ? 1024 + Math.floor(Math.random() * 3) * 1024 // 1k-4k for SLMs
    : 4096 + Math.floor(Math.random() * 4) * 2048; // 4k-12k for LLMs
  
  return {
    id,
    name,
    displayName: name,
    version: `${1 + Math.floor(Math.random() * 3)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
    modelType,
    framework: [ModelFramework.PYTORCH, ModelFramework.TENSORFLOW, ModelFramework.TRANSFORMERS][Math.floor(Math.random() * 3)],
    taskType: taskTypes[Math.floor(Math.random() * taskTypes.length)],
    description: `${name} is a ${parameters}B parameter model for ${taskTypes[Math.floor(Math.random() * taskTypes.length)].replace('-', ' ')}. ${
      modelType === ModelType.SLM 
        ? 'Optimized for efficiency and edge deployment with minimal resource requirements.' 
        : 'Designed for high accuracy and comprehensive understanding of complex tasks.'
    }`,
    parameters: parameters.toString(),
    modelSize: parameters * (0.5 + Math.random() * 0.5), // approximate GB size
    license: ['Apache 2.0', 'MIT', 'CC BY-SA 4.0', 'Proprietary'][Math.floor(Math.random() * 4)],
    author: 'ArtIntel AI Research',
    tier: tiers[Math.floor(Math.random() * tiers.length)],
    tags,
    imageUrl: `/models/${id}.jpg`,
    status: [ModelStatus.RUNNING, ModelStatus.PAUSED][Math.floor(Math.random() * 2)],
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(), // Random date in last 90 days
    updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random date in last 30 days
    isBookmarked,
    metrics: {
      accuracy: 0.7 + Math.random() * 0.25,
      latency: modelType === ModelType.SLM ? 10 + Math.random() * 40 : 50 + Math.random() * 450, // Lower latency for SLMs
      throughput: modelType === ModelType.SLM ? 150 + Math.random() * 350 : 50 + Math.random() * 150, // Higher throughput for SLMs
      memoryUsage: modelType === ModelType.SLM ? 100 + Math.random() * 900 : 1000 + Math.random() * 9000, // Lower memory for SLMs
      gpuUsage: modelType === ModelType.SLM ? 10 + Math.random() * 30 : 40 + Math.random() * 50, // Lower GPU usage for SLMs
      reliability: 0.95 + Math.random() * 0.05,
      costEfficiency: modelType === ModelType.SLM ? 7 + Math.random() * 3 : 4 + Math.random() * 5,
    },
    pricing: {
      pricePerRequest: modelType === ModelType.SLM ? 0.001 + Math.random() * 0.009 : 0.01 + Math.random() * 0.09,
      pricePerToken: modelType === ModelType.SLM ? 0.00001 + Math.random() * 0.00009 : 0.0001 + Math.random() * 0.0009,
      freeQuota: modelType === ModelType.SLM ? 1000000 : 100000,
      subscriptionCost: modelType === ModelType.SLM ? 5 + Math.random() * 15 : 20 + Math.random() * 80,
      payAsYouGo: true,
    },
    architecture: {
      framework: [ModelFramework.PYTORCH, ModelFramework.TENSORFLOW, ModelFramework.TRANSFORMERS][Math.floor(Math.random() * 3)],
      layers: modelType === ModelType.SLM ? 6 + Math.floor(Math.random() * 6) : 12 + Math.floor(Math.random() * 24),
      attentionHeads: modelType === ModelType.SLM ? 6 + Math.floor(Math.random() * 6) : 16 + Math.floor(Math.random() * 16),
      contextWindow: contextWindow,
      trainingData: ['Custom dataset', 'Web corpus', 'Books and articles', 'Code repositories'][Math.floor(Math.random() * 4)],
      quantization: modelType === ModelType.SLM ? ['INT8', 'INT4', 'GPTQ', 'AWQ'][Math.floor(Math.random() * 4)] : undefined,
      modelArchitecture: ['Transformer', 'Decoder-only', 'Encoder-decoder', 'MoE'][Math.floor(Math.random() * 4)],
      parameterEfficiency: 0.7 + Math.random() * 0.3,
    },
    resourceRequirements: {
      minCPU: modelType === ModelType.SLM ? '1 vCPU' : '2 vCPU',
      minMemory: modelType === ModelType.SLM ? '2GB' : '8GB',
      recommendedGPU: modelType === ModelType.SLM ? 'Any GPU / CPU only' : 'NVIDIA T4 or better',
      minDiskSpace: modelType === ModelType.SLM ? '500MB' : '2GB',
      optimizedHardware: modelType === ModelType.SLM ? ['CPU', 'Edge devices', 'Mobile'] : ['NVIDIA GPUs', 'AMD GPUs', 'TPUs'],
      deploymentOptions: ['Docker', 'Kubernetes', 'Cloud API', 'Edge device'],
    },
    documentation: {
      technicalDocs: 'https://example.com/technical-docs',
      examples: ['Text generation', 'Chat completion', 'Instruction following', 'Code completion', 'Data extraction'],
      papers: ['https://arxiv.org/abs/2302.13971', 'https://arxiv.org/abs/2310.06825'],
      githubRepo: 'https://github.com/artintel/models',
      communityForums: ['Discord', 'Reddit', 'Stack Overflow'],
      tutorials: ['Getting started', 'Fine-tuning guide', 'Prompt engineering'],
      bestPractices: ['Prompt engineering', 'Model calibration', 'Deployment strategies'],
    },
    contextLength: contextWindow,
    creator: 'ArtIntel AI Research',
    licenseType: ['Apache 2.0', 'MIT', 'CC BY-SA 4.0'][Math.floor(Math.random() * 3)],
    languageSupport: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'].slice(0, 2 + Math.floor(Math.random() * 4)),
    finetuningOptions: {
      supported: Math.random() > 0.2,
      methods: ['LoRA', 'QLoRA', 'Full fine-tuning'],
      dataRequirements: '1,000+ examples recommended',
      complexity: ['Easy', 'Medium', 'Advanced'][Math.floor(Math.random() * 3)] as 'Easy' | 'Medium' | 'Advanced',
    },
    benchmarks: [
      {
        name: 'MMLU',
        score: 0.6 + Math.random() * 0.3,
        date: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        name: 'HumanEval',
        score: 0.5 + Math.random() * 0.4,
        date: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ],
    useCase: ['Enterprise chatbot', 'Content generation', 'Code assistant', 'Research analysis'].slice(0, 1 + Math.floor(Math.random() * 3)),
    lastUpdate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    communityRating: 3.5 + Math.random() * 1.5,
    trainingDataset: ['CommonCrawl', 'The Pile', 'Custom mix', 'Refined web corpus'][Math.floor(Math.random() * 4)],
  };
};

/**
 * Generate mock metrics for a model
 */
export const generateMockModelMetrics = (modelId: string): ModelMetrics => {
  return {
    id: `metric-${Math.random().toString(36).substring(2, 10)}`,
    modelId,
    accuracy: 0.7 + Math.random() * 0.25,
    precision: 0.7 + Math.random() * 0.25,
    recall: 0.7 + Math.random() * 0.25,
    f1Score: 0.7 + Math.random() * 0.25,
    latency: 50 + Math.random() * 450, // 50-500ms
    throughput: 50 + Math.random() * 150, // tokens/sec
    memoryUsage: 1000 + Math.random() * 9000, // 1-10GB
    gpuUsage: 30 + Math.random() * 70, // percentage
    errorRate: Math.random() * 0.05, // 0-5%
    timestamp: new Date().toISOString()
  };
};

/**
 * Mock implementation for getModels
 */
export const mockGetModels = (
  filters?: ModelFilterParams
): Promise<PaginatedResponse<Model>> => {
  // Get the current bookmarked models from localStorage
  const bookmarkedModelsStr = typeof window !== 'undefined' ? localStorage.getItem('BOOKMARKED_MODELS') : null;
  const bookmarkedModelIds: string[] = bookmarkedModelsStr ? JSON.parse(bookmarkedModelsStr) : [];
  
  // Generate models
  const mockModels: Model[] = [];
  
  // Generate LLMs
  for (let i = 1; i <= 10; i++) {
    const modelId = `llm-${i}`;
    const isBookmarked = bookmarkedModelIds.includes(modelId);
    mockModels.push(generateMockModel(modelId, ModelType.LLM, isBookmarked));
  }
  
  // Generate SLMs
  for (let i = 1; i <= 6; i++) {
    const modelId = `slm-${i}`;
    const isBookmarked = bookmarkedModelIds.includes(modelId);
    mockModels.push(generateMockModel(modelId, ModelType.SLM, isBookmarked));
  }
  
  // Generate Chat LLMs
  for (let i = 1; i <= 4; i++) {
    const modelId = `chat-${i}`;
    const isBookmarked = bookmarkedModelIds.includes(modelId);
    mockModels.push(generateMockModel(modelId, ModelType.CHAT_LLM, isBookmarked));
  }
  
  // Generate vision models
  for (let i = 1; i <= 3; i++) {
    const modelId = `vision-${i}`;
    const isBookmarked = bookmarkedModelIds.includes(modelId);
    mockModels.push(generateMockModel(modelId, ModelType.VISION, isBookmarked));
  }
  
  // Generate code models
  for (let i = 1; i <= 2; i++) {
    const modelId = `code-${i}`;
    const isBookmarked = bookmarkedModelIds.includes(modelId);
    mockModels.push(generateMockModel(modelId, ModelType.CODE, isBookmarked));
  }

  // Add specific real-world models
  const realModels = [
    {
      id: 'mistral-7b',
      name: 'Mistral-7B',
      displayName: 'Mistral-7B',
      version: '0.1',
      modelType: ModelType.LLM,
      framework: ModelFramework.PYTORCH,
      taskType: ModelTaskType.TEXT_GENERATION,
      description: 'A transformer-based language model with 7 billion parameters, delivering outstanding performance for its size.',
      parameters: '7',
      modelSize: 13.4,
      license: 'Apache 2.0',
      author: 'Mistral AI',
      tier: ModelTier.FREE,
      tags: ['General Purpose', 'English', 'Instruction-following'],
      status: ModelStatus.RUNNING,
      createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      isBookmarked: bookmarkedModelIds.includes('mistral-7b'),
      creator: 'Mistral AI',
      metrics: {
        accuracy: 0.82,
        latency: 150,
        throughput: 1500,
        memoryUsage: 14000,
        gpuUsage: 80,
        reliability: 0.98,
        costEfficiency: 8.5
      },
      pricing: {
        pricePerRequest: 0,
        pricePerToken: 0,
        freeQuota: 0,
        payAsYouGo: false
      },
      architecture: {
        framework: 'pytorch',
        layers: 32,
        attentionHeads: 32,
        contextWindow: 8192,
        trainingData: 'Custom dataset',
        modelArchitecture: 'Decoder-only Transformer',
        parameterEfficiency: 0.9
      },
      resourceRequirements: {
        minCPU: '4 cores',
        minMemory: '16GB',
        recommendedGPU: 'NVIDIA A10',
        minDiskSpace: '30GB',
        optimizedHardware: ['NVIDIA A10', 'NVIDIA A100', 'NVIDIA T4'],
        deploymentOptions: ['Docker', 'HuggingFace', 'API']
      },
      documentation: {
        technicalDocs: 'https://mistral.ai/news/announcing-mistral-7b/',
        examples: ['Text generation', 'Chat completion', 'Instruction following', 'Reasoning', 'Knowledge QA'],
        papers: ['https://arxiv.org/abs/2310.06825'],
        githubRepo: 'https://github.com/mistralai/mistral-7b',
        tutorials: ['Getting started', 'Fine-tuning guide', 'Prompt engineering']
      },
      contextLength: 8192,
      languageSupport: ['English', 'French', 'German', 'Spanish', 'Italian'],
      finetuningOptions: {
        supported: true,
        methods: ['LoRA', 'QLoRA', 'Full fine-tuning'],
        dataRequirements: '1,000+ examples recommended',
        complexity: 'Medium'
      },
      benchmarks: [
        {
          name: 'MMLU',
          score: 0.64,
          date: '2023-09-15'
        },
        {
          name: 'HumanEval',
          score: 0.30,
          date: '2023-09-15'
        }
      ],
      useCase: ['Enterprise chatbot', 'Content generation', 'Research assistant']
    },
    {
      id: 'llama-2-7b',
      name: 'Llama-2-7B',
      displayName: 'Llama-2-7B',
      version: '2.0',
      modelType: ModelType.LLM,
      framework: ModelFramework.PYTORCH,
      taskType: ModelTaskType.TEXT_GENERATION,
      description: 'Meta AI\'s open-source language model with 7 billion parameters, trained on a diverse dataset of text sources.',
      parameters: '7',
      modelSize: 13.0,
      license: 'Llama 2 Community License',
      author: 'Meta AI',
      tier: ModelTier.FREE,
      tags: ['General Purpose', 'English', 'Research', 'Open Source'],
      status: ModelStatus.RUNNING,
      createdAt: new Date(Date.now() - 220 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      isBookmarked: bookmarkedModelIds.includes('llama-2-7b'),
      creator: 'Meta AI',
      metrics: {
        accuracy: 0.78,
        latency: 180,
        throughput: 1200,
        memoryUsage: 13500,
        gpuUsage: 75,
        reliability: 0.96,
        costEfficiency: 8.0
      },
      pricing: {
        pricePerRequest: 0,
        pricePerToken: 0,
        freeQuota: 0,
        payAsYouGo: false
      },
      architecture: {
        framework: 'pytorch',
        layers: 32,
        attentionHeads: 32,
        contextWindow: 4096,
        trainingData: 'Mixed internet data',
        modelArchitecture: 'Decoder-only Transformer',
        parameterEfficiency: 0.85
      },
      resourceRequirements: {
        minCPU: '4 cores',
        minMemory: '16GB',
        recommendedGPU: 'NVIDIA A10',
        minDiskSpace: '28GB',
        optimizedHardware: ['NVIDIA A10', 'NVIDIA A100', 'NVIDIA T4'],
        deploymentOptions: ['Docker', 'HuggingFace', 'API']
      },
      documentation: {
        technicalDocs: 'https://ai.meta.com/llama/',
        examples: ['Text generation', 'Question answering', 'Conversational AI', 'Content creation'],
        papers: ['https://arxiv.org/abs/2307.09288'],
        githubRepo: 'https://github.com/facebookresearch/llama',
        tutorials: ['Getting started', 'Fine-tuning', 'Deployment options']
      },
      contextLength: 4096,
      languageSupport: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese'],
      finetuningOptions: {
        supported: true,
        methods: ['LoRA', 'QLoRA', 'Full fine-tuning', 'P-tuning'],
        dataRequirements: '1,000+ examples recommended',
        complexity: 'Medium'
      },
      benchmarks: [
        {
          name: 'MMLU',
          score: 0.54,
          date: '2023-07-20'
        },
        {
          name: 'HumanEval',
          score: 0.18,
          date: '2023-07-20'
        }
      ],
      useCase: ['Research', 'Text generation', 'Chatbots', 'Content creation']
    },
    {
      id: 'tinyllama-1b',
      name: 'TinyLlama-1.1B',
      displayName: 'TinyLlama-1.1B',
      version: '1.0',
      modelType: ModelType.SLM,
      framework: ModelFramework.PYTORCH,
      taskType: ModelTaskType.TEXT_GENERATION,
      description: 'A small language model with 1.1 billion parameters, optimized for efficiency and edge deployment.',
      parameters: '1.1',
      modelSize: 1.5,
      license: 'Apache 2.0',
      author: 'TinyLlama Team',
      tier: ModelTier.FREE,
      tags: ['Efficient', 'Edge', 'Lightweight', 'Small'],
      status: ModelStatus.RUNNING,
      createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      isBookmarked: bookmarkedModelIds.includes('tinyllama-1b'),
      creator: 'TinyLlama Team',
      metrics: {
        accuracy: 0.68,
        latency: 30,
        throughput: 2500,
        memoryUsage: 1500,
        gpuUsage: 20,
        reliability: 0.99,
        costEfficiency: 9.5
      },
      pricing: {
        pricePerRequest: 0,
        pricePerToken: 0,
        freeQuota: 0,
        payAsYouGo: false
      },
      architecture: {
        framework: 'pytorch',
        layers: 18,
        attentionHeads: 12,
        contextWindow: 2048,
        trainingData: 'Distilled from Llama-2',
        modelArchitecture: 'Decoder-only Transformer',
        parameterEfficiency: 0.95,
        quantization: 'INT8'
      },
      resourceRequirements: {
        minCPU: '2 cores',
        minMemory: '4GB',
        recommendedGPU: 'Any GPU or CPU only',
        minDiskSpace: '3GB',
        optimizedHardware: ['CPU', 'Mobile devices', 'Edge computing', 'Raspberry Pi 4'],
        deploymentOptions: ['Docker', 'ONNX Runtime', 'TFLite', 'PyTorch Mobile']
      },
      documentation: {
        technicalDocs: 'https://github.com/tinyllama/tinyllama',
        examples: ['Lightweight text generation', 'Edge device deployment', 'Mobile applications', 'Low-resource computing'],
        papers: ['https://arxiv.org/abs/2311.11991'],
        githubRepo: 'https://github.com/tinyllama/tinyllama',
        tutorials: ['Edge deployment', 'Quantization guide', 'Mobile integration']
      },
      contextLength: 2048,
      languageSupport: ['English'],
      finetuningOptions: {
        supported: true,
        methods: ['LoRA', 'QLoRA', 'PEFT'],
        dataRequirements: '500+ examples recommended',
        complexity: 'Easy'
      },
      benchmarks: [
        {
          name: 'MMLU',
          score: 0.42,
          date: '2023-11-10'
        },
        {
          name: 'TinyBench',
          score: 0.75,
          date: '2023-11-15'
        }
      ],
      useCase: ['Edge devices', 'Mobile applications', 'Embedded systems', 'Low-resource environments']
    }
  ];
  
  // Add real models to the mock models list
  mockModels.push(...realModels);
  
  // Apply filters if provided
  let filteredModels = [...mockModels];
  
  if (filters) {
    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredModels = filteredModels.filter(model => 
        model.name.toLowerCase().includes(searchTerm) || 
        model.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by model type
    if (filters.modelType) {
      filteredModels = filteredModels.filter(model => model.modelType === filters.modelType);
    }
    
    // Filter by framework
    if (filters.framework) {
      filteredModels = filteredModels.filter(model => model.framework === filters.framework);
    }
    
    // Filter by task type
    if (filters.taskType && filters.taskType.length > 0) {
      filteredModels = filteredModels.filter(model => 
        filters.taskType?.includes(model.taskType)
      );
    }
    
    // Filter by tier
    if (filters.tier && filters.tier.length > 0) {
      filteredModels = filteredModels.filter(model => 
        filters.tier?.includes(model.tier)
      );
    }
    
    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      filteredModels = filteredModels.filter(model => 
        filters.tags?.some(tag => model.tags.includes(tag))
      );
    }
    
    // Filter by parameters
    if (filters.minParameters) {
      filteredModels = filteredModels.filter(model => model.parameters >= (filters.minParameters || 0));
    }
    if (filters.maxParameters) {
      filteredModels = filteredModels.filter(model => model.parameters <= (filters.maxParameters || Infinity));
    }
    
    // Filter by status
    if (filters.status && filters.status.length > 0) {
      filteredModels = filteredModels.filter(model => 
        filters.status?.includes(model.status)
      );
    }
    
    // Sort models
    if (filters.sort) {
      filteredModels.sort((a, b) => {
        let comparison = 0;
        
        switch (filters.sort) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'created':
            comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            break;
          case 'updated':
            comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
            break;
          case 'parameters':
            comparison = a.parameters - b.parameters;
            break;
          default:
            comparison = 0;
        }
        
        return filters.order === 'desc' ? -comparison : comparison;
      });
    }
  }
  
  // Apply pagination
  const page = filters?.page || 1;
  const limit = filters?.limit || 10;
  const offset = (page - 1) * limit;
  const paginatedModels = filteredModels.slice(offset, offset + limit);
  
  return Promise.resolve({
    items: paginatedModels,
    total: filteredModels.length,
    page,
    limit,
    pages: Math.ceil(filteredModels.length / limit)
  });
};

/**
 * Mock implementation for getModel
 */
export const mockGetModel = (modelId: string): Promise<Model> => {
  // Get the current bookmarked models from localStorage
  const bookmarkedModelsStr = typeof window !== 'undefined' ? localStorage.getItem('BOOKMARKED_MODELS') : null;
  const bookmarkedModelIds: string[] = bookmarkedModelsStr ? JSON.parse(bookmarkedModelsStr) : [];
  
  // Define our real-world models with detailed information
  const realModels = [
    {
      id: 'mistral-7b',
      name: 'Mistral-7B',
      displayName: 'Mistral-7B',
      version: '0.1',
      modelType: ModelType.LLM,
      framework: ModelFramework.PYTORCH,
      taskType: ModelTaskType.TEXT_GENERATION,
      description: 'A transformer-based language model with 7 billion parameters, delivering outstanding performance for its size.',
      parameters: '7',
      modelSize: 13.4,
      license: 'Apache 2.0',
      author: 'Mistral AI',
      tier: ModelTier.FREE,
      tags: ['General Purpose', 'English', 'Instruction-following'],
      status: ModelStatus.RUNNING,
      createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      isBookmarked: bookmarkedModelIds.includes('mistral-7b'),
      creator: 'Mistral AI',
      metrics: {
        accuracy: 0.82,
        latency: 150,
        throughput: 1500,
        memoryUsage: 14000,
        gpuUsage: 80,
        reliability: 0.98,
        costEfficiency: 8.5
      },
      pricing: {
        pricePerRequest: 0,
        pricePerToken: 0,
        freeQuota: 0,
        payAsYouGo: false
      },
      architecture: {
        framework: 'pytorch',
        layers: 32,
        attentionHeads: 32,
        contextWindow: 8192,
        trainingData: 'Custom dataset',
        modelArchitecture: 'Decoder-only Transformer',
        parameterEfficiency: 0.9
      },
      resourceRequirements: {
        minCPU: '4 cores',
        minMemory: '16GB',
        recommendedGPU: 'NVIDIA A10',
        minDiskSpace: '30GB',
        optimizedHardware: ['NVIDIA A10', 'NVIDIA A100', 'NVIDIA T4'],
        deploymentOptions: ['Docker', 'HuggingFace', 'API']
      },
      documentation: {
        technicalDocs: 'https://mistral.ai/news/announcing-mistral-7b/',
        examples: ['Text generation', 'Chat completion', 'Instruction following', 'Reasoning', 'Knowledge QA'],
        papers: ['https://arxiv.org/abs/2310.06825'],
        githubRepo: 'https://github.com/mistralai/mistral-7b',
        tutorials: ['Getting started', 'Fine-tuning guide', 'Prompt engineering']
      },
      contextLength: 8192,
      languageSupport: ['English', 'French', 'German', 'Spanish', 'Italian'],
      finetuningOptions: {
        supported: true,
        methods: ['LoRA', 'QLoRA', 'Full fine-tuning'],
        dataRequirements: '1,000+ examples recommended',
        complexity: 'Medium'
      },
      benchmarks: [
        {
          name: 'MMLU',
          score: 0.64,
          date: '2023-09-15'
        },
        {
          name: 'HumanEval',
          score: 0.30,
          date: '2023-09-15'
        }
      ],
      useCase: ['Enterprise chatbot', 'Content generation', 'Research assistant']
    },
    {
      id: 'llama-2-7b',
      name: 'Llama-2-7B',
      displayName: 'Llama-2-7B',
      version: '2.0',
      modelType: ModelType.LLM,
      framework: ModelFramework.PYTORCH,
      taskType: ModelTaskType.TEXT_GENERATION,
      description: 'Meta AI\'s open-source language model with 7 billion parameters, trained on a diverse dataset of text sources.',
      parameters: '7',
      modelSize: 13.0,
      license: 'Llama 2 Community License',
      author: 'Meta AI',
      tier: ModelTier.FREE,
      tags: ['General Purpose', 'English', 'Research', 'Open Source'],
      status: ModelStatus.RUNNING,
      createdAt: new Date(Date.now() - 220 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      isBookmarked: bookmarkedModelIds.includes('llama-2-7b'),
      creator: 'Meta AI',
      metrics: {
        accuracy: 0.78,
        latency: 180,
        throughput: 1200,
        memoryUsage: 13500,
        gpuUsage: 75,
        reliability: 0.96,
        costEfficiency: 8.0
      },
      pricing: {
        pricePerRequest: 0,
        pricePerToken: 0,
        freeQuota: 0,
        payAsYouGo: false
      },
      architecture: {
        framework: 'pytorch',
        layers: 32,
        attentionHeads: 32,
        contextWindow: 4096,
        trainingData: 'Mixed internet data',
        modelArchitecture: 'Decoder-only Transformer',
        parameterEfficiency: 0.85
      },
      resourceRequirements: {
        minCPU: '4 cores',
        minMemory: '16GB',
        recommendedGPU: 'NVIDIA A10',
        minDiskSpace: '28GB',
        optimizedHardware: ['NVIDIA A10', 'NVIDIA A100', 'NVIDIA T4'],
        deploymentOptions: ['Docker', 'HuggingFace', 'API']
      },
      documentation: {
        technicalDocs: 'https://ai.meta.com/llama/',
        examples: ['Text generation', 'Question answering', 'Conversational AI', 'Content creation'],
        papers: ['https://arxiv.org/abs/2307.09288'],
        githubRepo: 'https://github.com/facebookresearch/llama',
        tutorials: ['Getting started', 'Fine-tuning', 'Deployment options']
      },
      contextLength: 4096,
      languageSupport: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese'],
      finetuningOptions: {
        supported: true,
        methods: ['LoRA', 'QLoRA', 'Full fine-tuning', 'P-tuning'],
        dataRequirements: '1,000+ examples recommended',
        complexity: 'Medium'
      },
      benchmarks: [
        {
          name: 'MMLU',
          score: 0.54,
          date: '2023-07-20'
        },
        {
          name: 'HumanEval',
          score: 0.18,
          date: '2023-07-20'
        }
      ],
      useCase: ['Research', 'Text generation', 'Chatbots', 'Content creation']
    },
    {
      id: 'tinyllama-1b',
      name: 'TinyLlama-1.1B',
      displayName: 'TinyLlama-1.1B',
      version: '1.0',
      modelType: ModelType.SLM,
      framework: ModelFramework.PYTORCH,
      taskType: ModelTaskType.TEXT_GENERATION,
      description: 'A small language model with 1.1 billion parameters, optimized for efficiency and edge deployment.',
      parameters: '1.1',
      modelSize: 1.5,
      license: 'Apache 2.0',
      author: 'TinyLlama Team',
      tier: ModelTier.FREE,
      tags: ['Efficient', 'Edge', 'Lightweight', 'Small'],
      status: ModelStatus.RUNNING,
      createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      isBookmarked: bookmarkedModelIds.includes('tinyllama-1b'),
      creator: 'TinyLlama Team',
      metrics: {
        accuracy: 0.68,
        latency: 30,
        throughput: 2500,
        memoryUsage: 1500,
        gpuUsage: 20,
        reliability: 0.99,
        costEfficiency: 9.5
      },
      pricing: {
        pricePerRequest: 0,
        pricePerToken: 0,
        freeQuota: 0,
        payAsYouGo: false
      },
      architecture: {
        framework: 'pytorch',
        layers: 18,
        attentionHeads: 12,
        contextWindow: 2048,
        trainingData: 'Distilled from Llama-2',
        modelArchitecture: 'Decoder-only Transformer',
        parameterEfficiency: 0.95,
        quantization: 'INT8'
      },
      resourceRequirements: {
        minCPU: '2 cores',
        minMemory: '4GB',
        recommendedGPU: 'Any GPU or CPU only',
        minDiskSpace: '3GB',
        optimizedHardware: ['CPU', 'Mobile devices', 'Edge computing', 'Raspberry Pi 4'],
        deploymentOptions: ['Docker', 'ONNX Runtime', 'TFLite', 'PyTorch Mobile']
      },
      documentation: {
        technicalDocs: 'https://github.com/tinyllama/tinyllama',
        examples: ['Lightweight text generation', 'Edge device deployment', 'Mobile applications', 'Low-resource computing'],
        papers: ['https://arxiv.org/abs/2311.11991'],
        githubRepo: 'https://github.com/tinyllama/tinyllama',
        tutorials: ['Edge deployment', 'Quantization guide', 'Mobile integration']
      },
      contextLength: 2048,
      languageSupport: ['English'],
      finetuningOptions: {
        supported: true,
        methods: ['LoRA', 'QLoRA', 'PEFT'],
        dataRequirements: '500+ examples recommended',
        complexity: 'Easy'
      },
      benchmarks: [
        {
          name: 'MMLU',
          score: 0.42,
          date: '2023-11-10'
        },
        {
          name: 'TinyBench',
          score: 0.75,
          date: '2023-11-15'
        }
      ],
      useCase: ['Edge devices', 'Mobile applications', 'Embedded systems', 'Low-resource environments']
    },
    {
      id: 'phi-3-mini',
      name: 'Phi-3-Mini',
      displayName: 'Phi-3-Mini',
      version: '3.0',
      modelType: ModelType.SLM,
      framework: ModelFramework.PYTORCH,
      taskType: ModelTaskType.TEXT_GENERATION,
      description: 'Microsoft\'s small language model (3.8B parameters) with impressive capabilities for its size, optimized for efficiency and code generation.',
      parameters: '3.8',
      modelSize: 6.5,
      license: 'Microsoft License',
      author: 'Microsoft Research',
      tier: ModelTier.FREE,
      tags: ['Small', 'Efficient', 'Code', 'Reasoning'],
      status: ModelStatus.RUNNING,
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      isBookmarked: bookmarkedModelIds.includes('phi-3-mini'),
      creator: 'Microsoft Research',
      metrics: {
        accuracy: 0.76,
        latency: 45,
        throughput: 2200,
        memoryUsage: 7500,
        gpuUsage: 35,
        reliability: 0.98,
        costEfficiency: 9.2
      },
      pricing: {
        pricePerRequest: 0,
        pricePerToken: 0,
        freeQuota: 0,
        payAsYouGo: false
      },
      architecture: {
        framework: 'pytorch',
        layers: 24,
        attentionHeads: 32,
        contextWindow: 4096,
        trainingData: 'Synthetic and curated data',
        modelArchitecture: 'Decoder-only Transformer',
        parameterEfficiency: 0.92,
        quantization: 'Available in INT8 and INT4'
      },
      resourceRequirements: {
        minCPU: '4 cores',
        minMemory: '8GB',
        recommendedGPU: 'NVIDIA T4 or better',
        minDiskSpace: '10GB',
        optimizedHardware: ['NVIDIA GPUs', 'Azure VMs', 'CPU deployment'],
        deploymentOptions: ['Docker', 'Azure AI', 'HuggingFace', 'ONNX']
      },
      documentation: {
        technicalDocs: 'https://www.microsoft.com/en-us/research/blog/phi-3-technical-report/',
        examples: ['Code generation', 'Reasoning tasks', 'Instruction following', 'Chat completion'],
        papers: ['https://arxiv.org/abs/2404.14219'],
        githubRepo: 'https://github.com/microsoft/phi',
        tutorials: ['Getting started', 'Fine-tuning', 'Low-resource deployment'],
        bestPractices: ['Prompt engineering', 'Context structuring', 'Few-shot learning']
      },
      contextLength: 4096,
      languageSupport: ['English', 'Code (multiple languages)'],
      finetuningOptions: {
        supported: true,
        methods: ['LoRA', 'QLoRA', 'Full fine-tuning'],
        dataRequirements: '1000+ examples recommended',
        complexity: 'Medium'
      },
      benchmarks: [
        {
          name: 'MMLU',
          score: 0.70,
          date: '2024-03-15'
        },
        {
          name: 'HumanEval',
          score: 0.48,
          date: '2024-03-15'
        },
        {
          name: 'GSM8K',
          score: 0.75,
          date: '2024-03-15'
        }
      ],
      useCase: ['Code assistance', 'Educational tools', 'Research', 'Lightweight applications']
    },
    {
      id: 'stable-diffusion-3',
      name: 'Stable Diffusion 3',
      displayName: 'Stable Diffusion 3',
      version: '3.0',
      modelType: ModelType.VISION,
      framework: ModelFramework.PYTORCH,
      taskType: 'Image Generation',
      description: 'A state-of-the-art text-to-image diffusion model capable of generating highly realistic and creative visuals from text prompts.',
      parameters: '3.5B',
      modelSize: 7.5,
      license: 'CreativeML Open RAIL-M',
      author: 'Stability AI',
      tier: ModelTier.PRO,
      tags: ['Text-to-Image', 'Diffusion', 'Creative', 'High-Resolution'],
      status: ModelStatus.RUNNING,
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      isBookmarked: bookmarkedModelIds.includes('stable-diffusion-3'),
      creator: 'Stability AI',
      metrics: {
        accuracy: 0.92,
        latency: 1200,
        throughput: 3,
        memoryUsage: 16000,
        gpuUsage: 95,
        reliability: 0.96,
        costEfficiency: 7.5
      },
      pricing: {
        pricePerRequest: 0.02,
        pricePerToken: null,
        freeQuota: 100,
        subscriptionCost: 20,
        payAsYouGo: true
      },
      architecture: {
        framework: 'pytorch',
        layers: 75,
        attentionHeads: 32,
        contextWindow: null,
        trainingData: 'Billions of image-text pairs',
        modelArchitecture: 'Latent Diffusion',
        parameterEfficiency: 0.88
      },
      resourceRequirements: {
        minCPU: '8 cores',
        minMemory: '16GB',
        recommendedGPU: 'NVIDIA RTX 3090 or better',
        minDiskSpace: '20GB',
        optimizedHardware: ['NVIDIA A100', 'NVIDIA RTX 40 series', 'NVIDIA RTX 30 series'],
        deploymentOptions: ['Docker', 'API', 'Local installation']
      },
      documentation: {
        technicalDocs: 'https://stability.ai/stable-diffusion-3',
        examples: ['Photorealistic imagery', 'Artistic compositions', 'Product visualization', 'Concept art'],
        papers: ['https://arxiv.org/abs/2403.xxxxx'],
        githubRepo: 'https://github.com/Stability-AI/stablediffusion',
        tutorials: ['Prompt engineering', 'Advanced settings', 'Image editing'],
        bestPractices: ['Effective prompting', 'Negative prompts', 'Style control']
      },
      contextLength: null,
      languageSupport: ['English', 'Spanish', 'French', 'German', 'Japanese'],
      finetuningOptions: {
        supported: true,
        methods: ['Dreambooth', 'Textual Inversion', 'LoRA'],
        dataRequirements: '10-20 images minimum',
        complexity: 'Advanced'
      },
      benchmarks: [
        {
          name: 'FID',
          score: 2.35,
          date: '2024-02-20'
        },
        {
          name: 'CLIP Score',
          score: 0.32,
          date: '2024-02-20'
        }
      ],
      useCase: ['Creative design', 'Digital art', 'Content creation', 'Product visualization']
    },
    {
      id: 'codex-pro',
      name: 'Codex Pro',
      displayName: 'Codex Pro',
      version: '2.1',
      modelType: ModelType.CODE,
      framework: ModelFramework.TENSORFLOW,
      taskType: ModelTaskType.CODE_GENERATION,
      description: 'A specialized code generation model trained on millions of code repositories, optimized for software development tasks and technical problem-solving.',
      parameters: '12',
      modelSize: 22.5,
      license: 'Commercial',
      author: 'ArtIntel AI',
      tier: ModelTier.ENTERPRISE,
      tags: ['Code Generation', 'Programming', 'Software Development', 'Multi-language'],
      status: ModelStatus.RUNNING,
      createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      isBookmarked: bookmarkedModelIds.includes('codex-pro'),
      creator: 'ArtIntel AI Research',
      metrics: {
        accuracy: 0.86,
        latency: 200,
        throughput: 800,
        memoryUsage: 20000,
        gpuUsage: 85,
        reliability: 0.97,
        costEfficiency: 8.0
      },
      pricing: {
        pricePerRequest: 0.008,
        pricePerToken: 0.00008,
        freeQuota: 10000,
        subscriptionCost: 59,
        payAsYouGo: true
      },
      architecture: {
        framework: 'tensorflow',
        layers: 48,
        attentionHeads: 40,
        contextWindow: 12288,
        trainingData: 'Public and proprietary code repositories',
        modelArchitecture: 'Transformer with specialized code attention',
        parameterEfficiency: 0.92,
        trainingFLOPs: 1.2e22
      },
      resourceRequirements: {
        minCPU: '8 cores',
        minMemory: '24GB',
        recommendedGPU: 'NVIDIA A10 or better',
        minDiskSpace: '40GB',
        optimizedHardware: ['NVIDIA A100', 'NVIDIA A10', 'TPU v4'],
        deploymentOptions: ['Docker', 'Kubernetes', 'API', 'Private instance']
      },
      documentation: {
        technicalDocs: 'https://artintel.ai/codex-pro/docs',
        examples: ['Code completion', 'Bug fixing', 'Refactoring', 'Documentation generation', 'Test writing'],
        papers: ['https://arxiv.org/abs/2304.xxxxx'],
        githubRepo: 'https://github.com/artintel/codex-examples',
        tutorials: ['Getting started', 'IDE integration', 'Advanced usage'],
        bestPractices: ['Context structuring', 'Comment-driven development', 'Code quality control']
      },
      contextLength: 12288,
      languageSupport: [
        'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C#', 
        'Go', 'Rust', 'PHP', 'Ruby', 'SQL', 'Bash'
      ],
      finetuningOptions: {
        supported: true,
        methods: ['Full fine-tuning', 'Domain adaptation', 'LoRA', 'Organization-specific tuning'],
        dataRequirements: '10,000+ code samples recommended',
        complexity: 'Advanced'
      },
      benchmarks: [
        {
          name: 'HumanEval',
          score: 0.68,
          date: '2023-12-10'
        },
        {
          name: 'MBPP',
          score: 0.72,
          date: '2023-12-10'
        },
        {
          name: 'DS-1000',
          score: 0.64,
          date: '2023-12-10'
        }
      ],
      useCase: ['Software development', 'Code generation', 'Developer productivity', 'Technical support']
    }
  ];
  
  // First look for a specific match in our real models collection
  const specificModel = realModels.find(model => model.id === modelId);
  if (specificModel) {
    return Promise.resolve(specificModel as Model);
  }
  
  // Check if it's one of our generated models
  if (modelId.startsWith('llm-')) {
    return Promise.resolve(generateMockModel(modelId, ModelType.LLM, bookmarkedModelIds.includes(modelId)));
  } else if (modelId.startsWith('slm-')) {
    return Promise.resolve(generateMockModel(modelId, ModelType.SLM, bookmarkedModelIds.includes(modelId)));
  } else if (modelId.startsWith('chat-')) {
    return Promise.resolve(generateMockModel(modelId, ModelType.CHAT_LLM, bookmarkedModelIds.includes(modelId)));
  } else if (modelId.startsWith('vision-')) {
    return Promise.resolve(generateMockModel(modelId, ModelType.VISION, bookmarkedModelIds.includes(modelId)));
  } else if (modelId.startsWith('code-')) {
    return Promise.resolve(generateMockModel(modelId, ModelType.CODE, bookmarkedModelIds.includes(modelId)));
  }
  
  // If no matching model is found, generate a default one
  return Promise.resolve(generateMockModel(modelId, ModelType.LLM, bookmarkedModelIds.includes(modelId)));
};

/**
 * Mock implementation for getModelMetrics
 */
export const mockGetModelMetrics = (modelId: string): Promise<ModelMetrics[]> => {
  // Generate 5 metrics records with slightly different values
  const metrics: ModelMetrics[] = [];
  
  for (let i = 0; i < 5; i++) {
    metrics.push(generateMockModelMetrics(modelId));
  }
  
  return Promise.resolve(metrics);
};

/**
 * Mock implementation for compareModels
 */
export const mockCompareModels = (modelIds: string[]): Promise<ModelComparison> => {
  const models: Model[] = modelIds.map(id => {
    const isLLM = id.startsWith('llm-');
    return generateMockModel(id, isLLM ? ModelType.LLM : ModelType.CHAT_LLM);
  });
  
  const metrics: Record<string, ModelMetrics> = {};
  const performance: Record<string, ModelPerformance> = {};
  
  modelIds.forEach(id => {
    metrics[id] = generateMockModelMetrics(id);
    
    // Generate performance data
    performance[id] = {
      id: `perf-${Math.random().toString(36).substring(2, 10)}`,
      modelId: id,
      inferenceTime: 50 + Math.random() * 200,
      memoryUsage: 1000 + Math.random() * 7000,
      gpuUsage: 20 + Math.random() * 60,
      throughput: 50 + Math.random() * 200,
      timestamp: new Date().toISOString()
    };
  });
  
  return Promise.resolve({
    models,
    metrics,
    performance
  });
};

/**
 * Mock implementation for toggleModelBookmark
 */
export const mockToggleModelBookmark = (modelId: string): Promise<{ isBookmarked: boolean }> => {
  // Get the current bookmarked models from localStorage
  const bookmarkedModelsStr = typeof window !== 'undefined' ? localStorage.getItem('BOOKMARKED_MODELS') : null;
  const bookmarkedModels: string[] = bookmarkedModelsStr ? JSON.parse(bookmarkedModelsStr) : [];
  
  // Check if the model is already bookmarked
  const isCurrentlyBookmarked = bookmarkedModels.includes(modelId);
  
  // Toggle the bookmark status
  if (isCurrentlyBookmarked) {
    // Remove from bookmarks
    const updatedBookmarks = bookmarkedModels.filter(id => id !== modelId);
    localStorage.setItem('BOOKMARKED_MODELS', JSON.stringify(updatedBookmarks));
    return Promise.resolve({ isBookmarked: false });
  } else {
    // Add to bookmarks
    bookmarkedModels.push(modelId);
    localStorage.setItem('BOOKMARKED_MODELS', JSON.stringify(bookmarkedModels));
    return Promise.resolve({ isBookmarked: true });
  }
};

/**
 * Mock implementation for getBookmarkedModels
 */
export const mockGetBookmarkedModels = (): Promise<Model[]> => {
  // Get the current bookmarked models from localStorage
  const bookmarkedModelsStr = typeof window !== 'undefined' ? localStorage.getItem('BOOKMARKED_MODELS') : null;
  const bookmarkedModelIds: string[] = bookmarkedModelsStr ? JSON.parse(bookmarkedModelsStr) : [];
  
  // Generate mock models for each bookmarked ID
  const bookmarkedModels: Model[] = bookmarkedModelIds.map(id => 
    generateMockModel(id, undefined, true)
  );
  
  return Promise.resolve(bookmarkedModels);
};

// -------------------- API Facade (Real or Mock) --------------------

/**
 * API facade that switches between real and mock implementations
 */
export const modelApi = {
  getModels: (filters?: ModelFilterParams): Promise<PaginatedResponse<Model>> => 
    isMockApiEnabled() ? mockGetModels(filters) : getModels(filters),
    
  getModel: (modelId: string): Promise<Model> => 
    isMockApiEnabled() ? mockGetModel(modelId) : getModel(modelId),
    
  getModelMetrics: (modelId: string): Promise<ModelMetrics[]> => 
    isMockApiEnabled() ? mockGetModelMetrics(modelId) : getModelMetrics(modelId),
    
  getModelPerformance: (modelId: string): Promise<ModelPerformance[]> => 
    isMockApiEnabled() ? mockGetModelMetrics(modelId) : getModelPerformance(modelId),
    
  getModelDocumentation: (modelId: string): Promise<ModelDocumentation> => 
    isMockApiEnabled() ? Promise.resolve({} as ModelDocumentation) : getModelDocumentation(modelId),
    
  compareModels: (modelIds: string[]): Promise<ModelComparison> => 
    isMockApiEnabled() ? mockCompareModels(modelIds) : compareModels(modelIds),
    
  toggleModelBookmark: (modelId: string): Promise<{ isBookmarked: boolean }> => 
    isMockApiEnabled() ? mockToggleModelBookmark(modelId) : toggleModelBookmark(modelId),
    
  getBookmarkedModels: (): Promise<Model[]> => 
    isMockApiEnabled() ? mockGetBookmarkedModels() : getBookmarkedModels()
}; 