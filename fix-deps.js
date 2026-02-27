#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const appDir = 'c:\\Users\\hp\\AppData\\Local\\Packages\\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\\LocalState\\sessions\\311DA42C8F706EF18BD345428BE0DB1A94046619\\transfers\\2026-09\\app';

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║     STUDENT MANAGEMENT SYSTEM - DEPENDENCY REPAIR          ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

try {
  // First, try to clean and reinstall with cached builds
  console.log('🔧 Attempting to repair dependencies...\n');
  
  process.chdir(appDir);

  // Remove package-lock to avoid conflicts
  if (fs.existsSync('package-lock.json')) {
    console.log('🗑️  Clearing package-lock...');
    fs.unlinkSync('package-lock.json');
  }

  // Clear npm cache
  console.log('🧹 Clearing npm cache...');
  try {
    execSync('npm cache clean --force', { stdio: 'inherit' });
  } catch (e) {
    console.log('⚠️  Cache clear had issues (continuing anyway)');
  }

  // Try installing with specific npm flags
  console.log('\n📦 Installing dependencies (attempt 1)...\n');
  try {
    execSync('npm install --no-optional --legacy-peer-deps', { 
      stdio: 'inherit',
      env: { ...process.env, NPM_CONFIG_BUILD_FROM_SOURCE: 'false' }
    });
    console.log('\n✅ Dependencies installed successfully!\n');
  } catch (e) {
    console.log('\n⚠️  Standard install had issues, trying alternative method...\n');
    
    // Try with just the main dependencies
    execSync('npm install --only=prod --legacy-peer-deps --ignore-scripts', { 
      stdio: 'inherit',
      env: { ...process.env, NPM_CONFIG_BUILD_FROM_SOURCE: 'false' }
    });
    
    console.log('\n✅ Core dependencies installed!\n');
  }

  // Verify key dependencies
  console.log('🔍 Verifying installation...\n');
  const nextExists = fs.existsSync(path.join(appDir, 'node_modules', 'next'));
  const reactExists = fs.existsSync(path.join(appDir, 'node_modules', 'react'));
  
  if (nextExists && reactExists) {
    console.log('✅ Next.js: Found');
    console.log('✅ React: Found');
    console.log('\n✅ Installation verified!\n');
    
    console.log('═══════════════════════════════════════════════════════════\n');
    console.log('🚀 Starting development server...\n');
    
    execSync('npm run dev', { stdio: 'inherit' });
  } else {
    throw new Error('Critical dependencies missing after install');
  }

} catch (error) {
  console.error('\n❌ Installation failed:\n', error.message);
  
  console.log('\n📋 MANUAL SOLUTION:\n');
  console.log('1. Install Python 3.11 or later from https://www.python.org/');
  console.log('2. Set it as default Python');
  console.log('3. Run: npm install --legacy-peer-deps\n');
  
  process.exit(1);
}
