import { build } from 'esbuild'
import { resolve } from 'path'

import esbuildPluginHtml from '../src'

const FIXTURES_PATH = resolve(__dirname, 'fixtures')

describe('esbuildPluginHtml', () => {
  test('args path and resolveDir', async () => {
    const { outputFiles } = await build({
      entryPoints: [resolve(FIXTURES_PATH, 'foo.ts')],
      write: false,
      bundle: true,
      plugins: [esbuildPluginHtml],
    })

    const compiledCodeList = outputFiles.map((outputFile) => outputFile.text)

    expect(compiledCodeList).toMatchInlineSnapshot(`
      [
        "\\"use strict\\";
      (() => {
        // packages/esbuild-plugin-html/__tests__/fixtures/foo.html
        var foo_default = '<!DOCTYPE html><html lang=\\"en\\"><head><meta charset=\\"UTF-8\\" /><meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" /><title>Foo</title></head><body></body></html>';

        // packages/esbuild-plugin-html/__tests__/fixtures/foo.ts
        var run = () => {
          return foo_default;
        };
      })();
      ",
      ]
    `)
  })
})
