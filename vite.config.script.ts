import { defineConfig } from "vite";

// Standalone IIFE script, built separately from the extension.
// Output: dist/standalone/better-trac.js (self-contained, runs on inject).
export default defineConfig({
  publicDir: false,
  build: {
    outDir: "dist/standalone",
    emptyOutDir: true,
    lib: {
      entry: "src/standalone/main.ts",
      formats: ["iife"],
      name: "BetterTracScript",
      fileName: () => "better-trac.js",
    },
  },
});
