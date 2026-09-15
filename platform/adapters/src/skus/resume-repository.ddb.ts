/**
 * ResumeRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { ResumeRepository } from "@shelfline/services/skus";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class ResumeRepositoryDdb implements ResumeRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async resumeProductSku(input: Parameters<ResumeRepository["resumeProductSku"]>[0]): Promise<Awaited<ReturnType<ResumeRepository["resumeProductSku"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.resumeId ?? raw.id ?? raw.skuId ?? raw.distributorId ?? raw.applicationId ?? raw.complaintId ?? raw.breachId ?? raw.throttleEventId ?? "item");
    return sandboxPatch("skus:resume", id, { ...raw, status: raw.status ?? "resumeProductSku" }) as any;
  }

}
