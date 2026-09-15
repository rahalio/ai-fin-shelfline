/**
 * OriginationRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { OriginationRepository } from "@shelfline/services/originations";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class OriginationRepositoryDdb implements OriginationRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listOriginations(input: Parameters<OriginationRepository["listOriginations"]>[0]): Promise<Awaited<ReturnType<OriginationRepository["listOriginations"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    return sandboxList("originations:origination") as any;
  }

  async submitOrigination(input: Parameters<OriginationRepository["submitOrigination"]>[0]): Promise<Awaited<ReturnType<OriginationRepository["submitOrigination"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    return sandboxCreate("originations:origination", { ...raw, status: raw.status ?? "draft" }) as any;
  }

  async getOrigination(input: Parameters<OriginationRepository["getOrigination"]>[0]): Promise<Awaited<ReturnType<OriginationRepository["getOrigination"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.originationId ?? raw.id ?? raw.skuId ?? raw.distributorId ?? raw.applicationId ?? raw.complaintId ?? raw.breachId ?? "");
    return sandboxGet("originations:origination", id) as any;
  }

}
