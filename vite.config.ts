import { defineConfig } from "vitest/config";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig({
    ssr: {
        format: "esm",
    },
    server: {
        port: 8080,
        open: true,
    },
    build: {
        sourcemap: true,
    },
    test: {
        coverage: {
            provider: "v8", // or 'v8'
        },
    },
    plugins: [
        ...VitePluginNode({
            adapter: "express",
            appPath: "./src/app.ts",
        }),
    ],
});
