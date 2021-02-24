import Vue from 'vue'
import App from './App.vue'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import './plugins/element'

// 将echarts挂载到vue原型对象上
Vue.prototype.$echarts = echarts

// 请求基准路径的配置
axios.defaults.baseURL = 'http://47.115.144.65/api/'
// 将axios挂载到vue原型对象上
Vue.prototype.$http = axios

new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
