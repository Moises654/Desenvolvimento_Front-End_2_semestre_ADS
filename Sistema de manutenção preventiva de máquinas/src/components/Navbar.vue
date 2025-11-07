<template>
  <nav class="bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo e Título -->
        <div class="flex items-center space-x-3">
          <div class="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-white font-bold text-lg">Sistema de Manutenção</h1>
            <p class="text-blue-100 text-xs">Preventiva de Máquinas</p>
          </div>
        </div>

        <!-- Links de Navegação -->
        <div class="hidden md:flex items-center space-x-4">
          <router-link 
            to="/dashboard" 
            class="text-white hover:bg-white/10 px-3 py-2 rounded-lg transition"
          >
            Dashboard
          </router-link>
          <router-link 
            to="/calendario" 
            class="text-white hover:bg-white/10 px-3 py-2 rounded-lg transition"
          >
            Calendário
          </router-link>
          <router-link 
            to="/manutencoes" 
            class="text-white hover:bg-white/10 px-3 py-2 rounded-lg transition"
          >
            Manutenções
          </router-link>
        </div>

        <!-- Usuário e Logout -->
        <div class="flex items-center space-x-4">
          <!-- Informações do Usuário -->
          <div class="hidden sm:block text-right">
            <p class="text-white font-medium text-sm">{{ user.role }}</p>
            <p class="text-blue-100 text-xs">{{ user.email }}</p>
          </div>

          <!-- Botão de Logout -->
          <button 
            @click="logout"
            class="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            <span class="hidden sm:inline">Sair</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Menu Mobile (opcional) -->
    <div class="md:hidden px-4 pb-3 space-y-1">
      <router-link 
        to="/dashboard" 
        class="block text-white hover:bg-white/10 px-3 py-2 rounded-lg transition"
      >
        Dashboard
      </router-link>
      <router-link 
        to="/calendario" 
        class="block text-white hover:bg-white/10 px-3 py-2 rounded-lg transition"
      >
        Calendário
      </router-link>
      <router-link 
        to="/manutencoes" 
        class="block text-white hover:bg-white/10 px-3 py-2 rounded-lg transition"
      >
        Manutenções
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    // Carregar dados do usuário
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  },
  methods: {
    logout() {
      // Confirmação antes de sair
      if (confirm('Deseja realmente sair do sistema?')) {
        // Remove os dados do usuário
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        
        // Redireciona para login
        this.$router.push('/');
        
        console.log('✅ Logout realizado com sucesso');
      }
    }
  }
}
</script>