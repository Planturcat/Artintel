import {
  Pipeline,
  PipelineStatus,
  PipelineMetrics,
  PipelineExecution,
  PipelineTemplate,
  PipelineComponent,
  PipelineConnection
} from '@/types/pipeline';
import { mockData } from './mock-utils';

// Mock Pipelines Data
const mockPipelines: Pipeline[] = [
  {
    id: 'pipeline-001',
    name: 'Text Classification Pipeline',
    description: 'Sentiment analysis and classification pipeline for customer feedback',
    status: 'active',
    version: '1.2.0',
    createdAt: '2023-11-15T10:30:00Z',
    updatedAt: '2024-02-20T14:45:00Z',
    components: [
      {
        id: 'comp-001',
        name: 'Text Input',
        type: 'input',
        subtype: 'text',
        position: { x: 100, y: 100 },
        inputs: [],
        outputs: [
          { id: 'output', name: 'Text', type: 'string' }
        ],
        config: {
          placeholder: 'Enter text to analyze'
        }
      },
      {
        id: 'comp-002',
        name: 'Sentiment Analysis',
        type: 'model',
        subtype: 'classification',
        position: { x: 350, y: 100 },
        inputs: [
          { id: 'input', name: 'Text', type: 'string', required: true }
        ],
        outputs: [
          { id: 'output', name: 'Sentiment', type: 'json' }
        ],
        config: {
          modelId: 'model-bert-sentiment',
          threshold: 0.75
        }
      },
      {
        id: 'comp-003',
        name: 'JSON Output',
        type: 'output',
        subtype: 'json',
        position: { x: 600, y: 100 },
        inputs: [
          { id: 'input', name: 'Data', type: 'any', required: true }
        ],
        outputs: [],
        config: {
          formatPretty: true
        }
      }
    ],
    connections: [
      {
        id: 'conn-001',
        sourceId: 'comp-001',
        sourcePortId: 'output',
        targetId: 'comp-002',
        targetPortId: 'input'
      },
      {
        id: 'conn-002',
        sourceId: 'comp-002',
        sourcePortId: 'output',
        targetId: 'comp-003',
        targetPortId: 'input'
      }
    ],
    endpoint: '/api/pipelines/pipeline-001/execute',
    executionCount: 572,
    tags: ['text', 'classification', 'sentiment']
  },
  {
    id: 'pipeline-002',
    name: 'Content Generation Pipeline',
    description: 'Automated content creation with customizable parameters',
    status: 'active',
    version: '1.0.5',
    createdAt: '2024-01-03T09:20:00Z',
    updatedAt: '2024-03-10T11:15:00Z',
    components: [
      {
        id: 'comp-001',
        name: 'Topic Input',
        type: 'input',
        subtype: 'text',
        position: { x: 100, y: 150 },
        inputs: [],
        outputs: [
          { id: 'output', name: 'Topic', type: 'string' }
        ],
        config: {
          placeholder: 'Enter content topic'
        }
      },
      {
        id: 'comp-002',
        name: 'Outline Generator',
        type: 'model',
        subtype: 'generation',
        position: { x: 350, y: 150 },
        inputs: [
          { id: 'input', name: 'Topic', type: 'string', required: true }
        ],
        outputs: [
          { id: 'output', name: 'Outline', type: 'string' }
        ],
        config: {
          modelId: 'model-gpt',
          maxTokens: 200,
          temperature: 0.7
        }
      },
      {
        id: 'comp-003',
        name: 'Content Generator',
        type: 'model',
        subtype: 'generation',
        position: { x: 600, y: 150 },
        inputs: [
          { id: 'input', name: 'Outline', type: 'string', required: true }
        ],
        outputs: [
          { id: 'output', name: 'Content', type: 'string' }
        ],
        config: {
          modelId: 'model-gpt',
          maxTokens: 1500,
          temperature: 0.8,
          topP: 1
        }
      },
      {
        id: 'comp-004',
        name: 'Text Output',
        type: 'output',
        subtype: 'text',
        position: { x: 850, y: 150 },
        inputs: [
          { id: 'input', name: 'Content', type: 'string', required: true }
        ],
        outputs: [],
        config: {}
      }
    ],
    connections: [
      {
        id: 'conn-001',
        sourceId: 'comp-001',
        sourcePortId: 'output',
        targetId: 'comp-002',
        targetPortId: 'input'
      },
      {
        id: 'conn-002',
        sourceId: 'comp-002',
        sourcePortId: 'output',
        targetId: 'comp-003',
        targetPortId: 'input'
      },
      {
        id: 'conn-003',
        sourceId: 'comp-003',
        sourcePortId: 'output',
        targetId: 'comp-004',
        targetPortId: 'input'
      }
    ],
    endpoint: '/api/pipelines/pipeline-002/execute',
    executionCount: 348,
    tags: ['content', 'generation', 'creative']
  },
  {
    id: 'pipeline-003',
    name: 'Data Transformation Pipeline',
    description: 'Clean and transform data for analytics',
    status: 'draft',
    version: '0.5.0',
    createdAt: '2024-02-28T16:40:00Z',
    updatedAt: '2024-03-15T13:10:00Z',
    components: [
      {
        id: 'comp-001',
        name: 'CSV Input',
        type: 'input',
        subtype: 'file',
        position: { x: 100, y: 200 },
        inputs: [],
        outputs: [
          { id: 'output', name: 'Data', type: 'json' }
        ],
        config: {
          fileTypes: ['csv']
        }
      },
      {
        id: 'comp-002',
        name: 'Data Cleaner',
        type: 'dataProcessor',
        subtype: 'transformer',
        position: { x: 350, y: 200 },
        inputs: [
          { id: 'input', name: 'Raw Data', type: 'json', required: true }
        ],
        outputs: [
          { id: 'output', name: 'Clean Data', type: 'json' }
        ],
        config: {
          operations: ['dropNa', 'removeOutliers']
        }
      },
      {
        id: 'comp-003',
        name: 'Feature Engineering',
        type: 'dataProcessor',
        subtype: 'transformer',
        position: { x: 600, y: 200 },
        inputs: [
          { id: 'input', name: 'Data', type: 'json', required: true }
        ],
        outputs: [
          { id: 'output', name: 'Processed Data', type: 'json' }
        ],
        config: {
          features: ['normalize', 'oneHotEncode']
        }
      }
    ],
    connections: [
      {
        id: 'conn-001',
        sourceId: 'comp-001',
        sourcePortId: 'output',
        targetId: 'comp-002',
        targetPortId: 'input'
      },
      {
        id: 'conn-002',
        sourceId: 'comp-002',
        sourcePortId: 'output',
        targetId: 'comp-003',
        targetPortId: 'input'
      }
    ],
    executionCount: 0,
    tags: ['data', 'transformation', 'analytics']
  },
  {
    id: 'pipeline-004',
    name: 'Image Analysis Pipeline',
    description: 'Vision model for image captioning and object detection',
    status: 'paused',
    version: '2.1.0',
    createdAt: '2023-09-05T08:15:00Z',
    updatedAt: '2024-02-10T10:30:00Z',
    components: [],
    connections: [],
    endpoint: '/api/pipelines/pipeline-004/execute',
    executionCount: 789,
    tags: ['vision', 'image', 'detection']
  },
  {
    id: 'pipeline-005',
    name: 'Customer Support Bot',
    description: 'Automated customer support with contextual responses',
    status: 'error',
    version: '1.3.2',
    createdAt: '2023-11-20T14:25:00Z',
    updatedAt: '2024-03-18T09:45:00Z',
    components: [],
    connections: [],
    executionCount: 1254,
    tags: ['support', 'chatbot', 'customer']
  }
];

