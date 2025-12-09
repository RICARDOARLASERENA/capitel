@echo off
chcp 65001 >nul
color 0A
title Instalador Helper - Sistema Patentes V8

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  INSTALADOR HELPER - SISTEMA PATENTES V8                   ║
echo ║  DOM La Serena - Google Apps Script                        ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM ════════════════════════════════════════════════════════════
REM PASO 1: Verificar si Git está instalado
REM ════════════════════════════════════════════════════════════
echo [1/6] Verificando Git...
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Git no está instalado
    echo.
    echo Descarga Git desde: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)
echo ✅ Git encontrado

REM ════════════════════════════════════════════════════════════
REM PASO 2: Clonar o actualizar repositorio
REM ════════════════════════════════════════════════════════════
echo.
echo [2/6] Preparando archivos del repositorio...

if exist "capitel-v8" (
    echo 📂 Repositorio existe, actualizando...
    cd capitel-v8
    git pull origin claude/consolidate-v8-structure-01C6uBVX2wRpHvvkrxH5N2wa
    if %ERRORLEVEL% NEQ 0 (
        echo ⚠️  No se pudo actualizar. Continuando con versión local...
    ) else (
        echo ✅ Repositorio actualizado
    )
    cd ..
) else (
    echo 📥 Clonando repositorio (branch V8)...
    git clone -b claude/consolidate-v8-structure-01C6uBVX2wRpHvvkrxH5N2wa https://github.com/RICARDOARLASERENA/capitel.git capitel-v8

    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Error al clonar repositorio
        echo.
        echo Verifica:
        echo - Conexión a internet
        echo - URL del repositorio
        echo - Permisos de acceso
        echo.
        pause
        exit /b 1
    )
    echo ✅ Repositorio clonado
)

REM ════════════════════════════════════════════════════════════
REM PASO 3: Verificar que existen los 3 archivos
REM ════════════════════════════════════════════════════════════
echo.
echo [3/6] Verificando archivos V8...

cd capitel-v8

if not exist "00_INSTALADOR_V8.gs" (
    echo ❌ ERROR: Falta 00_INSTALADOR_V8.gs
    cd ..
    pause
    exit /b 1
)
if not exist "01_NUCLEO_V8.gs" (
    echo ❌ ERROR: Falta 01_NUCLEO_V8.gs
    cd ..
    pause
    exit /b 1
)
if not exist "02_INTERFACES_V8.gs" (
    echo ❌ ERROR: Falta 02_INTERFACES_V8.gs
    cd ..
    pause
    exit /b 1
)
if not exist "INSTALACION_V8.md" (
    echo ⚠️  ADVERTENCIA: Falta INSTALACION_V8.md
)

echo ✅ 00_INSTALADOR_V8.gs (1,179 líneas)
echo ✅ 01_NUCLEO_V8.gs (1,841 líneas)
echo ✅ 02_INTERFACES_V8.gs (2,106 líneas)
echo ✅ INSTALACION_V8.md (Guía de instalación)

REM ════════════════════════════════════════════════════════════
REM PASO 4: Abrir archivos en editor
REM ════════════════════════════════════════════════════════════
echo.
echo [4/6] Abriendo archivos en editor...

REM Detectar editor disponible (VS Code prioritario)
where code >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo 📝 Abriendo en Visual Studio Code...
    start code "00_INSTALADOR_V8.gs"
    timeout /t 1 >nul
    start code "01_NUCLEO_V8.gs"
    timeout /t 1 >nul
    start code "02_INTERFACES_V8.gs"
    timeout /t 1 >nul
    if exist "INSTALACION_V8.md" (
        start code "INSTALACION_V8.md"
    )
    echo ✅ Archivos abiertos en VS Code
) else (
    echo 📝 Abriendo en Notepad...
    start notepad "00_INSTALADOR_V8.gs"
    timeout /t 1 >nul
    start notepad "01_NUCLEO_V8.gs"
    timeout /t 1 >nul
    start notepad "02_INTERFACES_V8.gs"
    timeout /t 1 >nul
    if exist "INSTALACION_V8.md" (
        start notepad "INSTALACION_V8.md"
    )
    echo ✅ Archivos abiertos en Notepad
)

timeout /t 2 >nul

REM ════════════════════════════════════════════════════════════
REM PASO 5: Abrir navegador con URLs necesarias
REM ════════════════════════════════════════════════════════════
echo.
echo [5/6] Abriendo navegador...

REM Crear nuevo Google Sheet
echo 📊 Abriendo Google Sheets...
start "" "https://sheets.google.com/create"
timeout /t 2 >nul

