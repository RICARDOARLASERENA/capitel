/**
 * ═══════════════════════════════════════════════════════════════
 * 00_INSTALADOR_V8.gs
 * SISTEMA PATENTES DOM LA SERENA V8 - INSTALADOR COMPLETO
 * Instalación interactiva unificada - NO sobrescribe si existe
 * ═══════════════════════════════════════════════════════════════
 */

const VERSION_SISTEMA = 'V8';
const NOMBRE_CARPETA_MADRE = 'PATENTES_DOM_LA_SERENA_' + VERSION_SISTEMA;

// ═══════════════════════════════════════════════════════════════
// COLORES DE ESTADOS (Pastel - Estandarizados V8)
// ═══════════════════════════════════════════════════════════════
const COLORES_ESTADO = {
  DESISTIDO: '#FFCDD2',        // Rojo pastel
  LISTO_VISITA: '#FFF9C4',     // Amarillo pastel
  OBSERVADO: '#B2EBF2',        // Cian pastel
  LOCAL_APTO: '#C8E6C9',       // Verde pastel
  PENDIENTE: '#FFFFFF',        // Blanco
  FORM_ENVIADO: '#E3F2FD',     // Azul claro
  PROGRAMADO: '#E1BEE7',       // Morado claro
  DENEGADO: '#FFCCBC'          // Naranja pastel
};

// ═══════════════════════════════════════════════════════════════
// INSTALADOR PRINCIPAL UNIFICADO V8
// ═══════════════════════════════════════════════════════════════

/**
 * Instalador maestro que coordina todo el proceso
 */
function instalarSistemaV8Completo() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let resultado = {
    carpetaMadre: null,
    carpetaExp: null,
    carpetaForm: null,
    sectoresCreados: 0,
    hojasCreadas: [],
    formCopiado: null,
    menuInstalado: false,
    triggerRecordatorio: false,
    triggerFormSubmit: false
  };

  ss.toast('🚀 Iniciando instalación V8...', 'Sistema Patentes', 3);

  // ─── PASO 1: CARPETA MADRE ───
  const paso1 = ui.alert(
    '📁 PASO 1/8: Carpeta Principal',
    '¿Crear o usar carpeta "' + NOMBRE_CARPETA_MADRE + '"?\n\n' +
    '• Sí = Crear nueva (si no existe) o usar existente\n' +
    '• No = Buscar otra carpeta\n' +
    '• Cancelar = Salir',
    ui.ButtonSet.YES_NO_CANCEL
  );

  if (paso1 === ui.Button.CANCEL) {
    ss.toast('❌ Instalación cancelada', 'Cancelado', 3);
    return;
  }

  ss.toast('⏳ Configurando carpeta madre...', 'Paso 1/8', 30);

  if (paso1 === ui.Button.YES) {
    resultado.carpetaMadre = obtenerOCrearCarpetaMadre_();
  } else {
    resultado.carpetaMadre = buscarCarpetaExistente_(ui);
    if (!resultado.carpetaMadre) return;
  }
  ss.toast('✅ Carpeta madre: ' + resultado.carpetaMadre.getName(), 'Paso 1/8 Completo', 3);

  // ─── PASO 2: SUBCARPETAS ───
  const paso2 = ui.alert(
    '📂 PASO 2/8: Subcarpetas del Sistema',
    '¿Crear subcarpetas necesarias?\n\n' +
    '• EXPEDIENTES\n' +
    '• PLANOS_RECIBIDOS\n' +
    '• INFORMES_Y_DOCS\n' +
    '• FORMULARIOS\n' +
    '• DOCUMENTOS_GENERADOS\n' +
    '• BACKUPS',
    ui.ButtonSet.YES_NO
  );

  if (paso2 === ui.Button.YES) {
    ss.toast('⏳ Verificando subcarpetas...', 'Paso 2/8', 30);
    const subcarpetas = crearSubcarpetasV8_(resultado.carpetaMadre);
    resultado.carpetaExp = subcarpetas.expedientes;
    resultado.carpetaForm = subcarpetas.formularios;
    ss.toast('✅ Subcarpetas listas', 'Paso 2/8 Completo', 3);
  }

  // ─── PASO 3: HOJAS DEL SISTEMA ───
  const paso3 = ui.alert(
    '📊 PASO 3/8: Hojas del Sistema',
    '¿Configurar todas las hojas del sistema V8?\n\n' +
    '• Planilla Maestra\n' +
    '• ConfiguracionGlobal\n' +
    '• Sectores (25 sectores de La Serena)\n' +
    '• Plantillas_Correo\n' +
    '• Configuracion_Plazos\n' +
    '• Configuracion_Colores\n' +
    '• Tipos_Publicidad\n' +
    '• Registro_Usuarios\n' +
    '• Programacion_Inspecciones\n' +
    '• Auditoria\n' +
    '• Plantillas_Docs\n' +
    '• Y más...\n\n' +
    '(No sobrescribe hojas existentes)',
    ui.ButtonSet.YES_NO
  );

  if (paso3 === ui.Button.YES) {
    ss.toast('⏳ Configurando hojas del sistema...', 'Paso 3/8', 60);
    resultado.hojasCreadas = configurarHojasV8_(ss);
    ss.toast('✅ ' + resultado.hojasCreadas.length + ' hojas configuradas', 'Paso 3/8 Completo', 3);
  }

  // ─── PASO 4: CARPETAS DE SECTORES ───
  const paso4 = ui.alert(
    '🗂️ PASO 4/8: Carpetas de Sectores',
    '¿Crear carpetas de los 25 sectores de La Serena en EXPEDIENTES?\n\n' +
    'Se leerán desde la hoja "Sectores".\n' +
    '(No crea duplicados si ya existen)',
    ui.ButtonSet.YES_NO
  );

  if (paso4 === ui.Button.YES && resultado.carpetaExp) {
    ss.toast('⏳ Creando carpetas de sectores...', 'Paso 4/8', 60);
    resultado.sectoresCreados = crearCarpetasSectores_(ss, resultado.carpetaExp);
    ss.toast('✅ ' + resultado.sectoresCreados + ' sectores verificados', 'Paso 4/8 Completo', 3);
  }

  // ─── PASO 5: FORMULARIO ───
  const paso5 = ui.alert(
    '📝 PASO 5/8: Formulario de Patentes',
    '¿Configurar formulario principal?\n\n' +
    '• Vincular Form existente (necesita ID)\n' +
    '• Se moverá a carpeta FORMULARIOS\n' +
    '• Se vinculará al Spreadsheet\n\n' +
    'Sí = Vincular formulario existente\n' +
    'No = Omitir (configurar después)',
    ui.ButtonSet.YES_NO
  );

  if (paso5 === ui.Button.YES) {
    ss.toast('⏳ Configurando formulario...', 'Paso 5/8', 30);
    resultado.formCopiado = configurarFormularioV8_(ui, ss, resultado.carpetaForm);
    if (resultado.formCopiado) {
      ss.toast('✅ Formulario configurado', 'Paso 5/8 Completo', 3);
    }
  }

  // ─── PASO 6: GUARDAR CONFIGURACIÓN ───
  ss.toast('⏳ Guardando configuración del sistema...', 'Paso 6/8', 10);
  guardarConfiguracionV8_(ss, resultado);
  ss.toast('✅ Configuración guardada', 'Paso 6/8 Completo', 3);

  // ─── PASO 7: MENÚ Y TRIGGERS ───
  const paso7 = ui.alert(
    '📋 PASO 7/8: Menú y Automatizaciones',
    '¿Instalar menú y triggers automáticos?\n\n' +
    '• Menú "🏛️ Patentes V8" en Spreadsheet\n' +
    '• Trigger onFormSubmit (procesar respuestas)\n' +
    '• Trigger recordatorios (L y V a las 10:00)\n\n' +
    'Esto activa la automatización completa del sistema.',
    ui.ButtonSet.YES_NO
  );

  if (paso7 === ui.Button.YES) {
    ss.toast('⏳ Instalando menú y triggers...', 'Paso 7/8', 15);
    instalarMenuV8_();
    resultado.triggerRecordatorio = instalarTriggerRecordatorio_(ss);
    resultado.triggerFormSubmit = instalarTriggerFormSubmit_(ss);
    resultado.menuInstalado = true;
    ss.toast('✅ Menú y triggers instalados', 'Paso 7/8 Completo', 3);
  }

  // ─── PASO 8: INICIALIZACIÓN DE DATOS ───
  const paso8 = ui.alert(
    '🎯 PASO 8/8: Inicialización de Datos',
    '¿Cargar datos de ejemplo y configuración inicial?\n\n' +
    '• Ejemplos de plantillas de correo\n' +
    '• Configuración de plazos recomendada\n' +
    '• Tipos de publicidad según ordenanza\n' +
    '• Sectores de La Serena\n\n' +
    'Recomendado para instalación nueva.',
    ui.ButtonSet.YES_NO
  );

  if (paso8 === ui.Button.YES) {
    ss.toast('⏳ Inicializando datos del sistema...', 'Paso 8/8', 20);
    inicializarDatosV8_(ss);
    ss.toast('✅ Datos inicializados', 'Paso 8/8 Completo', 3);
  }

  // ─── RESUMEN FINAL ───
  mostrarResumenV8_(ui, resultado);

  // Mensaje final
  ss.toast('🎉 ¡Instalación V8 completada!', 'Sistema Patentes V8', 5);
}

