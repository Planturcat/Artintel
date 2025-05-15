/**
 * TypeScript API client for the ArtIntel LLMs Dataset Management
 * This file provides interfaces and functions for interacting with the datasets API
 */

import { apiRequest, APIError, API_BASE_URL, USE_MOCK_API } from './dashboard-api';
import { createHeaders } from './config';
import { getUserContext } from './mock-user-context';

// Dataset types based on API documentation
export enum DatasetType {
  Text = 'text',
  Image = 'image',
  Audio = 'audio',
  Video = 'video',
  Tabular = 'tabular',
  Mixed = 'mixed'
}

export enum DatasetFormat {
  CSV = 'csv',
  JSON = 'json',
  JSONL = 'jsonl',
  TXT = 'txt',
  PDF = 'pdf',
  EXCEL = 'xlsx',
  Parquet = 'parquet',
  Image = 'image',
  Audio = 'audio',
  Video = 'video'
}

export enum DatasetSource {
  Upload = 'upload',
  CloudStorage = 'cloud_storage',
  Database = 'database',
  API = 'api',
  Scraper = 'scraper'
}

export enum DatasetPrivacy {
  Public = 'public',
  Private = 'private',
  Restricted = 'restricted'
}

export enum DatasetStatus {
  Uploading = 'uploading',
  Processing = 'processing',
  Ready = 'ready',
  Error = 'error',
  Deleted = 'deleted'
}

// Dataset interface based on API documentation
export interface SharedWithInfo {
  hubId: string;
  hubName?: string;
  accessLevel: string;
  sharedAt: string;
  sharedBy: string;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  type: DatasetType | string;
  format: DatasetFormat | string;
  source: DatasetSource | string;
  size: number; // in bytes
  itemCount: number;
  privacy: DatasetPrivacy | string;
  status: DatasetStatus | string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  lastUsedAt?: string;
  shared_with?: SharedWithInfo[];
  metadata?: {
    schema?: any;
    columnTypes?: Record<string, string>;
    hasHeader?: boolean;
    sampleRate?: number;
    imageSize?: [number, number];
    duration?: number;
    [key: string]: any;
  };
  stats?: {
    valueDistribution?: Record<string, any>;
    missingValues?: Record<string, number>;
    [key: string]: any;
  };
}

// Interface for filtering datasets
export interface DatasetFilterParams {
  search?: string;
  type?: DatasetType | string;
  format?: DatasetFormat | string;
  source?: DatasetSource | string;
  privacy?: DatasetPrivacy | string;
  status?: DatasetStatus | string;
  tags?: string[];
  minSize?: number;
  maxSize?: number;
  sortBy?: 'name' | 'createdAt' | 'updatedAt' | 'size' | 'itemCount';
  sortDirection?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Paginated response interface
export interface PaginatedDatasetResponse {
  data: Dataset[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Function to retrieve datasets with filtering and pagination
export async function getDatasets(
  params: DatasetFilterParams = {}
): Promise<PaginatedDatasetResponse> {
  try {
    if (USE_MOCK_API) {
      return getMockDatasets(params);
    }

    // Build query parameters
    const queryParams = new URLSearchParams();

    if (params.search) queryParams.append('search', params.search);
    if (params.type) queryParams.append('type', params.type);
    if (params.format) queryParams.append('format', params.format);
    if (params.source) queryParams.append('source', params.source);
    if (params.privacy) queryParams.append('privacy', params.privacy);
    if (params.status) queryParams.append('status', params.status);
    if (params.tags && params.tags.length > 0) {
      params.tags.forEach(tag => queryParams.append('tags', tag));
    }
    if (params.minSize !== undefined) queryParams.append('minSize', params.minSize.toString());
    if (params.maxSize !== undefined) queryParams.append('maxSize', params.maxSize.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortDirection) queryParams.append('sortDirection', params.sortDirection);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const endpoint = `/api/v1/datasets${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

    const response = await apiRequest<any>(endpoint, 'GET', undefined, createHeaders());

    // Transform backend response format to match our frontend interface
    return {
      data: response,
      total: response.length || 0,
      page: params.page || 1,
      limit: params.limit || 10,
      totalPages: Math.ceil((response.length || 0) / (params.limit || 10))
    };
  } catch (error) {
    console.error('Error fetching datasets:', error);
    // If API request fails, return mock data as fallback during development
    if (process.env.NODE_ENV === 'development') {
      return getMockDatasets(params);
    }
    throw error;
  }
}

// Function to retrieve a single dataset by ID
export async function getDatasetById(id: string): Promise<Dataset | null> {
  try {
    if (USE_MOCK_API) {
      return getMockDatasetById(id);
    }

    return await apiRequest<Dataset>(`/api/v1/datasets/${id}`, 'GET', undefined, createHeaders());
  } catch (error) {
    console.error(`Error fetching dataset with ID ${id}:`, error);

    // If API request fails, return mock data as fallback during development
    if (process.env.NODE_ENV === 'development') {
      return getMockDatasetById(id);
    }
    throw error;
  }
}

// Function to upload a new dataset
export async function uploadDataset(data: FormData): Promise<Dataset> {
  // This uses a different fetch mechanism for file uploads
  try {
    if (USE_MOCK_API) {
      // Simulate a successful upload with mock data
      await new Promise(resolve => setTimeout(resolve, 1500));
      return getMockDatasets().data[0];
    }

    const authToken = typeof window !== 'undefined' ? localStorage.getItem('AUTH_TOKEN') : null;
    const headers: Record<string, string> = {};

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    // Step 1: Create dataset metadata
    const metadata = JSON.parse(data.get('metadata') as string);
    const createResponse = await apiRequest<Dataset>(
      '/api/v1/datasets',
      'POST',
      metadata,
      createHeaders()
    );

    // Step 2: Upload the file to the dataset
    const datasetId = createResponse.id;

    // Create a new FormData with just the file
    const fileFormData = new FormData();
    const file = data.get('file');
    if (file) {
      fileFormData.append('file', file);
    }

    const uploadResponse = await fetch(`${API_BASE_URL}/api/v1/datasets/${datasetId}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': headers['Authorization']
      },
      body: fileFormData,
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      throw new APIError(
        errorData.message || 'Upload failed',
        uploadResponse.status,
        errorData.details
      );
    }

    // Return the updated dataset
    return await getDatasetById(datasetId) || createResponse;
  } catch (error) {
    console.error('Error uploading dataset:', error);
    throw error;
  }
}

// Function to update dataset metadata
export async function updateDataset(id: string, updates: Partial<Dataset>): Promise<Dataset> {
  try {
    if (USE_MOCK_API) {
      // Simulate a successful update with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        ...getMockDatasetById(id)!,
        ...updates,
        updatedAt: new Date().toISOString()
      };
    }

    return await apiRequest<Dataset>(
      `/api/v1/datasets/${id}`,
      'PATCH',
      updates,
      createHeaders()
    );
  } catch (error) {
    console.error(`Error updating dataset with ID ${id}:`, error);
    throw error;
  }
}

