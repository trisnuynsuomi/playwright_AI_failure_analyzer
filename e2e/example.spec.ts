import { test, expect } from '@playwright/test';
import '../src/hooks/failureHook';

test(
  'fake fail',
  async ({ page }) => {
  
    await page.goto(
      'https://playwright.dev'
    );
  
    await expect(
      page.locator(
        '#does-not-exist'
      )
    ).toBeVisible();
  });