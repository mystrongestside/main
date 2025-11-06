import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const envPath = resolve(__dirname, '../myss_secure_env/.env');

if (!existsSync(envPath)) {
  console.error('Fant ikke .env i forventet katalog:', envPath);
  process.exit(1);
}

const env = Object.create(null);
const lines = readFileSync(envPath, 'utf8').split(/\r?\n/);
for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const idx = trimmed.indexOf('=');
  if (idx === -1) continue;
  env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
}

console.log('Test: Kunde-ID er', env.CHECKIN_CUSTOMER_ID || 'mangler');
