import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

// Definição das rotas
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home - Agência Aventura'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'Sobre - Agência Aventura'
    }
  },
  // Rota para páginas não encontradas
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
]

// Criação do router
const router = createRouter({
  history: createWebHistory(),
  routes,
  // Scroll para o topo quando mudar de rota
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Guard de navegação para alterar título da página
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Agência Aventura'
  next()
})

export default router