import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  outputDir: './test-results',
  retries: 0,
  timeout: 1200 * 1000,
  expect: { timeout: 15 * 1000 },
  testDir: './tests/spec',
  workers: 1,
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  }
};

export default config;
