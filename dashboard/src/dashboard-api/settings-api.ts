import axios from 'axios';

// Define types for various settings
export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  accentColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  sidebarCompact: boolean;
  showBreadcrumbs: boolean;
  contentWidth: 'default' | 'wide' | 'narrow';
  animationsEnabled: boolean;
}

export interface NotificationSettings {
  emailEnabled: boolean;
  pushEnabled: boolean;
  emailDigestFrequency: 'daily' | 'weekly' | 'never';
  dndEnabled: boolean;
  dndStartTime?: string;
  dndEndTime?: string;
  categories: {
    [key: string]: {
      emailEnabled: boolean;
      pushEnabled: boolean;
    };
  };
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  recoveryCodesViewed: boolean;
  activeSessions: Array<{
    id: string;
    device: string;
    browser: string;
    location: string;
    ip: string;
    lastActive: string;
    isCurrent: boolean;
  }>;
}

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsed: string | null;
  expiration: string | null;
  scopes: string[];
  active: boolean;
}

export interface BillingSettings {
  plan: string;
  billingCycle: 'monthly' | 'yearly';
  autoRenew: boolean;
  paymentMethods: Array<{
    id: string;
    type: string;
    last4: string;
    expiryDate: string;
    isDefault: boolean;
  }>;
}

export interface AccountSettings {
  username: string;
  email: string;
  name: string;
  organization: string;
  timezone: string;
  language: string;
  avatarUrl: string;
}

// API functions for Appearance Settings
export async function getAppearanceSettings(): Promise<AppearanceSettings> {
  try {
    const response = await axios.get('/api/settings/appearance');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch appearance settings:', error);
    throw error;
  }
}

export async function updateAppearanceSettings(settings: Partial<AppearanceSettings>): Promise<AppearanceSettings> {
  try {
    const response = await axios.patch('/api/settings/appearance', settings);
    return response.data;
  } catch (error) {
    console.error('Failed to update appearance settings:', error);
    throw error;
  }
}

// API functions for Notification Settings
export async function getNotificationSettings(): Promise<NotificationSettings> {
  try {
    const response = await axios.get('/api/settings/notifications');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch notification settings:', error);
    throw error;
  }
}

export async function updateNotificationSettings(settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
  try {
    const response = await axios.patch('/api/settings/notifications', settings);
    return response.data;
  } catch (error) {
    console.error('Failed to update notification settings:', error);
    throw error;
  }
}

