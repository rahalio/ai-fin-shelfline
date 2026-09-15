/**
 * DistributorRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { DistributorRepository } from "@shelfline/services/distributors";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class DistributorRepositoryDdb implements DistributorRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listDistributors(input: Parameters<DistributorRepository["listDistributors"]>[0]): Promise<Awaited<ReturnType<DistributorRepository["listDistributors"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    return sandboxList("distributors:distributor") as any;
  }

  async registerDistributor(input: Parameters<DistributorRepository["registerDistributor"]>[0]): Promise<Awaited<ReturnType<DistributorRepository["registerDistributor"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    return sandboxCreate("distributors:distributor", { ...raw, status: raw.status ?? "draft" }) as any;
  }

  async getDistributor(input: Parameters<DistributorRepository["getDistributor"]>[0]): Promise<Awaited<ReturnType<DistributorRepository["getDistributor"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.distributorId ?? raw.id ?? raw.skuId ?? raw.distributorId ?? raw.applicationId ?? raw.complaintId ?? raw.breachId ?? "");
    return sandboxGet("distributors:distributor", id) as any;
  }

}
