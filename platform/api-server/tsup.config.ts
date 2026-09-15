import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: false,
  sourcemap: true,
  clean: true,
  target: 'es2022',
  splitting: false,
  treeshake: true,
  external: [
    '@shelfline/core',
    '@shelfline/services',
    '@shelfline/adapters',
    'fastify',
    '@fastify/cors',
    '@fastify/helmet',
    '@fastify/jwt',
    'dotenv',
    'jsonwebtoken',
    'zod',
    '@zodios/core',
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/lib-dynamodb',
    '@aws-sdk/credential-providers',
    '@aws-sdk/types',
  ],
});
