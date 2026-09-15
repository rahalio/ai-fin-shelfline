/**
 * Skus Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/skus.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AdjudicationMode = components["schemas"]["AdjudicationMode"];
export type CapitalConstraint = components["schemas"]["CapitalConstraint"];
export type CapitalConstraintUpsert = components["schemas"]["CapitalConstraintUpsert"];
export type ProductFamily = components["schemas"]["ProductFamily"];
export type ProductSku = components["schemas"]["ProductSku"];
export type ProductSkuCreate = components["schemas"]["ProductSkuCreate"];
export type ProductSkuListData = components["schemas"]["ProductSkuListData"];
export type ProductSkuUpdate = components["schemas"]["ProductSkuUpdate"];
export type RateCard = components["schemas"]["RateCard"];
export type RateCardListData = components["schemas"]["RateCardListData"];
export type RateCardUpsert = components["schemas"]["RateCardUpsert"];
export type SkuRole = components["schemas"]["SkuRole"];
export type SkuStatus = components["schemas"]["SkuStatus"];
export type PauseResumeRequest = components["schemas"]["PauseResumeRequest"];
export type Sku = operations["listProductSkus"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateProductSkuRequestInput = NonNullable<operations["createProductSku"]["requestBody"]>["content"]["application/json"];
export type UpdateProductSkuRequestInput = NonNullable<operations["updateProductSku"]["requestBody"]>["content"]["application/json"];
export type UpdateProductSkuRequest = UpdateProductSkuRequestInput;
export type PauseProductSkuRequestInput = NonNullable<operations["pauseProductSku"]["requestBody"]>["content"]["application/json"];
export type ResumeProductSkuRequestInput = NonNullable<operations["resumeProductSku"]["requestBody"]>["content"]["application/json"];
export type UpsertSkuCapitalConstraintRequestInput = NonNullable<operations["upsertSkuCapitalConstraint"]["requestBody"]>["content"]["application/json"];
export type UpsertRateCardRequestInput = NonNullable<operations["upsertRateCard"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListProductSkusParams = NonNullable<operations["listProductSkus"]["parameters"]["query"]>;
export type GetProductSkuParams = operations["getProductSku"]["parameters"]["path"];
export type UpdateProductSkuParams = operations["updateProductSku"]["parameters"]["path"];
export type PublishProductSkuParams = operations["publishProductSku"]["parameters"]["path"];
export type PauseProductSkuParams = operations["pauseProductSku"]["parameters"]["path"];
export type ResumeProductSkuParams = operations["resumeProductSku"]["parameters"]["path"];
export type RetireProductSkuParams = operations["retireProductSku"]["parameters"]["path"];
export type GetSkuCapitalConstraintParams = operations["getSkuCapitalConstraint"]["parameters"]["path"];
export type UpsertSkuCapitalConstraintParams = operations["upsertSkuCapitalConstraint"]["parameters"]["path"];
export type ListSkuRateCardsParams = NonNullable<operations["listSkuRateCards"]["parameters"]["query"]>;
export type UpsertRateCardParams = operations["upsertRateCard"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListProductSkusResponse = operations["listProductSkus"]["responses"]["200"]["content"]["application/json"];
export type CreateProductSkuResponse = operations["createProductSku"]["responses"]["201"]["content"]["application/json"];
export type GetProductSkuResponse = operations["getProductSku"]["responses"]["200"]["content"]["application/json"];
export type UpdateProductSkuResponse = operations["updateProductSku"]["responses"]["200"]["content"]["application/json"];
export type PublishProductSkuResponse = operations["publishProductSku"]["responses"]["200"]["content"]["application/json"];
export type PauseProductSkuResponse = operations["pauseProductSku"]["responses"]["200"]["content"]["application/json"];
export type ResumeProductSkuResponse = operations["resumeProductSku"]["responses"]["200"]["content"]["application/json"];
export type RetireProductSkuResponse = operations["retireProductSku"]["responses"]["200"]["content"]["application/json"];
export type GetSkuCapitalConstraintResponse = operations["getSkuCapitalConstraint"]["responses"]["200"]["content"]["application/json"];
export type UpsertSkuCapitalConstraintResponse = operations["upsertSkuCapitalConstraint"]["responses"]["200"]["content"]["application/json"];
export type ListSkuRateCardsResponse = operations["listSkuRateCards"]["responses"]["200"]["content"]["application/json"];
export type UpsertRateCardResponse = operations["upsertRateCard"]["responses"]["201"]["content"]["application/json"];


