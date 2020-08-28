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
        component: () => import(/* webpackChunkName: "Me" */ '@/views/Me/Me.vue'),
        name: 'Me'
      }
    ]
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "Search" */ '@/views/Search.vue'),
    name: 'Search'
  },
  {
    path: '/personalInfo',
    component: () => import(/* webpackChunkName: "PersonalInfo" */ '@/views/Me/PersonalInfo.vue'),
    name: 'PersonalInfo'
  },
  {
    path: '/editAvatar',
    component: () => import(/* webpackChunkName: "EditAvatar" */ '@/views/Me/EditAvatar.vue'),
    name: 'EditAvatar'
  },
  {
    path: '/editNickname',
    component: () => import(/* webpackChunkName: "EditNickname" */ '@/views/Me/EditNickname.vue'),
    name: 'EditNickname'
  },
  {
    path: '/editSex',
    component: () => import(/* webpackChunkName: "EditSex" */ '@/views/Me/EditSex.vue'),
    name: 'EditSex'
  },
  {
    path: '/editSignature',
    component: () => import(/* webpackChunkName: "EditSignature" */ '@/views/Me/EditSignature.vue'),
    name: 'EditSignature'
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
  {
    path: '/sendValidate',
    name: 'SendValidate',
    component: () => import(/* webpackChunkName: "sendValidate" */ '@/views/SendValidate.vue')
  },
  {
    path: '/friendDetail',
    name: 'FriendDetail',
    component: () => import(/* webpackChunkName: "friendDetail" */ '@/views/FriendDetail.vue')
  },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  routes
})

export default router
