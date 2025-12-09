/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  01_NUCLEO_V8.gs                                                 ║
 * ║  Sistema de Gestión de Patentes DOM La Serena - V8.0             ║
 * ║  Núcleo completo: Toda la lógica backend consolidada             ║
 * ║  Basado en experiencia de terreno validada                       ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

// ═══════════════════════════════════════════════════════════════════
// CONFIGURACIÓN GLOBAL Y CONSTANTES
// ═══════════════════════════════════════════════════════════════════

const VERSION_SISTEMA = 'V8';

const CONFIG_V8 = {
  VERSION: '8.0',
  SPREADSHEET_NOMBRE: 'Gestión de Patentes Municipales_V8',
  CARPETA_MADRE_NOMBRE: 'PATENTES_DOM_LA_SERENA_V8',

  // Hojas del sistema
  SHEET_PLANILLA_MAESTRA: 'Planilla_Maestra',
  SHEET_CONFIG_GLOBAL: 'ConfiguracionGlobal',
  SHEET_REGISTRO_USUARIOS: 'Registro_Usuarios',
  SHEET_PROGRAMACION: 'Programacion_Inspecciones',
  SHEET_AUDITORIA: 'Auditoria',
  SHEET_SECTORES: 'Sectores',
  SHEET_PLANTILLAS_CORREO: 'Plantillas_Correo',
  SHEET_PLANTILLAS_DOCS: 'Plantillas_Docs',
  SHEET_CONFIG_PLAZOS: 'Configuracion_Plazos',
  SHEET_CONFIG_COLORES: 'Configuracion_Colores',
  SHEET_TIPOS_PUBLICIDAD: 'Tipos_Publicidad',
  SHEET_CHECKLIST: 'Checklist_Inspecciones',
  SHEET_PUBLICIDAD_INSP: 'Publicidad_Inspecciones',
  SHEET_HISTORICO_ESTADOS: 'Historico_Estados',

  // IDs configurables (se obtienen de ConfiguracionGlobal)
  FORM_ID: '1rFz8yi-IIBJV7qR2iVurJVbyEB70QchX9P0BMkbAf-8',
  FORM_ENTRY_REG: 'entry.34642813',

  // Email institucional
  EMAIL_INSTITUCIONAL: 'ricardo.perez@laserena.cl',
  EMAIL_ASUNTO_PATENTES: 'patentes',

  // Contacto
  TELEFONO_SECCION: '(51) 2 20 67 64',
  TELEFONO_SECRETARIA: '(51) 2 20 67 60',

  // Estados del expediente
  ESTADOS: {
    PENDIENTE: 'PENDIENTE',
    DESISTIDO: 'DESISTIDO',
    LISTO_VISITA: 'LISTO_VISITA',
    OBSERVADO: 'OBSERVADO',
    LOCAL_APTO: 'LOCAL_APTO',
    FORM_ENVIADO: 'FORM_ENVIADO',
    PROGRAMADO: 'PROGRAMADO',
    DENEGADO: 'DENEGADO'
  },

  // Colores por estado (pastel)
  COLORES_ESTADO: {
    DESISTIDO: '#FFCDD2',        // Rojo pastel
    LISTO_VISITA: '#FFF9C4',     // Amarillo pastel
    OBSERVADO: '#B2EBF2',        // Cian pastel
    LOCAL_APTO: '#C8E6C9',       // Verde pastel
    PENDIENTE: '#FFFFFF',        // Blanco
    FORM_ENVIADO: '#E3F2FD',     // Azul claro
    PROGRAMADO: '#E1BEE7',       // Morado claro
    DENEGADO: '#FFCCBC'          // Naranja pastel
  },

  // 25 Sectores oficiales de La Serena
  SECTORES: [
    'Sector Serena Norte',
    'Sector Parque Alemania',
    'Sector Compañía Baja',
    'Sector Compañía Alta',
    'Sector Villa Lambert',
    'Sector El Olivar',
    'Sector Islon - El Romero - Pueblo de Lambert - La Laja',
    'Algarrobito - Altovalsol - Las Rojas - Pelicana - Valle de Elqui',
    'Caleta San Pedro',
    'Sector Puertas del Mar',
    'Sector Zona Típica - Casco Fundacional de La Serena',
    'Sector Avenida Francisco de Aguirre',
    'Sector Playa El Faro',
    'Sector Playa 4 Esquinas',
    'Sector Playa Canto del Agua (límite)',
    'Sector La Portada - Oscar Prager - Huanhualí',
    'Sector Barrio Universitario',
    'Sector Vista Hermosa - Chacra Figari - Los Huertos',
    'Balmaceda 4 Esquinas',
    'Sector Villa El Indio - Lo Hibiscus',
    'Sector 4 Esquinas - Las Palmeras',
    'Sector San Joaquín',
    'Sector Serena Oriente',
    'Sector El Milagro 2',
    'Otro Sector'
  ],

  // Subcarpetas por expediente
  SUBCARPETAS_EXPEDIENTE: [
    'DOCUMENTOS_ENTRADA',
    'PLANOS',
    'FOTOS_VISITA',
    'INFORMES'
  ]
};

// ═══════════════════════════════════════════════════════════════════
// ÍNDICES DE COLUMNAS - PLANILLA MAESTRA
// ═══════════════════════════════════════════════════════════════════

const COL = {
  TIMESTAMP: 1,
  REG: 2,
  NOMBRE: 3,
  EMAIL: 4,
  TELEFONO: 5,
  RUT: 6,
  DIRECCION: 7,
  NUMERO: 8,
  COMUNA: 9,
  ROL: 10,
  DESTINO: 11,
  SUPERFICIE: 12,
  NUM_LOCALES: 13,
  TIPO_PUBLICIDAD: 14,
  DESCRIPCION_PUBLICIDAD: 15,
  ESTADO: 16,
  SECTOR: 17,
  FECHA_REGISTRO: 18,
  FECHA_VISITA: 19,
  INSPECTOR: 20,
  OBSERVACIONES_INSPECCION: 21,
  URL_CARPETA: 22,
  URL_FOTOS: 23,
  FECHA_DESISTIMIENTO: 24,
  MOTIVO_DESISTIMIENTO: 25,
  OBSERVACIONES_GENERALES: 26,
  REQUIERE_INFORME_PUBLICIDAD: 27,
  FECHA_INFORME_PUBLICIDAD: 28,
  FECHA_ULTIMA_MODIFICACION: 29,
  USUARIO_ULTIMA_MODIFICACION: 30,
  HISTORIAL_ESTADOS: 31,
  NOTAS_INTERNAS: 32,
  IP_REGISTRO: 33
};

// ═══════════════════════════════════════════════════════════════════
// FUNCIONES GLOBALES CORE
// ═══════════════════════════════════════════════════════════════════

/**
 * Busca expediente por REG en Planilla Maestra
 * @param {string} reg - Número de registro
 * @returns {Object|null} Datos del expediente o null
 */
function buscarExpedienteV8(reg) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG_V8.SHEET_PLANILLA_MAESTRA);
  if (!hoja) return null;

  const datos = hoja.getDataRange().getValues();

  for (let i = 1; i < datos.length; i++) {
    if (String(datos[i][COL.REG - 1]).trim() === String(reg).trim()) {
      return {
        fila: i + 1,
        timestamp: datos[i][COL.TIMESTAMP - 1],
        reg: datos[i][COL.REG - 1],
        nombre: datos[i][COL.NOMBRE - 1],
        email: datos[i][COL.EMAIL - 1],
        telefono: datos[i][COL.TELEFONO - 1],
        rut: datos[i][COL.RUT - 1],
        direccion: datos[i][COL.DIRECCION - 1],
        numero: datos[i][COL.NUMERO - 1],
        comuna: datos[i][COL.COMUNA - 1],
        rol: datos[i][COL.ROL - 1],
        destino: datos[i][COL.DESTINO - 1],
        superficie: datos[i][COL.SUPERFICIE - 1],
        numLocales: datos[i][COL.NUM_LOCALES - 1],
        tipoPublicidad: datos[i][COL.TIPO_PUBLICIDAD - 1],
        descripcionPublicidad: datos[i][COL.DESCRIPCION_PUBLICIDAD - 1],
        estado: datos[i][COL.ESTADO - 1],
        sector: datos[i][COL.SECTOR - 1],
        fechaRegistro: datos[i][COL.FECHA_REGISTRO - 1],
        fechaVisita: datos[i][COL.FECHA_VISITA - 1],
        inspector: datos[i][COL.INSPECTOR - 1],
        observacionesInspeccion: datos[i][COL.OBSERVACIONES_INSPECCION - 1],
        urlCarpeta: datos[i][COL.URL_CARPETA - 1],
        urlFotos: datos[i][COL.URL_FOTOS - 1],
        fechaDesistimiento: datos[i][COL.FECHA_DESISTIMIENTO - 1],
        motivoDesistimiento: datos[i][COL.MOTIVO_DESISTIMIENTO - 1],
        observacionesGenerales: datos[i][COL.OBSERVACIONES_GENERALES - 1],
        requiereInformePublicidad: datos[i][COL.REQUIERE_INFORME_PUBLICIDAD - 1],
        fechaInformePublicidad: datos[i][COL.FECHA_INFORME_PUBLICIDAD - 1],
        fechaUltimaModificacion: datos[i][COL.FECHA_ULTIMA_MODIFICACION - 1],
        usuarioUltimaModificacion: datos[i][COL.USUARIO_ULTIMA_MODIFICACION - 1],
        historialEstados: datos[i][COL.HISTORIAL_ESTADOS - 1],
        notasInternas: datos[i][COL.NOTAS_INTERNAS - 1],
        ipRegistro: datos[i][COL.IP_REGISTRO - 1]
      };
    }
  }
  return null;
}

