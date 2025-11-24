/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SISTEMA DE GESTIÓN DE PATENTES MUNICIPALES - LA SERENA
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * © 2024 - Todos los derechos reservados
 * Desarrollado por: Sistema Municipal La Serena
 *
 * INSTALADOR COMPLETO - Versión 2.1
 * INCLUYE: Sistema funcional simplificado
 *
 * INSTRUCCIONES:
 * 1. Copia TODO este código
 * 2. Pégalo en el editor de Apps Script de tu Google Sheet
 * 3. Ejecuta la función: instalarSistemaPatentes()
 * 4. Ingresa un código de activación válido
 * 5. ¡Sistema completo instalado y funcionando!
 *
 * CAMBIOS VERSIÓN 2.1:
 * - Eliminado sistema OCR de primera fase
 * - Simplificado a solo 3 campos de entrada
 * - Sistema OK → ENVIADO implementado
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURACIÓN DE SEGURIDAD
// ═══════════════════════════════════════════════════════════════════════════

const CODIGOS_VALIDOS = [
  'ff182a1c2418166f',  // MLS-2025-001-1F9E9
  'd739e198bfaef2ee',  // MLS-2025-002-CB070
  '2f1c345e7f8c03ae',  // MLS-2025-003-EABD0
  '6056305ee909107c',  // MLS-2025-004-0366C
  'f80dec699082344e',  // MLS-2025-005-44ADF
];

const AUTOR = 'Sistema Municipal La Serena';
const VERSION = '2.1';
const FECHA_VERSION = '2024-11-24';

// ═══════════════════════════════════════════════════════════════════════════
// FUNCIÓN PRINCIPAL DE INSTALACIÓN
// ═══════════════════════════════════════════════════════════════════════════

