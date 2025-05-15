const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure environment variables are set
process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_c3VwcmVtZS1qYWd1YXItNTYuY2xlcmsuYWNjb3VudHMuZGV2JA';
process.env.CLERK_SECRET_KEY = 'sk_test_4sBtFdFsUF7fxcXx0GHDVkE00VbYkqN0ABkunI57hV';

console.log('Starting custom build process...');

// Run the Next.js build
try {
  console.log('Building Next.js application...');
  execSync('next build', { stdio: 'inherit' });
  console.log('Next.js build completed successfully.');
} catch (error) {
  console.error('Error during Next.js build:', error);
  process.exit(1);
}

console.log('Custom build process completed successfully.');
