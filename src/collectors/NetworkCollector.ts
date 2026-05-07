import { Page }
from '@playwright/test';

export class NetworkCollector {

  private failed: string[] = [];

  attach(page: Page) {

    page.on(
      'requestfailed',

      request => {

        this.failed.push(
          `${request.method()}
          ${request.url()}`
        );
      }
    );
  }

  getFailed() {

    return this.failed;
  }
}