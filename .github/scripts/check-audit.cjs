const fs = require('node:fs');
const raw = fs.readFileSync(process.argv[2], 'utf8').trim();
const rows = raw ? raw.split('\n').map(JSON.parse) : [];
for (const row of rows) {
  if (!row.children || !row.children.ID) throw new Error('Unexpected audit response');
}
const security = rows.filter(row => !String(row.children.ID).endsWith(' (deprecation)'));
console.log(`Security findings: ${security.length}; deprecation notices: ${rows.length - security.length}`);
if (security.length) throw new Error('Dependency security audit failed; see the complete report');
