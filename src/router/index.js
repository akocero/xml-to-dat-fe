import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login/Login'
import AdminLTE from '../components/AdminLTE'
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/login/Auth')
  },
  {
    path: '/app',
    name: 'admin-lte',
    component: AdminLTE,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard')
      },
      {
        path: 'boiler',
        name: 'boiler',
        component: () => import('@/views/boiler/Boiler.vue')
      },
      {
        path: 'create-boiler',
        name: 'create-boiler',
        component: () => import('@/views/boiler/Create.vue')
      },
      {
        path: 'update-boiler/:id',
        name: 'update-boiler',
        component: () => import('@/views/boiler/Update.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
