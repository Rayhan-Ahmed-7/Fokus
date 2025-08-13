import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["e2e/**", "**/*.stories.*"],
    environment: "jsdom",
    globals: true,
    reporters: ["default", "junit", "html"],
    outputFile: {
      junit: "vitest-result/index.xml",
      html: "vitest-result/index.html",
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      reportsDirectory: "./coverage",
      exclude: ["e2e/**", ".storybook/**", "**/*.stories.*"],
    },
  },
});
