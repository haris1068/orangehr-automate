import type { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();
const config: PlaywrightTestConfig = {
  outputDir: './test-results',
  retries: 0,
  timeout: 30 * 1000,
  expect: { timeout: 30 * 1000 },
  testDir: './tests/spec',
  workers: 1,
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 30 * 1000,
    navigationTimeout: 30 * 1000,
  }
};

export default config;
