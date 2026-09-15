import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createProductSku_Body = z
  .object({
    name: z.string().min(1).max(200),
    productFamily: z.enum(['deposit', 'lending', 'payment']),
    role: z.enum(['manufacturer', 'distributor', 'both']),
    adjudicationMode: z.enum(['bank', 'partner', 'dual']).optional(),
    manufacturingPrice: z.number().optional(),
    priceFloor: z.number().optional(),
    crossSubsidyDeclared: z.boolean().optional(),
    crossSubsidyNote: z.string().optional(),
  })
  .passthrough();
const updateProductSku_Body = z
  .object({
    name: z.string().min(1).max(200),
    adjudicationMode: z.enum(['bank', 'partner', 'dual']),
    manufacturingPrice: z.number(),
    priceFloor: z.number(),
    crossSubsidyDeclared: z.boolean(),
    crossSubsidyNote: z.string(),
  })
  .partial()
  .passthrough();
const pauseProductSku_Body = z
  .object({ reason: z.string().min(1), approvalRef: z.string().optional() })
  .passthrough();
const upsertSkuCapitalConstraint_Body = z
  .object({
    maxVolume: z.number(),
    currency: z.string().min(3).max(3),
    rwaWeightHint: z.number().optional(),
  })
  .passthrough();
const upsertRateCard_Body = z
  .object({
    rate: z.number(),
    approvedMin: z.number(),
    approvedMax: z.number(),
    effectiveFrom: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const SkuStatus = z.enum(['draft', 'published', 'paused', 'retired']);
const ProductFamily = z.enum(['deposit', 'lending', 'payment']);
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
const SkuRole = z.enum(['manufacturer', 'distributor', 'both']);
const AdjudicationMode = z.enum(['bank', 'partner', 'dual']);
const ProductSku = z
  .object({
    id: z.string(),
    name: z.string().min(1).max(200),
    productFamily: z.enum(['deposit', 'lending', 'payment']),
    role: z.enum(['manufacturer', 'distributor', 'both']),
    status: z.enum(['draft', 'published', 'paused', 'retired']),
    adjudicationMode: z.enum(['bank', 'partner', 'dual']).optional(),
    capitalConstraintId: z.string().optional(),
    liquidityCapId: z.string().optional(),
    manufacturingPrice: z.number().optional(),
    priceFloor: z.number().optional(),
    crossSubsidyDeclared: z.boolean().optional(),
    crossSubsidyNote: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ProductSkuListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string(),
          name: z.string().min(1).max(200),
          productFamily: z.enum(['deposit', 'lending', 'payment']),
          role: z.enum(['manufacturer', 'distributor', 'both']),
          status: z.enum(['draft', 'published', 'paused', 'retired']),
          adjudicationMode: z.enum(['bank', 'partner', 'dual']).optional(),
          capitalConstraintId: z.string().optional(),
          liquidityCapId: z.string().optional(),
          manufacturingPrice: z.number().optional(),
          priceFloor: z.number().optional(),
          crossSubsidyDeclared: z.boolean().optional(),
          crossSubsidyNote: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }).optional(),
          updatedAt: z.string().datetime({ offset: true }).optional(),
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
const ProductSkuListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string(),
              name: z.string().min(1).max(200),
              productFamily: z.enum(['deposit', 'lending', 'payment']),
              role: z.enum(['manufacturer', 'distributor', 'both']),
              status: z.enum(['draft', 'published', 'paused', 'retired']),
              adjudicationMode: z.enum(['bank', 'partner', 'dual']).optional(),
              capitalConstraintId: z.string().optional(),
              liquidityCapId: z.string().optional(),
              manufacturingPrice: z.number().optional(),
              priceFloor: z.number().optional(),
              crossSubsidyDeclared: z.boolean().optional(),
              crossSubsidyNote: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }).optional(),
              updatedAt: z.string().datetime({ offset: true }).optional(),
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
const ProductSkuCreate = z
  .object({
    name: z.string().min(1).max(200),
    productFamily: z.enum(['deposit', 'lending', 'payment']),
    role: z.enum(['manufacturer', 'distributor', 'both']),
    adjudicationMode: z.enum(['bank', 'partner', 'dual']).optional(),
    manufacturingPrice: z.number().optional(),
    priceFloor: z.number().optional(),
    crossSubsidyDeclared: z.boolean().optional(),
    crossSubsidyNote: z.string().optional(),
  })
  .passthrough();
