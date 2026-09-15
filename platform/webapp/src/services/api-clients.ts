import { apiFetch } from '../lib/api';

const DEMO_KEY = 'shelfline_demo_local_dev_key';

type ListEnvelope<T> = {
  data: { items: T[]; nextCursor?: string };
  meta?: Record<string, unknown>;
};

type DataEnvelope<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

function opts(init: RequestInit = {}): RequestInit & { apiKey: string } {
  return { ...init, apiKey: DEMO_KEY };
}

export const skusApi = {
  list: () =>
    apiFetch<ListEnvelope<Record<string, unknown>>>('/v1/skus', opts()),
  create: (body: Record<string, unknown>) =>
    apiFetch<DataEnvelope<Record<string, unknown>>>('/v1/skus', opts({
      method: 'POST',
      body: JSON.stringify(body),
    })),
  publish: (skuId: string) =>
    apiFetch<DataEnvelope<Record<string, unknown>>>(
      `/v1/skus/${encodeURIComponent(skuId)}/publish`,
      opts({ method: 'POST', body: '{}' })
    ),
  pause: (skuId: string, reason: string) =>
    apiFetch<DataEnvelope<Record<string, unknown>>>(
      `/v1/skus/${encodeURIComponent(skuId)}/pause`,
      opts({ method: 'POST', body: JSON.stringify({ reason }) })
    ),
};

export const distributorsApi = {
  list: () =>
    apiFetch<ListEnvelope<Record<string, unknown>>>('/v1/distributors', opts()),
  register: (body: Record<string, unknown>) =>
    apiFetch<DataEnvelope<Record<string, unknown>>>('/v1/distributors', opts({
      method: 'POST',
      body: JSON.stringify(body),
    })),
  pause: (id: string, reason: string) =>
    apiFetch<DataEnvelope<Record<string, unknown>>>(
      `/v1/distributors/${encodeURIComponent(id)}/pause`,
      opts({ method: 'POST', body: JSON.stringify({ reason }) })
    ),
};

export const originationsApi = {
  list: () =>
    apiFetch<ListEnvelope<Record<string, unknown>>>('/v1/originations', opts()),
};

export const throttlesApi = {
  listCaps: () =>
    apiFetch<ListEnvelope<Record<string, unknown>>>('/v1/throttles/caps', opts()),
  listEvents: () =>
    apiFetch<ListEnvelope<Record<string, unknown>>>('/v1/throttles/events', opts()),
};

export const telemetryApi = {
  margin: () =>
    apiFetch<ListEnvelope<Record<string, unknown>>>('/v1/telemetry/margin', opts()),
  cac: () =>
    apiFetch<ListEnvelope<Record<string, unknown>>>('/v1/telemetry/cac', opts()),
};

export const complaintsApi = {
  list: () =>
    apiFetch<ListEnvelope<Record<string, unknown>>>('/v1/complaints', opts()),
};

export const breachesApi = {
  list: () =>
    apiFetch<ListEnvelope<Record<string, unknown>>>('/v1/breaches', opts()),
  listFairness: () =>
    apiFetch<ListEnvelope<Record<string, unknown>>>(
      '/v1/fairness/attestations',
      opts()
    ),
};