export async function toggleCategoryNotifications(
  categoryId: string, 
  type: 'email' | 'push', 
  enabled: boolean
): Promise<NotificationSettings> {
  try {
    const response = await axios.patch(`/api/settings/notifications/category/${categoryId}`, {
      type,
      enabled
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to toggle ${type} notifications for category ${categoryId}:`, error);
    throw error;
  }
}

// API functions for Security Settings
export async function changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean }> {
  try {
    const response = await axios.post('/api/settings/security/password', {
      currentPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    console.error('Failed to change password:', error);
    throw error;
  }
}

export async function enableTwoFactor(): Promise<{ secret: string; qrCodeUrl: string }> {
  try {
    const response = await axios.post('/api/settings/security/2fa/enable');
    return response.data;
  } catch (error) {
    console.error('Failed to enable two-factor authentication:', error);
    throw error;
  }
}

export async function verifyTwoFactor(token: string): Promise<{ success: boolean; recoveryCodes?: string[] }> {
  try {
    const response = await axios.post('/api/settings/security/2fa/verify', { token });
    return response.data;
  } catch (error) {
    console.error('Failed to verify two-factor authentication:', error);
    throw error;
  }
}

export async function disableTwoFactor(password: string): Promise<{ success: boolean }> {
  try {
    const response = await axios.post('/api/settings/security/2fa/disable', { password });
    return response.data;
  } catch (error) {
    console.error('Failed to disable two-factor authentication:', error);
    throw error;
  }
}

export async function getActiveSessions(): Promise<SecuritySettings['activeSessions']> {
  try {
    const response = await axios.get('/api/settings/security/sessions');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch active sessions:', error);
    throw error;
  }
}

export async function terminateSession(sessionId: string): Promise<{ success: boolean }> {
  try {
    const response = await axios.delete(`/api/settings/security/sessions/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to terminate session ${sessionId}:`, error);
    throw error;
  }
}

export async function terminateAllSessions(): Promise<{ success: boolean }> {
  try {
    const response = await axios.delete('/api/settings/security/sessions');
    return response.data;
  } catch (error) {
    console.error('Failed to terminate all sessions:', error);
    throw error;
  }
}

// API functions for API Keys
export async function getApiKeys(): Promise<ApiKey[]> {
  try {
    const response = await axios.get('/api/settings/api-keys');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch API keys:', error);
    throw error;
  }
}

export async function createApiKey(
  name: string, 
  scopes: string[], 
  expiration: string | null,
  environment: 'development' | 'production'
): Promise<{ apiKey: ApiKey; secretKey: string }> {
  try {
    const response = await axios.post('/api/settings/api-keys', {
      name,
      scopes,
      expiration,
      environment
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create API key:', error);
    throw error;
  }
}

export async function revokeApiKey(keyId: string): Promise<{ success: boolean }> {
  try {
    const response = await axios.delete(`/api/settings/api-keys/${keyId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to revoke API key ${keyId}:`, error);
    throw error;
  }
}

// API functions for Billing Settings
export async function getBillingSettings(): Promise<BillingSettings> {
  try {
    const response = await axios.get('/api/settings/billing');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch billing settings:', error);
    throw error;
  }
}

export async function updateBillingCycle(cycle: 'monthly' | 'yearly'): Promise<BillingSettings> {
  try {
    const response = await axios.patch('/api/settings/billing/cycle', { cycle });
    return response.data;
  } catch (error) {
    console.error(`Failed to update billing cycle to ${cycle}:`, error);
    throw error;
  }
}

export async function changePlan(planId: string): Promise<BillingSettings> {
  try {
    const response = await axios.post('/api/settings/billing/plan', { planId });
    return response.data;
  } catch (error) {
    console.error(`Failed to change plan to ${planId}:`, error);
    throw error;
  }
}

export async function addPaymentMethod(paymentMethodId: string): Promise<BillingSettings> {
  try {
    const response = await axios.post('/api/settings/billing/payment-methods', { paymentMethodId });
    return response.data;
  } catch (error) {
    console.error('Failed to add payment method:', error);
    throw error;
  }
}

export async function removePaymentMethod(paymentMethodId: string): Promise<BillingSettings> {
  try {
    const response = await axios.delete(`/api/settings/billing/payment-methods/${paymentMethodId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to remove payment method ${paymentMethodId}:`, error);
    throw error;
  }
}

export async function setDefaultPaymentMethod(paymentMethodId: string): Promise<BillingSettings> {
  try {
    const response = await axios.patch(`/api/settings/billing/payment-methods/${paymentMethodId}/default`);
    return response.data;
  } catch (error) {
    console.error(`Failed to set payment method ${paymentMethodId} as default:`, error);
    throw error;
  }
}

// API functions for Account Settings
export async function getAccountSettings(): Promise<AccountSettings> {
  try {
    const response = await axios.get('/api/settings/account');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch account settings:', error);
    throw error;
  }
}

export async function updateAccountSettings(settings: Partial<AccountSettings>): Promise<AccountSettings> {
  try {
    const response = await axios.patch('/api/settings/account', settings);
    return response.data;
  } catch (error) {
    console.error('Failed to update account settings:', error);
    throw error;
  }
}

export async function updateAccountEmail(email: string, password: string): Promise<{ success: boolean }> {
  try {
    const response = await axios.post('/api/settings/account/email', { email, password });
    return response.data;
  } catch (error) {
    console.error('Failed to update account email:', error);
    throw error;
  }
}

export async function uploadProfileImage(file: File): Promise<{ avatarUrl: string }> {
  try {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await axios.post('/api/settings/account/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Failed to upload profile image:', error);
    throw error;
  }
}

export async function deleteAccount(password: string): Promise<{ success: boolean }> {
  try {
    const response = await axios.post('/api/settings/account/delete', { password });
    return response.data;
  } catch (error) {
    console.error('Failed to delete account:', error);
    throw error;
  }
} 