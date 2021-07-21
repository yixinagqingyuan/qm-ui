import Vue from 'vue';
import entry from './pages/play';
import qmui from 'qm-ui';
import '../packages/theme-chalk/src/index.scss';
Vue.use(qmui);
new Vue({
  ...entry
}).$mount('#app');
