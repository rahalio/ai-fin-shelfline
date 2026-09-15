/**
 * PauseRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { PauseRepository } from "@shelfline/services/skus";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class PauseRepositoryDdb implements PauseRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async pauseProductSku(input: Parameters<PauseRepository["pauseProductSku"]>[0]): Promise<Awaited<ReturnType<PauseRepository["pauseProductSku"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.pauseId ?? raw.id ?? raw.skuId ?? raw.distributorId ?? raw.applicationId ?? raw.complaintId ?? raw.breachId ?? raw.throttleEventId ?? "item");
    return sandboxPatch("skus:pause", id, { ...raw, status: raw.status ?? "pauseProductSku" }) as any;
  }

}
