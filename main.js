import App from './App'


// #ifndef VUE3
import Vue from 'vue'
import api from './common/api'
Vue.config.productionTip = false
Vue.prototype.$api = api
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif