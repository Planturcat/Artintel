import { CloudStorageConfig, DatabaseConfig, Dataset } from '@/types/dataset';

// Add new interfaces for content fetch and statistics
export interface DatasetContentResponse {
  content: string;
  totalSize: number;
  hasMore: boolean;
  nextCursor?: string;
}

export interface DatasetStatistics {
  totalRows?: number;
  totalColumns?: number;
  columnTypes?: Record<string, string>;
  missingValues?: Record<string, number>;
  valueDistribution?: Record<string, any>;
  sampleData?: any[];
}

export interface DatasetUploadResponse {
  id: string;
  name: string;
  success: boolean;
  message?: string;
}

// For file and folder selection in cloud storage
export interface CloudBrowseResponse {
  files: CloudItem[];
  folders: CloudItem[];
  path: string;
  parentPath?: string;
}

export interface CloudItem {
  name: string;
  path: string;
  type: 'file' | 'folder';
  size?: number;
  lastModified?: string;
}

// For user authentication
export interface AuthContext {
  token?: string;
  userId?: string;
}

// Export cloud storage and database config interfaces
export interface CloudStorageConfig {
  provider: string;
  bucket: string;
  region?: string;
  credentials: any;
  path?: string;
}

export interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  query?: string;
  table?: string;
}

