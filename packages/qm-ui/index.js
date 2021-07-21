import QmPreviewCaller from '@qm-ui/preview';
const plugins = [
  QmPreviewCaller
];
const install = (app) => {
  plugins.forEach(plugin => {
    app.use(plugin);
  });
};
export {
  QmPreviewCaller
};
export default {
  install,
};