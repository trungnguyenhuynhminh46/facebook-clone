import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
// Enable dot on URL param
import pluginRewriteAll from "vite-plugin-rewrite-all";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pluginRewriteAll()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@icons": path.resolve(__dirname, "./public/icons"),
      "@fonts": path.resolve(__dirname, "./public/fonts"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@svg": path.resolve(__dirname, "./src/svg"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },
});
