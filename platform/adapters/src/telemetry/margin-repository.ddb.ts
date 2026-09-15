/**
 * MarginRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { MarginRepository } from "@shelfline/services/telemetry";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class MarginRepositoryDdb implements MarginRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listMarginSnapshots(input: Parameters<MarginRepository["listMarginSnapshots"]>[0]): Promise<Awaited<ReturnType<MarginRepository["listMarginSnapshots"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    return sandboxList("telemetry:margin") as any;
  }

}
