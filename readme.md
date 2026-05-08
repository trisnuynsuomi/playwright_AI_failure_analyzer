# Playwright AI Failure Analyzer

AI-assisted failure analysis tool for Playwright tests.


## Summary

When a test fails, the system automatically:
- collects logs, traces, and screenshots
- sanitizes sensitive data
- analyzes failures using OpenAI
- tracks recurring issues
- generates Allure reports
- exports failure history to Google Sheets


## How It Works

This tool acts as an intelligent bridge between Playwright's test execution and Large Language Models (LLMs) to transform cryptic logs into actionable insights.

1.  **Failure Interception:** The analyzer hooks into the Playwright Test Runner. When a test fails, it immediately captures raw data, including:
    * `Error Message`: The specific failure reason.
    * `Stack Trace`: The exact line where the crash occurred.
    * `Code Snippet`: The surrounding code context of the failure point.
2.  **Context Optimization:** The captured data is cleaned and sanitized to remove noise, ensuring only relevant information is sent to the AI. This saves tokens and improves accuracy.
3.  **AI Analysis:** The processed data is sent to an LLM (OpenAI or a Local LLM) using specialized prompt engineering designed specifically for debugging automation scripts.
4.  **Actionable Insights:** The AI returns a structured report featuring:
    * **Root Cause**: An explanation of the failure in plain English (e.g., "The button is covered by a cookie consent banner").
    * **Suggested Fix**: A specific code snippet or strategy to resolve the issue.

---

<p align="center">
  <img src="./docs/is-this-ai.png" width="500"/>
</p>


---

# Features

- AI-generated root cause analysis
- Historical failure tracking
- Allure integration
- Google Sheets export
- Sanitized logs before AI analysis
- Analyze only after final retry fails
- Vitest unit tests

---

# Workflow

```text
Playwright fail
↓
collect logs + traces + screenshots
↓
sanitize sensitive data
↓
AI analyze failure
↓
attach analysis to Allure
↓
store recurring history
↓
export to Google Sheets
```

---

# Tech Stack

- Playwright
- OpenAI API
- Prisma
- SQLite
- Allure Report
- Google Sheets API
- Vitest
- TypeScript

---

# Setup

## Install dependencies

```bash
npm install
```

## Install Playwright browser

```bash
npx playwright install chromium
```

## Create `.env`

```env
OPENAI_API_KEY=YOUR_OPENAI_API_KEY

DATABASE_URL="file:./prisma/dev.db"

GOOGLE_SHEET_ID=YOUR_GOOGLE_SHEET_ID

GOOGLE_SERVICE_ACCOUNT_EMAIL=YOUR_SERVICE_ACCOUNT_EMAIL

GOOGLE_PRIVATE_KEY="YOUR_PRIVATE_KEY"
```

## Initialize database

```bash
npx prisma migrate dev --name init
```

---

# Run

## Playwright tests

```bash
npm test
```

## Unit tests

```bash
npm run test:unit
```

## Open Allure report

```bash
npm run allure
```

## Export latest run to Google Sheets

```bash
npm run report:sheet -- --sheetName={input-your-sheet-name-here}
```

---

# Example AI Output

```text
Probable root cause:
The selector '#does-not-exist' never matches any DOM node.

Why:
Playwright timed out waiting for the locator.
```

---

# Example Report

## Allure Report

<p align="center">
  <img src="./docs/allure-demo.png"/>
</p>


## Google Sheet Report
<p align="center">
  <img src="./docs/google-sheet-demo.png"/>
</p>


---

## Security & Privacy Considerations

**⚠️ IMPORTANT DATA NOTE:**

By default, if you use the OpenAI API, logs, DOM structures, and parts of your test code will be sent to a third-party server. For enterprise projects or those handling sensitive data, I **strongly recommend** switching to a **Local LLM**.

### Why use a Local LLM?
* **Total Privacy:** Your data never leaves your local machine or internal infrastructure.
* **Zero Cost:** No monthly API fees or per-token charges.
* **Reliability:** No dependency on internet connectivity or API rate limits.

> **Note from the Author:** Due to my current hardware limitations (low-spec PC), I haven't been able to run or demo this with a Local LLM personally. However, the architecture is fully compatible. You can simply point the `BASE_URL` to tools like **Ollama**, **LM Studio**, or **LocalAI** to keep your data 100% private.

---

## ⚙️ Configuration

Easily switch between OpenAI and Local LLMs by adjusting your environment variables:

```bash
# OpenAI Configuration (Default - Use with caution for sensitive data)
AI_PROVIDER=openai
OPENAI_API_KEY=sk-xxxx...

# Local LLM Configuration (Recommended for Privacy - e.g., via Ollama)
# AI_PROVIDER=local
# BASE_URL=http://localhost:11434/v1
# MODEL_NAME=llama3  # or codellama, etc.
```
---

# Future Improvements

- Structured JSON AI output
- Flaky score calculation
- Semantic fingerprinting
- GitHub Actions / Jenkins pipeline
- Dashboard UI
- Screenshot vision analysis
---