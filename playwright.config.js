// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'console';
import { report } from 'process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
// playwright.config.js

const config = {
  // Reporter property add karein
  reporter: 'html',
  retries:1,
  workers:3,
  use: {
    browserName: 'chromium',
    headless: false,
    launchOptions: {
      slowMo: 1000, 
    },
    screenshot: 'on',
    video: 'retain-on-failure',
    trace:'retain-on-failure',
   // viewport:{width:720,height:720},
   },
};

export default config;