/**
 * Actualiza un campo específico de un expediente
 * @param {string} reg - Número de registro
 * @param {number} columna - Índice de columna (usar COL.XXX)
 * @param {any} valor - Valor a escribir
 * @returns {boolean} Éxito de la operación
 */
function actualizarCampoExpedienteV8(reg, columna, valor) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG_V8.SHEET_PLANILLA_MAESTRA);
  if (!hoja) return false;

  const datos = hoja.getDataRange().getValues();

  for (let i = 1; i < datos.length; i++) {
    if (String(datos[i][COL.REG - 1]).trim() === String(reg).trim()) {
      hoja.getRange(i + 1, columna).setValue(valor);

      // Actualizar fecha y usuario de última modificación
      hoja.getRange(i + 1, COL.FECHA_ULTIMA_MODIFICACION).setValue(new Date());
      hoja.getRange(i + 1, COL.USUARIO_ULTIMA_MODIFICACION).setValue(Session.getActiveUser().getEmail());

      return true;
    }
  }
  return false;
}

/**
 * Actualiza múltiples campos de un expediente
 * @param {string} reg - Número de registro
 * @param {Object} campos - Objeto {columna: valor}
 * @returns {boolean} Éxito de la operación
 */
function actualizarExpedienteV8(reg, campos) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG_V8.SHEET_PLANILLA_MAESTRA);
  if (!hoja) return false;

  const datos = hoja.getDataRange().getValues();

  for (let i = 1; i < datos.length; i++) {
    if (String(datos[i][COL.REG - 1]).trim() === String(reg).trim()) {
      const fila = i + 1;
      for (const col in campos) {
        hoja.getRange(fila, parseInt(col)).setValue(campos[col]);
      }

      // Actualizar metadatos
      hoja.getRange(fila, COL.FECHA_ULTIMA_MODIFICACION).setValue(new Date());
      hoja.getRange(fila, COL.USUARIO_ULTIMA_MODIFICACION).setValue(Session.getActiveUser().getEmail());

      return true;
    }
  }
  return false;
}

/**
 * Actualiza estado y registra en historial
 * @param {string} reg - Número de registro
 * @param {string} nuevoEstado - Nuevo estado
 * @param {string} motivo - Motivo del cambio (opcional)
 */
function actualizarEstadoConHistorialV8(reg, nuevoEstado, motivo) {
  const expediente = buscarExpedienteV8(reg);
  if (!expediente) return false;

  // Agregar al historial
  const historialActual = expediente.historialEstados || '';
  const fecha = new Date().toLocaleString('es-CL');
  const usuario = Session.getActiveUser().getEmail();
  const nuevoHistorial = historialActual +
    `\n[${fecha}] ${usuario}: ${expediente.estado || 'NUEVO'} → ${nuevoEstado}` +
    (motivo ? ` (${motivo})` : '');

  // Actualizar estado y historial
  actualizarExpedienteV8(reg, {
    [COL.ESTADO]: nuevoEstado,
    [COL.HISTORIAL_ESTADOS]: nuevoHistorial
  });

  // Aplicar color según estado
  aplicarColorEstadoV8(reg, nuevoEstado);

  // Registrar en hoja de histórico
  registrarEnHistoricoEstadosV8(reg, expediente.estado || 'NUEVO', nuevoEstado, motivo);

  return true;
}

/**
 * Aplica color de fondo según estado
 */
function aplicarColorEstadoV8(reg, estado) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG_V8.SHEET_PLANILLA_MAESTRA);
  if (!hoja) return;

  const datos = hoja.getDataRange().getValues();

  for (let i = 1; i < datos.length; i++) {
    if (String(datos[i][COL.REG - 1]).trim() === String(reg).trim()) {
      const color = CONFIG_V8.COLORES_ESTADO[estado] || '#FFFFFF';
      hoja.getRange(i + 1, 1, 1, hoja.getLastColumn()).setBackground(color);
      break;
    }
  }
}

/**
 * Registra cambio de estado en hoja histórico
 */
function registrarEnHistoricoEstadosV8(reg, estadoAnterior, estadoNuevo, motivo) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG_V8.SHEET_HISTORICO_ESTADOS);
  if (!hoja) return;

  hoja.appendRow([
    new Date(),
    reg,
    estadoAnterior,
    estadoNuevo,
    motivo || '',
    Session.getActiveUser().getEmail()
  ]);
}

/**
 * Registra acción en hoja de auditoría
 * @param {string} modulo - Módulo del sistema
 * @param {string} accion - Tipo de acción
 * @param {string} detalle - Descripción
 * @param {string} reg - REG relacionado (opcional)
 */
function registrarAuditoriaV8(modulo, accion, detalle, reg) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hoja = ss.getSheetByName(CONFIG_V8.SHEET_AUDITORIA);
    if (!hoja) return;

    hoja.appendRow([
      new Date(),
      Session.getActiveUser().getEmail(),
      modulo,
      accion,
      detalle,
      reg || '',
      obtenerIPUsuario_()
    ]);
  } catch (e) {
    Logger.log('Error auditoría: ' + e.message);
  }
}

/**
 * Obtiene IP del usuario (aproximada)
 */
function obtenerIPUsuario_() {
  try {
    return Session.getTemporaryActiveUserKey();
  } catch (e) {
    return 'N/A';
  }
}

/**
 * Genera número de REG correlativo con manejo de duplicados (A, B, C)
 * @param {string} regBase - REG base solicitado
 * @returns {string} REG único (puede tener sufijo A, B, C si hay duplicados)
 */
function generarREGUnicoV8(regBase) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG_V8.SHEET_PLANILLA_MAESTRA);
  if (!hoja) return regBase;

  const datos = hoja.getDataRange().getValues();
  const regsExistentes = [];

  // Buscar todos los REG que empiecen con regBase
  for (let i = 1; i < datos.length; i++) {
    const regActual = String(datos[i][COL.REG - 1]).trim();
    if (regActual.startsWith(regBase)) {
      regsExistentes.push(regActual);
    }
  }

  // Si no existe, devolver regBase
  if (regsExistentes.length === 0) {
    return regBase;
  }

  // Si existe exactamente regBase, devolver regBase + 'A'
  if (regsExistentes.includes(regBase)) {
    // Buscar siguiente sufijo disponible
    const sufijos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    for (const sufijo of sufijos) {
      const nuevoREG = regBase + sufijo;
      if (!regsExistentes.includes(nuevoREG)) {
        return nuevoREG;
      }
    }
    // Si llegamos aquí, hay más de 10 duplicados
    return regBase + '_' + new Date().getTime();
  }

  return regBase;
}

/**
 * Obtiene parámetro de configuración global
 * @param {string} nombre - Nombre del parámetro
 * @returns {string} Valor del parámetro
 */
function obtenerConfigV8(nombre) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG_V8.SHEET_CONFIG_GLOBAL);
  if (!hoja) return '';

  const datos = hoja.getDataRange().getValues();
  for (let i = 1; i < datos.length; i++) {
    if (datos[i][0] === nombre) return datos[i][1] || '';
  }
  return '';
}

/**
 * Guarda parámetro de configuración global
 * @param {string} nombre - Nombre del parámetro
 * @param {string} valor - Valor a guardar
 */
