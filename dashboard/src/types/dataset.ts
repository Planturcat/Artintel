export interface Dataset {
  id: string;
  name: string;
  description: string;
  type: string;
  size: number;
  format: string;
  tags: string[];
  source: 'local' | 'cloud' | 'api' | 'database' | string;
  status: 'ready' | 'processing' | 'error' | string;
  updatedAt: string;
  createdAt: string;
  itemCount?: number;
  privacy?: string;
  lastUsedAt?: string;
  owner?: {
    id: string;
    name: string;
    email: string;
  };
  ownerId?: string;
  lastModified?: string;
  sharedWith?: {
    userId: string;
    email: string;
    access: 'view' | 'edit';
  }[];
  isPublic?: boolean;
  version?: string;
  versionName?: string;
  parent?: string;
  versions?: {
    id: string;
    name: string;
    createdAt: string;
    notes?: string;
  }[];
  config?: any;
  content?: string;
} 