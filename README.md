# 📊 Capitel - Google Drive/Sheets Integration

Integración segura con Google Drive y Google Sheets usando OAuth2.

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar credenciales

Sigue la guía completa en [SETUP.md](./SETUP.md) para:
- Crear un proyecto en Google Cloud Console
- Habilitar las APIs necesarias
- Descargar tus credenciales OAuth2
- Autenticarte con Google

### 3. Autenticarse

```bash
npm run auth
```

Esto abrirá el flujo de autenticación OAuth2 en tu navegador.

### 4. Leer Google Sheets

```bash
npm run read
```

Esto leerá y mostrará el contenido de tu Google Sheet configurada.

---

## 📁 Estructura del Proyecto

```
capitel/
├── src/
│   ├── authenticate.js    # Script de autenticación OAuth2
│   └── readSheet.js        # Script para leer Google Sheets
├── credentials.json        # Tus credenciales OAuth2 (no incluido)
├── token.json              # Token de acceso (generado automáticamente)
├── package.json
├── SETUP.md               # Guía detallada de configuración
└── README.md              # Este archivo
```

---

## 🔐 Seguridad

Los archivos sensibles están protegidos:
- `credentials.json` - Contiene tu Client ID y Secret
- `token.json` - Contiene tus tokens de acceso

**Ambos están en `.gitignore` y NUNCA deben ser compartidos o subidos a Git.**

---

## 🛠️ Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run auth` | Inicia el proceso de autenticación OAuth2 |
| `npm run read` | Lee y muestra el contenido de tu Google Sheet |

---

## 📚 Documentación

- **[SETUP.md](./SETUP.md)** - Guía completa de configuración paso a paso
- **[LICENSE](./LICENSE)** - Licencia del proyecto

---

## 🤝 Contribuir

Este proyecto está en desarrollo activo. Las contribuciones son bienvenidas!

---

## 📝 Licencia

Ver el archivo [LICENSE](./LICENSE) para más detalles.

---

## 🆘 Ayuda

Si encuentras problemas:
1. Revisa la sección de **Solución de Problemas** en [SETUP.md](./SETUP.md)
2. Verifica que seguiste todos los pasos de configuración
3. Asegúrate de que las APIs están habilitadas en Google Cloud Console

---

**¡Hecho con ❤️ para acceder a tus datos de Google Drive de forma segura!**