function guardarConfigV8(nombre, valor) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG_V8.SHEET_CONFIG_GLOBAL);
  if (!hoja) return;

  const datos = hoja.getDataRange().getValues();
  for (let i = 1; i < datos.length; i++) {
    if (datos[i][0] === nombre) {
      hoja.getRange(i + 1, 2).setValue(valor);
      hoja.getRange(i + 1, 3).setValue(new Date());
      return;
    }
  }
  // Si no existe, agregar
  hoja.appendRow([nombre, valor, new Date()]);
}

/**
 * Valida email
 */
function validarEmailV8(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Formatea fecha
 */
function formatearFechaV8(fecha) {
  if (!fecha) return '-';
  const d = new Date(fecha);
  if (isNaN(d.getTime())) return '-';
  return d.toLocaleDateString('es-CL');
}

/**
 * Formatea fecha y hora
 */
function formatearFechaHoraV8(fecha) {
  if (!fecha) return '-';
  const d = new Date(fecha);
  if (isNaN(d.getTime())) return '-';
  return d.toLocaleDateString('es-CL') + ' ' + d.toLocaleTimeString('es-CL', {hour: '2-digit', minute: '2-digit'});
}

// ═══════════════════════════════════════════════════════════════════
// MÓDULO 1: ENTRADA DE DATOS (Registro de Usuarios)
// ═══════════════════════════════════════════════════════════════════

/**
 * Abre dashboard principal con opción de agregar usuarios
 */
function abrirDashboardV8() {
  const html = HtmlService.createHtmlOutput(generarHTMLDashboardV8_())
    .setWidth(1200)
    .setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(html, '🏛️ Dashboard - Sistema Patentes V8');
}

/**
 * Registra usuario individual
 * EXPERIENCIA DE TERRENO: Solo REG, nombre y email
 * El resto se completa cuando el usuario llena el Google Form
 */
function registrarUsuarioV8(datos) {
  try {
    // Validar datos mínimos (REG, nombre, email)
    if (!datos.reg || !datos.nombre || !datos.email) {
      return { success: false, error: 'Faltan datos obligatorios: REG, nombre y email' };
    }

    // Validar email
    if (!validarEmailV8(datos.email)) {
      return { success: false, error: 'Email inválido' };
    }

    // Generar REG único (manejo de duplicados con sufijos A, B, C)
    const regUnico = generarREGUnicoV8(datos.reg);

    // Agregar a Planilla Maestra
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hoja = ss.getSheetByName(CONFIG_V8.SHEET_PLANILLA_MAESTRA);

    const nuevaFila = Array(COL.IP_REGISTRO).fill('');
    nuevaFila[COL.TIMESTAMP - 1] = new Date();
    nuevaFila[COL.REG - 1] = regUnico;
    nuevaFila[COL.NOMBRE - 1] = datos.nombre;
    nuevaFila[COL.EMAIL - 1] = datos.email;
    nuevaFila[COL.ESTADO - 1] = CONFIG_V8.ESTADOS.PENDIENTE;
    nuevaFila[COL.FECHA_REGISTRO - 1] = new Date();
    nuevaFila[COL.FECHA_ULTIMA_MODIFICACION - 1] = new Date();
    nuevaFila[COL.USUARIO_ULTIMA_MODIFICACION - 1] = Session.getActiveUser().getEmail();
    nuevaFila[COL.HISTORIAL_ESTADOS - 1] = `[${new Date().toLocaleString('es-CL')}] ${Session.getActiveUser().getEmail()}: REGISTRO INICIAL`;
    nuevaFila[COL.IP_REGISTRO - 1] = obtenerIPUsuario_();

    hoja.appendRow(nuevaFila);

    // Aplicar color de estado
    aplicarColorEstadoV8(regUnico, CONFIG_V8.ESTADOS.PENDIENTE);

    // Crear carpeta de expediente
    if (datos.crearCarpeta !== false) {
      try {
        const carpeta = crearCarpetaExpedienteV8_(regUnico, datos.nombre);
        actualizarCampoExpedienteV8(regUnico, COL.URL_CARPETA, carpeta.getUrl());
      } catch (e) {
        Logger.log('Error creando carpeta: ' + e.message);
      }
    }

    // Registrar en auditoría
    registrarAuditoriaV8('REGISTRO', 'NUEVO_USUARIO', `${regUnico} - ${datos.nombre}`, regUnico);

    // Agregar a hoja de Registro_Usuarios
    registrarEnHojaUsuariosV8_(regUnico, datos.nombre, datos.email);

    return {
      success: true,
      mensaje: `Usuario registrado: ${regUnico}${regUnico !== datos.reg ? ' (con sufijo por duplicado)' : ''}`,
      reg: regUnico
    };

  } catch (e) {
    Logger.log('Error registrando usuario: ' + e.message);
    return { success: false, error: e.message };
  }
}

/**
 * Registra múltiples usuarios a la vez
 * EXPERIENCIA DE TERRENO: Dashboard permite agregar 3-4 usuarios simultáneamente
 */
function registrarVariosUsuariosV8(listaUsuarios) {
  const resultados = {
    exitosos: [],
    errores: [],
    total: listaUsuarios.length
  };

  listaUsuarios.forEach(usuario => {
    const resultado = registrarUsuarioV8(usuario);
    if (resultado.success) {
      resultados.exitosos.push(resultado.reg);
    } else {
      resultados.errores.push({ reg: usuario.reg, error: resultado.error });
    }
  });

  return resultados;
}

/**
 * Registra en hoja auxiliar Registro_Usuarios
 */
function registrarEnHojaUsuariosV8_(reg, nombre, email) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG_V8.SHEET_REGISTRO_USUARIOS);
  if (!hoja) return;

  hoja.appendRow([
    new Date(),
    reg,
    nombre,
    email,
    Session.getActiveUser().getEmail()
  ]);
}

/**
 * Crea carpeta del expediente con estructura de subcarpetas
 * EXPERIENCIA DE TERRENO: Se crean 4 subcarpetas (DOCUMENTOS_ENTRADA, PLANOS, FOTOS_VISITA, INFORMES)
 */
function crearCarpetaExpedienteV8_(reg, nombre) {
  const idCarpetaMadre = obtenerConfigV8('ID_CARPETA_MADRE');
  if (!idCarpetaMadre) {
    throw new Error('Carpeta madre no configurada. Ejecute el instalador primero.');
  }

  const madre = DriveApp.getFolderById(idCarpetaMadre);

  // Buscar o crear carpeta EXPEDIENTES
  let carpetaExpedientes;
  const iterador = madre.getFoldersByName('EXPEDIENTES');
  if (iterador.hasNext()) {
    carpetaExpedientes = iterador.next();
  } else {
    carpetaExpedientes = madre.createFolder('EXPEDIENTES');
  }

  // Crear carpeta del expediente con nombre limpio
  const nombreLimpio = nombre.substring(0, 30).replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ ]/g, '').trim();
  const nombreCarpeta = `${reg}_${nombreLimpio}`;
  const carpetaExp = carpetaExpedientes.createFolder(nombreCarpeta);

  // Crear subcarpetas
  CONFIG_V8.SUBCARPETAS_EXPEDIENTE.forEach(subcarpeta => {
    carpetaExp.createFolder(subcarpeta);
  });

  return carpetaExp;
}

/**
 * Busca expediente para editar/reenviar
 */
function buscarExpedienteParaEditarV8(reg) {
  const expediente = buscarExpedienteV8(reg);
  if (!expediente) {
    return { success: false, error: 'Expediente no encontrado' };
  }

  return {
    success: true,
    expediente: {
      reg: expediente.reg,
      nombre: expediente.nombre,
      email: expediente.email,
      estado: expediente.estado,
      fechaRegistro: formatearFechaV8(expediente.fechaRegistro)
    }
  };
}

/**
 * Actualiza email de usuario
 */
function actualizarEmailUsuarioV8(reg, nuevoEmail) {
  if (!validarEmailV8(nuevoEmail)) {
    return { success: false, error: 'Email inválido' };
  }

  const actualizado = actualizarCampoExpedienteV8(reg, COL.EMAIL, nuevoEmail);

  if (actualizado) {
    registrarAuditoriaV8('EDICION', 'EMAIL_ACTUALIZADO', `Nuevo email: ${nuevoEmail}`, reg);
    return { success: true, mensaje: 'Email actualizado correctamente' };
  }

  return { success: false, error: 'Expediente no encontrado' };
}

