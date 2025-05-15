#!/bin/bash

# Artintel Dashboard Deployment Script
# This script automates the deployment process to Vercel

# Colors for console output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
function log() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

function success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

function warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

function error() {
  echo -e "${RED}[ERROR]${NC} $1"
  exit 1
}

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  error "Vercel CLI is not installed. Please install it with: npm install -g vercel"
fi

# Parse command line arguments
ENVIRONMENT="preview"
if [ "$1" == "production" ]; then
  ENVIRONMENT="production"
fi

log "Starting deployment process for Artintel Dashboard"
log "Environment: $ENVIRONMENT"

# Run build
log "Building the application..."
cd dashboard
npm run build
if [ $? -ne 0 ]; then
  error "Build failed"
fi
cd ..
success "Application built successfully"

# Deploy to Vercel
log "Deploying to Vercel ($ENVIRONMENT)..."
if [ "$ENVIRONMENT" == "production" ]; then
  vercel --prod
  if [ $? -ne 0 ]; then
    error "Deployment failed"
  fi
else
  vercel
  if [ $? -ne 0 ]; then
    error "Deployment failed"
  fi
fi

success "Deployment completed successfully!"
