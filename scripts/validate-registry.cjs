// Validates front matter of registry pages (content/**, any page with an entryType field).
// Run: node scripts/validate-registry.cjs [changed-file ...]
// Malformed values always fail. Missing fields fail only for the files given
// as arguments (the pages a PR touches); for all other pages they are
// reported as warnings, so legacy entries don't block unrelated PRs.
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const VOCAB = YAML.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'registry.yaml'), 'utf8'));

const ROOT = path.join(__dirname, '..', 'content');
const TYPES = ['application', 'library'];
const REQUIRED = ['title', 'area', 'institution', 'status', 'contactName', 'contactEmail'];
const LINKS = ['source', 'website', 'documentation'];

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.name.endsWith('.md')) yield p;
  }
}

const isBlank = (v) => v == null || (typeof v === 'string' && !v.trim()) || (Array.isArray(v) && v.length === 0);
const strict = new Set(process.argv.slice(2).map((f) => path.resolve(f)));
const errors = [];
const warnings = [];
let count = 0;

for (const file of walk(ROOT)) {
  const m = fs.readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) continue;
  let fm;
  try { fm = YAML.parse(m[1]) || {}; } catch (e) {
    if (/^entryType:/m.test(m[1])) errors.push([file, `invalid YAML: ${e.message.split('\n')[0]}`]);
    continue;
  }
  if (fm.entryType === undefined) continue;
  count++;
  const err = (msg) => errors.push([file, msg]);
  const gap = (msg) => (strict.has(path.resolve(file)) ? errors : warnings).push([file, msg]);

  for (const k of REQUIRED) if (isBlank(fm[k])) gap(`missing required field "${k}"`);
  if (!TYPES.includes(fm.entryType)) err(`entryType must be one of: ${TYPES.join(', ')} (got "${fm.entryType}")`);
  if (!isBlank(fm.status) && !VOCAB.statuses.includes(fm.status)) err(`status "${fm.status}" is not in data/registry.yaml (allowed: ${VOCAB.statuses.join(', ')})`);
  if (!isBlank(fm.lastVerified) && !/^\d{4}-\d{2}-\d{2}$/.test(String(fm.lastVerified instanceof Date ? fm.lastVerified.toISOString().slice(0, 10) : fm.lastVerified))) err('lastVerified must be a date like 2026-11-08');
  if (!isBlank(fm.institution) && !Array.isArray(fm.institution)) err('institution must be a list, e.g. ["Sandia", "NREL"]');
  for (const [k, allowed] of [['area', VOCAB.areas], ['libraries', VOCAB.libraries]]) {
    if (isBlank(fm[k])) continue;
    if (!Array.isArray(fm[k])) { err(`${k} must be a list of values from data/registry.yaml`); continue; }
    for (const v of fm[k]) if (!allowed.includes(v)) err(`${k} "${v}" is not in data/registry.yaml (allowed: ${allowed.join(', ')})`);
  }
  if (!isBlank(fm.availability) && !VOCAB.availabilities.includes(fm.availability)) err(`availability "${fm.availability}" is not in data/registry.yaml (allowed: ${VOCAB.availabilities.join(', ')})`);
  // restricted projects may have no public links
  if (fm.availability !== 'Restricted' && !LINKS.some((k) => !isBlank(fm[k]))) gap(`needs at least one of: ${LINKS.join(', ')}`);
  for (const k of LINKS) if (!isBlank(fm[k]) && !/^https?:\/\//.test(fm[k])) err(`${k} must be an http(s) URL`);
}

// The registration form hard-codes the area and status options; keep them in sync.
const form = YAML.parse(fs.readFileSync(path.join(__dirname, '..', '.github', 'ISSUE_TEMPLATE', 'register-application.yml'), 'utf8'));
for (const [id, key] of [['area', 'areas'], ['status', 'statuses'], ['availability', 'availabilities']]) {
  const opts = form.body.find((b) => b.id === id).attributes.options.map((o) => o.label || o);
  if (JSON.stringify(opts) !== JSON.stringify(VOCAB[key])) {
    errors.push(['.github/ISSUE_TEMPLATE/register-application.yml', `"${id}" options differ from "${key}" in data/registry.yaml`]);
  }
}

const rel = (f) => path.relative(path.join(__dirname, '..'), f);
for (const [f, msg] of warnings) console.log(`::warning file=${rel(f)}::${msg}`);
for (const [f, msg] of errors) console.log(`::error file=${rel(f)}::${msg}`);
console.log(`Checked ${count} registry pages: ${errors.length} error(s), ${warnings.length} warning(s).`);
process.exit(errors.length ? 1 : 0);
