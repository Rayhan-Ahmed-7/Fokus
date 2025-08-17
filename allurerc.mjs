import { defineConfig } from "allure";

export default defineConfig({
  name: "Fokus Test Report",
  output: "./allure-report",
  // historyPath: "./history.json",
  plugins: {
    awesome: {
      options: {
        reportName: "Fokus Test Report", // Change site title
        logo: "./assets/logo.jpg", // Custom logo path
        theme: "dark",
        layout: "split",
        reportLanguage: "en",
        ci: {
          type: "github",
          url: "https://github.com/Rayhan-Ahmed-7",
          name: "GitHub Actions",
        },
      },
    },
  },
});
