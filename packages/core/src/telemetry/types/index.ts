/**
 * Telemetry Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/telemetry.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CacReport = components["schemas"]["CacReport"];
export type CacReportListData = components["schemas"]["CacReportListData"];
export type MarginSnapshot = components["schemas"]["MarginSnapshot"];
export type MarginSnapshotListData = components["schemas"]["MarginSnapshotListData"];
export type Margin = operations["listMarginSnapshots"]["responses"]["200"]["content"]["application/json"]["data"];
export type Cac = operations["listCacReports"]["responses"]["200"]["content"]["application/json"]["data"];



// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListMarginSnapshotsParams = NonNullable<operations["listMarginSnapshots"]["parameters"]["query"]>;
export type ListCacReportsParams = NonNullable<operations["listCacReports"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListMarginSnapshotsResponse = operations["listMarginSnapshots"]["responses"]["200"]["content"]["application/json"];
export type ListCacReportsResponse = operations["listCacReports"]["responses"]["200"]["content"]["application/json"];