// ═══════════════════════════════════════════════════════════════
// FUNCIONES DE CARPETAS (NO SOBRESCRIBEN)
// ═══════════════════════════════════════════════════════════════

function obtenerOCrearCarpetaMadre_() {
  const root = DriveApp.getRootFolder();
  const existentes = root.getFoldersByName(NOMBRE_CARPETA_MADRE);

  if (existentes.hasNext()) {
    return existentes.next();
  }
  return root.createFolder(NOMBRE_CARPETA_MADRE);
}

function buscarCarpetaExistente_(ui) {
  const root = DriveApp.getRootFolder();
  const carpetas = root.getFolders();
  let lista = [];
  let contador = 0;

  while (carpetas.hasNext() && contador < 30) {
    const c = carpetas.next();
    if (c.getName().toUpperCase().includes('PATENTE')) {
      lista.push(c);
      contador++;
    }
  }

  if (lista.length === 0) {
    ui.alert('No se encontraron carpetas con "PATENTE".\nSe creará una nueva.');
    return obtenerOCrearCarpetaMadre_();
  }

  let mensaje = 'Carpetas encontradas:\n\n';
  lista.forEach((c, i) => {
    mensaje += (i + 1) + '. ' + c.getName() + '\n';
  });
  mensaje += '\nEscribe el número (1-' + lista.length + '):';

  const resp = ui.prompt('Seleccionar Carpeta', mensaje, ui.ButtonSet.OK_CANCEL);
  if (resp.getSelectedButton() === ui.Button.CANCEL) return null;

  const idx = parseInt(resp.getResponseText()) - 1;
  if (idx >= 0 && idx < lista.length) {
    return lista[idx];
  }

  ui.alert('Selección inválida. Se creará carpeta nueva.');
  return obtenerOCrearCarpetaMadre_();
}

function crearSubcarpetasV8_(madre) {
  const nombres = [
    'EXPEDIENTES',
    'PLANOS_RECIBIDOS',
    'INFORMES_Y_DOCS',
    'FORMULARIOS',
    'DOCUMENTOS_GENERADOS',
    'BACKUPS'
  ];

  let resultado = {
    expedientes: null,
    formularios: null,
    documentos: null,
    backups: null
  };

  nombres.forEach(nombre => {
    const existe = madre.getFoldersByName(nombre);
    let carpeta;

    if (existe.hasNext()) {
      carpeta = existe.next();
    } else {
      carpeta = madre.createFolder(nombre);
    }

    if (nombre === 'EXPEDIENTES') resultado.expedientes = carpeta;
    if (nombre === 'FORMULARIOS') resultado.formularios = carpeta;
    if (nombre === 'DOCUMENTOS_GENERADOS') resultado.documentos = carpeta;
    if (nombre === 'BACKUPS') resultado.backups = carpeta;
  });

  return resultado;
}

function crearCarpetasSectores_(ss, carpetaExp) {
  const sectores = obtenerSectoresDesdeHoja_(ss);
  let creados = 0;
  let existentes = 0;

  sectores.forEach((s, i) => {
    ss.toast('Verificando sector ' + (i + 1) + '/' + sectores.length + '...', '🗂️ Sectores', 2);
    const nombreCarpeta = s.cod + '_' + s.nombre;

    const existe = carpetaExp.getFoldersByName(nombreCarpeta);
    if (existe.hasNext()) {
      existentes++;
    } else {
      carpetaExp.createFolder(nombreCarpeta);
      creados++;
    }
  });

  return creados + existentes;
}

