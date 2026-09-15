---
name: shelfline-codegen-hygiene
description: >-
  Shelfline rule: never commit or push .codegen; bootstrap from
  zero-apps-codegen-scaffold. Use when cloning, CI setup, codegen missing,
  or git status shows .codegen.
---

# Shelfline — `.codegen` hygiene

## Hard rule

**Never commit or push `.codegen/`.** It is gitignored. Generated OpenAPI bundles under `packages/openapi-core/src/.bundled/` are also ignored.

## Bootstrap

```bash
pnpm bootstrap:codegen
# or:
# ZERO_APPS_CODEGEN_SCAFFOLD=/path/to/zero-apps-codegen-scaffold pnpm bootstrap:codegen
```

This rsyncs `.codegen/` from the scaffold, rewrites `package_scope` to `@shelfline`, and runs `scripts/sync-codegen-paths.mjs`.

## After bootstrap

```bash
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
```

## Package scope

All workspace packages use `@shelfline/*` (not `@ddd`, not `ai-*` prefixes).
