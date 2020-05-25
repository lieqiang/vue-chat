import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/views/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home'
    // component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '@/views/Signup.vue')
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import(/* webpackChunkName: "signin" */ '@/views/Signin.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import(/* webpackChunkName: "chat" */ '@/views/chat/index.vue')
  },
  {
    path: '/searchDetail',
    name: 'SearchDetail',
    component: () => import(/* webpackChunkName: "searchDetail" */ '@/views/SearchDetail.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