// ═══════════════════════════════════════════════════════════════
// CONFIGURACIÓN DE HOJAS V8 (COMPLETO Y MEJORADO)
// ═══════════════════════════════════════════════════════════════

function configurarHojasV8_(ss) {
  const definiciones = obtenerDefinicionesHojasV8_();
  let creadas = [];

  definiciones.forEach(def => {
    let hoja = ss.getSheetByName(def.nombre);

    if (!hoja) {
      hoja = ss.insertSheet(def.nombre);

      if (def.encabezados && def.encabezados.length > 0) {
        const rango = hoja.getRange(1, 1, 1, def.encabezados.length);
        rango.setValues([def.encabezados]);
        rango.setBackground(def.color)
              .setFontColor('white')
              .setFontWeight('bold')
              .setHorizontalAlignment('center');
        hoja.setFrozenRows(1);
      }

      if (def.datosIniciales && def.datosIniciales.length > 0) {
        hoja.getRange(2, 1, def.datosIniciales.length, def.datosIniciales[0].length)
            .setValues(def.datosIniciales);
      }

      // Proteger hojas de configuración críticas
      if (def.proteger) {
        const protection = hoja.protect().setDescription('Hoja de configuración del sistema');
        protection.setWarningOnly(true);
      }

      creadas.push(def.nombre);
    }
  });

  return creadas;
}

function obtenerDefinicionesHojasV8_() {
  return [
    {
      nombre: 'Planilla Maestra',
      color: '#1a237e',
      proteger: false,
      encabezados: [
        'TIMESTAMP', 'REG', 'NOMBRE', 'RUT', 'EMAIL', 'TELEFONO', 'DIRECCION',
        'ROL', 'GIRO', 'GIRO_PATENTE', 'NOMBRE_FANTASIA', 'TIPO_TRAMITE',
        'SUPERFICIE_M2', 'TRABAJADORES', 'SECTOR', 'ESTADO', 'FASE',
        'TIENE_GAS', 'CANTIDAD_EXTINTORES', 'CANTIDAD_ESTACIONAMIENTOS',
        'TIPO_PUBLICIDAD', 'SUPERFICIE_PUBLICIDAD_M2',
        'FECHA_ENVIO_FORM', 'FECHA_RESPUESTA', 'URL_CARPETA', 'URL_FORM_RESP',
        'FECHA_PROGRAMACION', 'INSPECTOR_ASIG', 'FECHA_INSPECCION', 'RESULTADO_INSP',
        'OBSERVACIONES', 'NRO_RECEPCION_DEF', 'FECHA_RECEPCION_DEF', 'NUMERAL_ARCHIVO'
      ]
    },
    {
      nombre: 'ConfiguracionGlobal',
      color: '#4a148c',
      proteger: true,
      encabezados: ['PARAMETRO', 'VALOR', 'DESCRIPCION']
    },
    {
      nombre: 'Registro_Usuarios',
      color: '#00695c',
      proteger: false,
      encabezados: [
        'TIMESTAMP', 'REG', 'NOMBRE', 'EMAIL', 'ESTADO',
        'DUPLICADO', 'FECHA_ENVIO_FORM', 'INTENTOS_ENVIO'
      ]
    },
    {
      nombre: 'Programacion_Inspecciones',
      color: '#1565c0',
      proteger: false,
      encabezados: [
        'REG', 'NOMBRE', 'FANTASIA', 'DIRECCION', 'SECTOR',
        'FECHA_PROG', 'INSPECTOR', 'ESTADO', 'RESULTADO', 'HORA_INICIO', 'HORA_FIN'
      ]
    },
    {
      nombre: 'Auditoria',
      color: '#bf360c',
      proteger: false,
      encabezados: [
        'FECHA', 'USUARIO', 'ACCION', 'DETALLE', 'REG', 'IP', 'MODULO'
      ]
    },
    {
      nombre: 'Sectores',
      color: '#2e7d32',
      proteger: true,
      encabezados: ['COD', 'NOMBRE', 'COLOR', 'DESCRIPCION'],
      datosIniciales: obtenerSectoresPorDefecto_()
    },
    {
      nombre: 'Plantillas_Correo',
      color: '#6a1b9a',
      proteger: true,
      encabezados: ['TIPO', 'ASUNTO', 'CUERPO', 'VARIABLES', 'ACTIVO'],
      datosIniciales: obtenerPlantillasCorreoPorDefecto_()
    },
    {
      nombre: 'Plantillas_Docs',
      color: '#00838f',
      proteger: true,
      encabezados: ['TIPO_DOC', 'TITULO', 'CONTENIDO_BASE', 'ACTIVO'],
      datosIniciales: obtenerPlantillasDocsPorDefecto_()
    },
    {
      nombre: 'Configuracion_Plazos',
      color: '#e65100',
      proteger: true,
      encabezados: ['PARAMETRO', 'VALOR', 'UNIDAD', 'DESCRIPCION'],
      datosIniciales: obtenerConfiguracionPlazosPorDefecto_()
    },
    {
      nombre: 'Configuracion_Colores',
      color: '#5d4037',
      proteger: true,
      encabezados: ['ESTADO', 'COLOR_HEX', 'DESCRIPCION'],
      datosIniciales: obtenerConfiguracionColoresPorDefecto_()
    },
    {
      nombre: 'Tipos_Publicidad',
      color: '#7b1fa2',
      proteger: true,
      encabezados: ['CODIGO', 'TIPO', 'DESCRIPCION', 'NORMATIVA'],
      datosIniciales: obtenerTiposPublicidadPorDefecto_()
    },
    {
      nombre: 'Checklist_Inspecciones',
      color: '#37474f',
      proteger: false,
      encabezados: [
        'TIMESTAMP', 'REG', 'INSPECTOR',
        'recepcion_def', 'gas_tc6', 'te1_electrico', 'bano_accesible',
        'senaletica', 'extintores', 'estacionamientos', 'OBS_CHECKLIST'
      ]
    },
    {
      nombre: 'Publicidad_Inspecciones',
      color: '#4a148c',
      proteger: false,
      encabezados: [
        'TIMESTAMP', 'REG', 'TIPO', 'ANCHO_CM', 'ALTO_CM', 'AREA_M2',
        'MATERIAL', 'LUMINOSO', 'UBICACION', 'OBSERVACIONES', 'CUMPLE_NORMATIVA'
      ]
    },
    {
      nombre: 'Historico_Estados',
      color: '#004d40',
      proteger: false,
      encabezados: [
        'TIMESTAMP', 'REG', 'ESTADO_ANTERIOR', 'ESTADO_NUEVO',
        'USUARIO', 'MOTIVO', 'AUTOMATICO'
      ]
    }
  ];
}