REM Abrir guía de instalación en GitHub
echo 📖 Abriendo guía de instalación...
start "" "https://github.com/RICARDOARLASERENA/capitel/blob/claude/consolidate-v8-structure-01C6uBVX2wRpHvvkrxH5N2wa/INSTALACION_V8.md"
timeout /t 1 >nul

echo ✅ Navegador abierto

REM ════════════════════════════════════════════════════════════
REM PASO 6: Mostrar instrucciones completas
REM ════════════════════════════════════════════════════════════
echo.
echo [6/6] INSTRUCCIONES DE INSTALACIÓN MANUAL:
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  PASOS A SEGUIR EN EL NAVEGADOR:                           ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo ┌─ PASO 1: Configurar Google Sheet ─────────────────────────┐
echo │  1. En el Sheet que se abrió, renombrar a:                │
echo │     "Gestión de Patentes Municipales_V8"                  │
echo │  2. Ir a: Extensiones → Apps Script                       │
echo └────────────────────────────────────────────────────────────┘
echo.
echo ┌─ PASO 2: Editor de Apps Script ───────────────────────────┐
echo │  1. Borrar TODO el contenido de Code.gs                   │
echo │  2. Copiar TODO el contenido de 00_INSTALADOR_V8.gs       │
echo │  3. Pegarlo en Code.gs                                     │
echo │  4. Guardar (Ctrl+S o icono 💾)                           │
echo └────────────────────────────────────────────────────────────┘
echo.
echo ┌─ PASO 3: Crear archivo 01_NUCLEO_V8 ──────────────────────┐
echo │  1. Clic en + junto a "Archivos"                          │
echo │  2. Seleccionar "Secuencia de comandos"                   │
echo │  3. Nombrar exactamente: 01_NUCLEO_V8                     │
echo │  4. Copiar TODO el contenido de 01_NUCLEO_V8.gs           │
echo │  5. Pegarlo y guardar (💾)                                │
echo └────────────────────────────────────────────────────────────┘
echo.
echo ┌─ PASO 4: Crear archivo 02_INTERFACES_V8 ──────────────────┐
echo │  1. Clic en + junto a "Archivos"                          │
echo │  2. Seleccionar "Secuencia de comandos"                   │
echo │  3. Nombrar exactamente: 02_INTERFACES_V8                 │
echo │  4. Copiar TODO el contenido de 02_INTERFACES_V8.gs       │
echo │  5. Pegarlo y guardar (💾)                                │
echo └────────────────────────────────────────────────────────────┘
echo.
echo ┌─ PASO 5: Ejecutar el Instalador ──────────────────────────┐
echo │  1. En el editor de Apps Script                           │
echo │  2. Seleccionar función: instalarSistemaV8Completo        │
echo │  3. Clic en ▶ Ejecutar                                    │
echo └────────────────────────────────────────────────────────────┘
echo.
echo ┌─ PASO 6: Autorizar Permisos (primera vez) ────────────────┐
echo │  1. Clic en "Revisar permisos"                            │
echo │  2. Seleccionar tu cuenta Gmail                           │
echo │  3. Clic en "Avanzado"                                     │
echo │  4. Clic en "Ir a ... (no seguro)"                        │
echo │  5. Clic en "Permitir"                                     │
echo └────────────────────────────────────────────────────────────┘
echo.
echo ┌─ PASO 7: Seguir Asistente de Instalación ─────────────────┐
echo │  1. Aparecerá ventana del asistente                       │
echo │  2. Seguir los 8 pasos automáticos                        │
echo │  3. Esperar a que termine (✅)                            │
echo └────────────────────────────────────────────────────────────┘
echo.
echo ┌─ PASO 8: ¡Listo! ──────────────────────────────────────────┐
echo │  1. Cerrar el editor de Apps Script                       │
echo │  2. Volver al Google Sheet                                │
echo │  3. Refrescar la página (F5)                              │
echo │  4. Verás el menú "🏛️ Patentes V8" en la barra superior  │
echo └────────────────────────────────────────────────────────────┘
echo.
echo ════════════════════════════════════════════════════════════
echo.
echo 📁 Archivos locales en: %CD%
echo 📖 Guía completa: INSTALACION_V8.md
echo.
echo ⚠️  IMPORTANTE:
echo    - Form ID: 1rFz8yi-IIBJV7qR2iVurJVbyEB70QchX9P0BMkbAf-8
echo    - Campo REG: entry.34642813
echo    - Recordatorios: Lunes y Viernes 10:00 AM (automático)
echo.
echo ════════════════════════════════════════════════════════════
echo.

cd ..

echo Presiona cualquier tecla para salir...
pause >nul
exit /b 0