// Mock Templates Data
const mockTemplates: PipelineTemplate[] = [
  {
    id: 'template-001',
    name: 'Sentiment Analysis',
    description: 'Basic template for analyzing sentiment in text',
    category: 'NLP',
    difficulty: 'beginner',
    popularity: 4.7,
    usageCount: 1350,
    components: [
      {
        id: 'comp-001',
        name: 'Text Input',
        type: 'input',
        subtype: 'text',
        position: { x: 100, y: 100 },
        inputs: [],
        outputs: [
          { id: 'output', name: 'Text', type: 'string' }
        ],
        config: {
          placeholder: 'Enter text to analyze'
        }
      },
      {
        id: 'comp-002',
        name: 'Sentiment Analysis',
        type: 'model',
        subtype: 'classification',
        position: { x: 350, y: 100 },
        inputs: [
          { id: 'input', name: 'Text', type: 'string', required: true }
        ],
        outputs: [
          { id: 'output', name: 'Sentiment', type: 'json' }
        ],
        config: {
          modelId: 'model-bert-sentiment'
        }
      },
      {
        id: 'comp-003',
        name: 'JSON Output',
        type: 'output',
        subtype: 'json',
        position: { x: 600, y: 100 },
        inputs: [
          { id: 'input', name: 'Data', type: 'any', required: true }
        ],
        outputs: [],
        config: {}
      }
    ],
    connections: [
      {
        id: 'conn-001',
        sourceId: 'comp-001',
        sourcePortId: 'output',
        targetId: 'comp-002',
        targetPortId: 'input'
      },
      {
        id: 'conn-002',
        sourceId: 'comp-002',
        sourcePortId: 'output',
        targetId: 'comp-003',
        targetPortId: 'input'
      }
    ],
    thumbnail: '/images/templates/sentiment-analysis.png',
    tags: ['nlp', 'sentiment', 'classification']
  },
  {
    id: 'template-002',
    name: 'Conversational Agent',
    description: 'Template for building chat bots with conversational capabilities',
    category: 'Chatbots',
    difficulty: 'intermediate',
    popularity: 4.5,
    usageCount: 987,
    components: [
      {
        id: 'comp-001',
        name: 'Message Input',
        type: 'input',
        subtype: 'text',
        position: { x: 100, y: 150 },
        inputs: [],
        outputs: [
          { id: 'output', name: 'Message', type: 'string' }
        ],
        config: {
          placeholder: 'User message'
        }
      },
      {
        id: 'comp-002',
        name: 'Context Processor',
        type: 'dataProcessor',
        subtype: 'contextManager',
        position: { x: 350, y: 150 },
        inputs: [
          { id: 'input', name: 'Message', type: 'string', required: true }
        ],
        outputs: [
          { id: 'output', name: 'Context', type: 'json' }
        ],
        config: {
          historyLength: 10
        }
      },
      {
        id: 'comp-003',
        name: 'Response Generator',
        type: 'model',
        subtype: 'generation',
        position: { x: 600, y: 150 },
        inputs: [
          { id: 'input', name: 'Context', type: 'json', required: true }
        ],
        outputs: [
          { id: 'output', name: 'Response', type: 'string' }
        ],
        config: {
          modelId: 'model-gpt',
          temperature: 0.7
        }
      },
      {
        id: 'comp-004',
        name: 'Text Output',
        type: 'output',
        subtype: 'text',
        position: { x: 850, y: 150 },
        inputs: [
          { id: 'input', name: 'Response', type: 'string', required: true }
        ],
        outputs: [],
        config: {}
      }
    ],
    connections: [
      {
        id: 'conn-001',
        sourceId: 'comp-001',
        sourcePortId: 'output',
        targetId: 'comp-002',
        targetPortId: 'input'
      },
      {
        id: 'conn-002',
        sourceId: 'comp-002',
        sourcePortId: 'output',
        targetId: 'comp-003',
        targetPortId: 'input'
      },
      {
        id: 'conn-003',
        sourceId: 'comp-003',
        sourcePortId: 'output',
        targetId: 'comp-004',
        targetPortId: 'input'
      }
    ],
    thumbnail: '/images/templates/chatbot.png',
    tags: ['chatbot', 'conversation', 'nlp']
  },
  {
    id: 'template-003',
    name: 'Document Summarization',
    description: 'Pipeline for extracting key information from documents',
    category: 'Document Processing',
    difficulty: 'beginner',
    popularity: 4.2,
    usageCount: 754,
    components: [],
    connections: [],
    thumbnail: '/images/templates/document-summary.png',
    tags: ['document', 'summary', 'extraction']
  }
];

