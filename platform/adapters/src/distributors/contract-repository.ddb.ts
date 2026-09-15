/**
 * ContractRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { ContractRepository } from "@shelfline/services/distributors";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class ContractRepositoryDdb implements ContractRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listDistributionContracts(input: Parameters<ContractRepository["listDistributionContracts"]>[0]): Promise<Awaited<ReturnType<ContractRepository["listDistributionContracts"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    return sandboxList("distributors:contract") as any;
  }

  async createDistributionContract(input: Parameters<ContractRepository["createDistributionContract"]>[0]): Promise<Awaited<ReturnType<ContractRepository["createDistributionContract"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    return sandboxCreate("distributors:contract", { ...raw, status: raw.status ?? "draft" }) as any;
  }

  async getDistributionContract(input: Parameters<ContractRepository["getDistributionContract"]>[0]): Promise<Awaited<ReturnType<ContractRepository["getDistributionContract"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.contractId ?? raw.id ?? raw.skuId ?? raw.distributorId ?? raw.applicationId ?? raw.complaintId ?? raw.breachId ?? "");
    return sandboxGet("distributors:contract", id) as any;
  }

  async amendDistributionContract(input: Parameters<ContractRepository["amendDistributionContract"]>[0]): Promise<Awaited<ReturnType<ContractRepository["amendDistributionContract"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.contractId ?? raw.id ?? raw.skuId ?? "");
    return sandboxUpsert("distributors:contract", id || "unknown", raw) as any;
  }

}
