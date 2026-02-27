@echo off
REM Windows batch script to push to GitHub

cd /d "c:\Users\hp\AppData\Local\Packages\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\LocalState\sessions\311DA42C8F706EF18BD345428BE0DB1A94046619\transfers\2026-09\app"

echo Adding remote origin...
git remote add origin https://github.com/reda-filali/sm.git

echo Renaming branch to main...
git branch -M main

echo Pushing to GitHub...
echo Note: You may need to provide your GitHub credentials
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Successfully pushed to GitHub!
) else (
    echo.
    echo Push failed. Please check your credentials.
    echo If you need a GitHub token, visit: https://github.com/settings/tokens
)
pause
