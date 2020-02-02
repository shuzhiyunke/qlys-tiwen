import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import dayjs from 'dayjs'
import 'vant/lib/index.css'
import 'amfe-flexible'
import VueWechatTitle from 'vue-wechat-title'

Vue.use(VueWechatTitle)
Vue.use(Vant)
Vue.prototype.$toast = Vant.Toast
Vue.prototype.$dayjs = dayjs
Vue.filter('dayjs', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  return value ? dayjs(value).format(formatString) : '-'
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
