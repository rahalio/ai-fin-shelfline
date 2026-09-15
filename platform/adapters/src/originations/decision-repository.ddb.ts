/**
 * DecisionRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { DecisionRepository } from "@shelfline/services/originations";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class DecisionRepositoryDdb implements DecisionRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async decideOrigination(input: Parameters<DecisionRepository["decideOrigination"]>[0]): Promise<Awaited<ReturnType<DecisionRepository["decideOrigination"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.decisionId ?? raw.id ?? raw.skuId ?? raw.distributorId ?? raw.applicationId ?? raw.complaintId ?? raw.breachId ?? raw.throttleEventId ?? "item");
    return sandboxPatch("originations:decision", id, { ...raw, status: raw.status ?? "decideOrigination" }) as any;
  }

}
