import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// IIFE script an admin adds to the Trac page.
// Output: dist/better-trac.js (self-contained, runs on inject).
export default defineConfig({
  publicDir: false,
  plugins: [tailwindcss()],
  define: {
    // Lib builds keep process.env.NODE_ENV (react-dom references it) for a
    // downstream bundler to replace — there is none here, and the browser
    // has no `process`, so inline it.
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: "src/main.ts",
      formats: ["iife"],
      name: "BetterTracScript",
      fileName: () => "better-trac.js",
    },
  },
});
