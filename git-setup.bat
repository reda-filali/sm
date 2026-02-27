@echo off
cd /d "c:\Users\hp\AppData\Local\Packages\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\LocalState\sessions\311DA42C8F706EF18BD345428BE0DB1A94046619\transfers\2026-09\app"

echo Initializing Git repository...
git init

echo Configuring Git user...
git config user.email "r.filali@esisa.ac.ma"
git config user.name "Reda Filali"

echo Adding files to Git...
git add .

echo Creating initial commit...
git commit -m "Initial commit: Complete student management application with Next.js, SQLite, and authentication"

echo Git operations completed!
echo.
echo Run these commands to push to GitHub:
echo git remote add origin https://github.com/reda-filali/sm.git
echo git branch -M main
echo git push -u origin main
echo.
pause
