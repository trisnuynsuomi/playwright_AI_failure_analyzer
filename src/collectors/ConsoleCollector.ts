import { Page }
from '@playwright/test';

export class ConsoleCollector {

  private logs: string[] = [];

  attach(page: Page) {

    page.on('console', msg => {

      this.logs.push(
        `[${msg.type()}]
        ${msg.text()}`
      );
    });
  }

  getLogs() {

    return this.logs;
  }
}