// ═══════════════════════════════════════════════════════════════
// DATOS POR DEFECTO (CONFIGURACIÓN INICIAL)
// ═══════════════════════════════════════════════════════════════

function obtenerSectoresPorDefecto_() {
  return [
    ['01', 'Serena Norte', '#E8F5E9', 'Sector norte de La Serena'],
    ['02', 'Parque Alemania', '#E3F2FD', 'Zona Parque Alemania'],
    ['03', 'Compañia Baja', '#FFF3E0', 'Compañía sector bajo'],
    ['04', 'Compañia Alta', '#F3E5F5', 'Compañía sector alto'],
    ['05', 'Villa Lambert', '#E0F7FA', 'Población Villa Lambert'],
    ['06', 'El Olivar', '#FBE9E7', 'Sector El Olivar'],
    ['07', 'Islon-Romero-Lambert-LaLaja', '#F1F8E9', 'Sectores integrados'],
    ['08', 'Altovalsol-Pelicana-Elqui', '#E8EAF6', 'Sector oriente'],
    ['09', 'Caleta San Pedro', '#E0F2F1', 'Zona costera San Pedro'],
    ['10', 'Puertas del Mar', '#FFF8E1', 'Sector Puertas del Mar'],
    ['11', 'Zona Tipica Centro', '#FCE4EC', 'Centro histórico protegido'],
    ['12', 'Av Francisco de Aguirre', '#E1F5FE', 'Avenida principal'],
    ['13', 'Playa El Faro', '#F9FBE7', 'Sector costero El Faro'],
    ['14', 'Playa 4 Esquinas', '#EDE7F6', 'Playa 4 Esquinas'],
    ['15', 'Playa Canto del Agua', '#E0F7FA', 'Sector Canto del Agua'],
    ['16', 'La Portada-Huanhuali', '#EFEBE9', 'Sectores sur'],
    ['17', 'Barrio Universitario', '#E8F5E9', 'Zona universitaria'],
    ['18', 'Vista Hermosa-Los Huertos', '#E3F2FD', 'Sectores residenciales'],
    ['19', 'Balmaceda 4 Esquinas', '#FFF3E0', 'Intersección principal'],
    ['20', 'Villa El Indio-Hibiscus', '#F3E5F5', 'Poblaciones'],
    ['21', '4 Esquinas-Las Palmeras', '#E0F7FA', 'Sector comercial'],
    ['22', 'San Joaquin', '#FBE9E7', 'Población San Joaquín'],
    ['23', 'Serena Oriente', '#F1F8E9', 'Sector oriente ciudad'],
    ['24', 'El Milagro 2', '#E8EAF6', 'Población El Milagro'],
    ['25', 'Otro Sector', '#ECEFF1', 'Sectores no especificados']
  ];
}

function obtenerPlantillasCorreoPorDefecto_() {
  return [
    [
      'ENVIO_FORM',
      'Solicitud de Patente Municipal - REG {reg}',
      'Estimado/a {nombre},\n\nSe ha iniciado el trámite de su patente comercial con REG {reg}.\n\nPor favor complete el siguiente formulario:\n{link_form}\n\nPlazo: {plazo_dias} días hábiles.\n\nSaludos cordiales,\nDirección de Obras Municipales\nLa Serena',
      '{nombre}, {reg}, {link_form}, {plazo_dias}',
      'SI'
    ],
    [
      'RECORDATORIO',
      'Recordatorio: Complete su formulario - REG {reg}',
      'Estimado/a {nombre},\n\nLe recordamos que tiene pendiente completar el formulario de patente.\n\n{link_form}\n\nSi desea desistir, haga clic aquí:\n{link_desistir}\n\nSaludos,\nDOM La Serena',
      '{nombre}, {reg}, {link_form}, {link_desistir}',
      'SI'
    ],
    [
      'CONFIRMACION_DESISTIMIENTO',
      'Confirmación de Desistimiento - REG {reg}',
      'Estimado/a {nombre},\n\nHemos recibido su solicitud de desistimiento.\n\nMotivo: {motivo}\n\nNos comunicaremos para confirmar.\n\nSaludos,\nDOM La Serena',
      '{nombre}, {reg}, {motivo}, {telefono}',
      'SI'
    ],
    [
      'PROGRAMACION_VISITA',
      'Visita de Inspección Programada - REG {reg}',
      'Estimado/a {nombre},\n\nSe ha programado visita de inspección para el día {fecha} a las {hora}.\n\nDirección: {direccion}\n\nInspector asignado: {inspector}\n\nPor favor asegúrese de estar presente.\n\nSaludos,\nDOM La Serena',
      '{nombre}, {reg}, {fecha}, {hora}, {direccion}, {inspector}',
      'SI'
    ]
  ];
}

function obtenerPlantillasDocsPorDefecto_() {
  return [
    [
      'INFORME_DESISTIMIENTO',
      'Informe de Desistimiento',
      'El solicitante con REG {reg} ha desistido de su trámite.\n\nMotivo declarado: {motivo}\nFecha: {fecha}\nEstado anterior: {estado_anterior}\n\nContacto: {telefono}',
      'SI'
    ],
    [
      'ACTA_INSPECCION',
      'Acta de Inspección',
      'Acta de inspección para REG {reg}\n\nFecha visita: {fecha}\nInspector: {inspector}\nResultado: {resultado}\n\nObservaciones:\n{observaciones}',
      'SI'
    ],
    [
      'ACTA_PUBLICIDAD',
      'Acta de Publicidad',
      'Verificación de publicidad para REG {reg}\n\nTipo: {tipo_publicidad}\nSuperficie: {superficie_m2} m²\n\nCumple normativa: {cumple}',
      'SI'
    ]
  ];
}

