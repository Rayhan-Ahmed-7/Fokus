import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@features": path.resolve(__dirname, "./src/features"),
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
  server: {
    host: "0.0.0.0", // listen on all interfaces
    port: 4173,
    strictPort: true,
    cors: true,
    // allow hostnames for dev server
    allowedHosts: true,
  },
});
