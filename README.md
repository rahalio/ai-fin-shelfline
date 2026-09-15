# Shelfline

Banking-as-a-platform product shelf — OpenAPI-first DDD monorepo (`@shelfline/*`).

Product specs: [PRODUCT.md](PRODUCT.md), [WEBAPP.md](WEBAPP.md), [USER_STORIES.md](USER_STORIES.md).

## What you get

| Piece | Location |
|-------|----------|
| `zero-codegen` tool (local only) | `.codegen/` — **never commit**; run `pnpm bootstrap:codegen` |
| OpenAPI + Redocly | `packages/openapi-core/` (`common/` + domain YAMLs) |
| Core / services / adapters / api-server | `packages/core`, `platform/*` |
| Web app | `platform/webapp` |
| Agent skills | `.cursor/skills/` |

Package scope: **`@shelfline/*`**.

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
                                                                                    platform/webapp
```

## Quick start

```bash
pnpm install
pnpm bootstrap:codegen   # required: .codegen is gitignored
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: shelfline_demo_local_dev_key

# Web app (proxy → API on 4010 by default in vite.config)
PORT=4010 pnpm dev:api &
pnpm dev:web
```

Optional Dynamo Local:

```bash
docker compose up -d
TABLE_NAME=shelfline-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
```

## Codegen rules (agents)

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. **Never commit `.codegen/`** — see `.cursor/rules/codegen-never-commit.mdc`.
4. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.

See `.cursor/skills/` and `docs/CODEGEN.md`.
