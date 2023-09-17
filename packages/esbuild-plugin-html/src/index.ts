import type { Plugin } from 'esbuild'
import { readFile } from 'fs/promises'

import { PLUGIN_NAME } from './constants'

const htmlRegExp = /\.html$/

const esbuildPluginHtml: Plugin = {
  name: PLUGIN_NAME,
  setup(build) {
    build.onResolve({ filter: htmlRegExp }, () => {
      return { sideEffects: false }
    })

    build.onLoad({ filter: htmlRegExp }, async (args) => {
      const { path } = args

      const rawHTML = await readFile(path, 'utf-8')
      const resolvedHTML = rawHTML
        // 移除标签之间的空白符
        .replace(/>\s+</g, '><')
        // 移除最后一行的空白符
        .replace(/\s+$/, '')

      return {
        loader: 'text',
        contents: resolvedHTML,
      }
    })
  },
}

export default esbuildPluginHtml
