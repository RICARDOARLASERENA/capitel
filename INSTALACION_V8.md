# 📋 INSTALACIÓN SISTEMA PATENTES V8

## Pasos de Instalación (10 pasos)

### 1. Crear Google Sheet
- Ve a https://sheets.google.com
- Clic en "Hoja de cálculo en blanco"
- Renombrar a: `Gestión de Patentes Municipales_V8`

### 2. Abrir Editor de Apps Script
- En el Sheet: **Extensiones** → **Apps Script**
- Se abre el editor de código

### 3. Eliminar código por defecto
- Borrar todo el contenido de `Code.gs`

### 4. Pegar 00_INSTALADOR_V8.gs
- Copiar TODO el contenido del archivo `00_INSTALADOR_V8.gs`
- Pegarlo en `Code.gs`
- Clic en "Guardar proyecto" (💾)

### 5. Crear archivo 01_NUCLEO_V8
- Clic en **+** junto a "Archivos"
- Seleccionar **Secuencia de comandos**
- Nombrar: `01_NUCLEO_V8`
- Copiar TODO el contenido del archivo `01_NUCLEO_V8.gs`
- Pegar y guardar (💾)

### 6. Crear archivo 02_INTERFACES_V8
- Clic en **+** junto a "Archivos"
- Seleccionar **Secuencia de comandos**
- Nombrar: `02_INTERFACES_V8`
- Copiar TODO el contenido del archivo `02_INTERFACES_V8.gs`
- Pegar y guardar (💾)

### 7. Ejecutar instalador
- En el editor, seleccionar función: `instalarSistemaV8Completo`
- Clic en **▶ Ejecutar**

### 8. Autorizar permisos (primera vez)
- Clic en **Revisar permisos**
- Seleccionar tu cuenta Gmail
- Clic en **Avanzado** → **Ir a ... (no seguro)**
- Clic en **Permitir**

### 9. Seguir pasos del instalador
- Aparecerá ventana del asistente
- Clic en **Iniciar Instalación**
- Seguir los 8 pasos automáticos
- Esperar a que termine (aparece ✅)

### 10. ¡Listo!
- Cierra el editor de Apps Script
- Vuelve al Sheet
- Refresca la página (F5)
- Verás el menú **🏛️ Patentes V8** en la barra superior

---

## 📌 Notas Importantes

**Archivos a descargar del repositorio:**
- `00_INSTALADOR_V8.gs` (1,179 líneas)
- `01_NUCLEO_V8.gs` (1,841 líneas)
- `02_INTERFACES_V8.gs` (2,106 líneas)

**Configuración del Form:**
- Después de instalar, vincular tu Google Form
- ID del form: `1rFz8yi-IIBJV7qR2iVurJVbyEB70QchX9P0BMkbAf-8`
- Campo REG: `entry.34642813`

**Triggers automáticos:**
- Recordatorios: Lunes y Viernes 10:00 AM
- Se configuran automáticamente en Paso 7 del instalador

**Primer uso:**
- Ir al menú: **🏛️ Patentes V8** → **Dashboard**
- Agregar usuarios con REG, Nombre, Email
- Enviar formularios
- ¡Todo funciona!

---

## 🆘 Problemas Comunes

**"No veo el menú Patentes V8"**
→ Refresca la página (F5) y espera 5 segundos

**"Error de permisos"**
→ Repetir Paso 8, asegurar que permites todos los accesos

**"No encuentra hojas"**
→ Ejecutar de nuevo el instalador: **Configuración** → **Reinstalar Sistema Completo**

---

## 📱 Acceso Móvil

Desde el menú **🏛️ Patentes V8**:
- Clic en módulo **WebApp Móvil**
- Escanear QR con iPad/Android
- ¡Inspecciones en terreno!
