import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const MarginSnapshot = z
  .object({
    id: z.string(),
    distributorId: z.string(),
    skuId: z.string(),
    period: z.string(),
    contributionMargin: z.number(),
    nimImpactBps: z.number().optional(),
    killScaleHint: z.enum(['kill', 'scale', 'hold']).optional(),
  })
  .passthrough();
const MarginSnapshotListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string(),
          distributorId: z.string(),
          skuId: z.string(),
          period: z.string(),
          contributionMargin: z.number(),
          nimImpactBps: z.number().optional(),
          killScaleHint: z.enum(['kill', 'scale', 'hold']).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const MarginSnapshotListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string(),
              distributorId: z.string(),
              skuId: z.string(),
              period: z.string(),
              contributionMargin: z.number(),
              nimImpactBps: z.number().optional(),
              killScaleHint: z.enum(['kill', 'scale', 'hold']).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const CacReport = z
  .object({
    id: z.string(),
    distributorId: z.string(),
    segment: z.string().optional(),
    period: z.string(),
    cac: z.number(),
    volume: z.number().int().optional(),
  })
  .passthrough();
const CacReportListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string(),
          distributorId: z.string(),
          segment: z.string().optional(),
          period: z.string(),
          cac: z.number(),
          volume: z.number().int().optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const CacReportListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string(),
              distributorId: z.string(),
              segment: z.string().optional(),
              period: z.string(),
              cac: z.number(),
              volume: z.number().int().optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  Problem,
  MarginSnapshot,
  MarginSnapshotListData,
  ResponseMeta,
  MarginSnapshotListResponse,
  CacReport,
  CacReportListData,
  CacReportListResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/telemetry/cac',
    alias: 'listCacReports',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
      {
        name: 'distributorId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'period',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'segment',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string(),
                  distributorId: z.string(),
                  segment: z.string().optional(),
                  period: z.string(),
                  cac: z.number(),
                  volume: z.number().int().optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/telemetry/margin',
    alias: 'listMarginSnapshots',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
      {
        name: 'distributorId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'skuId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'period',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string(),
                  distributorId: z.string(),
                  skuId: z.string(),
                  period: z.string(),
                  contributionMargin: z.number(),
                  nimImpactBps: z.number().optional(),
                  killScaleHint: z.enum(['kill', 'scale', 'hold']).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
