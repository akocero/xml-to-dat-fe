import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const authRequired = (to, from, next) => {
  const authorized = store.getters.getUser && store.getters.getCompany ? next() : next({ name: 'auth' });
}

const noAuthRequired = (to, from, next) => {
  const authorized = store.getters.getUser && store.getters.getCompany ? next({ name: 'dashboard' }) : next();
}

const routes = [
  {
    path: '/',
    name: 'auth',
    component: () => import('@/views/auth/Auth'),
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
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/User.vue'),
        props: true
      },
      {
        path: 'user/create',
        name: 'create-user',
        component: () => import('@/views/user/CreateUser.vue')
      },
      {
        path: 'user/update/:id',
        name: 'update-user',
        component: () => import('@/views/user/UpdateUser.vue')
      },
      {
        path: 'company',
        name: 'company',
        component: () => import('@/views/company/Company.vue')
      },
      {
        path: 'company/create',
        name: 'create-company',
        component: () => import('@/views/company/CreateCompany.vue')
      },
      {
        path: 'company/update/:id',
        name: 'update-company',
        component: () => import('@/views/company/UpdateCompany.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
