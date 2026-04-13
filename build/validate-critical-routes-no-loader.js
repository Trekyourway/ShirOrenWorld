#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

const CRITICAL_ROUTES = [
  'coaching/learn/index.html',
  'coaching/articles/index.html',
  'coaching/products/co-work/index.html',
  'coaching/products/90-minutes-out-of-fog/index.html',
];

const blockedPatterns = [
  { name: 'document.write', regex: /document\.write\s*\(/i },
  { name: 'runtime fetch', regex: /fetch\s*\(/i },
];

const failures = [];

for (const relFile of CRITICAL_ROUTES) {
  const absFile = path.join(repoRoot, relFile);
  if (!fs.existsSync(absFile)) {
    failures.push(`${relFile}: missing file`);
    continue;
  }

  const content = fs.readFileSync(absFile, 'utf8');
  for (const pattern of blockedPatterns) {
    if (pattern.regex.test(content)) {
      failures.push(`${relFile}: contains blocked pattern (${pattern.name})`);
    }
  }
}

if (failures.length > 0) {
  console.error('❌ Critical route validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('✅ Critical route validation passed (no runtime loader patterns found).');
