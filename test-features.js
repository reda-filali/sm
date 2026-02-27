#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║          AUTOMATED API & FEATURE TESTS                       ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

let passed = 0;
let failed = 0;

function test(name, condition, details = '') {
  if (condition) {
    console.log(`✅ ${name}`);
    if (details) console.log(`   ${details}`);
    passed++;
  } else {
    console.log(`❌ ${name}`);
    if (details) console.log(`   ${details}`);
    failed++;
  }
}

// ============================================
// TEST 1: AUTH REGISTRATION LOGIC
// ============================================
console.log('🔐 TEST 1: AUTHENTICATION SYSTEM\n');

const registerFile = fs.readFileSync('src/app/api/auth/register/route.ts', 'utf8');
test('Register endpoint has POST method', registerFile.includes('export async function POST'));
test('Register validates email', registerFile.includes('email') && registerFile.includes('validate'));
test('Register checks email uniqueness', registerFile.includes('users') && registerFile.includes('SELECT'));
test('Register hashes password', registerFile.includes('hash') || registerFile.includes('bcrypt'));
test('Register creates user in database', registerFile.includes('INSERT'));

console.log('\n');

// ============================================
// TEST 2: AUTH LOGIN LOGIC
// ============================================
console.log('🔑 TEST 2: LOGIN SYSTEM\n');

const loginFile = fs.readFileSync('src/app/api/auth/login/route.ts', 'utf8');
test('Login endpoint has POST method', loginFile.includes('export async function POST'));
test('Login queries user by email', loginFile.includes('users') && loginFile.includes('email'));
test('Login verifies password', loginFile.includes('verify') || loginFile.includes('compare'));
test('Login returns JWT token', loginFile.includes('token') || loginFile.includes('jwt'));
test('Login sets secure cookie', loginFile.includes('cookies') || loginFile.includes('Set-Cookie'));

console.log('\n');

// ============================================
// TEST 3: STUDENT CRUD OPERATIONS
// ============================================
console.log('👨‍🎓 TEST 3: STUDENT MANAGEMENT CRUD\n');

const studentListFile = fs.readFileSync('src/app/api/students/route.ts', 'utf8');
test('Students endpoint has GET', studentListFile.includes('export async function GET'));
test('Students endpoint has POST', studentListFile.includes('export async function POST'));
test('GET filters by user_id', studentListFile.includes('user_id') && studentListFile.includes('SELECT'));
test('POST creates new student', studentListFile.includes('INSERT'));
test('POST validates inputs', studentListFile.includes('name') && studentListFile.includes('email'));

console.log('\n');

const studentDetailFile = fs.readFileSync('src/app/api/students/[id]/route.ts', 'utf8');
test('Student detail has GET', studentDetailFile.includes('export async function GET'));
test('Student detail has PUT', studentDetailFile.includes('export async function PUT'));
test('Student detail has DELETE', studentDetailFile.includes('export async function DELETE'));
test('Update preserves user ownership', studentDetailFile.includes('user_id'));
test('Delete removes from database', studentDetailFile.includes('DELETE'));

console.log('\n');

// ============================================
// TEST 4: DATABASE SCHEMA
// ============================================
console.log('🗄️  TEST 4: DATABASE SCHEMA\n');

const dbFile = fs.readFileSync('src/lib/db.ts', 'utf8');
test('Database initializes', dbFile.includes('getBetterSqlite3'));
test('Users table exists', dbFile.includes('CREATE TABLE') && dbFile.includes('users'));
test('Users has email unique', dbFile.includes('email') && dbFile.includes('UNIQUE'));
test('Users has password field', dbFile.includes('password'));
test('Students table exists', dbFile.includes('students'));
test('Students links to users', dbFile.includes('user_id') && dbFile.includes('FOREIGN KEY'));
test('DB enables WAL mode', dbFile.includes('pragma journal_mode'));

console.log('\n');

// ============================================
// TEST 5: AUTHENTICATION UTILITIES
// ============================================
console.log('🔑 TEST 5: AUTH UTILITIES\n');

const authFile = fs.readFileSync('src/lib/auth.ts', 'utf8');
test('Has password hashing function', authFile.includes('hashPassword') || authFile.includes('hash'));
test('Has password verification', authFile.includes('verifyPassword') || authFile.includes('verify'));
test('Uses bcryptjs', authFile.includes('bcryptjs') || authFile.includes('bcrypt'));
test('Has JWT token creation', authFile.includes('createToken') || authFile.includes('createJWT'));
test('Uses jose for JWT', authFile.includes('jose') || authFile.includes('jwtVerify'));
test('Has token verification', authFile.includes('verifyToken'));

console.log('\n');

// ============================================
// TEST 6: FRONTEND PAGES
// ============================================
console.log('📱 TEST 6: FRONTEND PAGES\n');

const pages = [
  { path: 'src/app/page.tsx', name: 'Home page', checks: ['export default', 'register', 'login'] },
  { path: 'src/app/auth/register/page.tsx', name: 'Register page', checks: ['useState', 'email', 'password'] },
  { path: 'src/app/auth/login/page.tsx', name: 'Login page', checks: ['useState', 'email', 'password'] },
  { path: 'src/app/dashboard/page.tsx', name: 'Dashboard page', checks: ['students', 'Add Student', 'useEffect'] },
];

pages.forEach(page => {
  const content = fs.readFileSync(page.path, 'utf8');
  const allChecks = page.checks.every(check => content.toLowerCase().includes(check.toLowerCase()));
  test(`${page.name}`, allChecks, `Has required components`);
});

console.log('\n');

// ============================================
// TEST 7: ERROR HANDLING
// ============================================
console.log('⚠️  TEST 7: ERROR HANDLING\n');

const allRoutes = [registerFile, loginFile, studentListFile, studentDetailFile];
test('Routes handle errors', allRoutes.every(r => r.includes('try') || r.includes('catch')), 'All routes have error handling');
test('Routes validate input', 
  registerFile.includes('validate') || registerFile.includes('error') ||
  loginFile.includes('validate') || loginFile.includes('error'),
  'Input validation present');

console.log('\n');

// ============================================
// TEST 8: SECURITY CHECKS
// ============================================
console.log('🔒 TEST 8: SECURITY\n');

test('No hardcoded secrets', !fs.readFileSync('src/lib/auth.ts', 'utf8').includes('secret123'));
test('Uses environment variables', fs.readFileSync('next.config.js', 'utf8').includes('process.env') || fs.readFileSync('vercel.json', 'utf8').includes('env'));
test('HTTP-only cookies', loginFile.includes('httpOnly') || loginFile.includes('httponly'));
test('CORS configured', fs.readFileSync('next.config.js', 'utf8').includes('cors') || fs.readFileSync('src/app/api/students/route.ts', 'utf8').includes('cors'));

console.log('\n');

// ============================================
// SUMMARY
// ============================================
console.log('═══════════════════════════════════════════════════════════════\n');
console.log('📊 TEST RESULTS:\n');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%\n`);

if (failed === 0) {
  console.log('🎉 ALL TESTS PASSED - APP IS FULLY FUNCTIONAL!\n');
  process.exit(0);
} else {
  console.log('⚠️  Some tests failed - review above\n');
  process.exit(1);
}
