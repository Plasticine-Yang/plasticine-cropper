import { defineConfig } from 'tsup'

import html from '@plasticine-cropper/esbuild-plugin-html'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    outDir: 'dist',
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    shims: true,
    sourcemap: true,
    esbuildPlugins: [html()],
  },
  {
    entry: {
      'plasticine-cropper': 'src/styles/plasticine-cropper.css',
    },
    outDir: 'dist',
    sourcemap: true,
  },
])
