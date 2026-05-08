import { test, expect } from '@playwright/test';
import '../src/hooks/failureHook';

test('fake fail', async ({ page }) => {
  await page.setContent(`
    <html>
      <body>
        <h1>Hello</h1>
      </body>
    </html>
  `);

  await expect(
    page.locator('#does-not-exist')
  ).toBeVisible();
});