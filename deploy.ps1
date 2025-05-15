# Artintel Dashboard Deployment Script for Windows
# This script automates the deployment process to Vercel

# Helper functions
function Write-Log {
    param (
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host "[INFO] $Message" -ForegroundColor $Color
}

function Write-Success {
    param (
        [string]$Message
    )
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param (
        [string]$Message
    )
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param (
        [string]$Message
    )
    Write-Host "[ERROR] $Message" -ForegroundColor Red
    exit 1
}

# Check if Vercel CLI is installed
try {
    $vercelVersion = vercel --version
    Write-Log "Vercel CLI found: $vercelVersion"
}
catch {
    Write-Error "Vercel CLI is not installed. Please install it with: npm install -g vercel"
}

# Parse command line arguments
$environment = "preview"
if ($args[0] -eq "production") {
    $environment = "production"
}

Write-Log "Starting deployment process for Artintel Dashboard" -Color Cyan
Write-Log "Environment: $environment" -Color Cyan

# Run build
Write-Log "Building the application..." -Color Blue
try {
    cd dashboard
    npm run build
    cd ..
}
catch {
    Write-Error "Build failed"
}
Write-Success "Application built successfully"

# Deploy to Vercel
Write-Log "Deploying to Vercel ($environment)..." -Color Blue
if ($environment -eq "production") {
    try {
        vercel --prod
    }
    catch {
        Write-Error "Deployment failed"
    }
}
else {
    try {
        vercel
    }
    catch {
        Write-Error "Deployment failed"
    }
}

Write-Success "Deployment completed successfully!"
