// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import store from './store'
import router from './router'
import {$axios} from './utils'
import imgUpload from '@/components/img-upload'

Vue.prototype.$axios = $axios

Vue.use(ElementUI);
Vue.component('upload-img', imgUpload);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
