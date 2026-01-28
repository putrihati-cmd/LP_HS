import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { youwareVitePlugin } from "@youware/vite-plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [youwareVitePlugin(), react()],
  server: {
    host: "127.0.0.1",
    port: 8081,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
    allowedHosts: [
      "hscopycenter.site",
      "www.hscopycenter.site",
      "cetakfoto.hscopycenter.site",
      "dokumen.hscopycenter.site",
      "pos.hscopycenter.site",
      "kasir.hscopycenter.site"
    ],
  },
  build: {
    sourcemap: true,
  },
});
