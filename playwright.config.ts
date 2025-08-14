// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import * as os from "node:os";
import { Status } from "allure-js-commons";

dotenv.config();
export default defineConfig({
  testDir: "./e2e",
  projects: [
    {
      name: "Chrome",
      use: {
        ...devices["Desktop Chrome"],
        viewport: {
          width: 1920,
          height: 1080,
        },
      },
    },
    {
      name: "Firefox",
      use: {
        ...devices["Desktop Firefox"],
        viewport: {
          width: 1920,
          height: 1080,
        },
      },
    },
    {
      name: "Safari",
      use: {
        ...devices["Desktop Safari"],
        viewport: {
          width: 1920,
          height: 1080,
        },
      },
    },
    {
      name: "Mobile Safari",
      use: {
        ...devices["iPhone 14 Pro Max"],
      },
    },
  ],
  use: {
    ignoreHTTPSErrors: true,
    baseURL: process.env.BASE_URL || "http://frontend:4173", // or your Vite port
    headless: true,
    browserName: "chromium",
    launchOptions: {
      headless: true,
      slowMo: 1000,
    },
    viewport: { width: 1920, height: 1080 },
    screenshot: "on",
    video: "on",
  },
  reporter: [
    ["line"],
    [
      "allure-playwright",
      {
        logo: "la",
        theme: "dark",
        layout: "split",
        categories: [
          {
            name: "foo",
            messageRegex: "bar",
            traceRegex: "baz",
            matchedStatuses: [Status.FAILED, Status.BROKEN],
          },
        ],
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
          reporttitle: "Todo App Test Report", // Additional metadata
        },
      },
    ],
    [
      "json",
      {
        outputFile: "jsonReports/jsonReport.json",
      },
    ],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
});
