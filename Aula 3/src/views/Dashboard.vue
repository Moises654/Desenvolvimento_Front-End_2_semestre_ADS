<template>
  <div class="container mx-auto p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p class="text-gray-600">Visão geral do sistema de manutenção preventiva</p>
    </div>
    
    <!-- KPIs -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <KpiCard
        title="Manutenções Pendentes"
        :value="kpis.pending"
        trend="↑ 5% vs mês anterior"
        color="red"
      >
        <template #icon>🔧</template>
      </KpiCard>
      
      <KpiCard
        title="Concluídas Este Mês"
        :value="kpis.completed"
        trend="↑ 12% vs mês anterior"
        color="green"
      >
        <template #icon>✅</template>
      </KpiCard>
      
      <KpiCard
        title="Equipamentos Ativos"
        :value="kpis.activeEquipments"
        trend="→ Sem alteração"
        color="blue"
      >
        <template #icon>🏭</template>
      </KpiCard>
      
      <KpiCard
        title="Taxa de Eficiência"
        :value="kpis.efficiency"
        trend="↑ 3% vs mês anterior"
        color="purple"
      >
        <template #icon>📈</template>
      </KpiCard>
    </div>
    
    <!-- Alertas e Próximas Manutenções -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Alertas -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-900">Alertas Urgentes</h2>
        <div class="space-y-3">
          <div
            v-for="alert in alerts"
            :key="alert.id"
            :class="[
              'p-3 rounded-md border-l-4',
              alert.type === 'critical' ? 'bg-red-50 border-red-400' : 
              alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' : 
              'bg-blue-50 border-blue-400'
            ]"
          >
            <p class="font-medium">{{ alert.equipment }}</p>
            <p class="text-sm text-gray-600">{{ alert.message }}</p>
            <p class="text-xs text-gray-500">{{ alert.date }}</p>
          </div>
        </div>
      </div>
      
      <!-- Próximas Manutenções -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-900">Próximas Manutenções</h2>
        <div class="space-y-3">
          <div
            v-for="maintenance in upcomingMaintenances"
            :key="maintenance.id"
            class="flex justify-between items-center p-3 bg-gray-50 rounded-md"
          >
            <div>
              <p class="font-medium">{{ maintenance.equipment }}</p>
              <p class="text-sm text-gray-600">{{ maintenance.type }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium">{{ maintenance.date }}</p>
              <span
                :class="[
                  'text-xs px-2 py-1 rounded-full',
                  maintenance.priority === 'alta' ? 'bg-red-100 text-red-800' :
                  maintenance.priority === 'media' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                ]"
              >
                {{ maintenance.priority }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KpiCard from '../components/KpiCard.vue'

export default {
  name: 'Dashboard',
  components: {
    KpiCard
  },
  data() {
    return {
      kpis: {
        pending: 12,
        completed: 34,
        activeEquipments: 85,
        efficiency: '94%'
      },
      alerts: [
        {
          id: 1,
          equipment: 'Compressor 01',
          message: 'Manutenção vencida há 3 dias',
          date: '08/09/2025',
          type: 'critical'
        },
        {
          id: 2,
          equipment: 'Esteira 02',
          message: 'Próxima manutenção em 2 dias',
          date: '13/09/2025',
          type: 'warning'
        },
        {
          id: 3,
          equipment: 'Motor 05',
          message: 'Lubrificação programada',
          date: '15/09/2025',
          type: 'info'
        }
      ],
      upcomingMaintenances: [
        {
          id: 1,
          equipment: 'Bomba Hidráulica 01',
          type: 'Preventiva',
          date: '12/09/2025',
          priority: 'alta'
        },
        {
          id: 2,
          equipment: 'Gerador 02',
          type: 'Preditiva',
          date: '14/09/2025',
          priority: 'media'
        },
        {
          id: 3,
          equipment: 'Ar Condicionado 03',
          type: 'Preventiva',
          date: '16/09/2025',
          priority: 'baixa'
        }
      ]
    }
  }
}
</script>