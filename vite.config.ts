import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import viteTsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  base: "./",
  plugins: [react(), viteTsconfigPaths()],

  // Vite options tailored for Tauri development and only applied in
  // `tauri dev` or`tauri build`
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  },
})
