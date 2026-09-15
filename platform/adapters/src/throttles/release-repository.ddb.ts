/**
 * ReleaseRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { ReleaseRepository } from "@shelfline/services/throttles";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class ReleaseRepositoryDdb implements ReleaseRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async releaseThrottle(input: Parameters<ReleaseRepository["releaseThrottle"]>[0]): Promise<Awaited<ReturnType<ReleaseRepository["releaseThrottle"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.releaseId ?? raw.id ?? raw.skuId ?? raw.distributorId ?? raw.applicationId ?? raw.complaintId ?? raw.breachId ?? raw.throttleEventId ?? "item");
    return sandboxPatch("throttles:release", id, { ...raw, status: raw.status ?? "releaseThrottle" }) as any;
  }

}
