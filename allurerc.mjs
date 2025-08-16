import { defineConfig } from "allure";

export default defineConfig({
  name: "DailyGrind Test Report",
  output: "./allure-report",
  historyPath: "./history.jsonl",
  plugins: {
    awesome: {
      options: {
        reportName: "DailyGrind Test Report", // Change site title
        logo: "branding/logo.jpg", // Custom logo path
        theme: "dark",
        layout: "split",
        reportLanguage: "en",
        ci: {
          type: "github",
          url: "https://github.com/your/repo",
          name: "GitHub Actions",
        },
      },
    },
  },
});
