import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function parseArgs(argv){
  const out = {};
  for (let i = 0; i < argv.length; i++){
    const arg = argv[i];
    if (arg === '--version' || arg === '-v'){
      out.version = argv[++i];
    }
  }
  return out;
}

function assertVersion(value){
  if (!value) throw new Error('Missing required --version argument');
  if (!/^\d+(?:\.\d+)?$/.test(value)){
    throw new Error(`Invalid version "${value}" – expected numeric value`);
  }
  return value;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const { version } = (()=>{
  const parsed = parseArgs(process.argv.slice(2));
  return { version: assertVersion(parsed.version) };
})();

function codexBlock(version){
  return `/* Codex: Marquee v${version} — hvit banner globalt + blå tekst */\n`
    + `:root { --myss-blue: #24344d; --myss-marquee-bg: #ffffff; }\n\n`
    + `.marquee,\n`
    + `.marquee--top,\n`
    + `.marquee--bottom,\n`
    + `.marquee__wrap {\n`
    + `  background: var(--myss-marquee-bg) !important;\n`
    + `  background-image: none !important;\n`
    + `  border: 0 !important;\n`
    + `  box-shadow: none !important;\n`
    + `}\n\n`
    + `.marquee::before,\n`
    + `.marquee::after,\n`
    + `.marquee__wrap::before,\n`
    + `.marquee__wrap::after {\n`
    + `  content: none !important;\n`
    + `  display: none !important;\n`
    + `}\n\n`
    + `.marquee,\n`
    + `.marquee__row,\n`
    + `.marquee__row span { color: var(--myss-blue) !important; }\n`
    + `.marquee a { color: inherit; }\n\n`
    + `.marquee__wrap { padding: 8px 0 !important; }\n`
    + `/* /Codex */`;
}

function compatStyles(version){
  return `/* ===== MySS marquee v${version} (stabil én-linje, hvit bakgrunn) ===== */\n`
    + `:root{ --myss-blue:#24344d; --myss-marquee-bg:#ffffff; }\n`
    + `.hero{ margin-top:0 !important; }\n`
    + `body{ scroll-padding-top:90px; }\n\n`
    + `.marquee{\n`
    + `  display:block !important;\n`
    + `  background:var(--myss-marquee-bg) !important;\n`
    + `  color:var(--myss-blue) !important;\n`
    + `  overflow:hidden !important;\n`
    + `  white-space:nowrap !important;\n`
    + `  line-height:1 !important;\n`
    + `  padding:.6rem 0 !important;\n`
    + `}\n\n`
    + `.marquee__wrap{\n`
    + `  display:flex !important;\n`
    + `  align-items:center !important;\n`
    + `  flex-wrap:nowrap !important;\n`
    + `  white-space:nowrap !important;\n`
    + `  width:auto !important;\n`
    + `  animation:marquee var(--marquee-speed,28s) linear infinite !important;\n`
    + `  will-change:transform;\n`
    + `}\n\n`
    + `.marquee__row{\n`
    + `  display:flex !important;\n`
    + `  align-items:center !important;\n`
    + `  gap:2rem !important;\n`
    + `  flex:0 0 auto !important;\n`
    + `  padding:0 2rem !important;\n`
    + `  margin-right:2rem !important;\n`
    + `}\n\n`
    + `.marquee__row span{\n`
    + `  display:inline-block !important;\n`
    + `}\n\n`
    + `@keyframes marquee{\n`
    + `  0%{ transform:translate3d(0,0,0); }\n`
    + `  100%{ transform:translate3d(-50%,0,0); }\n`
    + `}\n\n`
    + `.marquee:not(.marquee--bottom) ~ .marquee:not(.marquee--bottom){\n`
    + `  display:none !important;\n`
    + `}\n\n`
    + `.marquee--bottom ~ .marquee--bottom{\n`
    + `  display:none !important;\n`
    + `}`;
}

function wwwMarqueeBlock(version){
  return `/* --- MARQUEE --- */\n`
    + `.marquee {\n`
    + `  overflow: hidden;\n`
    + `  background: #ffffff;\n`
    + `  color: #24344d;\n`
    + `  padding: 1rem 0;\n`
    + `  border: 0;\n`
    + `  box-shadow: none;\n`
    + `}\n\n`
    + `.marquee__wrap {\n`
    + `  display: inline-flex;\n`
    + `  flex-direction: row;\n`
    + `  flex-wrap: nowrap;\n`
    + `  gap: 1.5rem;\n`
    + `  white-space: nowrap;\n`
    + `  animation: marquee 40s linear infinite;\n`
    + `  padding: 8px 0;\n`
    + `}\n\n`
    + `@keyframes marquee {\n`
    + `  0% { transform: translateX(0%); }\n`
    + `  100% { transform: translateX(-50%); }\n`
    + `}\n\n`
    + `.marquee__row span {\n`
    + `  margin-right: 2rem;\n`
    + `  font-weight: 600;\n`
    + `  font-size: 1rem;\n`
    + `  letter-spacing: 0.5px;\n`
    + `  color: inherit;\n`
    + `}\n`;
}

async function updateStylesCSS(){
  const file = path.join(repoRoot, 'styles.css');
  let text = await fs.readFile(file, 'utf8');
  const regex = /\/\* Codex:[\s\S]*?\/\* \/Codex \*\//m;
  const replacement = codexBlock(version);
  if (regex.test(text)){
    text = text.replace(regex, replacement);
  } else {
    text = text.trimEnd() + '\n\n' + replacement + '\n';
  }
  await fs.writeFile(file, text);
}

async function updateCompatCSS(){
  const file = path.join(repoRoot, 'compat.css');
  await fs.writeFile(file, compatStyles(version) + '\n');
}

async function updateWwwStyles(){
  const file = path.join(repoRoot, 'www.mystrongestside.no', 'styles.css');
  let text = await fs.readFile(file, 'utf8');
  const startToken = '/* --- MARQUEE --- */';
  const endToken = '/* --- INFOCARD';
  const start = text.indexOf(startToken);
  const end = text.indexOf(endToken);
  const block = wwwMarqueeBlock(version);
  if (start !== -1 && end !== -1 && end > start){
    const before = text.slice(0, start);
    const after = text.slice(end);
    text = before + block + '\n' + after;
  } else {
    text = text.trimEnd() + '\n\n' + block + '\n';
  }
  await fs.writeFile(file, text);
}

async function updateHTMLVersions(){
  const htmlFiles = [];
  async function walk(dir){
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries){
      if (entry.name === '.git' || entry.name === 'node_modules') continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()){
        await walk(full);
      } else if (entry.isFile() && entry.name.endsWith('.html')){
        htmlFiles.push(full);
      }
    }
  }
  await walk(repoRoot);

  const versionRegex = /marquee-guard\.js\?v=\d+(?:\.\d+)?/g;
  await Promise.all(htmlFiles.map(async (file)=>{
    let text = await fs.readFile(file, 'utf8');
    if (!versionRegex.test(text)) return;
    text = text.replace(versionRegex, `marquee-guard.js?v=${version}`);
    await fs.writeFile(file, text);
  }));
}

async function main(){
  await Promise.all([
    updateStylesCSS(),
    updateCompatCSS(),
    updateWwwStyles(),
    updateHTMLVersions()
  ]);
}

main().catch((err)=>{
  console.error(err);
  process.exitCode = 1;
});
