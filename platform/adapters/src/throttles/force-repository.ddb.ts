/**
 * ForceRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { ForceRepository } from "@shelfline/services/throttles";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class ForceRepositoryDdb implements ForceRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async forceThrottle(input: Parameters<ForceRepository["forceThrottle"]>[0]): Promise<Awaited<ReturnType<ForceRepository["forceThrottle"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.forceId ?? raw.id ?? raw.skuId ?? raw.distributorId ?? raw.applicationId ?? raw.complaintId ?? raw.breachId ?? raw.throttleEventId ?? "item");
    return sandboxPatch("throttles:force", id, { ...raw, status: raw.status ?? "forceThrottle" }) as any;
  }

}
