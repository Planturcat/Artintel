import { apiService } from './apiService';

interface UserShare {
    userId: string;
    access: 'view' | 'edit';
}

interface ShareResponse {
    success: boolean;
    message?: string;
}

interface UserInfo {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface DatasetSharingInfo {
    shares: { userId: string; email: string; access: string }[];
    isPublic: boolean;
}

// Mock data for team members
const mockTeamMembers: UserInfo[] = [
    { id: '1', name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: '2', name: 'Alex Johnson', email: 'alex.johnson@example.com' },
    { id: '3', name: 'Samuel Lee', email: 'samuel.lee@example.com' },
    { id: '4', name: 'Olivia Williams', email: 'olivia.williams@example.com' },
    { id: '5', name: 'Michael Brown', email: 'michael.brown@example.com' },
];

// Mock data for currently shared datasets
const mockSharedDatasets: Record<string, DatasetSharingInfo> = {
    'dataset-1': {
        shares: [
            { userId: '2', email: 'alex.johnson@example.com', access: 'view' },
            { userId: '3', email: 'samuel.lee@example.com', access: 'edit' },
        ],
        isPublic: false,
    },
    'dataset-2': {
        shares: [],
        isPublic: true,
    },
};

class DatasetSharingService {
    /**
     * Fetch team members who can be shared with
     */
    async getTeamMembers(): Promise<UserInfo[]> {
        try {
            // In a real implementation, this would call an API
            // const response = await apiService.get('/api/team/members');
            // return response.data;
            
            // Using mock data for development
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(mockTeamMembers);
                }, 500);
            });
        } catch (error) {
            console.error('Error fetching team members:', error);
            throw error;
        }
    }

    /**
     * Get the current sharing status of a dataset
     */
    async getDatasetSharing(datasetId: string): Promise<DatasetSharingInfo> {
        try {
            // In a real implementation, this would call an API
            // const response = await apiService.get(`/api/datasets/${datasetId}/sharing`);
            // return response.data;
            
            // Using mock data for development
            return new Promise(resolve => {
                setTimeout(() => {
                    // If we have mock data for this dataset, return it; otherwise, return empty shares
                    const sharingInfo = mockSharedDatasets[datasetId] || {
                        shares: [],
                        isPublic: false,
                    };
                    resolve(sharingInfo);
                }, 500);
            });
        } catch (error) {
            console.error(`Error fetching sharing info for dataset ${datasetId}:`, error);
            throw error;
        }
    }

    /**
     * Share a dataset with one or more users
     */
    async shareDataset(
        datasetId: string, 
        users: UserShare[],
        isPublic: boolean
    ): Promise<ShareResponse> {
        try {
            // In a real implementation, this would call an API
            // const response = await apiService.post(`/api/datasets/${datasetId}/share`, {
            //     users,
            //     isPublic
            // });
            // return response.data;
            
            // Mock implementation
            return new Promise(resolve => {
                setTimeout(() => {
                    // Update our mock data store
                    const userEmails = users.map(user => {
                        const userInfo = mockTeamMembers.find(m => m.id === user.userId);
                        return {
                            userId: user.userId,
                            email: userInfo ? userInfo.email : 'unknown@example.com',
                            access: user.access
                        };
                    });
                    
                    mockSharedDatasets[datasetId] = {
                        shares: userEmails,
                        isPublic,
                    };
                    
                    resolve({ success: true, message: 'Dataset shared successfully' });
                }, 1000);
            });
        } catch (error) {
            console.error(`Error sharing dataset ${datasetId}:`, error);
            throw error;
        }
    }

    /**
     * Remove a user's access to a dataset
     */
    async removeDatasetShare(datasetId: string, userId: string): Promise<ShareResponse> {
        try {
            // In a real implementation, this would call an API
            // const response = await apiService.delete(`/api/datasets/${datasetId}/share/${userId}`);
            // return response.data;
            
            // Mock implementation
            return new Promise(resolve => {
                setTimeout(() => {
                    // If we have this dataset in our mock store, update its shares
                    if (mockSharedDatasets[datasetId]) {
                        mockSharedDatasets[datasetId].shares = mockSharedDatasets[datasetId].shares.filter(
                            share => share.userId !== userId
                        );
                    }
                    
                    resolve({ success: true, message: 'Share removed successfully' });
                }, 500);
            });
        } catch (error) {
            console.error(`Error removing share for dataset ${datasetId} and user ${userId}:`, error);
            throw error;
        }
    }

    /**
     * Get datasets shared with the current user
     */
    async getSharedWithMe(): Promise<string[]> {
        // This would typically check which datasets have been shared with the current user
        // For development, just return some mock dataset IDs
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(['dataset-3', 'dataset-4']);
            }, 500);
        });
    }

    /**
     * Check if a user has access to a specific dataset
     */
    async checkDatasetAccess(datasetId: string): Promise<{ hasAccess: boolean, accessLevel?: 'view' | 'edit' }> {
        try {
            // In a real implementation, this would call an API
            // const response = await apiService.get(`/api/datasets/${datasetId}/access`);
            // return response.data;
            
            // Mock implementation
            return new Promise(resolve => {
                setTimeout(() => {
                    // For simplicity in development, always return true
                    resolve({ hasAccess: true, accessLevel: 'edit' });
                }, 300);
            });
        } catch (error) {
            console.error(`Error checking access for dataset ${datasetId}:`, error);
            throw error;
        }
    }
}

export const datasetSharingService = new DatasetSharingService(); 