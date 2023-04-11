import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import external from 'rollup-plugin-peer-deps-external'
import del from 'rollup-plugin-delete'
import url from '@rollup/plugin-url'
import postcss from 'rollup-plugin-postcss'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import pkg from './package.json' assert { type: 'json' }
import path from 'path'

export default [
  {
    input: 'src/index.tsx',
    output: { file: pkg.module, format: 'esm', sourcemap: true },
    ...getCommonConfig(pkg.module),
  },
  {
    input: 'src/index.tsx',
    output: {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    ...getCommonConfig(pkg.main),
  },
]

function getCommonConfig(file) {
  const dir = path.dirname(file)

  return {
    plugins: [
      external(),
      url(),
      postcss(),
      typescript(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'runtime',
        extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      }),
      del({ targets: [`${dir}/**`] }),
    ],
  }
}
