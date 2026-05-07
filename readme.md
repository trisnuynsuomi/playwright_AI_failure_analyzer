# Playwright AI Failure Analyzer

## Summary


AI-assisted Playwright failure analysis system using:

- Playwright
- OpenAI
- Prisma
- SQLite
- ExcelJS

The system automatically:
- collects failed test information
- analyzes failures using AI
- tracks recurring issues
- stores historical failures
- exports reports to Excel

---

<p align="center">
  <img src="./docs/is_this_ai.png" width="500"/>
</p>

---

# Features

## AI Failure Analysis

When a Playwright test fails, the system collects:

- error message
- console logs
- failed network requests
- screenshots/traces (Playwright built-in)

Then sends the context to OpenAI for analysis.

Example AI output:

```text
Probable root cause:
The selector '#does-not-exist' never matches any DOM node.

Why:
Playwright timed out waiting for the locator.
```

---

## Historical Failure Tracking

The system generates a fingerprint for each failed test and stores it in SQLite.

This allows:
- recurring issue detection
- flaky test analysis
- failure history correlation

---

## Excel Export

Generate `.xlsx` reports containing:

- test title
- error message
- AI summary
- timestamps

---

# Tech Stack

| Tool | Purpose |
|---|---|
| Playwright | Browser automation |
| OpenAI API | AI analysis |
| Prisma | ORM |
| SQLite | Local database |
| ExcelJS | Excel export |
| TypeScript | Main language |

---

# Project Structure

```text
src/
├── ai/
│   ├── prompts/
│   └── providers/
│
├── analytics/
├── collectors/
├── config/
├── database/
├── exporters/
├── hooks/
├── types/
└── utils/

e2e/
prisma/
```

---

# Setup

## 1. Clone repository

```bash
git clone <your-repo-url>

cd playwright_ai_reporter
```

---

## 2. Install dependencies

Recommended:

```bash
Node.js 20 LTS
```

Install packages:

```bash
npm install
```

---

## 3. Install Playwright browsers

```bash
npx playwright install chromium
```

---

## 4. Configure environment variables

Create `.env`

```env
OPENAI_API_KEY=YOUR_OPENAI_API_KEY

DATABASE_URL="file:./dev.db"
```

IMPORTANT:
- Never commit `.env`
- Never expose API keys publicly

---

## 5. Initialize database

```bash
npx prisma migrate dev --name init
```

---

# Running Tests

```bash
npx playwright test --project=chromium
```

---

# Export Excel Report

```bash
npx tsx src/exporters/export.ts
```

Generated file:

```text
failure-report.xlsx
```

---

# Example Test

```ts
import {
  test,
  expect
} from '@playwright/test';

import '../src/hooks/failureHook';

test(
'fake fail',
async ({ page }) => {

  await page.goto(
    'https://playwright.dev'
  );

  await expect(
    page.locator('#does-not-exist')
  ).toBeVisible();
});
```

---

# Current Limitations

Current version:
- uses simple fingerprinting
- uses local SQLite database
- analyzes failures sequentially

Future improvements:
- structured JSON AI output
- flaky score calculation
- semantic fingerprinting
- CI optimization
- dashboard/report UI
- screenshot vision analysis

---

# CI/CD

The project is compatible with Jenkins and similar CI systems.

Example:

```bash
npm ci

npx playwright install chromium

npx playwright test

npx tsx src/exporters/export.ts
```

---

# Security Notes

## Recommended

- keep API keys in environment variables
- avoid logging sensitive data
- trim large logs before sending to AI
- never commit `.env`

---

