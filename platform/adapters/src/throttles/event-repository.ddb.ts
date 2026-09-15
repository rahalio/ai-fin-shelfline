/**
 * EventRepositoryDdb — sandbox in-memory implementation for local Shelfline.
 */

import type { EventRepository } from "@shelfline/services/throttles";
import {
  sandboxList,
  sandboxGet,
  sandboxCreate,
  sandboxUpsert,
  sandboxPatch,
} from "../_shared/product-sandbox.js";

export class EventRepositoryDdb implements EventRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listThrottleEvents(input: Parameters<EventRepository["listThrottleEvents"]>[0]): Promise<Awaited<ReturnType<EventRepository["listThrottleEvents"]>>> {
    const raw = (input ?? {}) as Record<string, unknown>;
    return sandboxList("throttles:event") as any;
  }

}
