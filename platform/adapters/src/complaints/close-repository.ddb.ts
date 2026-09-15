/**
 * CloseRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { CloseRepository } from "@shelfline/services/complaints";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class CloseRepositoryDdb implements CloseRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async closeComplaint(input: Parameters<CloseRepository["closeComplaint"]>[0]): Promise<Awaited<ReturnType<CloseRepository["closeComplaint"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.closeId ?? raw.id ?? raw.skuId ?? raw.distributorId ?? raw.applicationId ?? raw.complaintId ?? raw.breachId ?? raw.throttleEventId ?? "item");
    return sandboxPatch("complaints:close", id, { ...raw, status: raw.status ?? "closeComplaint" }) as any;
  }

}
