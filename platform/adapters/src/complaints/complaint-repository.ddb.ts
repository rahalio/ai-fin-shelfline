/**
 * ComplaintRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { ComplaintRepository } from "@shelfline/services/complaints";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class ComplaintRepositoryDdb implements ComplaintRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listComplaints(input: Parameters<ComplaintRepository["listComplaints"]>[0]): Promise<Awaited<ReturnType<ComplaintRepository["listComplaints"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    return sandboxList("complaints:complaint") as any;
  }

  async openComplaint(input: Parameters<ComplaintRepository["openComplaint"]>[0]): Promise<Awaited<ReturnType<ComplaintRepository["openComplaint"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    return sandboxCreate("complaints:complaint", { ...raw, status: raw.status ?? "draft" }) as any;
  }

  async getComplaint(input: Parameters<ComplaintRepository["getComplaint"]>[0]): Promise<Awaited<ReturnType<ComplaintRepository["getComplaint"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    const id = String(raw.complaintId ?? raw.id ?? raw.skuId ?? raw.distributorId ?? raw.applicationId ?? raw.complaintId ?? raw.breachId ?? "");
    return sandboxGet("complaints:complaint", id) as any;
  }

}
