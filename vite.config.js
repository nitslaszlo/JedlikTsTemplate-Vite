import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig({
  ssr: {
    format: "cjs",
  },
  server: {
    port: 8080,
    open: true,
    sourcemap: true,
    watch: true,
  },
  build: {
    sourcemap: true,
    watch: true,
  },
  plugins: [
    ...VitePluginNode({
      adapter: "express",
      appPath: "./src/app.ts",
      sourcemap: true,
    }),
  ],
});
