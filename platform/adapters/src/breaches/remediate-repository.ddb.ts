/**
 * RemediateRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { RemediateRepository } from "@shelfline/services/breaches";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class RemediateRepositoryDdb implements RemediateRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async remediateBreach(input: Parameters<RemediateRepository["remediateBreach"]>[0]): Promise<Awaited<ReturnType<RemediateRepository["remediateBreach"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.remediateId ?? raw.id ?? raw.skuId ?? raw.distributorId ?? raw.applicationId ?? raw.complaintId ?? raw.breachId ?? raw.throttleEventId ?? "item");
    return sandboxPatch("breaches:remediate", id, { ...raw, status: raw.status ?? "remediateBreach" }) as any;
  }

}
