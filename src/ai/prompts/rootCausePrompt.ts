import { FailureContext } from "../../types/FailureContext";

export function buildRootCausePrompt(context: FailureContext, history: any[]) {
  return `
    Analyze this Playwright failure.
    
    CURRENT FAILURE
    ===============
    
    Test:
    ${context.testTitle}
    
    URL:
    ${context.url}
    
    Error:
    ${context.errorMessage}
    
    Recent Console Logs:
    ${context.consoleLogs.slice(-10).join("\n")}
    
    Recent Failed Requests:
    ${context.failedRequests.slice(-10).join("\n")}
    
    HISTORICAL FAILURE COUNT
    ===============

    ${history.length}

    IMPORTANT:
    If history count > 0,
    you MUST mention that this failure
    has occurred before.

    
    Respond ONLY valid JSON:
    
    {
      "rootCause": "",
      "why": "",
      "confidence": ""
    }
    `;
}

// add these to the prompt later when you need more information
/*
2. flaky probability
3. whether this happened before
4. suggested next debugging step
*/
