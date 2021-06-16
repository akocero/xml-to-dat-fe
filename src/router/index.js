import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const authRequired = (to, from, next) => {
  const user = store.getters.getUser ? next() : next({ name: 'auth' });
}

const noAuthRequired = (to, from, next) => {
  const user = store.getters.getUser ? next({ name: 'dashboard' }) : next();
}

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login/Login'),
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/login/Auth'),
    beforeEnter: noAuthRequired
  },
  {
    path: '/app',
    name: 'admin-lte',
    component: () => import('@/components/AdminLTE'),
    beforeEnter: authRequired,
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
