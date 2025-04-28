# Dashboard API

This directory contains the API client for the ArtIntel LLMs dashboard. It provides a unified interface for accessing both real and mock API endpoints.

## Structure

- `index.ts` - Main entry point, exports all API functions and provides real/mock API switching
- `dashboard-api.ts` - Real API implementation that communicates with the backend
- `mock-api.ts` - Mock implementation for development and testing
- `maindash-apis.md` - Detailed API documentation with endpoint specifications

## Usage

### Import and initialize

```typescript
import DashboardAPI, { setAuthToken } from '@/dashboard-api';

// Set authentication token
setAuthToken('your-auth-token');
```

### Toggle between real and mock APIs

```typescript
import { toggleMockApi, isMockMode } from '@/dashboard-api';

// Enable mock API for development/testing
toggleMockApi(true);

// Check if mock mode is enabled
if (isMockMode()) {
  console.log('Using mock API data');
}
```

### Fetch dashboard data

```typescript
import { getSystemStatus, getModelPerformance } from '@/dashboard-api';

// Get system status
const fetchSystemStatus = async () => {
  try {
    const status = await getSystemStatus();
    console.log('System status:', status);
  } catch (error) {
    console.error('Error fetching system status:', error);
  }
};

// Get model performance with filtering
const fetchModelPerformance = async () => {
  try {
    const performance = await getModelPerformance('model-1', 'week');
    console.log('Model performance:', performance);
  } catch (error) {
    console.error('Error fetching model performance:', error);
  }
};
```

### Available API Functions

All API functions return Promises that resolve to typed responses:

- `getSystemStatus()` - Get real-time system status information
- `getResourceUtilization(timeframe?)` - Get resource utilization metrics
- `getModelPerformance(modelId?, timeframe?)` - Get AI model performance metrics
- `getFineTuningProgress(jobId?, status?)` - Get fine-tuning job progress
- `getDeploymentMetrics(timeframe?)` - Get model deployment metrics
- `getTokenUsage(timeframe?, granularity?)` - Get token usage statistics
- `getAlerts(severity?, limit?)` - Get system alerts
- `getActivityFeed(type?, limit?, offset?)` - Get activity feed with pagination
- `getModels(status?, type?)` - Get information about deployed models

### Authentication Functions

- `setAuthToken(token)` - Set the authentication token for API requests
- `clearAuthToken()` - Clear the authentication token

### Mock API Functions

- `toggleMockApi(useMock)` - Enable or disable mock API mode
- `isMockMode()` - Check if mock API mode is currently enabled

## Environment Variables

The API client uses the following environment variables:

- `NEXT_PUBLIC_API_URL` - Base URL for API requests (defaults to 'https://api.artintellms.com/v1')
- `NEXT_PUBLIC_USE_MOCK_API` - Set to 'true' to use mock API by default

## Type Definitions

All response types are exported for use in your application:

```typescript
import type { 
  SystemStatusResponse,
  ModelPerformanceResponse,
  Alert,
  Activity
} from '@/dashboard-api';
```

## Error Handling

All API functions follow a standard error pattern and will throw errors that include the error message from the API response:

```typescript
try {
  const data = await getSystemStatus();
  // Process data...
} catch (error) {
  // Handle error
  console.error('API Error:', error.message);
}
```

## Adding New Endpoints

When adding new endpoints:

1. Add the interface and function to `dashboard-api.ts`
2. Implement a mock version in `mock-api.ts`
3. Export the function in `index.ts` with mock/real switching logic
4. Document the endpoint in `maindash-apis.md` 