// Mock Metrics
const mockMetrics: PipelineMetrics = {
  totalPipelines: 5,
  activePipelines: 2,
  totalExecutions: 2963,
  totalModelsUsed: 6,
  pipelineTrend: 15,
  activeTrend: 10,
  executionTrend: 27,
  recentExecutions: [
    {
      id: 'exec-001',
      pipelineId: 'pipeline-001',
      status: 'completed',
      startTime: '2024-03-20T15:30:00Z',
      endTime: '2024-03-20T15:30:05Z',
      input: { text: 'The service was excellent and the staff was very friendly.' },
      result: {
        output: {
          sentiment: 'positive',
          confidence: 0.92,
          emotions: {
            joy: 0.85,
            satisfaction: 0.78
          }
        }
      }
    },
    {
      id: 'exec-002',
      pipelineId: 'pipeline-002',
      status: 'completed',
      startTime: '2024-03-20T14:25:00Z',
      endTime: '2024-03-20T14:25:32Z',
      input: { topic: 'Benefits of AI in healthcare' },
      result: {
        output: 'AI is revolutionizing healthcare in numerous ways...'
      }
    },
    {
      id: 'exec-003',
      pipelineId: 'pipeline-005',
      status: 'failed',
      startTime: '2024-03-20T13:10:00Z',
      endTime: '2024-03-20T13:10:08Z',
      input: { query: 'How do I reset my password?' },
      result: {
        error: 'Model connection timeout'
      }
    }
  ],
  popularModels: [
    {
      modelId: 'model-gpt',
      name: 'GPT-4',
      usageCount: 1587
    },
    {
      modelId: 'model-bert-sentiment',
      name: 'BERT Sentiment',
      usageCount: 742
    },
    {
      modelId: 'model-vision',
      name: 'Vision Transformer',
      usageCount: 634
    }
  ]
};

