import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'

// Importar views com lazy loading
const Dashboard = () => import('@/views/Dashboard.vue')
const Calendar = () => import('@/views/Calendar.vue')
//const MaintenanceList = () => import('@/views/MaintenanceList.vue')
//const MaintenanceDetails = () => import('@/views/MaintenanceDetails.vue')
//const MaintenanceCreate = () => import('@/views/MaintenanceCreate.vue')
//const MaintenanceEdit = () => import('@/views/MaintenanceEdit.vue')
const Reports = () => import('@/views/Reports.vue')
const Settings = () => import('@/views/Settings.vue')
const Login = () => import('@/views/auth/Login.vue')
const Profile = () => import('@/views/auth/Profile.vue')

// Definir as rotas
const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { 
      requiresAuth: true,
      title: 'Dashboard',
      icon: '📊'
    }
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar,
    meta: { 
      requiresAuth: true,
      title: 'Calendário',
      icon: '📅'
    }
  },
  {
    path: '/maintenance',
    name: 'MaintenanceList',
    component: MaintenanceList,
    meta: { 
      requiresAuth: true,
      title: 'Manutenções',
      icon: '🔧'
    }
  },
  {
    path: '/maintenance/create',
    name: 'MaintenanceCreate',
    component: MaintenanceCreate,
    meta: { 
      requiresAuth: true,
      title: 'Nova Manutenção',
      icon: '➕'
    }
  },
  {
    path: '/maintenance/:id',
    name: 'MaintenanceDetails',
    component: MaintenanceDetails,
    meta: { 
      requiresAuth: true,
      title: 'Detalhes da Manutenção'
    }
  },
  {
    path: '/maintenance/:id/edit',
    name: 'MaintenanceEdit',
    component: MaintenanceEdit,
    meta: { 
      requiresAuth: true,
      title: 'Editar Manutenção'
    }
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
    meta: { 
      requiresAuth: true,
      title: 'Relatórios',
      icon: '📈'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { 
      requiresAuth: true,
      title: 'Configurações',
      icon: '⚙️'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { 
      requiresGuest: true,
      title: 'Login',
      layout: 'auth'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { 
      requiresAuth: true,
      title: 'Meu Perfil',
      icon: '👤'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: 'Página não encontrada'
    }
  }
]

// Criar o router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Guards de navegação
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Definir título da página
  document.title = to.meta.title ? `${to.meta.title} - SMPM` : 'SMPM'
  
  // Verificar autenticação
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  // Analytics ou outras ações após navegação
  console.log(`Navegando de ${from.name} para ${to.name}`)
})

export default router