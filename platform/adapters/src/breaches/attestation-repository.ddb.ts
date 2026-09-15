/**
 * AttestationRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { AttestationRepository } from "@shelfline/services/breaches";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class AttestationRepositoryDdb implements AttestationRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listFairnessAttestations(input: Parameters<AttestationRepository["listFairnessAttestations"]>[0]): Promise<Awaited<ReturnType<AttestationRepository["listFairnessAttestations"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    return sandboxList("breaches:attestation") as any;
  }

  async createFairnessAttestation(input: Parameters<AttestationRepository["createFairnessAttestation"]>[0]): Promise<Awaited<ReturnType<AttestationRepository["createFairnessAttestation"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    return sandboxCreate("breaches:attestation", { ...raw, status: raw.status ?? "draft" }) as any;
  }

}
