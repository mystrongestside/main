import { createServer } from 'http';
import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

// Minimal .env loader to avoid external dependencies
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const envPath = resolve(__dirname, '../.env');
if (existsSync(envPath)) {
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
}

const API_KEY = process.env.CHECKIN_API_KEY;
const CUSTOMER_ID = parseInt(process.env.CHECKIN_CUSTOMER_ID, 10);
const PORT = Number(process.env.PORT) || 3000;

// Dine tre MyStrongestSide-eventer
const EVENTS = {
  156159: 'Tett oppfølging',
  155756: 'Barn og ungdom',
  155377: 'Voksne lett'
};

// Cache for å redusere API-kall
let cache = { data: null, expires: 0 };

async function getCheckinCounts() {
  if (cache.data && Date.now() < cache.expires) return cache.data;

  const results = {};
  for (const id of Object.keys(EVENTS)) {
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
            { rule: "AND", field: "EVENT_ID", operator: "EQUALS", value: id },
            { rule: "AND", field: "CANCELLED_AT", operator: "IS_EMPTY", value: "" }
          ]
        }
      ]
    };
    try {
      const res = await fetch('https://api.checkin.no/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({ query, variables })
      });
      const json = await res.json();
      results[id] = Number(json?.data?.allEventOrderUsers?.records) || 0;
    } catch (e) {
      console.error('Feil for event', id, e);
      results[id] = 0;
    }
  }
  cache = { data: results, expires: Date.now() + 60000 }; // cache 1 minutt
  return results;
}

const server = createServer(async (req, res) => {
  if (req.method === 'GET' && req.url && req.url.startsWith('/api/checkin-counts')) {
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
