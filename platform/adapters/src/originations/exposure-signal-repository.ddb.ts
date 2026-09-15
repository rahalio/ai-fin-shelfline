/**
 * ExposureSignalRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { ExposureSignalRepository } from "@shelfline/services/originations";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class ExposureSignalRepositoryDdb implements ExposureSignalRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async ingestExposureSignal(input: Parameters<ExposureSignalRepository["ingestExposureSignal"]>[0]): Promise<Awaited<ReturnType<ExposureSignalRepository["ingestExposureSignal"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    return sandboxCreate("originations:exposure-signal", { ...raw, status: raw.status ?? "draft" }) as any;
  }

}
