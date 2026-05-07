import { Page }
from '@playwright/test';

export function sanitize(text: string) {
    return text
      .replace(/Bearer\s+[A-Za-z0-9\-_\.]+/gi, 'Bearer [REDACTED]')
      .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[EMAIL]')
      .replace(/https?:\/\/[^\s]+/gi, '[URL]')
      .replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/gi, '[UUID]');
  }

export class ConsoleCollector {

  private logs: string[] = [];

  attach(page: Page) {

    page.on('console', msg => {

      this.logs.push(
        `[${msg.type()}]
        ${sanitize(msg.text())}`
      );
    });
  }

  getLogs() {

    return this.logs;
  }
}