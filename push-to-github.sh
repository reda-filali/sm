#!/bin/bash
# Push to GitHub script
# This script will push your code to the GitHub repository

cd "c:\Users\hp\AppData\Local\Packages\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\LocalState\sessions\311DA42C8F706EF18BD345428BE0DB1A94046619\transfers\2026-09\app"

echo "Adding remote origin..."
git remote add origin https://github.com/reda-filali/sm.git

echo "Renaming branch to main..."
git branch -M main

echo "Pushing to GitHub..."
echo "Note: You may need to provide your GitHub credentials or use SSH keys"
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✓ Successfully pushed to GitHub!"
else
    echo "✗ Push failed. Please check your credentials and try again."
    echo "If you haven't generated a GitHub token, visit:"
    echo "https://github.com/settings/tokens"
fi
