/**
 * IdGeneratorService Port — Shelfline domain prefixes.
 */

import type { DomainCode } from '@shelfline/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  skuId(): string;
  dstId(): string;
  orgId(): string;
  thrId(): string;
  telId(): string;
  cmpId(): string;
  brcId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