// Function to delete a dataset
export async function deleteDataset(id: string): Promise<{ success: boolean }> {
  try {
    if (USE_MOCK_API) {
      // Simulate a successful deletion
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true };
    }

    await apiRequest<void>(
      `/api/v1/datasets/${id}`,
      'DELETE',
      undefined,
      createHeaders()
    );

    return { success: true };
  } catch (error) {
    console.error(`Error deleting dataset with ID ${id}:`, error);
    throw error;
  }
}

// Mocked implementations for testing and development

// Mock function to get datasets
function getMockDatasets(params: DatasetFilterParams = {}): PaginatedDatasetResponse {
  // Get user context for user-specific data
  const userContext = getUserContext();

  // If no user context or new user, return empty array
  if (!userContext || userContext.userId.startsWith('new-user')) {
    return {
      data: [],
      total: 0,
      page: params.page || 1,
      limit: params.limit || 10,
      totalPages: 0
    };
  }

  // Generate mock datasets
  const mockDatasets: Dataset[] = [
    {
      id: 'dataset-001',
      name: 'Customer Support Dataset',
      description: 'A collection of customer support conversations for training support chatbots',
      type: DatasetType.Text,
      format: DatasetFormat.JSONL,
      source: DatasetSource.Upload,
      size: 1024 * 1024 * 15, // 15MB
      itemCount: 5000,
      privacy: DatasetPrivacy.Private,
      status: DatasetStatus.Ready,
      tags: ['support', 'customer-service', 'chat'],
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      lastUsedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      metadata: {
        schema: {
          fields: ['question', 'answer', 'category']
        },
        hasHeader: true
      }
    },
    {
      id: 'dataset-002',
      name: 'Image Instruction Dataset',
      description: 'A dataset of image descriptions and instructions for training vision models',
      type: DatasetType.Image,
      format: DatasetFormat.JSON,
      source: DatasetSource.CloudStorage,
      size: 1024 * 1024 * 250, // 250MB
      itemCount: 10000,
      privacy: DatasetPrivacy.Private,
      status: DatasetStatus.Ready,
      tags: ['vision', 'image-caption', 'instruction-tuning'],
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      metadata: {
        imageSize: [1024, 1024]
      }
    },
    {
      id: 'dataset-003',
      name: 'Python Code Dataset',
      description: 'A collection of Python code snippets with documentation for training code assistants',
      type: DatasetType.Text,
      format: DatasetFormat.JSONL,
      source: DatasetSource.Upload,
      size: 1024 * 1024 * 45, // 45MB
      itemCount: 25000,
      privacy: DatasetPrivacy.Private,
      status: DatasetStatus.Ready,
      tags: ['code', 'python', 'documentation'],
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      lastUsedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'dataset-004',
      name: 'Financial News Articles',
      description: 'Financial news articles for training models to understand market sentiment',
      type: DatasetType.Text,
      format: DatasetFormat.CSV,
      source: DatasetSource.API,
      size: 1024 * 1024 * 85, // 85MB
      itemCount: 35000,
      privacy: DatasetPrivacy.Restricted,
      status: DatasetStatus.Ready,
      tags: ['finance', 'news', 'sentiment-analysis'],
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'dataset-005',
      name: 'Medical Transcriptions',
      description: 'Anonymized medical transcriptions for healthcare NLP tasks',
      type: DatasetType.Text,
      format: DatasetFormat.TXT,
      source: DatasetSource.Upload,
      size: 1024 * 1024 * 120, // 120MB
      itemCount: 8000,
      privacy: DatasetPrivacy.Private,
      status: DatasetStatus.Ready,
      tags: ['medical', 'healthcare', 'transcription'],
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  // Apply filters (simplified implementation)
  let filtered = [...mockDatasets];

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(d =>
      d.name.toLowerCase().includes(searchLower) ||
      d.description.toLowerCase().includes(searchLower) ||
      d.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  if (params.type) {
    filtered = filtered.filter(d => d.type === params.type);
  }

  if (params.format) {
    filtered = filtered.filter(d => d.format === params.format);
  }

  if (params.source) {
    filtered = filtered.filter(d => d.source === params.source);
  }

  if (params.privacy) {
    filtered = filtered.filter(d => d.privacy === params.privacy);
  }

  if (params.status) {
    filtered = filtered.filter(d => d.status === params.status);
  }

  // Apply sorting
  if (params.sortBy) {
    const direction = params.sortDirection === 'desc' ? -1 : 1;
    filtered.sort((a, b) => {
      switch (params.sortBy) {
        case 'name':
          return direction * a.name.localeCompare(b.name);
        case 'createdAt':
          return direction * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        case 'updatedAt':
          return direction * (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
        case 'size':
          return direction * (a.size - b.size);
        case 'itemCount':
          return direction * (a.itemCount - b.itemCount);
        default:
          return 0;
      }
    });
  }

  // Apply pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedResults = filtered.slice(startIndex, endIndex);

  return {
    data: paginatedResults,
    total: filtered.length,
    page,
    limit,
    totalPages: Math.ceil(filtered.length / limit)
  };
}

// Mock function to get a single dataset by ID
function getMockDatasetById(id: string): Dataset | null {
  // Get all mock datasets
  const { data } = getMockDatasets();

  // Find the dataset with the matching ID
  return data.find(dataset => dataset.id === id) || null;
}

// Function to share a dataset with hubs/teams
export async function shareDataset(
  datasetId: string,
  hubIds: string[],
  accessLevel: string = 'read-only'
): Promise<Dataset> {
  try {
    if (USE_MOCK_API) {
      // Simulate a successful share with mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      const mockDataset = getMockDatasetById(datasetId);
      if (!mockDataset) {
        throw new Error(`Dataset with ID ${datasetId} not found`);
      }

      // Add mock sharing info
      if (!mockDataset.shared_with) {
        mockDataset.shared_with = [];
      }

      // Add new shared hubs or update existing ones
      for (const hubId of hubIds) {
        const existingIndex = mockDataset.shared_with.findIndex(s => s.hubId === hubId);
        if (existingIndex >= 0) {
          mockDataset.shared_with[existingIndex].accessLevel = accessLevel;
        } else {
          mockDataset.shared_with.push({
            hubId,
            hubName: `Hub ${hubId}`,
            accessLevel,
            sharedAt: new Date().toISOString(),
            sharedBy: 'current-user'
          });
        }
      }

      return mockDataset;
    }

    return await apiRequest<Dataset>(
      `/api/v1/datasets/${datasetId}/share`,
      'POST',
      { hub_ids: hubIds, access_level: accessLevel },
      createHeaders()
    );
  } catch (error) {
    console.error(`Error sharing dataset with ID ${datasetId}:`, error);
    throw error;
  }
}

// Function to unshare a dataset from a hub/team
export async function unshareDataset(datasetId: string, hubId: string): Promise<{ success: boolean }> {
  try {
    if (USE_MOCK_API) {
      // Simulate a successful unshare
      await new Promise(resolve => setTimeout(resolve, 600));
      const mockDataset = getMockDatasetById(datasetId);
      if (!mockDataset) {
        throw new Error(`Dataset with ID ${datasetId} not found`);
      }

      // Remove the shared hub
      if (mockDataset.shared_with) {
        mockDataset.shared_with = mockDataset.shared_with.filter(s => s.hubId !== hubId);
      }

      return { success: true };
    }

    await apiRequest<void>(
      `/api/v1/datasets/${datasetId}/share/${hubId}`,
      'DELETE',
      undefined,
      createHeaders()
    );

    return { success: true };
  } catch (error) {
    console.error(`Error unsharing dataset with ID ${datasetId} from hub ${hubId}:`, error);
    throw error;
  }
}