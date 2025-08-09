// playwright.config.ts
import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();
export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: process.env.BASE_URL, // or your Vite port
    headless: true,
    launchOptions: {
      slowMo: 1000,
    },
    viewport: { width: 1280, height: 720 },
    screenshot: "only-on-failure",
    video: "on",
  },
  reporter: [["html", { outputFolder: "playwright-report", open: "never" }]],
});
