@echo off
setlocal enabledelayedexpansion

REM Colors for output (Windows 10+)
set "GREEN=[32m"
set "RED=[31m"
set "YELLOW=[33m"
set "BLUE=[34m"
set "RESET=[0m"

echo.
echo %BLUE%========================================%RESET%
echo %BLUE%Student Result Management System - Docker Deployment%RESET%
echo %BLUE%========================================%RESET%
echo.

REM Check if Docker is installed
echo Checking Docker installation...
docker --version >nul 2>&1
if errorlevel 1 (
    echo %RED%Error: Docker is not installed%RESET%
    echo Install from: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo %RED%Error: Docker Compose is not installed%RESET%
    pause
    exit /b 1
)

echo %GREEN%Docker is installed%RESET%
echo %GREEN%Docker Compose is installed%RESET%
echo.

REM Setup .env file
if not exist .env (
    echo %YELLOW%Creating .env from .env.example...%RESET%
    copy .env.example .env
    echo %GREEN%.env file created%RESET%
    echo.
    echo %YELLOW%Please edit .env with your configuration:%RESET%
    echo  - Database passwords
    echo  - Email credentials (Gmail App Password)
    echo  - Domain names
    echo.
    pause
)

REM Parse command
if "%1"=="" goto deploy
if /i "%1"=="deploy" goto deploy
if /i "%1"=="stop" goto stop
if /i "%1"=="restart" goto restart
if /i "%1"=="logs" goto logs
if /i "%1"=="status" goto status
if /i "%1"=="clean" goto clean
if /i "%1"=="help" goto help

echo %RED%Unknown command: %1%RESET%
echo Run "%0 help" for usage information
exit /b 1

:deploy
echo %BLUE%========================================%RESET%
echo %BLUE%Building Docker Images...%RESET%
echo %BLUE%========================================%RESET%
docker-compose build --no-cache
if errorlevel 1 (
    echo %RED%Failed to build Docker images%RESET%
    pause
    exit /b 1
)
echo %GREEN%Images built successfully%RESET%
echo.

echo %BLUE%========================================%RESET%
echo %BLUE%Starting Services...%RESET%
echo %BLUE%========================================%RESET%
docker-compose up -d
if errorlevel 1 (
    echo %RED%Failed to start services%RESET%
    pause
    exit /b 1
)
echo %GREEN%Services started successfully%RESET%
timeout /t 10
echo.

echo %BLUE%========================================%RESET%
echo %BLUE%Checking Service Health...%RESET%
echo %BLUE%========================================%RESET%
docker-compose ps
echo.

echo %GREEN%========================================%RESET%
echo %GREEN%Application Ready!%RESET%
echo %GREEN%========================================%RESET%
echo.
echo %YELLOW%Access your application:%RESET%
echo   Frontend:  http://localhost
echo   Backend:   http://localhost:8080/api
echo   Database:  localhost:3306
echo.
echo %YELLOW%Default Credentials:%RESET%
echo   Admin:    Foradmin / Foradmin
echo   Student:  (Roll number from database)
echo   Teacher:  (Teacher ID from database)
echo.
echo %YELLOW%Useful Commands:%RESET%
echo   View logs:     docker-compose logs -f
echo   Stop services: docker-compose down
echo   Restart:       docker-compose restart
echo.
pause
goto end

:stop
echo %BLUE%Stopping Services...%RESET%
docker-compose down
echo %GREEN%Services stopped%RESET%
pause
goto end

:restart
echo %BLUE%Restarting Services...%RESET%
docker-compose restart
echo %GREEN%Services restarted%RESET%
pause
goto end

:logs
docker-compose logs -f %2
goto end

:status
docker-compose ps
pause
goto end

:clean
echo %BLUE%Cleaning Docker Resources...%RESET%
docker-compose down -v
docker system prune -a --volumes -f
echo %GREEN%Cleanup complete%RESET%
pause
goto end

:help
echo.
echo Student Result Management System - Deployment Helper
echo.
echo Usage: %0 [COMMAND]
echo.
echo Commands:
echo   deploy      Build and start all services (default)
echo   stop        Stop all running services
echo   restart     Restart all services
echo   logs        View service logs
echo   status      Show services status
echo   clean       Remove all containers and volumes
echo   help        Show this help message
echo.
echo Examples:
echo   %0                ^(Deploy application^)
echo   %0 logs          ^(View logs^)
echo   %0 stop          ^(Stop services^)
echo   %0 clean         ^(Remove everything^)
echo.
echo Environment Setup:
echo   1. Edit .env with your configuration
echo   2. Run: %0 deploy
echo.
echo For more information, see DOCKER_DEPLOYMENT.md
echo.
pause
goto end

:end
endlocal
