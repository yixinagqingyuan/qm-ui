/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const libMode = process.env.LIBMODE;
const isFullMode = libMode === 'full';
let externals = [
  {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
    },
  },
];
const plugins = [
  new VueLoaderPlugin(),
  // new BundleAnalyzerPlugin(),
];

const entry = path.resolve(__dirname, '../packages/element-plus/index.ts');

if (!isFullMode) {
  externals.push({
    '@popperjs/core': '@popperjs/core',
    'async-validator': 'async-validator',
    'mitt': 'mitt',
    'normalize-wheel': 'normalize-wheel',
    'resize-observer-polyfill': 'resize-observer-polyfill',
  },
    /^dayjs.*/,
    /^lodash.*/);
}

const config = {
  mode: 'production',
  entry,
  output: {
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/',
    filename: isFullMode ? 'index.full.js' : 'index.js',
    libraryTarget: 'umd',
    library: 'ElementPlus',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  externals,
  plugins,
};

module.exports = config;
