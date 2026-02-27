const { execSync } = require('child_process');
const path = require('path');

const projectPath = 'c:\\Users\\hp\\AppData\\Local\\Packages\\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\\LocalState\\sessions\\311DA42C8F706EF18BD345428BE0DB1A94046619\\transfers\\2026-09\\app';

process.chdir(projectPath);

const commands = [
  { cmd: 'git init', msg: 'Initializing Git repository...' },
  { cmd: 'git config user.email "r.filali@esisa.ac.ma"', msg: 'Setting Git email...' },
  { cmd: 'git config user.name "Reda Filali"', msg: 'Setting Git name...' },
  { cmd: 'git add .', msg: 'Staging files...' },
  { cmd: 'git commit -m "Initial commit: Complete student management application with Next.js, SQLite, and authentication"', msg: 'Creating initial commit...' }
];

for (const {cmd, msg} of commands) {
  try {
    console.log(msg);
    execSync(cmd, { stdio: 'inherit', shell: true });
    console.log('✓ Done\n');
  } catch (error) {
    console.error(`✗ Failed: ${error.message}\n`);
  }
}

console.log('=' .repeat(70));
console.log('Git setup completed!');
console.log('=' .repeat(70));
console.log('\nNext: Push to GitHub with these commands:\n');
console.log('git remote add origin https://github.com/reda-filali/sm.git');
console.log('git branch -M main');
console.log('git push -u origin main\n');
console.log('Then complete npm install and test locally:\n');
console.log('npm install');
console.log('npm run dev');
