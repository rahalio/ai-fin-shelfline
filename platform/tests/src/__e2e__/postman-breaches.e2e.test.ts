/**
 * Postman-collection 1:1 Vitest tests for breaches (generated)
 *
 * One it() = one API request. Add sample data to vars for e2e runs.
 * Run: pnpm test:e2e or pnpm test:suite:db
 * Requires: API server at baseUrl (default http://localhost:3000)
 */

import { describe, it, expect } from "vitest";

const vars: Record<string, string> = {
  baseUrl: "http://localhost:3000",
  orgId: "test-org",
  accessToken: "",
  breachId: "",
  cursor: "",
  distributorId: "",
  limit: "",
  status: "",
};

function sub(s: string): string {
  return s.replace(/\{\{([^}]+)\}\}/g, (_, k) => vars[k.trim()] ?? "");
}

describe("Postman / breaches (1:1 generated)", () => {

  it("listBreaches", async () => {
    const url = sub("{{baseUrl}}/v1/breaches?cursor={{cursor}}&limit={{limit}}&status={{status}}&distributorId={{distributorId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("recordBreach", async () => {
    const url = sub("{{baseUrl}}/v1/breaches");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"distributorId\": \"newman_distributorId\",\n  \"type\": \"shadowPricing\",\n  \"detail\": \"\"\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("getBreach", async () => {
    const url = sub("{{baseUrl}}/v1/breaches/{{breachId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("remediateBreach", async () => {
    const url = sub("{{baseUrl}}/v1/breaches/{{breachId}}/remediate");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"remediationNote\": \"\"\n}"),
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("listFairnessAttestations", async () => {
    const url = sub("{{baseUrl}}/v1/fairness/attestations?cursor={{cursor}}&limit={{limit}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("createFairnessAttestation", async () => {
    const url = sub("{{baseUrl}}/v1/fairness/attestations");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"attestedBy\": \"\",\n  \"channelCompareNote\": \"\",\n  \"leakageFindings\": 0\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
    if (j?.data?.id) vars['fairnessAttestationId'] = j.data.id;
  });
});
