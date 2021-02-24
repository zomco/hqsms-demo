import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import ScreenContent from '../components/screen/ScreenContent.vue'
Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/home'},
  {
    path:'/home',
    component:Home,
    children:[
      {path:'/screen/content',component:ScreenContent}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
