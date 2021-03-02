import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import ScreenContent from '../components/screen/ScreenContent.vue'
import ScreenTask from '../components/screen/ScreenTask.vue'
import Screen from '../components/screen/Screen.vue'
import Broadcast from '../components/broadcast/Broadcast.vue'
import BroadcastContent from '../components/broadcast/BroadcastContent.vue'
import BroadcastPlan from '../components/broadcast/BroadcastPlan.vue'
import WeatherLog from '../components/weather/WeatherLog.vue'
import Weather from '../components/weather/Weather.vue'
import Human from '../components/camera/Human.vue'
import Vehicle from '../components/camera/Vehicle.vue'
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
      {path:'/broadcasts',component:Broadcast},
      {path:'/broadcasts/content',component:BroadcastContent},
      {path:'/broadcasts/plan',component:BroadcastPlan},
      {path:'/weather/log',component:WeatherLog},
      {path:'/weather',component:Weather},
      {path:'/camera/human',component:Human},
      {path:'/camera/vehicle',component:Vehicle}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
