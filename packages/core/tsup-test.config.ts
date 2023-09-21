import { defineConfig } from 'tsup'

import html from '@plasticine-cropper/esbuild-plugin-html'

export default defineConfig([
  {
    entry: {
      index: 'src/internal-api-for-test.ts',
    },
    outDir: 'internal-dist',
    format: 'esm',
    clean: true,
    dts: true,
    shims: true,
    sourcemap: true,
    esbuildPlugins: [html()],
  },
])
