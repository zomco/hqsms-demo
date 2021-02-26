import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import ScreenContent from '../components/screen/ScreenContent.vue'
import ScreenTask from '../components/screen/ScreenTask.vue'
import Screen from '../components/screen/Screen.vue'
import Broadcast from '../components/broadcast/Broadcast.vue'
Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/home'},
  {
    path:'/home',
    component:Home,
    children:[
      {path:'/screen/content',component:ScreenContent},
      {path:'/screen/task',component:ScreenTask},
      {path:'/screen',component:Screen},
      {path:'/broadcasts',component:Broadcast}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
