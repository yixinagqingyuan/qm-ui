import previewCaller from '@qm-ui/preview';
const plugins = [
  previewCaller
];
const install = (app) => {
  plugins.forEach(plugin => {
    app.use(plugin);
  });
};
export default {
  install,
};