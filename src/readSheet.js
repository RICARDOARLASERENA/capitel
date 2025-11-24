import fs from 'fs/promises';
import { google } from 'googleapis';

const TOKEN_PATH = 'token.json';
const CREDENTIALS_PATH = 'credentials.json';

// The spreadsheet ID from your URL
// https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
const SPREADSHEET_ID = '1jjcCVjBGXTR3_SFNKsQl_7cfdVh4-WfWt_UpIXxmWts';

/**
 * Create OAuth2 client and load credentials
 */
async function authorize() {
  try {
    // Load credentials
    const credentialsContent = await fs.readFile(CREDENTIALS_PATH);
    const credentials = JSON.parse(credentialsContent);

    const { client_secret, client_id, redirect_uris } =
      credentials.installed || credentials.web;

    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    // Load token
    const token = await fs.readFile(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));

    return oAuth2Client;
  } catch (error) {
    console.error('❌ Error en la autenticación:', error.message);
    console.error('\n⚠️  Por favor ejecuta primero: npm run auth\n');
    process.exit(1);
  }
}

/**
 * Read data from Google Sheet
 */
async function readSheet(auth) {
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    console.log('📊 Leyendo hoja de cálculo...\n');

    // First, get the spreadsheet metadata to see all sheets
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    console.log(`📄 Título: ${spreadsheet.data.properties.title}`);
    console.log(`🗂️  Hojas disponibles:`);

    for (const sheet of spreadsheet.data.sheets) {
      console.log(`   - ${sheet.properties.title}`);
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Read data from each sheet
    for (const sheet of spreadsheet.data.sheets) {
      const sheetName = sheet.properties.title;

      console.log(`\n📋 Leyendo hoja: "${sheetName}"\n`);

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: sheetName, // Read all data from the sheet
      });

      const rows = response.data.values;

      if (!rows || rows.length === 0) {
        console.log('   (vacía)\n');
        continue;
      }

      // Display the data
      console.log(`   Encontradas ${rows.length} filas\n`);

      // Display header row if exists
      if (rows.length > 0) {
        console.log('   ' + rows[0].join(' | '));
        console.log('   ' + '-'.repeat(rows[0].join(' | ').length));
      }

      // Display first 10 data rows
      const displayRows = rows.slice(1, Math.min(11, rows.length));
      displayRows.forEach((row) => {
        console.log('   ' + row.join(' | '));
      });

      if (rows.length > 11) {
        console.log(`   ... y ${rows.length - 11} filas más`);
      }

      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }

    // Return all data for programmatic use
    return spreadsheet.data;
  } catch (error) {
    console.error('❌ Error leyendo la hoja de cálculo:', error.message);

    if (error.code === 403) {
      console.error('\n⚠️  Acceso denegado. Posibles causas:');
      console.error('   1. La hoja no está compartida contigo');
      console.error('   2. Necesitas ejecutar de nuevo: npm run auth');
      console.error('   3. Los permisos de OAuth2 no son suficientes\n');
    }

    throw error;
  }
}

// Run the program
console.log('\n🚀 Accediendo a Google Sheets\n');
authorize()
  .then(readSheet)
  .then(() => {
    console.log('✅ Lectura completada exitosamente\n');
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
