import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from '@/store'

import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import './icons' // icon
import './router/permission' // permission control
import vueWaves from '@/directive/waves'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })
Vue.use(vueWaves)
Vue.prototype.$openRoute = (route, isResult) => {
  let sharpe = "#"
  if (route.indexOf("/") !== 0) {
    sharpe += "/";
  }
  if (isResult) {
    window.open(location.origin + location.pathname + sharpe + route, "_blank", "status=no,location=no,menubar=no,toolbar=no,left=200");
  } else {
    window.open(location.origin + location.pathname + sharpe + route);
  }
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
