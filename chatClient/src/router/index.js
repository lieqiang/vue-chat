import Vue from 'vue'
import VueRouter from 'vue-router'
import Tab from '@/AppMain'
Vue.use(VueRouter)

const routes = [
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
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
    path: '/newFriends',
    name: 'NewFriends',
    component: () => import(/* webpackChunkName: "newFriends" */ '@/views/NewFriends.vue')
  },
  {
    path: '/searchDetail',
    name: 'SearchDetail',
    component: () => import(/* webpackChunkName: "searchDetail" */ '@/views/SearchDetail.vue')
  },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  routes
})

export default router
