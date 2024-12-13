// rollup.config.mjs
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

const production = !process.env.ROLLUP_WATCH

const srcDir = 'src/chrome/'
const outDir = 'dist/browser/'

const plugins = [
  resolve(),
  commonjs({ extensions: ['.js', '.ts'] }),
  production && terser(),
]
const compilerOptions = {
  target: 'es6',
  module: 'ESNext',
  esModuleInterop: true,
  strict: true,
  skipLibCheck: true,
  // "include": [
  //   "src/chrome/**/*.ts"
  // ]
}

const generateConfigByIO = (input, output) => {
  return {
    input: srcDir + input,
    output: {
      file: outDir + output,
      format: 'iife',
      sourcemap: !production
    },
    plugins: [
      ...plugins,
      typescript({
        compilerOptions: {
          ...compilerOptions,
          lib: ['dom', 'ES2022']
        }
      })
    ]
  }
}

export default [
  generateConfigByIO('contentScript.ts', 'contentScript.js'),
  generateConfigByIO('inject.ts', 'inject.js'),
  generateConfigByIO('serviceWorker.ts', 'serviceWorker.js'),
];
