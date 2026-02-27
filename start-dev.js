#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const appDir = 'c:\\Users\\hp\\AppData\\Local\\Packages\\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\\LocalState\\sessions\\311DA42C8F706EF18BD345428BE0DB1A94046619\\transfers\\2026-09\\app';

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║     STUDENT MANAGEMENT SYSTEM - RUNNING APPLICATION       ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Verify dependencies
const nextModulePath = path.join(appDir, 'node_modules', 'next');
const reactModulePath = path.join(appDir, 'node_modules', 'react');

console.log('📦 Checking dependencies...\n');
const depsOk = fs.existsSync(nextModulePath) && fs.existsSync(reactModulePath);

if (depsOk) {
  console.log('✅ All dependencies are installed\n');
} else {
  console.log('❌ Missing dependencies. Running npm install...\n');
  const npmInstall = spawn('npm', ['install', '--legacy-peer-deps'], {
    cwd: appDir,
    stdio: 'inherit',
    shell: true
  });

  npmInstall.on('close', (code) => {
    if (code !== 0) {
      console.error('\n❌ npm install failed');
      process.exit(1);
    }
    startDevServer();
  });

  return;
}

function startDevServer() {
  console.log('🚀 Starting development server...\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  const devServer = spawn('npm', ['run', 'dev'], {
    cwd: appDir,
    stdio: 'inherit',
    shell: true
  });

  devServer.on('close', (code) => {
    if (code !== 0) {
      console.error('\n❌ Dev server exited with error code:', code);
      process.exit(1);
    }
  });

  // Display test instructions after a brief delay
  setTimeout(() => {
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║                   TEST INSTRUCTIONS                        ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    console.log('🌐 Application URL: http://localhost:3000\n');
    console.log('📝 TEST SCENARIOS:\n');
    console.log('1️⃣  REGISTER - Create a new user account');
    console.log('   - Go to: http://localhost:3000/auth/register');
    console.log('   - Email: test@example.com');
    console.log('   - Password: TestPass123');
    console.log('   - Expected: Redirects to /dashboard\n');

    console.log('2️⃣  LOGIN - Sign in with credentials');
    console.log('   - Go to: http://localhost:3000/auth/login');
    console.log('   - Use credentials from step 1');
    console.log('   - Expected: Access dashboard with student list\n');

    console.log('3️⃣  ADD STUDENT - Create student records');
    console.log('   - Click "Add Student" on dashboard');
    console.log('   - Fill form: Name, Email, Phone, Enrollment');
    console.log('   - Expected: New student appears in list\n');

    console.log('4️⃣  UPDATE STUDENT - Edit student record');
    console.log('   - Click edit icon on student card');
    console.log('   - Modify any field');
    console.log('   - Expected: Changes saved and displayed\n');

    console.log('5️⃣  DELETE STUDENT - Remove student record');
    console.log('   - Click delete icon on student card');
    console.log('   - Confirm deletion');
    console.log('   - Expected: Student removed from list\n');

    console.log('6️⃣  LOGOUT - Sign out');
    console.log('   - Click "Logout" button');
    console.log('   - Expected: Redirects to home page\n');

    console.log('═══════════════════════════════════════════════════════════\n');
  }, 2000);
}

startDevServer();
