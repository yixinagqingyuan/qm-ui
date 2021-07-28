
import Icon from './src/index.vue';
Icon.install = (app) => {
  App.component(Icon.name, Icon);
};
export default Icon;
