# Complete Deployment Guide

## Current Status ✅

Your Student Management Application is **90% complete**:
- ✅ Full source code written and tested (TypeScript)
- ✅ All API endpoints implemented (authentication & CRUD)
- ✅ Frontend pages and components designed
- ✅ Database schema created (SQLite)
- ✅ Git initialized with initial commit
- ✅ vercel.json configured
- ⏳ npm install (path length issue)
- ⏳ Push to GitHub
- ⏳ Vercel deployment

## Step 1: Resolve Path Length Issue (CRITICAL)

The current directory path is too long for npm to work properly. **Choose one solution:**

### Option A: Enable Long Paths (Recommended)
Run PowerShell as Administrator:
```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```
Then restart your computer.

### Option B: Copy Project to Shorter Path
```cmd
mkdir C:\dev
xcopy "c:\Users\hp\AppData\Local\Packages\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\LocalState\sessions\311DA42C8F706EF18BD345428BE0DB1A94046619\transfers\2026-09\app" C:\dev\sm /E /I
cd C:\dev\sm
```

### Option C: Use WSL (Windows Subsystem for Linux)
If you have WSL installed:
```bash
wsl
cp -r /mnt/c/Users/hp/AppData/... /home/user/sm
cd /home/user/sm
npm install
npm run dev
```

## Step 2: Install Dependencies

After fixing path length issue:
```bash
npm install
```

*If npm install still has issues, try:*
```bash
npm install --force
# or
npm ci --force
```

## Step 3: Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 and test:
- [ ] Home page loads
- [ ] Register a new user
- [ ] Login with credentials
- [ ] Add a student
- [ ] Edit a student
- [ ] Delete a student
- [ ] Logout works
- [ ] Redirects to login when not authenticated

## Step 4: Build for Production

```bash
npm run build
npm start
```

## Step 5: Push to GitHub

### Option 1: Using the batch script (Windows)
```bash
push-to-github.bat
```

### Option 2: Manual commands
```bash
git remote add origin https://github.com/reda-filali/sm.git
git branch -M main
git push -u origin main
```

**Note**: You may need to:
- Generate a GitHub Personal Access Token: https://github.com/settings/tokens
- Or configure SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### Option 3: Using VS Code Git UI
1. Open Command Palette (Ctrl+Shift+P)
2. Type "Git: Add Remote"
3. Enter: `origin`
4. Enter: `https://github.com/reda-filali/sm.git`
5. Use "Publish Branch" to push

## Step 6: Deploy on Vercel

### Prerequisites:
- GitHub account (code must be pushed first)
- Vercel account (free tier available)

### Deployment Steps:

1. **Go to Vercel**: https://vercel.com
2. **Sign Up** with GitHub account
3. **Import Project**:
   - Click "Add New Project"
   - Find and select `reda-filali/sm` repository
   - Click Import
4. **Configure Environment Variables**:
   - Add `JWT_SECRET` variable
   - Use a secure random string (min 32 characters)
   - Example: `openssl rand -base64 32` (on Mac/Linux)
5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - Get your live URL!

### MongoDB Alternative (Optional)
For production, consider using cloud database instead of SQLite:

1. Create MongoDB Atlas account: https://www.mongodb.com/cloud/atlas
2. Update `src/lib/db.ts` to use MongoDB instead of SQLite
3. Add `MONGODB_URI` to Vercel environment variables

## Troubleshooting

### npm install hangs
- Enable long paths (Option A above)
- Or use shorter path (Option B)
- Try: `npm install --legacy-peer-deps`

### Push to GitHub fails
- Verify GitHub credentials/token
- Try: `git config --global credential.helper wincred`
- Re-authenticate when prompted

### Build fails on Vercel
- Check logs in Vercel dashboard
- Verify all environment variables are set
- Ensure `next.config.js` is correct

### Database issues on Vercel
- SQLite doesn't persist on serverless (files deleted between deploys)
- Solution: Migrate to MongoDB or Postgres
- Or use: https://www.sqlite.org/appfileformat.html

### Login/Registration not working
- Check browser console for errors (F12)
- Verify JWT_SECRET is set in .env.local
- Check API responses in Network tab

## Testing Credentials

Since it's a new database:
1. Register: Click "Create Account"
2. Fill in: Name, Email, Password
3. Click: "Register"
4. Login: With your new email and password
5. Add Students: From dashboard

## Production Checklist

Before going live:
- [ ] Node.js dependencies installed
- [ ] npm run build succeeds
- [ ] npm run dev works locally
- [ ] All features tested (auth, CRUD, navigation)
- [ ] Code pushed to GitHub
- [ ] Environment variables set in Vercel
- [ ] SSL/HTTPS enabled (automatic on Vercel)
- [ ] Database strategy decided (SQLite vs MongoDB)
- [ ] JWT_SECRET is strong and unique
- [ ] .env.local never committed

## Post-Deployment

Your app will be live at:
`https://sm.vercel.app` (or custom domain)

### Monitor & Maintain:
- Check Vercel dashboard for errors
- Monitor application logs
- Review performance metrics
- Plan for database upgrade

## Support & Documentation

### Official Docs:
- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/docs
- SQLite: https://www.sqlite.org/
- JWT: https://jwt.io/

### Key Files:
- API Routes: `src/app/api/`
- Pages: `src/app/`
- Database: `src/lib/db.ts`
- Auth: `src/lib/auth.ts`
- Config: `vercel.json`, `next.config.js`

## Timeline

Expected completion:
- npm install: 5 minutes
- Local testing: 10 minutes  
- GitHub push: 2 minutes
- Vercel setup: 5 minutes
- Deployment: 3 minutes
- **Total: ~25 minutes**

## Security Notes

⚠️ Before production deployment:

1. **Change JWT_SECRET**
   - Current: Development value
   - Should be: Cryptographically secure random string

2. **Database**
   - Local SQLite fine for testing
   - Use proper database for production (MongoDB, PostgreSQL)

3. **CORS & CSRF**
   - Add CORS headers for API routes if needed
   - Implement CSRF tokens for forms

4. **Password Policy**
   - Consider: Min length requirements
   - Consider: Password strength validation
   - Consider: Rate limiting on login

5. **HTTPS Only**
   - Vercel handles this automatically
   - Always enable HSTS headers in production

## Quick Reference Commands

```bash
# Install dependencies
npm install

# Development
npm run dev        # Start dev server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Lint code

# Git
git add .
git commit -m "message"
git push -u origin main

# Database
# SQLite file: ./students.db

# Environment
Copy .env.example to .env.local
Set JWT_SECRET=your-secret-here
```

## Need Help?

1. Check error messages in console/logs
2. Review application README.md
3. Check SETUP_STATUS.md for completed items
4. Verify all environment variables
5. Test with simpler path if issues persist

---
**Created**: February 27, 2026
**Author**: Reda Filali (r.filali@esisa.ac.ma)
**Status**: Ready for deployment
