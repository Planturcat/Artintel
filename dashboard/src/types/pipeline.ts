/**
 * Pipeline Types
 */

export type PipelineStatus = 'active' | 'draft' | 'paused' | 'error';
export type ComponentType = 'model' | 'dataProcessor' | 'logic' | 'input' | 'output' | 'connector';
export type ExecutionStatus = 'pending' | 'running' | 'completed' | 'failed';

// Pipeline interface
export interface Pipeline {
  id: string;
  name: string;
  description?: string;
  components: PipelineComponent[];
  connections: PipelineConnection[];
  createdAt: string;
  updatedAt: string;
  status: PipelineStatus;
  createdBy?: string;
  version: string;
  tags?: string[];
  endpoint?: string;
  lastExecutionTime?: string;
  executionCount?: number;
  averageExecutionTime?: number;
  isPublic?: boolean;
  userId?: string;
  teamId?: string;
}

// Pipeline component interface
export interface PipelineComponent {
  id: string;
  name: string;
  type: 'input' | 'model' | 'dataProcessor' | 'output' | 'logic';
  subtype: string;
  position: Position;
  inputs: PipelinePort[];
  outputs: PipelinePort[];
  config: Record<string, any>;
  validationRules?: Record<string, any>;
  description?: string;
  isExpanded?: boolean;
}

// Connection between pipeline components
export interface PipelineConnection {
  id: string;
  sourceId: string;
  sourcePortId: string;
  targetId: string;
  targetPortId: string;
  label?: string;
  animate?: boolean;
}

// Pipeline metrics
export interface PipelineMetrics {
  totalPipelines: number;
  activePipelines: number;
  totalExecutions: number;
  totalModelsUsed: number;
  executionsPerDay: { date: string; count: number }[];
  averageExecutionTime: number;
  successRate: number;
  pipelineTrend: number;
  activeTrend: number;
  executionTrend: number;
  recentExecutions: PipelineExecution[];
  popularModels: {
    modelId: string;
    name: string;
    usageCount: number;
  }[];
}

// Pipeline execution
export interface PipelineExecution {
  id: string;
  pipelineId: string;
  status: ExecutionStatus;
  startTime: string;
  endTime?: string;
  input: Record<string, any>;
  result?: {
    output: any;
    logs?: string[];
    error?: string;
  };
}

// Pipeline execution logs
export interface PipelineExecutionLog {
  timestamp: string;
  componentId: string;
  componentName: string;
  message: string;
  level: 'info' | 'warning' | 'error';
  details?: Record<string, any>;
}

// Pipeline template
export interface PipelineTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  components: PipelineComponent[];
  connections: PipelineConnection[];
  thumbnail?: string;
  tags: string[];
  popularity: number;
  usageCount: number;
}

// Pipeline creation request
export interface CreatePipelineRequest {
  name: string;
  description?: string;
  templateId?: string;
  components?: PipelineComponent[];
  connections?: PipelineConnection[];
  tags?: string[];
}

// Pipeline update request
export interface UpdatePipelineRequest {
  name?: string;
  description?: string;
  components?: PipelineComponent[];
  connections?: PipelineConnection[];
  status?: PipelineStatus;
  tags?: string[];
}

// Pipeline deployment request
export interface DeployPipelineRequest {
  pipelineId: string;
  environment: 'development' | 'staging' | 'production';
  version?: string;
  scaling?: {
    minInstances: number;
    maxInstances: number;
  };
  region?: string;
}

// Component port definition
export interface PipelinePort {
  id: string;
  name: string;
  type: string;
  required?: boolean;
}

// Position definition
export interface Position {
  x: number;
  y: number;
} 