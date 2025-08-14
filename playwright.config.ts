// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

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
    ["allure-playwright"],
    [
      "json",
      {
        outputFile: "jsonReports/jsonReport.json",
      },
    ],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
});
