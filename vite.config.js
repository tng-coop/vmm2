import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "./", // for a user site, this is correct
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      // Force all imports of 'lit' to resolve to the one in our root node_modules
      'lit': path.resolve(__dirname, 'node_modules/lit'),
    },
    dedupe: ['lit']
  },
  optimizeDeps: {
    exclude: [
      '@shoelace-style/shoelace'
      // Add other dependencies here if needed.
    ]
  },
});