const ProductSkuResponse = z
  .object({
    data: z
      .object({
        id: z.string(),
        name: z.string().min(1).max(200),
        productFamily: z.enum(['deposit', 'lending', 'payment']),
        role: z.enum(['manufacturer', 'distributor', 'both']),
        status: z.enum(['draft', 'published', 'paused', 'retired']),
        adjudicationMode: z.enum(['bank', 'partner', 'dual']).optional(),
        capitalConstraintId: z.string().optional(),
        liquidityCapId: z.string().optional(),
        manufacturingPrice: z.number().optional(),
        priceFloor: z.number().optional(),
        crossSubsidyDeclared: z.boolean().optional(),
        crossSubsidyNote: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }).optional(),
        updatedAt: z.string().datetime({ offset: true }).optional(),
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
const ProductSkuUpdate = z
  .object({
    name: z.string().min(1).max(200),
    adjudicationMode: z.enum(['bank', 'partner', 'dual']),
    manufacturingPrice: z.number(),
    priceFloor: z.number(),
    crossSubsidyDeclared: z.boolean(),
    crossSubsidyNote: z.string(),
  })
  .partial()
  .passthrough();
const PauseResumeRequest = z
  .object({ reason: z.string().min(1), approvalRef: z.string().optional() })
  .passthrough();
const CapitalConstraint = z
  .object({
    id: z.string(),
    skuId: z.string(),
    maxVolume: z.number(),
    currency: z.string().min(3).max(3),
    rwaWeightHint: z.number().optional(),
  })
  .passthrough();
const CapitalConstraintResponse = z
  .object({
    data: z
      .object({
        id: z.string(),
        skuId: z.string(),
        maxVolume: z.number(),
        currency: z.string().min(3).max(3),
        rwaWeightHint: z.number().optional(),
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
const CapitalConstraintUpsert = z
  .object({
    maxVolume: z.number(),
    currency: z.string().min(3).max(3),
    rwaWeightHint: z.number().optional(),
  })
  .passthrough();
const RateCard = z
  .object({
    id: z.string(),
    skuId: z.string(),
    rate: z.number(),
    approvedMin: z.number(),
    approvedMax: z.number(),
    effectiveFrom: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const RateCardListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string(),
          skuId: z.string(),
          rate: z.number(),
          approvedMin: z.number(),
          approvedMax: z.number(),
          effectiveFrom: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const RateCardListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string(),
              skuId: z.string(),
              rate: z.number(),
              approvedMin: z.number(),
              approvedMax: z.number(),
              effectiveFrom: z.string().datetime({ offset: true }).optional(),
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
const RateCardUpsert = z
  .object({
    rate: z.number(),
    approvedMin: z.number(),
    approvedMax: z.number(),
    effectiveFrom: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const RateCardResponse = z
  .object({
    data: z
      .object({
        id: z.string(),
        skuId: z.string(),
        rate: z.number(),
        approvedMin: z.number(),
        approvedMax: z.number(),
        effectiveFrom: z.string().datetime({ offset: true }).optional(),
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
  createProductSku_Body,
  updateProductSku_Body,
  pauseProductSku_Body,
  upsertSkuCapitalConstraint_Body,
  upsertRateCard_Body,
  SkuStatus,
  ProductFamily,
  Problem,
  SkuRole,
  AdjudicationMode,
  ProductSku,
  ProductSkuListData,
  ResponseMeta,
  ProductSkuListResponse,
  ProductSkuCreate,
  ProductSkuResponse,
  ProductSkuUpdate,
  PauseResumeRequest,
  CapitalConstraint,
  CapitalConstraintResponse,
  CapitalConstraintUpsert,
  RateCard,
  RateCardListData,
  RateCardListResponse,
  RateCardUpsert,
  RateCardResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/skus',
    alias: 'listProductSkus',
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
        schema: z.enum(['draft', 'published', 'paused', 'retired']).optional(),
      },
      {
        name: 'productFamily',
        type: 'Query',
        schema: z.enum(['deposit', 'lending', 'payment']).optional(),
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
                  name: z.string().min(1).max(200),
                  productFamily: z.enum(['deposit', 'lending', 'payment']),
                  role: z.enum(['manufacturer', 'distributor', 'both']),
                  status: z.enum(['draft', 'published', 'paused', 'retired']),
                  adjudicationMode: z
                    .enum(['bank', 'partner', 'dual'])
                    .optional(),
                  capitalConstraintId: z.string().optional(),
                  liquidityCapId: z.string().optional(),
                  manufacturingPrice: z.number().optional(),
                  priceFloor: z.number().optional(),
                  crossSubsidyDeclared: z.boolean().optional(),
                  crossSubsidyNote: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }).optional(),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/skus',
    alias: 'createProductSku',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createProductSku_Body,
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
            name: z.string().min(1).max(200),
            productFamily: z.enum(['deposit', 'lending', 'payment']),
            role: z.enum(['manufacturer', 'distributor', 'both']),
            status: z.enum(['draft', 'published', 'paused', 'retired']),
            adjudicationMode: z.enum(['bank', 'partner', 'dual']).optional(),
            capitalConstraintId: z.string().optional(),
            liquidityCapId: z.string().optional(),
            manufacturingPrice: z.number().optional(),
            priceFloor: z.number().optional(),
            crossSubsidyDeclared: z.boolean().optional(),
            crossSubsidyNote: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
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
    path: '/v1/skus/:skuId',
    alias: 'getProductSku',
    requestFormat: 'json',
    parameters: [
      {
        name: 'skuId',
        type: 'Path',
        schema: z.string(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string(),
            name: z.string().min(1).max(200),
            productFamily: z.enum(['deposit', 'lending', 'payment']),
            role: z.enum(['manufacturer', 'distributor', 'both']),
            status: z.enum(['draft', 'published', 'paused', 'retired']),
            adjudicationMode: z.enum(['bank', 'partner', 'dual']).optional(),
            capitalConstraintId: z.string().optional(),
            liquidityCapId: z.string().optional(),
            manufacturingPrice: z.number().optional(),
            priceFloor: z.number().optional(),
            crossSubsidyDeclared: z.boolean().optional(),
            crossSubsidyNote: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'patch',
    path: '/v1/skus/:skuId',
    alias: 'updateProductSku',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateProductSku_Body,
      },
      {
        name: 'skuId',
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
            name: z.string().min(1).max(200),
            productFamily: z.enum(['deposit', 'lending', 'payment']),
            role: z.enum(['manufacturer', 'distributor', 'both']),
            status: z.enum(['draft', 'published', 'paused', 'retired']),
            adjudicationMode: z.enum(['bank', 'partner', 'dual']).optional(),
            capitalConstraintId: z.string().optional(),
            liquidityCapId: z.string().optional(),
            manufacturingPrice: z.number().optional(),
            priceFloor: z.number().optional(),
            crossSubsidyDeclared: z.boolean().optional(),
            crossSubsidyNote: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/skus/:skuId/capital-constraint',
    alias: 'getSkuCapitalConstraint',
    requestFormat: 'json',
    parameters: [
      {
        name: 'skuId',
        type: 'Path',
        schema: z.string(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string(),
            skuId: z.string(),
            maxVolume: z.number(),
            currency: z.string().min(3).max(3),
            rwaWeightHint: z.number().optional(),
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
    method: 'put',
    path: '/v1/skus/:skuId/capital-constraint',
    alias: 'upsertSkuCapitalConstraint',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: upsertSkuCapitalConstraint_Body,
      },
      {
        name: 'skuId',
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
            skuId: z.string(),
            maxVolume: z.number(),
            currency: z.string().min(3).max(3),
            rwaWeightHint: z.number().optional(),
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
    path: '/v1/skus/:skuId/pause',
    alias: 'pauseProductSku',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: pauseProductSku_Body,
      },
      {
        name: 'skuId',
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
            name: z.string().min(1).max(200),
            productFamily: z.enum(['deposit', 'lending', 'payment']),
            role: z.enum(['manufacturer', 'distributor', 'both']),
            status: z.enum(['draft', 'published', 'paused', 'retired']),
            adjudicationMode: z.enum(['bank', 'partner', 'dual']).optional(),
            capitalConstraintId: z.string().optional(),
            liquidityCapId: z.string().optional(),
            manufacturingPrice: z.number().optional(),
            priceFloor: z.number().optional(),
            crossSubsidyDeclared: z.boolean().optional(),
            crossSubsidyNote: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/skus/:skuId/publish',
    alias: 'publishProductSku',
    requestFormat: 'json',
    parameters: [
      {
        name: 'skuId',
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
            name: z.string().min(1).max(200),
            productFamily: z.enum(['deposit', 'lending', 'payment']),
            role: z.enum(['manufacturer', 'distributor', 'both']),
            status: z.enum(['draft', 'published', 'paused', 'retired']),
            adjudicationMode: z.enum(['bank', 'partner', 'dual']).optional(),
            capitalConstraintId: z.string().optional(),
            liquidityCapId: z.string().optional(),
            manufacturingPrice: z.number().optional(),
            priceFloor: z.number().optional(),
            crossSubsidyDeclared: z.boolean().optional(),
            crossSubsidyNote: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/skus/:skuId/rate-cards',
    alias: 'listSkuRateCards',
    requestFormat: 'json',
    parameters: [
      {
        name: 'skuId',
        type: 'Path',
        schema: z.string(),
      },
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
                  skuId: z.string(),
                  rate: z.number(),
                  approvedMin: z.number(),
                  approvedMax: z.number(),
                  effectiveFrom: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
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
    path: '/v1/skus/:skuId/rate-cards',
    alias: 'upsertRateCard',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: upsertRateCard_Body,
      },
      {
        name: 'skuId',
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
            skuId: z.string(),
            rate: z.number(),
            approvedMin: z.number(),
            approvedMax: z.number(),
            effectiveFrom: z.string().datetime({ offset: true }).optional(),
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
    method: 'post',
    path: '/v1/skus/:skuId/resume',
    alias: 'resumeProductSku',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: pauseProductSku_Body,
      },
      {
        name: 'skuId',
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
            name: z.string().min(1).max(200),
            productFamily: z.enum(['deposit', 'lending', 'payment']),
            role: z.enum(['manufacturer', 'distributor', 'both']),
            status: z.enum(['draft', 'published', 'paused', 'retired']),
            adjudicationMode: z.enum(['bank', 'partner', 'dual']).optional(),
            capitalConstraintId: z.string().optional(),
            liquidityCapId: z.string().optional(),
            manufacturingPrice: z.number().optional(),
            priceFloor: z.number().optional(),
            crossSubsidyDeclared: z.boolean().optional(),
            crossSubsidyNote: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'post',
    path: '/v1/skus/:skuId/retire',
    alias: 'retireProductSku',
    requestFormat: 'json',
    parameters: [
      {
        name: 'skuId',
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
            name: z.string().min(1).max(200),
            productFamily: z.enum(['deposit', 'lending', 'payment']),
            role: z.enum(['manufacturer', 'distributor', 'both']),
            status: z.enum(['draft', 'published', 'paused', 'retired']),
            adjudicationMode: z.enum(['bank', 'partner', 'dual']).optional(),
            capitalConstraintId: z.string().optional(),
            liquidityCapId: z.string().optional(),
            manufacturingPrice: z.number().optional(),
            priceFloor: z.number().optional(),
            crossSubsidyDeclared: z.boolean().optional(),
            crossSubsidyNote: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
