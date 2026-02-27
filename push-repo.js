const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const appPath = 'c:\\Users\\hp\\AppData\\Local\\Packages\\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\\LocalState\\sessions\\311DA42C8F706EF18BD345428BE0DB1A94046619\\transfers\\2026-09\\app';

try {
  process.chdir(appPath);
  
  console.log('📦 Checking git status...\n');
  const status = execSync('git status --short', { encoding: 'utf8' });
  console.log(status || 'No changes to commit');
  
  console.log('\n🔌 Adding GitHub remote...');
  try {
    execSync('git remote add origin https://github.com/reda-filali/sm.git', { stdio: 'ignore' });
    console.log('✓ Remote added');
  } catch (e) {
    console.log('✓ Remote already exists');
    execSync('git remote set-url origin https://github.com/reda-filali/sm.git');
  }
  
  console.log('\n🌿 Renaming branch to main...');
  execSync('git branch -M main', { stdio: 'inherit' });
  console.log('✓ Branch renamed');
  
  console.log('\n📤 Pushing to GitHub...');
  console.log('Note: You may be prompted for GitHub credentials\n');
  
  try {
    execSync('git push -u origin main --verbose', { stdio: 'inherit' });
    console.log('\n✅ Successfully pushed to GitHub!');
    console.log('Repository: https://github.com/reda-filali/sm');
  } catch (err) {
    console.log('\n⚠️ Push may require authentication');
    console.log('If prompted, use your GitHub personal access token (not password)');
    console.log('Generate token at: https://github.com/settings/tokens');
  }
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
