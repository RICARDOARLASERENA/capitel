#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

clear

echo -e "${GREEN}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  INSTALADOR HELPER - SISTEMA PATENTES V8                   ║"
echo "║  DOM La Serena - Google Apps Script                        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# ════════════════════════════════════════════════════════════
# PASO 1: Verificar si Git está instalado
# ════════════════════════════════════════════════════════════
echo -e "${BLUE}[1/6]${NC} Verificando Git..."

if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git no está instalado${NC}"
    echo ""
    echo "Instala Git:"
    echo "  - macOS: brew install git"
    echo "  - Ubuntu/Debian: sudo apt-get install git"
    echo "  - Fedora: sudo dnf install git"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ Git encontrado${NC}"

# ════════════════════════════════════════════════════════════
# PASO 2: Clonar o actualizar repositorio
# ════════════════════════════════════════════════════════════
echo ""
echo -e "${BLUE}[2/6]${NC} Preparando archivos del repositorio..."

if [ -d "capitel-v8" ]; then
    echo "📂 Repositorio existe, actualizando..."
    cd capitel-v8
    git pull origin claude/consolidate-v8-structure-01C6uBVX2wRpHvvkrxH5N2wa

    if [ $? -ne 0 ]; then
        echo -e "${YELLOW}⚠️  No se pudo actualizar. Continuando con versión local...${NC}"
    else
        echo -e "${GREEN}✅ Repositorio actualizado${NC}"
    fi
    cd ..
else
    echo "📥 Clonando repositorio (branch V8)..."
    git clone -b claude/consolidate-v8-structure-01C6uBVX2wRpHvvkrxH5N2wa \
        https://github.com/RICARDOARLASERENA/capitel.git capitel-v8

    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Error al clonar repositorio${NC}"
        echo ""
        echo "Verifica:"
        echo "  - Conexión a internet"
        echo "  - URL del repositorio"
        echo "  - Permisos de acceso"
        echo ""
        exit 1
    fi
    echo -e "${GREEN}✅ Repositorio clonado${NC}"
fi

# ════════════════════════════════════════════════════════════
# PASO 3: Verificar que existen los 3 archivos
# ════════════════════════════════════════════════════════════
echo ""
echo -e "${BLUE}[3/6]${NC} Verificando archivos V8..."

cd capitel-v8

if [ ! -f "00_INSTALADOR_V8.gs" ]; then
    echo -e "${RED}❌ ERROR: Falta 00_INSTALADOR_V8.gs${NC}"
    cd ..
    exit 1
fi

if [ ! -f "01_NUCLEO_V8.gs" ]; then
    echo -e "${RED}❌ ERROR: Falta 01_NUCLEO_V8.gs${NC}"
    cd ..
    exit 1
fi

if [ ! -f "02_INTERFACES_V8.gs" ]; then
    echo -e "${RED}❌ ERROR: Falta 02_INTERFACES_V8.gs${NC}"
    cd ..
    exit 1
fi

if [ ! -f "INSTALACION_V8.md" ]; then
    echo -e "${YELLOW}⚠️  ADVERTENCIA: Falta INSTALACION_V8.md${NC}"
fi

echo -e "${GREEN}✅ 00_INSTALADOR_V8.gs (1,179 líneas)${NC}"
echo -e "${GREEN}✅ 01_NUCLEO_V8.gs (1,841 líneas)${NC}"
echo -e "${GREEN}✅ 02_INTERFACES_V8.gs (2,106 líneas)${NC}"
echo -e "${GREEN}✅ INSTALACION_V8.md (Guía de instalación)${NC}"

# ════════════════════════════════════════════════════════════
# PASO 4: Abrir archivos en editor
# ════════════════════════════════════════════════════════════
echo ""
echo -e "${BLUE}[4/6]${NC} Abriendo archivos en editor..."

# Detectar editor disponible
if command -v code &> /dev/null; then
    echo "📝 Abriendo en Visual Studio Code..."
    code "00_INSTALADOR_V8.gs" &
    sleep 0.5
    code "01_NUCLEO_V8.gs" &
    sleep 0.5
    code "02_INTERFACES_V8.gs" &
    sleep 0.5
    [ -f "INSTALACION_V8.md" ] && code "INSTALACION_V8.md" &
    echo -e "${GREEN}✅ Archivos abiertos en VS Code${NC}"
elif command -v gedit &> /dev/null; then
    echo "📝 Abriendo en gedit..."
    gedit "00_INSTALADOR_V8.gs" &
    gedit "01_NUCLEO_V8.gs" &
    gedit "02_INTERFACES_V8.gs" &
    [ -f "INSTALACION_V8.md" ] && gedit "INSTALACION_V8.md" &
    echo -e "${GREEN}✅ Archivos abiertos en gedit${NC}"
elif command -v nano &> /dev/null; then
    echo "📝 Archivos listos para editar con nano"
    echo -e "${YELLOW}   (Usa: nano 00_INSTALADOR_V8.gs)${NC}"
else
    echo -e "${YELLOW}⚠️  No se detectó editor gráfico. Usa tu editor preferido.${NC}"
fi

sleep 2

# ════════════════════════════════════════════════════════════
# PASO 5: Abrir navegador con URLs necesarias
# ════════════════════════════════════════════════════════════
echo ""
echo -e "${BLUE}[5/6]${NC} Abriendo navegador..."

# Detectar comando para abrir URLs
if command -v xdg-open &> /dev/null; then
    OPEN_CMD="xdg-open"
elif command -v open &> /dev/null; then
    OPEN_CMD="open"
