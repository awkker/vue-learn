import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/homeview.vue'
import UserList from '../views/userlist.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/Loginview.vue'
import UserProfile from '../views/UserProfile.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/userlist',
    name: 'userlist',
    component: UserList
  },
  {
    path: '/registerview',
    name: 'registerview',
    component: RegisterView
  },
  {
    path: '/loginview',
    name: 'loginview',
    component: LoginView
  },
  {
    path: '/userprofile/:id',
    name: 'userprofile',
    component: UserProfile
  },
  {
    path: '/404',
    name: '404',
    component: NotFound
  },
  {
    path:'/:catchAll(.*)',
    name:'notfound',
    component:NotFound
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router