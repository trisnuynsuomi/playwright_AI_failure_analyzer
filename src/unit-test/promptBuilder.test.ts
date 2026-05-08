import { describe, it, expect } from "vitest";

import { buildRootCausePrompt } from "../../src/ai/prompts/rootCausePrompt";

describe("Prompt Builder", () => {
  it("should include history count when history is not empty", () => {
    const prompt = buildRootCausePrompt(
      {
        url: "https://www.google.com",

        testTitle: "login test",

        errorMessage: "timeout",

        consoleLogs: [],

        failedRequests: [],

        codeSnippet: "",

        htmlSnapshot: "",
      },

      [1, 2],
    );

    expect(prompt).toContain("2");
  });

  it("should not include history count when history is empty", () => {
    const prompt = buildRootCausePrompt(
      {
        url: "https://www.google.com",

        testTitle: "login test",

        errorMessage: "timeout",

        consoleLogs: [],

        failedRequests: [],

        codeSnippet: "",

        htmlSnapshot: "",
      },

      [],
    );
    expect(prompt).toContain("");
  });
});
