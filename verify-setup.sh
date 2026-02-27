#!/bin/bash
# Installation and Deployment Guide for Student Management System

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║   Student Management System - Installation Guide          ║"
echo "║   Ready for Production Deployment                         ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check if Windows path issue exists
APP_PATH="$(pwd)"
if [ ${#APP_PATH} -gt 260 ]; then
    echo -e "${YELLOW}⚠️  WARNING: Path length exceeds Windows limit (260 chars)${NC}"
    echo "Current path: $APP_PATH"
    echo "Length: ${#APP_PATH}"
    echo ""
    echo -e "${YELLOW}Solutions:${NC}"
    echo "1. Enable long paths in Windows Registry (recommended)"
    echo "   Run as Administrator in PowerShell:"
    echo "   New-ItemProperty -Path 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\FileSystem' -Name 'LongPathsEnabled' -Value 1 -PropertyType DWORD -Force"
    echo ""
    echo "2. Copy to shorter path:"
    echo "   mkdir C:\\dev"
    echo "   xcopy '$APP_PATH' C:\\dev\\sm /E /I"
    echo ""
    read -p "Press enter after fixing path length..."
fi

echo -e "${GREEN}✓ Project Ready for Deployment${NC}"
echo ""
echo "Next steps:"
echo "1. npm install          # Install dependencies"
echo "2. npm run dev          # Test locally"
echo "3. git push             # Push to GitHub"
echo "4. Deploy on Vercel     # Go to vercel.com"
echo ""
echo "For detailed instructions, see QUICK_START.md"
