/**
 * AssignRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { AssignRepository } from "@shelfline/services/complaints";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class AssignRepositoryDdb implements AssignRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async assignComplaint(input: Parameters<AssignRepository["assignComplaint"]>[0]): Promise<Awaited<ReturnType<AssignRepository["assignComplaint"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.assignId ?? raw.id ?? raw.skuId ?? raw.distributorId ?? raw.applicationId ?? raw.complaintId ?? raw.breachId ?? raw.throttleEventId ?? "item");
    return sandboxPatch("complaints:assign", id, { ...raw, status: raw.status ?? "assignComplaint" }) as any;
  }

}
