/**
 * CapRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { CapRepository } from "@shelfline/services/throttles";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class CapRepositoryDdb implements CapRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listLiquidityCaps(input: Parameters<CapRepository["listLiquidityCaps"]>[0]): Promise<Awaited<ReturnType<CapRepository["listLiquidityCaps"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    return sandboxList("throttles:cap") as any;
  }

  async upsertLiquidityCap(input: Parameters<CapRepository["upsertLiquidityCap"]>[0]): Promise<Awaited<ReturnType<CapRepository["upsertLiquidityCap"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.capId ?? raw.id ?? raw.skuId ?? "");
    return sandboxUpsert("throttles:cap", id || "unknown", raw) as any;
  }

}
