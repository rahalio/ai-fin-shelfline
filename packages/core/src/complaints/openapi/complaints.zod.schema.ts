import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const openComplaint_Body = z
  .object({
    distributorId: z.string(),
    applicationId: z.string().optional(),
    narrative: z.string().min(1),
  })
  .passthrough();
const ComplaintStatus = z.enum(['open', 'investigating', 'resolved']);
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
const AccountableParty = z.enum(['bank', 'distributor']);
const ComplaintCase = z
  .object({
    id: z.string(),
    distributorId: z.string(),
    applicationId: z.string().optional(),
    accountableParty: z.enum(['bank', 'distributor']),
    status: z.enum(['open', 'investigating', 'resolved']),
    narrative: z.string().optional(),
    assignee: z.string().optional(),
    openedAt: z.string().datetime({ offset: true }).optional(),
    closedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ComplaintCaseListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string(),
          distributorId: z.string(),
          applicationId: z.string().optional(),
          accountableParty: z.enum(['bank', 'distributor']),
          status: z.enum(['open', 'investigating', 'resolved']),
          narrative: z.string().optional(),
          assignee: z.string().optional(),
          openedAt: z.string().datetime({ offset: true }).optional(),
          closedAt: z.string().datetime({ offset: true }).optional(),
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
const ComplaintCaseListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string(),
              distributorId: z.string(),
              applicationId: z.string().optional(),
              accountableParty: z.enum(['bank', 'distributor']),
              status: z.enum(['open', 'investigating', 'resolved']),
              narrative: z.string().optional(),
              assignee: z.string().optional(),
              openedAt: z.string().datetime({ offset: true }).optional(),
              closedAt: z.string().datetime({ offset: true }).optional(),
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
const ComplaintCaseCreate = z
  .object({
    distributorId: z.string(),
    applicationId: z.string().optional(),
    narrative: z.string().min(1),
  })
  .passthrough();
const ComplaintCaseResponse = z
  .object({
    data: z
      .object({
        id: z.string(),
        distributorId: z.string(),
        applicationId: z.string().optional(),
        accountableParty: z.enum(['bank', 'distributor']),
        status: z.enum(['open', 'investigating', 'resolved']),
        narrative: z.string().optional(),
        assignee: z.string().optional(),
        openedAt: z.string().datetime({ offset: true }).optional(),
        closedAt: z.string().datetime({ offset: true }).optional(),
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
const ComplaintAssignRequest = z
  .object({ assignee: z.string().min(1) })
  .passthrough();
const ComplaintCloseRequest = z
  .object({ resolutionNote: z.string().min(1) })
  .passthrough();

export const schemas: any = {
  openComplaint_Body,
  ComplaintStatus,
  Problem,
  AccountableParty,
  ComplaintCase,
  ComplaintCaseListData,
  ResponseMeta,
  ComplaintCaseListResponse,
  ComplaintCaseCreate,
  ComplaintCaseResponse,
  ComplaintAssignRequest,
  ComplaintCloseRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/complaints',
    alias: 'listComplaints',
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
        schema: z.enum(['open', 'investigating', 'resolved']).optional(),
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
                  applicationId: z.string().optional(),
                  accountableParty: z.enum(['bank', 'distributor']),
                  status: z.enum(['open', 'investigating', 'resolved']),
                  narrative: z.string().optional(),
                  assignee: z.string().optional(),
                  openedAt: z.string().datetime({ offset: true }).optional(),
                  closedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/complaints',
    alias: 'openComplaint',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: openComplaint_Body,
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
            applicationId: z.string().optional(),
            accountableParty: z.enum(['bank', 'distributor']),
            status: z.enum(['open', 'investigating', 'resolved']),
            narrative: z.string().optional(),
            assignee: z.string().optional(),
            openedAt: z.string().datetime({ offset: true }).optional(),
            closedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/complaints/:complaintId',
    alias: 'getComplaint',
    requestFormat: 'json',
    parameters: [
      {
        name: 'complaintId',
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
            applicationId: z.string().optional(),
            accountableParty: z.enum(['bank', 'distributor']),
            status: z.enum(['open', 'investigating', 'resolved']),
            narrative: z.string().optional(),
            assignee: z.string().optional(),
            openedAt: z.string().datetime({ offset: true }).optional(),
            closedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/complaints/:complaintId/assign',
    alias: 'assignComplaint',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ assignee: z.string().min(1) }).passthrough(),
      },
      {
        name: 'complaintId',
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
            applicationId: z.string().optional(),
            accountableParty: z.enum(['bank', 'distributor']),
            status: z.enum(['open', 'investigating', 'resolved']),
            narrative: z.string().optional(),
            assignee: z.string().optional(),
            openedAt: z.string().datetime({ offset: true }).optional(),
            closedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/complaints/:complaintId/close',
    alias: 'closeComplaint',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ resolutionNote: z.string().min(1) }).passthrough(),
      },
      {
        name: 'complaintId',
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
            applicationId: z.string().optional(),
            accountableParty: z.enum(['bank', 'distributor']),
            status: z.enum(['open', 'investigating', 'resolved']),
            narrative: z.string().optional(),
            assignee: z.string().optional(),
            openedAt: z.string().datetime({ offset: true }).optional(),
            closedAt: z.string().datetime({ offset: true }).optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
