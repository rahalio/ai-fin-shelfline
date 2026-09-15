import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const recordBreach_Body = z
  .object({
    distributorId: z.string(),
    type: z.enum([
      'shadowPricing',
      'disclosureFailure',
      'brandMisuse',
      'dataLeakage',
    ]),
    detail: z.string().min(1),
  })
  .passthrough();
const createFairnessAttestation_Body = z
  .object({
    attestedBy: z.string().min(1),
    channelCompareNote: z.string().optional(),
    leakageFindings: z.number().int().gte(0).optional(),
  })
  .passthrough();
const BreachStatus = z.enum(['open', 'remediated', 'escalated']);
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
const BreachType = z.enum([
  'shadowPricing',
  'disclosureFailure',
  'brandMisuse',
  'dataLeakage',
]);
const BreachEvent = z
  .object({
    id: z.string(),
    distributorId: z.string(),
    type: z.enum([
      'shadowPricing',
      'disclosureFailure',
      'brandMisuse',
      'dataLeakage',
    ]),
    status: z.enum(['open', 'remediated', 'escalated']),
    detail: z.string().optional(),
    detectedAt: z.string().datetime({ offset: true }).optional(),
    pauseSuggested: z.boolean().optional(),
  })
  .passthrough();
const BreachEventListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string(),
          distributorId: z.string(),
          type: z.enum([
            'shadowPricing',
            'disclosureFailure',
            'brandMisuse',
            'dataLeakage',
          ]),
          status: z.enum(['open', 'remediated', 'escalated']),
          detail: z.string().optional(),
          detectedAt: z.string().datetime({ offset: true }).optional(),
          pauseSuggested: z.boolean().optional(),
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
const BreachEventListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string(),
              distributorId: z.string(),
              type: z.enum([
                'shadowPricing',
                'disclosureFailure',
                'brandMisuse',
                'dataLeakage',
              ]),
              status: z.enum(['open', 'remediated', 'escalated']),
              detail: z.string().optional(),
              detectedAt: z.string().datetime({ offset: true }).optional(),
              pauseSuggested: z.boolean().optional(),
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
const BreachEventCreate = z
  .object({
    distributorId: z.string(),
    type: z.enum([
      'shadowPricing',
      'disclosureFailure',
      'brandMisuse',
      'dataLeakage',
    ]),
    detail: z.string().min(1),
  })
  .passthrough();
