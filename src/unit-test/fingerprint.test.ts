import { describe, it, expect } from "vitest";

import { FingerprintService } from "../../src/analytics/FingerprintService";

describe("FingerprintService", () => {
  it("should generate same fingerprint for same title and error message", () => {
    const service = new FingerprintService();

    const first = service.generate("login fail", "error message");

    const second = service.generate("login fail", "error message");

    expect(first).toBe(second);
  });

  it("should generate different fingerprint for different title", () => {
    const service = new FingerprintService();

    const first = service.generate("login fail", "error message");

    const second = service.generate("logout fail", "error message");

    expect(first).not.toBe(second);
  });

  it("should generate different fingerprint for different error message", () => {
    const service = new FingerprintService();

    const first = service.generate("login fail", "error message");

    const second = service.generate("login fail", "different error message");

    expect(first).not.toBe(second);
  });
});
