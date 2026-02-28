#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║              PUSHING CODE TO GITHUB                          ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

try {
  // Check current status
  console.log('📊 Checking git status...\n');
  const status = execSync('git status', { encoding: 'utf8' });
  console.log('Current branch: main');
  
  // Check if there are commits to push
  const log = execSync('git log origin/main..main --oneline', { encoding: 'utf8' });
  const commits = log.trim().split('\n').filter(l => l.length > 0);
  
  console.log(`📋 Commits to push: ${commits.length}\n`);
  
  if (commits.length === 0) {
    console.log('✓ Already up to date with GitHub\n');
  } else {
    commits.forEach(c => console.log(`  • ${c}`));
    console.log('\n');
  }
  
  // Push to GitHub
  console.log('🚀 Pushing to GitHub...\n');
  
  try {
    const pushResult = execSync('git push origin main', { 
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    console.log('✅ Push successful!\n');
    console.log(pushResult);
  } catch (pushError) {
    // Check if it's just "up to date"
    if (pushError.message.includes('Everything up-to-date')) {
      console.log('✅ Already up to date with GitHub\n');
    } else {
      throw pushError;
    }
  }
  
  // Verify on GitHub
  console.log('\n✅ PUSH COMPLETE!\n');
  
  // Show summary
  const latestLog = execSync('git log --oneline -3', { encoding: 'utf8' });
  console.log('📋 Latest commits:');
  console.log(latestLog);
  
  const remote = execSync('git remote -v', { encoding: 'utf8' });
  console.log('🔗 Remote repository:');
  console.log(remote.split('\n')[0]);
  
  console.log('\n═══════════════════════════════════════════════════════════════\n');
  console.log('✅ CODE SUCCESSFULLY PUSHED TO GITHUB!\n');
  console.log('Repository: https://github.com/reda-filali/sm.git');
  console.log('Branch: main\n');
  
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  process.exit(0);
  
} catch (error) {
  console.error('\n❌ Error:', error.message);
  
  if (error.message.includes('Authentication failed')) {
    console.log('\n📋 GitHub Authentication Required:\n');
    console.log('Please use a Personal Access Token instead of password.');
    console.log('Create token at: https://github.com/settings/tokens\n');
  }
  
  process.exit(1);
}
