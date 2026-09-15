/**
 * ActivateRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { ActivateRepository } from "@shelfline/services/distributors";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class ActivateRepositoryDdb implements ActivateRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async activateDistributionContract(input: Parameters<ActivateRepository["activateDistributionContract"]>[0]): Promise<Awaited<ReturnType<ActivateRepository["activateDistributionContract"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.activateId ?? raw.id ?? raw.skuId ?? raw.distributorId ?? raw.applicationId ?? raw.complaintId ?? raw.breachId ?? raw.throttleEventId ?? "item");
    return sandboxPatch("distributors:activate", id, { ...raw, status: raw.status ?? "activateDistributionContract" }) as any;
  }

}
