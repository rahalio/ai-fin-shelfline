/**
 * In-memory sandbox for Shelfline product domains (local/dev).
 */

import { randomUUID } from 'node:crypto';

const stores = new Map<string, Map<string, Record<string, unknown>>>();

function store(name: string): Map<string, Record<string, unknown>> {
  let m = stores.get(name);
  if (!m) {
    m = new Map();
    stores.set(name, m);
  }
  return m;
}

function meta() {
  return {
    meta: {
      requestId: randomUUID(),
      generatedAt: new Date().toISOString(),
    },
  };
}

export function sandboxList(name: string) {
  return { data: { items: [...store(name).values()] }, ...meta() };
}

export function sandboxGet(name: string, id: string) {
  const item = store(name).get(id);
  if (!item) {
    const err = new Error('Not found') as Error & { statusCode?: number };
    err.statusCode = 404;
    throw err;
  }
  return { data: item, ...meta() };
}

export function sandboxUpsert(
  name: string,
  id: string,
  data: Record<string, unknown>
) {
  const item = { id, ...data, updatedAt: new Date().toISOString() };
  store(name).set(id, item);
  return { data: item, ...meta() };
}

export function sandboxCreate(
  name: string,
  data: Record<string, unknown>,
  idField = 'id'
) {
  const id = String(
    data[idField] ??
      `${name}_${randomUUID().replace(/-/g, '').slice(0, 12)}`
  );
  const item = {
    ...data,
    [idField]: id,
    id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store(name).set(id, item);
  return { data: item, ...meta() };
}

export function sandboxPatch(
  name: string,
  id: string,
  patch: Record<string, unknown>
) {
  const existing = store(name).get(id) ?? { id };
  const item = {
    ...existing,
    ...patch,
    id,
    updatedAt: new Date().toISOString(),
  };
  store(name).set(id, item);
  return { data: item, ...meta() };
}
