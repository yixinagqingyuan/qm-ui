import Vue from 'vue';
import entry from './pages/play';
import qmui from 'qm-ui';
Vue.use(qmui);
new Vue({
  ...entry
}).$mount('#app');
