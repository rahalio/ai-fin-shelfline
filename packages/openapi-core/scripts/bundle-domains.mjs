#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const domains = [
  'identity',
  'skus',
  'distributors',
  'originations',
  'throttles',
  'telemetry',
  'complaints',
  'breaches',
];

mkdirSync(resolve(root, 'src/.bundled'), { recursive: true });

for (const d of domains) {
  for (const [fmt, out] of [
    ['yaml', `src/.bundled/${d}.openapi.yaml`],
    ['json', `src/.bundled/${d}.json`],
  ]) {
    const r = spawnSync(
      'pnpm',
      ['exec', 'redocly', 'bundle', d, '--output', out],
      { cwd: root, stdio: 'inherit' }
    );
    if (r.status !== 0) process.exit(r.status ?? 1);
  }
  console.log(`bundled ${d}`);
}
