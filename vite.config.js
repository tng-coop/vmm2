import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // for a user site, this is correct
  build: {
    sourcemap: true
  }
});
