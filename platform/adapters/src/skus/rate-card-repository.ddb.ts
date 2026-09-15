/**
 * RateCardRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { RateCardRepository } from "@shelfline/services/skus";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class RateCardRepositoryDdb implements RateCardRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listSkuRateCards(input: Parameters<RateCardRepository["listSkuRateCards"]>[0]): Promise<Awaited<ReturnType<RateCardRepository["listSkuRateCards"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    return sandboxList("skus:rate-card") as any;
  }

  async upsertRateCard(input: Parameters<RateCardRepository["upsertRateCard"]>[0]): Promise<Awaited<ReturnType<RateCardRepository["upsertRateCard"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.rate-cardId ?? raw.id ?? raw.skuId ?? "");
    return sandboxUpsert("skus:rate-card", id || "unknown", raw) as any;
  }

}
