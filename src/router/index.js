import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home'

const routes = [
  { path: '/', redirect: '/home' },
  { path:'/home', component:Home }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
