import { createServer } from 'http';
import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

// Minimal .env loader to avoid external dependencies
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ENV_LOCATIONS = [
  resolve(__dirname, '../myss_secure_env/.env'),
  resolve(__dirname, '../.env')
];

for (const envPath of ENV_LOCATIONS) {
  if (!existsSync(envPath)) continue;

  const lines = readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }

  break;
}

const API_KEY = process.env.CHECKIN_API_KEY;
const CUSTOMER_ID = parseInt(process.env.CHECKIN_CUSTOMER_ID, 10);
const PORT = Number(process.env.PORT) || 3000;
const FETCH_TIMEOUT_MS = Number(process.env.CHECKIN_TIMEOUT_MS) || 5000;
const MISSING_CONFIG = [];

if (!API_KEY) MISSING_CONFIG.push('CHECKIN_API_KEY');
if (!Number.isInteger(CUSTOMER_ID)) MISSING_CONFIG.push('CHECKIN_CUSTOMER_ID');

// Dine tre MyStrongestSide-eventer
const EVENTS = {
  156159: 'Tett oppfølging',
  155756: 'Barn og ungdom',
  155377: 'Voksne lett'
};

// Cache for å redusere API-kall
let cache = { data: null, expires: 0 };

async function fetchEventRecords(eventId) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const query = `
      query allEventOrderUsers($customerId: Int, $reportFilters: [EventOrderUserReportFilterInput!]) {
        allEventOrderUsers(customerId: $customerId, reportFilters: $reportFilters) {
          records
        }
      }
    `;
    const variables = {
      customerId: CUSTOMER_ID,
      reportFilters: [
        {
          rule: "AND",
          conditions: [
            { rule: "AND", field: "EVENT_ID", operator: "EQUALS", value: eventId },
            { rule: "AND", field: "CANCELLED_AT", operator: "IS_EMPTY", value: "" }
          ]
        }
      ]
    };

    const response = await fetch('https://api.checkin.no/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`Checkin API svarte med ${response.status}`);
    }

    const json = await response.json();
    return Number(json?.data?.allEventOrderUsers?.records) || 0;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function getCheckinCounts() {
  if (cache.data && Date.now() < cache.expires) return cache.data;

  const results = {};
  await Promise.all(
    Object.keys(EVENTS).map(async (id) => {
      try {
        results[id] = await fetchEventRecords(id);
      } catch (error) {
        console.error('Feil for event', id, error);
        results[id] = 0;
      }
    })
  );
  cache = { data: results, expires: Date.now() + 60000 }; // cache 1 minutt
  return results;
}

const server = createServer(async (req, res) => {
  if (req.method === 'GET' && req.url && req.url.startsWith('/api/checkin-counts')) {
    if (MISSING_CONFIG.length > 0) {
      console.error('Mangler påkrevde miljøvariabler:', MISSING_CONFIG.join(', '));
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Manglende serverkonfigurasjon' }));
      return;
    }

    try {
      const data = await getCheckinCounts();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } catch (error) {
      console.error('Uventet feil i forespørsel:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Kunne ikke hente data' }));
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Ikke funnet' }));
});

server.listen(PORT, () => {
  console.log(`✅ Checkin-integrasjon aktiv (kunde ${CUSTOMER_ID}) på port ${PORT}`);
});
