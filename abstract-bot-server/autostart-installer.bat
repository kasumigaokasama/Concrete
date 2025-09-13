@echo off
title Abstract Bot Autostart Installer
color 0E
cd /d "%~dp0"

:: Administratorrechte prüfen
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ========================================
    echo    ADMINISTRATOR-RECHTE ERFORDERLICH
    echo ========================================
    echo.
    echo Dieses Script benoetigt Administrator-Rechte.
    echo Rechtsklick auf die Datei und "Als Administrator ausfuehren"
    echo.
    pause
    exit /b 1
)

echo ========================================
echo    ABSTRACT BOT AUTOSTART INSTALLER
echo ========================================
echo.
echo Waehle eine Installationsmethode:
echo.
echo [1] Task Scheduler (Empfohlen - Startet versteckt)
echo [2] Autostart Ordner (Einfach - Zeigt CMD Fenster)
echo [3] Registry (Fortgeschritten - Startet sehr frueh)
echo [4] Autostart entfernen
echo [0] Abbrechen
echo.
set /p choice="Deine Wahl (0-4): "

if "%choice%"=="0" goto :end
if "%choice%"=="1" goto :taskscheduler
if "%choice%"=="2" goto :startup
if "%choice%"=="3" goto :registry
if "%choice%"=="4" goto :remove
goto :invalid

:taskscheduler
echo.
echo [INFO] Installiere via Task Scheduler...

:: Erstelle VBS Wrapper für versteckten Start
echo Set WshShell = CreateObject("WScript.Shell") > "%~dp0start-hidden.vbs"
echo WshShell.Run """%~dp0start-server.bat""", 0 >> "%~dp0start-hidden.vbs"
echo Set WshShell = Nothing >> "%~dp0start-hidden.vbs"

:: Erstelle Task
schtasks /create /tn "AbstractBotServer" /tr "\"%~dp0start-hidden.vbs\"" /sc onlogon /rl highest /f >nul 2>&1

if %errorlevel% equ 0 (
    echo [OK] Task erfolgreich erstellt!
    echo.
    echo Der Server startet automatisch beim naechsten Login.
    echo.
    echo Moechtest du den Server jetzt starten? (J/N)
    set /p startnow=
    if /i "%startnow%"=="J" (
        schtasks /run /tn "AbstractBotServer"
        echo [OK] Server gestartet!
    )
) else (
    echo [FEHLER] Task konnte nicht erstellt werden!
)
goto :end

:startup
echo.
echo [INFO] Installiere im Autostart-Ordner...

:: Hole Autostart-Pfad
for /f "tokens=2*" %%a in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders" /v Startup 2^>nul ^| find "Startup"') do set "startupfolder=%%b"

:: Erstelle Verknüpfung
powershell -Command "$WshShell = New-Object -comObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%startupfolder%\Abstract Bot Server.lnk'); $Shortcut.TargetPath = '%~dp0start-server.bat'; $Shortcut.WorkingDirectory = '%~dp0'; $Shortcut.IconLocation = 'cmd.exe'; $Shortcut.Save()"

if exist "%startupfolder%\Abstract Bot Server.lnk" (
    echo [OK] Verknuepfung erfolgreich erstellt!
    echo.
    echo Speicherort: %startupfolder%
) else (
    echo [FEHLER] Verknuepfung konnte nicht erstellt werden!
)
goto :end

:registry
echo.
echo [INFO] Installiere in Registry...
echo [WARNUNG] Diese Methode startet sehr frueh beim Systemstart!
echo.
echo Fortfahren? (J/N)
set /p confirm=
if /i not "%confirm%"=="J" goto :end

:: Füge zu Registry hinzu
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v "AbstractBotServer" /t REG_SZ /d "\"%~dp0start-server.bat\"" /f >nul 2>&1

if %errorlevel% equ 0 (
    echo [OK] Registry-Eintrag erfolgreich erstellt!
) else (
    echo [FEHLER] Registry-Eintrag konnte nicht erstellt werden!
)
goto :end

:remove
echo.
echo [INFO] Entferne Autostart...

:: Entferne Task
schtasks /delete /tn "AbstractBotServer" /f >nul 2>&1
if %errorlevel% equ 0 echo [OK] Task entfernt

:: Entferne Autostart-Verknüpfung
for /f "tokens=2*" %%a in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders" /v Startup 2^>nul ^| find "Startup"') do set "startupfolder=%%b"
if exist "%startupfolder%\Abstract Bot Server.lnk" (
    del "%startupfolder%\Abstract Bot Server.lnk"
    echo [OK] Autostart-Verknuepfung entfernt
)

:: Entferne Registry-Eintrag
reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v "AbstractBotServer" /f >nul 2>&1
if %errorlevel% equ 0 echo [OK] Registry-Eintrag entfernt

:: Entferne VBS Datei
if exist "%~dp0start-hidden.vbs" (
    del "%~dp0start-hidden.vbs"
    echo [OK] Helper-Dateien entfernt
)

echo.
echo [INFO] Alle Autostart-Eintraege wurden entfernt!
goto :end

:invalid
echo.
echo [FEHLER] Ungueltige Auswahl!
goto :end

:end
echo.
echo ========================================
pause