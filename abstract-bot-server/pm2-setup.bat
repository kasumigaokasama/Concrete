@echo off
title PM2 Setup fuer Abstract Bot
color 0D

echo ========================================
echo    PM2 SETUP FUER ABSTRACT BOT
echo ========================================
echo.
echo PM2 ist ein professioneller Process Manager
echo mit automatischem Neustart und Monitoring.
echo.

:: Prüfe ob Node.js installiert ist
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [FEHLER] Node.js ist nicht installiert!
    pause
    exit /b 1
)

:: Prüfe ob PM2 installiert ist
pm2 --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] PM2 ist nicht installiert.
    echo.
    echo Moechtest du PM2 global installieren? (J/N)
    set /p installpm2=
    if /i "%installpm2%"=="J" (
        echo [INFO] Installiere PM2...
        npm install -g pm2
        npm install -g pm2-windows-startup
    ) else (
        echo [INFO] Installation abgebrochen.
        pause
        exit /b 0
    )
)

echo.
echo [INFO] PM2 Version:
pm2 --version
echo.

echo Waehle eine Aktion:
echo.
echo [1] Server mit PM2 starten
echo [2] PM2 Autostart einrichten
echo [3] Server Status anzeigen
echo [4] Server stoppen
echo [5] Server aus PM2 entfernen
echo [6] PM2 Logs anzeigen
echo [0] Beenden
echo.

set /p action="Deine Wahl: "

if "%action%"=="1" goto :start
if "%action%"=="2" goto :autostart
if "%action%"=="3" goto :status
if "%action%"=="4" goto :stop
if "%action%"=="5" goto :delete
if "%action%"=="6" goto :logs
if "%action%"=="0" exit /b 0

:start
echo.
echo [INFO] Starte Server mit PM2...

:: Erstelle ecosystem.config.js für erweiterte Konfiguration
(
echo module.exports = {
echo   apps: [{
echo     name: 'abstract-bot',
echo     script: './server.js',
echo     instances: 1,
echo     autorestart: true,
echo     watch: false,
echo     max_memory_restart: '500M',
echo     env: {
echo       NODE_ENV: 'production',
echo       PORT: 3000
echo     },
echo     error_file: './logs/pm2-error.log',
echo     out_file: './logs/pm2-out.log',
echo     log_file: './logs/pm2-combined.log',
echo     time: true
echo   }]
echo };
) > ecosystem.config.js

pm2 start ecosystem.config.js
pm2 save
echo.
echo [OK] Server gestartet!
pause
goto :end

:autostart
echo.
echo [INFO] Richte PM2 Autostart ein...
pm2-startup install
pm2 save
echo.
echo [OK] PM2 startet nun automatisch mit Windows!
pause
goto :end

:status
echo.
pm2 status
echo.
pm2 info abstract-bot
pause
goto :end

:stop
echo.
echo [INFO] Stoppe Server...
pm2 stop abstract-bot
echo [OK] Server gestoppt!
pause
goto :end

:delete
echo.
echo [INFO] Entferne Server aus PM2...
pm2 delete abstract-bot
pm2 save
echo [OK] Server entfernt!
pause
goto :end

:logs
echo.
echo [INFO] Zeige Logs (STRG+C zum Beenden)...
echo.
pm2 logs abstract-bot
pause
goto :end

:end