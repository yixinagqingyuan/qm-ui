import Vue from 'vue';
import entry from './pages/play';
import mpui from 'mopower-ui';
import '../packages/theme-chalk/src/index.scss';
//import '../packages/theme-chalk/src/index.css';
Vue.use(mpui);
new Vue({
  ...entry
}).$mount('#app');
