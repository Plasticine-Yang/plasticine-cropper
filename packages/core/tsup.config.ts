import { defineConfig } from 'tsup'

import html from '@plasticine-cropper/esbuild-plugin-html'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  clean: true,
  shims: true,
  sourcemap: true,
  esbuildPlugins: [html],
})