// ═══════════════════════════════════════════════════════════════════
// MÓDULO 2: PROCESAMIENTO (Formularios y Desistimientos)
// ═══════════════════════════════════════════════════════════════════

/**
 * Envía formulario Google prellenado con REG
 * EXPERIENCIA DE TERRENO: Se envía link del form, usuario lo completa, datos se importan
 */
function enviarFormularioV8(reg) {
  const expediente = buscarExpedienteV8(reg);

  if (!expediente) {
    return { success: false, error: 'Expediente no encontrado' };
  }

  if (!expediente.email || !validarEmailV8(expediente.email)) {
    actualizarEstadoConHistorialV8(reg, 'ERROR_EMAIL', 'Email inválido');
    return { success: false, error: 'Email inválido o vacío' };
  }

  try {
    // Generar URL del formulario prellenado
    const formId = obtenerConfigV8('FORM_ID') || CONFIG_V8.FORM_ID;
    const baseUrl = `https://docs.google.com/forms/d/e/${formId}/viewform`;
    const urlForm = `${baseUrl}?${CONFIG_V8.FORM_ENTRY_REG}=${encodeURIComponent(reg)}`;

    // Obtener plantilla de correo
    const plantillaCorreo = obtenerPlantillaCorreoV8_('ENVIO_FORM');

    // Reemplazar variables
    const asunto = plantillaCorreo.asunto.replace('{REG}', reg);
    let cuerpo = plantillaCorreo.cuerpo;
    cuerpo = cuerpo.replace(/{NOMBRE}/g, expediente.nombre);
    cuerpo = cuerpo.replace(/{REG}/g, reg);
    cuerpo = cuerpo.replace(/{URL_FORMULARIO}/g, urlForm);
    cuerpo = cuerpo.replace(/{TELEFONO_SECCION}/g, CONFIG_V8.TELEFONO_SECCION);
    cuerpo = cuerpo.replace(/{EMAIL_INSTITUCIONAL}/g, CONFIG_V8.EMAIL_INSTITUCIONAL);

    // Enviar email
    GmailApp.sendEmail(expediente.email, asunto, '', {
      htmlBody: cuerpo,
      name: 'DOM La Serena - Sección Patentes',
      replyTo: CONFIG_V8.EMAIL_INSTITUCIONAL
    });

    // Actualizar estado
    actualizarEstadoConHistorialV8(reg, CONFIG_V8.ESTADOS.FORM_ENVIADO, 'Formulario enviado a ' + expediente.email);

    // Registrar auditoría
    registrarAuditoriaV8('FORMULARIOS', 'ENVIO_FORM', `Email: ${expediente.email}`, reg);

    return { success: true, mensaje: `Formulario enviado a ${expediente.email}` };

  } catch (e) {
    Logger.log('Error enviando formulario: ' + e.message);
    actualizarEstadoConHistorialV8(reg, 'ERROR_EMAIL', e.message);
    return { success: false, error: e.message };
  }
}

/**
 * Envía formularios a múltiples expedientes
 */
function enviarFormulariosMultiplesV8(listaRegs) {
  const resultados = {
    enviados: 0,
    errores: 0,
    detalles: []
  };

  listaRegs.forEach(reg => {
    const resultado = enviarFormularioV8(reg);
    if (resultado.success) {
      resultados.enviados++;
    } else {
      resultados.errores++;
      resultados.detalles.push({ reg, error: resultado.error });
    }

    // Pausa para evitar límites de Gmail
    Utilities.sleep(1000);
  });

  return resultados;
}

/**
 * Obtiene plantilla de correo por tipo
 */
function obtenerPlantillaCorreoV8_(tipo) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG_V8.SHEET_PLANTILLAS_CORREO);
  if (!hoja) {
    // Plantilla por defecto
    return {
      asunto: `DOM La Serena - Formulario de Patente Municipal (REG: {REG})`,
      cuerpo: `
<!DOCTYPE html>
<html><head><style>
body{font-family:Arial,sans-serif;line-height:1.6;color:#333}
.container{max-width:600px;margin:0 auto;padding:20px}
.header{background:#2C5F8D;color:white;padding:20px;text-align:center;border-radius:8px 8px 0 0}
.content{background:#f9f9f9;padding:25px;border:1px solid #ddd}
.btn{display:inline-block;background:#00C853;color:white;padding:15px 30px;text-decoration:none;border-radius:6px;font-weight:bold;margin:20px 0}
.footer{background:#333;color:#999;padding:15px;text-align:center;font-size:12px;border-radius:0 0 8px 8px}
</style></head><body>
<div class="container">
  <div class="header">
    <h1>🏛️ Ilustre Municipalidad de La Serena</h1>
    <h2>Dirección de Obras Municipales</h2>
  </div>
  <div class="content">
    <p>Estimado/a <strong>{NOMBRE}</strong>,</p>
    <p>Su solicitud de Patente Municipal REG <strong>{REG}</strong> ha sido recibida.</p>
    <p>Para continuar con el trámite, complete el siguiente formulario:</p>
    <p style="text-align:center"><a href="{URL_FORMULARIO}" class="btn">📝 COMPLETAR FORMULARIO</a></p>
    <p>Para consultas:<br>📞 {TELEFONO_SECCION}<br>📧 {EMAIL_INSTITUCIONAL}</p>
  </div>
  <div class="footer">DOM La Serena - ${new Date().getFullYear()}</div>
</div>
</body></html>`
    };
  }

  const datos = hoja.getDataRange().getValues();
  for (let i = 1; i < datos.length; i++) {
    if (datos[i][0] === tipo) {
      return {
        asunto: datos[i][2] || '',
        cuerpo: datos[i][3] || ''
      };
    }
  }

  return {
    asunto: 'Patentes DOM La Serena',
    cuerpo: 'Contenido no disponible'
  };
}

/**
 * Procesa desistimiento
 * EXPERIENCIA DE TERRENO: Usuario puede desistir en cualquier momento
 */
function procesarDesistimientoV8(reg, motivo, observaciones) {
  const expediente = buscarExpedienteV8(reg);
  if (!expediente) {
    return { success: false, error: 'Expediente no encontrado' };
  }

  try {
    // Actualizar estado y campos de desistimiento
    actualizarExpedienteV8(reg, {
      [COL.FECHA_DESISTIMIENTO]: new Date(),
      [COL.MOTIVO_DESISTIMIENTO]: motivo,
      [COL.OBSERVACIONES_GENERALES]: (expediente.observacionesGenerales || '') + '\n[DESISTIMIENTO] ' + (observaciones || '')
    });

    actualizarEstadoConHistorialV8(reg, CONFIG_V8.ESTADOS.DESISTIDO, motivo);

    // Enviar email de confirmación
    enviarEmailDesistimientoV8_(expediente, motivo);

    // Registrar auditoría
    registrarAuditoriaV8('DESISTIMIENTO', 'PROCESADO', motivo, reg);

    return { success: true, mensaje: 'Desistimiento procesado correctamente' };

  } catch (e) {
    Logger.log('Error procesando desistimiento: ' + e.message);
    return { success: false, error: e.message };
  }
}

/**
 * Envía email de confirmación de desistimiento
 */
function enviarEmailDesistimientoV8_(expediente, motivo) {
  if (!expediente.email || !validarEmailV8(expediente.email)) return;

  try {
    const plantilla = obtenerPlantillaCorreoV8_('CONFIRMACION_DESISTIMIENTO');

    let cuerpo = plantilla.cuerpo;
    cuerpo = cuerpo.replace(/{NOMBRE}/g, expediente.nombre);
    cuerpo = cuerpo.replace(/{REG}/g, expediente.reg);
    cuerpo = cuerpo.replace(/{MOTIVO}/g, motivo);

    GmailApp.sendEmail(expediente.email, plantilla.asunto, '', {
      htmlBody: cuerpo,
      name: 'DOM La Serena - Sección Patentes',
      replyTo: CONFIG_V8.EMAIL_INSTITUCIONAL
    });
  } catch (e) {
    Logger.log('Error enviando email desistimiento: ' + e.message);
  }
}

/**
 * Importa respuestas del Google Form
 * EXPERIENCIA DE TERRENO: Después de que usuarios completan el form, se importan sus datos
 */
