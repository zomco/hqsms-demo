import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
// 配置基本请求路径
// axios.defaults.baseURL='http://47.115.144.65/api/'
axios.defaults.baseURL='http://192.168.1.200:8080/api/'
//设置请求头
axios.defaults.headers.post["Content-type"] = "application/json"
// 将axios挂载到vue原型对象上
Vue.prototype.$http=axios
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/font/font_kay45vjwje/iconfont.css'

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')