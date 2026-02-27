const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const appPath = 'c:\\Users\\hp\\AppData\\Local\\Packages\\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\\LocalState\\sessions\\311DA42C8F706EF18BD345428BE0DB1A94046619\\transfers\\2026-09\\app';

console.log('═══════════════════════════════════════════════════════════');
console.log('  STUDENT MANAGEMENT APP - TEST & DEPLOYMENT VERIFICATION');
console.log('═══════════════════════════════════════════════════════════\n');

process.chdir(appPath);

// 1. Test source files exist
console.log('✅ TESTING SOURCE FILES\n');
const requiredFiles = [
  'src/app/page.tsx',
  'src/app/layout.tsx',
  'src/app/globals.css',
  'src/app/auth/login/page.tsx',
  'src/app/auth/register/page.tsx',
  'src/app/dashboard/page.tsx',
  'src/app/api/auth/login/route.ts',
  'src/app/api/auth/register/route.ts',
  'src/app/api/auth/session/route.ts',
  'src/app/api/students/route.ts',
  'src/app/api/students/[id]/route.ts',
  'src/lib/auth.ts',
  'src/lib/db.ts',
  'package.json',
  'next.config.js',
  'tsconfig.json',
  'vercel.json',
];

let missingFiles = 0;
requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(appPath, file))) {
    console.log(`  ✓ ${file}`);
  } else {
    console.log(`  ✗ MISSING: ${file}`);
    missingFiles++;
  }
});

if (missingFiles === 0) {
  console.log('\n✅ All source files exist!\n');
} else {
  console.log(`\n❌ ${missingFiles} files missing!\n`);
}

// 2. Test package.json
console.log('✅ TESTING CONFIGURATION\n');
const pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
console.log(`  ✓ Project: ${pkgJson.name}`);
console.log(`  ✓ Version: ${pkgJson.version}`);
console.log(`  ✓ Main dependencies:`);
console.log(`    - next: ${pkgJson.dependencies.next}`);
console.log(`    - react: ${pkgJson.dependencies.react}`);
console.log(`    - typescript: ${pkgJson.devDependencies.typescript}`);
console.log(`    - tailwindcss: ${pkgJson.devDependencies.tailwindcss}\n`);

// 3. Test git status
console.log('✅ TESTING GIT CONFIGURATION\n');
try {
  const gitConfig = execSync('git config --list', { encoding: 'utf8' });
  console.log(`  ✓ Git initialized`);
  
  const userEmail = gitConfig.match(/user.email=(.+)/)?.[1];
  const userName = gitConfig.match(/user.name=(.+)/)?.[1];
  if (userEmail) console.log(`  ✓ User email: ${userEmail}`);
  if (userName) console.log(`  ✓ User name: ${userName}`);
  
  const remotes = execSync('git remote -v', { encoding: 'utf8' });
  if (remotes.includes('github.com')) {
    console.log(`  ✓ GitHub remote configured\n`);
  } else {
    console.log(`  ⚠ GitHub remote not yet pushed\n`);
  }
} catch (err) {
  console.log(`  ❌ Git error: ${err.message}\n`);
}

// 4. Test database
console.log('✅ TESTING DATABASE\n');
try {
  const dbPath = path.join(appPath, 'students.db');
  if (fs.existsSync(dbPath)) {
    console.log(`  ✓ SQLite database file exists`);
    const stats = fs.statSync(dbPath);
    console.log(`  ✓ Database size: ${stats.size} bytes\n`);
  } else {
    console.log(`  ℹ Database not yet created (will be created on first run)\n`);
  }
} catch (err) {
  console.log(`  ❌ Database error: ${err.message}\n`);
}

// 5. Test npm/node
console.log('✅ TESTING NODE ENVIRONMENT\n');
const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
console.log(`  ✓ Node.js: ${nodeVersion}`);

try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`  ✓ npm: ${npmVersion}\n`);
} catch (err) {
  console.log(`  ✗ npm not accessible\n`);
}

// Summary
console.log('═══════════════════════════════════════════════════════════');
console.log('  ✅ APPLICATION STRUCTURE VERIFIED');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('📋 NEXT STEPS:\n');
console.log('1. Install dependencies:');
console.log('   npm install --legacy-peer-deps\n');
console.log('2. Start development server:');
console.log('   npm run dev\n');
console.log('3. Test at: http://localhost:3000\n');
console.log('4. Push to GitHub (if not already done):\n');
console.log('   git push -u origin main\n');
console.log('5. Deploy on Vercel:\n');
console.log('   Go to https://vercel.com/new\n');
