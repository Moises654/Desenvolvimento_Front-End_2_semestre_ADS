<template>
  <nav class="bg-blue-900 text-white p-4 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-xl font-bold">
        SMPM - Sistema de Manutenção
      </div>
      <div class="flex space-x-6">
        <router-link 
          to="/" 
          class="hover:bg-blue-800 px-3 py-2 rounded transition-colors"
          :class="{ 'bg-blue-800': $route.name === 'Dashboard' }"
        >
          Dashboard
        </router-link>
        <router-link 
          to="/calendario" 
          class="hover:bg-blue-800 px-3 py-2 rounded transition-colors"
          :class="{ 'bg-blue-800': $route.name === 'Calendar' }"
        >
          Calendário
        </router-link>
        <router-link 
          to="/manutencoes" 
          class="hover:bg-blue-800 px-3 py-2 rounded transition-colors"
          :class="{ 'bg-blue-800': $route.name === 'MaintenanceList' }"
        >
          Manutenções
        </router-link>
      </div>
    </div>
  </nav>
</template>