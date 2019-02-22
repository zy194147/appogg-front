// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'    // 使用 CSS
import axios from './httpConfig/http'
Vue.prototype.$http = axios

import store from './store/index'

Vue.config.productionTip = false

Vue.use(iView)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
