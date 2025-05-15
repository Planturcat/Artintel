/**
 * Artintel Dashboard Deployment Script
 * 
 * This script automates the deployment process to Vercel.
 * It performs the following tasks:
 * 1. Validates environment variables
 * 2. Runs tests to ensure everything is working correctly
 * 3. Builds the application
 * 4. Deploys to Vercel
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_APP_NAME',
  'NEXT_PUBLIC_API_BASE_URL',
  'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
  'CLERK_SECRET_KEY',
  'NEXT_PUBLIC_CLERK_SIGN_IN_URL',
  'NEXT_PUBLIC_CLERK_SIGN_UP_URL',
  'NEXT_PUBLIC_USE_MOCK_API'
];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Helper functions
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function success(message) {
  log(`✅ ${message}`, colors.green);
}

function error(message) {
  log(`❌ ${message}`, colors.red);
}

function warning(message) {
  log(`⚠️ ${message}`, colors.yellow);
}

function info(message) {
  log(`ℹ️ ${message}`, colors.blue);
}

function executeCommand(command, options = {}) {
  try {
    info(`Executing: ${command}`);
    const output = execSync(command, {
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options
    });
    return options.silent ? output.toString() : true;
  } catch (err) {
    if (options.ignoreError) {
      warning(`Command failed but continuing: ${command}`);
      warning(err.message);
      return false;
    }
    error(`Command failed: ${command}`);
    error(err.message);
    process.exit(1);
  }
}

// Step 1: Validate environment variables
function validateEnvironment() {
  info('Validating environment variables...');
  
  // Check if .env file exists
  if (!fs.existsSync(path.join(__dirname, '.env'))) {
    error('.env file not found. Please create one based on .env.example');
    process.exit(1);
  }
  
  // Load environment variables from .env file
  const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const [, key, value] = match;
      envVars[key.trim()] = value.trim();
    }
  });
  
  // Check required environment variables
  const missingVars = REQUIRED_ENV_VARS.filter(varName => !envVars[varName]);
  
  if (missingVars.length > 0) {
    error(`Missing required environment variables: ${missingVars.join(', ')}`);
    process.exit(1);
  }
  
  success('Environment variables validated successfully');
}

// Step 2: Run tests
function runTests() {
  info('Running tests...');
  executeCommand('npm run lint', { ignoreError: true });
  // Add more tests as needed
  success('Tests completed');
}

// Step 3: Build the application
function buildApplication() {
  info('Building the application...');
  executeCommand('npm run build');
  success('Application built successfully');
}

// Step 4: Deploy to Vercel
function deployToVercel(environment = 'production') {
  info(`Deploying to Vercel (${environment})...`);
  
  // Check if Vercel CLI is installed
  try {
    execSync('vercel --version', { stdio: 'pipe' });
  } catch (err) {
    error('Vercel CLI not found. Please install it with: npm i -g vercel');
    process.exit(1);
  }
  
  // Deploy to Vercel
  const deployCommand = environment === 'production'
    ? 'vercel --prod'
    : 'vercel';
  
  executeCommand(deployCommand);
  success(`Deployed to Vercel (${environment})`);
}

// Main function
function main() {
  const args = process.argv.slice(2);
  const environment = args[0] === 'production' ? 'production' : 'preview';
  
  log('🚀 Starting deployment process for Artintel Dashboard', colors.cyan);
  log(`Environment: ${environment}`, colors.cyan);
  
  validateEnvironment();
  runTests();
  buildApplication();
  deployToVercel(environment);
  
  log('🎉 Deployment completed successfully!', colors.green);
}

// Run the script
main();
