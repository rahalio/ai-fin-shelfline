#!/usr/bin/env node
/**
 * Write Shelfline product domain OpenAPI YAML pairs (one entry + schemas per domain).
 * Run from repo root: node scripts/write-shelfline-openapi.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, 'packages/openapi-core/src');
mkdirSync(src, { recursive: true });

const hdr = (title, prefix, desc) => `openapi: 3.1.0
info:
  title: ${title}
  version: 0.1.0
  description: |
    ${desc}
  license:
    name: Proprietary
    url: https://shelfline.local/license
  x-domain: ${prefix}
servers:
  - url: https://api.shelfline.local
    description: Local / Shelfline API
security:
  - apiKey: []
  - bearerAuth: []
`;

const componentsSecurity = `
components:
  securitySchemes:
    apiKey:
      $ref: ./common/security.yaml#/components/securitySchemes/apiKey
    bearerAuth:
      $ref: ./common/security.yaml#/components/securitySchemes/bearerAuth
`;

function errResponses(extra = []) {
  const base = [
    ['401', 'Unauthorized'],
    ['default', 'Problem'],
  ];
  return [...extra, ...base]
    .map(
      ([code, name]) =>
        `        '${code}':\n          $ref: ./common/responses.yaml#/components/responses/${name}`
    )
    .join('\n');
}

function envelopeSchemas(names) {
  return names
    .map(
      (n) => `
    ${n}Response:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/${n}'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta

    ${n}ListData:
      type: object
      required: [items]
      properties:
        items:
          type: array
          items:
            $ref: '#/components/schemas/${n}'
        nextCursor:
          type: string

    ${n}ListResponse:
      type: object
      required: [data]
      properties:
        data:
          $ref: '#/components/schemas/${n}ListData'
        meta:
          $ref: ./common/envelopes.yaml#/components/schemas/ResponseMeta
`
    )
    .join('\n');
}

function ddb(entityType, pk, sk = 'METADATA') {
  return `      x-repository: ${entityType}
      x-dynamodb:
        entityType: "${entityType}"
        pkPatternTemplate: "${pk}"
        skPatternTemplate: "${sk}"
        pkPattern: template`;
}

function write(name, content) {
  writeFileSync(resolve(src, name), content);
  console.log('wrote', name);
}

const schemasHdr = (title) => `openapi: 3.1.0
info:
  title: ${title}
  version: 0.1.0
paths: {}
components:
  schemas:
`;

// ========== SKUS ==========
write(
  'skus.schemas.yaml',
  schemasHdr('Skus schemas') +
    `    ProductFamily:
      type: string
      enum: [deposit, lending, payment]
    SkuRole:
      type: string
      enum: [manufacturer, distributor, both]
    SkuStatus:
      type: string
      enum: [draft, published, paused, retired]
    AdjudicationMode:
      type: string
      enum: [bank, partner, dual]

    ProductSku:
      type: object
      required: [id, name, productFamily, role, status]
      properties:
        id: { type: string }
        name: { type: string, minLength: 1, maxLength: 200 }
        productFamily: { $ref: '#/components/schemas/ProductFamily' }
        role: { $ref: '#/components/schemas/SkuRole' }
        status: { $ref: '#/components/schemas/SkuStatus' }
        adjudicationMode: { $ref: '#/components/schemas/AdjudicationMode' }
        capitalConstraintId: { type: string }
        liquidityCapId: { type: string }
        manufacturingPrice: { type: number, format: double }
        priceFloor: { type: number, format: double }
        crossSubsidyDeclared: { type: boolean }
        crossSubsidyNote: { type: string }
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }

    ProductSkuCreate:
      type: object
      required: [name, productFamily, role]
      properties:
        name: { type: string, minLength: 1, maxLength: 200 }
        productFamily: { $ref: '#/components/schemas/ProductFamily' }
        role: { $ref: '#/components/schemas/SkuRole' }
        adjudicationMode: { $ref: '#/components/schemas/AdjudicationMode' }
        manufacturingPrice: { type: number, format: double }
        priceFloor: { type: number, format: double }
        crossSubsidyDeclared: { type: boolean }
        crossSubsidyNote: { type: string }

    ProductSkuUpdate:
      type: object
      properties:
        name: { type: string, minLength: 1, maxLength: 200 }
        adjudicationMode: { $ref: '#/components/schemas/AdjudicationMode' }
        manufacturingPrice: { type: number, format: double }
        priceFloor: { type: number, format: double }
        crossSubsidyDeclared: { type: boolean }
        crossSubsidyNote: { type: string }

    CapitalConstraint:
      type: object
      required: [id, skuId, maxVolume, currency]
      properties:
        id: { type: string }
        skuId: { type: string }
        maxVolume: { type: number, format: double }
        currency: { type: string, minLength: 3, maxLength: 3 }
        rwaWeightHint: { type: number, format: float }

    CapitalConstraintUpsert:
      type: object
      required: [maxVolume, currency]
      properties:
        maxVolume: { type: number, format: double }
        currency: { type: string, minLength: 3, maxLength: 3 }
        rwaWeightHint: { type: number, format: float }

    RateCard:
      type: object
      required: [id, skuId, rate, approvedMin, approvedMax]
      properties:
        id: { type: string }
        skuId: { type: string }
        rate: { type: number, format: double }
        approvedMin: { type: number, format: double }
        approvedMax: { type: number, format: double }
        effectiveFrom: { type: string, format: date-time }

    RateCardUpsert:
      type: object
      required: [rate, approvedMin, approvedMax]
      properties:
        rate: { type: number, format: double }
        approvedMin: { type: number, format: double }
        approvedMax: { type: number, format: double }
        effectiveFrom: { type: string, format: date-time }

    PauseResumeRequest:
      type: object
      required: [reason]
      properties:
        reason: { type: string, minLength: 1 }
        approvalRef: { type: string }
` +
    envelopeSchemas(['ProductSku', 'CapitalConstraint', 'RateCard'])
);

write(
  'skus.yaml',
  hdr(
    'Shelfline Skus API',
    'sku',
    'Product SKU publishing, capital constraints, rate cards, and lifecycle (publish/pause/resume/retire).'
  ) +
    `
tags:
  - name: Skus
    description: Product SKU publishing and catalog
paths:
  /v1/skus:
    get:
      operationId: listProductSkus
      tags: [Skus]
      summary: List product SKUs
      x-zero-ui:
        label: { en: SKU catalog }
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: status
          in: query
          schema:
            $ref: ./skus.schemas.yaml#/components/schemas/SkuStatus
        - name: productFamily
          in: query
          schema:
            $ref: ./skus.schemas.yaml#/components/schemas/ProductFamily
      responses:
        '200':
          description: SKUs page
          content:
            application/json:
              schema:
                $ref: ./skus.schemas.yaml#/components/schemas/ProductSkuListResponse
${errResponses()}
    post:
      operationId: createProductSku
      tags: [Skus]
      summary: Create draft SKU
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
${ddb('PRODUCT_SKU', 'SKU#\${skuId}')}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./skus.schemas.yaml#/components/schemas/ProductSkuCreate
      responses:
        '201':
          description: SKU created
          content:
            application/json:
              schema:
                $ref: ./skus.schemas.yaml#/components/schemas/ProductSkuResponse
${errResponses([
  ['400', 'BadRequest'],
  ['409', 'Conflict'],
])}

  /v1/skus/{skuId}:
    parameters:
      - name: skuId
        in: path
        required: true
        schema: { type: string }
    get:
      operationId: getProductSku
      tags: [Skus]
      summary: Get SKU
${ddb('PRODUCT_SKU', 'SKU#\${skuId}')}
      responses:
        '200':
          description: SKU
          content:
            application/json:
              schema:
                $ref: ./skus.schemas.yaml#/components/schemas/ProductSkuResponse
${errResponses([['404', 'NotFound']])}
    patch:
      operationId: updateProductSku
      tags: [Skus]
      summary: Update SKU metadata
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
${ddb('PRODUCT_SKU', 'SKU#\${skuId}')}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./skus.schemas.yaml#/components/schemas/ProductSkuUpdate
      responses:
        '200':
          description: SKU updated
          content:
            application/json:
              schema:
                $ref: ./skus.schemas.yaml#/components/schemas/ProductSkuResponse
${errResponses([
  ['400', 'BadRequest'],
  ['404', 'NotFound'],
  ['422', 'UnprocessableEntity'],
])}

  /v1/skus/{skuId}/publish:
    parameters:
      - name: skuId
        in: path
        required: true
        schema: { type: string }
    post:
      operationId: publishProductSku
      tags: [Skus]
      summary: Publish SKU (requires capital bounds)
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      x-repository: none
      responses:
        '200':
          description: SKU published
          content:
            application/json:
              schema:
                $ref: ./skus.schemas.yaml#/components/schemas/ProductSkuResponse
${errResponses([
  ['404', 'NotFound'],
  ['422', 'UnprocessableEntity'],
])}

  /v1/skus/{skuId}/pause:
    parameters:
      - name: skuId
        in: path
        required: true
        schema: { type: string }
    post:
      operationId: pauseProductSku
      tags: [Skus]
      summary: Pause SKU without deploy
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      x-repository: none
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./skus.schemas.yaml#/components/schemas/PauseResumeRequest
      responses:
        '200':
          description: SKU paused
          content:
            application/json:
              schema:
                $ref: ./skus.schemas.yaml#/components/schemas/ProductSkuResponse
${errResponses([['404', 'NotFound']])}

  /v1/skus/{skuId}/resume:
    parameters:
      - name: skuId
        in: path
        required: true
        schema: { type: string }
    post:
      operationId: resumeProductSku
      tags: [Skus]
      summary: Resume paused SKU
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      x-repository: none
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./skus.schemas.yaml#/components/schemas/PauseResumeRequest
      responses:
        '200':
          description: SKU resumed
          content:
            application/json:
              schema:
                $ref: ./skus.schemas.yaml#/components/schemas/ProductSkuResponse
${errResponses([
  ['404', 'NotFound'],
  ['422', 'UnprocessableEntity'],
])}

  /v1/skus/{skuId}/retire:
    parameters:
      - name: skuId
        in: path
        required: true
        schema: { type: string }
    post:
      operationId: retireProductSku
      tags: [Skus]
      summary: Retire SKU from catalog
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      x-repository: none
      responses:
        '200':
          description: SKU retired
          content:
            application/json:
              schema:
                $ref: ./skus.schemas.yaml#/components/schemas/ProductSkuResponse
${errResponses([['404', 'NotFound']])}

  /v1/skus/{skuId}/capital-constraint:
    parameters:
      - name: skuId
        in: path
        required: true
        schema: { type: string }
    get:
      operationId: getSkuCapitalConstraint
      tags: [Skus]
      summary: Get capital constraint for SKU
${ddb('CAPITAL_CONSTRAINT', 'SKU#\${skuId}', 'CAPITAL')}
      responses:
        '200':
          description: Capital constraint
          content:
            application/json:
              schema:
                $ref: ./skus.schemas.yaml#/components/schemas/CapitalConstraintResponse
${errResponses([['404', 'NotFound']])}
    put:
      operationId: upsertSkuCapitalConstraint
      tags: [Skus]
      summary: Attach or replace capital constraint
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
${ddb('CAPITAL_CONSTRAINT', 'SKU#\${skuId}', 'CAPITAL')}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./skus.schemas.yaml#/components/schemas/CapitalConstraintUpsert
      responses:
        '200':
          description: Capital constraint saved
          content:
            application/json:
              schema:
                $ref: ./skus.schemas.yaml#/components/schemas/CapitalConstraintResponse
${errResponses([
  ['400', 'BadRequest'],
  ['404', 'NotFound'],
])}

  /v1/skus/{skuId}/rate-cards:
    parameters:
      - name: skuId
        in: path
        required: true
        schema: { type: string }
    get:
      operationId: listSkuRateCards
      tags: [Skus]
      summary: List rate cards for SKU
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
      responses:
        '200':
          description: Rate cards
          content:
            application/json:
              schema:
                $ref: ./skus.schemas.yaml#/components/schemas/RateCardListResponse
${errResponses()}
    post:
      operationId: upsertRateCard
      tags: [Skus]
      summary: Upsert rate card within approved bands
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
${ddb('RATE_CARD', 'SKU#\${skuId}', 'RATE#\${rateCardId}')}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./skus.schemas.yaml#/components/schemas/RateCardUpsert
      responses:
        '201':
          description: Rate card saved
          content:
            application/json:
              schema:
                $ref: ./skus.schemas.yaml#/components/schemas/RateCardResponse
${errResponses([
  ['400', 'BadRequest'],
  ['404', 'NotFound'],
  ['422', 'UnprocessableEntity'],
])}
` +
    componentsSecurity
);

// ========== DISTRIBUTORS ==========
write(
  'distributors.schemas.yaml',
  schemasHdr('Distributors schemas') +
    `    ChannelType:
      type: string
      enum: [fintech, bigtech, broker, bankDirect]
    DistributorStatus:
      type: string
      enum: [active, paused, pending, terminated]
    BrandOwner:
      type: string
      enum: [bank, distributor, coBrand]
    ComplaintOwner:
      type: string
      enum: [bank, distributor]
    ContractStatus:
      type: string
      enum: [draft, active, amended, terminated]

    Distributor:
      type: object
      required: [id, legalName, status, channelType]
      properties:
        id: { type: string }
        legalName: { type: string }
        status: { $ref: '#/components/schemas/DistributorStatus' }
        channelType: { $ref: '#/components/schemas/ChannelType' }
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }

    DistributorCreate:
      type: object
      required: [legalName, channelType]
      properties:
        legalName: { type: string, minLength: 1 }
        channelType: { $ref: '#/components/schemas/ChannelType' }

    DistributionContract:
      type: object
      required: [id, distributorId, skuId, revenueSharePct, brandOwner, complaintOwner, status]
      properties:
        id: { type: string }
        distributorId: { type: string }
        skuId: { type: string }
        revenueSharePct: { type: number, format: float }
        manufacturingPrice: { type: number, format: double }
        brandOwner: { $ref: '#/components/schemas/BrandOwner' }
        complaintOwner: { $ref: '#/components/schemas/ComplaintOwner' }
        recommendationBiasLimit: { type: string }
        status: { $ref: '#/components/schemas/ContractStatus' }
        completenessScore: { type: number, format: float }

    DistributionContractUpsert:
      type: object
      required: [skuId, revenueSharePct, brandOwner, complaintOwner]
      properties:
        skuId: { type: string }
        revenueSharePct: { type: number, format: float }
        manufacturingPrice: { type: number, format: double }
        brandOwner: { $ref: '#/components/schemas/BrandOwner' }
        complaintOwner: { $ref: '#/components/schemas/ComplaintOwner' }
        recommendationBiasLimit: { type: string }

    PauseResumeRequest:
      type: object
      required: [reason]
      properties:
        reason: { type: string, minLength: 1 }
        approvalRef: { type: string }
` +
    envelopeSchemas(['Distributor', 'DistributionContract'])
);

write(
  'distributors.yaml',
  hdr(
    'Shelfline Distributors API',
    'dst',
    'Distributor registry, experience-ownership contracts, activate/amend, and pause/resume.'
  ) +
    `
tags:
  - name: Distributors
    description: Distributor registry and contracts
paths:
  /v1/distributors:
    get:
      operationId: listDistributors
      tags: [Distributors]
      summary: List distributors
      security:
        - bearerAuth: []
      x-zero-ui:
        label: { en: Distributor registry }
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: status
          in: query
          schema:
            $ref: ./distributors.schemas.yaml#/components/schemas/DistributorStatus
      responses:
        '200':
          description: Distributors page
          content:
            application/json:
              schema:
                $ref: ./distributors.schemas.yaml#/components/schemas/DistributorListResponse
${errResponses()}
    post:
      operationId: registerDistributor
      tags: [Distributors]
      summary: Register distributor
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
${ddb('DISTRIBUTOR', 'DST#\${distributorId}')}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./distributors.schemas.yaml#/components/schemas/DistributorCreate
      responses:
        '201':
          description: Distributor registered
          content:
            application/json:
              schema:
                $ref: ./distributors.schemas.yaml#/components/schemas/DistributorResponse
${errResponses([
  ['400', 'BadRequest'],
  ['409', 'Conflict'],
])}

  /v1/distributors/{distributorId}:
    parameters:
      - name: distributorId
        in: path
        required: true
        schema: { type: string }
    get:
      operationId: getDistributor
      tags: [Distributors]
      summary: Get distributor
      security:
        - bearerAuth: []
${ddb('DISTRIBUTOR', 'DST#\${distributorId}')}
      responses:
        '200':
          description: Distributor
          content:
            application/json:
              schema:
                $ref: ./distributors.schemas.yaml#/components/schemas/DistributorResponse
${errResponses([['404', 'NotFound']])}

  /v1/distributors/{distributorId}/contracts:
    parameters:
      - name: distributorId
        in: path
        required: true
        schema: { type: string }
    get:
      operationId: listDistributionContracts
      tags: [Distributors]
      summary: List contracts for distributor
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
      responses:
        '200':
          description: Contracts
          content:
            application/json:
              schema:
                $ref: ./distributors.schemas.yaml#/components/schemas/DistributionContractListResponse
${errResponses()}
    post:
      operationId: createDistributionContract
      tags: [Distributors]
      summary: Create distribution contract
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
${ddb('DISTRIBUTION_CONTRACT', 'DST#\${distributorId}', 'CTR#\${contractId}')}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./distributors.schemas.yaml#/components/schemas/DistributionContractUpsert
      responses:
        '201':
          description: Contract created
          content:
            application/json:
              schema:
                $ref: ./distributors.schemas.yaml#/components/schemas/DistributionContractResponse
${errResponses([
  ['400', 'BadRequest'],
  ['404', 'NotFound'],
  ['422', 'UnprocessableEntity'],
])}

  /v1/distributors/{distributorId}/contracts/{contractId}:
    parameters:
      - name: distributorId
        in: path
        required: true
        schema: { type: string }
      - name: contractId
        in: path
        required: true
        schema: { type: string }
    get:
      operationId: getDistributionContract
      tags: [Distributors]
      summary: Get contract
      security:
        - bearerAuth: []
${ddb('DISTRIBUTION_CONTRACT', 'DST#\${distributorId}', 'CTR#\${contractId}')}
      responses:
        '200':
          description: Contract
          content:
            application/json:
              schema:
                $ref: ./distributors.schemas.yaml#/components/schemas/DistributionContractResponse
${errResponses([['404', 'NotFound']])}
    patch:
      operationId: amendDistributionContract
      tags: [Distributors]
      summary: Amend contract fields
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
${ddb('DISTRIBUTION_CONTRACT', 'DST#\${distributorId}', 'CTR#\${contractId}')}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./distributors.schemas.yaml#/components/schemas/DistributionContractUpsert
      responses:
        '200':
          description: Contract amended
          content:
            application/json:
              schema:
                $ref: ./distributors.schemas.yaml#/components/schemas/DistributionContractResponse
${errResponses([
  ['400', 'BadRequest'],
  ['404', 'NotFound'],
])}

  /v1/distributors/{distributorId}/contracts/{contractId}/activate:
    parameters:
      - name: distributorId
        in: path
        required: true
        schema: { type: string }
      - name: contractId
        in: path
        required: true
        schema: { type: string }
    post:
      operationId: activateDistributionContract
      tags: [Distributors]
      summary: Activate contract when ownership fields complete
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      x-repository: none
      responses:
        '200':
          description: Contract activated
          content:
            application/json:
              schema:
                $ref: ./distributors.schemas.yaml#/components/schemas/DistributionContractResponse
${errResponses([
  ['404', 'NotFound'],
  ['422', 'UnprocessableEntity'],
])}

  /v1/distributors/{distributorId}/pause:
    parameters:
      - name: distributorId
        in: path
        required: true
        schema: { type: string }
    post:
      operationId: pauseDistributor
      tags: [Distributors]
      summary: Pause distributor
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      x-repository: none
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./distributors.schemas.yaml#/components/schemas/PauseResumeRequest
      responses:
        '200':
          description: Distributor paused
          content:
            application/json:
              schema:
                $ref: ./distributors.schemas.yaml#/components/schemas/DistributorResponse
${errResponses([['404', 'NotFound']])}

  /v1/distributors/{distributorId}/resume:
    parameters:
      - name: distributorId
        in: path
        required: true
        schema: { type: string }
    post:
      operationId: resumeDistributor
      tags: [Distributors]
      summary: Resume distributor with approval
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      x-repository: none
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./distributors.schemas.yaml#/components/schemas/PauseResumeRequest
      responses:
        '200':
          description: Distributor resumed
          content:
            application/json:
              schema:
                $ref: ./distributors.schemas.yaml#/components/schemas/DistributorResponse
${errResponses([
  ['404', 'NotFound'],
  ['422', 'UnprocessableEntity'],
])}
` +
    componentsSecurity
);

// ========== ORIGINATIONS ==========
write(
  'originations.schemas.yaml',
  schemasHdr('Originations schemas') +
    `    ApplicationStatus:
      type: string
      enum: [submitted, pendingDecision, approved, declined, throttled, booked]
    DecisionOutcome:
      type: string
      enum: [approved, declined, refer]
    DecidedBy:
      type: string
      enum: [bank, partner, dual]

    OriginationApplication:
      type: object
      required: [id, skuId, distributorId, status]
      properties:
        id: { type: string }
        skuId: { type: string }
        distributorId: { type: string }
        amount: { type: number, format: double }
        applicantRef: { type: string }
        status: { $ref: '#/components/schemas/ApplicationStatus' }
        createdAt: { type: string, format: date-time }

    OriginationApplicationCreate:
      type: object
      required: [skuId, distributorId, amount, applicantRef]
      properties:
        skuId: { type: string }
        distributorId: { type: string }
        amount: { type: number, format: double }
        applicantRef: { type: string }

    AdjudicationDecision:
      type: object
      required: [id, applicationId, outcome, decidedBy]
      properties:
        id: { type: string }
        applicationId: { type: string }
        outcome: { $ref: '#/components/schemas/DecisionOutcome' }
        decidedBy: { $ref: '#/components/schemas/DecidedBy' }
        adverseActionCode: { type: string }
        decidedAt: { type: string, format: date-time }

    AdjudicationDecisionCreate:
      type: object
      required: [outcome, decidedBy]
      properties:
        outcome: { $ref: '#/components/schemas/DecisionOutcome' }
        decidedBy: { $ref: '#/components/schemas/DecidedBy' }
        adverseActionCode: { type: string }

    ExposureSignal:
      type: object
      required: [id, applicantRef, totalLeverage]
      properties:
        id: { type: string }
        applicantRef: { type: string }
        totalLeverage: { type: number, format: double }
        source: { type: string }
        blocked: { type: boolean }
        createdAt: { type: string, format: date-time }

    ExposureSignalCreate:
      type: object
      required: [applicantRef, totalLeverage]
      properties:
        applicantRef: { type: string }
        totalLeverage: { type: number, format: double }
        source: { type: string }
` +
    envelopeSchemas(['OriginationApplication', 'AdjudicationDecision', 'ExposureSignal'])
);

write(
  'originations.yaml',
  hdr(
    'Shelfline Originations API',
    'org',
    'Partner-originated applications, adjudication decisions, and multi-platform exposure signals.'
  ) +
    `
tags:
  - name: Originations
    description: Applications and adjudication
paths:
  /v1/originations:
    get:
      operationId: listOriginations
      tags: [Originations]
      summary: List origination applications
      x-zero-ui:
        label: { en: Originations }
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: status
          in: query
          schema:
            $ref: ./originations.schemas.yaml#/components/schemas/ApplicationStatus
        - name: distributorId
          in: query
          schema: { type: string }
      responses:
        '200':
          description: Applications page
          content:
            application/json:
              schema:
                $ref: ./originations.schemas.yaml#/components/schemas/OriginationApplicationListResponse
${errResponses()}
    post:
      operationId: submitOrigination
      tags: [Originations]
      summary: Submit origination application
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
${ddb('ORIGINATION', 'APP#\${applicationId}')}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./originations.schemas.yaml#/components/schemas/OriginationApplicationCreate
      responses:
        '201':
          description: Application submitted
          content:
            application/json:
              schema:
                $ref: ./originations.schemas.yaml#/components/schemas/OriginationApplicationResponse
${errResponses([
  ['400', 'BadRequest'],
  ['409', 'Conflict'],
  ['422', 'UnprocessableEntity'],
])}

  /v1/originations/{applicationId}:
    parameters:
      - name: applicationId
        in: path
        required: true
        schema: { type: string }
    get:
      operationId: getOrigination
      tags: [Originations]
      summary: Get application
${ddb('ORIGINATION', 'APP#\${applicationId}')}
      responses:
        '200':
          description: Application
          content:
            application/json:
              schema:
                $ref: ./originations.schemas.yaml#/components/schemas/OriginationApplicationResponse
${errResponses([['404', 'NotFound']])}

  /v1/originations/{applicationId}/decision:
    parameters:
      - name: applicationId
        in: path
        required: true
        schema: { type: string }
    post:
      operationId: decideOrigination
      tags: [Originations]
      summary: Record adjudication decision
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
${ddb('ADJUDICATION_DECISION', 'APP#\${applicationId}', 'DECISION')}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./originations.schemas.yaml#/components/schemas/AdjudicationDecisionCreate
      responses:
        '201':
          description: Decision recorded
          content:
            application/json:
              schema:
                $ref: ./originations.schemas.yaml#/components/schemas/AdjudicationDecisionResponse
${errResponses([
  ['400', 'BadRequest'],
  ['404', 'NotFound'],
  ['409', 'Conflict'],
  ['422', 'UnprocessableEntity'],
])}

  /v1/exposure-signals:
    post:
      operationId: ingestExposureSignal
      tags: [Originations]
      summary: Ingest multi-platform leverage signal
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
${ddb('EXPOSURE_SIGNAL', 'EXP#\${signalId}')}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./originations.schemas.yaml#/components/schemas/ExposureSignalCreate
      responses:
        '201':
          description: Signal ingested
          content:
            application/json:
              schema:
                $ref: ./originations.schemas.yaml#/components/schemas/ExposureSignalResponse
${errResponses([
  ['400', 'BadRequest'],
  ['409', 'Conflict'],
])}
` +
    componentsSecurity
);

// ========== THROTTLES ==========
write(
  'throttles.schemas.yaml',
  schemasHdr('Throttles schemas') +
    `    ThrottleReason:
      type: string
      enum: [liquidityCap, capitalCap, concentration, fraud]

    LiquidityCap:
      type: object
      required: [id, skuId, maxBalance, tenureBand]
      properties:
        id: { type: string }
        skuId: { type: string }
        maxBalance: { type: number, format: double }
        tenureBand: { type: string }
        warningThresholdPct: { type: number, format: float }
        utilisationPct: { type: number, format: float }

    LiquidityCapUpsert:
      type: object
      required: [skuId, maxBalance, tenureBand]
      properties:
        skuId: { type: string }
        maxBalance: { type: number, format: double }
        tenureBand: { type: string }
        warningThresholdPct: { type: number, format: float }

    ThrottleEvent:
      type: object
      required: [id, skuId, reason, firedAt]
      properties:
        id: { type: string }
        skuId: { type: string }
        distributorId: { type: string }
        reason: { $ref: '#/components/schemas/ThrottleReason' }
        firedAt: { type: string, format: date-time }
        releasedAt: { type: string, format: date-time }

    ForceThrottleRequest:
      type: object
      required: [skuId, reason]
      properties:
        skuId: { type: string }
        distributorId: { type: string }
        reason: { $ref: '#/components/schemas/ThrottleReason' }

    ReleaseThrottleRequest:
      type: object
      required: [throttleEventId]
      properties:
        throttleEventId: { type: string }
        approvalRef: { type: string }
` +
    envelopeSchemas(['LiquidityCap', 'ThrottleEvent'])
);

write(
  'throttles.yaml',
  hdr(
    'Shelfline Throttles API',
    'thr',
    'Treasury and risk liquidity caps, throttle events, force throttle, and release.'
  ) +
    `
tags:
  - name: Throttles
    description: Treasury and risk caps
paths:
  /v1/throttles/caps:
    get:
      operationId: listLiquidityCaps
      tags: [Throttles]
      summary: List liquidity caps
      security:
        - bearerAuth: []
      x-zero-ui:
        label: { en: Treasury caps }
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: skuId
          in: query
          schema: { type: string }
      responses:
        '200':
          description: Caps page
          content:
            application/json:
              schema:
                $ref: ./throttles.schemas.yaml#/components/schemas/LiquidityCapListResponse
${errResponses()}
    put:
      operationId: upsertLiquidityCap
      tags: [Throttles]
      summary: Upsert liquidity cap
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
${ddb('LIQUIDITY_CAP', 'SKU#\${skuId}', 'CAP#\${tenureBand}')}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./throttles.schemas.yaml#/components/schemas/LiquidityCapUpsert
      responses:
        '200':
          description: Cap saved
          content:
            application/json:
              schema:
                $ref: ./throttles.schemas.yaml#/components/schemas/LiquidityCapResponse
${errResponses([
  ['400', 'BadRequest'],
  ['422', 'UnprocessableEntity'],
])}

  /v1/throttles/events:
    get:
      operationId: listThrottleEvents
      tags: [Throttles]
      summary: List throttle events
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: skuId
          in: query
          schema: { type: string }
      responses:
        '200':
          description: Events page
          content:
            application/json:
              schema:
                $ref: ./throttles.schemas.yaml#/components/schemas/ThrottleEventListResponse
${errResponses()}

  /v1/throttles/force:
    post:
      operationId: forceThrottle
      tags: [Throttles]
      summary: Force throttle on SKU or distributor
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      x-repository: none
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./throttles.schemas.yaml#/components/schemas/ForceThrottleRequest
      responses:
        '201':
          description: Throttle fired
          content:
            application/json:
              schema:
                $ref: ./throttles.schemas.yaml#/components/schemas/ThrottleEventResponse
${errResponses([
  ['400', 'BadRequest'],
  ['422', 'UnprocessableEntity'],
])}

  /v1/throttles/release:
    post:
      operationId: releaseThrottle
      tags: [Throttles]
      summary: Release an active throttle
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      x-repository: none
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./throttles.schemas.yaml#/components/schemas/ReleaseThrottleRequest
      responses:
        '200':
          description: Throttle released
          content:
            application/json:
              schema:
                $ref: ./throttles.schemas.yaml#/components/schemas/ThrottleEventResponse
${errResponses([
  ['404', 'NotFound'],
  ['422', 'UnprocessableEntity'],
])}
` +
    componentsSecurity
);

// ========== TELEMETRY ==========
write(
  'telemetry.schemas.yaml',
  schemasHdr('Telemetry schemas') +
    `    MarginSnapshot:
      type: object
      required: [id, distributorId, skuId, period, contributionMargin]
      properties:
        id: { type: string }
        distributorId: { type: string }
        skuId: { type: string }
        period: { type: string }
        contributionMargin: { type: number, format: double }
        nimImpactBps: { type: number, format: float }
        killScaleHint:
          type: string
          enum: [kill, scale, hold]

    CacReport:
      type: object
      required: [id, distributorId, period, cac]
      properties:
        id: { type: string }
        distributorId: { type: string }
        segment: { type: string }
        period: { type: string }
        cac: { type: number, format: double }
        volume: { type: integer }
` +
    envelopeSchemas(['MarginSnapshot', 'CacReport'])
);

write(
  'telemetry.yaml',
  hdr(
    'Shelfline Telemetry API',
    'tel',
    'Margin and CAC scorecards by distributor/SKU/period for kill-or-scale decisions.'
  ) +
    `
tags:
  - name: Telemetry
    description: Margin and CAC scorecards
paths:
  /v1/telemetry/margin:
    get:
      operationId: listMarginSnapshots
      tags: [Telemetry]
      summary: List margin snapshots
      security:
        - bearerAuth: []
      x-zero-ui:
        label: { en: Margin telemetry }
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: distributorId
          in: query
          schema: { type: string }
        - name: skuId
          in: query
          schema: { type: string }
        - name: period
          in: query
          schema: { type: string }
      responses:
        '200':
          description: Margin snapshots
          content:
            application/json:
              schema:
                $ref: ./telemetry.schemas.yaml#/components/schemas/MarginSnapshotListResponse
${errResponses()}

  /v1/telemetry/cac:
    get:
      operationId: listCacReports
      tags: [Telemetry]
      summary: List CAC reports
      security:
        - bearerAuth: []
      x-zero-ui:
        label: { en: CAC telemetry }
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: distributorId
          in: query
          schema: { type: string }
        - name: period
          in: query
          schema: { type: string }
        - name: segment
          in: query
          schema: { type: string }
      responses:
        '200':
          description: CAC reports
          content:
            application/json:
              schema:
                $ref: ./telemetry.schemas.yaml#/components/schemas/CacReportListResponse
${errResponses()}
` +
    componentsSecurity
);

// ========== COMPLAINTS ==========
write(
  'complaints.schemas.yaml',
  schemasHdr('Complaints schemas') +
    `    AccountableParty:
      type: string
      enum: [bank, distributor]
    ComplaintStatus:
      type: string
      enum: [open, investigating, resolved]

    ComplaintCase:
      type: object
      required: [id, distributorId, accountableParty, status]
      properties:
        id: { type: string }
        distributorId: { type: string }
        applicationId: { type: string }
        accountableParty: { $ref: '#/components/schemas/AccountableParty' }
        status: { $ref: '#/components/schemas/ComplaintStatus' }
        narrative: { type: string }
        assignee: { type: string }
        openedAt: { type: string, format: date-time }
        closedAt: { type: string, format: date-time }

    ComplaintCaseCreate:
      type: object
      required: [distributorId, narrative]
      properties:
        distributorId: { type: string }
        applicationId: { type: string }
        narrative: { type: string, minLength: 1 }

    ComplaintAssignRequest:
      type: object
      required: [assignee]
      properties:
        assignee: { type: string, minLength: 1 }

    ComplaintCloseRequest:
      type: object
      required: [resolutionNote]
      properties:
        resolutionNote: { type: string, minLength: 1 }
` +
    envelopeSchemas(['ComplaintCase'])
);

write(
  'complaints.yaml',
  hdr(
    'Shelfline Complaints API',
    'cmp',
    'Complaint ownership and redress — open, list, assign, close with contract-derived accountability.'
  ) +
    `
tags:
  - name: Complaints
    description: Complaint ownership and redress
paths:
  /v1/complaints:
    get:
      operationId: listComplaints
      tags: [Complaints]
      summary: List complaint cases
      security:
        - bearerAuth: []
      x-zero-ui:
        label: { en: Complaints desk }
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: status
          in: query
          schema:
            $ref: ./complaints.schemas.yaml#/components/schemas/ComplaintStatus
        - name: distributorId
          in: query
          schema: { type: string }
      responses:
        '200':
          description: Cases page
          content:
            application/json:
              schema:
                $ref: ./complaints.schemas.yaml#/components/schemas/ComplaintCaseListResponse
${errResponses()}
    post:
      operationId: openComplaint
      tags: [Complaints]
      summary: Open complaint case
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
${ddb('COMPLAINT_CASE', 'CMP#\${complaintId}')}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./complaints.schemas.yaml#/components/schemas/ComplaintCaseCreate
      responses:
        '201':
          description: Case opened
          content:
            application/json:
              schema:
                $ref: ./complaints.schemas.yaml#/components/schemas/ComplaintCaseResponse
${errResponses([
  ['400', 'BadRequest'],
  ['422', 'UnprocessableEntity'],
])}

  /v1/complaints/{complaintId}:
    parameters:
      - name: complaintId
        in: path
        required: true
        schema: { type: string }
    get:
      operationId: getComplaint
      tags: [Complaints]
      summary: Get complaint case
      security:
        - bearerAuth: []
${ddb('COMPLAINT_CASE', 'CMP#\${complaintId}')}
      responses:
        '200':
          description: Case
          content:
            application/json:
              schema:
                $ref: ./complaints.schemas.yaml#/components/schemas/ComplaintCaseResponse
${errResponses([['404', 'NotFound']])}

  /v1/complaints/{complaintId}/assign:
    parameters:
      - name: complaintId
        in: path
        required: true
        schema: { type: string }
    post:
      operationId: assignComplaint
      tags: [Complaints]
      summary: Assign complaint investigator
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      x-repository: none
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./complaints.schemas.yaml#/components/schemas/ComplaintAssignRequest
      responses:
        '200':
          description: Case assigned
          content:
            application/json:
              schema:
                $ref: ./complaints.schemas.yaml#/components/schemas/ComplaintCaseResponse
${errResponses([['404', 'NotFound']])}

  /v1/complaints/{complaintId}/close:
    parameters:
      - name: complaintId
        in: path
        required: true
        schema: { type: string }
    post:
      operationId: closeComplaint
      tags: [Complaints]
      summary: Close complaint with resolution note
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      x-repository: none
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./complaints.schemas.yaml#/components/schemas/ComplaintCloseRequest
      responses:
        '200':
          description: Case closed
          content:
            application/json:
              schema:
                $ref: ./complaints.schemas.yaml#/components/schemas/ComplaintCaseResponse
${errResponses([
  ['404', 'NotFound'],
  ['422', 'UnprocessableEntity'],
])}
` +
    componentsSecurity
);

// ========== BREACHES ==========
write(
  'breaches.schemas.yaml',
  schemasHdr('Breaches schemas') +
    `    BreachType:
      type: string
      enum: [shadowPricing, disclosureFailure, brandMisuse, dataLeakage]
    BreachStatus:
      type: string
      enum: [open, remediated, escalated]

    BreachEvent:
      type: object
      required: [id, distributorId, type, status]
      properties:
        id: { type: string }
        distributorId: { type: string }
        type: { $ref: '#/components/schemas/BreachType' }
        status: { $ref: '#/components/schemas/BreachStatus' }
        detail: { type: string }
        detectedAt: { type: string, format: date-time }
        pauseSuggested: { type: boolean }

    BreachEventCreate:
      type: object
      required: [distributorId, type, detail]
      properties:
        distributorId: { type: string }
        type: { $ref: '#/components/schemas/BreachType' }
        detail: { type: string, minLength: 1 }

    BreachRemediateRequest:
      type: object
      required: [remediationNote]
      properties:
        remediationNote: { type: string, minLength: 1 }

    FairnessAttestation:
      type: object
      required: [id, attestedAt, attestedBy]
      properties:
        id: { type: string }
        attestedAt: { type: string, format: date-time }
        attestedBy: { type: string }
        channelCompareNote: { type: string }
        leakageFindings: { type: integer, minimum: 0 }

    FairnessAttestationCreate:
      type: object
      required: [attestedBy]
      properties:
        attestedBy: { type: string, minLength: 1 }
        channelCompareNote: { type: string }
        leakageFindings: { type: integer, minimum: 0 }
` +
    envelopeSchemas(['BreachEvent', 'FairnessAttestation'])
);

write(
  'breaches.yaml',
  hdr(
    'Shelfline Breaches API',
    'brc',
    'Shadow pricing / disclosure breaches, pause linkage, and parallel-channel fairness attestation (BR-11).'
  ) +
    `
tags:
  - name: Breaches
    description: Conduct breaches and fairness
paths:
  /v1/breaches:
    get:
      operationId: listBreaches
      tags: [Breaches]
      summary: List breach events
      security:
        - bearerAuth: []
      x-zero-ui:
        label: { en: Breach desk }
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
        - name: status
          in: query
          schema:
            $ref: ./breaches.schemas.yaml#/components/schemas/BreachStatus
        - name: distributorId
          in: query
          schema: { type: string }
      responses:
        '200':
          description: Breaches page
          content:
            application/json:
              schema:
                $ref: ./breaches.schemas.yaml#/components/schemas/BreachEventListResponse
${errResponses()}
    post:
      operationId: recordBreach
      tags: [Breaches]
      summary: Record breach event
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
${ddb('BREACH_EVENT', 'BRC#\${breachId}')}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./breaches.schemas.yaml#/components/schemas/BreachEventCreate
      responses:
        '201':
          description: Breach recorded
          content:
            application/json:
              schema:
                $ref: ./breaches.schemas.yaml#/components/schemas/BreachEventResponse
${errResponses([
  ['400', 'BadRequest'],
  ['422', 'UnprocessableEntity'],
])}

  /v1/breaches/{breachId}:
    parameters:
      - name: breachId
        in: path
        required: true
        schema: { type: string }
    get:
      operationId: getBreach
      tags: [Breaches]
      summary: Get breach event
      security:
        - bearerAuth: []
${ddb('BREACH_EVENT', 'BRC#\${breachId}')}
      responses:
        '200':
          description: Breach
          content:
            application/json:
              schema:
                $ref: ./breaches.schemas.yaml#/components/schemas/BreachEventResponse
${errResponses([['404', 'NotFound']])}

  /v1/breaches/{breachId}/remediate:
    parameters:
      - name: breachId
        in: path
        required: true
        schema: { type: string }
    post:
      operationId: remediateBreach
      tags: [Breaches]
      summary: Mark breach remediated
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
      x-repository: none
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./breaches.schemas.yaml#/components/schemas/BreachRemediateRequest
      responses:
        '200':
          description: Breach remediated
          content:
            application/json:
              schema:
                $ref: ./breaches.schemas.yaml#/components/schemas/BreachEventResponse
${errResponses([['404', 'NotFound']])}

  /v1/fairness/attestations:
    get:
      operationId: listFairnessAttestations
      tags: [Breaches]
      summary: List parallel-channel fairness attestations
      security:
        - bearerAuth: []
      x-zero-ui:
        label: { en: Channel fairness }
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/Cursor
        - $ref: ./common/parameters.yaml#/components/parameters/Limit
      responses:
        '200':
          description: Attestations
          content:
            application/json:
              schema:
                $ref: ./breaches.schemas.yaml#/components/schemas/FairnessAttestationListResponse
${errResponses()}
    post:
      operationId: createFairnessAttestation
      tags: [Breaches]
      summary: Record fairness attestation
      security:
        - bearerAuth: []
      parameters:
        - $ref: ./common/parameters.yaml#/components/parameters/IdempotencyKey
${ddb('FAIRNESS_ATTESTATION', 'FAIR#\${attestationId}')}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: ./breaches.schemas.yaml#/components/schemas/FairnessAttestationCreate
      responses:
        '201':
          description: Attestation recorded
          content:
            application/json:
              schema:
                $ref: ./breaches.schemas.yaml#/components/schemas/FairnessAttestationResponse
${errResponses([['400', 'BadRequest']])}
` +
    componentsSecurity
);

console.log('All Shelfline domain OpenAPI files written.');
