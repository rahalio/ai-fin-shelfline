/**
 * RetireRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { RetireRepository } from "@shelfline/services/skus";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class RetireRepositoryDdb implements RetireRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async retireProductSku(input: Parameters<RetireRepository["retireProductSku"]>[0]): Promise<Awaited<ReturnType<RetireRepository["retireProductSku"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.retireId ?? raw.id ?? raw.skuId ?? raw.distributorId ?? raw.applicationId ?? raw.complaintId ?? raw.breachId ?? raw.throttleEventId ?? "item");
    return sandboxPatch("skus:retire", id, { ...raw, status: raw.status ?? "retireProductSku" }) as any;
  }

}
