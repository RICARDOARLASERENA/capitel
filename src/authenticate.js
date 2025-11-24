import fs from 'fs/promises';
import { google } from 'googleapis';
import readline from 'readline';

// Scopes define what access we need
const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets.readonly',
  'https://www.googleapis.com/auth/drive.readonly'
];

const TOKEN_PATH = 'token.json';
const CREDENTIALS_PATH = 'credentials.json';

/**
 * Create readline interface for user input
 */
function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

/**
 * Get user input from console
 */
function getUserInput(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

/**
 * Create OAuth2 client from credentials
 */
async function createOAuth2Client() {
  try {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const credentials = JSON.parse(content);

    const { client_secret, client_id, redirect_uris } =
      credentials.installed || credentials.web;

    return new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
  } catch (error) {
    console.error('Error loading credentials file:', error.message);
    console.error('\n⚠️  No se encontró el archivo credentials.json');
    console.error('Por favor, sigue las instrucciones en SETUP.md para obtenerlo.\n');
    process.exit(1);
  }
}

/**
 * Get new token after prompting for user authorization
 */
async function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('\n🔐 Autorización necesaria');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('1. Abre esta URL en tu navegador:\n');
  console.log(`   ${authUrl}\n`);
  console.log('2. Autoriza la aplicación');
  console.log('3. Copia el código que te proporciona Google\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const rl = createReadlineInterface();
  const code = await getUserInput(rl, 'Pega el código aquí: ');
  rl.close();

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // Save token for future use
    await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens));

    console.log('\n✅ Token guardado exitosamente en token.json');
    console.log('🎉 ¡Autenticación completada!\n');
    console.log('Ahora puedes ejecutar: npm run read\n');

    return oAuth2Client;
  } catch (error) {
    console.error('\n❌ Error obteniendo el token:', error.message);
    process.exit(1);
  }
}

/**
 * Load saved token or get new one
 */
async function authorize() {
  const oAuth2Client = await createOAuth2Client();

  try {
    // Try to load existing token
    const token = await fs.readFile(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
    console.log('✅ Token existente cargado correctamente\n');
    return oAuth2Client;
  } catch (error) {
    // No token exists, get new one
    return getNewToken(oAuth2Client);
  }
}

// Run authentication
console.log('\n🚀 Iniciando proceso de autenticación de Google Drive/Sheets\n');
authorize().catch(console.error);
