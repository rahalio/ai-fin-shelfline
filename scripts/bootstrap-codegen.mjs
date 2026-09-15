#!/usr/bin/env node
/**
 * Sync local `.codegen/` from the zero-apps codegen scaffold.
 * `.codegen` must never be committed or pushed — this script restores it for local/CI use.
 *
 * Env:
 *   ZERO_APPS_CODEGEN_SCAFFOLD — absolute path to zero-apps-codegen-scaffold
 *     (default: /Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold)
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const scaffold =
  process.env.ZERO_APPS_CODEGEN_SCAFFOLD ||
  '/Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold';
const src = resolve(scaffold, '.codegen');
const dest = resolve(root, '.codegen');

if (!existsSync(src)) {
  console.error(
    `bootstrap-codegen: scaffold .codegen not found at ${src}\n` +
      `Set ZERO_APPS_CODEGEN_SCAFFOLD to the zero-apps-codegen-scaffold root.`
  );
  process.exit(1);
}

const rsync = spawnSync('rsync', ['-a', '--delete', `${src}/`, `${dest}/`], {
  stdio: 'inherit',
});
if (rsync.status !== 0) process.exit(rsync.status ?? 1);

function rewriteFile(path) {
  if (!existsSync(path)) return;
  let text = readFileSync(path, 'utf8');
  text = text
    .replaceAll('"package_scope": "@ddd"', '"package_scope": "@shelfline"')
    .replaceAll('"package_name": "@ddd/core"', '"package_name": "@shelfline/core"')
    .replaceAll('@ddd/', '@shelfline/')
    .replaceAll('DEFAULT_SCOPE = "@ddd"', 'DEFAULT_SCOPE = "@shelfline"');
  writeFileSync(path, text);
}

rewriteFile(resolve(dest, 'zero-codegen.json'));
rewriteFile(resolve(dest, '.zero-codegen-merged.json'));
rewriteFile(
  resolve(dest, 'codegen/src/zero_codegen/utils/package_scope.py')
);

// Scaffold generators hardcode @ddd — rewrite for Shelfline after every sync
const scopeRewrite = spawnSync(
  'find',
  [
    resolve(dest, 'codegen/src'),
    '-type',
    'f',
    '-name',
    '*.py',
    '-exec',
    'perl',
    '-pi',
    '-e',
    's/@ddd\\//@shelfline\\//g; s/"@ddd"/"@shelfline"/g; s/\'@ddd\'/\'@shelfline\'/g',
    '{}',
    '+',
  ],
  { stdio: 'inherit' }
);
if (scopeRewrite.status !== 0) {
  console.warn('bootstrap-codegen: generator scope rewrite exited', scopeRewrite.status);
}

const paths = spawnSync('node', [resolve(root, 'scripts/sync-codegen-paths.mjs')], {
  cwd: root,
  stdio: 'inherit',
});
if (paths.status !== 0) process.exit(paths.status ?? 1);

console.log(`bootstrap-codegen: synced ${src} → ${dest} (@shelfline scope)`);
