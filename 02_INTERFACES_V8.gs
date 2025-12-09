/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  02_INTERFACES_V8.gs                                             ║
 * ║  Sistema de Gestión de Patentes DOM La Serena - V8.0             ║
 * ║  Todas las interfaces HTML consolidadas                          ║
 * ║  Basado en experiencia de terreno validada                       ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

// ═══════════════════════════════════════════════════════════════════
// ESTILOS GLOBALES COMPARTIDOS
// ═══════════════════════════════════════════════════════════════════

const ESTILOS_GLOBALES_V8 = `
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    background: #1a1a2e;
    color: #fff;
    padding: 20px;
    line-height: 1.6;
  }

  h1, h2, h3 { color: #00C853; margin-bottom: 15px; }
  h1 { font-size: 24px; }
  h2 { font-size: 20px; }
  h3 { font-size: 16px; color: #888; }

  .container {
    max-width: 1400px;
    margin: 0 auto;
  }

  .header {
    background: #16213e;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .panel {
    background: #16213e;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .grid {
    display: grid;
    gap: 15px;
  }

  .grid-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-4 { grid-template-columns: repeat(4, 1fr); }

  @media (max-width: 768px) {
    .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
  }

  .stat {
    background: #1f2b4d;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  }

  .stat h3 {
    font-size: 32px;
    color: #00C853;
    margin-bottom: 5px;
  }

  .stat p {
    font-size: 12px;
    color: #888;
  }

  .stat.warning h3 { color: #FFA000; }
  .stat.danger h3 { color: #F44336; }
  .stat.info h3 { color: #2196F3; }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    display: block;
    font-size: 13px;
    color: #888;
    margin-bottom: 5px;
  }

  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 12px;
    background: #1f2b4d;
    border: 1px solid #333;
    color: #fff;
    border-radius: 6px;
    font-size: 14px;
  }

  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus {
    outline: none;
    border-color: #00C853;
  }

  .form-group textarea {
    min-height: 80px;
    resize: vertical;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    margin-bottom: 15px;
  }

  .form-row input {
    padding: 10px;
    background: #1f2b4d;
    border: 1px solid #333;
    color: #fff;
    border-radius: 6px;
  }

  .form-row input:focus {
    outline: none;
    border-color: #00C853;
  }

  .btn {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
    transition: all 0.2s;
  }

  .btn:active { transform: scale(0.98); }

  .btn-primary {
    background: #00C853;
    color: #000;
  }

  .btn-primary:hover { background: #00E676; }

  .btn-secondary {
    background: #333;
    color: #fff;
  }

  .btn-secondary:hover { background: #444; }

  .btn-danger {
    background: #F44336;
    color: #fff;
  }

  .btn-danger:hover { background: #E53935; }

  .btn-small {
    padding: 8px 16px;
    font-size: 12px;
  }

  .btn-block {
    width: 100%;
    margin-top: 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    background: #2C5F8D;
    padding: 12px;
    text-align: left;
    font-size: 12px;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  td {
    padding: 10px;
    border-bottom: 1px solid #333;
    font-size: 13px;
  }

  tr:hover {
    background: #1f2b4d;
  }

  .checkbox {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .status-msg {
    padding: 12px;
    border-radius: 6px;
    margin-top: 15px;
    text-align: center;
    font-size: 13px;
  }

  .status-msg.success { background: #1B5E20; color: #A5D6A7; }
  .status-msg.error { background: #B71C1C; color: #EF9A9A; }
  .status-msg.info { background: #1565C0; color: #90CAF9; }

  .loading {
    text-align: center;
    padding: 40px;
    color: #888;
  }

  .loading::after {
    content: '';
    display: block;
    width: 40px;
    height: 40px;
    margin: 20px auto;
    border: 4px solid #333;
    border-top-color: #00C853;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .empty {
    text-align: center;
    padding: 40px;
    color: #888;
    font-size: 14px;
  }

  .toolbar {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
    flex-wrap: wrap;
  }

  .badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: bold;
  }

  .badge.green { background: #4CAF50; color: #000; }
  .badge.yellow { background: #FFA000; color: #000; }
  .badge.red { background: #F44336; color: #fff; }
  .badge.blue { background: #2196F3; color: #fff; }

  .card {
    background: #1f2b4d;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .card:hover {
    background: #2a3a5d;
    transform: translateY(-2px);
  }

  .card.selected {
    border-left: 4px solid #00C853;
  }
</style>
`;

// ═══════════════════════════════════════════════════════════════════
// DASHBOARD PRINCIPAL
// ═══════════════════════════════════════════════════════════════════

/**
 * Genera HTML del Dashboard principal V8
 * EXPERIENCIA DE TERRENO: Dashboard con agregar 3-4 usuarios simultáneamente
 */
