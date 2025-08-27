<template>
  <nav class="bg-blue-900 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo e Título -->
        <div class="flex items-center space-x-4">
          <router-link to="/" class="flex items-center space-x-3">
            <div class="bg-blue-700 p-2 rounded-lg">
              <span class="text-2xl">🔧</span>
            </div>
            <div>
              <h1 class="text-xl font-bold text-white">SMPM</h1>
              <p class="text-blue-200 text-sm hidden md:block">
                Sistema de Manutenção Preventiva
              </p>
            </div>
          </router-link>
        </div>

        <!-- Menu Desktop -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link
            v-for="item in menuItems"
            :key="item.name"
            :to="item.to"
            :class="[
              'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
              isActiveRoute(item.to) 
                ? 'bg-blue-700 text-white' 
                : 'text-blue-100 hover:bg-blue-700 hover:text-white'
            ]"
          >
            <span class="mr-2">{{ item.icon }}</span>
            {{ item.label }}
          </router-link>
        </div>

        <!-- Menu do Usuário -->
        <div class="flex items-center space-x-4">
          <!-- Notificações -->
          <div class="relative">
            <button
              @click="toggleNotifications"
              class="p-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded-lg transition-colors duration-200"
            >
              <span class="text-lg">🔔</span>
              <span
                v-if="unreadNotifications > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ unreadNotifications > 9 ? '9+' : unreadNotifications }}
              </span>
            </button>

            <!-- Dropdown de Notificações -->
            <div
              v-if="showNotifications"
              class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50"
            >
              <div class="p-4 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-800">Notificações</h3>
              </div>
              <div class="max-h-80 overflow-y-auto">
                <div
                  v-for="notification in notifications"
                  :key="notification.id"
                  class="p-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <p class="text-sm text-gray-800">{{ notification.message }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ formatDate(notification.date) }}</p>
                </div>
                <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500">
                  Nenhuma notificação
                </div>
              </div>
            </div>
          </div>

          <!-- Perfil do Usuário -->
          <div class="relative">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-2 p-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded-lg transition-colors duration-200"
            >
              <div class="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                <span class="text-sm font-semibold">{{ userInitials }}</span>
              </div>
              <span class="hidden md:block">{{ user?.name || 'Usuário' }}</span>
              <span :class="{ 'rotate-180': showUserMenu }" class="transition-transform duration-200">
                ▼
              </span>
            </button>

            <!-- Dropdown do Usuário -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50"
            >
              <div class="p-4 border-b border-gray-200">
                <p class="text-sm font-semibold text-gray-800">{{ user?.name }}</p>
                <p class="text-xs text-gray-500">{{ user?.email }}</p>
              </div>
              <div class="py-2">
                <router-link
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="closeUserMenu"
                >
                  👤 Meu Perfil
                </router-link>
                <router-link
                  to="/settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="closeUserMenu"
                >
                  ⚙️ Configurações
                </router-link>
                <hr class="my-2">
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  🚪 Sair
                </button>
              </div>
            </div>
          </div>

          <!-- Botão Menu Mobile -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded-lg"
          >
            <div class="w-6 h-6 flex flex-col justify-center items-center space-y-1">
              <span 
                :class="{ 'rotate-45 translate-y-1.5': showMobileMenu }"
                class="block w-4 h-0.5 bg-current transition-transform duration-300"
              ></span>
              <span 
                :class="{ 'opacity-0': showMobileMenu }"
                class="block w-4 h-0.5 bg-current transition-opacity duration-300"
              ></span>
              <span 
                :class="{ '-rotate-45 -translate-y-1.5': showMobileMenu }"
                class="block w-4 h-0.5 bg-current transition-transform duration-300"
              ></span>
            </div>
          </button>
        </div>
      </div>

      <!-- Menu Mobile -->
      <div
        v-if="showMobileMenu"
        class="md:hidden border-t border-blue-800 bg-blue-900"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            v-for="item in menuItems"
            :key="item.name"
            :to="item.to"
            :class="[
              'block px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
              isActiveRoute(item.to)
                ? 'bg-blue-700 text-white'
                : 'text-blue-100 hover:bg-blue-700 hover:text-white'
            ]"
            @click="closeMobileMenu"
          >
            <span class="mr-2">{{ item.icon }}</span>
            {{ item.label }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'

export default {
  name: 'Navbar',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()
    
    // Estados reativos
    const showMobileMenu = ref(false)
    const showUserMenu = ref(false)
    const showNotifications = ref(false)
    
    // Menu items
    const menuItems = [
      { name: 'dashboard', to: '/', label: 'Dashboard', icon: '📊' },
      { name: 'calendar', to: '/calendar', label: 'Calendário', icon: '📅' },
      { name: 'maintenance', to: '/maintenance', label: 'Manutenções', icon: '🔧' },
      { name: 'reports', to: '/reports', label: 'Relatórios', icon: '📈' }
    ]
    
    // Dados mockados de notificações
    const notifications = ref([
      {
        id: 1,
        message: 'Manutenção preventiva do Torno CNC-001 programada para hoje',
        date: new Date(),
        read: false
      },
      {
        id: 2,
        message: 'Peça de reposição para Prensa P-003 chegou ao estoque',
        date: new Date(Date.now() - 86400000),
        read: false
      }
    ])
    
    // Computeds
    const user = computed(() => authStore.user)
    
    const userInitials = computed(() => {
      if (!user.value?.name) return 'U'
      return user.value.name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    })
    
    const unreadNotifications = computed(() => {
      return notifications.value.filter(n => !n.read).length
    })
    
    // Métodos
    const isActiveRoute = (to) => {
      return route.path === to || (to !== '/' && route.path.startsWith(to))
    }
    
    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
      showUserMenu.value = false
      showNotifications.value = false
    }
    
    const closeMobileMenu = () => {
      showMobileMenu.value = false
    }
    
    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value
      showNotifications.value = false
    }
    
    const closeUserMenu = () => {
      showUserMenu.value = false
    }
    
    const toggleNotifications = () => {
      showNotifications.value = !showNotifications.value
      showUserMenu.value = false
    }
    
    const handleLogout = async () => {
      try {
        await authStore.logout()
        router.push('/login')
      } catch (error) {
        console.error('Erro ao fazer logout:', error)
      }
    }
    
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    // Fechar menus ao clicar fora
    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        showUserMenu.value = false
        showNotifications.value = false
      }
    }
    
    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })
    
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })
    
    return {
      // Estado
      showMobileMenu,
      showUserMenu,
      showNotifications,
      menuItems,
      notifications,
      
      // Computeds
      user,
      userInitials,
      unreadNotifications,
      
      // Métodos
      isActiveRoute,
      toggleMobileMenu,
      closeMobileMenu,
      toggleUserMenu,
      closeUserMenu,
      toggleNotifications,
      handleLogout,
      formatDate
    }
  }
}
</script>