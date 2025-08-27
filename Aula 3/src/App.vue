<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <Navbar />
    
    <!-- Main Content -->
    <main class="flex-grow">
      <router-view v-slot="{ Component, route }">
        <transition 
          name="fade" 
          mode="out-in"
          enter-active-class="animate-fade-in"
          leave-active-class="animate-fade-out"
        >
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Global Loading Spinner -->
    <LoadingSpinner v-if="isLoading" />

    <!-- Global Modal -->
    <Modal 
      v-if="showGlobalModal" 
      :show="showGlobalModal"
      @close="closeGlobalModal"
    >
      <template #default>
        <!-- Conteúdo do modal global -->
      </template>
    </Modal>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/common/Navbar.vue'
import Footer from '@/components/common/Footer.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import Modal from '@/components/common/Modal.vue'
import { useAuthStore } from '@/store/modules/auth'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    LoadingSpinner,
    Modal
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    
    // Estados reativos
    const isLoading = ref(false)
    const showGlobalModal = ref(false)

    // Métodos
    const closeGlobalModal = () => {
      showGlobalModal.value = false
    }

    // Inicialização da aplicação
    onMounted(() => {
      // Verificar autenticação do usuário
      authStore.checkAuth()
      
      // Outras inicializações globais
      console.log('🚀 SMPM Sistema iniciado com sucesso!')
    })

    return {
      isLoading,
      showGlobalModal,
      closeGlobalModal
    }
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

.animate-fade-out {
  animation: fadeOut 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-10px); }
}
</style>