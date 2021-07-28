import MpPreviewCaller from '@mopower-ui/preview';
import MpIcon from '@mopower-ui/icon';
import { version } from './version';
const plugins = [
  MpPreviewCaller
];
const components = [
  MpIcon
];
const install = (app) => {
  plugins.forEach(plugin => {
    app.use(plugin);
  });
  components.forEach(component => {
    app.component(component.name, component);
  });
};
export {
  MpPreviewCaller,
  MpIcon,
  version
};
export default {
  install,
  version
};