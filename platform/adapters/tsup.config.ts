import { defineConfig } from 'tsup';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function collectEntries(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) collectEntries(p, acc);
    else if (name.endsWith('.ts') && !name.endsWith('.test.ts') && !name.endsWith('.spec.ts')) {
      acc.push(p);
    }
  }
  return acc;
}

export default defineConfig({
  entry: collectEntries('src'),
  format: ['esm'],
  dts: false,
  sourcemap: true,
  clean: true,
  target: 'es2022',
  bundle: false,
  splitting: false,
  treeshake: false,
  outDir: 'dist',
  esbuildOptions(options) {
    options.outbase = 'src';
  },
});
