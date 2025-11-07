<template>
  <div class="container mx-auto p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Lista de Manutenções</h1>
      <p class="text-gray-600">Gerencie todas as atividades de manutenção</p>
    </div>
    
    <!-- Filtros e Controles -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div class="flex flex-col md:flex-row gap-4 flex-1">
          <!-- Filtro por Status -->
          <select
            v-model="filters.status"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos os Status</option>
            <option value="Programada">Programada</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Concluída">Concluída</option>
            <option value="Atrasada">Atrasada</option>
          </select>
          
          <!-- Filtro por Tipo -->
          <select
            v-model="filters.type"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos os Tipos</option>
            <option value="Preventiva">Preventiva</option>
            <option value="Corretiva">Corretiva</option>
            <option value="Preditiva">Preditiva</option>
          </select>
          
          <!-- Campo de busca -->
          <input
            v-model="filters.search"
            type="text"
            placeholder="Buscar equipamento..."
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <!-- Botão Nova Manutenção -->
        <button
          @click="showNewMaintenanceModal = true"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 whitespace-nowrap"
        >
          + Nova Manutenção
        </button>
      </div>
    </div>
    
    <!-- Tabela de Manutenções -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Equipamento
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prioridade
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="maintenance in filteredMaintenances"
              :key="maintenance.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ maintenance.equipment }}</div>
                <div class="text-sm text-gray-500">{{ maintenance.description }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-gray-900">{{ maintenance.type }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-gray-900">{{ formatDate(maintenance.date) }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getStatusClass(maintenance.status)
                  ]"
                >
                  {{ maintenance.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getPriorityClass(maintenance.priority)
                  ]"
                >
                  {{ maintenance.priority }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <router-link
                    :to="`/manutencao/${maintenance.id}`"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Ver
                  </router-link>
                  <button
                    @click="editMaintenance(maintenance)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Editar
                  </button>
                  <button
                    @click="deleteMaintenance(maintenance.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Paginação -->
      <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Mostrando {{ filteredMaintenances.length }} de {{ maintenances.length }} registros
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal Nova/Editar Manutenção -->
    <Modal
      :isOpen="showNewMaintenanceModal || showEditMaintenanceModal"
      :title="showEditMaintenanceModal ? 'Editar Manutenção' : 'Nova Manutenção'"
      @close="closeModals"
    >
      <MaintenanceForm
        :initialData="editingMaintenance"
        :isEdit="showEditMaintenanceModal"
        @submit="handleSubmit"
        @cancel="closeModals"
      />
    </Modal>
  </div>
</template>

<script>
import Modal from '../components/Modal.vue'
import MaintenanceForm from '../components/MaintenanceForm.vue'

export default {
  name: 'MaintenanceList',
  components: {
    Modal,
    MaintenanceForm
  },
  data() {
    return {
      showNewMaintenanceModal: false,
      showEditMaintenanceModal: false,
      editingMaintenance: null,
      filters: {
        status: '',
        type: '',
        search: ''
      },
      maintenances: [
        {
          id: 1,
          equipment: 'Compressor 01',
          type: 'Preventiva',
          date: '2025-09-12',
          status: 'Programada',
          priority: 'Alta',
          description: 'Troca de filtros e verificação de pressão'
        },
        {
          id: 2,
          equipment: 'Esteira Transportadora 02',
          type: 'Corretiva',
          date: '2025-09-13',
          status: 'Em Andamento',
          priority: 'Crítica',
          description: 'Reparo do motor de acionamento'
        },
        {
          id: 3,
          equipment: 'Bomba Hidráulica 03',
          type: 'Preditiva',
          date: '2025-09-15',
          status: 'Programada',
          priority: 'Média',
          description: 'Análise de vibração e temperatura'
        },
        {
          id: 4,
          equipment: 'Gerador Principal 01',
          type: 'Preventiva',
          date: '2025-09-08',
          status: 'Atrasada',
          priority: 'Alta',
          description: 'Manutenção geral e teste de funcionamento'
        },
        {
          id: 5,
          equipment: 'Sistema de Ar Condicionado',
          type: 'Preventiva',
          date: '2025-09-10',
          status: 'Concluída',
          priority: 'Baixa',
          description: 'Limpeza de filtros e verificação de gás'
        }
      ]
    }
  },
  computed: {
    filteredMaintenances() {
      let filtered = this.maintenances
      
      if (this.filters.status) {
        filtered = filtered.filter(m => m.status === this.filters.status)
      }
      
      if (this.filters.type) {
        filtered = filtered.filter(m => m.type === this.filters.type)
      }
      
      if (this.filters.search) {
        filtered = filtered.filter(m => 
          m.equipment.toLowerCase().includes(this.filters.search.toLowerCase())
        )
      }
      
      return filtered
    }
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('pt-BR')
    },
    getStatusClass(status) {
      const classes = {
        'Programada': 'bg-blue-100 text-blue-800',
        'Em Andamento': 'bg-yellow-100 text-yellow-800',
        'Concluída': 'bg-green-100 text-green-800',
        'Atrasada': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },
    getPriorityClass(priority) {
      const classes = {
        'Baixa': 'bg-gray-100 text-gray-800',
        'Média': 'bg-yellow-100 text-yellow-800',
        'Alta': 'bg-orange-100 text-orange-800',
        'Crítica': 'bg-red-100 text-red-800'
      }
      return classes[priority] || 'bg-gray-100 text-gray-800'
    },
    editMaintenance(maintenance) {
      this.editingMaintenance = { ...maintenance }
      this.showEditMaintenanceModal = true
    },
    deleteMaintenance(id) {
      if (confirm('Tem certeza que deseja excluir esta manutenção?')) {
        this.maintenances = this.maintenances.filter(m => m.id !== id)
      }
    },
    handleSubmit(formData) {
      if (this.showEditMaintenanceModal) {
        // Atualizar manutenção existente
        const index = this.maintenances.findIndex(m => m.id === this.editingMaintenance.id)
        if (index !== -1) {
          this.maintenances[index] = { ...this.editingMaintenance, ...formData }
        }
      } else {
        // Criar nova manutenção
        const newMaintenance = {
          id: Date.now(),
          ...formData,
          status: 'Programada'
        }
        this.maintenances.push(newMaintenance)
      }
      this.closeModals()
    },
    closeModals() {
      this.showNewMaintenanceModal = false
      this.showEditMaintenanceModal = false
      this.editingMaintenance = null
    }
  }
}
</script>