function importarRespuestasFormV8() {
  try {
    const formId = obtenerConfigV8('FORM_ID') || CONFIG_V8.FORM_ID;
    const form = FormApp.openById(formId);
    const respuestas = form.getResponses();

    let procesadas = 0;
    let errores = 0;

    respuestas.forEach(respuesta => {
      const items = respuesta.getItemResponses();
      let reg = '';
      const datos = {};

      // Extraer datos de la respuesta
      items.forEach(item => {
        const titulo = item.getItem().getTitle().toLowerCase();
        const valor = item.getResponse();

        if (titulo.includes('reg') || titulo.includes('registro')) {
          reg = String(valor).trim();
        } else if (titulo.includes('tel') || titulo.includes('fono')) {
          datos.telefono = valor;
        } else if (titulo.includes('rut')) {
          datos.rut = valor;
        } else if (titulo.includes('direcci')) {
          datos.direccion = valor;
        } else if (titulo.includes('número') || titulo.includes('numero')) {
          datos.numero = valor;
        } else if (titulo.includes('comuna')) {
          datos.comuna = valor;
        } else if (titulo.includes('rol')) {
          datos.rol = valor;
        } else if (titulo.includes('destino')) {
          datos.destino = valor;
        } else if (titulo.includes('superficie') || titulo.includes('m2')) {
          datos.superficie = valor;
        } else if (titulo.includes('locales')) {
          datos.numLocales = valor;
        } else if (titulo.includes('tipo') && titulo.includes('publicidad')) {
          datos.tipoPublicidad = valor;
        } else if (titulo.includes('descripci') && titulo.includes('publicidad')) {
          datos.descripcionPublicidad = valor;
        }
      });

      // Verificar si ya fue procesada esta respuesta
      if (reg && !respuestaYaProcesadaV8_(reg, respuesta.getTimestamp())) {
        // Actualizar expediente con datos del formulario
        const resultado = actualizarConRespuestaFormV8_(reg, datos);
        if (resultado) {
          procesadas++;
        } else {
          errores++;
        }
      }
    });

    registrarAuditoriaV8('FORMULARIOS', 'IMPORTACION', `Procesadas: ${procesadas}, Errores: ${errores}`, '');

    return {
      success: true,
      procesadas,
      errores,
      total: respuestas.length
    };

  } catch (e) {
    Logger.log('Error importando respuestas: ' + e.message);
    return { success: false, error: e.message };
  }
}

/**
 * Verifica si una respuesta ya fue procesada
 */
function respuestaYaProcesadaV8_(reg, fechaRespuesta) {
  const expediente = buscarExpedienteV8(reg);
  if (!expediente) return false;

  // Si ya tiene estado diferente a PENDIENTE o FORM_ENVIADO, ya fue procesado
  return expediente.estado !== CONFIG_V8.ESTADOS.PENDIENTE &&
         expediente.estado !== CONFIG_V8.ESTADOS.FORM_ENVIADO;
}

/**
 * Actualiza expediente con datos de respuesta del formulario
 */
function actualizarConRespuestaFormV8_(reg, datos) {
  const expediente = buscarExpedienteV8(reg);
  if (!expediente) return false;

  const camposActualizar = {};

  if (datos.telefono) camposActualizar[COL.TELEFONO] = datos.telefono;
  if (datos.rut) camposActualizar[COL.RUT] = datos.rut;
  if (datos.direccion) camposActualizar[COL.DIRECCION] = datos.direccion;
  if (datos.numero) camposActualizar[COL.NUMERO] = datos.numero;
  if (datos.comuna) camposActualizar[COL.COMUNA] = datos.comuna;
  if (datos.rol) camposActualizar[COL.ROL] = datos.rol;
  if (datos.destino) camposActualizar[COL.DESTINO] = datos.destino;
  if (datos.superficie) camposActualizar[COL.SUPERFICIE] = datos.superficie;
  if (datos.numLocales) camposActualizar[COL.NUM_LOCALES] = datos.numLocales;
  if (datos.tipoPublicidad) camposActualizar[COL.TIPO_PUBLICIDAD] = datos.tipoPublicidad;
  if (datos.descripcionPublicidad) camposActualizar[COL.DESCRIPCION_PUBLICIDAD] = datos.descripcionPublicidad;

  actualizarExpedienteV8(reg, camposActualizar);
  actualizarEstadoConHistorialV8(reg, CONFIG_V8.ESTADOS.LISTO_VISITA, 'Formulario completado por usuario');

  return true;
}

// ═══════════════════════════════════════════════════════════════════
// MÓDULO 3: TRABAJO EN TERRENO
// ═══════════════════════════════════════════════════════════════════

/**
 * Asigna sector a expediente
 * EXPERIENCIA DE TERRENO: Clasificación por 25 sectores de La Serena
 */
function asignarSectorV8(reg, sector) {
  if (!sector || !CONFIG_V8.SECTORES.includes(sector)) {
    return { success: false, error: 'Sector inválido' };
  }

  const actualizado = actualizarCampoExpedienteV8(reg, COL.SECTOR, sector);

  if (actualizado) {
    registrarAuditoriaV8('TERRENO', 'ASIGNAR_SECTOR', sector, reg);
    return { success: true, mensaje: 'Sector asignado correctamente' };
  }

  return { success: false, error: 'Expediente no encontrado' };
}

/**
 * Programa visita de inspección
 * EXPERIENCIA DE TERRENO: Se programa fecha/hora de visita
 */
function programarVisitaV8(reg, fechaVisita, hora, inspector) {
  const expediente = buscarExpedienteV8(reg);
  if (!expediente) {
    return { success: false, error: 'Expediente no encontrado' };
  }

  try {
    const fechaObj = new Date(fechaVisita + 'T' + (hora || '09:00') + ':00');

    // Actualizar expediente
    actualizarExpedienteV8(reg, {
      [COL.FECHA_VISITA]: fechaObj,
      [COL.INSPECTOR]: inspector || Session.getActiveUser().getEmail()
    });

    actualizarEstadoConHistorialV8(reg, CONFIG_V8.ESTADOS.PROGRAMADO, `Programado para ${fechaVisita} ${hora || '09:00'}`);

    // Agregar a hoja de Programación
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hojaProg = ss.getSheetByName(CONFIG_V8.SHEET_PROGRAMACION);

    if (hojaProg) {
      hojaProg.appendRow([
        new Date(),
        reg,
        expediente.nombre,
        expediente.direccion || '',
        expediente.sector || '',
        fechaObj,
        hora || '09:00',
        inspector || Session.getActiveUser().getEmail(),
        'PENDIENTE',
        '',  // Resultado
        ''   // Observaciones
      ]);
    }

    // Enviar email de confirmación
    enviarEmailProgramacionV8_(expediente, fechaObj, hora);

    registrarAuditoriaV8('TERRENO', 'PROGRAMAR_VISITA', `Fecha: ${fechaVisita} ${hora || ''}`, reg);

    return { success: true, mensaje: `Visita programada para ${fechaVisita}` };

  } catch (e) {
    Logger.log('Error programando visita: ' + e.message);
    return { success: false, error: e.message };
  }
}

/**
 * Envía email de confirmación de programación
 */
function enviarEmailProgramacionV8_(expediente, fecha, hora) {
  if (!expediente.email || !validarEmailV8(expediente.email)) return;

  try {
    const plantilla = obtenerPlantillaCorreoV8_('PROGRAMACION_VISITA');

    let cuerpo = plantilla.cuerpo;
    cuerpo = cuerpo.replace(/{NOMBRE}/g, expediente.nombre);
    cuerpo = cuerpo.replace(/{REG}/g, expediente.reg);
    cuerpo = cuerpo.replace(/{FECHA}/g, formatearFechaV8(fecha));
    cuerpo = cuerpo.replace(/{HORA}/g, hora || '09:00');
    cuerpo = cuerpo.replace(/{DIRECCION}/g, expediente.direccion || 'Su domicilio');

    GmailApp.sendEmail(expediente.email, plantilla.asunto, '', {
      htmlBody: cuerpo,
      name: 'DOM La Serena - Sección Patentes',
      replyTo: CONFIG_V8.EMAIL_INSTITUCIONAL
    });
  } catch (e) {
    Logger.log('Error enviando email programación: ' + e.message);
  }
}

/**
 * Programa múltiples visitas para el mismo día
 */
function programarVisitasMultiplesV8(listaRegs, fecha, inspector) {
  let programadas = 0;
  let errores = 0;

  listaRegs.forEach((reg, idx) => {
    // Escalonar horarios cada 30 minutos desde las 9:00
    const hora = calcularHoraEscalonadaV8_(9, idx * 30);
    const resultado = programarVisitaV8(reg, fecha, hora, inspector);
    if (resultado.success) {
      programadas++;
    } else {
      errores++;
    }
  });

  return { programadas, errores, total: listaRegs.length };
}

