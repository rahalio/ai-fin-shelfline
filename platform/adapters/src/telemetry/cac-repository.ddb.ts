/**
 * CacRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { CacRepository } from "@shelfline/services/telemetry";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class CacRepositoryDdb implements CacRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listCacReports(input: Parameters<CacRepository["listCacReports"]>[0]): Promise<Awaited<ReturnType<CacRepository["listCacReports"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    return sandboxList("telemetry:cac") as any;
  }

}
