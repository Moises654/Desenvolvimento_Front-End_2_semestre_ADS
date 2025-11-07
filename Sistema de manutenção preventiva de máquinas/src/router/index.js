import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Calendar from '../views/Calendar.vue'
import MaintenanceList from '../views/MaintenanceList.vue'
import MaintenanceDetail from '../views/MaintenanceDetail.vue'
import LayoutAutenticação from '../layouts/layoutAutenticação.vue'
import LayoutPrincipal from '../layouts/layoutPrincipal.vue'

const routes = [
  {
    path: '/',
    component: LayoutAutenticação,
    children: [
      {
        path: '',
        name: 'Login',
        component: Login
      }
    ]
  },
  {
    path: '/',
    component: LayoutPrincipal,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'calendario',
        name: 'Calendar',
        component: Calendar
      },
      {
        path: 'manutencoes',
        name: 'MaintenanceList',
        component: MaintenanceList
      },
      {
        path: 'manutencao/:id',
        name: 'MaintenanceDetail',
        component: MaintenanceDetail,
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navegação - protege rotas autenticadas
router.beforeEach((to, from, next) => {
  const userLoggedIn = localStorage.getItem('user') || sessionStorage.getItem('user')
  
  // Se a rota requer autenticação e usuário não está logado
  if (to.meta.requiresAuth && !userLoggedIn) {
    next({ name: 'Login' })
  }
  // Se está logado e tenta acessar login, redireciona para dashboard
  else if (to.name === 'Login' && userLoggedIn) {
    next({ name: 'Dashboard' })
  }
  // Caso contrário, permite navegação
  else {
    next()
  }
})

export default router