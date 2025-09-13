@echo off
title Abstract Bot Server
color 0A

:: Setze Arbeitsverzeichnis
cd /d "%~dp0"

:: Erstelle Logs Ordner
if not exist "logs" mkdir logs

:: Setze Log-Datei
set "logfile=logs\server_%date:~-4%%date:~-10,2%%date:~-7,2%.log"

echo ======================================== >> "%logfile%"
echo    SERVER START: %date% %time% >> "%logfile%"
echo ======================================== >> "%logfile%"

:: Prüfe ob bereits läuft
tasklist /FI "WINDOWTITLE eq Abstract Bot Server" 2>NUL | find /I /N "cmd.exe" >NUL
if %errorlevel% equ 0 (
    echo [WARNUNG] Server laeuft bereits! >> "%logfile%"
    echo [WARNUNG] Server laeuft bereits!
    timeout /t 5
    exit /b 0
)

echo ========================================
echo    ABSTRACT BOT SERVER
echo ========================================
echo.
echo [INFO] Log-Datei: %logfile%
echo.

:: Prüfe ob Node.js installiert ist
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [FEHLER] Node.js ist nicht installiert! >> "%logfile%"
    echo [FEHLER] Node.js ist nicht installiert!
    echo Bitte installiere Node.js von https://nodejs.org/
    pause
    exit /b 1
)

:: Zeige Node.js Version
for /f "tokens=*" %%i in ('node --version') do set nodeversion=%%i
echo [INFO] Node.js Version: %nodeversion% >> "%logfile%"
echo [INFO] Node.js Version: %nodeversion%
echo.

:: Prüfe ob package.json existiert
if not exist "package.json" (
    echo [WARNUNG] package.json nicht gefunden! >> "%logfile%"
    echo [WARNUNG] package.json nicht gefunden!
    echo Erstelle package.json...
    (
        echo {
        echo   "name": "abstract-bot-server",
        echo   "version": "1.0.0",
        echo   "main": "server.js",
        echo   "scripts": {
        echo     "start": "node server.js"
        echo   },
        echo   "dependencies": {
        echo     "express": "^4.18.2",
        echo     "cors": "^2.8.5"
        echo   }
        echo }
    ) > package.json
)

:: Prüfe ob node_modules existiert
if not exist "node_modules" (
    echo [INFO] Installiere Dependencies... >> "%logfile%"
    echo [INFO] Installiere Dependencies...
    call npm install >> "%logfile%" 2>&1
    echo.
)

:: Prüfe ob server.js existiert
if not exist "server.js" (
    echo [FEHLER] server.js nicht gefunden! >> "%logfile%"
    echo [FEHLER] server.js nicht gefunden!
    echo Bitte stelle sicher, dass server.js im Ordner ist.
    pause
    exit /b 1
)

:: Starte den Server
echo [INFO] Starte Server auf http://localhost:3000 >> "%logfile%"
echo [INFO] Starte Server auf http://localhost:3000
echo [INFO] Druecke STRG+C zum Beenden
echo ========================================
echo.

:: Server mit Fehlerbehandlung starten
:serverloop
node server.js >> "%logfile%" 2>&1
set exitcode=%errorlevel%

:: Log den Exit Code
echo. >> "%logfile%"
echo [WARNUNG] Server beendet mit Code: %exitcode% >> "%logfile%"
echo [WARNUNG] Server beendet mit Code: %exitcode%

:: Bei Fehler automatisch neustarten
if %exitcode% neq 0 (
    echo [INFO] Starte Server in 5 Sekunden neu... >> "%logfile%"
    echo [INFO] Starte Server in 5 Sekunden neu...
    timeout /t 5 /nobreak
    goto serverloop
)

:: Normales Beenden
echo.
echo [INFO] Server wurde normal beendet. >> "%logfile%"
echo [INFO] Server wurde normal beendet.
pause