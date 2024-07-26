import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    coverage: {
      reporter: ["text", "json", "html"],
    },
    alias: [
      {
        find: "react-redux/es/exports",
        replacement: path.resolve(
          __dirname,
          "./node_modules/react-redux/lib/exports",
        ),
      },
    ],
  },
});
