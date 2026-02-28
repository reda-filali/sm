#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║     PUSHING VERCEL CONFIG FIX TO GITHUB                   ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

try {
  console.log('📝 Stage files...');
  execSync('git add vercel.json .env.local', { stdio: 'pipe' });
  console.log('✓ Files staged\n');
  
  console.log('📦 Commit changes...');
  execSync('git commit -m "Fix vercel.json env format and update JWT_SECRET"', { stdio: 'pipe' });
  console.log('✓ Changes committed\n');
  
  console.log('🚀 Push to GitHub...');
  execSync('git push origin main', { stdio: 'pipe' });
  console.log('✓ Pushed to GitHub\n');
  
  console.log('═════════════════════════════════════════════════════════════\n');
  console.log('✅ SUCCESSFULLY UPDATED!\n');
  console.log('Changes pushed to GitHub:');
  console.log('  • Fixed vercel.json (removed problematic env array)');
  console.log('  • Updated .env.local with secure JWT_SECRET\n');
  
  const log = execSync('git log --oneline -1', { encoding: 'utf8' });
  console.log('Latest commit:');
  console.log(`  ${log}`);
  
  console.log('\n═════════════════════════════════════════════════════════════\n');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
