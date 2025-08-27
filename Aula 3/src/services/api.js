import axios from 'axios'
import { useAuthStore } from '@/store/modules/auth'

// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

// Criar instância do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Interceptor de requisição
api.interceptors.request.use(
  (config) => {
    // Adicionar token de autenticação
    const token = localStorage.getItem('smpm-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Log da requisição (apenas em desenvolvimento)
    if (import.meta.env.DEV) {
      console.log(`🔄 ${config.method?.toUpperCase()} ${config.url}`, config.data)
    }
    
    return config
  },
  (error) => {
    console.error('❌ Erro na requisição:', error)
    return Promise.reject(error)
  }
)

// Interceptor de resposta
api.interceptors.response.use(
  (response) => {
    // Log da resposta (apenas em desenvolvimento)
    if (import.meta.env.DEV) {
      console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data)
    }
    
    return response
  },
  async (error) => {
    const originalRequest = error.config
    
    // Tratamento de erro 401 (não autorizado)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      const authStore = useAuthStore()
      
      try {
        // Tentar renovar o token
        await authStore.refreshToken()
        
        // Repetir a requisição original com o novo token
        const token = localStorage.getItem('smpm-token')
        originalRequest.headers.Authorization = `Bearer ${token}`
        
        return api(originalRequest)
      } catch (refreshError) {
        // Se não conseguir renovar, fazer logout
        await authStore.logout()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
    
    // Tratamento de outros erros
    const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido'
    
    console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url}:`, errorMessage)
    
    // Personalizar mensagens de erro
    switch (error.response?.status) {
      case 400:
        error.message = 'Dados inválidos enviados'
        break
      case 403:
        error.message = 'Você não tem permissão para esta ação'
        break
      case 404:
        error.message = 'Recurso não encontrado'
        break
      case 422:
        error.message = error.response.data?.message || 'Dados de entrada inválidos'
        break
      case 500:
        error.message = 'Erro interno do servidor'
        break
      case 503:
        error.message = 'Serviço temporariamente indisponível'
        break
      default:
        error.message = errorMessage
    }
    
    return Promise.reject(error)
  }
)

// Métodos de conveniência
export const apiMethods = {
  // GET
  get: (url, config = {}) => api.get(url, config),
  
  // POST
  post: (url, data = {}, config = {}) => api.post(url, data, config),
  
  // PUT
  put: (url, data = {}, config = {}) => api.put(url, data, config),
  
  // PATCH
  patch: (url, data = {}, config = {}) => api.patch(url, data, config),
  
  // DELETE
  delete: (url, config = {}) => api.delete(url, config),
  
  // Upload de arquivo
  upload: (url, file, onProgress = null) => {
    const formData = new FormData()
    formData.append('file', file)
    
    return api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onProgress(progress)
        }
      }
    })
  },
  
  // Download de arquivo
  download: (url, filename) => {
    return api.get(url, {
      responseType: 'blob'
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    })
  }
}

export default api