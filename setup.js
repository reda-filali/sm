const { execSync } = require('child_process');
const path = require('path');

const projectPath = 'c:\\Users\\hp\\AppData\\Local\\Packages\\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\\LocalState\\sessions\\311DA42C8F706EF18BD345428BE0DB1A94046619\\transfers\\2026-09\\app';

process.chdir(projectPath);

console.log('Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit', shell: true });
  console.log('Dependencies installed successfully!');
} catch (error) {
  console.error('Failed to install dependencies:', error.message);
  process.exit(1);
}

console.log('\nBuilding project...');
try {
  execSync('npm run build', { stdio: 'inherit', shell: true });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}

console.log('\nReady to run: npm run dev');
