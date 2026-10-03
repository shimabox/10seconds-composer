const assert = require('node:assert/strict');
const fs = require('node:fs');
const originalAlerts = [
  {
    "number": 121,
    "package": "ip-address",
    "range": "<= 10.7.0"
  },
  {
    "number": 120,
    "package": "ip-address",
    "range": "<= 10.7.0"
  },
  {
    "number": 119,
    "package": "ip-address",
    "range": "<= 10.5.0"
  },
  {
    "number": 118,
    "package": "next",
    "range": ">= 10.0.0, < 15.5.24"
  },
  {
    "number": 117,
    "package": "next",
    "range": ">= 13.4.0, < 15.5.24"
  },
  {
    "number": 116,
    "package": "sharp",
    "range": "< 0.35.4"
  },
  {
    "number": 115,
    "package": "nanoid",
    "range": "< 3.3.12"
  },
  {
    "number": 114,
    "package": "browserslist",
    "range": "<= 4.28.6"
  },
  {
    "number": 113,
    "package": "browserslist",
    "range": "<= 4.28.6"
  },
  {
    "number": 112,
    "package": "brace-expansion",
    "range": "< 1.1.18"
  },
  {
    "number": 111,
    "package": "brace-expansion",
    "range": ">= 2.0.0, < 2.1.4"
  },
  {
    "number": 110,
    "package": "brace-expansion",
    "range": ">= 2.0.0, < 2.1.2"
  },
  {
    "number": 109,
    "package": "nanoid",
    "range": "< 3.3.18"
  },
  {
    "number": 108,
    "package": "nanoid",
    "range": "< 3.3.16"
  },
  {
    "number": 106,
    "package": "brace-expansion",
    "range": "< 1.1.17"
  },
  {
    "number": 105,
    "package": "postcss",
    "range": "<= 8.5.22"
  },
  {
    "number": 104,
    "package": "ip-address",
    "range": "<= 10.3.0"
  },
  {
    "number": 103,
    "package": "brace-expansion",
    "range": ">= 2.0.0, < 2.1.3"
  },
  {
    "number": 102,
    "package": "next",
    "range": ">= 12.0.0, < 15.5.21"
  },
  {
    "number": 101,
    "package": "next",
    "range": ">= 13.0.0, < 15.5.21"
  },
  {
    "number": 100,
    "package": "next",
    "range": ">= 13.0.0, < 15.5.21"
  },
  {
    "number": 99,
    "package": "next",
    "range": ">= 13.0.0, < 15.5.21"
  },
  {
    "number": 98,
    "package": "next",
    "range": ">= 13.0.0, < 15.5.21"
  },
  {
    "number": 97,
    "package": "next",
    "range": ">= 13.0.0, < 15.5.21"
  },
  {
    "number": 96,
    "package": "next",
    "range": ">= 14.1.1, < 15.5.21"
  },
  {
    "number": 94,
    "package": "postcss",
    "range": "<= 8.5.17"
  },
  {
    "number": 93,
    "package": "tar",
    "range": "<= 7.5.20"
  },
  {
    "number": 92,
    "package": "postcss",
    "range": "<= 8.5.11"
  },
  {
    "number": 91,
    "package": "next",
    "range": ">= 15.5.0, < 15.5.21"
  },
  {
    "number": 90,
    "package": "sharp",
    "range": "< 0.35.0"
  },
  {
    "number": 89,
    "package": "brace-expansion",
    "range": "< 1.1.16"
  },
  {
    "number": 88,
    "package": "tar",
    "range": "<= 7.5.17"
  },
  {
    "number": 87,
    "package": "tar",
    "range": "<= 7.5.18"
  },
  {
    "number": 86,
    "package": "tar",
    "range": "<= 7.5.17"
  },
  {
    "number": 85,
    "package": "tar",
    "range": "<= 7.5.16"
  },
  {
    "number": 84,
    "package": "@babel/core",
    "range": "<= 7.29.0"
  },
  {
    "number": 83,
    "package": "form-data",
    "range": ">= 3.0.0, < 3.0.5"
  },
  {
    "number": 82,
    "package": "tar",
    "range": "<= 7.5.15"
  },
  {
    "number": 75,
    "package": "ip-address",
    "range": "<= 10.1.0"
  },
  {
    "number": 74,
    "package": "postcss",
    "range": "< 8.5.10"
  },
  {
    "number": 73,
    "package": "brace-expansion",
    "range": "< 1.1.13"
  },
  {
    "number": 69,
    "package": "lodash-es",
    "range": "<= 4.17.23"
  },
  {
    "number": 68,
    "package": "lodash-es",
    "range": ">= 4.0.0, <= 4.17.23"
  },
  {
    "number": 62,
    "package": "tar",
    "range": "<= 7.5.10"
  },
  {
    "number": 61,
    "package": "tar",
    "range": "<= 7.5.9"
  },
  {
    "number": 60,
    "package": "minimatch",
    "range": "< 3.1.4"
  },
  {
    "number": 59,
    "package": "minimatch",
    "range": "< 3.1.3"
  },
  {
    "number": 56,
    "package": "minimatch",
    "range": "< 3.1.3"
  },
  {
    "number": 53,
    "package": "tar",
    "range": "< 7.5.8"
  },
  {
    "number": 49,
    "package": "tar",
    "range": "< 7.5.7"
  },
  {
    "number": 47,
    "package": "lodash-es",
    "range": ">= 4.0.0, <= 4.17.22"
  },
  {
    "number": 46,
    "package": "tar",
    "range": "<= 7.5.3"
  },
  {
    "number": 45,
    "package": "tar",
    "range": "<= 7.5.2"
  },
  {
    "number": 40,
    "package": "glob",
    "range": ">= 10.2.0, < 10.5.0"
  },
  {
    "number": 37,
    "package": "brace-expansion",
    "range": ">= 1.0.0, <= 1.1.11"
  },
  {
    "number": 1,
    "package": "postcss",
    "range": "< 8.4.31"
  }
];
const lock = fs.readFileSync('yarn.lock', 'utf8');
const versions = {};
for (const block of lock.split('\n\n')) {
  const match = block.match(/^"([^"\n]+)":\n  version: ([^\n]+)/);
  if (!match) continue;
  const name = match[1].split('@npm:')[0];
  (versions[name] ??= []).push(match[2]);
}
function compare(a, b) {
  const x = a.split('.').map(Number), y = b.split('.').map(Number);
  assert.ok(x.length === 3 && y.length === 3 && [...x, ...y].every(Number.isFinite), 'Unsupported version');
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] < y[i] ? -1 : 1;
  return 0;
}
function vulnerable(version, range) {
  return range.split(',').every(part => {
    const match = part.trim().match(/^(>=|<=|<|>|=)?\s*([\d.]+)$/);
    assert.ok(match, 'Unsupported advisory range: ' + range);
    const c = compare(version, match[2]);
    return { '>=': c >= 0, '<=': c <= 0, '<': c < 0, '>': c > 0, '=': c === 0 }[match[1] || '='];
  });
}
for (const alert of originalAlerts) {
  const locked = versions[alert.package] || [];
  assert.ok(!locked.some(version => vulnerable(version, alert.range)), 'Vulnerable dependency remains for alert #' + alert.number);
  console.log('#' + alert.number + ' ' + alert.package + ': ' + (locked.join(', ') || 'removed'));
}
console.log('Original 56 advisory ranges verified. This check does not replace the full audit report.');