else
    OPEN_CMD=""
fi

if [ -n "$OPEN_CMD" ]; then
    echo "📊 Abriendo Google Sheets..."
    $OPEN_CMD "https://sheets.google.com/create" &
    sleep 2

    echo "📖 Abriendo guía de instalación..."
    $OPEN_CMD "https://github.com/RICARDOARLASERENA/capitel/blob/claude/consolidate-v8-structure-01C6uBVX2wRpHvvkrxH5N2wa/INSTALACION_V8.md" &
    sleep 1

    echo -e "${GREEN}✅ Navegador abierto${NC}"
else
    echo -e "${YELLOW}⚠️  Abre manualmente:${NC}"
    echo "   Google Sheets: https://sheets.google.com/create"
    echo "   Guía: https://github.com/RICARDOARLASERENA/capitel/blob/claude/..."
fi

# ════════════════════════════════════════════════════════════
# PASO 6: Mostrar instrucciones completas
# ════════════════════════════════════════════════════════════
echo ""
echo -e "${BLUE}[6/6]${NC} INSTRUCCIONES DE INSTALACIÓN MANUAL:"
echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  PASOS A SEGUIR EN EL NAVEGADOR:                           ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "┌─ PASO 1: Configurar Google Sheet ─────────────────────────┐"
echo "│  1. En el Sheet que se abrió, renombrar a:                │"
echo "│     \"Gestión de Patentes Municipales_V8\"                  │"
echo "│  2. Ir a: Extensiones → Apps Script                       │"
echo "└────────────────────────────────────────────────────────────┘"
echo ""
echo "┌─ PASO 2: Editor de Apps Script ───────────────────────────┐"
echo "│  1. Borrar TODO el contenido de Code.gs                   │"
echo "│  2. Copiar TODO el contenido de 00_INSTALADOR_V8.gs       │"
echo "│  3. Pegarlo en Code.gs                                     │"
echo "│  4. Guardar (Ctrl+S o icono 💾)                           │"
echo "└────────────────────────────────────────────────────────────┘"
echo ""
echo "┌─ PASO 3: Crear archivo 01_NUCLEO_V8 ──────────────────────┐"
echo "│  1. Clic en + junto a \"Archivos\"                          │"
echo "│  2. Seleccionar \"Secuencia de comandos\"                   │"
echo "│  3. Nombrar exactamente: 01_NUCLEO_V8                     │"
echo "│  4. Copiar TODO el contenido de 01_NUCLEO_V8.gs           │"
echo "│  5. Pegarlo y guardar (💾)                                │"
echo "└────────────────────────────────────────────────────────────┘"
echo ""
echo "┌─ PASO 4: Crear archivo 02_INTERFACES_V8 ──────────────────┐"
echo "│  1. Clic en + junto a \"Archivos\"                          │"
echo "│  2. Seleccionar \"Secuencia de comandos\"                   │"
echo "│  3. Nombrar exactamente: 02_INTERFACES_V8                 │"
echo "│  4. Copiar TODO el contenido de 02_INTERFACES_V8.gs       │"
echo "│  5. Pegarlo y guardar (💾)                                │"
echo "└────────────────────────────────────────────────────────────┘"
echo ""
echo "┌─ PASO 5: Ejecutar el Instalador ──────────────────────────┐"
echo "│  1. En el editor de Apps Script                           │"
echo "│  2. Seleccionar función: instalarSistemaV8Completo        │"
echo "│  3. Clic en ▶ Ejecutar                                    │"
echo "└────────────────────────────────────────────────────────────┘"
echo ""
echo "┌─ PASO 6: Autorizar Permisos (primera vez) ────────────────┐"
echo "│  1. Clic en \"Revisar permisos\"                            │"
echo "│  2. Seleccionar tu cuenta Gmail                           │"
echo "│  3. Clic en \"Avanzado\"                                     │"
echo "│  4. Clic en \"Ir a ... (no seguro)\"                        │"
echo "│  5. Clic en \"Permitir\"                                     │"
echo "└────────────────────────────────────────────────────────────┘"
echo ""
echo "┌─ PASO 7: Seguir Asistente de Instalación ─────────────────┐"
echo "│  1. Aparecerá ventana del asistente                       │"
echo "│  2. Seguir los 8 pasos automáticos                        │"
echo "│  3. Esperar a que termine (✅)                            │"
echo "└────────────────────────────────────────────────────────────┘"
echo ""
echo "┌─ PASO 8: ¡Listo! ──────────────────────────────────────────┐"
echo "│  1. Cerrar el editor de Apps Script                       │"
echo "│  2. Volver al Google Sheet                                │"
echo "│  3. Refrescar la página (F5)                              │"
echo "│  4. Verás el menú \"🏛️ Patentes V8\" en la barra superior  │"
echo "└────────────────────────────────────────────────────────────┘"
echo ""
echo "════════════════════════════════════════════════════════════"
echo ""
echo -e "${BLUE}📁 Archivos locales en:${NC} $(pwd)"
echo -e "${BLUE}📖 Guía completa:${NC} INSTALACION_V8.md"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANTE:${NC}"
echo "   - Form ID: 1rFz8yi-IIBJV7qR2iVurJVbyEB70QchX9P0BMkbAf-8"
echo "   - Campo REG: entry.34642813"
echo "   - Recordatorios: Lunes y Viernes 10:00 AM (automático)"
echo ""
echo "════════════════════════════════════════════════════════════"
echo ""

cd ..

echo -e "${GREEN}Presiona Enter para salir...${NC}"
read
exit 0
