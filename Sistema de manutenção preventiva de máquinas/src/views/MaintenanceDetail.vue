<template>
  <div class="container mx-auto p-6">
    <!-- Cabeçalho com navegação -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <nav class="flex items-center space-x-2 text-sm text-gray-500 mb-2">
          <router-link to="/manutencoes" class="hover:text-gray-700">
            Manutenções
          </router-link>
          <span>→</span>
          <span class="text-gray-900">Detalhes</span>
        </nav>
        <h1 class="text-3xl font-bold text-gray-900">
          {{ maintenance?.equipment }}
        </h1>
      </div>
      
      <div class="flex space-x-3">
        <button
          @click="editMode = !editMode"
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          {{ editMode ? 'Cancelar' : 'Editar' }}
        </button>
        <button
          v-if="editMode"
          @click="saveMaintenance"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Salvar
        </button>
      </div>
    </div>
    
    <!-- Informações Principais -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div class="lg:col-span-2 bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Informações da Manutenção</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Equipamento
            </label>
            <input
              v-if="editMode"
              v-model="editableData.equipment"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p v-else class="text-gray-900">{{ maintenance?.equipment }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Manutenção
            </label>
            <select
              v-if="editMode"
              v-model="editableData.type"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Preventiva">Preventiva</option>
              <option value="Corretiva">Corretiva</option>
              <option value="Preditiva">Preditiva</option>
            </select>
            <p v-else class="text-gray-900">{{ maintenance?.type }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Data Programada
            </label>
            <input
              v-if="editMode"
              v-model="editableData.date"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p v-else class="text-gray-900">{{ formatDate(maintenance?.date) }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Prioridade
            </label>
            <select
              v-if="editMode"
              v-model="editableData.priority"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
              <option value="Crítica">Crítica</option>
            </select>
            <div v-else>
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  getPriorityClass(maintenance?.priority)
                ]"
              >
                {{ maintenance?.priority }}
              </span>
            </div>
          </div>
          
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              v-if="editMode"
              v-model="editableData.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <p v-else class="text-gray-900">{{ maintenance?.description }}</p>
          </div>
        </div>
      </div>
      
      <!-- Status e Ações -->
      <div class="space-y-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-4">Status</h3>
          <div class="space-y-3">
            <div>
              <span
                :class="[
                  'inline-flex px-3 py-1 text-sm font-semibold rounded-full',
                  getStatusClass(maintenance?.status)
                ]"
              >
                {{ maintenance?.status }}
              </span>
            </div>
            
            <div v-if="!editMode" class="space-y-2">
              <button
                v-if="maintenance?.status === 'Programada'"
                @click="updateStatus('Em Andamento')"
                class="w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
              >
                Iniciar Manutenção
              </button>
              
              <button
                v-if="maintenance?.status === 'Em Andamento'"
                @click="updateStatus('Concluída')"
                class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Concluir Manutenção
              </button>
              
              <button
                v-if="['Programada', 'Em Andamento'].includes(maintenance?.status)"
                @click="updateStatus('Atrasada')"
                class="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Marcar como Atrasada
              </button>
            </div>
          </div>
        </div>
        
        <!-- Informações Técnicas -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-4">Informações Técnicas</h3>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">ID:</span>
              <span class="font-medium">{{ maintenance?.id }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Criado em:</span>
              <span class="font-medium">{{ formatDate(maintenance?.createdAt) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Última atualização:</span>
              <span class="font-medium">{{ formatDate(maintenance?.updatedAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Histórico de Atividades -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-4">Histórico de Atividades</h2>
      
      <div class="space-y-4">
        <div
          v-for="activity in activities"
          :key="activity.id"
          class="flex items-start space-x-3 pb-4 border-b border-gray-200 last:border-b-0"
        >
          <div
            :class="[
              'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium',
              getActivityColor(activity.type)
            ]"
          >
            {{ getActivityIcon(activity.type) }}
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900">{{ activity.description }}</p>
            <p class="text-xs text-gray-500">{{ formatDate(activity.date) }} - {{ activity.user }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaintenanceDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      editMode: false,
      maintenance: null,
      editableData: {},
      activities: [
        {
          id: 1,
          type: 'created',
          description: 'Manutenção criada no sistema',
          date: '2025-09-01',
          user: 'João Silva'
        },
        {
          id: 2,
          type: 'scheduled',
          description: 'Manutenção programada para 12/09/2025',
          date: '2025-09-02',
          user: 'Maria Santos'
        },
        {
          id: 3,
          type: 'updated',
          description: 'Prioridade alterada para Alta',
          date: '2025-09-10',
          user: 'Carlos Lima'
        }
      ]
    }
  },
  mounted() {
    this.loadMaintenance()
  },
  methods: {
    loadMaintenance() {
      // Simulação de dados - em um app real viria da API
      const maintenances = [
        {
          id: 1,
          equipment: 'Compressor 01',
          type: 'Preventiva',
          date: '2025-09-12',
          status: 'Programada',
          priority: 'Alta',
          description: 'Troca de filtros e verificação de pressão do sistema principal. Inspeção visual de vazamentos e teste de funcionamento.',
          createdAt: '2025-09-01',
          updatedAt: '2025-09-10'
        }
      ]
      
      this.maintenance = maintenances.find(m => m.id === parseInt(this.id))
      if (this.maintenance) {
        this.editableData = { ...this.maintenance }
      }
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A'
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
    getActivityColor(type) {
      const colors = {
        'created': 'bg-blue-500',
        'scheduled': 'bg-green-500',
        'updated': 'bg-yellow-500',
        'completed': 'bg-green-600',
        'cancelled': 'bg-red-500'
      }
      return colors[type] || 'bg-gray-500'
    },
    getActivityIcon(type) {
      const icons = {
        'created': '📝',
        'scheduled': '📅',
        'updated': '✏️',
        'completed': '✅',
        'cancelled': '❌'
      }
      return icons[type] || '📋'
    },
    updateStatus(newStatus) {
      if (confirm(`Tem certeza que deseja alterar o status para "${newStatus}"?`)) {
        this.maintenance.status = newStatus
        this.addActivity({
          type: newStatus.toLowerCase().replace(' ', '_'),
          description: `Status alterado para ${newStatus}`,
          date: new Date().toISOString().split('T')[0],
          user: 'Usuário Atual'
        })
      }
    },
    saveMaintenance() {
      // Simular salvamento - em um app real seria uma chamada à API
      Object.assign(this.maintenance, this.editableData)
      this.maintenance.updatedAt = new Date().toISOString().split('T')[0]
      
      this.addActivity({
        type: 'updated',
        description: 'Informações da manutenção foram atualizadas',
        date: new Date().toISOString().split('T')[0],
        user: 'Usuário Atual'
      })
      
      this.editMode = false
      alert('Manutenção salva com sucesso!')
    },
    addActivity(activity) {
      this.activities.push({
        id: Date.now(),
        ...activity
      })
    }
  }
}
</script>