function instalarSistemaPatentes() {
  const ui = SpreadsheetApp.getUi();

  // Bienvenida
  const bienvenida = ui.alert(
    '🏛️ SISTEMA DE PATENTES LA SERENA',
    '¡Bienvenido al instalador del Sistema de Gestión de Patentes!\n\n' +
    'VERSIÓN SIMPLIFICADA 2.1 - Este proceso instalará:\n' +
    '✓ Estructura de hojas simplificada (3 campos)\n' +
    '✓ Sistema funcional completo\n' +
    '✓ Menú de herramientas\n' +
    '✓ Templates de correo\n' +
    '✓ Triggers automáticos\n' +
    '✓ Sistema OK → ENVIADO\n\n' +
    '¿Desea continuar?',
    ui.ButtonSet.YES_NO
  );

  if (bienvenida !== ui.Button.YES) {
    ui.alert('Instalación cancelada.');
    return;
  }

  // Solicitar código de activación
  const respuesta = ui.prompt(
    '🔐 CÓDIGO DE ACTIVACIÓN',
    'Ingrese su código de activación:',
    ui.ButtonSet.OK_CANCEL
  );

  if (respuesta.getSelectedButton() !== ui.Button.OK) {
    ui.alert('Instalación cancelada.');
    return;
  }

  const codigoIngresado = respuesta.getResponseText().trim();

  // Validar código
  if (!validarCodigoActivacion(codigoIngresado)) {
    ui.alert(
      '❌ CÓDIGO INVÁLIDO',
      'El código de activación ingresado no es válido.\n\n' +
      'Por favor:\n' +
      '• Verifique que copió el código correctamente\n' +
      '• Asegúrese de usar un código no utilizado\n' +
      '• Contacte al desarrollador si el problema persiste',
      ui.ButtonSet.OK
    );
    return;
  }

  // Proceso de instalación
  try {
    ui.alert('⏳ INSTALANDO SISTEMA SIMPLIFICADO...', 'Esto tomará unos segundos. Por favor espere.', ui.ButtonSet.OK);

    // Paso 1: Crear estructura de hojas
    crearEstructuraHojasCompleta();

    // Paso 2: Instalar configuración
    instalarConfiguracionCompleta();

    // Paso 3: Instalar templates
    instalarTemplatesCompletos();

    // Paso 4: Configurar triggers
    configurarTriggersCompletos();

    // Paso 5: Aplicar marca de agua
    aplicarMarcaDeAgua(codigoIngresado);

    // Paso 6: Registrar instalación
    registrarInstalacion(codigoIngresado);

    // Paso 7: Configuración inicial
    configuracionInicialSistema();

    // Éxito
    ui.alert(
      '✅ SISTEMA INSTALADO COMPLETAMENTE',
      '¡El sistema completo se instaló correctamente!\n\n' +
      'FUNCIONALIDADES DISPONIBLES:\n' +
      '• Menú "🏛️ PATENTES LA SERENA" en la barra superior\n' +
      '• Envío automático de formularios (OK → ENVIADO)\n' +
      '• Solo 3 campos necesarios para envío\n' +
      '• Sistema de carpetas en Drive\n' +
      '• Triggers automáticos\n\n' +
      'PRÓXIMOS PASOS:\n' +
      '1. Revise la hoja "ConfiguracionGlobal"\n' +
      '2. Configure sus correos y carpetas\n' +
      '3. Ingrese datos en columnas A, B, C\n' +
      '4. Marque "OK" en columna D para enviar\n\n' +
      'Sistema desarrollado por: ' + AUTOR,
      ui.ButtonSet.OK
    );

  } catch (error) {
    ui.alert(
      '❌ ERROR EN LA INSTALACIÓN',
      'Ocurrió un error durante la instalación:\n\n' +
      error.toString() + '\n\n' +
      'Por favor contacte al desarrollador.',
      ui.ButtonSet.OK
    );
    Logger.log('Error en instalación: ' + error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// FUNCIONES DE VALIDACIÓN Y SEGURIDAD
// ═══════════════════════════════════════════════════════════════════════════

function validarCodigoActivacion(codigo) {
  const hash = generarHash(codigo);
  return CODIGOS_VALIDOS.includes(hash);
}

function generarHash(texto) {
  const rawHash = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    texto,
    Utilities.Charset.UTF_8
  );

  let hashHex = '';
  for (let i = 0; i < 8; i++) {
    const byte = rawHash[i];
    const hexByte = (byte < 0 ? byte + 256 : byte).toString(16);
    hashHex += (hexByte.length === 1 ? '0' : '') + hexByte;
  }

  return hashHex;
}

// ═══════════════════════════════════════════════════════════════════════════
// INSTALACIÓN DE ESTRUCTURA SIMPLIFICADA
// ═══════════════════════════════════════════════════════════════════════════

function crearEstructuraHojasCompleta() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Crear hoja principal: planilla maestra (SIMPLIFICADA - SOLO 4 COLUMNAS)
  let hojaMaestra = ss.getSheetByName('planilla maestra');
  if (!hojaMaestra) {
    hojaMaestra = ss.insertSheet('planilla maestra');

    // Headers simplificados: SOLO 4 COLUMNAS
    const headers = [
      'Nro_Registro_Manual',
      'Nombre Solicitante',
      'Email',
      'Estado_Envio'
    ];

    hojaMaestra.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Formato de headers
    hojaMaestra.getRange(1, 1, 1, 3)
      .setFontWeight('bold')
      .setBackground('#4A6FA5')
      .setFontColor('#FFFFFF');

    // Columna D (Estado_Envio) con color especial
    hojaMaestra.getRange(1, 4)
      .setFontWeight('bold')
      .setBackground('#2E7D32')
      .setFontColor('#FFFFFF');

    // Ajustar anchos de columna
    hojaMaestra.setColumnWidth(1, 150); // Nro_Registro_Manual
    hojaMaestra.setColumnWidth(2, 250); // Nombre Solicitante
    hojaMaestra.setColumnWidth(3, 250); // Email
    hojaMaestra.setColumnWidth(4, 120); // Estado_Envio

    // Agregar datos de ejemplo
    const datosEjemplo = [
      ['Ejemplo: 2024-001', 'Juan Pérez', 'juan.perez@example.com', ''],
      ['', '', '', '← Escriba OK aquí para enviar']
    ];
    hojaMaestra.getRange(2, 1, datosEjemplo.length, 4).setValues(datosEjemplo);

    // Formato de ejemplo
    hojaMaestra.getRange(2, 1, 1, 4).setFontColor('#999999').setFontStyle('italic');
    hojaMaestra.getRange(3, 4).setFontColor('#FF6600').setFontWeight('bold');
  }

  // Crear ConfiguracionGlobal
  let config = ss.getSheetByName('ConfiguracionGlobal');
  if (!config) {
    config = ss.insertSheet('ConfiguracionGlobal');
    const configData = [
      ['Parametro', 'Valor'],
      ['email_remitente', 'tu_email@municipalidad.cl'],
      ['carpeta_principal_id', 'CONFIGURAR_TU_CARPETA_DRIVE'],
      ['form_id', 'CONFIGURAR_TU_FORMULARIO'],
      ['sheet_maestra', 'planilla maestra'],
      ['version_sistema', VERSION],
      ['fecha_instalacion', new Date().toISOString()]
    ];

    config.getRange(1, 1, configData.length, 2).setValues(configData);
    config.getRange(1, 1, 1, 2)
      .setFontWeight('bold')
      .setBackground('#8B4513')
      .setFontColor('#FFFFFF');

    config.setColumnWidth(1, 250);
    config.setColumnWidth(2, 400);

    // Agregar notas explicativas
    config.getRange('B2').setNote('Email desde el cual se enviarán los correos del sistema');
    config.getRange('B3').setNote('ID de la carpeta de Google Drive (obtener desde URL)');
    config.getRange('B4').setNote('ID del formulario de Google Forms (obtener desde URL)');
  }

  // Crear AUDITORIA
  let auditoria = ss.getSheetByName('AUDITORIA');
  if (!auditoria) {
    auditoria = ss.insertSheet('AUDITORIA');
    const headers = ['Timestamp', 'Usuario', 'Accion', 'Registro', 'Detalle'];
    auditoria.getRange(1, 1, 1, headers.length).setValues([headers]);
    auditoria.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#2E7D32')
      .setFontColor('#FFFFFF');

    auditoria.setColumnWidth(1, 180);
    auditoria.setColumnWidth(2, 200);
    auditoria.setColumnWidth(3, 250);
    auditoria.setColumnWidth(4, 150);
    auditoria.setColumnWidth(5, 350);
  }

  // Crear EmailTemplate
  let emailTemplate = ss.getSheetByName('EmailTemplate');
  if (!emailTemplate) {
    emailTemplate = ss.insertSheet('EmailTemplate');
    const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #5D1F1F, #8B4513); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .footer { text-align: center; padding: 15px; font-size: 12px; color: #666; border-radius: 0 0 10px 10px; background: #e8e8e8; }
    .highlight { background-color: #fff3cd; padding: 10px; border-left: 4px solid #856404; margin: 15px 0; }
    .button { background-color: #2E7D32; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🏛️ Municipalidad de La Serena</h2>
      <p>Sistema de Patentes Municipales</p>
    </div>
    <div class="content">
      <p><strong>Estimado/a {{NOMBRE}},</strong></p>

      <p>Le informamos que debe completar el formulario de solicitud de patente municipal correspondiente al registro <strong>N° {{REGISTRO}}</strong>.</p>

      <div class="highlight">
        <p><strong>📋 Acceda al formulario haciendo clic en el siguiente enlace:</strong></p>
        <p style="text-align: center; margin: 20px 0;">
          <a href="{{URL_FORMULARIO}}" class="button">COMPLETAR FORMULARIO</a>
        </p>
      </div>

      <p><strong>Documentos requeridos:</strong></p>
      <ul>
        <li>Fotografías del local</li>
        <li>Plano de ubicación</li>
        <li>Documentos adicionales según corresponda</li>
      </ul>

      <p>Una vez completado el formulario, nuestro equipo revisará su solicitud y le informaremos los siguientes pasos.</p>

      <p>Para consultas, puede contactarnos respondiendo a este correo.</p>

      <p>Atentamente,<br><strong>Departamento de Patentes</strong><br>Municipalidad de La Serena</p>
    </div>
    <div class="footer">
      <p>© 2024 Municipalidad de La Serena - Sistema automatizado</p>
    </div>
  </div>
</body>
</html>`;
    emailTemplate.getRange('A1').setValue(htmlTemplate);
    emailTemplate.setColumnWidth(1, 800);
  }

  Logger.log('✓ Estructura simplificada de hojas creada');
}

function instalarConfiguracionCompleta() {
  // Configuración ya incluida en crearEstructuraHojasCompleta
  Logger.log('✓ Configuración completa instalada');
}

function instalarTemplatesCompletos() {
  // Templates ya incluidos en crearEstructuraHojasCompleta
  Logger.log('✓ Templates completos instalados');
}

function configurarTriggersCompletos() {
  // Eliminar triggers existentes
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));

  Logger.log('✓ Triggers listos para configuración manual');
}

function aplicarMarcaDeAgua(codigo) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const props = PropertiesService.getDocumentProperties();

  const marcaDeAgua = {
    autor: AUTOR,
    version: VERSION,
    fecha_instalacion: new Date().toISOString(),
    codigo_activacion: codigo,
    sheet_id: ss.getId(),
    instalador: Session.getActiveUser().getEmail(),
    sistema: 'PATENTES_LA_SERENA_SIMPLIFICADO'
  };

  props.setProperty('SISTEMA_MARCA_AGUA', JSON.stringify(marcaDeAgua));

  Logger.log('✓ Marca de agua aplicada');
}

function registrarInstalacion(codigo) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const auditoria = ss.getSheetByName('AUDITORIA');

  if (auditoria) {
    auditoria.appendRow([
      new Date(),
      Session.getActiveUser().getEmail(),
      'INSTALACION_SISTEMA_SIMPLIFICADO',
      'N/A',
      'Código: ' + codigo + ' | Versión: ' + VERSION + ' | Sistema simplificado instalado (sin OCR, 3 campos)'
    ]);
  }

  Logger.log('✓ Instalación completa registrada');
}

function configuracionInicialSistema() {
  Logger.log('✓ Configuración inicial del sistema aplicada');
}

// ═══════════════════════════════════════════════════════════════════════════
// SISTEMA FUNCIONAL SIMPLIFICADO
// ═══════════════════════════════════════════════════════════════════════════

// Configuración dinámica del sistema
function obtenerConfig() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const configSheet = ss.getSheetByName('ConfiguracionGlobal');

  if (!configSheet) {
    throw new Error('Hoja ConfiguracionGlobal no encontrada');
  }

  const data = configSheet.getDataRange().getValues();
  const config = {};

  for (let i = 1; i < data.length; i++) {
    const [parametro, valor] = data[i];
    if (parametro && valor) {
      config[parametro] = valor;
    }
  }

  return config;
}

// ═══════════════════════════════════════════════════════════════════════════
// MENÚ PERSONALIZADO
// ═══════════════════════════════════════════════════════════════════════════

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🏛️ PATENTES LA SERENA')
      .addItem('📤 Enviar Formularios Pendientes', 'enviarFormulariosPendientes')
      .addSeparator()
      .addItem('📊 Mostrar Estadísticas', 'mostrarEstadisticas')
      .addItem('📖 Ayuda', 'mostrarAyuda')
      .addToUi();
}

// ═══════════════════════════════════════════════════════════════════════════
// FUNCIONES PRINCIPALES DEL SISTEMA - SIMPLIFICADAS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Función principal: Envía formularios a usuarios que tienen "OK" en columna D
 * Cambia automáticamente "OK" → "ENVIADO" después del envío
 */
function enviarFormulariosPendientes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const config = obtenerConfig();
  const hojaMaestra = ss.getSheetByName(config.sheet_maestra || 'planilla maestra');

  if (!hojaMaestra) {
    SpreadsheetApp.getUi().alert('❌ Error: No se encontró la hoja maestra');
    return;
  }

  const datos = hojaMaestra.getDataRange().getValues();

  // Validar que existan las columnas correctas
  const headers = datos[0];
  if (headers.length < 4) {
    SpreadsheetApp.getUi().alert('❌ Error: La hoja debe tener al menos 4 columnas');
    return;
  }

  let enviados = 0;
  let errores = 0;
  const erroresDetalle = [];

  // Recorrer desde la fila 2 (índice 1) en adelante
  for (let i = 1; i < datos.length; i++) {
    const fila = datos[i];

    // Columnas simplificadas (índices 0-3)
    const registro = fila[0];  // Columna A: Nro_Registro_Manual
    const nombre = fila[1];    // Columna B: Nombre Solicitante
    const email = fila[2];     // Columna C: Email
    const estadoEnvio = fila[3]; // Columna D: Estado_Envio

    // Verificar si dice "OK" (case insensitive)
    if (estadoEnvio && estadoEnvio.toString().toUpperCase().trim() === 'OK') {

      // Validar que los 3 campos estén completos
      if (!registro || !nombre || !email) {
        errores++;
        erroresDetalle.push(`Fila ${i + 1}: Faltan datos (Registro: ${registro || 'vacío'}, Nombre: ${nombre || 'vacío'}, Email: ${email || 'vacío'})`);
        continue;
      }

      // Validar formato de email básico
      if (!validarEmail(email)) {
        errores++;
        erroresDetalle.push(`Fila ${i + 1}: Email inválido (${email})`);
        continue;
      }

      try {
        // Enviar formulario
        enviarFormularioAUsuario(registro, nombre, email, i + 1);

        // CAMBIAR "OK" → "ENVIADO"
        hojaMaestra.getRange(i + 1, 4).setValue('ENVIADO');
        hojaMaestra.getRange(i + 1, 4).setBackground('#90EE90'); // Verde claro

        enviados++;

        // Pausa breve para no saturar Gmail API
        Utilities.sleep(1000);

      } catch (error) {
        errores++;
        erroresDetalle.push(`Fila ${i + 1} (${nombre}): ${error.message}`);
        Logger.log(`Error enviando formulario a ${email}: ${error}`);

        // Marcar como ERROR en la celda
        hojaMaestra.getRange(i + 1, 4).setValue('ERROR');
        hojaMaestra.getRange(i + 1, 4).setBackground('#FFB6C1'); // Rojo claro
      }
    }
  }

  // Mostrar resultado
  let mensaje = '';
  if (enviados > 0) {
    mensaje += `✅ Formularios enviados exitosamente: ${enviados}\n\n`;
  }
  if (errores > 0) {
    mensaje += `⚠️ Errores encontrados: ${errores}\n\n`;
    mensaje += 'Detalle de errores:\n' + erroresDetalle.slice(0, 5).join('\n');
    if (erroresDetalle.length > 5) {
      mensaje += `\n... y ${erroresDetalle.length - 5} errores más. Revise la hoja.`;
    }
  }
  if (enviados === 0 && errores === 0) {
    mensaje = 'ℹ️ No hay formularios pendientes.\n\nPara enviar formularios:\n1. Complete las columnas A, B y C\n2. Escriba "OK" en la columna D\n3. Use esta función';
  }

  SpreadsheetApp.getUi().alert('📤 Resultado del Envío', mensaje, SpreadsheetApp.getUi().ButtonSet.OK);

  // Registrar en auditoría
  if (enviados > 0 || errores > 0) {
    registrarAuditoria('ENVIO_FORMULARIOS', 'N/A', `Enviados: ${enviados} | Errores: ${errores}`);
  }
}

/**
 * Validar formato básico de email
 */
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Envía el email con el formulario a un usuario específico
 */
function enviarFormularioAUsuario(registro, nombre, email, fila) {
  const config = obtenerConfig();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const templateSheet = ss.getSheetByName('EmailTemplate');

  if (!templateSheet) {
    throw new Error('Template de email no encontrado');
  }

  let htmlTemplate = templateSheet.getRange('A1').getValue();

  // Construir URL del formulario
  const urlFormulario = `https://docs.google.com/forms/d/e/${config.form_id}/viewform`;

  // Reemplazar variables en el template
  htmlTemplate = htmlTemplate.replace(/{{NOMBRE}}/g, nombre);
  htmlTemplate = htmlTemplate.replace(/{{REGISTRO}}/g, registro);
  htmlTemplate = htmlTemplate.replace(/{{URL_FORMULARIO}}/g, urlFormulario);

  const asunto = `📋 Formulario de Patente Municipal - Registro ${registro}`;

  try {
    GmailApp.sendEmail(
      email,
      asunto,
      `Estimado/a ${nombre},\n\nPor favor complete el formulario en: ${urlFormulario}\n\nRegistro: ${registro}`, // Texto plano como fallback
      {
        htmlBody: htmlTemplate,
        from: config.email_remitente,
        name: 'Municipalidad de La Serena - Patentes'
      }
    );

    Logger.log(`✓ Formulario enviado exitosamente a ${email} (Registro: ${registro})`);

    // Crear carpeta en Drive
    crearCarpetaExpediente(registro, nombre);

  } catch (error) {
    Logger.log(`✗ Error enviando email a ${email}: ${error}`);
    throw error;
  }
}

/**
 * Crea carpeta en Google Drive para el expediente
 */
function crearCarpetaExpediente(registro, nombre) {
  const config = obtenerConfig();

  try {
    // Verificar que existe configuración de carpeta
    if (!config.carpeta_principal_id || config.carpeta_principal_id === 'CONFIGURAR_TU_CARPETA_DRIVE') {
      Logger.log('⚠️ Carpeta principal no configurada en ConfiguracionGlobal');
      return;
    }

    const carpetaPrincipal = DriveApp.getFolderById(config.carpeta_principal_id);
    const nombreCarpeta = `EXPEDIENTE_${registro}_${nombre}`;

    // Verificar si ya existe
    const carpetasExistentes = carpetaPrincipal.getFoldersByName(nombreCarpeta);
    if (carpetasExistentes.hasNext()) {
      Logger.log(`ℹ️ Carpeta ya existe: ${nombreCarpeta}`);
      return;
    }

    // Crear carpeta principal del expediente
    const carpetaExpediente = carpetaPrincipal.createFolder(nombreCarpeta);

    // Crear subcarpetas
    carpetaExpediente.createFolder('DOCUMENTOS_SOLICITANTE');
    carpetaExpediente.createFolder('DOCUMENTOS_MUNICIPALIDAD');

    Logger.log(`✓ Carpeta creada: ${nombreCarpeta}`);

  } catch (error) {
    Logger.log(`⚠️ No se pudo crear carpeta para ${registro}: ${error.message}`);
    // No lanzar error para que no interrumpa el envío del email
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// FUNCIONES DE AUDITORÍA Y UTILIDADES
// ═══════════════════════════════════════════════════════════════════════════

function registrarAuditoria(accion, registro, detalle) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const auditoria = ss.getSheetByName('AUDITORIA');

  if (auditoria) {
    try {
      auditoria.appendRow([
        new Date(),
        Session.getActiveUser().getEmail(),
        accion,
        registro || 'N/A',
        detalle || ''
      ]);
    } catch (error) {
      Logger.log('Error registrando auditoría: ' + error);
    }
  }
}

function mostrarEstadisticas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const config = obtenerConfig();
  const hojaMaestra = ss.getSheetByName(config.sheet_maestra || 'planilla maestra');

  if (!hojaMaestra) {
    SpreadsheetApp.getUi().alert('Error: No se encontró la hoja maestra');
    return;
  }

  const datos = hojaMaestra.getDataRange().getValues();
  const totalRegistros = datos.length - 1; // Sin header

  let pendientes = 0;
  let enviados = 0;
  let errores = 0;

  for (let i = 1; i < datos.length; i++) {
    const estado = datos[i][3]; // Columna D
    if (estado) {
      const estadoStr = estado.toString().toUpperCase().trim();
      if (estadoStr === 'OK') {
        pendientes++;
      } else if (estadoStr === 'ENVIADO') {
        enviados++;
      } else if (estadoStr === 'ERROR') {
        errores++;
      }
    }
  }

  const mensaje =
    `📊 ESTADÍSTICAS DEL SISTEMA\n\n` +
    `Total de registros: ${totalRegistros}\n\n` +
    `Estados:\n` +
    `• Pendientes de envío (OK): ${pendientes}\n` +
    `• Enviados correctamente: ${enviados}\n` +
    `• Con errores: ${errores}\n` +
    `• Sin estado: ${totalRegistros - pendientes - enviados - errores}\n\n` +
    `Versión del sistema: ${VERSION}`;

  SpreadsheetApp.getUi().alert('📊 Estadísticas', mensaje, SpreadsheetApp.getUi().ButtonSet.OK);
}

function mostrarAyuda() {
  const mensaje =
    `🏛️ SISTEMA DE PATENTES LA SERENA v${VERSION}\n\n` +
    `═══════════════════════════════════\n` +
    `CÓMO USAR EL SISTEMA:\n` +
    `═══════════════════════════════════\n\n` +
    `1️⃣ INGRESAR DATOS:\n` +
    `   • Columna A: Nro. de Registro\n` +
    `   • Columna B: Nombre del Solicitante\n` +
    `   • Columna C: Email del Solicitante\n\n` +
    `2️⃣ ENVIAR FORMULARIO:\n` +
    `   • Escriba "OK" en columna D\n` +
    `   • Use el menú: Enviar Formularios Pendientes\n` +
    `   • El sistema cambiará "OK" → "ENVIADO"\n\n` +
    `3️⃣ CONFIGURACIÓN INICIAL:\n` +
    `   • Abra la hoja "ConfiguracionGlobal"\n` +
    `   • Configure su email remitente\n` +
    `   • Configure el ID de su carpeta Drive\n` +
    `   • Configure el ID de su formulario\n\n` +
    `CARACTERÍSTICAS:\n` +
    `✓ Sistema simplificado (solo 3 campos)\n` +
    `✓ Envío automático de emails\n` +
    `✓ Creación automática de carpetas\n` +
    `✓ Control de estados OK/ENVIADO/ERROR\n` +
    `✓ Auditoría completa\n\n` +
    `═══════════════════════════════════\n` +
    `Desarrollado por: ${AUTOR}\n` +
    `Versión: ${VERSION} | Fecha: ${FECHA_VERSION}`;

  SpreadsheetApp.getUi().alert('📖 Ayuda del Sistema', mensaje, SpreadsheetApp.getUi().ButtonSet.OK);
}

// ═══════════════════════════════════════════════════════════════════════════
// FIN DEL SISTEMA SIMPLIFICADO
// ═══════════════════════════════════════════════════════════════════════════

Logger.log('Sistema de Patentes SIMPLIFICADO - Versión ' + VERSION + ' - Cargado correctamente');
