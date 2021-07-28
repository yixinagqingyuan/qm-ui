// import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import esbuild from 'rollup-plugin-esbuild';
import pkg from '../package.json';
const deps = Object.keys(pkg.dependencies || {});
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vue = require('rollup-plugin-vue');
import replace from '@rollup/plugin-replace';
const isEsm = process.env.LIBMODE === 'esm';
export default [
  {
    input: path.resolve(__dirname, '../packages/mopower-ui/index.js'),
    output: {
      format: isEsm ? 'es' : 'iife',
      file: isEsm ? 'lib/index.esm.js' : 'lib/index.js',
      name: isEsm ? '' : 'MopowerUi',
      exports: 'named',
      globals: isEsm ? {
        vue: "Vue" // 告诉rollup全局变量Vue即是vue
      } : ''
    },
    plugins: [
      terser(),
      nodeResolve(),
      vue({
        target: 'browser',
        css: false,
        exposeFilename: false,
      }),
      commonjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      esbuild(),
    ],
    external (id) {
      return /^vue$/.test(id)
        || deps.some(k => new RegExp('^' + k).test(id));
    },
  },
];
