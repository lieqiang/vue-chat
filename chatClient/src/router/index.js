import Vue from 'vue'
import VueRouter from 'vue-router'
import Tab from '@/AppMain'
Vue.use(VueRouter)

const routes = [
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
    path: '/',
    component: Tab,
    redirect: 'home',
    children: [
      {
        path: '/home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        name: 'Home'
      }
    ]
  },
  {
    path: '/addressBooks',
    component: Tab,
    redirect: 'addressBooks',
    children: [
      {
        path: '/addressBooks',
        component: () => import(/* webpackChunkName: "AddressBooks" */ '@/views/AddressBooks.vue'),
        name: 'AddressBooks'
      }
    ]
  },
  {
    path: '/me',
    component: Tab,
    redirect: 'me',
    children: [
      {
        path: '/me',
        component: () => import(/* webpackChunkName: "Me" */ '@/views/Me.vue'),
        name: 'Me'
      }
    ]
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
