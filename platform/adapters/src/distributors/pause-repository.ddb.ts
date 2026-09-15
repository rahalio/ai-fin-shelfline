/**
 * PauseRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { PauseRepository } from "@shelfline/services/distributors";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class PauseRepositoryDdb implements PauseRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async pauseDistributor(input: Parameters<PauseRepository["pauseDistributor"]>[0]): Promise<Awaited<ReturnType<PauseRepository["pauseDistributor"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.pauseId ?? raw.id ?? raw.skuId ?? raw.distributorId ?? raw.applicationId ?? raw.complaintId ?? raw.breachId ?? raw.throttleEventId ?? "item");
    return sandboxPatch("distributors:pause", id, { ...raw, status: raw.status ?? "pauseDistributor" }) as any;
  }

}
