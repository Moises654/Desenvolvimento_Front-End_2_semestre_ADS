<template>
  <div class="container mx-auto p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Calendário de Manutenções</h1>
      <p class="text-gray-600">Visualize as manutenções programadas por período</p>
    </div>
    
    <!-- Controles do Calendário -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <button
            @click="previousMonth"
            class="p-2 hover:bg-gray-100 rounded-md"
          >
            ← Anterior
          </button>
          <h2 class="text-xl font-semibold">
            {{ currentMonthYear }}
          </h2>
          <button
            @click="nextMonth"
            class="p-2 hover:bg-gray-100 rounded-md"
          >
            Próximo →
          </button>
        </div>
        
        <div class="flex space-x-2">
          <button
            @click="viewType = 'month'"
            :class="[
              'px-3 py-1 rounded-md text-sm',
              viewType === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            ]"
          >
            Mês
          </button>
          <button
            @click="viewType = 'week'"
            :class="[
              'px-3 py-1 rounded-md text-sm',
              viewType === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            ]"
          >
            Semana
          </button>
        </div>
      </div>
    </div>
    
    <!-- Legenda -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <h3 class="font-medium mb-2">Legenda:</h3>
      <div class="flex flex-wrap gap-4">
        <div class="flex items-center">
          <div class="w-4 h-4 bg-green-500 rounded mr-2"></div>
          <span class="text-sm">Concluída</span>
        </div>
        <div class="flex items-center">
          <div class="w-4 h-4 bg-blue-500 rounded mr-2"></div>
          <span class="text-sm">Programada</span>
        </div>
        <div class="flex items-center">
          <div class="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
          <span class="text-sm">Em Andamento</span>
        </div>
        <div class="flex items-center">
          <div class="w-4 h-4 bg-red-500 rounded mr-2"></div>
          <span class="text-sm">Atrasada</span>
        </div>
      </div>
    </div>
    
    <!-- Calendário -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <!-- Cabeçalho dos dias da semana -->
      <div class="grid grid-cols-7 gap-px bg-gray-200">
        <div
          v-for="day in weekDays"
          :key="day"
          class="bg-gray-50 p-2 text-center text-sm font-medium text-gray-700"
        >
          {{ day }}
        </div>
      </div>
      
      <!-- Dias do mês -->
      <div class="grid grid-cols-7 gap-px bg-gray-200">
        <div
          v-for="day in calendarDays"
          :key="day.date"
          :class="[
            'bg-white p-2 min-h-[120px] relative',
            !day.isCurrentMonth && 'bg-gray-50 text-gray-400'
          ]"
        >
          <div class="font-medium text-sm mb-1">{{ day.day }}</div>
          
          <!-- Manutenções do dia -->
          <div class="space-y-1">
            <div
              v-for="maintenance in day.maintenances"
              :key="maintenance.id"
              :class="[
                'text-xs p-1 rounded cursor-pointer truncate',
                getMaintenanceClass(maintenance.status)
              ]"
              :title="maintenance.equipment + ' - ' + maintenance.type"
              @click="showMaintenanceDetail(maintenance)"
            >
              {{ maintenance.equipment }}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal de Detalhes -->
    <Modal
      :isOpen="showDetailModal"
      :title="selectedMaintenance ? selectedMaintenance.equipment : ''"
      @close="showDetailModal = false"
    >
      <div v-if="selectedMaintenance">
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700">Tipo:</label>
            <p class="text-sm">{{ selectedMaintenance.type }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Data:</label>
            <p class="text-sm">{{ selectedMaintenance.date }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Status:</label>
            <span
              :class="[
                'text-xs px-2 py-1 rounded-full',
                getMaintenanceClass(selectedMaintenance.status)
              ]"
            >
              {{ selectedMaintenance.status }}
            </span>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Descrição:</label>
            <p class="text-sm">{{ selectedMaintenance.description }}</p>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '../components/Modal.vue'

export default {
  name: 'Calendar',
  components: {
    Modal
  },
  data() {
    return {
      currentDate: new Date(),
      viewType: 'month',
      weekDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      showDetailModal: false,
      selectedMaintenance: null,
      maintenances: [
        {
          id: 1,
          equipment: 'Compressor 01',
          type: 'Preventiva',
          date: '2025-09-12',
          status: 'Programada',
          description: 'Troca de filtros e verificação de pressão'
        },
        {
          id: 2,
          equipment: 'Esteira 02',
          type: 'Corretiva',
          date: '2025-09-13',
          status: 'Em Andamento',
          description: 'Reparo do motor de acionamento'
        },
        {
          id: 3,
          equipment: 'Bomba 03',
          type: 'Preditiva',
          date: '2025-09-15',
          status: 'Programada',
          description: 'Análise de vibração e temperatura'
        },
        {
          id: 4,
          equipment: 'Gerador 01',
          type: 'Preventiva',
          date: '2025-09-08',
          status: 'Atrasada',
          description: 'Manutenção geral e teste de funcionamento'
        },
        {
          id: 5,
          equipment: 'Ar Condicionado',
          type: 'Preventiva',
          date: '2025-09-10',
          status: 'Concluída',
          description: 'Limpeza de filtros e verificação de gás'
        }
      ]
    }
  },
  computed: {
    currentMonthYear() {
      return this.currentDate.toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric'
      })
    },
    calendarDays() {
      const year = this.currentDate.getFullYear()
      const month = this.currentDate.getMonth()
      
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const startDate = new Date(firstDay)
      startDate.setDate(startDate.getDate() - firstDay.getDay())
      
      const days = []
      const currentDate = new Date(startDate)
      
      for (let i = 0; i < 42; i++) {
        const dateStr = currentDate.toISOString().split('T')[0]
        const dayMaintenances = this.maintenances.filter(m => m.date === dateStr)
        
        days.push({
          date: dateStr,
          day: currentDate.getDate(),
          isCurrentMonth: currentDate.getMonth() === month,
          maintenances: dayMaintenances
        })
        
        currentDate.setDate(currentDate.getDate() + 1)
      }
      
      return days
    }
  },
  methods: {
    previousMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1)
      this.currentDate = new Date(this.currentDate)
    },
    nextMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1)
      this.currentDate = new Date(this.currentDate)
    },
    getMaintenanceClass(status) {
      const classes = {
        'Programada': 'bg-blue-100 text-blue-800',
        'Em Andamento': 'bg-yellow-100 text-yellow-800',
        'Concluída': 'bg-green-100 text-green-800',
        'Atrasada': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },
    showMaintenanceDetail(maintenance) {
      this.selectedMaintenance = maintenance
      this.showDetailModal = true
    }
  }
}
</script>