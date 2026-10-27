@echo off
title AUREA — Joyeria & Accesorios
color 06

cd /d "%~dp0"

echo ============================================================
echo         AUREA -- JOYERIA & ACCESORIOS DE LUJO
echo ============================================================
echo  Iniciando tienda virtual en tu navegador...
echo ============================================================
echo.

:: 1. Intentar con Python si esta disponible
where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [+] Iniciando con Python HTTP Server en http://localhost:8080/
    start http://localhost:8080/
    python -m http.server 8080
    goto end
)

where py >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [+] Iniciando con Python Launcher en http://localhost:8080/
    start http://localhost:8080/
    py -m http.server 8080
    goto end
)

:: 2. Intentar con Node / npx si esta disponible
where npx >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [+] Iniciando con Node.js / serve en http://localhost:8080/
    start http://localhost:8080/
    npx serve . -l 8080
    goto end
)

:: 3. Usar el servidor nativo de PowerShell (sin dependencias externas)
echo [+] Iniciando servidor nativo de Windows (PowerShell)...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"

:end
pause