class DatasetService {
  private static instance: DatasetService;
  private baseUrl: string;
  private authContext: AuthContext = {};
  private _mockDatasets: Dataset[] = [
    {
      id: '1',
      name: 'Training Dataset 2023',
      description: 'Main training dataset for language models',
      type: 'Training',
      size: 1024 * 1024 * 500, // 500MB
      format: 'CSV',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      tags: ['training', 'language', '2023'],
      source: 'local',
      status: 'ready',
      ownerId: '123' // User ID ownership
    },
    {
      id: '2',
      name: 'Validation Data Q4',
      description: 'Quarterly validation dataset for model evaluation',
      type: 'Validation',
      size: 1024 * 1024 * 200, // 200MB
      format: 'JSON',
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      lastModified: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      tags: ['validation', 'quarterly'],
      source: 'cloud',
      status: 'ready',
      ownerId: '123' // User ID ownership
    },
    {
      id: '3',
      name: 'Test Dataset Beta',
      description: 'Beta testing dataset for new model features',
      type: 'Testing',
      size: 1024 * 1024 * 100, // 100MB
      format: 'CSV',
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ['testing', 'beta'],
      source: 'database',
      status: 'processing',
      ownerId: '456' // Different user ownership
    }
  ];

  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  }

  public static getInstance(): DatasetService {
    if (!DatasetService.instance) {
      DatasetService.instance = new DatasetService();
    }
    return DatasetService.instance;
  }

  // Set authentication context
  public setAuthContext(context: AuthContext) {
    this.authContext = context;
  }

  // Create headers with authentication
  private getHeaders(contentType = 'application/json') {
    const headers: Record<string, string> = {
      'Content-Type': contentType,
    };
    
    if (this.authContext.token) {
      headers['Authorization'] = `Bearer ${this.authContext.token}`;
    }
    
    return headers;
  }

  // Cloud Storage Methods
  async connectCloudStorage(config: CloudStorageConfig): Promise<Dataset> {
    try {
      const response = await fetch(`${this.baseUrl}/datasets/cloud/connect`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to connect to cloud storage');
      }

      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to connect to cloud storage');
    }
  }

  // Browse cloud storage
  async browseCloudStorage(
    provider: string,
    credentials: any,
    path: string = '/'
  ): Promise<CloudBrowseResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/datasets/cloud/browse`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          provider,
          credentials,
          path
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to browse cloud storage');
      }

      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to browse cloud storage');
    }
  }

  // Database Methods
  async connectDatabase(config: DatabaseConfig): Promise<Dataset> {
    try {
      const response = await fetch(`${this.baseUrl}/datasets/database/connect`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to connect to database');
      }

      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to connect to database');
    }
  }

  // Database query testing
  async testDatabaseQuery(connectionId: string, query: string): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/datasets/database/${connectionId}/test-query`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ query }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to execute database query');
      }

      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to execute database query');
    }
  }

  // File upload
  async uploadFiles(files: File[], metadata: any): Promise<DatasetUploadResponse[]> {
    try {
      const formData = new FormData();
      
      // Append each file
      files.forEach(file => {
        formData.append('files', file);
      });
      
      // Append metadata as JSON
      formData.append('metadata', JSON.stringify(metadata));
      
      const response = await fetch(`${this.baseUrl}/datasets/upload`, {
        method: 'POST',
        headers: {
          // Don't set content-type with FormData
          // Browser will set it with boundary
          ...(this.authContext.token ? { 'Authorization': `Bearer ${this.authContext.token}` } : {})
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload files');
      }

      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to upload files');
    }
  }

  // Dataset Methods
  async listDatasets(filters?: any): Promise<Dataset[]> {
    try {
      if (process.env.NODE_ENV === 'development') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter datasets based on filters
        let datasets = [...this._mockDatasets];
        
        if (filters) {
          if (filters.source) {
            datasets = datasets.filter(d => d.source === filters.source);
          }
          if (filters.format) {
            datasets = datasets.filter(d => d.format.toLowerCase() === filters.format.toLowerCase());
          }
          if (filters.status) {
            datasets = datasets.filter(d => d.status === filters.status);
          }
          if (filters.search) {
            const search = filters.search.toLowerCase();
            datasets = datasets.filter(d => 
              d.name.toLowerCase().includes(search) ||
              d.description.toLowerCase().includes(search) ||
              d.tags.some((tag: string) => tag.toLowerCase().includes(search))
            );
          }
          // Filter by user ID if provided
          if (filters.userId) {
            datasets = datasets.filter(d => d.ownerId === filters.userId);
          }
        }
        
        return datasets;
      } else {
        // Build query string from filters
        const queryParams = new URLSearchParams();
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              queryParams.append(key, String(value));
            }
          });
        }
        
        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
        const response = await fetch(`${this.baseUrl}/datasets${queryString}`, {
          headers: this.getHeaders(),
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to fetch datasets');
        }

        return response.json();
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch datasets');
    }
  }

  async getDataset(id: string): Promise<Dataset> {
    try {
      const response = await fetch(`${this.baseUrl}/datasets/${id}`, {
        headers: this.getHeaders(),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch dataset');
      }

      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch dataset');
    }
  }

  async deleteDataset(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/datasets/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete dataset');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete dataset');
    }
  }

  async downloadDataset(id: string): Promise<Blob> {
    try {
      const response = await fetch(`${this.baseUrl}/datasets/${id}/download`, {
        headers: {
          ...(this.authContext.token ? { 'Authorization': `Bearer ${this.authContext.token}` } : {})
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to download dataset');
      }

      return response.blob();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to download dataset');
    }
  }

  async updateDatasetMetadata(id: string, metadata: Partial<Dataset>): Promise<Dataset> {
    try {
      const response = await fetch(`${this.baseUrl}/datasets/${id}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(metadata),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update dataset metadata');
      }

      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update dataset metadata');
    }
  }

  // Enhanced methods for file viewing with pagination
  async getDatasetContent(id: string, offset: number = 0, limit: number = 10000): Promise<DatasetContentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/datasets/${id}/content?offset=${offset}&limit=${limit}`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch dataset content');
      }

      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch dataset content');
    }
  }

  async updateDatasetContent(id: string, content: string, format?: string): Promise<void> {
    try {
      const contentType = format === 'json' ? 'application/json' : 'text/plain';
      
      const response = await fetch(`${this.baseUrl}/datasets/${id}/content`, {
        method: 'PUT',
        headers: this.getHeaders(contentType),
        body: format === 'json' ? JSON.stringify({ content }) : content,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update dataset content');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update dataset content');
    }
  }

  async getDatasetStatistics(id: string): Promise<DatasetStatistics> {
    try {
      const response = await fetch(`${this.baseUrl}/datasets/${id}/statistics`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch dataset statistics');
      }

      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch dataset statistics');
    }
  }

  async getRandomSamples(id: string, count: number = 10): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/datasets/${id}/samples?count=${count}`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch random samples');
      }

      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch random samples');
    }
  }

  // Share dataset with other users
  async shareDataset(id: string, users: string[], permission: 'view' | 'edit'): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/datasets/${id}/share`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ users, permission }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to share dataset');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to share dataset');
    }
  }

  // Version control methods
  async createDatasetVersion(id: string, versionName: string, notes?: string): Promise<Dataset> {
    try {
      const response = await fetch(`${this.baseUrl}/datasets/${id}/versions`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ name: versionName, notes }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create dataset version');
      }

      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create dataset version');
    }
  }

  async getDatasetVersions(id: string): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/datasets/${id}/versions`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch dataset versions');
      }

      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch dataset versions');
    }
  }

  async switchToVersion(id: string, versionId: string): Promise<Dataset> {
    try {
      const response = await fetch(`${this.baseUrl}/datasets/${id}/versions/${versionId}/switch`, {
        method: 'POST',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to switch dataset version');
      }

      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to switch dataset version');
    }
  }

  // Mock methods for development (remove in production)
  async mockConnectCloudStorage(config: CloudStorageConfig): Promise<Dataset> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      id: Math.random().toString(36).substr(2, 9),
      name: `Cloud Dataset - ${config.bucket}`,
      description: `Dataset from ${config.provider} cloud storage`,
      type: 'Cloud Storage',
      size: 1024 * 1024 * 1024, // 1GB
      format: 'Various',
      lastModified: new Date().toISOString(),
      tags: [config.provider, 'cloud', config.bucket],
      source: 'cloud',
      status: 'processing',
      config
    };
  }

  async mockConnectDatabase(config: DatabaseConfig): Promise<Dataset> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      id: Math.random().toString(36).substr(2, 9),
      name: `Database - ${config.database}`,
      description: `Dataset from ${config.type} database`,
      type: 'Database',
      size: 1024 * 1024 * 512, // 512MB
      format: config.type,
      lastModified: new Date().toISOString(),
      tags: [config.type, 'database'],
      source: 'database',
      status: 'processing',
      config
    };
  }

  // Mock file upload for development
  async mockUploadFiles(files: File[], metadata: any): Promise<DatasetUploadResponse[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Read the actual file content and store it
    const fileContents: Record<string, string> = {};
    
    for (const file of files) {
      try {
        const content = await this.readFileContent(file);
        fileContents[file.name] = content;
      } catch (error) {
        console.error(`Error reading file ${file.name}:`, error);
      }
    }
    
    // Create response objects
    const responses = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      success: true,
      message: 'File uploaded successfully'
    }));

    // Add the new datasets to a mock database or state
    const newDatasets = responses.map(response => {
      const file = files.find(f => f.name === response.name);
      const fileExtension = response.name.split('.').pop()?.toLowerCase() || '';
      
      return {
        id: response.id,
        name: response.name,
        description: metadata.description || '',
        type: 'Training',
        size: file?.size || 0,
        format: fileExtension,
        tags: metadata.tags || [],
        source: 'local',
        status: 'ready',
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        ownerId: this.authContext.userId || '123',
        itemCount: 0,
        content: fileContents[response.name] || '' // Store the actual file content
      };
    });

    // In a real implementation, we would save these datasets to a database
    this._mockDatasets = [...newDatasets, ...(this._mockDatasets || [])];
    
    return responses;
  }

  // Helper method to read file content
  private async readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          resolve(event.target.result);
        } else if (event.target && event.target.result instanceof ArrayBuffer) {
          // For binary files, convert to base64
          const binary = new Uint8Array(event.target.result);
          let binaryString = '';
          for (let i = 0; i < binary.length; i++) {
            binaryString += String.fromCharCode(binary[i]);
          }
          resolve(btoa(binaryString));
        } else {
          reject(new Error('Failed to read file content'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      if (file.type.startsWith('image/')) {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file);
      }
    });
  }

  // Enhanced mock methods for development
  async mockGetDatasetContent(id: string, offset: number = 0, limit: number = 10000): Promise<DatasetContentResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const dataset = this.mockGetDatasetById(id);
    if (!dataset) throw new Error('Dataset not found');
    
    // If we have stored the actual content, use it
    if (dataset.content) {
      return {
        content: dataset.content,
        totalSize: dataset.content.length,
        hasMore: false
      };
    }
    
    // Otherwise, generate mock content based on the file format
    let content = '';
    let totalSize = 0;
    
    if (dataset.format.toLowerCase() === 'csv') {
      // Generate mock CSV data
      content = 'id,name,age,email,occupation,salary\n';
      for (let i = offset; i < offset + limit && i < 1000; i++) {
        content += `${i},Person ${i},${20 + (i % 50)},person${i}@example.com,${['Developer', 'Designer', 'Manager', 'Analyst'][i % 4]},${50000 + (i * 1000)}\n`;
      }
      totalSize = 1000; // Total rows
      } else if (dataset.format.toLowerCase() === 'json') {
      // Generate mock JSON data
      const items = [];
      for (let i = offset; i < offset + limit && i < 500; i++) {
        items.push({
          id: i,
          name: `Item ${i}`,
          properties: {
            value: i * 10,
            active: i % 3 === 0,
            category: ['A', 'B', 'C', 'D'][i % 4]
          },
          tags: [`tag-${i % 5}`, `tag-${(i + 2) % 7}`]
        });
      }
      content = JSON.stringify(items, null, 2);
      totalSize = 500; // Total items
    } else if (dataset.format.toLowerCase() === 'txt') {
      // Generate mock text data
      content = '';
      for (let i = offset; i < offset + limit && i < 2000; i++) {
        content += `Line ${i}: This is sample text data for line ${i}.\n`;
      }
      totalSize = 2000; // Total lines
    }
    
    return {
      content,
      totalSize,
      hasMore: offset + limit < totalSize
    };
  }
  
  async mockUpdateDatasetContent(id: string, content: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validate content based on dataset type
    const dataset = this.mockGetDatasetById(id);
    if (!dataset) throw new Error('Dataset not found');
    
    if (dataset.format.toLowerCase() === 'json') {
      try {
      JSON.parse(content);
    } catch (error) {
      throw new Error('Invalid JSON format');
    }
    }
    
    // In a real implementation, this would update the content
    console.log(`Mock update dataset ${id} content`);
  }
  
  async mockGetDatasetStatistics(id: string): Promise<DatasetStatistics> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const dataset = this.mockGetDatasetById(id);
    if (!dataset) throw new Error('Dataset not found');
    
    if (dataset.format.toLowerCase() === 'csv') {
      return {
        totalRows: 1000,
        totalColumns: 6,
        columnTypes: {
          'id': 'integer',
          'name': 'string',
          'age': 'integer',
          'email': 'string',
          'occupation': 'string',
          'salary': 'float'
        },
        missingValues: {
          'id': 0,
          'name': 2,
          'age': 5,
          'email': 1,
          'occupation': 8,
          'salary': 3
        },
        valueDistribution: {
          'occupation': {
            'Developer': 250,
            'Designer': 250,
            'Manager': 250,
            'Analyst': 250
          },
          'age': {
            '20-30': 300,
            '31-40': 350,
            '41-50': 200,
            '51-70': 150
          }
        },
        sampleData: [
          { id: 1, name: 'Person 1', age: 21, email: 'person1@example.com', occupation: 'Developer', salary: 51000 },
          { id: 2, name: 'Person 2', age: 22, email: 'person2@example.com', occupation: 'Designer', salary: 52000 },
          { id: 3, name: 'Person 3', age: 23, email: 'person3@example.com', occupation: 'Manager', salary: 53000 }
        ]
      };
    } else if (dataset.format.toLowerCase() === 'json') {
      return {
        totalRows: 500,
        valueDistribution: {
          'properties.category': {
            'A': 125,
            'B': 125,
            'C': 125,
            'D': 125
          },
          'properties.active': {
            'true': 167,
            'false': 333
          }
        },
        sampleData: [
          { id: 1, name: 'Item 1', properties: { value: 10, active: false, category: 'B' }, tags: ['tag-1', 'tag-3'] },
          { id: 2, name: 'Item 2', properties: { value: 20, active: false, category: 'C' }, tags: ['tag-2', 'tag-4'] },
          { id: 3, name: 'Item 3', properties: { value: 30, active: true, category: 'D' }, tags: ['tag-3', 'tag-5'] }
        ]
      };
    } else {
      return {
        totalRows: 2000,
        sampleData: [
          'Line 1: This is sample text data for line 1.',
          'Line 2: This is sample text data for line 2.',
          'Line 3: This is sample text data for line 3.'
        ]
      };
    }
  }
  
  async mockGetRandomSamples(id: string, count: number = 10): Promise<any[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const dataset = this.mockGetDatasetById(id);
    if (!dataset) throw new Error('Dataset not found');
    
    if (dataset.format.toLowerCase() === 'csv') {
      const samples = [];
      for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * 1000);
        samples.push({
          id: index,
          name: `Person ${index}`,
          age: 20 + (index % 50),
          email: `person${index}@example.com`,
          occupation: ['Developer', 'Designer', 'Manager', 'Analyst'][index % 4],
          salary: 50000 + (index * 1000)
        });
      }
      return samples;
    } else if (dataset.format.toLowerCase() === 'json') {
      const samples = [];
      for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * 500);
        samples.push({
          id: index,
          name: `Item ${index}`,
          properties: {
            value: index * 10,
            active: index % 3 === 0,
            category: ['A', 'B', 'C', 'D'][index % 4]
          },
          tags: [`tag-${index % 5}`, `tag-${(index + 2) % 7}`]
        });
      }
      return samples;
    } else {
      const samples = [];
      for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * 2000);
        samples.push(`Line ${index}: This is sample text data for line ${index}.`);
      }
      return samples;
    }
  }
  
  async mockShareDataset(id: string, users: string[], permission: 'view' | 'edit'): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real implementation, this would update the sharing settings
    console.log(`Mock share dataset ${id} with users ${users.join(', ')} with ${permission} permission`);
  }
  
  async mockCreateDatasetVersion(id: string, versionName: string): Promise<Dataset> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const dataset = this.mockGetDatasetById(id);
    if (!dataset) throw new Error('Dataset not found');
    
    // In a real implementation, this would create a new version
    return {
      ...dataset,
      id: Math.random().toString(36).substr(2, 9),
      name: `${dataset.name} (${versionName})`,
      version: versionName,
      parent: id
    };
  }
  
  private mockGetDatasetById(id: string): Dataset | null {
    return this._mockDatasets.find(d => d.id === id) || null;
  }
}

export const datasetService = DatasetService.getInstance(); 