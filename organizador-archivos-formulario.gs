/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ORGANIZADOR DE ARCHIVOS DE FORMULARIO
 * Sistema de Patentes - La Serena
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * FUNCIÓN: Mover archivos de la carpeta de respuestas del formulario
 *          a las carpetas de expedientes correspondientes
 *
 * EJECUTA: Automáticamente a las 8:00 AM y 4:00 PM
 *
 * INSTALACIÓN:
 * 1. Crear nuevo Apps Script independiente
 * 2. Copiar este código
 * 3. Configurar las carpetas
 * 4. Programar triggers
 *
 * © 2024 - Autor: Sistema Municipal La Serena
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURACIÓN DEL ORGANIZADOR
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG_ORGANIZADOR = {
  // ID de la carpeta donde Google Forms deposita las respuestas
  CARPETA_RESPUESTAS_FORM: 'CONFIGURAR_ID_CARPETA_RESPUESTAS',

  // ID de la carpeta principal del sistema (donde están los expedientes)
  CARPETA_PRINCIPAL_SISTEMA: 'CONFIGURAR_ID_CARPETA_PRINCIPAL',

  // Nombre de la subcarpeta donde mover archivos
  SUBCARPETA_DESTINO: 'DOCUMENTOS_SOLICITANTE',

  // Patterns para identificar registros en nombres de archivo
  PATTERN_REGISTRO: /(\d{4}-\d{3})|(\d{4}_\d{3})|(\d{4}\s\d{3})/,

  // Email para notificaciones
  EMAIL_NOTIFICACIONES: 'unosinceasarniloky@gmail.com',

  // Activar logs detallados
  DEBUG_MODE: true
};

// ═══════════════════════════════════════════════════════════════════════════
// FUNCIÓN PRINCIPAL - ORGANIZAR ARCHIVOS
// ═══════════════════════════════════════════════════════════════════════════

