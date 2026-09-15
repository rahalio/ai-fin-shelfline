/**
 * Integration event type definition (handwritten stub for generated registry).
 * Codegen writes `generated/registry.ts` against this shape.
 */

export interface IntegrationEventTypeDefinition {
  type: string;
  domain: string;
  aggregateType?: string;
  description?: string;
  defaultDeliveryMode?: 'sync' | 'async';
}
