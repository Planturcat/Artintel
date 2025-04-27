# Mash AI Agent Platform

A comprehensive platform for managing AI workflows, including dataset management, model fine-tuning, deployment, and UI generation. The platform provides an end-to-end solution for working with AI models, from data preparation to deployment and integration.

## Key Features

### Dataset Management
- Upload, view, and manage training datasets
- Support for CSV and JSON formats
- Dataset details and statistics
- Secure deletion and management

### Model Fine-Tuning
- Create and monitor fine-tuning jobs
- Select datasets and base models
- Real-time progress tracking
- Job management and cancellation

### Model Deployment
- Deploy fine-tuned models
- Manage model endpoints
- Monitor deployment metrics
- Get API endpoints for inference

### UI Generator
- Create UI components that connect to deployed models
- Generate React components with TailwindCSS
- Support for various AI-specific component types
- Integration with backend API services

## Architecture

The platform consists of:

1. **Frontend**: React/Next.js application with a modern UI built using TailwindCSS
2. **Backend API**: RESTful API for dataset management, fine-tuning, and model deployment
3. **AI Service**: Local or cloud-based AI service for model inference
4. **Reasoning Engine**: Analyzes user requests and provides intelligent responses
5. **Task Manager**: Coordinates API calls and manages complex workflows

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Backend API service running (see Backend Setup)
- AI service for local inference (optional)

### Installation
1. Clone this repository
2. Install dependencies: `npm install`
3. Set up environment variables:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:11434
```
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Usage

#### Using the Dashboard
1. Navigate to the dashboard at `/dashboard`
2. Switch between tabs to access different features:
   - Datasets: Manage your training data
   - Fine-Tuning: Create and monitor training jobs
   - Deployments: Deploy and manage model endpoints
   - UI Generator: Create UI components

#### Using the Dataset Manager
1. Upload datasets in CSV or JSON format
2. View dataset details and statistics
3. Manage existing datasets

#### Using the Fine-Tuning Manager
1. Select a dataset and base model
2. Configure training parameters
3. Start a fine-tuning job
4. Monitor progress in real-time

#### Using the Model Deployment Manager
1. Select a completed fine-tuning job
2. Configure deployment settings
3. Deploy the model
4. Get API endpoints for inference

#### Using the UI Generator
1. Describe the UI component you need
2. Specify integration with deployed models
3. Click "Generate UI Component"
4. Review and use the generated code

## Backend Setup

The platform requires a backend API service for dataset management, fine-tuning, and model deployment. The backend API should provide the following endpoints:

### Dataset Endpoints
- `GET /api/v1/datasets`: List all datasets
- `POST /api/v1/datasets/upload`: Upload a new dataset
- `GET /api/v1/datasets/{dataset_id}`: Get dataset details
- `DELETE /api/v1/datasets/{dataset_id}`: Delete a dataset

### Fine-Tuning Endpoints
- `GET /api/v1/finetune`: List all fine-tuning jobs
- `POST /api/v1/finetune`: Create a new fine-tuning job
- `GET /api/v1/finetune/{job_id}`: Get job details
- `DELETE /api/v1/finetune/{job_id}`: Cancel a job

### Model Deployment Endpoints
- `GET /api/v1/models/deployments`: List all deployed models
- `POST /api/v1/models/deploy`: Deploy a fine-tuned model
- `GET /api/v1/models/deployments/{deployment_id}`: Get deployment details
- `DELETE /api/v1/models/deployments/{deployment_id}`: Undeploy a model

### Inference Endpoints
- `GET /api/v1/inference/available-deployments`: List available deployments
- `POST /api/v1/inference/completions`: Generate text with a deployed model

## AI Service Setup

The platform can connect to a local or cloud-based AI service for model inference. By default, it's configured to work with a local AI service running on port 11434.

## Troubleshooting

### Connection Issues

If you see a message like:

```
Hi there! I checked and found that our AI service is connected, but our backend service is currently disconnected. This means that you can use local AI models, but cloud features such as datasets and deployments are unavailable for now.
```

This indicates that:

1. The agent can connect to the local AI service (for inference)
2. The agent cannot connect to the backend API service (for dataset management, fine-tuning, etc.)

To fix this:

1. Ensure your backend API service is running
2. Check that the `NEXT_PUBLIC_API_BASE_URL` environment variable is set correctly
3. Verify network connectivity between the frontend and backend
4. Check for any CORS issues that might be preventing the connection

### Fixing the Initial Response

If the agent responds with information about connection status when you say "hi", you need to update the task detection logic in the `task-manager.ts` file:

```typescript
// In lib/services/task-manager.ts
private detectTaskType(message: string): TaskType {
  // Simple greeting detection
  const greetingPatterns = [
    /^hi$/i, /^hello$/i, /^hey$/i, /^greetings$/i, /^howdy$/i
  ];

  if (greetingPatterns.some(pattern => pattern.test(message.trim()))) {
    return TaskType.Conversation; // Just treat as normal conversation
  }

  // Rest of the task detection logic...
}
```

This will prevent the agent from performing a system check when receiving simple greetings.

## Project Structure

```
ai-agent-platform/
├── app/                              # Next.js app directory
│   ├── dashboard/                    # Dashboard pages
│   │   └── page.tsx                  # Main dashboard
│   ├── api/                          # API routes
│   └── page.tsx                      # Home page
├── components/                       # React components
│   ├── dataset-manager.tsx           # Dataset management
│   ├── fine-tuning-manager.tsx       # Fine-tuning management
│   ├── model-deployment-manager.tsx  # Model deployment
│   ├── ui-generator.tsx              # UI generation
│   └── ui/                           # UI components
├── lib/                              # Utility functions
│   ├── api-service.ts                # Backend API service
│   └── services/                     # Service modules
│       ├── ai-service.ts             # AI service abstraction
│       ├── task-manager.ts           # Task management
│       ├── reasoning-engine.ts       # Reasoning engine
│       └── ui-generator-reasoning.ts # UI generation logic
└── public/                           # Static assets
```

## Development

Mash AI Agent Platform is designed to be extensible:

### Adding New Features

To add new features:

1. Create new components in the `components/` directory
2. Add new API endpoints in the `lib/api-service.ts` file
3. Update the dashboard page to include the new features
4. Add any necessary service logic in the `lib/services/` directory

### Enhancing Existing Components

- Improve dataset management in `components/dataset-manager.tsx`
- Enhance fine-tuning workflows in `components/fine-tuning-manager.tsx`
- Expand deployment options in `components/model-deployment-manager.tsx`
- Add new UI templates in `lib/services/ui-generator-reasoning.ts`

## License

MIT