function organizarArchivosFormulario() {
  console.log('🔄 INICIANDO ORGANIZACIÓN DE ARCHIVOS');
  console.log('⏰ Hora de ejecución: ' + new Date().toLocaleString());

  try {
    // Obtener carpetas
    const carpetaRespuestas = DriveApp.getFolderById(CONFIG_ORGANIZADOR.CARPETA_RESPUESTAS_FORM);
    const carpetaPrincipal = DriveApp.getFolderById(CONFIG_ORGANIZADOR.CARPETA_PRINCIPAL_SISTEMA);

    // Obtener archivos en carpeta de respuestas
    const archivos = carpetaRespuestas.getFiles();

    let archivosMovidos = 0;
    let archivosSinMatch = 0;
    let errores = 0;
    const reporteMovimientos = [];

    // Procesar cada archivo
    while (archivos.hasNext()) {
      const archivo = archivos.next();
      const nombreArchivo = archivo.getName();

      if (CONFIG_ORGANIZADOR.DEBUG_MODE) {
        console.log(`📄 Procesando: ${nombreArchivo}`);
      }

      try {
        // Extraer número de registro del nombre
        const registro = extraerNumeroRegistro(nombreArchivo);

        if (registro) {
          // Buscar carpeta de expediente
          const carpetaExpediente = buscarCarpetaExpediente(carpetaPrincipal, registro);

          if (carpetaExpediente) {
            // Mover archivo a subcarpeta de documentos
            const resultado = moverArchivoAExpediente(archivo, carpetaExpediente);

            if (resultado.exito) {
              archivosMovidos++;
              reporteMovimientos.push({
                archivo: nombreArchivo,
                registro: registro,
                destino: resultado.rutaDestino,
                timestamp: new Date()
              });

              if (CONFIG_ORGANIZADOR.DEBUG_MODE) {
                console.log(`✅ Movido: ${nombreArchivo} → ${resultado.rutaDestino}`);
              }
            } else {
              errores++;
              console.error(`❌ Error moviendo ${nombreArchivo}: ${resultado.error}`);
            }
          } else {
            archivosSinMatch++;
            console.warn(`⚠️ No se encontró expediente para registro: ${registro} (archivo: ${nombreArchivo})`);
          }
        } else {
          archivosSinMatch++;
          if (CONFIG_ORGANIZADOR.DEBUG_MODE) {
            console.warn(`⚠️ No se pudo extraer registro de: ${nombreArchivo}`);
          }
        }

      } catch (error) {
        errores++;
        console.error(`❌ Error procesando ${nombreArchivo}: ${error}`);
      }
    }

    // Generar reporte
    const reporte = generarReporte(archivosMovidos, archivosSinMatch, errores, reporteMovimientos);

    // Enviar notificación si hay actividad
    if (archivosMovidos > 0 || errores > 0) {
      enviarNotificacion(reporte);
    }

    console.log('✅ ORGANIZACIÓN COMPLETADA');
    console.log(`📊 Resumen: ${archivosMovidos} movidos, ${archivosSinMatch} sin match, ${errores} errores`);

    return reporte;

  } catch (error) {
    console.error('💥 ERROR CRÍTICO en organizarArchivosFormulario:', error);
    enviarNotificacionError(error);
    throw error;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// FUNCIONES DE PROCESAMIENTO
// ═══════════════════════════════════════════════════════════════════════════

function extraerNumeroRegistro(nombreArchivo) {
  /**
   * Extrae el número de registro del nombre del archivo
   * Busca patterns como: 2024-001, 2024_001, 2024 001
   */

  const match = nombreArchivo.match(CONFIG_ORGANIZADOR.PATTERN_REGISTRO);

  if (match) {
    // Normalizar formato (convertir a 2024-001)
    let registro = match[0];
    registro = registro.replace(/[_\s]/g, '-'); // Convertir _ y espacios a -

    if (CONFIG_ORGANIZADOR.DEBUG_MODE) {
      console.log(`🔍 Registro extraído: "${registro}" de "${nombreArchivo}"`);
    }

    return registro;
  }

  return null;
}

function buscarCarpetaExpediente(carpetaPrincipal, registro) {
  /**
   * Busca la carpeta del expediente que contenga el número de registro
   */

  const carpetas = carpetaPrincipal.getFolders();

  while (carpetas.hasNext()) {
    const carpeta = carpetas.next();
    const nombreCarpeta = carpeta.getName();

    // Buscar carpetas que contengan "EXPEDIENTE" y el registro
    if (nombreCarpeta.toUpperCase().includes('EXPEDIENTE') &&
        nombreCarpeta.includes(registro)) {

      if (CONFIG_ORGANIZADOR.DEBUG_MODE) {
        console.log(`📁 Carpeta encontrada: ${nombreCarpeta}`);
      }

      return carpeta;
    }
  }

  return null;
}

function moverArchivoAExpediente(archivo, carpetaExpediente) {
  /**
   * Mueve el archivo a la subcarpeta DOCUMENTOS_SOLICITANTE del expediente
   */

  try {
    // Buscar o crear subcarpeta DOCUMENTOS_SOLICITANTE
    let carpetaDocumentos = null;
    const subcarpetas = carpetaExpediente.getFolders();

    while (subcarpetas.hasNext()) {
      const subcarpeta = subcarpetas.next();
      if (subcarpeta.getName() === CONFIG_ORGANIZADOR.SUBCARPETA_DESTINO) {
        carpetaDocumentos = subcarpeta;
        break;
      }
    }

    // Si no existe, crearla
    if (!carpetaDocumentos) {
      carpetaDocumentos = carpetaExpediente.createFolder(CONFIG_ORGANIZADOR.SUBCARPETA_DESTINO);
      console.log(`📁 Subcarpeta creada: ${CONFIG_ORGANIZADOR.SUBCARPETA_DESTINO}`);
    }

    // Verificar si el archivo ya existe en destino
    const archivosExistentes = carpetaDocumentos.getFilesByName(archivo.getName());
    if (archivosExistentes.hasNext()) {
      // Archivo ya existe, agregar timestamp al nombre
      const extension = archivo.getName().split('.').pop();
      const nombreBase = archivo.getName().replace(`.${extension}`, '');
      const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), '_yyyyMMdd_HHmmss');
      const nuevoNombre = `${nombreBase}${timestamp}.${extension}`;

      archivo.setName(nuevoNombre);
    }

    // Mover archivo
    archivo.getParents().next().removeFile(archivo);
    carpetaDocumentos.addFile(archivo);

    const rutaDestino = `${carpetaExpediente.getName()}/${CONFIG_ORGANIZADOR.SUBCARPETA_DESTINO}`;

    return {
      exito: true,
      rutaDestino: rutaDestino
    };

  } catch (error) {
    return {
      exito: false,
      error: error.toString()
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// FUNCIONES DE REPORTE Y NOTIFICACIÓN
// ═══════════════════════════════════════════════════════════════════════════

function generarReporte(movidos, sinMatch, errores, movimientos) {
  const reporte = {
    timestamp: new Date(),
    resumen: {
      archivosMovidos: movidos,
      archivosSinMatch: sinMatch,
      errores: errores,
      total: movidos + sinMatch + errores
    },
    movimientos: movimientos
  };

  return reporte;
}

function enviarNotificacion(reporte) {
  const subject = `📁 Organizador de Archivos - ${reporte.resumen.archivosMovidos} archivos movidos`;

  let body = `
🏛️ SISTEMA DE PATENTES LA SERENA
Reporte de Organización de Archivos

⏰ Fecha y hora: ${reporte.timestamp.toLocaleString()}

📊 RESUMEN:
• Archivos movidos: ${reporte.resumen.archivosMovidos}
• Archivos sin match: ${reporte.resumen.archivosSinMatch}
• Errores: ${reporte.resumen.errores}
• Total procesados: ${reporte.resumen.total}

`;

  if (reporte.movimientos.length > 0) {
    body += `\n📄 ARCHIVOS MOVIDOS:\n`;
    reporte.movimientos.forEach(mov => {
      body += `• ${mov.archivo} → ${mov.destino}\n`;
    });
  }

  if (reporte.resumen.errores > 0) {
    body += `\n⚠️ Se registraron ${reporte.resumen.errores} errores. Revisar logs del sistema.\n`;
  }

  body += `\n---\nSistema automatizado de organización de archivos\n© 2024 - Sistema Municipal La Serena`;

  try {
    GmailApp.sendEmail(
      CONFIG_ORGANIZADOR.EMAIL_NOTIFICACIONES,
      subject,
      body
    );
  } catch (error) {
    console.error('Error enviando notificación:', error);
  }
}

function enviarNotificacionError(error) {
  const subject = `❌ Error en Organizador de Archivos`;
  const body = `
🏛️ SISTEMA DE PATENTES LA SERENA
ERROR EN ORGANIZADOR DE ARCHIVOS

⏰ Fecha y hora: ${new Date().toLocaleString()}

❌ Error: ${error.toString()}

Revisar configuración y permisos del sistema.

---
Sistema automatizado de organización de archivos
© 2024 - Sistema Municipal La Serena
`;

  try {
    GmailApp.sendEmail(
      CONFIG_ORGANIZADOR.EMAIL_NOTIFICACIONES,
      subject,
      body
    );
  } catch (emailError) {
    console.error('Error enviando notificación de error:', emailError);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// FUNCIONES DE CONFIGURACIÓN Y TRIGGERS
// ═══════════════════════════════════════════════════════════════════════════

function configurarTriggersOrganizador() {
  /**
   * Configura triggers para ejecutar automáticamente a las 8:00 AM y 4:00 PM
   */

  // Eliminar triggers existentes de este organizador
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'organizarArchivosFormulario') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Crear trigger para 8:00 AM
  ScriptApp.newTrigger('organizarArchivosFormulario')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();

  // Crear trigger para 4:00 PM (16:00)
  ScriptApp.newTrigger('organizarArchivosFormulario')
    .timeBased()
    .everyDays(1)
    .atHour(16)
    .create();

  console.log('✅ Triggers configurados: 8:00 AM y 4:00 PM diarios');

  return {
    exito: true,
    mensaje: 'Triggers configurados correctamente para 8:00 AM y 4:00 PM'
  };
}

function probarOrganizador() {
  /**
   * Función para probar el organizador manualmente
   */

  console.log('🧪 INICIANDO PRUEBA DEL ORGANIZADOR');

  // Activar modo debug
  CONFIG_ORGANIZADOR.DEBUG_MODE = true;

  // Ejecutar organización
  const resultado = organizarArchivosFormulario();

  console.log('🧪 PRUEBA COMPLETADA');
  console.log('Resultado:', resultado);

  return resultado;
}

function mostrarConfiguracion() {
  /**
   * Muestra la configuración actual
   */

  console.log('⚙️ CONFIGURACIÓN ACTUAL:');
  console.log('Carpeta respuestas:', CONFIG_ORGANIZADOR.CARPETA_RESPUESTAS_FORM);
  console.log('Carpeta principal:', CONFIG_ORGANIZADOR.CARPETA_PRINCIPAL_SISTEMA);
  console.log('Subcarpeta destino:', CONFIG_ORGANIZADOR.SUBCARPETA_DESTINO);
  console.log('Email notificaciones:', CONFIG_ORGANIZADOR.EMAIL_NOTIFICACIONES);
  console.log('Debug mode:', CONFIG_ORGANIZADOR.DEBUG_MODE);

  return CONFIG_ORGANIZADOR;
}

// ═══════════════════════════════════════════════════════════════════════════
// FUNCIONES DE INSTALACIÓN
// ═══════════════════════════════════════════════════════════════════════════

function instalarOrganizador() {
  /**
   * Instala y configura el organizador
   */

  console.log('📦 INSTALANDO ORGANIZADOR DE ARCHIVOS');

  try {
    // Verificar configuración
    if (CONFIG_ORGANIZADOR.CARPETA_RESPUESTAS_FORM === 'CONFIGURAR_ID_CARPETA_RESPUESTAS' ||
        CONFIG_ORGANIZADOR.CARPETA_PRINCIPAL_SISTEMA === 'CONFIGURAR_ID_CARPETA_PRINCIPAL') {

      throw new Error('⚠️ Configurar primero los IDs de las carpetas en CONFIG_ORGANIZADOR');
    }

    // Configurar triggers
    configurarTriggersOrganizador();

    // Ejecutar prueba inicial
    console.log('🧪 Ejecutando prueba inicial...');
    probarOrganizador();

    console.log('✅ ORGANIZADOR INSTALADO CORRECTAMENTE');

    return {
      exito: true,
      mensaje: 'Organizador instalado y configurado. Se ejecutará automáticamente a las 8:00 AM y 4:00 PM.'
    };

  } catch (error) {
    console.error('❌ Error instalando organizador:', error);
    return {
      exito: false,
      error: error.toString()
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// FUNCIONES DE UTILIDAD
// ═══════════════════════════════════════════════════════════════════════════

function listarArchivosEnCarpetaRespuestas() {
  /**
   * Lista archivos en la carpeta de respuestas para debugging
   */

  try {
    const carpeta = DriveApp.getFolderById(CONFIG_ORGANIZADOR.CARPETA_RESPUESTAS_FORM);
    const archivos = carpeta.getFiles();

    console.log('📄 ARCHIVOS EN CARPETA DE RESPUESTAS:');

    while (archivos.hasNext()) {
      const archivo = archivos.next();
      const registro = extraerNumeroRegistro(archivo.getName());
      console.log(`• ${archivo.getName()} → Registro: ${registro || 'NO ENCONTRADO'}`);
    }

  } catch (error) {
    console.error('Error listando archivos:', error);
  }
}

function listarCarpetasExpedientes() {
  /**
   * Lista carpetas de expedientes para debugging
   */

  try {
    const carpeta = DriveApp.getFolderById(CONFIG_ORGANIZADOR.CARPETA_PRINCIPAL_SISTEMA);
    const subcarpetas = carpeta.getFolders();

    console.log('📁 CARPETAS DE EXPEDIENTES:');

    while (subcarpetas.hasNext()) {
      const subcarpeta = subcarpetas.next();
      const nombre = subcarpeta.getName();

      if (nombre.toUpperCase().includes('EXPEDIENTE')) {
        console.log(`• ${nombre}`);
      }
    }

  } catch (error) {
    console.error('Error listando expedientes:', error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// FIN DEL ORGANIZADOR
// ═══════════════════════════════════════════════════════════════════════════

console.log('📦 Organizador de Archivos de Formulario cargado correctamente');
console.log('🔧 Para instalar, ejecuta: instalarOrganizador()');
console.log('🧪 Para probar, ejecuta: probarOrganizador()');
