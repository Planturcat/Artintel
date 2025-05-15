/**
 * Team API Module
 * 
 * This module provides interfaces and functions for managing team members,
 * roles, and permissions within the platform.
 */

// Team Member Status
export type TeamMemberStatus = 'active' | 'pending' | 'inactive';

// Role types
export type TeamRole = 'admin' | 'manager' | 'developer' | 'viewer' | 'analyst';

// Department types
export type Department = 'Engineering' | 'Product' | 'Design' | 'Marketing' | 'Sales' | 'Support' | 'Operations' | 'Executive';

// Team Member interface
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  department: Department;
  joinDate: string;
  status: TeamMemberStatus;
  avatar: string;
  permissions?: string[];
  lastActive?: string;
  bio?: string;
  phoneNumber?: string;
  location?: string;
  timezone?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

// Team invitation interface
export interface TeamInvitation {
  id: string;
  email: string;
  role: TeamRole;
  department: Department;
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
}

// Team activity interface
export interface TeamActivity {
  id: string;
  teamMemberId: string;
  action: 'login' | 'model_create' | 'model_deploy' | 'dataset_upload' | 'settings_change' | 'api_key_create';
  timestamp: string;
  details?: Record<string, any>;
}

// Permission interface
export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'models' | 'datasets' | 'deployments' | 'billing' | 'settings' | 'team';
}

// Sample team members data
const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@artintellm.com',
    role: 'admin',
    department: 'Engineering',
    joinDate: '2022-09-15',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=alex.johnson@artintellm.com',
    lastActive: new Date().toISOString(),
    location: 'San Francisco, CA',
    timezone: 'America/Los_Angeles'
  },
  {
    id: '2',
    name: 'Jamie Smith',
    email: 'jamie.smith@artintellm.com',
    role: 'manager',
    department: 'Product',
    joinDate: '2022-10-03',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=jamie.smith@artintellm.com',
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    location: 'New York, NY',
    timezone: 'America/New_York'
  },
  {
    id: '3',
    name: 'Sam Rodriguez',
    email: 'sam.rodriguez@artintellm.com',
    role: 'developer',
    department: 'Engineering',
    joinDate: '2023-01-10',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=sam.rodriguez@artintellm.com',
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    location: 'Austin, TX',
    timezone: 'America/Chicago'
  },
  {
    id: '4',
    name: 'Taylor Kim',
    email: 'taylor.kim@artintellm.com',
    role: 'designer',
    department: 'Design',
    joinDate: '2023-03-15',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=taylor.kim@artintellm.com',
    lastActive: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    location: 'Seattle, WA',
    timezone: 'America/Los_Angeles'
  },
  {
    id: '5',
    name: 'Jordan Lee',
    email: 'jordan.lee@artintellm.com',
    role: 'analyst',
    department: 'Marketing',
    joinDate: '2023-02-21',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=jordan.lee@artintellm.com',
    lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Chicago, IL',
    timezone: 'America/Chicago'
  },
  {
    id: '6',
    name: 'Casey Morgan',
    email: 'casey.morgan@artintellm.com',
    role: 'viewer',
    department: 'Sales',
    joinDate: '2023-04-05',
    status: 'pending',
    avatar: 'https://i.pravatar.cc/150?u=casey.morgan@artintellm.com',
    location: 'Denver, CO',
    timezone: 'America/Denver'
  },
  {
    id: '7',
    name: 'Riley Parker',
    email: 'riley.parker@artintellm.com',
    role: 'developer',
    department: 'Engineering',
    joinDate: '2023-03-30',
    status: 'inactive',
    avatar: 'https://i.pravatar.cc/150?u=riley.parker@artintellm.com',
    lastActive: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Portland, OR',
    timezone: 'America/Los_Angeles'
  }
];

// Sample invitations
const mockInvitations: TeamInvitation[] = [
  {
    id: 'inv-001',
    email: 'new.member@example.com',
    role: 'developer',
    department: 'Engineering',
    invitedBy: '1',
    invitedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending'
  },
  {
    id: 'inv-002',
    email: 'another.invite@example.com',
    role: 'analyst',
    department: 'Product',
    invitedBy: '1',
    invitedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending'
  }
];

// Sample permissions
const mockPermissions: Permission[] = [
  { id: 'perm-001', name: 'models:read', description: 'View AI models', category: 'models' },
  { id: 'perm-002', name: 'models:create', description: 'Create new AI models', category: 'models' },
  { id: 'perm-003', name: 'models:deploy', description: 'Deploy AI models to production', category: 'models' },
  { id: 'perm-004', name: 'datasets:read', description: 'View datasets', category: 'datasets' },
  { id: 'perm-005', name: 'datasets:create', description: 'Upload and create datasets', category: 'datasets' },
  { id: 'perm-006', name: 'billing:view', description: 'View billing information', category: 'billing' },
  { id: 'perm-007', name: 'billing:manage', description: 'Manage payment methods and subscriptions', category: 'billing' },
  { id: 'perm-008', name: 'team:invite', description: 'Invite new team members', category: 'team' },
  { id: 'perm-009', name: 'team:manage', description: 'Manage team members and roles', category: 'team' }
];

