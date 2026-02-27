@echo off
setlocal enabledelayedexpansion

cd /d "c:\Users\hp\AppData\Local\Packages\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\LocalState\sessions\311DA42C8F706EF18BD345428BE0DB1A94046619\transfers\2026-09\app"

echo.
echo ============================================================
echo  STUDENT MANAGEMENT APP - INSTALLATION & TEST
echo ============================================================
echo.

REM Check if node_modules exists
if exist "node_modules" (
    echo [OK] node_modules directory exists
    echo.
) else (
    echo [INSTALLING] Dependencies...
    call npm install --legacy-peer-deps
    if !errorlevel! neq 0 (
        echo [ERROR] npm install failed
        exit /b 1
    )
    echo.
)

REM Build the project
echo [BUILDING] Next.js project...
call npm run build
if !errorlevel! neq 0 (
    echo [ERROR] Build failed
    exit /b 1
)
echo.

REM Start the dev server
echo ============================================================
echo  STARTING DEVELOPMENT SERVER
echo ============================================================
echo.
echo [INFO] Starting npm run dev...
echo [INFO] Open your browser at: http://localhost:3000
echo.
call npm run dev

endlocal
