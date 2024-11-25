/** @type {import('vite').UserConfig} */
import { defineConfig } from "vite";
import { resolve } from "path";

const rootDir = resolve(__dirname);

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname),
      "~": resolve(__dirname),
    },
  },
});