function generarHTMLDashboardV8_() {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dashboard - Patentes V8</title>
  ${ESTILOS_GLOBALES_V8}
  <style>
    .modules {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin-top: 20px;
    }

    .module {
      background: #16213e;
      padding: 25px;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s;
      text-align: center;
      border: 2px solid transparent;
    }

    .module:hover {
      background: #1f2b4d;
      transform: translateY(-3px);
      border-color: #00C853;
    }

    .module .icon {
      font-size: 48px;
      margin-bottom: 10px;
    }

    .module .title {
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      margin-bottom: 5px;
    }

    .module .desc {
      font-size: 12px;
      color: #888;
    }

    .quick-add {
      background: #16213e;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
    }

    .quick-add h3 {
      margin-bottom: 15px;
      color: #00C853;
    }

    .user-rows {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 15px;
    }

    .user-row {
      display: grid;
      grid-template-columns: 1fr 2fr 2fr auto;
      gap: 10px;
      align-items: center;
    }

    .user-row input {
      padding: 10px;
      background: #1f2b4d;
      border: 1px solid #333;
      color: #fff;
      border-radius: 6px;
      font-size: 13px;
    }

    .user-row input::placeholder {
      color: #666;
    }

    .user-row input:focus {
      outline: none;
      border-color: #00C853;
    }

    .btn-remove {
      background: #F44336;
      color: #fff;
      border: none;
      padding: 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 18px;
      width: 40px;
      height: 40px;
    }

    .btn-add-row {
      background: #333;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      margin-bottom: 10px;
    }

    .btn-add-row:hover {
      background: #444;
    }

    @media (max-width: 1024px) {
      .modules { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 768px) {
      .modules { grid-template-columns: 1fr; }
      .user-row {
        grid-template-columns: 1fr;
      }
      .btn-remove {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <h1>🏛️ Dashboard - Sistema Patentes V8</h1>
        <p style="color: #888; font-size: 14px;">DOM La Serena</p>
      </div>
      <button class="btn btn-secondary" onclick="actualizarStats()">🔄 Actualizar</button>
    </div>

    <!-- Agregar Múltiples Usuarios -->
    <div class="quick-add">
      <h3>➕ Agregar Usuarios Rápidamente</h3>
      <p style="color: #888; font-size: 13px; margin-bottom: 15px;">
        Agrega hasta 4 usuarios simultáneamente. Solo necesitas REG, Nombre y Email.
      </p>

      <div id="userRows" class="user-rows">
        <div class="user-row">
          <input type="text" placeholder="REG" class="input-reg" data-row="0">
          <input type="text" placeholder="Nombre completo" class="input-nombre" data-row="0">
          <input type="email" placeholder="Email" class="input-email" data-row="0">
          <button class="btn-remove" onclick="removerFila(0)" title="Quitar">&times;</button>
        </div>
      </div>

      <button class="btn-add-row" onclick="agregarFila()" id="btnAgregarFila">
        ➕ Agregar otra fila
      </button>

      <button class="btn btn-primary btn-block" onclick="guardarUsuarios()">
        💾 Guardar Todos los Usuarios
      </button>

      <div id="statusQuickAdd"></div>
    </div>

    <!-- Estadísticas -->
    <div class="grid grid-4" id="statsGrid">
      <div class="stat">
        <h3 id="statTotal">-</h3>
        <p>TOTAL</p>
      </div>
      <div class="stat warning">
        <h3 id="statPendientes">-</h3>
        <p>PENDIENTES</p>
      </div>
      <div class="stat info">
        <h3 id="statListos">-</h3>
        <p>LISTOS VISITA</p>
      </div>
      <div class="stat">
        <h3 id="statAptos">-</h3>
        <p>LOCALES APTOS</p>
      </div>
    </div>

    <!-- Módulos del Sistema -->
    <div class="modules">
      <div class="module" onclick="abrirModulo('registroIndividual')">
        <div class="icon">📝</div>
        <div class="title">Registro Individual</div>
        <div class="desc">Agregar un usuario manualmente</div>
      </div>

      <div class="module" onclick="abrirModulo('enviarFormularios')">
        <div class="icon">📨</div>
        <div class="title">Enviar Formularios</div>
        <div class="desc">Enviar Google Forms a usuarios</div>
      </div>

      <div class="module" onclick="abrirModulo('importarRespuestas')">
        <div class="icon">📥</div>
        <div class="title">Importar Respuestas</div>
        <div class="desc">Procesar respuestas de formularios</div>
      </div>

      <div class="module" onclick="abrirModulo('asignarSectores')">
        <div class="icon">📍</div>
        <div class="title">Asignar Sectores</div>
        <div class="desc">Clasificar por 25 sectores</div>
      </div>

      <div class="module" onclick="abrirModulo('programarVisitas')">
        <div class="icon">📅</div>
        <div class="title">Programar Visitas</div>
        <div class="desc">Agendar inspecciones</div>
      </div>

      <div class="module" onclick="abrirModulo('registrarResultados')">
        <div class="icon">✅</div>
        <div class="title">Registrar Resultados</div>
        <div class="desc">Resultados de inspección</div>
      </div>

      <div class="module" onclick="abrirModulo('generarInformes')">
        <div class="icon">📄</div>
        <div class="title">Generar Informes</div>
        <div class="desc">Informes de visita</div>
      </div>

      <div class="module" onclick="abrirModulo('reporteJefatura')">
        <div class="icon">📊</div>
        <div class="title">Reporte Jefatura</div>
        <div class="desc">Reportes gerenciales</div>
      </div>

      <div class="module" onclick="abrirModulo('desistimientos')">
        <div class="icon">🚫</div>
        <div class="title">Desistimientos</div>
        <div class="desc">Procesar desistimientos</div>
      </div>

      <div class="module" onclick="abrirModulo('webappMovil')">
        <div class="icon">📱</div>
        <div class="title">WebApp Móvil</div>
        <div class="desc">Acceso iPad/Android</div>
      </div>

      <div class="module" onclick="abrirModulo('recordatorios')">
        <div class="icon">🔔</div>
        <div class="title">Recordatorios</div>
        <div class="desc">Enviar recordatorios manuales</div>
      </div>

      <div class="module" onclick="abrirModulo('buscarExpediente')">
        <div class="icon">🔍</div>
        <div class="title">Buscar Expediente</div>
        <div class="desc">Buscar por REG</div>
      </div>
    </div>
  </div>

<script>
let numFilas = 1;
const maxFilas = 4;

function agregarFila() {
  if (numFilas >= maxFilas) {
    mostrarStatus('Máximo 4 usuarios a la vez', 'error', 'statusQuickAdd');
    return;
  }

  const container = document.getElementById('userRows');
  const nuevaFila = document.createElement('div');
  nuevaFila.className = 'user-row';
  nuevaFila.id = 'row-' + numFilas;
  nuevaFila.innerHTML = \`
    <input type="text" placeholder="REG" class="input-reg" data-row="\${numFilas}">
    <input type="text" placeholder="Nombre completo" class="input-nombre" data-row="\${numFilas}">
    <input type="email" placeholder="Email" class="input-email" data-row="\${numFilas}">
    <button class="btn-remove" onclick="removerFila(\${numFilas})" title="Quitar">&times;</button>
  \`;

  container.appendChild(nuevaFila);
  numFilas++;

  if (numFilas >= maxFilas) {
    document.getElementById('btnAgregarFila').style.display = 'none';
  }
}

function removerFila(index) {
  const fila = document.getElementById('row-' + index);
  if (fila) {
    fila.remove();
    numFilas--;
    document.getElementById('btnAgregarFila').style.display = 'block';
  }
}

function guardarUsuarios() {
  const usuarios = [];
  const inputsReg = document.querySelectorAll('.input-reg');
  const inputsNombre = document.querySelectorAll('.input-nombre');
  const inputsEmail = document.querySelectorAll('.input-email');

  for (let i = 0; i < inputsReg.length; i++) {
    const reg = inputsReg[i].value.trim();
    const nombre = inputsNombre[i].value.trim();
    const email = inputsEmail[i].value.trim();

    if (reg && nombre && email) {
      usuarios.push({ reg, nombre, email });
    }
  }

  if (usuarios.length === 0) {
    mostrarStatus('Complete al menos un usuario', 'error', 'statusQuickAdd');
    return;
  }

  mostrarStatus('Guardando ' + usuarios.length + ' usuario(s)...', 'info', 'statusQuickAdd');

  google.script.run
    .withSuccessHandler(resultado => {
      if (resultado.exitosos.length > 0) {
        mostrarStatus(
          \`✅ Guardados: \${resultado.exitosos.join(', ')}\${resultado.errores.length > 0 ? ' | ❌ Errores: ' + resultado.errores.length : ''}\`,
          resultado.errores.length > 0 ? 'error' : 'success',
          'statusQuickAdd'
        );

        if (resultado.errores.length === 0) {
          // Limpiar formulario
          document.querySelectorAll('.input-reg, .input-nombre, .input-email').forEach(input => input.value = '');
        }

        actualizarStats();
      } else {
        mostrarStatus('❌ No se pudo guardar ningún usuario', 'error', 'statusQuickAdd');
      }
    })
    .withFailureHandler(error => {
      mostrarStatus('❌ Error: ' + error.message, 'error', 'statusQuickAdd');
    })
    .registrarVariosUsuariosV8(usuarios);
}

function actualizarStats() {
  google.script.run
    .withSuccessHandler(stats => {
      document.getElementById('statTotal').textContent = stats.total;
      document.getElementById('statPendientes').textContent = stats.pendientes;
      document.getElementById('statListos').textContent = stats.listosVisita;
      document.getElementById('statAptos').textContent = stats.localesAptos;
    })
    .obtenerEstadisticasV8();
}

function abrirModulo(modulo) {
  const acciones = {
    'registroIndividual': 'agregarUsuarioManualV8',
    'enviarFormularios': 'abrirEnvioFormulariosV8',
    'importarRespuestas': 'importarRespuestasFormV8',
    'asignarSectores': 'abrirAsignacionSectoresV8',
    'programarVisitas': 'abrirProgramacionVisitasV8',
    'registrarResultados': 'abrirRegistroResultadosV8',
    'generarInformes': 'abrirGeneracionInformesV8',
    'reporteJefatura': 'abrirReporteJefaturaV8',
    'desistimientos': 'abrirDesistimientosV8',
    'webappMovil': 'mostrarURLWebAppV8',
    'recordatorios': 'enviarRecordatoriosManualesV8',
    'buscarExpediente': 'abrirBusquedaExpedienteV8'
  };

  if (acciones[modulo]) {
    google.script.run[acciones[modulo]]();
  }
}

function mostrarStatus(msg, tipo, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = \`<div class="status-msg \${tipo}">\${msg}</div>\`;

  if (tipo !== 'info') {
    setTimeout(() => container.innerHTML = '', 5000);
  }
}

// Cargar stats al inicio
actualizarStats();
</script>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// REGISTRO INDIVIDUAL
// ═══════════════════════════════════════════════════════════════════

function agregarUsuarioManualV8() {
  const html = HtmlService.createHtmlOutput(generarHTMLRegistroIndividualV8_())
    .setWidth(500)
    .setHeight(400);
  SpreadsheetApp.getUi().showModalDialog(html, '➕ Agregar Usuario Individual');
}

function generarHTMLRegistroIndividualV8_() {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Agregar Usuario</title>
  ${ESTILOS_GLOBALES_V8}
</head>
<body>
  <div class="container">
    <h2>➕ Agregar Usuario Individual</h2>

    <div class="form-group">
      <label>REG (Número de Registro) *</label>
      <input type="text" id="reg" placeholder="Ej: 12345" autofocus>
    </div>

    <div class="form-group">
      <label>Nombre del Solicitante *</label>
      <input type="text" id="nombre" placeholder="Nombre completo">
    </div>

    <div class="form-group">
      <label>Email *</label>
      <input type="email" id="email" placeholder="correo@ejemplo.cl">
    </div>

    <button class="btn btn-primary btn-block" onclick="guardar()">
      💾 Guardar Usuario
    </button>

    <div id="status"></div>
  </div>

<script>
function guardar() {
  const datos = {
    reg: document.getElementById('reg').value.trim(),
    nombre: document.getElementById('nombre').value.trim(),
    email: document.getElementById('email').value.trim()
  };

  if (!datos.reg || !datos.nombre || !datos.email) {
    mostrarStatus('❌ Complete todos los campos', 'error');
    return;
  }

  google.script.run
    .withSuccessHandler(r => {
      if (r.success) {
        mostrarStatus('✅ ' + r.mensaje, 'success');
        setTimeout(() => google.script.host.close(), 1500);
      } else {
        mostrarStatus('❌ ' + r.error, 'error');
      }
    })
    .withFailureHandler(e => mostrarStatus('❌ ' + e.message, 'error'))
    .registrarUsuarioV8(datos);
}

function mostrarStatus(msg, tipo) {
  document.getElementById('status').innerHTML =
    '<div class="status-msg ' + tipo + '">' + msg + '</div>';
}

// Enter para guardar
document.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') guardar();
});
</script>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// ENVÍO DE FORMULARIOS
// ═══════════════════════════════════════════════════════════════════

function abrirEnvioFormulariosV8() {
  const html = HtmlService.createHtmlOutput(generarHTMLEnvioFormulariosV8_())
    .setWidth(1000)
    .setHeight(700);
  SpreadsheetApp.getUi().showModalDialog(html, '📨 Envío de Formularios');
}

function obtenerExpedientesPendientesEnvioV8() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG_V8.SHEET_PLANILLA_MAESTRA);
  if (!hoja) return [];

  const datos = hoja.getDataRange().getValues();
  const pendientes = [];

  for (let i = 1; i < datos.length; i++) {
    if (datos[i][COL.ESTADO - 1] === CONFIG_V8.ESTADOS.PENDIENTE) {
      pendientes.push({
        fila: i + 1,
        reg: datos[i][COL.REG - 1],
        nombre: datos[i][COL.NOMBRE - 1],
        email: datos[i][COL.EMAIL - 1]
      });
    }
  }

  return pendientes;
}

function generarHTMLEnvioFormulariosV8_() {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Envío de Formularios</title>
  ${ESTILOS_GLOBALES_V8}
</head>
<body>
  <div class="container">
    <h2>📨 Envío de Formularios Google</h2>

    <div class="toolbar">
      <button class="btn btn-secondary" onclick="cargarPendientes()">🔄 Actualizar</button>
      <button class="btn btn-secondary" onclick="seleccionarTodos()">☑️ Seleccionar Todos</button>
      <button class="btn btn-primary" onclick="enviarSeleccionados()">📨 Enviar Seleccionados</button>
    </div>

    <div class="panel">
      <div id="listaPendientes">
        <div class="loading"></div>
      </div>
    </div>

    <div id="status"></div>
  </div>

<script>
let pendientes = [];

function cargarPendientes() {
  document.getElementById('listaPendientes').innerHTML = '<div class="loading"></div>';

  google.script.run
    .withSuccessHandler(data => {
      pendientes = data;
      mostrarPendientes(data);
    })
    .withFailureHandler(e => {
      document.getElementById('listaPendientes').innerHTML =
        '<div class="empty">❌ Error: ' + e.message + '</div>';
    })
    .obtenerExpedientesPendientesEnvioV8();
}

function mostrarPendientes(data) {
  if (data.length === 0) {
    document.getElementById('listaPendientes').innerHTML =
      '<div class="empty">✅ No hay expedientes pendientes de envío</div>';
    return;
  }

  let html = \`<table>
    <tr>
      <th><input type="checkbox" id="checkAll" onchange="toggleAll()"></th>
      <th>REG</th>
      <th>Nombre</th>
      <th>Email</th>
      <th>Acción</th>
    </tr>\`;

  data.forEach((exp, idx) => {
    const emailValido = exp.email && exp.email.includes('@');
    html += \`<tr>
      <td><input type="checkbox" class="checkbox" id="check_\${idx}" \${!emailValido ? 'disabled' : ''}></td>
      <td><strong>\${exp.reg}</strong></td>
      <td>\${exp.nombre}</td>
      <td>\${emailValido ? exp.email : '<span style="color:#F44336">Sin email</span>'}</td>
      <td>
        <button class="btn btn-small btn-primary" onclick="enviarUno('\${exp.reg}')"
          \${!emailValido ? 'disabled' : ''}>📨 Enviar</button>
      </td>
    </tr>\`;
  });

  html += '</table>';
  document.getElementById('listaPendientes').innerHTML = html;
}

function toggleAll() {
  const checked = document.getElementById('checkAll').checked;
  document.querySelectorAll('.checkbox').forEach(cb => {
    if (!cb.disabled) cb.checked = checked;
  });
}

function seleccionarTodos() {
  document.getElementById('checkAll').checked = true;
  toggleAll();
}

function enviarUno(reg) {
  mostrarStatus('📨 Enviando a ' + reg + '...', 'info');

  google.script.run
    .withSuccessHandler(r => {
      if (r.success) {
        mostrarStatus('✅ ' + r.mensaje, 'success');
        cargarPendientes();
      } else {
        mostrarStatus('❌ ' + r.error, 'error');
      }
    })
    .withFailureHandler(e => mostrarStatus('❌ ' + e.message, 'error'))
    .enviarFormularioV8(reg);
}

function enviarSeleccionados() {
  const seleccionados = [];
  pendientes.forEach((exp, idx) => {
    const checkbox = document.getElementById('check_' + idx);
    if (checkbox && checkbox.checked) {
      seleccionados.push(exp.reg);
    }
  });

  if (seleccionados.length === 0) {
    mostrarStatus('❌ Seleccione al menos un expediente', 'error');
    return;
  }

  if (!confirm('¿Enviar formularios a ' + seleccionados.length + ' expedientes?')) return;

  mostrarStatus('📨 Enviando ' + seleccionados.length + ' formularios...', 'info');

  google.script.run
    .withSuccessHandler(r => {
      mostrarStatus(
        \`✅ Enviados: \${r.enviados} | ❌ Errores: \${r.errores}\`,
        r.errores > 0 ? 'error' : 'success'
      );
      cargarPendientes();
    })
    .withFailureHandler(e => mostrarStatus('❌ ' + e.message, 'error'))
    .enviarFormulariosMultiplesV8(seleccionados);
}

function mostrarStatus(msg, tipo) {
  document.getElementById('status').innerHTML =
    '<div class="status-msg ' + tipo + '">' + msg + '</div>';
}

cargarPendientes();
</script>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// ASIGNACIÓN DE SECTORES
// ═══════════════════════════════════════════════════════════════════

function abrirAsignacionSectoresV8() {
  const html = HtmlService.createHtmlOutput(generarHTMLAsignacionSectoresV8_())
    .setWidth(1100)
    .setHeight(750);
  SpreadsheetApp.getUi().showModalDialog(html, '📍 Asignar Sectores');
}

function obtenerExpedientesSinSectorV8() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG_V8.SHEET_PLANILLA_MAESTRA);
  if (!hoja) return [];

  const datos = hoja.getDataRange().getValues();
  const sinSector = [];

  for (let i = 1; i < datos.length; i++) {
    const estado = datos[i][COL.ESTADO - 1];
    const sector = datos[i][COL.SECTOR - 1];

    if (estado === CONFIG_V8.ESTADOS.LISTO_VISITA && !sector) {
      sinSector.push({
        reg: datos[i][COL.REG - 1],
        nombre: datos[i][COL.NOMBRE - 1],
        direccion: datos[i][COL.DIRECCION - 1]
      });
    }
  }

  return sinSector;
}

function generarHTMLAsignacionSectoresV8_() {
  const sectoresOptions = CONFIG_V8.SECTORES.map(s => `<option value="${s}">${s}</option>`).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Asignar Sectores</title>
  ${ESTILOS_GLOBALES_V8}
  <style>
    .container-flex {
      display: flex;
      gap: 20px;
    }
    .panel-left {
      flex: 2;
    }
    .panel-right {
      flex: 1;
    }
    @media (max-width: 768px) {
      .container-flex {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>📍 Asignar Sectores (25 de La Serena)</h2>

    <div class="container-flex">
      <div class="panel panel-left">
        <h3>Expedientes Sin Sector</h3>
        <div id="listaSinSector">
          <div class="loading"></div>
        </div>
      </div>

      <div class="panel panel-right">
        <h3>25 Sectores Disponibles</h3>
        <div style="font-size: 12px; color: #888;">
          ${CONFIG_V8.SECTORES.map((s, i) => `${i + 1}. ${s}`).join('<br>')}
        </div>
      </div>
    </div>

    <div id="status"></div>
  </div>

<script>
const sectoresOptions = \`${sectoresOptions}\`;
let expedientes = [];

function cargarExpedientes() {
  document.getElementById('listaSinSector').innerHTML = '<div class="loading"></div>';

  google.script.run
    .withSuccessHandler(data => {
      expedientes = data;
      mostrarExpedientes(data);
    })
    .obtenerExpedientesSinSectorV8();
}

function mostrarExpedientes(data) {
  if (data.length === 0) {
    document.getElementById('listaSinSector').innerHTML =
      '<div class="empty">✅ Todos los expedientes tienen sector asignado</div>';
    return;
  }

  let html = \`<table>
    <tr>
      <th>REG</th>
      <th>Nombre</th>
      <th>Dirección</th>
      <th>Sector</th>
      <th></th>
    </tr>\`;

  data.forEach((exp, idx) => {
    html += \`<tr>
      <td><strong>\${exp.reg}</strong></td>
      <td>\${exp.nombre}</td>
      <td>\${exp.direccion || '-'}</td>
      <td><select id="sector_\${idx}" style="width:100%;padding:8px;background:#1f2b4d;border:1px solid #333;color:#fff;border-radius:4px">\${sectoresOptions}</select></td>
      <td><button class="btn btn-small btn-primary" onclick="asignar('\${exp.reg}', \${idx})">✓</button></td>
    </tr>\`;
  });

  html += '</table>';
  document.getElementById('listaSinSector').innerHTML = html;
}

function asignar(reg, idx) {
  const sector = document.getElementById('sector_' + idx).value;

  google.script.run
    .withSuccessHandler(r => {
      if (r.success) {
        mostrarStatus('✅ Sector asignado a ' + reg, 'success');
        cargarExpedientes();
      } else {
        mostrarStatus('❌ ' + r.error, 'error');
      }
    })
    .withFailureHandler(e => mostrarStatus('❌ ' + e.message, 'error'))
    .asignarSectorV8(reg, sector);
}

function mostrarStatus(msg, tipo) {
  document.getElementById('status').innerHTML =
    '<div class="status-msg ' + tipo + '">' + msg + '</div>';
}

cargarExpedientes();
</script>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// PROGRAMACIÓN DE VISITAS
// ═══════════════════════════════════════════════════════════════════

function abrirProgramacionVisitasV8() {
  const html = HtmlService.createHtmlOutput(generarHTMLProgramacionVisitasV8_())
    .setWidth(1200)
    .setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(html, '📅 Programación de Visitas');
}

function obtenerExpedientesParaProgramarV8() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG_V8.SHEET_PLANILLA_MAESTRA);
  if (!hoja) return [];

  const datos = hoja.getDataRange().getValues();
  const paraProgramar = [];

  for (let i = 1; i < datos.length; i++) {
    const estado = datos[i][COL.ESTADO - 1];
    const sector = datos[i][COL.SECTOR - 1];

    if (estado === CONFIG_V8.ESTADOS.LISTO_VISITA && sector) {
      paraProgramar.push({
        reg: datos[i][COL.REG - 1],
        nombre: datos[i][COL.NOMBRE - 1],
        direccion: datos[i][COL.DIRECCION - 1],
        sector: sector
      });
    }
  }

  return paraProgramar;
}

function generarHTMLProgramacionVisitasV8_() {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Programación de Visitas</title>
  ${ESTILOS_GLOBALES_V8}
  <style>
    .container-flex {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
    }
    @media (max-width: 1024px) {
      .container-flex {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>📅 Programación de Visitas</h2>

    <div class="container-flex">
      <div class="panel">
        <h3>Expedientes Para Programar</h3>

        <div class="toolbar">
          <input type="date" id="fechaProgramar" style="padding:10px;background:#16213e;border:1px solid #333;color:#fff;border-radius:6px">
          <input type="time" id="horaInicio" value="09:00" style="padding:10px;background:#16213e;border:1px solid #333;color:#fff;border-radius:6px">
          <button class="btn btn-primary" onclick="programarSeleccionados()">📅 Programar Seleccionados</button>
          <button class="btn btn-secondary" onclick="seleccionarTodos()">☑️ Todos</button>
        </div>

        <div id="listaParaProgramar">
          <div class="loading"></div>
        </div>
      </div>

      <div class="panel">
        <h3>Visitas Programadas</h3>
        <div id="visitasProgramadas">
          <div class="loading"></div>
        </div>
      </div>
    </div>

    <div id="status"></div>
  </div>

<script>
let paraProgramar = [];

// Fecha por defecto: mañana
const manana = new Date();
manana.setDate(manana.getDate() + 1);
document.getElementById('fechaProgramar').value = manana.toISOString().split('T')[0];

function cargarDatos() {
  google.script.run
    .withSuccessHandler(data => {
      paraProgramar = data;
      mostrarParaProgramar(data);
    })
    .obtenerExpedientesParaProgramarV8();

  google.script.run
    .withSuccessHandler(mostrarProgramadas)
    .obtenerVisitasProgramadasV8(null);
}

function mostrarParaProgramar(data) {
  if (data.length === 0) {
    document.getElementById('listaParaProgramar').innerHTML =
      '<div class="empty">✅ No hay expedientes pendientes de programar</div>';
    return;
  }

  let html = \`<table>
    <tr>
      <th><input type="checkbox" id="checkAll" onchange="toggleAll()"></th>
      <th>REG</th>
      <th>Nombre</th>
      <th>Dirección</th>
      <th>Sector</th>
    </tr>\`;

  data.forEach((exp, idx) => {
    html += \`<tr>
      <td><input type="checkbox" class="checkbox" id="check_\${idx}"></td>
      <td><strong>\${exp.reg}</strong></td>
      <td>\${exp.nombre}</td>
      <td>\${exp.direccion || '-'}</td>
      <td><span class="badge blue">\${exp.sector}</span></td>
    </tr>\`;
  });

  html += '</table>';
  document.getElementById('listaParaProgramar').innerHTML = html;
}

function mostrarProgramadas(data) {
  if (data.length === 0) {
    document.getElementById('visitasProgramadas').innerHTML =
      '<div class="empty">Sin visitas programadas</div>';
    return;
  }

  // Agrupar por fecha
  const porFecha = {};
  data.forEach(v => {
    const fecha = new Date(v.fechaProgramada).toLocaleDateString('es-CL');
    if (!porFecha[fecha]) porFecha[fecha] = [];
    porFecha[fecha].push(v);
  });

  let html = '';
  Object.keys(porFecha).forEach(fecha => {
    const visitas = porFecha[fecha];
    html += \`<div class="card">
      <div style="font-weight:bold;margin-bottom:5px">📅 \${fecha}</div>
      <div style="font-size:12px;color:#888">\${visitas.length} visitas: \${visitas.map(v => v.reg).join(', ')}</div>
    </div>\`;
  });

  document.getElementById('visitasProgramadas').innerHTML = html;
}

function toggleAll() {
  const checked = document.getElementById('checkAll').checked;
  document.querySelectorAll('.checkbox').forEach(cb => cb.checked = checked);
}

function seleccionarTodos() {
  document.getElementById('checkAll').checked = true;
  toggleAll();
}

function programarSeleccionados() {
  const fecha = document.getElementById('fechaProgramar').value;
  if (!fecha) {
    mostrarStatus('❌ Seleccione una fecha', 'error');
    return;
  }

  const seleccionados = [];
  paraProgramar.forEach((exp, idx) => {
    const checkbox = document.getElementById('check_' + idx);
    if (checkbox && checkbox.checked) {
      seleccionados.push(exp.reg);
    }
  });

  if (seleccionados.length === 0) {
    mostrarStatus('❌ Seleccione al menos un expediente', 'error');
    return;
  }

  if (!confirm('¿Programar ' + seleccionados.length + ' visitas para ' + fecha + '?')) return;

  mostrarStatus('📅 Programando visitas...', 'info');

  google.script.run
    .withSuccessHandler(r => {
      mostrarStatus(
        \`✅ Programadas: \${r.programadas} | ❌ Errores: \${r.errores}\`,
        r.errores > 0 ? 'error' : 'success'
      );
      cargarDatos();
    })
    .withFailureHandler(e => mostrarStatus('❌ ' + e.message, 'error'))
    .programarVisitasMultiplesV8(seleccionados, fecha, Session.getActiveUser().getEmail());
}

function mostrarStatus(msg, tipo) {
  document.getElementById('status').innerHTML =
    '<div class="status-msg ' + tipo + '">' + msg + '</div>';
}

cargarDatos();
</script>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// REGISTRO DE RESULTADOS DE VISITA
// ═══════════════════════════════════════════════════════════════════

function abrirRegistroResultadosV8() {
  const html = HtmlService.createHtmlOutput(generarHTMLRegistroResultadosV8_())
    .setWidth(1000)
    .setHeight(750);
  SpreadsheetApp.getUi().showModalDialog(html, '✅ Registrar Resultados de Visita');
}

function obtenerVisitasPendientesResultadoV8() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG_V8.SHEET_PLANILLA_MAESTRA);
  if (!hoja) return [];

  const datos = hoja.getDataRange().getValues();
  const pendientes = [];

  for (let i = 1; i < datos.length; i++) {
    const estado = datos[i][COL.ESTADO - 1];

    if (estado === CONFIG_V8.ESTADOS.PROGRAMADO) {
      pendientes.push({
        reg: datos[i][COL.REG - 1],
        nombre: datos[i][COL.NOMBRE - 1],
        direccion: datos[i][COL.DIRECCION - 1],
        sector: datos[i][COL.SECTOR - 1],
        fechaVisita: datos[i][COL.FECHA_VISITA - 1]
      });
    }
  }

  return pendientes;
}

function generarHTMLRegistroResultadosV8_() {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Registrar Resultados</title>
  ${ESTILOS_GLOBALES_V8}
  <style>
    .resultado-btns {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin: 20px 0;
    }
    .resultado-btn {
      padding: 30px 15px;
      border: 3px solid #333;
      border-radius: 12px;
      background: none;
      color: #fff;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
    }
    .resultado-btn:hover {
      transform: translateY(-3px);
    }
    .resultado-btn.selected {
      border-width: 4px;
    }
    .resultado-btn.apto { border-color: #4CAF50; }
    .resultado-btn.apto.selected { background: #1B5E20; }
    .resultado-btn.observado { border-color: #FF9800; }
    .resultado-btn.observado.selected { background: #E65100; }
    .resultado-btn.denegado { border-color: #F44336; }
    .resultado-btn.denegado.selected { background: #B71C1C; }
    .resultado-btn .icon { font-size: 48px; }
    .resultado-btn .text { font-size: 14px; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>✅ Registrar Resultados de Visita</h2>

    <div class="grid grid-2" style="gap: 20px">
      <div class="panel">
        <h3>Visitas Programadas</h3>
        <div id="listaVisitas">
          <div class="loading"></div>
        </div>
      </div>

      <div class="panel" id="panelResultado" style="display:none">
        <h3 id="tituloExpediente">Expediente</h3>

        <div class="resultado-btns">
          <button class="resultado-btn apto" onclick="seleccionarResultado('LOCAL_APTO')">
            <div class="icon">✅</div>
            <div class="text">LOCAL APTO</div>
          </button>
          <button class="resultado-btn observado" onclick="seleccionarResultado('OBSERVADO')">
            <div class="icon">⚠️</div>
            <div class="text">OBSERVADO</div>
          </button>
          <button class="resultado-btn denegado" onclick="seleccionarResultado('DENEGADO')">
            <div class="icon">❌</div>
            <div class="text">DENEGADO</div>
          </button>
        </div>

        <div class="form-group">
          <label>Observaciones</label>
          <textarea id="observaciones" rows="6" placeholder="Describa las observaciones de la visita..."></textarea>
        </div>

        <button class="btn btn-primary btn-block" id="btnGuardar" onclick="guardarResultado()" disabled>
          💾 Guardar Resultado
        </button>

        <div id="statusResultado"></div>
      </div>
    </div>
  </div>

<script>
let visitas = [];
let regActual = null;
let resultadoActual = null;

function cargarVisitas() {
  google.script.run
    .withSuccessHandler(data => {
      visitas = data;
      mostrarVisitas(data);
    })
    .obtenerVisitasPendientesResultadoV8();
}

function mostrarVisitas(data) {
  if (data.length === 0) {
    document.getElementById('listaVisitas').innerHTML =
      '<div class="empty">✅ No hay visitas pendientes de resultado</div>';
    return;
  }

  let html = '<div style="max-height:600px;overflow-y:auto">';
  data.forEach((v, idx) => {
    html += \`<div class="card" onclick="seleccionarVisita(\${idx})">
      <div style="font-size:18px;font-weight:bold;color:#00C853;margin-bottom:5px">\${v.reg}</div>
      <div style="font-size:14px;margin-bottom:3px">\${v.nombre}</div>
      <div style="font-size:12px;color:#888">📍 \${v.direccion || '-'}</div>
      <div style="font-size:11px;color:#888;margin-top:5px">
        <span class="badge blue">\${v.sector || '-'}</span>
      </div>
    </div>\`;
  });
  html += '</div>';
  document.getElementById('listaVisitas').innerHTML = html;
}

function seleccionarVisita(idx) {
  const visita = visitas[idx];
  regActual = visita.reg;
  resultadoActual = null;

  document.getElementById('tituloExpediente').textContent =
    'REG ' + visita.reg + ' - ' + visita.nombre;

  document.querySelectorAll('.card').forEach((el, i) => {
    el.classList.toggle('selected', i === idx);
  });

  document.querySelectorAll('.resultado-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('observaciones').value = '';
  document.getElementById('btnGuardar').disabled = true;
  document.getElementById('panelResultado').style.display = 'block';
  document.getElementById('statusResultado').innerHTML = '';
}

function seleccionarResultado(resultado) {
  resultadoActual = resultado;

  document.querySelectorAll('.resultado-btn').forEach(b => b.classList.remove('selected'));

  const clase = resultado === 'LOCAL_APTO' ? 'apto' :
                resultado === 'OBSERVADO' ? 'observado' : 'denegado';
  document.querySelector('.resultado-btn.' + clase).classList.add('selected');

  document.getElementById('btnGuardar').disabled = false;
}

function guardarResultado() {
  if (!regActual || !resultadoActual) return;

  const observaciones = document.getElementById('observaciones').value;

  document.getElementById('btnGuardar').disabled = true;
  document.getElementById('btnGuardar').textContent = 'Guardando...';

  google.script.run
    .withSuccessHandler(r => {
      if (r.success) {
        mostrarStatusResultado('✅ ' + r.mensaje, 'success');
        setTimeout(() => {
          document.getElementById('panelResultado').style.display = 'none';
          cargarVisitas();
        }, 1500);
      } else {
        mostrarStatusResultado('❌ ' + r.error, 'error');
        document.getElementById('btnGuardar').disabled = false;
        document.getElementById('btnGuardar').textContent = '💾 Guardar Resultado';
      }
    })
    .withFailureHandler(e => {
      mostrarStatusResultado('❌ ' + e.message, 'error');
      document.getElementById('btnGuardar').disabled = false;
      document.getElementById('btnGuardar').textContent = '💾 Guardar Resultado';
    })
    .registrarResultadoVisitaV8(regActual, resultadoActual, observaciones, []);
}

function mostrarStatusResultado(msg, tipo) {
  document.getElementById('statusResultado').innerHTML =
    '<div class="status-msg ' + tipo + '">' + msg + '</div>';
}

cargarVisitas();
</script>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// GENERACIÓN DE INFORMES
// ═══════════════════════════════════════════════════════════════════

function abrirGeneracionInformesV8() {
  const html = HtmlService.createHtmlOutput(generarHTMLGeneracionInformesV8_())
    .setWidth(900)
    .setHeight(650);
  SpreadsheetApp.getUi().showModalDialog(html, '📄 Generar Informes de Visita');
}

function obtenerExpedientesConVisitaV8() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG_V8.SHEET_PLANILLA_MAESTRA);
  if (!hoja) return [];

  const datos = hoja.getDataRange().getValues();
  const conVisita = [];

  for (let i = 1; i < datos.length; i++) {
    const estado = datos[i][COL.ESTADO - 1];

    if (estado === CONFIG_V8.ESTADOS.LOCAL_APTO ||
        estado === CONFIG_V8.ESTADOS.OBSERVADO ||
        estado === CONFIG_V8.ESTADOS.DENEGADO) {

      conVisita.push({
        reg: datos[i][COL.REG - 1],
        nombre: datos[i][COL.NOMBRE - 1],
        estado: estado,
        fechaVisita: datos[i][COL.FECHA_VISITA - 1],
        observaciones: datos[i][COL.OBSERVACIONES_INSPECCION - 1] || ''
      });
    }
  }

  return conVisita;
}

function generarHTMLGeneracionInformesV8_() {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Generar Informes</title>
  ${ESTILOS_GLOBALES_V8}
</head>
<body>
  <div class="container">
    <h2>📄 Generar Informes de Visita</h2>

    <div class="panel">
      <h3>Expedientes con Visita Realizada</h3>
      <div id="listaExpedientes">
        <div class="loading"></div>
      </div>
    </div>

    <div id="status"></div>
  </div>

<script>
function cargarExpedientes() {
  google.script.run
    .withSuccessHandler(data => mostrarExpedientes(data))
    .obtenerExpedientesConVisitaV8();
}

function mostrarExpedientes(data) {
  if (data.length === 0) {
    document.getElementById('listaExpedientes').innerHTML =
      '<div class="empty">No hay expedientes con visita realizada</div>';
    return;
  }

  let html = \`<table>
    <tr>
      <th>REG</th>
      <th>Nombre</th>
      <th>Resultado</th>
      <th>Fecha Visita</th>
      <th>Acción</th>
    </tr>\`;

  data.forEach(exp => {
    const colorEstado = exp.estado === 'LOCAL_APTO' ? 'green' :
                        exp.estado === 'OBSERVADO' ? 'yellow' : 'red';

    html += \`<tr>
      <td><strong>\${exp.reg}</strong></td>
      <td>\${exp.nombre}</td>
      <td><span class="badge \${colorEstado}">\${exp.estado}</span></td>
      <td>\${new Date(exp.fechaVisita).toLocaleDateString('es-CL')}</td>
      <td><button class="btn btn-small btn-primary" onclick="generarInforme('\${exp.reg}')">📄 Generar</button></td>
    </tr>\`;
  });

  html += '</table>';
  document.getElementById('listaExpedientes').innerHTML = html;
}

function generarInforme(reg) {
  mostrarStatus('📄 Generando informe para ' + reg + '...', 'info');

  google.script.run
    .withSuccessHandler(r => {
      if (r.success) {
        mostrarStatus('✅ ' + r.mensaje, 'success');
        if (r.url) {
          window.open(r.url, '_blank');
        }
      } else {
        mostrarStatus('❌ ' + r.error, 'error');
      }
    })
    .withFailureHandler(e => mostrarStatus('❌ ' + e.message, 'error'))
    .generarInformeVisitaV8(reg, {});
}

function mostrarStatus(msg, tipo) {
  document.getElementById('status').innerHTML =
    '<div class="status-msg ' + tipo + '">' + msg + '</div>';
}

cargarExpedientes();
</script>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// REPORTE PARA JEFATURA
// ═══════════════════════════════════════════════════════════════════

function abrirReporteJefaturaV8() {
  const html = HtmlService.createHtmlOutput(generarHTMLReporteJefaturaV8_())
    .setWidth(700)
    .setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(html, '📊 Generar Reporte para Jefatura');
}

function generarHTMLReporteJefaturaV8_() {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Reporte Jefatura</title>
  ${ESTILOS_GLOBALES_V8}
</head>
<body>
  <div class="container">
    <h2>📊 Generar Reporte para Jefatura</h2>

    <div class="panel">
      <div class="form-group">
        <label>Fecha Desde</label>
        <input type="date" id="fechaDesde">
      </div>

      <div class="form-group">
        <label>Fecha Hasta</label>
        <input type="date" id="fechaHasta">
      </div>

      <button class="btn btn-primary btn-block" onclick="generar()">
        📊 Generar Reporte
      </button>

      <div id="status"></div>
    </div>
  </div>

<script>
// Valores por defecto: último mes
const hoy = new Date();
const hace30 = new Date();
hace30.setDate(hace30.getDate() - 30);

document.getElementById('fechaHasta').value = hoy.toISOString().split('T')[0];
document.getElementById('fechaDesde').value = hace30.toISOString().split('T')[0];

function generar() {
  const fechaDesde = document.getElementById('fechaDesde').value;
  const fechaHasta = document.getElementById('fechaHasta').value;

  if (!fechaDesde || !fechaHasta) {
    mostrarStatus('❌ Complete las fechas', 'error');
    return;
  }

  mostrarStatus('📊 Generando reporte...', 'info');

  google.script.run
    .withSuccessHandler(r => {
      if (r.success) {
        mostrarStatus('✅ ' + r.mensaje, 'success');
        if (r.url) {
          window.open(r.url, '_blank');
        }
      } else {
        mostrarStatus('❌ ' + r.error, 'error');
      }
    })
    .withFailureHandler(e => mostrarStatus('❌ ' + e.message, 'error'))
    .generarReporteJefaturaV8(fechaDesde, fechaHasta);
}

function mostrarStatus(msg, tipo) {
  document.getElementById('status').innerHTML =
    '<div class="status-msg ' + tipo + '">' + msg + '</div>';
}
</script>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// DESISTIMIENTOS
// ═══════════════════════════════════════════════════════════════════

function abrirDesistimientosV8() {
  const html = HtmlService.createHtmlOutput(generarHTMLDesistimientosV8_())
    .setWidth(800)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, '🚫 Procesar Desistimientos');
}

function generarHTMLDesistimientosV8_() {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Desistimientos</title>
  ${ESTILOS_GLOBALES_V8}
</head>
<body>
  <div class="container">
    <h2>🚫 Procesar Desistimiento</h2>

    <div class="panel">
      <div class="form-group">
        <label>REG del Expediente</label>
        <input type="text" id="reg" placeholder="Ej: 12345" autofocus>
      </div>

      <div class="form-group">
        <label>Motivo del Desistimiento</label>
        <select id="motivo">
          <option value="">-- Seleccione --</option>
          <option value="Voluntad del solicitante">Voluntad del solicitante</option>
          <option value="No cumple requisitos">No cumple requisitos</option>
          <option value="Duplicado">Duplicado</option>
          <option value="Cambio de proyecto">Cambio de proyecto</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div class="form-group">
        <label>Observaciones</label>
        <textarea id="observaciones" rows="4" placeholder="Detalle adicional del desistimiento..."></textarea>
      </div>

      <button class="btn btn-danger btn-block" onclick="procesar()">
        🚫 Procesar Desistimiento
      </button>

      <div id="status"></div>
    </div>
  </div>

<script>
function procesar() {
  const reg = document.getElementById('reg').value.trim();
  const motivo = document.getElementById('motivo').value;
  const observaciones = document.getElementById('observaciones').value.trim();

  if (!reg) {
    mostrarStatus('❌ Ingrese el REG', 'error');
    return;
  }

  if (!motivo) {
    mostrarStatus('❌ Seleccione el motivo', 'error');
    return;
  }

  if (!confirm('¿Confirma el desistimiento del expediente ' + reg + '?')) return;

  mostrarStatus('🚫 Procesando desistimiento...', 'info');

  google.script.run
    .withSuccessHandler(r => {
      if (r.success) {
        mostrarStatus('✅ ' + r.mensaje, 'success');
        setTimeout(() => {
          document.getElementById('reg').value = '';
          document.getElementById('motivo').value = '';
          document.getElementById('observaciones').value = '';
        }, 2000);
      } else {
        mostrarStatus('❌ ' + r.error, 'error');
      }
    })
    .withFailureHandler(e => mostrarStatus('❌ ' + e.message, 'error'))
    .procesarDesistimientoV8(reg, motivo, observaciones);
}

function mostrarStatus(msg, tipo) {
  document.getElementById('status').innerHTML =
    '<div class="status-msg ' + tipo + '">' + msg + '</div>';
}

document.addEventListener('keypress', function(e) {
  if (e.key === 'Enter' && e.target.id === 'reg') {
    document.getElementById('motivo').focus();
  }
});
</script>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// BÚSQUEDA DE EXPEDIENTE
// ═══════════════════════════════════════════════════════════════════

function abrirBusquedaExpedienteV8() {
  const html = HtmlService.createHtmlOutput(generarHTMLBusquedaV8_())
    .setWidth(900)
    .setHeight(700);
  SpreadsheetApp.getUi().showModalDialog(html, '🔍 Buscar Expediente');
}

function generarHTMLBusquedaV8_() {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Buscar Expediente</title>
  ${ESTILOS_GLOBALES_V8}
</head>
<body>
  <div class="container">
    <h2>🔍 Buscar Expediente por REG</h2>

    <div class="panel">
      <div class="form-group">
        <label>REG (Número de Registro)</label>
        <input type="text" id="reg" placeholder="Ej: 12345" autofocus>
      </div>

      <button class="btn btn-primary btn-block" onclick="buscar()">
        🔍 Buscar
      </button>
    </div>

    <div id="resultado"></div>
  </div>

<script>
function buscar() {
  const reg = document.getElementById('reg').value.trim();

  if (!reg) {
    mostrarResultado('❌ Ingrese un REG', 'error');
    return;
  }

  mostrarResultado('🔍 Buscando...', 'info');

  google.script.run
    .withSuccessHandler(expediente => {
      if (expediente) {
        mostrarExpediente(expediente);
      } else {
        mostrarResultado('❌ No se encontró el expediente ' + reg, 'error');
      }
    })
    .withFailureHandler(e => mostrarResultado('❌ ' + e.message, 'error'))
    .buscarExpedienteV8(reg);
}

function mostrarExpediente(exp) {
  let html = \`<div class="panel" style="margin-top:20px">
    <h3 style="color:#00C853;margin-bottom:20px">REG \${exp.reg} - \${exp.nombre}</h3>

    <table style="width:100%;border-collapse:collapse">
      <tr style="border-bottom:1px solid #333">
        <td style="padding:10px;color:#888;width:40%">Email</td>
        <td style="padding:10px">\${exp.email || '-'}</td>
      </tr>
      <tr style="border-bottom:1px solid #333">
        <td style="padding:10px;color:#888">Teléfono</td>
        <td style="padding:10px">\${exp.telefono || '-'}</td>
      </tr>
      <tr style="border-bottom:1px solid #333">
        <td style="padding:10px;color:#888">RUT</td>
        <td style="padding:10px">\${exp.rut || '-'}</td>
      </tr>
      <tr style="border-bottom:1px solid #333">
        <td style="padding:10px;color:#888">Dirección</td>
        <td style="padding:10px">\${exp.direccion || '-'}</td>
      </tr>
      <tr style="border-bottom:1px solid #333">
        <td style="padding:10px;color:#888">Sector</td>
        <td style="padding:10px">\${exp.sector || '-'}</td>
      </tr>
      <tr style="border-bottom:1px solid #333">
        <td style="padding:10px;color:#888">Estado</td>
        <td style="padding:10px"><strong style="color:#00C853">\${exp.estado || '-'}</strong></td>
      </tr>
      <tr style="border-bottom:1px solid #333">
        <td style="padding:10px;color:#888">Fecha Visita</td>
        <td style="padding:10px">\${exp.fechaVisita ? new Date(exp.fechaVisita).toLocaleDateString('es-CL') : '-'}</td>
      </tr>
      <tr style="border-bottom:1px solid #333">
        <td style="padding:10px;color:#888">Inspector</td>
        <td style="padding:10px">\${exp.inspector || '-'}</td>
      </tr>
    </table>

    \${exp.observacionesInspeccion ? \`
      <div style="margin-top:20px;padding:15px;background:#1f2b4d;border-radius:8px">
        <strong style="color:#888">Observaciones:</strong><br>
        <p style="margin-top:10px">\${exp.observacionesInspeccion}</p>
      </div>
    \` : ''}

    \${exp.urlCarpeta ? \`
      <div style="margin-top:15px">
        <a href="\${exp.urlCarpeta}" target="_blank" class="btn btn-secondary">
          📁 Abrir Carpeta Drive
        </a>
      </div>
    \` : ''}
  </div>\`;

  document.getElementById('resultado').innerHTML = html;
}

function mostrarResultado(msg, tipo) {
  document.getElementById('resultado').innerHTML =
    '<div class="status-msg ' + tipo + '" style="margin-top:20px">' + msg + '</div>';
}

document.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') buscar();
});
</script>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// WEBAPP MÓVIL
// ═══════════════════════════════════════════════════════════════════

function mostrarURLWebAppV8() {
  const url = obtenerURLWebAppV8();
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}`;

  const html = HtmlService.createHtmlOutput(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>WebApp Móvil</title>
  ${ESTILOS_GLOBALES_V8}
</head>
<body>
  <div class="container" style="text-align:center;max-width:500px">
    <h2>📱 WebApp Móvil</h2>

    <p style="color:#888;margin-bottom:30px">
      Escanea el QR desde tu iPad o Android para acceder a la aplicación móvil
    </p>

    <div style="background:#16213e;padding:30px;border-radius:10px;margin-bottom:20px">
      <img src="${qrUrl}" alt="QR Code" style="border-radius:10px;max-width:100%">
    </div>

    <div style="background:#1f2b4d;padding:15px;border-radius:8px;word-break:break-all;margin-bottom:20px;font-size:12px">
      ${url}
    </div>

    <button class="btn btn-primary btn-block" onclick="copiar()">
      📋 Copiar URL
    </button>

    <button class="btn btn-secondary btn-block" onclick="google.script.host.close()">
      Cerrar
    </button>

    <div id="status"></div>
  </div>

<script>
function copiar() {
  navigator.clipboard.writeText('${url}').then(() => {
    document.getElementById('status').innerHTML =
      '<div class="status-msg success">✅ URL copiada al portapapeles</div>';
    setTimeout(() => document.getElementById('status').innerHTML = '', 3000);
  });
}
</script>
</body>
</html>
  `).setWidth(550).setHeight(650);

  SpreadsheetApp.getUi().showModalDialog(html, '📱 WebApp Móvil');
}

// ═══════════════════════════════════════════════════════════════════
// FIN DE INTERFACES V8
// ═══════════════════════════════════════════════════════════════════
