# Artintel Platform

A comprehensive platform for managing, comparing, and deploying AI models with a modern, glamorphic UI.

## Features

### Model Management
- Browse and search AI models
- Compare up to 3 models side by side
- Detailed model metrics and performance analysis
- Model bookmarking and organization
- Deployment management across environments

### User Interface
- Modern glamorphic design with glass-like effects
- Dark and light theme support
- Responsive layout for all screen sizes
- Interactive model cards with expandable details
- Real-time performance metrics visualization

### Technical Features
- Next.js 13 with App Router
- FastAPI backend
- TypeScript support
- Tailwind CSS for styling
- Framer Motion for animations
- Real-time model monitoring
- Secure authentication and authorization

### Data Integration
- Upload and manage datasets
- Cloud storage integration (AWS, GCP, Azure)
- Database connections
- **Advanced File Viewer & Editor**
  - Syntax highlighting for code files
  - Image preview support
  - CSV/JSON auto-formatting
  - Live editing with validation
  - Fullscreen mode and keyboard shortcuts

### Analytics & Monitoring
- Real-time performance metrics
- Usage statistics
- Cost tracking
- Custom dashboards

### Team Collaboration
- Role-based access control
- Team workspaces
- Activity logging
- Resource sharing

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/artintellm.git
cd artintellm
```

2. Install frontend dependencies:
```bash
npm install
# or
yarn install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_ENVIRONMENT=development

# Backend (.env)
DATABASE_URL=postgresql://user:password@localhost:5432/artintellm
JWT_SECRET=your-secret-key
```

5. Start the development servers:
```bash
# Frontend
npm run dev
# or
yarn dev

# Backend
cd backend
uvicorn main:app --reload
```

## Project Structure

```
artintellm/
├── src/
│   ├── app/                 # Next.js pages and routes
│   ├── components/          # React components
│   ├── contexts/            # React contexts
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # Global styles
│   └── dashboard-api/      # API client and types
├── backend/
│   ├── app/                # FastAPI application
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── services/           # Business logic
├── docs/                   # Documentation
│   ├── model-apis.md       # Model API documentation
│   └── ...                # Other documentation
└── public/                 # Static assets
```

## Documentation

- [Model API Documentation](docs/model-apis.md)
- [Dashboard Documentation](docs/dashboard.md)
- [API Reference](docs/api-reference.md)

## File Viewer Features

The platform includes a powerful file viewer and editor with:

### Supported Formats
- **Code**: JSON, CSV, SQL, YAML, XML, JS/TS, Python, HTML/CSS
- **Text**: Markdown, Plain text
- **Images**: JPG, PNG, GIF, BMP, WebP

### Key Features
- Syntax highlighting
- Auto-formatting
- Live editing
- Format validation
- Fullscreen mode
- Dark/light theme
- Keyboard shortcuts

### Usage
```typescript
// Example: Opening and editing a file
1. Click the eye icon on any dataset
2. View formatted content with syntax highlighting
3. Click Edit to make changes
4. Use Ctrl/Cmd + S to save
5. Use Esc to exit modes
```

## Deployment

### Deploying to Vercel

The application is configured for easy deployment to Vercel. Follow these steps to deploy:

#### Using the Deployment Script

1. Make sure you have the Vercel CLI installed:
```bash
npm install -g vercel
```

2. Run the deployment script:
```bash
# For preview deployment
node deploy.js

# For production deployment
node deploy.js production
```

#### Manual Deployment

1. Install the Vercel CLI:
```bash
npm install -g vercel
```

2. Build the application:
```bash
npm run build
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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for the smooth animations
- FastAPI for the high-performance backend framework

## Support

For support, please check:
- [Documentation](docs/dashboard.md)
- [Issues](https://github.com/yourusername/artintellm/issues)
- [Discussions](https://github.com/yourusername/artintellm/discussions)