function obtenerConfiguracionPlazosPorDefecto_() {
  return [
    ['PLAZO_RESPUESTA_FORM', '15', 'días', 'Días para completar formulario'],
    ['DIAS_RECORDATORIO', 'LUNES,VIERNES', 'días', 'Días de envío de recordatorios'],
    ['HORA_RECORDATORIO', '10', 'hora', 'Hora de envío (formato 24h)'],
    ['PLAZO_DESISTIR', '30', 'días', 'Días máximo para desistir'],
    ['DIAS_AVISO_VENCIMIENTO', '3', 'días', 'Días antes de vencer para avisar'],
    ['TIMEOUT_INSPECCION', '120', 'minutos', 'Tiempo máximo por inspección']
  ];
}

function obtenerConfiguracionColoresPorDefecto_() {
  return [
    ['DESISTIDO', '#FFCDD2', 'Rojo pastel - Usuario desistió'],
    ['LISTO_VISITA', '#FFF9C4', 'Amarillo pastel - Programar visita'],
    ['OBSERVADO', '#B2EBF2', 'Cian pastel - Tiene observaciones'],
    ['LOCAL_APTO', '#C8E6C9', 'Verde pastel - Aprobado'],
    ['PENDIENTE', '#FFFFFF', 'Blanco - Sin procesar'],
    ['FORM_ENVIADO', '#E3F2FD', 'Azul claro - Esperando respuesta'],
    ['PROGRAMADO', '#E1BEE7', 'Morado claro - Visita programada'],
    ['DENEGADO', '#FFCCBC', 'Naranja pastel - Solicitud denegada']
  ];
}

function obtenerTiposPublicidadPorDefecto_() {
  return [
    ['BW', 'Building Wrap', 'Tela adosada al edificio', 'Ord. Local N°10 Art. 15'],
    ['BA', 'Bastidor', 'Soporte estático en fachada (max 40x40cm)', 'Ord. Local N°10 Art. 12'],
    ['LA', 'Letrero adosado', 'Adherido al muro o vidriera', 'Ord. Local N°10 Art. 8'],
    ['LC', 'Letrero caminero', 'Sobre pilares (12m x 4m)', 'Ord. Local N°10 Art. 18'],
    ['LG', 'Letrero colgante', 'En altura sobre estructuras', 'Ord. Local N°10 Art. 10'],
    ['LS', 'Letrero sobresaliente', 'Perpendicular a fachada', 'Ord. Local N°10 Art. 9'],
    ['TO', 'Tótem', 'Estructura vertical autosoportante', 'Ord. Local N°10 Art. 16'],
    ['PD', 'Pantalla digital', 'Cristal líquido/LED animado', 'Ord. Local N°10 Art. 20'],
    ['MQ', 'Marquesina', 'Cajón saliente sobre acera', 'Ord. Local N°10 Art. 11'],
    ['PA', 'Paleta publicitaria', 'Unipole, súper site y similares', 'Ord. Local N°10 Art. 19'],
    ['TP', 'TopSite', 'Estructura metálica 3x5m en vía pública', 'Ord. Local N°10 Art. 17'],
    ['UN', 'Unipol', 'Pilar metálico de gran altura', 'Ord. Local N°10 Art. 19'],
    ['NN', 'Ninguna', 'Sin publicidad exterior', 'N/A']
  ];
}

function obtenerSectoresDesdeHoja_(ss) {
  const hoja = ss.getSheetByName('Sectores');
  if (!hoja || hoja.getLastRow() < 2) {
    return obtenerSectoresPorDefecto_().map(s => ({
      cod: s[0],
      nombre: s[1],
      color: s[2],
      descripcion: s[3]
    }));
  }

  const datos = hoja.getRange(2, 1, hoja.getLastRow() - 1, 4).getValues();
  return datos
    .map(row => ({
      cod: row[0],
      nombre: row[1],
      color: row[2] || '#FFFFFF',
      descripcion: row[3] || ''
    }))
    .filter(s => s.cod && s.nombre);
}

// ═══════════════════════════════════════════════════════════════
// FORMULARIO
// ═══════════════════════════════════════════════════════════════

function configurarFormularioV8_(ui, ss, carpetaForm) {
  const resp = ui.prompt(
    '📝 Vincular Formulario',
    'Pega el ID del Google Form existente:\n\n' +
    '(El ID está en la URL: forms.google.com/d/[ID]/edit)\n\n' +
    'Deja vacío si no tienes formulario aún.',
    ui.ButtonSet.OK_CANCEL
  );

  if (resp.getSelectedButton() !== ui.Button.OK) return null;

  const formId = resp.getResponseText().trim();
  if (!formId) return null;

  try {
    const form = FormApp.openById(formId);

    if (carpetaForm) {
      const formFile = DriveApp.getFileById(formId);
      formFile.moveTo(carpetaForm);
    }

    form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

    return {
      id: formId,
      url: form.getPublishedUrl(),
      editUrl: form.getEditUrl()
    };
  } catch (e) {
    ui.alert('⚠️ Error al vincular formulario:\n' + e.message);
    return null;
  }
}

// ═══════════════════════════════════════════════════════════════
// CONFIGURACIÓN Y TRIGGERS
// ═══════════════════════════════════════════════════════════════

