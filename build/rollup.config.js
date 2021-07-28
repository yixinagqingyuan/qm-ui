import vue from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import path from 'path';
import { getPackagesSync } from '@lerna/project';
import pkg from '../package.json';
// 排除工具文件夹
const noElPrefixFile = /(utils)/;
const getOutFile = (name, dir = 'lib') => {
  const compName = name.split('@mopower-ui/')[1];
  if (noElPrefixFile.test(name)) {
    return `${dir}/${compName}/index.js`;
  }
  return `${dir}/mp-${compName}/index.js`;
};
const deps = Object.keys(pkg.dependencies || {});
const inputs = getPackagesSync()
  .map(pkg => pkg.name)
  .filter(name =>
    name.includes('@mopower-ui') &&
    !name.includes('utils'),
  );
// 返回配置数组
export default inputs.map(name => ({

  input: path.resolve(__dirname, `../packages/${name.split('@mopower-ui/')[1]}/index.js`),
  output: [{
    format: 'cjs',
    file: getOutFile(name, 'lib'),
    exports: 'named',
    paths (id) {
      if (/^@mopower-ui/.test(id)) {
        if (noElPrefixFile.test(id)) return id.replace('@mopower-ui', '..');
        return id.replace('@mopower-ui/', '../el-');
      }
    },
  }],
  plugins: [
    css(),
    vue({
      target: 'browser',
      css: false,
    }),
    nodeResolve(),
    esbuild(),
  ],
  external (id) {
    return /^vue$/.test(id)
      || /^@mopower-ui/.test(id)
      || deps.some(k => new RegExp('^' + k).test(id));
  },
}));
