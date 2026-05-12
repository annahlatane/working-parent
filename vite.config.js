import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base path is set by the deploy workflow using your repo name.
// For local dev, this defaults to "/" which is correct.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/",
});
