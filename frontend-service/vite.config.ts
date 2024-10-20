import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const apiServiceTarget = process.env.API_SERVICE_HOST;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests starting with /api to the backend server
      "/api": {
        target: `http://${apiServiceTarget}:8080`, // Change this to your backend API URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: rewrite the URL
      },
    },
  },
});
