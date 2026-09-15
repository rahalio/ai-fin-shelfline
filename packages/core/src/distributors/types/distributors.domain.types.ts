/**
 * Distributors Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/distributors.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type BrandOwner = components["schemas"]["BrandOwner"];
export type ChannelType = components["schemas"]["ChannelType"];
export type ComplaintOwner = components["schemas"]["ComplaintOwner"];
export type ContractStatus = components["schemas"]["ContractStatus"];
export type DistributionContract = components["schemas"]["DistributionContract"];
export type DistributionContractListData = components["schemas"]["DistributionContractListData"];
export type DistributionContractUpsert = components["schemas"]["DistributionContractUpsert"];
export type Distributor = components["schemas"]["Distributor"];
export type DistributorCreate = components["schemas"]["DistributorCreate"];
export type DistributorListData = components["schemas"]["DistributorListData"];
export type DistributorStatus = components["schemas"]["DistributorStatus"];
export type PauseResumeRequest = components["schemas"]["PauseResumeRequest"];
export type Contract = operations["listDistributionContracts"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterDistributorRequestInput = NonNullable<operations["registerDistributor"]["requestBody"]>["content"]["application/json"];
export type CreateDistributionContractRequestInput = NonNullable<operations["createDistributionContract"]["requestBody"]>["content"]["application/json"];
export type AmendDistributionContractRequestInput = NonNullable<operations["amendDistributionContract"]["requestBody"]>["content"]["application/json"];
export type PauseDistributorRequestInput = NonNullable<operations["pauseDistributor"]["requestBody"]>["content"]["application/json"];
export type ResumeDistributorRequestInput = NonNullable<operations["resumeDistributor"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListDistributorsParams = NonNullable<operations["listDistributors"]["parameters"]["query"]>;
export type GetDistributorParams = operations["getDistributor"]["parameters"]["path"];
export type ListDistributionContractsParams = NonNullable<operations["listDistributionContracts"]["parameters"]["query"]>;
export type CreateDistributionContractParams = operations["createDistributionContract"]["parameters"]["path"];
export type GetDistributionContractParams = operations["getDistributionContract"]["parameters"]["path"];
export type AmendDistributionContractParams = operations["amendDistributionContract"]["parameters"]["path"];
export type ActivateDistributionContractParams = operations["activateDistributionContract"]["parameters"]["path"];
export type PauseDistributorParams = operations["pauseDistributor"]["parameters"]["path"];
export type ResumeDistributorParams = operations["resumeDistributor"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListDistributorsResponse = operations["listDistributors"]["responses"]["200"]["content"]["application/json"];
export type RegisterDistributorResponse = operations["registerDistributor"]["responses"]["201"]["content"]["application/json"];
export type GetDistributorResponse = operations["getDistributor"]["responses"]["200"]["content"]["application/json"];
export type ListDistributionContractsResponse = operations["listDistributionContracts"]["responses"]["200"]["content"]["application/json"];
export type CreateDistributionContractResponse = operations["createDistributionContract"]["responses"]["201"]["content"]["application/json"];
export type GetDistributionContractResponse = operations["getDistributionContract"]["responses"]["200"]["content"]["application/json"];
export type AmendDistributionContractResponse = operations["amendDistributionContract"]["responses"]["200"]["content"]["application/json"];
export type ActivateDistributionContractResponse = operations["activateDistributionContract"]["responses"]["200"]["content"]["application/json"];
export type PauseDistributorResponse = operations["pauseDistributor"]["responses"]["200"]["content"]["application/json"];
export type ResumeDistributorResponse = operations["resumeDistributor"]["responses"]["200"]["content"]["application/json"];


