import { defineConfig } from 'tsup'
import { sassPlugin as sass } from 'esbuild-sass-plugin'

import html from '@plasticine-cropper/esbuild-plugin-html'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    outDir: 'dist',
    format: ['cjs', 'esm'],
    dts: true,
    shims: true,
    sourcemap: true,
    esbuildPlugins: [html()],
  },
  {
    entry: {
      'plasticine-cropper': 'src/styles/plasticine-cropper.scss',
    },
    outDir: 'dist',
    sourcemap: true,
    esbuildPlugins: [
      // @ts-ignore -- tsup 依赖的 esbuild 版本为 `^0.18.2`，`esbuild-sass-plugin` 依赖的 esbuild 版本为 `^0.19.1`，Plugin 类型不兼容，但是不影响运行时，故忽略类型检查
      sass(),
    ],
  },
])
