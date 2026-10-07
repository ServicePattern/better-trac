/// <reference types="vite/client" />

// UMD build: the ES build's `new URL("7zz.wasm", import.meta.url)` makes vite inline 1.6 MB of wasm
declare module "7z-wasm/7zz.umd.js" {
    export { default } from "7z-wasm";
}