function guardarConfiguracionV8_(ss, resultado) {
  const hoja = ss.getSheetByName('ConfiguracionGlobal');
  if (!hoja) return;

  const timestamp = new Date().toISOString();

  if (hoja.getLastRow() > 1) {
    actualizarParametro_(hoja, 'ID_CARPETA_MADRE', resultado.carpetaMadre ? resultado.carpetaMadre.getId() : '');
    actualizarParametro_(hoja, 'ID_CARPETA_EXPEDIENTES', resultado.carpetaExp ? resultado.carpetaExp.getId() : '');
    actualizarParametro_(hoja, 'ID_CARPETA_FORMULARIOS', resultado.carpetaForm ? resultado.carpetaForm.getId() : '');
    if (resultado.formCopiado) {
      actualizarParametro_(hoja, 'ID_FORM', resultado.formCopiado.id);
      actualizarParametro_(hoja, 'URL_FORM', resultado.formCopiado.url);
    }
    actualizarParametro_(hoja, 'VERSION', VERSION_SISTEMA);
    actualizarParametro_(hoja, 'FECHA_ULTIMA_CONFIG', timestamp);
  } else {
    const data = [
      ['VERSION', VERSION_SISTEMA, 'Versión del sistema'],
      ['FECHA_INSTALACION', timestamp, 'Fecha de instalación inicial'],
      ['FECHA_ULTIMA_CONFIG', timestamp, 'Última configuración'],
      ['EMAIL_ADMIN', Session.getActiveUser().getEmail(), 'Email administrador'],
      ['ID_SPREADSHEET', ss.getId(), 'ID de este spreadsheet'],
      ['ID_CARPETA_MADRE', resultado.carpetaMadre ? resultado.carpetaMadre.getId() : '', 'Carpeta raíz del sistema'],
      ['URL_CARPETA_MADRE', resultado.carpetaMadre ? resultado.carpetaMadre.getUrl() : '', 'URL de acceso directo'],
      ['ID_CARPETA_EXPEDIENTES', resultado.carpetaExp ? resultado.carpetaExp.getId() : '', 'Carpeta de expedientes'],
      ['ID_CARPETA_FORMULARIOS', resultado.carpetaForm ? resultado.carpetaForm.getId() : '', 'Carpeta de formularios'],
      ['ID_FORM', resultado.formCopiado ? resultado.formCopiado.id : '', 'ID del formulario principal'],
      ['URL_FORM', resultado.formCopiado ? resultado.formCopiado.url : '', 'URL pública del formulario'],
      ['WEBAPP_URL', ScriptApp.getService().getUrl(), 'URL de la WebApp']
    ];

    hoja.getRange(2, 1, data.length, 3).setValues(data);
  }
}

function actualizarParametro_(hoja, parametro, valor) {
  const datos = hoja.getDataRange().getValues();
  for (let i = 1; i < datos.length; i++) {
    if (datos[i][0] === parametro) {
      hoja.getRange(i + 1, 2).setValue(valor);
      return;
    }
  }
  hoja.appendRow([parametro, valor, '']);
}

function instalarMenuV8_() {
  onOpen();
}

function instalarTriggerRecordatorio_(ss) {
  const triggers = ScriptApp.getProjectTriggers();
  const yaExiste = triggers.some(t => t.getHandlerFunction() === 'enviarRecordatoriosPendientes');

  if (!yaExiste) {
    ScriptApp.newTrigger('enviarRecordatoriosPendientes')
      .timeBased()
      .onWeekDay(ScriptApp.WeekDay.MONDAY)
      .atHour(10)
      .create();

    ScriptApp.newTrigger('enviarRecordatoriosPendientes')
      .timeBased()
      .onWeekDay(ScriptApp.WeekDay.FRIDAY)
      .atHour(10)
      .create();

    return true;
  }
  return false;
}

function instalarTriggerFormSubmit_(ss) {
  const triggers = ScriptApp.getProjectTriggers();
  const yaExiste = triggers.some(t => t.getHandlerFunction() === 'onFormSubmit');

  if (!yaExiste) {
    ScriptApp.newTrigger('onFormSubmit')
      .forSpreadsheet(ss)
      .onFormSubmit()
      .create();
    return true;
  }
  return false;
}

// ═══════════════════════════════════════════════════════════════
// INICIALIZACIÓN DE DATOS
// ═══════════════════════════════════════════════════════════════

function inicializarDatosV8_(ss) {
  // Esta función ya carga todos los datos con las hojas
  // Aquí podríamos agregar datos adicionales si fuera necesario
  ss.toast('✅ Datos del sistema inicializados correctamente', 'Inicialización', 3);
}

// ═══════════════════════════════════════════════════════════════
// RESUMEN FINAL
// ═══════════════════════════════════════════════════════════════

function mostrarResumenV8_(ui, resultado) {
  let msg = '═══════════════════════════════════════════\n';
  msg += '   🎉 INSTALACIÓN V8 COMPLETADA\n';
  msg += '═══════════════════════════════════════════\n\n';

  if (resultado.carpetaMadre) {
    msg += '📁 Carpeta madre: ' + resultado.carpetaMadre.getName() + '\n';
    msg += '   🔗 ' + resultado.carpetaMadre.getUrl() + '\n\n';
  }

  if (resultado.carpetaExp) {
    msg += '📂 Subcarpetas: ✅ Todas creadas\n\n';
  }

  msg += '🗂️ Sectores: ' + resultado.sectoresCreados + ' verificados\n\n';

  if (resultado.hojasCreadas.length > 0) {
    msg += '📊 Hojas nuevas creadas:\n';
    resultado.hojasCreadas.slice(0, 5).forEach(h => {
      msg += '   • ' + h + '\n';
    });
    if (resultado.hojasCreadas.length > 5) {
      msg += '   • ... y ' + (resultado.hojasCreadas.length - 5) + ' más\n';
    }
    msg += '\n';
  }

  if (resultado.formCopiado) {
    msg += '📝 Formulario: ✅ Vinculado\n';
    msg += '   🔗 ' + resultado.formCopiado.url + '\n\n';
  }

  msg += '📋 Menú: ' + (resultado.menuInstalado ? '✅ Instalado' : '⚠️ No instalado') + '\n';
  msg += '⏰ Recordatorios: ' + (resultado.triggerRecordatorio ? '✅ L y V 10:00' : '⚠️ No') + '\n';
  msg += '🔄 Form trigger: ' + (resultado.triggerFormSubmit ? '✅ Activo' : '⚠️ No') + '\n\n';

  msg += '═══════════════════════════════════════════\n';
  msg += '⚡ PRÓXIMOS PASOS:\n';
  msg += '1. Recarga la página (F5) para ver el menú\n';
  msg += '2. Configura las plantillas según necesites\n';
  msg += '3. Revisa la configuración en cada hoja\n';
  msg += '4. ¡Comienza a registrar patentes!\n\n';
  msg += '📚 Usa el menú "🏛️ Patentes V8" para todo\n';
  msg += '═══════════════════════════════════════════';

  ui.alert('✅ INSTALACIÓN COMPLETADA', msg, ui.ButtonSet.OK);
}

