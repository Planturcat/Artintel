"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardCard from '@/components/dashboard/DashboardCard';
import {
  Brain,
  Server,
  Sparkles,
  Star,
  Search,
  SlidersHorizontal,
  Plus,
  Clock,
  Zap,
  Gauge,
  Tag,
  ChevronDown,
  DownloadCloud,
  ShieldCheck,
  BarChart3,
  X,
  Bookmark,
  Filter,
  Grid,
  List,
  ArrowUpDown,
  HelpCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Code,
  MessageSquare,
  Image,
  FileText,
  AlertTriangle,
  CheckCircle,
  PlayCircle,
  PauseCircle,
  BookmarkCheck,
  ChevronUp,
  Scale,
  Rocket
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import ModelComparison from '@/components/models/ModelComparison';
import ModelCard from '@/components/models/ModelCard';
import EmptyState from '@/components/EmptyState';
import { toast } from 'sonner';

// Import model API client and types
import { modelApi } from '@/dashboard-api/model-api';
import {
  Model,
  ModelType,
  ModelFramework,
  ModelTaskType,
  ModelTier,
  ModelStatus,
  ModelFilterParams,
  PaginatedResponse
} from '@/dashboard-api/model-api';

// Import user context for user-specific data
import { getUserContext } from '@/dashboard-api/mock-user-context';

// These models will be replaced with API data, but we keep them as fallback
const modelsData: Model[] = [
  {
    id: 'mistral-7b',
    name: 'Mistral-7B',
    displayName: 'Mistral-7B',
    version: '0.1',
    modelType: ModelType.LLM,
    framework: ModelFramework.PYTORCH,
    taskType: ModelTaskType.TEXT_GENERATION,
    description: 'A transformer-based language model with 7 billion parameters, delivering outstanding performance for its size. Mistral-7B outperforms Llama 2 13B on most benchmarks with enhanced capabilities in reasoning, mathematics, and code generation.',
    parameters: '7B',
    modelSize: 13.4,
    license: 'Apache 2.0',
    author: 'Mistral AI',
    tier: ModelTier.FREE,
    tags: ['General Purpose', 'English', 'Instruction-following', 'Reasoning'],
    status: ModelStatus.RUNNING,
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    isBookmarked: false,
    creator: 'Mistral AI',
    metrics: {
      accuracy: 0.82,
      latency: 150,
      throughput: 1500,
      memoryUsage: 14000,
      gpuUsage: 80,
      reliability: 0.92,
      costEfficiency: 8.5
    },
    pricing: {
      pricePerRequest: 0,
      pricePerToken: 0,
      freeQuota: 0
    },
    architecture: {
      framework: 'pytorch',
      layers: 32,
      attentionHeads: 32,
      contextWindow: 8192,
      trainingData: 'Custom dataset with web, code, and mathematics',
      modelArchitecture: 'Transformer with Grouped-Query Attention',
      parameterEfficiency: 0.85,
      trainingFLOPs: 1.2e23
    },
    resourceRequirements: {
      minCPU: '4 cores',
      minMemory: '16GB',
      recommendedGPU: 'NVIDIA A10',
      minDiskSpace: '30GB',
      optimizedHardware: ['NVIDIA A10', 'NVIDIA A100', 'NVIDIA T4'],
      deploymentOptions: ['Cloud API', 'Docker container', 'Local installation']
    },
    documentation: {
      technicalDocs: 'https://mistral.ai/news/announcing-mistral-7b/',
      examples: ['Text generation', 'Chat completion', 'Instruction following', 'Complex reasoning'],
      papers: ['https://arxiv.org/abs/2310.06825'],
      githubRepo: 'https://github.com/mistralai/mistral-7b',
      communityForums: ['https://huggingface.co/mistralai/Mistral-7B-v0.1'],
      tutorials: ['Fine-tuning guide', 'Prompt engineering best practices'],
      bestPractices: ['Use system prompts for better instruction following', 'Batching for improved throughput']
    },
    contextLength: 8192,
    licenseType: 'Apache 2.0',
    languageSupport: ['English', 'French', 'German', 'Spanish', 'Italian', 'Portuguese'],
    finetuningOptions: {
      supported: true,
      methods: ['LoRA', 'QLoRA', 'Full fine-tuning'],
      dataRequirements: 'Few hundred to few thousand examples',
      complexity: 'Medium'
    },
    benchmarks: [
      {
        name: 'MMLU',
        score: 64.2,
        date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'HumanEval',
        score: 32.5,
        date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'GSM8K',
        score: 52.3,
        date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'MBPP',
        score: 38.6,
        date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    useCase: ['Chatbots', 'Content generation', 'Code assistance', 'Summarization'],
    lastUpdate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    communityRating: 4.7,
    trainingDataset: 'Proprietary web corpus with books, code repositories, and scientific papers'
  },
  {
    id: 'llama-2-7b',
    name: 'Llama-2-7B',
    displayName: 'Llama-2-7B',
    version: '2.0',
    modelType: ModelType.LLM,
    framework: ModelFramework.PYTORCH,
    taskType: ModelTaskType.TEXT_GENERATION,
    description: 'Meta\'s advanced open source language model, optimized for dialogue and content generation. Llama 2 is trained on 2 trillion tokens of data from publicly available sources and fine-tuned for helpfulness and safety.',
    parameters: '7B',
    modelSize: 13.5,
    license: 'Meta License',
    author: 'Meta AI',
    tier: ModelTier.FREE,
    tags: ['General Purpose', 'Dialogue', 'Content Generation', 'English'],
    status: ModelStatus.RUNNING,
    createdAt: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    isBookmarked: true,
    creator: 'Meta AI',
    metrics: {
      accuracy: 0.80,
      latency: 170,
      throughput: 1400,
      memoryUsage: 13500,
      gpuUsage: 85,
      reliability: 0.90,
      costEfficiency: 8.0
    },
    pricing: {
      pricePerRequest: 0,
      pricePerToken: 0,
      freeQuota: 0
    },
    architecture: {
      framework: 'pytorch',
      layers: 32,
      attentionHeads: 32,
      contextWindow: 4096,
      trainingData: 'Web, books, code, public data',
      modelArchitecture: 'Standard Transformer with RMSNorm',
      parameterEfficiency: 0.78,
      trainingFLOPs: 1.0e23
    },
    resourceRequirements: {
      minCPU: '4 cores',
      minMemory: '16GB',
      recommendedGPU: 'NVIDIA A10',
      minDiskSpace: '32GB',
      optimizedHardware: ['NVIDIA A10', 'NVIDIA A100', 'AMD MI250'],
      deploymentOptions: ['Cloud API', 'Hugging Face Inference API', 'Local deployment']
    },
    documentation: {
      technicalDocs: 'https://ai.meta.com/llama/',
      examples: ['Text generation', 'Chat completion', 'Summarization', 'Translation'],
      papers: ['https://arxiv.org/abs/2307.09288'],
      githubRepo: 'https://github.com/facebookresearch/llama',
      communityForums: ['https://huggingface.co/meta-llama/Llama-2-7b'],
      tutorials: ['Getting started with Llama', 'Prompt engineering for Llama 2'],
      bestPractices: ['Use system prompts for role-based tasks', 'Temperature tuning for creative vs. factual outputs']
    },
    contextLength: 4096,
    licenseType: 'Meta License (Custom)',
    languageSupport: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Dutch'],
    finetuningOptions: {
      supported: true,
      methods: ['LoRA', 'QLoRA', 'Full fine-tuning', 'PEFT'],
      dataRequirements: 'Few hundred to few thousand examples',
      complexity: 'Medium'
    },
    benchmarks: [
      {
        name: 'MMLU',
        score: 45.3,
        date: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'HumanEval',
        score: 13.4,
        date: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'TruthfulQA',
        score: 41.2,
        date: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'HELM',
        score: 36.8,
        date: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    useCase: ['Chatbots', 'Content generation', 'Summarization', 'Question answering'],
    lastUpdate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    communityRating: 4.5,
    trainingDataset: 'Publicly available data from web, books, papers, and code repositories'
  },
  {
    id: 'stable-diffusion-3',
    name: 'Stable Diffusion 3',
    displayName: 'Stable Diffusion 3',
    version: '3.0',
    modelType: ModelType.VISION,
    framework: ModelFramework.PYTORCH,
    taskType: ModelTaskType.IMAGE_GENERATION,
    description: 'Latest version of the powerful text-to-image generation model with improved quality and capabilities. Stable Diffusion 3 features enhanced image composition, better text rendering, and more accurate human anatomy generation.',
    parameters: '2.7B',
    modelSize: 5.1,
    license: 'OpenRAIL',
    author: 'Stability AI',
    tier: ModelTier.FREE,
    tags: ['Text-to-Image', 'Generative', 'Vision', 'Creative'],
    status: ModelStatus.RUNNING,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    isBookmarked: false,
    creator: 'Stability AI',
    metrics: {
      accuracy: 0.91,
      latency: 450,
      throughput: 600,
      memoryUsage: 12000,
      gpuUsage: 95,
      reliability: 0.94,
      costEfficiency: 7.5
    },
    pricing: {
      pricePerRequest: 0,
      pricePerToken: 0,
      freeQuota: 0
    },
    architecture: {
      framework: 'pytorch',
      layers: 24,
      attentionHeads: 16,
      contextWindow: 0,
      trainingData: 'Diverse image-text pairs',
      modelArchitecture: 'Diffusion with CLIP text encoder',
      parameterEfficiency: 0.82,
      trainingFLOPs: 2.0e23
    },
    resourceRequirements: {
      minCPU: '8 cores',
      minMemory: '16GB',
      recommendedGPU: 'NVIDIA A100',
      minDiskSpace: '20GB',
      optimizedHardware: ['NVIDIA A100', 'NVIDIA A6000', 'NVIDIA RTX 4090'],
      deploymentOptions: ['Cloud API', 'Docker container', 'Local installation']
    },
    documentation: {
      technicalDocs: 'https://stability.ai/news/stable-diffusion-3',
      examples: ['Photorealistic images', 'Artistic renderings', 'Creative concepts', 'Digital art'],
      papers: ['https://arxiv.org/abs/2403.10427'],
      githubRepo: 'https://github.com/Stability-AI/stablediffusion',
      communityForums: ['https://huggingface.co/stabilityai', 'https://discord.gg/stablediffusion'],
      tutorials: ['Prompt engineering for SD3', 'Advanced techniques', 'Negative prompting'],
      bestPractices: ['Use detailed prompts', 'Negative prompting for unwanted elements', 'Seed control for consistent results']
    },
    contextLength: 77,
    licenseType: 'OpenRAIL',
    languageSupport: ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese'],
    finetuningOptions: {
      supported: true,
      methods: ['Dreambooth', 'Textual Inversion', 'LoRA', 'Hypernetworks'],
      dataRequirements: '15-30 reference images minimum',
      complexity: 'Advanced'
    },
    benchmarks: [
      {
        name: 'COCO FID',
        score: 8.32,
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'CLIP Score',
        score: 0.35,
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'DrawBench',
        score: 7.8,
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'PartiPrompts',
        score: 8.1,
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    useCase: ['Marketing materials', 'Concept art', 'Digital content creation', 'Visualization'],
    lastUpdate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    communityRating: 4.8,
    trainingDataset: 'Proprietary dataset of billions of image-text pairs curated for quality and diversity'
  },
  {
    id: 'phi-3-mini',
    name: 'Phi-3-Mini',
    displayName: 'Phi-3-Mini',
    version: '3.0',
    modelType: ModelType.LLM,
    framework: ModelFramework.PYTORCH,
    taskType: ModelTaskType.TEXT_GENERATION,
    description: 'Microsoft\'s compact language model that delivers impressive performance despite its small size (3.8B parameters). Phi-3-Mini is optimized for reasoning and coding tasks, showing remarkable capabilities for its parameter count.',
    parameters: '3.8B',
    modelSize: 7.9,
    license: 'Microsoft License',
    author: 'Microsoft',
    tier: ModelTier.FREE,
    tags: ['Compact', 'English', 'Instruction-tuned', 'Reasoning', 'Code'],
    status: ModelStatus.RUNNING,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    isBookmarked: false,
    creator: 'Microsoft',
    metrics: {
      accuracy: 0.76,
      latency: 110,
      throughput: 1800,
      memoryUsage: 8000,
      gpuUsage: 65,
      reliability: 0.88,
      costEfficiency: 9.2
    },
    pricing: {
      pricePerRequest: 0,
      pricePerToken: 0,
      freeQuota: 0
    },
    architecture: {
      framework: 'pytorch',
      layers: 24,
      attentionHeads: 24,
      contextWindow: 4096,
      trainingData: 'Synthetic and web data with strong reasoning examples',
      modelArchitecture: 'Transformer with specialized attention mechanism',
      parameterEfficiency: 0.92,
      trainingFLOPs: 6.0e22
    },
    resourceRequirements: {
      minCPU: '2 cores',
      minMemory: '8GB',
      recommendedGPU: 'NVIDIA T4',
      minDiskSpace: '16GB',
      optimizedHardware: ['NVIDIA T4', 'NVIDIA RTX 3080', 'Intel Arc'],
      deploymentOptions: ['Cloud API', 'Docker container', 'Local CPU deployment']
    },
    documentation: {
      technicalDocs: 'https://www.microsoft.com/en-us/research/blog/phi-3-mini-the-next-step-in-language-model-research/',
      examples: ['Text completion', 'Question answering', 'Code generation', 'Reasoning tasks'],
      papers: ['https://arxiv.org/abs/2404.11766'],
      githubRepo: 'https://github.com/microsoft/phi-3',
      communityForums: ['https://huggingface.co/microsoft/phi-3-mini'],
      tutorials: ['Getting started with Phi-3', 'Optimizing for resource-constrained environments'],
      bestPractices: ['Use clear instructions', 'One task at a time for best results']
    },
    contextLength: 4096,
    licenseType: 'Microsoft Research License',
    languageSupport: ['English', 'Limited Spanish', 'Limited French', 'Limited German'],
    finetuningOptions: {
      supported: true,
      methods: ['LoRA', 'QLoRA', 'PEFT'],
      dataRequirements: 'Few hundred examples recommended',
      complexity: 'Medium'
    },
    benchmarks: [
      {
        name: 'MMLU',
        score: 70.6,
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'HumanEval',
        score: 57.8,
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'GSM8K',
        score: 72.3,
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'BigBench',
        score: 45.2,
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    useCase: ['Edge computing', 'Mobile applications', 'Code assistance', 'Educational tools'],
    lastUpdate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    communityRating: 4.6,
    trainingDataset: 'Curated high-quality textbooks, code repositories, and synthetic reasoning examples'
  },
  {
    id: 'whisper-large-v3',
    name: 'Whisper Large v3',
    displayName: 'Whisper Large v3',
    version: '3.0',
    modelType: ModelType.TEXT_TO_SPEECH,
    framework: ModelFramework.PYTORCH,
    taskType: ModelTaskType.TEXT_GENERATION,
    description: 'OpenAI\'s most advanced speech recognition model with improved accuracy, multilingual support, and robust noise handling. Whisper Large v3 excels at real-world audio transcription even in challenging acoustic environments.',
    parameters: '1.5B',
    modelSize: 3.1,
    license: 'MIT',
    author: 'OpenAI',
    tier: ModelTier.FREE,
    tags: ['Speech-to-Text', 'Audio', 'Multilingual', 'Transcription'],
    status: ModelStatus.RUNNING,
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    isBookmarked: false,
    creator: 'OpenAI',
    metrics: {
      accuracy: 0.89,
      latency: 200,
      throughput: 1000,
      memoryUsage: 6000,
      gpuUsage: 70,
      reliability: 0.91,
      costEfficiency: 8.7
    },
    pricing: {
      pricePerRequest: 0,
      pricePerToken: 0,
      freeQuota: 0
    },
    architecture: {
      framework: 'pytorch',
      layers: 24,
      attentionHeads: 16,
      contextWindow: 30,
      trainingData: 'Multilingual audio dataset with diverse acoustic conditions',
      modelArchitecture: 'Encoder-decoder with specialized audio preprocessing',
      parameterEfficiency: 0.88,
      trainingFLOPs: 5.0e22
    },
    resourceRequirements: {
      minCPU: '4 cores',
      minMemory: '8GB',
      recommendedGPU: 'NVIDIA T4',
      minDiskSpace: '12GB',
      optimizedHardware: ['NVIDIA T4', 'NVIDIA A10', 'AMD MI100'],
      deploymentOptions: ['Cloud API', 'Docker container', 'Local CPU deployment']
    },
    documentation: {
      technicalDocs: 'https://github.com/openai/whisper',
      examples: ['Speech recognition', 'Transcription', 'Translation', 'Subtitle generation'],
      papers: ['https://arxiv.org/abs/2212.04356'],
      githubRepo: 'https://github.com/openai/whisper',
      communityForums: ['https://discuss.huggingface.co/c/models/whisper'],
      tutorials: ['Real-time transcription setup', 'Batch processing guidelines', 'Fine-tuning for domain-specific audio'],
      bestPractices: ['Use WAV or high-quality MP3', 'Segment long audio for better results', 'Configure beam search size based on language']
    },
    contextLength: 30,
    licenseType: 'MIT',
    languageSupport: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Russian', 'Arabic', 'Hindi', 'Portuguese', 'Italian', '+90 languages'],
    finetuningOptions: {
      supported: true,
      methods: ['Full fine-tuning', 'Adapter-based tuning'],
      dataRequirements: 'Several hours of transcribed audio in target domain',
      complexity: 'Advanced'
    },
    benchmarks: [
      {
        name: 'Common Voice',
        score: 6.3,
        date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'LibriSpeech (clean)',
        score: 1.8,
        date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'LibriSpeech (other)',
        score: 3.7,
        date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'FLEURS',
        score: 17.2,
        date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    useCase: ['Media transcription', 'Closed captioning', 'Podcast transcription', 'Meeting notes'],
    lastUpdate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    communityRating: 4.7,
    trainingDataset: '680,000 hours of multilingual speech data across diverse acoustic environments and contexts'
  },
  {
    id: 'tinyllama',
    name: 'TinyLlama',
    displayName: 'TinyLlama',
    version: '1.1',
    modelType: "SLM" as any, // Using 'as any' since SLM is not in the enum
    framework: ModelFramework.PYTORCH,
    taskType: ModelTaskType.TEXT_GENERATION,
    description: 'A compact 1.1B parameter language model trained on 3 trillion tokens, optimized for efficiency and performance on limited hardware. TinyLlama is designed for edge applications and resource-constrained environments while maintaining impressive capabilities.',
    parameters: '1.1B',
    modelSize: 2.2,
    license: 'Apache 2.0',
    author: 'KRAI AI',
    tier: ModelTier.FREE,
    tags: ['Small Model', 'Efficient', 'Low Resource', 'Edge Deployment'],
    status: ModelStatus.RUNNING,
    createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    isBookmarked: false,
    creator: 'KRAI AI',
    metrics: {
      accuracy: 0.68,
      latency: 70,
      throughput: 2500,
      memoryUsage: 4500,
      gpuUsage: 40,
      reliability: 0.85,
      costEfficiency: 9.8
    },
    pricing: {
      pricePerRequest: 0,
      pricePerToken: 0,
      freeQuota: 0
    },
    architecture: {
      framework: 'pytorch',
      layers: 16,
      attentionHeads: 16,
      contextWindow: 2048,
      trainingData: 'Web-scale data with efficient tokenization',
      modelArchitecture: 'Optimized Transformer with specialized attention',
      parameterEfficiency: 0.95,
      trainingFLOPs: 3.0e22
    },
    resourceRequirements: {
      minCPU: '2 cores',
      minMemory: '4GB',
      recommendedGPU: 'NVIDIA T4 or integrated GPU',
      minDiskSpace: '6GB',
      optimizedHardware: ['NVIDIA RTX 3050', 'Intel Arc A380', 'Mobile GPUs', 'Apple Silicon'],
      deploymentOptions: ['Mobile deployment', 'Edge devices', 'Browser-based', 'CPU-only servers']
    },
    documentation: {
      technicalDocs: 'https://github.com/krai/TinyLlama',
      examples: ['Text completion', 'Chatbot', 'Simple reasoning', 'Embedded applications'],
      papers: ['https://arxiv.org/abs/2301.12345'],
      githubRepo: 'https://github.com/krai/TinyLlama',
      communityForums: ['https://huggingface.co/krai', 'https://discord.gg/tinyllama'],
      tutorials: ['Deployment on edge devices', 'Quantization guide', 'Mobile optimization'],
      bestPractices: ['Use int8 quantization for best efficiency', 'Limit context length for speed', 'Batch inference when possible']
    },
    contextLength: 2048,
    licenseType: 'Apache 2.0',
    languageSupport: ['English', 'Limited Spanish', 'Limited French'],
    finetuningOptions: {
      supported: true,
      methods: ['QLoRA', 'PEFT', '4-bit quantization tuning'],
      dataRequirements: 'Few dozen to few hundred examples',
      complexity: 'Easy'
    },
    benchmarks: [
      {
        name: 'MMLU',
        score: 26.4,
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'HumanEval',
        score: 12.8,
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'HellaSwag',
        score: 59.7,
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        name: 'TruthfulQA',
        score: 31.5,
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    useCase: ['Mobile applications', 'Embedded systems', 'IoT devices', 'Edge computing', 'Offline applications'],
    lastUpdate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    communityRating: 4.5,
    trainingDataset: 'Efficient subset of web data, code repositories, and instruction tuning examples optimized for limited parameters'
  }
];

// Update the ExtendedModelFilterParams interface to include the new filter properties
interface ExtendedModelFilterParams extends ModelFilterParams {
  bookmarked?: boolean;
  size?: string;
  performance?: string;
  latency?: string;
}

export default function ModelsPage() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [models, setModels] = useState<Model[]>([]);
  const [filteredModels, setFilteredModels] = useState<Model[]>([]);
  const [expandedModel, setExpandedModel] = useState<string | null>(null);
  const [bookmarkedModels, setBookmarkedModels] = useState<Model[]>([]);
  const [user, setUser] = useState(getUserContext());

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalModels, setTotalModels] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filtering state
  const [activeFilters, setActiveFilters] = useState<ExtendedModelFilterParams>({});
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [modelTypeFilter, setModelTypeFilter] = useState<ModelType | null>(null);

  // Sorting state
  const [sortBy, setSortBy] = useState<'name' | 'created' | 'parameters'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Comparison state
  const [selectedForComparison, setSelectedForComparison] = useState<Model[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const router = useRouter();

  // Add a state to track if the compare button should be enabled
  const [compareEnabled, setCompareEnabled] = useState(false);

  // Update compare enabled status whenever selected models change
  useEffect(() => {
    setCompareEnabled(selectedForComparison.length >= 2);
  }, [selectedForComparison]);

  // Fetch models from API
  const fetchModels = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Prepare filter params - extract only the properties valid for ModelFilterParams
      const filterParams: ModelFilterParams = {
        page,
        limit,
        sort: sortBy,
        order: sortOrder,
        search: searchQuery || undefined,
        modelType: activeFilters.modelType || undefined
      };

      // Add any standard filters from activeFilters that match ModelFilterParams interface
      if (activeFilters.status) filterParams.status = activeFilters.status;
      if (activeFilters.tier) filterParams.tier = activeFilters.tier;
      if (activeFilters.taskType) filterParams.taskType = activeFilters.taskType;
      if (activeFilters.framework) filterParams.framework = activeFilters.framework;
      if (activeFilters.tags) filterParams.tags = activeFilters.tags;

      // For now, use our predefined open source models
      // Simulate filtering, sorting, and pagination
      let filteredModelData = [...modelsData];

      // Filter models based on user tier
      if (user) {
        if (user.tier === 'free') {
          // Free users only see free models
          filteredModelData = filteredModelData.filter(model =>
            model.tier === ModelTier.FREE
          );
        } else if (user.tier === 'pro') {
          // Pro users see free and pro models
          filteredModelData = filteredModelData.filter(model =>
            model.tier === ModelTier.FREE || model.tier === ModelTier.PRO
          );
        }
        // Enterprise users see all models
      }

      // Apply search filter if provided
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredModelData = filteredModelData.filter(model =>
          model.name.toLowerCase().includes(query) ||
          model.description.toLowerCase().includes(query) ||
          model.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }

      // Apply model type filter
      if (activeFilters.modelType) {
        filteredModelData = filteredModelData.filter(model =>
          model.modelType === activeFilters.modelType
        );
      }

      // Apply bookmarked filter (our custom property)
      if (activeFilters.bookmarked) {
        filteredModelData = filteredModelData.filter(model =>
          model.isBookmarked
        );
      }

      // Apply size filter (our custom property)
      if (activeFilters.size) {
        // Simple size categorization
        filteredModelData = filteredModelData.filter(model => {
          if (activeFilters.size === 'small') return model.modelSize < 5;
          if (activeFilters.size === 'medium') return model.modelSize >= 5 && model.modelSize < 10;
          if (activeFilters.size === 'large') return model.modelSize >= 10 && model.modelSize < 15;
          if (activeFilters.size === 'xlarge') return model.modelSize >= 15;
          return true;
        });
      }

      // Apply performance filter - NEW
      if (activeFilters.performance) {
        filteredModelData = filteredModelData.filter(model => {
          const accuracy = model.metrics.accuracy;
          if (activeFilters.performance === 'high') return accuracy > 0.85;
          if (activeFilters.performance === 'medium') return accuracy >= 0.7 && accuracy <= 0.85;
          if (activeFilters.performance === 'low') return accuracy < 0.7;
          return true;
        });
      }

      // Apply latency filter - NEW
      if (activeFilters.latency) {
        filteredModelData = filteredModelData.filter(model => {
          const latency = model.metrics.latency;
          if (activeFilters.latency === 'low') return latency < 150;
          if (activeFilters.latency === 'medium') return latency >= 150 && latency <= 300;
          if (activeFilters.latency === 'high') return latency > 300;
          return true;
        });
      }

      // Apply status filter
      if (activeFilters.status && activeFilters.status.length > 0) {
        filteredModelData = filteredModelData.filter(model =>
          activeFilters.status?.includes(model.status)
        );
      }

      // Apply sorting
      filteredModelData.sort((a, b) => {
        if (sortBy === 'name') {
          return sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (sortBy === 'created') {
          return sortOrder === 'asc'
            ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else if (sortBy === 'parameters') {
          // Extract numeric value from parameters string (e.g., "7B" -> 7)
          const getParamValue = (param: string) => {
            const match = param.match(/(\d+(\.\d+)?)/);
            return match ? parseFloat(match[0]) : 0;
          };

          return sortOrder === 'asc'
            ? getParamValue(a.parameters) - getParamValue(b.parameters)
            : getParamValue(b.parameters) - getParamValue(a.parameters);
        } else if (sortBy === 'accuracy') {
          return sortOrder === 'asc'
            ? a.metrics.accuracy - b.metrics.accuracy
            : b.metrics.accuracy - a.metrics.accuracy;
        } else if (sortBy === 'latency') {
          return sortOrder === 'asc'
            ? a.metrics.latency - b.metrics.latency
            : b.metrics.latency - a.metrics.latency;
        }

        return 0;
      });

      // Apply pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedModels = filteredModelData.slice(startIndex, endIndex);

      // Update state
      setModels(modelsData); // Keep the full list for reference
      setFilteredModels(filteredModelData); // Store filtered results
      setTotalModels(filteredModelData.length);
      setTotalPages(Math.ceil(filteredModelData.length / limit));

      console.log(`Filtered models: ${filteredModelData.length}, Page ${page} of ${Math.ceil(filteredModelData.length / limit)}`);
    } catch (err: any) {
      console.error('Error fetching models:', err);
      setError(err.message || 'Failed to fetch models');
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, searchQuery, activeFilters, sortBy, sortOrder, modelTypeFilter]);

  // Fetch bookmarked models
  const fetchBookmarkedModels = useCallback(async () => {
    try {
      // Only fetch bookmarked models if user is logged in
      if (user) {
        const response = await modelApi.getBookmarkedModels();

        // Filter bookmarked models based on user tier
        let filteredBookmarks = response;
        if (user.tier === 'free') {
          filteredBookmarks = response.filter(model => model.tier === ModelTier.FREE);
        } else if (user.tier === 'pro') {
          filteredBookmarks = response.filter(model =>
            model.tier === ModelTier.FREE || model.tier === ModelTier.PRO
          );
        }

        setBookmarkedModels(filteredBookmarks);
      } else {
        setBookmarkedModels([]);
      }
    } catch (error) {
      console.error('Error fetching bookmarked models:', error);
      // Set empty array as fallback
      setBookmarkedModels([]);
    }
  }, [user]);

  // Initial data fetch
  useEffect(() => {
    fetchModels();
    fetchBookmarkedModels();
  }, [fetchModels, fetchBookmarkedModels]);

  // Handle search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchModels();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, fetchModels]);

  // Toggle model details
  const toggleModelDetails = (modelId: string) => {
    setExpandedModel(expandedModel === modelId ? null : modelId);
  };

  // Handle bookmark toggle
  const handleToggleBookmark = (modelId: string) => {
    console.log("Toggling bookmark for model:", modelId);

    // Check if user is logged in
    if (!user) {
      toast.error("Please log in to bookmark models");
      return;
    }

    // Find the model in our state
    const model = models.find(m => m.id === modelId);
    if (!model) {
      console.error("Model not found:", modelId);
      toast.error("Could not find model to bookmark");
      return;
    }

    // Check if user has access to this model based on tier
    if (user.tier === 'free' && model.tier !== ModelTier.FREE) {
      toast.error(`Upgrade to ${model.tier} tier to bookmark this model`);
      return;
    } else if (user.tier === 'pro' && model.tier === ModelTier.ENTERPRISE) {
      toast.error("Upgrade to Enterprise tier to bookmark this model");
      return;
    }

    // Log the current bookmark status
    console.log("Current bookmark status:", model.isBookmarked);

    // Create an updated model with the new bookmark status
    const updatedModel = {
      ...model,
      isBookmarked: !model.isBookmarked
    };

    // Update the models state
    setModels(prevModels =>
      prevModels.map(m => m.id === modelId ? updatedModel : m)
    );

    // Also update the filtered models state
    setFilteredModels(prevModels =>
      prevModels.map(m => m.id === modelId ? updatedModel : m)
    );

    // Show a success toast with user's name
    toast.success(
      updatedModel.isBookmarked
        ? `${model.name} added to ${user.firstName}'s bookmarks`
        : `${model.name} removed from ${user.firstName}'s bookmarks`
    );

    // If we're showing bookmarks only and we're unbookmarking, we might need to refresh the view
    if (activeFilters.bookmarked && !updatedModel.isBookmarked) {
      fetchModels();
    }

    // Update bookmarked models list
    if (updatedModel.isBookmarked) {
      setBookmarkedModels(prev => [...prev, updatedModel]);
    } else {
      setBookmarkedModels(prev => prev.filter(m => m.id !== modelId));
    }
  };

  // Apply filters
  const applyFilters = (filters: ModelFilterParams) => {
    setActiveFilters(filters);
    fetchModels();
  };

  // Reset filters
  const resetFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
    setShowBookmarksOnly(false);
    setModelTypeFilter(null);
    setSortBy('name');
    setSortOrder('asc');
    fetchModels();
  };

  // Toggle view mode (grid/list)
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  // Refresh data
  const refreshData = () => {
    fetchModels();
    fetchBookmarkedModels();
  };

  // Handle pagination
  const goToPage = (newPage: number) => {
    setPage(newPage);
  };

  // Apply showBookmarksOnly filter
  useEffect(() => {
    if (showBookmarksOnly) {
      setFilteredModels(models.filter(model => model.isBookmarked));
    } else {
      setFilteredModels(models);
    }
  }, [showBookmarksOnly, models]);

  // Group models by type
  const modelsByType = useMemo(() => {
    const llms = filteredModels.filter(model =>
      model.modelType === ModelType.LLM ||
      model.modelType === ModelType.CHAT_LLM
    );
    const visionModels = filteredModels.filter(model =>
      model.modelType === ModelType.VISION
    );
    const audioModels = filteredModels.filter(model =>
      model.modelType === ModelType.TEXT_TO_SPEECH
    );

    return {
      llms,
      visionModels,
      audioModels
    };
  }, [filteredModels]);

  // Updated to toggle model selection for comparison with user-specific restrictions
  const handleCompareClick = (model: Model) => {
    // Check if user is logged in
    if (!user) {
      toast.error("Please log in to compare models");
      return;
    }

    // Check if user has access to this model based on tier
    if (user.tier === 'free' && model.tier !== ModelTier.FREE) {
      toast.error(`Upgrade to ${model.tier} tier to compare this model`);
      return;
    } else if (user.tier === 'pro' && model.tier === ModelTier.ENTERPRISE) {
      toast.error("Upgrade to Enterprise tier to compare this model");
      return;
    }

    if (selectedForComparison.some(m => m.id === model.id)) {
      // If already selected, remove from comparison
      setSelectedForComparison(prevSelected =>
        prevSelected.filter(m => m.id !== model.id)
      );
    } else {
      // Check comparison limits based on user tier
      const maxModels = user.tier === 'enterprise' ? 3 : user.tier === 'pro' ? 2 : 2;

      // If not selected and less than max allowed models are selected, add to comparison
      if (selectedForComparison.length < maxModels) {
        setSelectedForComparison(prevSelected => [...prevSelected, model]);
      } else {
        // Show error or notification about the limit
        toast.warning(`${user.tier === 'free' ? 'Free' : user.tier === 'pro' ? 'Pro' : 'Enterprise'} tier users can compare at most ${maxModels} models at once`);
      }
    }
  };

  const handleRemoveFromComparison = (modelId: string) => {
    setSelectedForComparison(prevSelected =>
      prevSelected.filter(m => m.id !== modelId)
    );
  };

  const handleViewDetails = (modelId: string) => {
    router.push(`/dashboard/models/${modelId}`);
  };

  // New function to start the comparison with user-specific restrictions
  const startComparison = () => {
    // Check if user is logged in
    if (!user) {
      toast.error("Please log in to compare models");
      return;
    }

    // Check if user has the minimum required models selected
    if (selectedForComparison.length >= 2) {
      // Check if user has access to all selected models
      const hasInvalidModels = selectedForComparison.some(model => {
        if (user.tier === 'free' && model.tier !== ModelTier.FREE) {
          return true;
        } else if (user.tier === 'pro' && model.tier === ModelTier.ENTERPRISE) {
          return true;
        }
        return false;
      });

      if (hasInvalidModels) {
        toast.error("You don't have access to one or more selected models. Please upgrade your plan or select different models.");
        return;
      }

      setShowComparison(true);
    } else {
      toast.warning("Please select at least two models to compare");
    }
  };

  const showSelectionBar = selectedForComparison.length > 0;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-transparent' : 'bg-transparent'} transition-colors duration-300`}>
      {/* Header */}
      <div className="space-y-6">
        <div className="flex flex-col space-y-1">
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {user ? `${user.firstName}'s ${t('aiModels')}` : t('aiModels')}
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {user && user.tier === 'pro'
              ? t('exploreAndDeployProModels')
              : user && user.tier === 'enterprise'
                ? t('exploreAndDeployEnterpriseModels')
                : t('exploreAndDeployModels')}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => router.push('/dashboard/models/deploy')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              isDark
                ? 'bg-[#00cbdd] hover:bg-[#00b3c3] text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } transition-colors`}
          >
            <Server className="h-4 w-4 mr-2" />
            {t('deployModel')}
          </button>

          <button
            onClick={() => router.push('/dashboard/fine-tuning/new')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              isDark
                ? 'bg-[#00031b]/60 hover:bg-[#00031b]/80 text-white border border-[#00cbdd]/30'
                : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200'
            } transition-colors`}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {t('fineTuneModel')}
          </button>

          <button
            onClick={startComparison}
            disabled={!compareEnabled}
            className={`flex items-center px-4 py-2 rounded-lg ${
              !compareEnabled
                ? isDark
                  ? 'bg-gray-700/40 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : isDark
                  ? 'bg-purple-900/60 hover:bg-purple-900/80 text-purple-300 border border-purple-700/50'
                  : 'bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-200'
            } transition-colors`}
          >
            <Scale className="h-4 w-4 mr-2" />
            {t('compareModels')} {selectedForComparison.length > 0 && `(${selectedForComparison.length})`}
            {user && (
              <span className="ml-1 text-xs opacity-70">
                {user.tier === 'free'
                  ? '(Free: max 2)'
                  : user.tier === 'pro'
                    ? '(Pro: max 2)'
                    : '(Enterprise: max 3)'}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Show model comparison popup */}
      <AnimatePresence>
        {showComparison && (
          <ModelComparison
            models={selectedForComparison}
            onClose={() => setShowComparison(false)}
            onRemoveModel={handleRemoveFromComparison}
            isDark={isDark}
          />
        )}
      </AnimatePresence>

      {/* Search and filters */}
      <div className={`p-6 rounded-xl ${
        isDark
          ? 'bg-[#00031b]/90 border border-[#00cbdd]/20'
          : 'bg-white border border-gray-200'
      }`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className={`relative ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
              <input
                type="text"
                placeholder={t('searchModels')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-2 pl-10 pr-4 rounded-lg border ${
                  isDark
                    ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white placeholder:text-gray-500'
                    : 'bg-gray-50/70 border-gray-200 text-gray-800 placeholder:text-gray-400'
                } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40 transition-all duration-200`}
              />
            </div>
          </div>

          {/* Filter button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center px-4 py-2 rounded-lg ${
              isDark
                ? 'bg-[#00031b]/60 hover:bg-[#00031b]/80 text-white border border-[#00cbdd]/30'
                : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200'
            } transition-colors ${showFilters ? 'border-[#00cbdd]' : ''}`}
          >
            <Filter className="h-4 w-4 mr-2" />
            {t('filters')}
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* View toggle */}
          <div className={`flex rounded-lg overflow-hidden border ${
            isDark
              ? 'border-[#00cbdd]/30'
              : 'border-gray-200'
          }`}>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center px-3 py-2 ${
                viewMode === 'grid'
                  ? isDark
                    ? 'bg-[#00cbdd]/20 text-white'
                    : 'bg-blue-50 text-blue-600'
                  : isDark
                    ? 'bg-[#00031b]/60 text-gray-300 hover:text-white'
                    : 'bg-white text-gray-500 hover:text-gray-700'
              } transition-colors`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center px-3 py-2 ${
                viewMode === 'list'
                  ? isDark
                    ? 'bg-[#00cbdd]/20 text-white'
                    : 'bg-blue-50 text-blue-600'
                  : isDark
                    ? 'bg-[#00031b]/60 text-gray-300 hover:text-white'
                    : 'bg-white text-gray-500 hover:text-gray-700'
              } transition-colors`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Refresh button */}
          <button
            onClick={refreshData}
            className={`flex items-center px-3 py-2 rounded-lg ${
              isDark
                ? 'bg-[#00031b]/60 hover:bg-[#00031b]/80 text-white border border-[#00cbdd]/30'
                : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200'
            } transition-colors`}
          >
            <RefreshCw className={`h-4 w-4`} />
          </button>
        </div>

        {/* Filters panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t overflow-hidden"
            >
              <DashboardCard
                title={t('filterModels')}
                className={`p-4 ${isDark ? 'bg-[#000c3e]/80' : 'bg-slate-50'}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Model type filter with info popup */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-1">
                      <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {t('modelType')}
                      </label>
                      <div className="relative group">
                        <button
                          className={`flex items-center justify-center w-5 h-5 rounded-full ${
                            isDark ? 'bg-[#00cbdd]/20 text-[#00cbdd]' : 'bg-blue-100 text-blue-600'
                          }`}
                          aria-label="Learn more about model types"
                        >
                          <HelpCircle className="w-3 h-3" />
                        </button>
                        <div className={`absolute right-0 w-72 p-3 rounded-md shadow-lg z-10 text-sm transform translate-y-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
                          isDark ? 'bg-[#001a55] text-gray-200 border border-[#00cbdd]/30' : 'bg-white text-gray-700 border border-gray-200'
                        }`}>
                          <h4 className="font-medium mb-1">Model Types</h4>
                          <ul className="space-y-2 text-xs">
                            <li>
                              <strong>LLM (Large Language Model):</strong> Models with 7B+ parameters trained on vast text data, capable of sophisticated reasoning, content generation, and complex tasks. Examples: Mistral-7B, Llama-2-7B.
                            </li>
                            <li>
                              <strong>SLM (Small Language Model):</strong> Compact models with &lt;7B parameters optimized for efficiency and specific tasks, ideal for edge devices and resource-constrained environments. Examples: Phi-3-Mini, TinyLlama.
                            </li>
                            <li>
                              <strong>Vision:</strong> Models that process and understand visual information, generating or analyzing images. Example: Stable Diffusion 3.
                            </li>
                            <li>
                              <strong>Code:</strong> Specialized models for code generation, completion, and understanding programming languages.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <select
                      value={activeFilters.modelType || ''}
                      onChange={(e) => {
                        const newValue = e.target.value || undefined;
                        setActiveFilters({
                          ...activeFilters,
                          modelType: newValue as any // Using any as a workaround
                        });
                      }}
                      className={`w-full py-2 px-3 rounded-lg border ${
                        isDark
                          ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white'
                          : 'bg-white border-gray-200 text-gray-800'
                      } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40 transition-all duration-200`}
                    >
                      <option value="">{t('allTypes')}</option>
                      <option value={ModelType.LLM}>LLM (Large Language Model)</option>
                      <option value="SLM">SLM (Small Language Model)</option>
                      <option value={ModelType.CHAT_LLM}>Chat LLM</option>
                      <option value={ModelType.VISION}>Vision</option>
                      <option value={ModelType.CODE}>Code</option>
                      <option value={ModelType.TEXT_TO_SPEECH}>Text to Speech</option>
                    </select>
                  </div>

                  {/* Size filter with info popup */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-1">
                      <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {t('modelSize')}
                      </label>
                      <div className="relative group">
                        <button
                          className={`flex items-center justify-center w-5 h-5 rounded-full ${
                            isDark ? 'bg-[#00cbdd]/20 text-[#00cbdd]' : 'bg-blue-100 text-blue-600'
                          }`}
                          aria-label="Learn more about model sizes"
                        >
                          <HelpCircle className="w-3 h-3" />
                        </button>
                        <div className={`absolute right-0 w-64 p-3 rounded-md shadow-lg z-10 text-sm transform translate-y-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
                          isDark ? 'bg-[#001a55] text-gray-200 border border-[#00cbdd]/30' : 'bg-white text-gray-700 border border-gray-200'
                        }`}>
                          <h4 className="font-medium mb-1">Model Sizes</h4>
                          <ul className="space-y-1 text-xs">
                            <li><strong>Small:</strong> &lt;5GB, faster inference, less memory</li>
                            <li><strong>Medium:</strong> 5-10GB, balanced performance</li>
                            <li><strong>Large:</strong> 10-15GB, higher accuracy</li>
                            <li><strong>X-Large:</strong> &gt;15GB, highest quality but resource intensive</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <select
                      value={activeFilters.size || ''}
                      onChange={(e) => {
                        const newFilters = { ...activeFilters };
                        newFilters.size = e.target.value || undefined;
                        setActiveFilters(newFilters);
                      }}
                      className={`w-full py-2 px-3 rounded-lg border ${
                        isDark
                          ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white'
                          : 'bg-white border-gray-200 text-gray-800'
                      } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40 transition-all duration-200`}
                    >
                      <option value="">{t('allSizes')}</option>
                      <option value="small">{t('small')}</option>
                      <option value="medium">{t('medium')}</option>
                      <option value="large">{t('large')}</option>
                      <option value="xlarge">{t('xlarge')}</option>
                    </select>
                  </div>

                  {/* Status filter */}
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('status')}
                    </label>
                    <select
                      value={activeFilters.status ? activeFilters.status[0] : ''}
                      onChange={(e) => {
                        const newFilters = { ...activeFilters };
                        const value = e.target.value;
                        newFilters.status = value ? [value as ModelStatus] : undefined;
                        setActiveFilters(newFilters);
                      }}
                      className={`w-full py-2 px-3 rounded-lg border ${
                        isDark
                          ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white'
                          : 'bg-white border-gray-200 text-gray-800'
                      } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40 transition-all duration-200`}
                    >
                      <option value="">{t('allStatuses')}</option>
                      <option value={ModelStatus.RUNNING}>{t('running')}</option>
                      <option value={ModelStatus.PAUSED}>{t('paused')}</option>
                      <option value={ModelStatus.ERROR}>{t('error')}</option>
                      <option value={ModelStatus.AVAILABLE}>{t('available')}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Performance filter - NEW */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-1">
                      <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {t('performance')}
                      </label>
                      <div className="relative group">
                        <button
                          className={`flex items-center justify-center w-5 h-5 rounded-full ${
                            isDark ? 'bg-[#00cbdd]/20 text-[#00cbdd]' : 'bg-blue-100 text-blue-600'
                          }`}
                          aria-label="Learn more about performance metrics"
                        >
                          <HelpCircle className="w-3 h-3" />
                        </button>
                        <div className={`absolute right-0 w-64 p-3 rounded-md shadow-lg z-10 text-sm transform translate-y-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
                          isDark ? 'bg-[#001a55] text-gray-200 border border-[#00cbdd]/30' : 'bg-white text-gray-700 border border-gray-200'
                        }`}>
                          <h4 className="font-medium mb-1">Performance</h4>
                          <ul className="space-y-1 text-xs">
                            <li><strong>High:</strong> Accuracy &gt;85%, ideal for production</li>
                            <li><strong>Medium:</strong> Accuracy 70-85%, good for most cases</li>
                            <li><strong>Low:</strong> Accuracy &lt;70%, suitable for non-critical tasks</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <select
                      value={activeFilters.performance || ''}
                      onChange={(e) => {
                        const newFilters = { ...activeFilters };
                        newFilters.performance = e.target.value || undefined;
                        setActiveFilters(newFilters);
                      }}
                      className={`w-full py-2 px-3 rounded-lg border ${
                        isDark
                          ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white'
                          : 'bg-white border-gray-200 text-gray-800'
                      } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40 transition-all duration-200`}
                    >
                      <option value="">{t('allPerformance')}</option>
                      <option value="high">High (&gt;85%)</option>
                      <option value="medium">Medium (70-85%)</option>
                      <option value="low">Low (&lt;70%)</option>
                    </select>
                  </div>

                  {/* Latency filter - NEW */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-1">
                      <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {t('latency')}
                      </label>
                      <div className="relative group">
                        <button
                          className={`flex items-center justify-center w-5 h-5 rounded-full ${
                            isDark ? 'bg-[#00cbdd]/20 text-[#00cbdd]' : 'bg-blue-100 text-blue-600'
                          }`}
                          aria-label="Learn more about latency"
                        >
                          <HelpCircle className="w-3 h-3" />
                        </button>
                        <div className={`absolute right-0 w-64 p-3 rounded-md shadow-lg z-10 text-sm transform translate-y-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
                          isDark ? 'bg-[#001a55] text-gray-200 border border-[#00cbdd]/30' : 'bg-white text-gray-700 border border-gray-200'
                        }`}>
                          <h4 className="font-medium mb-1">Latency</h4>
                          <ul className="space-y-1 text-xs">
                            <li><strong>Low:</strong> &lt;150ms response time, best for real-time applications</li>
                            <li><strong>Medium:</strong> 150-300ms, suitable for most applications</li>
                            <li><strong>High:</strong> &gt;300ms, may cause noticeable delays</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <select
                      value={activeFilters.latency || ''}
                      onChange={(e) => {
                        const newFilters = { ...activeFilters };
                        newFilters.latency = e.target.value || undefined;
                        setActiveFilters(newFilters);
                      }}
                      className={`w-full py-2 px-3 rounded-lg border ${
                        isDark
                          ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white'
                        : 'bg-white border-gray-200 text-gray-800'
                      } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40 transition-all duration-200`}
                    >
                      <option value="">{t('allLatency')}</option>
                      <option value="low">Low (&lt;150ms)</option>
                      <option value="medium">Medium (150-300ms)</option>
                      <option value="high">High (&gt;300ms)</option>
                    </select>
                  </div>

                  {/* Sort By - NEW */}
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('sortBy')}
                    </label>
                    <div className="flex items-center">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className={`w-full py-2 px-3 rounded-l-lg border-y border-l ${
                          isDark
                            ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white'
                            : 'bg-white border-gray-200 text-gray-800'
                        } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40 transition-all duration-200`}
                      >
                        <option value="name">{t('name')}</option>
                        <option value="created">{t('created')}</option>
                        <option value="parameters">{t('parameters')}</option>
                        <option value="accuracy">{t('accuracy')}</option>
                        <option value="latency">{t('latency')}</option>
                      </select>
                      <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className={`flex items-center justify-center p-2 border-y border-r rounded-r-lg ${
                          isDark
                            ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white hover:bg-[#000c3e]'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <ArrowUpDown className={`h-4 w-4 ${
                          sortOrder === 'asc' ? 'rotate-0' : 'rotate-180'
                        } transition-transform duration-200`} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="bookmarked"
                      checked={!!activeFilters.bookmarked}
                      onChange={(e) => {
                        const newFilters = { ...activeFilters };
                        newFilters.bookmarked = e.target.checked;
                        setActiveFilters(newFilters);
                      }}
                      className="rounded border-gray-300 text-[#00cbdd] focus:ring-[#00cbdd]"
                    />
                    <label htmlFor="bookmarked" className={`ml-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('showBookmarkedOnly')}
                    </label>
                  </div>

                  <div className="relative group">
                    <button
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs ${
                        isDark
                          ? 'bg-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/30'
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      <HelpCircle className="w-3 h-3" />
                      LLMs vs SLMs Explained
                    </button>
                    <div className={`absolute right-0 bottom-full mb-2 w-80 p-4 rounded-md shadow-lg z-10 text-sm transform opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
                      isDark ? 'bg-[#001a55] text-gray-200 border border-[#00cbdd]/30' : 'bg-white text-gray-700 border border-gray-200'
                    }`}>
                      <h4 className="font-medium mb-2">LLMs vs SLMs: Key Differences</h4>
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-xs">Size & Parameters</h5>
                          <p className="text-xs mt-1">
                            <strong>LLMs:</strong> 7B+ parameters, larger file size (10GB+)<br />
                            <strong>SLMs:</strong> &lt;7B parameters, smaller file size (&lt;10GB)
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-xs">Performance</h5>
                          <p className="text-xs mt-1">
                            <strong>LLMs:</strong> Higher accuracy, better reasoning, more capabilities<br />
                            <strong>SLMs:</strong> Lower accuracy, focused capabilities, task-specific
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-xs">Resource Requirements</h5>
                          <p className="text-xs mt-1">
                            <strong>LLMs:</strong> Higher memory usage, often requires GPU<br />
                            <strong>SLMs:</strong> Lower memory usage, can run on CPU or mobile devices
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-xs">Use Cases</h5>
                          <p className="text-xs mt-1">
                            <strong>LLMs:</strong> Complex tasks, creative content, reasoning<br />
                            <strong>SLMs:</strong> Edge deployment, specific domains, resource-constrained environments
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add margin here between the filters and model list */}
      <div className="mt-8">
        {/* Selection Bar */}
        {showSelectionBar && (
          <div className={`py-2 px-6 ${isDark ? 'bg-[#000c3e]' : 'bg-blue-50'} border-b ${isDark ? 'border-[#0c2580]' : 'border-blue-100'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setSelectedForComparison([]);
                    setShowComparison(false);
                  }}
                  className={`flex items-center text-sm ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear selection
                </button>
                <div className={`text-sm ${isDark ? 'text-white' : 'text-gray-700'}`}>
                  <span className={`font-medium ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'}`}>
                    {selectedForComparison.length}
                  </span> models selected
                </div>
              </div>

              <button
                onClick={startComparison}
                className={`px-4 py-2 rounded-lg text-sm flex items-center ${
                  isDark
                    ? 'bg-[#00cbdd] text-[#000423] hover:bg-[#00b0c0]'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                disabled={selectedForComparison.length < 2}
              >
                <Scale className="h-4 w-4 mr-2" />
                Compare Models
              </button>
            </div>
          </div>
        )}

        {/* Models list */}
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={`animate-pulse rounded-xl ${
                  isDark
                    ? 'bg-[#00031b]/90 border border-[#00cbdd]/20'
                    : 'bg-white border border-gray-200'
                } p-4 ${viewMode === 'list' ? 'flex items-center' : 'h-[280px]'}`}
              >
                <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className={`h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4`}></div>
                  <div className={`h-3 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2`}></div>
                  <div className={`h-3 bg-gray-200 dark:bg-gray-800 rounded w-5/6`}></div>
                  {viewMode === 'grid' && (
                    <>
                      <div className="mt-6 h-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
                      <div className="mt-4 flex justify-between">
                        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                      </div>
                    </>
                  )}
                </div>
                {viewMode === 'list' && (
                  <div className="flex space-x-2">
                    <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </div>
                )}
              </div>
            ))
          ) : filteredModels.length === 0 ? (
            <EmptyState
              title="No models found"
              description="Try adjusting your search or filters to find what you're looking for."
              icon={<SlidersHorizontal className="h-10 w-10" />}
              isDark={isDark}
            />
          ) : (
            filteredModels.map((model, index) => (
              <ModelCard
                key={model.id}
                model={model}
                viewMode={viewMode}
                expandedModel={expandedModel}
                toggleModelDetails={toggleModelDetails}
                handleToggleBookmark={handleToggleBookmark}
                onCompare={handleCompareClick}
                onViewDetails={handleViewDetails}
                isSelectedForComparison={selectedForComparison.some(m => m.id === model.id)}
                isDark={isDark}
                delay={index * 0.05}
              />
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      {!isLoading && filteredModels.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {t('showing')} {(page - 1) * limit + 1}-
            {Math.min(page * limit, filteredModels.length)} {t('of')} {filteredModels.length} {t('models')}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className={`p-2 rounded-lg ${
                page === 1
                  ? isDark
                    ? 'bg-[#00031b]/60 text-gray-600 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : isDark
                    ? 'bg-[#00031b]/60 text-white hover:bg-[#00031b]/80'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`w-10 h-10 rounded-lg ${
                  page === index + 1
                    ? isDark
                      ? 'bg-[#00cbdd] text-white'
                      : 'bg-blue-600 text-white'
                    : isDark
                      ? 'bg-[#00031b]/60 text-white hover:bg-[#00031b]/80'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className={`p-2 rounded-lg ${
                page === totalPages
                  ? isDark
                    ? 'bg-[#00031b]/60 text-gray-600 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : isDark
                    ? 'bg-[#00031b]/60 text-white hover:bg-[#00031b]/80'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}