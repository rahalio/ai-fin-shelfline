/**
 * CapitalConstraintRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { CapitalConstraintRepository } from "@shelfline/services/skus";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class CapitalConstraintRepositoryDdb implements CapitalConstraintRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async getSkuCapitalConstraint(input: Parameters<CapitalConstraintRepository["getSkuCapitalConstraint"]>[0]): Promise<Awaited<ReturnType<CapitalConstraintRepository["getSkuCapitalConstraint"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.capital-constraintId ?? raw.id ?? raw.skuId ?? raw.distributorId ?? raw.applicationId ?? raw.complaintId ?? raw.breachId ?? "");
    return sandboxGet("skus:capital-constraint", id) as any;
  }

  async upsertSkuCapitalConstraint(input: Parameters<CapitalConstraintRepository["upsertSkuCapitalConstraint"]>[0]): Promise<Awaited<ReturnType<CapitalConstraintRepository["upsertSkuCapitalConstraint"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.capital-constraintId ?? raw.id ?? raw.skuId ?? "");
    return sandboxUpsert("skus:capital-constraint", id || "unknown", raw) as any;
  }

}
