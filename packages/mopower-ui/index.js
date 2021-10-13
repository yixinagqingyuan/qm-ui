import MpPreviewCaller from '@mopower-ui/preview';
import MpIcon from '@mopower-ui/icon';
import { version } from './version';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
function isFunctionAndString(fn) {
  return Object.prototype.toString.call(fn) === '[object Function]' || Object.prototype.toString.call(fn) === '[object String]';
}
const plugins = [
  MpPreviewCaller
];
const components = [
  MpIcon,
];
for (let key in ElementUI) {
  if (!isFunctionAndString(ElementUI[key]) && ElementUI[key].name) {
    components.push(ElementUI[key]);
  }
}
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