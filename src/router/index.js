import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login/Login'
import AdminLTE from '../components/AdminLTE'
import Dashboard from '../views/Dashboard'
import Boiler from '../views/boiler/Boiler.vue'
import CreateBoiler from '../views/boiler/Create.vue'
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/app',
    name: 'admin-lte',
    component: AdminLTE,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: 'boiler',
        name: 'boiler',
        component: Boiler
      },
      {
        path: 'create-boiler',
        name: 'create-boiler',
        component: CreateBoiler
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