const BreachEventResponse = z
  .object({
    data: z
      .object({
        id: z.string(),
        distributorId: z.string(),
        type: z.enum([
          'shadowPricing',
          'disclosureFailure',
          'brandMisuse',
          'dataLeakage',
        ]),
        status: z.enum(['open', 'remediated', 'escalated']),
        detail: z.string().optional(),
        detectedAt: z.string().datetime({ offset: true }).optional(),
        pauseSuggested: z.boolean().optional(),
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
const BreachRemediateRequest = z
  .object({ remediationNote: z.string().min(1) })
  .passthrough();
const FairnessAttestation = z
  .object({
    id: z.string(),
    attestedAt: z.string().datetime({ offset: true }),
    attestedBy: z.string(),
    channelCompareNote: z.string().optional(),
    leakageFindings: z.number().int().gte(0).optional(),
  })
  .passthrough();
const FairnessAttestationListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string(),
          attestedAt: z.string().datetime({ offset: true }),
          attestedBy: z.string(),
          channelCompareNote: z.string().optional(),
          leakageFindings: z.number().int().gte(0).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const FairnessAttestationListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string(),
              attestedAt: z.string().datetime({ offset: true }),
              attestedBy: z.string(),
              channelCompareNote: z.string().optional(),
              leakageFindings: z.number().int().gte(0).optional(),
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
const FairnessAttestationCreate = z
  .object({
    attestedBy: z.string().min(1),
    channelCompareNote: z.string().optional(),
    leakageFindings: z.number().int().gte(0).optional(),
  })
  .passthrough();
const FairnessAttestationResponse = z
  .object({
    data: z
      .object({
        id: z.string(),
        attestedAt: z.string().datetime({ offset: true }),
        attestedBy: z.string(),
        channelCompareNote: z.string().optional(),
        leakageFindings: z.number().int().gte(0).optional(),
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
  recordBreach_Body,
  createFairnessAttestation_Body,
  BreachStatus,
  Problem,
  BreachType,
  BreachEvent,
  BreachEventListData,
  ResponseMeta,
  BreachEventListResponse,
  BreachEventCreate,
  BreachEventResponse,
  BreachRemediateRequest,
  FairnessAttestation,
  FairnessAttestationListData,
  FairnessAttestationListResponse,
  FairnessAttestationCreate,
  FairnessAttestationResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/breaches',
    alias: 'listBreaches',
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
        name: 'status',
        type: 'Query',
        schema: z.enum(['open', 'remediated', 'escalated']).optional(),
      },
      {
        name: 'distributorId',
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
                  type: z.enum([
                    'shadowPricing',
                    'disclosureFailure',
                    'brandMisuse',
                    'dataLeakage',
                  ]),
                  status: z.enum(['open', 'remediated', 'escalated']),
                  detail: z.string().optional(),
                  detectedAt: z.string().datetime({ offset: true }).optional(),
                  pauseSuggested: z.boolean().optional(),
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
    method: 'post',
    path: '/v1/breaches',
    alias: 'recordBreach',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: recordBreach_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string(),
            distributorId: z.string(),
            type: z.enum([
              'shadowPricing',
              'disclosureFailure',
              'brandMisuse',
              'dataLeakage',
            ]),
            status: z.enum(['open', 'remediated', 'escalated']),
            detail: z.string().optional(),
            detectedAt: z.string().datetime({ offset: true }).optional(),
            pauseSuggested: z.boolean().optional(),
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
        status: 400,
        description: `Malformed request`,
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
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
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
    path: '/v1/breaches/:breachId',
    alias: 'getBreach',
    requestFormat: 'json',
    parameters: [
      {
        name: 'breachId',
        type: 'Path',
        schema: z.string(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string(),
            distributorId: z.string(),
            type: z.enum([
              'shadowPricing',
              'disclosureFailure',
              'brandMisuse',
              'dataLeakage',
            ]),
            status: z.enum(['open', 'remediated', 'escalated']),
            detail: z.string().optional(),
            detectedAt: z.string().datetime({ offset: true }).optional(),
            pauseSuggested: z.boolean().optional(),
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
      {
        status: 404,
        description: `Resource not found`,
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
    method: 'post',
    path: '/v1/breaches/:breachId/remediate',
    alias: 'remediateBreach',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ remediationNote: z.string().min(1) }).passthrough(),
      },
      {
        name: 'breachId',
        type: 'Path',
        schema: z.string(),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string(),
            distributorId: z.string(),
            type: z.enum([
              'shadowPricing',
              'disclosureFailure',
              'brandMisuse',
              'dataLeakage',
            ]),
            status: z.enum(['open', 'remediated', 'escalated']),
            detail: z.string().optional(),
            detectedAt: z.string().datetime({ offset: true }).optional(),
            pauseSuggested: z.boolean().optional(),
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
      {
        status: 404,
        description: `Resource not found`,
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
    path: '/v1/fairness/attestations',
    alias: 'listFairnessAttestations',
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
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string(),
                  attestedAt: z.string().datetime({ offset: true }),
                  attestedBy: z.string(),
                  channelCompareNote: z.string().optional(),
                  leakageFindings: z.number().int().gte(0).optional(),
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
    method: 'post',
    path: '/v1/fairness/attestations',
    alias: 'createFairnessAttestation',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createFairnessAttestation_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string(),
            attestedAt: z.string().datetime({ offset: true }),
            attestedBy: z.string(),
            channelCompareNote: z.string().optional(),
            leakageFindings: z.number().int().gte(0).optional(),
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
        status: 400,
        description: `Malformed request`,
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