// ═══════════════════════════════════════════════════════════════
// MENÚ DEL SISTEMA V8
// ═══════════════════════════════════════════════════════════════

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🏛️ Patentes V8')
    .addItem('📊 Dashboard Principal', 'abrirDashboardV8')
    .addItem('➕ Registrar Usuario', 'abrirRegistroV8')
    .addItem('🔍 Buscar Expediente', 'buscarExpedienteV8')
    .addSeparator()
    .addSubMenu(ui.createMenu('📅 Programación')
      .addItem('Ver Listos para Visita', 'verListosVisita')
      .addItem('Programar Inspecciones', 'abrirProgramacion'))
    .addSubMenu(ui.createMenu('📱 Inspección iPad')
      .addItem('Enviar Lista del Día', 'enviarListaDia')
      .addItem('Generar Doc. Archivo', 'generarDocumentoArchivo'))
    .addSubMenu(ui.createMenu('📄 Documentos')
      .addItem('Generar Contracara', 'menuGenerarContracara')
      .addItem('Generar Acta Patente', 'menuGenerarActaPatente')
      .addItem('Generar Informe', 'menuGenerarInforme')
      .addItem('Reporte Jefatura', 'menuReporteJefatura'))
    .addSeparator()
    .addSubMenu(ui.createMenu('⚙️ Configuración')
      .addItem('🔄 Reinstalar Sistema Completo', 'instalarSistemaV8Completo')
      .addItem('📋 Ver Configuración', 'verConfiguracion')
      .addItem('💾 Exportar Backup JSON', 'exportarBackupJSON')
      .addItem('📥 Importar Backup JSON', 'importarBackupJSON')
      .addItem('🧹 Limpiar Triggers Duplicados', 'limpiarTriggersDuplicados'))
    .addItem('ℹ️ Acerca de V8', 'mostrarAcercaDe')
    .addToUi();
}

function abrirDashboardV8() {
  const html = HtmlService.createHtmlOutputFromFile('02_INTERFACES_V8')
    .setWidth(900)
    .setHeight(650)
    .setTitle('Sistema Patentes V8 - Dashboard');
  SpreadsheetApp.getUi().showModalDialog(html, 'Sistema de Patentes DOM La Serena V8');
}

function abrirRegistroV8() {
  abrirDashboardV8();
}

function buscarExpedienteV8() {
  const ui = SpreadsheetApp.getUi();
  const resp = ui.prompt('🔍 Buscar Expediente', 'Ingrese REG o nombre:', ui.ButtonSet.OK_CANCEL);

  if (resp.getSelectedButton() !== ui.Button.OK) return;

  const termino = resp.getResponseText().trim().toUpperCase();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName('Planilla Maestra');

  if (!hoja) {
    ui.alert('❌ No existe la hoja "Planilla Maestra"');
    return;
  }

  const datos = hoja.getDataRange().getValues();

  for (let i = 1; i < datos.length; i++) {
    if (String(datos[i][1]).toUpperCase().includes(termino) ||
        String(datos[i][2]).toUpperCase().includes(termino)) {
      hoja.activate();
      hoja.getRange(i + 1, 1).activate();
      ss.toast('✅ Encontrado en fila ' + (i + 1), 'Búsqueda', 3);
      return;
    }
  }

  ui.alert('❌ No encontrado', 'No hay resultados para: ' + termino, ui.ButtonSet.OK);
}

function verConfiguracion() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName('ConfiguracionGlobal');
  if (hoja) {
    hoja.activate();
    ss.toast('📋 Mostrando configuración del sistema', 'Configuración', 3);
  }
}

function limpiarTriggersDuplicados() {
  const triggers = ScriptApp.getProjectTriggers();
  const ui = SpreadsheetApp.getUi();

  const funciones = {};
  let eliminados = 0;

  triggers.forEach(trigger => {
    const func = trigger.getHandlerFunction();
    if (!funciones[func]) {
      funciones[func] = [];
    }
    funciones[func].push(trigger);
  });

  for (const func in funciones) {
    const lista = funciones[func];
    if (lista.length > 1) {
      for (let i = 1; i < lista.length; i++) {
        ScriptApp.deleteTrigger(lista[i]);
        eliminados++;
      }
    }
  }

  ui.alert('🧹 Limpieza Completada',
    'Triggers duplicados eliminados: ' + eliminados,
    ui.ButtonSet.OK);
}

function mostrarAcercaDe() {
  const ui = SpreadsheetApp.getUi();
  const msg = '═══════════════════════════════════════\n' +
              '   SISTEMA DE PATENTES V8\n' +
              '═══════════════════════════════════════\n\n' +
              '🏛️ DOM La Serena\n' +
              '📅 Versión: ' + VERSION_SISTEMA + '\n' +
              '👨‍💻 Desarrollado para gestión integral\n' +
              '   de patentes comerciales\n\n' +
              'MÓDULOS:\n' +
              '• Registro de usuarios\n' +
              '• Programación de inspecciones\n' +
              '• Inspección en terreno (iPad)\n' +
              '• Generación de documentos\n' +
              '• Sistema de estadísticas\n' +
              '• Auditoría completa\n\n' +
              '═══════════════════════════════════════';

  ui.alert('ℹ️ Acerca de', msg, ui.ButtonSet.OK);
}

// ═══════════════════════════════════════════════════════════════
// FUNCIONES AUXILIARES DE MENÚ
// ═══════════════════════════════════════════════════════════════

function verListosVisita() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName('Planilla Maestra');
  if (hoja) hoja.activate();
  ss.toast('📋 Mostrando casos listos para visita', 'Programación', 3);
}

function abrirProgramacion() {
  abrirDashboardV8();
}

function enviarListaDia() {
  const ui = SpreadsheetApp.getUi();
  const resp = ui.prompt(
    '📧 Enviar Lista',
    'Ingrese email del inspector\n(deja vacío para usar tu email):',
    ui.ButtonSet.OK_CANCEL
  );

  if (resp.getSelectedButton() === ui.Button.OK) {
    const email = resp.getResponseText().trim() || Session.getActiveUser().getEmail();
    const hoy = Utilities.formatDate(new Date(), 'America/Santiago', 'yyyy-MM-dd');
    // Aquí llamaría a la función del núcleo
    SpreadsheetApp.getActiveSpreadsheet().toast(
      '📧 Funcionalidad disponible en el dashboard',
      'Envío Email',
      5
    );
  }
}

function menuGenerarContracara() {
  const ui = SpreadsheetApp.getUi();
  const resp = ui.prompt('📋 Generar Contracara', 'Ingrese REG:', ui.ButtonSet.OK_CANCEL);
  if (resp.getSelectedButton() === ui.Button.OK) {
    const reg = resp.getResponseText().trim();
    SpreadsheetApp.getActiveSpreadsheet().toast(
      '📋 Use el dashboard para generación completa',
      'Documentos',
      5
    );
  }
}

