import Vue from 'vue';
import entry from './pages/play';
import mpui from 'mopower-ui';
import '../packages/theme-chalk/src/index.scss';
Vue.use(mpui);
new Vue({
  ...entry
}).$mount('#app');
