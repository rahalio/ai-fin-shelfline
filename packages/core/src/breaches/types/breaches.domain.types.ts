/**
 * Breaches Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/breaches.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type BreachEvent = components["schemas"]["BreachEvent"];
export type BreachEventCreate = components["schemas"]["BreachEventCreate"];
export type BreachEventListData = components["schemas"]["BreachEventListData"];
export type BreachStatus = components["schemas"]["BreachStatus"];
export type BreachType = components["schemas"]["BreachType"];
export type FairnessAttestation = components["schemas"]["FairnessAttestation"];
export type FairnessAttestationCreate = components["schemas"]["FairnessAttestationCreate"];
export type FairnessAttestationListData = components["schemas"]["FairnessAttestationListData"];
export type BreachRemediateRequest = components["schemas"]["BreachRemediateRequest"];
export type Breach = operations["listBreaches"]["responses"]["200"]["content"]["application/json"]["data"];
export type Attestation = operations["listFairnessAttestations"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RecordBreachRequestInput = NonNullable<operations["recordBreach"]["requestBody"]>["content"]["application/json"];
export type RemediateBreachRequestInput = NonNullable<operations["remediateBreach"]["requestBody"]>["content"]["application/json"];
export type CreateFairnessAttestationRequestInput = NonNullable<operations["createFairnessAttestation"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListBreachesParams = NonNullable<operations["listBreaches"]["parameters"]["query"]>;
export type GetBreachParams = operations["getBreach"]["parameters"]["path"];
export type RemediateBreachParams = operations["remediateBreach"]["parameters"]["path"];
export type ListFairnessAttestationsParams = NonNullable<operations["listFairnessAttestations"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListBreachesResponse = operations["listBreaches"]["responses"]["200"]["content"]["application/json"];
export type RecordBreachResponse = operations["recordBreach"]["responses"]["201"]["content"]["application/json"];
export type GetBreachResponse = operations["getBreach"]["responses"]["200"]["content"]["application/json"];
export type RemediateBreachResponse = operations["remediateBreach"]["responses"]["200"]["content"]["application/json"];
export type ListFairnessAttestationsResponse = operations["listFairnessAttestations"]["responses"]["200"]["content"]["application/json"];
export type CreateFairnessAttestationResponse = operations["createFairnessAttestation"]["responses"]["201"]["content"]["application/json"];


