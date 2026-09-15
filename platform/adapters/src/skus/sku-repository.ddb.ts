/**
 * SkuRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { SkuRepository } from "@shelfline/services/skus";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class SkuRepositoryDdb implements SkuRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listProductSkus(input: Parameters<SkuRepository["listProductSkus"]>[0]): Promise<Awaited<ReturnType<SkuRepository["listProductSkus"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    return sandboxList("skus:sku") as any;
  }

  async createProductSku(input: Parameters<SkuRepository["createProductSku"]>[0]): Promise<Awaited<ReturnType<SkuRepository["createProductSku"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    return sandboxCreate("skus:sku", { ...raw, status: raw.status ?? "draft" }) as any;
  }

  async getProductSku(input: Parameters<SkuRepository["getProductSku"]>[0]): Promise<Awaited<ReturnType<SkuRepository["getProductSku"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.skuId ?? raw.id ?? raw.skuId ?? raw.distributorId ?? raw.applicationId ?? raw.complaintId ?? raw.breachId ?? "");
    return sandboxGet("skus:sku", id) as any;
  }

  async updateProductSku(input: Parameters<SkuRepository["updateProductSku"]>[0]): Promise<Awaited<ReturnType<SkuRepository["updateProductSku"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.skuId ?? raw.id ?? raw.skuId ?? "");
    return sandboxUpsert("skus:sku", id || "unknown", raw) as any;
  }

}