/**
 * Calcula hora escalonada
 */
function calcularHoraEscalonadaV8_(horaBase, minutosAdicionales) {
  const totalMinutos = horaBase * 60 + minutosAdicionales;
  const horas = Math.floor(totalMinutos / 60);
  const minutos = totalMinutos % 60;
  return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;
}

/**
 * Registra resultado de visita
 * EXPERIENCIA DE TERRENO: Inspector registra resultado de visita con observaciones
 */
function registrarResultadoVisitaV8(reg, resultado, observaciones, fotos) {
  const expediente = buscarExpedienteV8(reg);
  if (!expediente) {
    return { success: false, error: 'Expediente no encontrado' };
  }

  // Validar resultado
  const resultadosValidos = ['LOCAL_APTO', 'OBSERVADO', 'DENEGADO'];
  if (!resultadosValidos.includes(resultado)) {
    return { success: false, error: 'Resultado inválido. Use: LOCAL_APTO, OBSERVADO o DENEGADO' };
  }

  try {
    // Actualizar expediente
    actualizarExpedienteV8(reg, {
      [COL.OBSERVACIONES_INSPECCION]: observaciones || '',
      [COL.URL_FOTOS]: (fotos && fotos.length > 0) ? fotos.join(', ') : ''
    });

    actualizarEstadoConHistorialV8(reg, resultado, observaciones || '');

    // Actualizar en hoja de Programación
    actualizarProgramacionV8_(reg, resultado, observaciones);

    // Registrar en auditoría
    registrarAuditoriaV8('TERRENO', 'RESULTADO_VISITA', `${resultado}: ${observaciones || ''}`, reg);

    return {
      success: true,
      mensaje: `Resultado registrado: ${resultado}`
    };

  } catch (e) {
    Logger.log('Error registrando resultado: ' + e.message);
    return { success: false, error: e.message };
  }
}

/**
 * Actualiza registro en hoja de Programación
 */
function actualizarProgramacionV8_(reg, resultado, observaciones) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG_V8.SHEET_PROGRAMACION);
  if (!hoja) return;

  const datos = hoja.getDataRange().getValues();

  for (let i = 1; i < datos.length; i++) {
    if (String(datos[i][1]) === String(reg) && datos[i][8] === 'PENDIENTE') {
      hoja.getRange(i + 1, 9).setValue('COMPLETADA');
      hoja.getRange(i + 1, 10).setValue(resultado);
      hoja.getRange(i + 1, 11).setValue(observaciones || '');
      break;
    }
  }
}

/**
 * Obtiene visitas programadas para hoy
 * EXPERIENCIA DE TERRENO: Para preparar lista del día en iPad/Android
 */
function obtenerVisitasHoyV8() {
  const hoy = new Date();
  const fechaHoy = hoy.toISOString().split('T')[0];
  return obtenerVisitasProgramadasV8(fechaHoy);
}

/**
 * Obtiene visitas programadas para una fecha
 */
function obtenerVisitasProgramadasV8(fecha) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG_V8.SHEET_PROGRAMACION);
  if (!hoja) return [];

  const datos = hoja.getDataRange().getValues();
  const visitas = [];

  for (let i = 1; i < datos.length; i++) {
    if (!datos[i][1]) continue;

    const fechaProg = new Date(datos[i][5]);

    if (fecha) {
      const fechaFiltro = new Date(fecha + 'T00:00:00');
      if (fechaProg.toDateString() !== fechaFiltro.toDateString()) continue;
    }

    const reg = datos[i][1];
    const expediente = buscarExpedienteV8(reg);

    visitas.push({
      reg: reg,
      nombre: datos[i][2],
      direccion: datos[i][3],
      sector: datos[i][4],
      fechaProgramada: fechaProg,
      hora: datos[i][6],
      inspector: datos[i][7],
      estado: datos[i][8],
      resultado: datos[i][9],
      observaciones: datos[i][10],
      telefono: expediente ? expediente.telefono : '',
      rol: expediente ? expediente.rol : '',
      tipoPublicidad: expediente ? expediente.tipoPublicidad : ''
    });
  }

  return visitas.sort((a, b) => new Date(a.fechaProgramada) - new Date(b.fechaProgramada));
}

/**
 * Genera lista de visitas para iPad/Android
 * EXPERIENCIA DE TERRENO: Ahora se usa en Android también
 */
function generarListaMovilV8(fecha) {
  const visitas = obtenerVisitasProgramadasV8(fecha || null);

  if (visitas.length === 0) {
    return {
      success: false,
      mensaje: 'No hay visitas programadas para esta fecha'
    };
  }

  return {
    success: true,
    visitas: visitas,
    total: visitas.length
  };
}

// ═══════════════════════════════════════════════════════════════════
// MÓDULO 4: INFORMES Y REPORTES
// ═══════════════════════════════════════════════════════════════════

/**
 * Genera informe de visita
 */
function generarInformeVisitaV8(reg, datosInforme) {
  const expediente = buscarExpedienteV8(reg);
  if (!expediente) {
    return { success: false, error: 'Expediente no encontrado' };
  }

  try {
    const nombreDoc = `INFORME_VISITA_${reg}_${new Date().toISOString().split('T')[0]}`;
    const doc = DocumentApp.create(nombreDoc);
    const body = doc.getBody();

    // Encabezado institucional
    body.appendParagraph('ILUSTRE MUNICIPALIDAD DE LA SERENA')
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setHeading(DocumentApp.ParagraphHeading.HEADING1);

    body.appendParagraph('Dirección de Obras Municipales')
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER);

    body.appendParagraph('Sección Patentes Municipales')
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER);

    body.appendParagraph('').appendHorizontalRule();

    // Título
    body.appendParagraph('INFORME DE INSPECCIÓN')
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER);

    body.appendParagraph('');

    // Datos del expediente
    const tabla = body.appendTable([
      ['N° REG', expediente.reg],
      ['Solicitante', expediente.nombre],
      ['RUT', expediente.rut || '-'],
      ['Dirección', expediente.direccion || '-'],
      ['Rol', expediente.rol || '-'],
      ['Destino', expediente.destino || '-'],
      ['Superficie', (expediente.superficie || '-') + ' m²'],
      ['Sector', expediente.sector || '-'],
      ['Fecha Inspección', formatearFechaV8(expediente.fechaVisita)],
      ['Inspector', expediente.inspector || '-']
    ]);

    tabla.setBorderWidth(1);

    body.appendParagraph('');

    // Observaciones
    body.appendParagraph('OBSERVACIONES DE TERRENO')
      .setHeading(DocumentApp.ParagraphHeading.HEADING3);

    body.appendParagraph(datosInforme.observaciones || 'Sin observaciones');

    body.appendParagraph('');

    // Resultado
    body.appendParagraph('RESULTADO')
      .setHeading(DocumentApp.ParagraphHeading.HEADING3);

    body.appendParagraph(datosInforme.resultado || '-');

    body.appendParagraph('');
    body.appendParagraph('');
    body.appendParagraph('_______________________________');
    body.appendParagraph('Firma Inspector');
    body.appendParagraph('Fecha: ' + new Date().toLocaleDateString('es-CL'));

    doc.saveAndClose();

    // Mover a carpeta del expediente
    if (expediente.urlCarpeta) {
      try {
        const carpetaId = expediente.urlCarpeta.match(/[-\w]{25,}/)[0];
        const carpeta = DriveApp.getFolderById(carpetaId);
        const informes = carpeta.getFoldersByName('INFORMES').hasNext()
          ? carpeta.getFoldersByName('INFORMES').next()
          : carpeta.createFolder('INFORMES');
        DriveApp.getFileById(doc.getId()).moveTo(informes);
      } catch (e) {
        Logger.log('Error moviendo informe: ' + e.message);
      }
    }

    registrarAuditoriaV8('INFORMES', 'GENERAR_INFORME', 'Informe de visita generado', reg);

    return {
      success: true,
      mensaje: 'Informe generado correctamente',
      url: doc.getUrl()
    };

  } catch (e) {
    Logger.log('Error generando informe: ' + e.message);
    return { success: false, error: e.message };
  }
}

/**
 * Genera reporte para jefatura
 * EXPERIENCIA DE TERRENO: Reporte semanal/mensual para jefatura
 */
