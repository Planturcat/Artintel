# Artintel

Artintel is a comprehensive AI platform that provides tools for creating, deploying, and interacting with AI models and agents.

## Project Structure

- **website/** - Main marketing website and documentation
- **mash-agent/** - AI assistant/agent component
- **dashboard/** - User dashboard for managing projects and settings
- **Backend/** - Backend services and API endpoints

## Getting Started

See individual project READMEs for setup instructions.

## Deployment

### Deploying to Vercel

The application is configured for easy deployment to Vercel. Follow these steps to deploy:

#### Using the Deployment Script

1. Make sure you have the Vercel CLI installed:
```bash
npm install -g vercel
```

2. Run the deployment script:

**For Windows:**
```powershell
# For preview deployment
.\deploy.ps1

# For production deployment
.\deploy.ps1 production
```

**For Linux/Mac:**
```bash
# For preview deployment
./deploy.sh

# For production deployment
./deploy.sh production
```

#### Manual Deployment

1. Install the Vercel CLI:
```bash
npm install -g vercel
```

2. Build the application:
```bash
cd dashboard
npm run build
cd ..
```

3. Deploy to Vercel:
```bash
# For preview deployment
vercel

# For production deployment
vercel --prod
```

### Environment Variables

Make sure the following environment variables are set in your Vercel project:

- `NEXT_PUBLIC_APP_NAME`: The name of the application
- `NEXT_PUBLIC_API_BASE_URL`: The base URL of the API
- `NEXT_PUBLIC_USE_MOCK_API`: Set to "true" to use mock API data
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key
- `CLERK_SECRET_KEY`: Clerk secret key
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: Clerk sign-in URL
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: Clerk sign-up URL
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_URL`: Clerk sign-in fallback URL
- `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_URL`: Clerk sign-up fallback URL