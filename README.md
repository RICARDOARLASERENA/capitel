# 🏛️ Sistema de Gestión de Patentes Municipales - La Serena

## Versión 2.1 - Sistema Simplificado

---

## ✨ Cambios Realizados en esta Versión

### 🔴 Eliminaciones
- ✅ **Eliminado sistema OCR** de la primera fase
- ✅ Simplificada estructura de la hoja maestra

### 🟢 Mejoras Implementadas
- ✅ **Solo 3 campos de entrada** necesarios:
  - Nro_Registro_Manual (Columna A)
  - Nombre Solicitante (Columna B)
  - Email (Columna C)

- ✅ **Sistema OK → ENVIADO** implementado:
  - Escriba "OK" en columna D para marcar registros para envío
  - Automáticamente cambia a "ENVIADO" después del envío
  - Estados visuales con colores (verde para enviado, rojo para error)

---

## 📋 Estructura de la Hoja Maestra

```
┌─────────────────────┬──────────────────────┬────────────────────┬────────────────┐
│ Nro_Registro_Manual │ Nombre Solicitante   │ Email              │ Estado_Envio   │
│     (Columna A)     │     (Columna B)      │   (Columna C)      │  (Columna D)   │
├─────────────────────┼──────────────────────┼────────────────────┼────────────────┤
│ 2024-001            │ Juan Pérez           │ juan@example.com   │ OK             │
│ 2024-002            │ María González       │ maria@example.com  │ ENVIADO        │
│ 2024-003            │ Pedro López          │ pedro@example.com  │ ERROR          │
└─────────────────────┴──────────────────────┴────────────────────┴────────────────┘
```

---

## 🚀 Cómo Usar el Sistema

### 1️⃣ Instalación Inicial

1. Abra su Google Sheet
2. Vaya a **Extensiones > Apps Script**
3. Copie y pegue el código de `instalador-sistema-patentes.gs`
4. Ejecute la función: `instalarSistemaPatentes()`
5. Ingrese un código de activación válido
6. ¡Sistema instalado!

### 2️⃣ Configuración Post-Instalación

Abra la hoja **"ConfiguracionGlobal"** y configure:

| Parámetro | Qué configurar |
|-----------|----------------|
| `email_remitente` | Su email oficial (@municipalidad.cl) |
| `carpeta_principal_id` | ID de su carpeta de Google Drive |
| `form_id` | ID de su Google Form |

**¿Cómo obtener los IDs?**
- **Carpeta Drive**: Abra la carpeta en Drive, copie el ID de la URL
  - URL: `https://drive.google.com/drive/folders/AQUI_ESTA_EL_ID`
- **Formulario**: Abra su Google Form, copie el ID de la URL
  - URL: `https://docs.google.com/forms/d/e/AQUI_ESTA_EL_ID/viewform`

### 3️⃣ Uso Diario del Sistema

#### Enviar Formularios a Solicitantes

1. **Ingrese los datos** en la hoja "planilla maestra":
   - Columna A: Número de registro (ej: "2024-001")
   - Columna B: Nombre completo del solicitante
   - Columna C: Email del solicitante

2. **Marque para envío**:
   - En la columna D, escriba: `OK`

3. **Ejecute el envío**:
   - Menú: **🏛️ PATENTES LA SERENA → 📤 Enviar Formularios Pendientes**

4. **Sistema automático**:
   - ✅ Envía el email con el formulario
   - ✅ Cambia "OK" → "ENVIADO" (fondo verde)
   - ✅ Crea carpeta en Drive automáticamente
   - ✅ Registra en auditoría

#### Estados Posibles en Columna D

| Estado | Significado | Color |
|--------|-------------|-------|
| `OK` | Listo para enviar | Normal |
| `ENVIADO` | Enviado correctamente | Verde claro |
| `ERROR` | Error en el envío | Rojo claro |
| _(vacío)_ | Sin acción pendiente | Normal |

---

## 📧 Qué Recibe el Solicitante

El solicitante recibirá un email profesional con:
- Encabezado institucional
- Mensaje personalizado con su nombre y número de registro
- Botón de acceso directo al formulario
- Instrucciones claras
- Pie de página institucional

---

## 📊 Funciones del Menú

### 🏛️ PATENTES LA SERENA

- **📤 Enviar Formularios Pendientes**
  - Envía formularios a todos los registros marcados con "OK"

- **📊 Mostrar Estadísticas**
  - Muestra resumen de registros totales
  - Cuenta pendientes, enviados y errores

- **📖 Ayuda**
  - Muestra guía rápida de uso

---

## 🔍 Auditoría y Seguimiento

El sistema registra automáticamente en la hoja **"AUDITORIA"**:
- Fecha y hora de cada acción
- Usuario que realizó la acción
- Tipo de acción ejecutada
- Detalles relevantes

---

## ⚠️ Validaciones Implementadas

El sistema valida automáticamente:
- ✅ Formato de email correcto
- ✅ Campos no vacíos
- ✅ Duplicados (no reenvía si ya está ENVIADO)
- ✅ Errores de configuración

---

## 🛠️ Solución de Problemas

### Error: "Template de email no encontrado"
- **Solución**: Verifique que existe la hoja "EmailTemplate"
- Reinstale el sistema si es necesario

### Error: "Carpeta principal no configurada"
- **Solución**: Configure el `carpeta_principal_id` en ConfiguracionGlobal

### Error al enviar email
- **Solución**: Verifique que el `email_remitente` esté configurado correctamente
- Asegúrese de tener permisos en Gmail

### Formulario no llega al destinatario
- **Solución**: Verifique que el email en columna C sea correcto
- Revise la carpeta de SPAM del destinatario

---

## 📁 Estructura de Carpetas en Drive

Para cada registro, se crea automáticamente:

```
EXPEDIENTE_2024-001_Juan_Pérez/
├── DOCUMENTOS_SOLICITANTE/
└── DOCUMENTOS_MUNICIPALIDAD/
```

---

## 🔐 Seguridad

- ✅ Códigos de activación para instalación
- ✅ Marca de agua en propiedades del documento
- ✅ Auditoría completa de acciones
- ✅ Validación de emails
- ✅ Control de permisos de usuario

---

## 📝 Versiones

### Versión 2.1 (2024-11-24)
- ✅ Eliminado sistema OCR
- ✅ Simplificado a 3 campos de entrada
- ✅ Implementado sistema OK → ENVIADO
- ✅ Mejorada validación de emails
- ✅ Optimizado manejo de errores

### Versión 2.0 (2024-11-05)
- Sistema completo inicial
- Múltiples campos de entrada
- Sistema OCR incluido

---

## 📞 Soporte

Para consultas sobre el sistema:
- Revise la hoja **AUDITORIA** para diagnóstico
- Use la función **📊 Mostrar Estadísticas** para ver el estado
- Consulte la **📖 Ayuda** del menú

---

## 👨‍💻 Desarrollado por

**Sistema Municipal La Serena**
Versión: 2.1
Fecha: 2024-11-24

---

## 📄 Licencia

Este sistema es propiedad de la Municipalidad de La Serena.
Todos los derechos reservados © 2024
