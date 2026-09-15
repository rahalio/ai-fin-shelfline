/**
 * Complaints Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/complaints.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AccountableParty = components["schemas"]["AccountableParty"];
export type ComplaintCase = components["schemas"]["ComplaintCase"];
export type ComplaintCaseCreate = components["schemas"]["ComplaintCaseCreate"];
export type ComplaintCaseListData = components["schemas"]["ComplaintCaseListData"];
export type ComplaintStatus = components["schemas"]["ComplaintStatus"];
export type ComplaintAssignRequest = components["schemas"]["ComplaintAssignRequest"];
export type ComplaintCloseRequest = components["schemas"]["ComplaintCloseRequest"];
export type Complaint = operations["listComplaints"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type OpenComplaintRequestInput = NonNullable<operations["openComplaint"]["requestBody"]>["content"]["application/json"];
export type AssignComplaintRequestInput = NonNullable<operations["assignComplaint"]["requestBody"]>["content"]["application/json"];
export type CloseComplaintRequestInput = NonNullable<operations["closeComplaint"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListComplaintsParams = NonNullable<operations["listComplaints"]["parameters"]["query"]>;
export type GetComplaintParams = operations["getComplaint"]["parameters"]["path"];
export type AssignComplaintParams = operations["assignComplaint"]["parameters"]["path"];
export type CloseComplaintParams = operations["closeComplaint"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListComplaintsResponse = operations["listComplaints"]["responses"]["200"]["content"]["application/json"];
export type OpenComplaintResponse = operations["openComplaint"]["responses"]["201"]["content"]["application/json"];
export type GetComplaintResponse = operations["getComplaint"]["responses"]["200"]["content"]["application/json"];
export type AssignComplaintResponse = operations["assignComplaint"]["responses"]["200"]["content"]["application/json"];
export type CloseComplaintResponse = operations["closeComplaint"]["responses"]["200"]["content"]["application/json"];


