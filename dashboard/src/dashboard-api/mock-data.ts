import { Model, ModelType, ModelTaskType, ModelStatus } from './model-api';

// Mock model data
export const mockModels: Model[] = [
  {
    id: 'llm-1',
    name: 'GPT-4 Turbo',
    description: 'Advanced large language model optimized for chat with improved reasoning capabilities and expanded knowledge cutoff.',
    modelType: ModelType.CHAT_LLM,
    taskType: ModelTaskType.TEXT_GENERATION,
    version: '1.5',
    parameters: '1760',
    contextLength: 128000,
    creator: 'OpenAI',
    licenseType: 'Proprietary',
    status: ModelStatus.RUNNING,
    metrics: {
      accuracy: 92.5,
      latency: 250,
      throughput: 32.5
    },
    isBookmarked: true,
    tags: ['Conversational', 'Reasoning', 'Long Context'],
    createdAt: '2023-12-10T12:00:00Z',
    updatedAt: '2024-05-28T14:30:00Z'
  },
  {
    id: 'llm-2',
    name: 'Claude 3 Opus',
    description: 'The most powerful model with sophisticated reasoning and the ability to handle complex tasks with remarkably human-like output.',
    modelType: ModelType.CHAT_LLM,
    taskType: ModelTaskType.TEXT_GENERATION,
    version: '3.0',
    parameters: '~1000',
    contextLength: 200000,
    creator: 'Anthropic',
    licenseType: 'Proprietary',
    status: ModelStatus.RUNNING,
    metrics: {
      accuracy: 94.2,
      latency: 280,
      throughput: 30.8
    },
    isBookmarked: false,
    tags: ['Vision', 'High Accuracy', 'Reasoning'],
    createdAt: '2024-03-04T10:00:00Z',
    updatedAt: '2024-06-10T09:15:00Z'
  },
  {
    id: 'llm-3',
    name: 'Llama 3 70B',
    description: 'Meta\'s largest open-source large language model with exceptional reasoning capabilities and knowledge.',
    modelType: ModelType.LLM,
    taskType: ModelTaskType.TEXT_GENERATION,
    version: '3.0',
    parameters: '70',
    contextLength: 8192,
    creator: 'Meta AI',
    licenseType: 'Llama 3 Community License',
    status: ModelStatus.RUNNING,
    metrics: {
      accuracy: 89.7,
      latency: 180,
      throughput: 45.3
    },
    isBookmarked: true,
    tags: ['Open Source', 'Research', 'Instruction Fine-tuned'],
    createdAt: '2024-04-18T08:30:00Z',
    updatedAt: '2024-06-05T11:20:00Z'
  },
  {
    id: 'vision-1',
    name: 'GPT-4o Vision',
    description: 'Multimodal model capable of understanding and reasoning about images alongside text inputs.',
    modelType: ModelType.VISION,
    taskType: ModelTaskType.CLASSIFICATION,
    version: '1.0',
    parameters: '~1500',
    contextLength: 128000,
    creator: 'OpenAI',
    licenseType: 'Proprietary',
    status: ModelStatus.RUNNING,
    metrics: {
      accuracy: 96.1,
      latency: 350,
      throughput: 25.8
    },
    isBookmarked: false,
    tags: ['Multimodal', 'Vision', 'Image Understanding'],
    createdAt: '2024-05-13T14:45:00Z',
    updatedAt: '2024-06-18T16:10:00Z'
  },
  {
    id: 'code-1',
    name: 'CodeLlama 34B',
    description: 'Specialized large language model optimized for code generation and understanding across multiple programming languages.',
    modelType: ModelType.CODE,
    taskType: ModelTaskType.TEXT_GENERATION,
    version: '2.0',
    parameters: '34',
    contextLength: 16000,
    creator: 'Meta AI',
    licenseType: 'Llama 2 Community License',
    status: ModelStatus.RUNNING,
    metrics: {
      accuracy: 88.3,
      latency: 210,
      throughput: 40.5
    },
    isBookmarked: false,
    tags: ['Code Generation', 'Open Source', 'Multi-language'],
    createdAt: '2023-10-25T09:20:00Z',
    updatedAt: '2024-05-30T13:40:00Z'
  },
  {
    id: 'llm-4',
    name: 'Gemini 1.5 Pro',
    description: 'Multimodal AI system capable of understanding, operating across, and combining different types of information including text, code, audio, image, and video.',
    modelType: ModelType.CHAT_LLM,
    taskType: ModelTaskType.TEXT_GENERATION,
    version: '1.5',
    parameters: '~1000',
    contextLength: 1000000,
    creator: 'Google AI',
    licenseType: 'Proprietary',
    status: ModelStatus.RUNNING,
    metrics: {
      accuracy: 93.8,
      latency: 270,
      throughput: 33.2
    },
    isBookmarked: true,
    tags: ['Multimodal', 'Long Context', 'Research'],
    createdAt: '2024-02-15T11:30:00Z',
    updatedAt: '2024-06-12T10:05:00Z'
  },
  {
    id: 'embed-1',
    name: 'Ada Embeddings V3',
    description: 'Text embedding model that converts text into numerical vectors for semantic search, clustering, and other machine learning tasks.',
    modelType: ModelType.LLM,
    taskType: ModelTaskType.EMBEDDINGS,
    version: '3.0',
    parameters: '~5',
    contextLength: 8191,
    creator: 'OpenAI',
    licenseType: 'Proprietary',
    status: ModelStatus.RUNNING,
    metrics: {
      accuracy: 91.5,
      latency: 80,
      throughput: 120.7
    },
    isBookmarked: false,
    tags: ['Embeddings', 'Semantic Search', 'Fast'],
    createdAt: '2024-01-25T16:40:00Z',
    updatedAt: '2024-05-20T15:30:00Z'
  },
  {
    id: 'tts-1',
    name: 'ElevenLabs Multilingual V2',
    description: 'Advanced text-to-speech model capable of generating natural-sounding speech in multiple languages with emotional tone control.',
    modelType: ModelType.TEXT_TO_SPEECH,
    taskType: ModelTaskType.TEXT_GENERATION,
    version: '2.0',
    parameters: '~3',
    creator: 'ElevenLabs',
    licenseType: 'Proprietary',
    status: ModelStatus.RUNNING,
    metrics: {
      accuracy: 95.2,
      latency: 120,
      throughput: 80.3
    },
    isBookmarked: false,
    tags: ['TTS', 'Multilingual', 'Emotional Control'],
    createdAt: '2024-03-28T13:25:00Z',
    updatedAt: '2024-06-14T09:55:00Z'
  },
  {
    id: 'llm-5',
    name: 'Mistral Large',
    description: 'Frontier model with strong performance across a variety of tasks including reasoning, coding, and mathematics.',
    modelType: ModelType.CHAT_LLM,
    taskType: ModelTaskType.TEXT_GENERATION,
    version: '1.0',
    parameters: '~45',
    contextLength: 32768,
    creator: 'Mistral AI',
    licenseType: 'Proprietary',
    status: ModelStatus.RUNNING,
    metrics: {
      accuracy: 91.3,
      latency: 190,
      throughput: 42.6
    },
    isBookmarked: false,
    tags: ['Reasoning', 'Coding', 'Mathematics'],
    createdAt: '2024-02-26T10:15:00Z',
    updatedAt: '2024-06-08T14:20:00Z'
  },
  {
    id: 'llm-6',
    name: 'Falcon 180B',
    description: 'One of the largest open-source language models, trained with a focus on multilingual capabilities.',
    modelType: ModelType.LLM,
    taskType: ModelTaskType.TEXT_GENERATION,
    version: '1.0',
    parameters: '180',
    contextLength: 4096,
    creator: 'Technology Innovation Institute',
    licenseType: 'Apache 2.0',
    status: ModelStatus.PAUSED,
    metrics: {
      accuracy: 87.8,
      latency: 320,
      throughput: 28.4
    },
    isBookmarked: false,
    tags: ['Open Source', 'Multilingual', 'Massive Scale'],
    createdAt: '2023-11-14T08:50:00Z',
    updatedAt: '2024-05-26T11:35:00Z'
  },
  {
    id: 'code-2',
    name: 'Copilot',
    description: 'AI pair programmer that helps developers write better code faster with context-aware suggestions.',
    modelType: ModelType.CODE,
    taskType: ModelTaskType.TEXT_GENERATION,
    version: '2.5',
    parameters: '~50',
    contextLength: 12000,
    creator: 'GitHub & OpenAI',
    licenseType: 'Proprietary',
    status: ModelStatus.RUNNING,
    metrics: {
      accuracy: 92.7,
      latency: 160,
      throughput: 55.9
    },
    isBookmarked: true,
    tags: ['Code Generation', 'Pair Programming', 'Context-Aware'],
    createdAt: '2023-09-05T13:10:00Z',
    updatedAt: '2024-06-15T15:45:00Z'
  },
  {
    id: 'vision-2',
    name: 'Claude 3.5 Sonnet Vision',
    description: 'Multimodal AI capable of understanding images and text with high accuracy and reasoning capabilities.',
    modelType: ModelType.VISION,
    taskType: ModelTaskType.CLASSIFICATION,
    version: '3.5',
    parameters: '~80',
    contextLength: 150000,
    creator: 'Anthropic',
    licenseType: 'Proprietary',
    status: ModelStatus.RUNNING,
    metrics: {
      accuracy: 95.8,
      latency: 290,
      throughput: 29.1
    },
    isBookmarked: false,
    tags: ['Vision', 'Multimodal', 'High Accuracy'],
    createdAt: '2024-04-10T15:20:00Z',
    updatedAt: '2024-06-20T12:30:00Z'
  }
]; 