function generarReporteJefaturaV8(fechaDesde, fechaHasta) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hoja = ss.getSheetByName(CONFIG_V8.SHEET_PLANILLA_MAESTRA);
    if (!hoja) {
      return { success: false, error: 'Planilla Maestra no encontrada' };
    }

    const datos = hoja.getDataRange().getValues();
    const expedientesFiltrados = [];

    const desde = new Date(fechaDesde);
    const hasta = new Date(fechaHasta);
    hasta.setHours(23, 59, 59);

    for (let i = 1; i < datos.length; i++) {
      const fechaVisita = new Date(datos[i][COL.FECHA_VISITA - 1]);

      if (fechaVisita >= desde && fechaVisita <= hasta) {
        expedientesFiltrados.push({
          reg: datos[i][COL.REG - 1],
          nombre: datos[i][COL.NOMBRE - 1],
          direccion: datos[i][COL.DIRECCION - 1],
          sector: datos[i][COL.SECTOR - 1],
          fechaVisita: fechaVisita,
          estado: datos[i][COL.ESTADO - 1],
          observaciones: datos[i][COL.OBSERVACIONES_INSPECCION - 1]
        });
      }
    }

    if (expedientesFiltrados.length === 0) {
      return { success: false, error: 'No hay expedientes en el período seleccionado' };
    }

    // Crear documento de reporte
    const nombreReporte = `REPORTE_JEFATURA_${fechaDesde}_${fechaHasta}`;
    const doc = DocumentApp.create(nombreReporte);
    const body = doc.getBody();

    // Encabezado
    body.appendParagraph('REPORTE DE INSPECCIONES')
      .setHeading(DocumentApp.ParagraphHeading.TITLE)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER);

    body.appendParagraph(`Período: ${formatearFechaV8(desde)} - ${formatearFechaV8(hasta)}`)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER);

    body.appendParagraph('');

    // Estadísticas
    const stats = {
      total: expedientesFiltrados.length,
      aptos: expedientesFiltrados.filter(e => e.estado === CONFIG_V8.ESTADOS.LOCAL_APTO).length,
      observados: expedientesFiltrados.filter(e => e.estado === CONFIG_V8.ESTADOS.OBSERVADO).length,
      denegados: expedientesFiltrados.filter(e => e.estado === CONFIG_V8.ESTADOS.DENEGADO).length
    };

    body.appendParagraph('RESUMEN ESTADÍSTICO')
      .setHeading(DocumentApp.ParagraphHeading.HEADING1);

    const tablaStats = body.appendTable([
      ['Total Inspecciones', String(stats.total)],
      ['Locales Aptos', String(stats.aptos)],
      ['Observados', String(stats.observados)],
      ['Denegados', String(stats.denegados)]
    ]);
    tablaStats.setBorderWidth(1);

    body.appendParagraph('');

    // Detalle
    body.appendParagraph('DETALLE DE INSPECCIONES')
      .setHeading(DocumentApp.ParagraphHeading.HEADING1);

    expedientesFiltrados.forEach((exp, idx) => {
      body.appendParagraph(`${idx + 1}. REG ${exp.reg} - ${exp.nombre}`)
        .setHeading(DocumentApp.ParagraphHeading.HEADING2);
      body.appendParagraph(`Dirección: ${exp.direccion || '-'}`);
      body.appendParagraph(`Sector: ${exp.sector || '-'}`);
      body.appendParagraph(`Fecha: ${formatearFechaV8(exp.fechaVisita)}`);
      body.appendParagraph(`Estado: ${exp.estado}`);
      if (exp.observaciones) {
        body.appendParagraph(`Observaciones: ${exp.observaciones}`);
      }
      body.appendParagraph('');
    });

    // Pie
    body.appendParagraph('_______________________________');
    body.appendParagraph('Sección Patentes Municipales');
    body.appendParagraph('Generado: ' + new Date().toLocaleDateString('es-CL'));

    doc.saveAndClose();

    // Mover a carpeta REPORTES
    const idCarpetaMadre = obtenerConfigV8('ID_CARPETA_MADRE');
    if (idCarpetaMadre) {
      try {
        const madre = DriveApp.getFolderById(idCarpetaMadre);
        const reportes = madre.getFoldersByName('REPORTES').hasNext()
          ? madre.getFoldersByName('REPORTES').next()
          : madre.createFolder('REPORTES');
        DriveApp.getFileById(doc.getId()).moveTo(reportes);
      } catch (e) {
        Logger.log('Error moviendo reporte: ' + e.message);
      }
    }

    registrarAuditoriaV8('REPORTES', 'GENERAR_REPORTE_JEFATURA', `Período: ${fechaDesde} - ${fechaHasta}`, '');

    return {
      success: true,
      mensaje: `Reporte generado con ${expedientesFiltrados.length} expedientes`,
      url: doc.getUrl()
    };

  } catch (e) {
    Logger.log('Error generando reporte jefatura: ' + e.message);
    return { success: false, error: e.message };
  }
}

/**
 * Obtiene estadísticas generales del sistema
 */
function obtenerEstadisticasV8() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG_V8.SHEET_PLANILLA_MAESTRA);

  const stats = {
    total: 0,
    pendientes: 0,
    desistidos: 0,
    listosVisita: 0,
    programados: 0,
    localesAptos: 0,
    observados: 0,
    denegados: 0
  };

  if (!hoja) return stats;

  const datos = hoja.getDataRange().getValues();

  for (let i = 1; i < datos.length; i++) {
    if (!datos[i][COL.REG - 1]) continue;
    stats.total++;

    const estado = datos[i][COL.ESTADO - 1] || '';

    switch(estado) {
      case CONFIG_V8.ESTADOS.PENDIENTE: stats.pendientes++; break;
      case CONFIG_V8.ESTADOS.DESISTIDO: stats.desistidos++; break;
      case CONFIG_V8.ESTADOS.LISTO_VISITA: stats.listosVisita++; break;
      case CONFIG_V8.ESTADOS.PROGRAMADO: stats.programados++; break;
      case CONFIG_V8.ESTADOS.LOCAL_APTO: stats.localesAptos++; break;
      case CONFIG_V8.ESTADOS.OBSERVADO: stats.observados++; break;
      case CONFIG_V8.ESTADOS.DENEGADO: stats.denegados++; break;
    }
  }

  return stats;
}

// ═══════════════════════════════════════════════════════════════════
// MÓDULO 5: WEBAPP MÓVIL (iPad/Android)
// ═══════════════════════════════════════════════════════════════════

/**
 * GET handler - Sirve interfaz HTML para móvil
 * EXPERIENCIA DE TERRENO: Usado en iPad y Android para inspecciones
 */
function doGet(e) {
  const action = e.parameter.action || 'main';
  const reg = e.parameter.reg || '';

  let html;

  switch(action) {
    case 'visitas':
      html = generarHTMLVisitasMovilV8_();
      break;
    case 'checklist':
      html = generarHTMLChecklistMovilV8_(reg);
      break;
    default:
      html = generarHTMLWebAppPrincipalV8_();
  }

  return HtmlService.createHtmlOutput(html)
    .setTitle('Patentes DOM La Serena')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
}

/**
 * POST handler - Recibe datos desde móvil
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    switch(data.action) {
      case 'registrarResultado':
        return ContentService.createTextOutput(
          JSON.stringify(registrarResultadoDesdeMovilV8_(data))
        ).setMimeType(ContentService.MimeType.JSON);

      case 'subirFoto':
        return ContentService.createTextOutput(
          JSON.stringify(subirFotoDesdeMovilV8_(data))
        ).setMimeType(ContentService.MimeType.JSON);

      default:
        return ContentService.createTextOutput(
          JSON.stringify({ success: false, error: 'Acción no válida' })
        ).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (e) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: e.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Registra resultado desde móvil
 */
function registrarResultadoDesdeMovilV8_(data) {
  return registrarResultadoVisitaV8(data.reg, data.resultado, data.observaciones, data.fotos || []);
}

/**
 * Sube foto desde móvil
 */