// API Functions
/**
 * Get all pipelines
 */
export const getPipelines = async (): Promise<Pipeline[]> => {
  return mockData(mockPipelines);
};

/**
 * Get a specific pipeline by ID
 */
export const getPipeline = async (id: string): Promise<Pipeline> => {
  const pipeline = mockPipelines.find(p => p.id === id);
  if (!pipeline) {
    throw new Error(`Pipeline with ID ${id} not found`);
  }
  return mockData(pipeline);
};

/**
 * Create a new pipeline
 */
export const createPipeline = async (data: {
  name: string;
  description?: string;
  tags?: string[];
  templateId?: string;
}): Promise<Pipeline> => {
  let components: PipelineComponent[] = [];
  let connections: PipelineConnection[] = [];
  
  // If template is provided, copy components and connections from template
  if (data.templateId) {
    const template = mockTemplates.find(t => t.id === data.templateId);
    if (template) {
      components = [...template.components];
      connections = [...template.connections];
    }
  }
  
  const newPipeline: Pipeline = {
    id: `pipeline-${Date.now()}`,
    name: data.name,
    description: data.description || '',
    status: 'draft',
    version: '0.1.0',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    components,
    connections,
    executionCount: 0,
    tags: data.tags || []
  };
  
  // In a real app, we would save to the database here
  mockPipelines.push(newPipeline);
  
  return mockData(newPipeline);
};

/**
 * Update an existing pipeline
 */
export const updatePipeline = async (
  id: string,
  updates: Partial<Pipeline>
): Promise<Pipeline> => {
  const pipelineIndex = mockPipelines.findIndex(p => p.id === id);
  if (pipelineIndex === -1) {
    throw new Error(`Pipeline with ID ${id} not found`);
  }
  
  const updatedPipeline = {
    ...mockPipelines[pipelineIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  mockPipelines[pipelineIndex] = updatedPipeline;
  
  return mockData(updatedPipeline);
};

/**
 * Update pipeline status
 */
export const updatePipelineStatus = async (
  id: string,
  status: PipelineStatus
): Promise<Pipeline> => {
  return updatePipeline(id, { status });
};

/**
 * Delete a pipeline
 */
export const deletePipeline = async (id: string): Promise<void> => {
  const pipelineIndex = mockPipelines.findIndex(p => p.id === id);
  if (pipelineIndex === -1) {
    throw new Error(`Pipeline with ID ${id} not found`);
  }
  
  mockPipelines.splice(pipelineIndex, 1);
  
  return mockData(undefined);
};

/**
 * Execute a pipeline with input data
 */
export const executePipeline = async (
  id: string,
  input: Record<string, any>
): Promise<PipelineExecution> => {
  const pipeline = mockPipelines.find(p => p.id === id);
  if (!pipeline) {
    throw new Error(`Pipeline with ID ${id} not found`);
  }
  
  if (pipeline.status !== 'active') {
    throw new Error(`Pipeline is not active`);
  }
  
  // Simulate pipeline execution
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate a sample result based on the pipeline type
  let output: any;
  
  if (pipeline.name.includes('Sentiment') || pipeline.name.includes('Classification')) {
    output = {
      sentiment: Math.random() > 0.5 ? 'positive' : 'negative',
      confidence: Math.random() * 0.5 + 0.5,
      emotions: {
        joy: Math.random(),
        satisfaction: Math.random()
      }
    };
  } else if (pipeline.name.includes('Generation') || pipeline.name.includes('Content')) {
    const prompt = input.prompt || input.topic || 'Default prompt';
    output = `Generated content based on: "${prompt}".\n\nThis is a sample output from the pipeline execution. In a real application, this would be the result of processing through all pipeline components.`;
  } else {
    output = {
      result: 'Success',
      timestamp: new Date().toISOString(),
      processingTime: Math.floor(Math.random() * 1000) + 100
    };
  }
  
  const execution: PipelineExecution = {
    id: `exec-${Date.now()}`,
    pipelineId: id,
    status: 'completed',
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    input,
    result: {
      output
    }
  };
  
  // Update execution count
  const pipelineIndex = mockPipelines.findIndex(p => p.id === id);
  if (pipelineIndex !== -1) {
    mockPipelines[pipelineIndex].executionCount = (mockPipelines[pipelineIndex].executionCount || 0) + 1;
  }
  
  return mockData(execution);
};

/**
 * Get pipeline metrics
 */
export const getPipelineMetrics = async (): Promise<PipelineMetrics> => {
  return mockData(mockMetrics);
};

/**
 * Get pipeline templates
 */
export const getPipelineTemplates = async (): Promise<PipelineTemplate[]> => {
  return mockData(mockTemplates);
}; 