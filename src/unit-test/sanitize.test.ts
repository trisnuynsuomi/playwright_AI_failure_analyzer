import { describe, it, expect } from "vitest";

import { sanitize } from "../../src/sanitizers/sanitize";

describe("sanitize", () => {
  it("should redact bearer token", () => {
    const input = "Bearer abc123";

    const result = sanitize(input);

    expect(result).toContain("[REDACTED]");
  });

  it("should redact email", () => {
    const input = "test@gmail.com";

    const result = sanitize(input);

    expect(result).toContain("[EMAIL]");
  });

  it("should redact URL", () => {
    const input = "https://www.google.com";

    const result = sanitize(input);

    expect(result).toContain("[URL]");
  });

  it("should redact UUID", () => {
    const input = "123e4567-e89b-12d3-a456-426614174000";

    const result = sanitize(input);

    expect(result).toContain("[UUID]");
  });

  it("should redact multiple tokens", () => {
    const input = "Bearer abc123 test@gmail.com https://www.google.com 123e4567-e89b-12d3-a456-426614174000";

    const result = sanitize(input);

    expect(result).toContain("[REDACTED] [EMAIL] [URL] [UUID]");
  });

  it("should redact multiple tokens with different types", () => {
    const input = "Bearer abc123 test@gmail.com https://www.google.com 123e4567-e89b-12d3-a456-426614174000";

    const result = sanitize(input);

    expect(result).toContain("[REDACTED] [EMAIL] [URL] [UUID]");
  });
});
