import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@providers": path.resolve(__dirname, "./src/providers"),
      "@helpers": path.resolve(__dirname, "./src/helpers"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",

        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }

          if (/\.css$/.test(name ?? "")) {
            return "assets/css/[name]-[hash][extname]";
          }

          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  plugins: [react()],
});
