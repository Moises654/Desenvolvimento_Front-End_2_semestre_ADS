import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  // Estado
  const user = ref(null)
  const token = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Getters computados
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  
  const userPermissions = computed(() => user.value?.permissions || [])
  
  const userRole = computed(() => user.value?.role || 'user')

  // Actions
  const login = async (credentials) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await authService.login(credentials)
      
      token.value = response.token
      user.value = response.user
      
      // Salvar token no localStorage
      localStorage.setItem('smpm-token', response.token)
      
      return response
    } catch (err) {
      error.value = err.message || 'Erro ao fazer login'
      console.error('Erro no login:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    
    try {
      if (token.value) {
        await authService.logout()
      }
    } catch (err) {
      console.error('Erro no logout:', err)
    } finally {
      // Limpar estado
      user.value = null
      token.value = null
      
      // Remover token do localStorage
      localStorage.removeItem('smmp-token')
      
      loading.value = false
    }
  }

  const register = async (userData) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await authService.register(userData)
      
      token.value = response.token
      user.value = response.user
      
      // Salvar token no localStorage
      localStorage.setItem('smpm-token', response.token)
      
      return response
    } catch (err) {
      error.value = err.message || 'Erro ao criar conta'
      console.error('Erro no registro:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async (profileData) => {
    loading.value = true
    error.value = null
    
    try {
      const updatedUser = await authService.updateProfile(profileData)
      user.value = updatedUser
      return updatedUser
    } catch (err) {
      error.value = err.message || 'Erro ao atualizar perfil'
      console.error('Erro ao atualizar perfil:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const changePassword = async (passwordData) => {
    loading.value = true
    error.value = null
    
    try {
      await authService.changePassword(passwordData)
    } catch (err) {
      error.value = err.message || 'Erro ao alterar senha'
      console.error('Erro ao alterar senha:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const forgotPassword = async (email) => {
    loading.value = true
    error.value = null
    
    try {
      await authService.forgotPassword(email)
    } catch (err) {
      error.value = err.message || 'Erro ao enviar email de recuperação'
      console.error('Erro ao enviar email de recuperação:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (resetData) => {
    loading.value = true
    error.value = null
    
    try {
      await authService.resetPassword(resetData)
    } catch (err) {
      error.value = err.message || 'Erro ao redefinir senha'
      console.error('Erro ao redefinir senha:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const refreshToken = async () => {
    try {
      const response = await authService.refreshToken()
      token.value = response.token
      localStorage.setItem('smpm-token', response.token)
      return response
    } catch (err) {
      console.error('Erro ao renovar token:', err)
      // Se não conseguir renovar, fazer logout
      await logout()
      throw err
    }
  }

  const checkAuth = async () => {
    // Verificar se há token no localStorage
    const savedToken = localStorage.getItem('smpm-token')
    
    if (!savedToken) {
      return false
    }

    token.value = savedToken
    
    try {
      // Validar token com o servidor
      const userData = await authService.validateToken()
      user.value = userData
      return true
    } catch (err) {
      console.error('Token inválido:', err)
      await logout()
      return false
    }
  }

  const hasPermission = (permission) => {
    return userPermissions.value.includes(permission)
  }

  const hasRole = (role) => {
    return userRole.value === role
  }

  const hasAnyRole = (roles) => {
    return roles.includes(userRole.value)
  }

  // Reset do estado
  const $reset = () => {
    user.value = null
    token.value = null
    loading.value = false
    error.value = null
    localStorage.removeItem('smpm-token')
  }

  return {
    // Estado
    user,
    token,
    loading,
    error,
    
    // Getters
    isAuthenticated,
    userPermissions,
    userRole,
    
    // Actions
    login,
    logout,
    register,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    refreshToken,
    checkAuth,
    hasPermission,
    hasRole,
    hasAnyRole,
    $reset
  }
})