import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { maintenanceService } from '@/services/maintenanceService'

export const useMaintenanceStore = defineStore('maintenance', () => {
  // Estado
  const maintenances = ref([])
  const loading = ref(false)
  const error = ref(null)
  const filters = ref({
    search: '',
    status: '',
    type: '',
    priority: '',
    dateFrom: '',
    dateTo: '',
    technician: ''
  })
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0
  })

  // Getters computados
  const filteredMaintenances = computed(() => {
    let filtered = maintenances.value

    if (filters.value.search) {
      const search = filters.value.search.toLowerCase()
      filtered = filtered.filter(m => 
        m.machine.toLowerCase().includes(search) ||
        m.technician.toLowerCase().includes(search) ||
        m.description.toLowerCase().includes(search)
      )
    }

    if (filters.value.status) {
      filtered = filtered.filter(m => m.status === filters.value.status)
    }

    if (filters.value.type) {
      filtered = filtered.filter(m => m.type === filters.value.type)
    }

    if (filters.value.priority) {
      filtered = filtered.filter(m => m.priority === filters.value.priority)
    }

    if (filters.value.technician) {
      filtered = filtered.filter(m => m.technician === filters.value.technician)
    }

    if (filters.value.dateFrom) {
      filtered = filtered.filter(m => new Date(m.date) >= new Date(filters.value.dateFrom))
    }

    if (filters.value.dateTo) {
      filtered = filtered.filter(m => new Date(m.date) <= new Date(filters.value.dateTo))
    }

    return filtered
  })

  const maintenancesByStatus = computed(() => {
    return maintenances.value.reduce((acc, maintenance) => {
      acc[maintenance.status] = (acc[maintenance.status] || 0) + 1
      return acc
    }, {})
  })

  const maintenancesByPriority = computed(() => {
    return maintenances.value.reduce((acc, maintenance) => {
      acc[maintenance.priority] = (acc[maintenance.priority] || 0) + 1
      return acc
    }, {})
  })

  const upcomingMaintenances = computed(() => {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    
    return maintenances.value.filter(m => {
      const maintenanceDate = new Date(m.date)
      return maintenanceDate >= today && maintenanceDate <= nextWeek
    })
  })

  const overdueMaintenances = computed(() => {
    const today = new Date()
    return maintenances.value.filter(m => {
      const maintenanceDate = new Date(m.date)
      return maintenanceDate < today && m.status !== 'Concluída'
    })
  })

  // Actions
  const fetchMaintenances = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await maintenanceService.getAll(pagination.value)
      maintenances.value = response.data
      pagination.value.total = response.total
    } catch (err) {
      error.value = err.message || 'Erro ao carregar manutenções'
      console.error('Erro ao carregar manutenções:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchMaintenanceById = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const maintenance = await maintenanceService.getById(id)
      return maintenance
    } catch (err) {
      error.value = err.message || 'Erro ao carregar manutenção'
      console.error('Erro ao carregar manutenção:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createMaintenance = async (maintenanceData) => {
    loading.value = true
    error.value = null
    
    try {
      const newMaintenance = await maintenanceService.create(maintenanceData)
      maintenances.value.push(newMaintenance)
      return newMaintenance
    } catch (err) {
      error.value = err.message || 'Erro ao criar manutenção'
      console.error('Erro ao criar manutenção:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateMaintenance = async (id, maintenanceData) => {
    loading.value = true
    error.value = null
    
    try {
      const updatedMaintenance = await maintenanceService.update(id, maintenanceData)
      const index = maintenances.value.findIndex(m => m.id === id)
      if (index !== -1) {
        maintenances.value[index] = updatedMaintenance
      }
      return updatedMaintenance
    } catch (err) {
      error.value = err.message || 'Erro ao atualizar manutenção'
      console.error('Erro ao atualizar manutenção:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteMaintenance = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      await maintenanceService.delete(id)
      maintenances.value = maintenances.value.filter(m => m.id !== id)
    } catch (err) {
      error.value = err.message || 'Erro ao deletar manutenção'
      console.error('Erro ao deletar manutenção:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const clearFilters = () => {
    filters.value = {
      search: '',
      status: '',
      type: '',
      priority: '',
      dateFrom: '',
      dateTo: '',
      technician: ''
    }
  }

  const updatePagination = (newPagination) => {
    pagination.value = { ...pagination.value, ...newPagination }
  }

  // Reset do estado
  const $reset = () => {
    maintenances.value = []
    loading.value = false
    error.value = null
    clearFilters()
    pagination.value = {
      page: 1,
      limit: 10,
      total: 0
    }
  }

  return {
    // Estado
    maintenances,
    loading,
    error,
    filters,
    pagination,
    
    // Getters
    filteredMaintenances,
    maintenancesByStatus,
    maintenancesByPriority,
    upcomingMaintenances,
    overdueMaintenances,
    
    // Actions
    fetchMaintenances,
    fetchMaintenanceById,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance,
    updateFilters,
    clearFilters,
    updatePagination,
    $reset
  }
})