import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Security headers live in vercel.json; `npm run preview` serves the same ones.
const vercel = JSON.parse(readFileSync(new URL("./vercel.json", import.meta.url), "utf8"));
const siteHeaders = Object.fromEntries(
  vercel.headers.find((h) => h.source === "/(.*)").headers.map((h) => [h.key, h.value]),
);

/*
  The CSP allows index.html's inline scripts by hash only. Fail the build if
  one of them was edited without updating the hash in vercel.json.
*/
function cspHashCheck() {
  return {
    name: "csp-hash-check",
    apply: "build",
    transformIndexHtml(html) {
      const csp = siteHeaders["Content-Security-Policy"];
      for (const [, code] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
        const hash = `'sha256-${createHash("sha256").update(code).digest("base64")}'`;
        if (!csp.includes(hash)) {
          throw new Error(`Inline script not allowed by the CSP in vercel.json — add ${hash} to script-src.`);
        }
      }
    },
  };
}

// Hosted on Vercel at brieuc.co (served from the root), so base stays "/".
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), cspHashCheck()],
  // Never inline fonts as data: URIs — the CSP only allows font-src 'self'.
  build: { assetsInlineLimit: (file) => (file.endsWith(".woff2") ? false : undefined) },
  preview: { headers: siteHeaders },
});