function subirFotoDesdeMovilV8_(data) {
  try {
    const expediente = buscarExpedienteV8(data.reg);
    if (!expediente) {
      return { success: false, error: 'Expediente no encontrado' };
    }

    // Decodificar base64
    const blob = Utilities.newBlob(
      Utilities.base64Decode(data.fotoBase64),
      'image/jpeg',
      `FOTO_${data.reg}_${new Date().getTime()}.jpg`
    );

    // Obtener carpeta de fotos del expediente
    let carpetaFotos;
    if (expediente.urlCarpeta) {
      try {
        const carpetaId = expediente.urlCarpeta.match(/[-\w]{25,}/)[0];
        const carpeta = DriveApp.getFolderById(carpetaId);
        carpetaFotos = carpeta.getFoldersByName('FOTOS_VISITA').hasNext()
          ? carpeta.getFoldersByName('FOTOS_VISITA').next()
          : carpeta.createFolder('FOTOS_VISITA');
      } catch (e) {
        Logger.log('Error accediendo carpeta expediente: ' + e.message);
        carpetaFotos = obtenerCarpetaTemporalV8_();
      }
    } else {
      carpetaFotos = obtenerCarpetaTemporalV8_();
    }

    const archivo = carpetaFotos.createFile(blob);

    registrarAuditoriaV8('WEBAPP', 'SUBIR_FOTO', `Foto subida desde móvil`, data.reg);

    return {
      success: true,
      url: archivo.getUrl(),
      id: archivo.getId()
    };

  } catch (e) {
    Logger.log('Error subiendo foto móvil: ' + e.message);
    return { success: false, error: e.message };
  }
}

/**
 * Obtiene o crea carpeta temporal
 */
function obtenerCarpetaTemporalV8_() {
  const idCarpetaMadre = obtenerConfigV8('ID_CARPETA_MADRE');
  if (!idCarpetaMadre) throw new Error('Carpeta madre no configurada');

  const madre = DriveApp.getFolderById(idCarpetaMadre);
  const temps = madre.getFoldersByName('TEMPORAL');

  if (temps.hasNext()) {
    return temps.next();
  }
  return madre.createFolder('TEMPORAL');
}

/**
 * Obtiene URL de la WebApp
 */
function obtenerURLWebAppV8() {
  return ScriptApp.getService().getUrl();
}

// ═══════════════════════════════════════════════════════════════════
// TRIGGERS AUTOMÁTICOS
// ═══════════════════════════════════════════════════════════════════

/**
 * Envía recordatorios automáticos
 * EXPERIENCIA DE TERRENO: Lunes y viernes a las 10:00 AM
 * Se ejecuta mediante trigger configurado en el instalador
 */
function enviarRecordatoriosAutomaticosV8() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hoja = ss.getSheetByName(CONFIG_V8.SHEET_PLANILLA_MAESTRA);
    if (!hoja) return;

    const datos = hoja.getDataRange().getValues();
    const ahora = new Date();
    const plazoDias = parseInt(obtenerConfigV8('PLAZO_RESPUESTA_FORM')) || 10;
    let enviados = 0;

    for (let i = 1; i < datos.length; i++) {
      const estado = datos[i][COL.ESTADO - 1];

      // Solo enviar a los que tienen formulario enviado pero no respondido
      if (estado === CONFIG_V8.ESTADOS.FORM_ENVIADO) {
        const fechaRegistro = new Date(datos[i][COL.FECHA_REGISTRO - 1]);
        const diasTranscurridos = Math.floor((ahora - fechaRegistro) / (1000 * 60 * 60 * 24));

        // Si han pasado más de 3 días y menos del plazo máximo
        if (diasTranscurridos >= 3 && diasTranscurridos < plazoDias) {
          const reg = datos[i][COL.REG - 1];
          const email = datos[i][COL.EMAIL - 1];

          if (email && validarEmailV8(email)) {
            enviarRecordatorioV8_(reg, datos[i][COL.NOMBRE - 1], email, plazoDias - diasTranscurridos);
            enviados++;
            Utilities.sleep(1000); // Pausa para evitar límites
          }
        }
      }
    }

    registrarAuditoriaV8('TRIGGERS', 'RECORDATORIOS', `Enviados: ${enviados}`, '');

    return { enviados };

  } catch (e) {
    Logger.log('Error en recordatorios automáticos: ' + e.message);
    registrarAuditoriaV8('TRIGGERS', 'ERROR_RECORDATORIOS', e.message, '');
  }
}

/**
 * Envía email de recordatorio individual
 */
function enviarRecordatorioV8_(reg, nombre, email, diasRestantes) {
  try {
    const plantilla = obtenerPlantillaCorreoV8_('RECORDATORIO');
    const formId = obtenerConfigV8('FORM_ID') || CONFIG_V8.FORM_ID;
    const urlForm = `https://docs.google.com/forms/d/e/${formId}/viewform?${CONFIG_V8.FORM_ENTRY_REG}=${encodeURIComponent(reg)}`;

    let cuerpo = plantilla.cuerpo;
    cuerpo = cuerpo.replace(/{NOMBRE}/g, nombre);
    cuerpo = cuerpo.replace(/{REG}/g, reg);
    cuerpo = cuerpo.replace(/{URL_FORMULARIO}/g, urlForm);
    cuerpo = cuerpo.replace(/{DIAS_RESTANTES}/g, diasRestantes);

    GmailApp.sendEmail(email, plantilla.asunto, '', {
      htmlBody: cuerpo,
      name: 'DOM La Serena - Sección Patentes',
      replyTo: CONFIG_V8.EMAIL_INSTITUCIONAL
    });
  } catch (e) {
    Logger.log('Error enviando recordatorio: ' + e.message);
  }
}

/**
 * Trigger manual para enviar recordatorios (alternativa al automático)
 * EXPERIENCIA DE TERRENO: Si es más práctico, se puede ejecutar manualmente
 */
function enviarRecordatoriosManualesV8() {
  const resultado = enviarRecordatoriosAutomaticosV8();
  const ui = SpreadsheetApp.getUi();
  ui.alert('Recordatorios', `Se enviaron ${resultado.enviados} recordatorios`, ui.ButtonSet.OK);
}

// ═══════════════════════════════════════════════════════════════════
// FUNCIONES AUXILIARES DE HTML (Placeholders para 02_INTERFACES_V8)
// ═══════════════════════════════════════════════════════════════════

/**
 * Genera HTML del Dashboard principal
 * EXPERIENCIA DE TERRENO: Dashboard con opción de agregar 3-4 usuarios a la vez
 */
function generarHTMLDashboardV8_() {
  return `<!DOCTYPE html>
<html><head>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Segoe UI',Arial;background:#1a1a2e;color:#fff;padding:20px}
  h1{color:#00C853;margin-bottom:20px}
  .info{background:#16213e;padding:20px;border-radius:10px;margin-bottom:20px}
</style>
</head><body>
<h1>🏛️ Dashboard V8 - En desarrollo</h1>
<div class="info">
  <p>Dashboard principal con opción de agregar múltiples usuarios</p>
  <p>Se completará en 02_INTERFACES_V8.html</p>
</div>
</body></html>`;
}

/**
 * Genera HTML WebApp principal móvil
 */
function generarHTMLWebAppPrincipalV8_() {
  return `<!DOCTYPE html>
<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:Arial;background:#1a1a2e;color:#fff;padding:20px;text-align:center}
  h1{color:#00C853}
  .btn{background:#00C853;color:#000;padding:15px 30px;border:none;border-radius:10px;font-size:16px;margin:10px}
</style>
</head><body>
<h1>📱 Inspección Patentes V8</h1>
<p style="margin:20px 0">WebApp Móvil para iPad/Android</p>
<button class="btn" onclick="location.href='?action=visitas'">Ver Visitas del Día</button>
<p style="margin-top:30px;color:#888;font-size:12px">Interfaz completa en 02_INTERFACES_V8.html</p>
</body></html>`;
}

/**
 * Genera HTML de visitas móvil
 */
function generarHTMLVisitasMovilV8_() {
  return `<!DOCTYPE html>
<html><body style="font-family:Arial;padding:20px;background:#1a1a2e;color:#fff">
<h2 style="color:#00C853">Visitas del Día</h2>
<p>Interfaz completa en 02_INTERFACES_V8.html</p>
</body></html>`;
}

/**
 * Genera HTML de checklist móvil
 */
function generarHTMLChecklistMovilV8_(reg) {
  return `<!DOCTYPE html>
<html><body style="font-family:Arial;padding:20px;background:#1a1a2e;color:#fff">
<h2 style="color:#00C853">Checklist REG ${reg}</h2>
<p>Interfaz completa en 02_INTERFACES_V8.html</p>
</body></html>`;
}

// ═══════════════════════════════════════════════════════════════════
// FIN DEL NÚCLEO V8
// ═══════════════════════════════════════════════════════════════════