function menuGenerarActaPatente() {
  menuGenerarContracara();
}

function menuGenerarInforme() {
  menuGenerarContracara();
}

function menuReporteJefatura() {
  SpreadsheetApp.getActiveSpreadsheet().toast(
    '📊 Use el dashboard para reportes',
    'Reportes',
    3
  );
}

// ═══════════════════════════════════════════════════════════════
// EXPORT/IMPORT JSON (MIGRACIÓN Y BACKUP)
// ═══════════════════════════════════════════════════════════════

function exportarBackupJSON() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  ui.alert('💾 Exportar Backup',
    'Esta funcionalidad exportará toda la configuración y datos del sistema.\n\n' +
    'Se creará un archivo JSON en la carpeta del sistema.',
    ui.ButtonSet.OK);

  const backup = {
    version: VERSION_SISTEMA,
    fecha: new Date().toISOString(),
    spreadsheetId: ss.getId(),
    configuracion: exportarHojaComoJSON_(ss, 'ConfiguracionGlobal'),
    sectores: exportarHojaComoJSON_(ss, 'Sectores'),
    plantillasCorreo: exportarHojaComoJSON_(ss, 'Plantillas_Correo'),
    plantillasDocs: exportarHojaComoJSON_(ss, 'Plantillas_Docs'),
    plazos: exportarHojaComoJSON_(ss, 'Configuracion_Plazos'),
    colores: exportarHojaComoJSON_(ss, 'Configuracion_Colores'),
    tiposPublicidad: exportarHojaComoJSON_(ss, 'Tipos_Publicidad'),
    planillaMaestra: exportarHojaComoJSON_(ss, 'Planilla Maestra'),
    registroUsuarios: exportarHojaComoJSON_(ss, 'Registro_Usuarios')
  };

  const json = JSON.stringify(backup, null, 2);

  const carpetaMadreId = obtenerParametroConfig_(ss, 'ID_CARPETA_MADRE');
  let carpeta = DriveApp.getRootFolder();
  if (carpetaMadreId) {
    try {
      carpeta = DriveApp.getFolderById(carpetaMadreId);
      const backupFolder = carpeta.getFoldersByName('BACKUPS');
      if (backupFolder.hasNext()) {
        carpeta = backupFolder.next();
      }
    } catch (e) {}
  }

  const nombreArchivo = 'backup_patentes_V8_' +
    Utilities.formatDate(new Date(), 'America/Santiago', 'yyyyMMdd_HHmmss') + '.json';
  const archivo = carpeta.createFile(nombreArchivo, json, MimeType.PLAIN_TEXT);

  ui.alert('✅ Backup Exportado',
    'Archivo creado:\n' + nombreArchivo + '\n\n' +
    'Ubicación: ' + carpeta.getName() + '\n' +
    'URL: ' + archivo.getUrl(),
    ui.ButtonSet.OK);
}

function exportarHojaComoJSON_(ss, nombreHoja) {
  const hoja = ss.getSheetByName(nombreHoja);
  if (!hoja || hoja.getLastRow() < 1) return [];

  const datos = hoja.getDataRange().getValues();
  const encabezados = datos[0];
  const resultado = [];

  for (let i = 1; i < datos.length; i++) {
    const fila = {};
    for (let j = 0; j < encabezados.length; j++) {
      fila[encabezados[j]] = datos[i][j];
    }
    resultado.push(fila);
  }

  return resultado;
}

function importarBackupJSON() {
  const ui = SpreadsheetApp.getUi();

  const resp = ui.prompt(
    '📥 Importar Backup',
    'Pega el ID del archivo JSON de backup:\n\n' +
    '(El ID está en la URL del archivo en Drive)',
    ui.ButtonSet.OK_CANCEL
  );

  if (resp.getSelectedButton() !== ui.Button.OK) return;

  const fileId = resp.getResponseText().trim();
  if (!fileId) return;

  try {
    const archivo = DriveApp.getFileById(fileId);
    const contenido = archivo.getBlob().getDataAsString();
    const backup = JSON.parse(contenido);

    const confirmar = ui.alert(
      '⚠️ Confirmar Importación',
      'Se importará backup del ' + backup.fecha + '\n' +
      'Versión: ' + backup.version + '\n\n' +
      '¿Desea continuar?\n' +
      '(Los datos existentes serán reemplazados)',
      ui.ButtonSet.YES_NO
    );

    if (confirmar !== ui.Button.YES) return;

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (backup.planillaMaestra) importarJSONaHoja_(ss, 'Planilla Maestra', backup.planillaMaestra);
    if (backup.registroUsuarios) importarJSONaHoja_(ss, 'Registro_Usuarios', backup.registroUsuarios);
    if (backup.sectores) importarJSONaHoja_(ss, 'Sectores', backup.sectores);

    ui.alert('✅ Importación Completada',
      'Datos importados correctamente.\n' +
      'Registros en Planilla Maestra: ' + (backup.planillaMaestra ? backup.planillaMaestra.length : 0),
      ui.ButtonSet.OK);

  } catch (e) {
    ui.alert('❌ Error', 'No se pudo importar:\n' + e.message, ui.ButtonSet.OK);
  }
}

function importarJSONaHoja_(ss, nombreHoja, datos) {
  if (!datos || datos.length === 0) return;

  let hoja = ss.getSheetByName(nombreHoja);
  if (!hoja) {
    hoja = ss.insertSheet(nombreHoja);
  }

  const encabezados = Object.keys(datos[0]);

  if (hoja.getLastRow() > 1) {
    hoja.getRange(2, 1, hoja.getLastRow() - 1, hoja.getLastColumn()).clear();
  }

  if (hoja.getLastRow() === 0) {
    hoja.getRange(1, 1, 1, encabezados.length).setValues([encabezados]);
  }

  const filas = datos.map(obj => encabezados.map(enc => obj[enc] || ''));
  if (filas.length > 0) {
    hoja.getRange(2, 1, filas.length, encabezados.length).setValues(filas);
  }
}

function obtenerParametroConfig_(ss, parametro) {
  const hoja = ss.getSheetByName('ConfiguracionGlobal');
  if (!hoja) return null;

  const datos = hoja.getDataRange().getValues();
  for (let i = 1; i < datos.length; i++) {
    if (datos[i][0] === parametro) {
      return datos[i][1];
    }
  }
  return null;
}
