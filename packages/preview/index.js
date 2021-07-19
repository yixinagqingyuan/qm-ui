import Vue from 'vue';
import preview from './src/image-preview.vue';
let messageInstance = null;
let PreviewConstructor = Vue.extend(preview);
let init = (options) => {
  messageInstance = new PreviewConstructor({
    propsData: options
  });
  messageInstance.$mount();
  document.body.appendChild(messageInstance.$el);
  return {
    then(fn) {
      messageInstance.callback = (action, value) => {
        fn({ action, value });
      };
    }
  };
};

let caller = (options) => {
  return init(options);
};

export default {
  // 返回 install 函数 用于 Vue.use 注册
  install(vue) {
    vue.prototype.$ImgPrview = caller;
  }
};
