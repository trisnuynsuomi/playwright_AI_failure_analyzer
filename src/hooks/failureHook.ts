import { test } from "@playwright/test";

import { ConsoleCollector } from "../collectors/ConsoleCollector";

import { NetworkCollector } from "../collectors/NetworkCollector";

import { OpenAIProvider } from "../ai/providers/OpenAIProvider";

import { buildRootCausePrompt } from "../ai/prompts/rootCausePrompt";

import { FingerprintService } from "../analytics/FingerprintService";

import { HistoryService } from "../analytics/HistoryService";

import { prisma } from "../database/prisma";

import { allure } from "allure-playwright";

import { RUN_ID } from "../utils/runId";

const ai = new OpenAIProvider();

const fingerprintService = new FingerprintService();

const historyService = new HistoryService();

test.beforeEach(async ({ page }, testInfo) => {
  const consoleCollector = new ConsoleCollector();

  const networkCollector = new NetworkCollector();

  consoleCollector.attach(page);
  networkCollector.attach(page);

  (testInfo as any).consoleCollector = consoleCollector;

  (testInfo as any).networkCollector = networkCollector;
});

test.afterEach(async ({ page }, testInfo) => {
  testInfo.setTimeout(60_000);
  if (testInfo.status !== testInfo.expectedStatus) {
    const isFinalRetry = testInfo.retry === testInfo.project.retries;

    if (testInfo.status !== "failed" || !isFinalRetry) {
      return;
    }

    const consoleCollector = (testInfo as any).consoleCollector;

    const networkCollector = (testInfo as any).networkCollector;

    const fingerprint = fingerprintService.generate(
      testInfo.title,
      testInfo.error?.message || "",
    );

    const history = await historyService.findByFingerprint(fingerprint);

    const prompt = buildRootCausePrompt(
      {
        url: page.url(),

        testTitle: testInfo.title,

        errorMessage: testInfo.error?.message || "",

        consoleLogs: consoleCollector.getLogs(),

        failedRequests: networkCollector.getFailed(),
      },

      history,
    );

    const analysis = await ai.analyze(prompt);

    console.log("\n===== AI ANALYSIS =====\n");

    console.log(analysis);

    console.log("RUN_ID:", RUN_ID);

    await prisma.failureRecord.create({
      data: {
        testTitle: testInfo.title,

        errorMessage: testInfo.error?.message || "",

        aiSummary: analysis,

        fingerprint,

        runId: RUN_ID,

        timestamp: new Date(),
      },
    });

    allure.attachment(
      "AI Root Cause Analysis",

      analysis,

      "text/plain",
    );

    allure.attachment(
      "Historical Failures",

      JSON.stringify(history, null, 2),

      "application/json",
    );

    allure.label("fingerprint", fingerprint);
  }
});