// Role to permissions mapping
const rolePermissions: Record<TeamRole, string[]> = {
  admin: mockPermissions.map(p => p.id),
  manager: ['perm-001', 'perm-002', 'perm-003', 'perm-004', 'perm-005', 'perm-006', 'perm-008'],
  developer: ['perm-001', 'perm-002', 'perm-004', 'perm-005'],
  analyst: ['perm-001', 'perm-004'],
  viewer: ['perm-001', 'perm-004']
};

/**
 * Team API
 */
export const teamApi = {
  /**
   * Get all team members
   */
  getTeamMembers: async (): Promise<TeamMember[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return [...mockTeamMembers];
  },

  /**
   * Get a team member by ID
   */
  getTeamMember: async (id: string): Promise<TeamMember | null> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    const member = mockTeamMembers.find(m => m.id === id);
    return member ? { ...member } : null;
  },

  /**
   * Add a new team member
   */
  addTeamMember: async (member: Omit<TeamMember, 'id' | 'joinDate'>): Promise<TeamMember> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newMember: TeamMember = {
      ...member,
      id: `${mockTeamMembers.length + 1}`,
      joinDate: new Date().toISOString(),
      avatar: `https://i.pravatar.cc/150?u=${member.email}`
    };
    
    mockTeamMembers.push(newMember);
    return { ...newMember };
  },

  /**
   * Update a team member
   */
  updateTeamMember: async (id: string, updates: Partial<TeamMember>): Promise<TeamMember | null> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const index = mockTeamMembers.findIndex(m => m.id === id);
    if (index === -1) return null;
    
    const updatedMember = {
      ...mockTeamMembers[index],
      ...updates
    };
    
    mockTeamMembers[index] = updatedMember;
    return { ...updatedMember };
  },

  /**
   * Delete a team member
   */
  removeTeamMember: async (id: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const index = mockTeamMembers.findIndex(m => m.id === id);
    if (index === -1) return false;
    
    mockTeamMembers.splice(index, 1);
    return true;
  },

  /**
   * Get pending invitations
   */
  getInvitations: async (): Promise<TeamInvitation[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    return [...mockInvitations];
  },

  /**
   * Send an invitation
   */
  sendInvitation: async (invitation: Omit<TeamInvitation, 'id' | 'invitedAt' | 'expiresAt' | 'status'>): Promise<TeamInvitation> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newInvitation: TeamInvitation = {
      ...invitation,
      id: `inv-${mockInvitations.length + 3}`,
      invitedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending'
    };
    
    mockInvitations.push(newInvitation);
    return { ...newInvitation };
  },

  /**
   * Cancel an invitation
   */
  cancelInvitation: async (id: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const index = mockInvitations.findIndex(i => i.id === id);
    if (index === -1) return false;
    
    mockInvitations.splice(index, 1);
    return true;
  },

  /**
   * Get available permissions
   */
  getPermissions: async (): Promise<Permission[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockPermissions];
  },

  /**
   * Get permissions for a role
   */
  getRolePermissions: async (role: TeamRole): Promise<string[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 400));
    return rolePermissions[role] || [];
  }
};

/**
 * TypeScript API client for the Artintel Team Management
 * This file provides interfaces and functions for interacting with the teams API
 */

import { apiRequest, API_BASE_URL, USE_MOCK_API, APIError } from './dashboard-api';
import { createHeaders } from './config';

export interface Team {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  role: 'admin' | 'member' | 'owner';
  createdAt: string;
  updatedAt: string;
}

// Function to get available teams/hubs for the current user
export async function getHubs(): Promise<Team[]> {
  try {
    if (USE_MOCK_API) {
      // Return mock teams for development
      await new Promise(resolve => setTimeout(resolve, 500));
      return [
        {
          id: 'hub-001',
          name: 'Engineering Team',
          description: 'Core engineering and development team',
          memberCount: 12,
          role: 'admin',
          createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'hub-002',
          name: 'Data Science',
          description: 'AI and machine learning specialists',
          memberCount: 8,
          role: 'member',
          createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'hub-003',
          name: 'Product Team',
          description: 'Product management and design',
          memberCount: 6,
          role: 'owner',
          createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
    }
    
    return await apiRequest<Team[]>('/api/v1/teams', 'GET', undefined, createHeaders());
  } catch (error) {
    console.error('Error fetching hubs/teams:', error);
    throw error;
  }
}

// Function to get team/hub details
export async function getHubDetails(hubId: string): Promise<Team> {
  try {
    if (USE_MOCK_API) {
      // Return mock team details for development
      await new Promise(resolve => setTimeout(resolve, 300));
      const mockTeams = await getHubs();
      const team = mockTeams.find(t => t.id === hubId);
      if (!team) {
        throw new Error(`Team with ID ${hubId} not found`);
      }
      return team;
    }
    
    return await apiRequest<Team>(`/api/v1/teams/${hubId}`, 'GET', undefined, createHeaders());
  } catch (error) {
    console.error(`Error fetching hub/team details for ID ${hubId}:`, error);
    throw error;
  }
} 