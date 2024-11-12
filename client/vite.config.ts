/// <reference types="node" />

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (development or production)
  const env = loadEnv(mode, process.cwd(), "VITE_");

  console.log("Environment mode:", mode);
  console.log("Loaded environment variables:", env);

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // Optional: for path aliasing
      },
    },
    // Removed the 'define' property to prevent unnecessary mappings
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: env.VITE_API_URL, // Use the API URL based on the mode
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
