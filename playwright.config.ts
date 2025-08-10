// playwright.config.ts
import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();
export default defineConfig({
  testDir: "./e2e",
  use: {
    ignoreHTTPSErrors: true,
    baseURL: process.env.BASE_URL || "http://app:4173", // or your Vite port
    headless: true,
    browserName: "chromium",
    launchOptions: {
      headless: true,
      args: ["--ignore-certificate-errors"],
      slowMo: 1000,
    },
    viewport: { width: 1280, height: 720 },
    screenshot: "only-on-failure",
    video: "on",
  },
  reporter: [["html", { outputFolder: "playwright-report", open: "never" }]],
});
