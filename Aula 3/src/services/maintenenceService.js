import { apiMethods } from './api'

export const maintenanceService = {
  // Buscar todas as manutenções
  async getAll(params = {}) {
    try {
      const response = await apiMethods.get('/maintenance', { params })
      return {
        data: response.data.data || [],
        total: response.data.total || 0,
        page: response.data.page || 1,
        limit: response.data.limit || 10
      }
    } catch (error) {
      console.error('Erro ao buscar manutenções:', error)
      throw error
    }
  },

  // Buscar manutenção por ID
  async getById(id) {
    try {
      const response = await apiMethods.get(`/maintenance/${id}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar manutenção:', error)
      throw error
    }
  },

  // Criar nova manutenção
  async create(maintenanceData) {
    try {
      const response = await apiMethods.post('/maintenance', maintenanceData)
      return response.data
    } catch (error) {
      console.error('Erro ao criar manutenção:', error)
      throw error
    }
  },

  // Atualizar manutenção existente
  async update(id, maintenanceData) {
    try {
      const response = await apiMethods.put(`/maintenance/${id}`, maintenanceData)
      return response.data
    } catch (error) {
      console.error('Erro ao atualizar manutenção:', error)
      throw error
    }
  },

  // Deletar manutenção
  async delete(id) {
    try {
      const response = await apiMethods.delete(`/maintenance/${id}`)
      return response.data
    } catch (error) {
      console.error('Erro ao deletar manutenção:', error)
      throw error
    }
  },

  // Buscar manutenções por período
  async getByDateRange(startDate, endDate) {
    try {
      const response = await apiMethods.get('/maintenance/date-range', {
        params: { startDate, endDate }
      })
      return response.data
    } catch (error) {
      console.error('Erro ao buscar manutenções por período:', error)
      throw error
    }
  },

  // Buscar manutenções por técnico
  async getByTechnician(technicianId) {
    try {
      const response = await apiMethods.get(`/maintenance/technician/${technicianId}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar manutenções por técnico:', error)
      throw error
    }
  },

  // Buscar manutenções por máquina
  async getByMachine(machineId) {
    try {
      const response = await apiMethods.get(`/maintenance/machine/${machineId}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar manutenções por máquina:', error)
      throw error
    }
  },

  // Buscar manutenções por status
  async getByStatus(status) {
    try {
      const response = await apiMethods.get('/maintenance/status', {
        params: { status }
      })
      return response.data
    } catch (error) {
      console.error('Erro ao buscar manutenções por status:', error)
      throw error
    }
  },

  // Atualizar status da manutenção
  async updateStatus(id, status, notes = '') {
    try {
      const response = await apiMethods.patch(`/maintenance/${id}/status`, {
        status,
        notes
      })
      return response.data
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      throw error
    }
  },

  // Adicionar comentário/nota à manutenção
  async addNote(id, note) {
    try {
      const response = await apiMethods.post(`/maintenance/${id}/notes`, {
        note,
        timestamp: new Date().toISOString()
      })
      return response.data
    } catch (error) {
      console.error('Erro ao adicionar nota:', error)
      throw error
    }
  },

  // Upload de anexo
  async uploadAttachment(id, file, description = '') {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('description', description)
      
      const response = await apiMethods.upload(`/maintenance/${id}/attachments`, file)
      return response.data
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      throw error
    }
  },

  // Obter estatísticas
  async getStatistics(params = {}) {
    try {
      const response = await apiMethods.get('/maintenance/statistics', { params })
      return response.data
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
      throw error
    }
  },

  // Obter manutenções próximas (próximos 7 dias)
  async getUpcoming() {
    try {
      const response = await apiMethods.get('/maintenance/upcoming')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar manutenções próximas:', error)
      throw error
    }
  },

  // Obter manutenções atrasadas
  async getOverdue() {
    try {
      const response = await apiMethods.get('/maintenance/overdue')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar manutenções atrasadas:', error)
      throw error
    }
  },

  // Agendar manutenção preventiva
  async schedulePreventive(machineId, scheduleData) {
    try {
      const response = await apiMethods.post(`/maintenance/schedule/${machineId}`, scheduleData)
      return response.data
    } catch (error) {
      console.error('Erro ao agendar manutenção preventiva:', error)
      throw error
    }
  },

  // Duplicar manutenção
  async duplicate(id, newDate) {
    try {
      const response = await apiMethods.post(`/maintenance/${id}/duplicate`, {
        scheduledDate: newDate
      })
      return response.data
    } catch (error) {
      console.error('Erro ao duplicar manutenção:', error)
      throw error
    }
  },

  // Exportar relatório
  async exportReport(filters = {}, format = 'pdf') {
    try {
      const response = await apiMethods.get('/maintenance/export', {
        params: { ...filters, format },
        responseType: 'blob'
      })
      
      const filename = `manutencoes_${new Date().toISOString().split('T')[0]}.${format}`
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      
      return { success: true, filename }
    } catch (error) {
      console.error('Erro ao exportar relatório:', error)
      throw error
    }
  }
}