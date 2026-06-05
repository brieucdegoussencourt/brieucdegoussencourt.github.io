import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// User GitHub Pages site (brieucdegoussencourt.github.io) serves from the root,
// so base stays "/". Build output goes to dist/ and is published via Actions.
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
});
