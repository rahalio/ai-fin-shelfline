/**
 * ID Generator Service Implementation — Shelfline prefixes.
 */

import type { DomainCode } from '@shelfline/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@shelfline/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@shelfline/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  skuId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.skus);
  }
  dstId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.distributors);
  }
  orgId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.originations);
  }
  thrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.throttles);
  }
  telId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.telemetry);
  }
  cmpId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.complaints);
  }
  brcId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.breaches);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
