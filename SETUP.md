# 🔐 Configuración de Autenticación con Google Drive/Sheets

Esta guía te ayudará a configurar el acceso a Google Drive y Google Sheets usando OAuth2.

## 📋 Requisitos Previos

- Una cuenta de Google
- Node.js instalado (ya lo tienes ✓)
- 10-15 minutos para completar la configuración

---

## 🚀 Paso 1: Crear Proyecto en Google Cloud Console

### 1.1 Accede a Google Cloud Console

Ve a: [https://console.cloud.google.com](https://console.cloud.google.com)

### 1.2 Crear un nuevo proyecto

1. Haz clic en el selector de proyectos (arriba, junto a "Google Cloud")
2. Clic en **"Nuevo Proyecto"** (o "New Project")
3. Nombre del proyecto: `Capitel Drive Access` (o el que prefieras)
4. Haz clic en **"Crear"**
5. Espera unos segundos y selecciona el proyecto recién creado

---

## 🔌 Paso 2: Habilitar las APIs Necesarias

### 2.1 Habilitar Google Sheets API

1. En el menú lateral, ve a **"APIs y servicios"** → **"Biblioteca"** (o "APIs & Services" → "Library")
2. Busca: `Google Sheets API`
3. Haz clic en el resultado
4. Clic en **"Habilitar"** (o "Enable")

### 2.2 Habilitar Google Drive API

1. Regresa a la Biblioteca (clic en "Biblioteca" en el menú lateral)
2. Busca: `Google Drive API`
3. Haz clic en el resultado
4. Clic en **"Habilitar"** (o "Enable")

---

## 🎫 Paso 3: Configurar Pantalla de Consentimiento OAuth

### 3.1 Crear pantalla de consentimiento

1. Ve a **"APIs y servicios"** → **"Pantalla de consentimiento de OAuth"** (o "OAuth consent screen")
2. Selecciona **"Externo"** (External)
3. Haz clic en **"Crear"**

### 3.2 Completar información de la aplicación

**Información de la aplicación:**
- Nombre de la aplicación: `Capitel Drive Access`
- Correo electrónico de asistencia: tu correo
- Logo de la aplicación: (opcional, déjalo vacío)

**Información de contacto del desarrollador:**
- Tu correo electrónico

4. Haz clic en **"Guardar y continuar"**

### 3.3 Configurar scopes (permisos)

1. Haz clic en **"Agregar o quitar scopes"** (Add or Remove Scopes)
2. En el cuadro de búsqueda, busca y selecciona:
   - `Google Sheets API` → `.../auth/spreadsheets.readonly`
   - `Google Drive API` → `.../auth/drive.readonly`
3. Haz clic en **"Actualizar"** (Update)
4. Haz clic en **"Guardar y continuar"**

### 3.4 Agregar usuarios de prueba

1. Haz clic en **"Agregar usuarios"** (Add Users)
2. Ingresa tu correo electrónico (el que usarás para acceder)
3. Haz clic en **"Agregar"**
4. Haz clic en **"Guardar y continuar"**

5. Revisa el resumen y haz clic en **"Volver al panel"**

---

## 🔑 Paso 4: Crear Credenciales OAuth 2.0

### 4.1 Crear credenciales

1. Ve a **"APIs y servicios"** → **"Credenciales"** (Credentials)
2. Haz clic en **"+ Crear credenciales"** (+ Create Credentials)
3. Selecciona **"ID de cliente de OAuth"** (OAuth client ID)

### 4.2 Configurar el cliente OAuth

1. Tipo de aplicación: Selecciona **"Aplicación de escritorio"** (Desktop app)
2. Nombre: `Capitel Desktop Client`
3. Haz clic en **"Crear"**

### 4.3 Descargar credenciales

1. Verás un diálogo con tu Client ID y Client Secret
2. Haz clic en **"Descargar JSON"** (Download JSON)
3. **MUY IMPORTANTE:** Renombra el archivo descargado a exactamente: `credentials.json`
4. Mueve el archivo `credentials.json` a la raíz de este proyecto (carpeta `/home/user/capitel/`)

---

## ✅ Paso 5: Autenticarse con Google

### 5.1 Verificar que tienes el archivo credentials.json

```bash
ls -la credentials.json
```

Si no lo ves, asegúrate de haberlo copiado al directorio correcto.

### 5.2 Ejecutar el script de autenticación

```bash
npm run auth
```

### 5.3 Completar el flujo OAuth

1. El script mostrará una URL
2. Copia y pega la URL en tu navegador
3. Inicia sesión con tu cuenta de Google (la que agregaste como usuario de prueba)
4. **IMPORTANTE:** Verás una advertencia "Google hasn't verified this app" - esto es normal
   - Haz clic en **"Avanzado"** (Advanced)
   - Haz clic en **"Ir a Capitel Drive Access (unsafe)"** (Go to Capitel Drive Access - unsafe)
5. Revisa los permisos y haz clic en **"Continuar"** o **"Permitir"**
6. Google te mostrará un código
7. Copia el código
8. Regresa a la terminal y pega el código
9. Presiona Enter

### 5.4 ¡Listo!

Si todo salió bien, verás:
```
✅ Token guardado exitosamente en token.json
🎉 ¡Autenticación completada!
```

---

## 📊 Paso 6: Leer tu Google Sheet

Ahora puedes ejecutar:

```bash
npm run read
```

Esto leerá la hoja de cálculo y mostrará su contenido en la terminal.

---

## 🔒 Seguridad

**Archivos sensibles que NUNCA debes compartir:**
- `credentials.json` - Contiene tu Client ID y Client Secret
- `token.json` - Contiene tus tokens de acceso

Estos archivos ya están en `.gitignore` para evitar que se suban a Git accidentalmente.

---

## 🛠️ Solución de Problemas

### Error: "credentials.json no encontrado"
- Asegúrate de haber descargado y renombrado el archivo correctamente
- Verifica que esté en `/home/user/capitel/credentials.json`

### Error: "Acceso denegado" (403)
- Asegúrate de que tu correo esté agregado como usuario de prueba
- Verifica que habilitaste las APIs correctamente
- Intenta ejecutar `npm run auth` de nuevo

### Error: "invalid_grant"
- Tu token puede haber expirado
- Elimina `token.json` y ejecuta `npm run auth` de nuevo

### La hoja de cálculo no se puede leer
- Verifica que la URL del spreadsheet sea correcta en `src/readSheet.js`
- Asegúrate de tener acceso a la hoja con tu cuenta de Google

---

## 📚 Referencias

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Drive API Documentation](https://developers.google.com/drive/api)
- [OAuth 2.0 for Desktop Apps](https://developers.google.com/identity/protocols/oauth2/native-app)

---

## 🎉 ¡Felicidades!

Ya tienes todo configurado para acceder a Google Drive y Sheets de forma segura. Si tienes algún problema, revisa la sección de solución de problemas o crea un issue.
