import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  css    : {
    preprocessorOptions: {
      scss: {
        api           : "modern-compiler",
        additionalData: `@use "/src/assets/styles/abstract/_index.scss" as *;`
      }
    }
  },
  base   : "/portfolio-ux-ui/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
});