import { Page }
from '@playwright/test';

export function sanitize(text: string) {
    return text
      .replace(/Bearer\s+[A-Za-z0-9\-_\.]+/gi, 'Bearer [REDACTED]')
      .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[EMAIL]')
      .replace(/https?:\/\/[^\s]+/gi, '[URL]')
      .replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/gi, '[UUID]');
  }

export class NetworkCollector {

  private failed: string[] = [];

  attach(page: Page) {

    page.on(
      'requestfailed',

      request => {

        this.failed.push(
          `${request.method()}
          ${sanitize(request.url())}`
        );
      }
    );
  }

  getFailed() {

    return this.failed;
  }
}